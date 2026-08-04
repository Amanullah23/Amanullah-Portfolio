"use client";

import { useState, useEffect } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  AdminProject,
  getProjectsClient,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/supabase/projects-client";

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
  title: string;
  description: string;
  tags: string;
  github: string;
  live: string;
  featured: boolean;
  role: string;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  tags: "",
  github: "",
  live: "",
  featured: false,
  role: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    setLoading(true);
    const data = await getProjectsClient();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openNewForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(project: AdminProject) {
    setForm({
      title: project.title,
      description: project.description,
      tags: project.tags,
      github: project.github ?? "",
      live: project.live ?? "",
      featured: project.featured,
      role: project.role ?? "",
    });
    setEditingId(project.id);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        tags: form.tags,
        github: form.github || null,
        live: form.live || null,
        featured: form.featured,
        role: form.role || null,
      };
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }
      setShowForm(false);
      await loadProjects();
    } catch (err) {
      alert("Failed to save: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const [deleteTarget, setDeleteTarget] = useState<AdminProject | null>(null);
  const [deleteError, setDeleteError] = useState("");

  function requestDelete(project: AdminProject) {
    setDeleteTarget(project);
    setDeleteError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id);
      setDeleteTarget(null);
      await loadProjects();
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
            Projects
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Manage the projects shown on your portfolio.
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
          <PlusIcon /> Add Project
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
            {editingId ? "Edit Project" : "New Project"}
          </h3>

          <div>
            <label style={labelStyle}>Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={inputStyle}
              placeholder="e.g. KarJo"
            />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Short summary of what the project does"
            />
          </div>

          <div>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              style={inputStyle}
              placeholder="Next.js, Supabase, PostGIS"
            />
          </div>

          <div className="admin-form-grid-2">
            <div>
              <label style={labelStyle}>GitHub URL</label>
              <input
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                style={inputStyle}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label style={labelStyle}>Live URL (optional)</label>
              <input
                value={form.live}
                onChange={(e) => setForm({ ...form, live: e.target.value })}
                style={inputStyle}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              Role (optional — e.g. &quot;Founder &amp; Developer&quot; or
              &quot;Client Project&quot;)
            </label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={inputStyle}
              placeholder="Founder & Developer"
            />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Mark as featured
          </label>

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
      ) : projects.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          No projects yet — click &quot;Add Project&quot; to create your first
          one.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="admin-project-card"
              style={{
                background: "var(--card-bg)",
                border: project.featured
                  ? "1px solid rgba(5,150,105,0.3)"
                  : "1px solid var(--card-border)",
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
                  <h3
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span
                      style={{
                        fontSize: "10.5px",
                        fontWeight: 600,
                        color: "#34D399",
                        background: "rgba(5,150,105,0.12)",
                        border: "1px solid rgba(5,150,105,0.3)",
                        borderRadius: "9999px",
                        padding: "2px 8px",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                {project.role && (
                  <p
                    style={{
                      fontSize: "11.5px",
                      color: "var(--text-muted)",
                      margin: "0 0 6px",
                    }}
                  >
                    {project.role}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    margin: "0 0 8px",
                    lineHeight: 1.5,
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    .map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11px",
                          color: "var(--text-secondary)",
                          background: "var(--card-bg)",
                          border: "1px solid var(--card-border)",
                          borderRadius: "9999px",
                          padding: "3px 9px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => openEditForm(project)}
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
                  onClick={() => requestDelete(project)}
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
          .admin-project-card {
            flex-direction: column;
          }
          .admin-project-card > div:last-child {
            align-self: flex-end;
          }
        }
      `}</style>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this project?"
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
