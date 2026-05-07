"use client";

import { useEffect, useRef } from "react";

const LINE1 = ["E", "R", "I", "C"] as const;
const LINE2 = ["L", "E", "M", "I", "E", "R", "E"] as const;
const LINE3 = ["S", "O", "F", "T", "W", "A", "R", "E"] as const;
const LINE4 = ["D", "E", "V", "E", "L", "O", "P", "E", "R"] as const;
const TOTAL_LETTERS = LINE1.length + LINE2.length + LINE3.length + LINE4.length;

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
        { duration: 400, delay: i * 80, fill: "both", easing: "ease" },
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

  const renderLetters = (
    letters: readonly string[],
    offset: number,
    lineIndex: number,
  ) =>
    letters.map((letter, i) => (
      <span
        key={`${letter}-${offset + i}`}
        ref={(el) => {
          smallLetterRefs.current[offset + i] = el;
        }}
        className={`cursor-pointer ${lineIndex === 0 ? (i === 0 ? "text-6xl lg:text-7xl" : "text-4xl lg:text-4xl") : i === 0 ? "text-lg lg:text-xl" : "text-sm lg:text-base"}`}
        style={{
          display: "inline-block",
          opacity: 0,
          textShadow: `
            0 0 20px rgba(255, 255, 255, 0.2),
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.1)
          `,
          transform: "translateZ(0)",
          WebkitFontSmoothing: "antialiased",
          fontWeight: i === 0 ? "bold" : "normal",
          textTransform: "uppercase",
        }}
      >
        {letter}
      </span>
    ));

  return (
    <header className="fixed top-2 lg:left-2 z-40 w-screen">
      <div
        className=" text-white/70 w-fit m-auto font-bold lg:leading-18 tracking-tighter select-none flex flex-col items-center "
        onClick={onNavigateHome}
        role="button"
        aria-label="Return home"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onNavigateHome?.()}
      >
        <h1 className="flex cursor-pointer gap-3">
          <div className="flex cursor-pointer items-baseline">
            {renderLetters(LINE1, 0, 0)}
          </div>
          <div className="flex cursor-pointer items-baseline">
            {renderLetters(LINE2, LINE1.length, 0)}
          </div>
        </h1>
        <div className="flex gap-2">
          <p className="flex text-base lg:text-xl tracking-wider cursor-pointer items-center">
            {renderLetters(LINE3, LINE1.length + LINE2.length, 1)}
          </p>
          <p className="flex text-base lg:text-xl tracking-wider cursor-pointer items-center">
            {renderLetters(
              LINE4,
              LINE1.length + LINE2.length + LINE3.length,
              1,
            )}
          </p>
        </div>
      </div>
    </header>
  );
}
