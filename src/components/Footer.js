"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdmissionModal } from "../context/AdmissionModalContext";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);
  const { openModal } = useAdmissionModal();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // GSAP ScrollTrigger timeline to reveal all footer text segments
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });

    // 1. Staggered reveal for columns, headers, logo, and links
    tl.fromTo(el.querySelectorAll(".footer-fade-up"),
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out"
      }
    );

    // 2. Separate reveal for the giant cropped "CONSULTING" background text
    tl.fromTo(el.querySelector(".footer-giant-text"),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.15,
        ease: "power4.out"
      },
      "-=0.7" // Injected mid-way for a majestic overlap effect
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <footer 
      ref={containerRef} 
      className="bg-[#F2F0E4] border-t border-black/10 pt-24 pb-1 overflow-hidden" 
      id="contact"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Core Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_0.8fr_0.8fr] gap-12 lg:gap-8 pb-16 border-b border-black/10">
          
          {/* Column 1: Brand Pitch Info */}
          <div className="footer-fade-up flex flex-col items-start pr-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-[48px] h-[48px] flex-shrink-0">
                <Image 
                  src="/logo.png"
                  alt="KidzStar Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="font-sans text-[1.5rem] font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
                  KidzStar
                </span>
                <span className="font-sans text-[0.58rem] font-bold tracking-[0.22em] text-[#0F766E] uppercase leading-none mt-1">
                  Pre-Primary School
                </span>
              </div>
            </div>
            <p className="text-[0.95rem] text-slate-700 leading-relaxed font-sans font-medium mb-8 max-w-[320px]">
              Nurturing young minds through play, exploration, and creative learning. A wonderful place for your child to grow, discover, and shine.
            </p>
            <button 
              onClick={openModal} 
              className="relative inline-flex items-center justify-center h-[50px] px-8 rounded-full overflow-hidden font-sans text-[0.95rem] font-bold tracking-wide shadow-sm group transition-all duration-500 hover:scale-[1.04] active:scale-95 bg-black text-white hover:text-black hover:shadow-[0_8px_20px_rgba(132,251,65,0.2)] border border-white/10 cursor-pointer"
            >
              {/* Button Text */}
              <span className="relative z-10 transition-colors duration-300">
                Get In Touch
              </span>

              {/* Idle Shimmer sheen sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

              {/* Hover Radial Ripple Reveal */}
              <span className="absolute w-[200px] h-[200px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
            </button>
          </div>

          {/* Column 2: Contact & Address */}
          <div className="footer-fade-up lg:border-l lg:border-black/10 lg:pl-10 flex flex-col justify-between gap-6 h-full">
            <div>
              <h4 className="font-bold text-[0.9rem] text-neutral-900 font-sans tracking-wider uppercase mb-3">
                Get In Touch
              </h4>
              <span className="text-[0.98rem] text-slate-600 font-sans font-medium hover:text-black transition-colors duration-200 block mb-1">
                9321002881 / 9323331360
              </span>
              <span className="text-[0.9rem] text-slate-500 font-sans font-medium hover:text-black transition-colors duration-200 block">
                kidzstarpreprimaryschool@gmail.com
              </span>
            </div>
            <div>
              <h4 className="font-bold text-[0.9rem] text-neutral-900 font-sans tracking-wider uppercase mb-3">
                Thane Campuses
              </h4>
              <p className="text-[0.95rem] text-slate-600 leading-relaxed font-sans font-medium whitespace-pre-line">
                {"Sawarkar Nagar & Indira Nagar,\nKoparkhairane, Navi Mumbai"}
              </p>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-fade-up lg:border-l lg:border-black/10 lg:pl-10">
            <h4 className="font-bold text-[1.1rem] text-neutral-900 font-sans tracking-wider uppercase mb-6">
              Quick links
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                Home
              </Link>
              <Link href="/about" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                About Us
              </Link>
              <Link href="/programs" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                Programs
              </Link>
              <Link href="/gallery" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                Gallery
              </Link>
              <Link href="/contact" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Column 4: Utility Pages */}
          <div className="footer-fade-up lg:border-l lg:border-black/10 lg:pl-10">
            <h4 className="font-bold text-[1.1rem] text-neutral-900 font-sans tracking-wider uppercase mb-6">
              Utility pages
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="#" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-[1rem] text-slate-600 hover:text-black font-sans font-medium transition-colors duration-200">
                Thane Centers
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Socials Row */}
        <div className="footer-fade-up py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-sans text-sm font-medium">
          <div>
            © 2026 <span className="text-black font-semibold">KidzStar Preschool</span>. All rights reserved. Designed by : <span className="text-black font-semibold">Pravin</span> ,  <span className="text-black font-semibold">Diksha</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="#" className="hover:text-black transition-colors duration-200">Facebook</Link>
            <span>|</span>
            <Link href="#" className="hover:text-black transition-colors duration-200">Twitter</Link>
            <span>|</span>
            <Link href="#" className="hover:text-black transition-colors duration-200">Instagram</Link>
          </div>
        </div>

        {/* Massive cropped bottom headline */}
        <div className="footer-giant-text select-none text-center pointer-events-none mt-6 -mb-6 sm:-mb-10 lg:-mb-14">
          <h2 className="text-[14vw] font-black tracking-tighter uppercase leading-[0.78] text-black">
            KIDZSTAR
          </h2>
        </div>

      </div>
    </footer>
  );
}
