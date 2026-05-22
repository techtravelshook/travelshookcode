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
} from "lucide-react";

export default function PackageGrid({
  packages = [],
  folderSlug = "ramdan-package",
  badgeText = "Exclusive Offers",
  mainTitlePrefix = "Luxury Premium",
  mainTitleGradient = "Umrah Packages 2026",
  description = "Discover our handpicked premium and luxury travel packages tailored just for your spiritual comfort.",
  whatsappNumber = "923124928496",
}) {
  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const sliderRef = useRef(null);
  const router = useRouter();

  const handleExploreNow = (selectedPackage) => {
    if (!selectedPackage || !selectedPackage.slug) return;

    setSelected(null);

    router.push(`/hajj-umrah/${folderSlug}/${selectedPackage.slug}`);
  };

  const createWhatsAppMessage = (pkg) => {
    return `Hi, I am interested in booking the "${pkg.title}" package.

📍 Location: ${pkg.location || "N/A"}
⏳ Duration: ${pkg.days} Days
🍽️ Meal Plan: ${pkg.meal || "N/A"}
💰 Price: ${pkg.price}

Please share more details. Thanks!`;
  };

  const handleWhatsApp = () => {
    if (!selected) return;

    const msg = createWhatsAppMessage(selected);

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const handleWhatsAppCard = (e, pkg) => {
    e.stopPropagation();

    const msg = createWhatsAppMessage(pkg);

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
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
          sliderRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
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

  if (!packages || packages.length === 0) return null;

  return (
    <section className="relative py-22  overflow-hidden bg-gradient-to-b from-white via-[#fffaf5] to-[#f5f9ff] dark:from-[#020617] dark:via-[#071019] dark:to-[#020617]">

  {/* BACKGROUND GLOW */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-[#F6931F]/20 blur-3xl rounded-full opacity-30" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0070A1]/20 blur-3xl rounded-full opacity-30" />

  {/* NOISE TEXTURE */}
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage:
        "url('https://grainy-gradients.vercel.app/noise.svg')",
    }}
  />

  <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 lg:px-12">

    {/* HEADER */}
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

      {/* ARROWS */}
      <div className="flex gap-3">
        <button
          onClick={() => handleScroll("left")}
          className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 hover:shadow-xl transition-all duration-300"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 hover:shadow-xl transition-all duration-300"
        >
          <ArrowRight size={18} />
        </button>
      </div>

    </div>

    {/* CAROUSEL Wrapper */}
    <motion.div
      ref={sliderRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
     className="flex xl:flex-wrap gap-3 xl:gap-4 overflow-x-auto xl:overflow-hidden no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 sm:pb-10 px-1 w-full justify-between"



      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
    >

      {packages.map((pkg) => (
        <motion.div
          key={pkg.id}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
          }}
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
        
         className="
package-card-item
relative
min-w-[calc(100vw-32px)]
sm:min-w-[280px]
md:min-w-[240px]
xl:min-w-[calc(25%-12px)]
xl:max-w-[calc(25%-12px)]
h-auto
sm:h-[390px]
snap-start
group
rounded-[20px]
overflow-hidden
bg-white/70
dark:bg-white/[0.03]
backdrop-blur-xl
border border-white/20 dark:border-white/10
shadow-[0_8px_30px_rgba(0,0,0,0.06)]
hover:shadow-[0_15px_45px_rgba(0,0,0,0.14)]
transition-all duration-500
flex flex-col
"


        >

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F6931F]/10 blur-2xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0070A1]/10 blur-2xl rounded-full" />

          {/* HOVER SHINE */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
          </div>

          {/* BORDER GLOW */}
          <div className="absolute inset-0 rounded-[20px] border border-white/10 pointer-events-none" />

          <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-[#F6931F]/10 to-[#0070A1]/10 pointer-events-none" />


  {/* DEPTH */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

  {/* IMAGE */}
  <div className="relative w-full h-40 overflow-hidden shrink-0">

    <Image
      src={pkg.image}
      alt={pkg.title}
      fill
      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
      sizes="(max-width: 768px) 100vw, 260px"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
    <div className="absolute inset-0 bg-[#0070A1]/10 mix-blend-overlay" />

    {/* PRICE BADGE */}
    <div className="absolute top-3 left-3 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl px-2.5 py-1">
      <p className="text-[8px] uppercase tracking-[0.15em] text-white/70">
        Starting From
      </p>

      <h4 className="text-sm font-black text-white">
        {pkg.price}
      </h4>
    </div>

    {/* DAYS */}
    <div className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-xl border border-white/20 px-2.5 py-1 rounded-xl text-[10px] font-bold text-white flex items-center gap-1.5">
      <Calendar size={11} className="text-[#F6931F]" />
      {pkg.days} Days
    </div>

  </div>

  {/* CONTENT */}
  <div className="relative z-10 p-4 flex flex-col justify-between flex-1">

    <div className="space-y-2">

      {pkg.location && (
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-black text-[#F6931F]">
          <Compass size={11} />
          {pkg.location}
        </div>
      )}

      <h3 className="text-base font-extrabold tracking-tight leading-snug text-slate-900 dark:text-white line-clamp-1">
        {pkg.title}
      </h3>

      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
        {pkg.advantage}
      </p>

    </div>

    {/* FOOTER */}
    <div className="space-y-3 pt-3 mt-3 border-t border-slate-200/60 dark:border-white/10">

      {pkg.meal && (
        <div className="flex items-center justify-between gap-2">

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300">
            <Utensils size={13} className="text-slate-400" />
            <span className="line-clamp-1">{pkg.meal}</span>
          </div>

          <div className="bg-[#0070A1]/10 text-[#0070A1] px-2 py-0.5 rounded-lg text-[9px] font-bold flex items-center gap-0.5 shrink-0">
            <BadgePercent size={11} />
            Special
          </div>

        </div>
      )}

      {/* BUTTONS */}
      <div className="flex flex-col gap-2">

        <button
          onClick={() => setSelected(pkg)}
          className="
          relative overflow-hidden
          px-4 py-2.5
          rounded-xl
          bg-gradient-to-r
          from-[#F6931F]
          via-[#ffb347]
          to-[#0070A1]
          text-white
          font-black
          text-[10px]
          uppercase
          tracking-[0.15em]
          shadow-md
          hover:scale-[1.01]
          hover:shadow-lg
          active:scale-95
          transition-all duration-300
          "
        >

          <span className="relative z-10 flex items-center justify-center gap-1.5">
            <Eye size={13} />
            View Package
          </span>

          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />

        </button>

   <button
  onClick={(e) => handleWhatsAppCard(e, pkg)}
  
  className="flex items-center justify-center gap-1.5 mb-5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl text-xs font-bold text-slate-800 dark:text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
>
  <MessageCircle size={14} />
  WhatsApp Booking
</button>




      </div>

    </div>

  </div>

</motion.div>

          ))}

        </motion.div>

        {/* MODAL */}
             {/* POPUP MODAL (REDUCED INNER SECTION SIZE) */}
     <AnimatePresence>
  {selected && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 25 }
        }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative w-full max-w-[420px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[28px] overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] p-4 flex flex-col gap-4 border border-white/40 dark:border-white/10"
      >
        {/* AMBIENT BACKGROUND GLOWS */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6931F]/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0070A1]/10 blur-3xl rounded-full pointer-events-none" />

        {/* TOP COMPACT IMAGE HERO */}
        <div className="relative w-full h-48 rounded-[20px] overflow-hidden shrink-0 group shadow-inner border border-black/5 dark:border-white/5">
          <Image
            src={selected.image}
            alt={selected.title}
            fill
            className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700"
          />
          {/* MULTI-LAYER GRADIENT OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-[#0070A1]/10 mix-blend-overlay" />
          
          {/* PRICE BADGE INSIDE HERO BLOCK */}
          <div className="absolute bottom-3 left-4 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5">
            <span className="text-[9px] text-white/70 uppercase font-black tracking-[0.15em] block leading-none">Starting From</span>
            <p className="text-xl font-black text-white mt-0.5 leading-none">{selected.price}</p>
          </div>

          {/* DYNAMIC SHINE EFFECT ON HOVER */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        {/* CLOSE CONTROL ACTION */}
        <button
          onClick={() => setSelected(null)}
          className="absolute top-6 right-6 z-30 p-2 rounded-full bg-black/40 text-white/90 hover:bg-black/60 backdrop-blur-md hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg border border-white/10"
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        {/* INNER TEXT CONTENT SECTION */}
        <div className="space-y-3 px-1 relative z-10">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {selected.title}
          </h3>
          
          {/* COMPACT DETAILS BADGES CHIPS */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-slate-100/80 dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 border border-slate-200/50 dark:border-white/5 text-[11px] font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
              <Calendar size={12} className="text-[#0070A1]" /> {selected.days} Days
            </span>
            {selected.location && (
              <span className="bg-[#F6931F]/10 dark:bg-[#F6931F]/15 text-[#F6931F] border border-[#F6931F]/20 text-[11px] font-black px-3 py-1 rounded-xl flex items-center gap-1.5 uppercase tracking-wider shadow-sm">
                <Compass size={12} /> {selected.location}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium pt-1 border-t border-slate-100 dark:border-white/[0.04]">
            {selected.advantage}
          </p>
        </div>

        {/* FOOTER ACTION STACK BUTTONS */}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-200/60 dark:border-white/10 pb-1 mt-1 relative z-10">
          {/* PRIMARY BUTTON */}
          <button
            onClick={() => handleExploreNow(selected)}
            className="
            relative overflow-hidden
            w-full py-3.5
            rounded-2xl
            bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1]
            text-white
            font-black
            text-xs
            uppercase
            tracking-[0.18em]
            shadow-[0_4px_15px_rgba(246,147,31,0.25)]
            hover:shadow-[0_10px_25px_rgba(0,112,161,0.35)]
            hover:scale-[1.01]
            active:scale-[0.98]
            transition-all duration-300
            group/btn
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Eye size={14} strokeWidth={2.5} />
              Explore Full Details
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>

          {/* WHATSAPP ACTION BUTTON */}
          <button
            onClick={handleWhatsApp}
            className="
            w-full py-3.5 
            rounded-2xl 
            border border-slate-200 dark:border-white/10 
            bg-white/60 dark:bg-white/[0.03] 
            text-xs font-black uppercase tracking-[0.15em]
            text-slate-800 dark:text-white 
            hover:bg-[#25D366] hover:text-white hover:border-[#25D366] 
            hover:shadow-[0_8px_20px_rgba(37,211,102,0.25)]
            hover:scale-[1.01]
            active:scale-[0.98] 
            transition-all duration-300 
            flex items-center justify-center gap-2
            "
          >
            <MessageCircle size={15} strokeWidth={2.5} />
            WhatsApp Booking
          </button>
        </div>

      </motion.div>
    </div>
  )}
</AnimatePresence>



      </div>
    </section>
  );
}