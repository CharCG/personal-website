export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
};

export type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[];
};

export type GitHubContributions = {
  totalContributions: number;
  startedAt: string | null;
  endedAt: string | null;
  weeks: ContributionWeek[];
};
