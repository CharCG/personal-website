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
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
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
    description: "",
    skills: frontendSkills,
  },
  {
    id: "mobile",
    label: "Mobile Development",
    description: "",
    skills: mobileSkills,
  },
  {
    id: "backend",
    label: "Backend Development",
    description: "",
    skills: backendSkills,
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    description: "",
    skills: uiuxSkills,
  },
  {
    id: "other",
    label: "Other",
    description: "",
    skills: otherSkills,
  }
];

export function getSkillByName(name: string) {
  return skills.find((skill) => skill.name === name);
}
