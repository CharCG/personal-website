"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { siMonkeytype } from "simple-icons";
import type { MonkeytypeSummary } from "@/features/about/types/monkeytype";
import { BrandIcon } from "@/shared/components/brand-icon";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { monkeytypeContact } from "@/shared/data/contacts";

function formatLanguage(language: string) {
  return language
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function MonkeytypeCard() {
  const [summary, setSummary] = useState<MonkeytypeSummary | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<MonkeytypeSummary>("/api/monkeytype", { signal: controller.signal })
      .then((response) => setSummary(response.data))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const personalBest = summary?.personalBest;

  return (
    <article className="flex h-full min-h-56 flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">On Typing</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">Monkeytype Stats</h2>
        </div>
        <ButtonLink href={monkeytypeContact.link} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
          <BrandIcon icon={siMonkeytype} className="h-4 w-4 shrink-0" />
          View Profile
        </ButtonLink>
      </div>

      {personalBest ? (
        <div className="mt-6 flex flex-1 flex-col justify-end">
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="font-mono text-4xl font-semibold leading-none tracking-[-0.04em]">
              {Math.round(personalBest.wpm)}
            </span>
            <span className="text-sm text-muted-foreground">WPM</span>
            <span className="w-full font-mono text-sm text-muted-foreground">
              {personalBest.duration} seconds · {formatLanguage(personalBest.language)}
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
            <div>
              <dt className="text-xs text-muted-foreground">Accuracy</dt>
              <dd className="mt-2 font-mono text-sm font-semibold">{Math.round(personalBest.accuracy)}%</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Consistency</dt>
              <dd className="mt-2 font-mono text-sm font-semibold">{Math.round(personalBest.consistency)}%</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Tests</dt>
              <dd className="mt-2 font-mono text-sm font-semibold">
                {summary.completedTests === null ? "—" : summary.completedTests.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="mt-6 flex flex-1 items-center border-t border-border pt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">Monkeytype typing stats are unavailable right now.</p>
        </div>
      )}
    </article>
  );
}
