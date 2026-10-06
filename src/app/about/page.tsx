import type { Metadata } from 'next';
import { FaFile } from 'react-icons/fa6';

import { GitHubContributionsCard } from '@/features/about/components/github-contributions-card';
import { GlobeCard } from '@/features/about/components/globe-card';
import { MonkeytypeCard } from '@/features/about/components/monkeytype-card';
import { SpotifyCard } from '@/features/about/components/spotify-card';
import { Footer } from '@/shared/components/layout/footer';
import { Navbar } from '@/shared/components/layout/navbar';
import { SocialLinks } from '@/shared/components/social-links';
import { ButtonLink } from '@/shared/components/ui/button-link';
import { motionStagger } from '@/shared/motion/config';
import { Reveal } from '@/shared/motion/reveal';

export const metadata: Metadata = {
  title: 'About — Charles',
  description: 'Learn more about Charles.',
};

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto w-full min-w-0 max-w-content px-6 pt-32 md:px-6 md:pt-40 lg:px-8">
          <div className="grid gap-8 border-b border-border pb-8 md:pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-12">
            <Reveal className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">About me</p>
              <h1 className="mt-4 max-w-xl text-heading-sm font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
                I care about the space between{' '}
                <em className="font-accent font-normal not-italic tracking-normal">useful</em> and{' '}
                <em className="font-accent font-normal not-italic tracking-normal">delightful</em>.
              </h1>
            </Reveal>

            <Reveal className="min-w-0 self-end" delay={motionStagger}>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>A Computer Science undergraduate who believes technology should solve real human problems.</p>
                <p>
                  Passionate about building fullstack applications with a focus on scalable, maintainable, and reliable
                  systems. Motivated to bring a results-driven mindset, strong collaboration, and practical
                  problem-solving skills to deliver high-quality solutions.
                </p>

                <div className="flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center">
                  <ButtonLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <FaFile aria-hidden="true" />
                    Get Resume
                  </ButtonLink>
                  <SocialLinks
                    className="flex flex-wrap gap-4"
                    linkClassName="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-xl text-foreground transition-opacity duration-200 ease-out hover:opacity-70"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid min-w-0 auto-rows-fr gap-4 pt-6 md:grid-cols-2 md:pt-8 lg:pt-10">
            <Reveal className="h-full min-w-0" delay={motionStagger}>
              <GlobeCard />
            </Reveal>
            <Reveal className="h-full min-w-0" delay={motionStagger * 2}>
              <GitHubContributionsCard />
            </Reveal>
            <Reveal className="h-full min-w-0" delay={motionStagger * 3}>
              <SpotifyCard />
            </Reveal>
            <Reveal className="h-full min-w-0" delay={motionStagger * 4}>
              <MonkeytypeCard />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
