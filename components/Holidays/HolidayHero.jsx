"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function HeroSlider({
  slides = [],
  badgeText = "Premium Holiday Packages",
  mainTitle,
  description,
  formComponent,
  autoPlayInterval = 5000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  if (!slides || slides.length === 0) return null;
  const current = slides[currentSlide];

  // Scroll to packages section
  const scrollToPackages = () => {
    const packagesSection = document.getElementById("packages");
    if (packagesSection) {
      packagesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback: scroll down by one full viewport
      window.scrollTo({
        top: window.innerHeight - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      
      {/* ================= BACKGROUND SLIDER ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={current.src}
            alt={current.alt || "Slider Image"}
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* ================= OVERLAYS ================= */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20" />

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="relative z-20 container mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left mt-28 sm:mt-12 lg:mt-0">
          {/* BADGE */}
        <div className="inline-flex max-w-full items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-5 sm:mb-6">
            <MapPin size={16} className="text-[#F6931F]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest text-white">
              {badgeText}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-black leading-tight uppercase tracking-tight text-white flex flex-wrap items-center justify-center lg:justify-start gap-x-3">
            {mainTitle || (
              <>
                Explore
                <span className="inline-block text-center lg:text-left overflow-hidden relative whitespace-normal">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSlide}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent pr-2 inline-block whitespace-normal"
                    >
                      {slides[currentSlide]?.title || "Dream Holidays"}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </>
            )}
          </h1>

          {/* SUBTITLE / DESCRIPTION */}
          {description && (
            <p className="mt-5 text-white/80 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>
          )}

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={scrollToPackages}
              className="hidden sm:block px-6 py-3 rounded-full bg-[#F6931F] hover:bg-orange-500 transition font-bold text-white active:scale-95"
            >
              Explore Packages
            </button>
            <Link href="/cities-hotels">
              <button className="hidden sm:block w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition font-medium text-white active:scale-95">
                View Destinations
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT CONTENT (FORM) */}
        {formComponent && (
          <div className="w-full flex justify-center lg:justify-end lg:pt-22 -mt-12 lg:-mt-0 md:pt-12">
            {formComponent}
          </div>
        )}
      </div>
    </section>
  );
}