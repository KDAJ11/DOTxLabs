"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode, CSSProperties } from "react";

interface BackgroundTransitionProps {
  children: ReactNode;
  from: string;
  to: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Crossfade between two background colors as user scrolls through the section.
 * The transition happens at the top boundary of the section.
 */
export default function BackgroundTransition({
  children,
  from,
  to,
  className = "",
  style,
}: BackgroundTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const backgroundColor = useTransform(scrollYProgress, [0, 1], [from, to]);

  if (reduced) {
    return (
      <div
        ref={ref}
        className={className}
        style={{ ...style, background: to }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundColor,
        willChange: "background-color",
      }}
    >
      {children}
    </motion.div>
  );
}
