"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import HeroSlider from "@/components/Holidays/HolidayHero";
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import SearchedPackages from "@/components/Holidays/HolidayPlaces/SearchedPackages";
import OtherPackages from "@/components/Holidays/HolidayPlaces/OtherPackages";
import PopularHolidays from "@/components/Holidays/HolidayPlaces/PopularHoliday";
import BookingProcess from "@/components/hajjumrah/BookingProcess";
import FlightFaqs from "@/components/flightservice/flightsplaces/FlightFaqs";

const sliderImages = [
  {
    id: 1,
    src: "/imgs/dubai.jpg",
    alt: "Dubai Luxury Holiday",
    title: "Luxury Dubai Escapes",
    subtitle: "Premium UAE Experiences",
  },
  {
    id: 2,
    src: "/imgs/nepal.jpg",
    alt: "Nepal Adventure Tour",
    title: "Adventure In Nepal",
    subtitle: "Explore Mountains & Nature",
  },
  {
    id: 3,
    src: "/imgs/crete.jpg",
    alt: "Crete Premium Beach Escape",
    title: "Crete Beach Holidays",
    subtitle: "Mediterranean Luxury Retreats",
  },
];

export default function HolidaysListingPage() {
  return (
    <main className="bg-white dark:bg-[#030712] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <HeroSlider 
        slides={sliderImages} // Now JavaScript can successfully find the array above
        badgeText="Premium Holiday Packages"
        description="Discover luxury destinations, curated travel experiences, and unforgettable journeys tailored for you."
        formComponent={<HolidayInquiryForms />}
        autoPlayInterval={5000}
      />
    <SearchedPackages />
    <PopularHolidays/>
    <OtherPackages/>
    <FlightFaqs/>
    <BookingProcess/>
    </main>
  );
}