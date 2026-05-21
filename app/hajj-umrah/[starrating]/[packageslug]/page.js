import { umrahPackagesData } from "@/data/packages";
import PackageSlider from "@/components/hajjumrah/packagedetails/PackageSlider";
import ThreeStar from "@/components/hajjumrah/packagedetails/ThreeStar";

import HolidayInquiryForms from '@/components/Holidays/HolidayInquryForms'
import { notFound } from "next/navigation";

export default async function MasterPackageDetailPage({ params }) {
  const { starrating, packageslug } = await params;

  // 1. Category find karein
  const categoryGroup = umrahPackagesData[starrating];
  if (!categoryGroup) notFound();

  // 2. Exact package find karein slug ke throug
  const currentPackage = categoryGroup.find((pkg) => pkg.slug === packageslug);
  if (!currentPackage) notFound();

  const pageDataBlocks = [
    {
      tagline: "Convenience Without Compromise",
      title: currentPackage.title,
      imageSrc: currentPackage.image,
      imageAlt: currentPackage.title,
      description: <p>{currentPackage.advantage}</p>,
      listItems: [
        currentPackage.details,
        `Meal Strategy: ${currentPackage.meal}`,
        "Full ATOL flight protection infrastructure verified"
      ]
    }
  ];

  return (
    <div>
      <PackageSlider 
        imageSrc={currentPackage.image}
        imageAlt={currentPackage.title}
        badgeText={`${currentPackage.days} Nights Special`}
        mainTitle={
          <>
            {currentPackage.title.split("Umrah")[0]} <br />
            <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent font-black">
              Umrah Package
            </span>
          </>
        }
        description={`Secure bookings starting at ${currentPackage.price}. Tailored specifically from your nearest UK airport terminal hub.`}
        primaryBtnText="Instant Reservation"
        formComponent={<HolidayInquiryForms formType="umrah"/>}
      />

      <ThreeStar blocks={pageDataBlocks} />
    </div>
  );
}
