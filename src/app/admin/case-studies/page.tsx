"use client";

import { useState, useEffect } from "react";
import {
  CaseStudy,
  getCaseStudiesClient,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from "@/lib/supabase/case-studies-client";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

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
  date: string;
  summary: string;
  image_url: string;
  problem: string;
  solution: string;
  technology: string;
  result: string;
};

const emptyForm: FormState = {
  title: "",
  date: "",
  summary: "",
  image_url: "",
  problem: "",
  solution: "",
  technology: "",
  result: "",
};

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<CaseStudy | null>(null);
  const [deleteError, setDeleteError] = useState("");

  async function loadStudies() {
    setLoading(true);
    const data = await getCaseStudiesClient();
    setStudies(data);
    setLoading(false);
  }

  useEffect(() => {
    loadStudies();
  }, []);

  function openNewForm() {
    setForm(emptyForm);
    setEditingId(null);
    setSaveError("");
    setShowForm(true);
  }

  function openEditForm(cs: CaseStudy) {
    setForm({
      title: cs.title,
      date: cs.date,
      summary: cs.summary,
      image_url: cs.image_url ?? "",
      problem: cs.problem,
      solution: cs.solution,
      technology: cs.technology,
      result: cs.result,
    });
    setEditingId(cs.id);
    setSaveError("");
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    try {
      const payload = { ...form, image_url: form.image_url || null };
      if (editingId) {
        await updateCaseStudy(editingId, payload);
      } else {
        await createCaseStudy(payload);
      }
      setShowForm(false);
      await loadStudies();
    } catch (err) {
      setSaveError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function requestDelete(cs: CaseStudy) {
    setDeleteTarget(cs);
    setDeleteError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteCaseStudy(deleteTarget.id);
      setDeleteTarget(null);
      await loadStudies();
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
            Case Studies
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Detailed project write-ups shown at /case-studies.
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
          <PlusIcon /> New Case Study
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
            {editingId ? "Edit Case Study" : "New Case Study"}
          </h3>

          <div className="admin-form-grid-2">
            <div>
              <label style={labelStyle}>Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={inputStyle}
                placeholder="e.g. KarJo — Afghan Job Aggregator"
              />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={inputStyle}
                placeholder="e.g. 2026"
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Summary (shown on the list card)</label>
            <textarea
              required
              rows={2}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="One or two sentence overview"
            />
          </div>

          <div>
            <label style={labelStyle}>
              Image URL (optional — upload to Supabase Storage first, paste the
              public URL here)
            </label>
            <input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              style={inputStyle}
              placeholder="https://..."
            />
          </div>

          <div>
            <label style={labelStyle}>Problem</label>
            <textarea
              required
              rows={3}
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="What problem did the project solve?"
            />
          </div>

          <div>
            <label style={labelStyle}>Solution</label>
            <textarea
              required
              rows={3}
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="How did you design and build it?"
            />
          </div>

          <div>
            <label style={labelStyle}>Technology</label>
            <textarea
              required
              rows={3}
              value={form.technology}
              onChange={(e) => setForm({ ...form, technology: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Tools and architecture used"
            />
          </div>

          <div>
            <label style={labelStyle}>Result</label>
            <textarea
              required
              rows={3}
              value={form.result}
              onChange={(e) => setForm({ ...form, result: e.target.value })}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Impact and improvements"
            />
          </div>

          {saveError && (
            <p style={{ fontSize: "13px", color: "#F87171", margin: 0 }}>
              Failed to save: {saveError}
            </p>
          )}

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
      ) : studies.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          No case studies yet — click &quot;New Case Study&quot; to add your
          first one.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {studies.map((cs) => (
            <div
              key={cs.id}
              className="admin-cs-card"
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
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    margin: "0 0 4px",
                  }}
                >
                  {cs.date}
                </p>
                <h3
                  style={{
                    fontSize: "14.5px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 6px",
                  }}
                >
                  {cs.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {cs.summary}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => openEditForm(cs)}
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
                  onClick={() => requestDelete(cs)}
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

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this case study?"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" will be permanently removed.${deleteError ? ` Error: ${deleteError}` : ""}`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

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
          .admin-cs-card {
            flex-direction: column;
          }
          .admin-cs-card > div:last-child {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
