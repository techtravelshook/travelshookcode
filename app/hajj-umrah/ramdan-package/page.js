"use client";

import React from 'react';
import PackageSlider from '@/components/hajjumrah/packagedetails/PackageSlider';
import PackageInformations from '@/components/hajjumrah/packagedetails/PackageInformations';
import ThreeStar from '@/components/hajjumrah/packagedetails/ThreeStar';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import AboutChooseus from '@/components/aboutus/AboutChooseus';
import PackageBanner from '@/components/hajjumrah/packagedetails/PackageBanner';
import BookingProcess from '@/components/hajjumrah/BookingProcess';

const Page = () => {
  
  // ── 3-STAR RAMADAN PACKAGES DATA ──
  const ramadanThreeStarData = [
    { 
      id: 301, 
      slug: "7-nights-3-star-ramadan",
      title: "7 Nights 3 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "A budget-friendly yet spiritually immersive short-stay package curated carefully for your seamless Taraweeh sessions.", 
      meal: "Suhoor Included", 
      price: "£899", 
      days: 7, 
      image: "/imgs/hajj/hajj3.jpg",
      details: "Makkah Hotel: Emaar Al Manar Hotel Makkah (4 Nights) | Madinah Hotel: Hayah Al Waha Hotel (3 Nights). Includes airport transfers."
    },
    { 
      id: 302, 
      slug: "10-nights-3-star-ramadan",
      title: "10 Nights 3 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "Spend a beautiful ten nights performing holy rituals in the sanctuary with an affordable itinerary structured for independent families.", 
      meal: "Breakfast Buffet", 
      price: "£960", 
      days: 10, 
      image: "/imgs/hajj/hajj4.jpg",
      details: "Makkah Hotel: Emaar Al Khalil Hotel (5 Nights) | Madinah Hotel: Golden Tulip Al Shakreen (5 Nights). Airfare support included."
    },
    { 
      id: 304, 
      slug: "12-nights-3-star-ramadan",
      title: "12 Nights 3 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "An extended, value-packed economic itinerary ideal for spending half of the holy month within Makkah and Madinah's peaceful environment.", 
      meal: "Suhoor / Breakfast", 
      price: "£1,060", 
      days: 12, 
      image: "/imgs/hajj/hajj4.jpg",
      details: "Makkah Hotel: Elaf Ajyad Hotel Makkah (7 Nights) | Madinah Hotel: Mirage Al Salam Hotel (7 Nights). Multi-city transportation."
    },
    { 
      id: 305, 
      slug: "14-nights-3-star-ramadan",
      title: "14 Nights 3 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "An extended, value-packed economic itinerary ideal for spending half of the holy month within Makkah and Madinah's peaceful environment.", 
      meal: "Suhoor / Breakfast", 
      price: "£1,060", 
      days: 14, 
      image: "/imgs/hajj/hajj4.jpg",
      details: "Makkah Hotel: Elaf Ajyad Hotel Makkah (7 Nights) | Madinah Hotel: Mirage Al Salam Hotel (7 Nights). Multi-city transportation."
    }
  ];

  // ── 4-STAR RAMADAN PACKAGES DATA ──
  const ramadanFourStarData = [
    { 
      id: 401, 
      slug: "10-nights-4-star-ramadan",
      title: "10 Nights 4 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "A beautifully curated mid-range premium package with dedicated transport and executive logistics for your fast-track pilgrimage.", 
      meal: "Half Board (Suhoor & Dinner)", 
      price: "£1,240", 
      days: 10, 
      image: "/imgs/hajj/hajj5.jpg",
      details: "Makkah Hotel: Elaf Kinda Hotel (5 Nights) | Madinah Hotel: Leader Al Muna Kareem (5 Nights). Dynamic Ziyarat tours included."
    },
    { 
      id: 402, 
      slug: "10-nights-4-star-ramadan",
      title: "10 Nights 4 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "Spend two full weeks of spiritual reflection in absolute mid-range luxury. Enjoy close hotel retail structures and elite transfers.", 
      meal: "Suhoor & Dinner Buffet", 
      price: "£1,399", 
      days: 10, 
      image: "/imgs/hajj/hajj6.jpg",
      details: "Makkah Hotel: Swissôtel Makkah (7 Nights) | Madinah Hotel: Al Aqeeq Madinah Hotel (7 Nights). UK return air tickets included."
    },
     { 
      id: 403, 
      slug: "12-nights-4-star-ramadan",
      title: "12 Nights 4 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "Spend two full weeks of spiritual reflection in absolute mid-range luxury. Enjoy close hotel retail structures and elite transfers.", 
      meal: "Suhoor & Dinner Buffet", 
      price: "£1,399", 
      days: 14, 
      image: "/imgs/hajj/hajj6.jpg",
      details: "Makkah Hotel: Swissôtel Makkah (7 Nights) | Madinah Hotel: Al Aqeeq Madinah Hotel (7 Nights). UK return air tickets included."
    },
     { 
      id: 404, 
      slug: "14-nights-4-star-ramadan",
      title: "14 Nights 4 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "Spend two full weeks of spiritual reflection in absolute mid-range luxury. Enjoy close hotel retail structures and elite transfers.", 
      meal: "Suhoor & Dinner Buffet", 
      price: "£1,399", 
      days: 14, 
      image: "/imgs/hajj/hajj6.jpg",
      details: "Makkah Hotel: Swissôtel Makkah (7 Nights) | Madinah Hotel: Al Aqeeq Madinah Hotel (7 Nights). UK return air tickets included."
    }
  ];

  // ── 5-STAR RAMADAN PACKAGES DATA ──
  const ramadanFiveStarData = [
    { 
      id: 501, 
      slug: "14-nights-5-star-ramadan",
      title: "14 Nights 5 Star Ramadan Package", 
      location: "Makkah & Madinah", 
      advantage: "Experience the peak blessings of Ramadan with luxury stays near the holy mosques. Features direct premium transfers and 24/7 guided support.", 
      meal: "Suhoor & Iftar Included", 
      price: "£1,680", 
      days: 14, 
      image: "/imgs/hajj/hajj1.jpg",
      details: "Makkah Hotel: Pullman ZamZam Makkah (7 Nights) | Madinah Hotel: Crowne Plaza Madinah (7 Nights). Private round-trip transport."
    },
    { 
      id: 502, 
      slug: "14-nights-luxury-umrah",
      title: "14 Nights Elite VIP Umrah Package", 
      location: "Makkah & Madinah", 
      advantage: "Embark on an elite, completely premium pilgrimage during the sacred month with top-tier elite hospitality services close to the holy sanctuaries.", 
      meal: "Full Board Premium Meals", 
      price: "£1,970", 
      days: 14, 
      image: "/imgs/hajj/hajj2.jpg",
      details: "Makkah Hotel: Dorrar Aleiman Royal (7 Nights) | Madinah Hotel: Madinah Hilton (7 Nights). Dedicated guide assistance throughout."
    }
  ];

  // Informative side section text content configuration block array
  const pageDataBlocks = [
    {
      tagline: "SACRED RAMADAN DEPARTURES",
      title: <>Blessings Of <span className="text-[#F6931F]">Ramadan Umrah</span> 2026 - 2027</>,
      imageSrc: "/imgs/hajj/hajj1.jpg",
      imageAlt: "Ramadan Holy Sanctuary",
      description: (
        <>
          <p>
            Performing Umrah during the holy month of Ramadan holds immense spiritual rewards, equivalent to performing Hajj with the Prophet (PBUH). 
          </p>
          <p className="mt-3">
            At Travelshook, we organize our premium and budget Ramadan routes with front-row hotel locations, pre-arranged fast-track visa processing, and multi-lingual religious scholars to guide you seamlessly through your sessions.
          </p>
        </>
      ),
      listItems: [
        "Pre-booked Suhoor & Iftar Meals",
        "Haram Front Row Hotel Options",
        "Fully Protected ATOL Airfares",
        "Expert Scholars For Guidance"
      ],
      btnText: "Request Custom Ramadan Quote"
    }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-black transition-colors duration-300">
      
      {/* 1. MASTER BANNER HEADER SCREEN */}
      <PackageSlider 
        imageSrc="/imgs/hajj/hajj2.jpg"
        imageAlt="Ramadan Banner"
        badgeText="Sacred Seasonal Tiers"
        mainTitle={
          <>
            Ramadan Umrah <br />
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">
              Packages 2026 - 2027
            </span>
          </>
        }
        description="Earn immense blessings by spending your holy month inside the peaceful environments of Makkah and Madinah with our fully inclusive plans."
        primaryBtnText="View All Deals"
        formComponent={<HolidayInquiryForms formType="umrah"/>}
      />

      {/* ================= CAROUSEL SECTIONS WITH TIER HEADINGS ================= */}
      <div className="py-12 space-y-16 max-w-[100vw] overflow-hidden">
        
        {/* TIER 1: 3 STAR SECTION */}
        <div className="border-b border-slate-200/50 dark:border-white/5 pb-12 last:border-b-0">
          <div className="container mx-auto px-4 lg:px-12 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="h-6 w-1 bg-[#F6931F] rounded-full inline-block" />
              3 Star Ramadan <span className="text-[#F6931F]">Umrah Packages</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium mt-1">Budget-friendly economic itineraries structured with comfortable proximity hotels near the holy sites.</p>
          </div>
          <PackageInformations initialPackages={ramadanThreeStarData}
           badgeText="3★ Budget Ramadan Tiers"
            folderSlug="ramdan-package"
           />
        </div>

        {/* TIER 2: 4 STAR SECTION */}
        <div className="border-b border-slate-200/50 dark:border-white/5 pb-12 last:border-b-0">
          <div className="container mx-auto px-4 lg:px-12 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="h-6 w-1 bg-[#0070A1] rounded-full inline-block" />
              4 Star Ramadan <span className="text-[#0070A1]">Executive Packages</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium mt-1">Excellent mid-range luxury balancing top hospitality service features, transfers, and smooth corporate logistics.</p>
          </div>
          <PackageInformations initialPackages={ramadanFourStarData} badgeText="4★ Executive Ramadan Tiers" folderSlug="ramdan-package" />
        </div>

        {/* TIER 3: 5 STAR SECTION */}
        <div className="border-b border-slate-200/50 dark:border-white/5 pb-6 last:border-b-0">
          <div className="container mx-auto px-4 lg:px-12 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="h-6 w-1 bg-[#F6931F] rounded-full inline-block" />
              5 Star Premium <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">VIP Elite Packages</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium mt-1">Elite VIP luxury pilgrimage with front-row hotels directly adjacent to Haram gates and customized private vehicles.</p>
          </div>
          <PackageInformations initialPackages={ramadanFiveStarData} 
          
          badgeText="5★ Premium VIP Ramadan Tiers"
          folderSlug="ramdan-package"
          />
        </div>

      </div>

      {/* 3. CORE INFORMATIVE DISPLAY WALL BLOCK */}
      <ThreeStar blocks={pageDataBlocks} />

      {/* 4. SHARED APP LANDING INTERFACE UTILITIES */}
      <AboutChooseus />
      <PackageBanner />
      <BookingProcess />

    </div>
  );
};

export default Page;
