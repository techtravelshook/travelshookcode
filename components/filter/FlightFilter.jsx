"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  MapPin,
  Calendar,
  Search,
  Users,
  ChevronDown,
} from "lucide-react";

export default function FlightSearchWidget() {
  const [tripType, setTripType] = useState("return");
  const [showPax, setShowPax] = useState(false);
  const [pax, setPax] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState("Economy");
  const [fromAirport, setFromAirport] = useState("LHR");
  const [toAirport, setToAirport] = useState("JED");

  // Track button position so the popup anchors correctly
  const triggerRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setShowPax(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const adj = (type, d) => {
    setPax((prev) => ({
      ...prev,
      [type]: Math.max(
        type === "adults" ? 1 : 0,
        Math.min(9, prev[type] + d)
      ),
    }));
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-2 sm:p-4 font-sans transition-colors duration-500">

      {/* TABS */}
      <div className="flex gap-1.5 sm:gap-2 mb-0 ml-1 sm:ml-2 overflow-x-auto whitespace-nowrap">
        {["return", "oneway", "multi"].map((t) => (
          <button
            key={t}
            onClick={() => setTripType(t)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-t-xl sm:rounded-t-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              tripType === t
                ? "bg-white dark:bg-slate-800 text-[#E68213] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
                : "bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1).replace("way", " way")}
          </button>
        ))}
      </div>

      {/* MAIN CARD */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-[2rem] rounded-tl-none p-4 sm:p-6 shadow-2xl border border-slate-100 dark:border-white/5 relative z-20">

        {/* TOP ROW */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 w-full">

          {/* PASSENGER — popup is position:fixed so it never pushes layout */}
          <div className="relative w-full sm:w-auto">

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setShowPax((p) => !p)}
              className="flex w-full sm:w-auto items-center justify-between gap-3 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10"
            >
              <div className="flex items-center gap-2">
                <Users size={18} className="text-[#E68213]" />
                <span>
                  {pax.adults} Adult,
                  {pax.children + pax.infants > 0
                    ? ` ${pax.children + pax.infants} Child, `
                    : ""}{" "}
                  {cabin}
                </span>
              </div>
              <ChevronDown size={14} />
            </button>

            {/* POPUP
                Using position:fixed + top/left calculated from the trigger
                means the popup floats above the layout and NEVER causes
                any parent element to resize or reflow.
            */}
            {showPax && (
              <div
                ref={popupRef}
                className="fixed sm:absolute sm:top-full sm:left-0 sm:mt-2 inset-x-4 sm:inset-x-auto bottom-4 sm:bottom-auto w-auto sm:w-72 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-5 border border-slate-100 dark:border-white/10 z-[9999]"
              >

                {["adults", "children", "infants"].map((type) => (
                  <div key={type} className="flex items-center justify-between mb-4">

                    <div>
                      <p className="text-sm font-bold capitalize">{type}</p>
                      <p className="text-[10px] text-slate-400">
                        {type === "adults" ? "12+ years" : "Under 12"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() => adj(type, -1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                      >
                        -
                      </button>

                      <span className="w-4 text-center font-bold">
                        {pax[type]}
                      </span>

                      <button
                        type="button"
                        onClick={() => adj(type, 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                      >
                        +
                      </button>

                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setShowPax(false)}
                  className="w-full bg-[#E68213] text-white py-2 rounded-xl text-sm font-bold mt-2"
                >
                  Done
                </button>

              </div>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#E68213]" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Direct flights only
            </span>
          </label>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">

          {/* FROM */}
          <div className="lg:col-span-3 w-full">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Flying From
            </label>
            <select
              value={fromAirport}
              onChange={(e) => setFromAirport(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl"
            >
              <option value="LHR">London Heathrow</option>
            </select>
          </div>

          {/* TO */}
          <div className="lg:col-span-3 w-full">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Going To
            </label>
            <select
              value={toAirport}
              onChange={(e) => setToAirport(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl"
            >
              <option value="JED">Jeddah</option>
            </select>
          </div>

          {/* DATE */}
          <div className="lg:col-span-4 w-full">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Travel Dates
            </label>

            <div className="flex bg-slate-50 dark:bg-slate-900/50 rounded-2xl overflow-hidden">
              <input type="date" className="w-1/2 p-3" />
              <input type="date" className="w-1/2 p-3" />
            </div>
          </div>

          {/* BUTTON */}
          <div className="lg:col-span-2 w-full">
            <button className="w-full bg-[#E68213] text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2">
              <Search size={18} /> Search
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}