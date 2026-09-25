"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { siMonkeytype } from "simple-icons";
import { BrandIcon } from "@/components/shared/brand-icon";
import type { MonkeytypeSummary } from "@/types/monkeytype";

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

  const hasPersonalBests = Boolean(summary?.timeBest || summary?.wordBest);

  return (
    <article className="flex h-full min-h-72 flex-col rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">At the Keyboard</p>
          <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] md:text-2xl">Monkeytype Stats</h2>
        </div>
        <BrandIcon icon={siMonkeytype} className="h-8 w-8 shrink-0" />
      </div>

      <div className="mt-auto pt-8">
        {hasPersonalBests && summary ? (
          <div className="rounded-2xl bg-secondary p-4">
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-muted-foreground">
                  Time{summary.timeBest ? ` · ${summary.timeBest.metric} sec` : ""}
                </dt>
                <dd className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-[-0.03em]">
                    {summary.timeBest ? Math.round(summary.timeBest.wpm) : "—"}
                  </span>
                  <span className="text-xs text-muted-foreground">WPM</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Words{summary.wordBest ? ` · ${summary.wordBest.metric} words` : ""}
                </dt>
                <dd className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-[-0.03em]">
                    {summary.wordBest ? Math.round(summary.wordBest.wpm) : "—"}
                  </span>
                  <span className="text-xs text-muted-foreground">WPM</span>
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="flex min-h-24 items-center justify-center rounded-2xl bg-secondary px-6 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">Typing stats are unavailable right now.</p>
          </div>
        )}
      </div>
    </article>
  );
}
