"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TurningVision.module.css";

export default function TurningVision() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center+=200", 
          toggleActions: "play none none none"
        }
      });

      // Text stagger animation
      tl.from(`.${styles.title} span`, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
      })
      .from(`.${styles.description}`, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Video flip animation
      tl.from(videoRef.current, {
        rotateX: -60,
        scale: 0.9,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        
        {/* Text Section */}
        <div className={styles.textSection}>
          <h2 className={styles.title}>
            <span>Turning</span> <span>vision</span>
          </h2>
        </div>

        {/* Video Section */}
        <div className={styles.videoContainer}>
          <div 
            ref={videoRef} 
            className={styles.videoWrapper}
          >
            <video 
              src="/homevideo.mp4" 
              autoPlay 
              loop 
              muted 
              className={styles.video}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
