"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, useEffect } from "react";

const ACCENT = "#7B35FF";
const SW = 1.5;
const FILL_INTERIOR = "rgba(255,255,255,0.12)";
const LOOP_INTERVAL = 6000;

const STROKE_BASE = {
  stroke: ACCENT,
  strokeWidth: SW,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Contact Envelope — 64×64 SVG
 *
 * Envelope draws on, flap opens, X-marked paper slides
 * out partway then back in. Page load trigger with 1s delay.
 * 6-second loop via key remount.
 */
export default function ContactEnvelope() {
  const reduced = useReducedMotion();
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setLoopKey((k) => k + 1), LOOP_INTERVAL);
    return () => clearInterval(interval);
  }, [reduced]);

  if (reduced) {
    return (
      <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden="true">
        {/* Envelope body */}
        <rect x={8} y={20} width={48} height={32} rx={3} fill={FILL_INTERIOR} {...STROKE_BASE} />
        {/* Flap — open position */}
        <path d="M8 20 L32 6 L56 20" fill="none" {...STROKE_BASE} />
        {/* V fold lines */}
        <path d="M8 20 L32 38 L56 20" fill="none" stroke={ACCENT} strokeWidth={0.8} strokeLinecap="round" opacity={0.3} />
        {/* Paper peeking */}
        <rect x={18} y={14} width={28} height={18} rx={2} fill={FILL_INTERIOR} {...STROKE_BASE} strokeWidth={1} opacity={0.7} />
        {/* X on paper */}
        <line x1={29} y1={20} x2={35} y2={26} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={35} y1={20} x2={29} y2={26} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden="true" key={loopKey}>
      {/* Envelope body draws on */}
      <motion.rect
        x={8} y={20} width={48} height={32} rx={3}
        fill={FILL_INTERIOR}
        {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
      />

      {/* V fold lines inside */}
      <motion.path
        d="M8 20 L32 38 L56 20"
        fill="none" stroke={ACCENT} strokeWidth={0.8} strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 0.4, delay: 1.4, ease: "easeOut" }}
      />

      {/* Paper with X — slides up then back down */}
      <motion.g
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: [0, 0, -14, -14, 0, 0],
          opacity: [0, 0, 1, 1, 0.6, 0],
        }}
        transition={{
          duration: 4,
          delay: 2.0,
          times: [0, 0.01, 0.2, 0.6, 0.85, 1],
          ease: "easeInOut",
        }}
      >
        <rect x={18} y={22} width={28} height={20} rx={2} fill={FILL_INTERIOR} {...STROKE_BASE} strokeWidth={1} />
        {/* X mark on paper */}
        <line x1={29} y1={28} x2={35} y2={34} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={35} y1={28} x2={29} y2={34} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        {/* Text lines on paper */}
        <rect x={22} y={37} width={12} height={1.5} rx={0.75} fill={ACCENT} opacity={0.25} />
        <rect x={22} y={40} width={18} height={1.5} rx={0.75} fill={ACCENT} opacity={0.2} />
      </motion.g>

      {/* Flap — draws on closed then opens */}
      <motion.path
        d="M8 20 L32 36 L56 20"
        fill="none"
        {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: [0, 1, 1, 1],
          d: [
            "M8 20 L32 36 L56 20",
            "M8 20 L32 36 L56 20",
            "M8 20 L32 6 L56 20",
            "M8 20 L32 6 L56 20",
          ],
        }}
        transition={{
          pathLength: { duration: 0.5, delay: 1.5, ease: "easeOut" },
          d: {
            duration: 2.5,
            delay: 1.5,
            times: [0, 0.2, 0.4, 1],
            ease: "easeInOut",
          },
        }}
      />

      {/* Seal glow where flap meets body */}
      <motion.circle
        cx={32} cy={20} r={4}
        fill="none" stroke={ACCENT} strokeWidth={0.4}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2.5, delay: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "32px 20px" }}
      />
    </svg>
  );
}
