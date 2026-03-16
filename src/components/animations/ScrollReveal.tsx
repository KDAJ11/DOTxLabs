"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

const EASE_CLIP: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface ScrollRevealProps {
  children: ReactNode;
  /** Additional delay in seconds (on top of any stagger) */
  delay?: number;
  /** Optional className on the wrapper */
  className?: string;
  /** If true, staggers children by 0.1s each */
  stagger?: boolean;
}

/**
 * Clip-reveal wrapper — content slides up from behind a mask.
 *
 * - Parent: overflow hidden
 * - Child: y 24→0 (16 on mobile via CSS), opacity 0→1
 * - whileInView, once: true, viewport margin -40px
 * - Reduced motion: renders plain <div>, no animation
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className,
  stagger = false,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  // Reduced motion: render as plain div, no animation wrapper
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  // If stagger mode, wrap each child individually with incremental delay
  if (stagger) {
    const childArray = Children.toArray(children);
    return (
      <div className={className}>
        {childArray.map((child, index) => {
          if (!isValidElement(child)) return child;
          return (
            <div key={index} style={{ overflow: "hidden" }}>
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: delay + index * 0.1,
                  ease: EASE_CLIP,
                }}
                style={{ willChange: "transform, opacity" }}
              >
                {child}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  }

  // Single element reveal
  return (
    <div style={{ overflow: "hidden" }} className={className}>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          delay,
          ease: EASE_CLIP,
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
