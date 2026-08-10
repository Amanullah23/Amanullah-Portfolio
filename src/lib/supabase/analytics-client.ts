import { createClient } from "@/lib/supabase/client";

export type PageView = {
  id: string;
  path: string;
  referrer: string | null;
  country: string | null;
  device_type: string | null;
  created_at: string;
};

export type AnalyticsSummary = {
  total: number;
  last7Days: number;
  last30Days: number;
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  topCountries: { country: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  recent: PageView[];
};

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = createClient();

  // Fetch the most recent 2000 views — enough for meaningful stats on a portfolio site
  // without unbounded growth; revisit with a proper SQL aggregate view if traffic scales up.
  const { data, error } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error || !data) {
    console.error("Error fetching analytics:", error);
    return {
      total: 0,
      last7Days: 0,
      last30Days: 0,
      topPages: [],
      topReferrers: [],
      topCountries: [],
      deviceBreakdown: [],
      recent: [],
    };
  }

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const last7Days = data.filter(
    (v) => new Date(v.created_at).getTime() >= sevenDaysAgo,
  ).length;
  const last30Days = data.filter(
    (v) => new Date(v.created_at).getTime() >= thirtyDaysAgo,
  ).length;

  function tally(
    field: keyof PageView,
    fallback: string,
  ): { key: string; count: number }[] {
    const counts: Record<string, number> = {};
    for (const view of data ?? []) {
      const value = (view[field] as string) || fallback;
      counts[value] = (counts[value] || 0) + 1;
    }
    return Object.entries(counts)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count);
  }

  const topPages = tally("path", "/")
    .map((x) => ({ path: x.key, count: x.count }))
    .slice(0, 8);
  const topReferrers = tally("referrer", "direct")
    .map((x) => ({ referrer: x.key, count: x.count }))
    .slice(0, 8);
  const topCountries = tally("country", "Unknown")
    .map((x) => ({ country: x.key, count: x.count }))
    .slice(0, 8);
  const deviceBreakdown = tally("device_type", "Unknown").map((x) => ({
    device: x.key,
    count: x.count,
  }));

  return {
    total: data.length,
    last7Days,
    last30Days,
    topPages,
    topReferrers,
    topCountries,
    deviceBreakdown,
    recent: data.slice(0, 20),
  };
}
