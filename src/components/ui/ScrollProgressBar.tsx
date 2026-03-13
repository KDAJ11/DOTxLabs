"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9998,
        background: "linear-gradient(to right, #7c3aed, #a855f7)",
        transformOrigin: "left",
      }}
    />
  );
}
