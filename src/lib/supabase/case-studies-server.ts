import { createClient } from "@/lib/supabase/server";
import type { CaseStudy } from "@/lib/supabase/case-studies-client";

export async function getCaseStudiesServer(): Promise<CaseStudy[]> {
  const supabase = await createClient();
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

export async function getCaseStudyBySlugServer(
  slug: string,
): Promise<CaseStudy | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
  return data;
}
