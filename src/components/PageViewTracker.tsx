"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking admin pages — you don't need analytics on your own dashboard visits
    if (pathname.startsWith("/admin")) return;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || "",
      }),
    }).catch(() => {
      // Fail silently — tracking should never break the site
    });
  }, [pathname]);

  return null;
}
