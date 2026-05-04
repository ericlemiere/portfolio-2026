"use client";

import { useEffect, useRef } from "react";

const LINE1 = ["E", "R", "I", "C"] as const;
const LINE2 = ["L", "E", "M", "I", "E", "R", "E"] as const;
const TOTAL_LETTERS = LINE1.length + LINE2.length;

interface AnimatedNameProps {
  isCompact: boolean;
  onNavigateHome?: () => void;
  flipAnimationRef?: React.MutableRefObject<
    ((onStateChange: () => void, reverseStagger?: boolean) => void) | null
  >;
}

export function AnimatedName({
  isCompact,
  onNavigateHome,
  flipAnimationRef,
}: AnimatedNameProps) {
  const smallLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Entrance animation on mount - staggered fade in
  useEffect(() => {
    smallLetterRefs.current.slice(0, TOTAL_LETTERS).forEach((el, i) => {
      if (!el) return;
      el.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 400, delay: i * 40, fill: "both", easing: "ease" },
      );
    });

    // Clear inline styles after animation completes
    const totalDuration = 400 + (TOTAL_LETTERS - 1) * 40;
    setTimeout(() => {
      smallLetterRefs.current.slice(0, TOTAL_LETTERS).forEach((el) => {
        if (el) {
          el.style.opacity = "";
          el.style.transform = "";
        }
      });
    }, totalDuration);
  }, []);

  const renderLetters = (letters: readonly string[], offset: number) =>
    letters.map((letter, i) => (
      <span
        key={`${letter}-${offset + i}`}
        ref={(el) => {
          smallLetterRefs.current[offset + i] = el;
        }}
        style={{
          display: "inline-block",
          opacity: 0,
          textShadow: `
            0 0 20px rgba(0, 191, 255, 0.5),
            0 0 20px rgba(0, 191, 255, 0.3),
            0 0 30px rgba(0, 191, 255, 0.1),
            1px 1px 2px rgba(0, 0, 0, 0.8),
            2px 2px 4px rgba(0, 0, 0, 0.6),
            3px 3px 6px rgba(0, 0, 0, 0.4),
            4px 4px 8px rgba(0, 0, 0, 0.2)
          `,
          transform: "translateZ(0)",
          WebkitFontSmoothing: "antialiased",
          fontWeight: i === 0 ? "bold" : "normal",
          textTransform: i !== 0 ? "lowercase" : "uppercase",
          cursor: 'pointer',
        }}
      >
        {letter}
      </span>
    ));

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 text-5xl lg:text-[5vw] font-bold leading-none select-none flex flex-row items-center cursor-pointer"
      onClick={onNavigateHome}
      role="button"
      aria-label="Return home"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigateHome?.()}
    >
      <div className="flex cursor-pointer">{renderLetters(LINE1, 0)}</div>
      <h1 className="flex ml-4 cursor-pointer">{renderLetters(LINE2, LINE1.length)}</h1>
    </header>
  );
}
