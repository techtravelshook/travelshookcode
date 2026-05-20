"use client";

import React, { useState } from "react";
import { Send, User, Mail, Phone, MapPin, Calendar, Compass, Layers, Home, Users } from "lucide-react";

export default function HolidayInquiryForms() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted Full Data:", formData);
    alert("Thank you! Your inquiry with complete structural filters has been submitted.");
    setFormData({
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
  };

  return (
    /* FIXED: Restructured broken class lines into clean single-line strings to avoid SSR mismatches */
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-950/40 backdrop-blur-md p-4 sm:p-5 shadow-2xl text-slate-900 dark:text-white mx-auto transition-colors duration-300">
      
      <div className="mb-8 text-center">
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          Quick Travel <span className="text-[#F7931E]">Inquiry</span>
        </h2>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
          Fill the details below to get a customized budget quote within minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Row 1: Full Name & Email Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="relative">
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
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div className="relative">
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
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Phone Number & Your Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
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
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div className="relative">
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
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Destination & Trip Days */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Where to go?</label>
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
                placeholder="e.g. Dubai, Turkey"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div className="relative">
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
                placeholder="e.g. 7"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 4: Rooms & Travellers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">No. of Rooms</label>
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
                placeholder="1"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">No. of People</label>
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
                placeholder="1"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-xs focus:outline-none focus:border-[#F7931E] focus:ring-1 focus:ring-[#F7931E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Choose Category Select Field */}
        <div className="relative">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">Choose Category</label>
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
              <option value="" disabled>Any / Choose Category</option>
              <option value="f1-holidays">F1 Holidays</option>
              <option value="last-minute-holidays">Last-Minute Holidays</option>
              <option value="overwater-villa-holidays">Overwater Villa Holidays</option>
              <option value="luxury-holidays">Luxury Holidays</option>
              <option value="beach-holidays">Beach Holidays</option>
              <option value="ski-holidays">Ski Holidays</option>
              <option value="theme-park-holidays">Theme Theme Park Holidays</option>
              <option value="escorted-holidays">Escorted Holidays</option>
              <option value="adults-only-holidays">Adults-Only Holidays</option>
              <option value="honeymoon-holidays">Honeymoon Holidays</option>
              <option value="family-holidays">Family Holidays</option>
              <option value="city-breaks">City Breaks</option>
              <option value="all-inclusive-holidays">All-Inclusive Holidays</option>
              <option value="safari-holidays">Safari Holidays</option>
            </select>
            
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="fill-current h-3 w-3" xmlns="http://w3.org" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F7931E] hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#F7931E]/20 transition-all duration-200"
        >
          Submit Inquiry
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}
