"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { BLOG_POSTS } from "@/lib/blog-data";
import { XBrand, SmallStaticX } from "@/components/ui/XAsset";

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_WORDS = "Insights & Resources".split(" ");

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

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero min-h-[50vh] flex items-center overflow-hidden noise-overlay">
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        <div className="absolute inset-0 dot-grid-dark opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="absolute top-6 right-8 pointer-events-none z-0 hidden md:block" style={{ opacity: 0.2 }}>
          <XBrand variant="stroke" size={48} />
        </div>
        <div className="absolute bottom-8 left-8 pointer-events-none z-0 hidden md:block">
          <SmallStaticX size={20} opacity={0.12} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center w-full">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            {HERO_WORDS.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em] pb-[0.15em] -mb-[0.15em]">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.3 + i * 0.06,
                    ease: EASE_EXPO,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_EXPO }}
            className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto"
          >
            Practical writing on web design, SEO, and running a business online.
            Written by the people who build websites for a living.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-content to-transparent z-10" />
      </section>

      {/* Post Listing */}
      <section className="relative bg-content py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 dot-grid-light" />
        <div className="absolute inset-0 faint-grid" />

        <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {BLOG_POSTS.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <article>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl p-8 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5"
                    style={{
                      background: "rgba(255, 255, 255, 0.65)",
                      backdropFilter: "blur(20px) saturate(1.3)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.3)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      boxShadow:
                        "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.6)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`inline-block rounded-sm px-3 py-1 text-xs font-medium ${
                          CATEGORY_COLORS[post.category] ?? "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-hero/40">
                        <Clock size={12} />
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-hero group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-hero/50 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-hero/30">
                        {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read article{" "}
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
