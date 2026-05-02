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
      <div
        className={[
          "fixed inset-0 z-20 flex items-center justify-center transition-transform duration-1200 ease-out",
          visiblePage === "projects" ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="h-[80vh] w-[70vw] overflow-hidden">
          <ProjectsPage />
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-20 flex items-center justify-center transition-transform duration-1200 ease-out",
          visiblePage === "about" ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="h-[80vh] w-[70vw] overflow-hidden">
          <AboutPage />
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-20 flex items-center justify-center transition-transform duration-1200 ease-out",
          visiblePage === "contact" ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="h-[80vh] w-[70vw] overflow-hidden">
          <ContactPage />
        </div>
      </div>
    </>
  );
}
