import { NextResponse } from 'next/server';

import { getRecentlyPlayed } from '@/features/about/server/spotify';
import type { SpotifyRecentlyPlayed } from '@/features/about/types/spotify';

const unavailable: SpotifyRecentlyPlayed = { tracks: [] };

export async function GET() {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET || !process.env.SPOTIFY_REFRESH_TOKEN)
    return NextResponse.json(unavailable);

  try {
    return NextResponse.json(await getRecentlyPlayed());
  } catch {
    return NextResponse.json(unavailable);
  }
}
