"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import {
  strokeKeyframes,
  fadeKeyframes,
  loopTransition,
  svgProps,
  strokeStyle,
  interiorFill,
} from "./animationUtils";

export default function SocialMediaIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const active = inView && !reduced;

  const phones = [
    { x: 30, y: 10 },
    { x: 105, y: 25 },
    { x: 180, y: 15 },
  ];
  const phoneW = 70;
  const phoneH = 130;
  const phoneRx = 10;

  const p1Kf = strokeKeyframes(0, 0.8);
  const p2Kf = strokeKeyframes(0.3, 0.8);
  const p3Kf = strokeKeyframes(0.6, 0.8);
  const contentKf = fadeKeyframes(1.2, 1.8);
  const heartKf = fadeKeyframes(3, 0.5);
  const xKf = strokeKeyframes(3.5, 0.5);

  /* Helper: renders content lines for a phone */
  function PhoneContent({ px, py }: { px: number; py: number }) {
    const lines = [
      { x1: px + 10, y1: py + 45, x2: px + 60 },
      { x1: px + 10, y1: py + 52, x2: px + 55 },
      { x1: px + 10, y1: py + 59, x2: px + 50 },
      { x1: px + 10, y1: py + 75, x2: px + 60 },
      { x1: px + 10, y1: py + 82, x2: px + 55 },
    ];
    return (
      <>
        {lines.map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y1}
            {...strokeStyle}
            initial={{ opacity: 0 }}
            animate={active
              ? { opacity: contentKf.values }
              : { opacity: reduced ? 1 : 0 }}
            transition={active
              ? { ...loopTransition, times: contentKf.times }
              : undefined}
          />
        ))}
      </>
    );
  }

  return (
    <svg {...svgProps} ref={ref}>
      {/* Phone 1 frame */}
      <motion.rect
        x={phones[0].x} y={phones[0].y}
        width={phoneW} height={phoneH} rx={phoneRx}
        fill={interiorFill} {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={active
          ? { pathLength: p1Kf.values }
          : { pathLength: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: p1Kf.times }
          : undefined}
      />

      {/* Phone 1: X mark as profile icon */}
      <motion.line
        x1={phones[0].x + 28} y1={phones[0].y + 20}
        x2={phones[0].x + 42} y2={phones[0].y + 30}
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
        x1={phones[0].x + 42} y1={phones[0].y + 20}
        x2={phones[0].x + 28} y2={phones[0].y + 30}
        {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={active
          ? { pathLength: xKf.values }
          : { pathLength: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: xKf.times }
          : undefined}
      />

      {/* Phone 1: Content */}
      <PhoneContent px={phones[0].x} py={phones[0].y} />

      {/* Phone 2 frame */}
      <motion.rect
        x={phones[1].x} y={phones[1].y}
        width={phoneW} height={phoneH} rx={phoneRx}
        fill={interiorFill} {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={active
          ? { pathLength: p2Kf.values }
          : { pathLength: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: p2Kf.times }
          : undefined}
      />

      {/* Phone 2: Profile circle */}
      <motion.circle
        cx={phones[1].x + 35} cy={phones[1].y + 25} r={6}
        {...strokeStyle} fill="none"
        initial={{ opacity: 0 }}
        animate={active
          ? { opacity: contentKf.values }
          : { opacity: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: contentKf.times }
          : undefined}
      />

      {/* Phone 2: Content */}
      <PhoneContent px={phones[1].x} py={phones[1].y} />

      {/* Phone 2: Heart icon */}
      <motion.path
        d={`M${phones[1].x + 55},${phones[1].y + 98} C${phones[1].x + 55},${phones[1].y + 96} ${phones[1].x + 51},${phones[1].y + 96} ${phones[1].x + 51},${phones[1].y + 98} C${phones[1].x + 51},${phones[1].y + 101} ${phones[1].x + 55},${phones[1].y + 103} ${phones[1].x + 55},${phones[1].y + 103} C${phones[1].x + 55},${phones[1].y + 103} ${phones[1].x + 59},${phones[1].y + 101} ${phones[1].x + 59},${phones[1].y + 98} C${phones[1].x + 59},${phones[1].y + 96} ${phones[1].x + 55},${phones[1].y + 96} ${phones[1].x + 55},${phones[1].y + 98}Z`}
        {...strokeStyle} fill="none"
        initial={{ opacity: 0, scale: 0 }}
        animate={active
          ? {
              opacity: heartKf.values,
              scale: [0, 0, 1.2, 1, 0],
            }
          : { opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: heartKf.times }
          : undefined}
        style={{ willChange: "transform, opacity", transformOrigin: `${phones[1].x + 55}px ${phones[1].y + 100}px` }}
      />

      {/* Phone 3 frame */}
      <motion.rect
        x={phones[2].x} y={phones[2].y}
        width={phoneW} height={phoneH} rx={phoneRx}
        fill={interiorFill} {...strokeStyle}
        initial={{ pathLength: 0 }}
        animate={active
          ? { pathLength: p3Kf.values }
          : { pathLength: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: p3Kf.times }
          : undefined}
      />

      {/* Phone 3: Profile circle */}
      <motion.circle
        cx={phones[2].x + 35} cy={phones[2].y + 25} r={6}
        {...strokeStyle} fill="none"
        initial={{ opacity: 0 }}
        animate={active
          ? { opacity: contentKf.values }
          : { opacity: reduced ? 1 : 0 }}
        transition={active
          ? { ...loopTransition, times: contentKf.times }
          : undefined}
      />

      {/* Phone 3: Content */}
      <PhoneContent px={phones[2].x} py={phones[2].y} />
    </svg>
  );
}
