"use client";

import React from 'react';
import PackageSlider from '@/components/hajjumrah/packagedetails/PackageSlider';
import PackageInformations from '@/components/hajjumrah/packagedetails/PackageInformations';
import ThreeStar from '@/components/hajjumrah/packagedetails/ThreeStar';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import AboutChooseus from '@/components/aboutus/AboutChooseus';
import PackageBanner from '@/components/hajjumrah/packagedetails/PackageBanner';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import { usePackages } from '@/hooks/usePackage';
import axios from 'axios';
const Page = () => {
  
const { packages: threeStarPackage,  loading: cheapLoading,  error: threeserror  } = usePackages({ type: "RAMADAN", star: "STAR_3" });
  const { packages: fourStarPackage,  loading: womenLoading,  error: fourserror  } = usePackages({ type: "RAMADAN", star: "STAR_4" });
  const { packages: fiveStarPackage, loading: luxuryLoading, error: fiveserror } = usePackages({ type: "RAMADAN", star: "STAR_5" });
if (cheapLoading || womenLoading || luxuryLoading) {
    return <div>Loading...</div>;
  }
  if (threeserror) {
    return <div>Failed to three star packages: {threeserror}</div>;
  }
  if (fourserror) {
    return <div>Failed to four women packages: {fourserror}</div>;
  }
  if (fiveserror) {
    return <div>Failed to five luxury packages: {fiveserror}</div>;
  }
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
          <PackageInformations initialPackages={threeStarPackage}
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
          <PackageInformations initialPackages={fourStarPackage} badgeText="4★ Executive Ramadan Tiers" folderSlug="ramdan-package" />
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
          <PackageInformations initialPackages={fiveStarPackage} 
          
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
