import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Milestone = { year: string; label: string };

const timeline: Milestone[] = [
  { year: "1994", label: "Born in Malistan, Afghanistan" },
  { year: "2001", label: "Started school at Shahid Balkhi High School" },
  { year: "2001–2014", label: "Ranked first in class all 12 years" },
  { year: "—", label: "Two years of school completed in Herat" },
  { year: "—", label: "Kankor exam — scored 315" },
  { year: "2015", label: "Admitted to Computer Science, Kabul University" },
  { year: "2018", label: "Graduated Kabul University" },
  { year: "2018–2019", label: "Web Developer — Fanoos Accounting Company" },
  { year: "2019", label: "IT Assistant — Independent Election Commission" },
  { year: "2019–2020", label: "Software Developer — Techzone Solutions" },
  { year: "2021–2023", label: "Technical Sales Manager — Talia Corporation" },
  {
    year: "2024–Present",
    label: "Coordinator / Technical Sales Manager — Quika Afghanistan",
  },
  {
    year: "—",
    label: "Built KarJo, Keesa, Ariana Expeditions, and this portfolio",
  },
  {
    year: "2026",
    label: "Building toward international, remote, product-led work",
  },
];

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: "3px solid #059669",
        margin: "36px 0",
        padding: "4px 0 4px 20px",
        fontSize: "17px",
        fontStyle: "italic",
        color: "var(--text-primary)",
        lineHeight: 1.6,
      }}
    >
      {children}
    </blockquote>
  );
}

function Era({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "var(--text-primary)",
          margin: "0 0 14px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "15px",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function MyStoryPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section
        style={{
          padding: "160px 24px 60px",
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
            maxWidth: "760px",
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
            My Story
          </span>
          <h3
            style={{
              fontSize: "clamp(20px, 5vw, 36px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              lineHeight: 1.2,
              margin: "0 0 20px",
            }}
          >
            From Malistan to Software Engineering,
            <br />
            ISP Operations, and Building Products
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Every résumé shows what I&apos;ve done. This page is about how I got
            here — the education, the detours, the difficult years, and why I
            kept building anyway.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "20px 24px 60px" }}>
        <div
          style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              left: "5px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              background:
                "linear-gradient(to bottom, rgba(5,150,105,0.6), var(--card-border))",
            }}
          />
          {timeline.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: i === timeline.length - 1 ? 0 : "18px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#34D399",
                  boxShadow: "0 0 8px rgba(52,211,153,0.6)",
                  flexShrink: 0,
                  marginTop: "4px",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#34D399",
                  }}
                >
                  {m.year}
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    margin: "2px 0 0",
                  }}
                >
                  {m.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <section style={{ padding: "20px 24px 100px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Era title="Where It Started — Malistan, 1994">
            <p>
              I was born on November 19, 1994, in Malistan, Afghanistan — a
              place where educational opportunities, technology, and modern
              infrastructure looked very different from major cities. No one
              could have predicted that a child born there would eventually
              build a career around computer science, networking, and digital
              products. Every journey starts somewhere simple: a child, a
              family, and a long road that hadn&apos;t unfolded yet.
            </p>
          </Era>

          <Era title="School, Herat, and the Path to University">
            <p>
              I started school in 2001 at Shahid Balkhi High School. Long before
              programming or the internet meant anything to me, school gave me
              something more fundamental: discipline, curiosity, and a refusal
              to settle for average. I ranked first in my class for all 12
              years, grade 1 through 12 — not just an academic result, but a
              pattern that would repeat throughout my life.
            </p>
            <p>
              Partway through, I spent two years continuing my education in
              Herat — a new city, a new environment, and a lesson in adapting
              fast and building relationships from scratch. It became the bridge
              between my early education and the much bigger challenge waiting
              in Kabul.
            </p>
            <p>
              After school came Kankor, Afghanistan&apos;s university entrance
              exam. I scored 315 — enough to be admitted to Computer Science at
              Kabul University. What began as a major eventually became the
              foundation of everything that followed.
            </p>
          </Era>

          <Era title="University Was Only the Foundation">
            <p>
              At Kabul University I built a base across programming, algorithms,
              data structures, databases, networks, and software engineering.
              But I learned quickly that a degree opens a door — it doesn&apos;t
              walk you through it. The real world demanded problem-solving,
              communication, customer management, and constant self-directed
              learning that no classroom could fully prepare me for.
            </p>
            <Quote>
              A degree can open a door, but continuous learning and real-world
              execution determine how far you can go.
            </Quote>
            <p>
              I graduated in 2018. The question shifted immediately from
              &quot;what have I studied?&quot; to &quot;what can I actually
              build?&quot;
            </p>
          </Era>

          <Era title="Early Career — Learning by Doing">
            <p>
              My first professional role was Web Developer at Fanoos Accounting
              Company (Dec 2018 – May 2019) — the first time academic concepts
              had to become real, working systems for real users. From there I
              worked as IT Assistant at the Independent Election Commission
              (2019), which stretched my view of technology beyond writing code
              into troubleshooting, hardware, and keeping systems operational
              under pressure.
            </p>
            <p>
              I then joined Techzone Solutions as a Software Developer (Sept
              2019 – Dec 2020), where the gap between &quot;Computer Science
              graduate&quot; and &quot;professional developer&quot; closed
              significantly — strengthening real experience in application
              architecture, databases, APIs, and debugging.
            </p>
          </Era>

          <Era title="From Developer to Technical Sales">
            <p>
              In 2021 my career took an important turn: Technical Sales Manager
              at Talia Corporation. It moved me from a purely technical track
              into the intersection of technology and business — learning to
              identify customer needs, explain technical solutions clearly, and
              bridge the gap between engineering teams and the people actually
              paying for the product.
            </p>
            <Quote>
              Technology alone isn&apos;t enough. Real impact comes from
              understanding the business problem technology is supposed to
              solve.
            </Quote>
          </Era>

          <Era title="Quika, ISP Operations, and the Field">
            <p>
              One of the most significant chapters of my career has been Quika
              Afghanistan, where I&apos;ve worked as Coordinator, Technical
              Sales Manager, and Head Technical Manager. This pulled me deep
              into satellite internet and networking — VSAT, MikroTik, LHG5,
              QRT5, Tenda routers, IP networking, NAT, VLAN, and BGP —
              technology very different from writing application code.
            </p>
            <p>
              At this stage I was supporting an ISP environment serving roughly
              3,000 customers. Supporting a handful of users is nothing like
              operating at that scale — reliability, escalation handling, and
              operational discipline become critical. This wasn&apos;t
              theoretical: it meant real field work — equipment installation,
              connectivity troubleshooting, and on-site customer support, not
              just sitting behind a laptop.
            </p>
          </Era>

          <Era title="The Difficult Years">
            <p>
              A story that only lists achievements wouldn&apos;t be honest.
              Building a career in Afghanistan has never been easy, and the
              major changes the country went through after 2021 made things
              harder for a lot of technology professionals — limited job
              opportunities, financial pressure, an unstable market, and real
              uncertainty about the future.
            </p>
            <Quote>
              These challenges became part of my story. But they did not become
              the end of it.
            </Quote>
            <p>
              After years of education and experience, it would have been easy
              to stop. Instead, I chose to build — projects, websites,
              applications, new skills — and to reduce my dependence on any
              single local opportunity by developing capabilities that could
              connect me with remote and international markets.
            </p>
          </Era>

          <Era title="Becoming a Builder">
            <p>
              This is the shift that matters most: from someone waiting for
              opportunity to someone creating it. I built KarJo — an Afghan job
              aggregation platform pulling listings from jobs.af, ACBAR, and
              LinkedIn into one searchable experience, with a Telegram bot,
              bilingual English/Dari support, and automated job collection. I
              built Keesa, a personal finance and life-organization platform
              covering transactions, expenses, income, loans, and notes in one
              dashboard. I built Ariana Expeditions, a full business platform
              for a tourism client. And I built this portfolio — because having
              skills isn&apos;t enough if no one can see them.
            </p>
            <Quote>
              Don&apos;t just tell people what you can build. Show them what you
              have built.
            </Quote>
          </Era>

          <Era title="Where I Stand Today — 2026">
            <p>
              Today I&apos;m far more than a Computer Science graduate. My
              experience spans software development, mobile development, IT
              support, technical sales, ISP operations, satellite networking,
              management, and independent product building. My stack has grown
              from PHP/Laravel through React/Node.js to Next.js, Supabase,
              PostgreSQL, and Flutter — and now includes AI-assisted development
              as part of how I build.
            </p>
            <p>
              My path hasn&apos;t been linear. But that&apos;s exactly what made
              it multidimensional — I understand technology from the
              engineer&apos;s side, the infrastructure side, the customer&apos;s
              side, and the business side. The next chapter isn&apos;t about
              learning another framework. It&apos;s about turning more than a
              decade of experience into a clear professional identity, real
              international opportunities, and products that last.
            </p>
          </Era>

          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid rgba(5,150,105,0.3)",
              borderRadius: "18px",
              padding: "28px",
              marginTop: "56px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                color: "var(--text-primary)",
                lineHeight: 1.8,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              It started in Malistan. It continued through school, Herat, and
              Kabul University. It became a career in software engineering, IT,
              networking, ISP operations, technical sales, and management. It
              survived uncertainty, economic pressure, and a changing country —
              but it never stopped moving forward. Today, that experience is
              becoming a new chapter built around software engineering, digital
              products, and an independent, international career.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
