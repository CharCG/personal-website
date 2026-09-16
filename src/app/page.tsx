import { Hero } from "@/components/home/hero";
import { ProjectsSection } from "@/components/home/projects";
import { SkillsSection } from "@/components/home/skills";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="page-glow min-h-screen">
      <Navbar />
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <Footer />
    </main>
  );
}
