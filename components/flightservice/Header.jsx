"use client";

import FlightSearchWidget from "@/components/filter/FlightFilter";
import Image from "next/image";
import React from "react";

// Humne generic variables pass kiye: title, highlightText, description, aur bgImage
export default function FlightHeroLayout({ 
  title = "Book Global", 
  highlightText = "Flights", 
  description = "Discover premium destinations, unbeatable airfare deals, and seamless travel experiences worldwide.", 
  bgImage = "/imgs/aeroplan.jpg" 
}) {
  return (
    <main className="font-mulish overflow-hidden bg-white text-slate-900 transition-colors duration-500 dark:bg-[#01080C] dark:text-white">

      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="relative flex h-[75vh] min-h-[550px] w-full items-center justify-center overflow-hidden px-4 sm:px-6 md:h-[65vh] lg:px-8">
        
        {/* Dynamic Background Image */}
        <Image
          src={bgImage}
          alt={`${title} ${highlightText} Hero`}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#01080C] via-black/10 to-black/30" />

        {/* Hero Content Layer */}
        <div className="relative z-10 mx-auto mt-12 flex w-full max-w-7xl flex-col items-center pt-28">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {title}{" "}
          <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
  {highlightText}
</span>


            </h1>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm md:text-base">
              {description}
            </p>
          </div>
          
          {/* Flight Search Form */}
          <div className="w-full max-w-6xl px-2 sm:px-4">
            <FlightSearchWidget />
          </div>
        </div>
      </section>

    </main>
  );
}
