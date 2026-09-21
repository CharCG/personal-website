import { FaArrowRight } from "react-icons/fa6";
import { homeProjects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-6 pt-16 md:px-6 md:pt-20 lg:px-8 lg:pt-24">
      <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Projects</p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] md:text-[28px] lg:text-4xl">Things I’ve Built</h2>
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

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {homeProjects.slice(0, 2).map((project, index) => (
          <Reveal key={project.slug} className="h-full" delay={index * 0.06}>
            <ProjectCard project={project} headingLevel="h4" />
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {homeProjects.slice(2, 5).map((project, index) => (
          <Reveal key={project.slug} className="h-full" delay={index * 0.06}>
            <ProjectCard project={project} headingLevel="h4" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
