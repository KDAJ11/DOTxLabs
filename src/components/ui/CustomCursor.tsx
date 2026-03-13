"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
    if (hidden) setHidden(false);
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    }
  }, [hidden]);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setHidden(false);

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Hover detection
    const onEnter = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.matches('a, button, [data-cursor="pointer"], a *, button *, [data-cursor="pointer"] *')) {
        setHovering(true);
      }
    };
    const onLeave = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.matches('a, button, [data-cursor="pointer"], a *, button *, [data-cursor="pointer"] *')) {
        setHovering(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onOut = () => setHidden(true);
    const onOver = () => setHidden(false);

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
  }, [onMove]);

  // Don't render on touch / reduced-motion (checked in effect, but also SSR-safe)
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
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
          opacity: hidden ? 0 : hovering ? 0 : 1,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          borderRadius: "50%",
          border: hovering
            ? "1.5px solid rgba(124,58,237,0.6)"
            : "1.5px solid rgba(255,255,255,0.5)",
          background: hovering ? "rgba(124,58,237,0.12)" : "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          scale: clicking ? "0.75" : "1",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease, scale 0.12s ease",
          willChange: "transform",
          marginLeft: hovering ? -10 : 0,
          marginTop: hovering ? -10 : 0,
        }}
      />
    </>
  );
}
