"use client";

import React, { useMemo, useState, useCallback } from "react";
import {
  ArrowRight,
  PlaneTakeoff,
  ShieldCheck,
  Tag,
  Search,
  Flame,
  SlidersHorizontal,
  X,
  Upload,
  Loader,
  Check,
} from "lucide-react";
import Image from "next/image";

export default function FlightDealsGrid({ cityName, dealsData = [] }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passportNumber: "",
    dateOfBirth: "",
    passportImage: null,
    passportImagePreview: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // WhatsApp link generator
  const getWhatsAppLink = useCallback((route, price) => {
    const baseNumber = "923124928496";
    const text = encodeURIComponent(
      `Hi Travel Hooks, I would like to book: ${route} for ${price}. Please check availability.`
    );
    return `https://wa.me/${baseNumber}?text=${text}`;
  }, []);

  // Calculate cheapest price
  const cheapestPrice = useMemo(() => {
    if (!dealsData || dealsData.length === 0) return 0;
    return Math.min(
      ...dealsData.map((d) =>
        parseInt(String(d.price).replace(/[^0-9]/g, ""), 10)
      )
    );
  }, [dealsData]);

  // Filter + Sort
  const filteredDeals = useMemo(() => {
    let data = [...dealsData];

    if (query) {
      data = data.filter((d) =>
        `${d.departureCity} ${d.destinationCity} ${d.airlineName} ${d.departureCode} ${d.destinationCode}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    if (sortBy === "cheap") {
      data.sort(
        (a, b) =>
          parseInt(String(a.price).replace(/[^0-9]/g, ""), 10) -
          parseInt(String(b.price).replace(/[^0-9]/g, ""), 10)
      );
    }

    return data;
  }, [query, sortBy, dealsData]);

  // Handle booking input change
  const handleBookingInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle passport image upload
  const handlePassportImageUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookingData((prev) => ({
          ...prev,
          passportImage: file,
          passportImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle booking submission
  const handleBookingSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append("firstName", bookingData.firstName);
      formData.append("lastName", bookingData.lastName);
      formData.append("email", bookingData.email);
      formData.append("phone", bookingData.phone);
      formData.append("passportNumber", bookingData.passportNumber);
      formData.append("dateOfBirth", bookingData.dateOfBirth);
      formData.append("departureCode", selectedDeal.departureCode);
      formData.append("destinationCode", selectedDeal.destinationCode);
      formData.append("departureCity", selectedDeal.departureCity);
      formData.append("destinationCity", selectedDeal.destinationCity);
      formData.append("airlineName", selectedDeal.airlineName);
      formData.append("price", selectedDeal.price);
      formData.append("dates", selectedDeal.dates);

      if (bookingData.passportImage) {
        formData.append("passportImage", bookingData.passportImage);
      }

      const response = await fetch("/api/send-booking", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          setShowBookingModal(false);
          setSelectedDeal(null);
          setBookingData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            passportNumber: "",
            dateOfBirth: "",
            passportImage: null,
            passportImagePreview: null,
          });
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }, [bookingData, selectedDeal]);

  const isBookingFormValid = useMemo(() => {
    return (
      bookingData.firstName.trim() &&
      bookingData.lastName.trim() &&
      bookingData.email.trim() &&
      bookingData.phone.trim() &&
      bookingData.passportNumber.trim() &&
      bookingData.dateOfBirth
    );
  }, [bookingData]);

  return (
    <>
      <section className="relative w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 font-mulish transition-colors duration-500 dark:bg-[#01080C] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#E68213]/10 blur-[100px] dark:bg-[#E68213]/5" />
          <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] rounded-full bg-[#0070A1]/10 blur-[120px] dark:bg-[#0070A1]/5" />
          <div className="absolute -bottom-20 right-10 w-[350px] h-[350px] rounded-full bg-[#E68213]/5 blur-[90px] dark:bg-[#0070A1]/5" />
        </div>

        <div className="relative mx-auto max-w-8xl w-full z-10">
          {/* ───────────────── HEADER ───────────────── */}
          <div className="mb-10 flex flex-col items-start text-start">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800 backdrop-blur-sm shadow-sm transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] inline-block" />
              Live Flight Rates
            </span>

            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              Find Best Flight Deals From{" "}
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
                {cityName}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Search, compare, and instantly book exclusive promotional airfares
              negotiated directly with leading global airlines.
            </p>
          </div>

          {/* ───────────────── SEARCH & FILTERS ───────────────── */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch">
            <div className="flex items-center gap-3 border border-slate-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 rounded-xl px-4 py-3 flex-1 shadow-sm focus-within:border-[#0070A1] dark:focus-within:border-[#E68213] transition-colors">
              <Search size={18} className="text-slate-400 dark:text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destination, city, or airline..."
                className="w-full bg-transparent outline-none text-sm text-slate-700 dark:text-white font-medium placeholder-slate-400 dark:placeholder-zinc-600"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-slate-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 dark:text-zinc-300 shadow-sm whitespace-nowrap">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Showing {filteredDeals.length} Routes</span>
              </div>

              <div className="flex items-center gap-2 border border-slate-200/80 bg-white dark:bg-zinc-950 dark:border-zinc-800 rounded-xl px-3 py-3 text-sm shadow-sm flex-1 md:flex-initial">
                <SlidersHorizontal
                  size={14}
                  className="text-slate-400 dark:text-zinc-500"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-white cursor-pointer pr-2"
                >
                  <option value="default" className="bg-white dark:bg-zinc-950 text-slate-700 dark:text-white">
                    Default Sort
                  </option>
                  <option value="cheap" className="bg-white dark:bg-zinc-950 text-slate-700 dark:text-white">
                    Cheapest Price
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* ───────────────── DEALS GRID ───────────────── */}
          {filteredDeals.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950/40 backdrop-blur-md">
              <p className="text-sm font-semibold text-slate-400 dark:text-zinc-500">
                No matching routes found for your current search filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDeals.map((deal, index) => {
                const priceNumber = parseInt(
                  String(deal.price).replace(/[^0-9]/g, ""),
                  10
                );
                const isBest = priceNumber === cheapestPrice;

                return (
                  <div
                    key={index}
                    className="group relative rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-6 hover:-translate-y-1 hover:shadow-xl dark:hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="absolute top-0 left-0 h-full w-[4px] bg-gradient-to-b from-[#E68213] to-[#0070A1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-l-2xl" />

                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center w-full">
                          <div>
                            <div className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                              <span>{deal.departureCode}</span>
                              <PlaneTakeoff
                                size={18}
                                className="text-slate-300 dark:text-zinc-600 group-hover:translate-x-1 transition-transform"
                              />
                              <span className="text-transparent bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text">
                                {deal.destinationCode}
                              </span>
                            </div>
                          </div>

                          {deal.airlineLogo && (
                            <div className="ml-auto w-12 h-12 rounded-lg bg-gray-100 dark:bg-white p-1.5 flex items-center justify-center border border-slate-200/50 dark:border-zinc-800 flex-shrink-0">
                              <Image
                                src={
                                  deal.airlineLogo.startsWith("/")
                                    ? deal.airlineLogo
                                    : `/${deal.airlineLogo}`
                                }
                                width={48}
                                height={48}
                                alt={deal.airlineName || "Airline Logo"}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                        </div>

                        {isBest && (
                          <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E68213]/10 dark:bg-[#E68213]/20 text-[#E68213] border border-[#E68213]/20 shadow-sm animate-pulse">
                            <Flame size={10} className="fill-current" />
                            Best Rate
                          </div>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                        {deal.departureCity} to {deal.destinationCity}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-dashed border-slate-100 dark:border-zinc-900">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
                          <Tag size={13} className="text-[#0070A1]" />
                          <span>{deal.airlineName}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
                          <ShieldCheck size={13} className="text-[#E68213]" />
                          <span>{deal.dates}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-900 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                          All-Inclusive Price
                        </p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                          £ {deal.price}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedDeal(deal);
                          setShowBookingModal(true);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 hover:shadow-md active:scale-95 transition-all duration-300"
                      >
                        Book Now
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────── BOOKING MODAL ───────────────── */}
      {showBookingModal && selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-950 shadow-2xl border border-slate-200/60 dark:border-zinc-800">
            {/* Close Button */}
            <button
              onClick={() => setShowBookingModal(false)}
             className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <X size={18} className="text-slate-600 dark:text-white" />
            </button>

            {submitStatus === "success" ? (
              // Success Message
              <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] flex items-center justify-center mb-6 animate-pulse">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                  Booking Received!
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 max-w-sm">
                  Your flight booking details have been sent to {bookingData.email}. Our team will contact you shortly with confirmation.
                </p>
              </div>
            ) : (
              <>
                {/* Header with Flight Info */}
                <div className="  bg-gradient-to-r from-[#E68213] to-[#0070A1] p-4 sm:p-6 text-white border-b border-slate-200/60 dark:border-zinc-800">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                        Complete Your Booking
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
                        {selectedDeal.departureCode} → {selectedDeal.destinationCode}
                      </h2>
                      <p className="text-xs text-white/90">
                        {selectedDeal.departureCity} • {selectedDeal.destinationCity} • {selectedDeal.dates}
                      </p>
                    </div>
                    {selectedDeal.airlineLogo && (
                      <div className="w-14 h-14 rounded-lg bg-white/20 backdrop-blur-sm p-1.5 flex items-center justify-center flex-shrink-0 mr-8">
                        <Image
                          src={
                            selectedDeal.airlineLogo.startsWith("/")
                              ? selectedDeal.airlineLogo
                              : `/${selectedDeal.airlineLogo}`
                          }
                          width={48}
                          height={48}
                          alt={selectedDeal.airlineName || "Airline Logo"}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleBookingSubmit} className="p-4 sm:p-6 space-y-6">
                  {/* Passenger Information */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white text-xs font-black flex items-center justify-center">
                        1
                      </span>
                      Passenger Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleBookingInputChange}
                          placeholder="John"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50 dark:bg-zinc-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-[#0070A1] dark:focus:border-[#E68213] outline-none transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleBookingInputChange}
                          placeholder="Doe"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50 dark:bg-zinc-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-[#0070A1] dark:focus:border-[#E68213] outline-none transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleBookingInputChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50 dark:bg-zinc-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-[#0070A1] dark:focus:border-[#E68213] outline-none transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleBookingInputChange}
                          placeholder="+92 300 1234567"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50 dark:bg-zinc-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-[#0070A1] dark:focus:border-[#E68213] outline-none transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={bookingData.dateOfBirth}
                          onChange={handleBookingInputChange}
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50 dark:bg-zinc-900/50 text-slate-900 dark:text-white focus:border-[#0070A1] dark:focus:border-[#E68213] outline-none transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          name="passportNumber"
                          value={bookingData.passportNumber}
                          onChange={handleBookingInputChange}
                          placeholder="A1234567B"
                          className="w-full px-4 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50 dark:bg-zinc-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:border-[#0070A1] dark:focus:border-[#E68213] outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Passport Document */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white text-xs font-black flex items-center justify-center">
                        2
                      </span>
                      Passport Document
                    </h3>

                    <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl p-6 text-center hover:border-[#0070A1] dark:hover:border-[#E68213] transition-colors">
                      {bookingData.passportImagePreview ? (
                        <div className="space-y-3">
                          <div className="w-full h-48 relative rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800">
                            <img
                              src={bookingData.passportImagePreview}
                              alt="Passport Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById("passport-upload");
                              if (input) input.click();
                            }}
                            className="text-xs font-bold text-[#0070A1] dark:text-[#E68213] hover:underline"
                          >
                            Change Passport Image
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-zinc-900 flex items-center justify-center">
                              <Upload size={24} className="text-slate-400 dark:text-zinc-600" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Upload Passport
                              </p>
                              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                          </div>
                          <input
                            id="passport-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePassportImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gradient-to-br from-[#E68213]/15 to-[#0070A1]/15 dark:from-[#E68213]/10 dark:to-[#0070A1]/10 rounded-xl p-4 border border-[#E68213]/30 dark:border-[#0070A1]/30">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                        Total Booking Amount
                      </p>
                      <p className="text-3xl font-black bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
                        £ {selectedDeal.price}
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isBookingFormValid || isSubmitting}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#E68213] to-[#0070A1] text-white font-bold text-sm uppercase tracking-wider hover:opacity-95 hover:shadow-lg active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        Complete Booking
                      </>
                    )}
                  </button>

                  {submitStatus === "error" && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}