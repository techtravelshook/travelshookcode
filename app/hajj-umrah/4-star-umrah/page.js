"use client";
import PackageFeatures from '@/components/umrah/PackageFeatures';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import PackageBanner from '@/components/hajjumrah/packagedetails/PackageBanner';
import PackageInformations from '@/components/hajjumrah/packagedetails/PackageInformations';
import PackageSlider from '@/components/hajjumrah/packagedetails/PackageSlider'
import ThreeStar from '@/components/hajjumrah/packagedetails/ThreeStar'
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms'
import React from 'react'
import { usePackages } from '@/hooks/usePackage';
import axios from 'axios';

const Page = () => {
   const { packages: fourStarPackages, loading: fourStarLoading, error: fourStarError } =usePackages({ type: "NORMAL", star: "STAR_4" })
  // Sample data for the ThreeStar component
  const pageDataBlocks = [
  {
    tagline: "Comfort Without Compromise",
    title: <>Peaceful & Affordable <span className="text-[#F6931F]">4-Star Umrah Packages</span> 2026</>,
    imageSrc: "/imgs/hajj/hajj1.jpg",
    imageAlt: "Umrah Hotel Stays",
    description: (
      <>
        <p>
          As a parent, do you picture a spiritual journey that is comfortable, serene, and remarkably distinctive? 
          Travelshook offers premium 4-Star Umrah Packages from the UK for 2026 that combine quality, convenience, 
          and affordability while keeping your focus entirely on worship.
        </p>
        <p>
          Whether you are traveling with family, seniors, or a group, our packages include stays in excellent 4-star hotels 
          close to the Haram in Makkah and Madinah, along with flights, visas, and transport.
        </p>
      </>
    ),
    listItems: [
      "4-Star Hotels Near Haram",
      "Flights from UK Major Airports",
      "Visa & Ground Transport Included",
      "Ideal for Families & Seniors"
    ],
  //  btnText: "Explore 4-Star Packages"
  },
  {
    tagline: "Tailored for Your Spiritual Journey",
    title: <>Custom <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">4-Star Umrah Deals</span> 2026</>,
    imageSrc: "/imgs/hajj/hajj5.jpg",
    imageAlt: "UK to Umrah",
    description: (
      <p>
        Travelshook offers fully customizable 4-Star Umrah Packages for 2026. Choose your dates, hotel, duration, 
        meal plan, and transport type. Perfect for families, elderly pilgrims, and private groups seeking comfort 
        and peace during Ramadan or any time in 2026.
      </p>
    ),
    listItems: [
      "Flexible Travel Dates",
      "Preferred Hotels Near Haram",
      "Group Discounts Available",
      "Transparent Pricing – No Hidden Fees"
    ],
  //  btnText: "Customize Your Package"
  }
];
  // section 2 cards data for 4 star packages
  const fourStarData = [
  { 
    id: 1, 
    slug: "7-nights-4-star", // FIXED: Added unique router slug parameter
    title: "7 Nights 4 Star Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "A perfectly balanced express itinerary designed for short spiritual getaways, ensuring proximity to holy sites on a budget.", 
    meal: "Breakfast Buffet Included", 
    price: "£649", 
    days: 7, 
    image: "/imgs/hajj/hajj3.jpg",
    details: "Makkah Hotel: Emaar Al Khalil (4 Nights) | Madinah Hotel: Al Mukhtara International (3 Nights). Flights & Visa included."
  },
  { 
    id: 2, 
    slug: "10-nights-4-star", // FIXED: Added unique router slug parameter
    title: "10 Nights 4 Star Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Our most popular budget itinerary allowing comfortable pace progression between both holy sanctuaries for worship sessions.", 
    meal: "Suhoor & Breakfast Buffet", 
    price: "£799", 
    days: 10, 
    image: "/imgs/hajj/hajj1.jpg",
    details: "Makkah Hotel: Dar Al Eiman Al Sud (5 Nights) | Madinah Hotel: Wefadah Al Zahra (5 Nights). Includes full multi-city transport."
  },
  { 
    id: 3, 
    slug: "12-nights-4-star", // FIXED: Added unique router slug parameter
    title: "12 Nights 4 Star Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "An optimal extended itinerary curated specifically for families and senior pilgrims seeking ample time for dynamic Ziyarah tours.", 
    meal: "Daily Breakfast Buffet", 
    price: "£889", 
    days: 12, 
    image: "/imgs/hajj/hajj5.jpg",
    details: "Makkah Hotel: Al Azhar Hotel Makkah (7 Nights) | Madinah Hotel: Al Eiman Ohud (5 Nights). Complete ground logistics support."
  },
  { 
    id: 4, 
    slug: "14-nights-4-star", // FIXED: Added unique router slug parameter
    title: "14 Nights 4 Star Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Spend a beautiful two full weeks immersing your heart and soul into worship with maximum economy savings throughout the trip.", 
    meal: "Suhoor / Breakfast Buffet", 
    price: "£949", 
    days: 14, 
    image: "/imgs/hajj/hajj6.jpg",
    details: "Makkah Hotel: Al Aseel Ajyad Hotel (7 Nights) | Madinah Hotel: Zaha Al Madinah Hotel (7 Nights). Fully inclusive air ticket deals."
  }
];

//section 3 data for about 4 star package
const fourStarDifferentiators = [
  { 
    id: "01", 
    title: "Premium 4-Star Hotels Near Haram", 
    desc: "We offer preferential and hygienic accommodation at 4-star hotels close to Haram in Makkah and Madinah",
    image: "/imgs/hajj/hajj1.jpg"
  },
  { 
    id: "02", 
    title: "Affordable Luxury for Families & Seniors", 
    desc: "We offer comprehensive packages for Umrah that include flights, transport, visas, and accommodation",
    image: "/imgs/hajj/hajj3.jpg"
  },
  { 
    id: "03", 
    title: "Complete Package with Flights & Visa", 
    desc: "We offer flexible departures from several major airports in the UK.",
    image: "/imgs/hajj/hajj5.jpg"
  },

  { 
    id: "04", 
    title: "Customizable Itineraries to Suit Your Needs", 
    desc: "There are options for Umrah packages that include 4-star accommodation and meals.",
    image: "/imgs/hajj/hajj2.jpg"
  },
  { 
    id: "05", 
    title: "Transparent Pricing with No Hidden Fees", 
    desc: "Reliable customer support is actively provided in the UK and Saudi Arabia.",
    image: "/imgs/hajj/hajj6.jpg"
  },
];


  return (
    <div>
      {/* section 1 header with inquiry form */}
        <PackageSlider 
      imageSrc="/imgs/hajj/hajj2.jpg"
      imageAlt="Makkah Banner"
      badgeText="Exclusive Ramadan Umrah"
      mainTitle={
        <>
        Explore Our <br />
      <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">4 Star Package
</span>
        </>
      }
      description="Travelshook is proud to be one of the UK’s most trusted 4-star Umrah package providers. "
      primaryBtnText="View Packages"
      formComponent={<HolidayInquiryForms formType="umrah"/>}
    />
    
    {/* Section 2 -> 4 stars packages SLIDER */}
    <PackageInformations initialPackages={fourStarPackages} />
    
    {/* Section 3-> About 3 start package */}
    <ThreeStar blocks={pageDataBlocks}  />
    
    {/* section 3-> why choose this package */}
    <PackageFeatures
  tagline="4-Star Advantage"
  title="Why Choose Our 4-Star Umrah Packages"
  subtitle="Comfortable, affordable, and spiritually focused journeys from the UK."
  differentiators={fourStarDifferentiators}
/>
    
    {/* SECTION 4 */}
    <PackageBanner/>
    
    {/* Section 5 */}
    <BookingProcess/>
    </div>
  )
}
export default Page;
