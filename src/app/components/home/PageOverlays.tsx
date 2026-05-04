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
          "fixed inset-0 z-20 flex items-start lg:items-center justify-center transition-transform duration-1200 ease-out overflow-y-auto",
          visiblePage === "projects" ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="pt-40 lg:pt-10 pb-10 lg:m-0 lg:h-[80vh] w-screen lg:w-[70vw] max-w-5xl lg:overflow-y-hidden lg:overflow-x-hidden">
          <ProjectsPage />
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-20 flex items-start lg:items-center justify-center transition-transform duration-1200 ease-out overflow-y-auto",
          visiblePage === "about" ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="pt-40 lg:pt-10 pb-10 mx-auto lg:m-0 lg:h-[80vh] w-19/20 lg:w-[70vw] max-w-5xl lg:overflow-y-auto">
          <AboutPage />
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-20 flex items-start lg:items-center justify-center transition-transform duration-1200 ease-out overflow-y-auto",
          visiblePage === "contact" ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="pt-40 lg:pt-10 pb-10 mx-auto lg:m-0 lg:h-[80vh] w-19/20 lg:w-[70vw] max-w-3xl lg:overflow-y-auto">
          <ContactPage />
        </div>
      </div>
    </>
  );
}
