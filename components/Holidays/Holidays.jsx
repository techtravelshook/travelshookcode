"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  Flame, MapPin, Star, X, ArrowRight, Clock, Sparkles, Navigation,
  ChevronLeft, ChevronRight, Calendar, ShieldCheck
} from "lucide-react";

const FLAG_MAP = {
  "Russia": "🇷🇺",
  "Cyprus": "🇨🇾",
  "Georgia / South Ossetia": "🇬🇪",
  "Georgia / Abkhazia": "🇬🇪",
  "Italy": "🇮🇹",
  "Liechtenstein": "🇱🇮",
  "San Marino": "🇸🇲",
  "Moldova / Transnistria": "🇲🇩",
  "Kosovo": "🇽🇰",
  "United Kingdom": "🇬🇧",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

function StarRow({ count, size = 13 }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? "fill-[#F6931F] stroke-[#F6931F]" : "fill-transparent stroke-slate-300 dark:stroke-slate-700"}
        />
      ))}
    </div>
  );
}

function PackageCard({ deal, onOpen }) {
  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const imageUrl = deal?.images?.[0]?.url ? `/${deal.images[0].url}` : "/imgs/placeholder.jpg";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative flex flex-col h-full rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(246,147,31,0.18)] transition-all duration-300 cursor-pointer"
      onClick={onOpen}
    >
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden m-3 rounded-[1.6rem]">
        <img
          src={imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => e.currentTarget.src = "/imgs/placeholder.jpg"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/85 via-[#0B1F33]/10 to-transparent" />

        {/* Floating Top Badges */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <Clock size={12} className="text-[#F6931F]" />
            <span>{deal.durationNights}N / {deal.durationDays}D</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <Star size={12} className="fill-[#F6931F] stroke-[#F6931F]" />
            <span>{deal.star}.0</span>
          </div>
        </div>

        {/* Floating Bottom Location */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-xs uppercase tracking-wider font-semibold opacity-75 flex items-center gap-1 mb-0.5">
            <span>{flag}</span> {deal.country}
          </div>
          <div className="text-lg font-bold flex items-center gap-1 tracking-tight">
            <MapPin size={16} className="text-[#F6931F]" /> {deal.city}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 pb-6 pt-2 flex flex-col flex-grow justify-between">
        <div>
          <div className="mb-2">
            <StarRow count={deal.star} />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-[#0070A1] dark:group-hover:text-blue-400 transition-colors">
            {deal.title}
          </h3>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">From</span>
            <span className="text-3xl font-extrabold text-[#F6931F] tracking-tight">£{deal.price}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-[#0B1F33] group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PackageModal({ deal, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0);
  }, [deal]);

  useEffect(() => {
    document.body.style.overflow = deal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [deal]);

  if (!deal) return null;

  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const images = deal.images?.length ? deal.images : [{ url: "imgs/placeholder.jpg" }];
  const imageUrl = `/${images[imgIndex]?.url}`;

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B1F33]/55 backdrop-blur-md z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 16, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 16, opacity: 0 }}
          transition={{ type: "spring", duration: 0.35 }}
          className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[1.75rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-slate-100 dark:border-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-44 group">
            <img
              src={imageUrl}
              alt={deal.title}
              className="w-full h-full object-cover"
              onError={(e) => e.currentTarget.src = "/imgs/placeholder.jpg"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/10 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white p-2 rounded-full border border-white/15 hover:bg-black/60 transition z-10"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={15} />
                </button>
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === imgIndex ? "w-4 bg-[#F6931F]" : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute bottom-2.5 left-3.5">
              <span className="bg-white/15 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[11px] font-medium text-white tracking-wide flex items-center gap-1.5">
                <Navigation size={11} className="text-[#F6931F]" />
                {flag} {deal.city}, {deal.country}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <StarRow count={deal.star} />
              <span className="text-[11px] font-semibold text-[#0B1F33] dark:text-slate-200 bg-[#F6931F]/15 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Calendar size={11} className="text-[#F6931F]" />
                {deal.durationNights}N / {deal.durationDays}D
              </span>
            </div>

            <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug line-clamp-2">
              {deal.title}
            </h2>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
              {deal.description || "A romantic getaway with luxurious accommodations, breathtaking scenery, and unmatched privacy."}
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1.5 rounded-lg w-fit">
              <ShieldCheck size={12} />
              Free cancellation &middot; Flights included
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">From</span>
                <span className="text-2xl font-black text-[#F6931F] tracking-tight">£{deal.price}</span>
                <span className="text-[10px] text-slate-400 font-medium">per person</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/honeymoon/${deal.slug}`}>
                  <button className="px-4 py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold tracking-wide hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
                    Details
                  </button>
                </Link>
                <Link href={`/honeymoon/${deal.slug}#book`}>
                  <button className="px-4 py-2.5 bg-gradient-to-r from-[#F6931F] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl text-xs font-bold tracking-wide shadow-md shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-1">
                    Book <ArrowRight size={13} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FeaturedSlider({ deals, onOpen }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (deals.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % deals.length);
    }, 6000);
    return () => clearInterval(t);
  }, [deals.length]);

  if (!deals.length) return null;

  const deal = deals[index];
  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const imageUrl = deal?.images?.[0]?.url ? `/${deal.images[0].url}` : "/imgs/placeholder.jpg";

  const prev = () => setIndex((i) => (i === 0 ? deals.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % deals.length);

  return (
    <div className="relative h-[420px] sm:h-[480px] rounded-[2.5rem] overflow-hidden mb-16 shadow-[0_25px_60px_-15px_rgba(11,31,51,0.35)]">
      <AnimatePresence mode="wait">
        <motion.img
          key={deal.id || deal.slug}
          src={imageUrl}
          alt={deal.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => e.currentTarget.src = "/imgs/placeholder.jpg"}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-white bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
            <Flame size={14} className="text-[#F6931F]" />
            Featured Escape
          </div>
          <div className="flex items-center gap-1.5">
            {deals.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-[#F6931F]" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={(deal.id || deal.slug) + "-content"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold mb-2">
              <span>{flag}</span>
              <MapPin size={14} className="text-[#F6931F]" />
              {deal.city}, {deal.country}
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              {deal.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <StarRow count={deal.star} size={16} />
              <span className="flex items-center gap-1.5 text-white/80 text-sm font-medium">
                <Clock size={14} className="text-[#F6931F]" />
                {deal.durationNights}N / {deal.durationDays}D
              </span>
              <span className="text-2xl font-black text-[#F6931F]">£{deal.price}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onOpen(deal)}
                className="px-6 py-3.5 bg-[#F6931F] hover:bg-orange-500 text-[#0B1F33] rounded-2xl font-bold tracking-wide shadow-lg shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2"
              >
                View Details <ArrowRight size={16} />
              </button>
              <Link href={`/honeymoon/${deal.slug}#book`}>
                <button className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white rounded-2xl font-bold tracking-wide transition-all active:scale-95">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow nav */}
      {deals.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-all"
            aria-label="Previous featured deal"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-md text-white flex items-center justify-center border border-white/15 transition-all"
            aria-label="Next featured deal"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}

export default function HolidayDeals() {
  const [deals, setDeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("http://localhost:3000/api/honeymoon")
      .then(r => r.json())
      .then(d => setDeals(d.data || []));
  }, []);

  const featured = deals.slice(0, Math.min(5, deals.length));
  const gridDeals = deals.slice(0, 4);

  return (
    <div ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center md:text-left mb-10 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 text-[#F6931F] dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/5 border border-orange-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Flame size={14} className="animate-pulse" />
            <Sparkles size={12} className="text-orange-400" />
            Exclusive Honeymoon Collection
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Romantic Escapes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            Curated ultra-luxury honeymoons and private hidden retreats for memories that last a lifetime.
          </p>
        </motion.div>

        {/* Featured Slider */}
        <FeaturedSlider deals={featured} onOpen={(deal) => setSelected(deal)} />

        {/* 4-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {gridDeals.map((deal) => (
            <PackageCard
              key={deal.id || deal.slug}
              deal={deal}
              onOpen={() => setSelected(deal)}
            />
          ))}
        </motion.div>
      </div>

      <PackageModal
        deal={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}