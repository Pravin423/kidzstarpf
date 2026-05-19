"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_DATA = [
  {
    quote: "KidzStar has been a second home for our daughter. The teachers are incredibly nurturing, and the play-based learning style helped her build immense confidence.",
    clientName: "Sarah Jenkins",
    clientRole: "Mother of Emily (Playgroup)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "We love the focus on safety, hygiene, and creative development. Our son runs to school every morning and comes home bubbling with excitement about his new friends.",
    clientName: "Michael Chen",
    clientRole: "Father of Leo (Nursery)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "The language and phonics activities did wonders for our daughter's reading readiness. The storytelling circle is her absolute favorite part of the day!",
    clientName: "Rayna Madsen",
    clientRole: "Mother of Sofia (Junior KG)",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Finding a preschool that truly balances physical activity with emotional development is rare. The team here is incredibly warm and highly professional.",
    clientName: "Wilson Arcand",
    clientRole: "Father of Lucas (Senior KG)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "The interactive play areas are clean, colorful, and extremely safe. We appreciate the daily updates and close collaboration between teachers and parents.",
    clientName: "David Vance",
    clientRole: "Father of Chloe (Toddler Care)",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "An outstanding preschool that fosters independent thinking and social skills. Our child has developed beautiful habits and a genuine love for learning.",
    clientName: "Melissa Duarte",
    clientRole: "Mother of Mateo (Nursery)",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

// Reusable 5-Star Rating component
const StarRating = () => (
  <div className="flex gap-1 mb-5 text-amber-500">
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i}
        viewBox="0 0 24 24" 
        className="w-4 h-4 fill-current"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Header Reveal Animation
    const headerTween = gsap.fromTo(el.querySelectorAll(".testimonial-header"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el.querySelector(".header-trigger"),
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Cards Staggered Slide-up
    const cardsTween = gsap.fromTo(el.querySelectorAll(".testimonial-card"),
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el.querySelector(".cards-trigger"),
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (headerTween.scrollTrigger) headerTween.scrollTrigger.kill();
      if (cardsTween.scrollTrigger) cardsTween.scrollTrigger.kill();
      headerTween.kill();
      cardsTween.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-28 bg-[#FFFDF9] overflow-hidden" id="testimonials">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Centered Section Header */}
        <div className="header-trigger text-center mb-16 flex flex-col items-center">
          <span className="testimonial-header font-sans uppercase tracking-[0.25em] text-[0.8rem] font-bold text-slate-500 mb-4 block">
            PARENT REVIEWS
          </span>
          <h2 className="testimonial-header text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-neutral-900 max-w-3xl font-sans">
            Love & Trust From KidzStar Families
          </h2>
        </div>

        {/* Cards Grid - 3-columns on desktop, 2-columns on tablet, 1-column on mobile */}
        <div className="cards-trigger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {TESTIMONIALS_DATA.map((t, index) => (
            <div 
              key={index}
              className="testimonial-card group bg-white rounded-[32px] border border-neutral-100/60 hover:border-neutral-200 p-8 sm:p-10 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.005)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div>
                {/* 5 Yellow Stars Row */}
                <StarRating />
                
                {/* Testimonial Quote */}
                <p className="text-[0.98rem] text-neutral-500 leading-relaxed font-sans font-medium mb-8">
                  “{t.quote}”
                </p>
              </div>

              {/* Bottom Row: Client Info Profile Panel (Weightless, No Divider Line) */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/5 flex-shrink-0">
                  <Image 
                    src={t.avatar}
                    alt={t.clientName}
                    fill
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[1.05rem] text-neutral-900 leading-snug font-sans">
                    {t.clientName}
                  </h4>
                  <span className="text-[0.85rem] text-neutral-400 font-sans font-medium">
                    {t.clientRole}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
