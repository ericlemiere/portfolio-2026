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
    const timer2 = setTimeout(() => setShowContact(true), 400);
    const timer3 = setTimeout(() => setShowProjects(true), 700);

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
        className={`hidden lg:flex fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-30 text-2xl text-white tracking-widest items-center justify-center transition-all duration-500 cursor-pointer hover:text-blue ${
          showProjects ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`h-60 w-16 transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "projects" ? "scale-x-0 opacity-15" : "scale-x-100"
          }`}
        >
          <LeftArrow />
        </span>
        <span
          className={`transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "projects" ? "-ml-10 opacity-15" : "-ml-4"
          }`}
        >
          PROJECTS
        </span>
      </button>

      <button
        onClick={() => onNavigate("about")}
        aria-label="About"
        className={`hidden lg:flex fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-30 text-2xl text-white tracking-widest items-center justify-center transition-all duration-500 cursor-pointer hover:text-pink ${
          showAbout ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "about" ? "-mr-10 opacity-15" : "-mr-4"
          }`}
        >
          ABOUT
        </span>
        <span
          className={`h-60 w-16 transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "about" ? "scale-x-0 opacity-15" : "scale-x-100"
          }`}
        >
          <RightArrow />
        </span>
      </button>

      <button
        onClick={() => onNavigate("contact")}
        aria-label="Contact"
        className={`hidden lg:flex flex-col fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-2xl text-white tracking-widest items-center justify-center transition-all duration-500 cursor-pointer hover:text-orange ${
          showContact ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "contact" ? "-mb-10 opacity-15" : "-mb-2"
          }`}
        >
          CONTACT
        </span>
        <span
          className={`w-60 h-16 transition-all duration-800 ease-out cursor-pointer ${
            visiblePage === "contact" ? "scale-y-0 opacity-15" : "scale-y-100"
          }`}
        >
          <DownArrow />
        </span>
      </button>

      {/* Mobile nav */}
      <div className="flex fixed bottom-0 left-0 w-full h-8 z-30 lg:hidden cursor-pointer">
        {/* Gray overlay for mobile */}
        <div
          className={`absolute z-50 pointer-events-none h-8 bg-black transition-all duration-300 ease-out ${
            !visiblePage ? "opacity-0" : "opacity-50"
          } ${
            visiblePage === "projects"
              ? "left-0 w-1/3 border border-pink"
              : visiblePage === "contact"
                ? "left-1/3 w-1/3 border border-orange"
                : visiblePage === "about"
                  ? "left-2/3 w-1/3 border border-blue"
                  : "left-1/3"
          }`}
        />

        <button
          onClick={() => onNavigate("projects")}
          className="w-1/3 h-8 text-white font-bold bg-blue transition-all duration-200 cursor-pointer z-10"
        >
          <span className="cursor-pointer">Projects</span>
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="w-1/3 h-8 text-white font-bold bg-orange transition-all duration-200 cursor-pointer z-10"
        >
          Contact
        </button>
        <button
          onClick={() => onNavigate("about")}
          className="w-1/3 h-8 text-white font-bold bg-pink transition-all duration-200 cursor-pointer z-10"
        >
          About
        </button>
      </div>
    </>
  );
}
