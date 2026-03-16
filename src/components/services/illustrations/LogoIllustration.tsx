"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useInView, useReducedMotion } from "motion/react";
import {
  CYCLE,
  RESET_START,
  strokeKeyframes,
  fadeKeyframes,
  loopTransition,
  svgProps,
  strokeStyle,
} from "./animationUtils";

export default function LogoIllustration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = isInView && !prefersReducedMotion;

  // Phase 1: Sketching (0–1.5s) - rough bezier path
  const roughPath =
    "M 100 50 C 100 50 160 40 170 70 C 180 100 170 140 140 155 C 110 170 100 150 100 150 L 100 50";

  // Phase 2: Refining (1.5–3s) - cleaner version
  const refinedPath =
    "M 100 55 C 100 55 155 45 165 75 C 175 105 165 140 140 150 C 115 160 100 145 100 145 L 100 55";

  // Anchor points for sketching phase
  const anchorsSketch = [
    { x: 100, y: 50 },
    { x: 170, y: 70 },
    { x: 140, y: 155 },
    { x: 100, y: 150 },
  ];

  // Anchors to keep visible in refining phase (reduce from 4 to 2)
  const anchorsRefine = [{ x: 100, y: 55 }, { x: 140, y: 150 }];

  // Control handle lines for sketching
  const controlHandles = [
    { d: "M 100 50 L 130 45" }, // from first anchor
    { d: "M 170 70 L 200 80" }, // from second anchor
    { d: "M 140 155 L 110 165" }, // from third anchor
  ];

  return (
    <motion.svg
      ref={ref}
      {...svgProps}
      initial={!shouldAnimate}
      animate={shouldAnimate ? "animate" : "initial"}
    >
      {/* ============================================================
          PHASE 1: SKETCHING (0–1.5s)
          Rough bezier path draws with anchor points and dashed handles
          ============================================================ */}

      {/* Rough bezier path - draws over ~1.5s */}
      <motion.path
        d={roughPath}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: strokeKeyframes(0, 1.5).values,
            opacity: fadeKeyframes(0, 1.5).values,
            transition: {
              ...loopTransition,
              times: strokeKeyframes(0, 1.5).times,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      {/* Anchor points for sketching (4 visible squares) */}
      {anchorsSketch.map((anchor, idx) => (
        <motion.rect
          key={`anchor-sketch-${idx}`}
          x={anchor.x - 2}
          y={anchor.y - 2}
          width={4}
          height={4}
          stroke="#7B35FF"
          strokeWidth={1.5}
          fill="none"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: fadeKeyframes(0.2 + idx * 0.3, 1.2).values,
              transition: {
                ...loopTransition,
                times: fadeKeyframes(0.2 + idx * 0.3, 1.2).times,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
      ))}

      {/* Dashed control handle lines */}
      {controlHandles.map((handle, idx) => (
        <motion.path
          key={`handle-${idx}`}
          d={handle.d}
          stroke="#7B35FF"
          strokeWidth={1}
          strokeDasharray="2,2"
          fill="none"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: fadeKeyframes(0.5, 0.8).values,
              transition: {
                ...loopTransition,
                times: fadeKeyframes(0.5, 0.8).times,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
      ))}

      {/* Pen cursor icon - moves along path during sketching */}
      <motion.g
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { x: 100, y: 50, opacity: 0 },
          animate: {
            x: [100, 100, 170, 170, 170, 100],
            y: [50, 50, 70, 70, 70, 50],
            opacity: fadeKeyframes(0, 1.5).values,
            transition: {
              ...loopTransition,
              times: fadeKeyframes(0, 1.5).times,
            },
          },
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Pen nib shape (small diamond) */}
        <motion.path
          d="M 0 -4 L 3 0 L 0 4 L -3 0 Z"
          stroke="#7B35FF"
          strokeWidth={1}
          fill="rgba(123, 53, 255, 0.15)"
        />
      </motion.g>

      {/* ============================================================
          PHASE 2: REFINING (1.5–3s)
          Rough path fades to 0.2 opacity, cleaner path draws on top
          ============================================================ */}

      {/* Rough path faded to background */}
      <motion.path
        d={roughPath}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 0, 0, 0.2, 0.2, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 1.5 / CYCLE, 2 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      {/* Refined (cleaner) bezier path - draws over ~1.5s starting at 1.5s */}
      <motion.path
        d={refinedPath}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: strokeKeyframes(1.5, 1.5).values,
            opacity: fadeKeyframes(1.5, 1.5).values,
            transition: {
              ...loopTransition,
              times: strokeKeyframes(1.5, 1.5).times,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      {/* Reduced anchor set for refining phase (2 visible anchors) */}
      {anchorsRefine.map((anchor, idx) => (
        <motion.rect
          key={`anchor-refine-${idx}`}
          x={anchor.x - 2}
          y={anchor.y - 2}
          width={4}
          height={4}
          stroke="#7B35FF"
          strokeWidth={1.5}
          fill="none"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: {
              opacity: fadeKeyframes(1.7 + idx * 0.3, 0.8).values,
              scale: [0, 0, 1, 1, 1, 0],
              transition: {
                ...loopTransition,
                times: fadeKeyframes(1.7 + idx * 0.3, 0.8).times,
              },
            },
          }}
          style={{ willChange: "opacity, transform" }}
        />
      ))}

      {/* ============================================================
          PHASE 3: RESOLVING TO X (3–4.5s)
          Refined path fades out, X brand symbol draws on
          ============================================================ */}

      {/* Refined path fades out */}
      <motion.path
        d={refinedPath}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 0, 0, 1, 0, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 2.9 / CYCLE, 3 / CYCLE, 3.5 / CYCLE, 1],
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      {/* X brand mark - two crossing lines at centre (140, 100) */}
      <motion.line
        x1={110}
        y1={70}
        x2={170}
        y2={130}
        stroke="#7B35FF"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: strokeKeyframes(3, 0.8).values,
            opacity: fadeKeyframes(3, 0.8).values,
            transition: {
              ...loopTransition,
              times: strokeKeyframes(3, 0.8).times,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      <motion.line
        x1={170}
        y1={70}
        x2={110}
        y2={130}
        stroke="#7B35FF"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: strokeKeyframes(3.3, 0.8).values,
            opacity: fadeKeyframes(3.3, 0.8).values,
            transition: {
              ...loopTransition,
              times: strokeKeyframes(3.3, 0.8).times,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      {/* Circle around X - draws after X lines */}
      <motion.circle
        cx={140}
        cy={100}
        r={35}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill="none"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: strokeKeyframes(3.6, 0.6).values,
            opacity: fadeKeyframes(3.6, 0.6).values,
            transition: {
              ...loopTransition,
              times: strokeKeyframes(3.6, 0.6).times,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      {/* Checkmark bottom-right at (200, 160) */}
      <motion.path
        d="M 195 160 L 205 170 L 225 150"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: {
            pathLength: strokeKeyframes(4, 0.4).values,
            opacity: fadeKeyframes(4, 0.4).values,
            transition: {
              ...loopTransition,
              times: strokeKeyframes(4, 0.4).times,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      />

      {/* ============================================================
          PHASE 4: SHOWCASE (4.5–5s)
          Complete logo mark sits centred with subtle glow
          ============================================================ */}

      {/* Final X + circle group with glow effect */}
      <motion.g
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 0, 0, 0, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 3 / CYCLE, 3.5 / CYCLE, 4.2 / CYCLE, 4.5 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        style={{
          willChange: "opacity",
          filter: "drop-shadow(0 0 6px rgba(123,53,255,0.5))",
        }}
      >
        {/* Final X line 1 */}
        <line
          x1={110}
          y1={70}
          x2={170}
          y2={130}
          stroke="#7B35FF"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Final X line 2 */}
        <line
          x1={170}
          y1={70}
          x2={110}
          y2={130}
          stroke="#7B35FF"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Final circle */}
        <circle cx={140} cy={100} r={35} stroke="#7B35FF" strokeWidth={1.5} fill="none" />
      </motion.g>
    </motion.svg>
  );
}
