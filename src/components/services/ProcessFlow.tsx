"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

/* ─── Types ─────────────────────────────────────────── */
interface Step {
  label: string;
  description: string;
}

type ServiceKey =
  | "web-development"
  | "seo"
  | "ai-automation"
  | "brand-strategy"
  | "logo-design"
  | "digital-marketing"
  | "social-media-marketing"
  | "marketing-campaigns";

type NodeShape =
  | "circle"
  | "hexagon"
  | "square"
  | "diamond"
  | "pentagon"
  | "triangle"
  | "pill";

interface ProcessFlowProps {
  steps: Step[];
  variant?: "dark" | "light";
  service?: ServiceKey;
}

/* ─── Service Config ────────────────────────────────── */
interface ServiceConfig {
  nodeShape: NodeShape;
  pulseColour: string;
  centreRadius: number;
  xArmLength: number;
}

const SERVICE_CONFIG: Record<ServiceKey, ServiceConfig> = {
  "web-development": {
    nodeShape: "circle",
    pulseColour: "#5B6BFF",
    centreRadius: 42,
    xArmLength: 17,
  },
  seo: {
    nodeShape: "hexagon",
    pulseColour: "#5B6BFF",
    centreRadius: 36,
    xArmLength: 14,
  },
  "ai-automation": {
    nodeShape: "square",
    pulseColour: "#5B6BFF",
    centreRadius: 38,
    xArmLength: 15,
  },
  "brand-strategy": {
    nodeShape: "diamond",
    pulseColour: "#9B5BFF",
    centreRadius: 34,
    xArmLength: 13,
  },
  "logo-design": {
    nodeShape: "pentagon",
    pulseColour: "#9B5BFF",
    centreRadius: 30,
    xArmLength: 12,
  },
  "digital-marketing": {
    nodeShape: "triangle",
    pulseColour: "#C45BFF",
    centreRadius: 40,
    xArmLength: 16,
  },
  "social-media-marketing": {
    nodeShape: "pill",
    pulseColour: "#C45BFF",
    centreRadius: 32,
    xArmLength: 13,
  },
  "marketing-campaigns": {
    nodeShape: "circle",
    pulseColour: "#7B35FF",
    centreRadius: 38,
    xArmLength: 15,
  },
};

const DEFAULT_SERVICE: ServiceKey = "web-development";

/* ─── Constants ─────────────────────────────────────── */
const ACCENT = "#7B35FF";
const DEG_TO_RAD = Math.PI / 180;
const VIEW_BOX = 360;
const CX = 180;
const CY = 180;
const SPOKE_RADIUS = 130;

/* ─── Helpers ───────────────────────────────────────── */
function wrapText(text: string, charLimit = 20, maxLines = 3): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current.length + word.length + 1 > charLimit && current.length > 0) {
      lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length > maxLines) lines.length = maxLines;
  return lines;
}

function getTextAnchor(angleDeg: number): "start" | "end" | "middle" {
  const a = ((angleDeg % 360) + 360) % 360;
  if (a >= 60 && a < 120) return "start";
  if (a >= 120 && a < 240) return "start";
  if (a >= 240 && a < 300) return "end";
  // top / bottom / right side
  if (a >= 300 || a < 60) return "end";
  return "middle";
}

function getAnchorForAngle(angleDeg: number): "start" | "end" | "middle" {
  const a = ((angleDeg % 360) + 360) % 360;
  // Right half (315-45) → start (text goes right)
  // Bottom (45-135) → middle
  // Left half (135-225) → end (text goes left)
  // Top (225-315) → middle
  if (a >= 45 && a < 135) return "start";
  if (a >= 135 && a < 225) return "end";
  if (a >= 225 && a < 315) return "end";
  return "start";
}

/** Seed-based deterministic pseudo-random */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/* ─── Node Shape Renderers ──────────────────────────── */
function renderNodeShape(
  shape: NodeShape,
  x: number,
  y: number,
  stroke: string,
  strokeWidth: number,
  fill: string,
  filter?: string
): React.ReactElement {
  const props = {
    stroke,
    strokeWidth,
    fill,
    filter,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (shape) {
    case "circle":
      return <circle cx={x} cy={y} r={18} {...props} />;

    case "hexagon": {
      const r = 18;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (60 * i - 30) * DEG_TO_RAD;
        return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
      }).join(" ");
      return <polygon points={pts} {...props} />;
    }

    case "square":
      return (
        <rect
          x={x - 16}
          y={y - 16}
          width={32}
          height={32}
          rx={4}
          {...props}
        />
      );

    case "diamond":
      return (
        <rect
          x={x - 13}
          y={y - 13}
          width={26}
          height={26}
          rx={3}
          transform={`rotate(45 ${x} ${y})`}
          {...props}
        />
      );

    case "pentagon": {
      const r = 17;
      const pts = Array.from({ length: 5 }, (_, i) => {
        const a = (72 * i - 90) * DEG_TO_RAD;
        return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
      }).join(" ");
      return <polygon points={pts} {...props} />;
    }

    case "triangle": {
      const r = 19;
      const pts = Array.from({ length: 3 }, (_, i) => {
        const a = (120 * i - 90) * DEG_TO_RAD;
        return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
      }).join(" ");
      return <polygon points={pts} {...props} />;
    }

    case "pill":
      return (
        <rect
          x={x - 18}
          y={y - 10}
          width={36}
          height={20}
          rx={10}
          {...props}
        />
      );

    default:
      return <circle cx={x} cy={y} r={18} {...props} />;
  }
}

/* ─── Particle Renderers ────────────────────────────── */
function getParticleContent(
  service: ServiceKey,
  index: number,
  colour: string,
  x: number,
  y: number
): React.ReactElement {
  const opacity =
    service === "ai-automation" || service === "social-media-marketing"
      ? 0.07
      : 0.06;
  const key = `p-${index}`;

  switch (service) {
    case "web-development": {
      const tokens = ["</>", "{ }", "fn", "=>", "[ ]", "::","#!", "%%"];
      return (
        <text
          key={key}
          x={x}
          y={y}
          fontSize={9}
          fontFamily="monospace"
          fill={colour}
          opacity={opacity}
        >
          {tokens[index % tokens.length]}
        </text>
      );
    }
    case "seo": {
      const tokens = ["#1", "↑", "?q=", "301", "H1", "alt", "404", "meta"];
      return (
        <text
          key={key}
          x={x}
          y={y}
          fontSize={9}
          fontFamily="monospace"
          fill={colour}
          opacity={opacity}
        >
          {tokens[index % tokens.length]}
        </text>
      );
    }
    case "ai-automation": {
      if (index % 2 === 0) {
        return (
          <circle key={key} cx={x} cy={y} r={2} fill={colour} opacity={opacity} />
        );
      }
      return (
        <line
          key={key}
          x1={x}
          y1={y}
          x2={x + 6}
          y2={y - 6}
          stroke={colour}
          strokeWidth={1}
          opacity={opacity}
        />
      );
    }
    case "brand-strategy": {
      if (index % 2 === 0) {
        const pts = `${x},${y - 4} ${x - 3.5},${y + 2} ${x + 3.5},${y + 2}`;
        return (
          <polygon key={key} points={pts} fill={colour} opacity={opacity} />
        );
      }
      return (
        <circle key={key} cx={x} cy={y} r={3} fill={colour} opacity={opacity} />
      );
    }
    case "logo-design": {
      if (index % 2 === 0) {
        return (
          <rect
            key={key}
            x={x - 2}
            y={y - 2}
            width={4}
            height={4}
            fill={colour}
            opacity={opacity}
          />
        );
      }
      return (
        <g key={key} opacity={opacity}>
          <line
            x1={x - 3}
            y1={y - 3}
            x2={x + 3}
            y2={y + 3}
            stroke={colour}
            strokeWidth={1}
          />
          <line
            x1={x + 3}
            y1={y - 3}
            x2={x - 3}
            y2={y + 3}
            stroke={colour}
            strokeWidth={1}
          />
        </g>
      );
    }
    case "digital-marketing": {
      const tokens = ["%", "↑", "×2", "ROI", "$", "CTR", "CPA", "LTV"];
      return (
        <text
          key={key}
          x={x}
          y={y}
          fontSize={9}
          fontFamily="monospace"
          fill={colour}
          opacity={opacity}
        >
          {tokens[index % tokens.length]}
        </text>
      );
    }
    case "social-media-marketing": {
      if (index % 2 === 0) {
        // Heart outline
        return (
          <path
            key={key}
            d={`M${x} ${y + 2} C${x - 4} ${y - 2} ${x - 4} ${y - 5} ${x} ${y - 3} C${x + 4} ${y - 5} ${x + 4} ${y - 2} ${x} ${y + 2}Z`}
            stroke={colour}
            strokeWidth={0.8}
            fill="none"
            opacity={0.08}
          />
        );
      }
      // Speech bubble
      return (
        <path
          key={key}
          d={`M${x - 4} ${y - 3} h8 a2 2 0 0 1 2 2 v3 a2 2 0 0 1 -2 2 h-4 l-2 2 v-2 h-2 a2 2 0 0 1 -2 -2 v-3 a2 2 0 0 1 2 -2z`}
          stroke={colour}
          strokeWidth={0.8}
          fill="none"
          opacity={0.08}
        />
      );
    }
    case "marketing-campaigns": {
      const tokens = ["→", "⊕", "↗", "∞", "◎", "≡", "⟐", "⊞"];
      return (
        <text
          key={key}
          x={x}
          y={y}
          fontSize={9}
          fontFamily="monospace"
          fill={colour}
          opacity={opacity}
        >
          {tokens[index % tokens.length]}
        </text>
      );
    }
    default:
      return (
        <circle key={key} cx={x} cy={y} r={2} fill={colour} opacity={opacity} />
      );
  }
}

/* ─── Orbital Drift Hook ────────────────────────────── */
function useOrbitalDrift(
  baseAngle: number,
  index: number,
  enabled: boolean
) {
  const angle = useMotionValue(baseAngle);

  useEffect(() => {
    if (!enabled) {
      angle.set(baseAngle);
      return;
    }
    const speed = 0.3 + seededRandom(index * 7 + 3) * 0.4;
    const amplitude = 4;
    let frame: number;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      angle.set(baseAngle + Math.sin(elapsed * speed) * amplitude);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [baseAngle, index, enabled, angle]);

  const x = useTransform(angle, (a) => CX + SPOKE_RADIUS * Math.cos(a * DEG_TO_RAD));
  const y = useTransform(angle, (a) => CY + SPOKE_RADIUS * Math.sin(a * DEG_TO_RAD));
  const spokeX = useTransform(angle, (a) => CX + SPOKE_RADIUS * Math.cos(a * DEG_TO_RAD));
  const spokeY = useTransform(angle, (a) => CY + SPOKE_RADIUS * Math.sin(a * DEG_TO_RAD));

  return { x, y, spokeX, spokeY, angle };
}

/* ─── Single Node Component ─────────────────────────── */
interface NodeProps {
  step: Step;
  index: number;
  totalNodes: number;
  config: ServiceConfig;
  isLight: boolean;
  isHovered: boolean;
  isAnyHovered: boolean;
  baseAngle: number;
  driftEnabled: boolean;
  show: boolean;
  reduced: boolean | null;
  onHoverIn: (i: number) => void;
  onHoverOut: () => void;
  onTap: (i: number) => void;
}

function ProcessNode({
  step,
  index,
  totalNodes,
  config,
  isLight,
  isHovered,
  isAnyHovered,
  baseAngle,
  driftEnabled,
  show,
  reduced,
  onHoverIn,
  onHoverOut,
  onTap,
}: NodeProps) {
  const { x, y, angle } = useOrbitalDrift(baseAngle, index, driftEnabled);

  const spokeWidth = Math.max(0.8, 1.5 - (index / totalNodes) * 0.6);
  const labelOffset = 26;

  // Label positioning — computed from angle motion value
  const lx = useTransform(angle, (a) => {
    return CX + (SPOKE_RADIUS + labelOffset) * Math.cos(a * DEG_TO_RAD);
  });
  const ly = useTransform(angle, (a) => {
    return CY + (SPOKE_RADIUS + labelOffset) * Math.sin(a * DEG_TO_RAD);
  });

  // Spoke start from centre circle edge
  const edgeX = useTransform(angle, (a) => {
    return CX + config.centreRadius * Math.cos(a * DEG_TO_RAD);
  });
  const edgeY = useTransform(angle, (a) => {
    return CY + config.centreRadius * Math.sin(a * DEG_TO_RAD);
  });

  const labelColor = isLight ? "rgba(15,15,30,0.8)" : "rgba(255,255,255,0.8)";
  const spokeBaseOpacity = isLight ? 0.25 : 0.3;
  const fontSize = step.label.length > 9 ? 9 : 10;

  // Text anchor based on base angle (stable, not drifting by ±4°)
  const anchor = useMemo(() => {
    const a = ((baseAngle % 360) + 360) % 360;
    if (a > 60 && a < 120) return "middle" as const; // bottom
    if (a > 240 && a < 300) return "middle" as const; // top
    if (a >= 120 && a <= 240) return "end" as const; // left
    return "start" as const; // right
  }, [baseAngle]);

  const nodeOpacity = isAnyHovered ? (isHovered ? 1 : 0.25) : 1;
  const spokeOpacity = isAnyHovered
    ? isHovered
      ? 1
      : spokeBaseOpacity * 0.5
    : spokeBaseOpacity;

  const nodeFill = isHovered
    ? `${config.pulseColour}4D`
    : `${config.pulseColour}15`;

  const nodeFilter =
    isHovered && !reduced
      ? `drop-shadow(0 0 8px ${config.pulseColour})`
      : undefined;

  const spokeStroke = isHovered ? config.pulseColour : ACCENT;

  return (
    <g>
      {/* Spoke line */}
      <motion.line
        x1={x}
        y1={y}
        x2={edgeX}
        y2={edgeY}
        stroke={spokeStroke}
        strokeWidth={spokeWidth}
        strokeLinecap="round"
        initial={reduced ? { opacity: spokeBaseOpacity } : { opacity: 0 }}
        animate={
          show
            ? { opacity: spokeOpacity }
            : reduced
            ? { opacity: spokeBaseOpacity }
            : { opacity: 0 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.4, delay: 0.6 + index * 0.04 }
        }
        style={{ willChange: "transform" }}
      />

      {/* Node shape */}
      <motion.g
        style={{ x, y, willChange: "transform" }}
        initial={
          reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
        }
        animate={
          show
            ? {
                opacity: nodeOpacity,
                scale: isHovered && !reduced ? 1.15 : 1,
              }
            : reduced
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : {
                opacity: { duration: 0.2 },
                scale: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.5,
                },
              }
        }
        onMouseEnter={() => onHoverIn(index)}
        onMouseLeave={onHoverOut}
        onClick={() => onTap(index)}
        role="button"
        tabIndex={0}
        aria-label={`${step.label}: ${step.description}`}
        className="outline-none"
      >
        {/* We render the shape at 0,0 since the g is translated by motion x,y */}
        {renderNodeShape(
          config.nodeShape,
          0,
          0,
          isHovered ? config.pulseColour : ACCENT,
          1.5,
          nodeFill,
          nodeFilter
        )}
      </motion.g>

      {/* Label */}
      <motion.text
        x={lx}
        y={ly}
        textAnchor={anchor}
        dominantBaseline="central"
        fill={labelColor}
        fontSize={fontSize}
        fontWeight={600}
        style={{
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          pointerEvents: "none",
          willChange: "transform",
        }}
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={
          show
            ? { opacity: isAnyHovered ? (isHovered ? 1 : 0.25) : 1 }
            : reduced
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.3, delay: 0.9 + index * 0.05 }
        }
      >
        {step.label}
      </motion.text>
    </g>
  );
}

/* ─── Ambient Particles ─────────────────────────────── */
function AmbientParticles({
  service,
  pulseColour,
}: {
  service: ServiceKey;
  pulseColour: string;
}) {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const seed = i * 137 + 42;
      const px = 30 + seededRandom(seed) * 300;
      const py = 30 + seededRandom(seed + 1) * 300;
      const dx = (seededRandom(seed + 2) - 0.5) * 20;
      const dy = (seededRandom(seed + 3) - 0.5) * 20;
      const dur = 8 + seededRandom(seed + 4) * 7;
      return { px, py, dx, dy, dur, i };
    });
  }, []);

  return (
    <g>
      {particles.map((p) => (
        <motion.g
          key={p.i}
          animate={{
            x: [0, p.dx, 0],
            y: [0, p.dy, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ willChange: "transform" }}
        >
          {getParticleContent(service, p.i, pulseColour, p.px, p.py)}
        </motion.g>
      ))}
    </g>
  );
}

/* ─── Travelling Dot ────────────────────────────────── */
function TravellingDot({
  fromX,
  fromY,
  toX,
  toY,
  colour,
  hoveredKey: _hoveredKey,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  colour: string;
  hoveredKey: number;
}) {
  return (
    <motion.circle
      r={3}
      fill={colour}
      initial={{ cx: fromX, cy: fromY, opacity: 1 }}
      animate={{ cx: toX, cy: toY, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      style={{ willChange: "transform" }}
    />
  );
}

/* ─── Main Component ────────────────────────────────── */
export default function ProcessFlow({
  steps,
  variant = "dark",
  service,
}: ProcessFlowProps) {
  const serviceKey = service || DEFAULT_SERVICE;
  const config = SERVICE_CONFIG[serviceKey] || SERVICE_CONFIG[DEFAULT_SERVICE];
  const isLight = variant === "light";
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const show = inView || !!reduced;
  const driftEnabled = show && !reduced && hoveredIndex === null && activeIndex === null;

  const activeNodeIndex = hoveredIndex ?? activeIndex;
  const isAnyHovered = activeNodeIndex !== null;
  const descColor = isLight ? "rgba(15,15,30,0.7)" : "rgba(255,255,255,0.7)";
  const descLines = activeNodeIndex !== null ? wrapText(steps[activeNodeIndex].description, 20, 3) : [];

  /* ─── Node base angles ─── */
  const baseAngles = useMemo(
    () => steps.map((_, i) => -90 + i * (360 / steps.length)),
    [steps]
  );

  /* ─── Compute static positions for spoke endpoints and travelling dot ─── */
  const staticPositions = useMemo(
    () =>
      baseAngles.map((angle) => {
        const rad = angle * DEG_TO_RAD;
        return {
          nx: CX + SPOKE_RADIUS * Math.cos(rad),
          ny: CY + SPOKE_RADIUS * Math.sin(rad),
          ex: CX + config.centreRadius * Math.cos(rad),
          ey: CY + config.centreRadius * Math.sin(rad),
        };
      }),
    [baseAngles, config.centreRadius]
  );

  /* ─── Handlers ─── */
  const handleHoverIn = useCallback((i: number) => {
    setHoveredIndex(i);
  }, []);
  const handleHoverOut = useCallback(() => {
    setHoveredIndex(null);
  }, []);
  const handleTap = useCallback((i: number) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  const handleSvgClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      // If tapped on the SVG background (not a node), clear active
      if ((e.target as SVGElement).tagName === "svg") {
        setActiveIndex(null);
      }
    },
    []
  );

  return (
    <div>
      <p
        className={`text-xs font-semibold uppercase mb-6 ${
          isLight ? "text-gray-900/40" : "text-white/40"
        }`}
        style={{ letterSpacing: "0.15em" }}
      >
        Our Process
      </p>

      <div ref={containerRef} className="w-full">
        <div className="w-full max-w-[400px] mx-auto md:max-w-none">
          <svg
            viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
            className="w-full h-auto"
            fill="none"
            aria-label={`Process flow: ${steps.map((s) => s.label).join(", ")}`}
            role="img"
            style={{
              overflow: "visible",
              touchAction: "manipulation",
            }}
            onClick={handleSvgClick}
          >
            {/* ─── Ambient Particles ─── */}
            {!reduced && (
              <AmbientParticles
                service={serviceKey}
                pulseColour={config.pulseColour}
              />
            )}

            {/* ─── Centre circle ─── */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={config.centreRadius}
              stroke={ACCENT}
              strokeWidth={1.5}
              fill={`${ACCENT}14`}
              strokeLinecap="round"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : { pathLength: 0 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }
              }
              style={{ willChange: "transform" }}
            />

            {/* ─── Centre X mark / Description ─── */}
            <AnimatePresence mode="wait">
              {activeNodeIndex === null ? (
                <motion.g
                  key="x-mark"
                  initial={{ opacity: reduced ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.line
                    x1={CX - config.xArmLength}
                    y1={CY - config.xArmLength}
                    x2={CX + config.xArmLength}
                    y2={CY + config.xArmLength}
                    stroke={ACCENT}
                    strokeWidth={2}
                    strokeLinecap="round"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={show ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 0.3, delay: 0.3, ease: "easeOut" }
                    }
                    style={{ willChange: "transform" }}
                  />
                  <motion.line
                    x1={CX + config.xArmLength}
                    y1={CY - config.xArmLength}
                    x2={CX - config.xArmLength}
                    y2={CY + config.xArmLength}
                    stroke={ACCENT}
                    strokeWidth={2}
                    strokeLinecap="round"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={show ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 0.3, delay: 0.3, ease: "easeOut" }
                    }
                    style={{ willChange: "transform" }}
                  />
                </motion.g>
              ) : (
                <motion.g
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {descLines.map((line, li) => (
                    <text
                      key={li}
                      x={CX}
                      y={CY - (descLines.length - 1) * 6 + li * 12}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={descColor}
                      fontSize={10}
                      fontWeight={500}
                      style={{ pointerEvents: "none" }}
                    >
                      {line}
                    </text>
                  ))}
                </motion.g>
              )}
            </AnimatePresence>

            {/* ─── Centre pulse on hover ─── */}
            {isAnyHovered && !reduced && (
              <motion.circle
                cx={CX}
                cy={CY}
                r={config.centreRadius}
                stroke={config.pulseColour}
                strokeWidth={1}
                fill="none"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0] }}
                transition={{ duration: 0.3 }}
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                  willChange: "transform",
                }}
              />
            )}

            {/* ─── Centre glow on hover ─── */}
            {isAnyHovered && !reduced && (
              <motion.circle
                cx={CX}
                cy={CY}
                r={config.centreRadius + 4}
                fill="none"
                stroke={config.pulseColour}
                strokeWidth={0.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
                filter={`drop-shadow(0 0 10px ${config.pulseColour})`}
                style={{ willChange: "transform" }}
              />
            )}

            {/* ─── Travelling dot on hover ─── */}
            {activeNodeIndex !== null && !reduced && (
              <TravellingDot
                key={`travel-${activeNodeIndex}`}
                fromX={staticPositions[activeNodeIndex].nx}
                fromY={staticPositions[activeNodeIndex].ny}
                toX={staticPositions[activeNodeIndex].ex}
                toY={staticPositions[activeNodeIndex].ey}
                colour={config.pulseColour}
                hoveredKey={activeNodeIndex}
              />
            )}

            {/* ─── Nodes ─── */}
            {steps.map((step, i) => (
              <ProcessNode
                key={i}
                step={step}
                index={i}
                totalNodes={steps.length}
                config={config}
                isLight={isLight}
                isHovered={activeNodeIndex === i}
                isAnyHovered={isAnyHovered}
                baseAngle={baseAngles[i]}
                driftEnabled={driftEnabled}
                show={show}
                reduced={reduced}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
                onTap={handleTap}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
