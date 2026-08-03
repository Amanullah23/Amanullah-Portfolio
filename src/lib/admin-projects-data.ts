export type AdminProject = {
  id: string;
  title: string;
  description: string;
  tags: string;
  github: string;
  live: string;
  featured: boolean;
};

export const initialProjects: AdminProject[] = [
  {
    id: "1",
    title: "Mock Project One",
    description:
      "A full-stack marketplace app connecting customers with local service providers, with real-time location matching.",
    tags: "Next.js, Supabase, PostGIS",
    github: "https://github.com/Amanullah23",
    live: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Mock Project Two",
    description:
      "A job aggregator platform pulling listings from multiple sources into one searchable feed with a Telegram bot.",
    tags: "Flutter, Next.js, Telegram Bot API",
    github: "https://github.com/Amanullah23",
    live: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Mock Project Three",
    description:
      "An ISP billing and customer management system handling subscriptions, invoicing, and support tickets.",
    tags: "React, Node.js, PostgreSQL",
    github: "https://github.com/Amanullah23",
    live: "",
    featured: false,
  },
];
