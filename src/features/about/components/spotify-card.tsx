"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { siSpotify } from "simple-icons";
import type { SpotifyRecentlyPlayed } from "@/features/about/types/spotify";
import { BrandIcon } from "@/shared/components/brand-icon";

export function SpotifyCard() {
  const [recentlyPlayed, setRecentlyPlayed] = useState<SpotifyRecentlyPlayed | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<SpotifyRecentlyPlayed>("/api/spotify", { signal: controller.signal })
      .then((response) => setRecentlyPlayed(response.data))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const tracks = recentlyPlayed?.tracks ?? [];

  return (
    <article className="flex h-full min-h-56 flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">On Listening</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">Recently Listening</h2>
        </div>
        <BrandIcon icon={siSpotify} className="h-8 w-8 shrink-0" />
      </div>

      <div className="mt-6">
        {tracks.length > 0 ? (
          <ul
            className="max-h-36 space-y-2 overflow-y-auto overscroll-y-contain pr-2"
            aria-label="Recently played songs"
            tabIndex={0}
          >
            {tracks.map((track, index) => (
              <li key={`${track.href}-${index}`}>
                <Link
                  href={track.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-4 rounded-lg py-2 transition-opacity duration-200 ease-out hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {track.albumImage ? (
                    <Image
                      src={track.albumImage}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border">
                      <BrandIcon icon={siSpotify} className="h-5 w-5" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{track.title}</span>
                    <span className="mt-1 block truncate text-xs text-muted-foreground">{track.artists}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex min-h-24 items-center">
            <p className="text-sm leading-relaxed text-muted-foreground">Spotify recent listening is unavailable right now.</p>
          </div>
        )}
      </div>
    </article>
  );
}
