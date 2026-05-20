"use client";

import FlightSearchWidget from "@/components/filter/FlightFilter";
import Image from "next/image";
import Link from "next/link";
import React from "react";




export default function FlightsPage() {
  return (
    <main className="font-mulish  overflow-hidden bg-white text-slate-900 transition-colors duration-500 dark:bg-[#01080C] dark:text-white">

      {/* ───────────────── HERO SECTION (Fixed Height) ───────────────── */}
      <section className="relative flex h-[75vh] min-h-[550px] w-full items-center justify-center overflow-hidden px-4 sm:px-6 md:h-[65vh] lg:px-8">
        
        {/* Background Image Setup */}
        <Image
          src="/imgs/aeroplan.jpg"
          alt="Flights Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#01080C] via-black/10 to-black/30" />

        {/* Hero Content Layer */}
        <div className="relative z-10 mx-auto mt-12 flex w-full max-w-7xl flex-col items-center pt-28">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Book Global{" "}
              <span className="text-[#F7931E]">Flights</span>
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm md:text-base">
              Discover premium destinations, unbeatable airfare deals,
              and seamless travel experiences worldwide.
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
