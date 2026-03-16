"use client";

import { motion } from "motion/react";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import {
  CYCLE,
  RESET_START,
  strokeKeyframes,
  fadeKeyframes,
  svgProps,
  interiorFill,
} from "./animationUtils";

export default function SEOIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: false, margin: "0px" });
  const shouldReduceMotion = useReducedMotion();

  // Browser chrome keyframes (draws on 0-0.3s)
  const chromKeyframes = strokeKeyframes(0, 0.3);

  // URL bar keyframes (draws on 0-0.25s)
  const urlBarKeyframes = strokeKeyframes(0.05, 0.25);

  // Fade in all competitor rows: 0.3-1.0s, staggered by 0.1s
  const fadeRowKeyframes = (rowIndex: number) =>
    fadeKeyframes(0.3 + rowIndex * 0.1, 0.4);

  // DOTxLabs row animation: translateY from position 5 (y=150) to position 1 (y=50)
  // Holds until 1.5s (t=0.25), then moves over next 1.2s to 2.7s (t=0.45)
  // Values: translateY moves from 0 to -100px (from y=150 to y=50)
  const dotxLabsYAnimation = shouldReduceMotion
    ? { y: -100 } // final state: at position 1
    : {
        y: [0, 0, -100, -100, 0],
        transition: {
          times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
          duration: CYCLE,
          repeat: Infinity,
          ease: "linear",
        },
      };

  // Position number crossfade: "5" → "1"
  const positionFiveOpacity = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: [1, 1, 0, 0, 1],
        transition: {
          times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
          duration: CYCLE,
          repeat: Infinity,
          ease: "linear",
        },
      };

  const positionOneOpacity = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: [0, 0, 1, 1, 0],
        transition: {
          times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
          duration: CYCLE,
          repeat: Infinity,
          ease: "linear",
        },
      };

  // X mark opacity: appears at final position
  const xMarkOpacity = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: [0, 0, 1, 1, 0],
        transition: {
          times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
          duration: CYCLE,
          repeat: Infinity,
          ease: "linear",
        },
      };

  // Green glow intensity
  const glowOpacity = shouldReduceMotion
    ? { opacity: 0.8 }
    : {
        opacity: [0, 0, 0.8, 0.8, 0],
        transition: {
          times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
          duration: CYCLE,
          repeat: Infinity,
          ease: "linear",
        },
      };

  if (shouldReduceMotion) {
    // Reduced motion: show final state with DOTxLabs at #1
    return (
      <svg
        ref={svgRef}
        {...svgProps}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Browser chrome */}
        <rect
          x="15"
          y="10"
          width="250"
          height="180"
          rx="6"
          fill={interiorFill}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* URL bar */}
        <rect
          x="30"
          y="18"
          width="100"
          height="12"
          rx="3"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />

        {/* Google G placeholder */}
        <circle cx="25" cy="24" r="5" fill="#7B35FF" opacity="0.3" />
        <text
          x="25"
          y="27"
          fontSize="6"
          fill="rgba(255,255,255,0.3)"
          textAnchor="middle"
          fontWeight="bold"
        >
          G
        </text>

        {/* google.com text */}
        <text
          x="55"
          y="27"
          fontSize="7"
          fill="rgba(255,255,255,0.3)"
          fontFamily="monospace"
        >
          google.com
        </text>

        {/* Competitor rows 1-4 */}
        {[0, 1, 2, 3].map((i) => {
          const yPos = 50 + i * 25;
          return (
            <g key={`competitor-${i}`}>
              {/* Position circle */}
              <circle
                cx="35"
                cy={yPos}
                r="8"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
              <text
                x="35"
                y={yPos + 3}
                fontSize="8"
                fill="rgba(255,255,255,0.2)"
                textAnchor="middle"
                fontWeight="bold"
              >
                {i + 1}
              </text>

              {/* Title line */}
              <line
                x1="50"
                y1={yPos - 4}
                x2="180"
                y2={yPos - 4}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* URL line */}
              <line
                x1="50"
                y1={yPos + 4}
                x2="140"
                y2={yPos + 4}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* DOTxLabs at position #1 (final state) */}
        <g>
          <defs>
            <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Position circle with green highlight */}
          <circle
            cx="35"
            cy="50"
            r="8"
            stroke="#34d399"
            strokeWidth="1.5"
          />
          <text
            x="35"
            y="53"
            fontSize="8"
            fill="#34d399"
            textAnchor="middle"
            fontWeight="bold"
          >
            1
          </text>

          {/* X mark beside position */}
          <text
            x="48"
            y="54"
            fontSize="10"
            fill="#34d399"
            fontWeight="bold"
          >
            ✕
          </text>

          {/* Green glow circle */}
          <circle
            cx="35"
            cy="50"
            r="8"
            fill="none"
            stroke="#34d399"
            strokeWidth="1.5"
            opacity="0.8"
            filter="url(#greenGlow)"
          />

          {/* Title line */}
          <line
            x1="50"
            y1="46"
            x2="180"
            y2="46"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* URL line with dotxlabs.com text */}
          <line
            x1="50"
            y1="54"
            x2="140"
            y2="54"
            stroke="#34d399"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <text
            x="50"
            y="158"
            fontSize="7"
            fill="#34d399"
            opacity="0.6"
            fontFamily="monospace"
          >
            dotxlabs.com
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      ref={svgRef}
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Green glow filter for DOTxLabs highlight */}
        <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Browser chrome — draws on 0-0.3s */}
      <motion.rect
        x="15"
        y="10"
        width="250"
        height="180"
        rx="6"
        fill={interiorFill}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        strokeDasharray="1040"
        animate={
          isInView
            ? { strokeDashoffset: chromKeyframes.values }
            : { strokeDashoffset: chromKeyframes.values[0] }
        }
        transition={
          isInView
            ? {
                times: chromKeyframes.times,
                duration: CYCLE,
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
        style={{ willChange: "stroke-dashoffset" }}
      />

      {/* URL bar — draws on 0-0.25s */}
      <motion.rect
        x="30"
        y="18"
        width="100"
        height="12"
        rx="3"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.5"
        strokeDasharray="220"
        animate={
          isInView
            ? { strokeDashoffset: urlBarKeyframes.values }
            : { strokeDashoffset: urlBarKeyframes.values[0] }
        }
        transition={
          isInView
            ? {
                times: urlBarKeyframes.times,
                duration: CYCLE,
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
        style={{ willChange: "stroke-dashoffset" }}
      />

      {/* Google G placeholder */}
      <circle cx="25" cy="24" r="5" fill="#7B35FF" opacity="0.3" />
      <text
        x="25"
        y="27"
        fontSize="6"
        fill="rgba(255,255,255,0.3)"
        textAnchor="middle"
        fontWeight="bold"
      >
        G
      </text>

      {/* google.com text */}
      <text
        x="55"
        y="27"
        fontSize="7"
        fill="rgba(255,255,255,0.3)"
        fontFamily="monospace"
      >
        google.com
      </text>

      {/* Competitor rows 1-4 */}
      {[0, 1, 2, 3].map((i) => {
        const yPos = 50 + i * 25;
        const rowKeyframes = fadeRowKeyframes(i);

        return (
          <motion.g key={`competitor-${i}`} style={{ willChange: "opacity" }}>
            {/* Position circle */}
            <motion.circle
              cx="35"
              cy={yPos}
              r="8"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              animate={isInView ? { opacity: rowKeyframes.values } : 0}
              transition={
                isInView
                  ? {
                      times: rowKeyframes.times,
                      duration: CYCLE,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : undefined
              }
            />
            <motion.text
              x="35"
              y={yPos + 3}
              fontSize="8"
              fill="rgba(255,255,255,0.2)"
              textAnchor="middle"
              fontWeight="bold"
              animate={isInView ? { opacity: rowKeyframes.values } : 0}
              transition={
                isInView
                  ? {
                      times: rowKeyframes.times,
                      duration: CYCLE,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : undefined
              }
            >
              {i + 1}
            </motion.text>

            {/* Title line */}
            <motion.line
              x1="50"
              y1={yPos - 4}
              x2="180"
              y2={yPos - 4}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={isInView ? { opacity: rowKeyframes.values } : 0}
              transition={
                isInView
                  ? {
                      times: rowKeyframes.times,
                      duration: CYCLE,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : undefined
              }
            />

            {/* URL line */}
            <motion.line
              x1="50"
              y1={yPos + 4}
              x2="140"
              y2={yPos + 4}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={isInView ? { opacity: rowKeyframes.values } : 0}
              transition={
                isInView
                  ? {
                      times: rowKeyframes.times,
                      duration: CYCLE,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : undefined
              }
            />
          </motion.g>
        );
      })}

      {/* DOTxLabs row — animates from position 5 to position 1 */}
      <motion.g
        animate={isInView ? dotxLabsYAnimation : { y: 0 }}
        style={{ willChange: "transform" }}
      >
        {/* Position circle with number fade-in/out */}
        <circle
          cx="35"
          cy="150"
          r="8"
          stroke="#34d399"
          strokeWidth="1.5"
        />

        {/* Position "5" — fades out */}
        <motion.text
          x="35"
          y="153"
          fontSize="8"
          fill="#34d399"
          textAnchor="middle"
          fontWeight="bold"
          animate={isInView ? positionFiveOpacity : { opacity: 1 }}
          transition={
            isInView && typeof positionFiveOpacity !== "number"
              ? {
                  times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
                  duration: CYCLE,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
          style={{ willChange: "opacity" }}
        >
          5
        </motion.text>

        {/* Position "1" — fades in */}
        <motion.text
          x="35"
          y="153"
          fontSize="8"
          fill="#34d399"
          textAnchor="middle"
          fontWeight="bold"
          animate={isInView ? positionOneOpacity : { opacity: 0 }}
          transition={
            isInView && typeof positionOneOpacity !== "number"
              ? {
                  times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
                  duration: CYCLE,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
          style={{ willChange: "opacity" }}
        >
          1
        </motion.text>

        {/* X mark — appears at #1 position */}
        <motion.text
          x="48"
          y="154"
          fontSize="10"
          fill="#34d399"
          fontWeight="bold"
          animate={isInView ? xMarkOpacity : { opacity: 0 }}
          transition={
            isInView && typeof xMarkOpacity !== "number"
              ? {
                  times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
                  duration: CYCLE,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
          style={{ willChange: "opacity" }}
        >
          ✕
        </motion.text>

        {/* Green glow — intensifies when at #1 */}
        <motion.circle
          cx="35"
          cy="150"
          r="8"
          fill="none"
          stroke="#34d399"
          strokeWidth="1.5"
          filter="url(#greenGlow)"
          animate={isInView ? glowOpacity : { opacity: 0 }}
          transition={
            isInView && typeof glowOpacity !== "number"
              ? {
                  times: [0, 0.25, 0.45, RESET_START / CYCLE, 1],
                  duration: CYCLE,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
          style={{ willChange: "opacity" }}
        />

        {/* Title line */}
        <line
          x1="50"
          y1="146"
          x2="180"
          y2="146"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* URL line */}
        <line
          x1="50"
          y1="154"
          x2="140"
          y2="154"
          stroke="#34d399"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* dotxlabs.com text */}
        <text
          x="50"
          y="158"
          fontSize="7"
          fill="#34d399"
          opacity="0.6"
          fontFamily="monospace"
        >
          dotxlabs.com
        </text>
      </motion.g>
    </svg>
  );
}
