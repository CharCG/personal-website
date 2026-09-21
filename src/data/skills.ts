import {
  siCplusplus,
  siExpress,
  siFigma,
  siFlask,
  siFlutter,
  siGit,
  siGithub,
  siJavascript,
  siKotlin,
  siLaravel,
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
  siXml,
  type SimpleIcon,
} from "simple-icons";

export type Skill = {
  name: string;
  icon: SimpleIcon;
};

export const skills: Skill[] = [
  { name: "Flutter", icon: siFlutter },
  { name: "React", icon: siReact },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Laravel", icon: siLaravel },
  { name: "NestJS", icon: siNestjs },
  { name: "Express.js", icon: siExpress },
  { name: "Flask", icon: siFlask },
  { name: "Prisma", icon: siPrisma },
  { name: "Node.js", icon: siNodedotjs },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
  { name: "TypeScript", icon: siTypescript },
  { name: "JavaScript", icon: siJavascript },
  { name: "Python", icon: siPython },
  { name: "Kotlin", icon: siKotlin },
  { name: "Java", icon: siOpenjdk },
  { name: "XML", icon: siXml },
  { name: "C++", icon: siCplusplus },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "Postman", icon: siPostman },
  { name: "Figma", icon: siFigma },
];

export function getSkillByName(name: string) {
  return skills.find((skill) => skill.name === name);
}
