import { PageWrapper } from "../PageWrapper";

const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Go",
  "PostgreSQL",
  "CSS / Animation",
  "Figma",
];

const EXPERIENCE = [
  {
    role: "Senior Frontend Engineer",
    company: "Acme Corp",
    period: "2022 — Present",
    note: "Led UI architecture for a design system used by 30+ product teams.",
  },
  {
    role: "Software Engineer",
    company: "Startup Studio",
    period: "2020 — 2022",
    note: "Full-stack product development across three zero-to-one launches.",
  },
  {
    role: "Freelance Developer & Designer",
    company: "Independent",
    period: "2018 — 2020",
    note: "Brand identity, web, and interactive work for agencies and founders.",
  },
];

export function AboutPage() {
  return (
    <PageWrapper title="ABOUT" accentColor="pink">
      {/* Bio */}
      <div className="space-y-4">
        <p className="text-base leading-relaxed text-foreground/75">
          I&apos;m a software engineer and designer who builds digital products
          at the intersection of thoughtful engineering and visual craft.
        </p>
        <p className="text-base leading-relaxed text-foreground/75">
          I&apos;ve worked across the full stack — from distributed backend
          systems to pixel-precise interfaces — with a particular focus on
          motion, typography, and performance.
        </p>
        <p className="text-base leading-relaxed text-foreground/75">
          Currently open to new opportunities.
        </p>
      </div>

      {/* Skills */}
      <div>
        <p className="text-xs tracking-widest font-bold text-foreground/35 mb-4">
          SKILLS
        </p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="text-xs text-pink border border-pink/30 rounded-full px-3 py-1"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <p className="text-xs tracking-widest font-bold text-foreground/35 mb-6">
          EXPERIENCE
        </p>
        <ul>
          {EXPERIENCE.map((e) => (
            <li key={e.role} className="border-t border-foreground/10 py-5">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="font-bold text-sm">{e.role}</span>
                <span className="text-xs text-foreground/35 tabular-nums shrink-0">
                  {e.period}
                </span>
              </div>
              <p className="text-xs text-foreground/45 mb-1">{e.company}</p>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {e.note}
              </p>
            </li>
          ))}
        </ul>
        <div className="border-t border-foreground/10" />
      </div>
    </PageWrapper>
  );
}
