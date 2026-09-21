import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { motionStagger } from "@/components/motion/config";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Charles",
  description: "Explore the products Charles has solved, designed, and built.",
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1200px] px-6 pt-32 md:px-6 md:pt-40 lg:px-8">
          <Reveal className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Projects</p>
              <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
                Selected Works
              </h1>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A collection of products shaped through critical problem solving, thoughtful design, and careful
              engineering.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} className="h-full" delay={(index % 4) * motionStagger}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
