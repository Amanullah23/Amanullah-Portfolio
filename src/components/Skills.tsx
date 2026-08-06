"use client";

import { motion } from "framer-motion";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  },
});

type SkillCategory = {
  title: string;
  skills: { name: string; level: number }[];
};

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Flutter", level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "PHP / Laravel", level: 80 },
      { name: "Python", level: 75 },
      { name: "PostgreSQL / Supabase", level: 85 },
    ],
  },
  {
    title: "Network & Infrastructure",
    skills: [
      { name: "VSAT Satellite Internet", level: 90 },
      { name: "Mikrotik", level: 85 },
      { name: "Nano Station / TP-Link", level: 80 },
      { name: "CCNA Certified", level: 80 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Vercel", level: 85 },
      { name: "Firebase", level: 75 },
      { name: "Docker", level: 65 },
    ],
  },
  {
    title: "Management",
    skills: [
      { name: "Project Management", level: 90 },
      { name: "Team Leadership", level: 85 },
      { name: "Client Relations", level: 90 },
      { name: "System Administration", level: 80 },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "LLM Integration (Claude, GPT)", level: 85 },
      { name: "Prompt Engineering", level: 85 },
      { name: "AI Chatbots & Agents", level: 80 },
      { name: "Workflow Automation", level: 75 },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        position: "relative",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(5,150,105,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "56px" }}
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
            Skills
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              margin: "0 0 16px",
            }}
          >
            What I Work With
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            A mix of software development, network infrastructure, and
            leadership skills built through hands-on project work and managing
            teams and clients.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={fadeUp(i + 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "18px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#34D399",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  margin: "0 0 20px",
                }}
              >
                {cat.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13.5px",
                          color: "var(--text-primary)",
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        background: "var(--card-border)",
                        borderRadius: "9999px",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        style={{
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #059669, #34D399)",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
