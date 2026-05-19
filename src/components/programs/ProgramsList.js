"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProgramsList.module.css";

export default function ProgramsList() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Rotate the circular text in the badge
    gsap.to(".rotating-text", {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <div className={styles.section}>
      {/* Background Grid Lines */}
      <div className={styles.gridLines}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>SERVICE</span>
          <h1 className={styles.title}>
            Expert services built for<br />measurable results
          </h1>
          <p className={styles.subtitle}>
            Our expert consulting services are designed to deliver practical strategies, clear execution plans, and measurable outcomes that strengthen performance.
          </p>
        </div>
      </div>

      {/* Image Section with Badge */}
      <div className={styles.imageSection}>
          {/* Badge */}
          <div className={styles.badgeWrapper}>
            <div className={styles.badge}>
              <div className="rotating-text absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="textPath" d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none" />
                  <text className="fill-black text-[6.5px] font-bold tracking-[0.12em]">
                    <textPath href="#textPath" startOffset="0%">SCROLL DOWN - SCROLL DOWN - SCROLL DOWN - SCROLL DOWN -</textPath>
                  </text>
                </svg>
              </div>
              <div className={styles.yellowCenter}>
                <span className="text-black text-xl font-bold">↓</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={styles.imageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200"
              alt="Expert services"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
  );
}
