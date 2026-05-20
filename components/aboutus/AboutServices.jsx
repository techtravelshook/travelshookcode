"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Compass, Moon, Globe, MessageCircle } from "lucide-react";

const services = [
  { 
    id: 1, 
    number: "01",
    title: "Ramadan Umrah Packages", 
    desc: "Experience the peak blessings of Ramadan with premium frontline hotel accommodations next to the Haram and tailored logistical schedules.",
    icon: Moon 
  },
  { 
    id: 2, 
    number: "02",
    title: "Premium Hajj Packages", 
    desc: "Fully inclusive luxury logistical support covering VIP private transit, fast-track electronic travel visas, and dedicated scholarly group guidance.",
    icon: Compass 
  },
  { 
    id: 3, 
    number: "03",
    title: "Custom Holiday Tours", 
    desc: "Tailored luxury escapes to exotic dream destinations across the globe featuring combined family flights, stays, and tours under one booking.",
    icon: Globe 
  },
];

export default function AboutServices() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });
  const whatsappNumber = "923124928496";

  return (
    <section 
      ref={containerRef}
      className="relative py-16 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden"
    >
      {/* Creative Background Ambient Ring — Sits safely under content */}
      <div aria-hidden="true" className="pointer-events-none absolute right-10 top-12 opacity-20 dark:opacity-10 z-0">
        <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
          {[40, 80, 120].map((r) => (
            <circle key={r} cx="130" cy="130" r={r} stroke="#0070A1" strokeWidth="1" border-dashed="true" opacity="0.4" />
          ))}
        </svg>
      </div>

      <div className="relative w-full max-w-[100vw] mx-auto px-4 lg:px-12 z-10">
        
        {/* ================= HEADER CONTENT (START FROM START) ================= */}
        <div className="flex flex-col items-start gap-2 mb-12 text-left max-w-3xl">
          <span className="mb-3 inline-flex rounded-full bg-[#0070A1]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0070A1]">
            What We Offer
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
            Our Core{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent italic ml-1 font-serif normal-case">
              Services
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
            We provide all-inclusive travel offers featuring verified flights, premium accommodations, tours, and transfers under one seamless booking.
          </p>
        </div>

        {/* ================= CREATIVE BENTO-INSPIRED GRID layout ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-start w-full">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const waMsg = `Hi, I am interested in inquiring about your "${service.title}" services. Please share more details.`;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col h-[260px] w-full max-w-[340px] sm:max-w-full
                rounded-[24px] overflow-hidden bg-gradient-to-b from-slate-50/60 to-slate-100/40 dark:from-white/[0.02] dark:to-white/[0.005]
                border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:shadow-xl 
                hover:border-[#0070A1]/30 dark:hover:border-[#F6931F]/30 hover:bg-white dark:hover:bg-[#020d14] transition-all duration-500 p-6 flex flex-col justify-between"
              >
                {/* Visual Top Gradient Border Highlight on Hover */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F6931F] to-[#0070A1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* CREATIVE BACKGROUND WATERMARK NUMBER */}
                <span className="absolute -top-4 -right-2 font-black text-[75px] leading-none select-none pointer-events-none text-slate-200/40 dark:text-white/[0.015] group-hover:text-[#F6931F]/10 dark:group-hover:text-[#F6931F]/5 transition-colors duration-500 font-mono">
                  {service.number}
                </span>

                {/* Top Row Block */}
                <div className="relative z-10">
                  {/* Creative Circular Icon Wrapper with Adaptive Rotation */}
                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 text-[#0070A1] dark:text-[#F6931F] border border-slate-200/40 dark:border-white/10 group-hover:bg-gradient-to-br group-hover:from-[#F6931F] group-hover:to-[#0070A1] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm shrink-0 w-10 h-10 flex items-center justify-center mb-5">
                    <IconComponent size={18} strokeWidth={1.8} className="group-hover:rotate-12 transition-transform duration-500" />
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-[#0070A1] dark:group-hover:text-[#F6931F] transition-colors duration-300 leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3 whitespace-normal">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Interactive CTA Section */}
                <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-white/10 pt-3 mt-4 w-full relative z-10">
                  <Link 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMsg)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0070A1] dark:text-[#F6931F] group-hover:text-orange-500 dark:group-hover:text-white transition-colors duration-300"
                  >
                    <MessageCircle size={14} fill="currentColor" className="text-emerald-500 group-hover:text-inherit transition-colors" />
                    Inquire Now 
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
