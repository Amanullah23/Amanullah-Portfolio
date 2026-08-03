import { createClient } from "@/lib/supabase/client";

export type AdminProject = {
  id: string;
  title: string;
  description: string;
  tags: string;
  github: string | null;
  live: string | null;
  featured: boolean;
  role: string | null;
  sort_order: number;
  created_at: string;
};

export async function getProjectsClient(): Promise<AdminProject[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  return data ?? [];
}

export async function createProject(
  project: Omit<AdminProject, "id" | "created_at" | "sort_order">,
) {
  const supabase = createClient();
  const { error } = await supabase.from("projects").insert(project);
  if (error) throw error;
}

export async function updateProject(
  id: string,
  project: Omit<AdminProject, "id" | "created_at" | "sort_order">,
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
