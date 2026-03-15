"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { CLIENT_TYPES, WHY_DOTXLABS } from "@/lib/data";

/* ─── Fade-up wrapper (fast, under 300ms) ──────────────── */

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 1. HERO ──────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#14121e" }}>
      {/* Subtle low-opacity grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Very faint noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Eyebrow */}
        <FadeUp>
          <p
            className="text-xs font-semibold text-accent mb-6"
            style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            AI-FIRST DIGITAL AGENCY · TORONTO
          </p>
        </FadeUp>

        {/* Headline — appears immediately, fast fade-up only */}
        <FadeUp delay={0.05}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Most agencies build and move on.
            <br />
            We don&apos;t.
          </h1>
        </FadeUp>

        {/* Subtext */}
        <FadeUp delay={0.1}>
          <p className="mt-6 text-lg sm:text-xl text-white/55 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
            We design, build, and grow digital businesses — then stick around to make sure they perform.
          </p>
        </FadeUp>

        {/* Buttons */}
        <FadeUp delay={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-200 min-h-[44px] hover:bg-accent-hover active:translate-y-[1px]"
            >
              Start Your Project
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 px-8 py-3.5 text-base font-medium text-white transition-all duration-200 min-h-[44px] hover:border-white/40 hover:bg-white/[0.06]"
            >
              See How We Work
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* Hard edge at bottom — solid colour change, max 24px gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#14121e] to-transparent z-10" />
    </section>
  );
}

/* ─── 2. PROOF STRIP ──────────────────────────────────── */

const PROOF_STATEMENTS = [
  {
    label: "Excellence is the baseline",
    description: "Every project gets the same standard, whether it's a 5-page site or a full e-commerce build.",
  },
  {
    label: "Your business is our business",
    description: "We learn your margins, your customers, your competition — because we can't build what we don't understand.",
  },
  {
    label: "The build is just the beginning",
    description: "After launch we stay in it — flagging what's working, what isn't, and opportunities you haven't thought of yet.",
  },
];

function ProofStrip() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden" style={{ background: "#14121e" }}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {PROOF_STATEMENTS.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div>
                <h3 className="text-lg font-bold text-white">{item.label}</h3>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. THE WORK ─────────────────────────────────────── */

const SERVICE_GROUPS = [
  {
    group: "Build",
    services: "Web Development · Brand Strategy & Visual Identity · Logo Design",
    description: "We design and build the digital foundation your brand stands on — from your visual identity to the website your customers actually experience.",
  },
  {
    group: "Grow",
    services: "SEO · Full-Scale Marketing Campaigns",
    description: "We get you found, and keep you visible — through search rankings that compound and campaigns that move people to act.",
  },
  {
    group: "Automate",
    services: "AI Automation",
    description: "We build AI into your workflow so your business runs leaner, responds faster, and scales without adding headcount.",
  },
];

function TheWork() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#fafaf8" }}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-hero leading-tight">
            The Work
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_GROUPS.map((item, i) => (
            <FadeIn key={item.group} delay={i * 0.1}>
              <div
                className="p-8 h-full transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 2,
                }}
              >
                <p className="text-xs font-semibold text-accent uppercase" style={{ letterSpacing: "0.15em" }}>
                  {item.group}
                </p>
                <p className="mt-3 text-sm font-medium text-hero/70" style={{ lineHeight: 1.6 }}>
                  {item.services}
                </p>
                <p className="mt-4 text-sm text-hero/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              View All Services <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── 4. WHAT MAKES US DIFFERENT ──────────────────────── */

function WhatMakesUsDifferent() {
  // Keep only the first two proof points as specified
  const items = WHY_DOTXLABS.slice(0, 2);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#14121e" }}>
      {/* Subtle grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            Why DOTxLabs
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            What makes us different
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <FadeIn key={item.heading} delay={i * 0.1}>
              <div
                className="p-8 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                }}
              >
                <h3 className="text-xl font-bold text-white">
                  {item.heading}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-white/45 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. INDUSTRIES TICKER ────────────────────────────── */

function IndustriesTicker() {
  const doubled = [...CLIENT_TYPES, ...CLIENT_TYPES];

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "#14121e" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div
        className="relative"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 0",
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#14121e] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#14121e] to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {doubled.map((client, i) => (
            <span key={`${client}-${i}`} className="flex-none flex items-center">
              <span className="text-sm font-medium text-white/35" style={{ letterSpacing: "0.06em" }}>
                {client}
              </span>
              <span className="mx-3 text-accent/40 text-[0.5rem]">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 6. CTA SECTION ──────────────────────────────────── */

function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#14121e" }}>
      {/* Subtle radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 250,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(123,53,255,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight">
            Ready to build something that actually works?
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto" style={{ lineHeight: 1.6 }}>
            Tell us what you&apos;re working on. We&apos;ll tell you how we can help.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-200 min-h-[44px] hover:bg-accent-hover active:translate-y-[1px]"
            >
              Start Your Project
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <TheWork />
      <WhatMakesUsDifferent />
      <IndustriesTicker />
      <CTASection />
    </>
  );
}
