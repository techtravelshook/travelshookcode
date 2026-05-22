"use client";

import React from 'react';
// Data file se cleanly correct integrated object arrays call kar rahe hain
import { ramdanUmrahPackage } from '@/data/packages'; 

import BookingProcess from '@/components/hajjumrah/BookingProcess';
import HajjCards from '@/components/hajjumrah/HajjCards';
import PackageSlider from '@/components/hajjumrah/LuxuaryUmrah';
import HeroSlider from '@/components/Holidays/HolidayHero';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';

function Page() {
  const sliderImages = [
    {
      id: 1,
      src: "/imgs/hajj/hajj1.jpg",
      alt: "Secure Your 2026 Blessings",
      title: "Secure Your 2026 Blessings",
      subtitle: "Premium UAE Experiences",
    },
    {
      id: 2,
      src: "/imgs/hajj/hajj2.jpg",
      alt: "Comfortable Family Umrah",
      title: "Comfortable Family Umrah",
      subtitle: "Explore Mountains & Nature",
    },
    {
      id: 3,
      src: "/imgs/hajj/hajj3.jpg",
      alt: "5-Star Spiritual Journeys",
      title: "5-Star Spiritual Journeys",
      subtitle: "Elite Hajj Experiences",
    },
  ];

  return (
    <div>
      {/* Hero Header Slider Container */}
      <HeroSlider
        slides={sliderImages}
        badgeText="2026 Umrah Packages are officially LIVE"
        description="Book your spiritual journey now and experience the sacred rituals of Umrah with us. Don't miss out on this opportunity to embark on a transformative pilgrimage. Reserve your spot today!"
        formComponent={<HolidayInquiryForms formType="umrah"/>}
        autoPlayInterval={5000}
      />

      <HajjCards />

      {/* 1. LUXURY 5-STAR PACKAGES SLIDER (Now populated with your home page 5-star data) */}
      <PackageSlider 
        packages={ramdanUmrahPackage?.["5-star-ramdan-umrah"]}  
        folderSlug="ramdan-package"                             
        badgeText="Exclusive Ramadan Offers"
        mainTitlePrefix="Luxury Ramadan"
        mainTitleGradient="Umrah Packages 2026"
        description="Experience the peak blessings of Ramadan with luxury stays right near the holy sanctuaries."
        whatsappNumber="923124928496"
      />

      {/* 2. CHEAP UMRAH PACKAGES SLIDER */}
      <PackageSlider 
        packages={ramdanUmrahPackage?.["3-star-ramdan-umrah"]}  
        folderSlug="ramdan-package"                             
        badgeText="Cheap Umrah Packages"
        mainTitlePrefix="Best Price Guaranteed"
        mainTitleGradient="Umrah Packages 2026"
        description="Discover the world with our top-rated holiday packages. We design all-inclusive travel offers featuring flights, hotels, tours, and transfers under one seamless booking."
        whatsappNumber="923124928496"
      />

      {/* 3. WOMEN PACKAGES SLIDER */}
      <PackageSlider 
        packages={ramdanUmrahPackage?.["4-star-ramadan-umrah"]} 
        folderSlug="ramdan-package"                             
        badgeText="Women Umrah Package"
        mainTitlePrefix="Curated For Women"
        mainTitleGradient="Umrah Packages 2026"
        description="Discover the world with our top-rated holiday packages. We design all-inclusive travel offers featuring flights, hotels, tours, and transfers under one seamless booking."
        whatsappNumber="923124928496"
      />

      <BookingProcess />
    </div>
  );
}

export default Page;
