"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useAdmissionModal } from "../context/AdmissionModalContext";
import gsap from "gsap";

export default function AdmissionModal() {
  const { isOpen, closeModal } = useAdmissionModal();
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

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
    mockMode: false,
  });

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      // Escape key listener
      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleKeyDown);

      // GSAP entry animation
      if (backdropRef.current && modalRef.current) {
        gsap.fromTo(backdropRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(modalRef.current, 
          { scale: 0.9, y: 30, opacity: 0 }, 
          { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.1)", delay: 0.05 }
        );
      }

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null, mockMode: false });

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setStatus({
        submitting: false,
        success: true,
        error: null,
        mockMode: data.mode === "mock",
      });
      setFormData({
        parentName: "",
        childName: "",
        childAge: "",
        email: "",
        phone: "",
        program: "preschool",
        notes: "",
      });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message,
        mockMode: false,
      });
    }
  };


  const handleClose = () => {
    // GSAP exit animation before closing
    if (backdropRef.current && modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.9,
        y: 20,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: closeModal,
      });
    } else {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-[950px] bg-white rounded-[32px] md:rounded-[40px] grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] overflow-hidden border-[3px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Premium floating layout */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 md:right-6 md:top-6 z-50 flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-white hover:bg-[#84FB41] text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Hero Content Sub-card */}
        <div className="bg-[#0504DC] text-white p-8 md:p-12 flex flex-col justify-center relative min-h-[250px] md:min-h-auto">
          <span className="inline-block bg-[#84FB41] text-black px-4 py-1.5 rounded-full text-[0.7rem] tracking-[0.15em] font-bold uppercase mb-4 md:mb-6 self-start shadow-[3px_3px_0px_rgba(0,0,0,1)] border-2 border-black">
            Apply Now
          </span>
          <h2 className="text-3xl md:text-4xl leading-[1.1] mb-4 md:mb-6 font-bold font-sans tracking-tight">
            Begin the Stellar Journey!
          </h2>
          <p className="font-sans text-white/90 text-sm md:text-base leading-relaxed mb-6">
            Fill out our quick enquiry form and our administrative advisor will get in touch with your family 
            within 24 hours to schedule a campus tour.
          </p>
          
          {status.success && (
            <div className="flex gap-3 p-4 rounded-xl mt-2 bg-emerald-500/20 border border-emerald-500/30">
              <CheckCircle2 size={24} className="flex-shrink-0 text-emerald-400" />
              <div>
                <strong className="block text-base mb-0.5 font-sans">Message Sent!</strong>
                <p className="text-xs opacity-90 font-sans">
                  Thank you! We will get in touch with you shortly.
                </p>
              </div>
            </div>
          )}

          {status.error && (
            <div className="flex gap-3 p-4 rounded-xl mt-2 bg-rose-500/20 border border-rose-500/30">
              <AlertCircle size={24} className="flex-shrink-0 text-rose-400" />
              <div>
                <strong className="block text-base mb-0.5 font-sans">Submission Problem</strong>
                <p className="text-xs opacity-90 font-sans">{status.error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Form Inputs Card */}
        <form className="p-8 md:p-10 flex flex-col gap-5 bg-[#FFFDF9]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-parentName" className="font-bold text-[0.85rem] text-slate-700 font-sans">
                Parent Full Name
              </label>
              <input
                type="text"
                id="modal-parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Jessica Miller"
                className="font-sans p-3 md:p-3.5 rounded-xl border-[2.5px] border-black/10 bg-white text-black font-semibold text-sm md:text-base outline-none transition-all focus:border-black focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-childName" className="font-bold text-[0.85rem] text-slate-700 font-sans">
                Child Full Name
              </label>
              <input
                type="text"
                id="modal-childName"
                name="childName"
                required
                value={formData.childName}
                onChange={handleChange}
                placeholder="Leo Miller"
                className="font-sans p-3 md:p-3.5 rounded-xl border-[2.5px] border-black/10 bg-white text-black font-semibold text-sm md:text-base outline-none transition-all focus:border-black focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-childAge" className="font-bold text-[0.85rem] text-slate-700 font-sans">
                Child Age
              </label>
              <input
                type="number"
                id="modal-childAge"
                name="childAge"
                min="1"
                max="8"
                required
                value={formData.childAge}
                onChange={handleChange}
                placeholder="4"
                className="font-sans p-3 md:p-3.5 rounded-xl border-[2.5px] border-black/10 bg-white text-black font-semibold text-sm md:text-base outline-none transition-all focus:border-black focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-program" className="font-bold text-[0.85rem] text-slate-700 font-sans">
                Preferred Track
              </label>
              <select
                id="modal-program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="font-sans p-3 md:p-3.5 rounded-xl border-[2.5px] border-black/10 bg-white text-black font-semibold text-sm md:text-base outline-none transition-all focus:border-black focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 appearance-none cursor-pointer"
              >
                <option value="toddler">Toddler Explorers (1-2 yrs)</option>
                <option value="preschool">Preschool Stars (3-4 yrs)</option>
                <option value="kindergarten">Kindergarten Ready (5-6 yrs)</option>
                <option value="daycare">Afterschool Care (all ages)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-email" className="font-bold text-[0.85rem] text-slate-700 font-sans">
                Email Address
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="parent@example.com"
                className="font-sans p-3 md:p-3.5 rounded-xl border-[2.5px] border-black/10 bg-white text-black font-semibold text-sm md:text-base outline-none transition-all focus:border-black focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-phone" className="font-bold text-[0.85rem] text-slate-700 font-sans">
                Contact Number
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="font-sans p-3 md:p-3.5 rounded-xl border-[2.5px] border-black/10 bg-white text-black font-semibold text-sm md:text-base outline-none transition-all focus:border-black focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-notes" className="font-bold text-[0.85rem] text-slate-700 font-sans">
              Special Needs / Questions (Optional)
            </label>
            <textarea
              id="modal-notes"
              name="notes"
              rows="2"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us a little about your child..."
              className="font-sans p-3 md:p-3.5 rounded-xl border-[2.5px] border-black/10 bg-white text-black font-semibold text-sm md:text-base outline-none transition-all focus:border-black focus:shadow-[4px_4px_0px_rgba(132,251,65,1)] hover:border-black/30 placeholder:text-slate-400 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status.submitting}
            className="relative overflow-hidden flex items-center justify-center gap-2.5 bg-black text-white hover:text-black font-bold text-[1rem] tracking-[0.2px] h-[54px] w-fit px-10 self-center rounded-full mt-2 shadow-md group transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed border border-white/10"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5 transition-colors duration-300">
              {status.submitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Get a Call Back</span>
                </>
              )}
            </span>

            {/* Idle Shimmer */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:opacity-0 transition-opacity duration-300 animate-shimmer pointer-events-none -z-10"></span>

            {/* Hover Radial Ripple */}
            <span className="absolute w-[400px] h-[400px] bg-[#84FB41] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10 pointer-events-none"></span>
          </button>
        </form>
      </div>
    </div>
  );
}
