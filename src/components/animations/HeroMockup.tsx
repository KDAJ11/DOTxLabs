"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─── Inline X mark SVG (brand favicon) ─────────────── */
function XFavicon({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <line x1="2" y1="2" x2="8" y2="8" stroke="#7B35FF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="2" x2="2" y2="8" stroke="#7B35FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Inline X mark for stats ───────────────────────── */
function XMark() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="flex-none"
    >
      <line x1="3" y1="3" x2="11" y2="11" stroke="#7B35FF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="3" x2="3" y2="11" stroke="#7B35FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Mini-site Thumbnail Layouts ───────────────────── */

function ThumbnailHero() {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      {/* Header bar */}
      <div className="flex items-center gap-1.5 mb-1">
        <XFavicon size={8} />
        <div className="h-1.5 w-12 rounded-full bg-white/10" />
        <div className="ml-auto flex gap-1">
          <div className="h-1.5 w-6 rounded-full bg-white/8" />
          <div className="h-1.5 w-6 rounded-full bg-white/8" />
        </div>
      </div>
      {/* Hero block */}
      <div className="flex-1 rounded-lg bg-gradient-to-br from-[#7B35FF]/15 to-[#7B35FF]/5 flex flex-col justify-center items-center gap-1.5 p-3">
        <div className="h-2 w-3/4 rounded-full bg-white/12" />
        <div className="h-1.5 w-1/2 rounded-full bg-white/8" />
        <div className="h-4 w-16 rounded-md bg-[#7B35FF]/30 mt-1" />
      </div>
      {/* Two columns */}
      <div className="flex gap-2">
        <div className="flex-1 h-10 rounded-md bg-white/5 p-1.5 flex flex-col gap-1">
          <div className="h-1 w-full rounded-full bg-white/10" />
          <div className="h-1 w-3/4 rounded-full bg-white/6" />
        </div>
        <div className="flex-1 h-10 rounded-md bg-white/5 p-1.5 flex flex-col gap-1">
          <div className="h-1 w-full rounded-full bg-white/10" />
          <div className="h-1 w-2/3 rounded-full bg-white/6" />
        </div>
      </div>
    </div>
  );
}

function ThumbnailEditorial() {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      {/* Header bar */}
      <div className="flex items-center gap-1.5 mb-1">
        <XFavicon size={8} />
        <div className="h-1.5 w-10 rounded-full bg-white/10" />
        <div className="ml-auto flex gap-1">
          <div className="h-1.5 w-5 rounded-full bg-white/8" />
          <div className="h-1.5 w-5 rounded-full bg-white/8" />
          <div className="h-1.5 w-5 rounded-full bg-white/8" />
        </div>
      </div>
      {/* Editorial body with sidebar */}
      <div className="flex-1 flex gap-2">
        {/* Main content */}
        <div className="flex-[2] flex flex-col gap-1.5">
          <div className="h-2.5 w-4/5 rounded-full bg-white/12" />
          <div className="h-1.5 w-full rounded-full bg-white/6" />
          <div className="h-1.5 w-full rounded-full bg-white/6" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/6" />
          <div className="h-1.5 w-full rounded-full bg-white/6 mt-1" />
          <div className="h-1.5 w-5/6 rounded-full bg-white/6" />
          <div className="h-1.5 w-full rounded-full bg-white/6" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/6" />
        </div>
        {/* Sidebar */}
        <div className="flex-[1] flex flex-col gap-1.5 pl-2 border-l border-white/5">
          <div className="h-1.5 w-full rounded-full bg-[#7B35FF]/20" />
          <div className="h-8 w-full rounded-md bg-white/5" />
          <div className="h-1 w-3/4 rounded-full bg-white/6" />
          <div className="h-1 w-full rounded-full bg-white/6" />
        </div>
      </div>
    </div>
  );
}

function ThumbnailCardGrid() {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      {/* Header bar */}
      <div className="flex items-center gap-1.5 mb-1">
        <XFavicon size={8} />
        <div className="h-1.5 w-14 rounded-full bg-white/10" />
        <div className="ml-auto">
          <div className="h-3 w-3 rounded-full bg-[#7B35FF]/20" />
        </div>
      </div>
      {/* Section title */}
      <div className="h-2 w-1/3 rounded-full bg-white/10" />
      {/* Card grid */}
      <div className="flex-1 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md bg-white/5 border border-white/5 p-1.5 flex flex-col gap-1">
            <div className="h-6 rounded bg-gradient-to-br from-[#7B35FF]/10 to-transparent" />
            <div className="h-1 w-full rounded-full bg-white/10" />
            <div className="h-1 w-3/4 rounded-full bg-white/6" />
            <div className="h-1 w-1/2 rounded-full bg-white/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

const THUMBNAILS = [ThumbnailHero, ThumbnailEditorial, ThumbnailCardGrid];

const STATS = [
  "50+ Sites Launched",
  "Avg 2.1s Load Time",
  "SEO Built-In From Day 1",
];

/* ─── Main HeroMockup Component ─────────────────────── */

export default function HeroMockup() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % THUMBNAILS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const CurrentThumbnail = THUMBNAILS[activeIndex];

  return (
    <motion.div
      className="relative"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating badge */}
      <motion.div
        className="absolute -top-4 -left-3 z-20"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 10 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.8,
        }}
        style={{ rotate: "-3deg" }}
      >
        <div className="flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm px-3 py-1.5">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#7B35FF]"
            animate={prefersReducedMotion ? {} : { opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-xs font-semibold text-white/80" style={{ letterSpacing: "0.08em" }}>
            AI-First
          </span>
        </div>
      </motion.div>

      {/* Float animation wrapper */}
      <motion.div
        animate={
          prefersReducedMotion || isHovered
            ? {}
            : { y: [0, -8, 0] }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Browser chrome frame */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 0 40px rgba(123,53,255,0.08)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Traffic light dots */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(123,53,255,0.6)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(123,53,255,0.35)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(123,53,255,0.2)" }} />
            </div>
            {/* URL bar */}
            <div className="flex-1 ml-3">
              <div
                className="h-5 rounded-md flex items-center px-2 gap-1.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500/40" />
                <div className="h-1.5 w-20 rounded-full bg-white/10" />
              </div>
            </div>
          </div>

          {/* Content area — carousel */}
          <div className="relative w-full" style={{ height: 200 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <CurrentThumbnail />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Micro-stats */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat}
            className="flex items-center gap-1.5"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: prefersReducedMotion ? 0 : 0.8 + i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <XMark />
            <span className="text-xs font-medium text-white/50">{stat}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
