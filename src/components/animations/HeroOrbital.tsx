"use client";

import { motion, useReducedMotion } from "motion/react";

const ACCENT = "#7B35FF";
const SW = 1.5;
const FILL_INTERIOR = "rgba(255,255,255,0.12)";

const STROKE_BASE = {
  stroke: ACCENT,
  strokeWidth: SW,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Hero Orbital — 96×96 (64 on mobile) ambient SVG
 *
 * Central X node with 3 dots orbiting on elliptical paths
 * at different speeds (4s, 7s, 11s).
 * X centre pulses scale [1, 1.08, 1] on 3s loop.
 * Plays on page load with 0.5s delay.
 */
export default function HeroOrbital() {
  const reduced = useReducedMotion();

  // Reduced motion: static final state
  if (reduced) {
    return (
      <svg
        width={96}
        height={96}
        viewBox="0 0 96 96"
        aria-hidden="true"
        className="w-16 h-16 md:w-24 md:h-24"
      >
        {/* Orbit paths */}
        <ellipse cx={48} cy={48} rx={38} ry={18} fill="none" stroke={ACCENT} strokeWidth={0.5} opacity={0.2} />
        <ellipse cx={48} cy={48} rx={28} ry={32} fill="none" stroke={ACCENT} strokeWidth={0.5} opacity={0.2} transform="rotate(60 48 48)" />
        <ellipse cx={48} cy={48} rx={24} ry={36} fill="none" stroke={ACCENT} strokeWidth={0.5} opacity={0.2} transform="rotate(-45 48 48)" />

        {/* Central hub */}
        <circle cx={48} cy={48} r={10} fill={FILL_INTERIOR} {...STROKE_BASE} />

        {/* X mark at centre */}
        <line x1={44} y1={44} x2={52} y2={52} stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" />
        <line x1={52} y1={44} x2={44} y2={52} stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" />

        {/* Static orbital dots */}
        <circle cx={86} cy={48} r={3} fill={ACCENT} opacity={0.6} />
        <circle cx={30} cy={20} r={2.5} fill={ACCENT} opacity={0.5} />
        <circle cx={62} cy={78} r={2} fill={ACCENT} opacity={0.4} />
      </svg>
    );
  }

  return (
    <svg
      width={96}
      height={96}
      viewBox="0 0 96 96"
      aria-hidden="true"
      className="w-16 h-16 md:w-24 md:h-24"
    >
      {/* Orbit path 1 — wide horizontal ellipse */}
      <motion.ellipse
        cx={48} cy={48} rx={38} ry={18}
        fill="none" stroke={ACCENT} strokeWidth={0.5}
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.2, pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      />

      {/* Orbit path 2 — tilted 60° */}
      <motion.ellipse
        cx={48} cy={48} rx={28} ry={32}
        fill="none" stroke={ACCENT} strokeWidth={0.5}
        transform="rotate(60 48 48)"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.2, pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
      />

      {/* Orbit path 3 — tilted -45° */}
      <motion.ellipse
        cx={48} cy={48} rx={24} ry={36}
        fill="none" stroke={ACCENT} strokeWidth={0.5}
        transform="rotate(-45 48 48)"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.2, pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
      />

      {/* Central hub circle — draws on */}
      <motion.circle
        cx={48} cy={48} r={10}
        fill={FILL_INTERIOR}
        {...STROKE_BASE}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      />

      {/* X mark at centre — scales in, then pulses */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "48px 48px" }}
      >
        {/* Pulse wrapper */}
        <motion.g
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{ transformOrigin: "48px 48px" }}
        >
          <line x1={44} y1={44} x2={52} y2={52} stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" />
          <line x1={52} y1={44} x2={44} y2={52} stroke={ACCENT} strokeWidth={1.8} strokeLinecap="round" />
        </motion.g>
      </motion.g>

      {/* Glow halo around centre — subtle pulse */}
      <motion.circle
        cx={48} cy={48} r={14}
        fill="none" stroke={ACCENT} strokeWidth={0.4}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{ transformOrigin: "48px 48px" }}
      />

      {/* Orbiting dot 1 — 4s period, wide horizontal ellipse */}
      <motion.circle
        r={3}
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0.7, 0.7, 0],
          offsetDistance: ["0%", "100%"],
        }}
        style={{
          offsetPath: "path('M 86 48 A 38 18 0 1 1 10 48 A 38 18 0 1 1 86 48')",
          willChange: "offset-distance",
        }}
        transition={{
          opacity: { duration: 4, delay: 1.0, times: [0, 0.05, 0.5, 0.95, 1], repeat: Infinity },
          offsetDistance: { duration: 4, delay: 1.0, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Orbiting dot 2 — 7s period, tilted ellipse (manual rotation on path) */}
      <motion.circle
        r={2.5}
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.6, 0.6, 0.6, 0],
          offsetDistance: ["0%", "100%"],
        }}
        style={{
          offsetPath: "path('M 48 16 A 28 32 60 1 1 48 80 A 28 32 60 1 1 48 16')",
          offsetRotate: "0deg",
          willChange: "offset-distance",
        }}
        transition={{
          opacity: { duration: 7, delay: 1.3, times: [0, 0.03, 0.5, 0.97, 1], repeat: Infinity },
          offsetDistance: { duration: 7, delay: 1.3, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Orbiting dot 3 — 11s period, tilted -45° ellipse */}
      <motion.circle
        r={2}
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.5, 0.5, 0.5, 0],
          offsetDistance: ["0%", "100%"],
        }}
        style={{
          offsetPath: "path('M 72 24 A 24 36 -45 1 1 24 72 A 24 36 -45 1 1 72 24')",
          offsetRotate: "0deg",
          willChange: "offset-distance",
        }}
        transition={{
          opacity: { duration: 11, delay: 1.6, times: [0, 0.02, 0.5, 0.98, 1], repeat: Infinity },
          offsetDistance: { duration: 11, delay: 1.6, repeat: Infinity, ease: "linear" },
        }}
      />
    </svg>
  );
}
