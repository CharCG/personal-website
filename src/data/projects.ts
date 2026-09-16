export type ProjectCategory = "selected" | "passion";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  category: ProjectCategory;
  images: string[];
};

export const projects: Project[] = [
  {
    title: "Focusly",
    description: "A minimal productivity app to help you stay focused and do more.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
    category: "selected",
    images: ["/images/projects/focusly.png"],
  },
  {
    title: "Yufo Trade",
    description:
      "A modern trading platform with real-time data, intuitive charts, and powerful tools for smarter decisions.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    href: "#",
    category: "selected",
    images: ["/images/projects/yufo-trade.png"],
  },
  {
    title: "Blocks",
    description: "A minimalist block-based note taking app for better thinking.",
    technologies: ["React", "Tailwind CSS", "IndexedDB"],
    href: "#",
    category: "passion",
    images: ["/images/projects/blocks.png"],
  },
  {
    title: "HabitHub",
    description: "Track habits, build consistency, become a better you.",
    technologies: ["Next.js", "TypeScript", "Supabase"],
    href: "#",
    category: "passion",
    images: ["/images/projects/habithub.png"],
  },
  {
    title: "ForumGW",
    description: "A lightweight forum for genuine discussions and sharing.",
    technologies: ["Python", "PostgreSQL", "Docker"],
    href: "#",
    category: "passion",
    images: ["/images/projects/forumgw.png"],
  },
];

export const homeSelectedProjects = projects
  .filter((p) => p.category === "selected")
  .slice(0, 2);

export const homePassionProjects = projects
  .filter((p) => p.category === "passion")
  .slice(0, 3);
