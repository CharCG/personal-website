'use client';

import { siGithub } from 'simple-icons';

import { ContributionCalendar } from '@/features/about/components/contribution-calendar';
import { useWidgetData } from '@/features/about/hooks/use-widget-data';
import type { GitHubContributions } from '@/features/about/types/github';
import { BrandIcon } from '@/shared/components/brand-icon';
import { ButtonLink } from '@/shared/components/ui/button-link';
import { githubContact } from '@/shared/data/contacts';

export function GitHubContributionsCard() {
  const { data: contributions, isLoading } = useWidgetData<GitHubContributions>('/api/github-contributions');

  const hasCalendar = Boolean(contributions?.weeks.length);
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
        role={hasCalendar ? 'region' : undefined}
        aria-label={hasCalendar ? 'GitHub contribution calendar' : undefined}
        tabIndex={hasCalendar ? 0 : undefined}
      >
        {hasCalendar && contributions ? (
          <ContributionCalendar contributions={contributions} />
        ) : (
          <div
            className="flex min-h-32 items-center justify-center rounded-2xl bg-secondary px-6 text-center"
            role={isLoading ? 'status' : undefined}
          >
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {isLoading ? 'Loading GitHub activity…' : 'GitHub activity is unavailable right now.'}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
