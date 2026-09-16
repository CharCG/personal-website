import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { socialLinks, type SocialIcon } from "@/data/socials";

const socialIcons: Record<SocialIcon, typeof FaLinkedin> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
};

type SocialLinksProps = {
  className: string;
  linkClassName: string;
};

export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map((social) => {
        const Icon = socialIcons[social.icon];

        return (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={linkClassName}
          >
            <Icon aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}
