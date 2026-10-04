export type ProjectStatus = "Completed" | "In Progress" | "Archived";
export type ProjectType = "Web App" | "Mobile App" | "Desktop App" | "Library" | "Game" | "Other";

export type Project = {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  status: ProjectStatus;
  type: ProjectType;
  description: string;
  about: string;
  keyFeatures: string[];
  technologies: string[];
  repositoryLink: string | null;
  demoLink: string | null;
  images: `/${string}`[];
  featured: boolean;
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
    keyFeatures: [
      "Merchant Registration Application",
      "Menu & Surplus Management",
      "Ordering & Digital Payment",
      "QR Code Pickup",
      "Order Tracking & History",
      "Ratings & Reviews",
      "Savings & Food Rescue Tracking",
      "Automatic Listing Expiration",
    ],
    technologies: ["Flutter", "NestJS", "Prisma", "PostgreSQL"],
    repositoryLink: "https://github.com/charcg/haphap",
    demoLink: "https://s.id/HapHap",
    images: ["/images/projects/haphap/haphap-1.png", "/images/projects/haphap/haphap-2.png"],
    featured: true,
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
    technologies: ["React", "Tailwind CSS", "Vite", "Express.js", "Prisma", "PostgreSQL", "Figma"],
    repositoryLink: "https://github.com/MikeKomari/Garuda_Hacks_JayaManggala",
    demoLink: null,
    images: ["/images/projects/katasaka/katasaka-1.png", "/images/projects/katasaka/katasaka-2.png"],
    featured: true,
  },
  {
    slug: "klean",
    title: "Klean",
    role: "Full-Stack Developer",
    timeline: "Feb 2026 – Jul 2026",
    status: "Completed",
    type: "Web App",
    description:
      "A laundry marketplace that connects customers with trusted local merchants through seamless pickup and delivery.",
    about:
      "Convenience has become an expectation in everyday services, yet laundry often remains a manual and time-consuming experience. Customers expect seamless scheduling and order tracking, while many laundry businesses still rely on fragmented workflows. Klean was created to bridge this gap by bringing customers, merchants, and delivery services into one seamless experience.",
    keyFeatures: [],
    technologies: ["React", "Tailwind CSS", "Vite", "Express.js", "Prisma", "PostgreSQL"],
    repositoryLink: "https://github.com/charcg/klean",
    demoLink: "https://klean-fe.vercel.app",
    images: ["/images/projects/klean/klean-1.png", "/images/projects/klean/klean-2.png"],
    featured: true,
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
    technologies: ["React", "Tailwind CSS", "Vite", "Express.js", "Mongoose", "MongoDB", "Flask"],
    repositoryLink: "https://github.com/charcg/bersih-in",
    demoLink: "https://bersih-in-ai.vercel.app",
    images: ["/images/projects/bersih-in/bersih-in-1.png"],
    featured: true,
  },
  {
    slug: "karyaloka",
    title: "Karyaloka",
    role: "Full-Stack Developer",
    timeline: "Aug 2026 – Sep 2026",
    status: "Completed",
    type: "Web App",
    description:
      "A freelance marketplace that connects clients and freelancers through a swipe-based matching experience.",
    about: "",
    keyFeatures: [],
    technologies: ["React", "Tailwind CSS", "Vite", "Express.js", "Prisma", "PostgreSQL"],
    repositoryLink: "https://github.com/charcg/karyaloka",
    demoLink: "https://karyaloka-fe.vercel.app",
    images: ["/images/projects/karyaloka/karyaloka-1.png", "/images/projects/karyaloka/karyaloka-2.png"],
    featured: true,
  },
  {
    slug: "arunika",
    title: "Arunika",
    role: "UI/UX Designer",
    timeline: "2026",
    status: "Completed",
    type: "Mobile App",
    description:
      "A learning management system that unifies academic tools, resources, and campus services into one platform.",
    about:
      "Students often rely on multiple platforms to manage different aspects of campus life. This fragmented experience can make it difficult to stay organized and connected. Arunika was created as a Smart Campus Experience platform that unifies essential academic and campus services into a single application.",
    keyFeatures: [],
    technologies: ["Figma"],
    repositoryLink: null,
    demoLink: null,
    images: ["/images/projects/arunika/arunika-1.png", "/images/projects/arunika/arunika-2.png"],
    featured: false,
  },
];

export const homeProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
