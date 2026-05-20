"use client";

import React from "react";
import { 
  Plane, Compass, Hotel, CalendarDays, Car, Landmark, ArrowRight 
} from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Fly From Anywhere In UK",
    desc: "Associated with ICAO-registered airlines, we compare and reserve the best direct or indirect budget flights from any UK airport to KSA.",
    tag: "Airlines Network"
  },
  {
    icon: Compass,
    title: "Guidance At Every Step",
    desc: "Our IATA-certified travel experts discern pilgrims' needs, guiding you smoothly through flights, hotel allocations, and stopover options.",
    tag: "Expert Support"
  },
  {
    icon: Hotel,
    title: "Economy To Luxury Hotels",
    desc: "Partnered with over 750+ three, four, and five-star hotels around Haram. We arrange premium stays matching your custom budget.",
    tag: "Handpicked Stays"
  },
  {
    icon: CalendarDays,
    title: "Pre To 11th Hour Booking",
    desc: "Plan your Umrah months in advance or on a quick whim. We secure competitive last-minute package deals with our allied hoteliers.",
    tag: "Flexible Dates"
  },
  {
    icon: Car,
    title: "VIP & Private Transport",
    desc: "Collaborated with trusted transportation providers in KSA to organize reliable, on-time airport transfers and holy Ziyarat tours.",
    tag: "Ground Transit"
  },
  {
    icon: Landmark,
    title: "Cheap To Luxury Umrah Deals",
    desc: "From 4-day economy trips to 21-day business-class travel arrangements, we cover comprehensive options from January through December.",
    tag: "Custom Packages"
  }
];

export default function PilgrimageFeatures() {
  return (
    <section className="relative w-full py-16 bg-slate-100 dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      
      {/* ================= BACKGROUND DECORATIVE CIRCLES & RINGS ================= */}
      {/* Decorative rings — top left */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 opacity-30 dark:opacity-10 z-0">
        <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
          {[40, 70, 100, 130, 160].map((r) => (
            <circle key={r} cx="170" cy="170" r={r} stroke="#F6931F" strokeWidth="0.8" opacity="0.5" />
          ))}
          <polygon
            points="170,20 310,100 310,240 170,320 30,240 30,100"
            stroke="#F6931F"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Decorative rings — bottom right */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 opacity-20 dark:opacity-10 z-0">
        <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
          {[30, 55, 80, 105].map((r) => (
            <circle key={r} cx="130" cy="130" r={r} stroke="#0070A1" strokeWidth="0.8" opacity="0.5" />
          ))}
        </svg>
      </div>

      {/* Container configurations matching full fluid width layout of upper sections */}
      <div className="relative w-full max-w-[100vw] mx-auto px-4 lg:px-12 z-10">
        
        {/* ================= HEADER CONTENT (FIXED: START FROM START) ================= */}
        <div className="flex flex-col items-start gap-2 mb-12 text-left max-w-4xl">
          {/* TOP BADGE */}
          <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
            Premium Features
          </span>

          {/* MAIN BRAND TITLE WITH TRANSITIONS */}
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
            The TravelShook – A Trustworthy{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent pr-1 inline-block">
              Pilgrimage Travel Agency
            </span>
          </h2>

          {/* SEO SUBTITLE DESCRIPTION */}
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
            UK travelers can always find affordable and luxurious Umrah packages with us. Whether you plan a budget-friendly trip or a lavish retreat, we control the entire traveler experience—from picking the perfect place to stay to securing premium rides anywhere.
          </p>
        </div>

        {/* ================= MAIN INTERACTIVE GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full justify-items-start">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col justify-between p-6 w-full max-w-[360px] sm:max-w-full rounded-[24px] bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-sm hover:shadow-2xl hover:border-[#0070A1]/30 dark:hover:border-[#F6931F]/30 transition-all duration-300 text-left overflow-hidden"
              >
                {/* Visual Top Accent Border on Hover */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F6931F] to-[#0070A1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  {/* Icon & Label Wrapper */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] text-[#0070A1] dark:text-[#F6931F] group-hover:bg-[#0070A1] group-hover:text-white dark:group-hover:bg-[#F6931F] dark:group-hover:text-slate-900 transition-all duration-300 shadow-sm shrink-0">
                      <IconComponent size={20} strokeWidth={1.8} />
                    </div>
                    <span className="text-[9px] font-mono font-black tracking-wider uppercase text-slate-400 dark:text-white/30 bg-slate-50 dark:bg-white/[0.03] px-2.5 py-1 rounded-full border border-slate-100 dark:border-white/5">
                      {item.tag}
                    </span>
                  </div>

                  {/* Feature Text Content */}
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight group-hover:text-[#0070A1] dark:group-hover:text-[#F6931F] transition-colors duration-200 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed whitespace-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Interactive Arrow Link */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 group-hover:text-[#0070A1] group-hover:text-[#F6931F] transition-colors">
                    Learn Requirements
                  </span>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0070A1] dark:group-hover:text-[#F6931F] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
