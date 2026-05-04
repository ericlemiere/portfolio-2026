"use client";

import { useEffect, useRef } from "react";

export function Orbs() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let revealed = false;
    const move = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      if (!revealed) {
        el.style.opacity = "0.09";
        revealed = true;
      }
      el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Blue orb — starts upper-center, keyframe range keeps it on screen */}
      <div
        className="absolute rounded-full opacity-[0.45] md:opacity-[0.18]"
        style={{
          width: "clamp(120px, 24vw, 400px)",
          height: "clamp(120px, 24vw, 400px)",
          background: "var(--color-blue)",
          filter: "blur(clamp(50px, 10vw, 85px))",
          top: "20%",
          left: "30%",
          animation: "orbFloat1 45s ease-in-out infinite",
        }}
      />
      {/* Pink orb — starts mid-left */}
      <div
        className="absolute rounded-full opacity-[0.55] md:opacity-[0.18]"
        style={{
          width: "clamp(150px, 30vw, 500px)",
          height: "clamp(150px, 30vw, 500px)",
          background: "var(--color-pink)",
          filter: "blur(clamp(60px, 12vw, 95px))",
          top: "45%",
          left: "20%",
          animation: "orbFloat2 55s ease-in-out infinite",
        }}
      />
      {/* Orange orb — starts lower-right */}
      <div
        className="absolute rounded-full opacity-[0.45] md:opacity-[0.18]"
        style={{
          width: "clamp(140px, 28vw, 450px)",
          height: "clamp(140px, 28vw, 450px)",
          background: "var(--color-orange)",
          filter: "blur(clamp(55px, 11vw, 80px))",
          top: "55%",
          left: "55%",
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
          transition: "transform 0.1s ease-out, opacity 0.4s ease",
        }}
      />
    </div>
  );
}
