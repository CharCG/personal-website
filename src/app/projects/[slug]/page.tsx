import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaCode,
  FaGlobe,
} from "react-icons/fa6";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getProjectBySlug, projects } from "@/data/projects";

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
    description: project.description || `View details about the ${project.title} project.`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-[1200px] px-6 pb-16 pt-32 md:px-6 md:pb-20 md:pt-40 lg:px-8 lg:pb-24">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <FaArrowLeft aria-hidden="true" />
            Back to Projects
          </Link>

          <header className="mt-8 grid gap-8 border-b border-border pb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                {project.role}
              </p>
              <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              {project.description && (
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.description}
                </p>
              )}
            </div>

            {(project.sourceCodeHref || project.livePreviewHref) && (
              <div className="flex flex-wrap gap-4 lg:self-start">
                {project.sourceCodeHref && (
                  <Link
                    href={project.sourceCodeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center gap-3 rounded-2xl border border-border bg-surface px-6 text-sm font-medium"
                  >
                    <FaCode aria-hidden="true" />
                    Source Code
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </Link>
                )}
                {project.livePreviewHref && (
                  <Link
                    href={project.livePreviewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center gap-3 rounded-2xl bg-primary px-6 text-sm font-medium text-primary-foreground"
                  >
                    <FaGlobe aria-hidden="true" />
                    Live Preview
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}
          </header>

          <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section aria-label={`${project.title} previews`}>
              {project.images.length > 0 ? (
                <div className={`grid min-w-0 gap-4 ${project.images.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {project.images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative aspect-[3/2] min-w-0 overflow-hidden rounded-2xl border border-border bg-surface"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} project preview ${index + 1}`}
                        fill
                        sizes={
                          project.images.length > 1
                            ? "(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 50vw, 400px"
                            : "(max-width: 1199px) calc(100vw - 48px), 800px"
                        }
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
                  <Image
                    src="/images/mascot-confused.png"
                    alt=""
                    width={128}
                    height={128}
                    className="h-32 w-32 object-contain"
                  />
                  <p className="text-sm font-medium text-muted-foreground">
                    Preview Unavailable
                  </p>
                </div>
              )}
            </section>

            <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-32">
              <h2 className="text-lg font-semibold">Overview</h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">Year</dt>
                  <dd className="text-sm font-medium">{project.year}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="text-sm font-medium">{project.status}</dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-border pt-6">
                <h2 className="text-lg font-semibold">Technology Stack</h2>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full bg-secondary px-4 py-2 text-xs text-foreground"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
