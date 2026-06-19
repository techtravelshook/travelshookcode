"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { id: 1, value: "12,500+", label: "Pilgrims Guided", description: "Successfully managed spiritual journeys." },
  { id: 2, value: "15+ Years", label: "On-Ground Experience", description: "Expert logistical knowledge in Saudi Arabia." },
  { id: 3, value: "99.4%", label: "Satisfaction Rate", description: "Consistently rated top-tier for premium comfort." },
  { id: 4, value: "3 Dynamic", label: "Global Offices", description: "Seamless coordination across different regions." },
];

export default function AboutStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section 
      ref={ref}
      className="py-16 w-full bg-[#FAFAF9] dark:bg-[#01080C] border-y border-slate-200/60 dark:border-white/[0.04] transition-colors duration-500 overflow-hidden"
    >
      {/* Viewport container width parameters aligned with your upper panels */}
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        
        {/* ================= HEADER CONTROLS (LEFT ALIGNED WITH BADGE) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-2 mb-12 text-left max-w-3xl"
        >
          {/* TOP BRAND BADGE */}
          <span className="mb-2 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
            Our Milestones
          </span>

          {/* MAIN TITLE WITH SEAMLESS BRAND GRADIENT */}
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
            Our Numbers Speak For{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent  ml-1 font-serif normal-case">
              Themselves
            </span>
          </h2>

          {/* COMPACT SUBTITLE DESCRIPTION */}
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
            Through dedicated on-ground management and premium service execution, we have set industry benchmarks for premium pilgrimage operations.
          </p>
        </motion.div>

        {/* ================= DYNAMIC GRID WRAPPER ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between h-[150px] p-6 rounded-[24px] 
                bg-white dark:bg-white/[0.02] 
                border border-slate-200/80 dark:border-white/[0.05] 
                shadow-sm hover:shadow-xl hover:border-[#0070A1]/30 dark:hover:border-[#F6931F]/30 
                transition-all duration-300 text-left"
            >
              {/* TOP ACTION BAR INSIDE BADGE CARD */}
              <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-[#F6931F] to-[#0070A1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* STAT NUMERICAL METRIC VALUE */}
              <span className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-[#0070A1] dark:text-[#F6931F] group-hover:translate-x-1 transition-transform duration-300">
                {stat.value}
              </span>

              {/* CARD CORE INSIGHT DESCRIPTIONS */}
              <div className="mt-auto">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                  {stat.label}
                </h4>
                {stat.description && (
                  <p className="text-[11px] text-slate-400 dark:text-white/30 font-medium mt-1.5 leading-snug truncate group-hover:text-slate-500 dark:group-hover:text-white/50 transition-colors">
                    {stat.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
