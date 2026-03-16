"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ─── Constants ───────────────────────────────────────── */

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const STROKE_REST = "rgba(123, 53, 255, 0.35)";
const STROKE_ACTIVE = "rgba(123, 53, 255, 0.9)";

interface IconProps {
  isHovered: boolean;
  reduced: boolean;
}

/* ─── Shared hook: viewport enter tracking ────────────── */

function useIconView() {
  const [inView, setInView] = useState(false);
  return { inView, onEnter: () => setInView(true) };
}

/* ─── Icon 1: Browser + Cursor (Custom Web Development) ── */

function WebDevIcon({ isHovered, reduced }: IconProps) {
  const { inView, onEnter } = useIconView();
  const dur = isHovered ? 1.67 : 2.5;
  const show = inView || reduced;

  return (
    <motion.svg
      width={40} height={40} viewBox="0 0 48 48" fill="none" aria-hidden="true"
      onViewportEnter={onEnter}
      viewport={{ once: true, margin: "-40px" }}
      style={{ color: isHovered ? STROKE_ACTIVE : STROKE_REST, transition: "color 0.2s ease" }}
    >
      <motion.rect
        x={4} y={6} width={40} height={36} rx={3}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.line
        x1={4} y1={14} x2={44} y2={14}
        stroke="currentColor" strokeWidth={1.5}
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      />
      {/* X favicon in browser chrome */}
      <line x1={21} y1={8.5} x2={25} y2={11.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={25} y1={8.5} x2={21} y2={11.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      {/* Cursor arrow — blink loop */}
      <motion.path
        d="M 26 22 L 26 33 L 29.5 29.5 L 33.5 29.5 Z"
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none"
        animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

/* ─── Icon 2: Bar Chart (SEO Strategy) ───────────────── */

function SEOIcon({ isHovered, reduced }: IconProps) {
  const { inView, onEnter } = useIconView();
  const dur = isHovered ? 2 : 3;
  const show = inView || reduced;
  const bars = [
    { x: 13, y: 30, h: 10, delay: 0.1 },
    { x: 22, y: 22, h: 18, delay: 0.2 },
    { x: 31, y: 14, h: 26, delay: 0.3 },
  ];

  return (
    <motion.svg
      width={40} height={40} viewBox="0 0 48 48" fill="none" aria-hidden="true"
      onViewportEnter={onEnter}
      viewport={{ once: true, margin: "-40px" }}
      style={{ color: isHovered ? STROKE_ACTIVE : STROKE_REST, transition: "color 0.2s ease" }}
    >
      <line x1={8} y1={40} x2={40} y2={40} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x} y={bar.y} width={5} height={bar.h} rx={1}
          stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinejoin="round"
          initial={reduced ? {} : { scaleY: 0 }}
          animate={show ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: bar.delay, ease: "easeOut" }}
          style={{ transformOrigin: "50% 100%", transformBox: "fill-box" as const }}
        />
      ))}
      {/* X mark above tallest bar — subtle float loop */}
      <motion.g
        animate={reduced ? {} : { y: [0, -2, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1={31.5} y1={6} x2={35.5} y2={10} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <line x1={35.5} y1={6} x2={31.5} y2={10} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}

/* ─── Icon 3: Neural Network (AI Automation) ─────────── */

function AIIcon({ isHovered, reduced }: IconProps) {
  const { inView, onEnter } = useIconView();
  const dur = isHovered ? 1.33 : 2;
  const show = inView || reduced;
  const nodes = [
    { cx: 12, cy: 12 },
    { cx: 36, cy: 12 },
    { cx: 12, cy: 36 },
    { cx: 36, cy: 36 },
  ];

  return (
    <motion.svg
      width={40} height={40} viewBox="0 0 48 48" fill="none" aria-hidden="true"
      onViewportEnter={onEnter}
      viewport={{ once: true, margin: "-40px" }}
      style={{ color: isHovered ? STROKE_ACTIVE : STROKE_REST, transition: "color 0.2s ease" }}
    >
      {/* Connecting lines */}
      {nodes.map((n, i) => (
        <motion.line
          key={`l-${i}`}
          x1={24} y1={24} x2={n.cx} y2={n.cy}
          stroke="currentColor" strokeWidth={1.5}
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
        />
      ))}
      {/* Signal pulse traveling along lines */}
      {nodes.map((n, i) => (
        <motion.line
          key={`p-${i}`}
          x1={24} y1={24} x2={n.cx} y2={n.cy}
          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"
          strokeDasharray="4 44"
          animate={reduced ? {} : { strokeDashoffset: [48, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          style={{ opacity: 0.5 }}
        />
      ))}
      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={n.cx} cy={n.cy} r={3}
          stroke="currentColor" strokeWidth={1.5} fill="none"
          initial={reduced ? {} : { scale: 0 }}
          animate={show ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        />
      ))}
      {/* X as central hub node */}
      <motion.line
        x1={21} y1={21} x2={27} y2={27}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.line
        x1={27} y1={21} x2={21} y2={27}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

/* ─── Icon 4: Geometric Diamond (Brand Identity) ─────── */

function BrandIcon({ isHovered, reduced }: IconProps) {
  const { inView, onEnter } = useIconView();
  const dur = isHovered ? 2.67 : 4;
  const show = inView || reduced;

  return (
    <motion.svg
      width={40} height={40} viewBox="0 0 48 48" fill="none" aria-hidden="true"
      onViewportEnter={onEnter}
      viewport={{ once: true, margin: "-40px" }}
      style={{ color: isHovered ? STROKE_ACTIVE : STROKE_REST, transition: "color 0.2s ease" }}
    >
      <motion.path
        d="M 24 4 L 44 24 L 24 44 L 4 24 Z"
        stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {/* X inscribed inside diamond */}
      <motion.line
        x1={15} y1={15} x2={33} y2={33}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      />
      <motion.line
        x1={33} y1={15} x2={15} y2={33}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
      />
      {/* Shimmer sweep — dashed stroke orbits the diamond */}
      <motion.path
        d="M 24 4 L 44 24 L 24 44 L 4 24 Z"
        stroke="currentColor" strokeWidth={2} strokeLinejoin="round"
        strokeDasharray="8 160"
        animate={reduced ? {} : { strokeDashoffset: [0, -168] }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.4 }}
      />
    </motion.svg>
  );
}

/* ─── Icon 5: Broadcast Arcs (Digital Marketing) ─────── */

function MarketingIcon({ isHovered, reduced }: IconProps) {
  const { inView, onEnter } = useIconView();
  const dur = isHovered ? 1.33 : 2;
  const show = inView || reduced;
  const arcs = [
    { d: "M 10 14 A 24 24 0 0 1 34 38", delay: 0 },
    { d: "M 10 21 A 17 17 0 0 1 27 38", delay: 0.15 },
    { d: "M 10 28 A 10 10 0 0 1 20 38", delay: 0.3 },
  ];

  return (
    <motion.svg
      width={40} height={40} viewBox="0 0 48 48" fill="none" aria-hidden="true"
      onViewportEnter={onEnter}
      viewport={{ once: true, margin: "-40px" }}
      style={{ color: isHovered ? STROKE_ACTIVE : STROKE_REST, transition: "color 0.2s ease" }}
    >
      {/* X at arc origin */}
      <line x1={8} y1={35} x2={14} y2={41} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={14} y1={35} x2={8} y2={41} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      {/* Signal arcs — draw outer→inner */}
      {arcs.map((arc, i) => (
        <motion.path
          key={i}
          d={arc.d}
          stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" fill="none"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: arc.delay, ease: "easeOut" }}
        />
      ))}
      {/* Pulse on arcs — staggered opacity */}
      {arcs.map((arc, i) => (
        <motion.path
          key={`p-${i}`}
          d={arc.d}
          stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none"
          animate={reduced ? {} : { opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </motion.svg>
  );
}

/* ─── Icon 6: Target Rings (Full Campaigns) ──────────── */

function CampaignIcon({ isHovered, reduced }: IconProps) {
  const { inView, onEnter } = useIconView();
  const dur = isHovered ? 2 : 3;
  const show = inView || reduced;

  return (
    <motion.svg
      width={40} height={40} viewBox="0 0 48 48" fill="none" aria-hidden="true"
      onViewportEnter={onEnter}
      viewport={{ once: true, margin: "-40px" }}
      style={{ color: isHovered ? STROKE_ACTIVE : STROKE_REST, transition: "color 0.2s ease" }}
    >
      {/* Inner ring */}
      <motion.circle
        cx={24} cy={24} r={10}
        stroke="currentColor" strokeWidth={1.5} fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Outer ring */}
      <motion.circle
        cx={24} cy={24} r={18}
        stroke="currentColor" strokeWidth={1.5} fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />
      {/* X at bullseye centre — pulse loop */}
      <motion.g
        animate={reduced ? {} : { scale: [1, 1.15, 1] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "24px 24px" }}
      >
        <line x1={21} y1={21} x2={27} y2={27} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <line x1={27} y1={21} x2={21} y2={27} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}

/* ─── SVG Pattern Backgrounds ────────────────────────── */

function PatternGrid() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="pat-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="12" y2="0" stroke="#7B35FF" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="12" stroke="#7B35FF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pat-grid)" />
    </svg>
  );
}

function PatternDiagonal() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="pat-diag" width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="8" x2="8" y2="0" stroke="#7B35FF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pat-diag)" />
    </svg>
  );
}

function PatternDots() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="pat-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="#7B35FF" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pat-dots)" />
    </svg>
  );
}

function PatternDiamond() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="pat-diamond" width="20" height="20" patternUnits="userSpaceOnUse">
          <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="#7B35FF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pat-diamond)" />
    </svg>
  );
}

function PatternWaves() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="pat-waves" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 40 A 20 20 0 0 1 20 20" fill="none" stroke="#7B35FF" strokeWidth="0.5" />
          <path d="M 0 40 A 30 30 0 0 1 30 10" fill="none" stroke="#7B35FF" strokeWidth="0.5" />
          <path d="M 0 40 A 40 40 0 0 1 40 0" fill="none" stroke="#7B35FF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pat-waves)" />
    </svg>
  );
}

function PatternTarget() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="pat-target" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="6" fill="none" stroke="#7B35FF" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="#7B35FF" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="18" fill="none" stroke="#7B35FF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pat-target)" />
    </svg>
  );
}

const PATTERN_MAP: Record<string, React.ComponentType> = {
  "Custom Web Development": PatternGrid,
  "SEO Strategy": PatternDiagonal,
  "AI Automation": PatternDots,
  "Brand Identity": PatternDiamond,
  "Digital Marketing": PatternWaves,
  "Full Campaigns": PatternTarget,
};

/* ─── Card Data ───────────────────────────────────────── */

type IconComponent = React.ComponentType<IconProps>;

type CardPosition = "left" | "right";

interface BentoCardData {
  title: string;
  description: string;
  gradient: string;
  Icon: IconComponent;
  position: CardPosition;
}

const BENTO_CARDS: BentoCardData[] = [
  {
    title: "Custom Web Development",
    description: "React, Next.js, and Shopify — built from scratch for performance and conversion.",
    gradient: "from-accent/10 via-accent/5 to-transparent",
    Icon: WebDevIcon,
    position: "left",
  },
  {
    title: "SEO Strategy",
    description: "Technical and content SEO built into every project from day one.",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    Icon: SEOIcon,
    position: "right",
  },
  {
    title: "AI Automation",
    description: "Chatbots, workflow automation, and AI tools integrated into your stack.",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    Icon: AIIcon,
    position: "left",
  },
  {
    title: "Brand Identity",
    description: "Logo, color systems, typography, and full brand guidelines that resonate.",
    gradient: "from-purple-400/10 via-purple-400/5 to-transparent",
    Icon: BrandIcon,
    position: "right",
  },
  {
    title: "Digital Marketing",
    description: "PPC, email sequences, and content campaigns driving measurable ROI.",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    Icon: MarketingIcon,
    position: "left",
  },
  {
    title: "Full Campaigns",
    description: "Multi-channel strategy and execution unified under one roof.",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    Icon: CampaignIcon,
    position: "right",
  },
];

/* ─── BentoCard ───────────────────────────────────────── */

function BentoCard({
  card,
  reduced,
  canHover,
  isMobile,
}: {
  card: BentoCardData;
  reduced: boolean;
  canHover: boolean;
  isMobile: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.Icon;
  const showCTA = !canHover || reduced || isHovered;
  const Pattern = PATTERN_MAP[card.title];
  const isLeft = card.position === "left";
  const iconSize = isLeft ? 52 : 40;

  const cardContent = (
    <motion.div
      onHoverStart={() => canHover && !reduced && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={
        reduced
          ? undefined
          : {
              y: -4,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(123, 53, 255, 0.2)",
              transition: { type: "spring", stiffness: 300, damping: 25 },
            }
      }
      /* Mobile breathing pulse */
      animate={
        isMobile && !reduced
          ? {
              boxShadow: [
                "0 0 0px rgba(123,53,255,0)",
                "0 0 12px rgba(123,53,255,0.3)",
                "0 0 0px rgba(123,53,255,0)",
              ],
            }
          : undefined
      }
      transition={
        isMobile && !reduced
          ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      className={`relative overflow-hidden rounded-2xl flex flex-col justify-end h-full ${
        isLeft ? "lg:p-8 p-6" : "lg:p-5 p-6"
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        willChange: "transform, opacity",
        touchAction: "manipulation",
      }}
    >
      {/* SVG pattern background — unique per card */}
      {Pattern && (
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0">
          <Pattern />
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none z-0`}
      />

      {/* Animated icon */}
      <div
        className="absolute top-4 right-4 z-[1]"
        style={{
          width: iconSize,
          height: iconSize,
          transform: isLeft ? "scale(1.3)" : undefined,
          transformOrigin: "top right",
        }}
      >
        <Icon isHovered={isHovered} reduced={reduced} />
      </div>

      {/* Content */}
      <div className="relative z-[1]">
        <h3 className="text-lg font-bold text-white">{card.title}</h3>
        <p className="mt-2 text-sm text-white/45 leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* "View Service →" CTA — hidden on mobile, slides up on hover on desktop */}
      <motion.div
        className="hidden md:block absolute bottom-4 left-6 z-[2]"
        initial={canHover && !reduced ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        animate={
          showCTA
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 10 }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Link
          href="/services"
          className="text-xs font-medium"
          style={{ color: "var(--accent, #7B35FF)" }}
        >
          View Service →
        </Link>
      </motion.div>
    </motion.div>
  );

  /* Mobile: entire card is a Link (tap target) */
  if (isMobile) {
    return (
      <Link href="/services" className="block h-full" aria-label={`${card.title} — View Service`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

/* ─── BentoGrid ───────────────────────────────────────── */

export default function BentoGrid({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [canHover, setCanHover] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 20 },
    visible: reduced
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: EASE_SMOOTH,
          },
        },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {BENTO_CARDS.map((card) => {
        const isLeft = card.position === "left";
        return (
          <motion.div
            key={card.title}
            variants={cardVariants}
            className={isLeft ? "lg:col-span-2" : "lg:col-span-1"}
            style={{
              minHeight: isLeft ? 220 : 180,
            }}
          >
            <BentoCard
              card={card}
              reduced={!!reduced}
              canHover={canHover}
              isMobile={isMobile}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
