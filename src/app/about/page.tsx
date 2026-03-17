"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import PageFrame from "@/components/ui/PageFrame";
import { StaggeredCards, StaggeredCard } from "@/components/ui/StaggeredCards";
import ParallaxSection from "@/components/ui/ParallaxSection";
import BackgroundTransition from "@/components/ui/BackgroundTransition";
import ProcessDiagram from "@/components/ui/ProcessDiagram";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";
import AboutValueIcon from "@/components/animations/AboutValueIcons";

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
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero min-h-[60vh] flex items-center overflow-hidden noise-overlay">
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        <div className="absolute inset-0 dot-grid-dark opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Floating geometric shapes */}
        <div className="absolute animate-float-slow top-[15%] left-[10%] w-16 h-16 border border-accent/20 rounded-lg rotate-45 pointer-events-none" style={{ animationDelay: "0s", willChange: "transform" }} />
        <div className="absolute animate-float-medium top-[20%] right-[15%] w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/10 rounded-full pointer-events-none" style={{ animationDelay: "1s", willChange: "transform" }} />
        <div className="absolute animate-float-reverse bottom-[25%] left-[8%] w-20 h-20 border border-white/[0.05] rounded-2xl pointer-events-none" style={{ animationDelay: "3s", willChange: "transform" }} />

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
              <span key={i} className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em] -mb-[0.15em]">
                <motion.span
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.3 + i * 0.06,
                    ease: EASE_EXPO,
                  }}
                  className="inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            {HERO_WORDS_2.map((word, i) => (
              <span key={`b-${i}`} className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em] -mb-[0.15em]">
                <motion.span
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.3 + (HERO_WORDS.length + i) * 0.06,
                    ease: EASE_EXPO,
                  }}
                  className="inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE_EXPO }}
            className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto"
            style={{ willChange: "transform, opacity" }}
          >
            DOTxLabs is a Toronto-based digital agency that treats every project
            like its own. Web design, SEO, AI automation, and the strategy that
            ties it all together.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-content to-transparent z-10" />
      </section>

      {/* How We Operate — Values Grid */}
      <BackgroundTransition from="#14121e" to="#fafafa" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-grid-light" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.02] rounded-full blur-[120px] ambient-orb" />
        <div className="absolute inset-0 faint-grid" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

        {/* Floating shapes */}
        <div className="absolute animate-float-slow top-[10%] right-[8%] w-32 h-32 border border-accent/[0.04] rounded-full pointer-events-none" style={{ willChange: "transform" }} />
        <div className="absolute animate-float-medium bottom-[10%] left-[5%] w-20 h-20 border border-accent/[0.06] rounded-2xl rotate-12 pointer-events-none" style={{ animationDelay: "1.5s", willChange: "transform" }} />

        {/* X Assets */}
        <div className="absolute top-5 left-5 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={20} opacity={0.10} />
        </div>
        <div className="absolute bottom-8 right-10 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.15 }}>
          <XBrand variant="stroke" size={56} />
        </div>

        <ParallaxSection speed={0.15}>
          <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PageFrame variant="light">
              <div className="p-8 lg:p-12">
                <AnimateOnScroll>
                  <Image
                    src="/DOTxLabs.png"
                    alt="DOTxLabs logo — how we operate"
                    width={200}
                    height={63}
                    className="max-w-[200px] h-auto mb-8"
                  />
                  <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
                    How We Operate
                  </p>
                </AnimateOnScroll>
                <AnimatedHeading
                  text="Built on principle, not process decks"
                  as="h2"
                  className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-hero leading-tight"
                />
                <AnimateOnScroll delay={0.1}>
                  <p className="mt-4 text-lg text-hero/50 max-w-xl" style={{ lineHeight: 1.6 }}>
                    Four things that define how we work. Not values on a poster. How
                    we actually run projects.
                  </p>
                </AnimateOnScroll>

                <div className="mt-16 space-y-0 divide-y divide-black/5">
                  <StaggeredCards className="space-y-0">
                    {VALUES.map((row) => (
                      <StaggeredCard key={row.label} hoverEffect={false}>
                        <div className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-10 lg:py-14 hover:bg-accent/[0.02] -mx-6 px-6 rounded-2xl transition-colors duration-500">
                          <div className="lg:col-span-4">
                            <AboutValueIcon label={row.label} />
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
                      </StaggeredCard>
                    ))}
                  </StaggeredCards>
                </div>

                {/* Process Diagram */}
                <AnimateOnScroll>
                  <div className="mt-20 pt-20 border-t border-black/5">
                    <p className="text-xs font-semibold uppercase text-accent text-center mb-8" style={{ letterSpacing: "0.15em" }}>
                      Our Process
                    </p>
                    <ProcessDiagram />
                  </div>
                </AnimateOnScroll>
              </div>
            </PageFrame>
          </div>
        </ParallaxSection>
      </BackgroundTransition>

      {/* After Launch Section — Dark */}
      <BackgroundTransition from="#fafafa" to="#14121e" className="relative py-24 lg:py-32 overflow-hidden noise-overlay">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px] ambient-orb animate-pulse-glow" style={{ willChange: "transform" }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[130px] ambient-orb animate-pulse-glow" style={{ animationDelay: "2s", willChange: "transform" }} />
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

        <ParallaxSection speed={0.15}>
          <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PageFrame variant="dark">
              <div className="p-8 lg:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <AnimateOnScroll>
                    <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
                      What happens after launch
                    </p>
                  </AnimateOnScroll>
                  <AnimatedHeading
                    text="We stick around"
                    as="h2"
                    className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
                  />

                  <AnimateOnScroll delay={0.15}>
                    <p className="mt-8 text-base sm:text-lg text-white/50 leading-relaxed">
                      The launch is not the finish line. It&apos;s where the real work starts.
                      Once your site is live, we monitor performance, flag what&apos;s working
                      and what isn&apos;t, and bring ideas you didn&apos;t ask for but probably need.
                    </p>
                  </AnimateOnScroll>

                  <AnimateOnScroll delay={0.25}>
                    <p className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed">
                      We&apos;ve helped clients rethink their service offerings, adjust their
                      pricing pages based on traffic data, and launch new revenue streams
                      they hadn&apos;t considered. That&apos;s not in a scope of work. That&apos;s what
                      happens when your agency actually cares whether the thing they built
                      is making you money.
                    </p>
                  </AnimateOnScroll>

                  <AnimateOnScroll delay={0.35}>
                    <p className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed">
                      We work with businesses across Toronto, Durham Region, the GTA,
                      and internationally. Same commitment wherever you are.
                    </p>
                  </AnimateOnScroll>
                </div>
              </div>
            </PageFrame>
          </div>
        </ParallaxSection>
      </BackgroundTransition>

      {/* CTA Banner */}
      <BackgroundTransition from="#14121e" to="#fafafa" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-grid-light" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[120px] ambient-orb" style={{ willChange: "transform" }} />
        <div className="absolute inset-0 faint-grid" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

        <ParallaxSection speed={0.15}>
          <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <PageFrame variant="light">
              <div className="p-12 lg:p-16">
                <AnimatedHeading
                  text="Ready to Build Something Great?"
                  as="h2"
                  className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-hero leading-tight"
                />
                <AnimateOnScroll delay={0.2}>
                  <p className="mt-4 text-lg text-hero/50 max-w-xl mx-auto" style={{ lineHeight: 1.6 }}>
                    Tell us what you&apos;re working on. We&apos;ll tell you how we can help.
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.3}>
                  <div className="mt-10">
                    <Link
                      href="/contact"
                      className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-200 min-h-[44px] hover:bg-accent-hover active:translate-y-[1px]"
                    >
                      Start Your Project
                      <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                    </Link>
                  </div>
                </AnimateOnScroll>
              </div>
            </PageFrame>
          </div>
        </ParallaxSection>
      </BackgroundTransition>
    </>
  );
}
