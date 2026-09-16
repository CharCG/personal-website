import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { navigationItems } from "@/data/navigation";
import { siteContent } from "@/data/site";
import { socialLinks, type SocialIcon } from "@/data/socials";

const socialIcons: Record<SocialIcon, typeof FaLinkedin> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
};

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground md:mt-20 lg:mt-24">
      <div className="mx-auto flex min-h-56 max-w-[1200px] flex-col px-6 pb-6 pt-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1.5fr] md:gap-x-16">
          <div>
            <h2 className="text-xl font-semibold">{siteContent.name}</h2>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {siteContent.role.primary} <span aria-hidden="true">—</span>{" "}
              <em className="font-serif italic">{siteContent.role.accent}</em>
            </p>
            <div className="mt-4 flex gap-6">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-2xl transition-opacity hover:opacity-70"
                  >
                    <Icon aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="hidden md:block">
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Link className="transition-colors hover:text-primary-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-start md:justify-end">
            <Link
              href={siteContent.contact.href}
              className="inline-flex h-14 items-center gap-4 rounded-2xl bg-surface px-6 text-base font-medium text-foreground"
            >
              <FaEnvelope aria-hidden="true" />
              {siteContent.contact.label}
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>{siteContent.copyright}</p>
          <p>{siteContent.intro}</p>
        </div>
      </div>
    </footer>
  );
}
