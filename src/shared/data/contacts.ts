import { type IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaThreads } from "react-icons/fa6";
import type { SimpleIcon } from "simple-icons";

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

export const instagramContact: Contact = {
  platform: "Instagram",
  name: "charlescong_",
  icon: FaInstagram,
  link: "https://www.instagram.com/charlescong_/",
};

export const threadsContact: Contact = {
  platform: "Threads",
  name: "charlescong_",
  icon: FaThreads,
  link: "https://www.instagram.com/charlescong_/",
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
  icon: FaThreads,
  link: "https://monkeytype.com/profile/charcg",
};

export const contacts: Contact[] = [
  githubContact,
  linkedinContact,
  instagramContact,
  threadsContact,
  emailContact,
];
