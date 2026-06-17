"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import PackageSlider from "@/components/hajjumrah/packagedetails/PackageSlider";
import ThreeStar from "@/components/hajjumrah/packagedetails/ThreeStar";
import HolidayInquiryForms from "@/components/Holidays/HolidayInquryForms";
import PackageTabsBlock from "@/components/hajjumrah/packagedetails/TabsPackages";
import AboutChooseus from "@/components/aboutus/AboutChooseus";
import BookingProcess from "@/components/hajjumrah/BookingProcess";

export default function MonthDynamicListingPage() {
  const params = useParams();

  // URL: 14-nights-4-star-january
  const rawSlug = params?.monthSlug || "";

  // 🔥 extract month safely from slug
  const slugParts = rawSlug.toLowerCase().split("-");
  const month = slugParts[slugParts.length - 1]; // "january"

  const cleanMonthTitle =
    month.charAt(0).toUpperCase() + month.slice(1);

  const [activePackage, setActivePackage] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
 

  const fetchPackage = async () => {
    try {
     // ✅ After
const res = await axios.get(`/api/packages/${rawSlug}`);

      setActivePackage(res.data.data);
    } catch (error) {
      console.error(error);
      setActivePackage(null);
    } finally {
      setLoading(false);
    }
  };

  if (rawSlug) {
    fetchPackage();
  }
}, [rawSlug]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading {cleanMonthTitle} Packages...
      </div>
    );
  }

  if (!activePackage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        No packages found for {cleanMonthTitle}
      </div>
    );
  }

  const pageDataBlocks = [
    {
      tagline: `${activePackage.star} ${cleanMonthTitle} Package`,
      title: (
        <>
          Explore{" "}
          <span className="text-[#F6931F]">
            {activePackage.title}
          </span>
        </>
      ),
      imageSrc:
        activePackage.images?.[0]?.url
          ? `/${activePackage.images[0].url}`
          : "/imgss/hajj/hajj1.jpg",

      imageAlt: activePackage.title,
      description: <p>{activePackage.description}</p>,
    },
  ];

  return (
    <div>
      <PackageSlider
        imageSrc="/imgs/hajj/hajj2.jpg"
        imageAlt="Makkah Banner"
        badgeText={`${cleanMonthTitle} Specials`}
        mainTitle={
          <>
            Explore {cleanMonthTitle} <br />
            <span className="text-[#F6931F]">
              {activePackage.title}
            </span>
          </>
        }
        description={activePackage.advantage}
        primaryBtnText={`Book Now: ${activePackage.price}`}
        formComponent={<HolidayInquiryForms formType="umrah" />}
      />

      <ThreeStar blocks={pageDataBlocks} />

      <PackageTabsBlock pkg={activePackage} />
      <AboutChooseus/>
      <BookingProcess/>
    </div>
  );
}