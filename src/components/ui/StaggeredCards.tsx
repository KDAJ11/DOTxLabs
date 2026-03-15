"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface StaggeredCardsProps {
  children: ReactNode[];
  className?: string;
  staggerMs?: number;
}

/** Wrap a grid of cards — each child stagger-reveals on scroll */
export function StaggeredCards({
  children,
  className = "",
  staggerMs = 120,
}: StaggeredCardsProps) {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerMs / 1000,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

/** Individual card within StaggeredCards */
export function StaggeredCard({
  children,
  className = "",
  hoverEffect = true,
}: StaggeredCardProps) {
  const reduced = useReducedMotion();

  const cardVariants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 50, scale: 0.97 },
    visible: reduced
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: EASE_SMOOTH,
          },
        },
  };

  const hoverProps = hoverEffect && !reduced
    ? {
        whileHover: {
          scale: 1.02,
          y: -4,
          transition: { duration: 0.25, ease: EASE_SMOOTH },
        },
      }
    : {};

  return (
    <motion.div
      variants={cardVariants}
      className={className}
      style={{
        willChange: "transform, opacity",
        ...(hoverEffect
          ? { transition: "box-shadow 0.3s ease" }
          : {}),
      }}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
}
