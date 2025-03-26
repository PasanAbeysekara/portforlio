"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// MouseTrail component that creates a smooth multi-dot trailing effect
function MouseTrail() {
  const [isMobile, setIsMobile] = useState(false);
  const numDots = 10; // Number of dots in the trail
  const dots = useRef(Array.from({ length: numDots }, () => ({ x: 0, y: 0 })));
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for mobile view on mount and on window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip the logic on mobile

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return; // Skip the logic on mobile

    let animationFrameId: number;
    const easeFactor = 0.2; // Adjust for more or less easing

    const animate = () => {
      // Update each dot's position:
      dots.current.forEach((dot, i) => {
        if (i === 0) {
          // First dot follows the mouse directly
          dot.x += (mouse.current.x - dot.x) * easeFactor;
          dot.y += (mouse.current.y - dot.y) * easeFactor;
        } else {
          // Each subsequent dot follows the previous dot
          dot.x += (dots.current[i - 1].x - dot.x) * easeFactor;
          dot.y += (dots.current[i - 1].y - dot.y) * easeFactor;
        }
      });

      // Update the style of each dot element
      if (containerRef.current) {
        const children = containerRef.current.children;
        dots.current.forEach((dot, i) => {
          const size = 16 - i * 2; // Dot sizes decrease for trailing dots
          if (children[i]) {
            (children[i] as HTMLDivElement).style.transform = `translate(${
              dot.x - size / 2
            }px, ${dot.y - size / 2}px)`;
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
    >
      {!isMobile &&
        Array.from({ length: numDots }).map((_, i) => {
          const size = 16 - i * 2; // Dot size: larger at the front
          const opacity = 1 - i * 0.1; // Gradually fading dots
          return (
            <div
              key={i}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: "#64ffda",
                borderRadius: "50%",
                opacity: opacity,
                position: "absolute",
                pointerEvents: "none",
              }}
            />
          );
        })}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative bg-[#0a192f] text-white font-sans min-h-screen">
      {/* MouseTrail covers the entire viewport, but will hide on mobile */}
      <MouseTrail />

      {/* Outer container for max width */}
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        {/* Main layout: sidebar + content */}
        <div className="flex flex-col md:flex-row min-h-screen md:pt-10">
          {/* Left sidebar - fixed */}
          <div className="md:w-1/3 p-6 md:fixed md:h-screen flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3 text-white">
                Pasan Abeysekara
              </h1>
              <h2 className="text-lg mb-4 text-gray-300">Front End Engineer</h2>
              <p className="text-base text-gray-400 mb-8 leading-relaxed max-w-xs">
                I build accessible, pixel-perfect digital experiences for the
                web.
              </p>

              {/* Navigation */}
              {/* Replace your current nav with something like this */}
              <nav className="mb-8">
                <ul className="space-y-6">
                  <li className="relative group pb-1">
                    <Link
                      href="#about"
                      className="
          relative inline-block 
          text-sm uppercase tracking-wider font-medium 
          text-gray-400 
          transition-all duration-300
          group-hover:text-white 
          group-hover:text-base
        "
                    >
                      ABOUT
                      {/* Horizontal line that expands on hover */}
                      <span
                        className="
            absolute left-0 bottom-[-2px] 
            h-[2px] w-0 bg-[#64ffda] 
            transition-all duration-300 
            group-hover:w-full
          "
                      />
                    </Link>
                  </li>

                  <li className="relative group pb-1">
                    <Link
                      href="#experience"
                      className="
          relative inline-block 
          text-sm uppercase tracking-wider font-medium 
          text-gray-400 
          transition-all duration-300
          group-hover:text-white 
          group-hover:text-base
        "
                    >
                      EXPERIENCE
                      <span
                        className="
            absolute left-0 bottom-[-2px] 
            h-[2px] w-0 bg-[#64ffda] 
            transition-all duration-300 
            group-hover:w-full
          "
                      />
                    </Link>
                  </li>

                  <li className="relative group pb-1">
                    <Link
                      href="#projects"
                      className="
          relative inline-block 
          text-sm uppercase tracking-wider font-medium 
          text-gray-400 
          transition-all duration-300
          group-hover:text-white 
          group-hover:text-base
        "
                    >
                      PROJECTS
                      <span
                        className="
            absolute left-0 bottom-[-2px] 
            h-[2px] w-0 bg-[#64ffda] 
            transition-all duration-300 
            group-hover:w-full
          "
                      />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social media icons */}
            <div className="flex space-x-5 mt-8 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {/* GitHub icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {/* LinkedIn icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://stackoverflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {/* StackOverflow icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {/* Instagram icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://gumroad.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {/* Gumroad icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm-2.426-14.741l-.492-.348c-.455-.337-1.45-.337-1.906 0l-5.651 3.855c-.455.337-.455.882 0 1.219l5.651 3.855c.455.337 1.45.337 1.906 0l5.651-3.855c.455-.337.455-.882 0-1.219l-5.651-3.855c-.455-.337-1.45-.337-1.906 0l.398.562c.211-.156.679-.156.89 0l4.88 3.335c.211.156.211.41 0 .566l-4.88 3.335c-.211.156-.679.156-.89 0l-4.88-3.335c-.211-.156-.211-.41 0-.566l4.88-3.335c.211-.156.679-.156.89 0l.492-.348z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right content - scrollable */}
          <div className="md:w-2/3 md:ml-auto p-6 mt-10 md:mt-0">
            <section
              id="about"
              className="mb-12 max-w-2xl transition-transform duration-200 hover:scale-[1.01]"
            >
              <p className="text-base text-gray-300 mb-4 leading-relaxed">
                I'm a developer passionate about crafting accessible,
                pixel-perfect user interfaces that blend thoughtful design with
                robust engineering. My favorite work lies at the intersection of
                design and development, creating experiences that not only look
                great but are meticulously built for performance and usability.
              </p>
              <p className="text-base text-gray-300 mb-4 leading-relaxed">
                Currently, I'm an Intern Software Engineer at{" "}
                <a href="#" className="text-[#64ffda]">
                  WSO2
                </a>
                , specializing in accessibility. I contribute to the creation
                and maintenance of UI components that power WSO2's frontend,
                ensuring our platform meets web accessibility standards and best
                practices to deliver an inclusive user experience.
              </p>
              <p className="text-base text-gray-300 mb-4 leading-relaxed">
                In the past, I've had the opportunity to develop software across
                a variety of settings—from{" "}
                <span className="text-white">advertising agencies</span> and{" "}
                <span className="text-white">large corporations</span> to{" "}
                <span className="text-white">start-ups</span> and{" "}
                <span className="text-white">
                  small digital product studios
                </span>
                . Additionally, I released a{" "}
                <span className="text-white">comprehensive video course</span> a
                few years ago, guiding learners through building a web app with
                the Spotify API.
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                In my spare time, I'm usually climbing, reading, hanging out
                with my wife and two cats, or running around Hyrule searching
                for <span className="text-white">Korok seeds</span>.
              </p>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-12 max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4">Experience</h2>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-400 text-sm">2024 — PRESENT</div>
                  <h3 className="text-lg font-semibold text-white group flex items-center">
                    Senior Frontend Engineer, Accessibility · WSO2
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </h3>
                </div>
                <div className="bg-[#112240] rounded-md p-4 transition-transform duration-200 hover:scale-[1.01]">
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    Build and maintain critical components used to construct
                    WSO2's frontend, across the whole product. Work closely with
                    cross-functional teams to implement and advocate for best
                    practices in web accessibility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      JavaScript
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      TypeScript
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      React
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Storybook
                    </span>
                  </div>
                </div>
              </div>

              {/* Example of another experience item */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-400 text-sm">2018 — 2024</div>
                  <h3 className="text-lg font-semibold text-white group flex items-center">
                    Lead Engineer · Upstatement
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </h3>
                </div>
                <div className="bg-[#112240] rounded-md p-4 transition-transform duration-200 hover:scale-[1.01]">
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    Built, styled, and shipped high-quality websites, design
                    systems, mobile apps, and digital experiences for a variety
                    of clients. Provided leadership within engineering through
                    collaboration, knowledge shares, and internal tools.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      JavaScript
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      TypeScript
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      React
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Next.js
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-12 max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4">Projects</h2>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center group">
                  Featured Project: Spotify Profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </h3>
                <div className="bg-[#112240] rounded-md p-4 transition-transform duration-200 hover:scale-[1.01]">
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    A web app for visualizing personalized Spotify data. View
                    your top artists, top tracks, recently played tracks, and
                    detailed audio information about each track. Create and save
                    new playlists of recommended tracks based on your existing
                    playlists and more.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      React
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Styled Components
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Express
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Spotify API
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Heroku
                    </span>
                  </div>
                </div>
              </div>

              {/* Example of another project item */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center group">
                  Another Cool Project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </h3>
                <div className="bg-[#112240] rounded-md p-4 transition-transform duration-200 hover:scale-[1.01]">
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    A short description about another interesting project that
                    demonstrates your skills or creativity.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      React
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Node.js
                    </span>
                    <span className="bg-[#172a45]/50 text-[#64ffda] px-3 py-1 rounded-full text-xs">
                      Tailwind
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
