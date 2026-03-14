"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

/* ─── Helpers ─────────────────────────────────────────── */

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/* ─── XGlassCard — Hero background X ─────────────────── */

export function XGlassCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none z-0 hidden md:block ${className}`}
      style={{ right: "-60px", top: "-40px" }}
    >
      {/* Blurred circle behind */}
      <div
        className="absolute animate-pulse-glow-new"
        style={{
          width: 280,
          height: 280,
          top: 20,
          left: 20,
          background:
            "radial-gradient(circle, rgba(123,53,255,0.12), transparent)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        fill="none"
        className="animate-rotate-slow"
      >
        <line
          x1="60"
          y1="60"
          x2="260"
          y2="260"
          stroke="rgba(123,53,255,0.15)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <line
          x1="260"
          y1="60"
          x2="60"
          y2="260"
          stroke="rgba(123,53,255,0.15)"
          strokeWidth="28"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ─── XOrbit — Services section accent ────────────────── */

export function XOrbit({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const dots = [0, 60, 120, 180, 240, 300]; // 6 dots, 60deg apart
  const durations = [8, 10, 13, 7, 11, 9];

  return (
    <div
      className={`relative pointer-events-none hidden md:block ${className}`}
      style={{ width: 120, height: 120 }}
    >
      {/* SVG X */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="absolute inset-0"
        style={{ filter: "drop-shadow(0 0 8px rgba(123,53,255,0.4))" }}
      >
        <motion.g
          animate={reduced ? {} : { rotate: -360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <line
            x1="30"
            y1="30"
            x2="90"
            y2="90"
            stroke="#7B35FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="90"
            y1="30"
            x2="30"
            y2="90"
            stroke="#7B35FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>

      {/* Orbiting dots */}
      {dots.map((offset, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#7B35FF",
            top: "50%",
            left: "50%",
            marginTop: -2,
            marginLeft: -2,
          }}
          animate={
            reduced
              ? {}
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: durations[i],
            repeat: Infinity,
            ease: "linear",
          }}
          initial={{ rotate: offset }}
        >
          <div
            style={{
              position: "absolute",
              top: -70,
              left: -2,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#7B35FF",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── XPulse — Process/CTA section accent ─────────────── */

export function XPulse({
  size = 80,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Sonar rings */}
      <motion.div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: size * 0.6,
          height: size * 0.6,
          marginTop: -(size * 0.3),
          marginLeft: -(size * 0.3),
          border: "2px solid rgba(123,53,255,0.3)",
          borderRadius: "50%",
        }}
        animate={
          reduced
            ? {}
            : {
                scale: [1, 2.5],
                opacity: [0.4, 0],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: size * 0.6,
          height: size * 0.6,
          marginTop: -(size * 0.3),
          marginLeft: -(size * 0.3),
          border: "2px solid rgba(123,53,255,0.3)",
          borderRadius: "50%",
        }}
        animate={
          reduced
            ? {}
            : {
                scale: [1, 2.5],
                opacity: [0.4, 0],
              }
        }
        transition={{
          duration: 2,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeOut",
        }}
      />

      {/* Breathing X */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        className="absolute inset-0"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <line
          x1="20"
          y1="20"
          x2="60"
          y2="60"
          stroke="#7B35FF"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="20"
          x2="20"
          y2="60"
          stroke="#7B35FF"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}

/* ─── XRotate3D — Three.js 3D chrome X ───────────────── */

export function XRotate3D({
  size = 200,
  opacity = 1,
  interactive = true,
  className = "",
}: {
  size?: number;
  opacity?: number;
  interactive?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<unknown>(null);
  const frameRef = useRef<number>(0);
  const isTouch = useIsTouchDevice();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;

    (async () => {
      const THREE = await import("three");
      if (!mounted || !containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 4;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Material
      const material = new THREE.MeshStandardMaterial({
        color: 0x7B35FF,
        metalness: 0.8,
        roughness: 0.2,
      });

      // Create X shape from two crossed bars
      const bar1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 2, 0.3),
        material
      );
      bar1.rotation.z = Math.PI / 4;

      const bar2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 2, 0.3),
        material
      );
      bar2.rotation.z = -Math.PI / 4;

      const group = new THREE.Group();
      group.add(bar1);
      group.add(bar2);
      scene.add(group);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);
      const pointLight2 = new THREE.PointLight(0xa855f7, 0.8);
      pointLight2.position.set(-5, -3, -3);
      scene.add(pointLight2);

      // Mouse tracking
      let mouseX = 0;
      let mouseY = 0;

      const onMouseMove = (e: globalThis.MouseEvent) => {
        if (!interactive || isTouch) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      if (interactive && !isTouch) {
        window.addEventListener("mousemove", onMouseMove);
      }

      // Animate
      const animate = () => {
        if (!mounted) return;
        frameRef.current = requestAnimationFrame(animate);

        if (!reduced) {
          group.rotation.x += 0.003;
          group.rotation.y += 0.005;
          group.rotation.z += 0.001;
        }

        if (interactive && !isTouch) {
          group.rotation.x += (mouseY * 0.5 - group.rotation.x) * 0.02;
          group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.02;
        }

        renderer.render(scene, camera);
      };
      animate();
    })();

    return () => {
      mounted = false;
      cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        (rendererRef.current as { dispose: () => void }).dispose();
      }
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector("canvas");
        if (canvas) containerRef.current.removeChild(canvas);
      }
    };
  }, [size, opacity, interactive, isTouch, reduced]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      {/* Fallback CSS X */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ display: "var(--fallback-display, block)" }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 80 80"
          fill="none"
        >
          <line
            x1="15"
            y1="15"
            x2="65"
            y2="65"
            stroke="#7B35FF"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="65"
            y1="15"
            x2="15"
            y2="65"
            stroke="#7B35FF"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── XScatter — Scattered decorative Xs ──────────────── */

/* Safe zones only — edges/corners, never center text zone */
const SCATTER_CONFIG = [
  { size: 20, opacity: 0.08, x: "8%", y: "12%", duration: 4, parallax: 0.05 },       // top-left
  { size: 28, opacity: 0.14, x: "78%", y: "15%", duration: 6, parallax: 0.08 },       // top-right (not overlapping XGlassCard)
  { size: 24, opacity: 0.1, x: "4%", y: "50%", duration: 5, parallax: 0.12 },         // far left edge mid
  { size: 32, opacity: 0.18, x: "88%", y: "75%", duration: 7, parallax: 0.06 },       // bottom-right corner
  { size: 20, opacity: 0.08, x: "10%", y: "85%", duration: 4.5, parallax: 0.15 },     // bottom-left corner
];

export function SmallStaticX({
  size = 24,
  opacity = 0.12,
  strokeWidth = 1.5,
  color = "#7B35FF",
  className = "",
}: {
  size?: number;
  opacity?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <line
        x1="4"
        y1="4"
        x2="20"
        y2="20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="20"
        y1="4"
        x2="4"
        y2="20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={opacity}
      />
    </svg>
  );
}

/* Internal alias for XScatter */
function SmallX({
  size,
  opacity,
}: {
  size: number;
  opacity: number;
}) {
  return <SmallStaticX size={size} opacity={opacity} />;
}

export function XScatter({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none z-0 hidden md:block ${className}`}
    >
      {SCATTER_CONFIG.map((cfg, i) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, cfg.parallax * 200]
        );

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: cfg.x,
              top: cfg.y,
              y: reduced ? 0 : y,
            }}
            animate={
              reduced
                ? {}
                : {
                    y: [0, -12, 0],
                  }
            }
            transition={{
              duration: cfg.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          >
            <SmallX size={cfg.size} opacity={cfg.opacity} />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── XStroke — Self-drawing SVG X ────────────────────── */

export function XStroke({
  size = 48,
  strokeWidth = 4,
  color = "#7B35FF",
  className = "",
}: {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [glowDone, setGlowDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setGlowDone(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={`inline-block ${className}`}
      animate={
        glowDone
          ? {
              filter: [
                "drop-shadow(0 0 0px rgba(123,53,255,0))",
                "drop-shadow(0 0 8px rgba(123,53,255,0.6))",
                "drop-shadow(0 0 0px rgba(123,53,255,0))",
              ],
            }
          : {}
      }
      transition={{ duration: 1 }}
    >
      <line
        x1="10"
        y1="10"
        x2="38"
        y2="38"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        className={`x-stroke-draw ${isInView ? "drawn" : ""}`}
      />
      <line
        x1="38"
        y1="10"
        x2="10"
        y2="38"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        className={`x-stroke-draw-delayed ${isInView ? "drawn" : ""}`}
      />
    </motion.svg>
  );
}

/* ─── XBrand — Convenience Wrapper ────────────────────── */

interface XBrandProps {
  variant: "glass" | "orbit" | "pulse" | "rotate" | "scatter" | "stroke";
  size?: number;
  opacity?: number;
  strokeWidth?: number;
  color?: string;
  interactive?: boolean;
  className?: string;
}

export function XBrand({
  variant,
  size,
  opacity,
  strokeWidth,
  color,
  interactive,
  className = "",
}: XBrandProps) {
  switch (variant) {
    case "glass":
      return <XGlassCard className={className} />;
    case "orbit":
      return <XOrbit className={className} />;
    case "pulse":
      return <XPulse size={size} className={className} />;
    case "rotate":
      return (
        <XRotate3D
          size={size}
          opacity={opacity}
          interactive={interactive}
          className={className}
        />
      );
    case "scatter":
      return <XScatter className={className} />;
    case "stroke":
      return (
        <XStroke
          size={size}
          strokeWidth={strokeWidth}
          color={color}
          className={className}
        />
      );
  }
}

export default XBrand;
