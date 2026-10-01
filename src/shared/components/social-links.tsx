import Link from "next/link";
import { BrandIcon } from "@/shared/components/brand-icon";
import { contacts } from "@/shared/data/contacts";

type SocialLinksProps = {
  className: string;
  linkClassName: string;
};

export function SocialLinks({ className, linkClassName }: SocialLinksProps) {
  return (
    <div className={className}>
      {contacts.map((contact) => (
        <Link
          key={contact.platform}
          href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contact.platform}
          className={linkClassName}
        >
          <BrandIcon icon={contact.icon} />
        </Link>
      ))}
    </div>
  );
}
