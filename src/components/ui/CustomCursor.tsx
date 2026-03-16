"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const crosshairPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hoveringRef = useRef(false);
  const [hidden, setHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pathname = usePathname();

  // Touch device detection
  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouchDevice(true);
    }
  }, []);

  // Reduced motion detection
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  // Main cursor animation loop
  useEffect(() => {
    if (isTouchDevice) return;

    setHidden(false);

    const RING_DEFAULT = 32;
    const RING_HOVER = 52;

    const animate = () => {
      // Ring follows with easing
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

      // Crosshair follows with same easing as ring
      crosshairPos.current.x +=
        (mouse.current.x - crosshairPos.current.x) * 0.12;
      crosshairPos.current.y +=
        (mouse.current.y - crosshairPos.current.y) * 0.12;

      if (ringRef.current) {
        const size = hoveringRef.current ? RING_HOVER : RING_DEFAULT;
        const half = size / 2;
        ringRef.current.style.transform = `translate(${ring.current.x - half}px, ${ring.current.y - half}px)`;
      }

      if (crosshairRef.current) {
        // 20×20 bounding box, center at cursor
        crosshairRef.current.style.transform = `translate(${crosshairPos.current.x - 10}px, ${crosshairPos.current.y - 10}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // Dot follows cursor instantly (zero-size wrapper at cursor point)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
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
      if (crosshairRef.current) crosshairRef.current.style.opacity = "0";
    };
    const onOver = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (crosshairRef.current) crosshairRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
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
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onOver);
      document.documentElement.style.cursor = "";
      style.remove();
    };
  }, [isTouchDevice]);

  // Hover detection — attach to all interactive elements, re-run on route change
  useEffect(() => {
    if (isTouchDevice) return;

    const handleEnter = () => {
      hoveringRef.current = true;
      setIsHovering(true);
      if (ringRef.current) ringRef.current.dataset.hover = "true";
    };
    const handleLeave = () => {
      hoveringRef.current = false;
      setIsHovering(false);
      if (ringRef.current) ringRef.current.dataset.hover = "false";
    };

    const elements = document.querySelectorAll(
      'a, button, [role="button"]'
    );
    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [pathname, isTouchDevice]);

  // Hide entirely on touch devices
  if (isTouchDevice) return null;

  // Determine what the dot should show
  const showCircle = !isHovering || reducedMotion;

  // Crosshair line color
  const lineColor =
    isHovering && !reducedMotion
      ? "rgba(255,255,255,1)"
      : "rgba(255,255,255,0.85)";

  return (
    <>
      {/* Dot wrapper — zero-size div at cursor point, children self-center */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        <AnimatePresence mode="wait">
          {showCircle ? (
            <motion.div
              key="circle"
              className="cursor-dot"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute",
                top: -4,
                left: -4,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "white",
                mixBlendMode: "difference",
              }}
            />
          ) : (
            <motion.svg
              key="x-mark"
              width={10}
              height={10}
              viewBox="0 0 10 10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute",
                top: -5,
                left: -5,
                mixBlendMode: "difference",
              }}
            >
              <line
                x1="1"
                y1="1"
                x2="9"
                y2="9"
                stroke="white"
                strokeWidth={1.5}
              />
              <line
                x1="9"
                y1="1"
                x2="1"
                y2="9"
                stroke="white"
                strokeWidth={1.5}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

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
          border: "1.5px solid rgba(255,255,255,0.7)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          opacity: hidden ? 0 : 1,
          willChange: "transform",
        }}
      />

      {/* Crosshair — 20×20 bounding box, 4 lines with 4px gap from center */}
      <div
        ref={crosshairRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      >
        {/* Inner wrapper handles rotation */}
        <div
          style={{
            width: 20,
            height: 20,
            position: "relative",
            rotate: reducedMotion ? "45deg" : isHovering ? "0deg" : "45deg",
            transition: reducedMotion
              ? "none"
              : "rotate 0.2s ease-in-out, opacity 0.2s ease",
          }}
        >
          {/* Top line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: 1,
              height: 6,
              marginLeft: -0.5,
              background: lineColor,
              transition: "background 0.2s ease",
            }}
          />
          {/* Bottom line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: 1,
              height: 6,
              marginLeft: -0.5,
              background: lineColor,
              transition: "background 0.2s ease",
            }}
          />
          {/* Left line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: 6,
              height: 1,
              marginTop: -0.5,
              background: lineColor,
              transition: "background 0.2s ease",
            }}
          />
          {/* Right line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              width: 6,
              height: 1,
              marginTop: -0.5,
              background: lineColor,
              transition: "background 0.2s ease",
            }}
          />
        </div>
      </div>
    </>
  );
}
