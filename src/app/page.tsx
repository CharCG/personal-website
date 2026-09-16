import { Hero } from "@/components/home/hero";
import { ProjectsSection } from "@/components/home/projects";
import { SkillsSection } from "@/components/home/skills";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

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
