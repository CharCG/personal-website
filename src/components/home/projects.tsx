import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import {
  homeSelectedProjects,
  homePassionProjects,
  type Project,
} from "@/data/projects";

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

function ProjectTitle({ project }: { project: Project }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h4 className="text-lg font-semibold leading-tight md:text-xl">{project.title}</h4>
        <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">
          {project.role}
        </p>
      </div>
      <Link
        href={project.href}
        aria-label={`View ${project.title}`}
        className="shrink-0 rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <FaArrowUpRightFromSquare aria-hidden="true" />
      </Link>
    </div>
  );
}

function SelectedProjectCard({ project }: { project: Project }) {
  const image = project.images[0];
  if (!image) return null;

  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-surface p-4 md:grid-cols-[44%_1fr] md:gap-6">
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-secondary md:aspect-auto md:min-h-44">
        <Image
          src={image}
          alt={`${project.title} product preview`}
          fill
          sizes="(max-width: 767px) calc(100vw - 80px), 280px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col pt-6 md:py-2">
        <ProjectTitle project={project} />
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <TechnologyList technologies={project.technologies} />
      </div>
    </article>
  );
}

function PassionProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex min-h-48 flex-col rounded-2xl border border-border bg-surface p-6">
      <ProjectTitle project={project} />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
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
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Featured Works
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] md:text-[28px] lg:text-4xl">
            Things I’ve Built
          </h2>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            A collection of works that turn ideas into real, useful products.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex h-14 items-center gap-4 whitespace-nowrap rounded-2xl border border-border bg-surface px-6 text-sm font-medium"
        >
          View All Projects
          <FaArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold tracking-[-0.03em] md:text-2xl lg:text-[28px]">
          Recent Projects
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          A few highlighted works that showcase my experience in building useful and delightful
          products.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {homeSelectedProjects.map((project) => (
            <SelectedProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold tracking-[-0.03em] md:text-2xl lg:text-[28px]">
          Passion Projects
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
          Small ideas, big learning. A collection of side projects I build for fun.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {homePassionProjects.map((project) => (
            <PassionProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
