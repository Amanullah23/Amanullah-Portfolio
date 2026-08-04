"use client";

import Link from "next/link";
import { scrollToSection, setScrollTarget } from "@/lib/scroll";
import { usePathname } from "next/navigation";
import { socialLinks } from "@/lib/social-links";
import {
  UpworkIcon,
  FiverrIcon,
  FacebookIcon,
  InstagramIcon,
  ThreadsIcon,
  XIcon,
} from "@/components/icons/SocialIcons";

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C10.1 9 9.7 8 9.5 7.5c-.2-.5-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 .9-1 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 0 1 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3z" />
  </svg>
);

const socials = [
  { icon: <GitHubIcon />, href: socialLinks.github, label: "GitHub" },
  { icon: <LinkedinIcon />, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: <WhatsappIcon />, href: socialLinks.whatsapp, label: "WhatsApp" },
  { icon: <UpworkIcon />, href: socialLinks.upwork, label: "Upwork" },
  { icon: <FiverrIcon />, href: socialLinks.fiverr, label: "Fiverr" },
  { icon: <FacebookIcon />, href: socialLinks.facebook, label: "Facebook" },
  { icon: <InstagramIcon />, href: socialLinks.instagram, label: "Instagram" },
  { icon: <ThreadsIcon />, href: socialLinks.threads, label: "Threads" },
  { icon: <XIcon />, href: socialLinks.x, label: "X" },
];

const siteLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const moreLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "GitHub", href: "https://github.com/Amanullah23" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer
      style={{
        background: "var(--footer-bg)",
        borderTop: "1px solid var(--card-border)",
        padding: "64px 24px 28px",
      }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 52px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            margin-bottom: 36px;
          }
          .footer-brand { grid-column: 1 / -1; }
        }
        .footer-link {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
          padding: 3px 0;
        }
        .footer-link:hover { color: var(--text-primary); }
        .footer-social {
          width: 32px;
          height: 32px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s ease;
          flex-shrink: 0;
          color: var(--text-secondary);
        }
        .footer-social:hover {
          background: rgba(5,150,105,0.15);
          border-color: rgba(5,150,105,0.3);
          color: #34D399;
        }
      `}</style>

      <div className="footer-grid">
        <div className="footer-brand">
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                background: "#059669",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(5,150,105,0.5)",
                flexShrink: 0,
              }}
            >
              <span
                style={{ color: "white", fontWeight: 700, fontSize: "14px" }}
              >
                A
              </span>
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Amanullah Yawari
            </span>
          </Link>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              margin: "0 0 20px",
              maxWidth: "260px",
            }}
          >
            Full Stack Developer & Technical Manager based in Kabul,
            Afghanistan.
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                aria-label={s.label}
                className="footer-social"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "0.5px",
              marginBottom: "14px",
            }}
          >
            SITE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {siteLinks.map((l) => (
              <Link
                key={l.label}
                href={isHome ? l.href : "/"}
                onClick={(e) => {
                  if (isHome) {
                    scrollToSection(e, l.href.slice(1));
                  } else {
                    setScrollTarget(l.href.slice(1));
                  }
                }}
                className="footer-link"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "0.5px",
              marginBottom: "14px",
            }}
          >
            MORE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {moreLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                className="footer-link"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--card-border)",
          paddingTop: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          © 2026 Amanullah Yawari. All rights reserved.
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              background: "#059669",
              borderRadius: "50%",
              boxShadow: "0 0 6px rgba(5,150,105,0.8)",
            }}
          />
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Open to freelance work
          </span>
        </div>
      </div>
    </footer>
  );
}
