import Image from 'next/image';
import Link from 'next/link';
import { GithubProfileData } from '../lib/types';

interface ProfileStatsProps {
  stats: GithubProfileData['user'];
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  if (!stats) return null;

  const orgs = stats.organizations;

  return (
    <div className="mt-4">
      {orgs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gh-border">
          <h3 className="text-base font-semibold mb-2">Organizations</h3>
          <div className="flex flex-wrap gap-2">
            {orgs.map(org => (
              <Link href={`https://github.com/${org.login}`} key={org.login} target="_blank" title={org.name}>
                <Image
                  src={org.avatarUrl}
                  alt={org.name}
                  width={32}
                  height={32}
                  className="rounded-full border border-gh-border hover:border-gh-border-active transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}