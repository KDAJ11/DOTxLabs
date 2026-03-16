"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─── Service section metadata ──────────────────────── */
const SERVICE_SECTIONS = [
  { id: "web-development", label: "Web Dev" },
  { id: "seo", label: "SEO" },
  { id: "ai-automation", label: "AI Automation" },
  { id: "brand-strategy", label: "Brand Identity" },
  { id: "logo-design", label: "Logo Design" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "social-media-marketing", label: "Social Media" },
  { id: "marketing-campaigns", label: "Full Campaigns" },
] as const;

const DOT_REST = 8;
const DOT_ACTIVE = 10;
const DOT_MOBILE = 6;
const DOT_MOBILE_ACTIVE = 8;

export default function ServiceNavDots() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* ─── IntersectionObserver: detect active section ─── */
  useEffect(() => {
    const sectionEls = SERVICE_SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter(Boolean) as HTMLElement[];

    if (sectionEls.length === 0) return;

    // Track visibility of entire services area to show/hide dots
    const firstSection = sectionEls[0];
    const lastSection = sectionEls[sectionEls.length - 1];

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setVisible(anyVisible);
      },
      { threshold: 0.05 }
    );
    sectionEls.forEach((el) => visibilityObserver.observe(el));

    // Track which section is most visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > bestRatio
          ) {
            bestId = entry.target.id;
            bestRatio = entry.intersectionRatio;
          }
        });
        if (bestId) setActiveId(bestId);
      },
      { threshold: 0.4 }
    );

    sectionEls.forEach((el) => observerRef.current!.observe(el));

    return () => {
      visibilityObserver.disconnect();
      observerRef.current?.disconnect();
    };
  }, []);

  /* ─── Scroll to section ───────────────────────────── */
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
          aria-label="Service sections"
          style={{ willChange: "transform, opacity" }}
        >
          {SERVICE_SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            const isHovered = hoveredId === section.id;

            return (
              <div key={section.id} className="relative flex items-center">
                {/* Tooltip — hidden on mobile/touch */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#0d0d17] px-2 py-1 text-xs text-white hidden lg:block"
                      style={{
                        willChange: "transform, opacity",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot button */}
                <button
                  onClick={() => scrollTo(section.id)}
                  onMouseEnter={() => setHoveredId(section.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative flex items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    minWidth: 44,
                    minHeight: 44,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                  }}
                  aria-label={`Scroll to ${section.label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Pulse ring — active only, desktop only */}
                  {isActive && !reduced && (
                    <motion.span
                      className="absolute rounded-full hidden lg:block"
                      style={{
                        border: "1px solid rgba(123,53,255,0.5)",
                        willChange: "transform, opacity",
                      }}
                      initial={{ width: DOT_ACTIVE, height: DOT_ACTIVE, opacity: 0.6 }}
                      animate={{
                        width: [DOT_ACTIVE, 22],
                        height: [DOT_ACTIVE, 22],
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "easeOut",
                      }}
                    />
                  )}

                  {/* Desktop dot */}
                  <motion.span
                    className="rounded-full hidden lg:block"
                    animate={{
                      width: isActive ? DOT_ACTIVE : DOT_REST,
                      height: isActive ? DOT_ACTIVE : DOT_REST,
                      backgroundColor: isActive
                        ? "#7B35FF"
                        : "transparent",
                      borderColor: isActive
                        ? "#7B35FF"
                        : "rgba(123,53,255,0.4)",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      border: "1.5px solid rgba(123,53,255,0.4)",
                      willChange: "transform",
                    }}
                  />

                  {/* Mobile dot */}
                  <motion.span
                    className="rounded-full block lg:hidden"
                    animate={{
                      width: isActive ? DOT_MOBILE_ACTIVE : DOT_MOBILE,
                      height: isActive ? DOT_MOBILE_ACTIVE : DOT_MOBILE,
                      backgroundColor: isActive
                        ? "#7B35FF"
                        : "transparent",
                      borderColor: isActive
                        ? "#7B35FF"
                        : "rgba(123,53,255,0.4)",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      border: "1.5px solid rgba(123,53,255,0.4)",
                      willChange: "transform",
                    }}
                  />
                </button>
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
