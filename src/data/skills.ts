import type { IconName } from "tech-stack-icons";

export type Skill = {
  name: string;
  icon: IconName;
};

export const skills: Skill[] = [
  { name: "Flutter", icon: "flutter" },
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Laravel", icon: "laravel" },
  { name: "NestJS", icon: "nestjs" },
  { name: "Express.js", icon: "expressjs" },
  { name: "Prisma", icon: "prisma" },
  { name: "Node.js", icon: "nodejs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "js" },
  { name: "Python", icon: "python" },
  { name: "Java", icon: "java" },
  { name: "PHP", icon: "php" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Visual Studio Code", icon: "vscode" },
  { name: "Postman", icon: "postman" },
  { name: "Figma", icon: "figma" },
];
