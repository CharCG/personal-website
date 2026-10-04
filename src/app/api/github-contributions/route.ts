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
  async (): Promise<GitHubContributions> => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return unavailable;
    }

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
        variables: { login: githubContact.name },
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
      return unavailable;
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
  try {
    return NextResponse.json(await getGitHubContributions());
  } catch {
    return NextResponse.json(unavailable);
  }
}
