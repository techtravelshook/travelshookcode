"use client";
import AboutChooseus from '@/components/aboutus/AboutChooseus';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import PackageBanner from '@/components/hajjumrah/packagedetails/PackageBanner';
import PackageInformations from '@/components/hajjumrah/packagedetails/PackageInformations';
import PackageSlider from '@/components/hajjumrah/packagedetails/PackageSlider'
import ThreeStar from '@/components/hajjumrah/packagedetails/ThreeStar'
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms'
import React from 'react'

const page = () => {
  // Sample data for the ThreeStar component
   const pageDataBlocks = [
    {
      tagline: "Convenience Without Compromise",
      title: <>Choosing A <span className="text-[#F6931F]">3-Star Package</span> to Perform Umrah</>,
      imageSrc: "/imgs/hajj/hajj1.jpg",
      imageAlt: "Umrah Hotel Stays",
      description: (
        <>
          <p>
            A 3-star package is highly sought after, as it helps save on expenses while still providing budget-friendly 
            packages. Our packages include stays in quality 3-star hotels in Makkah and Madinah, which are conveniently located near the holy sites.
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
      btnText: "Explore 3 Star Hotels"
    },
    {
      tagline: "Best Value Deals",
      title: <>Travelshook Best Value <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">3-Star Deals</span> for 2026</>,
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

  // section 2 cards data for 3 star packages
   const threeStarData = [
    { 
      id: 1, 
      title: "7 Nights Economy 3 Star Deal", 
      location: "Makkah & Madinah", 
      advantage: "Perfect short-term package providing standard comfortable accommodations at competitive economy pricing.", 
      meal: "Suhoor Included", 
      price: "£599", 
      days: 7, 
      image: "/imgs/hajj/hajj3.jpg",
      details: "Makkah: Emaar Al Khalil (4 Nights) | Madinah: Emaar Taibah (3 Nights)."
    },
     { 
      id: 2, 
      title: "7 Nights Economy 3 Star Deal", 
      location: "Makkah & Madinah", 
      advantage: "Perfect short-term package providing standard comfortable accommodations at competitive economy pricing.", 
      meal: "Suhoor Included", 
      price: "£599", 
      days: 7, 
      image: "/imgs/hajj/hajj3.jpg",
      details: "Makkah: Emaar Al Khalil (4 Nights) | Madinah: Emaar Taibah (3 Nights)."
    },
     { 
      id: 3, 
      title: "7 Nights Economy 3 Star Deal", 
      location: "Makkah & Madinah", 
      advantage: "Perfect short-term package providing standard comfortable accommodations at competitive economy pricing.", 
      meal: "Suhoor Included", 
      price: "£599", 
      days: 7, 
      image: "/imgs/hajj/hajj3.jpg",
      details: "Makkah: Emaar Al Khalil (4 Nights) | Madinah: Emaar Taibah (3 Nights)."
    },
     { 
      id: 4, 
      title: "7 Nights Economy 3 Star Deal", 
      location: "Makkah & Madinah", 
      advantage: "Perfect short-term package providing standard comfortable accommodations at competitive economy pricing.", 
      meal: "Suhoor Included", 
      price: "£599", 
      days: 7, 
      image: "/imgs/hajj/hajj1.jpg",
      details: "Makkah: Emaar Al Khalil (4 Nights) | Madinah: Emaar Taibah (3 Nights)."
    },
     { 
      id: 5, 
      title: "5 Nights Economy 3 Star Deal", 
      location: "Makkah & Madinah", 
      advantage: "Perfect short-term package providing standard comfortable accommodations at competitive economy pricing.", 
      meal: "Suhoor Included", 
      price: "£599", 
      days: 7, 
      image: "/imgs/hajj/hajj5.jpg",
      details: "Makkah: Emaar Al Khalil (4 Nights) | Madinah: Emaar Taibah (3 Nights)."
    },
     { 
      id: 6, 
      title: "13 Nights Economy 3 Star Deal", 
      location: "Makkah & Madinah", 
      advantage: "Perfect short-term package providing standard comfortable accommodations at competitive economy pricing.", 
      meal: "Suhoor Included", 
      price: "£599", 
      days: 7, 
      image: "/imgs/hajj/hajj6.jpg",
      details: "Makkah: Emaar Al Khalil (4 Nights) | Madinah: Emaar Taibah (3 Nights)."
    }
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
      <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">3 Star Package
</span>
        </>
      }
      description="Book your premium Ramadan Umrah package early with 5-star hotel accommodations right next to the Haram."
      primaryBtnText="View Packages"
      formComponent={<HolidayInquiryForms formType="umrah"/>}
    />
{/* Section 2 -> 3 stars packages */}
<PackageInformations initialPackages={threeStarData} />
    {/* Section 3-> About 3 start package */}.
    <ThreeStar blocks={pageDataBlocks}  />
     {/*  section 3-> why choose us */}
  <AboutChooseus/>
  {/* SECTION 4 */}
  <PackageBanner/>
  {/*  Section 5  */}
  <BookingProcess/>
    </div>
   
 
  )
}
export default page