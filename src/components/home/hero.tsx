import Link from "next/link";
import {
  FaArrowRight,
  FaFileArrowDown,
} from "react-icons/fa6";
import { SocialLinks } from "@/components/shared/social-links";
import { InteractiveMascot } from "@/components/mascot/interactive-mascot";
import { siteContent } from "@/data/site";

export function Hero() {
  return (
    <section
      id="home"
      className="hero-layout relative h-svh min-h-[720px] overflow-hidden md:min-h-[800px]"
    >
      <div className="relative z-10 mx-auto px-6 pt-32 text-center md:pt-40 lg:pt-48">
        <p className="hero-enter hero-enter-eyebrow text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground">
          Hi! I’m
        </p>
        <h1 className="hero-enter hero-enter-name mt-4 text-4xl font-bold leading-none tracking-[-0.05em] md:text-5xl lg:text-[64px]">
          {siteContent.name}
        </h1>
        <p className="hero-enter hero-enter-role mt-4 text-base text-muted-foreground md:text-lg lg:text-xl">
          {siteContent.role.primary} <span aria-hidden="true">—</span>{" "}
          <em className="font-serif italic">{siteContent.role.accent}</em>
        </p>
      </div>

      <div className="hero-mascot absolute left-1/2 z-10 -translate-x-1/2">
        <div className="hero-enter hero-enter-mascot absolute inset-0">
          <InteractiveMascot
            priority
            sizes="(max-width: 767px) 256px, (max-width: 1023px) 344px, 400px"
            className="absolute left-0 top-1/2 aspect-square w-full -translate-y-1/2"
          />
        </div>
      </div>

      <div className="hero-surface absolute z-20">
        <div className="hero-enter hero-enter-actions relative z-10 mx-auto flex w-screen max-w-2xl flex-col items-stretch gap-4 px-6 pt-12 md:flex-row md:justify-center md:gap-6 md:pt-16">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="group inline-flex h-16 items-center justify-center gap-4 rounded-2xl bg-primary px-8 text-base font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-85"
          >
            <FaFileArrowDown aria-hidden="true" />
            Get Resume
            <FaArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/about"
            className="group inline-flex h-16 items-center justify-center gap-4 rounded-2xl border border-border bg-surface px-8 text-base font-medium transition-colors duration-200 hover:border-foreground/20"
          >
            More About Me
            <FaArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>

        <SocialLinks
          className="hero-enter hero-enter-socials relative z-10 mt-8 flex justify-center gap-8 md:mt-10"
          linkClassName="text-3xl transition-opacity hover:opacity-60"
        />
      </div>
    </section>
  );
}
