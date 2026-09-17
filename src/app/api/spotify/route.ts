import { NextResponse } from "next/server";
import type { SpotifyNowPlaying } from "@/types/spotify";

type SpotifyTokenResponse = {
  access_token?: string;
};

type SpotifyPlaybackResponse = {
  is_playing?: boolean;
  item?: {
    name?: string;
    artists?: Array<{ name?: string }>;
    external_urls?: { spotify?: string };
    album?: { images?: Array<{ url?: string }> };
  } | null;
};

const unavailable: SpotifyNowPlaying = {
  isPlaying: false,
  track: null,
};

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json(unavailable);
  }

  try {
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      return NextResponse.json(unavailable);
    }

    const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;
    if (!tokenData.access_token) {
      return NextResponse.json(unavailable);
    }

    const playbackResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
        cache: "no-store",
      },
    );

    if (playbackResponse.status === 204 || !playbackResponse.ok) {
      return NextResponse.json(unavailable);
    }

    const playback = (await playbackResponse.json()) as SpotifyPlaybackResponse;
    const item = playback.item;

    if (!item?.name || !item.external_urls?.spotify) {
      return NextResponse.json(unavailable);
    }

    return NextResponse.json<SpotifyNowPlaying>({
      isPlaying: Boolean(playback.is_playing),
      track: {
        title: item.name,
        artists: item.artists?.map((artist) => artist.name).filter(Boolean).join(", ") || "Spotify",
        albumImage: item.album?.images?.[0]?.url ?? null,
        href: item.external_urls.spotify,
      },
    });
  } catch {
    return NextResponse.json(unavailable);
  }
}
