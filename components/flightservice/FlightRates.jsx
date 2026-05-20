"use client";

import React, { useState } from "react";
import { Plane, RefreshCw, Clock, ArrowRight, ShieldCheck, Tag, AlertCircle } from "lucide-react";

const fallbackFlights = [
  {
    id: "fl-1",
    airlineLogo: "https://vectorlogo.zone",
    airlineName: "Emirates",
    flightNumber: "EK-612",
    departureTime: "11:45 AM",
    departureCity: "Dubai",
    departureCode: "DXB",
    arrivalTime: "06:00 PM",
    arrivalCity: "London",
    arrivalCode: "LHR",
    stops: "Non-stop",
    duration: "6h 15m",
    price: "£500",
    class: "Economy",
    availability: "Available"
  },
  {
    id: "fl-2",
    airlineLogo: "https://vectorlogo.zone",
    airlineName: "Qatar Airways",
    flightNumber: "QR-112",
    departureTime: "01:45 AM",
    departureCity: "Qatar",
    departureCode: "DOH",
    arrivalTime: "11:00 PM",
    arrivalCity: "Jeddah",
    arrivalCode: "JED",
    stops: "1 stop",
    duration: "8h 30m",
    price: "£550",
    class: "Economy",
    availability: "Selling Fast"
  },
  {
    id: "fl-3",
    airlineLogo: "https://vectorlogo.zone",
    airlineName: "Saudia",
    flightNumber: "SV-145",
    departureTime: "10:45 AM",
    departureCity: "Jeddah",
    departureCode: "JED",
    arrivalTime: "06:45 PM",
    arrivalCity: "Lahore",
    arrivalCode: "LHE",
    stops: "Non-stop",
    duration: "4h 15m",
    price: "£600",
    class: "Premium",
    availability: "Limited Seats"
  }
];

export default function FlightRates() {
  const [flights] = useState(fallbackFlights);

  return (
    <section className="py-16 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      
      {/* FIXED: Changed to full fluid viewport matching upper page sections structure */}
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        
        {/* ================= HEADER SECTIONS (LEFT ALIGNED / NO MAX-WIDTH) ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 text-left w-full">
          <div className="w-full">
            <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
              Live Flight Rates
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight  leading-tight whitespace-normal">
              Upcoming Direct{" "}
              <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent italic ml-1 font-serif normal-case">
                 & Shared Fares
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
              Real-time schedule estimates for your upcoming seasonal spiritual journeys and holiday destinations.
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-white/30 self-start sm:self-auto shrink-0 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 px-3 py-1.5 rounded-full">
            <RefreshCw size={12} className="animate-spin text-[#F6931F]" />
            <span>*Last Updated: Today</span>
          </div>
        </div>

        {/* ================= LUXURY FLIGHT CARD STACKS (FIXED: TAKES FULL WIDTH) ================= */}
        <div className="flex flex-col gap-5 w-full">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="group relative w-full overflow-hidden rounded-[24px] 
              bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-white/[0.02] dark:to-white/[0.005] 
              border border-slate-200/70 dark:border-white/[0.06] shadow-sm hover:shadow-xl 
              hover:border-[#0070A1]/30 dark:hover:border-[#F6931F]/30 hover:bg-white dark:hover:bg-[#020d14] 
              transition-all duration-500 p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-6"
            >
              {/* TOP BRAND GRADIENT BAR */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F6931F] to-[#0070A1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 1. AIRLINE LOGO BLOCK */}
              <div className="flex flex-row lg:flex-col items-center justify-start lg:justify-center gap-4 lg:gap-2.5 min-w-full lg:min-w-[160px] border-b lg:border-b-0 pb-4 lg:pb-0 border-slate-200/60 dark:border-white/5">
                <div className="relative h-12 w-20 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 p-2 shrink-0 shadow-sm">
                  <img
                    src={flight.airlineLogo}
                    alt={flight.airlineName}
                    className="max-h-full max-w-full object-contain filter"
                  />
                </div>
                <div className="text-left lg:text-center">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-none">
                    {flight.airlineName}
                  </h4>
                  <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block mt-1.5 font-mono">
                    {flight.flightNumber} • <span className="text-[#0070A1] dark:text-[#F6931F]">{flight.class}</span>
                  </span>
                </div>
              </div>

              {/* 2. CORE TIMELINE METADATA CONNECTOR */}
              <div className="flex flex-1 items-center justify-between sm:justify-center gap-6 sm:gap-14 w-full px-1 sm:px-6">
                
                {/* DEPARTURE INSIGHT BLOCK */}
                <div className="text-left min-w-[75px] sm:min-w-[110px]">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {flight.departureTime.split(" ")}
                    <span className="text-xs font-black text-slate-400 ml-0.5">{flight.departureTime.split(" ")}</span>
                  </span>
                  <div className="text-sm font-black text-[#0070A1] dark:text-[#F6931F] mt-1 uppercase tracking-wider font-mono">
                    {flight.departureCode}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 truncate block mt-0.5">
                    {flight.departureCity} Airport
                  </span>
                </div>

                {/* ANIMATED DOTTED FLIGHT ROUTE VECTOR INDICATOR */}
                <div className="flex flex-col flex-1 max-w-[180px] items-center justify-center">
                  <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full ${
                    flight.stops === "Non-stop" 
                      ? "bg-emerald-500/10 text-emerald-500" 
                      : "bg-[#F6931F]/10 text-[#F6931F]"
                  }`}>
                    {flight.stops}
                  </span>
                  
                  <div className="relative w-full flex items-center justify-center my-3">
                    {/* Dotted Flight Track */}
                    <div className="w-full h-0.5 border-b-[2px] border-dashed border-slate-200 dark:border-white/10 group-hover:border-[#0070A1]/40 dark:group-hover:border-[#F6931F]/40 transition-colors duration-500" />
                    
                    {/* Floating Center Icon Wrapper */}
                    <div className="absolute p-1.5 rounded-full bg-white dark:bg-[#020d14] border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/30 group-hover:text-[#F6931F] group-hover:scale-110 shadow-sm transition-all duration-300">
                      <Plane size={11} className="rotate-45" />
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 flex items-center gap-1.5 leading-none">
                    <Clock size={11} className="text-slate-400" /> {flight.duration}
                  </span>
                </div>

                {/* ARRIVAL INSIGHT BLOCK */}
                <div className="text-right min-w-[75px] sm:min-w-[110px]">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {flight.arrivalTime.split(" ")}
                    <span className="text-xs font-black text-slate-400 ml-0.5">{flight.arrivalTime.split(" ")}</span>
                  </span>
                  <div className="text-sm font-black text-[#0070A1] dark:text-[#F6931F] mt-1 uppercase tracking-wider font-mono">
                    {flight.arrivalCode}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 truncate block mt-0.5">
                    {flight.arrivalCity} Airport
                  </span>
                </div>

              </div>

              {/* 3. LUXURY PRICING BLOCK AND CALL TO ACTION BUTTON */}
              <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200/60 dark:border-white/5 min-w-full lg:min-w-[180px] gap-4 lg:pl-6 lg:border-l border-dashed border-slate-200 dark:border-white/10">
                <div className="text-left lg:text-center">
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider block mb-1 ${
                    flight.availability === "Available" 
                      ? "text-slate-400 dark:text-white/30" 
                      : "text-amber-500 flex items-center gap-0.5 justify-start lg:justify-center"
                  }`}>
                    {flight.availability !== "Available" && <AlertCircle size={10} />}
                    {flight.availability === "Available" ? "All-inclusive From" : flight.availability}
                  </span>
                  
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight block">
                    {flight.price}
                  </span>
                </div>

                {/* FIXED: Changed text to 'Inquire Now' and added active glow styles */}
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-[#0070A1] hover:bg-[#005a82] dark:bg-white/[0.03] dark:hover:bg-[#F6931F] dark:border dark:border-white/10 dark:hover:border-transparent text-white dark:text-white dark:hover:text-black font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-300 uppercase tracking-wider active:scale-[0.98]">
                  Inquire Now <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
