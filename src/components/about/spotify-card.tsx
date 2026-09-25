"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { siSpotify } from "simple-icons";
import { BrandIcon } from "@/components/shared/brand-icon";
import type { SpotifyNowPlaying } from "@/types/spotify";

export function SpotifyCard() {
  const [nowPlaying, setNowPlaying] = useState<SpotifyNowPlaying | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<SpotifyNowPlaying>("/api/spotify", { signal: controller.signal })
      .then((response) => setNowPlaying(response.data))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const track = nowPlaying?.track;

  return (
    <article className="flex h-full min-h-72 flex-col rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">On Repeat</p>
          <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] md:text-2xl">Listening on Spotify</h2>
        </div>
        <BrandIcon icon={siSpotify} className="h-8 w-8 shrink-0" />
      </div>

      <div className="mt-auto pt-8">
        {track ? (
          <Link
            href={track.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl bg-secondary p-4 transition-colors duration-200 ease-out hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
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
                <BrandIcon icon={siSpotify} className="h-6 w-6" />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {nowPlaying.isPlaying ? "Now playing" : "Recently paused"}
              </span>
              <span className="mt-2 block truncate font-semibold">{track.title}</span>
              <span className="mt-2 block truncate text-sm text-muted-foreground">{track.artists}</span>
            </span>
            <FaArrowUpRightFromSquare
              className="shrink-0 text-sm transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ) : (
          <div className="flex min-h-24 items-center gap-4 rounded-2xl bg-secondary p-4">
            <Image
              src="/images/mascot/fallbacks/confused.png"
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 object-contain"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">Nothing playing right now.</p>
          </div>
        )}
      </div>
    </article>
  );
}
