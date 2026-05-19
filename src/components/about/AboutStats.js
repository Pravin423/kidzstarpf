"use client";

import React from 'react';

export default function AboutStats() {
  const stats = [
    {
      number: "15+",
      label: "YEARS OF EXPERTISE",
      description: "Decades of expertise delivering measurable business impact."
    },
    {
      number: "500+",
      label: "PROJECTS COMPLETED",
      description: "A proven track record of completed projects across industries."
    },
    {
      number: "20+",
      label: "INDUSTRIES SERVED",
      description: "Serving a wide range of industries with proven expertise."
    },
    {
      number: "95%",
      label: "CLIENT SATISFACTION",
      description: "Focused on results that strengthen relationships and client satisfaction."
    }
  ];

  return (
    <section className="py-20 px-6 max-w-[1400px] mx-auto w-full z-10 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white rounded-2xl p-8 flex flex-col justify-between min-h-[300px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow duration-300"
          >
            <div>
              <div className="text-[3.5rem] font-medium text-black tracking-tight leading-none mb-2">
                {stat.number}
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
