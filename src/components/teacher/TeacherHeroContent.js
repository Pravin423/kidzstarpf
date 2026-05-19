"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TeacherHeroContent() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animate the subtitle
      tl.fromTo(".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      
      // Animate the main title lines with a stagger
      tl.fromTo(".hero-title-line",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15 },
        "-=0.4"
      );
      
      // Animate the description
      tl.fromTo(".hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
      
      // Animate the asterisk
      tl.fromTo(".hero-asterisk",
        { opacity: 0, scale: 0.5, rotation: -45 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" },
        "-=0.8"
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full px-4 md:px-12 pt-32 md:pt-48 lg:pt-56 pb-8 md:pb-12 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-4">
      
      {/* Left: Title */}
      <div className="w-full lg:w-5/12 xl:w-5/12">
        <h3 className="hero-subtitle opacity-0 text-[0.65rem] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-6 md:mb-10">
          About Teachers
        </h3>
        <h1 className="text-5xl md:text-[4.5rem] lg:text-[4.5rem] font-medium tracking-tight text-neutral-900 leading-[1.05] -ml-1">
          <span className="hero-title-line block opacity-0">Guided by</span>
          <span className="hero-title-line block opacity-0">passion proven</span>
          <span className="hero-title-line block opacity-0">through growth</span>
        </h1>
      </div>

      {/* Center: Animated Asterisk */}
      <div className="hidden lg:flex w-full lg:w-3/12 justify-center lg:justify-end mt-4 lg:mt-[120px] lg:pr-8">
        <div className="hero-asterisk opacity-0">
          <div className="animate-[spin_20s_linear_infinite]">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#C8EFE6" strokeWidth="12" strokeLinecap="butt">
                <line x1="50" y1="5" x2="50" y2="95" />
                <line x1="5" y1="50" x2="95" y2="50" />
                <line x1="18" y1="18" x2="82" y2="82" />
                <line x1="18" y1="82" x2="82" y2="18" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Right: Description */}
      <div className="w-full md:w-8/12 lg:w-4/12 xl:w-4/12 mt-6 lg:mt-[120px]">
        <p className="hero-desc opacity-0 text-[1.1rem] text-neutral-600 leading-[1.7] lg:pl-4">
          We lead with clear purpose and measure success by the joy we cultivate, enabling children to enhance their confidence and achieve sustainable lifelong learning.
        </p>
      </div>
      
    </div>
  );
}
