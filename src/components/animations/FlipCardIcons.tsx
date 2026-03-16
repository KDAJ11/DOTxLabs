"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useCallback } from "react";

/* ─── Shared constants ──────────────────────────────── */

const ACCENT = "#7B35FF";
const SW = 1.5;
const FILL_INTERIOR = "rgba(255,255,255,0.12)";
const LOOP_INTERVAL = 6000; // 6 seconds total loop
const DRAW_DURATION = 2; // 2s draw phase
const PAUSE_BEFORE_REPLAY = 1; // 1s pause after draw completes

const STROKE_BASE = {
  stroke: ACCENT,
  strokeWidth: SW,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ─── Loop key hook — increments every 6s to force replay ─ */

function useLoopKey(isActive: boolean, reduced: boolean) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isActive || reduced) return;
    const interval = setInterval(() => {
      setKey((k) => k + 1);
    }, LOOP_INTERVAL);
    return () => clearInterval(interval);
  }, [isActive, reduced]);

  // Reset key when isActive changes to true
  useEffect(() => {
    if (isActive && !reduced) {
      setKey((k) => k + 1);
    }
  }, [isActive, reduced]);

  return key;
}

/* ─── 1. BUILD — Browser window building itself ─────── */

export function BuildIcon({ isFlipped }: { isFlipped: boolean }) {
  const reduced = useReducedMotion();
  const loopKey = useLoopKey(isFlipped, !!reduced);
  const show = isFlipped;

  if (reduced) {
    return (
      <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden="true">
        {/* Browser frame */}
        <rect x={4} y={6} width={48} height={44} rx={4} fill={FILL_INTERIOR} {...STROKE_BASE} />
        <line x1={4} y1={16} x2={52} y2={16} {...STROKE_BASE} />
        {/* Traffic dots — X replaces red */}
        <line x1={9} y1={9.5} x2={12} y2={12.5} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={12} y1={9.5} x2={9} y2={12.5} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <circle cx={18} cy={11} r={1.5} fill={ACCENT} opacity={0.5} />
        <circle cx={24} cy={11} r={1.5} fill={ACCENT} opacity={0.5} />
        {/* Content blocks */}
        <rect x={10} y={21} width={28} height={3} rx={1.5} fill={ACCENT} opacity={0.4} />
        <rect x={10} y={28} width={36} height={3} rx={1.5} fill={ACCENT} opacity={0.3} />
        <rect x={10} y={35} width={32} height={3} rx={1.5} fill={ACCENT} opacity={0.3} />
      </svg>
    );
  }

  return (
    <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden="true" key={loopKey}>
      {/* Browser frame */}
      <motion.rect
        x={4} y={6} width={48} height={44} rx={4}
        fill={FILL_INTERIOR} {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Address bar line */}
      <motion.line
        x1={4} y1={16} x2={52} y2={16}
        {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
      />
      {/* X favicon in tab area (replaces red traffic dot) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.5 }}
      >
        <line x1={9} y1={9.5} x2={12} y2={12.5} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={12} y1={9.5} x2={9} y2={12.5} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
      </motion.g>
      {/* Green and yellow traffic dots */}
      <motion.circle cx={18} cy={11} r={1.5} fill={ACCENT} initial={{ opacity: 0 }} animate={show ? { opacity: 0.5 } : {}} transition={{ delay: 0.55 }} />
      <motion.circle cx={24} cy={11} r={1.5} fill={ACCENT} initial={{ opacity: 0 }} animate={show ? { opacity: 0.5 } : {}} transition={{ delay: 0.6 }} />

      {/* Content block 1 — header bar */}
      <motion.rect
        x={10} y={21} width={28} height={3} rx={1.5}
        fill={ACCENT}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={show ? { opacity: 0.4, scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "10px 22.5px" }}
      />
      {/* Content block 2 — body line 1 */}
      <motion.rect
        x={10} y={28} width={36} height={3} rx={1.5}
        fill={ACCENT}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={show ? { opacity: 0.3, scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
        style={{ transformOrigin: "10px 29.5px" }}
      />
      {/* Content block 3 — body line 2 */}
      <motion.rect
        x={10} y={35} width={32} height={3} rx={1.5}
        fill={ACCENT}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={show ? { opacity: 0.3, scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.4, ease: "easeOut" }}
        style={{ transformOrigin: "10px 36.5px" }}
      />
      {/* Cursor blink after build completes */}
      <motion.rect
        x={43} y={35} width={1.5} height={3} rx={0.5}
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: [0, 0, 0.6, 0.6, 0] } : {}}
        transition={{ duration: 1.5, delay: 1.8, times: [0, 0.1, 0.2, 0.8, 1], repeat: Infinity }}
      />
    </svg>
  );
}

/* ─── 2. GROW — Line graph climbing ─────────────────── */

export function GrowIcon({ isFlipped }: { isFlipped: boolean }) {
  const reduced = useReducedMotion();
  const loopKey = useLoopKey(isFlipped, !!reduced);
  const show = isFlipped;

  if (reduced) {
    return (
      <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden="true">
        {/* Axes */}
        <line x1={10} y1={8} x2={10} y2={48} {...STROKE_BASE} />
        <line x1={10} y1={48} x2={50} y2={48} {...STROKE_BASE} />
        {/* Growth line */}
        <polyline
          points="10,44 20,38 30,30 40,18 48,10"
          fill="none" {...STROKE_BASE} strokeWidth={1.8}
        />
        {/* X mark at peak */}
        <line x1={45} y1={7} x2={51} y2={13} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={51} y1={7} x2={45} y2={13} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden="true" key={loopKey}>
      {/* Y-axis */}
      <motion.line
        x1={10} y1={8} x2={10} y2={48}
        {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      {/* X-axis */}
      <motion.line
        x1={10} y1={48} x2={50} y2={48}
        {...STROKE_BASE}
        initial={{ pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      />
      {/* Grid lines — faint */}
      {[18, 28, 38].map((y, i) => (
        <motion.line
          key={y}
          x1={10} y1={y} x2={50} y2={y}
          stroke={ACCENT} strokeWidth={0.3} strokeDasharray="2 4"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 0.3 } : {}}
          transition={{ delay: 0.5 + i * 0.1 }}
        />
      ))}
      {/* Growth line — climbs steeply */}
      <motion.polyline
        points="10,44 20,38 30,30 40,18 48,10"
        fill="none" {...STROKE_BASE} strokeWidth={1.8}
        initial={{ pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
      />
      {/* Faint area fill under the line */}
      <motion.polygon
        points="10,44 20,38 30,30 40,18 48,10 48,48 10,48"
        fill={ACCENT}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 0.06 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      />
      {/* X mark node at peak — pulses */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.5, type: "spring", stiffness: 300 }}
        style={{ transformOrigin: "48px 10px" }}
      >
        <line x1={45} y1={7} x2={51} y2={13} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={51} y1={7} x2={45} y2={13} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
      </motion.g>
      {/* X node glow pulse */}
      <motion.circle
        cx={48} cy={10} r={6}
        fill="none" stroke={ACCENT} strokeWidth={0.5}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: [0, 0.4, 0], scale: [0.8, 1.3, 0.8] } : {}}
        transition={{ duration: 2, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "48px 10px" }}
      />
    </svg>
  );
}

/* ─── 3. AUTOMATE — Circuit board with signal ────────── */

export function AutomateIcon({ isFlipped }: { isFlipped: boolean }) {
  const reduced = useReducedMotion();
  const loopKey = useLoopKey(isFlipped, !!reduced);
  const show = isFlipped;

  const nodes = [
    { cx: 12, cy: 12 }, // top-left
    { cx: 44, cy: 12 }, // top-right
    { cx: 12, cy: 44 }, // bottom-left
    { cx: 44, cy: 44 }, // bottom-right
  ];

  const lines = nodes.map((n) => ({
    x1: 28, y1: 28, x2: n.cx, y2: n.cy,
  }));

  if (reduced) {
    return (
      <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden="true">
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} {...STROKE_BASE} strokeWidth={1} />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r={4} fill={FILL_INTERIOR} {...STROKE_BASE} />
        ))}
        {/* Central X hub */}
        <circle cx={28} cy={28} r={7} fill={FILL_INTERIOR} {...STROKE_BASE} />
        <line x1={24.5} y1={24.5} x2={31.5} y2={31.5} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={31.5} y1={24.5} x2={24.5} y2={31.5} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden="true" key={loopKey}>
      {/* Connection lines — draw sequentially */}
      {lines.map((l, i) => (
        <motion.line
          key={`line-${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          {...STROKE_BASE} strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: 0.3, delay: i * 0.12, ease: "easeOut" }}
        />
      ))}
      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={n.cx} cy={n.cy} r={4}
          fill={FILL_INTERIOR} {...STROKE_BASE}
          initial={{ scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.25, delay: 0.5 + i * 0.08, type: "spring", stiffness: 300 }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        />
      ))}
      {/* Central X hub — circle */}
      <motion.circle
        cx={28} cy={28} r={7}
        fill={FILL_INTERIOR} {...STROKE_BASE}
        initial={{ scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.4, type: "spring", stiffness: 300 }}
        style={{ transformOrigin: "28px 28px" }}
      />
      {/* X mark inside central hub */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <line x1={24.5} y1={24.5} x2={31.5} y2={31.5} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={31.5} y1={24.5} x2={24.5} y2={31.5} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
      </motion.g>
      {/* Central hub glow pulse */}
      <motion.circle
        cx={28} cy={28} r={7}
        fill="none" stroke={ACCENT} strokeWidth={0.6}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: [0.2, 0.6, 0.2] } : {}}
        transition={{ duration: 2, delay: 1.0, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Signal traveling along lines */}
      {lines.map((l, i) => (
        <motion.circle
          key={`signal-${i}`}
          r={1.8}
          fill={ACCENT} stroke="none"
          initial={{ opacity: 0 }}
          animate={show ? {
            cx: [l.x1, l.x2],
            cy: [l.y1, l.y2],
            opacity: [0, 0.8, 0.8, 0],
          } : {}}
          transition={{
            duration: 1.2,
            delay: 1.0 + i * 0.3,
            repeat: Infinity,
            repeatDelay: LOOP_INTERVAL / 1000 - 1.2 - i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
