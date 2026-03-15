"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface AnimateOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  duration?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}

export default function AnimateOnScroll({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
  as = "div",
}: AnimateOnScrollProps) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  const directionMap = {
    up: { x: 0, y: 40 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    <Component
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: EASE_SMOOTH }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </Component>
  );
}
