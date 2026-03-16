"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";

const ACCENT = "#7B35FF";
const SW = 1.5;
const STROKE = {
  stroke: ACCENT,
  strokeWidth: SW,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/* ─── 1. Excellence — Trophy with X inscribed ───────── */

function ExcellenceIconInner({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true" style={{ width: 48, height: 48 }}>
      {/* Cup body */}
      <motion.path
        d="M14 10 L14 24 C14 32 20 36 24 36 C28 36 34 32 34 24 L34 10 Z"
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Left handle */}
      <motion.path
        d="M14 14 C8 14 6 18 8 22 C10 26 14 26 14 22"
        {...STROKE} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.35, delay: 0.4, ease: "easeOut" }}
      />
      {/* Right handle */}
      <motion.path
        d="M34 14 C40 14 42 18 40 22 C38 26 34 26 34 22"
        {...STROKE} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
      />
      {/* Stem */}
      <motion.line
        x1={24} y1={36} x2={24} y2={40}
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.2, delay: 0.65, ease: "easeOut" }}
      />
      {/* Base */}
      <motion.line
        x1={18} y1={40} x2={30} y2={40}
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.25, delay: 0.75, ease: "easeOut" }}
      />
      {/* X inscribed at centre of cup */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.25, delay: 0.9, type: "spring", stiffness: 350 }}
        style={{ transformOrigin: "24px 22px" }}
      >
        <line x1={20.5} y1={18.5} x2={27.5} y2={25.5} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={27.5} y1={18.5} x2={20.5} y2={25.5} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
      </motion.g>
      {/* Shimmer sweep — a vertical highlight line sweeping across the cup */}
      {!reduced && animate && (
        <motion.line
          x1={24} y1={10} x2={24} y2={36}
          stroke={ACCENT}
          strokeWidth={0.6}
          strokeLinecap="round"
          animate={{
            x1: [14, 34, 14],
            x2: [14, 34, 14],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

/* ─── 2. Your Business — Venn Diagram with X ─────────── */

function VennIconInner({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true" style={{ width: 48, height: 48 }}>
      {/* Left circle */}
      <motion.circle
        cx={20} cy={24} r={14}
        {...STROKE}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Right circle */}
      <motion.circle
        cx={28} cy={24} r={14}
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
        style={{ transformOrigin: "24px 24px" }}
      >
        <line x1={21} y1={21} x2={27} y2={27} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
        <line x1={27} y1={21} x2={21} y2={27} stroke={ACCENT} strokeWidth={1.3} strokeLinecap="round" />
      </motion.g>
      {/* Intersection X pulse glow */}
      {!reduced && animate && (
        <motion.g
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "24px 24px" }}
        >
          <line x1={21} y1={21} x2={27} y2={27} stroke={ACCENT} strokeWidth={0.6} strokeLinecap="round" />
          <line x1={27} y1={21} x2={21} y2={27} stroke={ACCENT} strokeWidth={0.6} strokeLinecap="round" />
        </motion.g>
      )}
      {/* Intersection fill hint */}
      {!reduced && animate && (
        <motion.circle
          cx={24} cy={24} r={6}
          fill="none" stroke={ACCENT} strokeWidth={0.4}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

/* ─── 3. The Build — Rocket (reused from AboutValueIcons pattern) ── */

function RocketIconInner({ animate, reduced }: { animate: boolean; reduced: boolean }) {
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
      {/* X on rocket body */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.25, delay: 0.7 }}
      >
        <line x1={21.5} y1={17.5} x2={26.5} y2={22.5} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={26.5} y1={17.5} x2={21.5} y2={22.5} stroke={ACCENT} strokeWidth={1.2} strokeLinecap="round" />
      </motion.g>
      {/* Altitude float */}
      {!reduced && animate && (
        <>
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Flame flicker */}
          <motion.path
            d="M22 34 L24 42 L26 34"
            stroke={ACCENT} strokeWidth={0.6} strokeLinecap="round" fill="none"
            animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "24px 34px" }}
          />
        </>
      )}
    </svg>
  );
}

/* ─── Icon Registry ──────────────────────────────────── */

const PROOF_ICON_MAP: Record<string, React.ComponentType<{ animate: boolean; reduced: boolean }>> = {
  "Excellence is the baseline": ExcellenceIconInner,
  "Your business is our business": VennIconInner,
  "The build is just the beginning": RocketIconInner,
};

/* ─── Main Export — self-contained scroll-trigger wrapper ── */

export default function ProofStripIcon({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  const IconComponent = PROOF_ICON_MAP[label];
  if (!IconComponent) return null;

  return (
    <div ref={ref} className="flex-shrink-0">
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
