"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Send, Plus, Trash2, Search, X as CloseIcon } from "lucide-react";

const AIRPORTS_UK = [
  // London
  { code: "LHR", label: "London Heathrow (LHR)", flag: "🇬🇧" },
  { code: "LGW", label: "London Gatwick (LGW)", flag: "🇬🇧" },
  { code: "STN", label: "London Stansted (STN)", flag: "🇬🇧" },
  { code: "LTN", label: "London Luton (LTN)", flag: "🇬🇧" },
  { code: "LCY", label: "London City (LCY)", flag: "🇬🇧" },
  { code: "SEN", label: "London Southend (SEN)", flag: "🇬🇧" },
];

const AIRPORTS_DEST = [
  // 🇵🇰 Pakistan
  { code: "ISB", label: "Islamabad (ISB)", flag: "🇵🇰" },
  { code: "LHE", label: "Lahore (LHE)", flag: "🇵🇰" },
  { code: "KHI", label: "Karachi (KHI)", flag: "🇵🇰" },

  // 🇸🇦 Saudi Arabia
  { code: "JED", label: "Jeddah (JED)", flag: "🇸🇦" },
  { code: "MED", label: "Madinah (MED)", flag: "🇸🇦" },
  { code: "RUH", label: "Riyadh (RUH)", flag: "🇸🇦" },
  { code: "DMM", label: "Dammam (DMM)", flag: "🇸🇦" },
  { code: "AHB", label: "Abha (AHB)", flag: "🇸🇦" },

  // 🇦🇪 UAE
  { code: "DXB", label: "Dubai (DXB)", flag: "🇦🇪" },
  { code: "DWC", label: "Dubai Al Maktoum (DWC)", flag: "🇦🇪" },
  { code: "AUH", label: "Abu Dhabi (AUH)", flag: "🇦🇪" },
  { code: "SHJ", label: "Sharjah (SHJ)", flag: "🇦🇪" },
  { code: "RKT", label: "Ras Al Khaimah (RKT)", flag: "🇦🇪" },

  // 🇺🇸 United States
  { code: "JFK", label: "New York JFK (JFK)", flag: "🇺🇸" },
  { code: "EWR", label: "Newark (EWR)", flag: "🇺🇸" },
  { code: "LAX", label: "Los Angeles (LAX)", flag: "🇺🇸" },
  { code: "ORD", label: "Chicago (ORD)", flag: "🇺🇸" },
  { code: "MIA", label: "Miami (MIA)", flag: "🇺🇸" },
  { code: "DFW", label: "Dallas (DFW)", flag: "🇺🇸" },
  { code: "IAD", label: "Washington Dulles (IAD)", flag: "🇺🇸" },
  { code: "SFO", label: "San Francisco (SFO)", flag: "🇺🇸" },

  // 🇹🇷 Turkey
  { code: "IST", label: "Istanbul (IST)", flag: "🇹🇷" },
  { code: "SAW", label: "Istanbul Sabiha (SAW)", flag: "🇹🇷" },
  { code: "AYT", label: "Antalya (AYT)", flag: "🇹🇷" },

  // 🇹🇭 Thailand
  { code: "BKK", label: "Bangkok (BKK)", flag: "🇹🇭" },
  { code: "DMK", label: "Bangkok Don Mueang (DMK)", flag: "🇹🇭" },
  { code: "HKT", label: "Phuket (HKT)", flag: "🇹🇭" },
  { code: "CNX", label: "Chiang Mai (CNX)", flag: "🇹🇭" },

  // 🇸🇬 Singapore
  { code: "SIN", label: "Singapore Changi (SIN)", flag: "🇸🇬" },

  // 🇮🇳 India
  { code: "DEL", label: "Delhi (DEL)", flag: "🇮🇳" },
  { code: "BOM", label: "Mumbai (BOM)", flag: "🇮🇳" },
  { code: "BLR", label: "Bengaluru (BLR)", flag: "🇮🇳" },
  { code: "MAA", label: "Chennai (MAA)", flag: "🇮🇳" },
  { code: "HYD", label: "Hyderabad (HYD)", flag: "🇮🇳" },

  // 🇧🇩 Bangladesh
  { code: "DAC", label: "Dhaka (DAC)", flag: "🇧🇩" },
  { code: "CGP", label: "Chattogram (CGP)", flag: "🇧🇩" },
  { code: "ZYL", label: "Sylhet (ZYL)", flag: "🇧🇩" },
  // 🇲🇾 Malaysia
  { code: "KUL", label: "Kuala Lumpur (KUL)", flag: "🇲🇾" },
  // 🇶🇦 Qatar
  { code: "DOH", label: "Doha (DOH)", flag: "🇶🇦" },
  // 🇴🇲 Oman
  { code: "MCT", label: "Muscat (MCT)", flag: "🇴🇲" },
  // 🇰🇼 Kuwait
  { code: "KWI", label: "Kuwait City (KWI)", flag: "🇰🇼" },
  // 🇧🇭 Bahrain
  { code: "BAH", label: "Bahrain (BAH)", flag: "🇧🇭" },
  // 🇫🇷 France
  { code: "CDG", label: "Paris Charles de Gaulle (CDG)", flag: "🇫🇷" },

  // 🇩🇪 Germany
  { code: "FRA", label: "Frankfurt (FRA)", flag: "🇩🇪" },
  { code: "MUC", label: "Munich (MUC)", flag: "🇩🇪" },

  // 🇮🇹 Italy
  { code: "MXP", label: "Milan (MXP)", flag: "🇮🇹" },
  { code: "FCO", label: "Rome (FCO)", flag: "🇮🇹" },

  // 🇨🇦 Canada
  { code: "YYZ", label: "Toronto (YYZ)", flag: "🇨🇦" },
  { code: "YVR", label: "Vancouver (YVR)", flag: "🇨🇦" },

  // china
  { code: "PEK", label: "Beijing Capital (PEK)", flag: "🇨🇳" },
  { code: "PKX", label: "Beijing Daxing (PKX)", flag: "🇨🇳" },
  { code: "PVG", label: "Shanghai Pudong (PVG)", flag: "🇨🇳" }, 
  { code: "SHA", label: "Shanghai Hongqiao (SHA)", flag: "🇨🇳" }, 

  // Egypt 
  { code: "CAI", label: "Cairo International (CAI)", flag: "🇪🇬" },
  { code: "ADD", label: "Addis Ababa Bole (ADD)", flag: "🇪🇹" },// ethipoia
{ code: "NBO", label: "Nairobi Jomo Kenyatta (NBO)", flag: "🇰🇪" },//keynia
// nigeria
{ code: "LOS", label: "Lagos Murtala Muhammed (LOS)", flag: "🇳🇬" },
{ code: "ABV", label: "Abuja Nnamdi Azikiwe (ABV)", flag: "🇳🇬" },
//south africa 
{ code: "JNB", label: "Johannesburg O.R. Tambo (JNB)", flag: "🇿🇦" },
{ code: "CPT", label: "Cape Town International (CPT)", flag: "🇿🇦" },
];

const ALL_AIRPORTS = [...AIRPORTS_UK, ...AIRPORTS_DEST];
const CABINS = ["Economy", "Premium Economy", "Business", "First"];

const defaultLeg = () => ({ from: "LHR", to: "JED", date: "" });

const AirportSearch = ({ value, onChange, onSelect, label, placeholder = "Type to search..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredAirports = searchValue.trim()
    ? ALL_AIRPORTS.filter((a) =>
        a.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        a.code.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const selectedAirport = ALL_AIRPORTS.find((a) => a.code === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && 
          inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (airport) => {
    onSelect(airport.code);
    setSearchValue("");
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSearchValue("");
  };

  return (
    <div className="flex-1 min-w-[180px] relative" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Search size={16} className="text-slate-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={isOpen ? searchValue : (selectedAirport?.label || "")}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearchValue("");
          }}
          className="w-full h-10 pl-9 pr-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
        />

        {selectedAirport && !isOpen && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
            {selectedAirport.flag}
          </div>
        )}

        {isOpen && searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 right-0 z-40 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {searchValue.trim() === "" ? (
            <div className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 text-center">
              Start typing to search airports
            </div>
          ) : filteredAirports.length === 0 ? (
            <div className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 text-center">
              No airports found
            </div>
          ) : (
            <ul className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
              {filteredAirports.map((airport) => (
                <li key={airport.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(airport)}
                    className="w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 group"
                  >
                    <span className="text-lg">{airport.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 truncate">
                        {airport.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {airport.code}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded">
                      {airport.code}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default function CompactFlightSearch() {
  const [tripType, setTripType] = useState("return");
  const [from, setFrom] = useState("LHR");
  const [to, setTo] = useState("JED");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [legs, setLegs] = useState([defaultLeg()]);
  const [pax, setPax] = useState(1);
  const [cabin, setCabin] = useState("Economy");
  const [whatsapp, setWhatsapp] = useState("");
  const [showPax, setShowPax] = useState(false);
  const [loading, setLoading] = useState(false);
  const paxRef = useRef(null);
  const paxBtnRef = useRef(null);

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

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const addLeg = () => {
    if (legs.length < 8) {
      setLegs([...legs, defaultLeg()]);
    }
  };

  const removeLeg = (index) => {
    if (legs.length > 1) {
      setLegs(legs.filter((_, i) => i !== index));
    }
  };

  const updateLeg = (index, field, value) => {
    const newLegs = [...legs];
    newLegs[index][field] = value;
    setLegs(newLegs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (tripType === "multi") {
      const allFilled = legs.every(leg => leg.from && leg.to && leg.date);
      if (!allFilled || !whatsapp) {
        return alert("Please fill all leg details and WhatsApp number");
      }
    } else {
      if (!whatsapp || !depart) return alert("Please fill all fields");
    }
    
    setLoading(true);
    try {
      const payload = {
        whatsapp,
        tripType,
        cabin,
        passengers: pax,
        ...(tripType !== "multi" 
          ? { 
              from, 
              to, 
              depart, 
              ret: tripType === "return" ? ret : null 
            }
          : { legs }
        )
      };

      const res = await fetch("/api/flightemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");
      alert("✓ Flight request sent!");
      setWhatsapp("");
      if (tripType !== "multi") {
        setDepart("");
        setRet("");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full mx-auto">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-full p-4">
          
          {/* Trip Type Tabs */}
          <div className="flex gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 p-1">
            {[
              { val: "return", label: "Round trip" },
              { val: "oneway", label: "One way" },
              { val: "multi", label: "Multi-city" },
            ].map((t) => (
              <button
                key={t.val}
                type="button"
                onClick={() => setTripType(t.val)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  tripType === t.val
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Round Trip & One Way Layout */}
          {tripType !== "multi" && (
            <div className="flex flex-wrap lg:flex-nowrap gap-3 items-end mb-4">
              
              <AirportSearch
                value={from}
                onSelect={setFrom}
                label="FROM"
                placeholder="Search city or airport..."
              />

              <button
                type="button"
                onClick={handleSwap}
                className="h-10 w-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors text-orange-600 hover:scale-110 transform duration-200"
                title="Swap airports"
              >
                ⇄
              </button>

              <AirportSearch
                value={to}
                onSelect={setTo}
                label="TO"
                placeholder="Search city or airport..."
              />

              <div className="flex-1 min-w-[130px]">
                <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">DEPART</label>
                <input
                  type="date"
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
                  required
                />
              </div>

              {tripType === "return" && (
                <div className="flex-1 min-w-[130px]">
                  <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">RETURN</label>
                  <input
                    type="date"
                    value={ret}
                    onChange={(e) => setRet(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
                    required
                  />
                </div>
              )}

              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">TRAVELERS</label>
                <button
                  type="button"
                  ref={paxBtnRef}
                  onClick={() => setShowPax(!showPax)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm flex items-center justify-between hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
                >
                  <span className="font-medium">{pax} • {cabin}</span>
                  <ChevronDown size={14} className="text-orange-500" />
                </button>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">WHATSAPP</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+92 3001234567"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-10 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg disabled:shadow-none"
              >
                <Send size={16} />
                {loading ? "Sending" : "Search"}
              </button>
            </div>
          )}

          {/* Multi-City Layout */}
          {tripType === "multi" && (
            <div className="space-y-3 mb-4">
              {legs.map((leg, idx) => {
                const fromAirport = ALL_AIRPORTS.find(a => a.code === leg.from);
                const toAirport = ALL_AIRPORTS.find(a => a.code === leg.to);

                return (
                  <div key={idx} className="flex flex-wrap lg:flex-nowrap gap-3 items-end bg-gradient-to-r from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 p-4 rounded-lg border border-orange-200 dark:border-slate-600">
                    <div className="text-sm font-bold text-orange-600 dark:text-orange-400 min-w-[60px] bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                      LEG {idx + 1}
                    </div>
                    
                    <AirportSearch
                      value={leg.from}
                      onSelect={(code) => updateLeg(idx, "from", code)}
                      label="FROM"
                      placeholder="Search city or airport..."
                    />

                    <AirportSearch
                      value={leg.to}
                      onSelect={(code) => updateLeg(idx, "to", code)}
                      label="TO"
                      placeholder="Search city or airport..."
                    />

                    <div className="flex-1 min-w-[120px]">
                      <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">DATE</label>
                      <input
                        type="date"
                        value={leg.date}
                        onChange={(e) => updateLeg(idx, "date", e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
                      />
                    </div>

                    {legs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLeg(idx)}
                        className="h-10 w-10 mt-6 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-red-600 dark:text-red-400 hover:scale-110 transform duration-200"
                        title="Remove leg"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                );
              })}

              {legs.length < 6 && (
                <button
                  type="button"
                  onClick={addLeg}
                  className="w-full py-3 border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 text-sm font-semibold transition-all hover:border-orange-500"
                >
                  <Plus size={18} /> Add Leg ({legs.length}/6)
                </button>
              )}

              <div className="flex flex-wrap lg:flex-nowrap gap-3 items-end">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">TRAVELERS</label>
                  <button
                    type="button"
                    ref={paxBtnRef}
                    onClick={() => setShowPax(!showPax)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm flex items-center justify-between hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
                  >
                    <span className="font-medium">{pax} • {cabin}</span>
                    <ChevronDown size={14} className="text-orange-500" />
                  </button>
                </div>

                <div className="flex-1 min-w-[100px]">
                  <label className="block text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">WHATSAPP</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+92 3001234567"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600 transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-10 px-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg disabled:shadow-none"
                >
                  <Send size={16} />
                  {loading ? "Sending" : "Search"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {showPax && (
        <div ref={paxRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-sm p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-5">Travelers & Class</h3>
            
            <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-orange-200 dark:border-slate-600">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Passengers</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPax(Math.max(1, pax - 1))}
                  className="w-8 h-8 rounded-lg border border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-lg flex items-center justify-center font-bold transition-all"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-lg text-slate-900 dark:text-white">{pax}</span>
                <button
                  type="button"
                  onClick={() => setPax(Math.min(9, pax + 1))}
                  className="w-8 h-8 rounded-lg border border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-lg flex items-center justify-center font-bold transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-3 uppercase tracking-wide">Cabin Class</p>
              <div className="grid grid-cols-2 gap-2">
                {CABINS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCabin(c)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
                      cabin === c
                        ? "bg-orange-500 text-white shadow-md"
                        : "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-orange-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPax(false)}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}