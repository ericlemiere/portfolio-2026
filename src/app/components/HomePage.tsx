"use client";

import { useState, useRef } from "react";
import { Orbs } from "./Orbs";
import { AnimatedName } from "./home/AnimatedName";
import { NavigationButtons, PageId } from "./home/NavigationButtons";
import { PageOverlays } from "./home/PageOverlays";
import { ParticleOrb } from "./home/ParticleOrb";

export function HomePage() {
  const [visiblePage, setVisiblePage] = useState<PageId | null>(null);
  const [orbAnimationComplete, setOrbAnimationComplete] = useState(false);
  const flipAnimationRef = useRef<
    ((onStateChange: () => void, reverseStagger?: boolean) => void) | null
  >(null);

  const atTop = visiblePage !== null;

  const navigate = (page: PageId) => {
    if (!atTop && flipAnimationRef.current) {
      flipAnimationRef.current(() => setVisiblePage(page));
    } else {
      setVisiblePage(page);
    }
  };

  const goHome = () => {
    if (flipAnimationRef.current) {
      flipAnimationRef.current(() => setVisiblePage(null), true);
    } else {
      setVisiblePage(null);
    }
  };

  return (
    <main className="flex flex-1 w-full h-full relative flex-col items-center justify-center bg-black">
      <h1 className="sr-only">Eric Lemiere&apos;s Portfolio</h1>

      <Orbs />

      <ParticleOrb
        isCompact={atTop}
        onAnimationComplete={() => setOrbAnimationComplete(true)}
      />

      <AnimatedName
        isCompact={atTop}
        onNavigateHome={goHome}
        flipAnimationRef={flipAnimationRef}
      />

      <PageOverlays visiblePage={visiblePage} />

      <NavigationButtons
        onNavigate={navigate}
        visiblePage={visiblePage}
        animationComplete={orbAnimationComplete}
      />
    </main>
  );
}
