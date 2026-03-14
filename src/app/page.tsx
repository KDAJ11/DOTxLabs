"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, Code2, Search, Bot, Palette, BarChart3, Megaphone, PenTool, Layers } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Card3D from "@/components/Card3D";
import { CORE_SERVICES, MORE_SERVICES, CLIENT_TYPES, PHILOSOPHY_ROWS, PROCESS_STEPS, FAQ_ITEMS, WHY_DOTXLABS, RESULTS_HIGHLIGHTS, INDUSTRIES_EXPANDED } from "@/lib/data";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";

/* ─── Hooks ───────────────────────────────────────────── */

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

function useMouseParallax(strength = 20) {
  const x = useRef(0);
  const y = useRef(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      x.current = (e.clientX / window.innerWidth - 0.5) * 2;
      y.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Throttle updates to ~30fps to stay performant
    const interval = setInterval(() => {
      setPos(prev => {
        const nx = prev.x + (x.current * strength - prev.x) * 0.08;
        const ny = prev.y + (y.current * strength - prev.y) * 0.08;
        return { x: nx, y: ny };
      });
    }, 33);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(interval);
    };
  }, [isTouch, strength]);

  return pos;
}

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      return;
    }

    const start = performance.now();
    function easeOutQuart(t: number) {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration, reduced]);

  return { value, ref };
}

/* ─── Mouse Shine Overlay for Cards ───────────────────── */

function MouseShine({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const isTouch = useIsTouchDevice();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }, [isTouch]);

  return (
    <div className={`relative ${className}`} onMouseMove={handleMouseMove}>
      {children}
      {!isTouch && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}

/* ─── Reusable: Floating 3D Shape ─────────────────────── */

function FloatingShape({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={style}
    />
  );
}

/* ─── Reusable: Parallax Section Wrapper ──────────────── */

function ParallaxBg({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div className="absolute inset-0" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Custom ease constant ────────────────────────────── */
const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Hero ─────────────────────────────────────────────── */

const HERO_WORDS = "We Build Websites That Actually Rank.".split(" ");

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);

  // Scroll-fade via DOM instead of MotionValue — keeps SSR HTML visible at opacity:1
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (contentRef.current) {
        const o = Math.max(0, Math.min(1, 1 - v / 0.8));
        contentRef.current.style.opacity = String(o);
      }
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Mouse parallax for hero shapes (desktop only)
  const mouse = useMouseParallax(25);

  // Stats count-up
  const stat1 = useCountUp(50);
  const stat2 = useCountUp(3);
  const stat3 = useCountUp(100);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center hero-mesh overflow-hidden noise-overlay">
      {/* CSS Floating orbs (zero JS cost) */}
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />

      {/* Animated gradient mesh parallax layer — mouse + scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          x: mouse.x,
          translateY: mouse.y,
        }}
      >
        {/* Dot grid pattern with radial mask */}
        <div
          className="absolute inset-0 dot-grid-dark opacity-60"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Orbiting ring with dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 border border-white/[0.06] rounded-full" />
          <div className="animate-orbit">
            <div className="w-2 h-2 rounded-full bg-accent/50 blur-[2px]" />
          </div>
        </div>

        {/* Concentric depth rings — brighter for visibility */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.035] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/[0.02] rounded-full" />

        {/* 3D Torus / Ring shapes — perspective rings with gradient strokes */}
        <div
          className="absolute top-[12%] right-[8%] w-32 h-32 animate-float-slow"
          style={{ perspective: 400 }}
        >
          <div
            className="w-full h-full rounded-full border-2 border-accent/25"
            style={{ transform: "rotateX(65deg) rotateZ(15deg)" }}
          />
        </div>

        <div
          className="absolute bottom-[18%] left-[6%] w-40 h-40 animate-float-reverse"
          style={{ perspective: 500, animationDelay: "2s" }}
        >
          <div
            className="w-full h-full rounded-full border border-purple-400/20"
            style={{ transform: "rotateX(70deg) rotateZ(-20deg)" }}
          />
          <div
            className="absolute inset-4 rounded-full border border-accent/15"
            style={{ transform: "rotateX(70deg) rotateZ(-20deg)" }}
          />
        </div>

        <div
          className="absolute top-[55%] right-[5%] w-24 h-24 animate-float-medium"
          style={{ perspective: 300, animationDelay: "1.5s" }}
        >
          <div
            className="w-full h-full rounded-full border border-white/[0.08]"
            style={{ transform: "rotateX(60deg) rotateZ(30deg)" }}
          />
        </div>

        {/* X shapes — SVG crosses scattered in the hero */}
        <div className="absolute top-[18%] left-[15%] animate-float-medium" style={{ animationDelay: "0.5s" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="opacity-20">
            <line x1="4" y1="4" x2="24" y2="24" stroke="#7B35FF" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="4" x2="4" y2="24" stroke="#7B35FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute bottom-[22%] right-[18%] animate-float-slow" style={{ animationDelay: "3s" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="opacity-15">
            <line x1="3" y1="3" x2="19" y2="19" stroke="#7B35FF" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="3" x2="3" y2="19" stroke="#7B35FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute top-[40%] left-[5%] animate-float-reverse" style={{ animationDelay: "1s" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-12">
            <line x1="2" y1="2" x2="16" y2="16" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="2" x2="2" y2="16" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute top-[70%] right-[25%] animate-float-medium" style={{ animationDelay: "4s" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-10">
            <line x1="2" y1="2" x2="12" y2="12" stroke="#7B35FF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="2" x2="2" y2="12" stroke="#7B35FF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Floating geometric shapes — brighter accents */}
        <FloatingShape
          className="animate-float-slow top-[15%] left-[10%] w-16 h-16 border border-accent/25 rounded-lg rotate-45"
          style={{ animationDelay: "0s" }}
        />
        <FloatingShape
          className="animate-float-medium top-[20%] right-[15%] w-12 h-12 bg-gradient-to-br from-accent/15 to-accent/15 rounded-full"
          style={{ animationDelay: "1s" }}
        />
        <FloatingShape
          className="animate-float-reverse bottom-[25%] left-[8%] w-20 h-20 border border-white/[0.08] rounded-2xl"
          style={{ animationDelay: "3s" }}
        />
        <FloatingShape
          className="animate-float-slow bottom-[20%] right-[12%] w-8 h-8 bg-accent/20 rounded-md rotate-12"
          style={{ animationDelay: "2s" }}
        />
        <FloatingShape
          className="animate-float-medium top-[60%] left-[25%] w-6 h-6 border border-accent/20 rounded-full"
          style={{ animationDelay: "4s" }}
        />

        {/* 3D tilted ring — large, behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none" style={{ perspective: 800 }}>
          <div
            className="w-full h-full rounded-full border border-accent/[0.08] animate-rotate-slow"
            style={{ transform: "rotateX(75deg)" }}
          />
        </div>

        {/* Top gradient line accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </motion.div>

      {/* X Brand — Glass & Scatter */}
      <XBrand variant="glass" />
      <XBrand variant="scatter" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center"
      >
        <motion.div
          style={{ transformPerspective: 1200, y: heroY }}
        >
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
          </h1>
        </motion.div>

        {/* No animation on subtitle — this is the LCP element, must be visible on first paint */}
        <p
          className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto"
          style={{ lineHeight: 1.6 }}
        >
          Toronto web design agency powered by AI. Custom websites, SEO,
          Shopify stores, and automation for businesses across the GTA.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE_EXPO }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 min-h-[44px] hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(123,53,255,0.5),0_0_48px_rgba(123,53,255,0.2)] active:translate-y-[2px] active:scale-[0.98]"
          >
            Start Your Project
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 min-h-[44px] hover:border-white/30 hover:bg-white/[0.06]"
          >
            View Services
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Stats counter row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: EASE_EXPO }}
          className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          <div className="text-center">
            <span ref={stat1.ref} className="block text-3xl sm:text-4xl font-display font-black text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
              {stat1.value}+
            </span>
            <span className="block mt-1 text-[0.7rem] uppercase text-white/40 font-semibold" style={{ letterSpacing: "0.1em" }}>
              GTA Projects
            </span>
          </div>
          <div className="text-center">
            <span ref={stat2.ref} className="block text-3xl sm:text-4xl font-display font-black text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
              {stat2.value}&times;
            </span>
            <span className="block mt-1 text-[0.7rem] uppercase text-white/40 font-semibold" style={{ letterSpacing: "0.1em" }}>
              Traffic
            </span>
          </div>
          <div className="text-center">
            <span ref={stat3.ref} className="block text-3xl sm:text-4xl font-display font-black text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
              {stat3.value}%
            </span>
            <span className="block mt-1 text-[0.7rem] uppercase text-white/40 font-semibold" style={{ letterSpacing: "0.1em" }}>
              Retention
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-content to-transparent z-10" />
    </section>
  );
}

/* ─── Gradient Bridge (dark-to-light transition) ──────── */

function GradientBridge() {
  return (
    <div
      className="w-full"
      style={{
        height: 120,
        background: "linear-gradient(to bottom, #14121e, #f8f8f8)",
      }}
    />
  );
}

/* ─── Core Services (Technology) ───────────────────────── */

const CORE_ICONS: Record<string, React.ReactNode> = {
  "web-development": <Code2 size={28} aria-hidden="true" />,
  seo: <Search size={28} aria-hidden="true" />,
  "ai-automation": <Bot size={28} aria-hidden="true" />,
};

function CoreServices() {
  return (
    <section className="relative bg-content py-24 lg:py-32 overflow-hidden">
      {/* Depth background */}
      <div className="absolute inset-0 dot-grid-light" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px] ambient-orb -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/[0.03] rounded-full blur-[100px] ambient-orb translate-y-1/3 -translate-x-1/4" />

      {/* Ambient light orb */}
      <div
        className="light-orb"
        style={{
          width: 400,
          height: 400,
          top: "20%",
          left: "10%",
          background: "radial-gradient(ellipse at 20% 60%, rgba(123,53,255,0.05) 0%, transparent 55%)",
        }}
      />

      {/* Faint grid texture */}
      <div className="absolute inset-0 faint-grid" />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 grid-lines opacity-50" />

      {/* Floating accents */}
      <FloatingShape className="animate-float-slow top-[10%] right-[5%] w-24 h-24 border border-accent/[0.06] rounded-2xl rotate-12" />
      <FloatingShape className="animate-float-reverse bottom-[15%] left-[3%] w-16 h-16 bg-accent/[0.03] rounded-full" style={{ animationDelay: "2s" }} />
      <FloatingShape className="animate-float-medium top-[50%] right-[8%] w-10 h-10 border border-accent/[0.08] rounded-lg rotate-45" style={{ animationDelay: "1s" }} />

      {/* Top edge accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      {/* X Assets — corners only */}
      <div className="absolute top-4 right-6 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.18 }}>
        <XBrand variant="stroke" size={48} />
      </div>
      <div className="absolute bottom-6 left-6 pointer-events-none z-0 hidden md:block">
        <SmallStaticX size={24} opacity={0.12} />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            Core Services
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-hero leading-tight">
            Technology That Drives Growth
          </h2>
          <p className="mt-4 text-lg text-hero/60 max-w-xl" style={{ lineHeight: 1.6 }}>
            We build, optimize, and automate. These are the services
            that make everything else work.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.12} as="article">
              <Card3D className="h-full">
                <MouseShine className="h-full">
                  <Link
                    href={`/services/${service.id}`}
                    className="group relative block h-full rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/20"
                    style={{
                      background: "rgba(255, 255, 255, 0.65)",
                      backdropFilter: "blur(20px) saturate(1.3)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.3)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.6)",
                      borderRadius: 16,
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:shadow-[0_8px_24px_rgba(123,53,255,0.3)]">
                        {CORE_ICONS[service.id]}
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-hero group-hover:text-accent transition-colors">
                        {service.name}
                      </h3>
                      <p className="mt-3 text-sm text-hero/50 leading-relaxed">
                        {service.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        Learn More <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </MouseShine>
              </Card3D>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── More Services (Design & Marketing) ───────────────── */

const MORE_ICONS: Record<string, React.ReactNode> = {
  "brand-strategy": <Palette size={20} aria-hidden="true" />,
  "logo-design": <PenTool size={20} aria-hidden="true" />,
  "digital-marketing": <BarChart3 size={20} aria-hidden="true" />,
  "social-media-marketing": <Megaphone size={20} aria-hidden="true" />,
  "marketing-campaigns": <Layers size={20} aria-hidden="true" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  Design: "bg-accent/20 text-gold border border-accent/20",
  Marketing: "bg-blue-500/20 text-blue-300 border border-blue-500/20",
};

function MoreServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: moreProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const moreY = useTransform(moreProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={sectionRef} className="relative bg-hero py-24 lg:py-32 overflow-hidden noise-overlay">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px] ambient-orb animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[130px] ambient-orb animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-700/[0.04] rounded-full blur-[100px] ambient-orb" />
      </div>

      {/* Grid pattern overlay with parallax */}
      <motion.div className="absolute inset-0 grid-lines-dark" style={{ y: moreY }} />

      {/* Floating 3D elements */}
      <FloatingShape
        className="animate-float-slow top-[8%] left-[6%] w-20 h-20 border border-white/[0.04] rounded-2xl rotate-12"
        style={{ animationDelay: "0.5s" }}
      />
      <FloatingShape
        className="animate-float-medium top-[15%] right-[10%] w-14 h-14 bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-xl rotate-[-8deg]"
        style={{ animationDelay: "2s" }}
      />
      <FloatingShape
        className="animate-float-reverse bottom-[12%] right-[6%] w-24 h-24 border border-accent/[0.06] rounded-full"
        style={{ animationDelay: "1s" }}
      />
      <FloatingShape
        className="animate-float-slow bottom-[20%] left-[12%] w-8 h-8 bg-white/[0.03] rounded-md rotate-45"
        style={{ animationDelay: "3s" }}
      />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* X Assets — corners only */}
      <div className="absolute top-6 right-8 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.35 }}>
        <XBrand variant="pulse" size={56} />
      </div>
      <div className="absolute bottom-8 left-10 pointer-events-none z-0 hidden md:block">
        <SmallStaticX size={24} opacity={0.15} />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            More Services
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Design & Marketing
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl" style={{ lineHeight: 1.6 }}>
            The creative and marketing side of what we do. Strategy, design, and
            execution under one roof.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MORE_SERVICES.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.1} as="article">
              <Card3D className="h-full">
                <MouseShine className="h-full">
                  <Link
                    href={`/services/${service.id}`}
                    className="group relative block h-full p-6 hover:bg-white/[0.08] hover:border-accent/30 transition-all duration-500"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      borderRadius: 16,
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white/70 group-hover:text-accent transition-colors">
                          {MORE_ICONS[service.id]}
                        </div>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            CATEGORY_COLORS[service.category]
                          }`}
                        >
                          {service.category}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-white group-hover:text-accent transition-colors">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/40 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </MouseShine>
              </Card3D>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How We Work (Process) ────────────────────────────── */

function Philosophy() {
  return (
    <section className="relative bg-content py-24 lg:py-32 overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 dot-grid-light" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.02] rounded-full blur-[120px] ambient-orb" />

      {/* Ambient light orb */}
      <div
        className="light-orb"
        style={{
          width: 350,
          height: 350,
          top: "30%",
          right: "15%",
          background: "radial-gradient(ellipse at 60% 40%, rgba(123,53,255,0.04) 0%, transparent 55%)",
          animationDelay: "-8s",
        }}
      />

      {/* Faint grid texture */}
      <div className="absolute inset-0 faint-grid" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      {/* Floating geometric shapes */}
      <FloatingShape className="animate-float-slow top-[10%] right-[8%] w-32 h-32 border border-accent/[0.04] rounded-full" />
      <FloatingShape className="animate-float-medium bottom-[10%] left-[5%] w-20 h-20 border border-accent/[0.06] rounded-2xl rotate-12" style={{ animationDelay: "1.5s" }} />

      {/* X Assets — corners only */}
      <div className="absolute top-5 left-5 pointer-events-none z-0 hidden md:block">
        <SmallStaticX size={20} opacity={0.10} />
      </div>
      <div className="absolute bottom-8 right-10 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.15 }}>
        <XBrand variant="stroke" size={56} />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            Our Process
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-hero leading-tight">
            How We Work
          </h2>
          <p className="mt-4 text-lg text-hero/50 max-w-xl" style={{ lineHeight: 1.6 }}>
            A proven four-step process that turns vision into measurable results.
          </p>
        </FadeIn>

        {/* Process Steps — numbered cards with connecting line */}
        <div className="mt-16 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.12}>
                <div className="group relative">
                  {/* Step number — floating above card */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 mx-auto mb-6 rounded-full bg-accent/10 group-hover:bg-accent group-hover:shadow-[0_8px_24px_rgba(123,53,255,0.3)] transition-all duration-500">
                    <span className="text-sm font-bold text-accent group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  {/* Glass card */}
                  <div
                    className="relative rounded-2xl p-6 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-accent/5"
                    style={{
                      background: "rgba(255, 255, 255, 0.55)",
                      backdropFilter: "blur(16px) saturate(1.2)",
                      WebkitBackdropFilter: "blur(16px) saturate(1.2)",
                      border: "1px solid rgba(255,255,255,0.7)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    <h3 className="text-xl font-bold text-hero group-hover:text-accent transition-colors duration-300 text-center">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-hero/50 leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Philosophy pillars below */}
        <div className="mt-24 pt-16 border-t border-black/5">
          <FadeIn>
            <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
              Our Philosophy
            </p>
          </FadeIn>
          <div className="mt-10 space-y-0 divide-y divide-black/5">
            {PHILOSOPHY_ROWS.map((row, i) => (
              <FadeIn key={row.label} delay={i * 0.15}>
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
      </div>
    </section>
  );
}

/* ─── Client Marquee ───────────────────────────────────── */

function ClientMarquee() {
  const doubled = [...CLIENT_TYPES, ...CLIENT_TYPES];

  return (
    <section className="relative bg-hero py-16 lg:py-24 overflow-hidden noise-overlay">
      {/* Depth background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[400px] h-[300px] bg-accent/[0.04] rounded-full blur-[120px] ambient-orb" />
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[200px] bg-accent/[0.03] rounded-full blur-[100px] ambient-orb" />
      </div>
      <div className="absolute inset-0 dot-grid-dark opacity-30" />

      {/* Edge accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            Who We Serve
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
            Built for Every Industry
          </h2>
        </FadeIn>
      </div>

      {/* Row 1: Left to right — service names */}
      <div
        className="relative"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 0",
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-hero to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-hero to-transparent z-10" />

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
            <span
              key={`${client}-${i}`}
              className="flex-none flex items-center"
            >
              <span
                className="text-base font-medium text-white/40"
                style={{ letterSpacing: "0.08em" }}
              >
                {client}
              </span>
              <span
                className="mx-4"
                style={{ color: "#7B35FF", opacity: 0.6, fontSize: "0.75rem" }}
              >
                ◆
              </span>
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

/* ─── FAQ Section ─────────────────────────────────────── */

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.05}>
      <div
        className="border-b border-black/5 last:border-b-0"
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
          aria-expanded={open}
        >
          <h3 className="text-base sm:text-lg font-semibold text-hero pr-8 group-hover:text-accent transition-colors">
            {question}
          </h3>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 text-accent text-lg font-light"
          >
            +
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: EASE_EXPO }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-sm sm:text-base text-hero/60 leading-relaxed max-w-3xl">
            {answer}
          </p>
        </motion.div>
      </div>
    </FadeIn>
  );
}

function FAQSection() {
  return (
    <section className="relative bg-content py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid-light" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[120px] ambient-orb" />
      <div className="absolute inset-0 faint-grid" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            FAQ
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-hero leading-tight">
            Common questions
          </h2>
          <p className="mt-4 text-lg text-hero/50 max-w-xl" style={{ lineHeight: 1.6 }}>
            Questions we hear most from GTA business owners.
          </p>
        </FadeIn>

        <div className="mt-12">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why DOTxLabs ────────────────────────────────────── */

function WhyDOTxLabs() {
  return (
    <section className="relative bg-hero py-24 lg:py-32 overflow-hidden noise-overlay">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[130px] ambient-orb animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-600/[0.04] rounded-full blur-[100px] ambient-orb animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>
      <div className="absolute inset-0 dot-grid-dark opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            Why DOTxLabs
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            What makes us different
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {WHY_DOTXLABS.map((item, i) => (
            <FadeIn key={item.heading} delay={i * 0.1}>
              <div
                className="group p-8 rounded-2xl hover:bg-white/[0.06] transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16,
                }}
              >
                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
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

/* ─── Results / Proof ─────────────────────────────────── */

function ResultsSection() {
  return (
    <section className="relative bg-content py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid-light" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.02] rounded-full blur-[120px] ambient-orb" />
      <div className="absolute inset-0 faint-grid" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            Results
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-hero leading-tight">
            What our work looks like in numbers
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {RESULTS_HIGHLIGHTS.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.12}>
              <div
                className="group relative rounded-2xl p-8 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5"
                style={{
                  background: "rgba(255, 255, 255, 0.65)",
                  backdropFilter: "blur(20px) saturate(1.3)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.3)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.6)",
                  borderRadius: 16,
                }}
              >
                <span className="block text-4xl sm:text-5xl font-display font-black text-accent">
                  {item.stat}
                </span>
                <h3 className="mt-2 text-lg font-bold text-hero">
                  {item.label}
                </h3>
                <p className="mt-4 text-sm text-hero/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Industries Expanded ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section className="relative bg-hero py-24 lg:py-32 overflow-hidden noise-overlay">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[130px] ambient-orb" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] ambient-orb" />
      </div>
      <div className="absolute inset-0 dot-grid-dark opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase text-accent" style={{ letterSpacing: "0.15em" }}>
            Industries We Work With
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Built for every kind of business
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl" style={{ lineHeight: 1.6 }}>
            From local trades to tech startups, we understand how different businesses
            need to show up online. Here&apos;s who we work with.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_EXPANDED.map((industry, i) => (
            <FadeIn key={industry.name} delay={i * 0.08}>
              <div
                className="p-6 rounded-2xl hover:bg-white/[0.08] transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16,
                }}
              >
                <h3 className="text-lg font-bold text-white">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ───────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="relative bg-hero py-24 lg:py-32 overflow-hidden">
      {/* Grain noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
      />

      {/* Large radial glow behind headline */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 500,
          height: 300,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(123,53,255,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.6,
        }}
      />

      {/* Rich gradient depth */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] ambient-orb animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/8 rounded-full blur-[100px] ambient-orb animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-blue-500/5 rounded-full blur-[80px] ambient-orb" />
      </div>

      {/* Grid + dot pattern */}
      <div className="absolute inset-0 grid-lines-dark opacity-40 z-0" />
      <div className="absolute inset-0 dot-grid-dark opacity-20 z-0" />

      {/* Floating shapes */}
      <FloatingShape className="animate-float-slow top-[15%] left-[10%] w-16 h-16 border border-accent/10 rounded-2xl rotate-12" />
      <FloatingShape className="animate-float-medium bottom-[15%] right-[10%] w-12 h-12 border border-white/[0.04] rounded-full" style={{ animationDelay: "1.5s" }} />
      <FloatingShape className="animate-float-reverse top-[20%] right-[15%] w-20 h-20 border border-accent/[0.06] rounded-xl rotate-[-6deg]" style={{ animationDelay: "3s" }} />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent z-0" />

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
            Ready to Build Something Great?
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto" style={{ lineHeight: 1.6 }}>
            Tell us what you're working on. We'll tell you how we can help.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-300 min-h-[44px] hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(123,53,255,0.5),0_0_48px_rgba(123,53,255,0.2)] active:translate-y-[2px] active:scale-[0.98]"
            >
              Start Your Project
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
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
      <GradientBridge />
      <CoreServices />
      <MoreServices />
      <Philosophy />
      <WhyDOTxLabs />
      <ResultsSection />
      <IndustriesSection />
      <ClientMarquee />
      <FAQSection />
      <CTABanner />
    </>
  );
}
