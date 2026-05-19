"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseStats() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".stats-card");
    
    // Staggered premium entrance animation on scroll
    const tl = gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-28 bg-[#FFFDF9] overflow-hidden" id="expertise">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Grid Layout - 12 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Stat Cards Dashboard (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Row: Years of Expertise & Projects Completed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Nurturing Years */}
              <div className="stats-card bg-white rounded-[32px] border border-neutral-100/80 p-8 sm:p-10 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 ease-out">
                <div className="flex flex-col items-start text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full text-[0.68rem] font-bold tracking-wider text-[#0F766E] bg-[#D2F4F0]/30 border border-[#D2F4F0]/60 mb-8 uppercase font-sans">
                    Nurturing Years
                  </span>
                  <div className="text-6xl sm:text-7xl font-bold text-neutral-900 leading-none tracking-tight mb-5 font-sans">
                    12+
                  </div>
                  <p className="text-[0.98rem] text-neutral-500 leading-relaxed font-sans font-medium">
                    Years of nurturing little stars with dedicated early learning and personal guidance.
                  </p>
                </div>
              </div>

              {/* Card 2: Happy Explorers */}
              <div className="stats-card bg-white rounded-[32px] border border-neutral-100/80 p-8 sm:p-10 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 ease-out">
                <div className="flex flex-col items-start text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full text-[0.68rem] font-bold tracking-wider text-[#854D0E] bg-[#F2F53E]/12 border border-[#F2F53E]/30 mb-8 uppercase font-sans">
                    Happy Explorers
                  </span>
                  <div className="text-6xl sm:text-7xl font-bold text-neutral-900 leading-none tracking-tight mb-5 font-sans">
                    1,200+
                  </div>
                  <p className="text-[0.98rem] text-neutral-500 leading-relaxed font-sans font-medium">
                    We have helped over 1,200 children build a strong foundation for future school success.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Row: Parents Satisfaction (Wide Dashboard Layout) */}
            <div className="stats-card bg-white rounded-[32px] border border-neutral-100/80 p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 ease-out w-full">
              <div className="flex flex-col items-start text-left">
                <span className="inline-block px-4 py-1.5 rounded-full text-[0.68rem] font-bold tracking-wider text-neutral-600 bg-neutral-100/60 border border-neutral-200/50 mb-5 uppercase font-sans">
                  Parents Satisfaction
                </span>
                <div className="text-6xl sm:text-7xl font-bold text-neutral-900 leading-none tracking-tight font-sans">
                  99%
                </div>
              </div>
              <p className="text-[1rem] text-neutral-500 leading-relaxed font-sans font-medium max-w-md md:mt-6 text-left">
                Parents trust us for our safe, stimulating, and nurturing environment. We focus on active partnership by sharing your child's daily wonder and growth milestones.
              </p>
            </div>

          </div>

          {/* Right Column: Large Premium Photo Card (5 Cols) */}
          <div className="stats-card lg:col-span-5 h-full flex transition-all duration-500 ease-out hover:-translate-y-1">
            <div className="relative rounded-[32px] overflow-hidden w-full min-h-[420px] lg:min-h-full border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex-grow">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800"
                alt="KidzStar classroom learning"
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              {/* Soft overlay gradient for luxury depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
