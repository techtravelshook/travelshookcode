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
  X,
} from "lucide-react";
import HotelDetailModal from "@/components/hotels/HotelDetailModal";
import MAKKAH_HOTELS from "@/data/makkahhotels";

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Star Rating", "Distance"];
const FILTER_STARS = [5, 4, 3];

export default function MakkahHotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingHotel, setBookingHotel] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [filterStars, setFilterStars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: ''
  });

  // Filter + sort logic
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

  const openBooking = (hotel) => {
    setBookingHotel(hotel);
    setFormData({
      checkIn: '',
      checkOut: '',
      guests: 2,
      name: '',
      email: '',
      phone: ''
    });
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingHotel(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateGuests = (newGuests) => {
    if (newGuests >= 1 && newGuests <= 8) {
      setFormData(prev => ({ ...prev, guests: newGuests }));
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingHotel) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/hotelbooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName: bookingHotel.name,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          formType: "Hotel Booking"
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Booking request sent successfully!");
        closeBooking();
      } else {
        alert(result.message || "Failed to send request");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <Image
          src="/imgs/hotels/makkah_hotel.jpg"
          alt="Makkah Hotels"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-[#E68213]/20 opacity-40"
          style={{ boxShadow: "0 0 80px 10px rgba(230,130,19,0.12)" }}
        />

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

      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#01080C]/95 backdrop-blur border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <div className="relative w-full sm:flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
            <input
              type="text"
              placeholder="Search hotels…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto appearance-none rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] pl-4 pr-9 py-2.5 text-sm text-slate-900 dark:text-white"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o} value={o} className="dark:text-black">{o}</option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <button
              onClick={() => setShowFilters((p) => !p)}
              className={`whitespace-nowrap flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                showFilters || filterStars.length > 0
                  ? "border-[#E68213]/40 bg-[#E68213]/10 text-[#E68213]"
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
        </div>

        {showFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] text-slate-500 dark:text-white/60 uppercase font-bold tracking-wider">
              Star Rating
            </span>
            {FILTER_STARS.map((s) => (
              <button
                key={s}
                onClick={() => toggleStar(s)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                  filterStars.includes(s)
                    ? "border-[#E68213] bg-[#E68213]/10 text-[#E68213]"
                    : "border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:border-[#E68213]/40"
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
                className="text-[11px] text-slate-400 hover:text-[#E68213] underline"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hotel Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-xs text-slate-400 dark:text-white/40 font-semibold mb-6">
          Showing <span className="text-slate-700 dark:text-white">{filtered.length}</span> of{" "}
          {MAKKAH_HOTELS.length} hotels in Makkah
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🕌</div>
            <p className="text-lg font-bold text-slate-700 dark:text-white">No hotels found</p>
            <p className="text-sm text-slate-400 dark:text-white/40 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onViewDetails={() => setSelectedHotel(hotel)}
                onBookNow={() => openBooking(hotel)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedHotel && (
        <HotelDetailModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}

      {/* Booking Modal */}
{isBookingOpen && bookingHotel && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300">
    
    {/* Backdrop Click Closer (Optional wrapper if needed) */}
    <div className="w-full sm:max-w-xl bg-white dark:bg-[#0B1116] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] transition-transform duration-300 ease-out transform translate-y-0">
      
      {/* Sticky Image Header */}
      <div className="relative h-44 sm:h-56 w-full flex-shrink-0">
        <Image
          src={bookingHotel.img}
          alt={bookingHotel.name}
          fill
          priority
          className="object-cover"
        />
        {/* Sleeker gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closeBooking}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all active:scale-95"
        >
          <X size={18} />
        </button>

        {/* Hotel Details Title */}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-1">
            {bookingHotel.name}
          </h2>
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-200 mt-1 font-medium">
            <MapPin size={14} className="text-[#E68213]" />
            {bookingHotel.distanceFromHaram}
          </p>
        </div>
      </div>

      {/* Scrollable Container for Form */}
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-6">
          
          {/* Price & Rating Summary */}
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
            <div>
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">
                Total starting from
              </p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#E68213] tracking-tight">
                  {bookingHotel.price}
                </span>
                <span className="text-xs text-zinc-400 font-medium">/ night</span>
              </div>
            </div>

            <div className="text-right bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 justify-end">
                <span>⭐</span> {bookingHotel.rating}
              </p>
              <p className="text-[11px] text-zinc-400 font-medium">Guest favorite</p>
            </div>
          </div>

          {/* Unified Booking Widget (Airbnb Style Group) */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/20 grid grid-cols-2">
            {/* Check-in */}
            <div className="p-3 border-r border-b border-zinc-200 dark:border-zinc-800">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Check-in
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
                className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
              />
            </div>

            {/* Check-out */}
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Check-out
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
                className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
              />
            </div>

            {/* Guest Selector Counter */}
            <div className="col-span-2 p-3 flex items-center justify-between">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Guests
                </label>
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                  {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              
              <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1">
                <button
                  type="button"
                  disabled={formData.guests <= 1}
                  onClick={() => updateGuests(formData.guests - 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => updateGuests(formData.guests + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[#E68213] hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form Inputs */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
              Contact Information
            </p>
            
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#E68213] focus:ring-1 focus:ring-[#E68213] transition"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#E68213] focus:ring-1 focus:ring-[#E68213] transition"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#E68213] focus:ring-1 focus:ring-[#E68213] transition"
            />
          </div>

          {/* Submit Action Block */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E68213] to-[#ff9823] text-white font-bold text-base shadow-md shadow-[#E68213]/20 hover:shadow-lg hover:shadow-[#E68213]/30 hover:brightness-105 active:scale-[0.99] transition disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Sending..." : "Send Booking Request"}
            </button>

            <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium">
              You’ll receive confirmation via email
            </p>
          </div>

        </form>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

// Hotel Card Component
function HotelCard({ hotel, onViewDetails, onBookNow }) {
  return (
    <div className="group relative flex flex-col rounded-[24px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden p-3.5 transition-all duration-200 hover:border-[#E68213]/25 hover:bg-orange-400/5 dark:hover:bg-orange-400/[0.02] h-full">
      <div className="relative w-full h-44 rounded-xl overflow-hidden flex-shrink-0 mb-3">
        <Image
          src={hotel.img}
          alt={hotel.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-1">
          <Star size={9} fill="#E68213" stroke="none" />
          <span className="text-[10px] font-bold text-white">{hotel.rating}</span>
        </div>
      </div>

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

        <div className="mt-5 border-t border-black/[0.04] dark:border-white/[0.04] pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Starting From</span>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-black text-[#E68213]">{hotel.price}</span>
                <span className="text-xs text-slate-400 mb-1">/night</span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Star size={12} fill="#E68213" stroke="none" />
                <span className="font-bold text-sm">{hotel.rating}</span>
              </div>
              <p className="text-xs text-slate-400">Excellent</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onViewDetails}
              className="h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-sm font-semibold hover:border-[#E68213] hover:text-[#E68213] transition-all"
            >
              View Details
            </button>
            <button
              onClick={onBookNow}
              className="h-11 rounded-xl bg-[#E68213] text-white text-sm font-semibold hover:bg-[#d36e00] transition-all shadow-lg shadow-orange-500/20"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}