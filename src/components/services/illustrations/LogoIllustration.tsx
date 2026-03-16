"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import { interiorFill } from "./animationUtils";

const CYCLE = 6;
const DRAW_WINDOW = 4;
const RESET_START = 5;

/**
 * Helper to compute strokeKeyframes for a stroke
 */
function strokeKeyframes(startDelay: number, drawDuration: number) {
  const s = Math.max(startDelay / CYCLE, 0.001);
  const e = Math.min((startDelay + drawDuration) / CYCLE, RESET_START / CYCLE - 0.01);
  const holdEnd = RESET_START / CYCLE;

  return {
    values: [0, 0, 1, 1, 0],
    times: [0, s, e, holdEnd, 1],
  };
}

/**
 * Helper to compute fadeKeyframes for opacity
 */
function fadeKeyframes(startDelay: number, fadeDuration: number) {
  const s = Math.max(startDelay / CYCLE, 0.001);
  const e = Math.min((startDelay + fadeDuration) / CYCLE, RESET_START / CYCLE - 0.01);
  const holdEnd = RESET_START / CYCLE;

  return {
    values: [0, 0, 1, 1, 0],
    times: [0, s, e, holdEnd, 1],
  };
}

const loopTransition = {
  duration: CYCLE,
  repeat: Infinity,
  ease: "linear" as const,
};

/**
 * LogoIllustration: Pen tool tracing a bezier path that resolves into an X shape.
 */
export default function LogoIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const reduced = useReducedMotion();

  // Bezier path that traces from lower-left to upper-right
  const bezierPath = "M 60 140 Q 120 120 160 80 T 220 40";

  // X shape: two crossing diagonals
  const xLine1 = "M 80 60 L 200 140";
  const xLine2 = "M 200 60 L 80 140";

  // Anchor points along the path (4 points)
  const anchors = [
    { x: 60, y: 140 },
    { x: 120, y: 120 },
    { x: 160, y: 80 },
    { x: 220, y: 40 },
  ];

  // Control handle lines for middle anchors (simplified representation)
  // Anchor 1 (120, 120): left and right handles
  const handle1Left = "M 100 130 L 120 120";
  const handle1Right = "M 120 120 L 140 110";

  // Anchor 2 (160, 80): left and right handles
  const handle2Left = "M 140 90 L 160 80";
  const handle2Right = "M 160 80 L 180 70";

  // Pen cursor position interpolation (simple approximation)
  // At t=0-2s, pen moves along the path
  const penMotion = {
    values: [0, 0, 1, 1, 1, 0], // x position as fraction of path
    times: [0, 0, 2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
  };

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
      {/* Main bezier path that draws */}
      <motion.path
        d={bezierPath}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={{
          visible: {
            pathLength: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 0, 2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Anchor point 1 */}
      <motion.rect
        x={anchors[0].x - 2}
        y={anchors[0].y - 2}
        width={4}
        height={4}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill="none"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 0.5 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Anchor point 2 */}
      <motion.rect
        x={anchors[1].x - 2}
        y={anchors[1].y - 2}
        width={4}
        height={4}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill="none"
        variants={{
          visible: {
            opacity: [0, 0, 0.7 / CYCLE, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 0.7 / CYCLE, 1.2 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Anchor point 3 */}
      <motion.rect
        x={anchors[2].x - 2}
        y={anchors[2].y - 2}
        width={4}
        height={4}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill="none"
        variants={{
          visible: {
            opacity: [0, 1.2 / CYCLE, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.2 / CYCLE, 1.7 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Anchor point 4 */}
      <motion.rect
        x={anchors[3].x - 2}
        y={anchors[3].y - 2}
        width={4}
        height={4}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill="none"
        variants={{
          visible: {
            opacity: [0, 1.6 / CYCLE, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.6 / CYCLE, 2.0 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Control handle 1 left */}
      <motion.path
        d={handle1Left}
        stroke="#7B35FF"
        strokeWidth={1}
        strokeDasharray="2,2"
        fill="none"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Control handle 1 right */}
      <motion.path
        d={handle1Right}
        stroke="#7B35FF"
        strokeWidth={1}
        strokeDasharray="2,2"
        fill="none"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Control handle 2 left */}
      <motion.path
        d={handle2Left}
        stroke="#7B35FF"
        strokeWidth={1}
        strokeDasharray="2,2"
        fill="none"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.2 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Control handle 2 right */}
      <motion.path
        d={handle2Right}
        stroke="#7B35FF"
        strokeWidth={1}
        strokeDasharray="2,2"
        fill="none"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.2 / CYCLE, 2.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Pen cursor icon group */}
      <motion.g
        initial={{ x: 60 }}
        animate={
          inView && !reduced
            ? { x: [60, 60, 220, 220, 220, 60] }
            : { x: reduced ? 220 : 60 }
        }
        transition={
          inView && !reduced
            ? {
                ...loopTransition,
                times: [0, 0, 2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
              }
            : undefined
        }
      >
        {/* Pen nib shape */}
        <motion.path
          d="M 0 -6 L 3 0 L 0 6 L -3 0 Z"
          stroke="#7B35FF"
          strokeWidth={1.5}
          fill="rgba(123, 53, 255, 0.1)"
          initial={{ opacity: 0 }}
          animate={
            inView && !reduced
              ? {
                  opacity: [0, 0, 1, 1, 1, 0],
                }
              : { opacity: reduced ? 1 : 0 }
          }
          transition={
            inView && !reduced
              ? {
                  ...loopTransition,
                  times: [0, 0, 2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
                }
              : undefined
          }
        />
      </motion.g>

      {/* X mark line 1 - appears after bezier resolves */}
      <motion.path
        d={xLine1}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={{
          visible: {
            pathLength: [0, 0, 1, 1, 1, 0],
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 2.5 / CYCLE, 3.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView && !reduced
            ? "visible"
            : reduced
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
        }
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* X mark line 2 - appears after bezier resolves */}
      <motion.path
        d={xLine2}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={{
          visible: {
            pathLength: [0, 0, 1, 1, 1, 0],
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 2.5 / CYCLE, 3.5 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          inView && !reduced
            ? "visible"
            : reduced
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
        }
        transition={inView && !reduced ? loopTransition : undefined}
      />
    </svg>
  );
}
