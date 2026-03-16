"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useInView, useReducedMotion } from "motion/react";
import {
  CYCLE,
  DRAW_WINDOW,
  HOLD_AT,
  RESET_START,
  strokeKeyframes,
  fadeKeyframes,
  loopTransition,
  svgProps,
  strokeStyle,
  interiorFill,
} from "./animationUtils";

export default function BrandIllustration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = isInView && !prefersReducedMotion;

  // Color swatches data
  const swatches = [
    { color: "#7B35FF", label: "Primary", x: 20, y: 20 },
    { color: "#9F67FF", label: "Light", x: 56, y: 20 },
    { color: "#C4A3FF", label: "Soft", x: 20, y: 56 },
    { color: "#1a0a2e", label: "Dark", x: 56, y: 56 },
  ];

  return (
    <motion.svg
      ref={ref}
      {...svgProps}
      initial={!shouldAnimate}
      animate={shouldAnimate ? "animate" : "initial"}
    >
      {/* Top-left quadrant: Colour swatches */}
      <motion.g
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        transition={{ delay: 0, duration: 0.3 }}
      >
        {swatches.map((swatch, index) => (
          <motion.g key={`swatch-${index}`}>
            {/* Swatch rectangle */}
            <motion.rect
              x={swatch.x}
              y={swatch.y}
              width={16}
              height={16}
              fill={swatch.color}
              rx={2}
              animate={shouldAnimate ? "animate" : "initial"}
              variants={{
                initial: { fillOpacity: 0 },
                animate: {
                  fillOpacity: [0, 0, 1, 1, 0],
                  transition: {
                    ...loopTransition,
                    delay: index * 0.3,
                  },
                },
              }}
              style={{ willChange: "opacity" }}
            />
            {/* Label */}
            <motion.text
              x={62}
              y={swatch.y + 12}
              fontSize={8}
              fill="white"
              fillOpacity={0.6}
              animate={shouldAnimate ? "animate" : "initial"}
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: [0, 0, 1, 1, 0],
                  transition: {
                    ...loopTransition,
                    delay: index * 0.3,
                  },
                },
              }}
              style={{ willChange: "opacity" }}
            >
              {swatch.label}
            </motion.text>
          </motion.g>
        ))}
      </motion.g>

      {/* Top-right quadrant: Typography specimen */}
      <motion.g
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 0, 1, 1, 0],
            transition: {
              ...loopTransition,
              delay: 0.8,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      >
        {/* Heading stroke (thick) */}
        <motion.line
          x1={160}
          y1={35}
          x2={220}
          y2={35}
          stroke="#7B35FF"
          strokeWidth={3}
          strokeLinecap="round"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 0.8,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
        {/* Body stroke (thin) */}
        <motion.line
          x1={160}
          y1={55}
          x2={205}
          y2={55}
          stroke="#7B35FF"
          strokeWidth={1.5}
          strokeLinecap="round"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 0.8,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
        {/* Aa text */}
        <motion.text
          x={220}
          y={80}
          fontSize={20}
          fill="#7B35FF"
          fillOpacity={0.6}
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: [0, 0, 0.6, 0.6, 0],
              transition: {
                ...loopTransition,
                delay: 0.8,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        >
          Aa
        </motion.text>
      </motion.g>

      {/* Bottom-left quadrant: Logo mark */}
      <motion.g
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { scale: 1 },
          animate: {
            scale: [1, 1, 1, 1.05, 1],
            transition: {
              ...loopTransition,
              delay: 1.6,
            },
          },
        }}
        origin="center"
        style={{ willChange: "transform" }}
      >
        {/* X diagonal strokes */}
        <motion.line
          x1={50}
          y1={130}
          x2={90}
          y2={170}
          stroke="#7B35FF"
          strokeWidth={1.5}
          strokeLinecap="round"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 1.6,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
        <motion.line
          x1={90}
          y1={130}
          x2={50}
          y2={170}
          stroke="#7B35FF"
          strokeWidth={1.5}
          strokeLinecap="round"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 1.6,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />

        {/* Circle around X */}
        <motion.circle
          cx={70}
          cy={150}
          r={25}
          stroke="#7B35FF"
          strokeWidth={1.5}
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 1.6,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
      </motion.g>

      {/* Bottom-right quadrant: Guidelines document */}
      <motion.g
        animate={shouldAnimate ? "animate" : "initial"}
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: [0, 0, 1, 1, 0],
            transition: {
              ...loopTransition,
              delay: 2.4,
            },
          },
        }}
        style={{ willChange: "opacity" }}
      >
        {/* Document rectangle */}
        <motion.rect
          x={180}
          y={115}
          width={60}
          height={80}
          rx={4}
          fill={interiorFill}
          stroke="#7B35FF"
          strokeWidth={1.5}
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 2.4,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />

        {/* Text lines inside document */}
        <motion.line
          x1={190}
          y1={135}
          x2={230}
          y2={135}
          stroke="#7B35FF"
          strokeWidth={1}
          strokeLinecap="round"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 2.4,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
        <motion.line
          x1={190}
          y1={150}
          x2={230}
          y2={150}
          stroke="#7B35FF"
          strokeWidth={1}
          strokeLinecap="round"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 2.4,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
        <motion.line
          x1={190}
          y1={165}
          x2={230}
          y2={165}
          stroke="#7B35FF"
          strokeWidth={1}
          strokeLinecap="round"
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 2.4,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />

        {/* X watermark */}
        <motion.line
          x1={226}
          y1={166}
          x2={234}
          y2={174}
          stroke="#7B35FF"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.3}
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 2.4,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
        <motion.line
          x1={234}
          y1={166}
          x2={226}
          y2={174}
          stroke="#7B35FF"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.3}
          animate={shouldAnimate ? "animate" : "initial"}
          variants={{
            initial: { pathLength: 0 },
            animate: {
              pathLength: [0, 0, 1, 1, 0],
              transition: {
                ...loopTransition,
                delay: 2.4,
              },
            },
          }}
          style={{ willChange: "opacity" }}
        />
      </motion.g>
    </motion.svg>
  );
}
