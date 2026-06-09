"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";

export default function PackageFeatures({
  tagline = "Differentiators",
  title = "Why Choose Travelshook",
  subtitle = "Discover what makes our pilgrimage packages truly exceptional.",
  differentiators = [],
  accentColor = "#F6931F",        // Default orange
  secondaryColor = "#0070A1"       // Default blue
}) {
  const [activeStep, setActiveStep] = useState(0);

  if (differentiators.length === 0) {
    return null; // or show placeholder
  }

  return (
    <section className="relative w-full py-20 bg-slate-100 dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#0070A1]/5 dark:bg-[#F6931F]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-start gap-2 mb-16 text-left max-w-4xl">
          <span 
            className="mb-3 inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em]"
            style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
          >
            {tagline}
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
            {title}
          </h2>
          
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* LEFT: Interactive List */}
          <div className="lg:col-span-7 flex flex-col gap-2 w-full">
            {differentiators.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className={`relative flex flex-col p-6 transition-all duration-300 border-b border-slate-100 dark:border-white/5 cursor-pointer text-left rounded-xl ${
                    isActive 
                      ? "bg-slate-50/70 dark:bg-white/[0.03]" 
                      : "hover:bg-slate-50/40 dark:hover:bg-white/[0.01]"
                  }`}
                >
                  <div 
                    className={`absolute inset-y-0 left-0 w-[4px] rounded-r transition-all duration-300 ${
                      isActive ? "bg-[#F6931F]" : "bg-transparent"
                    }`} 
                  />

                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono font-black shrink-0 ${
                        isActive ? "text-[#F6931F]" : "text-slate-400 dark:text-white/30"
                      }`}>
                        {step.id}
                      </span>
                      <h3 className={`text-base font-black transition-colors duration-300 tracking-tight ${
                        isActive ? "text-[#0070A1] dark:text-[#F6931F]" : "text-slate-800 dark:text-white"
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                    <ChevronRight 
                      size={18} 
                      className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                        isActive ? "rotate-90 text-[#F6931F]" : ""
                      }`} 
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Image Showcase */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={differentiators[activeStep].image}
                  alt={differentiators[activeStep].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3 text-white">
                  <div className="p-2.5 bg-[#F6931F] rounded-xl">
                    <Star size={16} fill="currentColor" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Travelshook</span>
                    <span className="block text-sm font-semibold tracking-tight">Signature Experience</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}