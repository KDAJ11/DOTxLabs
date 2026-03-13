"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";
import type { LocationPageData } from "@/lib/location-pages-data";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LocationPageClient({
  data,
}: {
  data: LocationPageData;
}) {
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
          className="absolute animate-float-medium top-[20%] right-[15%] w-12 h-12 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full pointer-events-none"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute animate-float-reverse bottom-[25%] right-[8%] w-20 h-20 border border-white/[0.05] rounded-2xl pointer-events-none"
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
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 mb-8"
          >
            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Home
            </Link>
            <span className="text-white/20 text-sm">/</span>
            <span className="text-sm text-white/60">{data.city}</span>
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/20 px-4 py-1.5 mb-6"
          >
            <MapPin size={14} className="text-accent" />
            <span className="text-xs font-medium text-accent">
              {data.city}, {data.region}
            </span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-4xl">
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.3em]"
              >
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
            transition={{ duration: 0.6, delay: 0.7, ease: EASE_EXPO }}
            className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl"
          >
            {data.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9, ease: EASE_EXPO }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 min-h-[44px] hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(147,51,234,0.5),0_0_48px_rgba(147,51,234,0.2)] active:translate-y-[2px] active:scale-[0.98]"
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
          <section
            key={section.heading}
            className="relative bg-content py-20 lg:py-28 overflow-hidden"
          >
            <div className="absolute inset-0 dot-grid-light" />
            <div className="absolute inset-0 faint-grid" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

            <div
              className="absolute animate-float-slow top-[10%] right-[8%] w-24 h-24 border border-accent/[0.04] rounded-full pointer-events-none"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <div
              className="absolute animate-float-medium bottom-[10%] left-[5%] w-16 h-16 border border-accent/[0.06] rounded-2xl rotate-12 pointer-events-none"
              style={{ animationDelay: `${i * 0.7}s` }}
            />

            <div
              className="absolute top-5 right-6 pointer-events-none z-0 hidden md:block"
              style={{ opacity: 0.1 }}
            >
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

            <div
              className="absolute top-6 right-8 pointer-events-none z-0 hidden md:block"
              style={{ opacity: 0.2 }}
            >
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

      {/* Nearby Areas + CTA */}
      <section className="relative bg-content py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-grid-light" />
        <div className="absolute inset-0 faint-grid" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] ambient-orb" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Nearby areas */}
          <FadeIn>
            <div className="text-center mb-16">
              <p
                className="text-xs font-semibold uppercase text-accent"
                style={{ letterSpacing: "0.15em" }}
              >
                Also serving
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {data.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-black/5 px-4 py-2 text-sm text-hero/60"
                    style={{
                      boxShadow:
                        "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
                    }}
                  >
                    <MapPin size={12} className="text-accent/60" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.15}>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-hero leading-tight">
                Ready to get started?
              </h2>
              <p
                className="mt-4 text-lg text-hero/50 max-w-xl mx-auto"
                style={{ lineHeight: 1.6 }}
              >
                {data.cta}
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-300 min-h-[44px] hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(147,51,234,0.5),0_0_48px_rgba(147,51,234,0.2)] active:translate-y-[2px] active:scale-[0.98]"
                >
                  Start Your Project
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
