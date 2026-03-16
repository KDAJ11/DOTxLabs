"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import { strokeKeyframes, loopTransition, interiorFill } from "./animationUtils";

export default function AIIllustration() {
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

  const triggerKeyframes = getKeyframes(0, 1.5);
  const aiKeyframes = getKeyframes(0.2, 1.5);
  const outputKeyframes = getKeyframes(0.4, 1.5);
  const arrowLeftKeyframes = getKeyframes(1.5, 1);
  const arrowRightKeyframes = getKeyframes(1.8, 1);
  const packetLeftKeyframes = getKeyframes(2.5, 1);
  const packetRightKeyframes = getKeyframes(2.7, 1);
  const glowKeyframes = getKeyframes(3, 1);
  const subOutputKeyframes = getKeyframes(3.5, 0.8);

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
      {/* Glow effect behind center node */}
      <motion.circle
        cx={140}
        cy={85}
        r={50}
        fill="rgba(123, 53, 255, 0.1)"
        filter="blur(8px)"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? {
                opacity: [0, 0, 0.3, 0.3, 0],
              }
            : { opacity: reduced ? 0.3 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: glowKeyframes.times }
            : undefined
        }
      />

      {/* TRIGGER NODE */}
      <motion.rect
        x={20}
        y={70}
        width={60}
        height={40}
        rx={6}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill={inView && !reduced ? interiorFill : "none"}
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: triggerKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: triggerKeyframes.times }
            : undefined
        }
      />
      <text
        x={50}
        y={95}
        textAnchor="middle"
        fontSize={10}
        fill="#7B35FF"
        fontFamily="system-ui, sans-serif"
      >
        TRIGGER
      </text>

      {/* AI CENTER NODE */}
      <motion.rect
        x={110}
        y={60}
        width={60}
        height={50}
        rx={6}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill={inView && !reduced ? interiorFill : "none"}
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: aiKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: aiKeyframes.times }
            : undefined
        }
      />
      <text
        x={140}
        y={87}
        textAnchor="middle"
        fontSize={10}
        fill="#7B35FF"
        fontFamily="system-ui, sans-serif"
      >
        X-AI
      </text>

      {/* X mark inside center node */}
      <motion.line
        x1={120}
        y1={68}
        x2={150}
        y2={98}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: aiKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: aiKeyframes.times }
            : undefined
        }
      />
      <motion.line
        x1={150}
        y1={68}
        x2={120}
        y2={98}
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: aiKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: aiKeyframes.times }
            : undefined
        }
      />

      {/* OUTPUT NODE */}
      <motion.rect
        x={200}
        y={70}
        width={60}
        height={40}
        rx={6}
        stroke="#7B35FF"
        strokeWidth={1.5}
        fill={inView && !reduced ? interiorFill : "none"}
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: outputKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: outputKeyframes.times }
            : undefined
        }
      />
      <text
        x={230}
        y={95}
        textAnchor="middle"
        fontSize={10}
        fill="#7B35FF"
        fontFamily="system-ui, sans-serif"
      >
        OUTPUT
      </text>

      {/* ARROW TRIGGER → AI */}
      <motion.path
        d="M 80 85 L 110 85"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: arrowLeftKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: arrowLeftKeyframes.times }
            : undefined
        }
      />
      {/* Arrowhead left arrow */}
      <motion.path
        d="M 105 81 L 110 85 L 105 89"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: arrowLeftKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: arrowLeftKeyframes.times }
            : undefined
        }
      />

      {/* ARROW AI → OUTPUT */}
      <motion.path
        d="M 170 85 L 200 85"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: arrowRightKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: arrowRightKeyframes.times }
            : undefined
        }
      />
      {/* Arrowhead right arrow */}
      <motion.path
        d="M 195 81 L 200 85 L 195 89"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: arrowRightKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: arrowRightKeyframes.times }
            : undefined
        }
      />

      {/* DATA PACKET 1 (LEFT ARROW) */}
      <motion.circle
        cx={85}
        cy={85}
        r={3}
        fill="#7B35FF"
        initial={{ opacity: 0, cx: 85 }}
        animate={
          inView && !reduced
            ? {
                opacity: [0, 0, 1, 1, 0],
                cx: [85, 85, 110, 110, 110],
              }
            : { opacity: reduced ? 1 : 0, cx: 110 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: packetLeftKeyframes.times }
            : undefined
        }
      />

      {/* DATA PACKET 2 (RIGHT ARROW) */}
      <motion.circle
        cx={175}
        cy={85}
        r={3}
        fill="#7B35FF"
        initial={{ opacity: 0, cx: 175 }}
        animate={
          inView && !reduced
            ? {
                opacity: [0, 0, 1, 1, 0],
                cx: [175, 175, 200, 200, 200],
              }
            : { opacity: reduced ? 1 : 0, cx: 200 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: packetRightKeyframes.times }
            : undefined
        }
      />

      {/* SUB-OUTPUT LINE 1 */}
      <motion.path
        d="M 230 110 L 240 140"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: subOutputKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: subOutputKeyframes.times }
            : undefined
        }
      />

      {/* SUB-OUTPUT LINE 2 */}
      <motion.path
        d="M 230 110 L 260 140"
        stroke="#7B35FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={
          inView && !reduced
            ? { pathLength: subOutputKeyframes.values }
            : { pathLength: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: subOutputKeyframes.times }
            : undefined
        }
      />

      {/* SUB-OUTPUT CIRCLES */}
      <motion.circle
        cx={240}
        cy={140}
        r={3}
        fill="#7B35FF"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: [0, 0, 1, 1, 0] }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: subOutputKeyframes.times }
            : undefined
        }
      />
      <motion.circle
        cx={260}
        cy={140}
        r={3}
        fill="#7B35FF"
        initial={{ opacity: 0 }}
        animate={
          inView && !reduced
            ? { opacity: [0, 0, 1, 1, 0] }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? { ...loopTransition, times: subOutputKeyframes.times }
            : undefined
        }
      />
    </svg>
  );
}
