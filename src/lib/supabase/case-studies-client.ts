import { createClient } from "@/lib/supabase/client";

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  image_url: string | null;
  problem: string;
  solution: string;
  technology: string;
  result: string;
  created_at: string;
};

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getCaseStudiesClient(): Promise<CaseStudy[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
  return data ?? [];
}

export async function createCaseStudy(
  cs: Omit<CaseStudy, "id" | "created_at" | "slug">,
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("case_studies")
    .insert({ ...cs, slug: slugify(cs.title) });
  if (error) throw error;
}

export async function updateCaseStudy(
  id: string,
  cs: Omit<CaseStudy, "id" | "created_at" | "slug">,
) {
  const supabase = createClient();
  const { error } = await supabase.from("case_studies").update(cs).eq("id", id);
  if (error) throw error;
}

export async function deleteCaseStudy(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) throw error;
}
