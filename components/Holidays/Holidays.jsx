"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  Flame, MapPin, Star, Hotel, PlaneTakeoff,
  Camera, X, ArrowRight, Compass, CalendarCheck, ExternalLink, Clock
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

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? "fill-[#F6931F] stroke-[#F6931F]" : "fill-transparent stroke-white/30"} />
      ))}
    </div>
  );
}

function PackageCard({ deal, index, onOpen }) {
  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const imageUrl = deal?.images?.[0]?.url ? `/${deal.images[0].url}` : "/imgs/placeholder.jpg";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl cursor-pointer border border-white/5"
      onClick={() => onOpen(deal, index)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => e.currentTarget.src = "/imgs/placeholder.jpg"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-4 right-4 bg-[#F6931F] text-white text-xs font-bold px-3 py-1 rounded-full">
          {deal.star}★
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-lg font-semibold flex items-center gap-2">
            {flag} {deal.country}
          </div>
          <div className="text-sm opacity-90 flex items-center gap-1">
            <MapPin size={14} /> {deal.city}
          </div>
        </div>
      </div>

      <div className="p-5">
        <StarRow count={deal.star} />
        <h3 className="mt-3 text-lg font-semibold line-clamp-2 leading-tight group-hover:text-[#0070A1] transition-colors">
          {deal.title}
        </h3>

        <div className="mt-4 flex justify-between items-end">
          <div>
            <span className="text-3xl font-bold text-[#F6931F]">£{deal.price}</span>
          </div>
          <div className="text-right text-xs text-gray-500">
            <Clock size={14} className="inline mr-1" />
            {deal.durationNights}N / {deal.durationDays}D
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PackageModal({ deal, index, onClose }) {
  if (!deal) return null;

  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const imageUrl = deal.images?.[0]?.url ? `/${deal.images[0].url}` : "/imgs/placeholder.jpg";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Small Hero */}
          <div className="relative h-56">
            <img 
              src={imageUrl} 
              alt={deal.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <button onClick={onClose} className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full">
              <X size={20} />
            </button>

            <div className="absolute bottom-4 left-4 text-white text-sm">
              {flag} {deal.city}
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold leading-tight">{deal.title}</h2>
            
            <div className="mt-2 flex items-center gap-3">
              <span className="text-3xl font-bold text-[#F6931F]">£{deal.price}</span>
              <StarRow count={deal.star} />
            </div>

            <p className="mt-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
              {deal.description}
            </p>

            <div className="mt-6 flex gap-3">
              <Link href={`/holidays/${deal.slug}`} className="flex-1">
                <button className="w-full py-3.5 border border-[#0070A1] text-[#0070A1] rounded-2xl font-medium hover:bg-[#0070A1] hover:text-white transition">
                  Full Details
                </button>
              </Link>
              <Link href={`/holidays/${deal.slug}#book`} className="flex-1">
                <button className="w-full py-3.5 bg-[#F6931F] hover:bg-orange-600 text-white rounded-2xl font-medium transition">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function HolidayDeals() {
  const [deals, setDeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch("http://localhost:3000/api/honeymoon")
      .then(r => r.json())
      .then(d => setDeals(d.data || []));
  }, []);

  return (
    <div ref={sectionRef} className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-8xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className=" mb-12"
        >
          <div className="inline-flex  gap-2 text-[#F6931F] bg-[#F6931F]/10 px-5 py-2 rounded-full text-sm font-medium mb-4">
            <Flame size={18} /> EXCLUSIVE HONEYMOON COLLECTION
          </div>
          <h2 className="text-5xl font-bold">Romantic Escapes</h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Curated luxury honeymoons for unforgettable memories</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {deals.map((deal, idx) => (
            <PackageCard 
              key={deal.id} 
              deal={deal} 
              index={idx} 
              onOpen={(deal, idx) => {
                setSelected(deal);
                setSelectedIndex(idx);
              }} 
            />
          ))}
        </div>
      </div>

      <PackageModal 
        deal={selected} 
        index={selectedIndex} 
        onClose={() => setSelected(null)} 
      />
    </div>
  );
}