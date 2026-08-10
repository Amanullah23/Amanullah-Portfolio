import { createClient } from "@/lib/supabase/client";

export type PageView = {
  id: string;
  path: string;
  referrer: string | null;
  country: string | null;
  device_type: string | null;
  visitor_id: string | null;
  created_at: string;
};

export type DailyCount = { date: string; views: number };

export type AnalyticsSummary = {
  total: number;
  uniqueVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  last7Days: number;
  last30Days: number;
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  topCountries: { country: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  dailyTrend: DailyCount[];
  recent: PageView[];
};

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = createClient();

  const { data: rawData, error } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error || !rawData) {
    console.error("Error fetching analytics:", error);
    return {
      total: 0,
      uniqueVisitors: 0,
      newVisitors: 0,
      returningVisitors: 0,
      last7Days: 0,
      last30Days: 0,
      topPages: [],
      topReferrers: [],
      topCountries: [],
      deviceBreakdown: [],
      dailyTrend: [],
      recent: [],
    };
  }

  const data: PageView[] = rawData;

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const last7Days = data.filter(
    (v) => new Date(v.created_at).getTime() >= sevenDaysAgo,
  ).length;
  const last30Days = data.filter(
    (v) => new Date(v.created_at).getTime() >= thirtyDaysAgo,
  ).length;

  const uniqueVisitors = new Set(data.map((v) => v.visitor_id).filter(Boolean))
    .size;

  // New vs. returning: a visitor is "returning" if they showed up on more than one distinct calendar day
  const visitorDayMap: Record<string, Set<string>> = {};
  for (const view of data) {
    if (!view.visitor_id) continue;
    const day = view.created_at.slice(0, 10);
    if (!visitorDayMap[view.visitor_id])
      visitorDayMap[view.visitor_id] = new Set();
    visitorDayMap[view.visitor_id].add(day);
  }
  let newVisitors = 0;
  let returningVisitors = 0;
  for (const days of Object.values(visitorDayMap)) {
    if (days.size > 1) returningVisitors += 1;
    else newVisitors += 1;
  }

  function tally(
    field: keyof PageView,
    fallback: string,
  ): { key: string; count: number }[] {
    const counts: Record<string, number> = {};
    for (const view of data) {
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

  // Daily trend — last 14 days, oldest to newest
  const dayBuckets: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    dayBuckets[key] = 0;
  }
  for (const view of data) {
    const key = view.created_at.slice(0, 10);
    if (key in dayBuckets) dayBuckets[key] += 1;
  }
  const dailyTrend: DailyCount[] = Object.entries(dayBuckets).map(
    ([date, views]) => ({ date, views }),
  );

  return {
    total: data.length,
    uniqueVisitors,
    newVisitors,
    returningVisitors,
    last7Days,
    last30Days,
    topPages,
    topReferrers,
    topCountries,
    deviceBreakdown,
    dailyTrend,
    recent: data.slice(0, 20),
  };
}

export type EventSummary = { event: string; count: number };

export async function getEventSummary(): Promise<EventSummary[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_events")
    .select("event_name")
    .limit(2000);

  if (error || !data) {
    console.error("Error fetching events:", error);
    return [];
  }

  const counts: Record<string, number> = {};
  for (const row of data) {
    counts[row.event_name] = (counts[row.event_name] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([event, count]) => ({ event, count }))
    .sort((a, b) => b.count - a.count);
}
