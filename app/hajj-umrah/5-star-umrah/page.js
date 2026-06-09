"use client";
import AboutChooseus from '@/components/aboutus/AboutChooseus';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import PackageBanner from '@/components/hajjumrah/packagedetails/PackageBanner';
import PackageInformations from '@/components/hajjumrah/packagedetails/PackageInformations';
import PackageSlider from '@/components/hajjumrah/packagedetails/PackageSlider'
import ThreeStar from '@/components/hajjumrah/packagedetails/ThreeStar'
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms'
import { usePackages } from '@/hooks/usePackage';
import React from 'react'
import axios from 'axios';

const Page = () => {

 const { packages: fiveStarPackages, loading: fiveStarLoading, error: fiveStarError } = usePackages({ type: "NORMAL", star: "STAR_5" });
    if (fiveStarError) {
    return <div>Failed to load 5-star packages: {fiveStarError}</div>;
  }
   const pageDataBlocks = [
    {
      tagline: "Convenience Without Compromise",
      title: <>Choosing A <span className="text-[#F6931F]">5-Star Package</span> to Perform Umrah</>,
      imageSrc: "/imgs/hajj/hajj6.jpg",
      imageAlt: "Umrah Hotel Stays",
      description: (
        <>
          <p>
            A 5-star package is highly sought after, as it helps save on expenses while still providing budget-friendly 
            packages. Our packages include stays in quality 4-star hotels in Makkah and Madinah, which are conveniently located near the holy sites.
          </p>
          <p>
            Senior citizens, students, and families enjoy affordable upkeep spending while receiving practical amenities, daily room cleaning, and close proximity to Haram.
          </p>
        </>
      ),
      listItems: [
        "Proximity to Holy Haram",
        "Daily Room Cleaning",
        "Practical Budget Amenities",
        "Ideal for Senior Citizens"
      ],
      btnText: "Explore 4 Star Hotels"
    },
    {
      tagline: "Best Value Deals",
      title: <>Travelshook Best Value <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">5-Star Deals</span> for 2026</>,
      imageSrc: "/imgs/hajj/hajj5.jpg",
      imageAlt: "UK Flights to Umrah",
      description: (
        <p>
          Our Umrah 2026 packages reflect our meticulous attention to detail through cost-effective arrangements for your flights, visas, hotels, and ground transport. Our deals for UK residents guarantee convenience whether you’re flying from Heathrow Airport, Gatwick, Manchester, or Birmingham.
        </p>
      ),
      listItems: [
        "Flights from Major UK Hubs",
        "Visa & Entrance Legal Formalities",
        "Optional Guided Tours Included",
        "Private Transfer Tiers Available"
      ],
      btnText: "Check Departure Dates"
    }
  ];

  // section 2 cards data for 5 star packages
  const fiveStarData = [
  { 
    id: 1, 
    slug: "7-nights-5-star", // FIXED: Added unique router slug parameter
    title: "7 Nights 5 Star Umrah Package", 
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
    slug: "10-nights-5-star", // FIXED: Added unique router slug parameter
    title: "10 Nights 5 Star Umrah Package", 
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
    slug: "12-nights-5-star", // FIXED: Added unique router slug parameter
    title: "12 Nights 5 Star Umrah Package", 
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
    slug: "14-nights-5-star", // FIXED: Added unique router slug parameter
    title: "14 Nights 5 Star Umrah Package", 
    location: "Makkah & Madinah", 
    advantage: "Spend a beautiful two full weeks immersing your heart and soul into worship with maximum economy savings throughout the trip.", 
    meal: "Suhoor / Breakfast Buffet", 
    price: "£949", 
    days: 14, 
    image: "/imgs/hajj/hajj6.jpg",
    details: "Makkah Hotel: Al Aseel Ajyad Hotel (7 Nights) | Madinah Hotel: Zaha Al Madinah Hotel (7 Nights). Fully inclusive air ticket deals."
  }
];

  return (
    <div>
      {/* section 1 header with inquiry form */}
        <PackageSlider 
      imageSrc="/imgs/hajj/hajj6.jpg"
      imageAlt="Makkah Banner"
      badgeText="Exclusive Ramadan Umrah"
      mainTitle={
        <>
        Explore Our <br />
      <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">5 Star Package
</span>
        </>
      }
      description="Book your premium Ramadan Umrah package early with 5-star hotel accommodations right next to the Haram."
      primaryBtnText="View Packages"
      formComponent={<HolidayInquiryForms formType="umrah"/>}
    />
    
    {/* Section 2 -> 5 stars packages */}
    <PackageInformations initialPackages={fiveStarPackages} />
    
    {/* Section 3-> About 3 start package */}
    <ThreeStar blocks={pageDataBlocks}  />
    
    {/* section 3-> why choose us */}
    <AboutChooseus/>
    
    {/* SECTION 4 */}
    <PackageBanner/>
    
    {/* Section 5 */}
    <BookingProcess/>
    </div>
  )
}
export default Page;
