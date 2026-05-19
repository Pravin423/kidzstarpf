"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: 1,
    title: "Safe Outdoor Play",
    description: "Safe and secure outdoor play area with age-appropriate equipment to promote physical development and teamwork.",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Colorful Classrooms",
    description: "Colorful and stimulating classrooms designed to spark imagination and encourage focus.",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Indoor Play Spaces",
    description: "Indoor play spaces for physical activities, sensory development, and weather-proof recreation.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    title: "Interactive Learning",
    description: "Interactive learning tools and educational toys tailored to each developmental stage.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    title: "Art & Creativity Corner",
    description: "Art and creativity corner filled with open-ended materials for self-expression and sensory play.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 6,
    title: "Smart Tech Integration",
    description: "Multimedia and technology integration for smart learning and early digital literacy.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600"
  }
];

export default function OurServices() {
  const trackRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeTween = useRef(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Duplicate data to make seamless infinite marquee
  const doubleServices = [...SERVICES_DATA, ...SERVICES_DATA];

  useEffect(() => {
    if (headerRef.current) {
      const headerElements = headerRef.current.children;
      gsap.fromTo(headerElements,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      // Calculate scroll width for half the track (which represents one full loop of cards)
      const scrollWidth = trackRef.current.scrollWidth / 2;

      // GSAP Infinite Horizontal Marquee Tween
      marqueeTween.current = gsap.to(trackRef.current, {
        x: -scrollWidth,
        duration: 30, // Butter-smooth pace
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      if (marqueeTween.current) marqueeTween.current.kill();
    };
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredCardId(id);
    if (marqueeTween.current) {
      // Smoothly decelerate marquee speed to 0
      gsap.to(marqueeTween.current, { timeScale: 0, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    if (marqueeTween.current) {
      // Smoothly accelerate marquee speed back to normal (1)
      gsap.to(marqueeTween.current, { timeScale: 1, duration: 0.5, ease: "power2.in" });
    }
  };

  return (
    <section className="py-24 bg-[#FFFDF9] overflow-hidden" id="services">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-16 text-left">
        <span className="font-sans uppercase tracking-[0.25em] text-[0.8rem] font-bold text-slate-500 mb-4 block">
          Advanced Campus
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-black max-w-3xl font-sans mb-5">
          Best Facilities For Our Explorers
        </h2>
        <p className="text-[1.05rem] text-slate-500 leading-relaxed font-sans font-medium max-w-2xl">
          Every corner is an orbit of discovery, meticulously engineered to fuel curiosity, safety, and rapid intellectual ignition.
        </p>
      </div>

      {/* Outer Horizontal Scrolling Container */}
      <div className="w-full relative flex items-center select-none cursor-pointer">
        {/* Track Container moving horizontally via GSAP */}
        <div 
          ref={trackRef} 
          className="flex flex-row gap-6 w-max pl-6"
        >
          {doubleServices.map((service, index) => {
            const isHovered = hoveredCardId === index;
            return (
              <div
                key={index}
                className="relative w-[390px] sm:w-[440px] h-[560px] bg-white rounded-[32px] overflow-hidden border border-black/5 flex flex-col z-10 select-none cursor-pointer"
                style={{
                  boxShadow: isHovered 
                    ? "0 30px 60px -15px rgba(0,0,0,0.15), 0 15px 30px -15px rgba(0,0,0,0.1)" 
                    : "0 4px 20px -8px rgba(0,0,0,0.03)",
                  transform: isHovered ? "scale(1.025)" : "scale(1)",
                  transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.9s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Image Viewport Container - Dynamic height crops image, rounded corners shape the bottom */}
                <div 
                  className="relative w-full overflow-hidden rounded-[32px]"
                  style={{
                    height: isHovered ? "55%" : "100%",
                    transition: "height 0.9s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  {/* Fixed inner container keeps image content completely stationary during crop */}
                  <div className="absolute top-0 left-0 w-full h-[560px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out"
                      style={{
                        transform: isHovered ? "scale(1.03)" : "scale(1)"
                      }}
                      sizes="440px"
                      priority={index < 4}
                    />
                  </div>
                  
                  {/* Subtle Top Inner Vignette for Premium Depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* White Service Info Details Drawer (Reveals smoothly from bottom on hover - aligned perfectly at 43% height) */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-white w-full h-[43%] flex flex-col justify-between p-8 rounded-b-[32px] border-t border-black/5 z-20"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(100%)",
                    pointerEvents: isHovered ? "auto" : "none",
                    transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <div className="space-y-4">
                    <h3 className="text-[1.5rem] font-bold text-neutral-900 leading-snug tracking-tight font-sans">
                      {service.title}
                    </h3>
                    <p className="text-[1rem] text-neutral-500 leading-relaxed font-sans font-medium">
                      {service.description}
                    </p>
                  </div>

                  <Link 
                    href="#contact" 
                    className="flex items-center gap-1 text-neutral-900 font-bold text-[0.95rem] tracking-tight group w-max"
                  >
                    <span>Explore more</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
