import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { socialLinks } from "@/shared/data/socials";

export const socialIcons = {
  Email: <FaEnvelope aria-hidden="true" />,
  GitHub: <FaGithub aria-hidden="true" />,
  LinkedIn: <FaLinkedin aria-hidden="true" />,
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
          {socialIcons[social.label]}
        </Link>
      ))}
    </div>
  );
}
