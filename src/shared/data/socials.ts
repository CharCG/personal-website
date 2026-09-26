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

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/charlescong",
  },
  {
    label: "GitHub",
    href: githubProfile.href,
  },
  {
    label: "Email",
    href: emailContact.href,
  },
] as const;
