import { FaArrowRight } from "react-icons/fa6";
import { ProjectCard } from "@/features/projects/components/project-card";
import { homeProjects } from "@/shared/data/projects";
import { motionStagger } from "@/shared/motion/config";
import { Reveal } from "@/shared/motion/reveal";
import { ButtonLink } from "@/shared/components/ui/button-link";

export function ProjectsSection() {
  const featuredProject = homeProjects[0];
  const otherProjects = homeProjects.slice(1, 5);

  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-6 pt-12 md:px-6 md:pt-16 lg:px-8 lg:pt-20">
      <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Projects</p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] md:text-[28px] lg:text-4xl">
            Things I’ve <span className="font-accent font-normal tracking-normal">Built</span>
          </h2>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            A collection of works that turn ideas into real and useful products.
          </p>
        </div>
        <ButtonLink href="/projects" variant="primary" size="sm" className="whitespace-nowrap">
          View All Projects
          <FaArrowRight
            aria-hidden="true"
            className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
          />
        </ButtonLink>
      </Reveal>

      {featuredProject && (
        <Reveal className="mt-10" delay={motionStagger}>
          <ProjectCard project={featuredProject} headingLevel="h3" variant="featured" />
        </Reveal>
      )}

      <div className={`${featuredProject ? "mt-4" : "mt-10"} grid gap-4 md:grid-cols-2`}>
        {otherProjects.map((project, index) => (
          <Reveal key={project.slug} className="h-full" delay={index * motionStagger}>
            <ProjectCard project={project} headingLevel="h3" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
