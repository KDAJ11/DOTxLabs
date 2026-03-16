"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";

/* ─── Shared ─────────────────────────────────────────── */

const ACCENT = "#7B35FF";
const SW = 1.5;
const STROKE = {
  stroke: ACCENT,
  strokeWidth: SW,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function XMark({ cx, cy, size, sw = SW }: { cx: number; cy: number; size: number; sw?: number }) {
  const h = size / 2;
  return (
    <>
      <line x1={cx - h} y1={cy - h} x2={cx + h} y2={cy + h} stroke={ACCENT} strokeWidth={sw} strokeLinecap="round" />
      <line x1={cx + h} y1={cy - h} x2={cx - h} y2={cy + h} stroke={ACCENT} strokeWidth={sw} strokeLinecap="round" />
    </>
  );
}

/* ─── 1. Excellence — Circle + Checkmark ────────────── */

function ExcellenceIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12 sm:w-12 sm:h-12" style={{ width: 48, height: 48 }}>
      {/* Circle */}
      <motion.circle
        cx={24} cy={24} r={18}
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* X briefly flashes then gets replaced by checkmark */}
      {!reduced && animate && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 0.8, delay: 0.4, times: [0, 0.2, 0.6, 1] }}
        >
          <XMark cx={24} cy={24} size={7} sw={1.2} />
        </motion.g>
      )}
      {/* Checkmark draws in after X disappears */}
      <motion.path
        d="M15 24 L21 30 L33 18"
        {...STROKE} strokeWidth={2}
        initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: reduced ? 0 : 1.1, ease: "easeOut" }}
      />
      {/* Soft glow loop on checkmark */}
      {!reduced && animate && (
        <motion.path
          d="M15 24 L21 30 L33 18"
          stroke={ACCENT} strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

/* ─── 2. Your Business — Interlocked Rings ──────────── */

function BusinessIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true" style={{ width: 48, height: 48 }}>
      {/* Left ring */}
      <motion.circle
        cx={19} cy={24} r={13}
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Right ring */}
      <motion.circle
        cx={29} cy={24} r={13}
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      />
      {/* X at intersection */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <XMark cx={24} cy={24} size={4} sw={1.3} />
      </motion.g>
      {/* Intersection X pulse */}
      {!reduced && animate && (
        <motion.g
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <XMark cx={24} cy={24} size={4} sw={0.6} />
        </motion.g>
      )}
    </svg>
  );
}

/* ─── 3. Build is Beginning — Rocket ────────────────── */

function RocketIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true" style={{ width: 48, height: 48 }}>
      {/* Rocket body */}
      <motion.path
        d="M24 8 C24 8 18 16 18 28 L24 34 L30 28 C30 16 24 8 24 8 Z"
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Left fin */}
      <motion.path
        d="M18 26 L12 32 L18 30"
        {...STROKE} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
      />
      {/* Right fin */}
      <motion.path
        d="M30 26 L36 32 L30 30"
        {...STROKE} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
      />
      {/* Exhaust flames */}
      <motion.path
        d="M21 34 L24 40 L27 34"
        {...STROKE} strokeWidth={1}
        initial={reduced ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.5 } : undefined}
        transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
      />
      {/* X on rocket body as DOTxLabs logo mark */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.25, delay: 0.7 }}
      >
        <XMark cx={24} cy={20} size={3.5} sw={1.2} />
      </motion.g>
      {/* Launch micro-bounce + altitude oscillation */}
      {!reduced && animate && (
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* invisible driver element */}
        </motion.g>
      )}
    </svg>
  );
}

/* ─── 4. AI Built In — Circuit Network ──────────────── */

function AiProcessIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  const nodes = [
    { cx: 24, cy: 24 }, // centre (X hub)
    { cx: 10, cy: 12 },
    { cx: 38, cy: 12 },
    { cx: 10, cy: 36 },
    { cx: 38, cy: 36 },
  ];

  const lines = [
    { x1: 24, y1: 24, x2: 10, y2: 12 },
    { x1: 24, y1: 24, x2: 38, y2: 12 },
    { x1: 24, y1: 24, x2: 10, y2: 36 },
    { x1: 24, y1: 24, x2: 38, y2: 36 },
  ];

  return (
    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true" style={{ width: 48, height: 48 }}>
      {/* Connection lines */}
      {lines.map((l, i) => (
        <motion.line
          key={`l-${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          {...STROKE} strokeWidth={1}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.3, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
      {/* Outer nodes */}
      {nodes.slice(1).map((n, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={n.cx} cy={n.cy} r={3.5}
          {...STROKE}
          initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.2, delay: 0.3 + i * 0.08 }}
        />
      ))}
      {/* Centre hub */}
      <motion.circle
        cx={24} cy={24} r={5}
        {...STROKE}
        initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.25, delay: 0.25 }}
      />
      {/* X as central processing node */}
      <XMark cx={24} cy={24} size={3} sw={1.2} />
      {/* Signal pulse */}
      {!reduced && animate && lines.map((l, i) => (
        <motion.circle
          key={`p-${i}`}
          r={1.2}
          fill={ACCENT} stroke="none"
          animate={{
            cx: [l.x1, l.x2, l.x1],
            cy: [l.y1, l.y2, l.y1],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ─── Icon Registry ──────────────────────────────────── */

const ICON_MAP: Record<string, React.ComponentType<{ animate: boolean; reduced: boolean }>> = {
  "Excellence is the baseline": ExcellenceIcon,
  "Your business is our business": BusinessIcon,
  "The build is just the beginning": RocketIcon,
  "AI built into the process": AiProcessIcon,
};

/* ─── Main Export ────────────────────────────────────── */

export default function AboutValueIcon({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const IconComponent = ICON_MAP[label];
  if (!IconComponent) return null;

  return (
    <div ref={ref} className="mb-3">
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <IconComponent animate={isInView === true} reduced={reduced === true} />
      </motion.div>
    </div>
  );
}
