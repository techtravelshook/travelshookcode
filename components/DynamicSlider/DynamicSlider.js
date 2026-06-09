"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, MapPin, ChevronLeft, ChevronRight, X,
  Phone, Calendar, Users, Star, Check, Plane,
  Clock, Shield, CreditCard, HeadphonesIcon,
  Utensils, BedDouble, Luggage, Wifi,
} from "lucide-react";
import Image from "next/image";

const TAG_ICONS = {
  Flights: Plane, Hotel: BedDouble, Resort: BedDouble,
  Villa: BedDouble, "Boutique Hotel": BedDouble,
  Breakfast: Utensils, "All Inclusive": Utensils,
  Transfers: Luggage, "Airport Transfers": Luggage,
  Wifi, "City Tour": MapPin, "Temple Tour": MapPin,
  "Guided Tour": MapPin, "Wine Tasting": Star,
  "JR Pass": CreditCard, Seaplane: Plane,
  "Ferry Pass": Plane, Snorkelling: Shield,
};


export default function DynamicSlider({
  title       = "Escape to",
  italicTitle = "Your Dream",
  badge       = "Exclusive Flight Packages",
  data        = SAMPLE_DATA,
  onBook,      // (item) => void — wire up your booking flow
  onCallUs,    // () => void — wire up your call handler
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Change your useEffect to initialize inside a callback function:
useEffect(() => {
  if (!emblaApi) return;

  const initSlider = () => {
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
  };

  initSlider(); // Run once API is ready
  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", initSlider); // Handle dynamic changes safely

  return () => {
    emblaApi.off("select", onSelect);
    emblaApi.off("reInit", initSlider);
  };
}, [emblaApi, onSelect]);


  return (
    <>
      {/* ── SECTION ── */}
      <section className="relative bg-white dark:bg-zinc-950 py-16 sm:py-20 overflow-hidden">
        {/* Subtle top-left accent blob — light + dark */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[#E68213]/8 blur-[100px] dark:bg-[#E68213]/12" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── HEADER ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              {/* Badge */}
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#E68213]/25 bg-[#E68213]/8 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E68213]">
                <Plane size={11} />
                {badge}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black  leading-tight text-slate-900 dark:text-white">
                {title}{" "}
                <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl">
                  {italicTitle}
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                All-in packages with flights, hotel &amp; transfers. Price guaranteed.
              </p>
            </div>

            {/* Nav + dots */}
            <div className="flex flex-col items-start sm:items-end gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label="Previous"
                  className="p-3 rounded-xl border border-slate-200 dark:border-zinc-700 hover:border-[#E68213] hover:text-[#E68213] text-slate-500 dark:text-zinc-400 transition-colors duration-150"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label="Next"
                  className="p-3 rounded-xl border border-slate-200 dark:border-zinc-700 hover:border-[#E68213] hover:text-[#E68213] text-slate-500 dark:text-zinc-400 transition-colors duration-150"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="flex gap-1.5">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === selectedSnap
                        ? "w-5 bg-[#E68213]"
                        : "w-1.5 bg-slate-200 dark:bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── CAROUSEL ── */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-3 sm:-ml-4">
              {data.map((item, i) => (
                <div
                  key={i}
                  className="flex-[0_0_85%] min-w-0 pl-3 sm:pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                >
                  <FlightCard
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── TRUST STRIP ── */}
          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {[
              { Icon: Shield,          label: "Price Guarantee"       },
              { Icon: Plane,           label: "Flexible Flights"      },
              { Icon: HeadphonesIcon,  label: "24/7 Support"          },
              { Icon: CreditCard,      label: "Secure Payment"        },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 text-xs">
                <Icon size={14} className="text-[#E68213]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedItem && (
          <PackageModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onBook={onBook}
            onCallUs={onCallUs}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   FLIGHT CARD
   ═══════════════════════════════════════════ */
function FlightCard({ item, onClick }) {
  return (
    <motion.article
  initial="rest"
  whileHover="hover"
      onClick={onClick}
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg hover:border-[#E68213]/30 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.city}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Stars */}
        {item.stars && (
          <div className="absolute top-3 left-3 flex gap-0.5">
            {[...Array(item.stars)].map((_, i) => (
              <Star key={i} size={11} className="fill-[#E68213] text-[#E68213]" />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="absolute top-3 right-3 rounded-lg bg-white/90 dark:bg-black/70 backdrop-blur px-2.5 py-1">
          <p className="text-[9px] text-slate-400 leading-none">from</p>
          <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{item.price}</p>
        </div>

        {/* Airline */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 border border-white/10">
         <motion.div className="text-[#E68213]"
  initial={{ x: 0 }}
  whileHover={{ x: 40 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  <Plane size={11} />
</motion.div>
          <span className="text-[10px] text-white font-medium">{item.airline}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-[#E68213] font-semibold flex items-center gap-1 mb-0.5">
          <MapPin size={10} />{item.country}
        </p>
        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white mb-1">{item.city}</h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">{item.desc}</p>

        {/* Route strip */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-800 rounded-xl px-3 py-2.5 mb-3 border border-slate-100 dark:border-zinc-700">
          <div className="text-center">
            <p className="text-sm font-black text-slate-900 dark:text-white">{item.departure?.code}</p>
            <p className="text-[9px] text-slate-400 dark:text-zinc-500 uppercase">dep</p>
          </div>
          <div className="flex-1 px-2 flex flex-col items-center gap-0.5">
            <div className="flex items-center w-full gap-1">
  <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-600" />

  <motion.div
  variants={{
    rest: { x: 0 },
    hover: { x: 40 }
  }}
  transition={{ duration: 0.5 }}
>
  <Plane size={11} className="text-[#E68213]" />
</motion.div>

  <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-600" />
</div>
            <p className="text-[9px] text-slate-400 dark:text-zinc-500">{item.duration_flight}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-900 dark:text-white">{item.arrival?.code}</p>
            <p className="text-[9px] text-slate-400 dark:text-zinc-500 uppercase">arr</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-zinc-500 mb-4">
          <span className="flex items-center gap-1"><Clock size={11} />{item.duration}</span>
          <span className="flex items-center gap-1"><Users size={11} />Per person</span>
        </div>

        <button className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#E68213] to-[#F7A63C] py-2.5 text-xs font-bold text-white hover:brightness-105 transition-all tracking-wide">
          View Package <ArrowRight size={13} />
        </button>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════ */
function PackageModal({ item, onClose, onBook, onCallUs }) {
  // Escape key
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full sm:max-w-lg
          max-h-[92dvh] sm:max-h-[88vh]
          flex flex-col
          rounded-t-3xl sm:rounded-3xl
          bg-white dark:bg-zinc-900
          border border-slate-200 dark:border-zinc-800
          shadow-2xl overflow-hidden
        "
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden w-10 h-1 rounded-full bg-slate-200 dark:bg-zinc-700 mx-auto mt-3 flex-shrink-0" />

        {/* ── IMAGE HERO ── */}
        <div className="relative h-48 sm:h-56 flex-shrink-0 overflow-hidden">
          <img src={item.image} alt={item.city} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur transition"
          >
            <X size={16} />
          </button>

          {item.stars && (
            <div className="absolute top-4 left-4 flex gap-0.5">
              {[...Array(item.stars)].map((_, i) => (
                <Star key={i} size={12} className="fill-[#E68213] text-[#E68213]" />
              ))}
            </div>
          )}

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-widest flex items-center gap-1">
                <MapPin size={9} />{item.country}
              </p>
              <h2 className="text-2xl font-black text-white tracking-tight">{item.city}</h2>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[9px]">from</p>
              <p className="text-2xl font-black text-white">{item.price}</p>
              <p className="text-white/50 text-[9px]">per person</p>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-5 space-y-5">

            {/* Description */}
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              {item.desc || `Discover the wonders of ${item.city}.`}
            </p>

            {/* ── FLIGHT ROUTE ── */}
            <div className="rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-zinc-800 border-b border-slate-100 dark:border-zinc-700">
                <div className="p-1.5 rounded-lg bg-[#0070A1]/10">
                  <Plane size={14} className="text-[#0070A1]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{item.airline} · {item.flightNum}</p>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500">Round Trip · Economy Class</p>
                </div>
              </div>

              {/* Route visual */}
              <div className="px-5 py-4">
                <div className="flex items-center gap-2">
                  {/* Dep */}
                  <div className="flex-shrink-0 text-center w-16">
                    <p className="text-xl font-black text-slate-900 dark:text-white">{item.departure?.time}</p>
                    <p className="text-xs font-bold text-[#E68213]">{item.departure?.code}</p>
                  </div>
                  {/* Line */}
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-center w-full gap-1.5">
                      <div className="w-2 h-2 rounded-full border-2 border-slate-300 dark:border-zinc-600 flex-shrink-0" />
                      <div className="flex-1 border-t border-dashed border-slate-200 dark:border-zinc-700" />
                      <Plane size={14} className="text-[#E68213] flex-shrink-0" />
                      <div className="flex-1 border-t border-dashed border-slate-200 dark:border-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-[#E68213] flex-shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500">{item.duration_flight}</p>
                  </div>
                  {/* Arr */}
                  <div className="flex-shrink-0 text-center w-16">
                    <p className="text-xl font-black text-slate-900 dark:text-white">{item.arrival?.time}</p>
                    <p className="text-xs font-bold text-[#0070A1]">{item.arrival?.code}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-2 text-[10px] text-slate-400 dark:text-zinc-500">
                  <div>
                    <p className="text-slate-500 dark:text-zinc-400 truncate max-w-[120px]">{item.departure?.city}</p>
                    <p>{item.departure?.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 dark:text-zinc-400 truncate max-w-[120px]">{item.arrival?.city}</p>
                    <p>{item.arrival?.date}</p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-500 border-t border-slate-100 dark:border-zinc-800 pt-3">
                <Plane size={10} className="rotate-180" />
                Return flight included on same route
              </div>
            </div>

            {/* ── STATS ── */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { Icon: Calendar, label: "Duration",    value: item.duration || "7 Nights", color: "text-[#E68213]" },
                { Icon: Users,    label: "Per Person",  value: item.price,                  color: "text-[#0070A1]" },
                { Icon: Clock,    label: "Flight Time", value: item.duration_flight,         color: "text-emerald-500" },
              ].map(({ Icon, label, value, color }) => (
                <div key={label} className="rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 p-3 text-center">
                  <Icon size={16} className={`${color} mx-auto mb-1`} />
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-0.5">{label}</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* ── INCLUDED ── */}
            {item.tags?.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2.5">What&apos;s Included</p>
                <div className="grid grid-cols-2 gap-2">
                  {item.tags.map((tag, i) => {
                    const Icon = TAG_ICONS[tag] || Check;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 text-emerald-700 dark:text-emerald-400 text-xs"
                      >
                        <Icon size={12} className="flex-shrink-0" />
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── TRUST ── */}
            <div className="flex flex-wrap gap-4">
              {[
                { Icon: Shield,         label: "Price Guarantee" },
                { Icon: CreditCard,     label: "Flexible Payment" },
                { Icon: HeadphonesIcon, label: "24/7 Support" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-slate-400 dark:text-zinc-500 text-[11px]">
                  <Icon size={12} className="text-[#E68213]" />
                  {label}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── STICKY FOOTER ── */}
        <div className="flex-shrink-0 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onBook?.(item)}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#E68213] to-[#F7A63C] text-white text-xs font-bold tracking-wider hover:brightness-105 active:scale-[0.98] transition"
          >
            Book Now <ArrowRight size={13} />
          </button>
          <button
            onClick={() => onCallUs?.()}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition"
          >
            <Phone size={13} /> Call Us
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
