// app/experience/page.tsx

import { yourName } from '../data/projects';

// For better maintainability, we'll define the experience data as an array of objects.
type ExperienceDetail = {
  subheading?: string;
  note?: string;
  points: string[];
};

type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
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


export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold border-b border-gh-border pb-4 mb-2">Work Experience</h1>
      <div>
        {experiences.map((exp, index) => (
          // Use React.Fragment to avoid adding extra divs to the DOM
          <div key={exp.role + exp.company}>
            <div className="experience-item py-8">
              <h2 className="text-2xl font-semibold">{exp.role}</h2>
              <p className="text-gh-text-secondary mt-1 mb-4">
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-gh-link hover:underline font-medium">{exp.company}</a>
                , {exp.location} | {exp.period}
              </p>
              
              <div className="space-y-6">
                {exp.details.map((detail, detailIndex) => (
                  <div key={detailIndex}>
                    {detail.subheading && <h3 className="text-lg font-semibold text-gh-text">{detail.subheading}</h3>}
                    {detail.note && <p className="text-sm text-gh-text-secondary mb-2 italic">{detail.note}</p>}
                    <ul className="list-disc pl-5 mt-2 space-y-1.5 text-gh-text">
                      {detail.points.map(point => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              {exp.tech && (
                <p className="mt-4 text-sm">
                  <strong className="font-semibold text-gh-text">Technologies Used: </strong>
                  <span className="text-gh-text-secondary">{exp.tech}</span>
                </p>
              )}
            </div>
            
            {/* THIS IS THE FIX: Add a styled horizontal rule after each item EXCEPT the last one. */}
            {index < experiences.length - 1 && (
              <hr className="border-gh-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}