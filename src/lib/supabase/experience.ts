import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";

export type ExperienceEntry = {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
  sort_order: number;
  created_at: string;
};

// For server components (public About page)
export async function getExperienceServer(): Promise<ExperienceEntry[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
  return data ?? [];
}

// For client components (admin page)
export async function getExperienceClient(): Promise<ExperienceEntry[]> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
  return data ?? [];
}

export async function createExperience(
  entry: Omit<ExperienceEntry, "id" | "created_at" | "sort_order">,
) {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("experience").insert(entry);
  if (error) throw error;
}

export async function updateExperience(
  id: string,
  entry: Omit<ExperienceEntry, "id" | "created_at" | "sort_order">,
) {
  const supabase = createBrowserClient();
  const { error } = await supabase
    .from("experience")
    .update(entry)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteExperience(id: string) {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw error;
}
