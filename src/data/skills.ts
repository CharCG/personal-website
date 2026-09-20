import type { IconName } from "tech-stack-icons";

export type Skill = {
  name: string;
  icon: IconName;
};

export const skills: Skill[] = [
  { name: "Flutter", icon: "flutter" },
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "NestJS", icon: "nestjs" },
  { name: "Express.js", icon: "expressjs" },
  { name: "Prisma", icon: "prisma" },
  { name: "Node.js", icon: "nodejs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "js" },
  { name: "Python", icon: "python" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "Java", icon: "java" },
  { name: "Git", icon: "git" },
];
