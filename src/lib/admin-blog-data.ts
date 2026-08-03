export type AdminPost = {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
};

export const initialPosts: AdminPost[] = [
  {
    id: "1",
    slug: "mock-post-one",
    category: "ENGINEERING",
    date: "Mock Date",
    title: "Mock Post One: Building a Marketplace with PostGIS",
    excerpt:
      "How location-based matching works under the hood, and why we chose PostGIS over a third-party maps API.",
    content: "Full post content placeholder — write the real article here.",
  },
  {
    id: "2",
    slug: "mock-post-two",
    category: "CAREER",
    date: "Mock Date",
    title: "Mock Post Two: From Support Tickets to Technical Manager",
    excerpt:
      "Lessons from managing a team of ten across a nationwide ISP, and what changed in how I think about leadership.",
    content: "Full post content placeholder — write the real article here.",
  },
  {
    id: "3",
    slug: "mock-post-three",
    category: "TUTORIAL",
    date: "Mock Date",
    title: "Mock Post Three: Setting Up Supabase Auth for a Solo Dashboard",
    excerpt:
      "A walkthrough of locking an admin dashboard to a single account using Supabase Auth and row-level security.",
    content: "Full post content placeholder — write the real article here.",
  },
];

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
