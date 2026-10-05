import { type IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { siMonkeytype, type SimpleIcon } from "simple-icons";

export type Contact = {
  platform: string;
  name: string;
  icon: IconType | SimpleIcon;
  link: string;
};

export const githubContact: Contact = {
  platform: "GitHub",
  name: "CharCG",
  icon: FaGithub,
  link: "https://github.com/CharCG",
};

export const linkedinContact: Contact = {
  platform: "LinkedIn",
  name: "CharCG",
  icon: FaLinkedin,
  link: "https://www.linkedin.com/in/charcg",
};

export const emailContact: Contact = {
  platform: "Email",
  name: "Charles Cong",
  icon: FaEnvelope,
  link: "mailto:charlescongg@gmail.com",
};

export const monkeytypeContact: Contact = {
  platform: "Monkeytype",
  name: "charcg",
  icon: siMonkeytype,
  link: "https://monkeytype.com/profile/charcg",
};

export const contacts: Contact[] = [
  githubContact,
  linkedinContact,
  emailContact,
];
