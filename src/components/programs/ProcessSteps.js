"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProcessSteps.module.css";
import { useAdmissionModal } from "../../context/AdmissionModalContext";

const STEPS = [
  {
    id: "01",
    title: "Inquiry",
    description: "Submit an online inquiry form or call us to schedule a campus tour.",
    image: "/kimg1.png",
    rotation: -4,
    zIndex: 1
  },
  {
    id: "02",
    title: "Campus Tour",
    description: "Visit our colorful classrooms, meet our teachers, and explore our learning environments.",
    image: "/kimg2.png",
    rotation: -2,
    zIndex: 2
  },
  {
    id: "03",
    title: "Interaction",
    description: "A brief friendly interaction with the child to evaluate their early readiness and developmental stage.",
    image: "/kimg3.png",
    rotation: -1,
    zIndex: 4
  },
  {
    id: "04",
    title: "Admission",
    description: "Complete the documentation and enroll your child in one of our tailored programs.",
    image: "/kimg4.png",
    rotation: -3,
    zIndex: 3
  }
];

export default function ProcessSteps() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { openModal } = useAdmissionModal();

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.left}>
            <span className={styles.tag}>OUR ADMISSION PROCESS</span>
            <h2 className={styles.title}>
              A simple, step-by-step journey to enroll your little star at KidzStar
            </h2>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={`${styles.button} cursor-pointer`}>
              Start Inquiry
            </button>
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
