"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdmissionModal } from "../context/AdmissionModalContext";

gsap.registerPlugin(ScrollTrigger);

const FLOATING_CARDS = [
  {
    id: "card-top-left",
    frontImage: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=500",
    backImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=500",
    alt: "Playgroup classroom environment"
  },
  {
    id: "card-top-right",
    frontImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=500",
    backImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500",
    alt: "Children drawing together"
  },
  {
    id: "card-bottom-left",
    frontImage: "https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=500",
    backImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=500",
    alt: "Outdoor play area"
  },
  {
    id: "card-bottom-right",
    frontImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=500",
    backImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=500",
    alt: "Children playing educational blocks"
  }
];

export default function JoinUs() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const { openModal } = useAdmissionModal();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // GSAP ScrollTrigger timeline to pin container and rotate card inner wrappers in 3D
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=1600",
        scrub: 1.5, // Buttery-smooth scrub inertia that absorbs scroll ticks
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      }
    });

    // Step 1 & 2: Single unified orbital sweeps that flip 180 degrees in 3D 
    // in one continuous, elegant, and hitch-free movement!
    tl.to(cardsRef.current[0], {
      x: "1vw",
      y: "48vh",
      scale: 0.8,
      rotateY: 180,
      force3D: true,
      ease: "power2.inOut",
      duration: 2
    }, 0);

    tl.to(cardsRef.current[1], {
      x: "-1vw",
      y: "48vh",
      scale: 0.8,
      rotateY: -180,
      force3D: true,
      ease: "power2.inOut",
      duration: 2
    }, 0);

    tl.to(cardsRef.current[2], {
      x: "-2vw",
      y: "-48vh",
      scale: 0.8,
      rotateY: -180,
      force3D: true,
      ease: "power2.inOut",
      duration: 2
    }, 0);

    tl.to(cardsRef.current[3], {
      x: "2vw",
      y: "-48vh",
      scale: 0.8,
      rotateY: 180,
      force3D: true,
      ease: "power2.inOut",
      duration: 2
    }, 0);

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center py-20 overflow-hidden bg-[#FFFDF9] select-none">
      
      {/* 3D Card Orbit Grid - Absolute Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Card 1: Top-Left */}
        <div 
          className="absolute left-[8vw] top-[14vh] w-[150px] sm:w-[200px] md:w-[245px] aspect-[1.12/1]"
          style={{ perspective: "1000px" }}
        >
          <div 
            ref={(el) => (cardsRef.current[0] = el)}
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Front Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <Image src={FLOATING_CARDS[0].frontImage} alt="front" fill className="object-cover" sizes="245px" />
            </div>
            {/* Back Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Image src={FLOATING_CARDS[0].backImage} alt="back" fill className="object-cover" sizes="245px" />
            </div>
          </div>
        </div>

        {/* Card 2: Top-Right */}
        <div 
          className="absolute right-[8vw] top-[14vh] w-[150px] sm:w-[200px] md:w-[245px] aspect-[1.12/1]"
          style={{ perspective: "1000px" }}
        >
          <div 
            ref={(el) => (cardsRef.current[1] = el)}
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Front Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <Image src={FLOATING_CARDS[1].frontImage} alt="front" fill className="object-cover" sizes="245px" />
            </div>
            {/* Back Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Image src={FLOATING_CARDS[1].backImage} alt="back" fill className="object-cover" sizes="245px" />
            </div>
          </div>
        </div>

        {/* Card 3: Bottom-Left */}
        <div 
          className="absolute left-[10vw] bottom-[14vh] w-[150px] sm:w-[200px] md:w-[245px] aspect-[1.12/1]"
          style={{ perspective: "1000px" }}
        >
          <div 
            ref={(el) => (cardsRef.current[2] = el)}
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Front Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <Image src={FLOATING_CARDS[2].frontImage} alt="front" fill className="object-cover" sizes="245px" />
            </div>
            {/* Back Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Image src={FLOATING_CARDS[2].backImage} alt="back" fill className="object-cover" sizes="245px" />
            </div>
          </div>
        </div>

        {/* Card 4: Bottom-Right */}
        <div 
          className="absolute right-[10vw] bottom-[14vh] w-[150px] sm:w-[200px] md:w-[245px] aspect-[1.12/1]"
          style={{ perspective: "1000px" }}
        >
          <div 
            ref={(el) => (cardsRef.current[3] = el)}
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Front Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <Image src={FLOATING_CARDS[3].frontImage} alt="front" fill className="object-cover" sizes="245px" />
            </div>
            {/* Back Face */}
            <div 
              className="absolute inset-0 rounded-[32px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Image src={FLOATING_CARDS[3].backImage} alt="back" fill className="object-cover" sizes="245px" />
            </div>
          </div>
        </div>

      </div>

      {/* Central Interactive Content Columns */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[840px] px-6">
        
        {/* Avatars Stacked Overlapping Pile */}
        <div className="flex items-center -space-x-4 mb-8">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm z-20">
            <Image 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80" 
              alt="Consultant profile" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm z-10">
            <Image 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=80&h=80" 
              alt="Strategist profile" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm z-0">
            <Image 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80&h=80" 
              alt="Operations expert profile" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-11 h-11 rounded-full bg-[#F2F53E] border-2 border-white shadow-sm flex items-center justify-center text-black font-bold text-sm z-30 select-none">
            +
          </div>
        </div>

        {/* Primary Pitch Header */}
        <h2 className="text-4xl sm:text-5xl lg:text-[2.8rem] font-bold text-neutral-900 leading-[1.15] tracking-tight font-sans mb-6 max-w-3xl">
          OUR CURRICULUM
        </h2>

        {/* Muted Paragraph Pitch */}
        <p className="text-[1.02rem] text-slate-500 leading-relaxed font-sans font-medium max-w-2xl mb-10">
          By creating a safe, consistent and welcoming environment where every child feels valued and inspired to explore. We spark curiosity, confidence, and strong values.
        </p>

        {/* Stretched Premium Call-To-Action Pill Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={openModal} 
            className="relative inline-flex items-center justify-center h-[54px] px-8 rounded-full overflow-hidden font-semibold tracking-wide shadow-lg group transition-all duration-500 hover:scale-[1.04] active:scale-95 z-20 bg-black text-white hover:text-black hover:shadow-[0_12px_30px_rgba(132,251,65,0.25)] border border-white/10 w-full sm:w-auto cursor-pointer"
          >
            {/* Button Text */}
            <span className="relative z-10 transition-colors duration-300">
              Playgroup (2.5 - 3.5 Years)
            </span>

            {/* Idle Shimmer sheen sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

            {/* Hover Radial Ripple Reveal */}
            <span className="absolute w-[320px] h-[320px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
          </button>
          <button 
            onClick={openModal} 
            className="relative inline-flex items-center justify-center h-[54px] px-8 rounded-full overflow-hidden font-semibold tracking-wide shadow-md group transition-all duration-500 hover:scale-[1.04] active:scale-95 z-20 bg-white text-black hover:text-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-neutral-200 hover:border-black w-full sm:w-auto cursor-pointer"
          >
            {/* Button Text */}
            <span className="relative z-10 transition-colors duration-300">
              Admission Intake
            </span>

            {/* Idle Shimmer sheen sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/[0.04] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

            {/* Hover Radial Ripple Reveal */}
            <span className="absolute w-[280px] h-[280px] bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
          </button>
        </div>

      </div>

    </section>
  );
}
