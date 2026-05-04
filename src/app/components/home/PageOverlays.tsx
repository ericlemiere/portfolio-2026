"use client";

import { ProjectsPage } from "../pages/ProjectsPage";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { PageId } from "./NavigationButtons";

interface PageOverlaysProps {
  visiblePage: PageId | null;
}

export function PageOverlays({ visiblePage }: PageOverlaysProps) {
  return (
    <>
      {/* Fade gradient to hide content scrolling behind the name */}
      {visiblePage && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-36 bg-linear-to-b from-black via-black/80 to-transparent z-30 pointer-events-none" />
      )}

      <div
        className={[
          "fixed inset-0 z-20 flex items-start lg:items-center justify-center transition-transform duration-1200 ease-out overflow-y-auto",
          visiblePage === "projects" ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="pt-32 sm:pt-44 lg:pt-24 pb-20 lg:pb-24 lg:m-0 lg:h-[calc(100vh-12rem)] w-screen lg:w-[70vw] max-w-5xl lg:overflow-y-hidden lg:overflow-x-hidden no-scrollbar">
          <ProjectsPage />
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-20 flex items-start lg:items-center justify-center transition-transform duration-1200 ease-out overflow-y-auto",
          visiblePage === "about" ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="pt-32 sm:pt-44 lg:pt-24 pb-20 mx-auto lg:m-0 lg:pb-24 lg:h-[calc(100vh-16rem)] w-19/20 lg:w-[60vw] max-w-5xl lg:overflow-y-auto no-scrollbar">
          <AboutPage />
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-20 flex items-start lg:items-center justify-center transition-transform duration-1200 ease-out overflow-y-auto",
          visiblePage === "contact" ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="pt-32 sm:pt-44 lg:pt-24 pb-20 mx-auto lg:m-0 lg:pb-24 lg:h-[calc(100vh-12rem)] w-19/20 lg:w-[60vw] max-w-3xl lg:overflow-y-auto no-scrollbar">
          <ContactPage />
        </div>
      </div>
    </>
  );
}
