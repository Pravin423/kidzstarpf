"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      number: "01",
      title: "Proven industry experience",
      description: "Our broad industry expertise helps us deliver practical strategies and measurable outcomes.",
      image: "/kimg3.png",
    },
    {
      number: "02",
      title: "Data-driven decision making",
      description: "Our data-led approach improves performance and delivers measurable business gains.",
      image: "/kimg1.png",
    },
    {
      number: "03",
      title: "Sustainable business growth",
      description: "We design growth plans that strengthen results and ensure long-term value.",
      image: "/kimg2.png",
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=2000",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * 3),
              2
            );
            setActiveIndex(index);
          }
        }
      });

      // Animate progress bar over the whole duration (3 units)
      tl.to(progressRef.current, {
        height: "100%",
        ease: "none",
        duration: 3
      }, 0);

      // Card 1 slides up to cover Card 0
      tl.to(".card-1", {
        y: "0%",
        ease: "none",
        duration: 1
      }, 1);
      
      // At the same time, Card 0 shrinks and fades
      tl.to(".card-0", {
        scale: 0.9,
        opacity: 0.3,
        ease: "none",
        duration: 1
      }, 1);

      // Card 2 slides up to cover Card 1
      tl.to(".card-2", {
        y: "0%",
        ease: "none",
        duration: 1
      }, 2);
      
      // At the same time, Card 1 shrinks and fades
      tl.to(".card-1", {
        scale: 0.9,
        opacity: 0.3,
        ease: "none",
        duration: 1
      }, 2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.stickyWrapper}>
        <div className={styles.grid}>
          
          {/* Left Side: Images */}
          <div className={styles.imageColumn}>
            <div className={styles.imageContainer}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.imageWrapper} card-${index}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Text */}
          <div className={styles.textColumn}>
            <div className={styles.header}>WHY CHOOSE US</div>
            <h2 className={styles.title}>
              Partner with experts committed to delivering real results and lasting value
            </h2>

            <div className={styles.timeline}>
              {/* Vertical Progress Bar Background */}
              <div className={styles.progressBarBg}>
                {/* Vertical Progress Bar Fill */}
                <div ref={progressRef} className={styles.progressBarFill}></div>
              </div>

              {items.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={`${styles.itemNumber} ${index === activeIndex ? styles.activeText : ""}`}>
                    {item.number}
                  </div>
                  <div className={styles.itemContent}>
                    <h3 className={`${styles.itemTitle} ${index === activeIndex ? styles.activeText : ""}`}>
                      {item.title}
                    </h3>
                    <p className={`${styles.itemDescription} ${index === activeIndex ? styles.activeDesc : ""}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
