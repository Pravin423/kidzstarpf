"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TeacherStatsSplit() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ctx = gsap.context(() => {
            // Animate Heading & Button
            gsap.fromTo(
              ".anim-left > *",
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15 }
            );

            // Animate Stats Divider & Blocks
            gsap.fromTo(
              ".anim-stat-border",
              { scaleY: 0 },
              { scaleY: 1, duration: 1, ease: "power3.inOut" }
            );

            gsap.fromTo(
              ".anim-stat-item",
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2, delay: 0.3 }
            );

            // Animate Image on Right
            gsap.fromTo(
              ".anim-right-img",
              { scale: 1.08, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" }
            );
          }, containerRef);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-16 md:py-28 bg-[#FDFCF9] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        
        {/* Left Side: Copy, Button & Stats */}
        <div className="flex flex-col justify-between py-2">
          
          {/* Heading & Action Button */}
          <div className="anim-left flex flex-col items-start gap-6 md:gap-8 max-w-[540px] mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-[2.75rem] font-medium text-neutral-900 tracking-tight leading-[1.1] opacity-0">
              Bringing child development and active mentorship into perfect alignment
            </h2>
            <button className="group relative px-8 rounded-full overflow-hidden font-sans text-[0.95rem] font-bold tracking-[0.2px] shadow-sm transition-all duration-500 hover:scale-[1.04] active:scale-95 bg-black text-white hover:text-black hover:shadow-[0_8px_20px_rgba(132,251,65,0.2)] border border-white/10 opacity-0 h-[46px] inline-flex items-center justify-center cursor-pointer">
              {/* Button Text */}
              <span className="relative z-10 transition-colors duration-300">
                Meet our educators
              </span>

              {/* Idle Shimmer sheen sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

              {/* Hover Radial Ripple Reveal */}
              <span className="absolute w-[200px] h-[200px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
            </button>
          </div>

          {/* Stats Segment with Vertical Left Border */}
          <div className="relative pl-6 md:pl-10 flex flex-col">
            {/* Animated Left Line */}
            <div className="anim-stat-border absolute left-0 top-0 bottom-0 w-[1.5px] bg-black/10 origin-top"></div>

            {/* Stat Item 1 */}
            <div className="anim-stat-item opacity-0 pb-8 border-b border-black/10">
              <span className="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 block mb-2 font-sans">
                98%
              </span>
              <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-3">
                Parent Satisfaction
              </span>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-[420px]">
                Focused on cooperative family communication and cultivating a warm, welcoming classroom community.
              </p>
            </div>

            {/* Stat Item 2 */}
            <div className="anim-stat-item opacity-0 pt-8">
              <span className="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 block mb-2 font-sans">
                15+
              </span>
              <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-3">
                Years Average Experience
              </span>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-[420px]">
                Led by qualified educators who specialize in early learning methodologies and child development.
              </p>
            </div>

          </div>

        </div>

        {/* Right Side: Professional Collaboration Image */}
        <div className="flex items-center justify-center">
          <div className="relative w-full h-full min-h-[400px] lg:min-h-[550px] aspect-[1.1] lg:aspect-auto rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5">
            <Image
              src="https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?q=80&w=1200"
              alt="Educators collaborating"
              fill
              className="anim-right-img object-cover opacity-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
