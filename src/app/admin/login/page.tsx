"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#34D399"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "500px",
          maxWidth: "100vw",
          background:
            "radial-gradient(ellipse, rgba(5,150,105,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="login-card"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "400px",
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "20px",
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              background: "rgba(5,150,105,0.12)",
              border: "1px solid rgba(5,150,105,0.3)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              flexShrink: 0,
            }}
          >
            <LockIcon />
          </div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 6px",
              textAlign: "center",
            }}
          >
            Admin Login
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              textAlign: "center",
              margin: 0,
            }}
          >
            Sign in to manage your portfolio content.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "16px",
                color: "var(--text-primary)",
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                borderRadius: "10px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "16px",
                color: "var(--text-primary)",
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                borderRadius: "10px",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: "13px", color: "#F87171", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "13px",
              fontSize: "14.5px",
              fontWeight: 600,
              color: "white",
              background: loading ? "rgba(5,150,105,0.6)" : "#059669",
              border: "none",
              borderRadius: "10px",
              cursor: loading ? "default" : "pointer",
              boxShadow: "0 0 20px rgba(5,150,105,0.35)",
              transition: "all 0.2s ease",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 420px) {
          .login-card {
            padding: 28px 20px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </main>
  );
}
