"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X, Utensils, MessageCircle, Calendar, Sparkles,
  MapPin, ArrowLeft, ArrowRight, Compass, BadgePercent, Eye
} from "lucide-react";

export default function PackageGrid({
  packages = [],
  folderSlug = "ramdan-package",
  badgeText = "Exclusive Offers",
  mainTitlePrefix = "Luxury Premium",
  mainTitleGradient = "Umrah Packages 2026",
  description = "Discover our handpicked premium and luxury travel packages tailored just for your spiritual comfort.",
  whatsappNumber = "923124928496"
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

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = `Hi, I am interested in booking the "${selected.title}" package.
📍 Location: ${selected.location || "N/A"}
⏳ Duration: ${selected.days} Days
🍽️ Meal Plan: ${selected.meal || "N/A"}
💰 Price: ${selected.price}

Please share more details. Thanks!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleWhatsAppCard = (e, pkg) => {
    e.stopPropagation();
    const msg = `Hi, I am interested in booking the "${pkg.title}" package.
📍 Location: ${pkg.location || "N/A"}
⏳ Duration: ${pkg.days} Days
🍽️ Meal Plan: ${pkg.meal || "N/A"}
💰 Price: ${pkg.price}

Please share more details. Thanks!`;
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
    return 340;
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
      const finalAmount = direction === "left" ? -scrollAmount : scrollAmount;
      sliderRef.current.scrollBy({ left: finalAmount, behavior: "smooth" });
    }
  };

  if (!packages || packages.length === 0) return null;

  return (
    <section className="py-12 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">

        {/* ================= HEADER CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-4xl text-left">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
              <Sparkles size={11} className="animate-pulse" /> {badgeText}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight whitespace-normal">
              {mainTitlePrefix}{" "}
              <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent italic ml-1 font-serif normal-case">
                {mainTitleGradient}
              </span>
            </h2>
            {description && (
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block whitespace-normal">
                {description}
              </p>
            )}
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

        {/* ================= CAROUSEL ================= */}
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
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className="package-card-item min-w-[290px] sm:min-w-[340px] max-w-[340px] snap-start group bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[480px]"
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 65, damping: 15 } }
              }}
            >
              {/* IMAGE */}
              <div className="relative w-full h-48 overflow-hidden shrink-0">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 340px) 100vw, 340px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#F6931F]" /> {pkg.days} Days
                </span>
              </div>

              {/* CARD DETAILS */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-2.5">
                  {pkg.location && (
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#F6931F]">
                      <Compass size={12} /> {pkg.location}
                    </div>
                  )}
                  <h3 className="font-black text-base sm:text-lg tracking-tight uppercase text-slate-900 dark:text-white line-clamp-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium line-clamp-3 leading-relaxed">
                    {pkg.advantage}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-white/10 shrink-0">
                  {pkg.meal && (
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-zinc-300">
                      <span className="flex items-center gap-1.5">
                        <Utensils size={13} className="text-slate-400" /> {pkg.meal}
                      </span>
                      <span className="text-[#0070A1] font-bold bg-[#0070A1]/5 dark:bg-[#0070A1]/10 px-2.5 py-1 rounded-md flex items-center gap-1">
                        <BadgePercent size={13} /> Special
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">From Pricing</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white">{pkg.price}</span>
                    </div>
                    <button
                      onClick={() => setSelected(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] text-white font-bold text-xs uppercase tracking-wider transition-colors hover:opacity-90"
                    >
                      View Package
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= MODAL ================= */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl text-left space-y-5 overflow-hidden"
              >
                {/* CLOSE */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X size={16} />
                </button>

                {/* TITLE BADGE */}
                <div className="space-y-2">
                  <span className="inline-flex rounded-full bg-[#F6931F]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#F6931F]">
                    {selected.location || "Package"} • {selected.days} Days
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight pr-6">
                    {selected.title}
                  </h3>
                </div>

                {/* IMAGE */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 512px) 100vw, 512px"
                  />
                </div>

                {/* DETAILS */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#0070A1] mb-1">Overview</h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">{selected.advantage}</p>
                  </div>
                  {selected.details && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#0070A1] mb-1">Hotel & Logistics</h4>
                      <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium leading-relaxed bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200/50 dark:border-white/5">
                        {selected.details}
                      </p>
                    </div>
                  )}
                </div>

                {/* FOOTER */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Cost</span>
                    <span className="text-2xl font-black text-[#F6931F]">{selected.price}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => handleExploreNow(selected)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] text-white font-bold text-xs uppercase tracking-wider transition-opacity hover:opacity-90"
                    >
                      <Eye size={14} /> Explore Now
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageCircle size={15} /> Book WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}