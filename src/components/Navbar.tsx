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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-hero/80 backdrop-blur-xl border-b border-white/[0.08]"
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

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white transition-colors"
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
                  className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors py-2"
                  aria-expanded={activeDropdown === groupName}
                  aria-haspopup="true"
                >
                  {groupName}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      activeDropdown === groupName ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === groupName && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2"
                      onMouseEnter={() => openDropdown(groupName)}
                      onMouseLeave={closeDropdown}
                    >
                      <div className="w-64 rounded-lg bg-hero border border-white/10 p-2 shadow-xl">
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-md px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
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
              href="/contact"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="ml-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors min-h-[44px]"
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
            className="lg:hidden overflow-hidden bg-hero border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block text-base text-white/70 hover:text-white py-2 min-h-[44px]"
              >
                Home
              </Link>

              {groups.map(([groupName, items]) => (
                <div key={groupName}>
                  <p className="text-xs font-medium text-accent uppercase tracking-widest mb-2">
                    {groupName}
                  </p>
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-base text-white/70 hover:text-white py-2 pl-3 min-h-[44px]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-base text-white/70 hover:text-white py-2 min-h-[44px]"
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
