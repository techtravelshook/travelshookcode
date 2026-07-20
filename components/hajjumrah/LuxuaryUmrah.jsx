"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Utensils,
  MessageCircle,
  Calendar,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Compass,
  BadgePercent,
  Eye,
  Building,    
  MapPin,     
  Star,    
  CheckCircle, 
  Bus,      
  Plane, 
} from "lucide-react";

export default function PackageGrid({
  packages = [],
  folderSlug = "",//ramdan-package
   starrating = "",
  badgeText = "Exclusive Offers",
  mainTitlePrefix = "Luxury Premium",
  mainTitleGradient = "Umrah Packages 2026",
  description = "Discover our handpicked premium and luxury travel packages tailored just for your spiritual comfort.",
  whatsappNumber = "442038766846",
}) {
  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const sliderRef = useRef(null);
  const router = useRouter();

  

 const handleExploreNow = (selectedPackage) => {
  if (!selectedPackage?.slug) return;
  setSelected(null);
  // type: "LUXURY" → lowercase → "luxury"
  const typeSlug = selectedPackage.type?.toLowerCase();
  router.push(`/hajj-umrah/${typeSlug}/${selectedPackage.slug}`);
};
  const createWhatsAppMessage = (pkg) => {
    return `Hi, I am interested in booking the "${pkg.title}" package.

🏨 Makkah Hotel: ${pkg.makkahHotel || "N/A"}
🕌 Madinah Hotel: ${pkg.madinahHotel || "N/A"}
⏳ Duration: ${pkg.duration} Days
💰 Price: £${pkg.price}

Please share more details. Thanks!`;
  };

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = createWhatsAppMessage(selected);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleWhatsAppCard = (e, pkg) => {
    e.stopPropagation();
    const msg = createWhatsAppMessage(pkg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const getScrollAmount = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".package-card-item");
      if (card) {
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 0;
        return card.clientWidth + marginRight;
      }
    }
    return 380;
  };

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

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = getScrollAmount();
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!packages?.length) return null;

  return (
    <section className="relative py-22 overflow-hidden bg-gradient-to-b from-white via-[#fffaf5] to-[#f5f9ff] dark:from-[#020617] dark:via-[#071019] dark:to-[#020617]">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F6931F]/20 blur-3xl rounded-full opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0070A1]/20 blur-3xl rounded-full opacity-30" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 lg:px-12">
        {/* Header - Unchanged */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-5 max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F6931F]/10 border border-[#F6931F]/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#F6931F] backdrop-blur-xl">
              <Sparkles size={12} className="animate-pulse" />
              {badgeText}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight text-slate-900 dark:text-white">
              {mainTitlePrefix}{" "}
              <span className="bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] bg-clip-text text-transparent">
                {mainTitleGradient}
              </span>
            </h2>

            {description && (
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => handleScroll("left")} className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 hover:shadow-xl transition-all duration-300">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => handleScroll("right")} className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 hover:shadow-xl transition-all duration-300">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel - Kept your original classes */}
        <motion.div
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex xl:flex-wrap gap-3 xl:gap-4 overflow-x-auto xl:overflow-hidden no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 sm:pb-10 px-1 w-full justify-between"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="package-card-item relative min-w-[calc(100vw-32px)] sm:min-w-[280px] md:min-w-[240px] xl:min-w-[calc(25%-12px)] xl:max-w-[calc(25%-12px)] h-auto sm:h-[390px] snap-start group rounded-[20px] overflow-hidden bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.14)] transition-all duration-500 flex flex-col"
            >
              {/* Your Original Card Design (Unchanged) */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F6931F]/10 blur-2xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0070A1]/10 blur-2xl rounded-full" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
              </div>

              <div className="relative w-full h-40 overflow-hidden shrink-0">
                <Image
                  src={pkg.images?.[0]?.url ? `/${pkg.images[0].url}` : "/imgs/hajj/hajj8.jpg"}
                  alt={pkg.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[#0070A1]/10 mix-blend-overlay" />

                <div className="absolute top-3 left-3 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl px-2.5 py-1">
                  <p className="text-[8px] uppercase tracking-[0.15em] text-white/70">Starting From</p>
                  <h4 className="text-sm font-black text-white">£{pkg.price}</h4>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-xl border border-white/20 px-2.5 py-1 rounded-xl text-[10px] font-bold text-white flex items-center gap-1.5">
                  <Calendar size={11} className="text-[#F6931F]" />
                  {pkg.duration} Days
                </div>
              </div>

              <div className="relative z-10 p-4 flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-black text-[#F6931F]">
                    <Compass size={11} />
                    {pkg.makkahHotel && pkg.madinahHotel
                      ? `${pkg.makkahHotel} & ${pkg.madinahHotel}`
                      : pkg.location}
                  </div>

                  <h3 className="text-base font-extrabold tracking-tight leading-snug text-slate-900 dark:text-white line-clamp-1">
                    {pkg.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                    {pkg.shortDesc}
                  </p>
                </div>

                <div className="space-y-3 pt-3 mt-3 border-t border-slate-200/60 dark:border-white/10">
                  <button
                    onClick={() => setSelected(pkg)}
                    className="relative overflow-hidden px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] text-white font-black text-[10px] uppercase tracking-[0.15em] shadow-md hover:scale-[1.01] transition-all duration-300 w-full"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      <Eye size={13} />
                      View Package
                    </span>
                  </button>

                  <button
                    onClick={(e) => handleWhatsAppCard(e, pkg)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl text-xs font-bold text-slate-800 dark:text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 w-full"
                  >
                    <MessageCircle size={14} />
                    WhatsApp Booking
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ==================== FIXED & IMPROVED MODAL ==================== */}
      <AnimatePresence>
  {selected && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative w-full max-w-[440px] bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* ── Hero Image ── */}
        <div className="relative h-52 w-full shrink-0">
          <Image
            src={selected.images?.[0]?.url ? `/${selected.images[0].url}` : "/imgs/hajj/hajj8.jpg"}
            alt={selected.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="flex items-center gap-1.5 bg-[#F6931F]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
              <Sparkles size={11} />
              Premium
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 text-white/90 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
              <Calendar size={11} />
              {selected.duration} Nights
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-all"
          >
            <X size={16} />
          </button>

          {/* Bottom overlay — title + price */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F6931F]/90 mb-1">
              Luxury Umrah Package
            </p>
            <h3 className="text-[19px] font-extrabold text-white leading-tight tracking-tight mb-2.5">
              {selected.title}
            </h3>
            <div className="flex items-center gap-2.5">
              <div className="bg-black/40 border border-white/15 rounded-xl px-3 py-1.5 backdrop-blur-sm">
                <p className="text-white/60 text-[9px] uppercase tracking-widest">From</p>
                <p className="text-[#F6931F] text-xl font-black leading-tight">£{selected.price}</p>
              </div>
              <p className="text-white/50 text-xs">per person</p>
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Plane size={16} className="text-[#0070A1]" />, label: "Flights", value: "Return included", accent: "blue" },
              { icon: <Bus size={16} className="text-[#F6931F]" />, label: "Transport", value: "All transfers", accent: "orange" },
              { icon: <Utensils size={16} className="text-[#0070A1]" />, label: "Meals", value: "Bed & Breakfast", accent: "blue" },
              { icon: <MessageCircle size={16} className="text-[#F6931F]" />, label: "Support", value: "24/7 Assistance", accent: "orange" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-white/5 rounded-2xl p-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.accent === "blue" ? "bg-[#0070A1]/10" : "bg-[#F6931F]/10"}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">{item.label}</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hotels */}
          <div>
            <p className="text-[11px] font-bold text-[#0070A1] uppercase tracking-[0.08em] mb-2.5">
              Hotel Accommodation
            </p>
            <div className="space-y-2">
              {[
                { city: "Makkah", hotel: selected.makkahHotel, color: "#F6931F", bg: "bg-[#F6931F]/10", border: "border-[#F6931F]/20" },
                { city: "Madinah", hotel: selected.madinahHotel, color: "#0070A1", bg: "bg-[#0070A1]/10", border: "border-[#0070A1]/20" },
              ].map((h) => (
                <div key={h.city} className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-900/70 border border-slate-100 dark:border-white/5 rounded-2xl p-3">
                  <div className={`w-10 h-10 rounded-xl ${h.bg} border ${h.border} flex items-center justify-center shrink-0`}>
                    <Building size={18} style={{ color: h.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                      <MapPin size={10} />
                      {h.city}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                      {h.hotel || "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={h.color} style={{ color: h.color }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div>
            <p className="text-[11px] font-bold text-[#0070A1] uppercase tracking-[0.08em] mb-2.5">
              What&apos;s Included
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {[
                "Return flights from UK",
                "Hotel accommodation",
                "All airport transfers",
                "Ziyarah guide",
                "Bed & Breakfast meals",
                "24/7 support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div>
            <p className="text-[11px] font-bold text-[#0070A1] uppercase tracking-[0.08em] mb-2">
              Package Overview
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {selected.description || selected.shortDesc}
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[9px] uppercase tracking-widest text-slate-400">Price per person</p>
            <p className="text-2xl font-black text-[#F6931F] leading-tight">£{selected.price}</p>
          </div>
          <button
            onClick={() => handleExploreNow(selected)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#F6931F] to-[#e8820f] text-white font-bold text-xs tracking-wider hover:brightness-110 transition-all whitespace-nowrap"
          >
            Explore Now
          </button>
          <button
            onClick={handleWhatsApp}
            className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20b557] text-white font-bold text-xs tracking-wider transition-all whitespace-nowrap"
          >
            WhatsApp
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}