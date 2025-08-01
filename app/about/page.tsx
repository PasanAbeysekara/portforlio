import { yourName } from '../data/projects';

export const metadata = { title: `About - ${yourName}` };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold border-b border-gh-border pb-4 mb-6">Profile</h1>
      <div className="prose prose-invert lg:prose-xl text-gh-text space-y-4">
        <p>
          Motivated Software Engineer and Open Source Contributor with hands-on
          experience in backend development and DevOps. During my WSO2 internship, I
          contributed to developing robust backend services and microservices.
        </p>
        <p>
          I am skilled in Java Spring Boot, Go, and building RESTful APIs in cloud-native
          environments. I have also achieved recognition at the country level for my
          proficiency in Data Analytics, UI/UX Designing & Competitive Programming.
        </p>
        
        <h2 className="text-2xl font-semibold pt-4">Key Skills</h2>
        <ul className="list-disc pl-6">
            <li><strong>Programming & Scripting:</strong> Java (experienced), Go (exploring), TypeScript (experienced), Ballerina (certified), C++ (competitive programming)</li>
            <li><strong>Software Development:</strong> Backend (Spring Boot, Microservices - REST, Kafka/MQTT), Frontend (React, Next.js), Mobile (Flutter), DBMS (MySQL, PostgreSQL, MongoDB, Redis)</li>
            <li><strong>DevOps:</strong> Linux, CI/CD (Jenkins), Docker, Kubernetes, SonarQube, AWS (S3, EC2, Lambda, CloudFront)</li>
        </ul>
      </div>
    </div>
  );
}