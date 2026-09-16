export type ProjectCategory = "selected" | "passion";

export type Project = {
  title: string;
  role: string;
  description: string;
  technologies: string[];
  href: string;
  sourceCodeHref: string | null;
  demoHref: string | null;
  category: ProjectCategory;
  images: string[];
  showOnHome: boolean;
};

export const projects: Project[] = [
  {
    title: "HapHap",
    role: "Full-Stack Developer",
    description: "A surplus food marketplace mobile app that connects local merchants with customers to rescue the day’s high-quality unsold meals at discounted prices before they go to waste.",
    technologies: ["Flutter", "NestJS", "PostgreSQL", "Midtrans"],
    href: "#",
    sourceCodeHref: null,
    demoHref: null,
    category: "selected",
    images: ["/images/projects/haphap.png"],
    showOnHome: true,
  },
  {
    title: "Katasaka",
    role: "UI/UX Designer",
    description: "An AI-powered mobile application that brings Indonesian folk tales to life through interactive storytelling and engaging digital experiences.",
    technologies: ["Figma", "React", "Tailwind CSS", "Express.js", "PostgreSQL"],
    href: "#",
    sourceCodeHref: null,
    demoHref: null,
    category: "selected",
    images: ["/images/projects/katasaka.png"],
    showOnHome: true,
  },
  {
    title: "Klean",
    role: "Full-Stack Developer",
    description: "A digital laundry marketplace that connects customers with trusted local laundry merchants through a seamless pickup and delivery experience.",
    technologies: ["React", "Tailwind CSS", "Express.js", "PostgreSQL", "Midtrans"],
    href: "#",
    sourceCodeHref: null,
    demoHref: null,
    category: "passion",
    images: ["/images/projects/klean.png"],
    showOnHome: true,
  },
  // {
  //   title: "Bersih.In",
  //   role: "Full-Stack & ML Developer",
  //   description: "An AI-powered waste classification platform that analyzes images and provides instant waste classification to help users sort and dispose of waste correctly.",
  //   technologies: ["React", "Tailwind CSS", "Express.js", "Flask", "EfficientNet-B0"],
  //   href: "#",
  //   sourceCodeHref: null,
  //   demoHref: null,
  //   category: "passion",
  //   images: ["/images/projects/bersihin.png"],
  //   showOnHome: true,
  // },
  // {
  //   title: "Arunika",
  //   role: "UI/UX Designer",
  //   description: "A next-generation Learning Management System (LMS) that unifies academic tools, resources, and campus services into a single platform for students.",
  //   technologies: ["Figma"],
  //   href: "#",
  //   sourceCodeHref: null,
  //   demoHref: null,
  //   category: "passion",
  //   images: ["/images/projects/arunika.png"],
  //   showOnHome: true,
  // },
];

export const homeSelectedProjects = projects.filter(
  (project) => project.category === "selected" && project.showOnHome,
);

export const homePassionProjects = projects.filter(
  (project) => project.category === "passion" && project.showOnHome,
);
