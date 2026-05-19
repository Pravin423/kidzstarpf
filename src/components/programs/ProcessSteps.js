"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProcessSteps.module.css";
import { useAdmissionModal } from "../../context/AdmissionModalContext";

const STEPS = [
  {
    id: "01",
    title: "Playgroup",
    age: "2.5 - 3.5 Years",
    days: "3 Days/Week",
    period: "3.30hrs period",
    description: "Sensory play, motor skill refinement, and interactive early socialization.",
    image: "/kimg1.png",
    rotation: -4,
    zIndex: 1
  },
  {
    id: "02",
    title: "Nursery",
    age: "2.5 - 4.5 Years",
    days: "3 Days/Week",
    period: "3.30hrs period",
    description: "Early vocabulary, language stimulation, letter recognition, and creative storytelling.",
    image: "/kimg2.png",
    rotation: -2,
    zIndex: 2
  },
  {
    id: "03",
    title: "Jr.Kg",
    age: "4.5 - 5.5 Years",
    days: "3 Days/Week",
    period: "3.30hrs period",
    description: "Basic writing, math concepts, logic games, and cognitive puzzle solving.",
    image: "/kimg3.png",
    rotation: -1,
    zIndex: 4
  },
  {
    id: "04",
    title: "Sr.Kg",
    age: "5.5 - 6.5 Years",
    days: "3 Days/Week",
    period: "3.30hrs period",
    description: "Advanced reading, arithmetic readiness, creative arts, and school preparation.",
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
            <span className={styles.tag}>OUR CURRICULUM</span>
            <h2 className={styles.title}>
              A holistic learning framework tailored for early childhood development
            </h2>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={`${styles.button} cursor-pointer`}>
              Enroll Now
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
                
                {/* Structured Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="inline-block px-2.5 py-1 text-[0.72rem] font-bold tracking-tight rounded-md bg-[#F2F53E]/15 text-[#854D0E] border border-[#F2F53E]/30 font-sans">
                    {step.age}
                  </span>
                  <span className="inline-block px-2.5 py-1 text-[0.72rem] font-bold tracking-tight rounded-md bg-[#D2F4F0]/30 text-[#0F766E] border border-[#D2F4F0]/65 font-sans">
                    {step.days}
                  </span>
                  <span className="inline-block px-2.5 py-1 text-[0.72rem] font-bold tracking-tight rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200 font-sans">
                    {step.period}
                  </span>
                </div>

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
