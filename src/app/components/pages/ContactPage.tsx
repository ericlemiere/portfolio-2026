"use client";

import { useState } from "react";
import { HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { PageWrapper } from "../PageWrapper";

const LINKS = [
  {
    icon: HiMail,
    label: "EMAIL",
    value: "hello@ericlemiere.com",
    href: "mailto:hello@ericlemiere.com",
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
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xeqvapoy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <PageWrapper
      title="CONTACT"
      accentColor="orange"
      contentClassName="space-y-10"
    >
      {/* Links */}
      <ul className="flex md:flex-col space-x-4  cursor-pointer">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="w-fit flex flex-col md:flex-row md:items-center items-baseline md:gap-5 md:py-2 group cursor-pointer"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {
                <link.icon className="text-4xl group-hover:fill-orange transition-colors duration-200" />
              }
              <span className="hidden md:block text-xs tracking-widest font-bold text-foreground/50 w-20 shrink-0 cursor-pointer">
                {link.label}
              </span>
              <span className="hidden md:block text-lg group-hover:text-orange transition-colors duration-200 cursor-pointer">
                {link.value}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Form */}
      <div className="md:pt-10">
        <p className="text-xs tracking-widest font-bold text-foreground/50 mb-8">
          SEND A MESSAGE
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              required
              disabled={status === "submitting"}
              className="w-full bg-transparent border-b border-foreground/50 pb-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-orange transition-colors duration-150 disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              required
              disabled={status === "submitting"}
              className="w-full bg-transparent border-b border-foreground/50 pb-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-orange transition-colors duration-150 disabled:opacity-50"
            />
          </div>
          <div className="relative">
            <textarea
              name="message"
              placeholder="Message*"
              rows={5}
              required
              disabled={status === "submitting"}
              className="w-full bg-transparent border-b border-foreground/50 pb-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-orange transition-colors duration-150 resize-none disabled:opacity-50"
            />
            {status === "success" && (
              <p className="absolute text-blue text-sm">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="absolute text-pink text-sm">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group text-sm mt-2 tracking-widest border border-orange text-orange px-7 py-3 hover:bg-orange hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "SENDING..." : "SEND"}
            <span className="ml-2 inline-block group-hover:translate-x-2 transition-all duration-200">
              {status === "submitting" ? "" : "→"}
            </span>
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
