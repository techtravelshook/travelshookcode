"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  MapPin,
  Calendar,
  Mail,
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
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Validation
    if (!email) {
      setMessage("Please enter your email address");
      setLoading(false);
      return;
    }
    if (!departDate) {
      setMessage("Please select a departure date");
      setLoading(false);
      return;
    }
    if (tripType === "return" && !returnDate) {
      setMessage("Please select a return date");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/flightemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          tripType,
          fromAirport,
          toAirport,
          departDate,
          returnDate: tripType === "return" ? returnDate : null,
          passengers: {
            adults: pax.adults,
            children: pax.children,
            infants: pax.infants,
            total: pax.adults + pax.children + pax.infants,
          },
          cabin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error || "Failed to send email"}`);
      } else {
        setMessage("✓ Flight details sent to your email successfully!");
        // Reset form
        setEmail("");
        setDepartDate("");
        setReturnDate("");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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

          {/* PASSENGER */}
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

        <form onSubmit={handleSubmit}>

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
                <option value="LHR">London Heathrow (LHR)</option>
                <option value="LGW">London Gatwick (LGW)</option>
                <option value="STN">London Stansted (STN)</option>
                <option value="LCY">London City (LCY)</option>
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
                <option value="JED">Jeddah (JED)</option>
                <option value="DXB">Dubai (DXB)</option>
                <option value="CAI">Cairo (CAI)</option>
                <option value="DPS">Bali (DPS)</option>
              </select>
            </div>

            {/* DATE */}
            <div className="lg:col-span-2 w-full">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Depart
              </label>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl"
                required
              />
            </div>

            {tripType === "return" && (
              <div className="lg:col-span-2 w-full">
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Return
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl"
                  required={tripType === "return"}
                />
              </div>
            )}

            {/* EMAIL */}
            <div className={tripType === "return" ? "lg:col-span-2 w-full" : "lg:col-span-4 w-full"}>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl"
                required
              />
            </div>

            {/* BUTTON */}
            <div className="lg:col-span-2 w-full">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E68213] hover:bg-[#d67010] disabled:bg-slate-300 text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Mail size={18} />
                {loading ? "Sending..." : "Send to Email"}
              </button>
            </div>

          </div>

          {/* STATUS MESSAGE */}
          {message && (
            <div className={`mt-4 p-3 rounded-xl text-sm font-medium text-center ${
              message.startsWith("✓") || message.startsWith("Error:")
                ? message.startsWith("✓")
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
            }`}>
              {message}
            </div>
          )}

        </form>
      </div>
    </section>
  );
}