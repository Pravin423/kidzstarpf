"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProcessSteps.module.css";

const STEPS = [
  {
    id: "01",
    title: "Assess",
    description: "We evaluate your current performance, challenges, and growth opportunities.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
    rotation: -4,
    zIndex: 1
  },
  {
    id: "02",
    title: "Strategize",
    description: "We develop focused strategies aligned with your goals and growth.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    rotation: -2,
    zIndex: 2
  },
  {
    id: "03",
    title: "Implement",
    description: "We implement clear roadmaps to execute strategies effectively.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    rotation: -1,
    zIndex: 4
  },
  {
    id: "04",
    title: "Optimize",
    description: "Ongoing optimization to strengthen results and long-term success.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
    rotation: -3,
    zIndex: 3
  }
];

export default function ProcessSteps() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.left}>
            <span className={styles.tag}>OUR CONSULTING PROCESS</span>
            <h2 className={styles.title}>
              A disciplined and data driven approach guiding businesses toward measurable impact
            </h2>
          </div>
          <div className={styles.right}>
            <Link href="#" className={styles.button}>
              Drive better results
            </Link>
          </div>
        </div>

        {/* Cards Stack */}
        <div className={styles.cardsContainer}>
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={styles.card}
              style={{
                transform: hoveredIndex === index 
                  ? "scale(1.1) translateY(-20px) rotate(0deg)" 
                  : hoveredIndex !== null
                    ? `translateX(${index < hoveredIndex ? "-40px" : "40px"}) rotate(${step.rotation}deg)`
                    : `rotate(${step.rotation}deg)`,
                zIndex: hoveredIndex === index ? 20 : step.zIndex,
                marginLeft: index === 0 ? 0 : "-8rem"
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                <span className={styles.number}>{step.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
