"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import {
  strokeKeyframes,
  fadeKeyframes,
  loopTransition,
  svgProps,
  strokeStyle,
} from "./animationUtils";

export default function FullCampaignsIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const active = inView && !reduced;

  const centerX = 140;
  const centerY = 100;
  const centerRadius = 22;
  const xMarkSize = 15;

  const nodes = [
    { x: 140, y: 30, label: "EMAIL" },
    { x: 220, y: 55, label: "SEO" },
    { x: 220, y: 145, label: "ADS" },
    { x: 140, y: 170, label: "SOCIAL" },
    { x: 60, y: 145, label: "CONTENT" },
    { x: 60, y: 55, label: "PR" },
  ];
  const nodeRadius = 16;

  const xKf = strokeKeyframes(0, 0.8);
  const circKf = strokeKeyframes(0.5, 0.7);

  return (
    <svg {...svgProps} ref={ref}>
      {/* Center X mark */}
      <motion.line
        x1={centerX - xMarkSize} y1={centerY - xMarkSize}
        x2={centerX + xMarkSize} y2={centerY + xMarkSize}
        {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={active
          ? { pathLength: xKf.values }
          : { pathLength: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: xKf.times }
          : undefined}
      />
      <motion.line
        x1={centerX + xMarkSize} y1={centerY - xMarkSize}
        x2={centerX - xMarkSize} y2={centerY + xMarkSize}
        {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={active
          ? { pathLength: xKf.values }
          : { pathLength: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: xKf.times }
          : undefined}
      />

      {/* Center circle */}
      <motion.circle
        cx={centerX} cy={centerY} r={centerRadius}
        {...strokeStyle} fill="none"
        initial={{ pathLength: 0 }}
        animate={active
          ? { pathLength: circKf.values }
          : { pathLength: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: circKf.times }
          : undefined}
      />

      {/* Outer nodes + connections */}
      {nodes.map((node, i) => {
        const nKf = strokeKeyframes(1 + i * 0.3, 0.4);
        const lKf = strokeKeyframes(2 + i * 0.2, 0.4);
        const pKf = fadeKeyframes(3.5 + i * 0.05, 0.5);

        return (
          <g key={i}>
            {/* Node circle */}
            <motion.circle
              cx={node.x} cy={node.y} r={nodeRadius}
              {...strokeStyle} fill="none"
              initial={{ pathLength: 0 }}
              animate={active
                ? { pathLength: nKf.values }
                : { pathLength: reduced ? 1 : 0 }}
              transition={active
                ? { ...loopTransition, times: nKf.times }
                : undefined}
            />

            {/* Label */}
            <motion.text
              x={node.x} y={node.y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fontWeight="600" fill="#7B35FF"
              initial={{ opacity: 0 }}
              animate={active
                ? { opacity: nKf.values }
                : { opacity: reduced ? 1 : 0 }}
              transition={active
                ? { ...loopTransition, times: nKf.times }
                : undefined}
            >
              {node.label}
            </motion.text>

            {/* Connecting line */}
            <motion.line
              x1={node.x} y1={node.y} x2={centerX} y2={centerY}
              {...strokeStyle} strokeOpacity={0.4}
              initial={{ pathLength: 0 }}
              animate={active
                ? { pathLength: lKf.values }
                : { pathLength: reduced ? 1 : 0 }}
              transition={active
                ? { ...loopTransition, times: lKf.times }
                : undefined}
            />

            {/* Data pulse dot */}
            <motion.circle
              r={2} fill="#7B35FF"
              initial={{ opacity: 0, cx: node.x, cy: node.y }}
              animate={active
                ? {
                    cx: [node.x, node.x, centerX, centerX, node.x],
                    cy: [node.y, node.y, centerY, centerY, node.y],
                    opacity: pKf.values,
                  }
                : {
                    cx: reduced ? centerX : node.x,
                    cy: reduced ? centerY : node.y,
                    opacity: reduced ? 1 : 0,
                  }}
              transition={active
                ? { ...loopTransition, times: pKf.times }
                : undefined}
            />
          </g>
        );
      })}

      {/* Glow behind center */}
      <motion.circle
        cx={centerX} cy={centerY} r={centerRadius + 8}
        fill="none" stroke="#7B35FF" strokeWidth={0.5}
        initial={{ opacity: 0 }}
        animate={active
          ? { opacity: [0, 0, 0, 0.25, 0] }
          : { opacity: reduced ? 0.15 : 0 }}
        transition={active
          ? { ...loopTransition, times: [0, 0.001, 0.7, 0.78, 1] }
          : undefined}
      />
    </svg>
  );
}
