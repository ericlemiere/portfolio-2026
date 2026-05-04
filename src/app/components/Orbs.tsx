"use client";

import { useEffect, useRef } from "react";

export function Orbs() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let revealed = false;

    const move = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!revealed) {
        const el = cursorRef.current;
        if (el) {
          el.style.opacity = "0.09";
          revealed = true;
          // Initialize current position to mouse position on first move
          currentPos.current = { x: e.clientX, y: e.clientY };
        }
      }
    };

    const animate = () => {
      const el = cursorRef.current;
      if (!el) return;

      // Smooth interpolation for cursor following
      currentPos.current.x +=
        (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y +=
        (mousePos.current.y - currentPos.current.y) * 0.15;

      el.style.transform = `translate(calc(${currentPos.current.x}px - 50%), calc(${currentPos.current.y}px - 50%))`;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Blue orb — starts upper-left edge */}
      <div
        className="absolute rounded-full opacity-[0.45] md:opacity-[0.18]"
        style={{
          width: "clamp(120px, 24vw, 400px)",
          height: "clamp(120px, 24vw, 400px)",
          background: "var(--color-blue)",
          filter: "blur(clamp(50px, 10vw, 85px))",
          top: "15%",
          left: "5%",
          animation: "orbFloat1 45s ease-in-out infinite",
        }}
      />
      {/* Pink orb — starts lower-left edge */}
      <div
        className="absolute rounded-full opacity-[0.55] md:opacity-[0.18]"
        style={{
          width: "clamp(150px, 30vw, 500px)",
          height: "clamp(150px, 30vw, 500px)",
          background: "var(--color-pink)",
          filter: "blur(clamp(60px, 12vw, 95px))",
          top: "70%",
          left: "5%",
          animation: "orbFloat2 55s ease-in-out infinite",
        }}
      />
      {/* Orange orb — starts upper-right edge */}
      <div
        className="absolute rounded-full opacity-[0.45] md:opacity-[0.18]"
        style={{
          width: "clamp(140px, 28vw, 450px)",
          height: "clamp(140px, 28vw, 450px)",
          background: "var(--color-orange)",
          filter: "blur(clamp(55px, 11vw, 80px))",
          top: "30%",
          left: "85%",
          animation: "orbFloat3 62s ease-in-out infinite",
        }}
      />
      {/* Cursor-following orb */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "white",
          filter: "blur(45px)",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.4s ease",
          willChange: "transform",
        }}
      />
    </div>
  );
}
