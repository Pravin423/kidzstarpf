"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Gallery.module.css";

const galleryItems = [
  { id: 1, src: "/kimg1.png", title: "Creative Playtime" },
  { id: 2, src: "/kimg2.png", title: "Learning Together" },
  { id: 3, src: "/kimg3.png", title: "Story Time" },
  { id: 4, src: "/kimg4.png", title: "Outdoor Exploration" },
  { id: 5, src: "/kimg5.png", title: "Art & Craft" },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  // Duplicate items for seamless loop
  const displayItems = [...galleryItems, ...galleryItems, ...galleryItems];

  useEffect(() => {
    const track = trackRef.current;
    const cards = track.querySelectorAll(`.${styles.card}`);
    const container = containerRef.current;
    
    if (!track || cards.length === 0) return;

    // Set perspective on the wrapper
    gsap.set(container, { perspective: 1200 });

    const cardWidth = 380;
    const gap = 32; // 2rem
    const totalWidth = (cardWidth + gap) * galleryItems.length;

    // Infinite horizontal scroll
    const tl = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 15,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        // Apply 3D curve effect based on position
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const distanceFromCenter = cardCenterX - centerX;
          
          // Normalize distance (-1 to 1 within viewport)
          const normalizedDistance = distanceFromCenter / (containerRect.width / 2);
          
          // Calculate rotation and Z translation to create a curve
          if (Math.abs(normalizedDistance) < 1.5) {
            const rotationY = normalizedDistance * -35; // Tilt edges in
            const translateZ = Math.abs(normalizedDistance) * -150; // Push edges back
            
            // Make center card larger, edges smaller
            const scale = 1.15 - Math.abs(normalizedDistance) * 0.3;
            const clampedScale = Math.max(0.7, Math.min(1.15, scale));
            
            gsap.set(card, {
              rotateY: rotationY,
              z: translateZ,
              scale: clampedScale,
              transformOrigin: "center center",
              overwrite: "auto"
            });
          }
        });
      }
    });

    // Pause on hover
    const handleMouseEnter = () => tl.pause();
    const handleMouseLeave = () => tl.resume();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl.kill();
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
                key={`${item.id}-${index}`} 
                className={styles.card}
                onClick={() => setSelectedImg(item)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className={styles.image}
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

      {/* Lightbox / Fullscreen Image */}
      {selectedImg && (
        <div className={styles.lightbox} onClick={() => setSelectedImg(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={selectedImg.src}
                alt={selectedImg.title}
                fill
                className="object-contain"
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
