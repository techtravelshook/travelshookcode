"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, CheckCircle2, ChevronRight, Star } from "lucide-react";

const differentiators = [
  { 
    id: "01", 
    title: "Spiritual Guidance & Scholarly Support", 
    desc: "We provide authentic, step-by-step religious framework backing. Handled entirely by qualified scholars who accompany or guide our groups to ensure every ritual is performed perfectly.",
    image: "/imgs/hajj/hajj1.jpg"
  },
  { 
    id: "02", 
    title: "Handpicked Luxury Stays Right Next to Haram", 
    desc: "No long exhausting walks or transit delays. We exclusively partner with premium 5-Star properties situated directly on the frontline courtyards of both holy sanctuaries.",
    image: "/imgs/hajj/hajj2.jpg"
  },
  { 
    id: "03", 
    title: "Complete End-to-End Logistical Security", 
    desc: "From seamless premium flight seat block allocations to VIP private ground transit and fast-track electronic visa issuance. We manage the heavy lifting so you stay focused spiritually.",
    image: "/imgs/hajj/hajj3.jpg"
  },
];

export default function AboutChooseus() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative w-full py-20 bg-slate-100 dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      
      {/* Decorative Branding Elements */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#0070A1]/5 dark:bg-[#F6931F]/5 blur-[120px] pointer-events-none" />

      {/* Main Structural Layout Fluid Wrapper */}
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        
        {/* ================= 1. HEADER SECTION ================= */}
        <div className="flex flex-col items-start gap-2 mb-16 text-left max-w-4xl">
          <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-[#F6931F]">
            Differentiators
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent pr-1 inline-block">
              Travelshook
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
            Discover the core operational milestones that separate our luxury pilgrimage management from conventional travel agencies.
          </p>
        </div>

        {/* ================= 2. NON-CARD INTERACTIVE SPLIT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* LEFT INTERACTIVE ACCOUDION ROW LISTING (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-2 w-full">
            {differentiators.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className={`relative flex flex-col p-6 transition-all duration-300 border-b border-slate-100 dark:border-white/5 cursor-pointer text-left ${
                    isActive 
                      ? "bg-slate-50/50 dark:bg-white/[0.01]" 
                      : "hover:bg-slate-50/30 dark:hover:bg-white/[0.005]"
                  }`}
                >
                  {/* Active Side Theme Border Line Accent */}
                  <div 
                    className={`absolute inset-y-0 left-0 w-[3px] bg-[#F6931F] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`} 
                  />

                  {/* Top Accordion Row Flex */}
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                      {/* Step Number Badge */}
                      <span className={`text-xs font-mono font-black shrink-0 ${
                        isActive ? "text-[#F6931F]" : "text-slate-400 dark:text-white/20"
                      }`}>
                        {step.id}
                      </span>
                      {/* Title */}
                      <h3 className={`text-base font-black transition-colors duration-300 tracking-tight leading-snug ${
                        isActive ? "text-[#0070A1] dark:text-[#F6931F]" : "text-slate-800 dark:text-white"
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className={`text-slate-400 transition-transform duration-300 hidden sm:block shrink-0 ${
                        isActive ? "rotate-90 text-[#F6931F]" : ""
                      }`} 
                    />
                  </div>

                  {/* Expandable Content Panel */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed pl-7 max-w-2xl whitespace-normal">
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT CINEMATIC IMAGE VIEWER SHOWCASE (5 Columns) */}
          <div className="lg:col-span-5 relative w-full h-[350px] sm:h-[440px] rounded-[32px] overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-xl hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={differentiators[activeStep].image}
                  alt={differentiators[activeStep].title}
                  fill
                  className="object-cover object-center"
                />
                {/* Dark Gradient Overlay Bottom Cover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Bottom Metadata Badge inside image viewport */}
                <div className="absolute bottom-6 left-6 right-6 text-left text-white flex items-center gap-3 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="p-2 bg-[#F6931F] text-white rounded-xl shrink-0">
                    <Star size={14} fill="currentColor" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider block text-white/50">Travelshook Signature</span>
                    <span className="text-xs font-black tracking-tight leading-none block mt-0.5">Verified Hospitality Quality</span>
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
