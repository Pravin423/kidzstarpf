"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Safe & Caring Space",
    description: "Our secure environment ensures every child feels loved, protected, and free to express themselves.",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=700"
  },
  {
    number: "02",
    title: "Creative Hands-on Play",
    description: "Interactive activities are designed to develop motor skills and foster an early love for discovery.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=700"
  },
  {
    number: "03",
    title: "Spark Curiosity",
    description: "We engage young minds with stimulating challenges that inspire a lifelong thirst for knowledge.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=700"
  },
  {
    number: "04",
    title: "Build Confidence",
    description: "Through encouragement and positive reinforcement, children learn to believe in their own abilities.",
    image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=700"
  },
  {
    number: "05",
    title: "Nurture Core Values",
    description: "We focus on empathy, sharing, and kindness, instilling the emotional intelligence needed for the future.",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=700"
  }
];

// Custom 8-pointed star (asterisk) to match the Mascot style perfectly
const CustomMascotStar = ({ className, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    style={style}
    fill="currentColor"
  >
    <g transform="translate(50,50)">
      {[...Array(8)].map((_, i) => (
        <rect
          key={i}
          x="-5"
          y="-45"
          width="10"
          height="90"
          rx="5"
          transform={`rotate(${i * 45})`}
        />
      ))}
    </g>
  </svg>
);

export default function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Staggered premium entry for high-end feel
    const tl = gsap.fromTo(
      el.querySelectorAll(".work-animate"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
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
    <section ref={containerRef} className="py-24 bg-[#FFFDF9] overflow-hidden" id="process">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[580px]">
          
          {/* Left Column: Dynamic Interactive Image Card (5 Cols) */}
          <div className="work-animate lg:col-span-5 relative w-full h-[450px] sm:h-[520px] lg:h-full min-h-[450px] rounded-[32px] overflow-hidden border border-black/5 shadow-sm">
            {PROCESS_STEPS.map((step, index) => (
              <div 
                key={index}
                className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  transform: activeIndex === index ? "scale(1)" : "scale(1.06)",
                  zIndex: activeIndex === index ? 10 : 0
                }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={index === 0}
                />
                
                {/* Gentle vignette for high-end aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Center Column: Title & Floating Rotating Mascot (3 Cols - Aligned Vertically Centered) */}
          <div className="work-animate lg:col-span-3 flex flex-col justify-center items-center lg:items-start lg:pl-8 py-6 min-h-[340px] lg:min-h-full">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
              
              {/* Spinning Mascot Star with offset drop-shadow */}
              <CustomMascotStar 
                className="w-24 h-24 text-[#D2F4F0] animate-[spin_24s_linear_infinite]" 
                style={{ filter: "drop-shadow(6px 6px 0px rgba(210,244,240,0.5)) drop-shadow(3px 3px 0px rgba(0,0,0,0.03))" }} 
              />
              
              {/* Title and Description */}
              <div className="space-y-4 w-full flex flex-col items-center lg:items-start">
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-[1.15] tracking-tight font-sans text-center lg:text-left">
                  Our Pillars
                </h2>
                <div className="relative w-full h-[100px] max-w-sm lg:max-w-[260px]">
                  {PROCESS_STEPS.map((step, index) => (
                    <p 
                      key={index}
                      className="absolute inset-0 text-[1rem] text-slate-500 leading-relaxed font-sans font-medium text-center lg:text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        opacity: activeIndex === index ? 1 : 0,
                        transform: activeIndex === index ? "translateY(0)" : "translateY(12px)",
                        pointerEvents: activeIndex === index ? "auto" : "none"
                      }}
                    >
                      {step.description}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Steps Yellow Control Box (4 Cols) */}
          <div className="work-animate lg:col-span-4 flex">
            <div className="w-full bg-[#F2F53E] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-black/5">
              
              {PROCESS_STEPS.map((step, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full flex items-center justify-between py-4 border-b transition-all duration-500 text-left group select-none ${
                      isActive 
                        ? "border-black text-black font-bold" 
                        : "border-black/10 text-black/60 font-semibold hover:text-black/85"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-[0.75rem] font-bold tracking-wider font-mono">
                        {step.number}
                      </span>
                      <span className="text-[1.08rem] tracking-tight font-sans">
                        {step.title}
                      </span>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 transition-all duration-500 ${
                      isActive 
                        ? "text-black scale-110 translate-x-0.5 -translate-y-0.5" 
                        : "text-black/30 group-hover:text-black/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`} />
                  </button>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
