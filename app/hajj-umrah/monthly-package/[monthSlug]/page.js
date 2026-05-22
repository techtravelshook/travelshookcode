"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { umrahPackagesData } from "@/data/packages"; // Ensure database file path matches
import PackageInformations from "@/components/hajjumrah/packagedetails/PackageInformations";
import PackageSlider from "@/components/hajjumrah/packagedetails/PackageSlider";
import ThreeStar from "@/components/hajjumrah/packagedetails/ThreeStar";
import HolidayInquiryForms from "@/components/Holidays/HolidayInquryForms";

export default function MonthDynamicListingPage() {
  const params = useParams();
  
  // FIXED PARAM MATCH: Reads the exact folder name variable '[monthSlug]' from URL safely
  const rawMonth = params?.monthSlug || "january";
  const currentMonth = rawMonth.toLowerCase();

  const cleanMonthTitle = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  // Fallback testing data block array if custom object database arrays are still rendering blank
  const pageDataBlocks = [
    {
      tagline: `EXPLORE ${cleanMonthTitle.toUpperCase()} DEPARTURES`,
      title: <>Find Best <span className="text-[#F6931F]">{cleanMonthTitle} Umrah</span> Packages</>,
      imageSrc: "/imgs/hajj/hajj1.jpg",
      imageAlt: "Umrah Hotel Stays",
      description: <p>Explore customized premium 3-Star, 4-Star, and 5-Star packages optimized for the month of {cleanMonthTitle}.</p>
    }
  ];

  return (
    <div>
      <PackageSlider 
        imageSrc="/imgs/hajj/hajj2.jpg"
        imageAlt="Makkah Banner"
        badgeText={`${cleanMonthTitle} Specials`}
        mainTitle={<>Explore {cleanMonthTitle} Packages</>}
        description={`Book early to lock special premium rates for ${cleanMonthTitle} departures.`}
        primaryBtnText="View Packages"
        formComponent={<HolidayInquiryForms formType="umrah"/>}
      />

      <ThreeStar blocks={pageDataBlocks} />
    </div>
  );
}
