"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const featuredPackages = [
  { name: "Luxury Ramadan Track", duration: "14 Nights", makkahHotel: "Pullman ZamZam Makkah", madinahHotel: "Crowne Plaza Madinah", doublePrice: "£970", quadPrice: "£790", isPremium: true },
  { name: "Standard Budget Umrah", duration: "7 Nights", makkahHotel: "Emaar Al Khalil Hotel", madinahHotel: "Emaar Taibah Hotel", doublePrice: "£899", quadPrice: "£599", isPremium: false }
];

function PricingCard({ pkg }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamically calculate cursor position coordinates inside the card bounding box
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Spotlight variables mapped to your primary theme brand colors
  const backgroundGlow = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      ${pkg.isPremium ? "rgba(230, 130, 19, 0.08)" : "rgba(0, 112, 161, 0.08)"},
      transparent 80%
    )
  `;

  const borderGlow = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      ${pkg.isPremium ? "rgba(230, 130, 19, 0.4)" : "rgba(0, 112, 161, 0.4)"},
      transparent 75%
    )
  `;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative p-8 rounded-[32px] border flex flex-col justify-between overflow-hidden backdrop-blur-md will-change-transform transition-all duration-500
        ${pkg.isPremium 
          ? "bg-white dark:bg-white/5 border-[#E68213]/30 shadow-md" 
          : "bg-white dark:bg-white/[0.02] border-slate-200/60 dark:border-white/5 shadow-sm"
        }`}
    >
      {/* INTERACTIVE GLOW LAYER MASK UNDERLAYS */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: backgroundGlow }}
      />
      <motion.div 
        className="absolute -inset-[1px] rounded-[32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{ background: borderGlow }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold px-3 py-1 bg-[#E68213]/10 text-[#E68213] rounded-full">
            {pkg.duration} Stay
          </span>
          {pkg.isPremium && (
            <span className="text-[10px] uppercase font-black tracking-widest text-[#0070A1]">
              5-Star Elite
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-[#E68213] dark:group-hover:text-[#E68213] transition-colors duration-300">
          {pkg.name}
        </h3>
        
        <div className="space-y-3 text-sm border-b border-dashed border-slate-200 dark:border-white/10 pb-6 mb-6">
          <div className="flex justify-between">
            <span className="text-slate-400">Makkah Stay:</span>
            <span className="font-bold text-slate-800 dark:text-zinc-200">{pkg.makkahHotel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Madinah Stay:</span>
            <span className="font-bold text-slate-800 dark:text-zinc-200">{pkg.madinahHotel}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-baseline justify-between mt-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Pricing From</span>
          <span className="text-3xl font-black text-[#E68213]">{pkg.doublePrice}</span>
          <span className="text-xs text-slate-400"> /pp (Double)</span>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md">
          Inquire Now
        </button>
      </div>
    </motion.div>
  );
}

export function PackagePricingMatrix() {
  return (
    <section className="bg-white dark:bg-black py-20 px-6 transition-colors duration-500 overflow-hidden relative">
      {/* AMBIENT BACKGROUND GLOW VECTOR FLOATS */}
      <div className="absolute top-1/2 left-[-10%] w-96 h-96 bg-[#E68213]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-96 h-96 bg-[#0070A1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#0070A1] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
            Live Availability
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Featured Umrah Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPackages.map((pkg, i) => (
            <PricingCard key={i} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
