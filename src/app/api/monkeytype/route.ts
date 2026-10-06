import { NextResponse } from 'next/server';

import { getMonkeytypeSummary } from '@/features/about/server/monkeytype';
import type { MonkeytypeSummary } from '@/features/about/types/monkeytype';

const unavailable: MonkeytypeSummary = { personalBest: null, completedTests: null };

export async function GET() {
  if (!process.env.MONKEYTYPE_APE_KEY) return NextResponse.json(unavailable);

  try {
    return NextResponse.json(await getMonkeytypeSummary());
  } catch {
    return NextResponse.json(unavailable);
  }
}
