"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hoveringRef = useRef(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setHidden(false);

    // Ring size constants
    const RING_DEFAULT = 32;
    const RING_HOVER = 52;

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        const size = hoveringRef.current ? RING_HOVER : RING_DEFAULT;
        const half = size / 2;
        ringRef.current.style.transform = `translate(${ring.current.x - half}px, ${ring.current.y - half}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    // Hover detection — use closest() for robust parent matching
    const isInteractive = (el: HTMLElement) =>
      !!el.closest('a, button, [data-cursor="pointer"]');

    const onEnter = (e: Event) => {
      const el = e.target as HTMLElement;
      if (isInteractive(el)) {
        hoveringRef.current = true;
        if (ringRef.current) ringRef.current.dataset.hover = "true";
        if (dotRef.current) dotRef.current.dataset.hover = "true";
      }
    };
    const onLeave = (e: Event) => {
      const el = e.target as HTMLElement;
      if (isInteractive(el)) {
        hoveringRef.current = false;
        if (ringRef.current) ringRef.current.dataset.hover = "false";
        if (dotRef.current) dotRef.current.dataset.hover = "false";
      }
    };

    const onDown = () => {
      if (ringRef.current) ringRef.current.dataset.click = "true";
    };
    const onUp = () => {
      if (ringRef.current) ringRef.current.dataset.click = "false";
    };
    const onOut = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onOver = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onOut);
    document.addEventListener("mouseenter", onOver);

    rafRef.current = requestAnimationFrame(animate);

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onOver);
      document.documentElement.style.cursor = "";
      style.remove();
    };
  }, []);

  // Don't render on touch / reduced-motion (checked in effect, but also SSR-safe)
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        data-hover="false"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "white",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        data-hover="false"
        data-click="false"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.5)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          willChange: "transform",
        }}
      />
    </>
  );
}
