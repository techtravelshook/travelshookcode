"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MapPin, Send, Star,
  MessageCircle, ArrowRight, ArrowLeft, LayoutGrid,
  List, CheckCircle2, Lock, XCircle, CalendarDays,
  Plane, Hotel, ChevronDown, ChevronUp,
} from "lucide-react";

/* ================= DATA ARRAY ================= */
const tourPackages = [
  {
    id: 1,
    flightBadge: "✈ By Air",
    urgencyTag: "Limited Seats",
    category: "Adventure · Desert",
    subtitle: "5-Day Premium Arabian Getaway",
    title: "Lahore to Dubai",
    image: "/imgs/dubai.jpg",
    location: "Dubai, UAE",
    duration: "4 Nights in Oct",
    groupSize: "2–20 Pax",
    tier: "Standard & Deluxe",
    plan: "All-Inclusive",
    highlights: ["Burj Khalifa Observation Deck", "Premium Desert Safari & BBQ", "Dubai Mall & Fountain Show"],
    originalPrice: "480",
    discountedPrice: "420",
    rating: 4,
    reviewsCount: 10,
    inclusions: { visa: true, guide: true, meals: true, hotel: true },
    itinerary: [
      { day: 1, title: "Arrival & City Welcome", desc: "Arrive at Dubai International Airport. Private transfer to your hotel. Evening welcome dinner at a rooftop restaurant with Burj Khalifa views." },
      { day: 2, title: "Burj Khalifa & Downtown Dubai", desc: "Morning visit to the Burj Khalifa observation deck (124th floor). Explore Dubai Mall, the world's largest shopping center, and watch the iconic Dubai Fountain show at dusk." },
      { day: 3, title: "Desert Safari Experience", desc: "Afternoon dune-bashing in premium 4×4 vehicles. Camel riding, sandboarding, and a traditional Bedouin BBQ dinner under the stars with live entertainment." },
      { day: 4, title: "Gold Souk & Dubai Creek", desc: "Visit the historic Gold and Spice Souks. Abra (boat) ride across Dubai Creek. Free afternoon for shopping or spa." },
      { day: 5, title: "Departure Day", desc: "Leisure morning and hotel checkout. Private transfer to airport for your return flight." },
    ],
    included: ["Return flights from Lahore", "4-night hotel accommodation", "Daily breakfast & dinner", "All transfers & transport", "Professional English-speaking guide", "UAE visit visa", "Desert safari with BBQ", "Burj Khalifa tickets"],
    excluded: ["Lunch on days 2–4", "Personal shopping expenses", "Travel insurance", "Tips & gratuities", "Any items of personal nature"],
   
    hotel: { name: "Sofitel Dubai Downtown", stars: 5, roomType: "Deluxe City View Room", checkIn: "3:00 PM", checkOut: "12:00 PM", amenities: ["Rooftop Pool", "Spa & Wellness", "Concierge 24/7", "Complimentary Wi-Fi"] },
    flight: { airline: "Emirates", departure: "Lahore (LHE) → Dubai (DXB)", returnFlight: "Dubai (DXB) → Lahore (LHE)", class: "Economy", baggage: "23 kg checked + 7 kg cabin" },
  },
  {
    id: 2,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Seller",
    category: "Luxury · Romantic",
    subtitle: "7-Day European Romance Escape",
    title: "Paris to France",
    image: "/imgs/nepal.jpg",
    location: "Paris, France",
    duration: "3 Nights in Nov",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Eiffel Tower Summit Access", "Guided Louvre Museum Tour", "Scenic Seine River Dinner Cruise"],
    originalPrice: "400",
    discountedPrice: "380",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true },
    itinerary: [
      { day: 1, title: "Bonjour Paris", desc: "Arrive at Charles de Gaulle Airport. Luxury transfer to your boutique hotel in Saint-Germain. Welcome champagne reception and evening stroll along the Champs-Élysées." },
      { day: 2, title: "Icons of Paris", desc: "Morning visit to the Eiffel Tower summit. Afternoon guided tour of the Louvre Museum including Mona Lisa. Evening Seine River dinner cruise with live music." },
      { day: 3, title: "Versailles & Montmartre", desc: "Day trip to the Palace of Versailles and its gardens. Return to Paris for a walk through Montmartre and the Sacré-Cœur Basilica." },
      { day: 4, title: "Au Revoir", desc: "Leisurely morning. Luxury transfer to airport for your return flight." },
    ],
    included: ["Return flights", "3-night boutique hotel stay", "All meals (breakfast, lunch, dinner)", "Eiffel Tower summit tickets", "Louvre Museum entry", "Seine dinner cruise", "Schengen visa", "Private transfers"],
    excluded: ["Personal shopping", "Additional excursions", "Travel insurance", "Alcoholic beverages beyond included meals"],
    
    hotel: { name: "Hôtel Le Marois Paris", stars: 5, roomType: "Superior Double with Eiffel View", checkIn: "2:00 PM", checkOut: "11:00 AM", amenities: ["Rooftop Terrace", "Michelin-star Restaurant", "Butler Service", "Airport Shuttle"] },
    flight: { airline: "Qatar Airways", departure: "Lahore (LHE) → Paris (CDG)", returnFlight: "Paris (CDG) → Lahore (LHE)", class: "Business Class", baggage: "30 kg checked + 10 kg cabin" },
  },
  {
    id: 3,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Historic",
    subtitle: "6-Day Imperial Heritage Voyage",
    title: "Rome to Italy",
    image: "/imgs/capetown.jpg",
    location: "Rome, Italy",
    duration: "5 Nights In Oct",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Colosseum Arena Tour", "Vatican Museums Guide", "Trevi Fountain Walk"],
    originalPrice: "500",
    discountedPrice: "490",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true },
    itinerary: [
      { day: 1, title: "Arrival in the Eternal City", desc: "Arrive at Rome Fiumicino Airport. Transfer to luxury hotel near the Spanish Steps. Welcome Italian dinner with wine pairing." },
      { day: 2, title: "Vatican & Sistine Chapel", desc: "Skip-the-line access to Vatican Museums, Sistine Chapel, and St. Peter's Basilica with an expert art historian guide." },
      { day: 3, title: "Ancient Rome", desc: "Private tour of the Colosseum Arena floor, Roman Forum, and Palatine Hill. Afternoon at leisure around Trastevere." },
      { day: 4, title: "Trevi & Baroque Rome", desc: "Morning walk to Trevi Fountain, Pantheon, Piazza Navona. Afternoon cooking class: handmade pasta and tiramisu." },
      { day: 5, title: "Day Trip to Florence", desc: "High-speed train to Florence. Visit the Uffizi Gallery, Ponte Vecchio, and Piazzale Michelangelo. Return to Rome by evening." },
      { day: 6, title: "Departure", desc: "Hotel checkout and transfer to airport." },
    ],
    included: ["Return flights", "5-night 5-star hotel", "Daily breakfast & dinner", "Vatican & Colosseum tickets", "Florence day trip", "Pasta cooking class", "Schengen visa", "All transfers"],
    excluded: ["Lunches (days 2–5)", "Personal purchases", "Gratuities", "Optional evening entertainment"],
   
    hotel: { name: "Hotel de Russie Rome", stars: 5, roomType: "Deluxe Garden View", checkIn: "3:00 PM", checkOut: "12:00 PM", amenities: ["Courtyard Garden", "Wellness Spa", "Fine Dining", "Valet Parking"] },
    flight: { airline: "Turkish Airlines", departure: "Lahore (LHE) → Rome (FCO)", returnFlight: "Rome (FCO) → Lahore (LHE)", class: "Economy Plus", baggage: "25 kg checked + 8 kg cabin" },
  },
  {
    id: 4,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Tropical",
    subtitle: "7-Day Island Paradise Escape",
    title: "Bali to Indonesia",
    image: "/imgs/paris.webp",
    location: "Bali, Indonesia",
    duration: "6 Nights In Dec",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Ubud Monkey Forest", "Tanah Lot Temple", "Uluwatu Sunset Dance"],
    originalPrice: "799",
    discountedPrice: "750",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true },
    itinerary: [
      { day: 1, title: "Welcome to the Island of the Gods", desc: "Arrive at Ngurah Rai International Airport. Transfer to your private villa in Seminyak. Sunset cocktails on the beach." },
      { day: 2, title: "Ubud Cultural Immersion", desc: "Visit the Sacred Monkey Forest, Tegallalang Rice Terraces, and traditional Balinese craft villages. Attend a Kecak fire dance performance." },
      { day: 3, title: "Temple Trails", desc: "Explore Tanah Lot sea temple at sunrise. Afternoon visit to Uluwatu cliff temple with panoramic Indian Ocean views. Sunset Kecak dance." },
      { day: 4, title: "Spa & Wellness Day", desc: "Full-day at your villa's spa. Optional: Balinese cooking class or surfing lesson at Kuta Beach." },
      { day: 5, title: "Nusa Penida Island", desc: "Speedboat day trip to Nusa Penida. Snorkel at Crystal Bay, visit Kelingking Beach and Angel's Billabong." },
      { day: 6, title: "Seminyak & Sunset Strip", desc: "Leisure morning. Afternoon shopping in Seminyak boutiques. Farewell rooftop dinner." },
    ],
    included: ["Return flights", "6-night private pool villa", "All meals & sunset cocktails", "Nusa Penida day trip", "Spa treatments (2 sessions)", "Temple entrance fees", "Visa on arrival (VoA)", "All island transfers"],
    excluded: ["Surfing or diving lessons", "Personal shopping", "Travel insurance", "Premium bar beverages beyond package"],
   
    hotel: { name: "Alaya Resort Ubud", stars: 5, roomType: "Private Pool Villa", checkIn: "2:00 PM", checkOut: "12:00 PM", amenities: ["Infinity Pool", "Jungle Spa", "Yoga Pavilion", "24hr Butler"] },
    flight: { airline: "Singapore Airlines", departure: "Lahore (LHE) → Bali (DPS)", returnFlight: "Bali (DPS) → Lahore (LHE)", class: "Economy", baggage: "23 kg checked + 7 kg cabin" },
  },
  {
    id: 5,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Urban",
    subtitle: "5-Day Metropolitan Skyline Tour",
    title: "New York to USA",
    image: "/imgs/newyork.webp",
    location: "New York, USA",
    duration: "4 Nights In Nov",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Statue of Liberty", "Times Square Night", "Empire State View"],
    originalPrice: "680",
    discountedPrice: "610",
    rating: 4,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true },
    itinerary: [
      { day: 1, title: "Hello, New York!", desc: "Arrive at JFK International Airport. Private transfer to your Midtown Manhattan hotel. Evening Times Square experience and Broadway district walk." },
      { day: 2, title: "Iconic Landmarks", desc: "Morning ferry to Statue of Liberty and Ellis Island. Afternoon at Empire State Building observatory. Evening dinner in Little Italy." },
      { day: 3, title: "Central Park & Culture", desc: "Morning jog or carriage ride through Central Park. Visit the Metropolitan Museum of Art. Afternoon on the High Line. Evening rooftop bar." },
      { day: 4, title: "Brooklyn & The Bridges", desc: "Walk the Brooklyn Bridge. Explore DUMBO and Brooklyn food market. Return for a farewell dinner in Midtown." },
      { day: 5, title: "Departure", desc: "Hotel checkout and transfer to JFK for your return flight." },
    ],
    included: ["Return flights", "4-night Midtown Manhattan hotel", "Daily breakfast", "Statue of Liberty ferry & tickets", "Empire State Building entry", "US B-2 tourist visa assistance", "Airport transfers"],
    excluded: ["Lunches & dinners (except welcome dinner)", "Broadway show tickets", "Personal shopping", "Travel insurance", "NYC subway/taxi costs"],
   
    hotel: { name: "Marriott Marquis Times Square", stars: 5, roomType: "City View King Room", checkIn: "4:00 PM", checkOut: "12:00 PM", amenities: ["Rooftop Bar", "Fitness Center", "Business Lounge", "Concierge"] },
    flight: { airline: "United Airlines", departure: "Lahore (LHE) → New York (JFK)", returnFlight: "New York (JFK) → Lahore (LHE)", class: "Economy", baggage: "23 kg checked + 7 kg cabin" },
  },
  {
    id: 6,
    flightBadge: "👑 Premium",
    urgencyTag: "Best Location",
    category: "Luxury · Exotic",
    subtitle: "7-Day Ultra-Luxury Lagoon Stay",
    title: "Maldives Luxury Resort",
    image: "/imgs/maldives1.webp",
    location: "Malé, Maldives",
    duration: "6 Nights In Jan",
    groupSize: "2–12 Pax",
    tier: "Premium Elite",
    plan: "VIP All-Inclusive",
    highlights: ["Overwater Villa Stay", "Coral Reef Snorkeling", "Sunset Dolphin Cruise"],
    originalPrice: "799",
    discountedPrice: "750",
    rating: 5,
    reviewsCount: 18,
    inclusions: { visa: true, guide: true, meals: true, hotel: true },
    itinerary: [
      { day: 1, title: "Arrival in Paradise", desc: "Arrive at Malé Velana International Airport. Private seaplane transfer to your overwater villa. Champagne welcome and sunset viewing from your deck." },
      { day: 2, title: "Coral Reef Snorkeling", desc: "Guided house reef snorkeling at sunrise. Afternoon manta ray and sea turtle excursion. Overwater spa treatment at sunset." },
      { day: 3, title: "Dolphin Cruise & Stargazing", desc: "Morning kayaking and paddleboarding. Evening dolphin-watching cruise. Night sky stargazing with the resort's astronomer." },
      { day: 4, title: "Diving Discovery", desc: "PADI discover scuba diving lesson (all equipment provided). Afternoon beach picnic on a private sandbank." },
      { day: 5, title: "Island Hopping", desc: "Visit a local Maldivian fishing village. Explore the colorful streets of Malé. Return by private speedboat." },
      { day: 6, title: "Pure Relaxation", desc: "Full day at leisure — spa, beach, or underwater restaurant dining. Farewell sunset cocktail dinner on the beach." },
    ],
    included: ["Return flights to Malé", "Seaplane transfers", "6-night overwater villa", "Full board (all meals)", "Snorkeling & diving equipment", "Dolphin cruise", "Spa session (1 per person)", "Maldives visa (free on arrival)"],
    excluded: ["Premium alcoholic beverages", "Additional spa treatments", "Underwater restaurant dining", "Travel insurance", "Personal purchases"],
   
    hotel: { name: "One&Only Reethi Rah", stars: 5, roomType: "Overwater Villa with Private Pool", checkIn: "2:00 PM", checkOut: "12:00 PM", amenities: ["Private Infinity Pool", "Underwater Spa", "Water Sports Center", "Barefoot Butler"] },
    flight: { airline: "Emirates via Dubai", departure: "Lahore (LHE) → Malé (MLE)", returnFlight: "Malé (MLE) → Lahore (LHE)", class: "Economy", baggage: "23 kg checked + 7 kg cabin" },
  },
];

/* ================= STAR RATING ================= */
const StarRow = memo(function StarRow({ rating, reviewsCount, size = 11 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className={i < rating ? "fill-amber-400 stroke-none" : "fill-slate-200 dark:fill-white/10 stroke-none"} />
      ))}
      <span className="text-[9px] text-slate-400 font-bold">({reviewsCount})</span>
    </div>
  );
});

/* ================= INCLUSION BADGES ================= */
const InclusionBadges = memo(function InclusionBadges({ inclusions }) {
  const items = [
    { key: "visa", label: "Visa" }, { key: "guide", label: "Guide" },
    { key: "meals", label: "Meals" }, { key: "hotel", label: "Hotel" },
  ];
  return (
    <div className="flex flex-wrap gap-1">
      {items.filter(i => inclusions[i.key]).map(i => (
        <span key={i.key} className="flex items-center gap-1 text-[9px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-2 py-0.5 rounded-full">
          <CheckCircle2 size={9} /> {i.label}
        </span>
      ))}
    </div>
  );
});

/* ================= GRID CARD ================= */
const GridCard = memo(function GridCard({ pkg, onSelect }) {
  const discount = pkg.originalPrice && pkg.discountedPrice
    ? Math.round((1 - Number(pkg.discountedPrice) / Number(pkg.originalPrice)) * 100) : null;
  return (
    <motion.div onClick={() => onSelect(pkg)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="group relative flex flex-col rounded-[22px] overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl hover:border-[#F6931F]/40 transition-all duration-500 cursor-pointer">
      <div className="relative h-52 overflow-hidden shrink-0">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <span className="bg-black/60 border border-white/10 backdrop-blur-sm text-white text-[9px] px-2.5 py-1 rounded-full font-bold">{pkg.flightBadge}</span>
          <span className="bg-[#F6931F] text-white text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">{pkg.urgencyTag}</span>
        </div>
        {discount > 0 && <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow">-{discount}% OFF</div>}
        <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/5 font-bold z-10">
          <MapPin size={10} className="text-[#F6931F]" /> {pkg.location}
        </div>
        <div className="absolute bottom-3 right-3 z-10"><StarRow rating={pkg.rating} reviewsCount={pkg.reviewsCount} /></div>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <span className="text-[13px] uppercase tracking-widest text-[#0070A1] font-bold block mb-0.5">{pkg.subtitle}</span>
          <h2 className="text-base font-black text-[22px] text-slate-900 dark:text-white group-hover:text-[#F6931F] transition uppercase line-clamp-1 leading-tight">{pkg.title}</h2>
          <p className="text-[15px] text-slate-400 font-medium mt-0.5">{pkg.category}</p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">📅 {pkg.duration}</span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">👥 {pkg.groupSize}</span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">🏨 {pkg.tier}</span>
          <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-2 py-1">🍽 {pkg.plan}</span>
        </div>
        <InclusionBadges inclusions={pkg.inclusions} />
      </div>
      <div className="px-4 pb-4 flex items-center justify-between border-t border-slate-100 dark:border-white/[0.05] pt-3">
        <div>
          <p className="line-through text-[10px] font-bold text-slate-400 font-mono">£ {pkg.originalPrice}</p>
          <p className="text-xl font-black text-[#F6931F] tracking-tight leading-none">£ {pkg.discountedPrice}</p>
          <p className="text-[9px] text-green-600 font-bold mt-0.5">✔ Instant Confirmation</p>
        </div>
        <button className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D57E1B] to-[#00618C] hover:from-[#F6931F] hover:to-[#0070A1] text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all duration-300">
          View Details <ArrowRight size={11} />
        </button>
      </div>
    </motion.div>
  );
});

/* ================= LIST CARD ================= */
const ListCard = memo(function ListCard({ pkg, onSelect }) {
  const discount = pkg.originalPrice && pkg.discountedPrice
    ? Math.round((1 - Number(pkg.discountedPrice) / Number(pkg.originalPrice)) * 100) : null;
  return (
    <motion.div onClick={() => onSelect(pkg)} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative flex flex-col sm:flex-row w-full rounded-[22px] overflow-hidden bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] shadow-md hover:shadow-2xl hover:border-[#F6931F]/40 transition-all duration-500 cursor-pointer">
      <div className="relative w-full sm:w-[220px] h-52 sm:h-auto shrink-0 overflow-hidden">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/40" />
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <span className="bg-black/60 border border-white/10 backdrop-blur-sm text-white text-[9px] px-2.5 py-1 rounded-full font-bold">{pkg.flightBadge}</span>
          <span className="bg-[#F6931F] text-white text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">{pkg.urgencyTag}</span>
        </div>
        {discount > 0 && <div className="absolute bottom-3 left-3 z-10 bg-green-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow">-{discount}% OFF</div>}
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div className="space-y-2">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#0070A1] font-bold">{pkg.subtitle}</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-[#F6931F] transition uppercase line-clamp-1 leading-tight mt-0.5">{pkg.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold"><MapPin size={10} className="text-[#F6931F]" /> {pkg.location}</span>
              <span className="text-slate-200 dark:text-white/10">|</span>
              <span className="text-[10px] text-slate-400 font-medium">{pkg.category}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">📅 {pkg.duration}</span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">👥 {pkg.groupSize}</span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">🏨 {pkg.tier}</span>
            <span className="flex items-center gap-1 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-lg px-2.5 py-1">🍽 {pkg.plan}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            {pkg.highlights.map((h, i) => (
              <span key={i} className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#F6931F] inline-block" /> {h}
              </span>
            ))}
          </div>
          <InclusionBadges inclusions={pkg.inclusions} />
        </div>
      </div>
      <div className="sm:w-[190px] shrink-0 p-5 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 bg-slate-50/60 dark:bg-white/[0.01] border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-white/5">
        <div className="text-left sm:text-center space-y-1">
          <p className="line-through text-[10px] font-bold text-slate-400 font-mono">£ {pkg.originalPrice}</p>
          <p className="text-2xl font-black text-[#F6931F] tracking-tight leading-none">£ {pkg.discountedPrice}</p>
          <p className="text-[9px] text-green-600 font-bold">✔ Instant Confirmation</p>
          <p className="text-[9px] text-slate-400 dark:text-white/30 font-semibold">💬 WhatsApp Available</p>
        </div>
        <div className="flex flex-col items-end sm:items-center gap-2">
          <StarRow rating={pkg.rating} reviewsCount={pkg.reviewsCount} />
          <button className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D57E1B] to-[#00618C] hover:from-[#F6931F] hover:to-[#0070A1] text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all duration-300">
            View Deal <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

/* ================= MODAL TAB CONTENT ================= */

// Overview Tab


// Itinerary Tab
const ItineraryTab = memo(function ItineraryTab({ selected }) {
  const [openDay, setOpenDay] = useState(0);
  return (
    <div className="space-y-3">
      <p className="uppercase text-xs tracking-[2px] font-bold text-slate-400 dark:text-slate-500 mb-2">Day-by-Day Plan</p>
      {selected.itinerary.map((item, i) => (
        <div key={i} className="border border-slate-100 dark:border-white/10 rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpenDay(openDay === i ? -1 : i)}
            className="w-full flex items-center justify-between p-4 text-left bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#F6931F] to-[#0070A1] flex items-center justify-center text-white text-xs font-black">
                {item.day}
              </span>
              <span className="font-bold text-sm text-slate-800 dark:text-white">{item.title}</span>
            </div>
            {openDay === i ? <ChevronUp size={16} className="text-[#F6931F] shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
          </button>
          <AnimatePresence>
            {openDay === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-3 border-t border-slate-100 dark:border-white/10">
                  <div className="flex gap-3">
                    <CalendarDays size={15} className="text-[#F6931F] mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
});

// Inclusions Tab
const InclusionsTab = memo(function InclusionsTab({ selected }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={16} className="text-green-500" />
          <p className="uppercase text-xs tracking-[2px] font-bold text-green-600 dark:text-green-400">What&apos;s Included</p>
        </div>
        <div className="space-y-2">
          {selected.included.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-green-50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/15 rounded-xl px-4 py-3">
              <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <XCircle size={16} className="text-red-400" />
          <p className="uppercase text-xs tracking-[2px] font-bold text-red-500 dark:text-red-400">What&apos;s Excluded</p>
        </div>
        <div className="space-y-2">
          {selected.excluded.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/15 rounded-xl px-4 py-3">
              <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Hotel & Flight Tab
const HotelFlightTab = memo(function HotelFlightTab({ selected }) {
  return (
    <div className="space-y-6">
      {/* Hotel */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Hotel size={16} className="text-[#F6931F]" />
          <p className="uppercase text-xs tracking-[2px] font-bold text-slate-500 dark:text-slate-400">Hotel Details</p>
        </div>
        <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-black text-slate-900 dark:text-white text-base">{selected.hotel.name}</h4>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(selected.hotel.stars)].map((_, i) => (
                  <Star key={i} size={11} className="fill-amber-400 stroke-none" />
                ))}
              </div>
            </div>
           <span className="shrink-0 bg-[#F6931F]/10 border border-[#F6931F]/20 text-[#F6931F] text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider hidden sm:flex">
  {selected.hotel.roomType}
</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-white/[0.04] rounded-xl p-3 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Check-in</p>
              <p className="font-bold text-slate-800 dark:text-white">{selected.hotel.checkIn}</p>
            </div>
            <div className="bg-white dark:bg-white/[0.04] rounded-xl p-3 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Check-out</p>
              <p className="font-bold text-slate-800 dark:text-white">{selected.hotel.checkOut}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {selected.hotel.amenities.map((a, i) => (
                <span key={i} className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flight */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Plane size={16} className="text-[#0070A1]" />
          <p className="uppercase text-xs tracking-[2px] font-bold text-slate-500 dark:text-slate-400">Flight Details</p>
        </div>
        <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-slate-900 dark:text-white text-base">{selected.flight.airline}</h4>
            <span className="bg-[#0070A1]/10 border border-[#0070A1]/20 text-[#0070A1] text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">
              {selected.flight.class}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white dark:bg-white/[0.04] rounded-xl p-3 border border-slate-100 dark:border-white/10">
              <Plane size={14} className="text-[#0070A1] shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Outbound</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{selected.flight.departure}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-white/[0.04] rounded-xl p-3 border border-slate-100 dark:border-white/10">
              <Plane size={14} className="text-[#F6931F] shrink-0 rotate-180" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Return</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{selected.flight.returnFlight}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-white/[0.04] rounded-xl p-3 border border-slate-100 dark:border-white/10">
              <span className="text-sm">🧳</span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Baggage Allowance</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{selected.flight.baggage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Contact Tab
const ContactTab = memo(function ContactTab({ selected, form, handleChange, handleSubmit, handleWhatsApp, isSubmitting }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-slate-500 dark:text-slate-400 text-sm">Fill in your details and we&apos;ll get back to you within 2 hours.</p>
      <input type="text" name="name" required placeholder="Your Full Name" value={form.name} onChange={handleChange}
        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F]/30 outline-none transition-all text-sm" />
      <input type="number" name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange}
        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F]/30 outline-none transition-all text-sm" />
      <textarea name="message" rows={4} placeholder="Any special requests or modifications required?" value={form.message} onChange={handleChange}
        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F]/30 outline-none transition-all text-sm resize-none" />
      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 pt-2">
        <Lock size={14} /> Your details are private and won&apos;t be shared.
      </div>
      <div className="grid grid-cols-2 gap-3 pt-4">
        <button type="submit" disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-[#F6931F] hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.985] shadow-lg shadow-orange-600/30">
          {isSubmitting ? (
            <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg><span>Sending...</span></>
          ) : (<><Send size={17} /> Message Us</>)}
        </button>
        <button type="button" disabled={isSubmitting} onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.985]">
          <MessageCircle size={17} /> WhatsApp
        </button>
      </div>
    </form>
  );
});

/* ================= MAIN PAGE ================= */
export default function HolidayPackages() {
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("itinery");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const TABS = [
   
    { id: "Itinerary",    icon: <CalendarDays size={13} /> },
    { id: "Inclusions",   icon: <CheckCircle2 size={13} /> },
   
    { id: "Hotel & Flight", icon: <Hotel size={13} /> },
    { id: "Contact us",   icon: <MessageCircle size={13} /> },
  ];

  const handleSelect = useCallback((pkg) => {
    setSelected(pkg);
    setActiveTab("Itinerary");
  }, []);

  const prevCard = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const nextCard = useCallback(() => setCurrentIndex((i) => Math.min(tourPackages.length - 1, i + 1)), []);

  const handleTouchStart = useCallback((e) => setTouchStart(e.targetTouches[0].clientX), []);
  const handleTouchMove  = useCallback((e) => setTouchEnd(e.targetTouches[0].clientX), []);
  const handleTouchEnd   = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextCard();
    else if (distance < -50) prevCard();
    setTouchStart(null); setTouchEnd(null);
  }, [touchStart, touchEnd, nextCard, prevCard]);

  const handleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const whatsappNumber = "+442038766846";
  const handleWhatsApp = useCallback(() => {
    if (!selected) return;
    const msg = `Hi, I am interested in the *${selected.title}* package priced at £${selected.discountedPrice}.\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  }, [selected, form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: form.message, packageName: selected?.title || "Custom Package Inquiry", packagePrice: selected?.discountedPrice || "N/A" }),
      });
      const data = await response.json();
      if (data.success) { alert("Inquiry Sent Successfully!"); setForm({ name: "", phone: "", message: "" }); }
      else alert(`Submission Failed: ${data.error}`);
    } catch (error) {
      console.error(error);
      alert("Network Error: Verification with mail host failed.");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, selected]);

  const VIEW_MODES = [
    { id: "grid", label: "Grid",  icon: <LayoutGrid size={16} /> },
    { id: "list", label: "List",  icon: <List size={16} /> },
  ];

  return (
    <section className="w-full py-14 bg-slate-50 dark:bg-[#01080C] transition-colors duration-500">
      <div className="w-full max-w-12xl mx-auto px-4 sm:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10">
          <div className="max-w-8xl text-left">
            <span className="mb-3 inline-flex rounded-full bg-[#E68213]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68213]">Trending Deals</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
              Best Budget Holiday{" "}
              <span className="text-2xl sm:text-4xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent ml-1 font-serif">Tours & Packages</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Explore your favorite locations with our top all-inclusive holiday offers featuring flights, premium hotels, guided tours, and swift transport execution tailored for smart travellers.
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-1 self-start md:self-auto shadow-sm">
            {VIEW_MODES.map((v) => (
              <button key={v.id} onClick={() => setViewMode(v.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${viewMode === v.id ? "bg-gradient-to-r from-[#F6931F] to-[#0070A1] text-white shadow-md" : "text-slate-400 dark:text-white/40 hover:text-slate-700 dark:hover:text-white"}`}>
                {v.icon} <span className="hidden sm:inline">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div>
            <div className="sm:hidden">
              <div className="relative touch-pan-y" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <AnimatePresence mode="wait">
                  <motion.div key={currentIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: "spring", stiffness: 280, damping: 26 }}>
                    <GridCard pkg={tourPackages[currentIndex]} onSelect={handleSelect} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-between mt-4 px-1">
                <button onClick={prevCard} disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#F6931F] hover:text-[#F6931F] transition-all shadow-sm">
                  <ArrowLeft size={13} /> Prev
                </button>
                <div className="flex items-center gap-1.5">
                  {tourPackages.map((_, i) => (
                    <button key={i} onClick={() => setCurrentIndex(i)}
                      className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-5 h-2 bg-[#F6931F]" : "w-2 h-2 bg-slate-300 dark:bg-white/20 hover:bg-[#F6931F]/50"}`} />
                  ))}
                </div>
                <button onClick={nextCard} disabled={currentIndex === tourPackages.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#F6931F] hover:text-[#F6931F] transition-all shadow-sm">
                  Next <ArrowRight size={13} />
                </button>
              </div>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {tourPackages.map((pkg, i) => (
                <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <GridCard pkg={pkg} onSelect={handleSelect} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="flex flex-col gap-5">
            {tourPackages.map((pkg, i) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <ListCard pkg={pkg} onSelect={handleSelect} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-7xl bg-white dark:bg-[#0A1118] border border-white/10 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col lg:flex-row"
            >
              {/* Left: Media */}
              <div className="relative lg:w-[46%] shrink-0 min-h-[260px] lg:min-h-0 flex flex-col justify-end overflow-hidden">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <button onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 backdrop-blur-md p-3 rounded-2xl text-white transition-all hover:scale-105 z-30">
                  <X size={20} strokeWidth={2.5} />
                </button>
                <div className="absolute top-6 left-6 flex gap-2 z-20">
                  <span className= " hidden md:inline-block bg-black/70 border border-white/20 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-2xl font-semibold shadow-lg">{selected.flightBadge}</span>
<span className="hidden md:inline-block bg-gradient-to-r from-[#F6931F] to-orange-600 text-white text-xs px-3.5 py-1.5 rounded-2xl font-bold uppercase tracking-widest shadow-lg">
  {selected.urgencyTag}
</span>
                </div>
                <div className="relative z-10 p-8 pb-9">
                  <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold uppercase tracking-[2px] px-4 py-2 rounded-2xl mb-3">{selected.subtitle}</span>
                  <h2 className="text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter mb-3">{selected.title}</h2>
                  <p className="text-white/80 flex items-center gap-2 text-lg mb-5"><MapPin size={20} className="text-[#F6931F]" /> {selected.location}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="line-through text-white/40 text-sm font-medium">£{selected.originalPrice}</p>
                      <p className="text-4xl font-black text-[#F6931F] tracking-tighter">£{selected.discountedPrice}</p>
                    </div>
                    <StarRow rating={selected.rating} reviewsCount={selected.reviewsCount} size={18} />
                  </div>
                </div>
              </div>

              {/* Right: Tabbed Content */}
              <div className="flex-1 flex flex-col bg-white dark:bg-[#0A1118] min-h-0">
                {/* Tab bar — horizontally scrollable on mobile */}
                <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-slate-100 dark:border-white/10 px-4 sm:px-6 flex-shrink-0 scrollbar-none">
                  {TABS.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 py-4 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all relative -mb-px whitespace-nowrap flex-shrink-0 ${
                        activeTab === tab.id
                          ? "border-[#F6931F] text-[#F6931F]"
                          : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}>
                      {tab.icon} <span className="hidden sm:inline">{tab.id}</span>
                      <span className="sm:hidden">{tab.id.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                   
                      {activeTab === "Itinerary"     && <ItineraryTab selected={selected} />}
                      {activeTab === "Inclusions"    && <InclusionsTab selected={selected} />}
                
                      {activeTab === "Hotel & Flight" && <HotelFlightTab selected={selected} />}
                      {activeTab === "Contact us"    && (
                        <ContactTab
                          selected={selected} form={form}
                          handleChange={handleChange} handleSubmit={handleSubmit}
                          handleWhatsApp={handleWhatsApp} isSubmitting={isSubmitting}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}