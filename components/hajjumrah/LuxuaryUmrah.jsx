"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, MessageCircle, Compass, Calendar, BadgePercent } from "lucide-react";

export default function PackageGrid({
  packages = [],
  badgeText = "Exclusive Offers",
  mainTitlePrefix = "Luxury Premium",
  mainTitleGradient = "Umrah Packages 2026",
  description = "Discover our handpicked premium and luxury travel packages tailored just for your spiritual comfort.",
  whatsappNumber = "923124928496"
}) {
  const [selected, setSelected] = useState(null);

  const handleWhatsApp = (e, pkg) => {
    e.stopPropagation(); // Card click handler se event isolate karne ke liye
    const activePkg = pkg || selected;
    if (!activePkg) return;

    const msg = `Hi, I am interested in booking the "${activePkg.title}" package.
📍 Location: ${activePkg.location}
⏳ Duration: ${activePkg.days} Days
🍽️ Meal Plan: ${activePkg.meal}
💰 Price: ${activePkg.price}

Please share more details. Thanks!`;
    
    // FIXED: Added missing slash '/' between wa.me and whatsappNumber
    window.open(`https://wa.me{whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Restricting the loop to show exactly 4 static cards
  const displayPackages = packages.slice(0, 4);

  if (!packages || packages.length === 0) return null;

  return (
    <section className="py-8 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500">
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        
        {/* ================= HEADER CONTROLS (LEFT ALIGNED) ================= */}
        <div className="flex flex-col items-start gap-2 mb-10 text-left max-w-3xl">
          {/* TOP BADGE */}
          <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
            {badgeText}
          </span>

          {/* MAIN TITLE */}
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
            {mainTitlePrefix}{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent italic ml-1 font-serif">
              {mainTitleGradient}
            </span>
          </h2>

          {/* PARAGRAPH */}
          {description && (
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
              {description}
            </p>
          )}
        </div>

        {/* ================= BEAUTIFUL RESPONSIVE GRID ================= */}
        {/* FIXED: Added justify-items-center for mobile layout balance while keeping look premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
          {displayPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelected(pkg)}
              className="cursor-pointer group flex flex-col h-[480px] w-full max-w-[340px]
              rounded-[24px] overflow-hidden bg-white dark:bg-white/[0.02] 
              border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl 
              hover:border-[#0070A1]/30 dark:hover:border-[#F6931F]/30 transition-all duration-300"
            >
              {/* Thumbnail Area */}
              <div className="h-56 relative w-full overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 backdrop-blur-md px-3 p-2 rounded-full border border-white/10 text-white text-[11px] font-black tracking-wide bg-[#F6931F]">
                  {pkg.days} Days
                </div>
              </div>

              {/* Text Description Block */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F6931F] flex items-center gap-1 mb-1">
                    <Compass size={12} /> {pkg.location}
                  </p>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight whitespace-normal group-hover:text-[#0070A1] transition-colors leading-snug h-[44px] line-clamp-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed whitespace-normal">
                    {pkg.advantage}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3 mt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">From</span>
                    <span className="text-xl font-black text-[#0070A1] dark:text-white">{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => handleWhatsApp(e, pkg)}
                      className="p-2 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl transition-colors shadow-sm"
                      title="Quick WhatsApp Inquiry"
                    >
                      <MessageCircle size={16} fill="white" />
                    </button>
                    <span className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/80 group-hover:bg-[#0070A1] group-hover:text-white transition-colors">
                      View Plan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= POPUP EXTENSION ================= */}
        <AnimatePresence>
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl overflow-hidden bg-white dark:bg-[#020d14] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col md:flex-row"
              >
                {/* Popup Hero Image Banner */}
                <div className="relative w-full h-48 md:h-auto md:w-1/2 min-h-[260px]">
                  <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white p-2 right-4">
                    <span className="bg-[#F6931F] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {selected.location}
                    </span>
                    <h3 className="text-xl font-black mt-2 uppercase tracking-wide drop-shadow-md whitespace-normal leading-snug">
                      {selected.title}
                    </h3>
                  </div>
                </div>

                {/* Popup Data Insights Grid */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-white dark:bg-[#020d14]">
                  <button 
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="mt-2">
                    <h4 className="text-xs uppercase font-bold text-[#0070A1] tracking-wider mb-2">Package Overview</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-white/70 font-medium mb-4 whitespace-normal">
                      {selected.advantage}
                    </p>

                    {/* Tech Details Inclusions Map */}
                    <div className="space-y-3 mb-5 bg-slate-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-left">
                      <div className="flex items-start gap-3 text-slate-700 dark:text-white/90">
                        <Calendar size={16} className="text-[#F6931F] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold whitespace-normal">Duration: {selected.days} Days</span>
                      </div>
                      <div className="flex items-start gap-3 text-slate-700 dark:text-white/90">
                        <Utensils size={16} className="text-[#F6931F] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold whitespace-normal">Meal Option: {selected.meal}</span>
                      </div>
                      {selected.details && (
                        <div className="flex items-start gap-3 text-slate-700 dark:text-white/90">
                          <Compass size={16} className="text-[#0070A1] shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-500 dark:text-white/60 leading-relaxed whitespace-normal">
                            {selected.details}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-700 dark:text-white/90 border-t border-slate-200/60 dark:border-white/5 pt-2.5 mt-1">
                        <BadgePercent size={16} className="text-[#0070A1]" />
                        <span className="text-xs font-bold">Total Price: <span className="text-sm font-black text-[#0070A1] dark:text-[#F6931F]">{selected.price}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Action Buttons */}
                  <div className="flex flex-col gap-2 w-full mt-2">
                    <button
                      onClick={() => handleWhatsApp()}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.98]"
                    >
                      <MessageCircle size={18} fill="white" />
                      Book via WhatsApp
                    </button>
                    
                    <Link
                      href="/contact" 
                      className="w-full py-3 bg-[#0070A1] hover:bg-[#005e88] text-white font-bold text-sm rounded-xl transition-all text-center block active:scale-[0.98]"
                    >
                      Explore Full Package Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
