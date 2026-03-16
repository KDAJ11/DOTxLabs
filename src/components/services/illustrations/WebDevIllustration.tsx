"use client";

import { motion } from "motion/react";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import {
  strokeKeyframes,
  fadeKeyframes,
  loopTransition,
  svgProps,
  strokeStyle,
  interiorFill,
  CYCLE,
} from "./animationUtils";

export default function WebDevIllustration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  // Divider line between file tree and editor
  const dividerX = 98;

  // Code editor area starts at this x
  const editorStartX = 108;

  // File tree rows configuration
  const fileRows = [
    { label: "app/", y: 40 },
    { label: "components/", y: 60 },
    { label: "page.tsx", y: 80 },
    { label: "globals.css", y: 100 },
  ];

  // Code lines with varying widths and colors
  const codeLines = [
    { y: 135, width: 45, color: "#a78bfa", indent: 0 }, // keyword
    { y: 145, width: 55, color: "#34d399", indent: 5 }, // string
    { y: 155, width: 65, color: "rgba(255,255,255,0.5)", indent: 0 }, // default
    { y: 165, width: 50, color: "rgba(255,255,255,0.5)", indent: 0 }, // default
    { y: 175, width: 40, color: "#fb923c", indent: 10 }, // function
    { y: 185, width: 30, color: "rgba(255,255,255,0.3)", indent: 0 }, // comment
  ];

  // Preview pane items
  const previewY = 128;
  const previewPaneHeight = 200 - previewY - 5;

  return (
    <svg ref={ref} {...svgProps}>
      {/* Editor frame outer border */}
      <motion.rect
        x={98}
        y={30}
        width={177}
        height={162}
        rx={4}
        {...strokeStyle}
        pathLength={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { pathLength: strokeKeyframes(0, 0.5).values }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                ...loopTransition,
                times: strokeKeyframes(0, 0.5).times,
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Vertical divider between file tree and editor */}
      <motion.line
        x1={dividerX}
        y1={30}
        x2={dividerX}
        y2={192}
        {...strokeStyle}
        pathLength={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { pathLength: strokeKeyframes(0, 0.5).values }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                ...loopTransition,
                times: strokeKeyframes(0, 0.5).times,
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* File tree rows */}
      {fileRows.map((file, idx) => {
        const staggerDelay = 0.5 + idx * 0.15;
        const fadeKf = fadeKeyframes(staggerDelay, 0.6);

        return (
          <motion.g key={`file-${idx}`}>
            {/* Folder icon: chevron + folder shape */}
            <motion.path
              d={`M${108 + idx * 1.5} ${file.y - 4} L${112 + idx * 1.5} ${file.y} L${108 + idx * 1.5} ${file.y + 4}`}
              {...strokeStyle}
              opacity={prefersReducedMotion ? 1 : undefined}
              animate={
                !prefersReducedMotion && isInView
                  ? { opacity: fadeKf.values }
                  : undefined
              }
              transition={
                !prefersReducedMotion && isInView
                  ? {
                      ...loopTransition,
                      times: fadeKf.times,
                    }
                  : undefined
              }
              style={{ willChange: "transform" }}
            />

            {/* Folder shape */}
            <motion.path
              d={`M105 ${file.y - 3} L108 ${file.y - 5} L125 ${file.y - 5} L125 ${file.y + 5} L105 ${file.y + 5} Z`}
              {...strokeStyle}
              opacity={prefersReducedMotion ? 1 : undefined}
              animate={
                !prefersReducedMotion && isInView
                  ? { opacity: fadeKf.values }
                  : undefined
              }
              transition={
                !prefersReducedMotion && isInView
                  ? {
                      ...loopTransition,
                      times: fadeKf.times,
                    }
                  : undefined
              }
              style={{ willChange: "transform" }}
            />

            {/* File label text */}
            <motion.text
              x={130}
              y={file.y + 3}
              fontSize={8}
              fill="#7B35FF"
              opacity={prefersReducedMotion ? 1 : undefined}
              animate={
                !prefersReducedMotion && isInView
                  ? { opacity: fadeKf.values }
                  : undefined
              }
              transition={
                !prefersReducedMotion && isInView
                  ? {
                      ...loopTransition,
                      times: fadeKf.times,
                    }
                  : undefined
              }
              style={{ willChange: "transform" }}
            >
              {file.label}
            </motion.text>
          </motion.g>
        );
      })}

      {/* Code editor lines */}
      {codeLines.map((line, idx) => {
        const staggerDelay = 1.0 + idx * 0.2;
        const strokeKf = strokeKeyframes(staggerDelay, 0.4);
        const lineX = editorStartX + line.indent;

        return (
          <motion.line
            key={`code-${idx}`}
            x1={lineX}
            y1={line.y}
            x2={lineX + line.width}
            y2={line.y}
            stroke={line.color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={prefersReducedMotion ? 1 : undefined}
            animate={
              !prefersReducedMotion && isInView
                ? { pathLength: strokeKf.values }
                : undefined
            }
            transition={
              !prefersReducedMotion && isInView
                ? {
                    ...loopTransition,
                    times: strokeKf.times,
                  }
                : undefined
            }
            style={{ willChange: "transform" }}
          />
        );
      })}

      {/* Blinking cursor - independent 1s blink loop */}
      <motion.rect
        x={editorStartX + codeLines[5].width + 2}
        y={codeLines[5].y - 6}
        width={2}
        height={12}
        fill="#7B35FF"
        opacity={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { opacity: [1, 0, 1] }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Preview pane horizontal divider */}
      <motion.line
        x1={98}
        y1={previewY}
        x2={275}
        y2={previewY}
        {...strokeStyle}
        pathLength={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { pathLength: strokeKeyframes(2.5, 0.4).values }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                ...loopTransition,
                times: strokeKeyframes(2.5, 0.4).times,
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Preview pane background */}
      <motion.rect
        x={100}
        y={previewY + 2}
        width={172}
        height={previewPaneHeight - 4}
        rx={2}
        fill={interiorFill}
        opacity={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { opacity: fadeKeyframes(2.5, 0.6).values }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                ...loopTransition,
                times: fadeKeyframes(2.5, 0.6).times,
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* URL bar */}
      <motion.g>
        {/* URL bar background */}
        <motion.rect
          x={102}
          y={previewY + 4}
          width={168}
          height={10}
          rx={2}
          {...strokeStyle}
          fill={interiorFill}
          pathLength={prefersReducedMotion ? 1 : undefined}
          animate={
            !prefersReducedMotion && isInView
              ? { pathLength: strokeKeyframes(2.5, 0.5).values }
              : undefined
          }
          transition={
            !prefersReducedMotion && isInView
              ? {
                  ...loopTransition,
                  times: strokeKeyframes(2.5, 0.5).times,
                }
              : undefined
          }
          style={{ willChange: "transform" }}
        />

        {/* X mark in favicon position */}
        <motion.g opacity={prefersReducedMotion ? 1 : undefined}>
          <motion.line
            x1={107}
            y1={previewY + 6}
            x2={111}
            y2={previewY + 10}
            {...strokeStyle}
            pathLength={prefersReducedMotion ? 1 : undefined}
            animate={
              !prefersReducedMotion && isInView
                ? { pathLength: strokeKeyframes(3.5, 0.3).values }
                : undefined
            }
            transition={
              !prefersReducedMotion && isInView
                ? {
                    ...loopTransition,
                    times: strokeKeyframes(3.5, 0.3).times,
                  }
                : undefined
            }
            style={{ willChange: "transform" }}
          />
          <motion.line
            x1={111}
            y1={previewY + 6}
            x2={107}
            y2={previewY + 10}
            {...strokeStyle}
            pathLength={prefersReducedMotion ? 1 : undefined}
            animate={
              !prefersReducedMotion && isInView
                ? { pathLength: strokeKeyframes(3.5, 0.3).values }
                : undefined
            }
            transition={
              !prefersReducedMotion && isInView
                ? {
                    ...loopTransition,
                    times: strokeKeyframes(3.5, 0.3).times,
                  }
                : undefined
            }
            style={{ willChange: "transform" }}
          />
        </motion.g>
      </motion.g>

      {/* Preview content - header bar */}
      <motion.rect
        x={102}
        y={previewY + 16}
        width={168}
        height={8}
        rx={1}
        fill={interiorFill}
        {...strokeStyle}
        pathLength={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { pathLength: strokeKeyframes(2.8, 0.4).values }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                ...loopTransition,
                times: strokeKeyframes(2.8, 0.4).times,
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Preview content - left column */}
      <motion.rect
        x={102}
        y={previewY + 26}
        width={76}
        height={35}
        rx={1}
        fill={interiorFill}
        {...strokeStyle}
        pathLength={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { pathLength: strokeKeyframes(3.0, 0.4).values }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                ...loopTransition,
                times: strokeKeyframes(3.0, 0.4).times,
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Preview content - right column */}
      <motion.rect
        x={180}
        y={previewY + 26}
        width={76}
        height={35}
        rx={1}
        fill={interiorFill}
        {...strokeStyle}
        pathLength={prefersReducedMotion ? 1 : undefined}
        animate={
          !prefersReducedMotion && isInView
            ? { pathLength: strokeKeyframes(3.1, 0.4).values }
            : undefined
        }
        transition={
          !prefersReducedMotion && isInView
            ? {
                ...loopTransition,
                times: strokeKeyframes(3.1, 0.4).times,
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />
    </svg>
  );
}
