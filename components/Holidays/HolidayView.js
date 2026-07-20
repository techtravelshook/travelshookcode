"use client";
import CustomSlider from '@/components/CustomSlider';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import HolidayCards from '@/components/Holidays/HolidayCards';
import HeroSlider from '@/components/Holidays/HolidayHero';
import HolidaysInfo from '@/components/Holidays/HolidayInfo';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import HolidayPackages from '@/components/Holidays/HolidayPackages';
import HolidayDeals from '@/components/Holidays/Holidays';

import React from 'react'

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
export default function HolidaysPage() {
  const holidays=[
    "imgs/sliderimgs/f005.webp",
    "imgs/sliderimgs/f006.webp",
    "imgs/sliderimgs/h001.webp",
   "imgs/sliderimgs/h002.jpg",
  ]
  return (
    <main>
      <HeroSlider 
        slides={sliderImages}
        badgeText="Premium Holiday Packages"
        description="Discover luxury destinations, curated travel experiences, and unforgettable journeys tailored for you."
        formComponent={<HolidayInquiryForms />}
        autoPlayInterval={8000}
      />
      <div className="mt-8 md:mt-0">
        {/*  */}
        <HolidayCards />

         <HolidayPackages />  
         {/* honeymoon */}
         <HolidayDeals 
      badge="Top Booked Routes"
      titleMain="Holiday Deals &"
      titleHighlight="Packages"
      subtitle="Handpicked packages with flights, hotels and more included."
  
    /> 
         <HolidaysInfo />  
         <BookingProcess/>    
         <CustomSlider images={holidays}/>
      </div>
    </main>
  );
}