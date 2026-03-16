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

function useLoopKey(reduced: boolean) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setKey((k) => k + 1), LOOP_INTERVAL);
    return () => clearInterval(interval);
  }, [reduced]);
  return key;
}

/* ─── Block 1: Browser/Code Window Building Itself ───── */

export function CustomBuildIcon() {
  const reduced = useReducedMotion();
  const loopKey = useLoopKey(!!reduced);

  if (reduced) {
    return (
      <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden="true">
        {/* Browser chrome */}
        <rect x={4} y={6} width={56} height={52} rx={5} fill={FILL_INTERIOR} {...STROKE_BASE} />
        <line x1={4} y1={18} x2={60} y2={18} {...STROKE_BASE} />
        {/* Traffic dots: X replaces red */}
        <line x1={10} y1={10} x2={14} y2={14} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={14} y1={10} x2={10} y2={14} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <circle cx={21} cy={12} r={2} fill={ACCENT} opacity={0.5} />
        <circle cx={28} cy={12} r={2} fill={ACCENT} opacity={0.5} />
        {/* Code lines */}
        <rect x={10} y={24} width={22} height={2.5} rx={1.25} fill={ACCENT} opacity={0.4} />
        <rect x={10} y={31} width={34} height={2.5} rx={1.25} fill={ACCENT} opacity={0.3} />
        <rect x={10} y={38} width={28} height={2.5} rx={1.25} fill={ACCENT} opacity={0.3} />
      </svg>
    );
  }

  return (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden="true" key={loopKey}>
      {/* Browser chrome frame */}
      <motion.rect
        x={4} y={6} width={56} height={52} rx={5}
        fill={FILL_INTERIOR} {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* Address bar */}
      <motion.line
        x1={4} y1={18} x2={60} y2={18} {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
      />
      {/* X replaces red traffic dot */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <line x1={10} y1={10} x2={14} y2={14} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={14} y1={10} x2={10} y2={14} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
      </motion.g>
      <motion.circle cx={21} cy={12} r={2} fill={ACCENT} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.65 }} />
      <motion.circle cx={28} cy={12} r={2} fill={ACCENT} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.7 }} />

      {/* Code line 1 */}
      <motion.rect
        x={10} y={24} width={22} height={2.5} rx={1.25} fill={ACCENT}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.4, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
        style={{ transformOrigin: "10px 25.25px" }}
      />
      {/* Code line 2 */}
      <motion.rect
        x={10} y={31} width={34} height={2.5} rx={1.25} fill={ACCENT}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.3, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "10px 32.25px" }}
      />
      {/* Code line 3 */}
      <motion.rect
        x={10} y={38} width={28} height={2.5} rx={1.25} fill={ACCENT}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 0.3, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 1.5, ease: "easeOut" }}
        style={{ transformOrigin: "10px 39.25px" }}
      />
      {/* Cursor blink at end of last line */}
      <motion.rect
        x={40} y={38} width={2} height={2.5} rx={0.5} fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.7, 0.7, 0] }}
        transition={{ duration: 1.2, delay: 1.9, times: [0, 0.1, 0.2, 0.8, 1], repeat: Infinity }}
      />
    </svg>
  );
}

/* ─── Block 2: Magnifying Glass with Bar Chart ────────── */

export function SEORankIcon() {
  const reduced = useReducedMotion();
  const loopKey = useLoopKey(!!reduced);

  if (reduced) {
    return (
      <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden="true">
        {/* Magnifying glass */}
        <circle cx={28} cy={28} r={18} fill={FILL_INTERIOR} {...STROKE_BASE} />
        <line x1={40.7} y1={40.7} x2={56} y2={56} {...STROKE_BASE} strokeWidth={2} />
        {/* Bars inside lens */}
        <rect x={18} y={32} width={5} height={8} rx={1} fill={ACCENT} opacity={0.3} />
        <rect x={25.5} y={27} width={5} height={13} rx={1} fill={ACCENT} opacity={0.4} />
        <rect x={33} y={21} width={5} height={19} rx={1} fill={ACCENT} opacity={0.5} />
        {/* X mark above tallest bar */}
        <line x1={33.5} y1={14} x2={37.5} y2={18} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={37.5} y1={14} x2={33.5} y2={18} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden="true" key={loopKey}>
      {/* Magnifying glass circle */}
      <motion.circle
        cx={28} cy={28} r={18}
        fill={FILL_INTERIOR} {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* Handle */}
      <motion.line
        x1={40.7} y1={40.7} x2={56} y2={56}
        {...STROKE_BASE} strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      />
      {/* Bar 1 (shortest) */}
      <motion.rect
        x={18} y={32} width={5} height={8} rx={1} fill={ACCENT}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.3 }}
        transition={{ duration: 0.35, delay: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "20.5px 40px" }}
      />
      {/* Bar 2 (medium) */}
      <motion.rect
        x={25.5} y={27} width={5} height={13} rx={1} fill={ACCENT}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.4 }}
        transition={{ duration: 0.35, delay: 1.0, ease: "easeOut" }}
        style={{ transformOrigin: "28px 40px" }}
      />
      {/* Bar 3 (tallest) */}
      <motion.rect
        x={33} y={21} width={5} height={19} rx={1} fill={ACCENT}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.5 }}
        transition={{ duration: 0.35, delay: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "35.5px 40px" }}
      />
      {/* X mark above tallest bar — rank 1 marker */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, delay: 1.5, type: "spring", stiffness: 350 }}
        style={{ transformOrigin: "35.5px 16px" }}
      >
        <line x1={33.5} y1={14} x2={37.5} y2={18} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={37.5} y1={14} x2={33.5} y2={18} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
      </motion.g>
      {/* X glow pulse */}
      <motion.circle
        cx={35.5} cy={16} r={5} fill="none" stroke={ACCENT} strokeWidth={0.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 2, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "35.5px 16px" }}
      />
    </svg>
  );
}

/* ─── Animated Counter Badge ──────────────────────────── */

export function AnimatedStatBadge({
  text,
  countFrom,
  countTo,
  suffix,
}: {
  text?: string;
  countFrom?: number;
  countTo?: number;
  suffix?: string;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(countFrom ?? 0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView || reduced || countTo === undefined || countFrom === undefined) return;
    const steps = countTo - countFrom;
    const stepDuration = 800 / steps;
    let current = countFrom;
    const interval = setInterval(() => {
      current++;
      setCount(current);
      if (current >= countTo) clearInterval(interval);
    }, stepDuration);
    return () => clearInterval(interval);
  }, [inView, reduced, countFrom, countTo]);

  const displayText = text || `${count}${suffix || ""}`;

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-40px" }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-flex items-center bg-accent/10 border border-accent/30 text-accent text-sm font-mono px-3 py-1 rounded-full"
      style={{ willChange: "opacity" }}
    >
      {/* Pulse glow on border */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={reduced ? {} : {
          boxShadow: [
            "0 0 0px rgba(123,53,255,0.1)",
            "0 0 8px rgba(123,53,255,0.35)",
            "0 0 0px rgba(123,53,255,0.1)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative z-[1]">{displayText}</span>
    </motion.div>
  );
}
