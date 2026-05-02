import { PageWrapper } from "../PageWrapper";
import Image from "next/image";

const PROJECTS = [
  {
    title: "Old Trapper Beef Jerky Website",
    tags: [
      "TypeScript",
      "Hydrogen",
      "Shopify",
      "Sanity",
      "Tailwind CSS",
      "GSAP Animations",
    ],
    description:
      "E-commerce website for a major beef jerky brand, built with Hydrogen for the front end, integrating with Shopify for the back end, and utilizing Sanity for content management.",
    logo: "/ot_logo.png",
  },
  {
    title: "Altitude Beverages Website",
    tags: [
      "TypeScript",
      "Hydrogen",
      "Shopify",
      "Sanity",
      "Tailwind CSS",
      "GSAP Animations",
    ],
    description:
      "E-commerce website for a startup beverage brand, built with Hydrogen for the front end, integrating with Shopify for the back end, and utilizing Sanity for content management.",
    logo: "/ab_logo.svg",
  },
  {
    title: "Community Foundation For Southeast Washington Website",
    tags: ["React", "D3.js", "Go", "WebSockets"],
    description:
      "Live analytics dashboard with streaming data feeds, animated charts, and configurable threshold alerts.",
    logo: "/cf_logo.png",
  },
  {
    title: "Bigfork Chamber of Commerce Website",
    tags: ["Wordpress", "Elementor"],
    description:
      "Cross-platform fitness tracking app with a custom animation engine, offline-first sync, and social leaderboards.",
    logo: "/bf_logo.png",
  },
  {
    title: "Vesper Aviation Website",
    tags: ["Wordpress", "Elementor", "Custom Google Maps Integration"],
    description:
      "Full-stack e-commerce solution with inventory management, payment processing, and order tracking.",
    logo: "/va_logo.png",
  },
  {
    title: "Next JS + Sanity Website Starter",
    tags: ["Next.js", "Sanity", "Tailwind CSS"],
    description:
      "Starter template for building websites with Next.js and Sanity, featuring a modern design system and responsive layout.",
    logo: "/next_logo.png",
  },
];

export function ProjectsPage() {
  return (
    <PageWrapper title="PROJECTS" accentColor="blue" contentClassName="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="border border-foreground/10 rounded-lg p-6 hover:border-blue/30 transition-colors duration-200"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-bold leading-tight">{p.title}</h3>
              <div className="text-4xl shrink-0">
                <Image
                  src={p.logo}
                  alt={`${p.title} logo`}
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-blue border border-blue/30 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-foreground/55 text-sm leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
