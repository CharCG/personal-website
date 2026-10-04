import { type IconType } from "react-icons";
import {
  siExpress,
  siFigma,
  siFlask,
  siFlutter,
  siGit,
  siGithub,
  siJavascript,
  siKotlin,
  siLaravel,
  siMongodb,
  siMongoose,
  siMysql,
  siNestjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPrisma,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
  siXml,
  type SimpleIcon,
} from "simple-icons";

export type Skill = {
  name: string;
  icon: IconType | SimpleIcon;
};

export type SkillCategory = {
  id: "frontend" | "mobile" | "backend" | "uiux" | "other";
  label: string;
  description: string;
  skills: Skill[];
};

export const frontendSkills: Skill[] = [
  { name: "Flutter", icon: siFlutter },
  { name: "React", icon: siReact },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Vite", icon: siVite },
];

export const mobileSkills: Skill[] = [
  { name: "Flutter", icon: siFlutter },
  { name: "Kotlin", icon: siKotlin },
  { name: "XML", icon: siXml },
  { name: "Java", icon: siOpenjdk },
];

export const backendSkills: Skill[] = [
  { name: "Laravel", icon: siLaravel },
  { name: "NestJS", icon: siNestjs },
  { name: "Express.js", icon: siExpress },
  { name: "Flask", icon: siFlask },
  { name: "Prisma", icon: siPrisma },
  { name: "Mongoose", icon: siMongoose },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
  { name: "MongoDB", icon: siMongodb },
  { name: "TypeScript", icon: siTypescript },
  { name: "Python", icon: siPython },
];

export const uiuxSkills: Skill[] = [{ name: "Figma", icon: siFigma }];

export const otherSkills: Skill[] = [{ name: "Git", icon: siGit }];

export const skills: Skill[] = [...frontendSkills, ...mobileSkills, ...backendSkills, ...uiuxSkills, ...otherSkills];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    description: "Building responsive web and mobile interfaces that feel clear, fast, and dependable.",
    skills: frontendSkills,
  },
  {
    id: "mobile",
    label: "Mobile Development",
    description: "Creating mobile applications that are optimized for performance and user experience.",
    skills: mobileSkills,
  },
  {
    id: "backend",
    label: "Backend Development",
    description: "Designing maintainable APIs and server-side systems that support reliable products.",
    skills: backendSkills,
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    description: "Creating intuitive and visually appealing designs that enhance user experiences.",
    skills: uiuxSkills,
  }
];

export function getSkillByName(name: string) {
  return skills.find((skill) => skill.name === name);
}
