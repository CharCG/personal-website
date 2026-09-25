import type { ReactNode } from "react";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { socialLinks, type SocialIcon as SocialIconName } from "@/shared/data/socials";

export const socialIcons: Record<SocialIconName, ReactNode> = {
  email: <FaEnvelope aria-hidden="true" />,
  github: <FaGithub aria-hidden="true" />,
  linkedin: <FaLinkedin aria-hidden="true" />,
};

type SocialLinksProps = {
  className: string;
  linkClassName: string;
};

export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={linkClassName}
        >
          {socialIcons[social.icon]}
        </Link>
      ))}
    </div>
  );
}
