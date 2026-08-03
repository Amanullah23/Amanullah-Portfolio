import { createClient } from "@/lib/supabase/server";
import type { AdminProject } from "@/lib/supabase/projects-client";

export async function getProjectsServer(): Promise<AdminProject[]> {
  const supabase = await createClient();
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
