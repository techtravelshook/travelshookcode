"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, MessageCircle, ArrowLeft, ArrowRight, Compass, Calendar, BadgePercent } from "lucide-react";

const packages = [
  { 
    id: 1, 
    title: "14 Nights 5 Star Ramadan Package", 
    location: "Makkah & Madinah", 
    advantage: "Experience the peak blessings of Ramadan with luxury stays near the holy mosques. Features direct transfers and guided support throughout your spiritual journey.", 
    meal: "Suhoor & Iftar Included", 
    price: "£1,280", 
    days: 14, 
    image: "/imgs/hajj/hajj1.jpg",
    details: "Makkah Hotel: Pullman ZamZam Makkah (7 Nights) | Madinah Hotel: Crowne Plaza Madinah (7 Nights). Fully inclusive of private transport, visa documentation processing, and religious guides."
  },
  { 
    id: 2, 
    title: "14 Nights Luxury Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Embark on an elite, completely premium pilgrimage during the sacred month with top-tier elite hospitality services close to the holy sanctuaries.", 
    meal: "Full Board Premium", 
    price: "£970", 
    days: 14, 
    image: "/imgs/hajj/hajj2.jpg",
    details: "Makkah Hotel: Dorrar Aleiman Royal (7 Nights) | Madinah Hotel: Madinah Hilton (7 Nights). Includes full round-trip transport logistics, dedicated guide assistance, and flight booking adjustments."
  },
  { 
    id: 3, 
    title: "7 Nights 3 Star Ramadan Package", 
    location: "Makkah & Madinah", 
    advantage: "A budget-friendly yet spiritually immersive short-stay package curated carefully for your seamless Taraweeh and spiritual sessions.", 
    meal: "Suhoor Included", 
    price: "£899", 
    days: 7, 
    image: "/imgs/hajj/hajj3.jpg",
    details: "Makkah Hotel: Emaar Al Manar Hotel Makkah (4 Nights) | Madinah Hotel: Hayah Al Waha Hotel (3 Nights). Includes group airport transfers, visa tracking updates, and flights."
  },
  { 
    id: 4, 
    title: "10 Nights 3 Star Ramadan Package", 
    location: "Makkah & Madinah", 
    advantage: "Spend a beautiful ten nights performing holy rituals in the sanctuary with an affordable itinerary structured for independent pilgrims or families.", 
    meal: "Breakfast Buffet", 
    price: "£960", 
    days: 10, 
    image: "/imgs/hajj/hajj4.jpg",
    details: "Makkah Hotel: Emaar Al Khalil Hotel (5 Nights) | Madinah Hotel: Golden Tulip Al Shakreen (5 Nights). Includes standard transport transfers, fast-track electronic visa, and airfare support."
  },
  { 
    id: 5, 
    title: "14 Nights 3 Star Ramadan Package", 
    location: "Makkah & Madinah", 
    advantage: "An extended, value-packed economic itinerary ideal for spending half of the holy month within Makkah and Madinah's peaceful environment.", 
    meal: "Suhoor / Breakfast", 
    price: "£1,060", 
    days: 14, 
    image: "/imgs/hajj/hajj4.jpg",
    details: "Makkah Hotel: Elaf Ajyad Hotel Makkah (7 Nights) | Madinah Hotel: Mirage Al Salam Hotel (7 Nights). Fully inclusive of multi-city ground transportation, professional tour guides, and air tickets."
  },
  { 
    id: 6, 
    title: "3 Star 7 Nights Budget Umrah Deal", 
    location: "Makkah & Madinah", 
    advantage: "Perfect short-term express package providing standard comfortable accommodations at highly competitive economy pricing metrics.", 
    meal: "Meals Available On-Demand", 
    price: "£599", 
    days: 7, 
    image: "/imgs/hajj/hajj5.jpg",
    details: "Makkah Hotel: Emaar Al Khalil Hotel (4 Nights) | Madinah Hotel: Emaar Taibah Hotel (3 Nights). Standard economy package detailing basic ground logistics setup, flights, and travel visas."
  }
];

export default function HajjCards() {
  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const sliderRef = useRef(null);
  const whatsappNumber = "923124928496"; 

  // Dynamic step width check function for smooth slide transitions
  const getScrollAmount = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".package-card-item");
      if (card) {
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 0;
        return card.clientWidth + marginRight;
      }
    }
    return 340;
  };

  // 1. Automatic Autoplay Loop Hook Protocol
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const scrollAmount = getScrollAmount();
        
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // 2. Manual Navigation Slider Controls
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = getScrollAmount();
      const finalAmount = direction === "left" ? -scrollAmount : scrollAmount;
      sliderRef.current.scrollBy({ left: finalAmount, behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = `Hi, I am interested in booking the "${selected.title}" package.
📍 Location: ${selected.location}
⏳ Duration: ${selected.days} Days
🍽️ Meal Plan: ${selected.meal}
💰 Price: ${selected.price}

Please share more details. Thanks!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="py-12 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500">
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        
        {/* ================= HEADER WITH CONNECTED CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-4xl text-left">
            <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
              Popular Packages
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
              Most Searched Hajj{" "}
              <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent italic ml-1 font-serif normal-case">
                Packages 2026 - 2027
              </span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block whitespace-normal">
              At Travelshook, we design Ramadan Umrah Packages with flights, luxury hotel accommodations, convenient transfers, expert advice and more for the ultimate convenience in your pilgrimage.
            </p>
          </div>
          
          <div className="flex gap-2 self-end sm:self-auto">
            <button 
              onClick={() => handleScroll("left")}
              className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-800 dark:hover:text-white active:scale-90"
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={() => handleScroll("right")}
              className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-800 dark:hover:text-white active:scale-90"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ================= RESPONSIVE AUTOPLAY SLIDER CAROUSEL ROW ================= */}
        <div 
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex w-full overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x snap-mandatory px-1 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelected(pkg)}
              className="package-card-item cursor-pointer group flex flex-col h-[470px] 
              w-full min-w-[100%] sm:w-[320px] sm:min-w-[320px] lg:w-[340px] lg:min-w-[340px] 
              shrink-0 snap-center rounded-[24px] overflow-hidden bg-white dark:bg-white/[0.02] 
              border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl 
              transition-all duration-300"
            >
              {/* Card Thumbnail Area */}
              <div className="h-56 relative w-full overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 backdrop-blur-md px-3 p-2 rounded-full border border-white/10 text-white text-[11px] font-black tracking-wide bg-gradient-to-r from-[#F6931F] to-[#0070A1]">
                  {pkg.days} Days
                </div>
              </div>

              {/* Card Description Data Block */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F6931F] flex items-center gap-1 mb-1">
                    <Compass size={12} /> {pkg.location}
                  </p>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight whitespace-normal group-hover:text-[#0070A1] transition-colors leading-snug h-[44px] line-clamp-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed whitespace-normal">
                    {pkg.advantage}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3 mt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">From</span>
                    <span className="text-xl font-black text-[#0070A1] dark:text-white">{pkg.price}</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] dark:bg-white/5 text-white dark:text-white/80 group-hover:bg-[#0070A1] group-hover:text-white transition-colors">
                    View Plan
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MODAL POPUP SYSTEM ================= */}
        <AnimatePresence>
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl overflow-hidden bg-white dark:bg-[#020d14] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col md:flex-row"
              >
                <div className="relative w-full h-48 md:h-auto md:w-1/2 min-h-[260px]">
                  <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white p-2 right-4">
                    <span className="bg-[#F6931F] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {selected.location}
                    </span>
                    <h3 className="text-xl font-black mt-2 uppercase tracking-wide drop-shadow-md whitespace-normal leading-snug">
                      {selected.title}
                    </h3>
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-white dark:bg-[#020d14]">
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white transition-colors">
                    <X size={18} />
                  </button>

                  <div className="mt-2">
                    <h4 className="text-xs uppercase font-bold text-[#0070A1] tracking-wider mb-2">Package Overview</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-white/70 font-medium mb-4 whitespace-normal">
                      {selected.advantage}
                    </p>

                    <div className="space-y-3 mb-5 bg-slate-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-left">
                      <div className="flex items-start gap-3 text-slate-700 dark:text-white/90">
                        <Calendar size={16} className="text-[#F6931F] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold whitespace-normal">Duration: {selected.days} Days / {selected.days - 1} Nights</span>
                      </div>
                      <div className="flex items-start gap-3 text-slate-700 dark:text-white/90">
                        <Utensils size={16} className="text-[#F6931F] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold whitespace-normal">Meal Option: {selected.meal}</span>
                      </div>
                      {selected.details && (
                        <div className="flex items-start gap-3 text-slate-700 dark:text-white/90">
                          <Compass size={16} className="text-[#0070A1] shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-500 dark:text-white/60 leading-relaxed whitespace-normal">
                            {selected.details}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-700 dark:text-white/90 border-t border-slate-200/60 dark:border-white/5 pt-2.5 mt-1">
                        <BadgePercent size={16} className="text-[#0070A1]" />
                        <span className="text-xs font-bold">Total Price: <span className="text-sm font-black text-[#0070A1] dark:text-[#F6931F]">{selected.price}</span> <span className="text-[10px] font-normal text-slate-400">/ person</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full mt-2">
                    <button
                      onClick={handleWhatsApp}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.98]"
                    >
                      <MessageCircle size={18} fill="white" />
                      Book via WhatsApp
                    </button>
                    
                    <button
                      onClick={() => alert(`Redirecting to Full Explore View of ${selected.title}...`)}
                      className="w-full py-3 bg-[#0070A1] hover:bg-[#005e88] text-white font-bold text-sm rounded-xl transition-all text-center active:scale-[0.98]"
                    >
                      Explore Full Package Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
