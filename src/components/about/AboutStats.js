"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutStats() {
  const sectionRef = useRef(null);

  const stats = [
    {
      end: 10,
      suffix: "+",
      label: "YEARS OF EXCELLENCE",
      description: "Providing structured, joyful, and creative early learning experiences."
    },
    {
      end: 1500,
      suffix: "+",
      label: "HAPPY GRADUATES",
      description: "Empowering little stars to step confidently into their primary school years."
    },
    {
      end: 15,
      suffix: ":1",
      label: "LEARNING RATIO",
      description: "Ensuring highly personalized care and attention for every child's development."
    },
    {
      end: 100,
      suffix: "%",
      label: "SAFE & SECURE",
      description: "A nurturing environment with childproof spaces and supervision."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const counters = sectionRef.current.querySelectorAll('.stat-counter');
      
      counters.forEach((counter) => {
        const endValue = parseInt(counter.getAttribute('data-end'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: endValue,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            const formattedVal = Math.floor(obj.val).toLocaleString();
            counter.innerText = `${formattedVal}${suffix}`;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 max-w-[1400px] mx-auto w-full z-10 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white rounded-2xl p-8 flex flex-col justify-between min-h-[300px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow duration-300"
          >
            <div>
              <div className="text-[3.5rem] font-semibold text-black tracking-tight leading-none mb-2">
                <span 
                  className="stat-counter" 
                  data-end={stat.end} 
                  data-suffix={stat.suffix}
                >
                  {stat.end.toLocaleString()}{stat.suffix}
                </span>
              </div>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-gray-500 mb-6">
                {stat.label}
              </div>
            </div>
            
            <p className="text-[0.95rem] text-gray-600 leading-relaxed font-normal">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
