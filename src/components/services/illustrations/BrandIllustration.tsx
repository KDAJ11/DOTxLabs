"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import { loopTransition, interiorFill } from "./animationUtils";

export default function BrandIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  // Helper to compute keyframe times
  const getKeyframes = (startDelay: number, drawDuration: number) => {
    const s = Math.max(startDelay / 6, 0.001);
    const e = Math.min((startDelay + drawDuration) / 6, 5 / 6 - 0.01);
    const holdEnd = 5 / 6;
    return {
      values: [0, 0, 1, 1, 0],
      times: [0, s, e, holdEnd, 1],
    };
  };

  const headerKeyframes = getKeyframes(0, 0.5);
  const swatch1Keyframes = getKeyframes(0.5, 0.4);
  const swatch2Keyframes = getKeyframes(0.8, 0.4);
  const swatch3Keyframes = getKeyframes(1.1, 0.4);
  const swatch4Keyframes = getKeyframes(1.4, 0.4);
  const typo1Keyframes = getKeyframes(1.5, 0.5);
  const typo2Keyframes = getKeyframes(1.8, 0.5);
  const xLine1Keyframes = getKeyframes(2.5, 0.5);
  const xLine2Keyframes = getKeyframes(2.7, 0.5);
  const circleKeyframes = getKeyframes(3.5, 0.8);
  const cornerDotsKeyframes = getKeyframes(3.2, 0.6);

  return (
    <svg
      ref={ref}
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-auto"
      style={{ maxWidth: 560 }}
    >
      {/* HEADER LINE (Title bar) */}
      <motion.path
        d="M 15 18 L 265 18"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: headerKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: headerKeyframes.times }
            : undefined
        }
      />

      {/* COLOUR SWATCHES (LEFT SIDE, STACKED VERTICALLY) */}
      {/* Swatch 1 */}
      <motion.rect
        x={15}
        y={25}
        width={40}
        height={25}
        rx={3}
        fill="rgba(123, 53, 255, 0.4)"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: swatch1Keyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: swatch1Keyframes.times }
            : undefined
        }
      />

      {/* Swatch 2 */}
      <motion.rect
        x={15}
        y={55}
        width={40}
        height={25}
        rx={3}
        fill="rgba(123, 53, 255, 0.25)"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: swatch2Keyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: swatch2Keyframes.times }
            : undefined
        }
      />

      {/* Swatch 3 */}
      <motion.rect
        x={15}
        y={85}
        width={40}
        height={25}
        rx={3}
        fill="rgba(123, 53, 255, 0.15)"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: swatch3Keyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: swatch3Keyframes.times }
            : undefined
        }
      />

      {/* Swatch 4 */}
      <motion.rect
        x={15}
        y={115}
        width={40}
        height={25}
        rx={3}
        fill="rgba(123, 53, 255, 0.08)"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: swatch4Keyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: swatch4Keyframes.times }
            : undefined
        }
      />

      {/* TYPOGRAPHY SAMPLES (RIGHT SIDE) */}
      {/* Typography Line 1 (longer) */}
      <motion.path
        d="M 80 40 L 170 40"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: typo1Keyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: typo1Keyframes.times }
            : undefined
        }
      />

      {/* Typography Line 2 (shorter) */}
      <motion.path
        d="M 80 65 L 145 65"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: typo2Keyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: typo2Keyframes.times }
            : undefined
        }
      />

      {/* LOGO MARK: X (CENTER) */}
      {/* X Line 1 (top-left to bottom-right) */}
      <motion.path
        d="M 120 110 L 160 150"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: xLine1Keyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: xLine1Keyframes.times }
            : undefined
        }
      />

      {/* X Line 2 (top-right to bottom-left) */}
      <motion.path
        d="M 160 110 L 120 150"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: xLine2Keyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: xLine2Keyframes.times }
            : undefined
        }
      />

      {/* CIRCLE AROUND X */}
      <motion.circle
        cx={140}
        cy={130}
        r={23}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: circleKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: circleKeyframes.times }
            : undefined
        }
      />

      {/* CORNER DOTS (Grid alignment markers) */}
      {/* Top-left corner */}
      <motion.circle
        cx={15}
        cy={15}
        r={2}
        fill="#7B35FF"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: cornerDotsKeyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: cornerDotsKeyframes.times }
            : undefined
        }
      />

      {/* Top-right corner */}
      <motion.circle
        cx={265}
        cy={15}
        r={2}
        fill="#7B35FF"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: cornerDotsKeyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: cornerDotsKeyframes.times }
            : undefined
        }
      />

      {/* Bottom-left corner */}
      <motion.circle
        cx={15}
        cy={185}
        r={2}
        fill="#7B35FF"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: cornerDotsKeyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: cornerDotsKeyframes.times }
            : undefined
        }
      />

      {/* Bottom-right corner */}
      <motion.circle
        cx={265}
        cy={185}
        r={2}
        fill="#7B35FF"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: cornerDotsKeyframes.values }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: cornerDotsKeyframes.times }
            : undefined
        }
      />
    </svg>
  );
}
