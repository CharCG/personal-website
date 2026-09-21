import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { TechnologyList } from "@/components/projects/technology-list";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h4";
};

function ProjectDetailLink({ project }: { project: Project }) {
  return (
    <>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project details`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      />
      <span className="pointer-events-none relative z-20 shrink-0 rounded-md p-1 text-xl transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-active:scale-95">
        <FaArrowRight aria-hidden="true" />
      </span>
    </>
  );
}

export function ProjectCard({ project, headingLevel = "h2" }: ProjectCardProps) {
  const Heading = headingLevel;
  const previewImage = project.images[0];

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-[border-color,transform] duration-200 ease-out hover:border-foreground/20 motion-safe:active:scale-[0.99]">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-secondary">
        {previewImage ? (
          <Image
            src={previewImage}
            alt={`${project.title} product preview`}
            fill
            sizes="(max-width: 1023px) calc(100vw - 80px), (max-width: 1279px) calc(50vw - 48px), 552px"
            className="object-cover transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <Image
              src="/images/mascot/fallbacks/confused.png"
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 object-contain transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.02]"
            />
            <p className="text-xs font-medium text-muted-foreground">Preview Unavailable</p>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Heading className="text-lg font-semibold leading-tight md:text-xl">{project.title}</Heading>
            <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">{project.role}</p>
          </div>
          <ProjectDetailLink project={project} />
        </div>

        {project.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        )}
        <TechnologyList technologies={project.technologies} className="mt-auto pt-4" />
      </div>
    </article>
  );
}
