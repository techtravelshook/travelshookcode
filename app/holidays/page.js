"use client";

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


export default function HolidaysPage() { // Capital letter se start karein
  return (
    <main>
      <HeroSlider 
        slides={sliderImages}
        badgeText="Premium Holiday Packages"
        description="Discover luxury destinations, curated travel experiences, and unforgettable journeys tailored for you."
        formComponent={<HolidayInquiryForms />}
        autoPlayInterval={5000}
      />
      <div className="mt-8 md:mt-0">
        <HolidayCards />
         <HolidayPackages />   
         <HolidaysInfo />  
         <BookingProcess/>    
      </div>
    </main>
  );
}