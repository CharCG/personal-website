import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h4";
};

export function ProjectDetailLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View ${project.title} project details`}
      className="shrink-0 rounded-md p-1 text-xl transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <FaArrowRight aria-hidden="true" />
    </Link>
  );
}

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

export function ProjectCard({ project, headingLevel = "h2" }: ProjectCardProps) {
  const Heading = headingLevel;
  const previewImage = project.images[0];

  return (
    <article className="group grid h-full min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-[border-color,transform] duration-300 ease-out hover:border-foreground/20 motion-safe:active:scale-[0.99] md:grid-cols-[44%_1fr] md:gap-6">
      <div className="relative flex aspect-[3/2] min-h-40 items-center justify-center overflow-hidden rounded-xl bg-secondary md:aspect-auto md:min-h-44">
        {previewImage ? (
          <Image
            src={previewImage}
            alt={`${project.title} product preview`}
            fill
            sizes="(max-width: 767px) calc(100vw - 80px), 280px"
            className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <Image
              src="/images/mascot/fallbacks/confused.png"
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.02]"
            />
            <p className="text-xs font-medium text-muted-foreground">Preview Unavailable</p>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col pt-6 md:py-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Heading className="text-lg font-semibold leading-tight md:text-xl">
              {project.title}
            </Heading>
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
      </div>
    </article>
  );
}
