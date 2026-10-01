import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaCode, FaGlobe } from "react-icons/fa6";
import { ProjectGallery } from "@/features/projects/components/project-gallery";
import { TechnologyList } from "@/features/projects/components/technology-list";
import { getProjectBySlug, projects, type ProjectStatus } from "@/shared/data/projects";
import { Footer } from "@/shared/components/layout/footer";
import { Navbar } from "@/shared/components/layout/navbar";
import { Reveal } from "@/shared/motion/reveal";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Chip } from "@/shared/components/ui/chip";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const statusIndicatorClasses: Record<ProjectStatus, string> = {
  Completed: "bg-success",
  "In Progress": "bg-warning",
  Archived: "bg-info",
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Charles`,
    description: project.description || `View the details about the ${project.title} project.`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const projectIndex = projects.indexOf(project);
  const previousProject = projects[projectIndex - 1] ?? null;
  const nextProject = projects[projectIndex + 1] ?? null;
  const hasAbout = project.about.trim().length > 0;
  const keyFeatures = project.keyFeatures.filter((feature) => feature.trim().length > 0);
  const hasProjectContent = hasAbout || keyFeatures.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-[1200px] px-6 pt-32 md:px-6 md:pt-40 lg:px-8">
          <Reveal>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              <FaArrowLeft
                aria-hidden="true"
                className="transition-transform duration-200 ease-out motion-safe:group-hover:-translate-x-1"
              />
              Back to Projects
            </Link>
          </Reveal>

          <Reveal className="mt-8">
            <header className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-16">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">{project.role}</p>
                <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.description}
                  </p>
                )}
              </div>

              {(project.repositoryLink || project.demoLink) && (
                <div className="flex flex-wrap gap-4 lg:self-start">
                  {project.repositoryLink && (
                    <ButtonLink
                      href={project.repositoryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                    >
                      <FaCode aria-hidden="true" />
                      Repository
                    </ButtonLink>
                  )}
                  {project.demoLink && (
                    <ButtonLink href={project.demoLink} target="_blank" rel="noopener noreferrer" size="sm">
                      <FaGlobe aria-hidden="true" />
                      Demo
                    </ButtonLink>
                  )}
                </div>
              )}
            </header>
          </Reveal>

          <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Reveal>
              <section aria-label={`${project.title} previews`}>
                {project.images.length > 0 ? (
                  <ProjectGallery projectTitle={project.title} images={project.images} />
                ) : (
                  <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
                    <Image
                      src="/images/mascot/fallbacks/confused.png"
                      alt=""
                      width={128}
                      height={128}
                      className="h-32 w-32 object-contain"
                    />
                    <p className="text-sm font-medium text-muted-foreground">Preview Unavailable</p>
                  </div>
                )}
              </section>
            </Reveal>

            <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold">Overview</h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">Type</dt>
                  <dd className="text-right text-sm font-medium">{project.type}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">Timeline</dt>
                  <dd className="text-right text-sm font-medium">{project.timeline}</dd>
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
          </div>

          {hasProjectContent && (
            <Reveal className="mt-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  {hasAbout && (
                    <section aria-labelledby="about-project">
                      <h2 id="about-project" className="text-2xl font-semibold tracking-[-0.03em]">
                        About
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.about}</p>
                    </section>
                  )}

                  {keyFeatures.length > 0 && (
                    <section className={hasAbout ? "mt-8" : ""} aria-labelledby="key-features">
                      <h2 id="key-features" className="text-2xl font-semibold tracking-[-0.03em]">
                        Key Features
                      </h2>
                      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                        {keyFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-4 rounded-xl bg-secondary p-4 text-base leading-relaxed"
                          >
                            <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal className="mt-16 md:mt-20">
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
                    previousProject ? "" : "sm:col-start-2"
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
        </article>
      </main>

      <Footer />
    </div>
  );
}
