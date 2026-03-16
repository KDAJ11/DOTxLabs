"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import PageFrame from "@/components/ui/PageFrame";
import BackgroundTransition from "@/components/ui/BackgroundTransition";
import { SERVICES } from "@/lib/data";
import type { ServiceCategory } from "@/lib/data";
import { getAllServiceSlugs } from "@/lib/service-pages-data";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";
import ServiceIcon from "@/components/animations/ServiceIcon";
import ServiceNavDots from "@/components/services/ServiceNavDots";
import ProcessFlow from "@/components/services/ProcessFlow";

/* ─── Process steps per service ─────────────────────── */
const SERVICE_PROCESS_STEPS: Record<string, Array<{ label: string; description: string }>> = {
  "web-development": [
    { label: "Discovery", description: "We learn your business, audience, and goals through research sessions and competitive analysis." },
    { label: "Architecture", description: "Site structure, content hierarchy, and technical stack decisions locked in before design begins." },
    { label: "Design", description: "Interactive mockups in Figma — every page, every breakpoint. You approve before we code." },
    { label: "Build", description: "Custom React/Next.js or Shopify development with performance baked in from day one." },
    { label: "QA", description: "Cross-browser testing, accessibility audit, Core Web Vitals optimization, and content review." },
    { label: "Launch", description: "Deployment, DNS cutover, monitoring setup, and post-launch support to ensure nothing breaks." },
  ],
  seo: [
    { label: "Audit", description: "Full technical and content audit — crawl errors, Core Web Vitals, indexing, and competitive gaps." },
    { label: "Research", description: "Keyword research, search intent mapping, and topic cluster planning based on real data." },
    { label: "Architecture", description: "URL structure, internal linking, and content hierarchy optimized for both users and crawlers." },
    { label: "On-Page", description: "Title tags, meta descriptions, headings, schema markup, and content optimization for every target page." },
    { label: "Authority", description: "Link building, digital PR, and brand mention campaigns to grow domain authority." },
    { label: "Report", description: "Monthly ranking reports, traffic analysis, and strategic recommendations for continued growth." },
  ],
  "ai-automation": [
    { label: "Audit", description: "We map your workflows and identify where AI can eliminate repetitive tasks and unlock new capabilities." },
    { label: "Strategy", description: "ROI projections, tool selection, and implementation roadmap tailored to your tech stack." },
    { label: "Prototype", description: "Working proof of concept — you test it with real data before we commit to full build." },
    { label: "Integrate", description: "Connect the AI solution to your existing systems — CRM, email, analytics, and internal tools." },
    { label: "Train", description: "Fine-tune models on your data, train your team, and document everything for long-term ownership." },
    { label: "Deploy", description: "Production deployment with monitoring, error handling, and performance optimization." },
  ],
  "brand-strategy": [
    { label: "Research", description: "Deep dive into your market, competitors, and audience to uncover positioning opportunities." },
    { label: "Positioning", description: "Define your unique value proposition, brand voice, and messaging framework." },
    { label: "Moodboard", description: "Visual direction exploration — colors, typography, imagery styles presented for your feedback." },
    { label: "Design", description: "Full visual identity system: logo, color palette, typography, iconography, and imagery guidelines." },
    { label: "Refine", description: "Iterative refinement based on your feedback until every element feels right." },
    { label: "Guidelines", description: "Comprehensive brand guidelines document ensuring consistency across every touchpoint." },
  ],
  "logo-design": [
    { label: "Brief", description: "We learn what your brand stands for, who it speaks to, and how the logo will be used." },
    { label: "Concepts", description: "3-5 distinct logo directions, each exploring a different creative angle." },
    { label: "Refine", description: "Your chosen concept refined through multiple rounds until it's pixel-perfect." },
    { label: "Variations", description: "Primary, stacked, horizontal, and icon-only versions for every use case." },
    { label: "Files", description: "Complete file package: SVG, EPS, PDF, PNG at multiple sizes, light and dark backgrounds." },
    { label: "Guide", description: "Logo usage guidelines with spacing rules, color specs, and do/don't examples." },
  ],
  "digital-marketing": [
    { label: "Strategy", description: "Channel selection, budget allocation, and campaign roadmap based on your goals and audience." },
    { label: "Creative", description: "Ad copy, landing pages, email sequences, and visual assets designed to convert." },
    { label: "Launch", description: "Campaigns go live with proper tracking, attribution, and A/B test frameworks in place." },
    { label: "Optimise", description: "Daily bid management, audience refinement, and creative rotation to maximize ROAS." },
    { label: "Report", description: "Weekly performance dashboards with actionable insights, not vanity metrics." },
    { label: "Scale", description: "Winning campaigns expanded to new audiences, channels, and markets." },
  ],
  "social-media-marketing": [
    { label: "Audit", description: "Review current social presence, audience demographics, and competitor activity." },
    { label: "Strategy", description: "Platform selection, content pillars, posting cadence, and growth targets defined." },
    { label: "Calendar", description: "Monthly content calendar with themes, formats, and publishing schedule." },
    { label: "Create", description: "Scroll-stopping content — graphics, video, copywriting tailored to each platform." },
    { label: "Publish", description: "Scheduled posting with optimal timing, hashtag strategy, and community engagement." },
    { label: "Analyse", description: "Performance reporting with engagement rates, growth metrics, and content optimization insights." },
  ],
  "marketing-campaigns": [
    { label: "Brief", description: "Campaign objectives, target audience, budget, timeline, and success metrics aligned." },
    { label: "Strategy", description: "Integrated channel plan — paid, organic, email, social, and PR working as one system." },
    { label: "Creative", description: "Unified creative direction across all channels — messaging, visuals, and assets produced." },
    { label: "Launch", description: "Coordinated go-live across all channels with tracking and attribution in place." },
    { label: "Monitor", description: "Real-time performance monitoring with rapid response to optimize underperforming elements." },
    { label: "Report", description: "Post-campaign analysis with ROI breakdown, learnings, and recommendations for next campaign." },
  ],
};

/* ─── Dynamic imports (ssr: false) ──────────────────── */
const ServiceParticles = dynamic(
  () => import("@/components/services/ServiceParticles"),
  { ssr: false }
);
const WebDevIllustration = dynamic(
  () => import("@/components/services/illustrations/WebDevIllustration"),
  { ssr: false }
);
const SEOIllustration = dynamic(
  () => import("@/components/services/illustrations/SEOIllustration"),
  { ssr: false }
);
const AIIllustration = dynamic(
  () => import("@/components/services/illustrations/AIIllustration"),
  { ssr: false }
);
const BrandIllustration = dynamic(
  () => import("@/components/services/illustrations/BrandIllustration"),
  { ssr: false }
);
const LogoIllustration = dynamic(
  () => import("@/components/services/illustrations/LogoIllustration"),
  { ssr: false }
);
const DigitalMarketingIllustration = dynamic(
  () => import("@/components/services/illustrations/DigitalMarketingIllustration"),
  { ssr: false }
);
const SocialMediaIllustration = dynamic(
  () => import("@/components/services/illustrations/SocialMediaIllustration"),
  { ssr: false }
);
const FullCampaignsIllustration = dynamic(
  () => import("@/components/services/illustrations/FullCampaignsIllustration"),
  { ssr: false }
);

/* ─── Illustration map by service ID ────────────────── */
const ILLUSTRATION_MAP: Record<string, React.ComponentType> = {
  "web-development": WebDevIllustration,
  seo: SEOIllustration,
  "ai-automation": AIIllustration,
  "brand-strategy": BrandIllustration,
  "logo-design": LogoIllustration,
  "digital-marketing": DigitalMarketingIllustration,
  "social-media-marketing": SocialMediaIllustration,
  "marketing-campaigns": FullCampaignsIllustration,
};

const CATEGORY_ACCENT: Record<ServiceCategory, string> = {
  Design: "text-purple-400",
  Marketing: "text-blue-400",
  Technology: "text-emerald-400",
};

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_WORDS = "Everything Your Brand Needs".split(" ");

/* ─── Section orb configs per service index ─────────── */
const DARK_ORB_CONFIGS = [
  { top: "10%", right: "8%", width: 350, height: 350, color: "rgba(123,53,255,0.15)", duration: "18s" },
  { top: "40%", right: "5%", width: 300, height: 300, color: "rgba(139,92,246,0.12)", duration: "20s" },
  { bottom: "10%", left: "5%", width: 400, height: 400, color: "rgba(99,102,241,0.12)", duration: "22s" },
  { top: "15%", left: "8%", width: 250, height: 250, color: "rgba(123,53,255,0.1)", duration: "16s" },
];

/* ─── Subpage slugs ─────────────────────────────────── */
const SERVICE_SUBPAGE_SLUGS = getAllServiceSlugs();

/* ─── Left Panel: Text Content (sticky on desktop) ──── */
function ServiceTextPanel({
  service,
  isEven,
}: {
  service: (typeof SERVICES)[number];
  isEven: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const shouldAnimate = inView && !reduced;
  const hasSubpage = SERVICE_SUBPAGE_SLUGS.includes(service.id);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? undefined : { x: -32, opacity: 0 }}
      animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: EASE_EXPO }}
      style={{ willChange: "transform, opacity" }}
      className="w-full max-w-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p
            className={`text-xs font-semibold uppercase ${
              isEven ? "text-accent" : CATEGORY_ACCENT[service.category]
            }`}
            style={{ letterSpacing: "0.15em" }}
          >
            {service.category}
          </p>
          <AnimatedHeading
            text={service.headline}
            as="h2"
            className={`mt-3 text-3xl sm:text-4xl font-display font-black leading-tight ${
              isEven ? "text-hero" : "text-white"
            }`}
          />
        </div>
        <div className="hidden sm:block flex-none">
          <ServiceIcon service={service.id} isLight={isEven} />
        </div>
      </div>
      <p
        className={`mt-4 text-base ${
          isEven ? "text-hero/60" : "text-white/50"
        }`}
        style={{ lineHeight: 1.6 }}
      >
        {service.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {hasSubpage && (
          <Link
            href={`/services/${service.id}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-all duration-200 min-h-[44px]"
          >
            Learn More
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        )}
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-all duration-200 min-h-[44px] active:translate-y-[1px]"
        >
          Start Your Project
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Deliverables Card ─────────────────────────────── */
function ServiceDeliverables({
  service,
  isEven,
}: {
  service: (typeof SERVICES)[number];
  isEven: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
      whileInView={reduced ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: "transform, opacity" }}
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
          {service.deliverables.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3"
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
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────── */
export default function ServicesPage() {
  const reduced = useReducedMotion();
  let darkOrbIndex = 0;

  return (
    <>
      {/* Service Navigation Dots */}
      <ServiceNavDots />

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
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em] -mb-[0.15em]"
              >
                <motion.span
                  initial={reduced ? undefined : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
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

      {/* Service Sections — Split-Screen Layout */}
      {SERVICES.map((service, i) => {
        const isEven = i % 2 === 0;
        const isLight = isEven;

        // Track which dark orb config to use
        let orbConfig = null;
        if (!isEven && darkOrbIndex < DARK_ORB_CONFIGS.length) {
          orbConfig = DARK_ORB_CONFIGS[darkOrbIndex];
          darkOrbIndex++;
        }

        const fromColor = isEven ? "#14121e" : "#fafafa";
        const toColor = isEven ? "#fafafa" : "#14121e";

        return (
          <BackgroundTransition
            key={service.id}
            from={fromColor}
            to={toColor}
            className="relative scroll-mt-20 overflow-hidden"
          >
            <section id={service.id}>
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
                    background:
                      i === 0
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
                style={{ opacity: isEven ? 0.1 : 0.2 }}
              >
                <XBrand variant="stroke" size={isEven ? 40 : 48} />
              </div>
              <div className="absolute bottom-5 left-6 pointer-events-none z-0 hidden md:block">
                <SmallStaticX size={20} opacity={isEven ? 0.06 : 0.12} />
              </div>

              {/* Faint grid on light sections */}
              {isEven && <div className="absolute inset-0 faint-grid" />}

              {/* Floating Particle Background */}
              <ServiceParticles service={service.id} />

              {/* ── Split-Screen Container ── */}
              <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:gap-16 lg:min-h-[200vh]">
                  {/* LEFT PANEL — Sticky on desktop */}
                  <div className="py-20 lg:py-0 lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
                    <ServiceTextPanel service={service} isEven={isEven} />
                  </div>

                  {/* RIGHT PANEL — Scrolls on desktop */}
                  <div className="pb-20 lg:pb-0 lg:w-1/2 lg:py-32 space-y-24">
                    {/* Hero Illustration */}
                    {(() => {
                      const Illustration = ILLUSTRATION_MAP[service.id];
                      return Illustration ? <Illustration /> : null;
                    })()}

                    {/* Process Flow */}
                    {SERVICE_PROCESS_STEPS[service.id] && (
                      <ProcessFlow
                        steps={SERVICE_PROCESS_STEPS[service.id]}
                        variant={isEven ? "light" : "dark"}
                        service={service.id as "web-development" | "seo" | "ai-automation" | "brand-strategy" | "logo-design" | "digital-marketing" | "social-media-marketing" | "marketing-campaigns"}
                      />
                    )}

                    {/* Deliverables Card — tighter relationship to process flow */}
                    <div className="-mt-16">
                      <ServiceDeliverables service={service} isEven={isEven} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </BackgroundTransition>
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
            background:
              "radial-gradient(ellipse, rgba(123,53,255,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.6,
          }}
        />
        {/* X Assets — corners only */}
        <div className="absolute top-6 left-8 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={20} opacity={0.15} />
        </div>
        <div
          className="absolute pointer-events-none z-0 hidden md:block"
          style={{ bottom: -40, right: -40 }}
        >
          <XBrand variant="rotate" size={120} opacity={0.25} interactive={false} />
        </div>

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <PageFrame variant="dark">
            <div className="p-12 lg:p-16">
              <AnimatedHeading
                text="Not Sure Where to Start?"
                as="h2"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight"
              />
              <AnimateOnScroll delay={0.2}>
                <p
                  className="mt-4 text-lg text-white/50 max-w-xl mx-auto"
                  style={{ lineHeight: 1.6 }}
                >
                  Book a free consultation and we&apos;ll map out exactly what
                  your brand needs to grow.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.3}>
                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-10 py-4 text-base font-medium text-white hover:bg-accent-hover transition-all duration-200 min-h-[44px] active:translate-y-[1px]"
                  >
                    Start Your Project
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
          </PageFrame>
        </div>
      </section>
    </>
  );
}
