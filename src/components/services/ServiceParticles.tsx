"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ─── Types ─────────────────────────────────────────── */
type ServiceId =
  | "web-development"
  | "seo"
  | "ai-automation"
  | "brand-strategy"
  | "logo-design"
  | "digital-marketing"
  | "social-media-marketing"
  | "marketing-campaigns";

interface Particle {
  id: number;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  opacity: number; // 0.04-0.08
  size: number; // font size or shape size
  duration: number; // 8-15s
  driftX: number; // px drift range
  driftY: number; // px drift range
  delay: number; // stagger start
}

/* ─── Deterministic seed helpers ────────────────────── */
function seededValue(index: number, offset: number, min: number, max: number) {
  const raw = ((index * 137.5 + offset * 73.1) % 1000) / 1000;
  return min + raw * (max - min);
}

function generateParticles(service: ServiceId, count: number): Particle[] {
  const serviceHash =
    service.split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 7;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededValue(i, serviceHash, 5, 95),
    y: seededValue(i, serviceHash + 50, 5, 95),
    opacity: seededValue(i, serviceHash + 100, 0.04, 0.08),
    size: seededValue(i, serviceHash + 150, 10, 14),
    duration: seededValue(i, serviceHash + 200, 8, 15),
    driftX: seededValue(i, serviceHash + 250, 15, 40),
    driftY: seededValue(i, serviceHash + 300, 10, 30),
    delay: seededValue(i, serviceHash + 350, 0, 3),
  }));
}

/* ─── Service-specific SVG content renderers ────────── */
const CODE_TOKENS = ["</>", "{ }", "=>", "const", "fn", "let", "::"];
const SEO_TOKENS = ["#rank", "#1", "↑", "top", "SERPs", "index", "crawl"];
const MARKETING_TOKENS = ["%", "↑", "×", "ROI", "CPC", "CTR", "ROAS"];

function renderWebDev(p: Particle) {
  const token = CODE_TOKENS[p.id % CODE_TOKENS.length];
  return (
    <text
      x="0"
      y="0"
      fill="#7B35FF"
      fontFamily="ui-monospace, monospace"
      fontSize={p.size}
      opacity={p.opacity}
    >
      {token}
    </text>
  );
}

function renderSEO(p: Particle) {
  const token = SEO_TOKENS[p.id % SEO_TOKENS.length];
  return (
    <text
      x="0"
      y="0"
      fill="#7B35FF"
      fontFamily="ui-monospace, monospace"
      fontSize={p.size}
      opacity={p.opacity}
    >
      {token}
    </text>
  );
}

function renderAI(p: Particle) {
  const isCircle = p.id % 3 === 0;
  if (isCircle) {
    return <circle cx="0" cy="0" r={2} fill="#7B35FF" opacity={p.opacity} />;
  }
  const len = 6 + (p.id % 4) * 2;
  const angle = ((p.id * 45) % 360) * (Math.PI / 180);
  return (
    <line
      x1="0"
      y1="0"
      x2={Math.cos(angle) * len}
      y2={Math.sin(angle) * len}
      stroke="#7B35FF"
      strokeWidth="1"
      opacity={p.opacity}
    />
  );
}

function renderBrand(p: Particle) {
  const shape = p.id % 3;
  if (shape === 0) {
    // Triangle
    const s = 5 + (p.id % 4);
    return (
      <polygon
        points={`0,${-s} ${s},${s} ${-s},${s}`}
        fill="none"
        stroke="#7B35FF"
        strokeWidth="1"
        opacity={p.opacity}
      />
    );
  }
  if (shape === 1) {
    // Diamond
    const s = 5 + (p.id % 3);
    return (
      <polygon
        points={`0,${-s} ${s},0 0,${s} ${-s},0`}
        fill="none"
        stroke="#7B35FF"
        strokeWidth="1"
        opacity={p.opacity}
      />
    );
  }
  // Circle
  const r = 3 + (p.id % 4);
  return (
    <circle
      cx="0"
      cy="0"
      r={r}
      fill="none"
      stroke="#7B35FF"
      strokeWidth="1"
      opacity={p.opacity}
    />
  );
}

function renderLogo(p: Particle) {
  const isNib = p.id % 2 === 0;
  if (isNib) {
    // Pen nib shape
    return (
      <path
        d="M0,-6 L3,0 L0,2 L-3,0 Z"
        fill="none"
        stroke="#7B35FF"
        strokeWidth="1"
        opacity={p.opacity}
      />
    );
  }
  // Bezier handle dot
  return <circle cx="0" cy="0" r={2} fill="#7B35FF" opacity={p.opacity} />;
}

function renderDigitalMarketing(p: Particle) {
  const token = MARKETING_TOKENS[p.id % MARKETING_TOKENS.length];
  return (
    <text
      x="0"
      y="0"
      fill="#7B35FF"
      fontFamily="ui-monospace, monospace"
      fontSize={p.size}
      opacity={p.opacity}
    >
      {token}
    </text>
  );
}

function renderSocial(p: Particle) {
  const isHeart = p.id % 2 === 0;
  if (isHeart) {
    // Micro heart outline
    return (
      <path
        d="M0,2 C0,2 -4,-1 -4,-3 C-4,-5 -2,-5 0,-3 C2,-5 4,-5 4,-3 C4,-1 0,2 0,2Z"
        fill="none"
        stroke="#7B35FF"
        strokeWidth="0.8"
        opacity={p.opacity}
      />
    );
  }
  // Speech bubble outline
  return (
    <path
      d="M-4,-3 L4,-3 L4,2 L1,2 L0,4 L-1,2 L-4,2 Z"
      fill="none"
      stroke="#7B35FF"
      strokeWidth="0.8"
      opacity={p.opacity}
    />
  );
}

function renderCampaigns(p: Particle) {
  // Network fragments: paired circles + connecting line
  const angle = ((p.id * 60) % 360) * (Math.PI / 180);
  const dist = 8;
  const x2 = Math.cos(angle) * dist;
  const y2 = Math.sin(angle) * dist;
  return (
    <g opacity={p.opacity}>
      <circle cx="0" cy="0" r={3} fill="none" stroke="#7B35FF" strokeWidth="1" />
      <line x1="0" y1="0" x2={x2} y2={y2} stroke="#7B35FF" strokeWidth="1" />
      <circle cx={x2} cy={y2} r={2} fill="none" stroke="#7B35FF" strokeWidth="1" />
    </g>
  );
}

const RENDERERS: Record<ServiceId, (p: Particle) => React.ReactNode> = {
  "web-development": renderWebDev,
  seo: renderSEO,
  "ai-automation": renderAI,
  "brand-strategy": renderBrand,
  "logo-design": renderLogo,
  "digital-marketing": renderDigitalMarketing,
  "social-media-marketing": renderSocial,
  "marketing-campaigns": renderCampaigns,
};

/* ─── Main Component ────────────────────────────────── */
interface ServiceParticlesProps {
  service: string;
}

export default function ServiceParticles({ service }: ServiceParticlesProps) {
  const reduced = useReducedMotion();

  // Mobile detection: mount-only, no resize listener
  const [count, setCount] = useState(14);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setCount(8);
    }
  }, []);

  const serviceId = service as ServiceId;
  const particles = useMemo(
    () => generateParticles(serviceId, count),
    [serviceId, count]
  );
  const render = RENDERERS[serviceId];
  if (!render) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {particles.map((p) => {
        if (reduced) {
          // Static final state — no animation
          return (
            <g
              key={p.id}
              transform={`translate(${(p.x / 100) * 100}%, ${(p.y / 100) * 100}%)`}
              style={{
                transform: `translate(${p.x}%, ${p.y}%)`,
              }}
            >
              {render(p)}
            </g>
          );
        }

        return (
          <motion.g
            key={p.id}
            style={{
              willChange: "transform",
            }}
            initial={{
              x: `${p.x}%`,
              y: `${p.y}%`,
            }}
            animate={{
              x: [
                `${p.x}%`,
                `${p.x + (p.driftX * 0.5)}%`,
                `${p.x - (p.driftX * 0.3)}%`,
                `${p.x}%`,
              ],
              y: [
                `${p.y}%`,
                `${p.y - (p.driftY * 0.5)}%`,
                `${p.y + (p.driftY * 0.3)}%`,
                `${p.y}%`,
              ],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            {render(p)}
          </motion.g>
        );
      })}
    </svg>
  );
}
