"use client";
import HeroSlider from '@/components/Holidays/HolidayHero';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import React, { useEffect, useState } from 'react';
import PackageGrid from '@/components/Holidays/PackagesType/PackageGrid';
import BookingModal from '@/components/Holidays/PackagesType/BookingModal';
import FlightFaqs from '@/components/flightservice/flightsplaces/FlightFaqs';
const theme = {
  primary: "#f59e0b",
  secondary: "#d97706",
  gradient: "linear-gradient(135deg,#f59e0b,#d97706)",
  lightBg: "rgba(245,158,11,0.1)",
  border: "rgba(245,158,11,0.2)",
};
const sliderImages = [
  { id: 1, src: "/imgs/holidays/bolton.jpg", alt: "bolton Holiday", title: "Elite Bolton experiences", subtitle: "Premium Bolton Experiences" },
  { id: 2, src: "/imgs/holidays/LondonBanner1.jpg", alt: "London Holiday", title: "Elite London experiences", subtitle: "Premium London Experiences" },
  { id: 3, src: "/imgs/holidays/Manchester.jpg", alt: "Manchester Holiday", title: "Elite holiday experiences", subtitle: "Premium Manchester Experiences" },
  { id: 4, src: "/imgs/holidays/Birmingham.jpg", alt: "Birmingham Holiday", title: "Elite Birmingham experiences", subtitle: "Premium Birmingham Experiences" },
];
/* ══ PAGE ══ */
export default function HolidaysPage() {
  const [selectedPkg, setSelectedPkg] = useState(null);
const [packages, setPackages] = useState([]);

useEffect(() => {
  const getPackages = async () => {
    const res = await fetch("/api/holiday-breaks?type=CITY_BREAK");
    const data = await res.json();
    const mapped = data.data.map((pkg) => ({
      ...pkg,
      image: pkg.images?.[0]?.url,
      features: pkg.features?.map((f) => f.name) || [],
      rating: Number(pkg.rating.replace("STAR_", "")),
    }));
    setPackages(mapped);
  };
  getPackages();
}, []);
  return (
    <div className=" min-h-screen bg-white dark:bg-[#030712] text-white dark:text-slate-100 transition-colors duration-300 " >
      {/* Hero */}
      <HeroSlider
        slides={sliderImages}
        badgeText="Premium Holiday Packages"
        description="Discover luxury destinations, curated travel experiences, and unforgettable journeys tailored for you."
        formComponent={<HolidayInquiryForms />}
        autoPlayInterval={8000}
      />
  <h1 className=" m-23 text-3xl sm:text-5xl font-black text-center tracking-wider bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] bg-clip-text text-transparent uppercase py-2">
 City Breaks Holidays
</h1>
 <PackageGrid
  packages={packages}
  onBook={setSelectedPkg}
  theme={theme}
/>
<>
  {selectedPkg && (
    <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
  )}
</>
<FlightFaqs/>
  
</div>
  );
}