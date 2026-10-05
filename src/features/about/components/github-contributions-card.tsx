"use client";

import { siGithub } from "simple-icons";
import { useWidgetData } from "@/features/about/hooks/use-widget-data";
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
  const { data: contributions, isLoading } = useWidgetData<GitHubContributions>("/api/github-contributions");

  const hasCalendar = Boolean(contributions?.weeks.length);
  // Adjacent months can share a week; summing API totalWeeks creates extra columns.
  const calendarMonths =
    contributions?.months
      .map((month) => ({
        ...month,
        start: contributions.weeks.findIndex((week) => week.firstDay >= month.firstDay),
      }))
      .filter((month) => month.start >= 0) ?? [];

  return (
    <article className="h-full min-w-0 max-w-full rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">On Vibing</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">GitHub Stats</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {hasCalendar
              ? `${contributions?.totalContributions} contributions this year`
              : `Recent work from @${githubContact.name}`}
          </p>
        </div>
        <ButtonLink href={githubContact.link} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
          <BrandIcon icon={siGithub} className="h-4 w-4 shrink-0" />
          View Profile
        </ButtonLink>
      </div>

      <div
        className="mt-6 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-md pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        role={hasCalendar ? "region" : undefined}
        aria-label={hasCalendar ? "GitHub contribution calendar" : undefined}
        tabIndex={hasCalendar ? 0 : undefined}
      >
        {hasCalendar && contributions ? (
          <div className="w-max">
            <div
              className="mb-2 grid gap-1"
              aria-label="Contribution calendar months"
              style={{ gridTemplateColumns: `repeat(${contributions.weeks.length}, calc(var(--spacing) * 3))` }}
            >
              {calendarMonths.map((month, index) => (
                <span
                  key={`${month.firstDay}-${month.year}`}
                  title={`${month.name} ${month.year}`}
                  className="min-w-0 overflow-hidden whitespace-nowrap text-xs text-muted-foreground"
                  style={{
                    gridColumn: `${month.start + 1} / ${(calendarMonths[index + 1]?.start ?? contributions.weeks.length) + 1}`,
                  }}
                >
                  {month.name.slice(0, 3)}
                </span>
              ))}
            </div>
            <div className="flex w-max gap-1">
              {contributions.weeks.map((week) => (
                <div key={week.firstDay} className="grid grid-rows-7 gap-1">
                  {week.contributionDays.map((day) => (
                    <span
                      key={day.date}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      className={`size-3 rounded-sm ${levelClassNames[day.contributionLevel]}`}
                      style={{ gridRow: new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="flex min-h-32 items-center justify-center rounded-2xl bg-secondary px-6 text-center"
            role={isLoading ? "status" : undefined}
          >
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {isLoading ? "Loading GitHub activity…" : "GitHub activity is unavailable right now."}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
