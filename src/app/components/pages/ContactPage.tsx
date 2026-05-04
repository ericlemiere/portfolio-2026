"use client";

import { HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { PageWrapper } from "../PageWrapper";

const LINKS = [
  {
    icon: HiOutlineMail,
    label: "EMAIL",
    value: "lemierecs@gmail.com",
    href: "mailto:lemierecs@gmail.com",
  },
  {
    icon: FaGithub,
    label: "GITHUB",
    value: "github.com/ericlemiere",
    href: "https://github.com/ericlemiere",
  },
  {
    icon: FaLinkedin,
    label: "LINKEDIN",
    value: "linkedin.com/in/ericlemiere",
    href: "https://linkedin.com/in/ericlemiere",
  },
  {
    icon: FaInstagram,
    label: "INSTAGRAM",
    value: "instagram.com/ericlemiere",
    href: "https://instagram.com/ericlemiere",
  },
];

export function ContactPage() {
  return (
    <PageWrapper
      title="CONTACT"
      accentColor="orange"
      contentClassName="space-y-10"
    >
      {/* Links */}
      <ul className="flex md:flex-col space-x-4 md:space-y-4 cursor-pointer">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex flex-col md:flex-row md:items-center items-baseline md:gap-5 group cursor-pointer"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {<link.icon className="text-4xl md:hidden mr-2" />}
              <span className="hidden md:block text-xs tracking-widest font-bold text-foreground/35 w-20 shrink-0 cursor-pointer">
                {link.label}
              </span>
              <span className="hidden md:block text-lg group-hover:text-orange transition-colors duration-150 cursor-pointer">
                {link.value}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Form */}
      <div className="md:pt-10">
        <p className="text-xs tracking-widest font-bold text-foreground/35 mb-8">
          SEND A MESSAGE
        </p>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent border-b border-foreground/20 pb-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-orange transition-colors duration-150"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-foreground/20 pb-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-orange transition-colors duration-150"
            />
          </div>
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full bg-transparent border-b border-foreground/20 pb-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-orange transition-colors duration-150 resize-none"
          />
          <button
            type="submit"
            className="text-sm tracking-widest border border-orange/40 text-orange px-7 py-3 hover:bg-orange hover:text-black transition-colors duration-200"
          >
            SEND →
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
