export type SocialIcon = "linkedin" | "github" | "email";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export const githubProfile = {
  username: "charcg",
  href: "https://github.com/charcg",
} as const;

export const monkeytypeProfile = {
  href: "https://monkeytype.com/profile/charlescong",
} as const;

export const emailContact = {
  href: "mailto:charlescongg@gmail.com",
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/charlescong",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: githubProfile.href,
    icon: "github",
  },
  {
    label: "Email",
    href: emailContact.href,
    icon: "email",
  },
];
