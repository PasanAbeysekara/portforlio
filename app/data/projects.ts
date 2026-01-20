// app/data/projects.ts

export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  repoUrl:string;
  content: {
    readmePath?: string;
    demo: string;
    architecturePath?: string;
    challengesPath?: string;
  };
}

// Project data remains the same
export const projects: Project[] = [
    {
    slug: 'auto-trader-bot',
    name: 'Auto Trader Bot - Multi-User Trading Platform',
    description: 'A sophisticated autonomous cryptocurrency trading bot with multi-user support, real-time analytics, and comprehensive trade tracking. Built with Python, React, TypeScript, and WebSocket for real-time communication.',
    tags: ['React', 'TypeScript', 'Python', 'Flask', 'WebSocker', 'RESTful'],
    repoUrl: 'https://github.com/MoonCraze/auto-trader',
    content: {
        readmePath: `/readmes/readmes/auto-trader.md`, 
        demo: `
          <div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
            <iframe
              src="https://www.youtube.com/embed/VqvUTF7BMhM?si=IvcVt9kIxet19x09"
              title="Auto Trader Bot"
              style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>`, 
        architecturePath:  '/readmes/architectures/auto-trader-architecture.md', 
        challengesPath: '/readmes/challenges/auto-trader-challenges.md'
    },
  },
  {
    slug: 'kafka-avro-order-pipeline',
    name: 'Kafka Avro Order Pipeline',
    description: 'A real-time order processing system built with Apache Kafka, Spring Boot, and Avro serialization, featuring automatic retry logic, dead letter queue handling, and a live terminal-style monitoring dashboard.',
    tags: ['Kafka', 'Spring Boot', 'Java', 'Avro'],
    repoUrl: 'https://github.com/PasanAbeysekara/kafka-avro-order-pipeline',
    content: {
        readmePath: `/readmes/readmes/kafka-avro-order-pipeline.md`, 
        demo: `
          <div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
            <iframe
              src="https://www.youtube.com/embed/0eC0pr-4cmY?si=AC4RdNpU7asRLcbY"
              title="Kafka Avro Order Pipeline"
              style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>`, 
          architecturePath:  '/readmes/architectures/kafka-avro-order-pipeline-architecture.md', 
          challengesPath: '/readmes/challenges/kafka-avro-order-pipeline-challenges.md'
    },
  },
  {
    slug: 'collaborative-editor',
    name: 'Cloud-Native Real-time Collaborative Editor',
    description: 'A real-time text editor with operation-based synchronization, versioned concurrency control, and a decoupled microservice architecture.',
    tags: ['Go', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'gRPC'],
    repoUrl: 'https://github.com/PasanAbeysekara/collaborative-editor',
    content: {
      readmePath: '/readmes/readmes/collaborative-editor.md',
      demo: `
        <div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
          <iframe
            src="https://www.youtube.com/embed/9TVaHHAmx1Q?si=vOuRd4WjoRUvha41"
            title="Collaborative Editor Demo"
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `,
      architecturePath: '/readmes/architectures/collaborative-editor-architecture.md',
      challengesPath: '/readmes/challenges/collaborative-editor-challenges.md',
    },
  },
  {
    slug: 'dinefy-restaurant-reservation',
    name: 'DineFy - Online Restaurant Table Reservation System',
    description: 'A full-stack group project for STRATEC PARTNERS, featuring a Java backend, an Angular frontend, and a generative AI chat assistant.',
    tags: ['Java', 'Spring Boot', 'Angular 17', 'PostgreSQL', 'JPA', 'AWS RDS', 'JUnit'],
    repoUrl: 'https://github.com/PasanAbeysekara/dinefy-frontend',
    content: {
      readmePath: '/readmes/readmes/dinefy.md', 
      demo: `
        <div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
          <iframe
            src="https://www.youtube.com/embed/-oF4a-rKVJk?si=21mqj6hiTOZxvRqb"
            title="Dinefy Reservation System Demo"
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `, 
      architecturePath: '/readmes/architectures/dinefy-architecture.md', 
      challengesPath: '/readmes/challenges/dinefy-challenges.md'
    },
  },
  {
    slug: 'ar-visionary-explora',
    name: 'AR VISIONARY EXPLORA - Furniture E-Commerce App',
    description: 'A Flutter-based mobile application that uses ARCore to allow users to virtually preview furniture in their own space before buying.',
    tags: ['Flutter', 'ARCore', 'Firebase'],
    repoUrl: 'https://github.com/PasanAbeysekara/AR-VisionaryExplora',
    content: {
        readmePath: `/readmes/readmes/ar-visionary-explora.md`, 
        demo: `
          <div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
            <iframe
              src="https://www.youtube.com/embed/MbuzirsrJ4k?si=BvxnOCjbSJzfNEq2"
              title="AR visonary explora Demo"
              style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>`, 
        architecturePath: '/readmes/architectures/ar-visionary-explora-architecture.md', 
        challengesPath: '/readmes/challenges/ar-visionary-explora-challenges.md'
    },
  },
];

export const yourUsername = 'PasanAbeysekara';
// CUSTOMIZE the rest of your personal details if needed
export const yourEmail = 'pasankavindaabey@gmail.com';
export const yourName = 'Pasan Abeysekara'; // Inferred from GitHub
export const yourBio = 'Full-Stack Developer | Devops Enthusiast | Scalable Systems Advocate'; // A suggested bio
export const yourLocation = 'Colombo, Sri Lanka'; // Inferred from DineFy project
export const yourBlogUrl = '/blog'; // Internal blog link
export const yourLinkedInHandle = '/in/pasan-kavinda-abeysekara/'; // Update with your LinkedIn
export const yourLinkedInUrl = `https://linkedin.com${yourLinkedInHandle}`;
export const yourGithubUrl = "https://github.com/pasanAbeysekara";
export const yourYouTubeUrl = 'https://www.youtube.com/@pasan6209'; // Update with your YouTube channel
export const yourInstagramUrl = 'https://www.instagram.com/pasan_00/'; // Update with your Instagram
export const yourStackOverflowUrl = 'https://stackoverflow.com/users/13503639/pasan'; // Update with your StackOverflow