import { type IconType } from 'react-icons';
import {
  siExpress,
  siFigma,
  siFlask,
  siFlutter,
  siGit,
  siKotlin,
  siLaravel,
  type SimpleIcon,
  siMysql,
  siNestjs,
  siOpenjdk,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
  siXml,
} from 'simple-icons';

export type Skill = {
  name: string;
  icon: IconType | SimpleIcon;
};

export type SkillCategory = {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
};

export const frontendSkills: Skill[] = [
  { name: 'Flutter', icon: siFlutter },
  { name: 'React', icon: siReact },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Vite', icon: siVite },
];

export const mobileSkills: Skill[] = [
  { name: 'Flutter', icon: siFlutter },
  { name: 'Kotlin', icon: siKotlin },
  { name: 'XML', icon: siXml },
  { name: 'Java', icon: siOpenjdk },
];

export const backendSkills: Skill[] = [
  { name: 'Laravel', icon: siLaravel },
  { name: 'NestJS', icon: siNestjs },
  { name: 'Express.js', icon: siExpress },
  { name: 'Flask', icon: siFlask },
  { name: 'Prisma', icon: siPrisma },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'MySQL', icon: siMysql },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Python', icon: siPython },
];

export const uiuxSkills: Skill[] = [{ name: 'Figma', icon: siFigma }];

export const otherSkills: Skill[] = [{ name: 'Git', icon: siGit }];

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces.',
    skills: frontendSkills,
  },
  {
    id: 'mobile',
    label: 'Mobile Development',
    description: 'Developing cross-platform and native mobile applications.',
    skills: mobileSkills,
  },
  {
    id: 'backend',
    label: 'Backend Development',
    description: 'Building robust and scalable server-side applications and APIs.',
    skills: backendSkills,
  },
  {
    id: 'uiux',
    label: 'UI/UX Design',
    description: 'Designing intuitive and beautiful experiences and interfaces.',
    skills: uiuxSkills,
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Additional tools for collaboration and convenience.',
    skills: otherSkills,
  },
];

const skillsByName = new Map(
  skillCategories.flatMap((category) => category.skills).map((skill) => [skill.name, skill]),
);

export const skills: Skill[] = [...skillsByName.values()];

export function getSkillByName(name: string) {
  return skillsByName.get(name);
}
