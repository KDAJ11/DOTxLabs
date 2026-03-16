"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import ContactEnvelope from "@/components/animations/ContactEnvelope";
import PageFrame from "@/components/ui/PageFrame";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { SERVICES } from "@/lib/data";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_LINES = [
  "Usually responds same day",
  "Based in Toronto / GTA",
  "AI-powered. Human-led.",
];

const HERO_WORDS = "Start Your Project".split(" ");

function CyclingStatus() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_LINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reduced]);

  if (reduced) {
    return (
      <p className="mt-4 text-sm text-white/40 italic">{STATUS_LINES[0]}</p>
    );
  }

  return (
    <div className="mt-4 h-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: EASE_EXPO }}
          className="text-sm text-white/40 italic absolute inset-x-0"
        >
          {STATUS_LINES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");
  const reduced = useReducedMotion();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("loading");

    // Brief loading state before mailto
    setTimeout(() => {
      const subject = encodeURIComponent(
        `New Project Inquiry — ${formData.service || "General"}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:david@dotxlabs.com?subject=${subject}&body=${body}`;
      setSubmitState("success");

      setTimeout(() => setSubmitState("idle"), 3000);
    }, 800);
  }

  const fieldClasses =
    "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-hero placeholder:text-hero/30 transition-all duration-200 min-h-[44px] focus:outline-none focus:border-[#7B35FF] focus:shadow-[0_0_0_3px_rgba(123,53,255,0.15)]";

  // Form fields config for stagger
  const fields = [
    { id: "name-email", delay: 0 },
    { id: "company-service", delay: 0.08 },
    { id: "message", delay: 0.16 },
    { id: "submit", delay: 0.24 },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative hero-mesh pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Orbs */}
        <div className="hero-orb-1" style={{ top: "5%", left: "8%", right: "auto" }} />
        <div className="hero-orb-2" style={{ bottom: "10%", right: "5%", left: "auto" }} />

        {/* X Assets — corners only */}
        <div className="absolute pointer-events-none z-0 hidden md:block" style={{ top: -40, right: -60, opacity: 0.12 }}>
          <XBrand variant="glass" />
        </div>
        <div className="absolute bottom-6 left-6 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={24} opacity={0.08} />
        </div>

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs font-semibold uppercase text-accent"
            style={{ letterSpacing: "0.15em" }}
          >
            Get in Touch
          </motion.p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-tight">
            {HERO_WORDS.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em] -mb-[0.15em]">
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
          {/* Envelope icon — centred below headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: EASE_EXPO }}
            className="mt-6 flex justify-center"
          >
            <ContactEnvelope />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE_EXPO }}
            className="mt-6 text-lg text-white/50 max-w-xl mx-auto"
            style={{ lineHeight: 1.6 }}
          >
            Tell us about your brand and what you&apos;re looking to build.
            We&apos;ll get back to you within 24 hours.
          </motion.p>
          <CyclingStatus />
        </div>
      </section>

      {/* Form Section */}
      <section className="relative bg-content py-20 lg:py-28 overflow-hidden">
        {/* Faint grid texture */}
        <div className="absolute inset-0 faint-grid" />

        {/* Ambient light orb */}
        <div
          className="light-orb"
          style={{
            width: 350,
            height: 350,
            top: "20%",
            right: "10%",
            background: "radial-gradient(ellipse at 60% 40%, rgba(123,53,255,0.04) 0%, transparent 55%)",
          }}
        />

        {/* X Asset — top-right corner only */}
        <div className="absolute top-4 right-4 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.12 }}>
          <XBrand variant="stroke" size={32} />
        </div>

        <PageFrame variant="light">
          <ParallaxSection speed={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Contact info */}
              <AnimateOnScroll className="lg:col-span-2">
                <AnimatedHeading text="Contact Info" as="h2" className="text-2xl font-display font-black text-hero" />
                <div className="mt-8 space-y-6">
                  <a
                    href="mailto:david@dotxlabs.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/10">
                      <Mail
                        size={18}
                        className="text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-hero/40 uppercase font-semibold" style={{ letterSpacing: "0.15em" }}>
                        Email
                      </p>
                      <p className="text-sm font-medium text-hero group-hover:text-accent transition-colors">
                        david@dotxlabs.com
                      </p>
                    </div>
                  </a>

                  <a href="tel:+16474603641" className="flex items-center gap-4 group">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/10">
                      <Phone
                        size={18}
                        className="text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-hero/40 uppercase font-semibold" style={{ letterSpacing: "0.15em" }}>
                        Phone
                      </p>
                      <p className="text-sm font-medium text-hero group-hover:text-accent transition-colors">
                        647-460-3641
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/10">
                      <MapPin
                        size={18}
                        className="text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-hero/40 uppercase font-semibold" style={{ letterSpacing: "0.15em" }}>
                        Location
                      </p>
                      <p className="text-sm font-medium text-hero">
                        Toronto / GTA, Canada
                      </p>
                    </div>
                  </div>
                </div>

                {/* Available badge */}
                <div className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white/50 border border-black/[0.06] px-4 py-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="sonar-dot absolute inline-flex h-full w-full rounded-full bg-green-500" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-sm text-hero/60 font-medium">
                    Available for new projects
                  </span>
                </div>
              </AnimateOnScroll>

              {/* Form */}
              <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
                {/* Row 1: Name + Email */}
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: EASE_EXPO }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-hero/70 mb-2 transition-all duration-150"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={fieldClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-hero/70 mb-2 transition-all duration-150"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClasses}
                      placeholder="you@company.com"
                    />
                  </div>
                </motion.div>

                {/* Row 2: Company + Service */}
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.68, ease: EASE_EXPO }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  style={{ willChange: "transform, opacity" }}
                >
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-hero/70 mb-2 transition-all duration-150"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={fieldClasses}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-hero/70 mb-2 transition-all duration-150"
                    >
                      Service *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={`${fieldClasses} appearance-none`}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.76, ease: EASE_EXPO }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-hero/70 mb-2 transition-all duration-150"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClasses} resize-y`}
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.84, ease: EASE_EXPO }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <button
                    type="submit"
                    disabled={submitState === "loading"}
                    className={`group inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-medium text-white transition-all duration-200 min-h-[44px] active:translate-y-[1px] ${
                      submitState === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-accent hover:bg-accent-hover"
                    }`}
                  >
                    {submitState === "loading" ? (
                      <>
                        <span className="loading-dot" />
                        <span className="loading-dot" />
                        <span className="loading-dot" />
                      </>
                    ) : submitState === "success" ? (
                      <>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        >
                          <Check size={16} aria-hidden="true" />
                        </motion.span>
                        Message Sent
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </div>
        </ParallaxSection>
        </PageFrame>
      </section>
    </>
  );
}
