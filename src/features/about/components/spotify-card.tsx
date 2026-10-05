"use client";

import Image from "next/image";
import Link from "next/link";
import { siSpotify } from "simple-icons";
import { useWidgetData } from "@/features/about/hooks/use-widget-data";
import type { SpotifyRecentlyPlayed } from "@/features/about/types/spotify";
import { BrandIcon } from "@/shared/components/brand-icon";

export function SpotifyCard() {
  const { data: recentlyPlayed, isLoading } = useWidgetData<SpotifyRecentlyPlayed>("/api/spotify");

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

      <div className="mt-auto pt-6">
        {isLoading ? (
          <div className="flex min-h-24 items-center" role="status">
            <p className="text-sm leading-relaxed text-muted-foreground">Loading recent songs…</p>
          </div>
        ) : tracks.length > 0 ? (
          <ul
            className="space-y-2 py-2 md:max-h-36 md:scroll-py-2 md:overflow-y-auto md:overscroll-y-contain md:pr-2"
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
            <p className="text-sm leading-relaxed text-muted-foreground">
              Spotify recent listening is unavailable right now.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
