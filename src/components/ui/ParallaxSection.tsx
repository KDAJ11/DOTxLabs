"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Parallax speed multiplier. Positive = moves up slower (content drift). */
  speed?: number;
  as?: "div" | "section";
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.15,
  as = "div",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Content drifts upward at speed multiplier
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  const Component = motion[as] as typeof motion.div;

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Component
        style={{ y, willChange: "transform" }}
      >
        {children}
      </Component>
    </div>
  );
}

/** Stronger parallax for hero visuals / floating elements */
export function ParallaxFloat({
  children,
  className = "",
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 150, -speed * 150]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
