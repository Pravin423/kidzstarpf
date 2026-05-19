"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const departments = [
  {
    tag: "Ages 1.5 - 2.5",
    title: "Early Learning Foundations",
    description: "Focusing on nurturing curious young minds through natural exploration, creative expression, and sensory play. We build the early building blocks of communication and wonder.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800",
  },
  {
    tag: "Ages 2.5 - 4.0",
    title: "Creative Arts & Expression",
    description: "Encouraging self-expression and building early confidence. Through color exploration, music sessions, and dramatic storytelling, children discover their unique creative voices.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800",
  },
  {
    tag: "Ages 4.0 - 5.5",
    title: "Logical Play & Cognition",
    description: "Developing early logical thinking, pattern recognition, and building-block logic. We foster cooperative problem-solving through interactive games, puzzles, and stories.",
    image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800",
  },
  {
    tag: "All Age Groups",
    title: "Social-Emotional Connection",
    description: "Empowering children to understand, communicate, and navigate their feelings. We focus on developing empathy, forming deep friendships, and cultivating kindness daily.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
  }
];

export default function TeacherInteractiveList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRef = useRef(null);

  // GSAP animation when active state changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".active-animate",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }
      );
    }, textRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-20 md:py-32 bg-[#FDFCF9]">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-stretch justify-between">
        
        {/* Left Side: Interactive Card List */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <div className="mb-10 md:mb-16">
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase block mb-3">
              Curriculum Core
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
              Our classrooms in action
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {departments.map((dept, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`w-full grid grid-cols-[50px_1fr_50px] items-center px-6 md:px-10 py-6 md:py-8 rounded-2xl md:rounded-[1.8rem] border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  idx === activeIndex
                    ? "bg-[#8AF349] border-[#8AF349] text-neutral-900 shadow-[0_15px_30px_rgba(138,243,73,0.15)] translate-x-2"
                    : "bg-[#F7F6F2] hover:bg-[#F2F0EB] border-black/[0.03] text-neutral-800"
                }`}
              >
                {/* Index Number */}
                <span
                  className={`text-sm md:text-base font-medium font-mono text-left transition-colors duration-300 ${
                    idx === activeIndex ? "text-neutral-900" : "text-neutral-400"
                  }`}
                >
                  0{idx + 1}
                </span>

                {/* Left-Aligned Title (more professional than centering) */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-left pl-4">
                  {dept.title}
                </h3>

                {/* Right Arrow Icon */}
                <div className="flex justify-end">
                  <ArrowRight
                    className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      idx === activeIndex
                        ? "translate-x-2 stroke-[2.5]"
                        : "stroke-[2] text-neutral-400 group-hover:text-neutral-600"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Showcase Box */}
        <div className="w-full lg:w-4/12 flex flex-col justify-between">
          <div className="flex flex-col gap-8 h-full justify-between py-2">
            
            {/* Image Stack */}
            <div className="relative w-full aspect-[4/3] md:aspect-[1.3] rounded-3xl overflow-hidden bg-neutral-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-black/5">
              {departments.map((dept, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    idx === activeIndex
                      ? "opacity-100 scale-100 pointer-events-auto z-10"
                      : "opacity-0 scale-105 pointer-events-none z-0"
                  }`}
                >
                  <Image
                    src={dept.image}
                    alt={dept.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            {/* Description Info Area */}
            <div ref={textRef} className="flex flex-col gap-3 min-h-[140px] justify-start px-2">
              <span className="active-animate text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-[#8AF349] uppercase block">
                {departments[activeIndex].tag}
              </span>
              <p className="active-animate text-neutral-600 text-base md:text-lg leading-[1.65]">
                {departments[activeIndex].description}
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
