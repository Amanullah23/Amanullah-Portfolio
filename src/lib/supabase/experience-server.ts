import { createClient } from "@/lib/supabase/server";
import type { ExperienceEntry } from "@/lib/supabase/experience-client";

export async function getExperienceServer(): Promise<ExperienceEntry[]> {
  const supabase = await createClient();
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
