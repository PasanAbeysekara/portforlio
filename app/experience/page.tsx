"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type ExperienceDetail = {
  subheading?: string;
  note?: string;
  points: string[];
};

type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  logo: string;
  logoDark?: boolean;
  location: string;
  period: string;
  details: ExperienceDetail[];
  tech?: string;
};

const experiences: Experience[] = [
  {
    role: "Software Engineer (Internship)",
    company: "WSO2",
    companyUrl: "https://wso2.com",
    logo: "/logos/wso2.png",
    location: "Sri Lanka",
    period: "Jul 2024 - Jan 2025 (Expected)",
    details: [
      {
        subheading: "WSO2 PeopleOps Banking Application",
        note: "(Held ownership for development)",
        points: [
          "Implemented bank account change request & approval workflows.",
          "Developed finance admin report generation feature & NetSuite Integration.",
          "Revamped existing UI and introduced new UI design.",
        ],
      },
      {
        subheading: "WSO2 Application Tracking System",
        points: [
          "Implemented backend services for vacancy and candidate communication between wso2.com and the Application Tracking System.",
        ],
      },
    ],
    tech: "React, Redux, Ballerina, NetSuite, RESTful & GraphQL, Choreo, Asgardeo",
  },
  {
    role: "Software Engineer (Part-Time)",
    company: "amplify",
    companyUrl: "https://amplify.lk/",
    logo: "/logos/amplify.png",
    location: "Sri Lanka",
    period: "Jan 2024 - Jul 2024 & Jan 2025 - May 2025 (Expected)",
    details: [
      {
        points: [
          'Automated web scraping for legal data and developed a backend service using the Gemma LLM to restructure and maintain a 54k+ Sri Lankan law database for the "thelegaldatabase.com" project.',
        ],
      },
    ],
  },
  {
    role: "Software Engineer (Apprenticeship)",
    company: "STRATEC PARTNERS PTE. LTD",
    companyUrl: "https://www.stratec.com/",
    logo: "/logos/stratec.png",
    logoDark: true,
    location: "Singapore",
    period: "Nov 2023 - Jun 2024",
    details: [
      {
        points: [
          'Developed a client-facing UI with Angular v17 and contributed to the Spring Boot "DataService" for a restaurant table reservation system.',
          "Integrated a custom fine-tuned AI Chatbot using the Gemma LLM.",
        ],
      },
    ],
  },
];

// simple animation presets
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }, // <- changed
  },
};

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1
        className="text-3xl font-bold border-b border-gh-border pb-4 mb-12"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Work Experience
      </motion.h1>

      <div className="relative">
        {/* timeline rail */}
        <div
          className="
            pointer-events-none absolute left-6 top-0 h-full w-[2px]
            bg-gradient-to-b from-gh-border/60 via-gh-border to-transparent
          "
        />

        <div className="space-y-14 md:space-y-16">
          {experiences.map((exp) => (
            <motion.article
              key={exp.company + exp.role}
              className="relative pl-14"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            >
              {/* node */}
              <div className="absolute left-6 top-2 -translate-x-1/2">
                <div className="relative">
                  <span className="block h-3 w-3 rounded-full bg-gh-bg border-2 border-gh-border" />
                  {/* subtle pulse */}
                  <span className="absolute inset-0 -z-10 h-3 w-3 rounded-full animate-ping bg-gh-border/40" />
                </div>
              </div>

              {/* card */}
              <div
                className="
                  rounded-xl border border-gh-border bg-gh-card/40 backdrop-blur-sm
                  shadow-sm hover:shadow-md transition-shadow
                "
              >
                <div className="p-5 md:p-6">
                  {/* top row */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md p-1.5 flex items-center justify-center border border-gh-border">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={48}
                        height={48}
                        className={`object-contain ${exp.logoDark ? "invert" : ""}`}
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-xl md:text-2xl font-semibold leading-snug">
                        {exp.role}
                      </h2>
                      <p className="text-gh-link mt-1 truncate">
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {exp.company}
                        </a>
                      </p>

                      {/* meta badges */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full border border-gh-border px-2.5 py-1 text-xs text-gh-text-secondary">
                          {exp.location}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-gh-border px-2.5 py-1 text-xs text-gh-text-secondary">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* details */}
                  <div className="mt-5 md:mt-6 space-y-6">
                    {exp.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="space-y-2">
                        {detail.subheading && (
                          <h3 className="text-base md:text-lg font-semibold text-gh-text">
                            {detail.subheading}
                          </h3>
                        )}
                        {detail.note && (
                          <p className="text-sm text-gh-text-secondary italic">{detail.note}</p>
                        )}
                        <ul className="list-disc pl-5 space-y-1.5 leading-relaxed text-gh-text">
                          {detail.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {exp.tech && (
                    <p className="mt-6 text-sm leading-relaxed">
                      <strong className="font-semibold text-gh-text">Technologies Used: </strong>
                      <span className="text-gh-text-secondary">{exp.tech}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
