"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Booking our Umrah package was entirely seamless. From the flight tracking updates to the premium ground support in Makkah, their team managed every detail perfectly.",
    name: "Zohaib Ahmed",
    role: "Verified Pilgrim",
    rating: 5,
  },
  {
    quote: "Our family Ramadan package was managed beautifully. The hotel location directly facing the Holy Site made traveling with elders comfortable and completely stress-free.",
    name: "Mariam Khan",
    role: "Group Coordinator",
    rating: 5,
  },
  {
    quote: "Professional, transparent pricing with no hidden agent overhead fees. Their support desks kept our team informed through every step of the e-visa process.",
    name: "Liam Smith",
    role: "Corporate Travel Lead",
    rating: 5,
  },
];

export default function LuxuryTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Fix applied here to clear the active render queue error
  useEffect(() => {
    if (!emblaApi) return;
    
    // Wraps execution outside of active render loop matching Next.js strict linter rules
    const timeoutId = setTimeout(() => onSelect(), 0);
    
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black py-28 text-slate-900 dark:text-white transition-colors duration-500">
      
      {/* BRAND GRADIENT BG GLOWS */}
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#E68213]/5 dark:bg-[#E68213]/10 blur-[130px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#0070A1]/5 dark:bg-[#0070A1]/10 blur-[130px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-16 max-w-6xl">
        
        {/* DESIGN ALIGNED HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="mb-4 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#E68213] font-bold">
            Pilgrim Stories
          </span>
          <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">Clients Say</span>
          </h2>
        </div>

        {/* VIEWPORT CONTROLLER BAR PACK */}
        <div className="relative">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item, index) => {
                const isActive = index === selectedIndex;
                
                return (
                  <div 
                    key={index} 
                    className="flex-[0_0_100%] min-w-0 px-4 md:px-12 transition-all duration-700 select-none"
                    style={{ opacity: isActive ? 1 : 0.25, transform: isActive ? 'scale(1)' : 'scale(0.92)' }}
                  >
                    <div className="relative mx-auto max-w-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 rounded-[32px] p-8 md:p-14 backdrop-blur-xl shadow-xl dark:shadow-2xl overflow-hidden group">
                      
                      {/* ACCENT LIGHT GLOW UNDERLAY */}
                      <div className="absolute top-0 right-0 w-36 h-36 bg-[#E68213]/5 dark:bg-[#E68213]/10 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-100" />
                      
                      {/* DECORATIVE QUOTE ICON MARKER */}
                      <Quote className="absolute top-8 right-8 text-slate-200/80 dark:text-white/[0.02] w-24 h-24 pointer-events-none transform translate-x-4 -translate-y-4" />

                      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                        
                        {/* STAR INDICATOR CLUSTER ARRAY */}
                        <div className="flex gap-1 text-amber-500">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>

                        {/* CORE TESTIMONIAL TEXT BODY */}
                        <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-slate-800 dark:text-zinc-200  max-w-2xl font-serif">
                          {item.quote}
                        </p>

                        {/* CAPTION CREDENTIAL CREDITS */}
                        <div className="pt-4 border-t border-slate-200 dark:border-white/10 w-24 transition-all group-hover:w-36" />
                        
                        <div>
                          <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-wide">
                            {item.name}
                          </h4>
                          <p className="text-xs font-bold uppercase tracking-widest text-[#E68213] mt-1">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LUXURY SWIPE TOGGLE BRACKETS */}
          <div className="hidden md:flex justify-between items-center absolute w-full top-1/2 -translate-y-1/2 pointer-events-none px-2">
            <button 
              onClick={scrollPrev} 
              className="p-5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 hover:bg-[#E68213] hover:text-white transition-all pointer-events-auto backdrop-blur-md shadow-md transform -translate-x-1/2 hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              onClick={scrollNext} 
              className="p-5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 hover:bg-[#E68213] hover:text-white transition-all pointer-events-auto backdrop-blur-md shadow-md transform translate-x-1/2 hover:scale-110 active:scale-95"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* INDICATOR SLAT DASHBARS */}
        <div className="flex justify-center gap-2.5 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === selectedIndex 
                  ? "w-8 bg-gradient-to-r from-[#E68213] to-[#0070A1]" 
                  : "w-2 bg-slate-300 dark:bg-neutral-800"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
