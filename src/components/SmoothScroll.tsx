"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Skip on mobile / touch devices — native scroll is better and saves battery
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.innerWidth < 768) return;

    let mounted = true;

    (async () => {
      const { default: Lenis } = await import("@studio-freight/lenis");
      if (!mounted) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Expose instance so other components can call lenis.scrollTo()
      (window as unknown as Record<string, unknown>).__lenis = lenis;

      function raf(time: number) {
        if (!mounted) return;
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Store cleanup
      (window as unknown as Record<string, unknown>).__lenis_cleanup = () => {
        mounted = false;
        lenis.destroy();
        delete (window as unknown as Record<string, unknown>).__lenis;
      };
    })();

    return () => {
      mounted = false;
      const cleanup = (window as unknown as Record<string, unknown>).__lenis_cleanup as (() => void) | undefined;
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}
