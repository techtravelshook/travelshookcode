"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function OurPartners() {
  const partnerLogos = [
    { id: "1", name: "Emirates Premium Luxury Travel", imageUrl: "/imgs/partners/12.webp" },
    { id: "2", name: "Marriott International Bonvoy", imageUrl: "/imgs/partners/13.webp" },
    { id: "3", name: "British Airways Executive", imageUrl: "/imgs/partners/14.webp" },
    { id: "4", name: "Hilton Premium Resorts Portfolio", imageUrl: "/imgs/partners/15.webp" },
    { id: "5", name: "IATA Certified Flight Operator", imageUrl: "/imgs/partners/16.webp" },
    { id: "6", name: "ATOL Secure Protected Holidays", imageUrl: "/imgs/partners/18.webp" },
    { id: "7", name: "Qatar Airways Premium Service", imageUrl: "/imgs/partners/20.webp" },
    { id: "8", name: "Qatar Airways Premium Service", imageUrl: "/imgs/partners/21.webp" },
    { id: "9", name: "Qatar Airways Premium Service", imageUrl: "/imgs/partners/23.webp" },
    { id: "10", name: "Qatar Airways Premium Service", imageUrl: "/imgs/partners/24.webp" },
  ];

  // Infinite marquee trick: repeating the dataset prevents blank gaps on ultra-wide screens
  const infiniteLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#fafafa] to-white dark:from-[#030712] dark:to-[#070a13] overflow-hidden border-t border-b border-slate-200/40 dark:border-white/5 transition-colors duration-500">
      
      {/* Background Accent Glow Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#0070A1]/2 dark:bg-[#0070A1]/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Badge Indicator */}
        <div className="inline-flex items-center gap-2 mb-3 rounded-full bg-[#F1EBE3] dark:bg-[#0070A1]/5 border border-[#0070A1]/20 px-3.5 py-1">
          <ShieldCheck size={12} className="text-[#F6931F]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6931F] dark:text-[#38bdf8]">
            Strategic Affiliations
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
          Trusted by{" "}
          <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent pr-1 inline-block">
            Luxury Global Partners
          </span>
        </h2>
      </div>

      {/* Infinite Seamless Marquee Slider */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left and Right Visual Fading Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/50 to-transparent dark:from-[#030712] dark:via-[#030712]/50 z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/50 to-transparent dark:from-[#070a13] dark:via-[#070a13]/50 z-20 pointer-events-none" />

        {/* Accelerated Animation Wrapper */}
        <motion.div
          className="flex gap-12 sm:gap-16 items-center w-max px-4"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 25, // Scrolling cycle velocity in seconds
            repeat: Infinity,
          }}
          whileHover={{ transition: { duration: 45 } }} // Gently slows tracking velocity under user cursor hover
        >
          {infiniteLogos.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 dark:opacity-30 dark:hover:opacity-100 transition-all duration-500 shrink-0 transform hover:scale-[1.03] cursor-pointer"
            >
              {/* Refactored Image Box Setup with fixed Next.js sizes query syntax */}
              <div className="relative w-[200px] h-[100px] md:w-[250px] md:h-[120px]">
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  fill
                  priority 
                  className="object-contain dark:invert-[0.1] dark:brightness-125"
                  sizes="(max-w: 768px) 200px, 250px"
                />
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
