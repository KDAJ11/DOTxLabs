"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import {
  strokeStyle,
  svgProps,
  interiorFill,
  loopTransition,
} from "./animationUtils";

export default function SEOIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  // Row positions from bottom to top
  const rows = [
    { y: 165, rank: 5 },
    { y: 135, rank: 4 },
    { y: 100, rank: 3 },
    { y: 65, rank: 2 },
    { y: 30, rank: 1 },
  ];

  // Calculate stagger timing: rows draw bottom-to-top, 0.5s apart
  // Row 5 starts at 0.5s, Row 4 at 1s, Row 3 at 1.5s, Row 2 at 2s, Row 1 at 2.5s
  const getRowStartTime = (rank: number) => {
    return (6 - rank) * 0.5;
  };

  const getRowEndTime = (rank: number) => {
    return getRowStartTime(rank) + 0.8; // 0.8s to draw the row
  };

  const getRowStartFraction = (rank: number) => {
    return Math.max(getRowStartTime(rank) / 6, 0.001);
  };

  const getRowEndFraction = (rank: number) => {
    return Math.min(getRowEndTime(rank) / 6, 5 / 6 - 0.01);
  };

  return (
    <svg
      ref={ref}
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Upward arrow on the right side - animates after all rows visible */}
      {/* Arrow shaft (vertical line) */}
      <motion.line
        x1={250}
        y1={150}
        x2={250}
        y2={50}
        {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: [0, 0, 1, 1, 0] }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? {
                ...loopTransition,
                times: [0, 0.68, 0.78, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Arrow head - top line */}
      <motion.line
        x1={250}
        y1={50}
        x2={245}
        y2={60}
        {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: [0, 0, 1, 1, 0] }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? {
                ...loopTransition,
                times: [0, 0.72, 0.8, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Arrow head - bottom line */}
      <motion.line
        x1={250}
        y1={50}
        x2={255}
        y2={60}
        {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: [0, 0, 1, 1, 0] }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? {
                ...loopTransition,
                times: [0, 0.73, 0.81, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Search result rows */}
      {rows.map(({ y, rank }) => {
        const startFraction = getRowStartFraction(rank);
        const endFraction = getRowEndFraction(rank);

        return (
          <motion.g
            key={rank}
            initial={{ opacity: 0 }}
            animate={
              inView && !reduced
                ? { opacity: [0, 0, 1, 1, 0] }
                : { opacity: reduced ? 1 : 0 }
            }
            transition={
              inView && !reduced
                ? {
                    ...loopTransition,
                    times: [0, startFraction, endFraction, 5 / 6 - 0.01, 1],
                  }
                : undefined
            }
            style={{ willChange: "transform" }}
          >
            {/* Rank circle on the left */}
            <motion.circle
              cx={20}
              cy={y}
              r={8}
              fill={interiorFill}
              {...strokeStyle}
              initial={{ pathLength: 0 }}
              animate={
                inView && !reduced
                  ? { pathLength: [0, 0, 1, 1, 0] }
                  : { pathLength: reduced ? 1 : 0 }
              }
              transition={
                inView && !reduced
                  ? {
                      ...loopTransition,
                      times: [0, startFraction, endFraction, 5 / 6 - 0.01, 1],
                    }
                  : undefined
              }
            />

            {/* Rank number text - using line representation */}
            <motion.text
              x={20}
              y={y + 3}
              textAnchor="middle"
              fontSize={10}
              fill="#7B35FF"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={
                inView && !reduced
                  ? { opacity: [0, 0, 1, 1, 0] }
                  : { opacity: reduced ? 1 : 0 }
              }
              transition={
                inView && !reduced
                  ? {
                      ...loopTransition,
                      times: [0, startFraction, endFraction, 5 / 6 - 0.01, 1],
                    }
                  : undefined
              }
            >
              {rank}
            </motion.text>

            {/* Title line (longer) */}
            <motion.line
              x1={35}
              y1={y - 4}
              x2={140}
              y2={y - 4}
              {...strokeStyle}
              initial={{ pathLength: 0 }}
              animate={
                inView && !reduced
                  ? { pathLength: [0, 0, 1, 1, 0] }
                  : { pathLength: reduced ? 1 : 0 }
              }
              transition={
                inView && !reduced
                  ? {
                      ...loopTransition,
                      times: [0, startFraction, endFraction, 5 / 6 - 0.01, 1],
                    }
                  : undefined
              }
              style={{ willChange: "transform" }}
            />

            {/* Description line (shorter) */}
            <motion.line
              x1={35}
              y1={y + 4}
              x2={120}
              y2={y + 4}
              {...strokeStyle}
              initial={{ pathLength: 0 }}
              animate={
                inView && !reduced
                  ? { pathLength: [0, 0, 1, 1, 0] }
                  : { pathLength: reduced ? 1 : 0 }
              }
              transition={
                inView && !reduced
                  ? {
                      ...loopTransition,
                      times: [0, startFraction, endFraction, 5 / 6 - 0.01, 1],
                    }
                  : undefined
              }
              style={{ willChange: "transform" }}
            />

            {/* X star beside rank #1 only */}
            {rank === 1 && (
              <>
                {/* X line 1 (top-left to bottom-right) */}
                <motion.line
                  x1={158}
                  y1={20}
                  x2={172}
                  y2={34}
                  {...strokeStyle}
                  initial={{ pathLength: 0 }}
                  animate={
                    inView && !reduced
                      ? { pathLength: [0, 0, 1, 1, 0] }
                      : { pathLength: reduced ? 1 : 0 }
                  }
                  transition={
                    inView && !reduced
                      ? {
                          ...loopTransition,
                          times: [0, 0.8, 0.9, 5 / 6 - 0.01, 1],
                        }
                      : undefined
                  }
                  style={{ willChange: "transform" }}
                />

                {/* X line 2 (top-right to bottom-left) */}
                <motion.line
                  x1={172}
                  y1={20}
                  x2={158}
                  y2={34}
                  {...strokeStyle}
                  initial={{ pathLength: 0 }}
                  animate={
                    inView && !reduced
                      ? { pathLength: [0, 0, 1, 1, 0] }
                      : { pathLength: reduced ? 1 : 0 }
                  }
                  transition={
                    inView && !reduced
                      ? {
                          ...loopTransition,
                          times: [0, 0.82, 0.92, 5 / 6 - 0.01, 1],
                        }
                      : undefined
                  }
                  style={{ willChange: "transform" }}
                />
              </>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
