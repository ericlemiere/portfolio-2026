"use client";

import { PageWrapper } from "../PageWrapper";
import { Modal } from "../Modal";
import { useState } from "react";

const SKILLS = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Sanity",
  "Contentful",
  "Tailwind CSS",
  "GSAP",
  "Shopify",
  "Wordpress",
  "Elementor",
  "Squarespace",
  "...and more",
];

export function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageWrapper>
      {/* Bio */}
      <h2
        className={`w-full text-md md:text-4xl font-bold tracking-widest md:mb-10 text-pink`}
      >
        ABOUT
      </h2>
      <div className="space-y-4">
        <p className="text-base lg:text-lg leading-relaxed text-foreground-75">
          I love taking things and improving them. My first career as a musician
          taught me the importance of creativity and discipline, and how to work
          with others to bring a vision to life. I bring that same mindset to my
          work as a software developer, where I get to build things that people
          use and enjoy.
        </p>
        <p className="text-base lg:text-lg leading-relaxed text-foreground-75">
          I&apos;ve worked across the full stack, from custom backend CMS design
          to pixel-precise interfaces, with a particular focus on front-end
          usability, accessibility, and performance.
        </p>
      </div>

      {/* Skills */}
      <div>
        <p className="text-xs lg:text-md tracking-widest font-bold text-foreground-35 mb-4">
          SKILLS
        </p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="text-xs lg:text-sm text-white border border-pink rounded-full px-3 py-1"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Music */}
      <div>
        <p className="text-xs lg:text-md tracking-widest font-bold text-foreground-35 mb-4">
          MUSIC
        </p>
        <p className="text-base lg:text-lg leading-relaxed text-foreground-75 mb-4">
          Before software, I had a 20-year career as a musician, producer, and
          audio engineer. I toured the world playing for various artists, and
          got to do some pretty cool things along the way.
        </p>
        <div
          className="text-pink text-lg cursor-pointer hover:underline-offset-8 transition-all duration-150 underline underline-offset-4"
          onClick={openModal}
        >
          Career Highlights
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Career Highlights"
          titleClassName="text-pink"
        >
          <div className="space-y-6 text-foreground-75">
            <ul className="space-y-4 list-none">
              <li>
                <strong className="text-pink mr-2">Superman:</strong>
                Played guitar on the movie trailers for the 2025 Superman movie
                - &nbsp;
                <a
                  href="https://www.youtube.com/watch?v=Ox8ZLF6cGM0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:underline-offset-6 transition-all"
                >
                  WATCH HERE
                </a>
              </li>
              <li>
                <strong className="text-pink mr-2">Air Climber:</strong>
                My solo instrumental music project - &nbsp;
                <a
                  href="https://www.youtube.com/watch?v=BDyO4UBWXMw&list=OLAK5uy_mZ-qkJnEwpTY--eB8HECiy1DF5k4yp5r4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:underline-offset-6 transition-all"
                >
                  LISTEN HERE
                </a>
              </li>
              <li>
                <strong className="text-pink mr-2">Surveyor:</strong>
                Co-produced, co-wrote, and played several instruments on
                Surveyor's debut album XI - &nbsp;
                <a
                  href="https://www.youtube.com/watch?v=3dDgY3rRuOA&list=OLAK5uy_kw8knMtKTwCYCULbKG2lKuqjHpHGVddoU&index=3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:underline-offset-6 transition-all"
                >
                  LISTEN HERE
                </a>
              </li>

              <li>
                <strong className="text-pink mr-2">Television:</strong>
                Had music featured on television shows and commercials, plus a
                live performance on Good Morning America - &nbsp;
                <a
                  href="https://www.youtube.com/watch?v=VGAL1Yf5p2M&list=RDVGAL1Yf5p2M&start_radio=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:underline-offset-6 transition-all"
                >
                  WATCH HERE
                </a>
              </li>
              <li>
                <strong className="text-pink mr-2">Top of the Charts:</strong>
                Produced and recorded multiple albums that reached #1 on iTunes
                in their respective genres
              </li>
              <li>
                <strong className="text-pink mr-2">
                  Madison Square Garden:
                </strong>
                Played a sold-out show at the iconic Madison Square Garden
              </li>
              <li>
                <strong className="text-pink mr-2">Tours:</strong>
                Traveled all over the US and Europe (plus a show in Africa)
                playing guitar/bass/drums/keys in front of millions with various
                artists
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    </PageWrapper>
  );
}
