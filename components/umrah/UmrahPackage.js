"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "(01)",
    title: "14 Nights 5 Star Ramadan Package",
    desc: "A premium 14-night Ramadan Umrah experience featuring 5-star accommodations: 7 nights at Pullman ZamZam Makkah and 7 nights at Crowne Plaza Madinah.",
    tags: ["Meals", "Transport", "Guide", "Flights"],
    image: "imgs/hajj/hajj1.jpg"
  },
  {
    id: "(02)",
    title: "14 Nights Luxury Umrah Package",
    desc: "Experience ultimate comfort with 7 nights at the Dorrar Aleiman Royal in Makkah and 7 nights at the Madinah Hilton, both premium 5-star hotels.",
    tags: ["Meals", "Transport", "Guide", "Flights"],
    image: "imgs/hajj/hajj2.jpg"
  },
  {
    id: "(03)",
    title: "3 Star 7 Nights Budget Umrah Packages",
    desc: "An affordable 7-night journey including 4 nights at Emaar Al Khalil Hotel in Makkah and 3 nights at Emaar Taibah Hotel in Madinah.",
    tags: ["Meals", "Transport", "Guide", "Flights"],
    image: "imgs/hajj/hajj3.jpg" 
  }
];

export default function StickyServices() {
  return (
    /* Added font-poppins to the container class list */
    <section className="font-poppins bg-white dark:bg-black p-4 sm:p-8 w-full text-slate-900 dark:text-white transition-colors duration-500">
      {services.map((service, index) => (
        <ServiceRow key={service.id} service={service} index={index} />
      ))}

      {/* Dynamic Spacer */}
      <div className="h-screen bg-white dark:bg-black transition-colors duration-500" />
    </section>
  );
}

function ServiceRow({ service, index }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="sticky top-0 h-auto max-h-screen flex flex-col justify-start py-16 md:py-24 border-t border-black/10 dark:border-white/10 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ 
          opacity: isFocused ? 0.45 : 0.05, // Increased active opacity for clear visibility
          scale: isFocused ? 1.02 : 1 
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Image 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover" // Removed grayscale and contrast filter edits
        />
        {/* Color/Contrast vignette mask ensuring the image blends beautifully behind fonts */}
        <div className="absolute inset-0 bg-white/40 dark:bg-black/60 transition-colors duration-500" />
      </motion.div>

      {/* CONTENT LAYER */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full z-10 relative"
        onViewportEnter={() => setIsFocused(true)}
        onViewportLeave={() => setIsFocused(false)}
        viewport={{ amount: 0.2, margin: "-15% 0px -15% 0px" }}
      >
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-8">
            <span className="text-xs sm:text-sm font-mono text-slate-400 dark:text-white/30 pt-2 sm:pt-0 shrink-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {service.id}
            </span>

            {/* Added shadow-drop contrast variables to title typography */}
            <h3 className={`text-3xl sm:text-5xl md:text-8xl font-medium tracking-tight transition-all duration-700 flex-1 min-w-0 break-words leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]
              ${isFocused 
                ? 'translate-x-2 sm:translate-x-4 text-slate-900 dark:text-white' 
                : 'text-slate-300 dark:text-white/20'}`}>
              {service.title}
            </h3>
          </div>

          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: 20 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pl-8 sm:pl-12 md:pl-28 max-w-2xl">
                  {/* Enhanced color weight from slate-600 to slate-800 on text layout */}
                  <p className="text-base sm:text-xl md:text-2xl text-slate-800 dark:text-white/80 font-normal leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {service.desc}
                  </p>
                  
                  {/* TAGS ROW */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-[10px] sm:text-xs font-semibold uppercase border border-black/40 dark:border-white/30 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-slate-700 dark:text-white/70 whitespace-nowrap bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* PREMIUM EXPLORE BUTTON */}
                  <div className="pt-2">
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="group/btn inline-flex items-center gap-2 sm:gap-3 rounded-full 
                        bg-gradient-to-r from-[#E68213] to-[#0070A1] 
                        px-5 sm:px-6 py-2.5 sm:py-3.5 
                        text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white 
                        hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] 
                        transition-all duration-300 shadow-md"
                    >
                      Explore Now
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Pure overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-white/[0.02] to-transparent pointer-events-none z-10"
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
