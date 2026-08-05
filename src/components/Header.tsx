"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection, setScrollTarget } from "@/lib/scroll";
import { useTheme } from "@/lib/theme-context";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  { label: "FAQ", href: "/faq" },
];

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const SunIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 20px 0",
      }}
    >
      {/* Floating Pill — Desktop */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 10px",
          borderRadius: "9999px",
          background: "var(--bg-elevated)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--card-border)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px var(--card-border)"
            : "0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px var(--card-border)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            paddingLeft: "4px",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              background: "#059669",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 14px rgba(5,150,105,0.6)",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>
              A
            </span>
          </div>
          <span
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "-0.3px",
            }}
          >
            Amanullah
          </span>
        </Link>

        {/* Nav Links — Desktop only */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "2px" }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setBlogDropdownOpen(true)}
                  onMouseLeave={() => setBlogDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    style={{
                      padding: "7px 14px",
                      fontSize: "13.5px",
                      color:
                        hoveredLink === link.label || blogDropdownOpen
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      background:
                        hoveredLink === link.label || blogDropdownOpen
                          ? "var(--card-bg)"
                          : "transparent",
                      borderRadius: "9999px",
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                    }}
                  >
                    {link.label}
                  </Link>

                  {blogDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--bg)",
                        border: "1px solid var(--card-border)",
                        borderRadius: "12px",
                        padding: "6px",
                        minWidth: "160px",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
                        zIndex: 60,
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          style={{
                            display: "block",
                            padding: "9px 12px",
                            fontSize: "13.5px",
                            color: "var(--text-secondary)",
                            textDecoration: "none",
                            borderRadius: "8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isHash = link.href.startsWith("#");
            return (
              <Link
                key={link.label}
                href={isHash ? (isHome ? link.href : "/") : link.href}
                onClick={(e) => {
                  if (!isHash) return;
                  if (isHome) {
                    scrollToSection(e, link.href.slice(1));
                  } else {
                    setScrollTarget(link.href.slice(1));
                  }
                }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  padding: "7px 14px",
                  fontSize: "13.5px",
                  color:
                    hoveredLink === link.label
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  background:
                    hoveredLink === link.label
                      ? "var(--card-bg)"
                      : "transparent",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            paddingRight: "4px",
          }}
        >
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "50%",
              color: "var(--text-secondary)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* GitHub */}
          <Link
            href="https://github.com/Amanullah23"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 12px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              borderRadius: "9999px",
              transition: "all 0.18s ease",
            }}
          >
            <GitHubIcon size={15} />
            <span className="hidden-mobile">GitHub</span>
          </Link>

          {/* Hire Me pill button */}
          <Link
            href={isHome ? "#contact" : "/"}
            onClick={(e) => {
              if (isHome) {
                scrollToSection(e, "contact");
              } else {
                setScrollTarget("contact");
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              fontSize: "13.5px",
              fontWeight: 600,
              color: "white",
              background: "#059669",
              borderRadius: "9999px",
              textDecoration: "none",
              boxShadow: "0 0 14px rgba(5,150,105,0.4)",
              transition: "all 0.18s ease",
              whiteSpace: "nowrap",
            }}
          >
            Hire Me
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              width: "36px",
              height: "36px",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "50%",
              color: "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.18s ease",
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              marginTop: "10px",
              width: "100%",
              background: "var(--bg-elevated)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--card-border)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            }}
          >
            {navLinks.flatMap((link) =>
              link.children
                ? link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "16px 24px",
                        fontSize: "15px",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        textAlign: "center",
                        borderBottom: "1px solid var(--card-border)",
                      }}
                    >
                      {child.label}
                    </Link>
                  ))
                : [
                    (() => {
                      const isHash = link.href.startsWith("#");
                      return (
                        <Link
                          key={link.label}
                          href={isHash ? (isHome ? link.href : "/") : link.href}
                          onClick={(e) => {
                            setMobileOpen(false);
                            if (!isHash) return;
                            if (isHome) {
                              scrollToSection(e, link.href.slice(1));
                            } else {
                              setScrollTarget(link.href.slice(1));
                            }
                          }}
                          style={{
                            display: "block",
                            padding: "16px 24px",
                            fontSize: "15px",
                            color: "var(--text-secondary)",
                            textDecoration: "none",
                            textAlign: "center",
                            borderBottom: "1px solid var(--card-border)",
                          }}
                        >
                          {link.label}
                        </Link>
                      );
                    })(),
                  ],
            )}
            <div style={{ padding: "12px 16px" }}>
              <Link
                href={isHome ? "#contact" : "/"}
                onClick={(e) => {
                  setMobileOpen(false);
                  if (isHome) {
                    scrollToSection(e, "contact");
                  } else {
                    setScrollTarget("contact");
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "white",
                  background: "#059669",
                  textDecoration: "none",
                  borderRadius: "14px",
                }}
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
