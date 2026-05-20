"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Key } from "lucide-react";
import { useAdmissionModal } from "../context/AdmissionModalContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }
  const navRef = useRef(null);
  const { openModal } = useAdmissionModal();

  useEffect(() => {
    // Initial navbar animation
    const ctx = gsap.context(() => {
      // Navbar drops down
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Stagger animate nav items
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "About us", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Gallery", path: "/gallery" },
    { name: "Teachers", path: "/teacher" },
    { name: "Contact us", path: "/contact" },
  ];

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 border-b ${
      scrolled 
        ? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-[#e8e8e8]" 
        : "bg-[rgba(255,253,249,0.9)] border-[#e8e8e8]"
    }`}>
      {/* Reference Styled Pale Cyan Top Promotional Banner */}
      {showBanner && (
        <div className="relative w-full bg-[#84FB41] text-black text-center py-2 text-[0.75rem] sm:text-[0.8rem] font-bold tracking-wide border-b border-black/[0.04] px-4 leading-tight flex items-center justify-center">
          <span>Book Your Free Trial Class Now!</span>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity flex items-center justify-center p-1"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className={`flex items-center justify-between w-full max-w-[1280px] mx-auto px-6 relative transition-all duration-300 ${
        scrolled ? "py-2.5" : "py-[18px]"
      }`}>
        {/* Logo Group */}
        <div className="nav-item relative flex items-center">
          <Link href="/" className="flex items-center gap-3 text-black hover:opacity-90 transition-opacity">
            <div className="relative w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center">
              <Image 
                src="/logo.png"
                alt="KidzStar Logo"
                fill
                className="object-contain"
                sizes="52px"
                priority
              />
            </div>
            <div className="flex flex-col items-start justify-center pr-2">
              <span className="font-sans text-[1.65rem] font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
                KidzStar
              </span>
              <span className="font-sans text-[0.62rem] font-bold tracking-[0.25em] text-[#0504DC] uppercase leading-none mt-1">
                Pre-Primary School
              </span>
            </div>
          </Link>
          
          {/* Hidden Admin Login Link */}
          <Link 
            href="/admin" 
            className="absolute -right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0504DC] opacity-0 hover:opacity-100 focus:opacity-100 transition-all duration-300 p-1.5 rounded-full hover:bg-neutral-100 focus:bg-neutral-100 outline-none cursor-pointer"
            title="Admin Login"
            aria-label="Admin Login"
          >
            <Key size={13} />
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <ul className="hidden lg:flex items-center gap-[30px] absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link 
                href={link.path} 
                className="font-sans text-[1.1rem] font-medium text-[#111111] flex items-center gap-[5px] py-2 hover:opacity-70 transition-opacity group"
              >
                <span>{link.name}</span>
                <ChevronDown size={14} className="text-[#555555] mt-[2px] transition-transform group-hover:translate-y-[1px]" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Pill Button with Premium Radial Ripple Hover & Idle Shimmer */}
        <div className="nav-item hidden lg:block">
          <button 
            onClick={openModal} 
            className="relative inline-flex items-center justify-center h-[46px] px-8 rounded-full overflow-hidden font-sans text-[0.95rem] font-bold tracking-[0.2px] shadow-sm group transition-all duration-500 hover:scale-[1.04] active:scale-95 bg-black text-white hover:text-black hover:shadow-[0_8px_20px_rgba(132,251,65,0.2)] border border-white/10 cursor-pointer"
          >
            {/* Button Text */}
            <span className="relative z-10 transition-colors duration-300">
              Admission
            </span>

            {/* Idle Shimmer sheen sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

            {/* Hover Radial Ripple Reveal */}
            <span className="absolute w-[200px] h-[200px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="nav-item lg:hidden flex items-center justify-center text-black z-[1010]" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`fixed top-0 w-[80%] max-w-[300px] h-screen bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] px-6 pt-[100px] pb-10 flex flex-col z-[1005] transition-all duration-300 ${
        isOpen ? "right-0" : "-right-full"
      }`}>
        <ul className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.path} 
                className="flex items-center justify-between font-sans text-[1.2rem] text-black py-3 border-b border-[#eeeeee] hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.name}</span>
                <ChevronDown size={16} />
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <button 
              onClick={() => {
                setIsOpen(false);
                openModal();
              }} 
              className="relative flex items-center justify-center h-[50px] w-full rounded-full overflow-hidden font-sans text-[1.1rem] font-bold tracking-[0.2px] shadow-sm group transition-all duration-500 hover:scale-[1.04] active:scale-95 bg-black text-white hover:text-black hover:shadow-[0_8px_20px_rgba(132,251,65,0.2)] border border-white/10 text-center cursor-pointer"
            >
              {/* Button Text */}
              <span className="relative z-10 transition-colors duration-300">
                Admission
              </span>

              {/* Idle Shimmer sheen sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

              {/* Hover Radial Ripple Reveal */}
              <span className="absolute w-[240px] h-[240px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
