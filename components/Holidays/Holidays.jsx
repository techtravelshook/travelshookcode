"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MapPin, Star, X, Clock, Mail,
  ArrowLeft, ArrowRight, Compass, ChevronRight,
} from "lucide-react";
import Image from "next/image";

// ─── Constants ────────────────────────────────────────────────────────────────

const FLAG_MAP = {
  "Russia": "🇷🇺", "Cyprus": "🇨🇾", "Georgia / South Ossetia": "🇬🇪",
  "Georgia / Abkhazia": "🇬🇪", "Italy": "🇮🇹", "Liechtenstein": "🇱🇮",
  "San Marino": "🇸🇲", "Moldova / Transnistria": "🇲🇩", "Kosovo": "🇽🇰",
  "United Kingdom": "🇬🇧", "Romania": "🇷🇴", "Hungary": "🇭🇺",
  "Turkey": "🇹🇷", "Greece": "🇬🇷", "France": "🇫🇷",
};

const imgSrc = (url) =>
  url ? `/${url.replace(/^\/+/, "")}` : "/imgs/placeholder.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ count, size = 13 }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < count
              ? "fill-[#F6931F] stroke-[#F6931F]"
              : "fill-transparent stroke-slate-300 dark:stroke-slate-700"
          }
        />
      ))}
    </div>
  );
}

// ─── Featured Slider ──────────────────────────────────────────────────────────

function FeaturedSlider({ deals, onOpen, onBook }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = deals.length;

  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  // Autoplay
  useEffect(() => {
    if (hovered || total === 0) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [hovered, next, total]);

  if (!total) return null;

  const deal = deals[active];
  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const hero = imgSrc(deal?.images?.[0]?.url);

  return (
    <div className="mb-14">
      {/* Section label */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="inline-flex items-center gap-2 mb-2 rounded-full border border-[#F6931F]/25 bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C47A1B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F6931F]" />
            Featured Honeymoon
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Top Picks for{" "}
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">
              Romance
            </span>
          </h2>
        </div>

        {/* Dot indicators + arrows */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-1.5">
            {deals.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-[#F6931F]" : "w-1.5 bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-400 hover:bg-[#F6931F] hover:border-[#F6931F] hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-400 hover:bg-[#F6931F] hover:border-[#F6931F] hover:text-white transition-all active:scale-95"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Slide */}
      <div
        className="relative rounded-[2rem] overflow-hidden cursor-pointer"
        style={{ height: "420px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(deal)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={hero}
              alt={deal.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/85 via-[#0B1F33]/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10">
          <motion.div
            key={`content-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {/* Country + duration */}
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <span>{flag}</span> {deal.country}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <Clock size={11} className="text-[#F6931F]" />
                {deal.durationNights}N / {deal.durationDays}D
              </span>
              <span className="flex items-center gap-1 rounded-full bg-[#F6931F] px-3 py-1.5 text-xs font-bold text-white">
                <Star size={11} className="fill-white stroke-white" /> {deal.star}.0
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug max-w-xl mb-2">
              {deal.title}
            </h3>

            <p className="flex items-center gap-1.5 text-sm text-slate-300 mb-6">
              <MapPin size={14} className="text-[#F6931F]" /> {deal.city}, {deal.country}
            </p>

            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">From</p>
                <p className="text-3xl font-extrabold text-[#F6931F] tracking-tight">
                  £{deal.price}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onBook(deal); }}
                className="ml-4 flex items-center gap-2 rounded-xl bg-[#F6931F] hover:bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95"
              >
                Book Now <ChevronRight size={15} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onOpen(deal); }}
                className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white transition-all"
              >
                View Details
              </button>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail strip — right side on desktop */}
        {deals.length > 1 && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col gap-2">
            {deals.map((d, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActive(i); }}
                aria-label={`Switch to slide ${i + 1}`}
                className={`relative h-16 w-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  i === active
                    ? "border-[#F6931F] opacity-100 scale-105"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={imgSrc(d?.images?.[0]?.url)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Package Card ─────────────────────────────────────────────────────────────

function PackageCard({ deal, onOpen, onBook }) {
  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const image = imgSrc(deal?.images?.[0]?.url);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col h-full rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(246,147,31,0.18)] transition-all duration-300 cursor-pointer"
      onClick={() => onOpen(deal)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden m-3 rounded-[1.6rem]">
        <Image
          src={image}
          alt={deal.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/85 via-[#0B1F33]/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <Clock size={12} className="text-[#F6931F]" />
            {deal.durationNights}N / {deal.durationDays}D
          </div>
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <Star size={12} className="fill-[#F6931F] stroke-[#F6931F]" />
            {deal.star}.0
          </div>
        </div>

        {/* Bottom location */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-xs uppercase tracking-wider font-semibold opacity-75 flex items-center gap-1 mb-0.5">
            {flag} {deal.country}
          </div>
          <div className="text-base font-bold flex items-center gap-1 tracking-tight">
            <MapPin size={14} className="text-[#F6931F]" /> {deal.city}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5 pt-2 flex flex-col flex-grow justify-between">
        <div>
          <StarRow count={deal.star} />
          <h3 className="mt-1.5 text-base font-bold tracking-tight text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-[#0070A1] transition-colors">
            {deal.title}
          </h3>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
          <div>
            <span className="text-xs text-slate-400 font-medium">From</span>
            <p className="text-2xl font-extrabold text-[#F6931F] tracking-tight">£{deal.price}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onBook(deal); }}
            className="px-4 py-2 bg-gradient-to-r from-[#F6931F] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-all active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Package Detail Modal ─────────────────────────────────────────────────────

function PackageModal({ deal, onClose, onBook }) {
  const [imgIndex, setImgIndex] = useState(0);

// 1. Keep track of the previous deal to detect changes
const [prevDeal, setPrevDeal] = useState(deal);

// 2. If the deal changed, update both state variables synchronously
if (deal !== prevDeal) {
  setPrevDeal(deal);
  setImgIndex(0);
}

if (!deal) return null;


  if (!deal) return null;

  const images = deal.images?.length ? deal.images : [{ url: "imgs/placeholder.jpg" }];
  const total = images.length;

  return (
    <AnimatePresence>
      {deal && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0B1F33]/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[1.75rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div className="relative h-60 flex-shrink-0">
              <Image
                src={imgSrc(images[imgIndex]?.url)}
                alt={deal.title}
                fill
                className="object-cover"
                sizes="600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-transparent to-transparent" />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 border border-white/15 text-white hover:bg-black/65 transition-colors z-10"
              >
                <X size={15} />
              </button>

              {/* Prev / Next */}
              {total > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => (i - 1 + total) % total)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 border border-white/15 text-white hover:bg-black/65 transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={() => setImgIndex((i) => (i + 1) % total)}
                    className="absolute right-10 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 border border-white/15 text-white hover:bg-black/65 transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ArrowRight size={14} />
                  </button>
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/50 border border-white/20 px-2 py-1 text-[10px] font-bold text-white">
                    {imgIndex + 1} / {total}
                  </div>
                </>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-4 left-5 z-10">
                <StarRow count={deal.star} size={12} />
                <h2 className="mt-1 text-lg font-extrabold text-white leading-snug max-w-xs">
                  {deal.title}
                </h2>
              </div>
            </div>

            {/* Thumbnail strip */}
            {total > 1 && (
              <div className="flex gap-2 px-5 pt-3 overflow-x-auto scrollbar-hide flex-shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`relative h-12 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      i === imgIndex ? "border-[#F6931F] opacity-100" : "border-transparent opacity-50 hover:opacity-75"
                    }`}
                  >
                    <Image src={imgSrc(img.url)} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Clock size={11} className="text-[#F6931F]" /> {deal.durationNights}N / {deal.durationDays}D
                </span>
                <span className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <MapPin size={11} className="text-[#F6931F]" /> {deal.city}, {deal.country}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Compass size={11} className="text-[#F6931F]" /> {deal.type}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {deal.shortDesc || deal.description}
              </p>
            </div>

            {/* Footer CTA */}
            <div className="flex gap-2 p-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
              <div className="flex-1">
                <p className="text-xs text-slate-400">From</p>
                <p className="text-2xl font-extrabold text-[#F6931F]">£{deal.price}</p>
              </div>
              <button
                onClick={() => { onClose(); onBook(deal); }}
                className="flex items-center gap-2 rounded-xl bg-[#F6931F] hover:bg-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all active:scale-95"
              >
                Book Now <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({ deal, onClose }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    fromDate: "", toDate: "",
    adults: "2", children: "0",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deal) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/honey-moon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          packageTitle: deal.title || "Unknown Package",
          message: `Dates: ${formData.fromDate} - ${formData.toDate}\nAdults: ${formData.adults} | Children: ${formData.children}\nRequests: ${formData.specialRequests || "None"}`,
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert("Booking request sent! We'll contact you within 24 hours.");
        onClose();
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!deal) return null;

  return (
    <AnimatePresence>
      {deal && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 40 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-xl bg-white dark:bg-[#0B1116] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="relative p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/60 flex-shrink-0">
              <button
                type="button" onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:scale-105 active:scale-95 transition-all"
              >
                <X size={18} />
              </button>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                New Booking Inquiry
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1 line-clamp-1">
                {deal.title}
              </p>
            </div>

            {/* Scrollable form */}
            <div className="overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">

                {/* Itinerary block */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Itinerary &amp; Guests
                  </p>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/20 grid grid-cols-2">
                    <div className="p-3 border-r border-b border-zinc-200 dark:border-zinc-800">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Travel From
                      </label>
                      <input type="date" name="fromDate" required value={formData.fromDate} onChange={handleChange}
                        className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer" />
                    </div>
                    <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Travel To
                      </label>
                      <input type="date" name="toDate" required value={formData.toDate} onChange={handleChange}
                        className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer" />
                    </div>
                    <div className="p-3 border-r border-zinc-200 dark:border-zinc-800">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Adults</label>
                      <select name="adults" value={formData.adults} onChange={handleChange}
                        className="w-full mt-0.5 bg-transparent text-sm font-semibold text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer">
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="p-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Children</label>
                      <select name="children" value={formData.children} onChange={handleChange}
                        className="w-full mt-0.5 bg-transparent text-sm font-semibold text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer">
                        {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Contact Information
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="name" required placeholder="Full Name *"
                      value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] transition" />
                    <input type="email" name="email" required placeholder="Email Address *"
                      value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] transition" />
                  </div>
                  <input type="tel" name="phone" required placeholder="Phone / WhatsApp *"
                    value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] transition" />
                </div>

                {/* Special requests */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Special Requests
                  </p>
                  <textarea name="specialRequests" rows={3}
                    placeholder="e.g., Romantic dinner setup, flower decorations, airport transfers..."
                    value={formData.specialRequests} onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] resize-none transition" />
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-orange-600 text-white font-bold text-base shadow-md hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none">
                  {isSubmitting ? "Sending Request..." : "Submit Booking Request"}
                  <Mail size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function HolidayDeals() {
  const [deals, setDeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bookingDeal, setBookingDeal] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("/api/honeymoon")
      .then((r) => r.json())
      .then((d) => setDeals(d.data || []));
  }, []);

  const featured = deals.slice(0, 5);
  const gridDeals = deals.slice(0, 4);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-500 overflow-hidden py-12"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Featured Slider ── */}
        <FeaturedSlider
          deals={featured}
          onOpen={setSelected}
          onBook={setBookingDeal}
        />

        {/* ── Grid section label ── */}
       

        {/* ── Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {gridDeals.map((deal) => (
            <PackageCard
              key={deal.id ?? deal.slug}
              deal={deal}
              onOpen={() => setSelected(deal)}
              onBook={setBookingDeal}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Modals ── */}
      <PackageModal
        deal={selected}
        onClose={() => setSelected(null)}
        onBook={(d) => { setSelected(null); setBookingDeal(d); }}
      />
      <BookingModal
        deal={bookingDeal}
        onClose={() => setBookingDeal(null)}
      />
    </div>
  );
}