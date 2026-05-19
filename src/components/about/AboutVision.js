"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutVision() {
  const containerRef = useRef(null);
  
  const text = "At Kidzstar Pre-Primary School, we believe every child is born with limitless potential. We create joyful learning experiences that spark curiosity and imagination. Our nurturing environment builds confidence, independence, and strong values. Through play, exploration, and guidance, children grow academically and emotionally. We lay the foundation for lifelong learning and future success";
  
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".vision-word", {
        color: "#000000",
        stagger: 0.2, 
        ease: "none", 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.5, 
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-6 max-w-[1000px] mx-auto w-full flex flex-col items-center justify-center text-center z-10 relative">
      <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 block">
        OUR VISION
      </span>
      
      <h2 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[2.8rem] font-medium leading-[1.25] tracking-[-0.03em] max-w-[900px] mx-auto text-center">
        {words.map((word, i) => (
          <span 
            key={i} 
            className="vision-word text-[#CDCDCD] will-change-[color]"
          >
            {word}{" "}
          </span>
        ))}
      </h2>
    </section>
  );
}
