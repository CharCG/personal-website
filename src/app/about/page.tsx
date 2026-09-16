import type { Metadata } from "next";
import { GitHubContributionsCard } from "@/components/about/github-contributions-card";
import { SpotifyCard } from "@/components/about/spotify-card";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { aboutContent } from "@/data/about";

export const metadata: Metadata = {
  title: "About — Charles",
  description: "Learn more about Charles, his work, and what he is currently building and enjoying.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto w-full min-w-0 max-w-[1200px] px-6 pt-32 md:px-6 md:pt-40 lg:px-8">
        <div className="grid gap-8 border-b border-border pb-16 md:pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              About me
            </p>
            <h1 className="mt-4 max-w-xl text-[28px] font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
              {aboutContent.quote}
            </h1>
          </div>

          <div className="space-y-4 self-end text-base leading-relaxed text-muted-foreground md:text-lg">
            {aboutContent.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 gap-4 pt-16 md:pt-20 lg:grid-cols-2 lg:pt-24">
          <SpotifyCard />
          <GitHubContributionsCard />
        </div>
      </section>

      <Footer />
    </main>
  );
}
