export type Post = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "mock-post-one",
    category: "ENGINEERING",
    date: "Mock Date",
    title: "Mock Post One: Building a Marketplace with PostGIS",
    excerpt:
      "Placeholder excerpt: how location-based matching works under the hood, and why we chose PostGIS over a third-party maps API.",
  },
  {
    slug: "mock-post-two",
    category: "CAREER",
    date: "Mock Date",
    title: "Mock Post Two: From Support Tickets to Technical Manager",
    excerpt:
      "Placeholder excerpt: lessons from managing a team of ten across a nationwide ISP, and what changed in how I think about leadership.",
  },
  {
    slug: "mock-post-three",
    category: "TUTORIAL",
    date: "Mock Date",
    title: "Mock Post Three: Setting Up Supabase Auth for a Solo Dashboard",
    excerpt:
      "Placeholder excerpt: a walkthrough of locking an admin dashboard to a single account using Supabase Auth and row-level security.",
  },
  {
    slug: "mock-post-four",
    category: "TUTORIAL",
    date: "Mock Date",
    title: "Mock Post Four: Building a Bilingual Website with Next.js",
    excerpt:
      "Placeholder excerpt: handling EN/Dari content switching, RTL layout considerations, and structuring translated content.",
  },
  {
    slug: "mock-post-five",
    category: "ENGINEERING",
    date: "Mock Date",
    title: "Mock Post Five: Designing a Billing System for 500+ Customers",
    excerpt:
      "Placeholder excerpt: subscription tracking, invoicing edge cases, and keeping the system fast as customer count grows.",
  },
];
