"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Utensils, Send, MessageCircle, ArrowLeft, ArrowRight, Compass, Star, FileText, Hotel } from "lucide-react";
import { useHolidayPackages } from "@/hooks/useHolidayPackages"; 
import { ImSpinner9 } from "react-icons/im";
export default function HolidayCards() {
   const { packages, loading, error } = useHolidayPackages({ type: "HOLIDAY" });
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [isHovered, setIsHovered] = useState(false);
  
  const sliderRef = useRef(null);

  // 1. Automatic Autoplay Loop Hook Protocol
  useEffect(() => {
    if (isHovered) return; // Slider stops sliding if user hovers on it

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        
        // If slider reaches end, return back to first card frame
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Slide by one card element width ratio
          sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // 2. Manual Navigation Slider Controls
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const whatsappNumber = "923124928496"; 

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = `Hi, I am interested in ${selected.title} (${selected.price}).`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry Sent Successfully!");
    setForm({ name: "", phone: "", message: "" });
    setSelected(null);
  };

   if (loading) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500">
        
        <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 animate-pulse">
        <ImSpinner9 className='animate-spin text-4xl text-orange-600 text-center' />
          Loading Holiday Packages...
        </p>
      </div>
    );
  }

  // ================= ERROR STATE HANDLER =================
  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center bg-white dark:bg-[#01080C] text-red-500 font-medium">
        Error loading packages. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-12 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500">
      <div className="w-full max-w-[100vw] mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* ================= HEADER WITH CONNECTED CONTROLS ================= */}
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-3xl text-left">
  {/* TOP BADGE */}
  <span className="mb-3 inline-flex rounded-full bg-[#E68213]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68213]">
    Popular Packages
  </span>

  {/* MAIN TITLE WITH SEAMLESS 2026-2027 GRADIENT */}
  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight  leading-tight">
    Our Featured {" "}
    <span className="text-2xl sm:text-4xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent   font-mono">
      Packages 2026 - 2027
    </span>
  </h2>

  {/* HIGHLY COMPACT SEO PARAGRAPH */}
  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
    Discover the world with our top-rated holiday packages. 
    We design all-inclusive travel offers featuring flights, hotels, tours, 
    and transfers under one seamless booking. From luxury island villas to pocket-friendly adventures, 
    our custom itineraries turn travel dreams into reality.
  </p>
</div>

          
          {/* Active Navigation Control Triggers */}
          <div className="flex gap-2">
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
          className="flex w-full overflow-x-auto gap-4
           pb-6 scrollbar-hide snap-x snap-mandatory px-2 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelected(pkg)}
              className="cursor-pointer group flex flex-col h-[460px] w-[85vw]  min-w-[290px] sm:w-[320px] sm:min-w-[320px] lg:w-[340px] lg:min-w-[340px]  shrink-0 snap-center rounded-[24px] overflow-hidden bg-white dark:bg-white/[0.02]  border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl  transition-all duration-300"
            >
              {/* Card Thumbnail Area */}
              <div className="h-60 relative w-full overflow-hidden">
                <Image
  src={pkg.images?.[0]?.url? `/${pkg.images[0].url.replace(/^\/+/, "")}`: "/placeholder.jpg"}
  alt={pkg.title}
  fill
/>
                <div className="absolute top-3 right-3  backdrop-blur-md px-3 p-2 rounded-full border border-white/10 text-white text-[11px] font-black tracking-wide bg-[#f6931f] ">
                  {pkg.duration} DAYS
                </div>
              </div>

              {/* Card Description Data Block */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F6931F] flex items-center gap-1 mb-1">
                    <Compass size={11} /> {pkg.location}
                  </p>
                  <h3 className="font-black text-xl text-slate-900 dark:text-white tracking-tight mb-2 truncate">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                    {pkg.shortDesc}
                  </p>
                </div>

                <div className="mt-4">
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#D57E1B] to-[#00618C] hover:from-[#F6931F] hover:to-[#0070A1] text-white text-xs font-black uppercase tracking-widest shadow-md hover:shadow-xl transition-all duration-300">
                    View Package <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SYMMETRIC POPUP INQUIRY MODAL ================= */}
     <AnimatePresence>
  {selected && (
    <motion.div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelected(null)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#080E12] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-48 md:h-full min-h-[240px]">
          <Image
            src={
              selected?.images?.[0]?.url
                ? `/${selected.images[0].url.replace(/^\/+/, "")}`
                : "/placeholder.jpg"
            }
            alt={selected?.title || "image"}
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full text-white z-20"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 flex flex-col justify-between bg-white dark:bg-[#01080C]">
          <div>
            <span className="bg-[#0070A1]/10 text-[#0070A1] dark:bg-white/10 dark:text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              Exclusive Packages Route Details
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-2">
              {selected.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mt-1">
              <MapPin size={14} className="text-[#0070A1]" /> {selected.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mt-1">
              <MapPin size={14} className="text-[#0070A1]" /> {selected.shortDesc}
            </p>
            
            {/* Added Attractive Perks Section */}
            <div className="mt-3 grid grid-cols-2 gap-2 bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/[0.04] p-3 rounded-xl">
              <div className="flex items-center gap-2 bg-white dark:bg-white/[0.03] p-2 rounded-lg border border-slate-100 dark:border-white/[0.05] shadow-sm">
                <div className="p-1 rounded-md bg-[#0070A1]/10 dark:bg-white/10 text-[#0070A1] dark:text-white">
                  <FileText size={14} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Visa Assistance</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-white/[0.03] p-2 rounded-lg border border-slate-100 dark:border-white/[0.05] shadow-sm">
                <div className="p-1 rounded-md bg-[#0070A1]/10 dark:bg-white/10 text-[#0070A1] dark:text-white">
                  <Compass size={14} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Travel Guide</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-white/[0.03] p-2 rounded-lg border border-slate-100 dark:border-white/[0.05] shadow-sm">
                <div className="p-1 rounded-md bg-[#F6931F]/10 text-[#F6931F]">
                  <Utensils size={14} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Meals Included</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-white/[0.03] p-2 rounded-lg border border-slate-100 dark:border-white/[0.05] shadow-sm">
                <div className="p-1 rounded-md bg-[#F6931F]/10 text-[#F6931F]">
                  <Hotel size={14} />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Hotel Provided</span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05] space-y-1">
              <p className="text-xs font-semibold text-slate-700 dark:text-white/80">{selected.advantage}</p>
              <p className="text-[11px] flex items-center gap-1 text-slate-500 dark:text-white/60">
                <Star size={12} className="text-[#F6931F]" /> {selected.star}
              </p>
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-[11px] font-medium text-slate-400">Starting From:</span>
              <p className="text-2xl font-black text-[#F6931F]">£{selected.price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5 border-t border-slate-100 dark:border-white/[0.05] pt-3">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#F6931F]"
            />
            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone Number (WhatsApp preferred)"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#F6931F]"
            />
            <textarea
              name="message"
              rows={2}
              placeholder="Any special request?"
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#F6931F] resize-none"
            />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button type="submit" className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#F6931F] hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider transition-colors">
                <Send size={12} /> Email
              </button>
              <button type="button" onClick={handleWhatsApp} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#25D366] hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider transition-colors">
                <MessageCircle size={12} /> WhatsApp
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
