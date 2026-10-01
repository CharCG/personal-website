"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { siGithub } from "simple-icons";
import type { ContributionLevel, GitHubContributions } from "@/features/about/types/github";
import { BrandIcon } from "@/shared/components/brand-icon";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { githubContact } from "@/shared/data/contacts";

const levelClassNames: Record<ContributionLevel, string> = {
  NONE: "bg-secondary",
  FIRST_QUARTILE: "bg-primary/25",
  SECOND_QUARTILE: "bg-primary/45",
  THIRD_QUARTILE: "bg-primary/70",
  FOURTH_QUARTILE: "bg-primary",
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
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  });
  const period =
    contributions?.startedAt && contributions.endedAt
      ? `${dateFormatter.format(new Date(contributions.startedAt))} – ${dateFormatter.format(
          new Date(contributions.endedAt),
        )}`
      : null;

  return (
    <article className="h-full min-w-0 max-w-full rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Open Sourcing</p>
          <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] md:text-2xl">GitHub Contributions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {hasCalendar
              ? `${contributions?.totalContributions} contributions${period ? ` · ${period}` : ""}`
              : `Recent work from @${githubContact.name}`}
          </p>
        </div>
        <ButtonLink href={githubContact.link} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
          <BrandIcon icon={siGithub} className="h-4 w-4 shrink-0" />
          View Profile
        </ButtonLink>
      </div>

      <div
        className="mt-6 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain"
        role={hasCalendar ? "region" : undefined}
        aria-label={hasCalendar ? "Scrollable GitHub contribution calendar" : undefined}
        tabIndex={hasCalendar ? 0 : undefined}
      >
        {hasCalendar ? (
          <div className="w-max">
            <div className="mb-2 flex gap-1" aria-label="Contribution calendar months">
              {contributions?.months.map((month) => (
                <span
                  key={`${month.firstDay}-${month.year}`}
                  title={`${month.name} ${month.year}`}
                  className="shrink-0 whitespace-nowrap text-xs text-muted-foreground"
                  style={{ width: `${month.totalWeeks * 16 - 4}px` }}
                >
                  {month.name.slice(0, 3)}
                </span>
              ))}
            </div>
            <div className="flex gap-1">
              {contributions?.weeks.map((week) => (
                <div key={week.firstDay} className="grid gap-1">
                  {week.contributionDays.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      aria-label={`${day.contributionCount} contributions on ${day.date}`}
                      className={`h-3 w-3 rounded-sm ${levelClassNames[day.contributionLevel]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-32 items-center justify-center rounded-2xl bg-secondary px-6 text-center">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              GitHub activity is unavailable right now.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
