"use client";
import React, { useState } from "react";

const normalizePackage = (pkg) => {
  if (!pkg) return null;
  const price = pkg.price ?? pkg.startingPrice ?? pkg.basePrice ?? pkg.amount ?? pkg.pricing?.price ?? 0;
  return { ...pkg, price, duration: pkg.duration ?? 0 };
};

const StarRow = ({ count = 5 }) => (
  <span className="inline-flex items-center gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F6931F" stroke="#F6931F" strokeWidth="1">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </span>
);

const TABS = [
  { key: "overview",   label: "Overview",   icon: "🕐" },
  { key: "itinerary",  label: "Itinerary",  icon: "📅" },
  { key: "inclusions", label: "Inclusions", icon: "✅" },
  { key: "hotels",     label: "Hotels",     icon: "🏨" },
];

export default function PackageTabsBlock({ pkg: rawPkg }) {
  const [activeTab, setActiveTab] = useState("overview");
  const pkg = normalizePackage(rawPkg);
  if (!pkg) return null;

  const { starNum = 5, duration, price, makkahHotel, madinahHotel, description } = pkg;

  const itinerary = [
    { title: "Departure",          desc: "Assisted check-in and departure from your local airport.", icon: "🛫" },
    { title: "Arrival in Makkah",  desc: `Arrive and check in to ${makkahHotel || "your selected hotel"}, steps from Masjid al-Haram.`, icon: "🕋" },
    { title: "Umrah & Ziyarah",    desc: "Perform Umrah and visit important Islamic sites with guided tours.", icon: "🙏" },
    { title: "Transfer to Madinah",desc: `Transfer and check in to ${madinahHotel || "your selected hotel"}, close to Masjid an-Nabawi.`, icon: "🌴" },
    { title: "Return Home",        desc: "Departure flight back home with full assistance from our team.", icon: "🏠" },
  ].map((item, i) => ({ ...item, day: i + 1 }));

  const panelClass = "animate-[fadeIn_.25s_ease]";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-Mulish">
      {/* Header */}
      <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#F6931F] mb-2">Detailed Package</p>
      <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] bg-clip-text text-transparent inline-block mb-10">
        Everything You Need to Know
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 mb-10 overflow-x-auto scrollbar-none">
        {TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-6 py-4 text-[13px] font-bold tracking-wide border-b-2 transition-all whitespace-nowrap mb-[-1px]
              ${activeTab === key
                ? "border-[#F6931F] text-[#F6931F]"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100"}`}
          >
            <span>{icon}</span>{label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className={panelClass}>
          <p className="text-[15px] leading-[1.8] text-slate-500 dark:text-slate-400 max-w-2xl mb-6">
            {description || "A spiritually enriching journey with premium accommodations, seamless logistics, and expert guidance — every detail curated for your peace of mind."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-7">
              <p className="text-[10px] tracking-[2.5px] uppercase text-slate-400 font-bold">Duration</p>
              <div className="flex items-baseline gap-1.5 mt-3">
                <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{duration}</span>
                <span className="text-lg font-semibold text-slate-400">nights</span>
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-7">
              <p className="text-[10px] tracking-[2.5px] uppercase text-slate-400 font-bold">Hotel Rating</p>
              <StarRow count={starNum} />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">{starNum}-Star Premium</p>
            </div>
            <div className="bg-gradient-to-br from-[#F6931F] to-[#e07a10] rounded-2xl p-7">
              <p className="text-[10px] tracking-[2.5px] uppercase text-white/80 font-bold">Starting From</p>
              <div className="flex items-baseline gap-1 mt-3">
                <span className="text-2xl font-black text-white">£</span>
                <span className="text-5xl font-black tracking-tighter text-white">{Number(price).toLocaleString()}</span>
              </div>
              <p className="text-sm text-white/70 mt-1">per person</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "🕋", text: "Direct Haram Access" },
              { icon: "✈️",  text: "Return Flights Included" },
              { icon: "🕌", text: "Guided Ziyarah Tours" },
              { icon: "🛡️", text: "Fully ATOL Protected" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-4 hover:border-[#F6931F] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#F6931F]/10 flex items-center justify-center text-lg shrink-0">{item.icon}</div>
                <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ITINERARY */}
      {activeTab === "itinerary" && (
        <div className={panelClass}>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-6">Your day-by-day spiritual journey, thoughtfully planned at every step.</p>
          {itinerary.map((item, idx) => (
            <div key={idx} className="flex gap-4 mb-5">
              <div className="flex flex-col items-center w-11 shrink-0">
                <div className="w-11 h-11 rounded-[12px] border-[1.5px] border-[#F6931F]/30 bg-white dark:bg-white/5 flex items-center justify-center text-xl">{item.icon}</div>
                {idx < itinerary.length - 1 && <div className="w-px flex-1 mt-1.5" style={{background:"linear-gradient(to bottom, rgba(246,147,31,.3), transparent)", minHeight:20}} />}
              </div>
              <div className="flex-1 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-5 hover:border-[#F6931F]/40 transition-colors">
                <span className="inline-flex items-center bg-[#F6931F]/10 text-[#F6931F] text-[10px] font-black tracking-[2px] px-3 py-1 rounded-full mb-3 uppercase">
                  Day {String(item.day).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-extrabold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INCLUSIONS */}
      {activeTab === "inclusions" && (
        <div className={panelClass}>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-6">Everything is taken care of so you can focus solely on your spiritual journey.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["Return Flights (Economy)","4/5-Star Hotel Accommodation","Private Airport Transfers","Umrah Visa Processing","Guided Ziyarah Tours","Experienced Mutawwif/Guide","24/7 Support Team","All Taxes & Service Charges","Travel Insurance (Optional)","Daily Breakfast & Meals"]
              .map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl px-4 py-3.5 hover:border-[#F6931F] transition-colors group">
                  <div className="w-6 h-6 rounded-[7px] bg-[#F6931F]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F6931F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">{item}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* HOTELS */}
      {activeTab === "hotels" && (
        <div className={panelClass}>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-6">Handpicked premium hotels for both legs of your journey, chosen for proximity and comfort.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { city: "Makkah",  hotel: makkahHotel,  icon: "🕋", proximity: "A few minutes' walk to Masjid al-Haram" },
              { city: "Madinah", hotel: madinahHotel, icon: "🌴", proximity: "Close to Masjid an-Nabawi" },
            ].map((h, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[18px] overflow-hidden hover:border-[#F6931F]/40 transition-all">
                <div className="h-[5px] bg-gradient-to-r from-[#F6931F] to-[#ffb347]" />
                <div className="p-8">
                  <div className="w-14 h-14 rounded-[14px] bg-[#F6931F]/10 flex items-center justify-center text-3xl mb-5">{h.icon}</div>
                  <p className="text-[10px] tracking-[2.5px] uppercase text-[#F6931F] font-bold mb-1">{h.city}</p>
                  <h3 className="text-[1.3rem] font-black tracking-tight text-slate-900 dark:text-white mb-2">{h.hotel}</h3>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400">{h.proximity}</p>
                  <div className="flex items-center gap-2.5 mt-6 pt-5 border-t border-slate-100 dark:border-white/10">
                    <StarRow count={starNum} />
                    <span className="text-[12px] text-slate-400">{starNum}-Star · Premium Service</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}