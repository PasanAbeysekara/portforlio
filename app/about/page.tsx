import { yourName } from '../data/projects';

export const metadata = { title: `About - ${yourName}` };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold border-b border-gh-border pb-4 mb-6">About Me</h1>
      <div className="prose prose-invert lg:prose-xl text-gh-text space-y-4">
        {/* CUSTOMIZE: Your about me content */}
        <p>
          I am a passionate software engineer with a knack for building elegant and efficient solutions. My journey into tech started with a fascination for how things work, which quickly evolved into a love for coding and problem-solving.
        </p>
        <p>
          Over the years, I've honed my skills in both front-end and back-end development, working with a diverse range of technologies including Python (Django, Flask), JavaScript (React, Next.js, Node.js), and various database systems. I'm a firm believer in clean code, robust architecture, and continuous learning.
        </p>
        <p>
          When I'm not coding, you can find me exploring hiking trails, contributing to open-source projects, or diving into a good sci-fi novel.
        </p>
      </div>
    </div>
  );
}