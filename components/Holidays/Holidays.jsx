"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

// Hum ne props accept kar liye taake title, subtitle aur data dynamic ho sakay
export default function HolidayDeals({ 
  badge = "Exclusive Offers", 
  titleMain = "Holiday Deals &", 
  titleHighlight = "Packages", 
  subtitle = "Handpicked packages with flights, hotels and more included.", 
  deals = [] 
}) {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#0c0c0e] py-14 text-slate-900 dark:text-white transition-colors duration-500">
      <div className="container relative z-10 mx-auto px-6">

        {/* DYNAMIC HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="mb-3 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E68213] font-bold">
              {badge}
            </span>
            
            <h2 className="text-xl sm:text-4xl lg:text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">
              {titleMain}
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent italic pr-2 ml-2">
                {titleHighlight}
              </span>
            </h2>
            
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] hover:border-[#F7931E]/40 dark:hover:border-[#F7931E]/30 hover:shadow-xl hover:bg-slate-100/40 dark:hover:bg-white/[0.05] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                  <span className="text-xs font-bold text-[#F7931E]">from {deal.price}pp</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(deal.stars)].map((_, i) => (
                      <Star key={i} size={11} className="fill-[#F7931E] stroke-none" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-white/20">#{deal.id}</span>
                </div>

                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-snug">
                  {deal.title}
                </h3>

                <p className="text-[12px] text-slate-600 dark:text-gray-400 leading-relaxed flex-1 font-medium">
                  {deal.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {deal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] text-[10px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F7931E]/10 hover:bg-[#F7931E]/20 text-[#F7931E] text-[12px] font-bold uppercase tracking-widest transition-colors duration-200">
                  View Deal
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
