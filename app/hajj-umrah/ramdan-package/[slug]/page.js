"use client";

import React from 'react';
import { useParams } from 'next/navigation';
// Apni package.js file se pure master object structure ko import kar rahe hain
import { ramdanUmrahPackage } from '@/data/packages'; 

import AboutChooseus from '@/components/aboutus/AboutChooseus';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import PackageBanner from '@/components/hajjumrah/packagedetails/PackageBanner';
import PackageInformations from '@/components/hajjumrah/packagedetails/PackageInformations';
import PackageSlider from '@/components/hajjumrah/packagedetails/PackageSlider';
import ThreeStar from '@/components/hajjumrah/packagedetails/ThreeStar';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';

const DynamicPackageDetailPage = () => {
  const params = useParams();
  
  // 1. URL parameter se active component unique slug cleanly track karna safely
  const rawSlug = params?.slug || "";
  const currentSlug = decodeURIComponent(rawSlug).trim().toLowerCase().replace(/\s+/g, '-');

  // 2. Pure multi-tier object arrays ko flatten bundle array structure banana searching ke liye
  const allPackagesArray = Object.values(ramdanUmrahPackage || {}).flat();
  
  // 3. Current URL slug variable match framework block logic run karna
  const activePackage = allPackagesArray.find((pkg) => {
    if (!pkg.slug) return false;
    const cleanPkgSlug = pkg.slug.trim().toLowerCase();
    if (cleanPkgSlug === currentSlug) return true;

    // String normalization logic patch for handling spelling edge-cases smoothly
    const normalizedPkg = cleanPkgSlug.replace('ramadan', 'ramdan');
    const normalizedCurrent = currentSlug.replace('ramadan', 'ramdan');
    return normalizedPkg === normalizedCurrent;
  });

  // 4. Default fallback protection view layout in case routing context breaks down
  if (!activePackage) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-sm shadow-2xl">
          <p className="text-xl text-orange-500 font-black tracking-wide mb-2">Package Not Found</p>
          <p className="text-xs text-zinc-400">The requested dynamic content route node has failed matching matrix targets.</p>
          <div className="mt-4 bg-zinc-800 p-3 rounded font-mono text-xs text-zinc-300">Slug: {currentSlug}</div>
        </div>
      </div>
    );
  }

  // 5. Instantly generating identical informative side block text components inside the layout schema
  const dynamicPageDataBlocks = [
    {
      tagline: "Convenience Without Compromise",
      title: <>Choosing A <span className="text-[#F6931F]">{activePackage.title}</span> to Perform Umrah</>,
      imageSrc: activePackage.image || "/imgs/hajj/hajj1.jpg",
      imageAlt: "Umrah Hotel Stays",
      description: (
        <>
          <p>
            This customized layout package is highly sought after, as it helps save on expenses while still providing budget-friendly 
            packages. Our selection includes stays in quality hotels across Makkah and Madinah, which are conveniently located near the holy sites.
          </p>
          <p className="mt-3">
            {activePackage.advantage} Senior citizens, students, and independent families enjoy affordable upkeep spending while receiving premium room cleaning services.
          </p>
        </>
      ),
      listItems: [
        `Duration: ${activePackage.days} Days Total Stay`,
        `Location Target: ${activePackage.location}`,
        `Included Logistics: ${activePackage.meal}`,
        "Practical Budget Amenities Enabled"
      ],
      btnText: `Reserve For ${activePackage.price}`
    },
    {
      tagline: "Best Value Deals",
      title: <>Travelshook Best Value <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">Deal Elements</span> for 2026</>,
      imageSrc: "/imgs/hajj/hajj5.jpg",
      imageAlt: "UK Flights to Umrah",
      description: (
        <p>
          Our Umrah 2026 dynamic packaging setups reflect our meticulous attention to detail through cost-effective arrangements for your flights, visas, hotels, and ground transport. {activePackage.details} Our premium deals for UK residents guarantee total convenience whether flying from Heathrow Airport, Gatwick, Manchester, or Birmingham.
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

  // Wrapping single selected product element into a flat list array context so map() loops inside child components don't crash
  const dataPassingWrapperList = [activePackage];

  return (
    <div className="w-full bg-slate-50 dark:bg-black transition-colors duration-300">
      
      {/* SECTION 1: MASTER BANNER HEADER SCREEN WITH FULL FLOATING WIDGET FORM INCLUDED */}
      <PackageSlider 
        imageSrc="/imgs/hajj/hajj2.jpg"
        imageAlt="Makkah Banner"
        badgeText="Exclusive Ramadan Umrah"
        mainTitle={
          <>
            Explore Our <br />
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">
              {activePackage.title}
            </span>
          </>
        }
        description={activePackage.advantage}
        primaryBtnText={`Lock Package Rate: ${activePackage.price}`}
        formComponent={<HolidayInquiryForms formType="umrah" />}
      />
      
      {/* SECTION 2: THE CARD ROW BLOCK DISPENSING SELECTION DATA VALUES */}
     
      
      {/* SECTION 3: EDITORIAL TWO-GRID ROW ABOUT CURRENT CHOSEN TIER DETAILS */}
      <ThreeStar blocks={dynamicPageDataBlocks} />
      
      {/* SECTION 4: WHY CHOOSE BRAND MODULE ADVANTAGES COMPONENT ROW */}
      <AboutChooseus />
      
      {/* SECTION 5: ACCENT GOLD BANNER GRAPHIC SECTION SEPARATOR STRIP */}
      <PackageBanner />
      
      {/* SECTION 6: THE PIPELINE STEP GRAPH BOOKING WORKFLOW GRID AREA */}
      <BookingProcess />

    </div>
  );
};

export default DynamicPackageDetailPage;
