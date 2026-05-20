"use client";

import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, X, Phone, Mail, Calendar, Users, Star, Check } from "lucide-react";

export default function DynamicSlider({ title, italicTitle, badge, data }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay(autoplayOptions)]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-black py-14 text-slate-900 dark:text-white transition-colors duration-500">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#E68213]/10 dark:bg-[#E68213]/20 blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="mb-3 inline-block rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E68213]">
                {badge}
              </span>
              <h2 className="text-xl font-black leading-tight sm:text-4xl lg:text-3xl tracking-tighter">
                {title}
                <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent italic pr-2 ml-2">
                  {italicTitle}
                </span>
              </h2>
            </div>

            <div className="flex gap-2">
              <button onClick={scrollPrev} className="p-3 rounded-full border border-black/10 dark:border-white/10 hover:bg-[#E68213] hover:text-white transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={scrollNext} className="p-3 rounded-full border border-black/10 dark:border-white/10 hover:bg-[#E68213] hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {data.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4">
                  <motion.div
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedItem(item)}
                    className="group relative h-full overflow-hidden rounded-[24px] border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 backdrop-blur-xl transition-all duration-500 cursor-pointer"
                  >
                    <div className="relative h-[220px] overflow-hidden">
                      <img src={item.image} alt={item.city} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                        {item.price}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#E68213] font-bold">
                        <MapPin size={10} />
                        <span className="truncate">{item.country}</span>
                      </div>
                      <h3 className="text-lg font-black tracking-tight">{item.city}</h3>
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-gray-400 line-clamp-1">
                        {item.desc || `Explore the beauty of ${item.city}`}
                      </p>
                      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#E68213]/20">
                        View Package
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <PackageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function PackageModal({ item, onClose }) {
  return (
    // Backdrop
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
    >
      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white dark:bg-[#111113] border border-black/10 dark:border-white/10 shadow-2xl"
      >
        {/* Hero Image */}
        <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-[28px]">
          <img
            src={item.image}
            alt={item.city}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all"
          >
            <X size={18} />
          </button>

          {/* Price badge on image */}
          <div className="absolute bottom-4 left-5">
            <p className="text-white/60 text-[11px] uppercase tracking-widest mb-0.5">Starting From</p>
            <p className="text-3xl font-black text-white">{item.price}<span className="text-lg text-white/60">pp</span></p>
          </div>

          {/* Stars if available */}
          {item.stars && (
            <div className="absolute bottom-4 right-5 flex gap-0.5">
              {[...Array(item.stars)].map((_, i) => (
                <Star key={i} size={13} className="fill-[#F7931E] stroke-none" />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Title + Location */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E68213] font-bold mb-2">
              <MapPin size={11} />
              {item.country}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {item.city}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-white/50 leading-relaxed">
              {item.desc || `Explore the beauty and culture of ${item.city}. A truly unforgettable experience awaits you.`}
            </p>
          </div>

          {/* Tags */}
          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E68213]/10 text-[#E68213] text-[10px] font-bold uppercase tracking-wide">
                  <Check size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Info Pills */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
              <div className="p-2 rounded-xl bg-[#E68213]/10">
                <Calendar size={14} className="text-[#E68213]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-white/30">Duration</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{item.duration || "7 Nights"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
              <div className="p-2 rounded-xl bg-[#0070A1]/10">
                <Users size={14} className="text-[#0070A1]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-white/30">Per Person</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{item.price}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#E68213] to-[#F7931E] text-white text-[11px] font-bold uppercase tracking-widest hover:opacity-90 hover:shadow-lg hover:shadow-[#E68213]/30 transition-all duration-300">
              Book This Package
              <ArrowRight size={14} />
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#0070A1] to-[#005a82] text-white text-[11px] font-bold uppercase tracking-widest hover:opacity-90 hover:shadow-lg hover:shadow-[#0070A1]/30 transition-all duration-300">
              <Phone size={13} />
              Call Us Now
            </button>
          </div>

          {/* Email enquiry */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-black/10 dark:border-white/10 text-slate-500 dark:text-white/40 text-[11px] font-semibold hover:border-[#E68213]/30 hover:text-[#E68213] transition-all duration-200">
            <Mail size={13} />
            Send an Enquiry
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}