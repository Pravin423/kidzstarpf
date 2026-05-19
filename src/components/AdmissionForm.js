"use client";

import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AdmissionForm() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (el) {
      const leftElements = el.querySelector(".form-left").children;
      const rightElements = el.querySelector(".form-right");

      // Animate left card content staggered
      gsap.fromTo(leftElements,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate right form container sliding in slightly
      gsap.fromTo(rightElements,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    email: "",
    phone: "",
    program: "preschool",
    notes: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    mockMode: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null, mockMode: true });

    setTimeout(() => {
      setStatus({
        submitting: false,
        success: true,
        error: null,
        mockMode: true
      });
      // Reset form
      setFormData({
        parentName: "",
        childName: "",
        childAge: "",
        email: "",
        phone: "",
        program: "preschool",
        notes: "",
      });
    }, 800);
  };

  return (
    <div ref={containerRef} className="py-[120px] px-6 bg-transparent" id="admission">
      <div className="max-w-[1050px] mx-auto bg-white rounded-[40px] grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] overflow-hidden border-[3px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)]">
        {/* Left Hero Content Sub-card */}
        <div className="form-left bg-[#0504DC] text-white p-10 md:p-14 flex flex-col justify-center relative">
          <span className="inline-block bg-[#84FB41] text-black px-5 py-2 rounded-full text-[0.75rem] tracking-[0.15em] font-bold uppercase mb-6 self-start shadow-[3px_3px_0px_rgba(0,0,0,1)] border-2 border-black">
            Apply Now
          </span>
          <h2 className="text-4xl md:text-5xl leading-[1.1] mb-6 font-bold font-sans tracking-tight">
            Begin the Stellar Journey!
          </h2>
          <p className="font-sans text-white/90 leading-relaxed mb-7">
            Fill out our quick enquiry form and our administrative advisor will get in touch with your family 
            within 24 hours to schedule a campus tour.
          </p>
          
          {status.success && (
            <div className="flex gap-3 p-4 rounded-xl mt-2.5 bg-emerald-500/20 border border-emerald-500/30">
              <CheckCircle2 size={24} className="flex-shrink-0" />
              <div>
                <strong className="block text-lg mb-0.5 font-sans">Message Sent!</strong>
                <p className="text-sm opacity-90 font-sans">
                  Thank you! We will get in touch with you shortly.
                </p>
              </div>
            </div>
          )}

          {status.error && (
            <div className="flex gap-3 p-4 rounded-xl mt-2.5 bg-rose-500/20 border border-rose-500/30">
              <AlertCircle size={24} className="flex-shrink-0" />
              <div>
                <strong className="block text-lg mb-0.5 font-sans">Submission Problem</strong>
                <p className="text-sm opacity-90 font-sans">{status.error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Form Inputs Card */}
        <form className="form-right p-10 md:p-12 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="parentName" className="font-semibold text-[0.95rem] text-slate-700 font-sans">
                Parent Full Name
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Jessica Miller"
                className="font-sans p-4 rounded-xl border-[2.5px] border-black/10 bg-[#FFFDF9] text-black font-medium outline-none transition-all focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="childName" className="font-semibold text-[0.95rem] text-slate-700 font-sans">
                Child Full Name
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                required
                value={formData.childName}
                onChange={handleChange}
                placeholder="Leo Miller"
                className="font-sans p-4 rounded-xl border-[2.5px] border-black/10 bg-[#FFFDF9] text-black font-medium outline-none transition-all focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="childAge" className="font-semibold text-[0.95rem] text-slate-700 font-sans">
                Child Age
              </label>
              <input
                type="number"
                id="childAge"
                name="childAge"
                min="1"
                max="8"
                required
                value={formData.childAge}
                onChange={handleChange}
                placeholder="4"
                className="font-sans p-4 rounded-xl border-[2.5px] border-black/10 bg-[#FFFDF9] text-black font-medium outline-none transition-all focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="program" className="font-semibold text-[0.95rem] text-slate-700 font-sans">
                Preferred Track
              </label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="font-sans p-4 rounded-xl border-[2.5px] border-black/10 bg-[#FFFDF9] text-black font-medium outline-none transition-all focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 appearance-none cursor-pointer"
              >
                <option value="toddler">Toddler Explorers (1-2 yrs)</option>
                <option value="preschool">Preschool Stars (3-4 yrs)</option>
                <option value="kindergarten">Kindergarten Ready (5-6 yrs)</option>
                <option value="daycare">Afterschool Care (all ages)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-[0.95rem] text-slate-700 font-sans">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="parent@example.com"
                className="font-sans p-4 rounded-xl border-[2.5px] border-black/10 bg-[#FFFDF9] text-black font-medium outline-none transition-all focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-semibold text-[0.95rem] text-slate-700 font-sans">
                Contact Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="font-sans p-4 rounded-xl border-[2.5px] border-black/10 bg-[#FFFDF9] text-black font-medium outline-none transition-all focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="font-semibold text-[0.95rem] text-slate-700 font-sans">
              Special Needs / Questions (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us a little about your child..."
              className="font-sans p-4 rounded-xl border-[2.5px] border-black/10 bg-[#FFFDF9] text-black font-medium outline-none transition-all focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status.submitting}
            className="relative overflow-hidden flex items-center justify-center gap-2.5 bg-black text-white hover:text-black font-bold text-[1.1rem] tracking-[0.2px] h-[64px] w-fit px-12 self-center rounded-full mt-4 shadow-xl group transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed border border-white/10"
          >
            {/* Button Text & Icon */}
            <span className="relative z-10 flex items-center justify-center gap-2.5 transition-colors duration-300">
              {status.submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Get a Call Back</span>
                </>
              )}
            </span>

            {/* Idle Shimmer sheen sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

            {/* Hover Radial Ripple Reveal */}
            <span className="absolute w-[450px] h-[450px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
          </button>
        </form>
      </div>
    </div>
  );
}
