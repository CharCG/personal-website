import type { ContributionLevel, GitHubContributions } from '@/features/about/types/github';

type ContributionCalendarProps = { contributions: GitHubContributions };

const levelClassNames: Record<ContributionLevel, string> = {
  NONE: 'bg-secondary',
  FIRST_QUARTILE: 'bg-primary/25',
  SECOND_QUARTILE: 'bg-primary/45',
  THIRD_QUARTILE: 'bg-primary/70',
  FOURTH_QUARTILE: 'bg-primary',
};

export function ContributionCalendar({ contributions }: ContributionCalendarProps) {
  const calendarMonths = contributions.months
    .map((month) => ({
      ...month,
      start: contributions.weeks.findIndex((week) => week.firstDay >= month.firstDay),
    }))
    .filter((month) => month.start >= 0);

  return (
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
  );
}
