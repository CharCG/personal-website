"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { githubProfile } from "@/data/socials";
import type { ContributionLevel, GitHubContributions } from "@/types/github";

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

    fetch("/api/github-contributions", { signal: controller.signal })
      .then((response) => response.json() as Promise<GitHubContributions>)
      .then(setContributions)
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
    <article className="min-w-0 max-w-full rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Open Sourcing
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] md:text-2xl">
            GitHub Contributions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {hasCalendar
              ? `${contributions?.totalContributions} contributions${period ? ` · ${period}` : ""}`
              : `Recent work from @${githubProfile.username}`}
          </p>
        </div>
        <Link
          href={githubProfile.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <FaGithub aria-hidden="true" />
          View Profile
          <FaArrowUpRightFromSquare
            className="text-xs transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div
        className="mt-8 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-2"
        role={hasCalendar ? "region" : undefined}
        aria-label={hasCalendar ? "Scrollable GitHub contribution calendar" : undefined}
        tabIndex={hasCalendar ? 0 : undefined}
      >
        {hasCalendar ? (
          <div className="flex w-max gap-1">
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
