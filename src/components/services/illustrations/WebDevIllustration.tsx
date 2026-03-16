"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";
import {
  strokeStyle,
  svgProps,
  interiorFill,
  strokeKeyframes,
  loopTransition,
} from "./animationUtils";

export default function WebDevIllustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <svg
      ref={ref}
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* LEFT HALF: CODE EDITOR */}
      {/* Editor frame (rounded rect) */}
      <motion.rect
        x={10}
        y={20}
        width={120}
        height={150}
        rx={6}
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
                times: [0, 0, 0.0833, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Title bar with 3 dots */}
      <motion.circle
        cx={22}
        cy={30}
        r={2.5}
        fill="#7B35FF"
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
                times: [0, 0.15, 0.25, 0.833, 1],
              }
            : undefined
        }
      />
      <motion.circle
        cx={30}
        cy={30}
        r={2.5}
        fill="#7B35FF"
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
                times: [0, 0.15, 0.25, 0.833, 1],
              }
            : undefined
        }
      />
      <motion.circle
        cx={38}
        cy={30}
        r={2.5}
        fill="#7B35FF"
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
                times: [0, 0.15, 0.25, 0.833, 1],
              }
            : undefined
        }
      />

      {/* Code lines - 6 lines with staggered widths */}
      {/* Line 1 */}
      <motion.line
        x1={20}
        y1={50}
        x2={100}
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
                times: [0, 0.25, 0.4, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Line 2 */}
      <motion.line
        x1={20}
        y1={65}
        x2={110}
        y2={65}
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
                times: [0, 0.32, 0.47, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Line 3 */}
      <motion.line
        x1={20}
        y1={80}
        x2={105}
        y2={80}
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
                times: [0, 0.39, 0.54, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Line 4 */}
      <motion.line
        x1={20}
        y1={95}
        x2={95}
        y2={95}
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
                times: [0, 0.46, 0.61, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Line 5 */}
      <motion.line
        x1={20}
        y1={110}
        x2={100}
        y2={110}
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
                times: [0, 0.53, 0.68, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Line 6 */}
      <motion.line
        x1={20}
        y1={125}
        x2={85}
        y2={125}
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
                times: [0, 0.6, 0.75, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Cursor - small vertical line blinking at end of last code line */}
      <motion.line
        x1={87}
        y1={121}
        x2={87}
        y2={129}
        {...strokeStyle}
        initial={{ opacity: 1 }}
        animate={
          inView && !reduced
            ? { opacity: [0, 1, 0, 1, 0] }
            : { opacity: reduced ? 1 : 0 }
        }
        transition={
          inView && !reduced
            ? {
                ...loopTransition,
                times: [0, 0.65, 0.8, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* RIGHT HALF: BROWSER PREVIEW */}
      {/* Browser frame */}
      <motion.rect
        x={150}
        y={20}
        width={120}
        height={150}
        rx={6}
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
                times: [0, 0.4, 0.5, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* URL bar */}
      <motion.rect
        x={158}
        y={30}
        width={104}
        height={12}
        rx={3}
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
                times: [0, 0.45, 0.55, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Header bar */}
      <motion.line
        x1={150}
        y1={60}
        x2={270}
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
                times: [0, 0.5, 0.6, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Left content column */}
      <motion.rect
        x={158}
        y={68}
        width={44}
        height={95}
        rx={3}
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
                times: [0, 0.55, 0.65, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* Right content column */}
      <motion.rect
        x={210}
        y={68}
        width={50}
        height={95}
        rx={3}
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
                times: [0, 0.6, 0.7, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* X favicon - two small crossing lines in browser tab area */}
      {/* X line 1 (top-left to bottom-right) */}
      <motion.line
        x1={163}
        y1={27}
        x2={171}
        y2={35}
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
                times: [0, 0.7, 0.8, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />

      {/* X line 2 (top-right to bottom-left) */}
      <motion.line
        x1={171}
        y1={27}
        x2={163}
        y2={35}
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
                times: [0, 0.72, 0.82, 0.833, 1],
              }
            : undefined
        }
        style={{ willChange: "transform" }}
      />
    </svg>
  );
}
