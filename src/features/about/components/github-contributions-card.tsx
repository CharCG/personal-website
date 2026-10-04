"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { siGithub } from "simple-icons";
import type { ContributionLevel, GitHubContributions } from "@/features/about/types/github";
import { BrandIcon } from "@/shared/components/brand-icon";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { githubContact } from "@/shared/data/contacts";
import { CountUp } from "@/shared/motion/count-up";

const levelClassNames: Record<ContributionLevel, string> = {
  NONE: "border-border bg-secondary/30",
  FIRST_QUARTILE: "border-primary/10 bg-primary/5",
  SECOND_QUARTILE: "border-primary/15 bg-primary/10",
  THIRD_QUARTILE: "border-primary/20 bg-primary/15",
  FOURTH_QUARTILE: "border-primary/25 bg-primary/20",
};

export function GitHubContributionsCard() {
  const [contributions, setContributions] = useState<GitHubContributions | null>(null);
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<GitHubContributions>("/api/github-contributions", { signal: controller.signal })
      .then((response) => setContributions(response.data))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const hasCalendar = Boolean(contributions?.weeks.length);

  return (
    <article className="relative isolate flex h-full min-h-56 min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6">
      {hasCalendar && (
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-end overflow-hidden p-2 opacity-40" aria-hidden="true">
          <div className="flex w-max shrink-0 gap-2">
            {contributions?.weeks.map((week) => (
              <div key={week.firstDay} className="grid grid-rows-7 gap-2">
                {week.contributionDays.map((day) => (
                  <span
                    key={day.date}
                    className={`size-6 rounded-md border ${levelClassNames[day.contributionLevel]}`}
                    style={{ gridRow: new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">On Vibing</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">GitHub Stats</h2>
        </div>
        <ButtonLink href={githubContact.link} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
          <BrandIcon icon={siGithub} className="h-4 w-4 shrink-0" />
          View Profile
        </ButtonLink>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-end">
        {hasCalendar && contributions ? (
          <>
            <p className="font-mono text-4xl font-semibold leading-none tracking-[-0.04em] md:text-5xl">
              <CountUp to={contributions.totalContributions} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">contributions this year.</p>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">GitHub activity is unavailable right now.</p>
        )}
      </div>
    </article>
  );
}
