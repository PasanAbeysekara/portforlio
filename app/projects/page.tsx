import FeaturedProjects from '../components/FeaturedProjects';
import { projects } from '../data/projects';

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-b border-gh-border pb-4 mb-6">
        <h1 className="text-3xl font-bold">More Projects</h1>
        <p className="text-gh-text-secondary mt-2">
          A comprehensive collection of my software engineering projects, ranging from cloud-native systems to full-stack applications.
        </p>
      </div>
      <FeaturedProjects projects={projects} showAll={true} />
    </div>
  );
}
