"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Clock, Users, MapPin, Shield, Send, CalendarDays, Star,
  MessageCircle, ArrowRight, ArrowLeft, Utensils, LayoutGrid,
  List, Zap, CheckCircle2, Lock, BadgeCheck
} from "lucide-react";

/* ================= DATA ARRAY ================= */
const tourPackages = [
  {
    id: 1,
    flightBadge: "✈ By Air",
    urgencyTag: "Limited Seats",
    category: "Adventure · Desert",
    subtitle: "5-Day Premium Arabian Getaway",
    title: "Lahore to Dubai",
    image: "/imgs/dubai.jpg",
    location: "Dubai, UAE",
    duration: "4 Nights in Oct",
    groupSize: "2–20 Pax",
    tier: "Standard & Deluxe",
    plan: "All-Inclusive",
    highlights: ["Burj Khalifa Observation Deck", "Premium Desert Safari & BBQ", "Dubai Mall & Fountain Show"],
    originalPrice: "480",
    discountedPrice: "420",
    rating: 4,
    reviewsCount: 10,
    inclusions: { visa: true, guide: true, meals: true, hotel: true }
  },
  {
    id: 2,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Seller",
    category: "Luxury · Romantic",
    subtitle: "7-Day European Romance Escape",
    title: "Paris to France",
    image: "/imgs/nepal.jpg",
    location: "Paris, France",
    duration: "3 Nights in Nov",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Eiffel Tower Summit Access", "Guided Louvre Museum Tour", "Scenic Seine River Dinner Cruise"],
    originalPrice: "400",
    discountedPrice: "380",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true }
  },
  {
    id: 3,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Historic",
    subtitle: "6-Day Imperial Heritage Voyage",
    title: "Rome to Italy",
    image: "/imgs/capetown.jpg",
    location: "Rome, Italy",
    duration: "5 Nights In Oct",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Colosseum Arena Tour", "Vatican Museums Guide", "Trevi Fountain Walk"],
    originalPrice: "500",
    discountedPrice: "490",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true }
  },
  {
    id: 4,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Tropical",
    subtitle: "7-Day Island Paradise Escape",
    title: "Bali to Indonesia",
    image: "/imgs/paris.jpg",
    location: "Bali, Indonesia",
    duration: "6 Nights In Dec",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Ubud Monkey Forest", "Tanah Lot Temple", "Uluwatu Sunset Dance"],
    originalPrice: "799",
    discountedPrice: "750",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true }
  },
  {
    id: 5,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Urban",
    subtitle: "5-Day Metropolitan Skyline Tour",
    title: "New York to USA",
    image: "/imgs/paris.jpg",
    location: "New York, USA",
    duration: "4 Nights In Nov",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Statue of Liberty", "Times Square Night", "Empire State View"],
    originalPrice: "680",
    discountedPrice: "610",
    rating: 4,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true }
  },
  {
    id: 6,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Exotic",
    subtitle: "7-Day Ultra-Luxury Lagoon Stay",
    title: "Maldives Luxury Resort",
    image: "/imgs/paris.jpg",
    location: "Malé, Maldives",
    duration: "6 Nights In Jan",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Overwater Villa Stay", "Coral Reef Snorkeling", "Sunset Dolphin Cruise"],
    originalPrice: "799",
    discountedPrice: "750",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true }
  }
];

/* ================= STAR RATING ================= */
function StarRow({ rating, reviewsCount, size = 11 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rating ? "fill-amber-400 stroke-none" : "fill-slate-200 dark:fill-white/10 stroke-none"}
          />
        ))}
      </div>
      <span className="text-[9px] text-slate-400 font-bold">({reviewsCount})</span>
    </div>
  );
}

/* ================= INCLUSION BADGES ================= */
function InclusionBadges({ inclusions }) {
  const items = [
    { key: "visa",  label: "Visa" },
    { key: "guide", label: "Guide" },
    { key: "meals", label: "Meals" },
    { key: "hotel", label: "Hotel" },
  ];
  return (
    <div className="flex flex-wrap gap-1">
      {items.filter(i => inclusions[i.key]).map(i => (
        <span key={i.key} className="flex items-center gap-1 text-[9px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-2 py-0.5 rounded-full">
          <CheckCircle2 size={9} /> {i.label}
        </span>
      ))}
    </div>
  );
}

/* ================= GRID CARD ================= */
function GridCard({ pkg, onSelect }) {
  const discount = pkg.originalPrice && pkg.discountedPrice
    ? Math.round((1 - Number(pkg.discountedPrice.replace(/,/g, "")) / Number(pkg.originalPrice.replace(/,/g, ""))) * 100)
    : null;

  return (
    <motion.div
      onClick={() => onSelect(pkg)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative flex flex-col rounded-[22px] overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl hover:border-[#F6931F]/40 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-max-8xl h-52 overflow-hidden shrink-0">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <span className="bg-black/60 border border-white/10 backdrop-blur-sm text-white text-[9px] px-2.5 py-1 rounded-full font-bold">
            {pkg.flightBadge}
          </span>
          <span className="bg-[#F6931F] text-white text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
            {pkg.urgencyTag}
          </span>
        </div>

        {/* Discount pill */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow">
            -{discount}% OFF
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/5 font-bold z-10">
          <MapPin size={10} className="text-[#F6931F]" /> {pkg.location}
        </div>

        {/* Rating overlay bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <StarRow rating={pkg.rating} reviewsCount={pkg.reviewsCount} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <span className="text-[13px] uppercase tracking-widest text-[#0070A1] font-bold block mb-0.5">
            {pkg.subtitle}
          </span>
          <h2 className="text-base font-black text-[22px] text-slate-900 dark:text-white group-hover:text-[#F6931F] transition uppercase line-clamp-1 leading-tight">
            {pkg.title}
          </h2>
          <p className="text-[15px] text-slate-400 font-medium mt-0.5">{pkg.category}</p>
        </div>

        {/* Info chips */}
        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">📅 {pkg.duration}</span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">👥 {pkg.groupSize}</span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">🏨 {pkg.tier}</span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">🍽 {pkg.plan}</span>
        </div>

        {/* Inclusions */}
        <InclusionBadges inclusions={pkg.inclusions} />
      </div>

      {/* Price + CTA footer */}
      <div className="px-4 pb-4 flex items-center justify-between border-t border-slate-100 dark:border-white/[0.05] pt-3">
        <div>
          <p className="line-through text-[10px] font-bold text-slate-400 font-mono">£ {pkg.originalPrice}</p>
          <p className="text-xl font-black text-[#F6931F] tracking-tight leading-none">£ {pkg.discountedPrice}</p>
          <p className="text-[9px] text-green-600 font-bold mt-0.5">✔ Instant Confirmation</p>
        </div>
        <button className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D57E1B] to-[#00618C] hover:from-[#F6931F] hover:to-[#0070A1] text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all duration-300">
          View Details <ArrowRight size={11} />
        </button>
      </div>
    </motion.div>
  );
}

/* ================= LIST CARD ================= */
function ListCard({ pkg, onSelect }) {
  const discount = pkg.originalPrice && pkg.discountedPrice
    ? Math.round((1 - Number(pkg.discountedPrice.replace(/,/g, "")) / Number(pkg.originalPrice.replace(/,/g, ""))) * 100)
    : null;

  return (
    <motion.div
      onClick={() => onSelect(pkg)}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative flex flex-col sm:flex-row w-full rounded-[22px] overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl hover:border-[#F6931F]/40 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full sm:w-[220px] h-52 sm:h-auto shrink-0 overflow-hidden">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/40" />

        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <span className="bg-black/60 border border-white/10 backdrop-blur-sm text-white text-[9px] px-2.5 py-1 rounded-full font-bold">
            {pkg.flightBadge}
          </span>
          <span className="bg-[#F6931F] text-white text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
            {pkg.urgencyTag}
          </span>
        </div>

        {discount > 0 && (
          <div className="absolute bottom-3 left-3 z-10 bg-green-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow">
            -{discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div className="space-y-2">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#0070A1] font-bold">{pkg.subtitle}</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-[#F6931F] transition uppercase line-clamp-1 leading-tight mt-0.5">
              {pkg.title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                <MapPin size={10} className="text-[#F6931F]" /> {pkg.location}
              </span>
              <span className="text-slate-200 dark:text-white/10">|</span>
              <span className="text-[10px] text-slate-400 font-medium">{pkg.category}</span>
            </div>
          </div>

          {/* Info row */}
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">📅 {pkg.duration}</span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">👥 {pkg.groupSize}</span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">🏨 {pkg.tier}</span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">🍽 {pkg.plan}</span>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            {pkg.highlights.map((h, i) => (
              <span key={i} className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#F6931F] inline-block" /> {h}
              </span>
            ))}
          </div>

          <InclusionBadges inclusions={pkg.inclusions} />
        </div>
      </div>

      {/* Price panel */}
      <div className="sm:w-[190px] shrink-0 p-5 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 bg-slate-50/60 dark:bg-white/[0.01] border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-white/5">
        <div className="text-left sm:text-center space-y-1">
          <p className="line-through text-[10px] font-bold text-slate-400 font-mono">£ {pkg.originalPrice}</p>
          <p className="text-2xl font-black text-[#F6931F] tracking-tight leading-none">£ {pkg.discountedPrice}</p>
          <p className="text-[9px] text-green-600 font-bold">✔ Instant Confirmation</p>
          <p className="text-[9px] text-slate-400 dark:text-white/30 font-semibold">💬 WhatsApp Available</p>
        </div>
        <div className="flex flex-col items-end sm:items-center gap-2">
          <StarRow rating={pkg.rating} reviewsCount={pkg.reviewsCount} />
          <button className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D57E1B] to-[#00618C] hover:from-[#F6931F] hover:to-[#0070A1] text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all duration-300">
            View Deal <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= MAIN PAGE ================= */
export default function HolidayPackages() {
  const [selected, setSelected]   = useState(null);
  const [viewMode, setViewMode]   = useState("grid"); // "grid" | "list" | "scroll"
  const [activeTab, setActiveTab] = useState("Overview");
  const [form, setForm]           = useState({ name: "", phone: "", message: "" });
// for mobile screen view

const [currentIndex, setCurrentIndex] = useState(0);

const prevCard = () => setCurrentIndex((i) => Math.max(0, i - 1));
const nextCard = () => setCurrentIndex((i) => Math.min(tourPackages.length - 1, i + 1));


  const sliderRef = useRef(null);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: direction === "left" ? -380 : 380, behavior: "smooth" });
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const whatsappNumber = "923124928496";

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = `Hi, I am interested in the *${selected.title}* package priced at £${selected.discountedPrice}.\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry sent successfully!");
    setForm({ name: "", phone: "", message: "" });
    setSelected(null);
  };

  const VIEW_MODES = [
    { id: "grid",   label: "Grid",   icon: <LayoutGrid size={16} /> },
    { id: "list",   label: "List",   icon: <List size={16} /> },
   ,
  ];

  return (
    <section className="w-full py-14 bg-slate-50 dark:bg-[#01080C] transition-colors duration-500">
      <div className="w-full max-w-12xl mx-auto px-4 sm:px-12 ">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
          <div className="max-w-8xl text-left">
            <span className="mb-3 inline-flex rounded-full bg-[#E68213]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68213]">
              Trending Deals
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
              Best Budget Holiday{" "}
              <span className="text-2xl sm:text-4xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent ml-1 font-serif">
                Tours & Packages
              </span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Explore your favorite locations with our top all-inclusive holiday offers featuring flights, premium hotels, guided tours, and swift transport execution tailored for smart travellers.
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-1 self-start md:self-auto shadow-sm">
            {VIEW_MODES.map((v) => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  viewMode === v.id
                    ? "bg-gradient-to-r from-[#F6931F] to-[#0070A1] text-white shadow-md"
                    : "text-slate-400 dark:text-white/40 hover:text-slate-700 dark:hover:text-white"
                }`}
              >
                {v.icon} <span className="hidden sm:inline">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

      

        {/* ── GRID VIEW ─────────────────────────────────────── */}
       {viewMode === "grid" && (
  <div>
    {/* Mobile: single card + arrows */}
    <div className="sm:hidden">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <GridCard pkg={tourPackages[currentIndex]} onSelect={setSelected} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows + counter */}
      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#F6931F] hover:text-[#F6931F] transition-all shadow-sm"
        >
          <ArrowLeft size={13} /> Prev
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {tourPackages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-5 h-2 bg-[#F6931F]"
                  : "w-2 h-2 bg-slate-300 dark:bg-white/20 hover:bg-[#F6931F]/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          disabled={currentIndex === tourPackages.length - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#F6931F] hover:text-[#F6931F] transition-all shadow-sm"
        >
          Next <ArrowRight size={13} />
        </button>
      </div>
    </div>

    {/* Tablet/Desktop: normal grid */}
    <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {tourPackages.map((pkg, i) => (
        <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
          <GridCard pkg={pkg} onSelect={setSelected} />
        </motion.div>
      ))}
    </div>
  </div>
)}

        {/* ── LIST VIEW ─────────────────────────────────────── */}
        {viewMode === "list" && (
          <div className="flex flex-col gap-5">
            {tourPackages.map((pkg, i) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <ListCard pkg={pkg} onSelect={setSelected} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL ─────────────────────────────────────────────── */}
      <AnimatePresence>
  {selected && (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelected(null)}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-7xl bg-white dark:bg-[#0A1118] border border-white/10 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col lg:flex-row"
      >
        {/* Left: Media Section */}
        <div className="relative lg:w-[46%] shrink-0 min-h-[260px] lg:min-h-0 flex flex-col justify-end overflow-hidden">
          <Image
            src={selected.image}
            alt={selected.title}
            fill
            className="object-cover"
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 backdrop-blur-md p-3 rounded-2xl text-white transition-all hover:scale-105 z-30"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* Badges */}
          <div className="absolute top-6 left-6 flex gap-2 z-20">
            <span className="bg-black/70 border border-white/20 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-2xl font-semibold shadow-lg">
              {selected.flightBadge}
            </span>
            <span className="bg-gradient-to-r from-[#F6931F] to-orange-600 text-white text-xs px-3.5 py-1.5 rounded-2xl font-bold uppercase tracking-widest shadow-lg">
              {selected.urgencyTag}
            </span>
          </div>

          {/* Info Overlay */}
          <div className="relative z-10 p-8 pb-9">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold uppercase tracking-[2px] px-4 py-2 rounded-2xl mb-3">
              {selected.subtitle}
            </span>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter mb-3">
              {selected.title}
            </h2>

            <p className="text-white/80 flex items-center gap-2 text-lg mb-5">
              <MapPin size={20} className="text-[#F6931F]" /> {selected.location}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="line-through text-white/40 text-sm font-medium">
                  £{selected.originalPrice}
                </p>
                <p className="text-4xl font-black text-[#F6931F] tracking-tighter">
                  £{selected.discountedPrice}
                </p>
              </div>

              <StarRow
                rating={selected.rating}
                reviewsCount={selected.reviewsCount}
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col bg-white dark:bg-[#0A1118] min-h-0">
          {/* Tab Bar */}
          <div className="flex border-b border-slate-100 dark:border-white/10 px-8 flex-shrink-0">
            {["Overview", "Inquire"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-5 px-6 text-sm font-semibold border-b-2 transition-all relative -mb-px ${
                  activeTab === tab
                    ? "border-[#F6931F] text-[#F6931F]"
                    : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeTab === "Overview" && (
              <div className="space-y-8">
                {/* Highlights */}
                <div>
                  <p className="uppercase text-xs tracking-[2px] font-bold text-slate-400 dark:text-slate-500 mb-4">
                    Highlights
                  </p>
                  <div className="space-y-3">
                    {selected.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-4"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#F6931F] mt-2.5 shrink-0" />
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <InclusionBadges inclusions={selected.inclusions} />

                {/* Tier & Plan */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Tier</p>
                    <p className="font-bold text-xl mt-1 text-slate-800 dark:text-white">
                      {selected.tier}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Plan</p>
                    <p className="font-bold text-xl mt-1 text-slate-800 dark:text-white">
                      {selected.plan}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Inquire" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Fill in your details and we&apos;ll get back to you within 2 hours.
                </p>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F]/30 outline-none transition-all text-sm"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F]/30 outline-none transition-all text-sm"
                />

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Any special requests or modifications required?"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F]/30 outline-none transition-all text-sm resize-none"
                />

                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 pt-2">
                  <Lock size={14} />
                  Your details are private and won&apos;t be shared.
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#F6931F] hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.985] shadow-lg shadow-orange-600/30"
                  >
                    <Send size={17} /> Send Inquiry
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.985]"
                  >
                    <MessageCircle size={17} /> WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}