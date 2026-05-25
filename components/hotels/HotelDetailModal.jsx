"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Wind,
  ShieldCheck,
  ArrowRight,
  BedDouble,
  Clock,
  Phone,
} from "lucide-react";

// ── Amenity icon map ────────────────────────────────────────────
const AMENITY_ICONS = {
  WiFi: Wifi,
  Parking: Car,
  Breakfast: Coffee,
  Restaurant: Utensils,
  "Air Conditioning": Wind,
  "24/7 Security": ShieldCheck,
  "Room Service": BedDouble,
  "Early Check-In": Clock,
  "Concierge": Phone,
};

export default function HotelDetailModal({ hotel, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!hotel) return null;

  const amenities = hotel.amenities ?? [
    "WiFi",
    "Parking",
    "Breakfast",
    "Restaurant",
    "Air Conditioning",
    "24/7 Security",
    "Room Service",
    "Early Check-In",
  ];

  const stars = hotel.stars ?? 4;
  const rating = hotel.rating ?? "4.5";
  const reviews = hotel.reviews ?? "1,240";
  const distanceFromHaram = hotel.distanceFromHaram ?? "850m from Masjid Al‑Haram";
  const checkIn = hotel.checkIn ?? "2:00 PM";
  const checkOut = hotel.checkOut ?? "12:00 PM";
  const gallery = hotel.gallery ?? [hotel.img, hotel.img, hotel.img];

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
    >
      {/* ── Modal Shell ─────────────────────────────────────── */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white dark:bg-[#0D1A22] shadow-2xl"
        style={{ animation: "modalSlideUp 0.32s cubic-bezier(.16,1,.3,1)" }}
      >
        {/* ── Close Button ─────────────────────────────────── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-[#E68213] hover:text-white transition-all duration-200"
        >
          <X size={16} />
        </button>

        {/* ── Hero Image ───────────────────────────────────── */}
        <div className="relative w-full h-60 sm:h-72 rounded-t-[28px] overflow-hidden flex-shrink-0">
          <Image
            src={hotel.img}
            alt={hotel.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 896px"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Star badge */}
          <div className="absolute bottom-4 left-5 flex items-center gap-1">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} size={14} fill="#E68213" stroke="none" />
            ))}
            <span className="ml-1 text-xs font-bold text-white/90">
              {stars}-Star Hotel
            </span>
          </div>

          {/* Gallery thumbnails */}
          <div className="absolute bottom-4 right-5 flex gap-2">
            {gallery.slice(0, 3).map((src, i) => (
              <div
                key={i}
                className="relative h-10 w-14 rounded-lg overflow-hidden border-2 border-white/30"
              >
                <Image
                  src={src}
                  alt={`gallery-${i}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-white/40 font-semibold uppercase tracking-wider mb-2">
                <MapPin size={12} className="text-[#E68213]" />
                <span>{hotel.location}</span>
                <span className="mx-1 text-slate-300 dark:text-white/20">·</span>
                <span>{distanceFromHaram}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {hotel.name}
              </h2>

              {/* Rating row */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 rounded-full bg-[#E68213]/10 px-2.5 py-1">
                  <Star size={12} fill="#E68213" stroke="none" />
                  <span className="text-xs font-bold text-[#E68213]">{rating}</span>
                </div>
                <span className="text-xs text-slate-400 dark:text-white/40">
                  {reviews} verified reviews
                </span>
              </div>
            </div>

            {/* Price block */}
            <div className="flex-shrink-0 rounded-2xl bg-[#E68213]/5 border border-[#E68213]/15 px-5 py-4 text-right">
              <p className="text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-wider">
                Starting from
              </p>
              <p className="font-mono text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                {hotel.price}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-white/40">per night</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-black/[0.06] dark:border-white/[0.06] mb-6" />

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              About this Hotel
            </h3>
            <p className="text-sm text-slate-500 dark:text-white/50 leading-relaxed">
              {hotel.desc}
              {" "}Experience world-class hospitality just steps away from the
              Grand Mosque. Our hand-picked accommodations ensure your spiritual
              journey is matched with comfort and ease, so you can focus entirely
              on your worship and reflection.
            </p>
          </div>

          {/* Check-in / Check-out */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Check-In", value: checkIn, icon: Clock },
              { label: "Check-Out", value: checkOut, icon: Clock },
              { label: "Distance", value: distanceFromHaram.split(" ")[0], icon: MapPin },
              { label: "Category", value: `${stars} Stars`, icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-2xl border border-black/[0.05] dark:border-white/[0.05] bg-black/[0.015] dark:bg-white/[0.015] p-3.5"
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-wider">
                  <Icon size={10} className="text-[#E68213]" />
                  {label}
                </div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Amenities & Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity] ?? ShieldCheck;
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-1.5 rounded-full border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-white/70"
                  >
                    <Icon size={11} className="text-[#E68213]" />
                    {amenity}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/hotels/${hotel.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#E68213] text-white py-3.5 text-sm font-bold hover:bg-[#cf7410] transition-colors"
            >
              Book This Hotel <ArrowRight size={15} />
            </Link>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-transparent py-3.5 text-sm font-bold text-slate-700 dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
            >
              Back to Hotels
            </button>
          </div>
        </div>
      </div>

      {/* ── Keyframe animation ───────────────────────────── */}
      <style jsx global>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}