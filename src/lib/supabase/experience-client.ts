import { createClient } from "@/lib/supabase/client";

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

export async function getExperienceClient(): Promise<ExperienceEntry[]> {
  const supabase = createClient();
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
  const supabase = createClient();
  const { error } = await supabase.from("experience").insert(entry);
  if (error) throw error;
}

export async function updateExperience(
  id: string,
  entry: Omit<ExperienceEntry, "id" | "created_at" | "sort_order">,
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("experience")
    .update(entry)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteExperience(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw error;
}
