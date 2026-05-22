"use client";
// Agar page.js se data folder do step peeche hai
import { umrahPackagesData } from '@/data/packages';
import React from 'react';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import HajjCards from '@/components/hajjumrah/HajjCards';
import PackageSlider from '@/components/hajjumrah/LuxuaryUmrah';
import HeroSlider from '@/components/Holidays/HolidayHero';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';

const luxuryUmrahData = [
  { 
    id: 1, 
    slug: "14-nights-5-star", // Injected unique slugs
    title: "14 Nights 5 Star Ramadan Package", 
    location: "Makkah & Madinah", 
    advantage: "Experience the peak blessings of Ramadan with luxury stays near the holy mosques.", 
    meal: "Suhoor & Iftar Included", 
    price: "£1,280", 
    days: 14, 
    image: "/imgs/hajj/hajj1.jpg",
    details: "Makkah Hotel: Pullman ZamZam Makkah (7 Nights) | Madinah Hotel: Crowne Plaza Madinah (7 Nights)."
  },
  { 
    id: 2, 
    slug: "14-nights-luxury-umrah-deal", // Injected unique slugs
    title: "14 Nights Luxury Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Embark on an elite, completely premium pilgrimage during the sacred month.", 
    meal: "Full Board Premium", 
    price: "£970", 
    days: 14, 
    image: "/imgs/hajj/hajj2.jpg",
    details: "Makkah Hotel: Dorrar Aleiman Royal (7 Nights) | Madinah Hotel: Madinah Hilton (7 Nights)."
  },
  { 
    id: 3, 
    slug: "7-nights-luxury-umrah-deal", // Injected unique slugs
    title: "7 Nights Luxury Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Embark on an elite, completely premium pilgrimage during the sacred month.", 
    meal: "Full Board Premium", 
    price: "£570", 
    days: 7, 
    image: "/imgs/hajj/hajj2.jpg",
    details: "Makkah Hotel: Dorrar Aleiman Royal (7 Nights) | Madinah Hotel: Madinah Hilton (7 Nights)."
  },
  { 
    id: 4, 
    slug: "10-nights-luxury-umrah-deal", // Injected unique slugs
    title: "10 Nights Luxury Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Embark on an elite, completely premium pilgrimage during the sacred month.", 
    meal: "Full Board Premium", 
    price: "£750", 
    days: 10, 
    image: "/imgs/hajj/hajj2.jpg",
    details: "Makkah Hotel: Dorrar Aleiman Royal (7 Nights) | Madinah Hotel: Madinah Hilton (7 Nights)."
  }
];

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

      {/* 1. LUXURY 5-STAR PACKAGES SLIDER */}
  <PackageSlider 
  packages={umrahPackagesData["5-star-umrah"]}  // ← local data hatao
  folderSlug="5-star-umrah"                      // ← existing route use karo
  badgeText="Exclusive Ramadan Offers"
  mainTitlePrefix="Luxury Ramadan"
  mainTitleGradient="Umrah Packages 2026"
  description="..."
  whatsappNumber="923124928496"
/>

      {/* 2. CHEAP UMRAH PACKAGES SLIDER */}
  {/* 2. CHEAP UMRAH PACKAGES SLIDER */}
<PackageSlider 
  packages={umrahPackagesData["3-star-umrah"]}
  folderSlug="3-star-umrah"
  badgeText="Cheap Umrah Packages"
  mainTitlePrefix="Best Price Guaranteed"
  mainTitleGradient="Umrah Packages 2026"
  description="Discover the world with our top-rated holiday packages. We design all-inclusive travel offers featuring flights, hotels, tours, and transfers under one seamless booking."
  whatsappNumber="923124928496"
/>

      {/* 3. WOMEN PACKAGES SLIDER */}
    <PackageSlider 
  packages={umrahPackagesData["3-star-umrah"]}
  folderSlug="3-star-umrah"
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
