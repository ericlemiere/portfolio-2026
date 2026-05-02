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
        style={{
          position: "absolute",
          width: "24vw",
          height: "24vw",
          borderRadius: "50%",
          background: "var(--color-blue)",
          filter: "blur(85px)",
          top: "20%",
          left: "30%",
          opacity: 0.18,
          animation: "orbFloat1 45s ease-in-out infinite",
        }}
      />
      {/* Pink orb — starts mid-left */}
      <div
        style={{
          position: "absolute",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "var(--color-pink)",
          filter: "blur(95px)",
          top: "45%",
          left: "20%",
          opacity: 0.18,
          animation: "orbFloat2 55s ease-in-out infinite",
        }}
      />
      {/* Orange orb — starts lower-right */}
      <div
        style={{
          position: "absolute",
          width: "28vw",
          height: "28vw",
          borderRadius: "50%",
          background: "var(--color-orange)",
          filter: "blur(80px)",
          top: "55%",
          left: "55%",
          opacity: 0.18,
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
          background: "var(--color-foreground)",
          filter: "blur(45px)",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease-out, opacity 0.4s ease",
        }}
      />
    </div>
  );
}
