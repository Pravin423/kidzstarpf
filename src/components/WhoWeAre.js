"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom 8-pointed star (asterisk) to match the image exactly
const Asterisk = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round" />
  </svg>
);

// Standard 5-pointed star for ratings
const StarIcon = ({ className = "", fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 ${className}`} fill={fill}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const floatingImgRef = useRef(null);
  const marqueeRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left Image Composition Animation
      gsap.fromTo(leftColRef.current,
        { x: -100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Right Content Staggered Animation
      const rightElements = rightColRef.current.children;
      gsap.fromTo(rightElements,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating Image Intro Animation
      gsap.fromTo(floatingImgRef.current,
        { x: 100, opacity: 0, rotate: 5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: floatingImgRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Infinite Floating Effect
      gsap.to(floatingImgRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // ✅ FIXED: Natively Vertical Infinite Marquee Animation
      // - yPercent goes from 0 → -50 (one full copy block) for seamless upward vertical scroll
      gsap.fromTo(marqueeRef.current,
        { yPercent: 0 },
        {
          yPercent: -50,
          duration: 15,
          repeat: -1,
          ease: "none"
        }
      );

      // Reveal stars in yellow bar
      gsap.from(".yellow-bar-star", {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 70%"
        }
      });

      // Rating Number Count up
      if (countRef.current) {
        gsap.fromTo(countRef.current,
          { textContent: "0.0" },
          {
            textContent: "4.9",
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 0.1 },
            onUpdate: function() {
              if (countRef.current) {
                countRef.current.innerHTML = Number(this.targets()[0].textContent).toFixed(1);
              }
            },
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Blinking Stars Animation
      gsap.fromTo(".rating-star",
        { opacity: 0.3, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 py-24 px-6 bg-white overflow-hidden min-h-screen flex items-center"
      id="who-we-are"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left Side: Image Composition */}
        <div ref={leftColRef} className="relative flex items-center justify-center lg:justify-start">
          {/* Main Smooth Blue Container */}
          <div className="relative w-full max-w-[720px] aspect-[1.1/1] bg-[#CBE4F9] rounded-[50px] overflow-hidden flex items-center pr-[110px]">

            {/* Oval Image Container */}
            <div className="relative ml-12 my-8 w-[80%] aspect-[0.75/1] rounded-full overflow-hidden border-[10px] border-white shadow-sm">
              <Image
                src="/kimg1.png"
                alt="Preschool kids playing"
                fill
                className="object-cover"
              />
            </div>

            {/* Vertical Neon Green Bar */}
            <div className="absolute right-0 top-0 bottom-0 w-[110px] bg-[#84FB41] flex flex-col items-center py-6 overflow-hidden">
              
              {/* Marquee Track — Natively vertical for robust positioning and smooth scroll */}
              <div className="absolute inset-0 flex flex-col items-center overflow-hidden pointer-events-none">
                <div
                  ref={marqueeRef}
                  className="flex flex-col items-center gap-10 pt-10"
                  style={{ height: 'max-content' }}
                >
                  {/* Two identical blocks — GSAP moves by -50% (one block) for seamless loop */}
                  {[1, 2].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-10">
                      <div className="h-[180px] flex items-center justify-center">
                        <span className="text-black font-bold text-[2rem] tracking-tighter uppercase -rotate-90 whitespace-nowrap block select-none">
                          Play & Learn
                        </span>
                      </div>
                      <Asterisk className="text-black w-8 h-8" />
                      <div className="h-[210px] flex items-center justify-center">
                        <span className="text-black font-bold text-[2rem] tracking-tighter uppercase -rotate-90 whitespace-nowrap block select-none">
                          Grow & Shine
                        </span>
                      </div>
                      <Asterisk className="text-black w-8 h-8" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div ref={rightColRef} className="flex flex-col gap-10 lg:pl-6">
          <div className="space-y-6">
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.25em] text-slate-500 block">
              About Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-black leading-[1.1] tracking-tight">
              Welcome to Kidzstar
            </h2>
          </div>

          <div className="space-y-4">
            <span className="text-[1.1rem] font-bold tracking-wider text-black block uppercase">
              OUR VISION
            </span>
            <p className="text-[1rem] text-slate-600 leading-relaxed max-w-[580px] font-medium opacity-90">
              At Kidzstar Pre-Primary School, we believe every child is born with limitless potential. We create joyful learning experiences that spark curiosity and imagination. Our nurturing environment builds confidence, independence, and strong values. Through play, exploration, and guidance, children grow academically and emotionally. We lay the foundation for lifelong learning and future success.
            </p>
          </div>

          <div className="flex items-start">
            <Link
              href="/#admission"
              className="relative inline-flex items-center justify-center h-[56px] px-12 rounded-full overflow-hidden font-sans text-lg font-bold tracking-wide shadow-xl group transition-all duration-500 hover:scale-[1.04] active:scale-95 bg-black text-white hover:text-black hover:shadow-[0_12px_30px_rgba(132,251,65,0.25)] border border-white/10"
            >
              {/* Button Text */}
              <span className="relative z-10 transition-colors duration-300">
                Explore Programs
              </span>

              {/* Idle Shimmer sheen sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

              {/* Hover Radial Ripple Reveal */}
              <span className="absolute w-[280px] h-[280px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
            </Link>
          </div>

          {/* Rating Section */}
          <div className="flex flex-col gap-5 pt-10 relative">
            <div className="flex items-center gap-8">
              <span ref={countRef} className="text-8xl font-bold text-black tracking-tighter">4.9</span>
              <div className="flex flex-col gap-2">
                <div className="flex -space-x-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-[5px] border-white overflow-hidden bg-slate-200 shadow-sm">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${i + 40}`}
                        alt="Parent avatar"
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} fill="#FFB800" className="rating-star text-[#FFB800] w-5 h-5" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-slate-500 font-semibold text-[1.1rem]">Happy parents feedback</p>

            {/* Bottom Right Floating Image */}
            <div ref={floatingImgRef} className="absolute -right-5 lg:-right-10 -bottom-24 w-[280px] aspect-[1.1/1] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hidden md:block">
              <Image
                src="/kimg2.png"
                alt="Preschool drawing session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}