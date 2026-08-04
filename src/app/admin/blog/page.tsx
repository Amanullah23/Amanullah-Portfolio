"use client";

import { useState, useEffect } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  BlogPost,
  getBlogPostsClient,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/supabase/blog-client";

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
  </svg>
);

const EditIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z" />
  </svg>
);

type FormState = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
};

const emptyForm: FormState = {
  category: "",
  date: "",
  title: "",
  excerpt: "",
  content: "",
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadPosts() {
    setLoading(true);
    const data = await getBlogPostsClient();
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function openNewForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(post: BlogPost) {
    setForm({
      category: post.category,
      date: post.date,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
    });
    setEditingId(post.id);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, form);
      } else {
        await createBlogPost(form);
      }
      setShowForm(false);
      await loadPosts();
    } catch (err) {
      alert("Failed to save: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deleteError, setDeleteError] = useState("");

  function requestDelete(post: BlogPost) {
    setDeleteTarget(post);
    setDeleteError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBlogPost(deleteTarget.id);
      setDeleteTarget(null);
      await loadPosts();
    } catch (err) {
      setDeleteError((err as Error).message);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    fontSize: "16px",
    color: "var(--text-primary)",
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "8px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12.5px",
    color: "var(--text-secondary)",
    marginBottom: "6px",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 6px",
            }}
          >
            Blog Posts
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Write and manage articles shown on your /blog page.
          </p>
        </div>
        <button
          onClick={openNewForm}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            fontSize: "13.5px",
            fontWeight: 600,
            color: "white",
            background: "#059669",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            boxShadow: "0 0 14px rgba(5,150,105,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          <PlusIcon /> New Post
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSave}
          style={{
            background: "var(--card-bg)",
            border: "1px solid rgba(5,150,105,0.3)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: "0 0 4px",
            }}
          >
            {editingId ? "Edit Post" : "New Post"}
          </h3>

          <div className="admin-form-grid-2">
            <div>
              <label style={labelStyle}>Category</label>
              <input
                required
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value.toUpperCase() })
                }
                style={inputStyle}
                placeholder="e.g. ENGINEERING"
              />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={inputStyle}
                placeholder="e.g. Aug 3, 2026"
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={inputStyle}
              placeholder="Post title"
            />
          </div>

          <div>
            <label style={labelStyle}>Excerpt</label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Short 1-2 sentence summary shown on the blog list"
            />
          </div>

          <div>
            <label style={labelStyle}>Content</label>
            <textarea
              required
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{
                ...inputStyle,
                resize: "vertical",
                fontFamily: "inherit",
              }}
              placeholder="Full article content"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "6px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 20px",
                fontSize: "13.5px",
                fontWeight: 600,
                color: "white",
                background: saving ? "rgba(5,150,105,0.6)" : "#059669",
                border: "none",
                borderRadius: "8px",
                cursor: saving ? "default" : "pointer",
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: "10px 20px",
                fontSize: "13.5px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                background: "transparent",
                border: "1px solid var(--card-border)",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          Loading...
        </p>
      ) : posts.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          No posts yet — click &quot;New Post&quot; to write your first one.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              className="admin-post-card"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "14px",
                padding: "16px 18px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 600,
                      color: "#34D399",
                      background: "rgba(5,150,105,0.12)",
                      border: "1px solid rgba(5,150,105,0.3)",
                      borderRadius: "9999px",
                      padding: "2px 8px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    style={{ fontSize: "12px", color: "var(--text-muted)" }}
                  >
                    {post.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "14.5px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 4px",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {post.excerpt}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => openEditForm(post)}
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "8px",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => requestDelete(post)}
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.25)",
                    borderRadius: "8px",
                    color: "#F87171",
                    cursor: "pointer",
                  }}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 560px) {
          .admin-form-grid-2 {
            grid-template-columns: 1fr;
          }
          .admin-post-card {
            flex-direction: column;
          }
          .admin-post-card > div:last-child {
            align-self: flex-end;
          }
        }
      `}</style>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this post?"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" will be permanently removed.${deleteError ? ` Error: ${deleteError}` : ""}`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
