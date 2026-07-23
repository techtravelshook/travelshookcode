"use client";

import { usePackages } from '@/hooks/usePackage';
import PackageSlider from '@/components/hajjumrah/LuxuaryUmrah';
import HajjCards from '@/components/hajjumrah/HajjCards';
import BookingProcess from '@/components/hajjumrah/BookingProcess';
import HeroSlider from '@/components/Holidays/HolidayHero';
import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms';
import { ImSpinner9 } from "react-icons/im";
import CustomSlider from '@/components/CustomSlider';
import UmrahSEOContent, { ScrollableTextBlock } from '../umrah-content';
import FAQ from './faq/page';

const flayers = [
  "imgs/sliderimgs/u03.webp",
  "imgs/sliderimgs/u02.webp",
  "imgs/sliderimgs/u01.webp",
  "imgs/sliderimgs/u04.webp",
  "imgs/sliderimgs/u05.webp",
  "imgs/sliderimgs/u07.webp",
  "imgs/sliderimgs/u06.webp",
  "imgs/sliderimgs/u008.webp",
];


function LuxView() {
  const sliderImages = [
    {
      id: 1,
      src: "/imgs/hajj/hajj1.jpg",
      alt: "Secure Your 2026 Blessings",
      title: "Secure Your 2026 Blessings",
      subtitle: "Premium UAE Experiences",
    },
    {
      id: 2,
      src: "/imgs/hajj/hajj2.jpg",
      alt: "Comfortable Family Umrah",
      title: "Comfortable Family Umrah",
      subtitle: "Explore Mountains & Nature",
    },
    {
      id: 3,
      src: "/imgs/hajj/hajj3.jpg",
      alt: "5-Star Spiritual Journeys",
      title: "5-Star Spiritual Journeys",
      subtitle: "Elite Hajj Experiences",
    },
  ];

  const { packages: luxuryPackages, loading: luxuryLoading, error: luxuryError } = usePackages("LUXURY");

  if (luxuryLoading) {
    return (
      <div className="mt-60 flex flex-col items-center justify-center gap-2 text-center">
        <ImSpinner9 className="animate-spin text-4xl text-orange-600" />
        <p>Loading Umrah Packages...</p>
      </div>
    );
  }

  if (luxuryError) {
    return <div>Failed to load packages: {luxuryError}</div>;
  }

  return (
    <div>
      <HeroSlider
        slides={sliderImages}
        badgeText="2026 Umrah Packages are officially LIVE"
        description="Book your spiritual journey now with our fully adjustable Hajj and Umrah packages built around your personal choices."
        formComponent={<HolidayInquiryForms formType="umrah" />}
        autoPlayInterval={5000}
      />

      {/* LUXURY UMRAH PACKAGES */}
      <PackageSlider
        packages={luxuryPackages}
        folderSlug="ramdan-package"
        starrating="luxury"
        badgeText="Exclusive Luxury Offers"
        mainTitlePrefix="Luxury Spiritual "
        mainTitleGradient="Umrah Packages 2026"
        description="Experience peak blessings with luxury stays near the holy sanctuaries..."
        whatsappNumber="+442038766846"
      />

      {/* SEO TEXT BLOCK */}
     <UmrahSEOContent/>
     <FAQ/>

      {/* BOOKING PROCESS */}
      <BookingProcess />
      <CustomSlider images={flayers} />
    </div>
  );
}

export default LuxView;