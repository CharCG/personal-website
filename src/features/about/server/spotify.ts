import 'server-only';

import axios from 'axios';
import { unstable_cache } from 'next/cache';

import type { SpotifyRecentlyPlayed } from '@/features/about/types/spotify';

type SpotifyTokenResponse = {
  access_token?: string;
};

type SpotifyRecentlyPlayedResponse = {
  items?: Array<{
    track?: {
      name?: string;
      artists?: Array<{ name?: string }>;
      external_urls?: { spotify?: string };
      album?: { images?: Array<{ url?: string }> };
    } | null;
  }>;
};

export const getRecentlyPlayed = unstable_cache(
  async (): Promise<SpotifyRecentlyPlayed> => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('Spotify credentials are not configured');
    }

    const tokenResponse = await axios.post<SpotifyTokenResponse>(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        timeout: 10_000,
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const tokenData = tokenResponse.data;
    if (!tokenData.access_token) {
      throw new Error('Spotify access token is unavailable');
    }

    const recentResponse = await axios.get<SpotifyRecentlyPlayedResponse>(
      'https://api.spotify.com/v1/me/player/recently-played',
      {
        timeout: 10_000,
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
        params: { limit: 3 },
      },
    );

    if (!Array.isArray(recentResponse.data.items)) {
      throw new Error('Spotify recently played data is unavailable');
    }

    const tracks = recentResponse.data.items.flatMap(({ track }) => {
      if (!track?.name || !track.external_urls?.spotify) return [];

      return [
        {
          title: track.name,
          artists:
            track.artists
              ?.map((artist) => artist.name)
              .filter(Boolean)
              .join(', ') || 'Spotify',
          albumImage: track.album?.images?.[0]?.url ?? null,
          href: track.external_urls.spotify,
        },
      ];
    });

    return { tracks };
  },
  ['spotify-recently-played'],
  { revalidate: 3600 },
);
