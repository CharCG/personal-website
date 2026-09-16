import { NextResponse } from "next/server";
import { githubProfile } from "@/data/socials";
import type { GitHubContributions } from "@/types/github";

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        startedAt: string;
        endedAt: string;
        contributionCalendar: {
          totalContributions: number;
          weeks: GitHubContributions["weeks"];
        };
      };
    } | null;
  };
};

const unavailable: GitHubContributions = {
  totalContributions: 0,
  startedAt: null,
  endedAt: null,
  weeks: [],
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(unavailable);
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "charles-portfolio",
      },
      body: JSON.stringify({
        query: `
          query Contributions($login: String!) {
            user(login: $login) {
              contributionsCollection {
                startedAt
                endedAt
                contributionCalendar {
                  totalContributions
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
        variables: { login: githubProfile.username },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(unavailable);
    }

    const result = (await response.json()) as GitHubGraphQLResponse;
    const collection = result.data?.user?.contributionsCollection;

    if (!collection) {
      return NextResponse.json(unavailable);
    }

    return NextResponse.json<GitHubContributions>({
      totalContributions: collection.contributionCalendar.totalContributions,
      startedAt: collection.startedAt,
      endedAt: collection.endedAt,
      weeks: collection.contributionCalendar.weeks,
    });
  } catch {
    return NextResponse.json(unavailable);
  }
}
