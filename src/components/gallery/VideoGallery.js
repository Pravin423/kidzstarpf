"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Play, X, Volume2, VolumeX, Maximize2, RefreshCw } from "lucide-react";
import styles from "./VideoGallery.module.css";

// Static fallback shown when DB has no videos yet
const FALLBACK_VIDEOS = [
  {
    _id: "fv1",
    url: "/homevideo.mp4",
    title: "A Day at KidzStar",
    category: "Campus Life",
  },
];



// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ video, onOpen, index }) {
  const previewRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (previewRef.current) {
      previewRef.current.currentTime = 0;
      previewRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (previewRef.current) {
      previewRef.current.pause();
      previewRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(video)}
      aria-label={`Play video: ${video.title}`}
    >
      {/* Silent muted preview video on hover */}
      <video
        ref={previewRef}
        src={video.url}
        muted
        playsInline
        loop
        preload="metadata"
        className={`${styles.previewVideo} ${hovered ? styles.previewVisible : ""}`}
      />

      {/* Thumbnail gradient overlay */}
      <div className={`${styles.cardOverlay} ${hovered ? styles.cardOverlayHovered : ""}`} />

      {/* Play button */}
      <div className={`${styles.playBtn} ${hovered ? styles.playBtnHovered : ""}`}>
        <Play size={28} fill="white" color="white" />
      </div>

      {/* Card info */}
      <div className={styles.cardInfo}>
        <span className={styles.cardTag}>{video.category || "Video"}</span>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        {video.description && <p className={styles.cardDesc}>{video.description}</p>}
      </div>

      {/* Duration badge placeholder */}
      <span className={styles.watchBadge}>
        <Play size={11} fill="currentColor" /> Watch Now
      </span>
    </div>
  );
}

// ─── Lightbox Player ──────────────────────────────────────────────────────────
function LightboxPlayer({ video, onClose }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Auto-play when opened
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    // Escape key to close
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const openFullscreen = () => {
    if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen();
  };

  if (!mounted) return null;

  return createPortal(
    <div className={styles.lightbox} onClick={onClose}>
      <div className={styles.lightboxModal} onClick={(e) => e.stopPropagation()}>
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className={styles.modalCloseBtn}
          title="Close modal"
          id="lightbox-close-btn"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <span className={styles.modalTag}>{video.category || "Video"}</span>
          <h3 className={styles.modalTitle}>{video.title}</h3>
        </div>

        {/* Video Player Wrapper */}
        <div className={styles.modalPlayerWrap}>
          <video
            ref={videoRef}
            src={video.url}
            controls
            playsInline
            className={styles.modalPlayer}
          />
        </div>

        {/* Description & Action Bar */}
        <div className={styles.modalFooter}>
          <p className={styles.modalDesc}>{video.description}</p>
          <div className={styles.modalActions}>
            <button
              className={styles.modalActionBtn}
              onClick={toggleMute}
              title={muted ? "Unmute" : "Mute"}
              id="lightbox-mute-btn"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span>{muted ? "Unmute" : "Mute"}</span>
            </button>
            <button
              className={styles.modalActionBtn}
              onClick={openFullscreen}
              title="Fullscreen"
              id="lightbox-fullscreen-btn"
            >
              <Maximize2 size={18} />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Main VideoGallery Section ─────────────────────────────────────────────────
export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const sectionRef = useRef(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media?type=video");
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setVideos(data.data);
      } else {
        setVideos(FALLBACK_VIDEOS);
      }
    } catch {
      setVideos(FALLBACK_VIDEOS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <>
      <section ref={sectionRef} className={styles.section} id="videos">
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.tag}>OUR VIDEOS</span>
            <h2 className={styles.heading}>See the magic in motion</h2>
            <p className={styles.subheading}>
              Experience the warmth, energy, and joy of KidzStar through our video memories.
            </p>
          </div>

          {loading ? (
            <div className={styles.emptyState}>
              <RefreshCw size={32} color="#0504DC" className={styles.spin} />
            </div>
          ) : videos.length > 0 ? (
            <div className={styles.grid}>
              {videos.map((video, i) => (
                <VideoCard
                  key={video._id}
                  video={video}
                  index={i}
                  onOpen={setActiveVideo}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Play size={40} color="#CBD5E1" />
              <p>No videos yet — admin can upload videos from the dashboard.</p>
            </div>
          )}
        </div>
      </section>

      {activeVideo && (
        <LightboxPlayer video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
