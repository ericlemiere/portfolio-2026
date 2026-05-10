"use client";

import { useEffect, useRef } from "react";
import {
  detectBrowser,
  getPerformanceConfig,
} from "@/app/utils/browserDetection";

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  size: number;
}

interface ParticleOrbProps {
  isCompact: boolean;
  onAnimationComplete?: () => void;
}

export function ParticleOrb({
  isCompact,
  onAnimationComplete,
}: ParticleOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const initialDelayRef = useRef(0);
  const contractionRef = useRef(0);
  const returnAnimationRef = useRef(0);
  const isReturningRef = useRef(false);
  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(3.5);
  const targetYOffsetRef = useRef(0);
  const currentYOffsetRef = useRef(0);
  const hasCalledAnimationComplete = useRef(false);

  // Update targets when compact state changes
  useEffect(() => {
    const updateCompactPosition = () => {
      if (isCompact) {
        // Position center so top edge of orb is at top of screen
        // Calculate responsive radius based on viewport
        const radius = window.innerWidth < 768 ? window.innerWidth * 0.35 : 250;
        // Orb radius with compact scale is 0.4
        const effectiveRadius = radius * 0.4;
        const defaultCenter = window.innerHeight / 2; // Center is at 50% by default
        // We want: centerY = effectiveRadius (so top of orb is at y=0)
        // centerY = defaultCenter + offset
        // So: offset = effectiveRadius - defaultCenter
        targetYOffsetRef.current = effectiveRadius - defaultCenter;
      } else {
        targetYOffsetRef.current = 0;
      }
    };

    targetScaleRef.current = isCompact ? 0.4 : 1;
    isReturningRef.current = !isCompact;
    if (!isCompact) {
      returnAnimationRef.current = 0;
    }
    updateCompactPosition();

    // Update position on window resize when in compact mode
    const handleResize = () => {
      if (isCompact) {
        updateCompactPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCompact]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
    });
    if (!ctx) return;

    // Detect browser and get optimized performance config
    const browserInfo = detectBrowser();
    const perfConfig = getPerformanceConfig(browserInfo);

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Apply blur filter to entire canvas for glow effect on mobile (GPU-accelerated)
    const isMobile = window.innerWidth < 768;
    canvas.style.filter = perfConfig.useBlur ? "blur(2px)" : "none";

    // Pre-render gradient particles for desktop
    const gradientColors = [
      { r: 255, g: 118, b: 0 }, // orange
      { r: 0, g: 191, b: 255 }, // blue
      { r: 255, g: 58, b: 218 }, // pink
    ];

    const particleCache: HTMLCanvasElement[] = [];
    // Only create gradient cache if not using simple rendering
    if (!isMobile && !perfConfig.useSimpleRendering) {
      gradientColors.forEach((color) => {
        const offscreen = document.createElement("canvas");
        const size = 30;
        offscreen.width = size * 2;
        offscreen.height = size * 2;
        const offCtx = offscreen.getContext("2d");
        if (offCtx) {
          const gradient = offCtx.createRadialGradient(
            size,
            size,
            0,
            size,
            size,
            size,
          );
          gradient.addColorStop(
            0,
            `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`,
          );
          gradient.addColorStop(
            0.4,
            `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
          );
          gradient.addColorStop(
            1,
            `rgba(${color.r}, ${color.g}, ${color.b}, 0)`,
          );
          offCtx.fillStyle = gradient;
          offCtx.fillRect(0, 0, size * 2, size * 2);
        }
        particleCache.push(offscreen);
      });
    }

    // Solid colors for mobile (used with blur filter)
    const solidColors = [
      "rgba(255, 118, 0, 0.8)", // orange
      "rgba(0, 191, 255, 0.8)", // blue
      "rgba(255, 58, 218, 0.8)", // pink
    ];

    // Create particles in a sphere
    // Use browser-specific particle count for optimal performance
    const numParticles = perfConfig.particleCount;
    // Responsive radius: use vw on mobile, fixed px on desktop
    const radius = isMobile ? window.innerWidth * 0.35 : 250;
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); // Cube root for even distribution

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
      });
    }

    particlesRef.current = particles;

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left - canvas.width / 2,
        y: e.clientY - rect.top - canvas.height / 2,
        isMoving: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isMoving = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Contraction animation (starts large, contracts to center with acceleration)
      // Initial delay before contraction starts (approx 0.4 seconds at 60fps) - Chrome/Edge only
      const INITIAL_DELAY_FRAMES = (browserInfo.type === 'chrome' || browserInfo.type === 'edge') ? 24 : 0;
      
      // Custom easing for returning from compact (slow start, then faster)
      let lerpFactor = 0.05;
      if (isReturningRef.current && returnAnimationRef.current < 100) {
        returnAnimationRef.current++;
        const t = returnAnimationRef.current / 100;
        // Cubic bezier approximation: starts very slow (0.7, 0, 0.3, 1)
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        lerpFactor = 0.01 + eased * 0.09; // Range from 0.01 to 0.10
      }

      // Wait for initial delay before starting contraction (Chrome/Edge only)
      if (initialDelayRef.current < INITIAL_DELAY_FRAMES) {
        initialDelayRef.current++;
        // Keep orb at initial expanded size during delay
        currentScaleRef.current = 3.5;
      } else if (contractionRef.current < 120) {
        contractionRef.current++;
        const t = contractionRef.current / 120;
        const eased = t * t * t; // Ease-in cubic (accelerates as it gets closer)
        currentScaleRef.current = 3.5 - eased * (3.5 - targetScaleRef.current);

        // Call animation complete callback when reaching 120
        if (
          contractionRef.current === 120 &&
          !hasCalledAnimationComplete.current &&
          onAnimationComplete
        ) {
          hasCalledAnimationComplete.current = true;
          onAnimationComplete();
        }
      } else {
        // Smooth transition to target scale and position
        currentScaleRef.current +=
          (targetScaleRef.current - currentScaleRef.current) * lerpFactor;
      }

      currentYOffsetRef.current +=
        (targetYOffsetRef.current - currentYOffsetRef.current) * lerpFactor;

      // Rotate at browser-specific speed for consistent visual experience
      rotationRef.current += perfConfig.rotationSpeed;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + currentYOffsetRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle) => {
        // Apply rotation
        const rotatedX =
          particle.baseX * Math.cos(rotationRef.current) -
          particle.baseZ * Math.sin(rotationRef.current);
        const rotatedZ =
          particle.baseX * Math.sin(rotationRef.current) +
          particle.baseZ * Math.cos(rotationRef.current);

        // Mouse interaction - repel particles
        if (mouse.isMoving) {
          const dx = rotatedX - mouse.x;
          const dy = particle.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, radius - dist) / radius;

          particle.vx += (dx / dist) * force * 5;
          particle.vy += (dy / dist) * force * 5;
        }

        // Apply velocity
        particle.x += (rotatedX - particle.x + particle.vx) * 0.1;
        particle.y += (particle.baseY - particle.y + particle.vy) * 0.1;
        particle.z = rotatedZ;

        // Damping
        particle.vx *= 0.9;
        particle.vy *= 0.9;

        // Apply expansion/contraction scale
        const scaledX = particle.x * currentScaleRef.current;
        const scaledY = particle.y * currentScaleRef.current;
        const scaledZ = particle.z * currentScaleRef.current;

        // Project to 2D
        const scale = Math.max(0.1, 300 / (300 + scaledZ));
        const x2d = scaledX * scale + centerX;
        const y2d = scaledY * scale + centerY;

        // Size based on depth (ensure always positive)
        const size = Math.abs(particle.size * scale);

        // Opacity based on depth
        const opacity = Math.max(
          0.2,
          Math.min(1, (scaledZ + radius) / (radius * 2)),
        );

        // Select color based on y position
        const colorIndex = Math.floor(((particle.baseY / radius + 1) / 2) * 3);
        const clampedIndex = Math.max(0, Math.min(2, colorIndex));

        if (isMobile || perfConfig.useSimpleRendering) {
          // Simple rendering: Draw solid circle with radial gradient
          // This is more performant on Safari and mobile devices
          const gradient = ctx.createRadialGradient(
            x2d,
            y2d,
            0,
            x2d,
            y2d,
            size * 3,
          );
          const baseColor = gradientColors[clampedIndex];
          gradient.addColorStop(
            0,
            `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity * 0.8})`,
          );
          gradient.addColorStop(
            0.5,
            `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity * 0.4})`,
          );
          gradient.addColorStop(
            1,
            `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0)`,
          );
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Desktop: Draw pre-rendered gradient particle
          ctx.globalAlpha = opacity;
          const renderSize = size * 3;
          ctx.drawImage(
            particleCache[clampedIndex],
            x2d - renderSize,
            y2d - renderSize,
            renderSize * 2,
            renderSize * 2,
          );
          ctx.globalAlpha = 1;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-35 ${isCompact ? "pointer-events-none" : "pointer-events-auto"}`}
      style={{ touchAction: "none" }}
    />
  );
}
