"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Utensils, MessageCircle, ArrowLeft, ArrowRight,
  Compass, Calendar, BadgePercent, Eye, Star,
  Hotel, MapPin, Clock, CheckCircle2, XCircle,
  ChevronRight, Sparkles
} from "lucide-react";
const getImageSrc = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? url : `/${url}`;
};

const starCount = (starEnum) => {
  // "STAR_3" → 3
  const n = parseInt((starEnum || "").replace("STAR_", ""), 10);
  return isNaN(n) ? 0 : n;
};

const typeLabel = (type) => {
  const map = { NORMAL: "Standard", LUXURY: "Luxury", MONTHLY: "Monthly", HAJJ: "Hajj" };
  return map[type] || type || "Umrah";
};

const normalise = (pkg) => ({

  ...pkg,

  image: getImageSrc(pkg.images?.[0]?.url),
  days: pkg.duration,
  location: [pkg.makkahHotel && "Makkah", pkg.madinahHotel && "Madinah"]
    .filter(Boolean)
    .join(" · ") || "Makkah · Madinah",
  meal: "Fully Inclusive",
  advantage: pkg.shortDesc || pkg.description || "",
  details: [
    pkg.makkahHotel && `🕌 Makkah: ${pkg.makkahHotel}`,
    pkg.madinahHotel && `🕌 Madinah: ${pkg.madinahHotel}`,
    `⭐ ${starCount(pkg.star)} Star Hotel Standard`,
    `📅 ${pkg.duration} Nights / ${pkg.duration + 1} Days`,
    pkg.month ? `🗓️ Departure: ${pkg.month}` : "🗓️ Year-Round Departures",
    `🏷️ Type: ${typeLabel(pkg.type)}`,
  ]
    .filter(Boolean)
    .join("\n"),
  price: `£${(pkg.price || 0).toLocaleString()}`,
  stars: starCount(pkg.star),
  typeLabel: typeLabel(pkg.type),
});
const StarRow = ({ count, size = 11 }) => (
  <span className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < count ? "text-[#F6931F] fill-[#F6931F]" : "text-slate-300 dark:text-zinc-600"}
      />
    ))}
  </span>
);
const PackageModal = ({ selected, onClose, onExplore, onWhatsApp }) => {
  const details = [
    { icon: <Hotel size={14} />, label: "Makkah Hotel", value: selected.makkahHotel },
    { icon: <Hotel size={14} />, label: "Madinah Hotel", value: selected.madinahHotel },
    { icon: <Clock size={14} />, label: "Duration", value: `${selected.duration} Nights / ${selected.duration + 1} Days` },
    { icon: <Star size={14} />, label: "Hotel Standard", value: `${selected.stars} Star` },
    { icon: <MapPin size={14} />, label: "Departure", value: selected.month || "Year-Round" },
    { icon: <BadgePercent size={14} />, label: "Package Type", value: selected.typeLabel },
    { icon: <Utensils size={14} />, label: "Meal Plan", value: "Fully Inclusive" },
  ].filter((d) => d.value);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.93, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden text-left"
      >
        {/* ── Hero image strip ── */}
        <div className="relative w-full h-52 shrink-0">
          {selected.image ? (
            <Image src={selected.image} alt={selected.title} fill className="object-cover" sizes="672px" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F6931F]/20 to-[#0070A1]/20 flex items-center justify-center">
              <Compass size={48} className="text-[#F6931F]/40" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition text-white"
          >
            <X size={15} />
          </button>

          {/* Title over image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex rounded-full bg-[#F6931F]/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                {selected.typeLabel}
              </span>
              {selected.month && (
                <span className="inline-flex rounded-full bg-[#0070A1]/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  {selected.month}
                </span>
              )}
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">
              {selected.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              <StarRow count={selected.stars} size={12} />
              <span className="text-white/70 text-[10px] font-medium">{selected.stars} Star Package</span>
            </div>
          </div>
        </div>

        {/* ── Modal body ── */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[55vh] overflow-y-auto">

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
            {selected.description || selected.shortDesc}
          </p>

          {/* Details grid */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#0070A1] mb-3 flex items-center gap-1.5">
              <Sparkles size={12} /> Package Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-2.5 bg-slate-50 dark:bg-white/5 rounded-xl px-3 py-2.5 border border-slate-100 dark:border-white/5"
                >
                  <span className="text-[#F6931F] mt-0.5 shrink-0">{d.icon}</span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-0.5">
                      {d.label}
                    </p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-zinc-100">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        

          {/* Short desc as itinerary fallback if no inclusions */}
          {selected.inclusions?.length === 0 && (
            <div className="bg-gradient-to-r from-[#F6931F]/5 to-[#0070A1]/5 rounded-xl p-4 border border-[#F6931F]/10">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#0070A1] mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={12} /> Package Highlights
              </h4>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                {selected.shortDesc}
              </p>
            </div>
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Starting From
            </span>
            <span className="text-2xl font-black text-[#F6931F]">{selected.price}</span>
            <span className="text-[10px] text-slate-400 font-medium ml-1">per person</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => onExplore(selected)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] text-white font-bold text-xs uppercase tracking-wider transition-opacity hover:opacity-90"
            >
              <Eye size={14} /> Explore Now
              <ChevronRight size={13} />
            </button>
            <button
              onClick={onWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle size={15} /> Book on WhatsApp
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Main Component  — design unchanged
───────────────────────────────────────────── */
export default function PackageInformations({
  initialPackages = [],
  badgeText = "Popular Packages",
  titlePartOne = "Our Featured",
  titlePartTwo = "Packages 2026 - 2027",
  descriptionText = "At Travelshook, we design custom travel packages with flights, hotel accommodations, convenient transfers, expert advice and more for your ultimate convenience.",
  whatsappNumber = "442038766846",
}) {
  // Normalise raw API packages once
  const packages = React.useMemo(
    () => initialPackages.map(normalise),
    [initialPackages]
  );

  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const router = useRouter();

  const handleExploreNow = (selectedPackage) => {
    if (!selectedPackage?.slug) return;
    setSelected(null);
    const currentActivePath = window.location.pathname;
    router.push(`${currentActivePath}/${selectedPackage.slug}`);
  };

  const getScrollAmount = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".package-card-item");
      if (card) {
        const style = window.getComputedStyle(card);
        return card.clientWidth + (parseFloat(style.marginRight) || 0);
      }
    }
    return 340;
  };

  useEffect(() => {
    if (isHovered || !packages.length) return;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, packages]);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -getScrollAmount() : getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = `Hi, I am interested in booking the "${selected.title}" package.
🕌 Makkah Hotel: ${selected.makkahHotel}
🕌 Madinah Hotel: ${selected.madinahHotel}
⭐ Standard: ${selected.stars} Star
⏳ Duration: ${selected.duration} Nights
💰 Price: ${selected.price}

Please share more details. Thanks!`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  if (!packages.length) return null;

  return (
    <section className="py-12 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-4xl text-left">
            <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
              {badgeText}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight  leading-tight whitespace-normal">
              {titlePartOne}{" "}
              <span className="text-2xl sm:text-4xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent  ml-1 font-serif normal-case">
                {titlePartTwo}
              </span>
            </h2>
            {descriptionText && (
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {descriptionText}
              </p>
            )}
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            <button onClick={() => handleScroll("left")} className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-800 dark:hover:text-white active:scale-90">
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => handleScroll("right")} className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-800 dark:hover:text-white active:scale-90">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ── Carousel ── */}
        <motion.div
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className="package-card-item min-w-[290px] sm:min-w-[340px] max-w-[340px] snap-start group bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[480px]"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
              }}
            >
              {/* Card image */}
              <div className="relative w-full h-48 overflow-hidden shrink-0">
                {pkg.image ? (
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 340px) 100vw, 340px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#F6931F]/20 to-[#0070A1]/20 flex items-center justify-center">
                    <Compass size={40} className="text-[#F6931F]/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#F6931F]" /> {pkg.days} Nights
                </span>
                {/* Star badge top-left */}
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <StarRow count={pkg.stars} size={10} />
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#F6931F]">
                    <Compass size={12} /> {pkg.typeLabel}
                  </div>
                  <h3 className="font-black text-base sm:text-lg tracking-tight uppercase text-slate-900 dark:text-white line-clamp-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium line-clamp-3 leading-relaxed">
                    {pkg.advantage}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-white/10 shrink-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Utensils size={13} className="text-slate-400" /> {pkg.meal}
                    </span>
                    <span className="text-[#0070A1] font-bold bg-[#0070A1]/5 dark:bg-[#0070A1]/10 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <BadgePercent size={13} /> Special
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                        From Pricing
                      </span>
                      <span className="text-xl font-black text-slate-900 dark:text-white">{pkg.price}</span>
                    </div>
                    <button
                      onClick={() => setSelected(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      View Package
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Modal ── */}
        <AnimatePresence>
          {selected && (
            <PackageModal
              selected={selected}
              onClose={() => setSelected(null)}
              onExplore={handleExploreNow}
              onWhatsApp={handleWhatsApp}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}