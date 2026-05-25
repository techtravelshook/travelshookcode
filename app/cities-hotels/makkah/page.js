"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  SlidersHorizontal,
  Search,
  ChevronDown,
} from "lucide-react";
import HotelDetailModal from "@/components/hotels/HotelDetailModal";

// ── Full hotel data for Makkah ─────────────────────────────────
const MAKKAH_HOTELS = [
  {
    id: 1,
    name: "Al Ebaa Hotel",
    desc: "Al Ebaa Hotel is one of the 4-star hotels in Makkah. This hotel is located around 850 m away from Masjid Al Haram. All rooms feature elegant designs with premium furnishings.",
    price: "£99",
    location: "Makkah",
    stars: 4,
    rating: "4.3",
    reviews: "982",
    distanceFromHaram: "850m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel.jpg",
    amenities: ["WiFi", "Parking", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service"],
  },
  {
    id: 2,
    name: "M Hotel Al Dana Makkah by Millennium",
    desc: "A 4-star hotel in Makkah located 6-7 minutes' drive from Masjid Al Haram. Features spacious rooms with modern décor, a dedicated prayer area, and panoramic city views.",
    price: "£122",
    location: "Makkah",
    stars: 4,
    rating: "4.5",
    reviews: "1,412",
    distanceFromHaram: "1.2km from Masjid Al‑Haram",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel2.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Concierge"],
  },
  {
    id: 3,
    name: "Infinity Hotel Makkah",
    desc: "Located just a 10 to 12-minute walk from Masjid Al-Haram, the Infinity Hotel Makkah inspires pilgrims through its blend of spiritual ambiance and premium hospitality.",
    price: "£145",
    location: "Makkah",
    stars: 4,
    rating: "4.6",
    reviews: "2,105",
    distanceFromHaram: "900m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    img: "/imgs/hotels/makkah_hotel3.jpg",
    amenities: ["WiFi", "Restaurant", "Room Service", "Air Conditioning", "24/7 Security", "Early Check-In"],
  },
  {
    id: 4,
    name: "Hilton Suites Makkah",
    desc: "An iconic 5-star property directly overlooking the Grand Mosque. The Hilton Suites offers unrivalled views of the Kaaba, fine dining, and butler service.",
    price: "£310",
    location: "Makkah",
    stars: 5,
    rating: "4.8",
    reviews: "3,840",
    distanceFromHaram: "Direct access to Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Parking", "Air Conditioning", "24/7 Security", "Room Service", "Concierge", "Early Check-In"],
  },
  {
    id: 5,
    name: "Dar Al Tawhid Intercontinental",
    desc: "Situated in the heart of Makkah opposite the Grand Mosque, this landmark 5-star hotel offers breath-taking views, exclusive lounge access, and world-class dining.",
    price: "£275",
    location: "Makkah",
    stars: 5,
    rating: "4.7",
    reviews: "2,560",
    distanceFromHaram: "50m from Masjid Al‑Haram",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel2.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Room Service", "Air Conditioning", "24/7 Security", "Concierge", "Early Check-In"],
  },
  {
    id: 6,
    name: "Swissôtel Al Maqam Makkah",
    desc: "A luxury skyscraper hotel at the Abraj Al Bait towers complex. The Swissôtel offers immaculate Swiss precision, floor-to-ceiling Haram views, and an elevated spiritual atmosphere.",
    price: "£260",
    location: "Makkah",
    stars: 5,
    rating: "4.7",
    reviews: "1,990",
    distanceFromHaram: "100m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel3.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Parking", "Air Conditioning", "24/7 Security", "Room Service", "Concierge"],
  },
  {
    id: 7,
    name: "Mövenpick Hotel & Residence Hajar Tower",
    desc: "Part of the iconic Abraj Al Bait complex, the Mövenpick blends Swiss hospitality with proximity to the Kaaba — offering a spiritual and luxurious Umrah experience.",
    price: "£195",
    location: "Makkah",
    stars: 5,
    rating: "4.6",
    reviews: "1,650",
    distanceFromHaram: "200m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Room Service", "Early Check-In"],
  },
  {
    id: 8,
    name: "Anjum Hotel Makkah",
    desc: "A refined 5-star hotel offering some of the closest non-tower access to the Grand Mosque. Anjum's thoughtful amenities and warm service make it a favourite for families.",
    price: "£185",
    location: "Makkah",
    stars: 5,
    rating: "4.5",
    reviews: "1,320",
    distanceFromHaram: "300m from Masjid Al‑Haram",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel2.jpg",
    amenities: ["WiFi", "Restaurant", "Breakfast", "Air Conditioning", "24/7 Security", "Parking", "Room Service"],
  },
];

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Star Rating", "Distance"];
const FILTER_STARS = [5, 4, 3];

export default function MakkahHotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [filterStars, setFilterStars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // ── Filter + sort logic
  let filtered = MAKKAH_HOTELS.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.desc.toLowerCase().includes(search.toLowerCase());
    const matchStars =
      filterStars.length === 0 || filterStars.includes(h.stars);
    return matchSearch && matchStars;
  });

  if (sortBy === "Price: Low to High")
    filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
  if (sortBy === "Price: High to Low")
    filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, "")));
  if (sortBy === "Star Rating")
    filtered = [...filtered].sort((a, b) => b.stars - a.stars);

  const toggleStar = (s) =>
    setFilterStars((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <div className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white min-h-screen">
      {/* ── Hero Banner */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <Image
          src="/imgs/hotels/makkah_hotel.jpg"
          alt="Makkah Hotels"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        {/* Decorative ring */}
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-[#E68213]/20 opacity-40"
          style={{ boxShadow: "0 0 80px 10px rgba(230,130,19,0.12)" }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-6 sm:px-10 max-w-7xl mx-auto">
          <Link
            href="/umrah"
            className="mb-4 flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors w-fit"
          >
            <ArrowLeft size={13} /> View Umrah Packages
          </Link>
          <div className="flex items-end gap-4 flex-wrap">
            <div>
              <p className="text-[#E68213] text-xs font-bold uppercase tracking-widest mb-1">
                Saudi Arabia
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
                Makkah Hotels
              </h1>
            </div>
            <div className="mb-1 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs text-white/70 font-semibold backdrop-blur-sm">
              {MAKKAH_HOTELS.length} properties
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Toolbar ──────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#01080C]/95 backdrop-blur border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30"
            />
            <input
              type="text"
              placeholder="Search hotels…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] pl-9 pr-4 py-2.5 text-sm placeholder:text-slate-400 dark:placeholder:text-white/30 text-slate-900 dark:text-white focus:outline-none focus:border-[#E68213]/50 transition-colors"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] pl-4 pr-9 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E68213]/50 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
              showFilters || filterStars.length > 0
                ? "border-[#E68213]/40 bg-[#E68213]/8 text-[#E68213]"
                : "border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.04] text-slate-700 dark:text-white"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {filterStars.length > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E68213] text-[9px] font-black text-white">
                {filterStars.length}
              </span>
            )}
          </button>
        </div>

        {/* Expandable filter row */}
        {showFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex items-center gap-3">
            <span className="text-[11px] text-white dark:text-white uppercase font-bold tracking-wider">
              Star Rating
            </span>
            {FILTER_STARS.map((s) => (
              <button
                key={s}
                onClick={() => toggleStar(s)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                  filterStars.includes(s)
                    ? "border-[#E68213] bg-[#E68213]/10 text-[#E68213]"
                    : "border-black/10 dark:border-white/10 text-slate-500 dark:text-white/50 hover:border-[#E68213]/40"
                }`}
              >
                <Star
                  size={10}
                  fill={filterStars.includes(s) ? "#E68213" : "none"}
                  stroke={filterStars.includes(s) ? "none" : "currentColor"}
                />
                {s} Stars
              </button>
            ))}
            {filterStars.length > 0 && (
              <button
                onClick={() => setFilterStars([])}
                className="text-[11px] text-slate-400 hover:text-[#E68213] transition-colors underline"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Hotel Grid ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results count */}
        <p className="text-xs text-slate-400 dark:text-white/40 font-semibold mb-6">
          Showing{" "}
          <span className="text-slate-700 dark:text-white">{filtered.length}</span> of{" "}
          {MAKKAH_HOTELS.length} hotels in Makkah
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🕌</div>
            <p className="text-lg font-bold text-slate-700 dark:text-white">
              No hotels found
            </p>
            <p className="text-sm text-slate-400 dark:text-white/40 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onViewDetails={() => setSelectedHotel(hotel)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Modal ───────────────────────────────────────────── */}
      {selectedHotel && (
        <HotelDetailModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
}

// ── Shared Hotel Card ──────────────────────────────────────────
function HotelCard({ hotel, onViewDetails }) {
  return (
    <div className="group relative flex flex-col rounded-[24px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden p-3.5 transition-all duration-200 hover:border-[#E68213]/25 hover:bg-orange-400/5 dark:hover:bg-orange-400/[0.02] h-full">
      {/* Image */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden flex-shrink-0 mb-3">
        <Image
          src={hotel.img}
          alt={hotel.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Star badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-1">
          <Star size={9} fill="#E68213" stroke="none" />
          <span className="text-[10px] font-bold text-white">{hotel.rating}</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-white/40 font-semibold uppercase tracking-wider mb-1.5">
            <MapPin size={11} className="text-[#E68213]" />
            <span>{hotel.location}</span>
            <span className="mx-1 text-slate-300 dark:text-white/20">·</span>
            <span>{hotel.distanceFromHaram?.split(" ")[0]}</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#E68213] transition-colors line-clamp-1">
            {hotel.name}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-white/60 mt-1 line-clamp-3 leading-relaxed">
            {hotel.desc}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col gap-3 border-t border-black/[0.04] dark:border-white/[0.04] pt-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-wider">
              from
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-mono text-xl font-black text-slate-900 dark:text-white">
                {hotel.price}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-white/40">/night</span>
            </div>
          </div>
          <button
            onClick={onViewDetails}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:bg-[#E68213] group-hover:text-white group-hover:border-[#E68213] transition-all duration-200 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowLeft
              size={13}
              className="rotate-180 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}