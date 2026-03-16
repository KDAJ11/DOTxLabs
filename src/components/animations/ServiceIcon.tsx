"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";

/* ─── Types ──────────────────────────────────────────── */

type ServiceId =
  | "web-development"
  | "seo"
  | "ai-automation"
  | "brand-strategy"
  | "logo-design"
  | "digital-marketing"
  | "social-media-marketing"
  | "marketing-campaigns";

interface ServiceIconProps {
  service: string;
  isLight?: boolean;
}

/* ─── Shared constants ───────────────────────────────── */

const ACCENT = "#7B35FF";
const STROKE_WIDTH = 1.5;
const VIEW_BOX = "0 0 80 80";
const STROKE_PROPS = {
  stroke: ACCENT,
  strokeWidth: STROKE_WIDTH,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/* ─── Helper: X mark paths ───────────────────────────── */

function XMark({ cx, cy, size, strokeWidth = STROKE_WIDTH }: { cx: number; cy: number; size: number; strokeWidth?: number }) {
  const half = size / 2;
  return (
    <>
      <motion.line
        x1={cx - half} y1={cy - half} x2={cx + half} y2={cy + half}
        stroke={ACCENT} strokeWidth={strokeWidth} strokeLinecap="round"
      />
      <motion.line
        x1={cx + half} y1={cy - half} x2={cx - half} y2={cy + half}
        stroke={ACCENT} strokeWidth={strokeWidth} strokeLinecap="round"
      />
    </>
  );
}

/* ─── 1. Web Development — Browser with cursor ──────── */

function WebDevIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    if (reduced || !animate) return;
    const interval = setInterval(() => setLoopKey(k => k + 1), 2000);
    return () => clearInterval(interval);
  }, [reduced, animate]);

  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* Browser frame */}
      <motion.rect
        x={8} y={12} width={64} height={52} rx={6}
        {...STROKE_PROPS}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Title bar line */}
      <motion.line
        x1={8} y1={24} x2={72} y2={24}
        {...STROKE_PROPS}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      />
      {/* X favicon in chrome */}
      <XMark cx={15} cy={18} size={4} strokeWidth={1.2} />
      {/* Code lines */}
      <motion.line
        x1={16} y1={33} x2={38} y2={33}
        {...STROKE_PROPS} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
      />
      <motion.line
        x1={20} y1={40} x2={48} y2={40}
        {...STROKE_PROPS} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
      />
      <motion.line
        x1={20} y1={47} x2={42} y2={47}
        {...STROKE_PROPS} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.7, ease: "easeOut" }}
      />
      <motion.line
        x1={16} y1={54} x2={32} y2={54}
        {...STROKE_PROPS} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
      />
      {/* Blinking cursor */}
      {!reduced && animate && (
        <motion.line
          key={loopKey}
          x1={52} y1={39} x2={52} y2={47}
          stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
    </svg>
  );
}

/* ─── 2. SEO — Upward trending graph ────────────────── */

function SeoIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    if (reduced || !animate) return;
    const interval = setInterval(() => setShowGlow(g => !g), 3000);
    return () => clearInterval(interval);
  }, [reduced, animate]);

  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* Axes */}
      <motion.path
        d="M14 62 L14 18 M14 62 L68 62"
        {...STROKE_PROPS} strokeWidth={1.2}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      {/* Trend line */}
      <motion.path
        d="M18 55 L30 48 L42 42 L52 28 L62 20"
        {...STROKE_PROPS}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      />
      {/* Data points */}
      {[{ cx: 30, cy: 48 }, { cx: 42, cy: 42 }, { cx: 52, cy: 28 }].map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.cx} cy={pt.cy} r={2.5}
          fill={ACCENT} stroke="none"
          initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.2, delay: 0.7 + i * 0.1 }}
        />
      ))}
      {/* Peak node with X mark */}
      <motion.circle
        cx={62} cy={20} r={4}
        fill="none" stroke={ACCENT} strokeWidth={1}
        initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 1 }}
      />
      <XMark cx={62} cy={20} size={3} strokeWidth={1} />
      {/* Glow pulse at peak */}
      {!reduced && animate && (
        <motion.circle
          cx={62} cy={20} r={6}
          fill="none" stroke={ACCENT} strokeWidth={0.5}
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

/* ─── 3. AI Automation — Circuit network ────────────── */

function AiAutomationIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  // 5 nodes: centre + 4 around it
  const nodes = [
    { cx: 40, cy: 40 }, // centre (X hub)
    { cx: 20, cy: 22 },
    { cx: 60, cy: 22 },
    { cx: 22, cy: 58 },
    { cx: 58, cy: 58 },
  ];

  const lines = [
    { x1: 40, y1: 40, x2: 20, y2: 22 },
    { x1: 40, y1: 40, x2: 60, y2: 22 },
    { x1: 40, y1: 40, x2: 22, y2: 58 },
    { x1: 40, y1: 40, x2: 58, y2: 58 },
  ];

  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* Connection lines */}
      {lines.map((l, i) => (
        <motion.line
          key={`line-${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          {...STROKE_PROPS} strokeWidth={1}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.12, ease: "easeOut" }}
        />
      ))}
      {/* Outer nodes */}
      {nodes.slice(1).map((n, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={n.cx} cy={n.cy} r={5}
          fill="none" stroke={ACCENT} strokeWidth={STROKE_WIDTH}
          initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.25, delay: 0.4 + i * 0.1 }}
        />
      ))}
      {/* Centre hub with X */}
      <motion.circle
        cx={40} cy={40} r={7}
        fill="none" stroke={ACCENT} strokeWidth={STROKE_WIDTH}
        initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <XMark cx={40} cy={40} size={4} strokeWidth={1.2} />
      {/* Signal pulse along lines */}
      {!reduced && animate && lines.map((l, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={l.x1} cy={l.y1} r={1.5}
          fill={ACCENT} stroke="none"
          animate={{
            cx: [l.x1, l.x2, l.x1],
            cy: [l.y1, l.y2, l.y1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ─── 4. Brand Identity — Diamond/gem ───────────────── */

function BrandIdentityIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* Diamond shape */}
      <motion.path
        d="M40 12 L66 40 L40 68 L14 40 Z"
        {...STROKE_PROPS}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* Inner facet lines */}
      <motion.path
        d="M28 28 L52 28 M28 52 L52 52 M28 28 L40 12 M52 28 L40 12"
        {...STROKE_PROPS} strokeWidth={0.8}
        initial={reduced ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.4 } : undefined}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      />
      {/* X inscribed in centre */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <XMark cx={40} cy={40} size={6} strokeWidth={1.5} />
      </motion.g>
      {/* Shimmer sweep */}
      {!reduced && animate && (
        <motion.rect
          x={0} y={0} width={10} height={80}
          fill="url(#shimmer-brand)"
          animate={{ x: [-10, 90] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />
      )}
      <defs>
        <linearGradient id="shimmer-brand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(123,53,255,0)" />
          <stop offset="50%" stopColor="rgba(123,53,255,0.15)" />
          <stop offset="100%" stopColor="rgba(123,53,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── 5. Logo Design — Pen nib drawing X ────────────── */

function LogoDesignIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* Pen nib */}
      <motion.path
        d="M16 64 L12 68 L16 72 L22 66 Z"
        {...STROKE_PROPS} strokeWidth={1.2}
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      />
      {/* Pen body */}
      <motion.path
        d="M22 66 L56 32 M16 60 L50 26"
        {...STROKE_PROPS} strokeWidth={1}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      />
      {/* The drawn X — the path IS the X */}
      <motion.path
        d="M42 16 L64 54"
        stroke={ACCENT} strokeWidth={STROKE_WIDTH} strokeLinecap="round" fill="none"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M64 16 L42 54"
        stroke={ACCENT} strokeWidth={STROKE_WIDTH} strokeLinecap="round" fill="none"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
      />
      {/* Loop: X fades and redraws */}
      {!reduced && animate && (
        <motion.g
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1={42} y1={16} x2={64} y2={54} stroke={ACCENT} strokeWidth={0.5} strokeLinecap="round" opacity={0.3} />
          <line x1={64} y1={16} x2={42} y2={54} stroke={ACCENT} strokeWidth={0.5} strokeLinecap="round" opacity={0.3} />
        </motion.g>
      )}
    </svg>
  );
}

/* ─── 6. Digital Marketing — Broadcast arcs ─────────── */

function DigitalMarketingIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  const arcs = [
    "M28 52 A18 18 0 0 1 28 28",
    "M22 58 A28 28 0 0 1 22 22",
    "M16 64 A38 38 0 0 1 16 16",
  ];

  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* X at source point */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        <XMark cx={40} cy={40} size={5} strokeWidth={1.5} />
      </motion.g>
      {/* Broadcast arcs */}
      {arcs.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          {...STROKE_PROPS}
          transform="translate(20, 0)"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.35, delay: 0.3 + i * 0.15, ease: "easeOut" }}
        />
      ))}
      {/* Wave repeat loop */}
      {!reduced && animate && arcs.map((d, i) => (
        <motion.path
          key={`loop-${i}`}
          d={d}
          stroke={ACCENT} strokeWidth={0.8} strokeLinecap="round" fill="none"
          transform="translate(20, 0)"
          animate={{ opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* ─── 7. Social Media — Speech bubble ───────────────── */

function SocialMediaIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* Speech bubble */}
      <motion.path
        d="M16 18 h48 a4 4 0 0 1 4 4 v28 a4 4 0 0 1 -4 4 H32 l-10 10 v-10 H16 a4 4 0 0 1 -4 -4 V22 a4 4 0 0 1 4 -4 Z"
        {...STROKE_PROPS}
        initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={reduced ? undefined : { type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
      />
      {/* X drawn inside bubble */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <XMark cx={40} cy={36} size={8} strokeWidth={1.5} />
      </motion.g>
      {/* Bubble bounce loop */}
      {!reduced && animate && (
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Invisible container to drive the bounce */}
        </motion.g>
      )}
    </svg>
  );
}

/* ─── 8. Full Campaigns — Target/bullseye ───────────── */

function FullCampaignsIcon({ animate, reduced }: { animate: boolean; reduced: boolean }) {
  const rings = [10, 18, 26];

  return (
    <svg width={80} height={80} viewBox={VIEW_BOX} aria-hidden="true">
      {/* Rings from centre outward */}
      {rings.map((r, i) => (
        <motion.circle
          key={i}
          cx={40} cy={40} r={r}
          {...STROKE_PROPS} strokeWidth={i === 0 ? 1.5 : 1}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.4, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
      {/* X at bullseye centre */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.25, delay: 0.6 }}
      >
        <XMark cx={40} cy={40} size={5} strokeWidth={1.5} />
      </motion.g>
      {/* Crosshair pulse */}
      {!reduced && animate && (
        <motion.g
          animate={{ opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1={40} y1={10} x2={40} y2={28} stroke={ACCENT} strokeWidth={0.6} strokeLinecap="round" />
          <line x1={40} y1={52} x2={40} y2={70} stroke={ACCENT} strokeWidth={0.6} strokeLinecap="round" />
          <line x1={10} y1={40} x2={28} y2={40} stroke={ACCENT} strokeWidth={0.6} strokeLinecap="round" />
          <line x1={52} y1={40} x2={70} y2={40} stroke={ACCENT} strokeWidth={0.6} strokeLinecap="round" />
        </motion.g>
      )}
    </svg>
  );
}

/* ─── Icon registry ──────────────────────────────────── */

const ICON_MAP: Record<string, React.ComponentType<{ animate: boolean; reduced: boolean }>> = {
  "web-development": WebDevIcon,
  "seo": SeoIcon,
  "ai-automation": AiAutomationIcon,
  "brand-strategy": BrandIdentityIcon,
  "logo-design": LogoDesignIcon,
  "digital-marketing": DigitalMarketingIcon,
  "social-media-marketing": SocialMediaIcon,
  "marketing-campaigns": FullCampaignsIcon,
};

/* ─── Main ServiceIcon Component ─────────────────────── */

export default function ServiceIcon({ service, isLight = true }: ServiceIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const IconComponent = ICON_MAP[service];
  if (!IconComponent) return null;

  const shouldAnimate = isInView && !reduced;

  return (
    <div
      ref={ref}
      className="flex items-center justify-center"
      style={{ width: 80, height: 80, minWidth: 80 }}
    >
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
