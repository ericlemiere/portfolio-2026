"use client";

import { useEffect, useRef } from "react";

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
  colorIndex: number;
}

interface ParticleOrbProps {
  isCompact: boolean;
  onAnimationComplete?: () => void;
}

// Timings in seconds. Everything is driven by elapsed time rather than frame
// counts so the animation runs identically on 60Hz and 120Hz displays.
const INTRO_DELAY = 0.4;
const CONTRACTION_DURATION = 2;
const RETURN_DURATION = 1.667;
const ROTATION_SPEED = 0.12; // radians/second
const START_SCALE = 3.5;
const COMPACT_SCALE = 0.4;

// Exponential decay rates, in units of "per second". Each is the time-based
// equivalent of the per-frame lerp factor it replaces: rate = -60 * ln(1 - f).
const SCALE_LERP_RATE = 3.08; // was 0.05 per frame
const RETURN_LERP_MIN_RATE = 0.6; // was 0.01 per frame
const RETURN_LERP_MAX_RATE = 6.32; // was 0.10 per frame
const PARTICLE_LERP_RATE = 6.32; // was 0.10 per frame
const DAMPING_RATE = 6.32; // was a 0.9 multiplier per frame

const PARTICLE_COLORS = [
  { r: 255, g: 118, b: 0 }, // orange
  { r: 0, g: 191, b: 255 }, // blue
  { r: 255, g: 58, b: 218 }, // pink
];

const SPRITE_SIZE = 64;

function getOrbRadius() {
  return window.innerWidth < 768 ? window.innerWidth * 0.35 : 250;
}

/**
 * Builds one pre-rendered radial-gradient sprite per colour. Building these once
 * is the main Safari fix: the old code called createRadialGradient once per
 * particle per frame, allocating tens of thousands of gradient objects a second.
 */
function createParticleSprites(): HTMLCanvasElement[] {
  const radius = SPRITE_SIZE / 2;

  return PARTICLE_COLORS.map((color) => {
    const sprite = document.createElement("canvas");
    sprite.width = SPRITE_SIZE;
    sprite.height = SPRITE_SIZE;

    const ctx = sprite.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        radius,
        radius,
        0,
        radius,
        radius,
        radius,
      );
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`);
      gradient.addColorStop(
        0.4,
        `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
      );
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    }

    return sprite;
  });
}

export function ParticleOrb({
  isCompact,
  onAnimationComplete,
}: ParticleOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, isActive: false });
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const introDelayRef = useRef(0);
  const contractionRef = useRef(0);
  const returnElapsedRef = useRef(0);
  const isReturningRef = useRef(false);
  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(START_SCALE);
  const targetYOffsetRef = useRef(0);
  const currentYOffsetRef = useRef(0);
  const hasCalledAnimationComplete = useRef(false);

  // Kept in a ref so an unstable callback prop can never tear down the
  // animation loop and re-seed every particle.
  const onCompleteRef = useRef(onAnimationComplete);
  useEffect(() => {
    onCompleteRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  // Update targets when compact state changes
  useEffect(() => {
    const updateCompactPosition = () => {
      if (isCompact) {
        // Position center so top edge of orb is at top of screen
        const effectiveRadius = getOrbRadius() * COMPACT_SCALE;
        const defaultCenter = window.innerHeight / 2;
        targetYOffsetRef.current = effectiveRadius - defaultCenter;
      } else {
        targetYOffsetRef.current = 0;
      }
    };

    targetScaleRef.current = isCompact ? COMPACT_SCALE : 1;
    isReturningRef.current = !isCompact;
    if (!isCompact) {
      returnElapsedRef.current = 0;
    }
    updateCompactPosition();

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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Backing store stays at CSS-pixel resolution rather than devicePixelRatio.
    // The orb is a diffuse glow, so the upscale is imperceptible and it saves
    // 4-9x the fill rate on retina and mobile displays.
    //
    // The equality check matters on iOS: showing and hiding the URL bar fires
    // resize repeatedly, and reassigning canvas.width reallocates the backing
    // store and clears the frame, which shows up as a visible hitch.
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const sprites = createParticleSprites();

    const radius = getOrbRadius();
    const numParticles = window.innerWidth < 768 ? 400 : 1000;
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); // Cube root for even distribution

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      // baseY never changes, so the colour band each particle belongs to is
      // fixed. Resolving it once removes three ops per particle per frame.
      const colorIndex = Math.max(
        0,
        Math.min(2, Math.floor(((y / radius + 1) / 2) * 3)),
      );

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
        colorIndex,
      });
    }

    // Pointer events rather than mouse events, so a finger dragging across the
    // orb pushes particles around the same way a cursor does. Touch only emits
    // pointermove while the finger is down, so this costs nothing at rest.
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left - canvas.width / 2,
        y: e.clientY - rect.top - canvas.height / 2,
        isActive: true,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.isActive = false;
    };

    // Lifting a finger ends the interaction, but a mouse click must not: a mouse
    // still hovers after pointerup, and pointerleave already covers it.
    const handlePointerEnd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        pointerRef.current.isActive = false;
      }
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointerup", handlePointerEnd);
    canvas.addEventListener("pointercancel", handlePointerEnd);

    let lastTime = performance.now();

    const animate = (now: number) => {
      // Clamped so returning from a background tab doesn't produce one enormous
      // integration step that flings every particle off screen.
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Custom easing for returning from compact (slow start, then faster)
      let scaleLerpRate = SCALE_LERP_RATE;
      if (isReturningRef.current && returnElapsedRef.current < RETURN_DURATION) {
        returnElapsedRef.current = Math.min(
          RETURN_DURATION,
          returnElapsedRef.current + dt,
        );
        const t = returnElapsedRef.current / RETURN_DURATION;
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        scaleLerpRate =
          RETURN_LERP_MIN_RATE +
          eased * (RETURN_LERP_MAX_RATE - RETURN_LERP_MIN_RATE);
      }
      const scaleLerp = 1 - Math.exp(-scaleLerpRate * dt);

      if (introDelayRef.current < INTRO_DELAY) {
        introDelayRef.current += dt;
        currentScaleRef.current = START_SCALE;
      } else if (contractionRef.current < CONTRACTION_DURATION) {
        contractionRef.current = Math.min(
          CONTRACTION_DURATION,
          contractionRef.current + dt,
        );
        const t = contractionRef.current / CONTRACTION_DURATION;
        const eased = t * t * t; // Ease-in cubic (accelerates as it gets closer)
        currentScaleRef.current =
          START_SCALE - eased * (START_SCALE - targetScaleRef.current);

        if (
          contractionRef.current >= CONTRACTION_DURATION &&
          !hasCalledAnimationComplete.current
        ) {
          hasCalledAnimationComplete.current = true;
          onCompleteRef.current?.();
        }
      } else {
        currentScaleRef.current +=
          (targetScaleRef.current - currentScaleRef.current) * scaleLerp;
      }

      currentYOffsetRef.current +=
        (targetYOffsetRef.current - currentYOffsetRef.current) * scaleLerp;

      rotationRef.current += ROTATION_SPEED * dt;

      // Rotation is uniform across particles, so the trig comes out of the loop:
      // two calls per frame instead of two per particle per frame.
      const cosR = Math.cos(rotationRef.current);
      const sinR = Math.sin(rotationRef.current);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + currentYOffsetRef.current;
      const pointer = pointerRef.current;
      const radiusSq = radius * radius;

      const particleLerp = 1 - Math.exp(-PARTICLE_LERP_RATE * dt);
      const damping = Math.exp(-DAMPING_RATE * dt);
      const forceScale = dt * 60;
      const currentScale = currentScaleRef.current;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        const rotatedX = particle.baseX * cosR - particle.baseZ * sinR;
        const rotatedZ = particle.baseX * sinR + particle.baseZ * cosR;

        // Mouse interaction - repel particles
        if (pointer.isActive) {
          const dx = rotatedX - pointer.x;
          const dy = particle.baseY - pointer.y;
          const distSq = dx * dx + dy * dy;

          // Outside the influence radius the force is zero, so the square root
          // is only worth paying for inside it. distSq of 0 is skipped because
          // it would divide by zero and poison the particle with NaN forever.
          if (distSq > 0 && distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = (radius - dist) / radius;
            particle.vx += (dx / dist) * force * 5 * forceScale;
            particle.vy += (dy / dist) * force * 5 * forceScale;
          }
        }

        particle.x += (rotatedX - particle.x + particle.vx) * particleLerp;
        particle.y += (particle.baseY - particle.y + particle.vy) * particleLerp;
        particle.z = rotatedZ;

        particle.vx *= damping;
        particle.vy *= damping;

        const scaledX = particle.x * currentScale;
        const scaledY = particle.y * currentScale;
        const scaledZ = particle.z * currentScale;

        // Upper clamp caps how large a single near-camera particle can get.
        // Without it the intro's 3.5x scale can push one sprite to cover a large
        // part of the screen, producing a fill-rate spike on the exact frames
        // that are already the most expensive.
        const scale = Math.min(4, Math.max(0.1, 300 / (300 + scaledZ)));
        const x2d = scaledX * scale + centerX;
        const y2d = scaledY * scale + centerY;

        const drawSize = particle.size * scale * 6;

        // Cheap reject for anything outside the viewport.
        const half = drawSize / 2;
        if (
          x2d + half < 0 ||
          x2d - half > canvas.width ||
          y2d + half < 0 ||
          y2d - half > canvas.height
        ) {
          continue;
        }

        // Continuous opacity. Quantising this into pre-baked sprite levels
        // batches better in theory, but each particle then visibly pops as it
        // rotates through depth and hundreds of them together read as shimmer.
        ctx.globalAlpha = Math.max(
          0.2,
          Math.min(1, (scaledZ + radius) / (radius * 2)),
        );
        ctx.drawImage(
          sprites[particle.colorIndex],
          x2d - half,
          y2d - half,
          drawSize,
          drawSize,
        );
      }

      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointerup", handlePointerEnd);
      canvas.removeEventListener("pointercancel", handlePointerEnd);
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
