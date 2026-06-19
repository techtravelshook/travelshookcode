'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { X, Send, User, Phone, Mail, Calendar } from "lucide-react";
import { ImSpinner9 } from "react-icons/im";

import DynamicSlider from "../DynamicSlider/DynamicSlider";

const bargainFlights = [
  { id: 1, country: "Australia", price: "450", image: "/imgs/flights/australia.jpg" },
  { id: 2, country: "India", price: "855", image: "/imgs/flights/india.jpg" },
  { id: 3, country: "Ghana", price: "500", image: "/imgs/flights/accra.jpg" },
  { id: 4, country: "Nigeria", price: "349", image: "/imgs/flights/Nigeria.jpg" },
  { id: 5, country: "Pakistan", price: "490", image: "/imgs/flights/Pakistan.jpg" },
  { id: 6, country: "Usa", price: "338", image: "/imgs/flights/usa.jpg" },
  { id: 7, country: "Philippines", price: "450", image: "/imgs/flights/philippines.jpg" },
  { id: 8, country: "Zimbabwe", price: "463", image: "/imgs/flights/zimbabwe.jpg" },
  { id: 9, country: "Brazil", price: "552", image: "/imgs/flights/brazil.jpg" },
];

const destinations = [
  {
    city: "Dubai",
    country: "UAE",
    price: "£269",
    image: "/imgs/dubai.jpg",
    desc: "Experience luxury and adventure in the heart of the Middle East.",
    tags: ["Direct Flight", "7 Nights", "Hotel Included"],
    stars: 5,
    duration: "7 Nights",
  },
  {
    city: "Nepal",
    country: "Nepal",
    price: "£465",
    image: "/imgs/nepal.jpg",
    desc: "Trek through the majestic Himalayas on a once-in-a-lifetime journey.",
    tags: ["Guided", "Adventure", "Flights Included"],
    stars: 4,
    duration: "10 Nights",
  },
  {
    city: "Makkah",
    country: "Saudi Arabia",
    price: "£299",
    image: "/imgs/makkah.jpg",
    desc: "Embark on a spiritual journey to the holiest city in Islam.",
    tags: ["Umrah", "Guided", "Flights Included"],
    stars: 5,
    duration: "14 Nights",
  },
  {
    city: "Paris",
    country: "France",
    price: "£446",
    image: "/imgs/paris.jpg",
    desc: "Discover the city of love — art, cuisine and iconic landmarks await.",
    tags: ["City Break", "4 Nights", "Flights Included"],
    stars: 4,
    duration: "4 Nights",
  },
  {
    city: "Turkey",
    country: "Turkey",
    price: "£332",
    image: "/imgs/turkey.jpg",
    desc: "Explore the rich history and stunning landscapes of Istanbul and beyond.",
    tags: ["Culture", "7 Nights", "Flights Included"],
    stars: 4,
    duration: "7 Nights",
  },
];

function FlightContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openBookingModal = (flight) => {
    setSelectedFlight(flight);
    setForm({ name: "", phone: "", email: "", date: "" });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedFlight(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFlight) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          packageName: `Flight to ${selectedFlight.country}`,
          packagePrice: `£${selectedFlight.price}`,
          message: `Requested Travel Start Date: ${form.date}`,
          type: "Flight Booking Inquiry",
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Booking request sent successfully!");
        closeModal();
      } else {
        alert(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Dynamic Slider */}
      <div className="py-6">
        <DynamicSlider
          title="Popular Flight"
          italicTitle="Routes"
          badge="Top Destinations"
          data={destinations}
        />
      </div>

      {/* Bargain Flights */}
      <section className="bg-white transition-colors duration-500 dark:bg-[#01080C] sm:py-14 lg:py-8">
        <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 w-full text-left">
            <span className="mb-3 inline-flex rounded-full border border-[#E68213]/20 bg-[#E68213]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68213]">
              Budget Travel
            </span>
            <h2 className="text-xl sm:text-4xl lg:text-3xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">
              Elite Deals,{" "}
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent ">
                Budget Prices
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
              Fly worldwide without breaking the bank. Exclusive deals for UK travelers.
            </p>
          </div>

          <div className="flex w-full overflow-x-auto gap-3 pb-4 scrollbar-hide snap-x snap-mandatory px-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 sm:px-0">
            {bargainFlights.map((flight) => (
              <Link
                key={flight.id}
                href={`/flights/${flight.country.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative flex h-52 w-[85vw] min-w-[280px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-white/[0.08] sm:w-full"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={flight.image}
                    alt={`Flights to ${flight.country}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 25vw"
                  />
                </div>

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                <div className="relative z-20 flex h-full flex-col justify-between p-5">
                  <div>
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      Best Airfare
                    </p>
                    <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                      {flight.country}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-white/70">Starting From</p>
                      <h4 className="text-xl font-black text-[#F7931E]">£{flight.price}</h4>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();   // ← Added this
                        openBookingModal(flight);
                      }}
                      className="rounded-lg bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-[#F7931E] active:scale-95"
                    >
                      Book Now 
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {isOpen && selectedFlight && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0A1116] w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Book Flight to {selectedFlight.country}
              </h3>
              <p className="text-[#F7931E] font-semibold">Starting from £{selectedFlight.price}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 focus:border-[#F7931E] outline-none"
                />
              </div>

              {/* Phone, Email, Date inputs same as before... */}
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (+44...)"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 focus:border-[#F7931E] outline-none"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 focus:border-[#F7931E] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-500 dark:text-slate-400">
                  Preferred Travel Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 focus:border-[#F7931E] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#F7931E] to-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <> <ImSpinner9 className="animate-spin" /> Sending... </>
                ) : (
                  <> Send Booking Request <Send size={18} /> </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightContent;