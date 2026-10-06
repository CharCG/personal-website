import { NextResponse } from 'next/server';

import { getGitHubContributions } from '@/features/about/server/github-contributions';
import type { GitHubContributions } from '@/features/about/types/github';
import { githubContact } from '@/shared/data/contacts';

const unavailable: GitHubContributions = { totalContributions: 0, months: [], weeks: [] };

export async function GET() {
  if (!process.env.GITHUB_TOKEN) return NextResponse.json(unavailable);

  try {
    return NextResponse.json(await getGitHubContributions(githubContact.name));
  } catch {
    return NextResponse.json(unavailable);
  }
}
