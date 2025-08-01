import { yourName } from '../data/projects';

export const metadata = { title: `Experience - ${yourName}` };

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold border-b border-gh-border pb-4 mb-6">Experience</h1>
      <div className="space-y-8">
        {/* CUSTOMIZE: Your experience items */}
        <div className="experience-item">
          <h2 className="text-2xl font-semibold">Senior Software Engineer at Tech Corp</h2>
          <p className="text-gh-text-secondary mb-2">Jan 2021 - Present</p>
          <ul className="list-disc pl-6 space-y-1 text-gh-text">
            <li>Led the development of a new microservices-based architecture, improving system scalability by 200%.</li>
            <li>Mentored junior developers and conducted code reviews to maintain high code quality standards.</li>
            <li>Developed and maintained the primary customer-facing React application, resulting in a 30% increase in user engagement.</li>
          </ul>
        </div>
        <div className="experience-item">
          <h2 className="text-2xl font-semibold">Software Engineer at Innovate Solutions</h2>
          <p className="text-gh-text-secondary mb-2">Jun 2018 - Dec 2020</p>
          <ul className="list-disc pl-6 space-y-1 text-gh-text">
            <li>Contributed to a large-scale Django monolith, focusing on API development and database optimization.</li>
            <li>Implemented a CI/CD pipeline using Jenkins and Docker, reducing deployment time by 50%.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}