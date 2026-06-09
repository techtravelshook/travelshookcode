"use client";
import React,{ useState, useEffect } from "react";
import axios from "axios";

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
import PackageTabsBlock from "@/components/hajjumrah/packagedetails/TabsPackages";
const DynamicPackageDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const [activePackage, setActivePackage] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!slug) return;



  const fetchPackage = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/packages/${slug}`
      );

      setActivePackage(res.data.data);
    } catch (error) {
      console.error("Package Fetch Error:", error);
      setActivePackage(null);
    } finally {
      setLoading(false);
    }
  };

  fetchPackage();
}, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Package...
      </div>
    );
  }

  if (!activePackage) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-sm shadow-2xl">
          <p className="text-xl text-orange-500 font-black mb-2">
            Package Not Found
          </p>
          <p className="text-xs text-zinc-400">
            No package found for this slug.
          </p>
        </div>
      </div>
    );
  }
 const dynamicPageDataBlocks = [
    {
      tagline: `${activePackage.star} Package`,
      title: (
        <>
          Perform Umrah With Our{" "}
          <span className="text-[#F6931F]">
            {activePackage.title}
          </span>
        </>
      ),

      imageSrc:
        activePackage.images?.[0]?.url
          ? `/${activePackage.images[0].url}`
          : "/imgs/hajj/hajj1.jpg",

      imageAlt: activePackage.title,

      description: (
        <>
          <p>{activePackage.description}</p>

          <p className="mt-3">
            Stay comfortably in{" "}
            <strong>{activePackage.makkahHotel}</strong> in Makkah and{" "}
            <strong>{activePackage.madinahHotel}</strong> in Madinah.
          </p>
        </>
      ),

      listItems: [
        `${activePackage.duration} Nights Package`,
        `Makkah Hotel: ${activePackage.makkahHotel}`,
        `Madinah Hotel: ${activePackage.madinahHotel}`,
        `Starting From £${activePackage.price}`,
      ],

      btnText: "Reserve Your Package",
    },
  ];


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
      <div className="container mx-auto px-4 py-12">
  
</div>
      <ThreeStar blocks={dynamicPageDataBlocks} />
      <PackageTabsBlock pkg={activePackage} />
      <AboutChooseus />      
      <PackageBanner />
      <BookingProcess />
    </div>
  );
};

export default DynamicPackageDetailPage;
