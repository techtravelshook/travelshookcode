"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Compass, CheckCircle2 } from "lucide-react";

export default function AboutusInfo() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="py-20 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden"
    >
      {/* Container matching full layout width standard */}
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ================= LEFT CONTENT COLUMN ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-left flex flex-col items-start gap-4"
        >
          {/* TOP BADGE */}
          <span className="inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-[#F6931F]">
            Our Journey
          </span>

          {/* SECTION HEADER TITLE */}
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
            Our Story &{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent  font-serif normal-case">
              Who We Are
            </span>
          </h2>

          {/* PARAGRAPH BLOCKS */}
          <div className="space-y-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-2 whitespace-normal">
            <p className="border-l-2 border-[#F6931F] pl-4  bg-slate-50 dark:bg-white/[0.01] py-2 rounded-r-xl">
              Welcome to Travelshook – your trusted partner for sacred journeys and dream vacations. As a premier travel management agency, we specialize in crafting custom travel experiences that perfectly balance the best prices, premium locations, and top-tier hospitality.
            </p>
            <p>
              Driven by an absolute commitment to customer satisfaction, our travel plans cater to every budget. We offer everything from affordable economy deals to all-inclusive premium luxury services. From the moment you book, our dedicated support team takes care of all your visa processing, flight bookings, luxury hotel accommodations, and reliable ground transportation.
            </p>
            <p>
              We pride ourselves on designing high-value Umrah and Hajj packages that allow you to focus entirely on your spiritual rituals. By handling the complex logistics of close-to-Haram lodging and transit, we help you turn your travel visions into reality with comfort and complete effectiveness.
            </p>
          </div>
        </motion.div>

        {/* ================= RIGHT ASYMMETRICAL ARTWORK COLUMN ================= */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center"
        >
          {/* Subtle Back Geometric Gradient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#0070A1]/5 dark:bg-[#F6931F]/5 blur-3xl pointer-events-none z-0" />

          {/* Main Hero Showcase Image Card */}
          <div className="absolute top-0 left-0 w-[85%] h-[85%] rounded-[32px] overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-lg z-10 group">
            <Image 
              src="/imgs/hajj/hajj4.jpg" 
              alt="Makkah Sanctuary Review View" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Offset Stack Overlapping Micro Card */}
          <div className="absolute bottom-0 right-0 w-[45%] h-[45%] rounded-[24px] overflow-hidden border-4 border-white dark:border-[#01080C] shadow-2xl z-20 hidden sm:block">
            <Image 
              src="/imgs/hajj/hajj3.jpg" 
              alt="Madinah Holy Sanctuary View" 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Floating Verification Label Counter Tag */}
          <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3 bg-white/80 dark:bg-[#020d14]/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-white shadow-md">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#F6931F] to-[#0070A1] text-white shrink-0">
              <Compass size={16} className="animate-spin-slow" />
            </div>
            <div className="text-left">
              <span className="text-[9px] font-black uppercase tracking-wider block text-slate-400 dark:text-white/30">Verified Agency</span>
              <span className="text-xs font-black tracking-tight">12+ Years Experience</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
