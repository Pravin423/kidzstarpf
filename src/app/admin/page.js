"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  Circle,
  Trash2,
  RefreshCw,
  Users,
  ClipboardCheck,
  Clock,
  Star,
  LogOut,
  Eye,
  EyeOff,
  ChevronDown,
  Search,
  Filter,
  Baby,
  Phone,
  Mail,
  Calendar,
  BookOpen,
} from "lucide-react";

// ─── Simple password gate (replace with proper auth if needed) ───────────────
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "kidzstar2024";

const PROGRAM_LABELS = {
  toddler: "Toddler Explorers (1-2 yrs)",
  preschool: "Preschool Stars (3-4 yrs)",
  kindergarten: "Kindergarten Ready (5-6 yrs)",
  daycare: "Afterschool Care",
};

const PROGRAM_COLORS = {
  toddler: { bg: "#FFF3CD", text: "#856404", border: "#FFDA6A" },
  preschool: { bg: "#D1E7FF", text: "#0747A6", border: "#84B8FF" },
  kindergarten: { bg: "#D2F4EA", text: "#0A5344", border: "#5DE0C7" },
  daycare: { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="admin-login-bg">
      <div className={`admin-login-card ${shaking ? "shake" : ""}`}>
        {/* Logo */}
        <div className="admin-logo-wrap">
          <div className="admin-logo-icon">
            <Star size={28} fill="white" color="white" />
          </div>
          <div>
            <h1 className="admin-logo-title">KidzStar Admin</h1>
            <p className="admin-logo-sub">Enquiry Dashboard</p>
          </div>
        </div>

        <h2 className="admin-login-heading">Welcome back 👋</h2>
        <p className="admin-login-desc">Enter the admin password to access the dashboard.</p>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-input-wrap">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Admin password"
              className="admin-input"
              autoFocus
              id="admin-password-input"
            />
            <button
              type="button"
              className="admin-eye-btn"
              onClick={() => setShowPw((v) => !v)}
              tabIndex={-1}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-login-btn" id="admin-login-submit">
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <div className="stat-card" style={{ "--accent": accent }}>
      <div className="stat-icon" style={{ background: accent + "22", color: accent }}>
        {icon}
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

// ─── Enquiry Row ──────────────────────────────────────────────────────────────
function EnquiryRow({ entry, onToggle, onDelete }) {
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const prog = PROGRAM_COLORS[entry.program] || PROGRAM_COLORS.preschool;

  const handleToggle = async () => {
    setToggling(true);
    await onToggle(entry._id, !entry.isChecked);
    setToggling(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete enquiry for ${entry.childName}? This cannot be undone.`)) return;
    setDeleting(true);
    await onDelete(entry._id);
  };

  return (
    <div className={`enquiry-row ${entry.isChecked ? "checked" : ""} ${deleting ? "fading" : ""}`}>
      {/* Check Toggle */}
      <button
        className="check-btn"
        onClick={handleToggle}
        disabled={toggling}
        title={entry.isChecked ? "Mark as pending" : "Mark as reviewed"}
        id={`check-${entry._id}`}
      >
        {toggling ? (
          <RefreshCw size={22} className="spinning" />
        ) : entry.isChecked ? (
          <CheckCircle2 size={22} color="#16A34A" />
        ) : (
          <Circle size={22} color="#94a3b8" />
        )}
      </button>

      {/* Content */}
      <div className="enquiry-content">
        {/* Header row */}
        <div className="enquiry-header">
          <div className="enquiry-names">
            <span className="enquiry-child">
              <Baby size={14} /> {entry.childName} <span className="enquiry-age">· {entry.childAge} yrs</span>
            </span>
            <span className="enquiry-parent">Parent: {entry.parentName}</span>
          </div>
          <span
            className="program-badge"
            style={{ background: prog.bg, color: prog.text, borderColor: prog.border }}
          >
            {PROGRAM_LABELS[entry.program] || entry.program}
          </span>
        </div>

        {/* Details row */}
        <div className="enquiry-details">
          <span className="detail-item">
            <Mail size={13} /> {entry.email}
          </span>
          <span className="detail-item">
            <Phone size={13} /> {entry.phone}
          </span>
          <span className="detail-item">
            <Calendar size={13} /> {formatDate(entry.createdAt)}
          </span>
        </div>

        {/* Notes */}
        {entry.notes && (
          <p className="enquiry-notes">
            <BookOpen size={13} /> {entry.notes}
          </p>
        )}
      </div>

      {/* Status badge */}
      <span className={`status-badge ${entry.isChecked ? "reviewed" : "pending"}`}>
        {entry.isChecked ? "Reviewed" : "Pending"}
      </span>

      {/* Delete */}
      <button
        className="delete-btn"
        onClick={handleDelete}
        disabled={deleting}
        title="Delete enquiry"
        id={`delete-${entry._id}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | pending | reviewed
  const [filterProgram, setFilterProgram] = useState("all");

  const fetchAdmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admission");
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load data");
      setAdmissions(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  const handleToggle = async (id, newChecked) => {
    // Optimistic update
    setAdmissions((prev) =>
      prev.map((a) => (a._id === id ? { ...a, isChecked: newChecked } : a))
    );
    try {
      const res = await fetch(`/api/admission/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isChecked: newChecked }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
    } catch (err) {
      // Revert on failure
      setAdmissions((prev) =>
        prev.map((a) => (a._id === id ? { ...a, isChecked: !newChecked } : a))
      );
      alert("Failed to update: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admission/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setAdmissions((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  // Filtered list
  const filtered = admissions.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.parentName.toLowerCase().includes(q) ||
      a.childName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.phone.includes(q);
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "reviewed" && a.isChecked) ||
      (filterStatus === "pending" && !a.isChecked);
    const matchProgram = filterProgram === "all" || a.program === filterProgram;
    return matchSearch && matchStatus && matchProgram;
  });

  const total = admissions.length;
  const reviewed = admissions.filter((a) => a.isChecked).length;
  const pending = total - reviewed;

  return (
    <div className="dashboard-wrap">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="admin-logo-icon small">
            <Star size={18} fill="white" color="white" />
          </div>
          <div>
            <h1 className="dashboard-title">KidzStar Admin</h1>
            <p className="dashboard-subtitle">Admission Enquiries</p>
          </div>
        </div>
        <div className="dashboard-header-actions">
          <button className="refresh-btn" onClick={fetchAdmissions} id="refresh-admissions" title="Refresh">
            <RefreshCw size={16} className={loading ? "spinning" : ""} />
            <span>Refresh</span>
          </button>
          <button className="logout-btn" onClick={onLogout} id="admin-logout">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Stats */}
        <div className="stats-grid">
          <StatCard icon={<Users size={22} />} label="Total Enquiries" value={total} accent="#0504DC" />
          <StatCard icon={<ClipboardCheck size={22} />} label="Reviewed" value={reviewed} accent="#16A34A" />
          <StatCard icon={<Clock size={22} />} label="Pending Review" value={pending} accent="#D97706" />
          <StatCard icon={<Star size={22} />} label="Review Rate" value={total ? Math.round((reviewed / total) * 100) + "%" : "—"} accent="#7C3AED" />
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="admin-search"
            />
          </div>
          <div className="filter-group">
            <Filter size={15} />
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              id="filter-status"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
            </select>
            <ChevronDown size={14} className="filter-arrow" />
          </div>
          <div className="filter-group">
            <BookOpen size={15} />
            <select
              className="filter-select"
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              id="filter-program"
            >
              <option value="all">All Programs</option>
              <option value="toddler">Toddler Explorers</option>
              <option value="preschool">Preschool Stars</option>
              <option value="kindergarten">Kindergarten Ready</option>
              <option value="daycare">Afterschool Care</option>
            </select>
            <ChevronDown size={14} className="filter-arrow" />
          </div>
        </div>

        {/* List */}
        <div className="enquiry-list-wrap">
          {loading && (
            <div className="list-state">
              <RefreshCw size={32} className="spinning" color="#0504DC" />
              <p>Loading enquiries…</p>
            </div>
          )}
          {!loading && error && (
            <div className="list-state error">
              <p className="list-error-title">⚠️ Could not load data</p>
              <p className="list-error-msg">{error}</p>
              <p className="list-error-hint">Make sure <code>MONGODB_URI</code> is set in your <code>.env.local</code> file and the dev server is restarted.</p>
              <button className="refresh-btn" onClick={fetchAdmissions} style={{ marginTop: 12 }}>Try Again</button>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="list-state">
              <ClipboardCheck size={40} color="#CBD5E1" />
              <p className="list-empty">{admissions.length === 0 ? "No enquiries submitted yet." : "No results match your filters."}</p>
            </div>
          )}
          {!loading && !error && filtered.map((entry) => (
            <EnquiryRow
              key={entry._id}
              entry={entry}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Footer count */}
        {!loading && !error && filtered.length > 0 && (
          <p className="list-count">Showing {filtered.length} of {total} enquiries</p>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);

  // Persist session in sessionStorage
  useEffect(() => {
    if (sessionStorage.getItem("ks_admin_auth") === "1") setAuthed(true);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("ks_admin_auth", "1");
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ks_admin_auth");
    setAuthed(false);
  };

  return authed ? <Dashboard onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />;
}
