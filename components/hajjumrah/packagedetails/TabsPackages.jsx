"use client";

import React, { useState } from "react";

const normalizePackage = (pkg) => {
  if (!pkg) return null;
  const price = pkg.price ?? pkg.startingPrice ?? pkg.basePrice ?? pkg.amount ?? pkg.pricing?.price ?? 0;

  return { ...pkg, price, duration: pkg.duration ?? 0 };
};

/* ─────────────────────────────────────────────
   ICONS (Improved)
───────────────────────────────────────────── */
const IconOverview = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);
const IconCalendar = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IconCheck = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);
const IconHotel = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

/* Star Row */
const StarRow = ({ count = 3 }) => (
  <span className="inline-flex items-center gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F6931F" stroke="#F6931F" strokeWidth="1">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </span>
);

/* Tabs */
const TABS = [
  { key: "overview", label: "Overview", Icon: IconOverview },
  { key: "itinerary", label: "Itinerary", Icon: IconCalendar },
  { key: "inclusions", label: "Inclusions", Icon: IconCheck },
  { key: "hotels", label: "Hotels", Icon: IconHotel },
];

export default function PackageTabsBlock({ pkg: rawPkg }) {
  const [activeTab, setActiveTab] = useState("overview");
  const pkg = normalizePackage(rawPkg);
  if (!pkg) return null;

  const { starNum, duration, price, makkahHotel, madinahHotel, description } = pkg;

  const itinerary = [
    { title: "Departure", desc: "Assisted check-in and departure from your local airport.", icon: "🛫" },
    { title: "Arrival in Makkah", desc: `Arrive and check in to ${makkahHotel || "your selected hotel"}.`, icon: "🕋" },
    { title: "Umrah & Ziyarah", desc: "Perform Umrah and visit important Islamic sites with guided tours.", icon: "🙏" },
    { title: "Transfer to Madinah", desc: `Transfer and check in to ${madinahHotel || "your selected hotel"}.`, icon: "🌴" },
    { title: "Return Home", desc: "Departure flight back home with full assistance.", icon: "🏠" },
  ].map((item, i) => ({ ...item, day: i + 1 }));

  return (
    <div className="max-w-8xl mx-auto px-4 py-5 font-Mulish text-center">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#F6931F] font-bold tracking-[2px] uppercase text-sm mb-2">DETAILED PACKAGE</p>
       <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] bg-clip-text text-transparent pr-1 inline-block">
  Everything You Need to Know
</h2>

      </div>

      {/* Modern Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 mb-10 overflow-x-auto scrollbar-none">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2.5 px-8 py-5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap
              ${activeTab === key
                ? "border-[#F6931F] text-[#F6931F]"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
          >
            <Icon className={activeTab === key ? "text-[#F6931F]" : ""} />
            {label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-10">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
            {description || "A spiritually enriching journey with premium accommodations, seamless logistics, and expert guidance."}
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#0A1118] border border-slate-100 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <p className="text-xs uppercase tracking-widest text-slate-400">Duration</p>
              <p className="text-5xl font-black text-slate-900 dark:text-white mt-3">{duration} <span className="text-2xl">Nights</span></p>
            </div>

            <div className="bg-white dark:bg-[#0A1118] border border-slate-100 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <p className="text-xs uppercase tracking-widest text-slate-400">Hotel Rating</p>
              <div className="flex items-center gap-3 mt-4">
                <StarRow count={starNum} />
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{starNum}★</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F6931F] to-orange-600 text-white border border-orange-400 rounded-3xl p-8 hover:shadow-2xl transition-all">
              <p className="text-xs uppercase tracking-widest opacity-90">Starting From</p>
              <p className="text-5xl font-black mt-3">£{Number(price).toLocaleString()}</p>
            </div>
          </div>

          {/* Quick Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🕋", text: "Direct Haram Access" },
              { icon: "🛫", text: "Return Flights" },
              { icon: "🕌", text: "Guided Ziyarah" },
              { icon: "🛡️", text: "Fully Protected" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-6 hover:border-[#F6931F] transition-colors">
                <span className="text-3xl">{item.icon}</span>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ITINERARY */}
      {activeTab === "itinerary" && (
        <div>
          <p className="uppercase tracking-widest text-xs text-slate-400 mb-8">DAY-BY-DAY JOURNEY</p>
          <div className="space-y-8">
            {itinerary.map((item, idx) => {
              const isLast = idx === itinerary.length - 1;
              return (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex flex-col items-center w-14 flex-shrink-0 pt-1">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 border-2 border-[#F6931F]/30 flex items-center justify-center text-2xl shadow-sm group-hover:border-[#F6931F] transition-colors">
                      {item.icon}
                    </div>
                    {!isLast && <div className="w-px h-12 bg-gradient-to-b from-[#F6931F]/30 to-transparent mt-3" />}
                  </div>

                  <div className="flex-1 bg-white dark:bg-[#0A1118] border border-slate-100 dark:border-white/10 rounded-3xl p-8 hover:shadow-xl transition-all">
                    <div className="inline-flex items-center bg-[#F6931F]/10 text-[#F6931F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                      DAY {String(item.day).padStart(2, "0")}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* INCLUSIONS */}
      {activeTab === "inclusions" && (
        <div className="space-y-8">
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Everything is taken care of so you can focus only on your spiritual journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Return Flights (Economy)", "4/5-Star Hotel Accommodation", "Airport Transfers (Private)",
              "Umrah Visa Processing", "Guided Ziyarah Tours", "Experienced Mutawwif/Guide",
              "24/7 Support Team", "All Taxes & Service Charges", "Travel Insurance (Optional)", "Daily Breakfast & Meals"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-6 hover:border-[#F6931F] transition-all group">
                <div className="text-[#F6931F] text-2xl mt-0.5 group-hover:scale-110 transition-transform">✓</div>
                <p className="text-slate-700 dark:text-slate-200 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOTELS */}
      {activeTab === "hotels" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            { city: "Makkah", hotel: makkahHotel, icon: "🕋", proximity: "Few minutes walk to Masjid al-Haram" },
            { city: "Madinah", hotel: madinahHotel, icon: "🌴", proximity: "Close to Masjid an-Nabawi" },
          ].map((hotel, i) => (
            <div key={i} className="group relative bg-white dark:bg-[#0A1118] border border-slate-100 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="h-2 bg-gradient-to-r from-[#F6931F] to-orange-500" />
              <div className="p-10">
                <div className="text-6xl mb-6 opacity-90">{hotel.icon}</div>
                <p className="uppercase text-xs tracking-widest text-[#F6931F] font-bold">{hotel.city}</p>
                <h3 className="text-3xl font-bold mt-2 mb-4 text-slate-900 dark:text-white">{hotel.hotel}</h3>
                <p className="text-slate-500 dark:text-slate-400">{hotel.proximity}</p>

                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
                  <StarRow count={starNum} />
                  <span className="text-sm text-slate-500 dark:text-slate-400">{starNum}-Star • Premium Service</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}