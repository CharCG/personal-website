"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaSpotify } from "react-icons/fa6";
import type { SpotifyNowPlaying } from "@/types/spotify";

export function SpotifyCard() {
  const [nowPlaying, setNowPlaying] = useState<SpotifyNowPlaying | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/spotify", { signal: controller.signal })
      .then((response) => response.json() as Promise<SpotifyNowPlaying>)
      .then(setNowPlaying)
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const track = nowPlaying?.track;

  return (
    <article className="flex min-h-72 flex-col rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            On Repeat
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] md:text-2xl">
            Listening on Spotify
          </h2>
        </div>
        <FaSpotify className="shrink-0 text-3xl" aria-hidden="true" />
      </div>

      <div className="mt-auto pt-8">
        {track ? (
          <Link
            href={track.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl bg-secondary p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {track.albumImage ? (
              <Image
                src={track.albumImage}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface">
                <FaSpotify className="text-2xl" aria-hidden="true" />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {nowPlaying.isPlaying ? "Now playing" : "Recently paused"}
              </span>
              <span className="mt-1 block truncate font-semibold">{track.title}</span>
              <span className="mt-1 block truncate text-sm text-muted-foreground">
                {track.artists}
              </span>
            </span>
            <FaArrowUpRightFromSquare className="shrink-0 text-sm" aria-hidden="true" />
          </Link>
        ) : (
          <div className="flex min-h-24 items-center gap-4 rounded-2xl bg-secondary p-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface">
              <FaSpotify className="text-2xl" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Nothing playing right now.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
