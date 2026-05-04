"use client";

import { useEffect, useState } from "react";
import { LeftArrow, RightArrow, DownArrow } from "./Arrow";

export type PageId = "projects" | "about" | "contact";

interface NavigationButtonsProps {
  onNavigate: (page: PageId) => void;
  visiblePage: PageId | null;
  animationComplete: boolean;
}

export function NavigationButtons({
  onNavigate,
  visiblePage,
  animationComplete,
}: NavigationButtonsProps) {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (!animationComplete) return;

    // Stagger the fade-in: About, Contact, Projects
    const timer1 = setTimeout(() => setShowAbout(true), 100);
    const timer2 = setTimeout(() => setShowContact(true), 300);
    const timer3 = setTimeout(() => setShowProjects(true), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [animationComplete]);

  return (
    <>
      {/* Desktop nav */}
      <button
        onClick={() => onNavigate("projects")}
        aria-label="Projects"
        className={`hidden lg:flex fixed left-4 xl:left-6 top-1/2 -translate-y-1/2 z-40 xl:text-2xl text-white/70 tracking-widest items-center justify-center transition-all duration-500 cursor-pointer hover:text-blue ${
          showProjects ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`h-40 w-10 xl:h-60 xl:w-16 transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "projects" ? "scale-x-0 opacity-15" : "scale-x-100"
          }`}
        >
          <LeftArrow />
        </span>
        <span
          className={`transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "projects"
              ? "-ml-6 xl:-ml-10 opacity-15"
              : "-ml-2 xl:-ml-4"
          }`}
        >
          PROJECTS
        </span>
      </button>

      <button
        onClick={() => onNavigate("about")}
        aria-label="About"
        className={`hidden lg:flex fixed right-4 xl:right-6 top-1/2 -translate-y-1/2 z-40 xl:text-2xl text-white/70 tracking-widest items-center justify-center transition-all duration-500 cursor-pointer hover:text-pink ${
          showAbout ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "about"
              ? "-mr-6 xl:-mr-10 opacity-15"
              : "-mr-2 xl:-mr-4"
          }`}
        >
          ABOUT
        </span>
        <span
          className={`h-40 w-10 xl:h-60 xl:w-16 transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "about" ? "scale-x-0 opacity-15" : "scale-x-100"
          }`}
        >
          <RightArrow />
        </span>
      </button>

      <button
        onClick={() => onNavigate("contact")}
        aria-label="Contact"
        className={`hidden lg:flex flex-col fixed bottom-4 left-1/2 -translate-x-1/2 z-40 xl:text-2xl text-white/70 tracking-widest items-center justify-center transition-all duration-500 cursor-pointer hover:text-orange ${
          showContact ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "contact"
              ? "-mb-6 xl:-mb-8 opacity-15"
              : "-mb-2 xl:-mb-3"
          }`}
        >
          CONTACT
        </span>
        <span
          className={`w-40 h-10 xl:w-60 xl:h-16 transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "contact" ? "scale-y-0 opacity-15" : "scale-y-100"
          }`}
        >
          <DownArrow />
        </span>
      </button>

      {/* Mobile nav */}
      <div className="flex fixed bottom-0 left-0 w-full h-16 z-40 lg:hidden items-end">
        <button
          onClick={() => onNavigate("projects")}
          className={`w-1/3 text-white font-bold bg-blue transition-all duration-200 z-40 ${
            visiblePage === "projects" ? "h-12" : "h-8"
          } `}
        >
          Projects
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className={`w-1/3 text-white font-bold bg-orange transition-all duration-200 z-40 ${
            visiblePage === "contact" ? "h-12" : "h-8"
          } `}
        >
          Contact
        </button>
        <button
          onClick={() => onNavigate("about")}
          className={`w-1/3 text-white font-bold bg-pink transition-all duration-200 z-40 ${
            visiblePage === "about" ? "h-12" : "h-8"
          } `}
        >
          About
        </button>
      </div>
    </>
  );
}
