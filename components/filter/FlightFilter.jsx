"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Users, ChevronDown,  Plus, X, CheckCircle, Send } from "lucide-react";

const AIRPORTS_UK = [
  { code: "LHR", label: "🇬🇧 London Heathrow (LHR)" },
  { code: "LGW", label: "🇬🇧 London Gatwick (LGW)" },
  { code: "STN", label: "🇬🇧 London Stansted (STN)" },
  { code: "MAN", label: "🇬🇧 Manchester (MAN)" },
  { code: "BHX", label: "🇬🇧 Birmingham (BHX)" },
];

const AIRPORTS_DEST = [
  { code: "JED", label: "🇸🇦 Jeddah (JED)" },
  { code: "MED", label: "🇸🇦 Madinah (MED)" },
  { code: "RUH", label: "🇸🇦 Riyadh (RUH)" },
  { code: "DXB", label: "🇦🇪 Dubai (DXB)" },
  { code: "CAI", label: "🇪🇬 Cairo (CAI)" },
  { code: "IST", label: "🇹🇷 Istanbul (IST)" },
];

const ALL_AIRPORTS = [...AIRPORTS_UK, ...AIRPORTS_DEST];
const CABINS = ["Economy", "Premium Economy", "Business", "First"];

const defaultLeg = () => ({ from: "LHR", to: "JED", date: "" });

export default function FlightSearchWidget() {
  const [tripType, setTripType] = useState("return");
  const [pax, setPax] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState("Economy");
  const [showPax, setShowPax] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [from, setFrom] = useState("LHR");
  const [to, setTo] = useState("JED");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [legs, setLegs] = useState([defaultLeg()]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  const paxRef = useRef(null);
  const paxBtnRef = useRef(null);

  // Close pax modal on outside click
  useEffect(() => {
    const handler = (e) => {
      if (paxRef.current && !paxRef.current.contains(e.target) &&
          paxBtnRef.current && !paxBtnRef.current.contains(e.target)) {
        setShowPax(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const paxLabel = useMemo(() => {
    let s = `${pax.adults} Adult`;
    if (pax.children) s += `, ${pax.children} Child`;
    if (pax.infants) s += `, ${pax.infants} Infant`;
    return s;
  }, [pax]);

  const adj = useCallback((type, d) => {
    setPax(p => ({
      ...p,
      [type]: Math.max(type === "adults" ? 1 : 0, Math.min(9, p[type] + d))
    }));
  }, []);

  const addLeg = useCallback(() => {
    if (legs.length < 4) setLegs(prev => [...prev, defaultLeg()]);
  }, [legs.length]);

  const removeLeg = useCallback((i) => {
    setLegs(prev => prev.filter((_, idx) => idx !== i));
  }, []);

  const updateLeg = useCallback((i, field, val) => {
    setLegs(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!whatsapp) return alert("Please enter WhatsApp number");

    setLoading(true);
    try {
      const payload = {
        whatsapp,
        tripType,
        cabin,
        directOnly,
        passengers: {
          adults: pax.adults,
          children: pax.children,
          infants: pax.infants,
          total: pax.adults + pax.children + pax.infants,
        },
        ...(tripType !== "multi" 
          ? { 
              fromAirport: from, 
              toAirport: to, 
              departDate: depart, 
              returnDate: tripType === "return" ? ret : null 
            }
          : { legs }
        )
      };

      const res = await fetch("/api/flightemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error. Please try again.");
      }

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit request");
      }

      setModal({
        bookingId: `FL-${Math.floor(100000 + Math.random() * 900000)}`,
        tripType,
        fromAirport: from,
        toAirport: to,
        departDate: depart,
        returnDate: ret,
        whatsapp,
        cabin,
        passengers: payload.passengers,
        legs: tripType === "multi" ? legs : null,
      });

      // Reset
      setWhatsapp("");
      setDepart("");
      setRet("");
      if (tripType === "multi") setLegs([defaultLeg()]);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full h-9 rounded-lg px-4  dark:bg-slate-900 border border-[#E68213] dark:border-[#E68213] text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400 transition";

  return (
    <section className="w-full dark:bg-slate-950">
      <div className="max-w-12xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 border border-orange-100 dark:border-orange-900 rounded-3xl shadow-xl overflow-hidden">
          
          {/* Trip Type Tabs */}
          <div className="flex border-b border-orange-100 dark:border-orange-900">
            {[
              { val: "return", label: "Round Trip" },
              { val: "oneway", label: "One Way" },
              { val: "multi", label: "Multi-city" },
            ].map((t) => (
              <button
                key={t.val}
                onClick={() => setTripType(t.val)}
                className={`flex-1 py-4 text-sm font-semibold transition-all ${
                  tripType === t.val 
                    ? "bg-[#E68213] text-white" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {tripType !== "multi" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1.5">FROM</label>
                  <select value={from} onChange={e => setFrom(e.target.value)} className={inputCls}>
                    {AIRPORTS_UK.map(a => (
                      <option key={a.code} value={a.code}>{a.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1.5">TO</label>
                  <select value={to} onChange={e => setTo(e.target.value)} className={inputCls}>
                    {AIRPORTS_DEST.map(a => (
                      <option key={a.code} value={a.code}>{a.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1.5">DEPARTURE</label>
                  <input type="date" value={depart} onChange={e => setDepart(e.target.value)} className={inputCls} required />
                </div>

                {tripType === "return" && (
                  <div>
                    <label className="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1.5">RETURN</label>
                    <input type="date" value={ret} onChange={e => setRet(e.target.value)} className={inputCls} required />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1.5">PASSENGERS & CLASS</label>
                  <button
                    type="button"
                    ref={paxBtnRef}
                    onClick={() => setShowPax(!showPax)}
                    className="w-full h-11 px-4 bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800 rounded-2xl text-left text-sm flex items-center justify-between hover:border-orange-400"
                  >
                    <span>{paxLabel} • {cabin}</span>
                    <ChevronDown size={18} className="text-orange-500" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1.5">WHATSAPP</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="+44 7700 900000"
                    className={inputCls}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {legs.map((leg, i) => (
                  <div key={i} className="bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-orange-800 rounded-2xl p-5 relative">
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-orange-600 dark:text-orange-400 text-sm">LEG {i + 1}</span>
                      {i > 0 && (
                        <button type="button" onClick={() => removeLeg(i)} className="text-slate-400">
                          <X size={18} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-orange-600 dark:text-orange-400 mb-1">FROM</label>
                        <select value={leg.from} onChange={e => updateLeg(i, "from", e.target.value)} className={inputCls}>
                          {ALL_AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-orange-600 dark:text-orange-400 mb-1">TO</label>
                        <select value={leg.to} onChange={e => updateLeg(i, "to", e.target.value)} className={inputCls}>
                          {ALL_AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-orange-600 dark:text-orange-400 mb-1">DATE</label>
                        <input type="date" value={leg.date} onChange={e => updateLeg(i, "date", e.target.value)} className={inputCls} />
                      </div>
                    </div>
                  </div>
                ))}

                {legs.length < 4 && (
                  <button 
                    type="button" 
                    onClick={addLeg} 
                    className="w-full py-3 border border-dashed border-orange-300 dark:border-orange-700 rounded-2xl text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus size={18} /> Add Leg
                  </button>
                )}

                <div>
                  <label className="block text-xs font-medium text-orange-600 dark:text-orange-400 mb-1.5">WHATSAPP</label>
                  <input 
                    type="tel" 
                    value={whatsapp} 
                    onChange={e => setWhatsapp(e.target.value)} 
                    placeholder="+44 7700 900000" 
                    className={inputCls} 
                    required 
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#E68213] hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold text-base flex items-center justify-center gap-3 transition"
            >
              <Send size={20} />
              {loading ? "SENDING..." : "SEND FLIGHT REQUEST"}
            </button>
          </form>
        </div>
      </div>

      {/* Passenger Modal */}
      {showPax && (
        <div ref={paxRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-orange-100 dark:border-orange-800">
            {["adults", "children", "infants"].map(type => (
              <div key={type} className="flex justify-between items-center py-4 border-b dark:border-slate-700 last:border-none">
                <div>
                  <p className="font-medium capitalize text-slate-800 dark:text-white">{type}</p>
                  <p className="text-xs text-slate-500">
                    {type === "adults" ? "12+" : type === "children" ? "2-11" : "Under 2"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => adj(type, -1)} className="w-9 h-9 rounded-full border border-orange-200 dark:border-orange-700 text-xl text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-800">-</button>
                  <span className="w-8 text-center font-semibold text-lg text-slate-800 dark:text-white">{pax[type]}</span>
                  <button onClick={() => adj(type, 1)} className="w-9 h-9 rounded-full border border-orange-200 dark:border-orange-700 text-xl text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-800">+</button>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-3">CABIN CLASS</p>
              <div className="grid grid-cols-2 gap-2">
                {CABINS.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setCabin(c)} 
                    className={`py-3 rounded-2xl text-sm font-medium ${cabin === c ? "bg-orange-500 text-white" : "border border-orange-200 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-slate-800"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setShowPax(false)} className="w-full mt-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl">Done</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-orange-200 dark:border-orange-800 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">BOOKING REFERENCE</p>
                  <p className="font-mono text-2xl font-bold tracking-wider">{modal.bookingId}</p>
                </div>
                <CheckCircle size={48} className="opacity-90" />
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">FLIGHT DETAILS</p>
                {modal.tripType === "multi" && modal.legs ? (
                  <div className="space-y-4">
                    {modal.legs.map((leg, i) => (
                      <div key={i} className="flex gap-4 text-sm border-l-2 border-orange-400 pl-3">
                        <div>
                          <div className="font-semibold">{leg.from} → {leg.to}</div>
                          <div className="text-slate-500 dark:text-slate-400">{leg.date || "Date not selected"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-orange-50 dark:bg-slate-800 p-4 rounded-2xl">
                    <div className="font-semibold text-lg">{modal.fromAirport} → {modal.toAirport}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {modal.departDate} {modal.returnDate ? `→ ${modal.returnDate}` : ""}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">PASSENGERS</p>
                  <p className="font-semibold">{modal.passengers.total} • {modal.cabin}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">CONTACT</p>
                  <p className="font-semibold font-mono">{modal.whatsapp}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-orange-100 dark:border-orange-800 p-6">
              <button 
                onClick={() => setModal(null)} 
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}