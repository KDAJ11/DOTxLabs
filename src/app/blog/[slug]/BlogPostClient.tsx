"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import type { BlogPost } from "@/lib/blog-data";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CATEGORY_COLORS: Record<string, string> = {
  "Web Design": "bg-accent/20 text-gold border border-accent/20",
  SEO: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20",
  Marketing: "bg-blue-500/20 text-blue-300 border border-blue-500/20",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero min-h-[45vh] flex items-end overflow-hidden noise-overlay">
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="absolute inset-0 dot-grid-dark opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to blog
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  CATEGORY_COLORS[post.category] ?? "bg-gray-500/20 text-gray-300"
                }`}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Clock size={12} />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Calendar size={12} />
                {formatDate(post.date)}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-content to-transparent z-10" />
      </section>

      {/* Article Body */}
      <article className="relative bg-content py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid-light" />
        <div className="absolute inset-0 faint-grid" />

        <div className="relative z-[1] mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {post.sections.map((section, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="mb-10">
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-hero mb-4 mt-4">
                    {section.heading}
                  </h2>
                )}
                {section.content.split("\n\n").map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-base text-hero/65 leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          ))}

          {/* CTA at end of post */}
          <FadeIn>
            <div
              className="mt-16 rounded-2xl p-8 text-center"
              style={{
                background: "rgba(123, 53, 255, 0.06)",
                border: "1px solid rgba(123, 53, 255, 0.15)",
              }}
            >
              <p className="text-lg font-semibold text-hero">
                Need help with this?
              </p>
              <p className="mt-2 text-sm text-hero/50">
                We build websites and run SEO for GTA businesses. If anything in
                this article hit close to home, let's talk.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </FadeIn>

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t border-black/5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              <ArrowLeft size={14} />
              All articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
