"use client";

import React from "react";
import Link from "next/link";
import { Plane, Compass, ArrowUpRight } from "lucide-react";

export default function FlightDirectoryLinks({ 
  primaryHeading = "Flight Destinations", 
  secondaryHeading = "Most Travelled Destinations",
  primaryLinks = [], 
  secondaryLinks = [] 
}) {
  return (
    <section className="relative w-full bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-mulish transition-colors duration-500 dark:bg-black overflow-hidden">
      
      {/* Container row centered globally but contents aligned left */}
      <div className="relative mx-auto max-w-8xl w-full z-10">

        {/* ───────────────── CATEGORY ONE: FLIGHT DESTINATIONS ───────────────── */}
        {primaryLinks.length > 0 && (
          <div className="mb-14">
            {/* Header Content Stack */}
            <div className="mb-6 flex flex-col items-start text-start">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] border border-[#E68213]/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                <Plane size={10} /> Regional Routes
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                {primaryHeading}
              </h3>
            </div>

            {/* Responsive Multi-Column Grid System */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {primaryLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.slug || "#"}
                  className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-[#0070A1] dark:text-zinc-300 dark:group-hover:text-[#F7931E]">
                    {item.label}
                  </span>
                  <ArrowUpRight size={14} className="text-slate-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0070A1] dark:text-zinc-600 dark:group-hover:text-[#F7931E]" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── CATEGORY TWO: MOST TRAVELLED COUNTRIES ───────────────── */}
        {secondaryLinks.length > 0 && (
          <div>
            {/* Header Content Stack */}
            <div className="mb-6 flex flex-col items-start text-start">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] border border-[#E68213]/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                <Compass size={10} /> Hot Destinations
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                {secondaryHeading}
              </h3>
            </div>

            {/* Responsive Multi-Column Grid System */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {secondaryLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.slug || "#"}
                  className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-[#0070A1] dark:text-zinc-300 dark:group-hover:text-[#F7931E]">
                    {item.label}
                  </span>
                  <ArrowUpRight size={14} className="text-slate-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0070A1] dark:text-zinc-600 dark:group-hover:text-[#F7931E]" />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
