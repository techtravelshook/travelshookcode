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
  ArrowRight,
  Sparkles,
} from "lucide-react";

import HotelDetailModal from "@/components/hotels/HotelDetailModal";

const MADINAH_HOTELS = [
  {
    id: 1,
    name: "Madinah Hilton Hotel",
    desc: "A 5-star landmark hotel in the heart of Madinah. Located only 200m from Al-Masjid an-Nabawi.",
    price: "£180",
    location: "Madinah",
    stars: 5,
    rating: "4.7",
    reviews: "3,210",
    distanceFromHaram: "200m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel.jpg",
    amenities: [
      "WiFi",
      "Restaurant",
      "Breakfast",
      "Air Conditioning",
    ],
  },
  {
    id: 2,
    name: "Anwar Al Madinah Mövenpick Hotel",
    desc: "Situated directly adjacent to the Prophet's Mosque with exceptional service.",
    price: "£220",
    location: "Madinah",
    stars: 5,
    rating: "4.8",
    reviews: "4,100",
    distanceFromHaram: "Direct access to Al-Masjid an-Nabawi",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel2.jpg",
    amenities: [
      "WiFi",
      "Restaurant",
      "Breakfast",
      "Parking",
    ],
  },
  {
    id: 3,
    name: "Oberoi Madina",
    desc: "An ultra-luxury retreat offering serene suites and beautiful views.",
    price: "£350",
    location: "Madinah",
    stars: 5,
    rating: "4.9",
    reviews: "1,875",
    distanceFromHaram: "100m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel3.jpg",
    amenities: [
      "WiFi",
      "Restaurant",
      "Breakfast",
      "Parking",
    ],
  },
  {
    id: 4,
    name: "Dar Al Iman Royal Hotel",
    desc: "A reliable 4-star hotel popular among Umrah pilgrims.",
    price: "£110",
    location: "Madinah",
    stars: 4,
    rating: "4.4",
    reviews: "1,620",
    distanceFromHaram: "800m from Al-Masjid an-Nabawi",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    img: "/imgs/hotels/makkah_hotel2.jpg",
    amenities: ["WiFi", "Breakfast", "Air Conditioning"],
  },
];

const SORT_OPTIONS = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Star Rating",
];

const FILTER_STARS = [5, 4, 3];

export default function MadinahHotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [filterStars, setFilterStars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter hotels
  let filtered = MADINAH_HOTELS.filter((hotel) => {
    const matchSearch =
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.desc.toLowerCase().includes(search.toLowerCase());

    const matchStars =
      filterStars.length === 0 ||
      filterStars.includes(hotel.stars);

    return matchSearch && matchStars;
  });

  // Sorting
  if (sortBy === "Price: Low to High") {
    filtered = [...filtered].sort(
      (a, b) =>
        parseInt(a.price.replace(/\D/g, "")) -
        parseInt(b.price.replace(/\D/g, ""))
    );
  }

  if (sortBy === "Price: High to Low") {
    filtered = [...filtered].sort(
      (a, b) =>
        parseInt(b.price.replace(/\D/g, "")) -
        parseInt(a.price.replace(/\D/g, ""))
    );
  }

  if (sortBy === "Star Rating") {
    filtered = [...filtered].sort((a, b) => b.stars - a.stars);
  }

  const toggleStar = (star) => {
    setFilterStars((prev) =>
      prev.includes(star)
        ? prev.filter((s) => s !== star)
        : [...prev, star]
    );
  };

  return (
    <div className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white min-h-screen pb-24">
      
      {/* Hero Section */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <Image
          src="/imgs/hotels/makkah_hotel2.jpg"
          alt="Madinah Hotels"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-4 sm:px-6 lg:px-8">
          <Link
            href="/hajj-umrah"
            className="mb-4 flex items-center gap-2 text-white/70 hover:text-white text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Back to Umrah
          </Link>

          <p className="text-[#E68213] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <Sparkles size={12} />
            Saudi Arabia Accommodations
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Madinah Al Munawwarah Hotels
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-4 rounded-3xl">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Madinah hotels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-[#E68213]/40"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-11 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-2 ${
                showFilters || filterStars.length > 0
                  ? "border-[#E68213] bg-[#E68213]/10 text-[#E68213]"
                  : "border-black/10 dark:border-white/10"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 px-4 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm appearance-none pr-10"
              >
                {SORT_OPTIONS.map((option) => (
                  <option
    key={option}
    value={option}
    className="bg-[#01080C] text-white"
  >
                    {option}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-8 flex flex-wrap gap-3">
            {FILTER_STARS.map((star) => (
              <button
                key={star}
                onClick={() => toggleStar(star)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  filterStars.includes(star)
                    ? "bg-[#E68213] text-white border-[#E68213]"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                {star} Star
              </button>
            ))}

            {filterStars.length > 0 && (
              <button
                onClick={() => setFilterStars([])}
                className="text-sm text-[#E68213] underline"
              >
                Clear All
              </button>
            )}
          </div>
        )}

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filtered.map((hotel) => (
            <div
              key={hotel.id}
              className="group rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:-translate-y-1 transition-all duration-300"
            >
              
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={hotel.img}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {hotel.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <MapPin size={13} />
                  {hotel.distanceFromHaram}
                </div>

                <h2 className="text-lg font-bold mb-2 line-clamp-1">
                  {hotel.name}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-5">
                  {hotel.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">From</p>
                    <h3 className="text-2xl font-extrabold text-[#E68213]">
                      {hotel.price}
                    </h3>
                    <p className="text-xs text-slate-500">/night</p>
                  </div>

                  <button
                    onClick={() => setSelectedHotel(hotel)}
                    className="flex items-center gap-2 bg-[#E68213] hover:bg-[#d47205] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  >
                    Details
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">
              No Hotels Found
            </h3>
            <p className="text-slate-500">
              Try changing your filters or search query.
            </p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedHotel && (
        <HotelDetailModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
}