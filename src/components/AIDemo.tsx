"use client";

import { useState } from "react";

const SparklesIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#34D399"
    strokeWidth="2"
  >
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6M10 14L21 3" />
  </svg>
);

const KARJO_JOBS_URL = "https://karjo.vercel.app/jobs";

type SampleItem = { title: string; match: string };

const SAMPLE_RESULTS: { keywords: string[]; items: SampleItem[] }[] = [
  {
    keywords: ["frontend", "react", "developer", "web"],
    items: [
      {
        title: "Frontend Developer — Local Tech Startup, Kabul",
        match: "React experience listed in your profile, remote-friendly role.",
      },
      {
        title: "React Developer (Part-time) — Telecom Company",
        match: "Overlaps with your recent project tags, flexible hours.",
      },
      {
        title: "Web Developer — International NGO (Remote)",
        match: "Remote-first, similar tech stack to your saved preferences.",
      },
    ],
  },
  {
    keywords: ["backend", "node", "api", "server"],
    items: [
      {
        title: "Backend Developer — Fintech Startup (Remote)",
        match: "Node.js and API experience from your profile.",
      },
      {
        title: "API Engineer — E-commerce Platform",
        match: "Recent activity building REST APIs.",
      },
      {
        title: "Server-Side Developer — Regional Telecom",
        match: "Infrastructure background aligns with listed skills.",
      },
    ],
  },
  {
    keywords: ["mobile", "flutter", "android", "ios", "app"],
    items: [
      {
        title: "Mobile App Developer (Flutter) — Ride-hailing Startup",
        match: "Flutter listed as a core skill.",
      },
      {
        title: "Android Developer — Local Delivery App",
        match: "Mobile development history in saved profile.",
      },
      {
        title: "Flutter Engineer (Contract) — International Client",
        match: "Remote, matches your available-for-freelance status.",
      },
    ],
  },
  {
    keywords: ["manager", "lead", "technical", "team"],
    items: [
      {
        title: "Technical Team Lead — Growing ISP",
        match: "Leadership experience and technical management background.",
      },
      {
        title: "Engineering Manager (Remote) — SaaS Company",
        match: "Team leadership + hands-on technical skill combination.",
      },
      {
        title: "Project Manager, Tech — NGO Digital Team",
        match: "Project management history in your saved experience.",
      },
    ],
  },
];

const DEFAULT_ITEMS: SampleItem[] = [
  {
    title: "Software Developer — Local Tech Company",
    match: "General technical skill overlap.",
  },
  {
    title: "Remote Developer Role — International Client",
    match: "Open-to-remote-work preference.",
  },
  {
    title: "Junior-to-Mid Developer — Growing Startup",
    match: "Broad skill match based on your saved profile.",
  },
];

function getSampleItems(input: string): SampleItem[] {
  const lower = input.toLowerCase();
  const match = SAMPLE_RESULTS.find((entry) =>
    entry.keywords.some((kw) => lower.includes(kw)),
  );
  return match ? match.items : DEFAULT_ITEMS;
}

export default function AIDemo() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SampleItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  function handleTry(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResults(null);

    setTimeout(() => {
      setResults(getSampleItems(input));
      setLoading(false);
    }, 700);
  }

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid rgba(5,150,105,0.3)",
        borderRadius: "18px",
        padding: "28px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        <SparklesIcon />
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Try It: KarJo Smart Matching Preview
        </h3>
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-muted)",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}
      >
        A simulated preview of the AI matching concept described above — these
        example matches are pre-written, not live results from a model or
        KarJo&apos;s actual database. Click any result to browse real, current
        listings on KarJo.
      </p>

      <form
        onSubmit={handleTry}
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. remote frontend developer"
          maxLength={100}
          style={{
            flex: "1 1 220px",
            padding: "12px 14px",
            fontSize: "16px",
            color: "var(--text-primary)",
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
            borderRadius: "10px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            color: "white",
            background: loading ? "rgba(5,150,105,0.6)" : "#059669",
            border: "none",
            borderRadius: "10px",
            cursor: loading ? "default" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Thinking..." : "Try It"}
        </button>
      </form>

      {results && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {results.map((item, i) => (
            <a
              key={i}
              href={KARJO_JOBS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                background: "var(--input-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "12px",
                padding: "14px 16px",
                textDecoration: "none",
                transition: "border-color 0.2s ease",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 4px",
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Matches: {item.match}
                </p>
              </div>
              <span
                style={{
                  color: "#34D399",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ExternalLinkIcon />
              </span>
            </a>
          ))}

          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              margin: "4px 0 0",
            }}
          >
            Each result opens real, current listings on KarJo in a new tab.
          </p>
        </div>
      )}
    </div>
  );
}
