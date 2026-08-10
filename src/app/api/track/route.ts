import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad/.test(ua)) return "Tablet";
  if (/mobile|android|iphone/.test(ua)) return "Mobile";
  return "Desktop";
}

export async function POST(req: NextRequest) {
  try {
    const { path, referrer, visitorId } = await req.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const userAgent = req.headers.get("user-agent") || "";
    const device_type = getDeviceType(userAgent);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    await supabase.from("page_views").insert({
      path,
      referrer: referrer || "direct",
      country,
      device_type,
      visitor_id: visitorId || null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Track error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
