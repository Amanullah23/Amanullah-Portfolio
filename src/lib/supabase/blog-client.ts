import { createClient } from "@/lib/supabase/client";

export type BlogPost = {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
};

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getBlogPostsClient(): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  return data ?? [];
}

export async function createBlogPost(
  post: Omit<BlogPost, "id" | "created_at" | "slug">,
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("blog_posts")
    .insert({ ...post, slug: slugify(post.title) });
  if (error) throw error;
}

export async function updateBlogPost(
  id: string,
  post: Omit<BlogPost, "id" | "created_at" | "slug">,
) {
  const supabase = createClient();
  const { error } = await supabase.from("blog_posts").update(post).eq("id", id);
  if (error) throw error;
}

export async function deleteBlogPost(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}
