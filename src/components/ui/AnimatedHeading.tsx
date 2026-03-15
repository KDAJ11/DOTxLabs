"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  staggerMs?: number;
  /** If true, animates on page load instead of scroll */
  immediate?: boolean;
}

export default function AnimatedHeading({
  text,
  as: Tag = "h2",
  className = "",
  staggerMs = 80,
  immediate = false,
}: AnimatedHeadingProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerMs / 1000,
      },
    },
  };

  const wordVariants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 30 },
    visible: reduced
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: EASE_SMOOTH,
          },
        },
  };

  const motionProps = immediate
    ? {
        initial: "hidden" as const,
        animate: "visible" as const,
      }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-100px" },
      };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        {...motionProps}
        className="inline"
        style={{ willChange: "transform, opacity" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden mr-[0.3em] pb-[0.1em] -mb-[0.1em]"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
