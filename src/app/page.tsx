import { Hero } from "@/features/home/components/hero";
import { ProjectsSection } from "@/features/home/components/projects";
import { SkillsSection } from "@/features/home/components/skills";
import { Footer } from "@/shared/components/layout/footer";
import { Navbar } from "@/shared/components/layout/navbar";

export default function Home() {
  return (
    <div className="page-glow flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProjectsSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
}
