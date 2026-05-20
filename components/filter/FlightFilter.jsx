"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, MapPin, Calendar, Search, Users, ChevronDown, 
  ShieldCheck, Headset, CreditCard, Clock, ArrowLeftRight 
} from 'lucide-react';

export default function FlightSearchWidget() {
  const [tripType, setTripType] = useState('return');
  const [showPax, setShowPax] = useState(false);
  const [pax, setPax] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState('Economy');
  const [fromAirport, setFromAirport] = useState('LHR');
  const [toAirport, setToAirport] = useState('JED');
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPax(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const adj = (type, d) => {
    setPax(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, Math.min(9, prev[type] + d))
    }));
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-2 sm:p-4 font-sans transition-colors duration-500">     
      
      {/* Tabs Layout - Added overflow-x-auto for mobile layout safety */}
      <div className="flex gap-1.5 sm:gap-2 mb-0 ml-1 sm:ml-2 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap">
        {['return', 'oneway', 'multi'].map((t) => (
          <button
            key={t}
            onClick={() => setTripType(t)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-t-xl sm:rounded-t-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              tripType === t 
              ? 'bg-white dark:bg-slate-800 text-[#E68213] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]' 
              : 'bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1).replace('way', ' way')}
          </button>
        ))}
      </div>

      {/* Main Card - Changed rounding for mobile view compatibility */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-[2rem] rounded-tl-none p-4 sm:p-6 shadow-2xl border border-slate-100 dark:border-white/5 relative z-20 transition-all duration-500">
        
        {/* Dropdown & Direct Flight Option Wrapper */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 w-full">
          <div className="relative w-full sm:w-auto" ref={popupRef}>
            <button 
              onClick={() => setShowPax(!showPax)}
              className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-3 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 hover:border-[#E68213] transition-all text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#E68213]" />
                <span>{pax.adults} Adult, {pax.children + pax.infants > 0 ? `${pax.children + pax.infants} Child, ` : ''} {cabin}</span>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {/* Passenger Popup - Centered on extreme small phones */}
            {showPax && (
              <div className="absolute top-full mt-2 left-0 sm:left-0 right-0 sm:right-auto w-full sm:w-72 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-5 border border-slate-100 dark:border-white/10 z-50">
                {['adults', 'children', 'infants'].map((type) => (
                  <div key={type} className="flex items-center justify-between mb-4 text-slate-800 dark:text-white">
                    <div>
                      <p className="text-sm font-bold capitalize">{type}</p>
                      <p className="text-[10px] text-slate-400">{type === 'adults' ? '12+ years' : 'Under 12'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => adj(type, -1)} className="w-8 h-8 rounded-full border dark:border-white/10 dark:text-white hover:bg-[#E68213] flex items-center justify-center font-bold text-lg">-</button>
                      <span className="font-bold w-4 text-center">{pax[type]}</span>
                      <button onClick={() => adj(type, 1)} className="w-8 h-8 rounded-full border dark:border-white/10 dark:text-white hover:bg-[#E68213] flex items-center justify-center font-bold text-lg">+</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setShowPax(false)} className="w-full bg-[#E68213] text-white py-2 rounded-xl text-sm font-bold mt-2">Done</button>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer group mt-1 sm:mt-0">
            <input type="checkbox" className="w-4 h-4 accent-[#E68213] rounded" />
            <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">Direct flights only</span>
          </label>
        </div>

        {/* Search Grid Layout - Handles 1-col on mobile, 2-col on tablet, 12-col layout grid on desktop screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          
          {/* Flying From */}
          <div className="lg:col-span-3 relative w-full">
            <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 ml-4 mb-1">Flying From</label>
            <div className="relative">
              <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E68213]" size={18} />
              <select 
                value={fromAirport} 
                onChange={(e) => setFromAirport(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-100 dark:border-white/10 rounded-2xl focus:border-[#E68213] outline-none appearance-none font-semibold text-sm transition-colors"
              >
                <option value="LHR">London Heathrow (LHR)</option>
                <option value="MAN">Manchester (MAN)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>

          {/* Going To */}
          <div className="lg:col-span-3 relative w-full">
            <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 ml-4 mb-1">Going To</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E68213]" size={18} />
              <select 
                value={toAirport}
                onChange={(e) => setToAirport(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-100 dark:border-white/10 rounded-2xl focus:border-[#E68213] outline-none appearance-none font-semibold text-sm transition-colors"
              >
                <option value="JED">Jeddah (JED)</option>
                <option value="MED">Madinah (MED)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>

          {/* Travel Dates */}
          <div className="lg:col-span-4 relative w-full">
            <label className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 ml-4 mb-1">Travel Dates</label>
            <div className="relative flex bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/10 rounded-2xl overflow-hidden focus-within:border-[#E68213] transition-colors">
              <div className="relative w-1/2 flex items-center">
                <Calendar className="absolute left-4 text-[#E68213] pointer-events-none" size={18} />
                <input type="date" className="w-full pl-12 pr-2 py-3.5 bg-transparent text-slate-900 dark:text-white text-sm outline-none border-r border-slate-200 dark:border-white/10 min-h-[48px]" />
              </div>
              <input 
                type="date" 
                disabled={tripType === 'oneway'} 
                className="w-1/2 px-4 py-3.5 bg-transparent text-slate-900 dark:text-white text-sm outline-none disabled:opacity-20 min-h-[48px]" 
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 w-full mt-2 lg:mt-0 ">
            <button className="w-full bg-[#E68213] hover:bg-[#0070A1] text-white py-4 rounded-3xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#E68213]/20 transition-all duration-300">
              <Search size={18} /> Search Flights
            </button>
          </div>

        </div>

        

      </div>
    </section>
  );
}
