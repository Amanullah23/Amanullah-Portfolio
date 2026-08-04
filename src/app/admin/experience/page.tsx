"use client";

import { useState, useEffect } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  ExperienceEntry,
  getExperienceClient,
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/supabase/experience-client";

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
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
};

const emptyForm: FormState = {
  title: "",
  company: "",
  period: "",
  description: "",
  type: "work",
};

export default function AdminExperiencePage() {
  const [entries, setEntries] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadEntries() {
    setLoading(true);
    const data = await getExperienceClient();
    setEntries(data);
    setLoading(false);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  function openNewForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(entry: ExperienceEntry) {
    setForm({
      title: entry.title,
      company: entry.company,
      period: entry.period,
      description: entry.description,
      type: entry.type,
    });
    setEditingId(entry.id);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateExperience(editingId, form);
      } else {
        await createExperience(form);
      }
      setShowForm(false);
      await loadEntries();
    } catch (err) {
      alert("Failed to save: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const [deleteTarget, setDeleteTarget] = useState<ExperienceEntry | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState("");

  function requestDelete(entry: ExperienceEntry) {
    setDeleteTarget(entry);
    setDeleteError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteExperience(deleteTarget.id);
      setDeleteTarget(null);
      await loadEntries();
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
        className="admin-page-header"
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
            Experience
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Manage your work history and education timeline.
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
          <PlusIcon /> Add Entry
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
            {editingId ? "Edit Entry" : "New Entry"}
          </h3>

          <div className="admin-form-grid-2">
            <div>
              <label style={labelStyle}>Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={inputStyle}
                placeholder="e.g. Technical Manager"
              />
            </div>
            <div>
              <label style={labelStyle}>Company / Institution</label>
              <input
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                style={inputStyle}
                placeholder="e.g. Quika Afghanistan"
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div>
              <label style={labelStyle}>Period</label>
              <input
                required
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                style={inputStyle}
                placeholder="e.g. Jan 2024 — Present"
              />
            </div>
            <div>
              <label style={labelStyle}>Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as "work" | "education",
                  })
                }
                style={inputStyle}
              >
                <option value="work">Work</option>
                <option value="education">Education</option>
              </select>
            </div>
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
              placeholder="Short summary of responsibilities and achievements"
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
      ) : entries.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          No entries yet — click &quot;Add Entry&quot; to create your first one.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="admin-entry-card"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "14px",
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
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
                    marginBottom: "4px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 600,
                      color:
                        entry.type === "work"
                          ? "#34D399"
                          : "var(--text-secondary)",
                      background:
                        entry.type === "work"
                          ? "rgba(5,150,105,0.12)"
                          : "var(--card-bg)",
                      border: `1px solid ${entry.type === "work" ? "rgba(5,150,105,0.3)" : "var(--card-border)"}`,
                      borderRadius: "9999px",
                      padding: "2px 8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {entry.type}
                  </span>
                  <span
                    style={{ fontSize: "12px", color: "var(--text-muted)" }}
                  >
                    {entry.period}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "14.5px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 2px",
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {entry.company}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => openEditForm(entry)}
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
                  onClick={() => requestDelete(entry)}
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
          .admin-entry-card {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .admin-entry-card > div:last-child {
            align-self: flex-end;
          }
        }
      `}</style>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this entry?"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" at ${deleteTarget.company} will be permanently removed.${deleteError ? ` Error: ${deleteError}` : ""}`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
