"use client";

import { PageWrapper } from "../PageWrapper";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";

const PROJECTS = [
  {
    title: "Old Trapper Beef Jerky Website",
    tags: [
      "Hydrogen",
      "Shopify",
      "Sanity",
      "Tailwind CSS",
      "GSAP",
      "TypeScript",
    ],
    description:
      "Fully custom Shopify storefront for a major beef jerky brand. Shopify handles products and checkout, while Sanity powers content management.",
    logo: "/ot_logo.png",
    siteLink: "https://oldtrapper.com/",
  },
  {
    title: "Skydrate Website",
    tags: ["Next.js", "Styled Components", "Sanity"],
    description:
      "A custom website for a unique company, built using Next.js for the front end and Sanity for content management, featuring a fully custom checkout process.",
    logo: "/skydrate_logo.png",
    siteLink: "https://skydrate.pro/",
  },
  {
    title: "Altitude Beverages Website",
    tags: [
      "Hydrogen",
      "Shopify",
      "Sanity",
      "Tailwind CSS",
      "GSAP",
      "TypeScript",
    ],
    description:
      "Fully custom Shopify storefront for a beverage brand. Shopify handles products and checkout, while Sanity powers content management.",
    logo: "/ab_logo.svg",
    siteLink: "https://altitudebeverages.com/",
  },

  {
    title: "Community Foundation For SW Washington Website",
    tags: ["Next.js", "Styled Components", "Sanity", "Authorize.net"],
    description:
      "Features a custom donation system using the Authorize.Net API, built with Next.js on the front end, and Sanity as the CMS.",
    logo: "/cf_logo.png",
    siteLink: "https://cfsww.org/",
  },
  {
    title: "Bigfork Chamber of Commerce Website",
    tags: ["Wordpress", "Elementor"],
    description:
      "The Chamber of Commerce website for Bigfork, Montana, built using WordPress and Elementor for easy content management and customization.",
    logo: "/bf_logo.png",
    siteLink: "https://bigforkchamber.com/",
  },
  {
    title: "Vesper Aviation Website",
    tags: ["Wordpress", "Elementor", "Custom Google Maps Integration"],
    description:
      "A Wordpress/Elementor site for a company that provides high-end flight support services and luxury amenities for private and business aviation.",
    logo: "/va_logo.png",
    siteLink: "https://vesperaviation.com/",
  },
  {
    title: "Next JS + Sanity Website Starter",
    tags: ["Next.js", "Sanity", "Tailwind CSS"],
    description:
      "A scalable marketing agency website template built with Next.js (app router) and Sanity, offering reusable responsive components, flexible integrations, and a user-friendly CMS.",
    logo: "/next_sanity_logo.png",
    learnMore: true,
  },
  {
    title: "Wurtle Game",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "My own version of the hit game Wordle, with some fun additions. One of my first side projects, built with vanilla HTML, CSS, and JavaScript.",
    logo: "/wurtle-logo-nobg.png",
    siteLink: "https://wurtlegame.com/",
  },
];

// Shared Project Card Component
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  isSelected: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isWurtle = project.title === "Wurtle Game";

  return (
    <div className="bg-black/50 border lg:border-none border-foreground-10 transition-colors duration-200 shadow-[0_0_12px_rgba(255,255,255,0.1)] lg:shadow-[0_0_36px_rgba(255,255,255,0.1)] rounded-lg p-4 lg:p-8 w-full h-full flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="mb-6">
          {/* Desktop: Logo above */}
          <div className="shrink-0 relative mb-4 h-20 w-full max-w-50">
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              fill
              sizes="200px"
              className="object-contain object-left"
            />
          </div>

          <h3 className="text-xl lg:text-3xl font-bold leading-tight mb-4">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs lg:text-sm w-fit whitespace-nowrap text-white border border-blue rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-foreground-75 leading-relaxed md:text-lg mb-6 max-w-prose">
          {project.description}
        </p>
      </div>

      <div className="flex">
        {project.learnMore && (
          <div
            className="group inline-flex items-center gap-2 text-blue hover:underline-offset-8 transition-all text-lg underline underline-offset-4 cursor-pointer"
            onClick={toggleModal}
          >
            Learn More
          </div>
        )}

        {project.siteLink && (
          <a
            href={project.siteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-blue hover:underline-offset-8 transition-all text-lg underline underline-offset-4"
          >
            {isWurtle ? "Play Game" : "View Site"}
          </a>
        )}
      </div>

      {/* Modal (shared for both mobile and desktop) */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 z-50 opacity-100 pointer-events-auto"
            onClick={toggleModal}
          >
            <div
              className="bg-black relative border border-foreground-20 rounded-lg p-6 lg:p-8 w-[90%] max-w-150 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={toggleModal}
                className="absolute top-2 right-2 text-foreground-50 hover:text-foreground transition-colors text-3xl leading-none ml-4"
                aria-label="Close modal"
              >
                ×
              </button>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg lg:text-2xl font-bold text-blue">
                  Next.js + Sanity Website Starter
                </h3>
              </div>
              <div className="space-y-6 text-foreground-75">
                <p className="leading-relaxed">
                  Developed over three years of real client work, this custom
                  website template is the result of continuous iteration and
                  optimization. It provides a high-performance, flexible
                  foundation for agencies, combining a modern frontend with a
                  customizable Sanity backend that enables non-technical users
                  to manage complex content with ease.
                </p>

                <ul className="space-y-3 list-none">
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Fast, efficient builds:
                    </strong>
                    Content updates from Sanity appear almost immediately on the
                    live site, and new builds deploy on Vercel in ~60 seconds
                    with optimized performance out of the box
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Lightweight frontend:
                    </strong>
                    Minimal JavaScript shipped to the browser thanks to
                    Tailwind-based styling
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      SEO-first architecture:
                    </strong>
                    Robust SEO setup with automatic schema markup
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Accessibility-focused:
                    </strong>
                    Comprehensive ARIA labeling and accessibility improvements
                    across components
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Advanced site search:
                    </strong>
                    Custom search indexes all Sanity content (pages, posts,
                    events, components) and returns contextual snippets with
                    deep linking to exact page sections
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Improved content editing UI:
                    </strong>
                    Custom-designed Sanity components for a more intuitive
                    editing experience
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Visual editing with drag-and-drop:
                    </strong>
                    Enhanced layout control within Sanity’s presentation tool
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Highly customizable forms:
                    </strong>
                    Flexible form builder with dynamic fields and Formspree
                    integration
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Flexible analytics integration:
                    </strong>
                    Easily add Google Analytics or Google Tag Manager IDs
                    directly within Sanity
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Built-in multilingual support:
                    </strong>
                    Enable Google Translate and select supported languages
                    directly in the CMS
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Media integrations:
                    </strong>
                    Both Mux and Vimeo video support, and a custom audio player
                    with download functionality
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Interactive UI components:
                    </strong>
                    Embla carousel integration with extensive configuration
                    options in the CMS
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Event management system:
                    </strong>
                    Includes a fully integrated, CMS-driven events calendar
                  </li>
                  <li>
                    <strong className="text-blue mr-2 flex">
                      Internal task management:
                    </strong>
                    Lightweight task list built into Sanity for simple project
                    coordination
                  </li>
                </ul>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

export function ProjectsPage() {
  // Single carousel instance for both mobile and desktop
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Carousel handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  // Track carousel selection
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <PageWrapper>
      <div className="w-full h-full lg:h-auto lg:flex-1 flex flex-col items-center justify-center gap-2 md:gap-6">
        <div className="w-19/20 relative">
          <h2
            className={`text-md md:text-4xl font-bold tracking-widest sm:mb-4 text-blue`}
          >
            PROJECTS
          </h2>
        </div>
        <div
          className="overflow-hidden w-full lg:w-19/20 flex flex-col-reverse sm:flex-col gap-4 h-auto py-1 md:py-4 lg:pt-12 lg:border-2 rounded-lg lg:border-blue/20"
          ref={emblaRef}
        >
          <div className="flex h-full lg:h-auto">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className={`shrink-0 flex items-center justify-center transition-opacity duration-500 px-1 lg:px-2 basis-full lg:basis-[80%] ${
                  index === selectedIndex ? "opacity-100" : "opacity-30"
                }`}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isSelected={index === selectedIndex}
                />
              </div>
            ))}
          </div>

          {/* Horizontal Navigation */}
          <div className="carousel_nav flex flex-col mx-auto">
            <div className="flex items-center gap-8 z-20">
              {/* Left Arrow */}
              <button
                onClick={scrollPrev}
                className="border border-blue rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-blue/30 transition-colors"
                aria-label="Previous project"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white cursor-pointer mr-0.5"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-3">
                {PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === selectedIndex
                        ? "bg-blue h-3 w-8"
                        : "bg-foreground-20 hover:bg-foreground-40 h-3 w-3"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollNext}
                className="border border-blue rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-blue/30 transition-colors"
                aria-label="Next project"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white cursor-pointer ml-0.5"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
