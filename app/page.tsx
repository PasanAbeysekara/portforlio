import type { GithubProfileData, Organization } from './lib/types'; // Import Organization type
import ProfileSidebar from './components/ProfileSidebar';
import FeaturedProjects from './components/FeaturedProjects';
import ContributionGraph from './components/ContributionGraph';
import { projects } from './data/projects';

async function getGithubProfileData(): Promise<GithubProfileData['user']> {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
  const GITHUB_PAT = process.env.GITHUB_PAT;

  if (!GITHUB_USERNAME || !GITHUB_PAT) {
    console.error("GitHub username or PAT is not configured in .env.local");
    return null;
  }

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
          # This part gets the repositories you've made pull requests to
          pullRequestContributionsByRepository(maxRepositories: 100) {
            repository {
              name
              owner {
                login
                avatarUrl
                ... on Organization {
                  name
                }
              }
            }
          }
        }
        pullRequests(first: 1) {
          totalCount
        }
        issues(first: 1) {
          totalCount
        }
      }
    }
  `;
  
  const to = new Date();
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  const variables = {
    username: GITHUB_USERNAME,
    from: from.toISOString(),
    to: to.toISOString(),
  };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${GITHUB_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(`GitHub API responded with ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = await response.json();
    if (data.errors) {
        console.error("GitHub API returned errors:", data.errors);
        return null;
    }
    
    // NEW: Post-processing to extract unique organizations
    const user = data.data.user;
    if (user && user.contributionsCollection) {
      const orgMap = new Map<string, Organization>();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user.contributionsCollection.pullRequestContributionsByRepository.forEach((contrib: any) => {
        const owner = contrib.repository.owner;
        if (owner.__typename === 'Organization' && !orgMap.has(owner.login)) {
          orgMap.set(owner.login, {
            login: owner.login,
            name: owner.name,
            avatarUrl: owner.avatarUrl,
          });
        }
      });
      
      user.organizations = Array.from(orgMap.values());
    }
    
    return user;
  } catch (error) {
    console.error("Failed to fetch GitHub profile data:", error);
    return null;
  }
}

export default async function HomePage() {
  const githubData = await getGithubProfileData();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4 md:min-w-[296px]">
        <ProfileSidebar stats={githubData} />
      </aside>
      <div className="w-full md:w-3/4">
        <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
        <FeaturedProjects projects={projects} />
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
            <ContributionGraph data={githubData?.contributionsCollection ?? null} />
        </div>
      </div>
    </div>
  );
}