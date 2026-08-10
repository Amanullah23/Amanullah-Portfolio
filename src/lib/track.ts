export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  const key = "portfolio_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function trackEvent(eventName: string) {
  try {
    fetch("/api/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        path: window.location.pathname,
        visitorId: getVisitorId(),
      }),
    }).catch(() => {});
  } catch {
    // never let tracking break a click
  }
}
