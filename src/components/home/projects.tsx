import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import {
  homeRecentProjects,
  homePassionProjects,
  type Project,
} from "@/data/projects";
import { ProjectCard, ProjectDetailLink } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";

function TechnologyList({ technologies }: Pick<Project, "technologies">) {
  return (
    <ul className="mt-auto flex flex-wrap gap-2 pt-4" aria-label="Technologies used">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-full bg-secondary px-4 py-2 text-xs text-foreground"
        >
          {technology}
        </li>
      ))}
    </ul>
  );
}

function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full min-h-48 flex-col rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-300 ease-out hover:border-foreground/20 motion-safe:active:scale-[0.99]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="text-lg font-semibold leading-tight md:text-xl">{project.title}</h4>
          <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">
            {project.role}
          </p>
        </div>
        <ProjectDetailLink project={project} />
      </div>
      {project.description && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      )}
      <TechnologyList technologies={project.technologies} />
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1200px] px-6 pt-16 md:px-6 md:pt-20 lg:px-8 lg:pt-24"
    >
      <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Featured Works
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] md:text-[28px] lg:text-4xl">
            Things I’ve Built
          </h2>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            A collection of works that turn ideas into real and useful products.
          </p>
        </div>
        <Link
          href="/projects"
          className="group inline-flex h-14 items-center gap-4 whitespace-nowrap rounded-2xl border border-border bg-surface px-6 text-sm font-medium transition-colors duration-200 hover:border-foreground/20"
        >
          View All Projects
          <FaArrowRight
            aria-hidden="true"
            className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
          />
        </Link>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {homeRecentProjects.map((project, index) => (
          <Reveal key={project.slug} className="h-full" delay={index * 0.06}>
            <ProjectCard project={project} headingLevel="h4" />
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {homePassionProjects.map((project, index) => (
          <Reveal key={project.slug} className="h-full" delay={index * 0.06}>
            <CompactProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
