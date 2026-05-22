"use client";

import React from 'react';
import AboutChooseus from '@/components/aboutus/AboutChooseus';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import PackageBanner from '@/components/hajjumrah/packagedetails/PackageBanner';
import PackageSlider from '@/components/hajjumrah/packagedetails/PackageSlider';
import ThreeStar from '@/components/hajjumrah/packagedetails/ThreeStar';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleMonthClick = (blockData) => {
    if (!blockData.monthSlug) return;
    // Yeh automatic user ko correct dynamic link par le jayega
    router.push(`/hajj-umrah/monthly-package/${blockData.monthSlug}`);
  };

  // 12 MONTHS INDIVIDUAL VERTICAL BLOCKS DATA ENGINE
  const monthlyBlocksData = [
    {
      monthSlug: "january", // FIXED: Added unique URL mapping key
      tagline: "JANUARY DEPARTURES",
      title: <>January <span className="text-[#F6931F]">Umrah Packages</span></>,
      imageSrc: "/imgs/hajj/hajj1.jpg",
      imageAlt: "January Umrah Deals",
      description: (
        <>
          <p>
            Start the new year with intense spiritual energy. January offers beautiful, crisp weather in Saudi Arabia, making your walking rituals and holy site visits incredibly comfortable.
          </p>
          <p className="mt-3">
            Our packages combine low early-year airfares with top-tier budget hotel alliances to provide maximum spiritual value without stretching your wallet.
          </p>
        </>
      ),
      listItems: [
        "7 Nights Express Budget Tiers",
        "10 Nights Balanced Family Plans",
        "14 Nights Extended Worship Deals",
        "Flights From All Major UK Hubs"
      ],
      btnText: "Explore January Packages"
    },
    {
      monthSlug: "february", // FIXED: Added unique URL mapping key
      tagline: "FEBRUARY DEPARTURES",
      title: <>February <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">Umrah Packages</span></>,
      imageSrc: "/imgs/hajj/hajj3.jpg",
      imageAlt: "February Umrah Deals",
      description: (
        <>
          <p>
            February is highly recommended for school mid-term breaks and senior citizens who want to perform pilgrimage in pleasant, mild outdoor climates before peak seasons.
          </p>
          <p className="mt-3">
            We handle fast-track electronic visa processing and tailored multicity luxury transport transfers for maximum independent comfort.
          </p>
        </>
      ),
      listItems: [
        "School Mid-Term Family Breaks",
        "Senior Citizen Specialized Care",
        "Close Proximity Haram Stays",
        "Group Guide Support Programs"
      ],
      btnText: "Explore February Packages"
    },
    {
      monthSlug: "march", // FIXED: Added unique URL mapping key
      tagline: "MARCH DEPARTURES",
      title: <>March <span className="text-[#F6931F]">Umrah Packages</span></>,
      imageSrc: "/imgs/hajj/hajj4.jpg",
      imageAlt: "March Umrah Deals",
      description: (
        <>
          <p>
            Immerse yourself into peak spiritual energy with our March packages, specifically synchronized to capture early Ramadan blessings and Taraweeh sessions.
          </p>
          <p className="mt-3">
            Enjoy carefully chosen accommodations situated within short walking distances to allow seamless navigation during high-occupancy months.
          </p>
        </>
      ),
      listItems: [
        "Early Ramadan Special Tiers",
        "Taraweeh Centric Hotel Choices",
        "Pre-Booked High-Speed Rail Tickets",
        "Fully Inclusive ATOL Protections"
      ],
      btnText: "Explore March Packages"
    },
    {
      monthSlug: "april", // FIXED: Added unique URL mapping key
      tagline: "APRIL DEPARTURES",
      title: <>April <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">Umrah Packages</span></>,
      imageSrc: "/imgs/hajj/hajj5.jpg",
      imageAlt: "April Umrah Deals",
      description: (
        <>
          <p>
            April brings beautiful spring climates ideal for exploring the historic sites of Makkah and Madinah through structured Ziyarah tours with expert guides.
          </p>
          <p className="mt-3">
            Perfect for post-Ramadan pilgrims who prefer lower crowds and peaceful, independent environments inside the holy sanctuaries.
          </p>
        </>
      ),
      listItems: [
        "Spring Break Holiday Special",
        "Low-Crowd Post Ramadan Tiers",
        "Comprehensive Guided City Tours",
        "Flexible Hub Airport Departures"
      ],
      btnText: "Explore April Packages"
    },
    {
      monthSlug: "may", // FIXED: Added unique URL mapping key
      tagline: "MAY DEPARTURES",
      title: <>May <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">Umrah Packages</span></>,
      imageSrc: "/imgs/hajj/hajj5.jpg",
      imageAlt: "May Umrah Deals",
      description: (
        <>
          <p>
            May brings warm and pleasant weather, making it an ideal time for Umrah pilgrims to explore the historic sites of Makkah and Madinah through structured Ziyarah tours with expert guides.
          </p>
          <p className="mt-3">
            Perfect for post-Ramadan pilgrims who prefer lower crowds and peaceful, independent environments inside the holy sanctuaries.
          </p>
        </>
      ),
      listItems: [
        "Spring Break Holiday Special",
        "Low-Crowd Post Ramadan Tiers",
        "Comprehensive Guided City Tours",
        "Flexible Hub Airport Departures"
      ],
      btnText: "Explore May Packages"
    },
    {
      monthSlug: "june", // FIXED: Added unique URL mapping key
      tagline: "JUNE DEPARTURES",
      title: <>June <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">Umrah Packages</span></>,
      imageSrc: "/imgs/hajj/hajj5.jpg",
      imageAlt: "June Umrah Deals",
      description: (
        <>
          <p>
            June offers warm and sunny weather, making it an excellent time for Umrah pilgrims to visit the historic sites of Makkah and Madinah with structured Ziyarah tours led by expert guides.
          </p>
          <p className="mt-3">
            Perfect for post-Ramadan pilgrims who prefer lower crowds and peaceful, independent environments inside the holy sanctuaries.
          </p>
        </>
      ),
      listItems: [
        "Spring Break Holiday Special",
        "Low-Crowd Post Ramadan Tiers",
        "Comprehensive Guided City Tours",
        "Flexible Hub Airport Departures"
      ],
      btnText: "Explore June Packages"
    },
    {
      monthSlug: "july", // FIXED: Added unique URL mapping key
      tagline: "JULY DEPARTURES",
      title: <>July <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">Umrah Packages</span></>,
      imageSrc: "/imgs/hajj/hajj5.jpg",
      imageAlt: "July Umrah Deals",
      description: (
        <>
          <p>
            July offers warm and sunny weather, making it an excellent time for Umrah pilgrims to visit the historic sites of Makkah and Madinah with structured Ziyarah tours led by expert guides.
          </p>
          <p className="mt-3">
            Perfect for post-Ramadan pilgrims who prefer lower crowds and peaceful, independent environments inside the holy sanctuaries.
          </p>
        </>
      ),
      listItems: [
        "Spring Break Holiday Special",
        "Low-Crowd Post Ramadan Tiers",
        "Comprehensive Guided City Tours",
        "Flexible Hub Airport Departures"
      ],
      btnText: "Explore July Packages"
    }
  ];

  return (
    <div>
      {/* SECTION 1: MASTER HERO BANNER */}
      <PackageSlider 
        imageSrc="/imgs/hajj/hajj2.jpg"
        imageAlt="Makkah Banner"
        badgeText="Our Monthly Umrah Packages"
        mainTitle={
          <>
            Explore Our <br />
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">
              Monthly Packages
            </span>
          </>
        }
        description="Book your premium Ramadan Umrah package early with hotel accommodations right next to the Haram."
        primaryBtnText="View Packages"
        formComponent={<HolidayInquiryForms formType="umrah"/>}
      />

      {/* SECTION 2: VERTICAL MONTH BLOCKS WITH THE CLICK REDIRECTION ATTACHED */}
      <ThreeStar blocks={monthlyBlocksData} onBlockClick={handleMonthClick} />

      {/* SECTION 3: SHARED MARKETING TEMPLATE BLOCKS */}
      <AboutChooseus />
      <PackageBanner />
      <BookingProcess />
    </div>
  );
};

export default Page;
