export type ProjectCategory = "selected" | "passion";
export type ProjectStatus = "Completed" | "In Progress" | "Archived";

export type Project = {
  slug: string;
  title: string;
  role: string;
  year: number;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  sourceCodeHref: string | null;
  livePreviewHref: string | null;
  category: ProjectCategory;
  images: `/${string}`[];
  showOnHome: boolean;
};

export const projects: Project[] = [
  {
    slug: "haphap",
    title: "HapHap",
    role: "Full-Stack Developer",
    year: 2026,
    status: "Completed",
    description: "A surplus food marketplace app that connects local merchants with customers to rescue unsold meals at discounted prices.",
    technologies: ["Flutter", "NestJS", "PostgreSQL", "Midtrans"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "selected",
    images: ["/images/projects/haphap/haphap-1.png"],
    showOnHome: true,
  },
  {
    slug: "katasaka",
    title: "Katasaka",
    role: "UI/UX Designer",
    year: 2025,
    status: "Completed",
    description: "An AI-powered storytelling app that brings Indonesian folk tales to life through interactive digital experiences.",
    technologies: ["Figma"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "selected",
    images: ["/images/projects/katasaka/katasaka-1.png"],
    showOnHome: true,
  },
  {
    slug: "klean",
    title: "Klean",
    role: "Full-Stack Developer",
    year: 2026,
    status: "Completed",
    description: "A laundry marketplace that connects customers with trusted local merchants through seamless pickup and delivery.",
    technologies: ["React", "Tailwind CSS", "Express.js", "PostgreSQL", "Midtrans"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "passion",
    images: ["/images/projects/klean/klean-1.png"],
    showOnHome: true,
  },
  {
    slug: "bersih-in",
    title: "Bersih.In",
    role: "Full-Stack & AI Developer",
    year: 2025,
    status: "Completed",
    description: "An AI-powered platform that classifies waste images to help users sort and dispose of waste correctly.",
    technologies: ["React", "Tailwind CSS", "Express.js", "Flask"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "passion",
    images: ["/images/projects/bersih-in/bersih-in-1.png"],
    showOnHome: true,
  },
  {
    slug: "karyaloka",
    title: "Karyaloka",
    role: "Full-Stack Developer",
    year: 2026,
    status: "Completed",
    description: "A freelance marketplace connecting clients and freelancers through a swipe-based matching experience.",
    technologies: ["React", "Tailwind CSS", "Express.js", "PostgreSQL", "Midtrans"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "passion",
    images: ["/images/projects/karyaloka/karyaloka-1.png"],
    showOnHome: true,
  },
  {
    slug: "arunika",
    title: "Arunika",
    role: "Full-Stack Developer",
    year: 2026,
    status: "Completed",
    description: "A learning management system that unifies academic tools, resources, and campus services into one platform.",
    technologies: ["Figma"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "passion",
    images: ["/images/projects/arunika/arunika-1.png"],
    showOnHome: false,
  },
  {
    slug: "jomoro-koffee",
    title: "Jomoro Koffee",
    role: "Back-End Developer",
    year: 2026,
    status: "Completed",
    description: "",
    technologies: ["NestJS", "Prisma", "MySQL"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "passion",
    images: [],
    showOnHome: false,
  },
  {
    slug: "genshin-import",
    title: "Genshin Import",
    role: "Full-Stack Developer",
    year: 2026,
    status: "Completed",
    description: "",
    technologies: ["Flutter", "Express.js", "MySQL"],
    sourceCodeHref: null,
    livePreviewHref: null,
    category: "passion",
    images: [],
    showOnHome: false,
  }
];

export const homeRecentProjects = projects.filter(
  (project) => project.category === "selected" && project.showOnHome,
);

export const homePassionProjects = projects.filter(
  (project) => project.category === "passion" && project.showOnHome,
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
