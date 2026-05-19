"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const overlayTextRef = useRef(null);
  const mediaContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setHasScrolled(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Detect if page loaded with scroll offset
    if (window.scrollY > 5) {
      setHasScrolled(true);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.fromTo(elements,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.15
        }
      );
    }

    if (mediaContainerRef.current) {
      gsap.fromTo(mediaContainerRef.current,
        { y: 60, opacity: 0, scale: 0.94, rotate: -2 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.45
        }
      );
    }
  }, []);

  // GSAP Scroll-to-Fullscreen Scale Animation with Extended "Stuck" Hold
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Create a Timeline to orchestrate scale + dead-zone hold
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center", // Pin at screen center to apply clean mathematical offsets
            end: "+=1500",   // Extended scroll track for a long, cinematic pause
            scrub: 1.4,      // Slightly slower, buttery scrub inertia
            pin: true,       // Keeps the card stuck in place
            pinSpacing: true,
          }
        });

        // Step 1: Dynamic Hardware-Accelerated Scaling + Navbar Alignment (Takes 1 unit of timeline)
        tl.to(cardRef.current, {
          scale: () => {
            if (!cardRef.current) return 1;
            const nav = document.querySelector("nav");
            const navHeight = nav ? nav.offsetHeight : 95; // Dynamically query active navbar height
            
            const widthScale = window.innerWidth / cardRef.current.offsetWidth;
            // Scale height to cover available space BELOW the navbar
            const heightScale = (window.innerHeight - navHeight) / cardRef.current.offsetHeight;
            
            return Math.max(widthScale, heightScale) * 1.03; 
          },
          // Push the video center down mathematically so its top sits exactly flush below navbar!
          y: () => {
            const nav = document.querySelector("nav");
            const navHeight = nav ? nav.offsetHeight : 95;
            return navHeight / 2;
          },
          borderRadius: "0px",
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          ease: "power2.inOut", 
          duration: 1.2,
        });

        // Step 2: Visual "Stuck" Hold Buffer (Takes remaining timeline space)
        // An empty tween on a dummy target holds the video pinned full-screen 
        // for another 0.8 duration BEFORE letting the next section roll up!
        tl.to({}, { duration: 0.8 });

        // Step 3: Cinematic Slide-in Text Overlay (Triggers near the end of scale)
        tl.fromTo(overlayTextRef.current, 
          { 
            y: -60,   // Elegant slight offset
            opacity: 0,
            // Dynamically align fixed overlay immediately under the navbar
            top: () => {
              const nav = document.querySelector("nav");
              return (nav ? nav.offsetHeight : 95) + "px";
            }
          }, 
          { 
            y: 0,     // Centers natively within the remaining space
            opacity: 1, 
            duration: 0.55, 
            ease: "power3.out" 
          }, 
          1.05 // Injected perfectly as scale nears completion
        );

      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32  isolate">
      {/* Absolute Backdrop Grid Sheet - Baseline Layer */}
      <div 
        className="absolute inset-0 -z-30 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '180px 180px'
        }}
      ></div>

      {/* Circle Layer (At the Last) */}
      <div className="absolute top-[40px] sm:top-[60px] left-1/2 -translate-x-1/2 -z-20 w-[88vw] max-w-[900px] aspect-[942/740] pointer-events-none flex justify-center">
        <Image 
          src="/circlebanner(nocolor).svg" 
          alt="Official Banner Background Shape" 
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Blur Layer (In the Middle, overlapping the circle) - Decreased size for a tighter halo */}
      <div className="absolute top-[180px] sm:top-[240px] left-1/2 -translate-x-1/2 -z-10 w-[72vw] max-w-[640px] aspect-[942/740] bg-gradient-to-tr from-primary/30 to-secondary/35 rounded-full blur-[95px] pointer-events-none"></div>


      {/* Core Main Content Column */}
      <div ref={contentRef} className="relative flex flex-col items-center text-center max-w-[780px] mx-auto z-10 pt-16 sm:pt-24">
        
        {/* Fine Uppercase Section Subheader */}
        <span className="font-sans uppercase tracking-[0.25em] text-[0.8rem] font-bold text-slate-500 mb-6">
          Where Little Stars Shine Brighter
        </span>

        {/* Distinct, Bold Headline */}
        <h1 className="text-[2.8rem] sm:text-[3.8rem] md:text-[4.5rem] font-bold leading-[1.08] tracking-tight text-black font-sans mb-8">
          Play & Learn<br />New Things
        </h1>

        {/* Detailed Core Description paragraph */}
        <p className="text-[1.05rem] sm:text-[1.12rem] text-slate-600 leading-relaxed max-w-[640px] font-sans font-medium mb-10 px-4">
          Providing a safe, stimulating, and nurturing environment where children explore, learn, and grow at their own pace. We lay a strong foundation for early childhood success.
        </p>

        {/* Black CTA Pill Trigger with Premium Radial Ripple Hover & Idle Shimmer */}
        <Link 
          href="#admission" 
          className="relative inline-flex items-center justify-center h-[54px] px-10 rounded-full overflow-hidden font-semibold tracking-wide shadow-lg group transition-all duration-500 hover:scale-[1.04] active:scale-95 z-20 bg-black text-white hover:text-black hover:shadow-[0_12px_30px_rgba(132,251,65,0.25)] border border-white/10"
        >
          {/* Button Text */}
          <span className="relative z-10 transition-colors duration-300">
            Book Your Free Trial
          </span>

          {/* Idle Shimmer sheen sweep */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

          {/* Hover Radial Ripple Reveal */}
          <span className="absolute w-[280px] h-[280px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
        </Link>
      </div>

      {/* GSAP Scale-to-Fullscreen Pinning Trigger Wrapper */}
      <div ref={containerRef} className="w-full flex justify-center items-center relative z-20 mt-16">
        {/* Hero Floating Media Viewport Container with GSAP Slide-In Ref */}
        <div ref={mediaContainerRef} className="relative w-full max-w-[500px] px-4">
          
          {/* Stunning Wavy Horizontal Yellow Ribbon - Mathematically identical curve & exact proportions matching reference */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] min-w-[1600px] aspect-[1800/300] overflow-visible -z-20 pointer-events-none select-none flex items-center justify-center">
            
            {/* Custom Keyframes for Draw-In Entry, Smooth Floating, and Text Fade */}
            <style>{`
              @keyframes drawWavePath {
                0% {
                  stroke-dashoffset: 3000;
                }
                100% {
                  stroke-dashoffset: 0;
                }
              }
              @keyframes fadeInText {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes floatWave {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
              .animate-draw-wave {
                stroke-dasharray: 3000;
                stroke-dashoffset: 3000;
                animation: drawWavePath 4.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
              }
              .animate-fade-in-text {
                animation: fadeInText 0.8s ease-out 2.8s forwards;
              }
              .animate-float-wave {
                animation: floatWave 7.5s ease-in-out infinite;
              }
            `}</style>

            <svg 
              viewBox="0 0 1800 300" 
              className="w-full h-full overflow-visible animate-float-wave"
              textRendering="geometricPrecision"
              shapeRendering="geometricPrecision"
            >
              <defs>
                {/* Wildly organic, non-symmetric, hand-drawn style ascending ribbon path */}
                <path 
                  id="ribbonWavePath" 
                  d="M -100,230 C 0,230 100,140 200,140 C 320,140 360,225 480,225 C 580,225 600,105 680,105 C 780,105 820,215 930,215 C 1040,215 1090,70 1180,70 C 1260,70 1300,165 1380,165 C 1480,165 1530,50 1680,50 C 1830,50 1850,120 1900,120" 
                  fill="none"
                />
              </defs>
              
              {/* Solid Vibrant Green Ribbon - Fluidly draws itself ONLY once user initiates scrolling! */}
              <use 
                href="#ribbonWavePath" 
                stroke="#84FB41" 
                strokeWidth="50" 
                strokeLinecap="round" 
                fill="none"
                className={hasScrolled ? "opacity-100 animate-draw-wave" : "opacity-0"}
              />
              
              {/* Kinetic Typography Marquee - Crawls infinitely and fades in ONLY once user initiates scrolling! */}
              <text className={hasScrolled ? "fill-black font-sans text-[14px] font-bold tracking-[0.04em] opacity-0 animate-fade-in-text" : "opacity-0"}>
                <textPath href="#ribbonWavePath" startOffset="0%" dy="5">
                  KIDZSTAR PRE PRIMARY SCHOOL - PLAY & LEARN - GROW & SHINE - CREATIVE PLAY - KIDZSTAR PRE PRIMARY SCHOOL - PLAY & LEARN - GROW & SHINE - CREATIVE PLAY - KIDZSTAR PRE PRIMARY SCHOOL - PLAY & LEARN - GROW & SHINE - CREATIVE PLAY
                  <animate 
                    attributeName="startOffset" 
                    from="0%" 
                    to="-50%" 
                    dur="65s" 
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </textPath>
              </text>
            </svg>
          </div>

          {/* Exact Pure Black Stacking Offset Card - Rotated -1.8deg to peek perfectly at Top-Left & Bottom-Right */}
          <div className="absolute inset-0 bg-black rounded-[40px] translate-y-3 translate-x-3 -rotate-[1.8deg] z-0 shadow-lg"></div>
          
          {/* Foreground Image Card - Aspect changed to exact squarish aspect-[1.12/1] with heavy corner rounding */}
          <div ref={cardRef} className="relative bg-white rounded-[38px] overflow-hidden shadow-2xl aspect-[1.12/1] z-10 will-change-transform origin-center">
            {/* Premium Ambient Background Video - Loops silently in the background */}
            <video 
              src="/homevideo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Cinematic Fullscreen Slide-In Text Overlay - Preschool Theme */}
          <div ref={overlayTextRef} className="fixed inset-x-0 bottom-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30 opacity-0 select-none">
            {/* Clean, fine subheader matching global style */}
            <span className="font-sans uppercase tracking-[0.22em] text-[0.7rem] sm:text-[0.8rem] font-semibold text-white/75 mb-4 tracking-wider drop-shadow-sm">
              Where Little Stars Shine
            </span>
            {/* Bold, clean headline matching the exact global page header style */}
            <h2 className="text-white font-sans text-[2.4rem] sm:text-[3.4rem] md:text-[4.2rem] font-semibold tracking-tight leading-[1.1] max-w-3xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
              Play, explore,<br />grow & shine
            </h2>
          </div>

        </div>
      </div>

    </section>
  );
}
