"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, X, Volume2, VolumeX, Maximize2 } from "lucide-react";
import styles from "./VideoGallery.module.css";

// ─── Video data — add more entries here as you upload videos ─────────────────
const videos = [
  {
    id: 1,
    src: "/homevideo.mp4",
    title: "A Day at KidzStar",
    description: "Watch the joy and learning that fills every moment at our preschool.",
    tag: "Campus Life",
  },
  // Add more videos like this:
  // {
  //   id: 2,
  //   src: "/video2.mp4",
  //   title: "Annual Sports Day",
  //   description: "Our little stars show off their energy and teamwork!",
  //   tag: "Events",
  // },
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
        src={video.src}
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
        <span className={styles.cardTag}>{video.tag}</span>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        <p className={styles.cardDesc}>{video.description}</p>
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
          <span className={styles.modalTag}>{video.tag}</span>
          <h3 className={styles.modalTitle}>{video.title}</h3>
        </div>

        {/* Video Player Wrapper */}
        <div className={styles.modalPlayerWrap}>
          <video
            ref={videoRef}
            src={video.src}
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
  const [activeVideo, setActiveVideo] = useState(null);
  const sectionRef = useRef(null);

  return (
    <>
      <section ref={sectionRef} className={styles.section} id="videos">
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.header}>
            <span className={styles.tag}>OUR VIDEOS</span>
            <h2 className={styles.heading}>
              See the magic in motion
            </h2>
            <p className={styles.subheading}>
              Experience the warmth, energy, and joy of KidzStar through our video memories.
            </p>
          </div>

          {/* Video Grid */}
          {videos.length > 0 ? (
            <div className={styles.grid}>
              {videos.map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  onOpen={setActiveVideo}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Play size={40} color="#CBD5E1" />
              <p>No videos yet. Add video files to the <code>/public</code> folder and update the videos list above.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {activeVideo && (
        <LightboxPlayer video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
