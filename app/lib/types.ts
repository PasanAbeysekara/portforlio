export interface ContributionDay {
  contributionCount: number;
  date: string;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

export interface TotalCount {
  totalCount: number;
}

export interface Organization {
  name: string;
  avatarUrl: string;
  login: string;
}

export interface GithubProfileData {
  user: {
    contributionsCollection: ContributionsCollection;
    pullRequests: TotalCount;
    issues: TotalCount;
    organizations: Organization[];
  } | null;
}