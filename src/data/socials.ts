export type SocialIcon = "linkedin" | "github" | "email";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/charlescong",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/charcg",
    icon: "github",
  },
  {
    label: "Email",
    href: "mailto:charlescongg@gmail.com",
    icon: "email",
  },
];
