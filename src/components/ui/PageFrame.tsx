"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface PageFrameProps {
  children: ReactNode;
  className?: string;
  /** Whether to use light border (for dark backgrounds) or dark border (for light backgrounds) */
  variant?: "dark" | "light";
}

export default function PageFrame({
  children,
  className = "",
  variant = "dark",
}: PageFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle scale shift on scroll for depth
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.995, 1, 0.995]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.92, 1, 1, 0.92]);

  const borderColor =
    variant === "dark"
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(0, 0, 0, 0.06)";

  const shadowColor =
    variant === "dark"
      ? "inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 0 40px rgba(123, 53, 255, 0.03)"
      : "inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 0 40px rgba(0, 0, 0, 0.02)";

  if (reduced) {
    return (
      <div
        ref={ref}
        className={`rounded-2xl overflow-hidden ${className}`}
        style={{
          border: `1px solid ${borderColor}`,
          boxShadow: shadowColor,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        scale,
        opacity,
        border: `1px solid ${borderColor}`,
        boxShadow: shadowColor,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
