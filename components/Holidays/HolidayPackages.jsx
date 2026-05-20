"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Users, MapPin, Shield, Send, CalendarDays, Star, MessageCircle, ArrowRight, ArrowLeft, Utensils } from "lucide-react";

/* ================= DATA ARRAY ================= */
const tourPackages = [
  {
    id: 1,
    flightBadge: "✈ By Air",
    urgencyTag: "Limited Seats",
    category: "Adventure · Desert",
    subtitle: "5-Day Aerial Package",
    title: "Skardu & Katpana Desert",
    image: "/imgs/dubai.jpg",
    location: "Gilgit, Pakistan",
    duration: "6 Days · 5 Nights",
    groupSize: "2–20 Pax",
    tier: "Standard & Deluxe",
    plan: "All-Inclusive",
    highlights: ["Katpana Cold Desert Tour", "Shangrila Resort Excursion", "Satpara Lake Boat Cruise"],
    originalPrice: "115,000",
    discountedPrice: "110,000",
    rating: 5,
    reviewsCount: 10,
  },
  {
    id: 2,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Seller",
    category: "Luxury · Mountain",
    subtitle: "7-Day Luxury Getaway",
    title: "Hunza Valley & Attabad",
    image: "/imgs/nepal.jpg",
    location: "Hunza, Pakistan",
    duration: "8 Days · 7 Nights",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Attabad Lake Boating", "Eagle's Nest Viewpoint", "Baltit Fort Heritage Walk"],
    originalPrice: "165,000",
    discountedPrice: "155,000",
    rating: 5,
    reviewsCount: 18,
  },
  {
    id: 3,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Desert",
    subtitle: "7-Day Luxury Getaway",
    title: "Swat & Kalam Valley Tour",
    image: "/imgs/capetown.jpg",
    location: "Swat, Pakistan",
    duration: "8 Days · 7 Nights",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Kalam Forest Exploration", "Mahodand Lake Excursion", "Malam Jabba Ski Resort"],
    originalPrice: "215,000",
    discountedPrice: "195,000",
    rating: 5,
    reviewsCount: 18,
  },
  {
    id: 4,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Desert",
    subtitle: "7-Day Luxury Getaway",
    title: "Neelum Valley Paradise",
    image: "/imgs/paris.jpg",
    location: "Azad Kashmir",
    duration: "8 Days · 7 Nights",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Kutton Waterfall Visit", "Keran Line of Control View", "Sharda Peeth Heritage"],
    originalPrice: "185,000",
    discountedPrice: "175,000",
    rating: 5,
    reviewsCount: 18,
  },
];

/* ================= DYNAMIC HORIZONTAL SPLIT CARD ================= */
function TourCard({ pkg, onSelect }) {
  return (
    <motion.div
      onClick={() => onSelect(pkg)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative flex flex-col md:flex-row w-[85vw] min-w-[280px] sm:w-[450px] sm:min-w-[450px] lg:w-full lg:min-w-0 snap-center rounded-[26px] overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl hover:border-[#F6931F]/40 transition-all duration-500 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative w-full md:w-[42%] h-60 md:h-auto min-h-[260px] overflow-hidden shrink-0">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-black/40" />

        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-black/70 border border-white/10 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">
            {pkg.flightBadge}
          </span>
          <span className="bg-[#F6931F] text-white text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
            {pkg.urgencyTag}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/5 font-bold">
          <MapPin size={12} className="text-[#F6931F]" />
          {pkg.location}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-white dark:bg-[#01080C]/10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#0070A1] font-bold block mb-1">
            {pkg.subtitle}
          </span>

          <h2 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#F6931F] transition uppercase line-clamp-1">
            {pkg.title}
          </h2>

          <p className="text-[11px] text-slate-400 font-medium mt-1">
            {pkg.category}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] mt-4 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/[0.05] pb-3 mb-3 font-bold">
            <span className="flex items-center gap-1">📅 {pkg.duration}</span>
            <span className="flex items-center gap-1">👥 {pkg.groupSize}</span>
            <span className="flex items-center gap-1">🏨 {pkg.tier}</span>
            <span className="flex items-center gap-1">🍽 {pkg.plan}</span>
          </div>

          {/* VALUES SECTION */}
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-green-600">✔ Guided Tours & Local Expert Support</p>
            <p className="text-[11px] font-semibold text-blue-600">✔ Handpicked Premium Hotels & Rooms</p>
          </div>
        </div>
      </div>

      {/* PRICE PANEL */}
      <div className="w-full md:w-[28%] p-5 flex flex-row md:flex-col justify-between items-center bg-slate-50/60 dark:bg-white/[0.01] border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5 shrink-0 gap-4">
        
        <div className="text-left md:text-center space-y-1">
          <p className="line-through text-[10px] font-bold text-slate-400 font-mono">
            PKR {pkg.originalPrice}
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#F6931F] tracking-tight">
            PKR <span className="block md:mt-0.5 font-sans font-extrabold">{pkg.discountedPrice}</span>
          </p>
          
          <div className="hidden md:block pt-1.5 space-y-0.5 text-[9px] text-slate-400 dark:text-white/30 font-semibold">
            <p className="text-green-600">✔ Instant Confirmation</p>
            <p>💬 WhatsApp Availabe</p>
          </div>
        </div>

        <div className="flex flex-col items-end md:items-center gap-2">
          <div className="flex flex-col items-end md:items-center gap-0.5">
            <div className="flex gap-0.5">
              {[...Array(pkg.rating)].map((_, i) => (
                <Star key={i} size={11} className="fill-amber-400 stroke-none" />
              ))}
            </div>
            <span className="text-[9px] text-slate-400 font-bold">({pkg.reviewsCount} Reviews)</span>
          </div>

          <button className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D57E1B] to-[#00618C] hover:from-[#F6931F] hover:to-[#0070A1] text-white text-[11px] font-black uppercase tracking-widest shadow-md transition-all duration-300">
            View Deal <ArrowRight size={12} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}

/* ================= FULL WIDTH CONTAINER PAGE ================= */
export default function HolidayPackages() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const sliderRef = useRef(null);

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
    const msg = `Hi, I am interested in ${selected.title} package priced at PKR ${selected.discountedPrice}.`;
    window.open(`https://wa.me{whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry Sent Successfully!");
    setForm({ name: "", phone: "", message: "" });
    setSelected(null);
  };

  return (
    <section className="w-full py-14 bg-slate-50 dark:bg-[#01080C] transition-colors duration-500">
      <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-12 lg:px-20">

        {/* ================= BRAND NEW THEMED HEADER BLOCK ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl text-left">
            <span className="mb-3 inline-flex rounded-full bg-[#E68213]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68213]">
              Trending Deals
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
              Best Budget Holiday{" "}
              <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent italic ml-1 font-serif">
                Tours & Packages
              </span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Explore your favorite locations with our top all-inclusive holiday offers featuring flights, premium hotels, guided tours, and swift transport execution tailored for smart travellers.
            </p>
          </div>
          
          
         
        </div>

        {/* ================= DUAL RESPONSE MATRIX LAYOUT ROW ================= */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory lg:grid lg:grid-cols-2 lg:overflow-x-visible lg:pb-0 lg:gap-8 w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tourPackages.map((pkg) => (
            <TourCard key={pkg.id} pkg={pkg} onSelect={setSelected} />
          ))}
        </div>

      </div>

      {/* ================= REUSED POPUP DETAILED INQUIRY MODAL ================= */}
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
              {/* Media Left Column */}
              <div className="relative h-48 md:h-full min-h-[240px]">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-black/50 p-1.5 rounded-full text-white hover:bg-[#F6931F] transition-all z-20">
                  <X size={16} />
                </button>
              </div>

              {/* Form Content Right Column */}
              <div className="p-6 space-y-4 flex flex-col justify-between bg-white dark:bg-[#01080C]">
                <div>
                  <span className="bg-[#0070A1]/10 text-[#0070A1] dark:bg-white/10 dark:text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{selected.subtitle}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-2 leading-none">{selected.title}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">📍 {selected.location}</p>
                  
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-white/60 space-y-1">
                      {selected.highlights.map((item, index) => <p key={index}>• {item}</p>)}
                    </div>
                  </div>
                  <p className="text-2xl font-black text-[#F6931F] mt-3">PKR {selected.discountedPrice}</p>
                </div>

                {/* Lead Form Action triggers inputs */}
                <form onSubmit={handleSubmit} className="space-y-2.5 border-t border-slate-100 dark:border-white/[0.05] pt-3">
                  <input type="text" name="name" required placeholder="Your Full Name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#F6931F]" />
                  <input type="tel" name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#F6931F]" />
                  <textarea name="message" rows={2} placeholder="Any special requests or modifications required?" value={form.message} onChange={handleChange} className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#F6931F] resize-none" />
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button type="submit" className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#F6931F] text-white text-xs font-bold uppercase tracking-wider"><Send size={12} /> Email</button>
                    <button type="button" onClick={handleWhatsApp} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider"><MessageCircle size={12} /> WhatsApp</button>
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
