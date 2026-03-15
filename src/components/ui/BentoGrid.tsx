"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface BentoCardData {
  title: string;
  description: string;
  /** Grid span: "1x1" | "1x2" | "2x1" */
  span: "1x1" | "1x2" | "2x1";
  gradient: string;
}

const BENTO_CARDS: BentoCardData[] = [
  {
    title: "Custom Web Development",
    description: "React, Next.js, and Shopify — built from scratch for performance and conversion.",
    span: "2x1",
    gradient: "from-accent/10 via-accent/5 to-transparent",
  },
  {
    title: "SEO Strategy",
    description: "Technical and content SEO built into every project from day one.",
    span: "1x1",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  },
  {
    title: "AI Automation",
    description: "Chatbots, workflow automation, and AI tools integrated into your stack.",
    span: "1x1",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  {
    title: "Brand Identity",
    description: "Logo, color systems, typography, and full brand guidelines that resonate.",
    span: "1x1",
    gradient: "from-purple-400/10 via-purple-400/5 to-transparent",
  },
  {
    title: "Digital Marketing",
    description: "PPC, email sequences, and content campaigns driving measurable ROI.",
    span: "1x2",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
  {
    title: "Full Campaigns",
    description: "Multi-channel strategy and execution unified under one roof.",
    span: "1x1",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
  },
];

/** Abstract SVG pattern for card decoration */
function CardPattern({ gradient }: { gradient: string }) {
  return (
    <svg
      className="absolute top-0 right-0 w-24 h-24 opacity-20"
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle cx="80" cy="20" r="30" stroke="rgba(123,53,255,0.3)" strokeWidth="1" />
      <circle cx="80" cy="20" r="15" stroke="rgba(123,53,255,0.2)" strokeWidth="1" />
      <line x1="50" y1="0" x2="100" y2="50" stroke="rgba(123,53,255,0.15)" strokeWidth="1" />
      <line x1="60" y1="0" x2="100" y2="40" stroke="rgba(123,53,255,0.1)" strokeWidth="1" />
    </svg>
  );
}

function getSpanClass(span: string): string {
  switch (span) {
    case "2x1":
      return "md:col-span-2 md:row-span-1";
    case "1x2":
      return "md:col-span-1 md:row-span-2";
    default:
      return "md:col-span-1 md:row-span-1";
  }
}

export default function BentoGrid({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 50, scale: 0.97 },
    visible: reduced
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: EASE_SMOOTH,
          },
        },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,1fr)] gap-4 ${className}`}
    >
      {BENTO_CARDS.map((card) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          whileHover={
            reduced
              ? undefined
              : {
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.25, ease: EASE_SMOOTH },
                }
          }
          className={`relative overflow-hidden rounded-2xl p-6 flex flex-col justify-end ${getSpanClass(card.span)}`}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            willChange: "transform, opacity",
          }}
        >
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`}
          />

          {/* Abstract SVG decoration */}
          <CardPattern gradient={card.gradient} />

          <div className="relative z-[1]">
            <h3 className="text-lg font-bold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-white/45 leading-relaxed">
              {card.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
