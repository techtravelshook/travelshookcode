"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import HeroSlider from "@/components/Holidays/HolidayHero";
import axios from "axios";
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import SearchedPackages from "@/components/Holidays/HolidayPlaces/SearchedPackages";
import OtherPackages from "@/components/Holidays/HolidayPlaces/OtherPackages";
import PopularHolidays from "@/components/Holidays/HolidayPlaces/PopularHoliday";
import BookingProcess from "@/components/hajjumrah/BookingProcess";
import FlightFaqs from "@/components/flightservice/flightsplaces/FlightFaqs";
import HolidaysSec from '@/components/Holidays/HolidaysSec'
import { useParams } from "next/navigation";
const sliderImages = [
  {
    id: 1,
    src: "/imgs/holidays/bolton.jpg",
    alt: "bolton Holiday",
    title: "Elite Bolton experiences",
    subtitle: "Premium Bolton Experiences",
  },
  {
   id: 2,
    src: "/imgs/holidays/LondonBanner1.jpg",
    alt: "London Holiday",
    title: "Elite London experiences",
    subtitle: "Premium London Experiences",
  },
  {
   id: 3,
    src: "/imgs/holidays/Manchester.jpg",
    alt: "Manchester Holiday",
    title: "Elite holiday experiences",
    subtitle: "Premium Manchester Experiences",
  },
  {
   id: 4,
    src: "/imgs/holidays/Birmingham.jpg",
    alt: "Birmingham Holiday",
    title: "Elite Birmingham experiences",
    subtitle: "Premium Birmingham Experiences",
  },
];

export default function HolidaysListingPage({params}) {
 
  const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleBookingSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);

  try {
    const response = await axios.post("/api/holidayroute", {
      name: formData.name,
      email: formData.email,
      packageName: formData.packageName,
    });

    setSubmitStatus({
      success: true,
      message: response.data.message || "Request sent successfully.",
    });

    setFormData({
      name: "",
      email: "",
      packageName: "",
    });

    setTimeout(() => {
      setIsModalOpen(false);

      setSubmitStatus({
        success: null,
        message: "",
      });
    }, 1500);
  } catch (error) {
    setSubmitStatus({
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};
const [isModalOpen, setIsModalOpen] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  packageName: "",
});

const [isSubmitting, setIsSubmitting] = useState(false);

const [submitStatus, setSubmitStatus] = useState({
  success: null,
  message: "",
});



  const params1 = useParams();

  const slug1 = params1?.holidayslug;
  return (
    <main className="bg-white dark:bg-[#030712] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <HeroSlider 
        slides={sliderImages} // Now JavaScript can successfully find the array above
        badgeText="Premium Holiday Packages"
        description="Discover luxury destinations, curated travel experiences, and unforgettable journeys tailored for you."
        formComponent={<HolidayInquiryForms />}
        autoPlayInterval={5000}
      />
  {/*   <SearchedPackages /> */}
    {/* <HolidaysSec slug={params.holidayslug} /> */}
    <HolidaysSec
  slug={slug1}
  onBookClick={(holiday) => {
    setSubmitStatus({
      success: null,
      message: "",
    });

    setFormData({
      name: "",
      email: "",
      packageName: holiday?.title || holiday?.name || "Holiday Package",
    });

    setIsModalOpen(true);
  }}
/>
    <PopularHolidays slug={slug1}/>
    {/* <OtherPackages/> */}
    <FlightFaqs/>
    <BookingProcess/>
    {/* ================= BOOKING MODAL ================= */}
{isModalOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-700 p-6">

      {/* Close */}
      <button
        type="button"
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-red-500 hover:text-white transition"
      >
        ✕
      </button>

      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
        Holiday Booking Request
      </h2>

      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Complete the form below and our travel expert will contact you shortly.
      </p>

      <form
        onSubmit={handleBookingSubmit}
        className="space-y-5 mt-6"
      >
        {/* Name */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#F6931F]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-[#F6931F]"
          />
        </div>

        {/* Package */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Holiday Package
          </label>

          <input
            type="text"
            readOnly
            value={formData.packageName}
            className="mt-2 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-700 px-4 py-3"
          />
        </div>

        {/* Status */}
        {submitStatus.message && (
          <div
            className={`rounded-xl p-3 text-sm font-semibold ${
              submitStatus.success
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 py-3 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-[#F6931F] hover:bg-orange-600 text-white py-3 font-bold transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Request"}
          </button>

        </div>
      </form>
    </div>
  </div>
)}
    </main>
  );
}