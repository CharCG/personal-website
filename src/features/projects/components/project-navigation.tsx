import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import type { Project } from '@/shared/data/projects';
import { Reveal } from '@/shared/motion/reveal';

type ProjectNavigationProps = {
  previousProject: Project | null;
  nextProject: Project | null;
};

export function ProjectNavigation({ previousProject, nextProject }: ProjectNavigationProps) {
  return (
    <Reveal className="mt-12 md:mt-16 lg:mt-20">
      <nav aria-label="Project navigation" className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {previousProject && (
          <Link
            href={`/projects/${previousProject.slug}`}
            className="group flex min-h-28 items-center gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <FaArrowLeft
              aria-hidden="true"
              className="shrink-0 text-lg transition-transform duration-200 ease-out motion-safe:group-hover:-translate-x-1"
            />
            <span className="flex min-w-0 flex-1 flex-col items-start">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Previous Project
              </span>
              <span className="mt-2 text-xl font-semibold tracking-[-0.03em]">{previousProject.title}</span>
            </span>
          </Link>
        )}

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className={`group flex min-h-28 items-center gap-4 rounded-2xl border border-border bg-surface p-6 text-right transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${
              previousProject ? '' : 'sm:col-start-2'
            }`}
          >
            <span className="flex min-w-0 flex-1 flex-col items-end">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Next Project
              </span>
              <span className="mt-2 text-xl font-semibold tracking-[-0.03em]">{nextProject.title}</span>
            </span>
            <FaArrowRight
              aria-hidden="true"
              className="shrink-0 text-lg transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
            />
          </Link>
        )}
      </nav>
    </Reveal>
  );
}
