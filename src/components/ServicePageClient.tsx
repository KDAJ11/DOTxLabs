"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";
import type { ServicePageData } from "@/lib/service-pages-data";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ServicePageClient({ data }: { data: ServicePageData }) {
  const words = data.headline.split(" ");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero min-h-[55vh] flex items-center overflow-hidden noise-overlay">
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        <div className="absolute inset-0 dot-grid-dark opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Floating shapes */}
        <div
          className="absolute animate-float-slow top-[15%] left-[10%] w-16 h-16 border border-accent/20 rounded-lg rotate-45 pointer-events-none"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute animate-float-medium top-[20%] right-[15%] w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/10 rounded-full pointer-events-none"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute animate-float-reverse bottom-[25%] left-[8%] w-20 h-20 border border-white/[0.05] rounded-2xl pointer-events-none"
          style={{ animationDelay: "3s" }}
        />

        {/* X Assets */}
        <div
          className="absolute top-6 right-8 pointer-events-none z-0 hidden md:block"
          style={{ opacity: 0.2 }}
        >
          <XBrand variant="stroke" size={48} />
        </div>
        <div className="absolute bottom-8 left-8 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={20} opacity={0.12} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 w-full">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              All Services
            </Link>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-4xl">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em] -mb-[0.15em]">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
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
            transition={{ duration: 0.6, delay: 0.6, ease: EASE_EXPO }}
            className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl"
          >
            {data.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE_EXPO }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-200 min-h-[44px] hover:bg-accent-hover active:translate-y-[1px]"
            >
              Get a Free Quote
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-content to-transparent z-10" />
      </section>

      {/* Content Sections — alternating light/dark */}
      {data.sections.map((section, i) => {
        const isEven = i % 2 === 0;

        return isEven ? (
          /* Light section */
          <section
            key={section.heading}
            className="relative bg-content py-20 lg:py-28 overflow-hidden"
          >
            <div className="absolute inset-0 dot-grid-light" />
            <div className="absolute inset-0 faint-grid" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

            {/* Floating shapes */}
            <div
              className="absolute animate-float-slow top-[10%] right-[8%] w-24 h-24 border border-accent/[0.04] rounded-full pointer-events-none"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <div
              className="absolute animate-float-medium bottom-[10%] left-[5%] w-16 h-16 border border-accent/[0.06] rounded-2xl rotate-12 pointer-events-none"
              style={{ animationDelay: `${i * 0.7}s` }}
            />

            {/* X Assets */}
            <div className="absolute top-5 right-6 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.10 }}>
              <XBrand variant="stroke" size={40} />
            </div>
            <div className="absolute bottom-5 left-6 pointer-events-none z-0 hidden md:block">
              <SmallStaticX size={20} opacity={0.06} />
            </div>

            <div className="relative z-[1] mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-hero leading-tight">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-4">
                  {section.content.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      className="text-base sm:text-lg text-hero/55 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>
        ) : (
          /* Dark section */
          <section
            key={section.heading}
            className="relative bg-hero py-20 lg:py-28 overflow-hidden noise-overlay"
          >
            <div className="absolute inset-0">
              <div
                className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[130px] ambient-orb animate-pulse-glow"
                style={{ animationDelay: `${i}s` }}
              />
            </div>
            <div className="absolute inset-0 dot-grid-dark opacity-30" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* X Assets */}
            <div className="absolute top-6 right-8 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.20 }}>
              <XBrand variant="pulse" size={48} />
            </div>
            <div className="absolute bottom-8 left-10 pointer-events-none z-0 hidden md:block">
              <SmallStaticX size={20} opacity={0.12} />
            </div>

            <div className="relative z-[1] mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white leading-tight">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-4">
                  {section.content.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      className="text-base sm:text-lg text-white/50 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section
        className={`relative ${
          data.sections.length % 2 === 0 ? "bg-hero" : "bg-content"
        } py-24 lg:py-32 overflow-hidden`}
      >
        {data.sections.length % 2 === 0 ? (
          <>
            <div className="absolute inset-0 dot-grid-dark opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] ambient-orb animate-pulse-glow" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 dot-grid-light" />
            <div className="absolute inset-0 faint-grid" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] ambient-orb" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
          </>
        )}

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-tight ${
                data.sections.length % 2 === 0 ? "text-white" : "text-hero"
              }`}
            >
              Ready to get started?
            </h2>
            <p
              className={`mt-4 text-lg max-w-xl mx-auto ${
                data.sections.length % 2 === 0
                  ? "text-white/50"
                  : "text-hero/50"
              }`}
              style={{ lineHeight: 1.6 }}
            >
              {data.cta}
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-200 min-h-[44px] hover:bg-accent-hover active:translate-y-[1px]"
              >
                Start Your Project
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
