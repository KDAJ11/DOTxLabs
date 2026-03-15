"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Search, Target, Palette, Code, Rocket, TrendingUp } from "lucide-react";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const PROCESS_NODES = [
  { label: "Discovery", Icon: Search, angle: -90 },
  { label: "Strategy", Icon: Target, angle: -30 },
  { label: "Design", Icon: Palette, angle: 30 },
  { label: "Build", Icon: Code, angle: 90 },
  { label: "Launch", Icon: Rocket, angle: 150 },
  { label: "Optimize", Icon: TrendingUp, angle: 210 },
];

const CENTER_X = 300;
const CENTER_Y = 300;
const RADIUS = 200;
const NODE_SIZE = 72;

function getNodePosition(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + RADIUS * Math.cos(rad),
    y: CENTER_Y + RADIUS * Math.sin(rad),
  };
}

export default function ProcessDiagram({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={`relative w-full max-w-[600px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 600 600"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connector lines from center to each node */}
        {PROCESS_NODES.map((node, i) => {
          const pos = getNodePosition(node.angle);
          return (
            <motion.line
              key={`line-${node.label}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={pos.x}
              y2={pos.y}
              stroke="rgba(123, 53, 255, 0.25)"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                inView
                  ? {
                      pathLength: reduced ? 1 : 1,
                      opacity: 1,
                    }
                  : {}
              }
              transition={
                reduced
                  ? { duration: 0.3 }
                  : {
                      pathLength: {
                        duration: 0.6,
                        delay: 0.4 + i * 0.15,
                        ease: EASE_SMOOTH,
                      },
                      opacity: {
                        duration: 0.2,
                        delay: 0.4 + i * 0.15,
                      },
                    }
              }
              style={{ willChange: "stroke-dashoffset, opacity" }}
            />
          );
        })}
      </svg>

      {/* Central node — DOTxLabs X brand mark */}
      <motion.div
        className="absolute flex items-center justify-center"
        initial={reduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
        animate={inView ? (reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }) : {}}
        transition={
          reduced
            ? { duration: 0.3 }
            : {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }
        }
        style={{
          width: 80,
          height: 80,
          top: "calc(50% - 40px)",
          left: "calc(50% - 40px)",
          willChange: "transform, opacity",
        }}
      >
        <div
          className="w-full h-full rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #7B35FF 0%, #6B2AEF 100%)",
            boxShadow: "0 0 30px rgba(123, 53, 255, 0.4), 0 0 60px rgba(123, 53, 255, 0.15)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <line x1="8" y1="8" x2="28" y2="28" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <line x1="28" y1="8" x2="8" y2="28" stroke="white" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      {/* Surrounding nodes */}
      {PROCESS_NODES.map((node, i) => {
        const pos = getNodePosition(node.angle);
        // Convert from SVG viewBox coords (600x600) to percentages
        const leftPct = (pos.x / 600) * 100;
        const topPct = (pos.y / 600) * 100;

        return (
          <motion.div
            key={node.label}
            className="absolute flex flex-col items-center"
            style={{
              left: `calc(${leftPct}% - ${NODE_SIZE / 2}px)`,
              top: `calc(${topPct}% - ${NODE_SIZE / 2}px)`,
              width: NODE_SIZE,
              willChange: "transform, opacity",
            }}
            initial={reduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            animate={
              inView
                ? reduced
                  ? { opacity: 1 }
                  : { scale: 1, opacity: 1 }
                : {}
            }
            transition={
              reduced
                ? { duration: 0.3, delay: i * 0.05 }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                    delay: 1.0 + i * 0.15,
                  }
            }
          >
            {/* Node circle */}
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(123, 53, 255, 0.08)",
                border: "1px solid rgba(123, 53, 255, 0.2)",
                backdropFilter: "blur(8px)",
              }}
              animate={
                inView && !reduced
                  ? {
                      opacity: [0.7, 1, 0.7],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <node.Icon size={22} className="text-accent" />
            </motion.div>

            {/* Label */}
            <span className="mt-2 text-xs font-semibold text-white/70 text-center whitespace-nowrap">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
