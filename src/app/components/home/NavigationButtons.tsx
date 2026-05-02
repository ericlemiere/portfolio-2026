"use client";

import { LeftArrow, RightArrow, DownArrow } from "./Arrow";

export type PageId = "projects" | "about" | "contact";

interface NavigationButtonsProps {
  onNavigate: (page: PageId) => void;
  visiblePage: PageId | null;
}

export function NavigationButtons({
  onNavigate,
  visiblePage,
}: NavigationButtonsProps) {
  return (
    <>
      {/* Desktop nav */}
      <button
        onClick={() => onNavigate("projects")}
        aria-label="Projects"
        className={`hidden sm:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 text-2xl text-white tracking-widest items-center justify-center transition-all duration-500 ${
          visiblePage === "projects"
            ? "opacity-20 cursor-auto"
            : "opacity-100 cursor-pointer hover:text-blue"
        }`}
      >
        <span
          className={`h-[12vw] transition-transform duration-500 ease-out ${
            visiblePage === "projects" ? "scale-x-[0.5]" : "scale-x-100"
          }`}
        >
          <LeftArrow />
        </span>
        <span
          className={`transition-all duration-500 ease-out ${
            visiblePage === "projects" ? "-ml-10" : "-ml-6"
          }`}
        >
          PROJECTS
        </span>
      </button>

      <button
        onClick={() => onNavigate("about")}
        aria-label="About"
        className={`hidden sm:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 text-2xl text-white tracking-widest items-center justify-center transition-all duration-500 ${
          visiblePage === "about"
            ? "opacity-20 cursor-auto"
            : "opacity-100 cursor-pointer hover:text-pink"
        }`}
      >
        <span
          className={`transition-all duration-500 ease-out ${
            visiblePage === "about" ? "-mr-10" : "-mr-6"
          }`}
        >
          ABOUT
        </span>
        <span
          className={`h-[12vw] transition-transform duration-500 ease-out ${
            visiblePage === "about" ? "scale-x-[0.5]" : "scale-x-100"
          }`}
        >
          <RightArrow />
        </span>
      </button>

      <button
        onClick={() => onNavigate("contact")}
        aria-label="Contact"
        className={`hidden sm:flex flex-col fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-2xl text-white tracking-widest items-center justify-center transition-all duration-500 ${
          visiblePage === "contact"
            ? "opacity-20 cursor-auto"
            : "opacity-100 cursor-pointer hover:text-orange"
        }`}
      >
        <span
          className={`transition-all duration-500 ease-out ${
            visiblePage === "contact" ? "-mb-10" : "-mb-6"
          }`}
        >
          CONTACT
        </span>
        <span
          className={`w-[12vw] transition-transform duration-500 ease-out ${
            visiblePage === "contact" ? "scale-y-[0.5]" : "scale-y-100"
          }`}
        >
          <DownArrow />
        </span>
      </button>

      {/* Mobile nav */}

      <button
        onClick={() => onNavigate("projects")}
        className={`sm:hidden fixed left-0 top-0 w-8 h-full bg-gray-800 text-white hover:bg-blue transition-all duration-200 cursor-pointer flex items-center justify-center ${
          visiblePage === "projects" ? "opacity-50" : "opacity-100"
        }`}
      >
        <span className="-rotate-90 text-sm">Projects</span>
      </button>
      <button
        onClick={() => onNavigate("about")}
        className={`sm:hidden fixed right-0 top-0 w-8 h-full bg-gray-800 text-white hover:bg-pink transition-all duration-200 cursor-pointer flex items-center justify-center ${
          visiblePage === "about" ? "opacity-50" : "opacity-100"
        }`}
      >
        <span className="rotate-90 text-sm">About</span>
      </button>
      <button
        onClick={() => onNavigate("contact")}
        className={`sm:hidden fixed left-0 bottom-0 w-full h-8 bg-gray-800 text-white hover:bg-orange transition-all duration-200 cursor-pointer ${
          visiblePage === "contact" ? "opacity-50" : "opacity-100"
        }`}
      >
        Contact
      </button>
    </>
  );
}
