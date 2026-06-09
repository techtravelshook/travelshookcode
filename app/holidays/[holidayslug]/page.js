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
    <HolidaysSec slug={params.holidayslug} />
    <PopularHolidays slug={slug1}/>
    {/* <OtherPackages/> */}
    <FlightFaqs/>
    <BookingProcess/>
    </main>
  );
}