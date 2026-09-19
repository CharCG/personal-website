export type ProjectCategory = "recent" | "passion";
export type ProjectStatus = "Completed" | "In Progress" | "Archived";

export type Project = {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  status: ProjectStatus;
  type: string;
  description: string;
  about: string;
  keyFeatures: string[];
  technologies: string[];
  repositoryHref: string | null;
  demoHref: string | null;
  category: ProjectCategory;
  images: `/${string}`[];
  showOnHome: boolean;
};

export const projects: Project[] = [
  {
    slug: "haphap",
    title: "HapHap",
    role: "Full-Stack Developer",
    timeline: "Feb 2026 – Jul 2026",
    status: "Completed",
    type: "Mobile App",
    description:
      "A surplus food marketplace app that connects local merchants with customers to rescue unsold meals at discounted prices.",
    about:
      "Why should perfectly good food end up in the trash when there are people willing to enjoy it? Behind every unsold meal is a story of ingredients, time, and effort that deserve better than being discarded. Meanwhile, local merchants were losing potential revenue while consumers continued searching for affordable meal options. HapHap was created to bridge this gap by helping surplus food find a second chance instead of going to waste.",
    keyFeatures: ["A", "B", "C"],
    technologies: ["Flutter", "NestJS", "PostgreSQL", "Midtrans"],
    repositoryHref: "https://github.com/charcg/haphap",
    demoHref: "https://s.id/HapHap",
    category: "recent",
    images: [
      "/images/projects/haphap/haphap-1.png",
      "/images/projects/haphap/haphap-2.png",
      "/images/projects/haphap/haphap-3.png",
    ],
    showOnHome: true,
  },
  {
    slug: "katasaka",
    title: "Katasaka",
    role: "UI/UX Designer",
    timeline: "Jul 2025",
    status: "Completed",
    type: "Mobile App",
    description:
      "An AI-powered storytelling app that brings Indonesian folk tales to life through interactive digital experiences.",
    about:
      "It all started with one simple question, why do so many children know global fairy tales, yet struggle to recognize the stories that shaped their own culture? Growing up, I was surrounded by Indonesian folk tales filled with wisdom, imagination, and values passed down through generations. Yet as technology became a bigger part of daily life, I noticed these stories becoming less visible. Rather than letting these stories fade over time, I saw an opportunity to bring them to life through Katasaka.",
    keyFeatures: [],
    technologies: ["Figma"],
    repositoryHref: "https://github.com/MikeKomari/Garuda_Hacks_JayaManggala",
    demoHref: null,
    category: "recent",
    images: ["/images/projects/katasaka/katasaka-1.png", "/images/projects/katasaka/katasaka-2.png"],
    showOnHome: true,
  },
  {
    slug: "klean",
    title: "Klean",
    role: "Full-Stack Developer",
    timeline: "Feb 2026 – Jul 2026",
    status: "Completed",
    type: "Progressive Web App",
    description:
      "A laundry marketplace that connects customers with trusted local merchants through seamless pickup and delivery.",
    about:
      "Convenience has become an expectation in everyday services, yet laundry often remains a manual and time-consuming experience. Customers expect seamless scheduling and order tracking, while many laundry businesses still rely on fragmented workflows. Klean was created to bridge this gap by bringing customers, merchants, and delivery services into one seamless experience.",
    keyFeatures: [],
    technologies: ["React", "Tailwind CSS", "Express.js", "PostgreSQL", "Midtrans"],
    repositoryHref: "https://github.com/charcg/klean",
    demoHref: "https://klean-fe.vercel.app",
    category: "passion",
    images: [
      "/images/projects/klean/klean-1.png",
      "/images/projects/klean/klean-2.png",
      "/images/projects/klean/klean-3.png",
    ],
    showOnHome: true,
  },
  {
    slug: "bersih-in",
    title: "Bersih.In",
    role: "Full-Stack & AI Developer",
    timeline: "Sep 2025 – Jan 2026",
    status: "Completed",
    type: "Web App",
    description:
      "An AI-powered platform that classifies waste images to help users sort and dispose of waste correctly.",
    about:
      "Waste sorting is often overlooked, yet it is important in effective waste management. Many people want to dispose of waste responsibly but lack the knowledge to identify different waste types correctly. Bersih.In was created to make waste classification more accessible through AI-powered image classification, helping users make informed disposal decisions.",
    keyFeatures: [],
    technologies: ["React", "Tailwind CSS", "Express.js", "Flask"],
    repositoryHref: null,
    demoHref: null,
    category: "passion",
    images: ["/images/projects/bersih-in/bersih-in-1.png"],
    showOnHome: true,
  },
  {
    slug: "karyaloka",
    title: "Karyaloka",
    role: "Full-Stack Developer",
    timeline: "Aug 2026 – Sep 2026",
    status: "Completed",
    type: "Progressive Web App",
    description:
      "A freelance marketplace that connects clients and freelancers through a swipe-based matching experience.",
    about: "",
    keyFeatures: [],
    technologies: ["React", "Tailwind CSS", "Express.js", "PostgreSQL", "Midtrans"],
    repositoryHref: null,
    demoHref: null,
    category: "passion",
    images: ["/images/projects/karyaloka/karyaloka-1.png"],
    showOnHome: true,
  },
  {
    slug: "arunika",
    title: "Arunika",
    role: "Full-Stack Developer",
    timeline: "2026",
    status: "Completed",
    type: "Mobile App",
    description:
      "A learning management system that unifies academic tools, resources, and campus services into one platform.",
    about: "",
    keyFeatures: [],
    technologies: ["Figma"],
    repositoryHref: null,
    demoHref: null,
    category: "passion",
    images: ["/images/projects/arunika/arunika-1.png"],
    showOnHome: false,
  },
  {
    slug: "jomoro-koffee",
    title: "Jomoro Koffee",
    role: "Back-End Developer",
    timeline: "2026",
    status: "Completed",
    type: "API Service",
    description: "",
    about: "",
    keyFeatures: [],
    technologies: ["NestJS", "Prisma", "MySQL"],
    repositoryHref: null,
    demoHref: null,
    category: "passion",
    images: [],
    showOnHome: false,
  },
  {
    slug: "genshin-import",
    title: "Genshin Import",
    role: "Full-Stack Developer",
    timeline: "2026",
    status: "Completed",
    type: "Mobile App",
    description: "",
    about: "",
    keyFeatures: [],
    technologies: ["Flutter", "Express.js", "MySQL"],
    repositoryHref: null,
    demoHref: null,
    category: "passion",
    images: [],
    showOnHome: false,
  },
];

export const homeRecentProjects = projects.filter((project) => project.category === "recent" && project.showOnHome);

export const homePassionProjects = projects.filter((project) => project.category === "passion" && project.showOnHome);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
