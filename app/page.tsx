import { projects } from './data/projects';
import ProfileSidebar from './components/ProfileSidebar';
import FeaturedProjects from './components/FeaturedProjects';
import ContributionGraph from './components/ContributionGraph';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4 md:min-w-[296px]">
        <ProfileSidebar />
      </aside>
      <div className="w-full md:w-3/4">
        <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
        <FeaturedProjects projects={projects} />
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
            <ContributionGraph />
        </div>
      </div>
    </div>
  );
}