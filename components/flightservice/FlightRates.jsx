"use client";

import React, { useState } from "react";
import { Plane, RefreshCw, Clock, ArrowRight, ShieldCheck, Tag, AlertCircle } from "lucide-react";
import Image from "next/image";

const fallbackFlights = [
 {
  id: "fl-1",
  airlineLogo: "/imgs/airlines/01.png",
  airlineName: "Best Deals - Aalborg",
  flightNumber: "EK-612",
  departureTime: "24 Aug",
  departureCity: "Dubai",           
  departureCode: "DXB",              
  arrivalTime: "28 Aug",
  arrivalCity: "Aalborg",            
  arrivalCode: "AAL",                
  stops: "Non-stop",
  duration: "6h 15m",
  price: "£500",
  class: "Economy",
  availability: "Available",
  dates: "24 Aug - 28 Aug"  
},
{
  id: "fl-2",
  airlineLogo: "/imgs/airlines/AF.png",
  airlineName: "Air France",                    
  flightNumber: "AF-112",                      
  departureTime: "12 Nov",                    
  departureCity: "London Heathrow",             
  departureCode: "LHR",                         
  arrivalTime: "10 Dec",                      
  arrivalCity: "Accra",                        
  arrivalCode: "ACC",                       
  stops: "1 stop",
  duration: "8h 30m",
  price: "£542",                            
  class: "Economy",
  availability: "Selling Fast",
  dates: "12 Nov - 10 Dec"                    
},
{
  id: "fl-3",
  airlineLogo: "/imgs/airlines/AF.png",
  airlineName: "Air France",
  flightNumber: "AF-145",
  departureTime: "22 Aug ",
  departureCity: "London",
  departureCode: "LON",
  arrivalTime: " 11 Sep ",
  arrivalCity: "Washington Dulles Intl",
  arrivalCode: "IAD",
  stops: "Non-stop",
  duration: "4h 15m",
  price: "£505",
  class: "Premium",
  availability: "Limited Seats",
  dates: "12 Jun - 26 Jun"
}

  ,
  {
  id: "fl-4",
  airlineLogo: "/imgs/airlines/klm.png",
  airlineName: "KLM",
  flightNumber: "KL-145",
  departureTime: "21 Sep",
  departureCity: "Leeds",
  departureCode: "LBA",
  arrivalTime: " 17 Oct",
  arrivalCity: "Lagos",
  arrivalCode: "LOS",
  stops: "Non-stop",
  duration: "4h 15m",
  price: "£577",
  class: "Premium",
  availability: "Limited Seats",
  dates: "21 Sep - 17 Oct"
}
,
  {
  id: "fl-5",
  airlineLogo: "/imgs/airlines/AF.png",
  airlineName: "Air France",
  flightNumber: "AF-145",
  departureTime: "23 Aug",
  departureCity: "Manchester",
  departureCode: "MAN",
  arrivalTime: "14 Nov",
  arrivalCity: "Lagos",
  arrivalCode: "LOS",
  stops: "Non-stop",
  duration: "4h 15m",
  price: "£577",
  class: "Premium",
  availability: "Limited Seats",
  dates: "23 Aug - 14 Nov"
},
   {
  id: "fl-6",
  airlineLogo: "/imgs/airlines/britishairways.png",
  airlineName: "British Airways",
  flightNumber: "BA-145",
  departureTime: "17 Oct",
  departureCity: "London Heathrow",
  departureCode: "LHR",
  arrivalTime: "28 Nov",
  arrivalCity: "Melbourne",
  arrivalCode: "MEL",
  stops: "Non-stop",
  duration: "4h 15m",
  price: "£545",
  class: "Premium",
  availability: "Limited Seats",
  dates: "17 Oct - 28 Nov"
}

];



 
export default function FlightRates() {
  const [flights] = useState(fallbackFlights);
  const [viewType, setViewType] = useState('list'); 

  const handleWhatsApp = (flight) => {
    const message = `Hi! I'm interested in the ${flight.airlineName} flight from ${flight.departureCode} to ${flight.arrivalCode} (${flight.flightNumber}). Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '442038766846'; 
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-16 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 text-left w-full">
          <div className="w-full">
            <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
              Live Flight Rates
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight  leading-tight whitespace-normal">
              Upcoming Direct{" "}
              <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent  ml-1 font-serif normal-case">
                 & Shared Fares
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-normal">
              Real-time schedule estimates for your upcoming seasonal spiritual journeys and holiday destinations.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            {/* View Toggle Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-full p-1">
              <button
                onClick={() => setViewType('list')}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewType === 'list'
                    ? 'bg-[#0070A1] text-white'
                    : 'text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50'
                }`}
                title="List View"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewType === 'grid'
                    ? 'bg-[#0070A1] text-white'
                    : 'text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50'
                }`}
                title="Grid View"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-white/30 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 px-3 py-1.5 rounded-full">
              <RefreshCw size={12} className="animate-spin text-[#F6931F]" />
              <span>*Last Updated: Today</span>
            </div>
          </div>
        </div>

        {/* ================= LUXURY FLIGHT CARD STACKS (GRID/LIST TOGGLE) ================= */}
        <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full' : 'flex flex-col gap-5 w-full'}>
          {flights.map((flight) => (
            <div
              key={flight.id}
              className={`group relative w-full overflow-hidden rounded-[24px] 
              bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-white/[0.02] dark:to-white/[0.005] 
              border border-slate-200/70 dark:border-white/[0.06] shadow-sm hover:shadow-xl 
              hover:border-[#0070A1]/30 dark:hover:border-[#F6931F]/30 hover:bg-white dark:hover:bg-[#020d14] 
              transition-all duration-500 p-5 sm:p-6 ${viewType === 'list' ? 'flex flex-col lg:flex-row items-center justify-between gap-6' : 'flex flex-col gap-6'}`}
            >
              {/* TOP BRAND GRADIENT BAR */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F6931F] to-[#0070A1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 1. AIRLINE LOGO BLOCK */}
              <div className={`flex items-center justify-start gap-4 ${viewType === 'list' ? 'lg:flex-col lg:justify-center lg:gap-2.5' : ''} min-w-full ${viewType === 'list' ? 'lg:min-w-[160px]' : ''} ${viewType === 'list' ? 'border-b lg:border-b-0' : ''} pb-4 ${viewType === 'list' ? 'lg:pb-0' : ''} border-slate-200/60 dark:border-white/5`}>
                <div className="relative h-12 w-20 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 p-2 shrink-0 shadow-sm">
                 <div className="relative h-12 w-24 flex items-center justify-center"> 
  <Image
    src={flight.airlineLogo}
    alt={flight.airlineName}
    fill
    sizes="(max-width: 768px) 100px, 150px"
    className="object-contain filter"
  />
</div>
                </div>
                <div className={`${viewType === 'list' ? 'lg:text-center' : ''}`}>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-none">
                    {flight.airlineName}
                  </h4>
                  <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block mt-1.5 font-mono">
                    {flight.flightNumber} • <span className="text-[#0070A1] dark:text-[#F6931F]">{flight.class}</span>
                  </span>
                </div>
              </div>

              {/* 2. CORE TIMELINE METADATA CONNECTOR */}
              {viewType === 'list' ? (
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
              ) : (
                // Grid view - compact layout
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200/60 dark:border-white/5">
                    <div>
                      <div className="text-sm font-black text-[#0070A1] dark:text-[#F6931F] uppercase tracking-wider font-mono mb-1">
                        {flight.departureCode} → {flight.arrivalCode}
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-white/40">
                        {flight.departureCity} to {flight.arrivalCity}
                      </p>
                    </div>
                    <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      flight.stops === "Non-stop" 
                        ? "bg-emerald-500/10 text-emerald-500" 
                        : "bg-[#F6931F]/10 text-[#F6931F]"
                    }`}>
                      {flight.stops}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-white/40 mb-1">Departure</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{flight.departureTime}</p>
                    </div>
                    <div className="text-center">
                      <Plane size={14} className="text-slate-400 dark:text-white/30 mx-auto mb-1" />
                      <p className="text-[10px] text-slate-400 dark:text-white/30">{flight.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 dark:text-white/40 mb-1">Arrival</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{flight.arrivalTime}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. LUXURY PRICING BLOCK AND CALL TO ACTION BUTTON */}
              <div className={`flex items-center justify-between ${viewType === 'list' ? 'lg:flex-col lg:justify-center' : ''} ${viewType === 'list' ? 'border-t lg:border-t-0' : 'border-t'} pt-4 ${viewType === 'list' ? 'lg:pt-0' : ''} border-slate-200/60 dark:border-white/5 min-w-full ${viewType === 'list' ? 'lg:min-w-[180px]' : ''} gap-4 ${viewType === 'list' ? 'lg:pl-6 lg:border-l' : ''} border-dashed border-slate-200 dark:border-white/10`}>
                <div className={`${viewType === 'list' ? 'lg:text-center' : ''}`}>
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider block mb-1 ${
                    flight.availability === "Available" 
                      ? "text-slate-400 dark:text-white/30" 
                      : "text-amber-500 flex items-center gap-0.5 ${viewType === 'list' ? 'lg:justify-center' : ''}"
                  }`}>
                    {flight.availability !== "Available" && <AlertCircle size={10} />}
                    {flight.availability === "Available" ? "All-inclusive From" : flight.availability}
                  </span>
                  
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight block">
                    {flight.price}
                  </span>
                </div>

                {/* WhatsApp Integration - Changed text to 'Inquire Now' */}
                <button 
                  onClick={() => handleWhatsApp(flight)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#0070A1] hover:bg-[#005a82] dark:bg-white/[0.03] dark:hover:bg-[#F6931F] dark:border dark:border-white/10 dark:hover:border-transparent text-white dark:text-white dark:hover:text-black font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-300 uppercase tracking-wider active:scale-[0.98]">
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