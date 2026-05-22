"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react"; // React.use() unwrap utility ke liye lazmi hai
import { motion } from "framer-motion";
import { Calendar, Utensils, MessageCircle, Sparkles, Compass } from "lucide-react";

// 1. DUMMY DATA OBJECT

const holidaysData = {
  "dubai": {
    title: "Dubai Luxury Holiday Tour",
    days: 5,
    price: "£804",
    meal: "Breakfast Included",
    location: "Dubai, UAE",
    // Shuru mein leading slash (/) add kar diya hai
    image: "/imgs/holidays/dubai.jpg", 
    advantage: "Experience premium skyscrapers, private desert safari, and luxury marina cruise with VIP access."
  },
  "spain": {
    title: "Spain Costas & Culture Tour",
    days: 7,
    price: "£345",
    meal: "All Inclusive",
    location: "Barcelona, Spain",
    // Shuru mein leading slash (/) add kar diya hai
    image: "/imgs/holidays/spain.jpg",
    advantage: "Relax at premium beach resorts, enjoy local cuisines, and explore historic Antoni Gaudí architecture."
  },
   "greece": {
    title: "Greece Islands & Culture Tour",
    days: 7,
    price: "£450",
    meal: "All Inclusive",
    location: "Athens, Greece",
    // Shuru mein leading slash (/) add kar diya hai
    image: "/imgs/holidays/greece.jpg",
    advantage: "Relax at premium beach resorts, enjoy local cuisines, and explore historic Antoni Gaudí architecture."
  },
};


export default function HolidayDetailPage({ params }) {
  // Next.js 15 params unwrap hook logic applied here
  const unwrappedParams = React.use(params);
  const { holidayslug } = unwrappedParams;
  
  // Data load match checker
  const holiday = holidaysData[holidayslug];

  // Agar entry galat ho to 404 trigger karein
  if (!holiday) {
    notFound();
  }

  // WhatsApp Message Configuration
  const whatsappNumber = "923124928496";
  const whatsappMsg = `Hi, I am interested in booking the "${holiday.title}" holiday package.\n\n📍 Location: ${holiday.location}\n⏳ Duration: ${holiday.days} Days\n🍽️ Meal Plan: ${holiday.meal}\n💰 Price: ${holiday.price}\n\nPlease share more details. Thanks!`;
  const whatsappUrl = `https://wa.me{whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <main className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-[#fffaf5] to-[#f5f9ff] dark:from-[#020617] dark:via-[#071019] dark:to-[#020617] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500">
      
      {/* BRAND RADIAL AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F6931F]/10 blur-3xl rounded-full opacity-40 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-[#0070A1]/10 blur-3xl rounded-full opacity-40 pointer-events-none" />

      {/* NOISE TEXTURE SURFACE OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "url('https://vercel.app')",
        }}
      />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PREMIUM DESTINATION HERO IMAGE LAYOUT WRAPPER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[300px] sm:h-[450px] relative w-full rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/20 dark:border-white/10 group mb-10"
        >
          <Image 
            src={holiday.image} 
            alt={holiday.title} 
            fill 
            className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            priority
          />
          {/* GRADIENT OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-[#0070A1]/10 mix-blend-overlay" />

          {/* DYNAMIC SHINE GRADIENT EFFECT */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
          </div>

          {/* LOCATION FLOATING BADGE */}
          <span className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 px-4 py-2 text-xs font-black tracking-wider uppercase text-white shadow-lg">
            <Compass size={14} className="text-[#F6931F]" /> {holiday.location}
          </span>
        </motion.div>

        {/* CONTAINER META STRUCTURE ELEMENT LAYOUT CONTENT */}
        <div className="space-y-6">
          
          {/* SPARKLES EXCLUSIVE CHIP BADGE */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F6931F]/10 border border-[#F6931F]/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#F6931F] backdrop-blur-xl">
              <Sparkles size={11} className="animate-pulse" />
              Premium Exploration
            </span>
          </motion.div>

          {/* MAIN TYPOGRAPHY HEADER */}
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {holiday.title}
          </motion.h1>

          {/* ADVANTAGES SYNOPSIS TEXT */}
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-medium max-w-4xl">
            {holiday.advantage}
          </motion.p>

          {/* GLASSMORPHISM SPECIFICATIONS CONTAINER GRID BOX */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-5 rounded-[24px] border border-white/20 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] my-8">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/[0.03]">
              <div className="p-2.5 rounded-xl bg-[#0070A1]/10 text-[#0070A1] shrink-0">
                <Calendar size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tour Duration</span>
                <span className="text-sm font-black text-slate-800 dark:text-zinc-200">{holiday.days} Days / 4 Nights</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/[0.03]">
              <div className="p-2.5 rounded-xl bg-[#F6931F]/10 text-[#F6931F] shrink-0">
                <Utensils size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Meal Catering Plan</span>
                <span className="text-sm font-black text-slate-800 dark:text-zinc-200">{holiday.meal}</span>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM TRANSACTION PRICING ACTIONS AREA BAR */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 dark:border-white/10 pt-8 gap-6 mt-10">
            <div className="text-center sm:text-left shrink-0">
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] block mb-1">Total Package Cost</span>
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#F6931F] to-[#ffb347] bg-clip-text text-transparent leading-none">
                {holiday.price}
              </span>
            </div>

            {/* UPGRADED GRADIENT SHINE CTA */}
            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(246,147,31,0.25)] hover:shadow-[0_15px_35px_rgba(0,112,161,0.35)] flex items-center justify-center gap-2.5 transition-all duration-300 group/btn"
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              <span>Book via WhatsApp</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
