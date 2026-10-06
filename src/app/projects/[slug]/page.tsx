import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaCode, FaGlobe, FaImage } from 'react-icons/fa6';

import { ProjectContent } from '@/features/projects/components/project-content';
import { ProjectGallery } from '@/features/projects/components/project-gallery';
import { ProjectNavigation } from '@/features/projects/components/project-navigation';
import { ProjectOverview } from '@/features/projects/components/project-overview';
import { Footer } from '@/shared/components/layout/footer';
import { Navbar } from '@/shared/components/layout/navbar';
import { ButtonLink } from '@/shared/components/ui/button-link';
import { getProjectBySlug, projects } from '@/shared/data/projects';
import { Reveal } from '@/shared/motion/reveal';

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-content px-6 pt-32 md:px-6 md:pt-40 lg:px-8">
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
            <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-16">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">{project.role}</p>
                <h1 className="mt-4 text-heading-sm font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
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

          <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Reveal>
              <section aria-label={`${project.title} previews`}>
                {project.images.length > 0 ? (
                  <ProjectGallery projectTitle={project.title} images={project.images} />
                ) : (
                  <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
                    <FaImage aria-hidden="true" className="h-8 w-8 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Preview Unavailable</p>
                  </div>
                )}
              </section>
            </Reveal>

            <ProjectOverview project={project} />
          </div>

          <ProjectContent about={project.about} keyFeatures={project.keyFeatures} />

          <ProjectNavigation previousProject={previousProject} nextProject={nextProject} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
