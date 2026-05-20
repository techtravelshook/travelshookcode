import BookingProcess from '@/components/hajjumrah/BookingProcess';
import HajjCards from '@/components/hajjumrah/HajjCards';
import PackageSlider from '@/components/hajjumrah/LuxuaryUmrah';

import HeroSlider from '@/components/Holidays/HolidayHero'
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms'
import React from 'react'


const luxuryUmrahData = [
  { 
    id: 1, 
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
    title: "10 Nights Luxury Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Embark on an elite, completely premium pilgrimage during the sacred month.", 
    meal: "Full Board Premium", 
    price: "£570", 
    days: 7, 
    image: "/imgs/hajj/hajj2.jpg",
    details: "Makkah Hotel: Dorrar Aleiman Royal (7 Nights) | Madinah Hotel: Madinah Hilton (7 Nights)."
  }
];
function page() {
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
{/* slider is coming from HeroSlider component0  */}
<HeroSlider
slides={sliderImages}
        badgeText="2026 Umrah Packages are officially LIVE"
        description="Book your spiritual journey now and experience the sacred rituals of Umrah with us. Don't miss out on this opportunity to embark on a transformative pilgrimage. Reserve your spot today!"
        formComponent={<HolidayInquiryForms />}
        autoPlayInterval={5000}
/>
<HajjCards/>
<PackageSlider 
  packages={luxuryUmrahData}
  badgeText="Exclusive Umrah Offers"
  mainTitlePrefix="Luxury Premium"
  mainTitleGradient="Umrah Packages 2026"
  description="Discover the world with our top-rated holiday packages. We design all-inclusive travel offers featuring flights, hotels, tours, and transfers under one seamless booking."
  whatsappNumber="923124928496"
/>

<PackageSlider 
  packages={luxuryUmrahData}
  badgeText="Cheap Umrah Packages"
  mainTitlePrefix="Best Price Guaranteed"
  mainTitleGradient="Umrah Packages 2026"
  description="Discover the world with our top-rated holiday packages. We design all-inclusive travel offers featuring flights, hotels, tours, and transfers under one seamless booking."
  whatsappNumber="923124928496"
/>

<PackageSlider 
  packages={luxuryUmrahData}
  badgeText="Women Umrah Package"
  mainTitlePrefix="Curated For Women"
  mainTitleGradient="Umrah Packages 2026"
  description="Discover the world with our top-rated holiday packages. We design all-inclusive travel offers featuring flights, hotels, tours, and transfers under one seamless booking."
  whatsappNumber="923124928496"
/>
<BookingProcess/>
    </div>
  )
}

export default page