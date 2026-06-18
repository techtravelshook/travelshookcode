"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

export default function FeaturedSlider({ 
  deals = [], 
  onOpen, 
  onBook, 
  FLAG_MAP = {}, 
  StarRow 
}) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  // Auto-play (uncomment if you want it)
  // useEffect(() => {
  //   if (deals.length <= 1) return;
  //   const timer = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % deals.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, [deals.length]);

  if (!deals?.length) return null;

  const deal = deals[index];
  const flag = FLAG_MAP[deal?.country] ?? "🌍";
  
  // Fixed Image Path Handling
  const imageUrl = deal?.images?.[0]?.url 
    ? `/${deal.images[0].url.replace(/^\/+/, "")}` 
    : "/imgs/placeholder.jpg";

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) {
      setIndex((prev) => (prev + 1) % deals.length);
    } else if (distance < -50) {
      setIndex((prev) => (prev - 1 + deals.length) % deals.length);
    }
    setTouchStart(null);
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[460px] sm:h-[500px] md:h-[560px] mb-8 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden select-none"
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image 
            src={imageUrl} 
            alt={deal?.title || "Honeymoon Package"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-8 md:p-12 z-10">
        <div className="w-full max-w-2xl text-white">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm flex items-center gap-2">
              <span>{flag}</span> {deal?.country}
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm">
              <Clock size={16} /> {deal?.durationNights}N / {deal?.durationDays}D
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter leading-tight mb-4">
            {deal?.title}
          </h2>

          {/* Price & Rating */}
          <div className="flex items-center gap-6 mb-8">
            {StarRow && (
              <div className="flex items-center gap-2">
                <StarRow count={deal?.star || 5} size={18} />
                <span className="text-xl font-bold">{deal?.star || 5}.0</span>
              </div>
            )}
            <div className="text-4xl font-black text-[#F6931F]">
              £{deal?.price}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpen?.(deal)}
              className="flex-1 sm:flex-none px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
            >
              View Details
            </button>
            <button
              onClick={() => onBook?.(deal)}
              className="flex-1 sm:flex-none px-8 py-4 bg-[#F6931F] hover:bg-orange-600 text-white font-bold rounded-2xl transition-all active:scale-95"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 right-6 sm:left-1/2 sm:-translate-x-1/2 flex gap-2 z-20">
        {deals.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${
              i === index 
                ? 'bg-[#F6931F] w-8 h-2.5' 
                : 'bg-white/50 hover:bg-white/80 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}