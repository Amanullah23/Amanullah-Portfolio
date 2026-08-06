import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AIDemo from "@/components/AIDemo";

const tools = [
  {
    name: "Claude (Anthropic)",
    use: "My primary AI coding partner — used throughout building this portfolio itself, from component architecture to debugging Supabase RLS policies.",
  },
  {
    name: "ChatGPT / GPT models",
    use: "Content drafting, brainstorming copy and structure, and reasoning through architecture decisions before implementation.",
  },
  {
    name: "GitHub Copilot",
    use: "In-editor code completion for faster day-to-day implementation once a pattern is established.",
  },
  {
    name: "AI-assisted data processing",
    use: "Cleaning, structuring, and summarizing data pulled from multiple sources — the same pattern behind KarJo's job aggregation.",
  },
];

const approach = [
  {
    title: "AI drafts, I decide",
    description:
      "AI is fast at generating options — code, copy, structure — but every architectural decision, every line that ships to production, is reviewed and understood by me first. I don't ship code I can't explain.",
  },
  {
    title: "Automate the repetitive, not the judgment calls",
    description:
      "Data collection, formatting, first-draft content, boilerplate code — good candidates for AI. Security decisions, database schema design, and client-facing architecture — I keep those fully in my own hands.",
  },
  {
    title: "AI as a force multiplier for a small team",
    description:
      "As someone who leads a small technical team, AI tooling lets us move faster on execution while keeping the same headcount — more useful in a market like Afghanistan's where hiring specialized talent is harder.",
  },
];

const roadmap = [
  "Smarter job matching in KarJo based on a candidate's profile and application history, not just keyword search",
  "Natural-language job search — 'remote frontend jobs posted this week' instead of manual filters",
  "An AI draft assistant inside this portfolio's own admin dashboard, for generating first-draft blog posts from a few bullet points",
  "Automated case-study summarization for future client projects, cutting the write-up time after a project ships",
];

export default function AIPage() {
  return (
    <main>
      <Header />

      <section
        style={{
          padding: "160px 24px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(5,150,105,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "820px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#34D399",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            AI in My Work
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              margin: "0 0 16px",
            }}
          >
            How I Use AI to Build Better Products
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            AI is a tool I use deliberately — for code generation, content, data
            processing, and client work — not a buzzword I attach to a project.
            Here&apos;s exactly how, with real examples.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 24px",
            }}
          >
            Tools I Use
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {tools.map((tool) => (
              <div
                key={tool.name}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "14px",
                  padding: "18px 22px",
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#34D399",
                    margin: "0 0 6px",
                  }}
                >
                  {tool.name}
                </h3>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {tool.use}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 24px",
            }}
          >
            My Approach to AI Integration
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {approach.map((item) => (
              <div key={item.title}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 6px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "14.5px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example 1: KarJo */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              color: "#34D399",
              background: "rgba(5,150,105,0.12)",
              border: "1px solid rgba(5,150,105,0.3)",
              borderRadius: "9999px",
              padding: "4px 12px",
              marginBottom: "14px",
            }}
          >
            Live Example
          </span>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 16px",
            }}
          >
            KarJo — Automated Job Aggregation
          </h2>
          <p
            style={{
              fontSize: "14.5px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              margin: "0 0 16px",
            }}
          >
            KarJo automatically collects job listings from multiple sources —
            job boards and employer submissions — into a single feed, with a
            scheduled daily digest sent via push notification and Telegram. This
            is where I&apos;m applying automation today: pulling, cleaning, and
            structuring data at scale so a user never has to check five
            different places.
          </p>
          <p
            style={{
              fontSize: "14.5px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            <strong style={{ color: "var(--text-primary)" }}>
              Where I want to take it next:{" "}
            </strong>
            adding an LLM layer on top of the raw aggregation — so instead of
            just collecting listings, the bot could match a candidate&apos;s
            saved profile against new postings and flag the ones actually worth
            applying to, or let someone search in plain language (&quot;remote
            frontend jobs this week&quot;) instead of manually filtering.
            That&apos;s the difference between an aggregator and an assistant.
          </p>
          <p style={{ fontSize: "13.5px", margin: "16px 0 24px" }}>
            <Link
              href="/case-studies/karjo-afghan-job-aggregator"
              style={{
                color: "#34D399",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Read the full KarJo case study →
            </Link>
          </p>

          <AIDemo />
        </div>
      </section>

      {/* Example 2: Planned */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "9999px",
              padding: "4px 12px",
              marginBottom: "14px",
            }}
          >
            Planned
          </span>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 16px",
            }}
          >
            AI Draft Assistant for This Portfolio&apos;s Own Dashboard
          </h2>
          <p
            style={{
              fontSize: "14.5px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            The admin dashboard behind this site already lets me manage blog
            posts, projects, and case studies. The next step is adding an AI
            draft button directly inside the blog editor — I&apos;d give it a
            topic and a few bullet points, and it would generate a first-draft
            post in my voice, which I&apos;d then edit and publish. It&apos;s a
            small feature, but it&apos;s a real, buildable example of AI
            reducing the time between &quot;I have something to write
            about&quot; and &quot;it&apos;s published.&quot;
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section style={{ padding: "40px 24px 100px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 24px",
            }}
          >
            What&apos;s Next
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {roadmap.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "12px",
                  padding: "14px 18px",
                }}
              >
                <span
                  style={{
                    width: "22px",
                    height: "22px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: "rgba(5,150,105,0.15)",
                    color: "#34D399",
                    fontSize: "11px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#059669",
                color: "white",
                fontSize: "14.5px",
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(5,150,105,0.4)",
              }}
            >
              Have an AI feature idea? Let&apos;s talk
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
