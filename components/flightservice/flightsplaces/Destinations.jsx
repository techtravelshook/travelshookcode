"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Plane, CheckCircle2 } from "lucide-react";

export default function FlightsPlacesCards({ cityName, cardsData = [] }) {
  
  // Dynamic WhatsApp Message generator helper function
  const getWhatsAppLink = (destination, title) => {
    const baseNumber = "442038766846";
    const text = encodeURIComponent(
      `Hi there, I would like to make an inquiry regarding: "${title}" flight package to ${destination}. Please share the current pricing and availability.`
    );
    return `https://wa.me/${baseNumber}?text=${text}`;
  };

  return (
    <section className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 dark:bg-[#01080C]">
      
      {/* FIX: Removed 'mx-auto' so the layout row begins directly on the left viewport grid line */}
      <div className="mx-auto max-w-8xl w-full">
        
        {/* ───────────────── THEMED SECTION HEADER (Left Aligned) ───────────────── */}
        <div className="mb-12 flex flex-col items-start text-start">
          
          {/* Premium Solid Brand Gradient Badge Layout Alternative */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E68213]/10 to-[#0070A1]/10 border border-[#E68213]/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0070A1] dark:text-[#F7931E] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E68213]" />
            Flights to {cityName}
          </span>

          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
            Top Travel{" "}
            <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
              Options
            </span>
          </h2>
          
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-500 md:text-sm dark:text-zinc-400">
            Explore our curated top-tier itineraries to {cityName}. Select a package to start a direct instant inquiry with our travel experts.
          </p>
        </div>

        {/* 3-Cards Flex/Grid Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cardsData.map((card, index) => (
            <div 
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Card Thumbnail Area */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={card.image || "/imgs/aeroplan.jpg"}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-7xl) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Price Label Badge */}
                <div className="absolute bottom-4 right-4 rounded-full bg-gradient-to-r from-[#E68213] to-[#F7931E] px-4 py-1.5 text-sm font-black text-white shadow-md">
                  from {card.price}
                </div>
              </div>

              {/* Card Meta Content Details */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0070A1] dark:text-[#F7931E]">
                  <Plane size={14} />
                  <span>{card.airline || "Premium Carrier"}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 line-clamp-1 dark:text-white">
                  {card.title}
                </h3>
                
                <p className="mt-2 text-sm text-slate-500 line-clamp-3 dark:text-zinc-400">
                  {card.description}
                </p>

                {/* Bulleted Travel Guidelines list grid */}
                <ul className="my-5 space-y-2 border-t border-dashed border-slate-100 pt-4 dark:border-zinc-800">
                  {card.highlights?.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-300">
                      <CheckCircle2 size={14} className="text-[#0070A1] shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* WHATSAPP ACTION INQUIRY BUTTON */}
                <div className="mt-auto pt-2">
                  <a
                    href={getWhatsAppLink(cityName, card.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl 
                      bg-gradient-to-r from-[#E68213] to-[#0070A1] 
                      px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white 
                      transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-95"
                  >
                    <MessageCircle size={16} fill="white" />
                    Instant WhatsApp Inquiry
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
