"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AdmissionModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function AdmissionModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Prevent browser from trying to restore scroll position
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Immediately scroll to top
      window.scrollTo(0, 0);

      // Handle scroll to top on next ticks to ensure page hydration doesn't reset it
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AdmissionModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </AdmissionModalContext.Provider>
  );
}

export function useAdmissionModal() {
  const context = useContext(AdmissionModalContext);
  if (!context) {
    throw new Error("useAdmissionModal must be used within an AdmissionModalProvider");
  }
  return context;
}
