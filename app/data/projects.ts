// app/data/projects.ts

export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl:string;
  content: {
    readme: string;
    demo: string;
    architecture: string;
    challenges: string;
  };
}

// Project data remains the same
export const projects: Project[] = [
  {
    slug: 'collaborative-editor',
    name: 'Cloud-Native Real-time Collaborative Editor',
    description: 'A real-time text editor with operation-based synchronization, versioned concurrency control, and a decoupled microservice architecture.',
    tags: ['Go', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'gRPC'],
    demoUrl: '#',
    repoUrl: 'https://github.com/PasanAbeysekara/collaborative-editor',
    content: {
      readme: `
# Cloud-Native Real-time Collaborative Editor
This project provides a powerful, real-time collaborative editing experience, similar to Google Docs, built on a robust cloud-native backend.
## Key Features
*   **Real-time Engine**: Utilizes an operation-based synchronization model to ensure all users see a consistent state.
*   **Versioned Concurrency Control**: Manages simultaneous edits from multiple users effectively.
*   **Secure Authentication**: Implements JWT for secure authentication and ACL-based sharing.
*   **Hybrid Persistence**: Leverages Redis for high-speed caching and PostgreSQL for durable storage.
*   **Observability**: Integrated with the Prometheus/Grafana/Loki stack for comprehensive monitoring.
`,
      demo: '<img src="https://via.placeholder.com/600x400.gif?text=Real-time+Editor+Demo" alt="Collaborative Editor Demo">',
      architecture: `
## Architecture Overview
The system is designed as a **cloud-native microservice architecture** orchestrated by Kubernetes. It features decoupled services exposed via a central API Gateway.
`,
      challenges: `
## Challenges & Solutions
*   **Challenge**: Ensuring data consistency and low latency with multiple concurrent users.
    *   **Solution**: Implemented an operation-based synchronization algorithm over WebSockets.
*   **Challenge**: Balancing performance with data durability.
    *   **Solution**: Adopted a hybrid persistence model using both Redis and PostgreSQL.
`,
    },
  },
  // ... other projects remain the same ...
  {
    slug: 'dinefy-restaurant-reservation',
    name: 'DineFy - Online Restaurant Table Reservation System',
    description: 'A full-stack group project for STRATEC PARTNERS, featuring a Java backend, an Angular frontend, and a generative AI chat assistant.',
    tags: ['Java', 'Spring Boot', 'Angular 17', 'PostgreSQL', 'JPA', 'AWS RDS', 'JUnit'],
    demoUrl: '#',
    repoUrl: 'https://github.com/PasanAbeysekara/dinefy-frontend',
    content: {
      readme: `...`, demo: `...`, architecture: `...`, challenges: `...`
    },
  },
  {
    slug: 'mou-management-system',
    name: 'Memorandum of Understanding Management System - UOJ',
    description: 'A full-stack application for managing MoUs, featuring submission workflows, approvals, location mapping, and real-time updates.',
    tags: ['Next.js', 'TypeScript', 'NextAuth.js', 'Prisma', 'MySQL', 'Aiven.io'],
    demoUrl: '#',
    repoUrl: 'https://github.com/PasanAbeysekara/mou-management-system',
    content: {
        readme: `...`, demo: `...`, architecture: `...`, challenges: `...`
    },
  },
  {
    slug: 'ar-visionary-explora',
    name: 'AR VISIONARY EXPLORA - Furniture E-Commerce App',
    description: 'A Flutter-based mobile application that uses ARCore to allow users to virtually preview furniture in their own space before buying.',
    tags: ['Flutter', 'ARCore', 'Firebase'],
    demoUrl: '#',
    repoUrl: 'https://github.com/PasanAbeysekara/AR-VisionaryExplora',
    content: {
        readme: `...`, demo: `...`, architecture: `...`, challenges: `...`
    },
  },
];

export const yourUsername = 'PasanAbeysekara';
// CUSTOMIZE the rest of your personal details if needed
export const yourEmail = 'pasankavindaabey@gmail.com';
export const yourName = 'Pasan Abeysekara'; // Inferred from GitHub
export const yourBio = 'Full-Stack Developer | Devops Enthusiast | Scalable Systems Advocate'; // A suggested bio
export const yourLocation = 'Colombo, Sri Lanka'; // Inferred from DineFy project
export const yourBlogUrl = 'https://pasankavi.medium.com/'; // Update with your blog/website
export const yourLinkedInHandle = '/in/pasan-kavinda-abeysekara/'; // Update with your LinkedIn
export const yourLinkedInUrl = `https://linkedin.com${yourLinkedInHandle}`;
export const yourGithubUrl = "https://github.com/pasanAbeysekara"