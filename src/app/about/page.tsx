import type { Metadata } from "next";
import { FaFile } from "react-icons/fa6";
import { GitHubContributionsCard } from "@/components/about/github-contributions-card";
import { SpotifyCard } from "@/components/about/spotify-card";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Reveal } from "@/components/motion/reveal";
import { SocialLinks } from "@/components/shared/social-links";
import { ButtonLink } from "@/components/ui/button-link";
import { aboutContent } from "@/data/about";

export const metadata: Metadata = {
  title: "About — Charles",
  description: "Learn more about Charles.",
};

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto w-full min-w-0 max-w-[1200px] px-6 pt-32 md:px-6 md:pt-40 lg:px-8">
          <div className="grid gap-8 border-b border-border pb-16 md:pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-24">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">About me</p>
              <h1 className="mt-4 max-w-xl text-[28px] font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
                {aboutContent.quote.map((segment, index) =>
                  segment.emphasis ? (
                    <em key={index} className="font-serif font-normal italic">
                      {segment.text}
                    </em>
                  ) : (
                    <span key={index}>{segment.text}</span>
                  ),
                )}
              </h1>
            </Reveal>

            <Reveal className="self-end" delay={0.08}>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {aboutContent.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <div className="flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center">
                  <ButtonLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <FaFile aria-hidden="true" />
                    Get Resume
                  </ButtonLink>
                  <SocialLinks
                    className="flex gap-4"
                    linkClassName="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-xl text-foreground transition-opacity duration-200 hover:opacity-70"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid min-w-0 gap-4 pt-16 md:pt-20 lg:grid-cols-2 lg:pt-24">
            <Reveal className="min-w-0" delay={0.06}>
              <SpotifyCard />
            </Reveal>
            <Reveal className="min-w-0" delay={0.12}>
              <GitHubContributionsCard />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
