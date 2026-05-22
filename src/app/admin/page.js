"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
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
  Upload,
  ImageIcon,
  Video,
  X,
  Images,
  ArrowLeft,
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
    <div className="admin-login-bg relative">
      <Link 
        href="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 z-50 cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
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

// ─── Media Manager ─────────────────────────────────────────────────────────────
function MediaManager() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", category: "General" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [filterType, setFilterType] = useState("all");
  const fileInputRef = useRef(null);

  const fetchMedia = useCallback(async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.success) setMediaItems(data.data);
    } catch {}
    finally { setLoadingMedia(false); }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMedia();
  }, [fetchMedia]);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Vercel serverless function body size limit is 4.5MB (4.5 * 1024 * 1024 bytes)
    const MAX_SIZE = 4.5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError(`File is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). Vercel limits uploads to 4.5 MB. Please select a smaller file.`);
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
    setUploadError("");
    setUploadSuccess("");
    const reader = new FileReader();
    reader.onload = (e) => setPreview({ url: e.target.result, type: file.type });
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) { setUploadError("Please select a file first."); return; }
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");
    const fd = new FormData();
    fd.append("file", selectedFile);
    fd.append("title", uploadForm.title || selectedFile.name.split(".")[0]);
    fd.append("category", uploadForm.category);
    try {
      const res = await fetch("/api/media", { method: "POST", body: fd });
      
      if (res.status === 413) {
        throw new Error("File is too large. Vercel limits file uploads to 4.5 MB. Please choose a smaller file.");
      }

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error("Upload failed. The file size might exceed Vercel's 4.5 MB limit, or there was a server error.");
      }

      if (!data.success) throw new Error(data.error || "Upload failed");
      setUploadSuccess(`✔ "${data.data.title}" uploaded successfully!`);
      setSelectedFile(null);
      setPreview(null);
      setUploadForm({ title: "", category: "General" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchMedia();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMediaItems((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const filtered = filterType === "all" ? mediaItems : mediaItems.filter(m => m.type === filterType);
  const imageCount = mediaItems.filter(m => m.type === "image").length;
  const videoCount = mediaItems.filter(m => m.type === "video").length;

  return (
    <div className="media-manager">
      {/* Stats Row */}
      <div className="media-stats-row">
        <div className="media-stat-pill"><ImageIcon size={16} /> {imageCount} Images</div>
        <div className="media-stat-pill"><Video size={16} /> {videoCount} Videos</div>
        <div className="media-stat-pill total"><Images size={16} /> {mediaItems.length} Total</div>
      </div>

      {/* Upload Zone */}
      <div className="upload-section">
        <h3 className="upload-heading">Upload New Media</h3>
        <div
          className={`drop-zone ${dragOver ? "drop-zone-active" : ""} ${preview ? "drop-zone-has-file" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={(e) => handleFileSelect(e.target.files[0])}
            id="media-file-input"
          />
          {preview ? (
            <div className="drop-preview">
              {preview.type.startsWith("video") ? (
                <video src={preview.url} className="preview-media" muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview.url} alt="preview" className="preview-media" />
              )}
              <button
                className="preview-remove"
                onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setPreview(null); }}
              >
                <X size={16} />
              </button>
              <p className="preview-name">{selectedFile?.name}</p>
            </div>
          ) : (
            <div className="drop-placeholder">
              <Upload size={36} color="#0504DC" />
              <p className="drop-text">Drag &amp; drop or <span>click to browse</span></p>
              <p className="drop-hint">Supports JPG, PNG, GIF, MP4, MOV, WEBM</p>
            </div>
          )}
        </div>

        <div className="upload-fields">
          <div className="upload-field-group">
            <label className="upload-label" htmlFor="upload-title">Title</label>
            <input
              id="upload-title"
              type="text"
              className="upload-input"
              placeholder="e.g. Annual Sports Day"
              value={uploadForm.title}
              onChange={(e) => setUploadForm(p => ({ ...p, title: e.target.value }))}
            />
          </div>
          <div className="upload-field-group">
            <label className="upload-label" htmlFor="upload-category">Category</label>
            <select
              id="upload-category"
              className="upload-input"
              value={uploadForm.category}
              onChange={(e) => setUploadForm(p => ({ ...p, category: e.target.value }))}
            >
              <option>General</option>
              <option>Campus Life</option>
              <option>Events</option>
              <option>Art &amp; Craft</option>
              <option>Outdoor</option>
              <option>Sports</option>
              <option>Learning</option>
            </select>
          </div>
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            id="media-upload-submit"
          >
            {uploading ? <RefreshCw size={17} className="spinning" /> : <Upload size={17} />}
            {uploading ? "Uploading..." : "Upload to Gallery"}
          </button>
        </div>

        {uploadError && <p className="upload-msg error">{uploadError}</p>}
        {uploadSuccess && <p className="upload-msg success">{uploadSuccess}</p>}
      </div>

      {/* Media Grid */}
      <div className="media-grid-section">
        <div className="media-grid-header">
          <h3 className="upload-heading">Gallery Media</h3>
          <div className="media-filter-tabs">
            {["all","image","video"].map(t => (
              <button
                key={t}
                className={`media-filter-tab ${filterType === t ? "active" : ""}`}
                onClick={() => setFilterType(t)}
              >
                {t === "all" ? "All" : t === "image" ? "Images" : "Videos"}
              </button>
            ))}
          </div>
          <button className="refresh-btn" onClick={fetchMedia} style={{ marginLeft: "auto" }}>
            <RefreshCw size={15} className={loadingMedia ? "spinning" : ""} />
          </button>
        </div>

        {loadingMedia ? (
          <div className="list-state"><RefreshCw size={28} className="spinning" color="#0504DC" /></div>
        ) : filtered.length === 0 ? (
          <div className="list-state">
            <Images size={36} color="#CBD5E1" />
            <p className="list-empty">No media yet. Upload something above!</p>
          </div>
        ) : (
          <div className="media-grid">
            {filtered.map((item) => (
              <div key={item._id} className="media-card">
                {item.type === "video" ? (
                  <video src={item.url} className="media-thumb" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.title} className="media-thumb" />
                )}
                <div className="media-card-info">
                  <span className={`media-type-badge ${item.type}`}>
                    {item.type === "video" ? <Video size={11} /> : <ImageIcon size={11} />}
                    {item.type}
                  </span>
                  <p className="media-card-title">{item.title || "Untitled"}</p>
                  <p className="media-card-cat">{item.category}</p>
                </div>
                <button
                  className="media-delete-btn"
                  onClick={() => handleDelete(item._id, item.title)}
                  title="Delete"
                  id={`delete-media-${item._id}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const QUALIFICATION_COLORS = {
  "10+2": { bg: "#FFF3CD", text: "#856404", border: "#FFDA6A" },
  "Graduate": { bg: "#D1E7FF", text: "#0747A6", border: "#84B8FF" },
  "Post Graduate": { bg: "#D2F4EA", text: "#0A5344", border: "#5DE0C7" },
  "Other": { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" },
};

function TeacherEnquiryRow({ entry, onToggle, onDelete }) {
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const qual = QUALIFICATION_COLORS[entry.qualification] || QUALIFICATION_COLORS.Other;

  const handleToggle = async () => {
    setToggling(true);
    await onToggle(entry._id, !entry.isChecked);
    setToggling(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete enquiry for ${entry.fullName}? This cannot be undone.`)) return;
    setDeleting(true);
    await onDelete(entry._id);
  };

  return (
    <div className={`enquiry-row ${entry.isChecked ? "checked" : ""} ${deleting ? "fading" : ""}`}>
      {/* Check Toggle */}
      <button
        className="check-btn cursor-pointer"
        onClick={handleToggle}
        disabled={toggling}
        title={entry.isChecked ? "Mark as pending" : "Mark as reviewed"}
        id={`check-teacher-${entry._id}`}
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
              <Users size={14} /> {entry.fullName}
            </span>
          </div>
          <span
            className="program-badge"
            style={{ background: qual.bg, color: qual.text, borderColor: qual.border }}
          >
            {entry.qualification}
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
        className="delete-btn cursor-pointer"
        onClick={handleDelete}
        disabled={deleting}
        title="Delete enquiry"
        id={`delete-teacher-${entry._id}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

function TeacherEnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterQual, setFilterQual] = useState("all");

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/teacher-enquiry");
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load enquiries");
      setEnquiries(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleToggle = async (id, newChecked) => {
    // Optimistic update
    setEnquiries((prev) =>
      prev.map((e) => (e._id === id ? { ...e, isChecked: newChecked } : e))
    );
    try {
      const res = await fetch(`/api/teacher-enquiry/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isChecked: newChecked }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
    } catch (err) {
      // Revert on failure
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, isChecked: !newChecked } : e))
      );
      alert("Failed to update: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/teacher-enquiry/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  // Filtered list
  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.fullName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.includes(q);
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "reviewed" && e.isChecked) ||
      (filterStatus === "pending" && !e.isChecked);
    const matchQual = filterQual === "all" || e.qualification === filterQual;
    return matchSearch && matchStatus && matchQual;
  });

  const total = enquiries.length;
  const reviewed = enquiries.filter((e) => e.isChecked).length;
  const pending = total - reviewed;

  return (
    <>
      {/* Stats */}
      <div className="stats-grid animate-fade-in">
        <StatCard icon={<Users size={22} />} label="Total Course Enquiries" value={total} accent="#0504DC" />
        <StatCard icon={<ClipboardCheck size={22} />} label="Reviewed" value={reviewed} accent="#16A34A" />
        <StatCard icon={<Clock size={22} />} label="Pending Review" value={pending} accent="#D97706" />
        <StatCard icon={<Star size={22} />} label="Review Rate" value={total ? Math.round((reviewed / total) * 100) + "%" : "—"} accent="#7C3AED" />
      </div>

      {/* Filters */}
      <div className="filters-bar animate-fade-in">
        <div className="search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by candidate name, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="admin-teacher-search"
          />
        </div>
        <div className="filter-group">
          <Filter size={15} />
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            id="filter-teacher-status"
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
            value={filterQual}
            onChange={(e) => setFilterQual(e.target.value)}
            id="filter-teacher-qual"
          >
            <option value="all">All Qualifications</option>
            <option value="10+2">10+2 / High School</option>
            <option value="Graduate">Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
            <option value="Other">Other</option>
          </select>
          <ChevronDown size={14} className="filter-arrow" />
        </div>
        <button className="refresh-btn text-xs px-3 py-1.5 border rounded-lg hover:bg-slate-50 flex items-center gap-1 cursor-pointer" onClick={fetchEnquiries} title="Refresh">
          <RefreshCw size={14} className={loading ? "spinning" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* List */}
      <div className="enquiry-list-wrap animate-fade-in">
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
            <button className="refresh-btn" onClick={fetchEnquiries} style={{ marginTop: 12 }}>Try Again</button>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="list-state">
            <ClipboardCheck size={40} color="#CBD5E1" />
            <p className="list-empty">{enquiries.length === 0 ? "No teacher course enquiries yet." : "No results match your filters."}</p>
          </div>
        )}
        {!loading && !error && filtered.map((entry) => (
          <TeacherEnquiryRow
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
    </>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("enquiries"); // "enquiries" | "media"
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
            <p className="dashboard-subtitle">
              {tab === "media" 
                ? "Media Manager" 
                : tab === "teacher-enquiries" 
                ? "Teacher Course Enquiries" 
                : "Admission Enquiries"}
            </p>
          </div>
        </div>
        <div className="dashboard-header-actions">
          {tab === "enquiries" && (
            <button className="refresh-btn" onClick={fetchAdmissions} id="refresh-admissions" title="Refresh">
              <RefreshCw size={16} className={loading ? "spinning" : ""} />
              <span>Refresh</span>
            </button>
          )}
          <button className="logout-btn" onClick={onLogout} id="admin-logout">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${tab === "enquiries" ? "active" : ""}`}
          onClick={() => setTab("enquiries")}
          id="tab-enquiries"
        >
          <ClipboardCheck size={16} /> Enquiries
        </button>
        <button
          className={`dashboard-tab ${tab === "teacher-enquiries" ? "active" : ""}`}
          onClick={() => setTab("teacher-enquiries")}
          id="tab-teacher-enquiries"
        >
          <Users size={16} /> Teacher Enquiries
        </button>
        <button
          className={`dashboard-tab ${tab === "media" ? "active" : ""}`}
          onClick={() => setTab("media")}
          id="tab-media"
        >
          <Images size={16} /> Media Gallery
        </button>
      </div>

      <div className="dashboard-body">
        {tab === "media" ? (
          <MediaManager />
        ) : tab === "teacher-enquiries" ? (
          <TeacherEnquiriesManager />
        ) : (
          <>
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
          </>
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
