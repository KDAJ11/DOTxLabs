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
 * DigitalMarketingIllustration: Dashboard panel with metrics and sparkline.
 */
export default function DigitalMarketingIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const reduced = useReducedMotion();

  // Dashboard frame path (rounded rect)
  const dashboardFramePath =
    "M 28 23 L 252 23 Q 260 23 260 31 L 260 171 Q 260 179 252 179 L 28 179 Q 20 179 20 171 L 20 31 Q 20 23 28 23";

  // Header bar line
  const headerBarPath = "M 20 47 L 260 47";

  // X mark as DOTxLabs logo (in header, left side)
  const logoXLine1 = "M 32 35 L 38 41";
  const logoXLine2 = "M 38 35 L 32 41";

  // Metric cards - three cards
  // Card 1: x=30, y=55, w=65, h=50
  const card1Rect =
    "M 30 55 L 95 55 L 95 105 L 30 105 Z";
  const card1Border =
    "M 30 55 Q 33 55 33 58 L 33 102 Q 33 105 30 105 L 95 105 Q 98 105 98 102 L 98 58 Q 98 55 95 55";

  // Card 2: x=110, y=55, w=65, h=50
  const card2Border =
    "M 110 55 Q 113 55 113 58 L 113 102 Q 113 105 110 105 L 175 105 Q 178 105 178 102 L 178 58 Q 178 55 175 55";

  // Card 3: x=190, y=55, w=65, h=50
  const card3Border =
    "M 190 55 Q 193 55 193 58 L 193 102 Q 193 105 190 105 L 255 105 Q 258 105 258 102 L 258 58 Q 258 55 255 55";

  // Sparkline path (upward trending, in card 3)
  const sparklinePath = "M 200 95 L 210 90 L 220 85 L 230 78 L 240 70 L 250 65";

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
      {/* Dashboard frame - draw first (0-0.8s) */}
      <motion.path
        d={dashboardFramePath}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={interiorFill}
        variants={{
          visible: {
            pathLength: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 0, 0.8 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Header bar line (0.5-1.2s) */}
      <motion.path
        d={headerBarPath}
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
              times: [0, 0.5 / CYCLE, 1.2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Logo X line 1 */}
      <motion.path
        d={logoXLine1}
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
              times: [0, 0.5 / CYCLE, 1.2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Logo X line 2 */}
      <motion.path
        d={logoXLine2}
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
              times: [0, 0.5 / CYCLE, 1.2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Card 1 border (1-2s, staggered -0.3s = starts at 0.7s) */}
      <motion.path
        d={card1Border}
        stroke="#7B35FF"
        strokeWidth={1}
        fill={interiorFill}
        variants={{
          visible: {
            pathLength: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 0.7 / CYCLE, 1.4 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Card 2 border (1-2s, staggered 0s) */}
      <motion.path
        d={card2Border}
        stroke="#7B35FF"
        strokeWidth={1}
        fill={interiorFill}
        variants={{
          visible: {
            pathLength: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1 / CYCLE, 1.7 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Card 3 border (1-2s, staggered +0.3s = starts at 1.3s) */}
      <motion.path
        d={card3Border}
        stroke="#7B35FF"
        strokeWidth={1}
        fill={interiorFill}
        variants={{
          visible: {
            pathLength: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.3 / CYCLE, 2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Card 1 label "ROAS" - fade in (1.5-3s) */}
      <motion.text
        x={62}
        y={70}
        fontSize={10}
        fill="#7B35FF"
        textAnchor="middle"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 3 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      >
        ROAS
      </motion.text>

      {/* Card 1 value "1.2×" - fades out as 4.8× fades in */}
      <motion.text
        x={62}
        y={90}
        fontSize={16}
        fontWeight={600}
        fill="#7B35FF"
        textAnchor="middle"
        variants={{
          visible: {
            opacity: [0, 0, 1, 0.5, 0.5, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 2.5 / CYCLE, 3 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      >
        1.2×
      </motion.text>

      {/* Card 1 value "4.8×" - fades in as 1.2× fades out */}
      <motion.text
        x={62}
        y={90}
        fontSize={16}
        fontWeight={600}
        fill="#7B35FF"
        textAnchor="middle"
        variants={{
          visible: {
            opacity: [0, 0, 0, 0.5, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 2.5 / CYCLE, 3 / CYCLE, 3.2 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      >
        4.8×
      </motion.text>

      {/* Card 2 label "IMPRESSIONS" - fade in (1.5-3s) */}
      <motion.text
        x={142}
        y={68}
        fontSize={8}
        fill="#7B35FF"
        textAnchor="middle"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 3 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      >
        IMPRESSIONS
      </motion.text>

      {/* Card 2 value "24K↑" - fade in (1.5-3s) */}
      <motion.text
        x={142}
        y={88}
        fontSize={14}
        fontWeight={600}
        fill="#7B35FF"
        textAnchor="middle"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 3 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      >
        24K
      </motion.text>

      {/* Card 2 upward trend arrow */}
      <motion.path
        d="M 155 85 L 160 78 L 165 85"
        stroke="#7B35FF"
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 3 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />

      {/* Card 3 label "CONVERSIONS" - fade in (1.5-3s) */}
      <motion.text
        x={222}
        y={68}
        fontSize={8}
        fill="#7B35FF"
        textAnchor="middle"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 3 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      >
        CONVERSIONS
      </motion.text>

      {/* Card 3 label "Trend" - fade in (1.5-3s) */}
      <motion.text
        x={222}
        y={88}
        fontSize={8}
        fill="#7B35FF"
        textAnchor="middle"
        variants={{
          visible: {
            opacity: [0, 0, 1, 1, 1, 0],
            transition: {
              ...loopTransition,
              times: [0, 1.5 / CYCLE, 3 / CYCLE, 4 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ opacity: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      >
        Trend
      </motion.text>

      {/* Sparkline path - the showpiece (3-4s) */}
      <motion.path
        d={sparklinePath}
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
              times: [0, 3 / CYCLE, 4 / CYCLE, 4.2 / CYCLE, RESET_START / CYCLE, 1],
            },
          },
        }}
        initial={{ pathLength: 0 }}
        animate={inView && !reduced ? "visible" : reduced ? { pathLength: 1 } : { pathLength: 0 }}
        transition={inView && !reduced ? loopTransition : undefined}
      />
    </svg>
  );
}
