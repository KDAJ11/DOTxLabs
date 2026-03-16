"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";

/* ─── Types ─────────────────────────────────────────── */
interface Step {
  label: string;
  description: string;
}

interface ProcessFlowProps {
  steps: Step[];
  variant?: "dark" | "light";
}

/* ─── S-curve node positions for desktop (within a 560×260 canvas) ─── */
function computeDesktopPositions(count: number) {
  const positions: Array<{ x: number; y: number }> = [];
  const canvasW = 560;
  const canvasH = 260;
  const padX = 80;
  const padY = 60;
  const usableW = canvasW - padX * 2;
  const usableH = canvasH - padY * 2;

  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0.5;
    // S-curve: horizontal spread + sinusoidal vertical offset
    const x = padX + t * usableW;
    const y = padY + usableH / 2 + Math.sin(t * Math.PI * 1.5) * (usableH * 0.35);
    positions.push({ x, y });
  }
  return positions;
}

/* ─── Cubic bezier path between two points ─────────── */
function bezierPath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  return `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`;
}

const NODE_W = 120;
const NODE_H = 48;
const SPRING = { type: "spring" as const, stiffness: 400, damping: 25 };

/* ─── Desktop Flow (SVG-based S-curve) ─────────────── */
function DesktopFlow({ steps, variant = "dark" }: { steps: Step[]; variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const positions = useMemo(() => computeDesktopPositions(steps.length), [steps.length]);

  return (
    <div ref={ref} className="hidden lg:block relative" style={{ height: 300 }}>
      <svg
        viewBox="0 0 560 260"
        className="w-full h-full"
        fill="none"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        {/* Connecting lines */}
        {positions.map((pos, i) => {
          if (i === 0) return null;
          const prev = positions[i - 1];
          const isLineHovered = hoveredIdx === i || hoveredIdx === i - 1;

          return (
            <motion.path
              key={`line-${i}`}
              d={bezierPath(prev.x, prev.y, pos.x, pos.y)}
              stroke="#7B35FF"
              strokeWidth={1.5}
              strokeLinecap="round"
              style={{ willChange: "transform" }}
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={
                inView
                  ? {
                      pathLength: reduced ? 1 : 1,
                      opacity: isLineHovered ? 1 : 0.3,
                    }
                  : { pathLength: 0, opacity: 0.3 }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      pathLength: { duration: 0.5, delay: 0.15 * i + 0.3, ease: "easeOut" },
                      opacity: { duration: 0.2 },
                    }
              }
            />
          );
        })}
      </svg>

      {/* Node overlays positioned absolutely */}
      {positions.map((pos, i) => (
        <div
          key={`node-${i}`}
          className="absolute"
          style={{
            left: `${(pos.x / 560) * 100}%`,
            top: `${(pos.y / 260) * 100 * (260 / 300)}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.button
            className={`relative flex items-center justify-center rounded-lg text-xs font-semibold uppercase tracking-wide ${isLight ? "text-gray-900" : "text-white"}`}
            style={{
              width: NODE_W,
              height: NODE_H,
              minHeight: 44,
              minWidth: 44,
              border: `1.5px solid ${isLight ? "rgba(123,53,255,0.35)" : "rgba(123,53,255,0.5)"}`,
              background: isLight ? "rgba(123,53,255,0.06)" : "rgba(123,53,255,0.08)",
              willChange: "transform",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={
              inView
                ? { scale: 1, opacity: 1 }
                : reduced
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={reduced ? { duration: 0 } : { ...SPRING, delay: 0.15 * i }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            aria-label={`${steps[i].label}: ${steps[i].description}`}
          >
            {steps[i].label}
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIdx === i && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 w-52"
                style={{ willChange: "transform, opacity" }}
              >
                <div
                  className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${isLight ? "text-gray-700" : "text-white/80"}`}
                  style={{
                    background: isLight ? "rgba(255,255,255,0.95)" : "rgba(13,13,23,0.95)",
                    border: `1px solid ${isLight ? "rgba(123,53,255,0.15)" : "rgba(123,53,255,0.2)"}`,
                    boxShadow: isLight ? "0 4px 16px rgba(0,0,0,0.1)" : "0 4px 16px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  {steps[i].description}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ─── Mobile Flow (vertical stack) ──────────────────── */
function MobileFlow({ steps, variant = "dark" }: { steps: Step[]; variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div ref={ref} className="lg:hidden relative">
      {/* Vertical connecting line */}
      <div
        className="absolute left-[60px] top-6 bottom-6 w-px"
        style={{ background: "rgba(123,53,255,0.2)" }}
      />

      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="relative flex items-start gap-4"
            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.1 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Node dot */}
            <div
              className="relative z-10 flex-none flex items-center justify-center rounded-lg"
              style={{
                width: NODE_W,
                height: NODE_H,
                minHeight: 44,
                border: "1.5px solid rgba(123,53,255,0.5)",
                background: "rgba(123,53,255,0.08)",
              }}
            >
              <button
                className={`w-full h-full flex items-center justify-center text-xs font-semibold uppercase tracking-wide ${isLight ? "text-gray-900" : "text-white"}`}
                style={{ minHeight: 44, minWidth: 44 }}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                aria-expanded={expandedIdx === i}
                aria-label={`${step.label}: ${step.description}`}
              >
                {step.label}
              </button>
            </div>

            {/* Description (tap to expand on mobile) */}
            <AnimatePresence>
              {expandedIdx === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 overflow-hidden pt-2"
                >
                  <p className={`text-xs leading-relaxed ${isLight ? "text-gray-600" : "text-white/60"}`}>
                    {step.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────── */
export default function ProcessFlow({ steps, variant = "dark" }: ProcessFlowProps) {
  const isLight = variant === "light";
  return (
    <div>
      <p
        className={`text-xs font-semibold uppercase mb-6 ${isLight ? "text-gray-900/40" : "text-white/40"}`}
        style={{ letterSpacing: "0.15em" }}
      >
        Our Process
      </p>
      <DesktopFlow steps={steps} variant={variant} />
      <MobileFlow steps={steps} variant={variant} />
    </div>
  );
}
