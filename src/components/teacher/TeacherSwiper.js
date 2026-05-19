"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=800",
    alt: "Teacher looking down",
    title: "EARLY LEARNING",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=800",
    alt: "Teacher smiling",
    title: "CREATIVE PLAY",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800",
    alt: "Teacher writing",
    title: "ACTIVE GROWTH",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000",
    alt: "Teacher leadership",
    title: "STRONGER MENTORSHIP",
  }
];

export default function TeacherSwiper() {
  const [queue, setQueue] = useState([
    { ...slides[0], internalId: 1, slot: 0 },
    { ...slides[1], internalId: 2, slot: 1 },
    { ...slides[2], internalId: 3, slot: 2 },
    { ...slides[3], internalId: 4, slot: 3 },
  ]);
  
  const idCounter = useRef(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prev) => {
        // Find the item currently at slot 0 (or -1 if it just spawned)
        const firstItem = prev.find(i => i.slot === 0) || prev.find(i => i.slot === -1);
        
        // Find its index in the original slides array
        const currentSlideIdx = slides.findIndex(s => s.id === firstItem?.id);
        
        // The new item entering from the left should be the one BEFORE it
        const prevSlideIdx = currentSlideIdx <= 0 ? slides.length - 1 : currentSlideIdx - 1;
        const nextSlide = slides[prevSlideIdx];

        // Move everyone to the right. Remove items that have finished exiting (slot >= 4).
        const nextQueue = prev
          .filter(i => i.slot < 4)
          .map(i => ({ ...i, slot: i.slot + 1 }));

        // Add the new item off-screen to the left
        nextQueue.push({
          ...nextSlide,
          internalId: idCounter.current++,
          slot: -1, 
        });

        return nextQueue;
      });
    }, 4000); // Swipe every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Use a second effect to immediately move slot -1 to slot 0 so it animates in from the left
  useEffect(() => {
    if (queue.some(i => i.slot === -1)) {
      const timer = setTimeout(() => {
        setQueue(prev => prev.map(i => i.slot === -1 ? { ...i, slot: 0 } : i));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [queue]);

  const getSlotClasses = (slot) => {
    switch (slot) {
      case -1: // Entering from left
        return "left-[-30%] md:left-[-20%] w-[30%] md:w-[18%] h-[35%] md:h-[35%] z-0 opacity-0 scale-95";
      case 0:
        return "left-0 w-[30%] md:w-[18%] h-[35%] md:h-[35%] z-10 opacity-100 shadow-sm scale-100";
      case 1:
        return "left-[20%] md:left-[18%] w-[35%] md:w-[22%] h-[50%] md:h-[50%] z-20 opacity-100 shadow-[-15px_0_30px_-5px_rgba(0,0,0,0.15)] scale-100";
      case 2:
        return "left-[45%] md:left-[38%] w-[40%] md:w-[28%] h-[65%] md:h-[65%] z-30 opacity-100 shadow-[-20px_0_30px_-5px_rgba(0,0,0,0.2)] scale-100";
      case 3:
        return "left-[60%] md:left-[65%] w-[45%] md:w-[35%] h-[85%] md:h-[85%] z-40 opacity-100 shadow-[-25px_0_40px_-10px_rgba(0,0,0,0.25)] scale-100";
      case 4: // Exiting to right
        return "left-[100%] md:left-[110%] w-[45%] md:w-[35%] h-[85%] md:h-[85%] z-50 opacity-0 scale-105";
      default:
        return "left-[-100%] w-0 h-0 z-0 opacity-0 hidden";
    }
  };

  return (
    <div className="w-full mt-2 md:mt-4">
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden group">
        {queue.map((item) => (
          <div
            key={item.internalId}
            className={`absolute top-1/2 -translate-y-1/2 rounded-[1.2rem] md:rounded-[2rem] overflow-hidden bg-neutral-200 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.35,1)] ${getSlotClasses(
              item.slot
            )}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={item.slot === 3}
            />
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-1000 ${
                item.slot === 3 ? "opacity-80" : "opacity-0"
              } z-40`}
            ></div>
            
            {/* Overlay Text */}
            <div
              className={`absolute bottom-6 left-6 md:bottom-12 md:left-10 z-50 transition-opacity duration-[800ms] delay-[400ms] ${
                item.slot === 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-white text-[0.65rem] md:text-xs font-bold tracking-[0.2em] uppercase drop-shadow-md whitespace-nowrap">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
