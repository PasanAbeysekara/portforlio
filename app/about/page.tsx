import { Server, MonitorSmartphone, Database, CloudCog, Code, BrainCircuit } from 'lucide-react';

// A small reusable component for the skill pills
const SkillPill = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-gh-blue-tag text-gh-link px-3 py-1 rounded-full text-sm font-medium transition-transform hover:scale-105">
        {children}
    </span>
);

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold border-b border-gh-border pb-4 mb-6">About Me</h1>
      
      <div className="text-gh-text space-y-4 mb-12 text-lg">
        <p>
            Motivated Software Engineer and Open-Source Contributor with hands-on experience in <strong>backend development</strong> and <strong>DevOps</strong>. During my internship at WSO2, I contributed to developing robust backend services and microservices.
        </p>
        <p>
            I am skilled in <strong>Java Spring Boot</strong>, <strong>Go</strong>, and building RESTful APIs in cloud-native environments, with a proven proficiency in Data Analytics, UI/UX Design, and Competitive Programming recognized at the country level.
        </p>
      </div>

      <h2 className="text-2xl font-semibold border-b border-gh-border pb-3 mb-8">My Core Tech Stack</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Languages & Scripting */}
        <div className="space-y-4">
            <h3 className="flex items-center text-xl font-semibold">
                <Code size={24} className="text-gh-link mr-3" />
                Programming Languages
            </h3>
            <p className="text-gh-text-secondary">
                The languages I use to write clean, efficient, and scalable code.
            </p>
            <div className="flex flex-wrap gap-2">
                <SkillPill>Java</SkillPill>
                <SkillPill>TypeScript</SkillPill>
                <SkillPill>Go</SkillPill>
                <SkillPill>C++</SkillPill>
                <SkillPill>Ballerina</SkillPill>
            </div>
        </div>

        {/* Backend Development */}
        <div className="space-y-4">
            <h3 className="flex items-center text-xl font-semibold">
                <Server size={24} className="text-gh-link mr-3" />
                Backend Development
            </h3>
            <p className="text-gh-text-secondary">
                For crafting robust and scalable server-side logic and APIs.
            </p>
            <div className="flex flex-wrap gap-2">
                <SkillPill>Spring Boot</SkillPill>
                <SkillPill>Microservices</SkillPill>
                <SkillPill>RESTful APIs</SkillPill>
                <SkillPill>GraphQL</SkillPill>
                <SkillPill>WebSockets</SkillPill>
                <SkillPill>Kafka / MQTT</SkillPill>
                <SkillPill>gRPC</SkillPill>
            </div>
        </div>

        {/* Frontend & Mobile */}
        <div className="space-y-4">
            <h3 className="flex items-center text-xl font-semibold">
                <MonitorSmartphone size={24} className="text-gh-link mr-3" />
                Frontend & Mobile
            </h3>
            <p className="text-gh-text-secondary">
                Building intuitive user interfaces for web and mobile platforms.
            </p>
            <div className="flex flex-wrap gap-2">
                <SkillPill>React</SkillPill>
                <SkillPill>Next.js</SkillPill>
                <SkillPill>Angular</SkillPill>
                <SkillPill>Flutter</SkillPill>
                <SkillPill>Redux</SkillPill>
            </div>
        </div>

        {/* Databases & Storage */}
        <div className="space-y-4">
            <h3 className="flex items-center text-xl font-semibold">
                <Database size={24} className="text-gh-link mr-3" />
                Databases & Storage
            </h3>
            <p className="text-gh-text-secondary">
                Managing and persisting data with both relational and NoSQL solutions.
            </p>
            <div className="flex flex-wrap gap-2">
                <SkillPill>PostgreSQL</SkillPill>
                <SkillPill>MySQL</SkillPill>
                <SkillPill>MongoDB</SkillPill>
                <SkillPill>Redis</SkillPill>
                <SkillPill>Prisma ORM</SkillPill>
                <SkillPill>JPA / Hibernate</SkillPill>
            </div>
        </div>

        {/* DevOps & Cloud */}
        <div className="space-y-4">
            <h3 className="flex items-center text-xl font-semibold">
                <CloudCog size={24} className="text-gh-link mr-3" />
                DevOps & Cloud
            </h3>
            <p className="text-gh-text-secondary">
                Automating workflows and deploying applications in the cloud.
            </p>
            <div className="flex flex-wrap gap-2">
                <SkillPill>Docker</SkillPill>
                <SkillPill>Kubernetes (CKA)</SkillPill>
                <SkillPill>AWS (S3, EC2, Lambda)</SkillPill>
                <SkillPill>CI/CD</SkillPill>
                <SkillPill>Jenkins</SkillPill>
                <SkillPill>SonarQube</SkillPill>
                <SkillPill>Linux</SkillPill>
            </div>
        </div>

        {/* --- THIS IS THE UPDATED SECTION --- */}
        <div className="space-y-4">
            <h3 className="flex items-center text-xl font-semibold">
                {/* Using BrainCircuit icon as it closely matches the reference */}
                <BrainCircuit size={24} className="text-gh-link mr-3" />
                AI & Specialized Tools
            </h3>
            <p className="text-gh-text-secondary">
                Leveraging modern tools for specialized and intelligent features.
            </p>
            <div className="flex flex-wrap gap-2">
                <SkillPill>Gemma LLM</SkillPill>
                <SkillPill>NetSuite</SkillPill>
                <SkillPill>ARCore</SkillPill>
                <SkillPill>Selenium</SkillPill>
                <SkillPill>JUnit</SkillPill>
            </div>
        </div>

      </div>
    </div>
  );
}