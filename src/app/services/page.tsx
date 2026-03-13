"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { SERVICES } from "@/lib/data";
import type { ServiceCategory } from "@/lib/data";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";

const CATEGORY_ACCENT: Record<ServiceCategory, string> = {
  Design: "text-purple-400",
  Marketing: "text-blue-400",
  Technology: "text-emerald-400",
};

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_WORDS = "Everything Your Brand Needs".split(" ");

/* ─── Section orb configs per service index ─────────── */
const DARK_ORB_CONFIGS = [
  // Index 1 (SEO) — top-right, purple, 18s
  { top: "10%", right: "8%", width: 350, height: 350, color: "rgba(124,58,237,0.15)", duration: "18s" },
  // Index 3 (Brand Strategy) — centered-right, violet, 20s
  { top: "40%", right: "5%", width: 300, height: 300, color: "rgba(139,92,246,0.12)", duration: "20s" },
  // Index 5 (Digital Marketing) — bottom-left, indigo, 22s
  { bottom: "10%", left: "5%", width: 400, height: 400, color: "rgba(99,102,241,0.12)", duration: "22s" },
  // Index 7 (Marketing Campaigns) — two orbs, 16s/24s
  { top: "15%", left: "8%", width: 250, height: 250, color: "rgba(124,58,237,0.1)", duration: "16s" },
];

/* ─── Animated service section content ──────────────── */

function ServiceContent({ service, isEven, index }: { service: typeof SERVICES[number]; isEven: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const shouldAnimate = inView && !reduced;

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Text column — slides in from left */}
      <motion.div
        initial={reduced ? undefined : { x: -32, opacity: 0 }}
        animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
      >
        <p
          className={`text-xs font-semibold uppercase ${
            isEven ? "text-accent" : CATEGORY_ACCENT[service.category]
          }`}
          style={{ letterSpacing: "0.15em" }}
        >
          {service.category}
        </p>
        <h2
          className={`mt-3 text-3xl sm:text-4xl font-display font-black leading-tight ${
            isEven ? "text-hero" : "text-white"
          }`}
        >
          {service.headline}
        </h2>
        <p
          className={`mt-4 text-base ${
            isEven ? "text-hero/60" : "text-white/50"
          }`}
          style={{ lineHeight: 1.6 }}
        >
          {service.description}
        </p>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-all duration-300 min-h-[44px] hover:shadow-[0_0_24px_rgba(147,51,234,0.5),0_0_48px_rgba(147,51,234,0.2)] active:translate-y-[2px] active:scale-[0.98]"
        >
          Start Your Project
          <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Deliverables card — slides in from right */}
      <motion.div
        initial={reduced ? undefined : { x: 32, opacity: 0 }}
        animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.12, ease: EASE_EXPO }}
      >
        <div
          className={`rounded-2xl p-8 ${
            isEven
              ? "bg-white border border-black/5"
              : "bg-white/5 border border-white/10"
          }`}
          style={{
            boxShadow: isEven
              ? "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)"
              : undefined,
            backdropFilter: !isEven ? "blur(12px)" : undefined,
            WebkitBackdropFilter: !isEven ? "blur(12px)" : undefined,
          }}
        >
          <h3
            className={`text-sm font-semibold uppercase mb-6 ${
              isEven ? "text-hero/40" : "text-white/40"
            }`}
            style={{ letterSpacing: "0.15em" }}
          >
            Deliverables
          </h3>
          <ul className="space-y-4">
            {service.deliverables.map((item, di) => (
              <motion.li
                key={item}
                className="flex items-start gap-3"
                initial={reduced ? undefined : { y: 10, opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.3 + di * 0.07, ease: EASE_EXPO }}
              >
                <CheckCircle2
                  size={18}
                  className="flex-none mt-0.5 text-accent"
                  aria-hidden="true"
                />
                <span
                  className={`text-sm leading-relaxed ${
                    isEven ? "text-hero/70" : "text-white/70"
                  }`}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  const reduced = useReducedMotion();
  let darkOrbIndex = 0;

  return (
    <>
      {/* Hero */}
      <section className="relative hero-mesh pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Orbs */}
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        {/* XGlassCard — decorative background X */}
        <XBrand variant="glass" />
        {/* XScatter — floating Xs across hero */}
        <XBrand variant="scatter" />

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs font-semibold uppercase text-accent"
            style={{ letterSpacing: "0.15em" }}
          >
            Our Services
          </motion.p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-tight">
            {HERO_WORDS.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span
                  initial={reduced ? undefined : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.3 + i * 0.06,
                    ease: EASE_EXPO,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_EXPO }}
            className="mt-6 text-lg text-white/50 max-w-2xl mx-auto"
            style={{ lineHeight: 1.6 }}
          >
            Design, marketing, and technology — integrated under one roof for
            cohesive results that scale.
          </motion.p>
        </div>
      </section>

      {/* Service Sections */}
      {SERVICES.map((service, i) => {
        const isEven = i % 2 === 0;
        const isLight = isEven;

        // Track which dark orb config to use
        let orbConfig = null;
        if (!isEven && darkOrbIndex < DARK_ORB_CONFIGS.length) {
          orbConfig = DARK_ORB_CONFIGS[darkOrbIndex];
          darkOrbIndex++;
        }

        return (
          <section
            key={service.id}
            id={service.id}
            className={`relative ${isEven ? "bg-content" : "bg-hero"} py-20 lg:py-28 scroll-mt-20 overflow-hidden`}
          >
            {/* Dark section ambient orbs */}
            {!isEven && orbConfig && (
              <div
                className="section-orb"
                style={{
                  ...orbConfig,
                  width: orbConfig.width,
                  height: orbConfig.height,
                  background: `radial-gradient(circle, ${orbConfig.color} 0%, transparent 70%)`,
                  ["--orb-duration" as string]: orbConfig.duration,
                }}
              />
            )}

            {/* Light section subtle gradient wash */}
            {isLight && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: i === 0
                    ? "linear-gradient(135deg, #fafafa 0%, #f5f0ff 100%)"
                    : i === 2
                    ? "linear-gradient(225deg, #fafafa 0%, #f5f0ff 100%)"
                    : i === 4
                    ? "linear-gradient(315deg, #fafafa 0%, #f5f0ff 100%)"
                    : "linear-gradient(45deg, #fafafa 0%, #f5f0ff 100%)",
                }}
              />
            )}

            {/* X Assets — corners only, 2 per section max */}
            <div
              className="absolute top-5 right-6 pointer-events-none z-0 hidden md:block"
              style={{ opacity: isEven ? 0.10 : 0.20 }}
            >
              <XBrand variant="stroke" size={isEven ? 40 : 48} />
            </div>
            <div className="absolute bottom-5 left-6 pointer-events-none z-0 hidden md:block">
              <SmallStaticX size={20} opacity={isEven ? 0.06 : 0.12} />
            </div>

            {/* Faint grid on light sections */}
            {isEven && <div className="absolute inset-0 faint-grid" />}

            <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ServiceContent service={service} isEven={isEven} index={i} />
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="relative bg-hero py-24 lg:py-32 overflow-hidden">
        {/* Grain noise */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.04,
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            width: 500,
            height: 300,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.6,
          }}
        />
        {/* X Assets — corners only */}
        <div className="absolute top-6 left-8 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={20} opacity={0.15} />
        </div>
        <div className="absolute pointer-events-none z-0 hidden md:block" style={{ bottom: -40, right: -40 }}>
          <XBrand variant="rotate" size={120} opacity={0.25} interactive={false} />
        </div>

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight">
              Not Sure Where to Start?
            </h2>
            <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto" style={{ lineHeight: 1.6 }}>
              Book a free consultation and we&apos;ll map out exactly what your
              brand needs to grow.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-medium text-white hover:bg-accent-hover transition-all duration-300 min-h-[44px] hover:shadow-[0_0_24px_rgba(147,51,234,0.5),0_0_48px_rgba(147,51,234,0.2)] active:translate-y-[2px] active:scale-[0.98]"
              >
                Start Your Project
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
