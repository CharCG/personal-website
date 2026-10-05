import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import axios from "axios";
import type { GitHubContributions } from "@/features/about/types/github";
import { githubContact } from "@/shared/data/contacts";

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          months: GitHubContributions["months"];
          weeks: GitHubContributions["weeks"];
        };
      };
    } | null;
  };
};

const unavailable: GitHubContributions = {
  totalContributions: 0,
  months: [],
  weeks: [],
};

const getGitHubContributions = unstable_cache(
  async (login: string): Promise<GitHubContributions> => {
    const token = process.env.GITHUB_TOKEN;

    const response = await axios.post<GitHubGraphQLResponse>(
      "https://api.github.com/graphql",
      {
        query: `
            query Contributions($login: String!) {
              user(login: $login) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    months {
                      firstDay
                      name
                      totalWeeks
                      year
                    }
                    weeks {
                      firstDay
                      contributionDays {
                        date
                        contributionCount
                        contributionLevel
                      }
                    }
                  }
                }
              }
            }
          `,
        variables: { login },
      },
      {
        timeout: 10_000,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "charles-portfolio",
        },
      },
    );

    const result = response.data;
    const collection = result.data?.user?.contributionsCollection;

    if (!collection) {
      throw new Error("GitHub contribution data is unavailable");
    }

    return {
      totalContributions: collection.contributionCalendar.totalContributions,
      months: collection.contributionCalendar.months,
      weeks: collection.contributionCalendar.weeks,
    };
  },
  ["github-contributions"],
  { revalidate: 3600 },
);

export async function GET() {
  if (!process.env.GITHUB_TOKEN) return NextResponse.json(unavailable);

  try {
    return NextResponse.json(await getGitHubContributions(githubContact.name));
  } catch {
    return NextResponse.json(unavailable);
  }
}
