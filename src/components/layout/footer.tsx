import { FaArrowRight, FaEnvelope } from "react-icons/fa6";
import { SocialLinks } from "@/components/shared/social-links";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { siteContent } from "@/data/site";
import { emailContact } from "@/data/socials";

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground md:mt-20 lg:mt-24">
      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-6 md:py-12 lg:px-8">
        <Reveal className="grid justify-items-center gap-8 text-center md:grid-cols-2 md:justify-items-stretch md:text-left lg:gap-x-16">
          <div>
            <h2 className="text-xl font-semibold">{siteContent.name}</h2>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {siteContent.role.primary} <span aria-hidden="true">—</span>{" "}
              <em className="font-serif italic">{siteContent.role.accent}</em>
            </p>
            <SocialLinks
              className="mt-4 flex justify-center gap-6 md:justify-start"
              linkClassName="text-2xl transition-opacity hover:opacity-70"
            />
          </div>

          <div className="flex w-full items-start justify-center md:justify-end">
            <ButtonLink
              href={emailContact.href}
              variant="inverted"
            >
              <FaEnvelope aria-hidden="true" />
              Let’s Connect
              <FaArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
              />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 flex flex-col items-center gap-2 text-center text-xs text-primary-foreground/60 md:flex-row md:justify-between md:text-left"
          delay={0.08}
        >
          <p>
            © {new Date().getFullYear()} {siteContent.name}. All rights reserved.
          </p>
          <p>A curious mind. A kinder internet.</p>
        </Reveal>
      </div>
    </footer>
  );
}
