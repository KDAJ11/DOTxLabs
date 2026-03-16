/**
 * Shared animation timing utilities for service illustrations.
 *
 * ALL illustrations use a 6-second total loop:
 *   0–4s   → sequential stroke draw-on (pathLength 0→1)
 *   4–5s   → hold (all strokes visible)
 *   5–6s   → fade/reset (pathLength snaps to 0 over ~0.8s)
 *
 * Each stroke gets keyframed times so every element in the illustration
 * loops in perfect sync regardless of stagger position.
 */

export const CYCLE = 6;
export const DRAW_WINDOW = 4; // seconds available for drawing
export const HOLD_AT = 4.2; // hold fully drawn until this
export const RESET_START = 5; // begin reset

/**
 * Returns Framer Motion keyframe arrays for a single stroke's pathLength.
 *
 * @param startDelay  When this stroke begins drawing (0–DRAW_WINDOW)
 * @param drawDuration  How long it takes to draw (seconds)
 */
export function strokeKeyframes(startDelay: number, drawDuration: number) {
  const s = Math.max(startDelay / CYCLE, 0.001);
  const e = Math.min((startDelay + drawDuration) / CYCLE, RESET_START / CYCLE - 0.01);
  const holdEnd = RESET_START / CYCLE;

  return {
    values: [0, 0, 1, 1, 0],
    times: [0, s, e, holdEnd, 1],
  };
}

/**
 * Returns Framer Motion keyframe arrays for opacity-based entrance.
 */
export function fadeKeyframes(startDelay: number, fadeDuration: number) {
  const s = Math.max(startDelay / CYCLE, 0.001);
  const e = Math.min((startDelay + fadeDuration) / CYCLE, RESET_START / CYCLE - 0.01);
  const holdEnd = RESET_START / CYCLE;

  return {
    values: [0, 0, 1, 1, 0],
    times: [0, s, e, holdEnd, 1],
  };
}

/**
 * Standard transition object for all looping strokes.
 */
export const loopTransition = {
  duration: CYCLE,
  repeat: Infinity,
  ease: "linear" as const,
};

/**
 * Shared SVG props for all illustration roots.
 */
export const svgProps = {
  viewBox: "0 0 280 200",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  className: "w-full h-auto",
  style: { maxWidth: 560 } as React.CSSProperties,
};

/**
 * Shared stroke style for all illustration paths.
 */
export const strokeStyle = {
  stroke: "#7B35FF",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Interior fill for frames/screens — visible on dark backgrounds.
 */
export const interiorFill = "rgba(255,255,255,0.05)";
