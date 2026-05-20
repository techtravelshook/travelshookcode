"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Plane, ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  { city: "Dubai", country: "UAE", price: "$320", image: "/imgs/dubai.jpg" },
  { city: "Istanbul", country: "Turkey", price: "$450", image: "/imgs/turkey.jpg" },
  { city: "Makkah", country: "Saudi", price: "$280", image: "/imgs/makkah.jpg" },
  { city: "Paris", country: "France", price: "$650", image: "/imgs/paris.jpg" },
  { city: "Cape Town", country: "S. Africa", price: "$590", image: "/imgs/capetown.jpg" },
    { city: "Dubai", country: "UAE", price: "$320", image: "/imgs/dubai.jpg" },
  { city: "Istanbul", country: "Turkey", price: "$450", image: "/imgs/turkey.jpg" },
  { city: "Makkah", country: "Saudi", price: "$280", image: "/imgs/makkah.jpg" },
  { city: "Paris", country: "France", price: "$650", image: "/imgs/paris.jpg" },
  { city: "Cape Town", country: "S. Africa", price: "$590", image: "/imgs/capetown.jpg" },
];

export default function FlightDestinations() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black py-24 text-slate-900 dark:text-white transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#E68213]/10 dark:bg-[#E68213]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#0070A1]/10 dark:bg-[#0070A1]/20 blur-[120px] pointer-events-none" />

      {/* Wapsi Side Spacing (Container) */}
      <div className="container relative z-10 mx-auto px-6 lg:px-16">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="mb-3 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E68213]">
              Popular Destinations
            </span>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tighter">
              Worlds Most
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent italic"> Beautiful Flights</span>
            </h2>
          </div>
          
          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-2">
            <button onClick={scrollPrev} className="p-3 rounded-full border border-black/10 dark:border-white/10 hover:bg-[#E68213] hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollNext} className="p-3 rounded-full border border-black/10 dark:border-white/10 hover:bg-[#E68213] hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* SLIDER VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4"> {/* Side gap management */}
            {destinations.map((item, index) => (
              <div 
                key={index} 
                // LG: 20% width for 5 cards per row
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_20%] pl-4"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative h-full overflow-hidden rounded-[24px] border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 backdrop-blur-xl transition-all duration-500"
                >
                  {/* IMAGE PART */}
                  <div className="relative h-[220px] overflow-hidden">
                    <img src={item.image} alt={item.city} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                      {item.price}
                    </div>
                  </div>

                  {/* CONTENT PART - Reduced Text */}
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#E68213] font-bold">
                      <MapPin size={10} />
                      <span className="truncate">{item.country}</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{item.city}</h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-gray-400 line-clamp-1">
                      Premium flights to {item.city}.
                    </p>
                    
                    <button className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-500">
                      Book
                      <ArrowRight size={14} className="transition-transform duration-500 group-hover/button:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
