import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaEnvelope,
  FaFileArrowDown,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import { siteContent } from "@/data/site";
import { socialLinks, type SocialIcon } from "@/data/socials";

const socialIcons: Record<SocialIcon, typeof FaLinkedin> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
};

export function Hero() {
  return (
    <section
      id="home"
      className="hero-layout relative h-svh min-h-[720px] overflow-hidden md:min-h-[800px]"
    >
      <div className="hero-copy relative z-10 mx-auto px-6 pt-32 text-center md:pt-40 lg:pt-48">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground">
          {siteContent.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-none tracking-[-0.05em] md:text-5xl lg:text-[64px]">
          {siteContent.name}
        </h1>
        <p className="mt-4 text-base text-muted-foreground md:text-lg lg:text-xl">
          {siteContent.role.primary} <span aria-hidden="true">—</span>{" "}
          <em className="font-serif italic">{siteContent.role.accent}</em>
        </p>
      </div>

      <div className="hero-mascot absolute left-1/2 z-10 -translate-x-1/2">
        <Image
          src="/images/mascot-peek-up-rays.png"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 256px, (max-width: 1023px) 344px, 400px"
          className="object-contain"
        />
      </div>

      <div className="hero-surface absolute z-20">
        <div className="relative z-10 mx-auto flex w-screen max-w-2xl flex-col items-stretch gap-4 px-6 pt-12 md:flex-row md:justify-center md:gap-6 md:pt-16">
          <Link
            href={siteContent.heroActions.resume.href}
            target="_blank"
            className="inline-flex h-16 items-center justify-center gap-4 rounded-2xl bg-primary px-8 text-base font-medium text-primary-foreground"
          >
            <FaFileArrowDown aria-hidden="true" />
            {siteContent.heroActions.resume.label}
            <FaArrowRight aria-hidden="true" />
          </Link>
          <Link
            href={siteContent.heroActions.about.href}
            className="inline-flex h-16 items-center justify-center gap-4 rounded-2xl border border-border bg-surface px-8 text-base font-medium"
          >
            {siteContent.heroActions.about.label}
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="relative z-10 mt-8 flex justify-center gap-8 md:mt-10">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-3xl transition-opacity hover:opacity-60"
              >
                <Icon aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
