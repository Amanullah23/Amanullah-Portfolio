import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_EVENTS = new Set([
  "download_resume",
  "hire_me_click",
  "project_live_click",
  "contact_email_click",
  "contact_phone_click",
  "contact_whatsapp_click",
  "social_github_click",
  "social_linkedin_click",
]);

export async function POST(req: NextRequest) {
  try {
    const { eventName, path, visitorId } = await req.json();

    if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    await supabase.from("site_events").insert({
      event_name: eventName,
      path: path || null,
      visitor_id: visitorId || null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Track event error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
