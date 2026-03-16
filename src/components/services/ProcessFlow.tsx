"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
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

/* ─── Helpers ───────────────────────────────────────── */
const ACCENT = "#7B35FF";
const DEG_TO_RAD = Math.PI / 180;

/** Word-wrap text at ~charLimit chars per line, max maxLines */
function wrapText(text: string, charLimit = 20, maxLines = 3): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (current.length + word.length + 1 > charLimit && current.length > 0) {
      lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length > maxLines) lines.length = maxLines;
  return lines;
}

/** Determine text-anchor based on angle (0° = right, 90° = bottom, etc.) */
function getTextAnchor(angleDeg: number): "start" | "end" | "middle" {
  // Normalize to 0-360
  const a = ((angleDeg % 360) + 360) % 360;
  // Top/bottom zones use middle
  if ((a >= 315 || a < 45) || (a >= 135 && a < 225)) return "middle";
  // Right side
  if (a >= 45 && a < 135) return "start";
  // Left side
  return "end";
}

/* ─── Radial Process Flow ───────────────────────────── */
export default function ProcessFlow({ steps, variant = "dark" }: ProcessFlowProps) {
  const isLight = variant === "light";
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // mobile tap
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const viewBoxSize = isMobile ? 320 : 400;
  const cx = viewBoxSize / 2;
  const cy = viewBoxSize / 2;
  const spokeRadius = isMobile ? 110 : 140;
  const centreR = 40;
  const dotR = 6;
  const labelOffset = 20;
  const startAngle = -90;

  /* ─── Compute node positions ─── */
  const nodes = useMemo(() => {
    return steps.map((step, i) => {
      const angleDeg = startAngle + i * (360 / steps.length);
      const angleRad = angleDeg * DEG_TO_RAD;
      const x = cx + spokeRadius * Math.cos(angleRad);
      const y = cy + spokeRadius * Math.sin(angleRad);

      // Spoke start: from centre circle edge
      const sx = cx + centreR * Math.cos(angleRad);
      const sy = cy + centreR * Math.sin(angleRad);

      // Label position: beyond dot
      const lx = cx + (spokeRadius + labelOffset) * Math.cos(angleRad);
      const ly = cy + (spokeRadius + labelOffset) * Math.sin(angleRad);

      const anchor = getTextAnchor(angleDeg);

      // Check if label is long — use smaller font
      const fontSize = step.label.length > 9 ? 10 : 11;

      return { ...step, angleDeg, x, y, sx, sy, lx, ly, anchor, fontSize };
    });
  }, [steps, cx, cy, spokeRadius, centreR, startAngle, labelOffset]);

  /* ─── Theme colors ─── */
  const labelColor = isLight ? "rgba(15,15,30,0.8)" : "rgba(255,255,255,0.8)";
  const spokeOpacity = isLight ? 0.25 : 0.3;
  const descColor = isLight ? "rgba(15,15,30,0.7)" : "rgba(255,255,255,0.7)";

  /* ─── Description text for centre ─── */
  const activeStep = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const descLines = activeStep !== null ? wrapText(steps[activeStep].description, 20, 3) : [];

  /* ─── Handlers ─── */
  const handleNodeHover = useCallback((i: number) => setHoveredIndex(i), []);
  const handleNodeLeave = useCallback(() => setHoveredIndex(null), []);
  const handleNodeTap = useCallback(
    (i: number) => {
      setActiveIndex((prev) => (prev === i ? null : i));
    },
    []
  );

  /* ─── Animation show flag ─── */
  const show = inView || !!reduced;

  return (
    <div>
      <p
        className={`text-xs font-semibold uppercase mb-6 ${isLight ? "text-gray-900/40" : "text-white/40"}`}
        style={{ letterSpacing: "0.15em" }}
      >
        Our Process
      </p>

      {/* 3D perspective container — removed on mobile */}
      <div
        ref={containerRef}
        className="process-flow-container w-full"
        style={{ perspective: isMobile ? "none" : "800px", perspectiveOrigin: "50% 40%" }}
      >
        <div
          className="process-flow-inner w-full max-w-[400px] mx-auto md:max-w-none"
          style={{
            transform: isMobile ? "none" : "rotateX(12deg)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="w-full h-auto"
            fill="none"
            aria-label={`Process flow: ${steps.map((s) => s.label).join(", ")}`}
            role="img"
            style={{ overflow: "visible" }}
          >
            {/* ─── Centre circle ─── */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={centreR}
              stroke={ACCENT}
              strokeWidth={1.5}
              fill="rgba(123,53,255,0.08)"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : { pathLength: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
              style={{ willChange: "transform" }}
            />

            {/* ─── Centre X mark ─── */}
            <AnimatePresence mode="wait">
              {activeStep === null ? (
                <motion.g
                  key="x-mark"
                  initial={{ opacity: reduced ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.line
                    x1={cx - 10} y1={cy - 10} x2={cx + 10} y2={cy + 10}
                    stroke={ACCENT} strokeWidth={2} strokeLinecap="round"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={show ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 0.3, ease: "easeOut" }}
                    style={{ willChange: "transform" }}
                  />
                  <motion.line
                    x1={cx + 10} y1={cy - 10} x2={cx - 10} y2={cy + 10}
                    stroke={ACCENT} strokeWidth={2} strokeLinecap="round"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={show ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 0.3, ease: "easeOut" }}
                    style={{ willChange: "transform" }}
                  />
                </motion.g>
              ) : (
                <motion.g
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {descLines.map((line, li) => (
                    <text
                      key={li}
                      x={cx}
                      y={cy - ((descLines.length - 1) * 6) + li * 12}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={descColor}
                      fontSize={10}
                      fontWeight={500}
                      style={{ pointerEvents: "none" }}
                    >
                      {line}
                    </text>
                  ))}
                </motion.g>
              )}
            </AnimatePresence>

            {/* ─── Centre X pulse on hover ─── */}
            {hoveredIndex !== null && !reduced && (
              <motion.circle
                cx={cx}
                cy={cy}
                r={centreR}
                stroke={ACCENT}
                strokeWidth={1}
                fill="none"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0] }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: `${cx}px ${cy}px`, willChange: "transform" }}
              />
            )}

            {/* ─── Spoke lines ─── */}
            {nodes.map((node, i) => {
              const isHovered = hoveredIndex === i || activeIndex === i;
              return (
                <motion.line
                  key={`spoke-${i}`}
                  x1={node.x}
                  y1={node.y}
                  x2={node.sx}
                  y2={node.sy}
                  stroke={ACCENT}
                  strokeWidth={1}
                  initial={reduced ? { pathLength: 1, opacity: spokeOpacity } : { pathLength: 0, opacity: spokeOpacity }}
                  animate={
                    show
                      ? {
                          pathLength: 1,
                          opacity: hoveredIndex !== null || activeIndex !== null
                            ? isHovered
                              ? 1
                              : spokeOpacity * 0.5
                            : spokeOpacity,
                        }
                      : { pathLength: 0, opacity: spokeOpacity }
                  }
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          pathLength: { duration: 0.5, delay: 0.8 + i * 0.08, ease: "easeOut" },
                          opacity: { duration: 0.2 },
                        }
                  }
                  style={{ willChange: "transform" }}
                />
              );
            })}

            {/* ─── Travelling dot on hover ─── */}
            {hoveredIndex !== null && !reduced && (() => {
              const node = nodes[hoveredIndex];
              return (
                <motion.circle
                  key={`travel-${hoveredIndex}`}
                  r={3}
                  fill={ACCENT}
                  initial={{ cx: node.x, cy: node.y, opacity: 1 }}
                  animate={{ cx: node.sx, cy: node.sy, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeIn" }}
                  style={{ willChange: "transform" }}
                />
              );
            })()}

            {/* ─── Node dots ─── */}
            {nodes.map((node, i) => {
              const isHovered = hoveredIndex === i || activeIndex === i;
              return (
                <motion.circle
                  key={`dot-${i}`}
                  cx={node.x}
                  cy={node.y}
                  r={dotR}
                  stroke={ACCENT}
                  strokeWidth={1.5}
                  fill={isHovered ? "rgba(123,53,255,0.6)" : "rgba(123,53,255,0.15)"}
                  filter={isHovered && !reduced ? `drop-shadow(0 0 8px rgba(123,53,255,0.8))` : undefined}
                  initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={
                    show
                      ? {
                          scale: isHovered && !reduced ? 1.1 : 1,
                          opacity: hoveredIndex !== null || activeIndex !== null
                            ? isHovered
                              ? 1
                              : 0.3
                            : 1,
                        }
                      : reduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={
                    reduced
                      ? { duration: 0 }
                      : show
                      ? { scale: { type: "spring", stiffness: 400, damping: 20, delay: 0.6 }, opacity: { duration: 0.2 } }
                      : { scale: { type: "spring", stiffness: 400, damping: 20, delay: 0.6 } }
                  }
                  style={{ transformOrigin: `${node.x}px ${node.y}px`, willChange: "transform" }}
                  onMouseEnter={() => handleNodeHover(i)}
                  onMouseLeave={handleNodeLeave}
                  onClick={() => handleNodeTap(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.label}: ${node.description}`}
                  className="outline-none focus-visible:ring-2"
                />
              );
            })}

            {/* ─── Labels ─── */}
            {nodes.map((node, i) => (
              <motion.text
                key={`label-${i}`}
                x={node.lx}
                y={node.ly}
                textAnchor={node.anchor}
                dominantBaseline="central"
                fill={labelColor}
                fontSize={node.fontSize}
                fontWeight={600}
                style={{ letterSpacing: "0.08em", textTransform: "uppercase", pointerEvents: "none", willChange: "transform" }}
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={
                  show
                    ? {
                        opacity: hoveredIndex !== null || activeIndex !== null
                          ? hoveredIndex === i || activeIndex === i
                            ? 1
                            : 0.3
                          : 1,
                      }
                    : reduced
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={
                  reduced ? { duration: 0 } : { duration: 0.3, delay: 1.2 + i * 0.06, ease: "easeOut" }
                }
              >
                {node.label}
              </motion.text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
