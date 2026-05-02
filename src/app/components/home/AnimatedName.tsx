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
        style={{ display: "inline-block", opacity: 0 }}
      >
        {letter}
      </span>
    ));

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 text-[2.8vw] font-bold leading-none select-none flex flex-row items-center cursor-pointer"
      onClick={onNavigateHome}
      role="button"
      aria-label="Return home"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigateHome?.()}
    >
      <div className="flex ">{renderLetters(LINE1, 0)}</div>
      <h1 className="flex ml-4">
        {renderLetters(LINE2, LINE1.length)}
      </h1>
    </div>
  );
}
