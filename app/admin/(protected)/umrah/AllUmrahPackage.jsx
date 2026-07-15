"use client";
"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AllUmrahPackage({ packages, onEdit, onDelete }) {
    const router=useRouter();
    const [search, setSearch] = useState("");

const filteredPackages = useMemo(() => {
  return packages.filter((pkg) => {
    const term = search.toLowerCase();

    return (
      pkg.title?.toLowerCase().includes(term) ||
      pkg.shortDesc?.toLowerCase().includes(term) ||
      pkg.makkahHotel?.toLowerCase().includes(term) ||
      pkg.madinahHotel?.toLowerCase().includes(term) ||
      pkg.type?.toLowerCase().includes(term)
    );
  });
}, [packages, search]);

const handleDelete = async (slug) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this package?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/packages/${slug}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete package");
    }

    alert("Package deleted successfully");

    router.refresh();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Umrah Packages</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your carefully curated Umrah packages from the UK.
        </p>
      </div>
<div className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
  <div>
    <h1 className="text-4xl font-bold text-gray-900">
      Umrah Packages
    </h1>
    <p className="mt-2 text-gray-500">
      Manage all your Umrah packages from one place.
    </p>
  </div>

  <Link
    href="/admin/umrah/addumrah"
    className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#0070A1] to-[#E68213] px-7 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
  >
    <Plus
      size={20}
      className="transition-transform duration-300 group-hover:rotate-90"
    />
    Add New Package
  </Link>



{/* search bar */}
</div>
<div className="mb-8 flex flex-col lg:flex-row justify-between gap-5">
  <div className="relative w-full max-w-lg">
    <Search
      size={20}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0070A1]"
    />

    <input
      type="text"
      placeholder="Search by title, hotel, type..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-5 shadow-sm outline-none transition-all focus:border-[#0070A1] focus:ring-4 focus:ring-[#0070A1]/10"
    />
  </div>

  <div className="rounded-xl bg-[#0070A1]/10 px-6 py-3 font-semibold text-[#0070A1]">
    {filteredPackages.length} Packages
  </div>
</div>
      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
          
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-700 text-sm font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Package</th>
              <th className="py-4 px-6">Details</th>
              <th className="py-4 px-6">Hotels</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
           {filteredPackages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50/70 transition-colors">
                {/* Package Column (Image + Title) */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    {/* <div className="relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                      <img
                        src={`/${pkg.images?.[0]?.url}`}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                      {pkg.isFeatured && (
                        <div className="absolute top-1 left-1 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                          ⭐
                        </div>
                      )}
                    </div> */}
                  

<div className="relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
  {pkg.images?.[0]?.url ? (
    <Image
      src={`/${pkg.images[0].url}`}
      alt={pkg.title || "Package thumbnail overview"}
      fill
      sizes="96px"
      className="object-cover"
      loading="lazy"
    />
  ) : (
    // Fallback UI to prevent an empty box if the image array is empty
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-[10px] text-gray-400 font-medium">
      No Image
    </div>
  )}
  
  {pkg.isFeatured && (
    <div className="absolute top-1 left-1 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm z-10">
      ⭐
    </div>
  )}
</div>

                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-1 max-w-xs">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-1 max-w-xs mt-0.5">
                        {pkg.shortDesc}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Details Column (Badges) */}
                <td className="py-4 px-6 vertical-align-middle">
                  <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">
                      {pkg.star.replace("STAR_", "")} Star
                    </span>
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                      {pkg.duration} Nights
                    </span>
                    {pkg.type !== "NORMAL" && (
                      <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">
                        {pkg.type}
                      </span>
                    )}
                  </div>
                </td>

                {/* Hotels Column */}
                <td className="py-4 px-6">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <span>Makkah:</span>
                      <span className="font-medium text-gray-900 line-clamp-1">{pkg.makkahHotel}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <span>Madinah:</span>
                      <span className="font-medium text-gray-900 line-clamp-1">{pkg.madinahHotel}</span>
                    </div>
                  </div>
                </td>

                {/* Price Column */}
                <td className="py-4 px-6 text-base font-bold text-gray-900 whitespace-nowrap">
                  £{pkg.price}
                </td>

                {/* Actions Column (Edit/Delete Buttons) */}
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-3">
                   <button
  onClick={() => router.push(`/admin/umrah/edit/${pkg.slug}`)}
  className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg transition-colors"
>
  Edit
</button>
                    <button
                     onClick={() => handleDelete(pkg.slug)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
