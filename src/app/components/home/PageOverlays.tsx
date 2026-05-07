"use client";

import { ProjectsPage } from "../pages/ProjectsPage";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { PageId } from "./NavigationButtons";

interface PageOverlaysProps {
  visiblePage: PageId | null;
}

interface PageConfig {
  id: PageId;
  component: React.ReactNode;
  translateVisible: string;
  translateHidden: string;
  containerClasses: string;
}

const containerBaseClasses =
  "pt-30 sm:pt-44 lg:pt-24 mx-auto lg:m-0 lg:pb-24 lg:h-[calc(100vh-10rem)] lg:overflow-y-auto lg:overflow-x-hidden no-scrollbar ";

const PAGE_CONFIGS: PageConfig[] = [
  {
    id: "projects",
    component: <ProjectsPage />,
    translateVisible: "translate-x-0",
    translateHidden: "-translate-x-full",
    containerClasses: `${containerBaseClasses} pb-10 w-screen lg:w-[70vw] max-w-5xl`,
  },
  {
    id: "about",
    component: <AboutPage />,
    translateVisible: "translate-x-0",
    translateHidden: "translate-x-full",
    containerClasses: `${containerBaseClasses} pb-20 w-19/20 lg:w-[60vw] max-w-5xl`,
  },
  {
    id: "contact",
    component: <ContactPage />,
    translateVisible: "translate-y-0",
    translateHidden: "translate-y-full",
    containerClasses: `${containerBaseClasses} pb-10 w-19/20 lg:w-[60vw] max-w-3xl`,
  },
];

export function PageOverlays({ visiblePage }: PageOverlaysProps) {
  return (
    <>
      {/* Fade gradient to hide content scrolling behind the name */}
      {visiblePage && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-36 bg-linear-to-b from-black via-black/80 to-transparent z-30 pointer-events-none" />
      )}

      {PAGE_CONFIGS.map(
        ({
          id,
          component,
          translateVisible,
          translateHidden,
          containerClasses,
        }) => (
          <div
            key={id}
            className={[
              "fixed inset-0 z-20 flex items-start lg:items-center justify-center transition-transform duration-1200 ease-out overflow-y-auto",
              visiblePage === id ? translateVisible : translateHidden,
            ].join(" ")}
          >
            <div className={containerClasses}>{component}</div>
          </div>
        ),
      )}
    </>
  );
}
