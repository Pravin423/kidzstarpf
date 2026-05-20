"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Gallery.module.css";

// Static fallback items shown when no DB images exist yet
const FALLBACK_ITEMS = [
  { _id: "f1", url: "/kimg1.png", title: "Creative Playtime" },
  { _id: "f2", url: "/kimg2.png", title: "Learning Together" },
  { _id: "f3", url: "/kimg3.png", title: "Story Time" },
  { _id: "f4", url: "/kimg4.png", title: "Outdoor Exploration" },
  { _id: "f5", url: "/kimg5.png", title: "Art & Craft" },
];

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState(FALLBACK_ITEMS);
  const [selectedImg, setSelectedImg] = useState(null);
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  // Fetch images from DB, fallback to static if none
  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/media?type=image");
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setGalleryItems(data.data);
      }
    } catch {
      // keep fallback items
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Triplicate for seamless infinite scroll
  const displayItems = [...galleryItems, ...galleryItems, ...galleryItems];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const cards = track.querySelectorAll(`.${styles.card}`);
    if (cards.length === 0) return;

    gsap.set(container, { perspective: 1200 });

    const cardWidth = 380;
    const gap = 32;
    const totalWidth = (cardWidth + gap) * galleryItems.length;

    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 15,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const dist = cardCenterX - centerX;
          const norm = dist / (containerRect.width / 2);
          if (Math.abs(norm) < 1.5) {
            const rotY = norm * -35;
            const transZ = Math.abs(norm) * -150;
            const scale = Math.max(0.7, Math.min(1.15, 1.15 - Math.abs(norm) * 0.3));
            gsap.set(card, {
              rotateY: rotY,
              z: transZ,
              scale,
              transformOrigin: "center center",
              overwrite: "auto",
            });
          }
        });
      },
    });
    tlRef.current = tl;

    const onEnter = () => tl.pause();
    const onLeave = () => tl.resume();
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      tl.kill();
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [galleryItems]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>OUR MEMORIES</span>
          <h2 className={styles.heading}>Guiding our stars toward bright futures</h2>
          <p className={styles.subheading}>
            Take a look at our vibrant learning environment and joyful activities.
          </p>
        </div>

        {/* Revolving Track */}
        <div ref={containerRef} className={styles.carouselWrapper}>
          <div ref={trackRef} className={styles.track}>
            {displayItems.map((item, index) => (
              <div
                key={`${item._id}-${index}`}
                className={styles.card}
                onClick={() => setSelectedImg(item)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.url}
                    alt={item.title || "Gallery image"}
                    fill
                    className={styles.image}
                    sizes="380px"
                    unoptimized={item.url?.startsWith("http")}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.cardTitle}>{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div className={styles.lightbox} onClick={() => setSelectedImg(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={selectedImg.url}
                alt={selectedImg.title || ""}
                fill
                className="object-contain"
                unoptimized={selectedImg.url?.startsWith("http")}
              />
            </div>
            <h3 className={styles.lightboxTitle}>{selectedImg.title}</h3>
            <button className={styles.closeBtn} onClick={() => setSelectedImg(null)}>×</button>
          </div>
        </div>
      )}
    </section>
  );
}
