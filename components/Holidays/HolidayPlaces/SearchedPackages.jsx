"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Star, Utensils, Hotel, Clock,
  TrendingUp, ArrowRight, Wifi, ChevronRight
} from "lucide-react";

// 1. MOCK DATA ARRAY FOR THE DYNAMIC CARDS
const mostSearched = [
  {
    slug: "dubai-luxury-escape",
    title: "Dubai Premium Skyline Getaway",
    destination: "Dubai, UAE",
    image: "/imgs/holidays/dubai.jpg",
    badge: "Trending",
    color: "#F6931F",
    tag: "Top Selling",
    rating: "4.9",
    hotel: "5★ Luxury Resort",
    food: "Breakfast Inc.",
    days: 5,
    nights: 4,
    originalPrice: "£950",
    price: "£804",
    amenities: ["Free Wifi", "Private Pool", "Spa Access"]
  },
  {
    slug: "spain-costas-culture",
    title: "Spain Mediterranean Heritage Tour",
    destination: "Barcelona, Spain",
    image: "/imgs/holidays/spain.jpg",
    badge: "Popular",
    color: "#0070A1",
    tag: "All Inclusive",
    rating: "4.8",
    hotel: "4★ Beachfront Hotel",
    food: "All Inclusive",
    days: 7,
    nights: 6,
    originalPrice: "£499",
    price: "£345",
    amenities: ["Free Wifi", "Beach Access", "Bar Perks"]
  },
  {
    slug: "greece-islands-culture",
    title: "Greece Aegean Cultural Exploration",
    destination: "Athens, Greece",
    image: "/imgs/holidays/greece.jpg",
    badge: "Exclusive",
    color: "#10b981",
    tag: "Best Value",
    rating: "4.9",
    hotel: "5★ Boutique Stay",
    food: "All Inclusive",
    days: 7,
    nights: 6,
    originalPrice: "£580",
    price: "£450",
    amenities: ["Free Wifi", "Sea View", "Air Con"]
  }
];

// 2. HELPER COMPONENT FOR THE AMENITY PILLS
const AmenityPill = ({ label }) => {
  return (
    <span className="inline-flex items-center text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-md border border-slate-200/40 dark:border-white/5">
      {label}
    </span>
  );
};

// 3. MAIN CLEAN COMPONENT
export default function SearchedPackages() {
  return (
  <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white to-[#fafafa] dark:from-[#030712] dark:to-[#070a13]">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F6931F]/20 to-transparent" />

    {/* Decorative Luxury Background Glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#F6931F]/3 dark:bg-[#F6931F]/4 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#0070A1]/3 dark:bg-[#0070A1]/4 rounded-full blur-[120px]" />
    </div>

    <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Header Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-[#F6931F] to-[#0070A1] p-2 rounded-lg">Most Searched</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
            This Week <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-bold">Top Picks</span>

          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
            Destinations travellers are searching & booking right now
          </p>
        </div>
        <Link
          href="/holidays"
          className="flex items-center gap-1.5 text-sm font-bold text-[#0070A1] hover:text-[#F6931F] transition-colors group whitespace-nowrap"
        >
          <span>View All Holidays</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>

      {/* Responsive Flex/Grid System Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {mostSearched.map((pkg, i) => (
          <motion.div
            key={pkg.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/holidays/${pkg.slug}`}>
              <div className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#0b101b] border border-slate-200/60 dark:border-white/5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,112,161,0.05)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer">

                {/* Image Container with Hover Shimmer Scaling */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes="(max-w: 768px) 100vw, (max-w: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Dynamic Label Badge */}
                  <span
                    className="absolute top-4 left-4 text-[9px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-xl text-white shadow-md"
                    style={{ backgroundColor: pkg.color }}
                  >
                    {pkg.badge}
                  </span>

                  {/* Secondary Status Tag */}
                  <span className="absolute bottom-4 left-4 text-[11px] font-medium text-white/90 bg-slate-950/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg">
                    {pkg.tag}
                  </span>

                  {/* Floating Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl px-2.5 py-1 shadow-sm">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white">{pkg.rating}</span>
                  </div>
                </div>

                {/* Inner Card Typography Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin size={12} className="text-[#0070A1]" />
                      <span className="text-[10px] font-bold text-[#0070A1] dark:text-[#38bdf8] uppercase tracking-wider">{pkg.destination}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-[#0070A1] dark:group-hover:text-[#38bdf8] transition-colors duration-300">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Information Feature Chips */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5">
                      <Hotel size={13} className="text-slate-400 shrink-0" />
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 truncate">{pkg.hotel}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5">
                      <Utensils size={13} className="text-slate-400 shrink-0" />
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 truncate">{pkg.food}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5">
                      <Clock size={13} className="text-slate-400 shrink-0" />
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">{pkg.days}D / {pkg.nights}N</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5">
                      <Wifi size={13} className="text-slate-400 shrink-0" />
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 truncate">{pkg.amenities[0]}</span>
                    </div>
                  </div>

                  {/* Secondary Amenity Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.amenities.slice(1).map(item => (
                      <AmenityPill key={item} label={item} />
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                    <div>
                      <span className="text-[10px] text-slate-400 line-through tracking-wide block leading-none mb-0.5">
                        {pkg.originalPrice}
                      </span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                          {pkg.price}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">/ person</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#0070A1] group-hover:text-[#F6931F] transition-colors duration-300">
                      <span>Details</span>
                      <ChevronRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

}