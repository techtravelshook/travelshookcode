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

 // Modal and Booking Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", packageName: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });
  
  const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


const handleBookingSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);
  setSubmitStatus({
    success: null,
    message: "",
  });

  try {
    const res = await axios.post("/api/ramdanroute", {
      name: formData.name,
      email: formData.email,
      packageName: formData.packageName,
    });

    setSubmitStatus({
      success: true,
      message: res.data.message,
    });

    setTimeout(() => {
      setIsModalOpen(false);

      setFormData({
        name: "",
        email: "",
        packageName: "",
      });
    }, 1500);

  } catch (error) {
    setSubmitStatus({
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong.",
    });
  } finally {
    setIsSubmitting(false);
  }
};

 useEffect(() => {
  if (!slug) return;



  const fetchPackage = async () => {
    try {
      const res = await axios.get(
        `/api/packages/${slug}`
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
      {/* <ThreeStar blocks={dynamicPageDataBlocks} /> */}
   <ThreeStar
  blocks={dynamicPageDataBlocks}
  onBlockClick={(block) => {
    setFormData({
      name: "",
      email: "",
      packageName: activePackage.title,
    });

    setSubmitStatus({
      success: null,
      message: "",
    });

    setIsModalOpen(true);
  }}
/>
      <PackageTabsBlock pkg={activePackage} />
      <AboutChooseus />      
      <PackageBanner />
      <BookingProcess />
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
      
      {/* Close Button */}
      <button 
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xl font-bold transition-colors"
        type="button"
      >
        ✕
      </button>

      <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
        Book Your Package
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Fill in your details below to secure your package rates.
      </p>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F6931F]"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F6931F]"
          />
        </div>

        {/* Package Name Input */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
            Package Name
          </label>
          <input 
            type="text" 
            name="packageName"
            value={formData.packageName}
            readOnly
            className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* Status Alert Message */}
        {submitStatus.message && (
          <div className={`p-3 rounded-xl text-sm font-semibold text-center ${
            submitStatus.success 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {/* Book Now Button */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#F6931F] hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl transition duration-150 disabled:opacity-50 text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {isSubmitting ? "Sending Request..." : "Book Now"}
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default DynamicPackageDetailPage;
