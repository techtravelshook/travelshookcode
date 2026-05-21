import { umrahPackagesData } from "@/data/packages";
import PackageInformations from "@/components/hajjumrah/packagedetails/PackageInformations";
import { notFound } from "next/navigation";

export default async function StarRatingListingPage({ params }) {
  const { starrating } = await params;

  // URL parameters ke mutabiq sahi array fetch karein
  const packagesList = umrahPackagesData[starrating];

  // Agar URL ghalat ho to 404 show karein
  if (!packagesList) {
    notFound();
  }

  // Title formatting handles prettifying slugs (e.g. 3-star-umrah -> 3 Star Umrah)
  const displayTitle = starrating.replace(/-/g, " ");

  return (
    <div className="py-10 bg-white dark:bg-black">
      <PackageInformations 
        initialPackages={packagesList}
        badgeText="Exclusive Offers"
        titlePartOne="Affordable Premium"
        titlePartTwo={displayTitle}
        descriptionText={`Browse our collection of highly requested dynamic packages for ${displayTitle}. Handpicked stays and custom flight routes configured for UK pilgrims.`}
      />
    </div>
  );
}
