"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { 
  BookOpen, 
  Sun, 
  Brain, 
  GraduationCap, 
  Sparkles, 
  Lightbulb, 
  Award, 
  Compass, 
  Smile, 
  Heart, 
  Star, 
  Bookmark, 
  Palette, 
  Sprout, 
  BadgeCheck 
} from "lucide-react";

const partners = [
  { name: "EarlyEd Foundations", icon: BookOpen },
  { name: "Bright Start Educator Program", icon: Sun },
  { name: "Little Minds Academy", icon: Brain },
  { name: "Early Learning Essentials", icon: GraduationCap },
  { name: "Future Kids Educator Course", icon: Sparkles },
  { name: "Smart Start Teaching", icon: Lightbulb },
  { name: "Early Childhood Pro", icon: Award },
  { name: "KinderGrow Program", icon: Compass },
  { name: "Tiny Steps Education", icon: Smile },
  { name: "Play & Learn Educator Course", icon: Heart },
  { name: "NextGen Early Educators", icon: Star },
  { name: "Foundations in Preschool Education", icon: Bookmark },
  { name: "Creative Kids Learning Program", icon: Palette },
  { name: "Bloom Early Education", icon: Sprout },
  { name: "Early Years Excellence", icon: BadgeCheck },
];

const Card = ({ name, Icon }) => (
  <div className="group relative flex items-center justify-center min-w-[260px] md:min-w-[320px] h-[80px] md:h-[100px] rounded-xl md:rounded-[1.5rem] border border-black/5 bg-[#FDFCF9] hover:bg-[#8AF349] transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer overflow-hidden shadow-[0px_4px_15px_rgba(0,0,0,0.03)] hover:shadow-md mr-6 md:mr-8">
    
    <div className="h-6 md:h-7 overflow-hidden flex flex-col justify-start">
      <div className="flex flex-col items-center transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
        
        {/* Normal Text */}
        <span className="flex items-center gap-3 text-neutral-700 font-semibold text-sm md:text-base h-6 md:h-7">
          <Icon className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" /> {name}
        </span>
        
        {/* Hover Text */}
        <span className="flex items-center gap-3 text-neutral-900 font-semibold text-sm md:text-base h-6 md:h-7">
          <Icon className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" /> {name}
        </span>

      </div>
    </div>

  </div>
);

export default function TeacherMarquee() {
  // Use 4 copies to ensure the container is wide enough for a safe 50% translation loop on any screen
  const row1 = [...partners, ...partners, ...partners, ...partners];
  
  // Second row reversed
  const row2Base = [...partners].reverse();
  const row2 = [...row2Base, ...row2Base, ...row2Base, ...row2Base];

  const headerRef = useRef(null);

  useEffect(() => {
    let ctx;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(
              ".marquee-subtitle",
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
            tl.fromTo(
              ".marquee-title-line",
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15 },
              "-=0.5"
            );
          }, headerRef);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the header is visible
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="w-full pt-16 pb-24 md:pt-24 md:pb-32 bg-[#FDFCF9] overflow-hidden flex flex-col items-center">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
        }
        /* Pause the marquee when hovering over the container */
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 md:mb-20 px-4">
        <h3 className="marquee-subtitle opacity-0 text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase mb-4 md:mb-6">
         Teacher Training Course
        </h3>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
          <span className="marquee-title-line block opacity-0"> Early Childhood Care and Education</span>
          <span className="marquee-title-line block opacity-0">Training Course</span>
        </h2>
      </div>
      <div ref={headerRef} className="text-center mb-16 md:mb-20 px-4">
        <h3 className="marquee-subtitle opacity-0 text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase mb-4 md:mb-6">
         Teacher Training Course
        </h3>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
          <span className="marquee-title-line block opacity-0"> Early Childhood Care and Education</span>
          <span className="marquee-title-line block opacity-0">Training Course</span>
        </h2>
      </div>

      {/* Marquees */}
      <div 
        className="marquee-container relative w-full flex flex-col gap-6 md:gap-8 max-w-[100vw]"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        
        {/* Row 1: Right to Left */}
        <div className="flex w-max animate-marquee-left px-3 md:px-4">
          {row1.map((p, i) => (
            <Card key={`r1-${i}`} name={p.name} Icon={p.icon} />
          ))}
        </div>
        
        {/* Row 2: Left to Right */}
        <div className="flex w-max animate-marquee-right px-3 md:px-4">
          {row2.map((p, i) => (
            <Card key={`r2-${i}`} name={p.name} Icon={p.icon} />
          ))}
        </div>

      </div>
    </section>
  );
}
