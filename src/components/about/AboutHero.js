"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AvatarGroup from "./AvatarGroup";
import GrowthCard from "./GrowthCard";
import { useAdmissionModal } from "../../context/AdmissionModalContext";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const { openModal } = useAdmissionModal();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Text Content Fade In
      gsap.from(".hero-fade-item", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
      });

      // Main Image In-and-Out Reveal Animation
      const mainTl = gsap.timeline({ delay: 0.1 });
      
      mainTl.to(".image-reveal-cover", {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.7,
        ease: "power3.inOut"
      })
      .set(".main-img-wrapper", { opacity: 1 })
      .to(".image-reveal-cover", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.7,
        ease: "power3.inOut"
      });

      // Avatar Images In-and-Out Reveal Animation
      const avatarTl = gsap.timeline({ delay: 0.5 });
      
      avatarTl.to(".avatar-reveal-cover", {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.4,
        ease: "power3.inOut",
        stagger: 0.1
      })
      .set(".avatar-img-wrapper", { opacity: 1 })
      .to(".avatar-reveal-cover", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.4,
        ease: "power3.inOut",
        stagger: 0.1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 px-6 max-w-[1400px] mx-auto w-full z-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-12 items-center pl-0 lg:pl-12">
        
        {/* Left Content */}
        <div className="flex flex-col items-start pr-0 lg:pr-12">
          <span className="hero-fade-item text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-600 mb-6 block">
            ABOUT US
          </span>
          <h1 className="hero-fade-item text-5xl sm:text-6xl lg:text-[4.2rem] font-bold text-black leading-[1.02] tracking-[-0.03em] mb-7">
            Creative<br />Surroundings for a<br />Better Future
          </h1>
          <p className="hero-fade-item text-[1.125rem] text-slate-600/90 leading-[1.65] font-medium mb-10 max-w-[480px]">
            At KidzStar, we believe that children thrive in spaces that inspire discovery. Our child-centered approach merges structured play with creative exploration to build a solid foundation for early learning and growth.
          </p>
          
          <div className="hero-fade-item flex flex-wrap items-center gap-4">
            <Link 
              href="/programs" 
              className="relative inline-flex items-center justify-center h-[50px] px-8 rounded-full overflow-hidden font-semibold text-[0.9rem] tracking-wide shadow-sm group transition-all duration-500 hover:scale-[1.04] active:scale-95 bg-black text-white hover:text-black hover:shadow-[0_8px_20px_rgba(132,251,65,0.2)] border border-white/10"
            >
              <span className="relative z-10 transition-colors duration-300">
                Explore Programs
              </span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>
              <span className="absolute w-[200px] h-[200px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
            </Link>
            
            <button 
              onClick={openModal} 
              className="relative inline-flex items-center justify-center h-[50px] px-8 rounded-full overflow-hidden font-semibold text-[0.9rem] tracking-wide shadow-sm group transition-all duration-500 hover:scale-[1.04] active:scale-95 bg-white border border-gray-300 text-black hover:border-transparent hover:shadow-[0_8px_20px_rgba(132,251,65,0.2)] cursor-pointer"
            >
              <span className="relative z-10 transition-colors duration-300">
                Admission Inquiry
              </span>
              <span className="absolute w-[260px] h-[260px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
            </button>
          </div>

          <div className="hero-fade-item">
            <AvatarGroup />
          </div>
        </div>

        {/* Right Image Composition */}
        <div className="relative w-full h-[600px] lg:h-[750px] mt-10 lg:mt-0">
          <div className="w-full h-full relative rounded-[40px] overflow-hidden">
            <div className="main-img-wrapper opacity-0 w-full h-full relative">
              <Image 
                src="/kimg3.png" 
                alt="Woman working on laptop"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Image Reveal Cover */}
            <div className="image-reveal-cover absolute inset-0 bg-[#84FB41] z-10 origin-bottom" style={{ transform: "scaleY(0)" }}></div>
          </div>
          
          <GrowthCard />
        </div>

      </div>
    </section>
  );
}
