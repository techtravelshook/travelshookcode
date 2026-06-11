"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, PlaneTakeoff, ShieldCheck, Tag, Search, Flame, SlidersHorizontal, X, CheckCircle, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function FlightDealsGrid({ cityName, dealsData = [] }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedDeal, setSelectedDeal] = useState(null);

  // WhatsApp link generator
  const getWhatsAppLink = (route, price) => {
    const baseNumber = "923124928496";
    const text = encodeURIComponent(
      `Hi Travel Hooks, I would like to book: ${route} for ${price}. Please check availability.`
    );
    return `https://wa.me/${baseNumber}?text=${text}`;
  };

  // Calculate cheapest price
  const cheapestPrice = useMemo(() => {
    if (!dealsData || dealsData.length === 0) return 0;
    return Math.min(
      ...dealsData.map(d => parseInt(String(d.price).replace(/[^0-9]/g, ""), 10))
    );
  }, [dealsData]);

  // Filter + Sort
  const filteredDeals = useMemo(() => {
    let data = [...dealsData];

    if (query) {
      data = data.filter(d =>
        `${d.departureCity} ${d.destinationCity} ${d.airlineName} ${d.departureCode} ${d.destinationCode}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    if (sortBy === "cheap") {
      data.sort((a, b) =>
        parseInt(String(a.price).replace(/[^0-9]/g, ""), 10) -
        parseInt(String(b.price).replace(/[^0-9]/g, ""), 10)
      );
    }

    return data;
  }, [query, sortBy, dealsData]);

  return (
    <>
      <section className="relative w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 font-mulish transition-colors duration-500 dark:bg-[#01080C] overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#E68213]/10 blur-[100px] dark:bg-[#E68213]/5" />
          <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] rounded-full bg-[#0070A1]/10 blur-[120px] dark:bg-[#0070A1]/5" />
          <div className="absolute -bottom-20 right-10 w-[350px] h-[350px] rounded-full bg-[#E68213]/5 blur-[90px] dark:bg-[#0070A1]/5" />
        </div>

        <div className="relative mx-auto max-w-8xl w-full z-10">

          {/* ───────────────── HEADER ───────────────── */}
          <div className="mb-10 flex flex-col items-start text-start">
            
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800 backdrop-blur-sm shadow-sm transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] inline-block" />
              Live Flight Rates
            </span>

            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              Find Best Flight Deals From{" "}
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
                {cityName}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Search, compare, and instantly book exclusive promotional airfares negotiated directly with leading global airlines.
            </p>
          </div>

          {/* ───────────────── SEARCH & FILTERS ───────────────── */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch">

            <div className="flex items-center gap-3 border border-slate-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 rounded-xl px-4 py-3 flex-1 shadow-sm focus-within:border-[#0070A1] dark:focus-within:border-[#E68213] transition-colors">
              <Search size={18} className="text-slate-400 dark:text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destination, city, or airline..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-white font-medium placeholder-slate-400 dark:placeholder-zinc-600"
              />
            </div>

            <div className="flex items-center gap-4">
              
              <div className="flex items-center gap-2 border border-slate-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 dark:text-zinc-300 shadow-sm whitespace-nowrap">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Showing {filteredDeals.length} Routes</span>
              </div>

              <div className="flex items-center gap-2 border border-slate-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 rounded-xl px-3 py-3 text-sm shadow-sm flex-1 md:flex-initial">
                <SlidersHorizontal size={14} className="text-slate-400 dark:text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-white cursor-pointer pr-2"
                >
                  <option value="default" className="bg-white dark:bg-zinc-950 text-slate-700 dark:text-white">Default Sort</option>
                  <option value="cheap" className="bg-white dark:bg-zinc-950 text-slate-700 dark:text-white">Cheapest Price</option>
                </select>
              </div>

            </div>

          </div>
          {filteredDeals.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950/40 backdrop-blur-md">
              <p className="text-sm font-semibold text-slate-400 dark:text-zinc-500">No matching routes found for your current search filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDeals.map((deal, index) => {
                const route = `${deal.departureCode} → ${deal.destinationCode}`;
                const priceNumber = parseInt(String(deal.price).replace(/[^0-9]/g, ""), 10);
                const isBest = priceNumber === cheapestPrice;

                return (
                  <div
                    key={index}
                    className="group relative rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-6 hover:-translate-y-1 hover:shadow-xl dark:hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="absolute top-0 left-0 h-full w-[4px] bg-gradient-to-b from-[#E68213] to-[#0070A1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-l-2xl" />

                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2.5">
                          <div>
                            <div className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                              <span>{deal.departureCode}</span>
                              <PlaneTakeoff size={18} className="text-slate-300 dark:text-zinc-600 group-hover:translate-x-1 transition-transform" />
                              <span className="text-transparent bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text">
                                {deal.destinationCode}
                              </span>
                            </div>
                          </div>
                          
                      
                         {/* Airline Logo on Card */}
{deal.airlineLogo && (
                <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-zinc-900/50 p-1.5 flex items-center justify-center border border-slate-200/50 dark:border-zinc-800 flex-shrink-0">
                  <Image 
                    src={deal.airlineLogo.startsWith('/') ? deal.airlineLogo : `/${deal.airlineLogo}`}
                    width={48}
                    height={48}
                    alt={deal.airlineName || "Airline Logo"}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
                        </div>

                        {isBest && (
                          <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E68213]/10 dark:bg-[#E68213]/20 text-[#E68213] border border-[#E68213]/20 shadow-sm animate-pulse">
                            <Flame size={10} className="fill-current" />
                            Best Rate
                          </div>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                        {deal.departureCity} to {deal.destinationCity}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-dashed border-slate-100 dark:border-zinc-900">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
                          <Tag size={13} className="text-[#0070A1]" />
                          <span>{deal.airlineName}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
                          <ShieldCheck size={13} className="text-[#E68213]" />
                          <span>{deal.dates}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-900 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">All-Inclusive Price</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                         £ {deal.price}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedDeal(deal)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 hover:shadow-md active:scale-95 transition-all duration-300"
                      >
                        Book Now
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────── MODAL POPUP (COMPACT & ATTRACTIVE) ───────────────── */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden border border-slate-200/60 dark:border-zinc-800">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedDeal(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <X size={18} className="text-slate-600 dark:text-white" />
            </button>

            {/* Compact Header with Airline Logo */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#E68213] to-[#0070A1] p-4 text-white">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
              
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-1">Flight Route</p>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {selectedDeal.departureCode} → {selectedDeal.destinationCode}
                  </h2>
                  <p className="text-xs text-white/90 mt-1">{selectedDeal.departureCity} • {selectedDeal.destinationCity}</p>
                </div>
{/* Airline Logo on Card */}
{selectedDeal?.airlineLogo && (
  <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm p-1.5 flex items-center justify-center flex-shrink-0">
    <Image
      src={
        selectedDeal.airlineLogo.startsWith("/")
          ? selectedDeal.airlineLogo
          : `/${selectedDeal.airlineLogo}`
      }
      width={48}
      height={48}
      alt={selectedDeal.airlineName || "Airline Logo"}
      className="w-full h-full object-contain"
    />
  </div>
)}          </div>
            </div>

            {/* Compact Content */}
            <div className="p-4 sm:p-5">
              
              {/* Quick Info Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                
                {/* From */}
                <div className="p-3 bg-slate-50 dark:bg-zinc-900/50 rounded-lg border border-slate-200/50 dark:border-zinc-800">
                  <p className="text-xs font-bold text-slate-400 dark:text-zinc-500 mb-1">FROM</p>
                  <p className="font-black text-slate-900 dark:text-white">{selectedDeal.departureCode}</p>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">{selectedDeal.departureCity}</p>
                </div>

                {/* To */}
                <div className="p-3 bg-slate-50 dark:bg-zinc-900/50 rounded-lg border border-slate-200/50 dark:border-zinc-800">
                  <p className="text-xs font-bold text-slate-400 dark:text-zinc-500 mb-1">TO</p>
                  <p className="font-black text-slate-900 dark:text-white">{selectedDeal.destinationCode}</p>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">{selectedDeal.destinationCity}</p>
                </div>

                {/* Airline */}
                <div className="p-3 bg-slate-50 dark:bg-zinc-900/50 rounded-lg border border-slate-200/50 dark:border-zinc-800">
                  <p className="text-xs font-bold text-slate-400 dark:text-zinc-500 mb-1">AIRLINE</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{selectedDeal.airlineName}</p>
                </div>

                {/* Trip Type & Dates */}
                <div className="p-3 bg-slate-50 dark:bg-zinc-900/50 rounded-lg border border-slate-200/50 dark:border-zinc-800">
                  <p className="text-xs font-bold text-slate-400 dark:text-zinc-500 mb-1">TRAVEL</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm capitalize">{selectedDeal.tripType}</p>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">{selectedDeal.dates}</p>
                </div>

              </div>

              {/* Price - Highlighted */}
              <div className="mb-4 p-4 bg-gradient-to-br from-[#E68213]/15 to-[#0070A1]/15 dark:from-[#E68213]/10 dark:to-[#0070A1]/10 rounded-xl border-2 border-[#E68213]/30 dark:border-[#0070A1]/30">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">Total Price</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
                    {selectedDeal.price}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-zinc-400">incl. taxes & fees</p>
                </div>
              </div>

              {/* Action Buttons - Stacked on mobile, side by side on desktop */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={getWhatsAppLink(`${selectedDeal.departureCode} → ${selectedDeal.destinationCode}`, selectedDeal.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 rounded-lg bg-[#25D366] text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  WhatsApp
                </a>

                <button
                  onClick={() => setSelectedDeal(null)}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white font-bold text-sm uppercase tracking-wider hover:opacity-95 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} />
                  Book Now
                </button>
              </div>

              {/* Secondary Action */}
              <button
                onClick={() => setSelectedDeal(null)}
                className="w-full mt-2 px-4 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 font-semibold text-xs uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
              >
                ← Back to Results
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}