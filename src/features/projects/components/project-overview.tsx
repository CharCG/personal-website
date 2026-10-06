import { TechnologyList } from '@/features/projects/components/technology-list';
import { Chip } from '@/shared/components/ui/chip';
import type { Project, ProjectStatus } from '@/shared/data/projects';

type ProjectOverviewProps = { project: Project };

const statusIndicatorClasses: Record<ProjectStatus, string> = {
  Completed: 'bg-success',
  'In Progress': 'bg-warning',
  Archived: 'bg-info',
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-lg font-semibold">Overview</h2>
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-muted-foreground">Type</dt>
          <dd className="text-right text-sm font-medium">{project.type}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-muted-foreground">Timeline</dt>
          <dd className="text-right font-mono text-sm font-medium">{project.timeline}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-muted-foreground">Status</dt>
          <dd>
            <Chip
              className="font-medium"
              icon={
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rounded-full ${statusIndicatorClasses[project.status]}`}
                />
              }
            >
              {project.status}
            </Chip>
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-border pt-6">
        <h2 className="text-lg font-semibold">Technology Stack</h2>
        <TechnologyList technologies={project.technologies} className="mt-4" />
      </div>
    </aside>
  );
}
