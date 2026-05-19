"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import AdmissionForm from "../AdmissionForm";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  useEffect(() => {
    // Entrance Animation
    gsap.fromTo(".hero-fade-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }
    );

    gsap.fromTo(".badge-fade-in",
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.5)",
        delay: 0.3
      }
    );

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
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={`${styles.tag} hero-fade-item`}>CONTACT</span>
            <h1 className={`${styles.title} hero-fade-item`}>
              Let's turn curiosity into<br />a bright future
            </h1>
          </div>
          
          {/* Badge */}
          <div className={`${styles.badgeWrapper} badge-fade-in`}>
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
        </div>


      </div>
    </div>
  );
}
