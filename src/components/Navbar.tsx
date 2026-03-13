"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_SERVICES } from "@/lib/data";

const groups = Object.entries(NAV_SERVICES) as [
  string,
  { name: string; href: string }[]
][];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  function openDropdown(key: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  }

  function closeDropdown() {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-hero/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-display font-bold text-white tracking-tight"
          >
            DOT<span className="text-accent">x</span>Labs
          </Link>

          {/* Desktop nav — Apple-style: lightweight, spaced, lowercase feel */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="relative px-4 py-2 text-[13px] font-normal text-white/60 hover:text-white transition-colors duration-300"
              style={{ letterSpacing: "0.02em" }}
            >
              Home
            </Link>

            {groups.map(([groupName, items]) => (
              <div
                key={groupName}
                className="relative"
                onMouseEnter={() => openDropdown(groupName)}
                onMouseLeave={closeDropdown}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-[13px] font-normal text-white/60 hover:text-white transition-colors duration-300"
                  style={{ letterSpacing: "0.02em" }}
                  aria-expanded={activeDropdown === groupName}
                  aria-haspopup="true"
                >
                  {groupName}
                  <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    className={`ml-0.5 transition-transform duration-300 ${
                      activeDropdown === groupName ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === groupName && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      onMouseEnter={() => openDropdown(groupName)}
                      onMouseLeave={closeDropdown}
                    >
                      <div
                        className="w-64 rounded-xl p-1.5 shadow-2xl shadow-black/30"
                        style={{
                          background: "rgba(20, 20, 22, 0.85)",
                          backdropFilter: "blur(24px) saturate(1.4)",
                          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-lg px-3.5 py-2.5 text-[13px] font-normal text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                            style={{ letterSpacing: "0.01em" }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              href="/blog"
              className="px-4 py-2 text-[13px] font-normal text-white/60 hover:text-white transition-colors duration-300"
              style={{ letterSpacing: "0.02em" }}
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 text-[13px] font-normal text-white/60 hover:text-white transition-colors duration-300"
              style={{ letterSpacing: "0.02em" }}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2 text-[13px] font-normal text-white/60 hover:text-white transition-colors duration-300"
              style={{ letterSpacing: "0.02em" }}
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="ml-4 inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 text-[13px] font-medium text-white hover:bg-accent-hover transition-all duration-300 min-h-[40px] hover:shadow-[0_0_20px_rgba(123,47,190,0.4)]"
            >
              Start Your Project
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(10, 10, 10, 0.98)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block text-base text-white/60 hover:text-white py-2 min-h-[44px] font-normal"
              >
                Home
              </Link>

              {groups.map(([groupName, items]) => (
                <div key={groupName}>
                  <p className="text-[11px] font-medium text-accent/80 uppercase mb-2"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {groupName}
                  </p>
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-base text-white/60 hover:text-white py-2 pl-3 min-h-[44px] font-normal"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}

              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="block text-base text-white/60 hover:text-white py-2 min-h-[44px] font-normal"
              >
                Blog
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block text-base text-white/60 hover:text-white py-2 min-h-[44px] font-normal"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-base text-white/60 hover:text-white py-2 min-h-[44px] font-normal"
              >
                Contact
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center rounded-full bg-accent px-5 py-3 text-base font-medium text-white hover:bg-accent-hover transition-colors min-h-[44px]"
              >
                Start Your Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
