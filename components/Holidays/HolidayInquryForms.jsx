"use client";

import React, { useState } from "react";
import { Send, User, Mail, Phone, MapPin, Calendar, Compass, Layers, Home, Users } from "lucide-react";

// Dropdown configuration map for easy updates
const CATEGORY_OPTIONS = {
  holidays: [
    { value: "f1-holidays", label: "F1 Holidays" },
    { value: "last-minute-holidays", label: "Last-Minute Holidays" },
    { value: "overwater-villa-holidays", label: "Overwater Villa Holidays" },
    { value: "luxury-holidays", label: "Luxury Holidays" },
    { value: "beach-holidays", label: "Beach Holidays" },
    
    { value: "theme-park-holidays", label: "Theme Park Holidays" },
    { value: "escorted-holidays", label: "Escorted Holidays" },
    { value: "adults-only-holidays", label: "Adults-Only Holidays" },
    { value: "honeymoon-holidays", label: "Honeymoon Holidays" },
    { value: "family-holidays", label: "Family Holidays" },
    { value: "city-breaks", label: "City Breaks" },
    { value: "all-inclusive-holidays", label: "All-Inclusive Holidays" },
    { value: "safari-holidays", label: "Safari Holidays" },
    {value:"Australia", label: "Visit to sydney"},
      {value:"azerbaijan", label: "Visit to Cuba"},
      {value:"azerbaijan", label: "Visit to Baku"},
      {value:"Bahamas", label: "Visit to Bahamas"},
  ],
  umrah: [
    { value: "economy-umrah", label: "Economy Umrah Packages" },
    { value: "3-star-umrah", label: "3 Star Umrah Packages" },
    { value: "4-star-umrah", label: "4 Star Umrah Packages" },
    { value: "5-star-umrah", label: "5 Star Luxury Umrah" },
    { value: "ramadan-umrah", label: "Ramadan Umrah Packages" },
    { value: "shaban-umrah", label: "Shaban Umrah Packages" },
    { value: "tailor-made-umrah", label: "Custom Tailor-Made Umrah" },
  ],
};

export default function TravelInquiryForm({ formType = "holidays" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    days: "",
    currentLocation: "",
    category: "",
    rooms: "1", 
    travellers: "1" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/forminquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType,
        ...formData,
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert(
        `Thank you! Your ${formType} inquiry has been submitted successfully.`
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        days: "",
        currentLocation: "",
        category: "",
        rooms: "1",
        travellers: "1",
      });
    } else {
      alert("Failed to submit inquiry.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`Inquiry Submitted by : (${formType}):`, formData);
  //   alert(`Thank you! Your ${formType} inquiry has been submitted successfully.`);
  //   setFormData({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     destination: "",
  //     days: "",
  //     currentLocation: "",
  //     category: "",
  //     rooms: "1",
  //     travellers: "1"
  //   });
  // };
  

  // Select option configuration based on prop
  const currentOptions = CATEGORY_OPTIONS[formType] || CATEGORY_OPTIONS.holidays;

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950/40 backdrop-blur-md p-4 sm:p-5 shadow-2xl text-slate-900 dark:text-white mx-auto transition-colors duration-300">
      
      {/* HEADER SECTION - TEXT DYNAMICALLY ADJUSTS */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          {formType === "umrah" ? (
            <>Umrah Booking <span className="text-[#F7931E]">Inquiry</span></>
          ) : (
            <>Quick Travel <span className="text-[#F7931E]">Inquiry</span></>
          )}
        </h2>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
          {formType === "umrah" 
            ? "Fill details below to get a custom Umrah package quote within minutes."
            : "Fill details below to get a customized budget holiday quote within minutes."
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Row 1: Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <User size={14} />
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Mail size={14} />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Phone & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Phone size={14} />
              </span>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44 7123 456789"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Your Location</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Compass size={14} />
              </span>
              <input
                type="text"
                name="currentLocation"
                required
                value={formData.currentLocation}
                onChange={handleChange}
                placeholder="London, Manchester"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Destination & Trip Days */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
              {formType === "umrah" ? "Ziyarat Destination" : "Where to go?"}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <MapPin size={14} />
              </span>
              <input
                type="text"
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                placeholder={formType === "umrah" ? "Makkah, Madinah" : "Dubai, Maldives, etc."}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Trip Days</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Calendar size={14} />
              </span>
              <input
                type="number"
                name="days"
                required
                min="1"
                value={formData.days}
                onChange={handleChange}
                placeholder="7, 10, 14 Days"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 4: DYNAMIC CATEGORY DROPDOWN CONTAINER */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
            {formType === "umrah" ? "Select Package Type" : "Select Holiday Category"}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Layers size={14} />
            </span>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                {formType === "umrah" ? "Choose Umrah Category" : "Any / Choose Holiday Category"}
              </option>
              {currentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-[10px]">▼</span>
          </div>
        </div>

        {/* Row 5: Rooms & Travellers Counter Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Total Rooms</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Home size={14} />
              </span>
              <input
                type="number"
                name="rooms"
                required
                min="1"
                value={formData.rooms}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Travellers</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Users size={14} />
              </span>
              <input
                type="number"
                name="travellers"
                required
                min="1"
                value={formData.travellers}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F7931E] hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
        >
          <Send size={14} /> Send Inquiry
        </button>

      </form>
    </div>
  );
}
