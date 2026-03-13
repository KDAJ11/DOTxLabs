"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_WORDS = "We Don't Just Build Websites.".split(" ");
const HERO_WORDS_2 = "We Build Businesses.".split(" ");

const VALUES = [
  {
    label: "Excellence is the baseline",
    description:
      "Every project gets the same standard of work, whether it's a five-page business site or a full e-commerce build with hundreds of products. We don't have a \"good enough\" tier. The work either meets the bar or it doesn't ship.",
  },
  {
    label: "Your business is our business",
    description:
      "We learn your margins, your customers, your competition. Not because it's part of a discovery questionnaire, but because we can't build something effective without understanding what makes your business tick. When we're in it, we're in it.",
  },
  {
    label: "The build is just the beginning",
    description:
      "Most agencies deliver a website, send a final invoice, and move on. We don't operate that way. After launch, we bring business development ideas to the table. We flag growth opportunities. We want to put you out there, but more than that, we want to see you grow.",
  },
  {
    label: "AI built into the process",
    description:
      "AI is how we work, not a label we slap on for credibility. We use it across research, design, development, and optimization. That lets a small team move faster than agencies with ten times the headcount, and it means we can build AI into your business too.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero min-h-[60vh] flex items-center overflow-hidden noise-overlay">
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        <div className="absolute inset-0 dot-grid-dark opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Floating geometric shapes */}
        <div className="absolute animate-float-slow top-[15%] left-[10%] w-16 h-16 border border-accent/20 rounded-lg rotate-45 pointer-events-none" style={{ animationDelay: "0s" }} />
        <div className="absolute animate-float-medium top-[20%] right-[15%] w-12 h-12 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-full pointer-events-none" style={{ animationDelay: "1s" }} />
        <div className="absolute animate-float-reverse bottom-[25%] left-[8%] w-20 h-20 border border-white/[0.05] rounded-2xl pointer-events-none" style={{ animationDelay: "3s" }} />

        {/* X Assets */}
        <div className="absolute top-6 right-8 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.2 }}>
          <XBrand variant="stroke" size={48} />
        </div>
        <div className="absolute bottom-8 left-8 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={20} opacity={0.12} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center w-full">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            {HERO_WORDS.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
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
            <br />
            {HERO_WORDS_2.map((word, i) => (
              <span key={`b-${i}`} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.3 + (HERO_WORDS.length + i) * 0.06,
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
            className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto"
          >
            DOTxLabs is a Toronto-based digital agency that treats every project
            like its own. Web design, SEO, AI automation, and the strategy that
            ties it all together.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-content to-transparent z-10" />
      </section>

      {/* How We Operate — Values Grid */}
      <section className="relative bg-content py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-grid-light" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.02] rounded-full blur-[120px]" />
        <div className="absolute inset-0 faint-grid" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

        {/* Floating shapes */}
        <div className="absolute animate-float-slow top-[10%] right-[8%] w-32 h-32 border border-accent/[0.04] rounded-full pointer-events-none" />
        <div className="absolute animate-float-medium bottom-[10%] left-[5%] w-20 h-20 border border-accent/[0.06] rounded-2xl rotate-12 pointer-events-none" style={{ animationDelay: "1.5s" }} />

        {/* X Assets */}
        <div className="absolute top-5 left-5 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={20} opacity={0.10} />
        </div>
        <div className="absolute bottom-8 right-10 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.15 }}>
          <XBrand variant="stroke" size={56} />
        </div>

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
              How We Operate
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-hero leading-tight">
              Built on principle, not process decks
            </h2>
            <p className="mt-4 text-lg text-hero/50 max-w-xl" style={{ lineHeight: 1.6 }}>
              Four things that define how we work. Not values on a poster. How
              we actually run projects.
            </p>
          </FadeIn>

          <div className="mt-16 space-y-0 divide-y divide-black/5">
            {VALUES.map((row, i) => (
              <FadeIn key={row.label} delay={i * 0.12}>
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-10 lg:py-14 hover:bg-accent/[0.02] -mx-6 px-6 rounded-2xl transition-colors duration-500">
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-hero group-hover:text-accent transition-colors duration-300">
                      {row.label}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-base sm:text-lg text-hero/50 max-w-2xl" style={{ lineHeight: 1.6 }}>
                      {row.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* After Launch Section — Dark */}
      <section className="relative bg-hero py-24 lg:py-32 overflow-hidden noise-overlay">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px] animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>
        <div className="absolute inset-0 dot-grid-dark opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* X Assets */}
        <div className="absolute top-6 right-8 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.35 }}>
          <XBrand variant="pulse" size={56} />
        </div>
        <div className="absolute bottom-8 left-10 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={24} opacity={0.15} />
        </div>

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
                What happens after launch
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                We stick around
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-8 text-base sm:text-lg text-white/50 leading-relaxed">
                The launch is not the finish line. It's where the real work starts.
                Once your site is live, we monitor performance, flag what's working
                and what isn't, and bring ideas you didn't ask for but probably need.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed">
                We've helped clients rethink their service offerings, adjust their
                pricing pages based on traffic data, and launch new revenue streams
                they hadn't considered. That's not in a scope of work. That's what
                happens when your agency actually cares whether the thing they built
                is making you money.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed">
                We work with businesses across Toronto, Durham Region, the GTA,
                and internationally. Same commitment wherever you are.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-content py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-grid-light" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 faint-grid" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-hero leading-tight">
              Ready to Build Something Great?
            </h2>
            <p className="mt-4 text-lg text-hero/50 max-w-xl mx-auto" style={{ lineHeight: 1.6 }}>
              Tell us what you're working on. We'll tell you how we can help.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-300 min-h-[44px] hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(147,51,234,0.5),0_0_48px_rgba(147,51,234,0.2)] active:translate-y-[2px] active:scale-[0.98]"
              >
                Start Your Project
                <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
