"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function AllHolidays({
 
  packages = [],
  onEdit,
  onDelete,
}) {

       const router=useRouter();
       async function handleDelete(slug) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this holiday package?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/holidays/${slug}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete");
    }

    alert("Holiday deleted successfully!");

    router.refresh(); // Refresh server component data
  } catch (err) {
    alert(err.message);
  }
}
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
     {/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
  <div>
    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
      Holiday Packages
    </h1>
    <p className="text-gray-500 text-sm mt-1">
      Manage your active international and custom holiday packages (
      {packages.length} total)
    </p>
  </div>

  <Link
    href="/admin/holidays/addholidays"
    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0070A1] to-[#0099D6] px-6 py-3 text-white font-semibold shadow-lg shadow-[#0070A1]/25 hover:shadow-xl hover:shadow-[#0070A1]/30 hover:-translate-y-0.5 transition-all duration-300"
  >
    <Plus
      size={20}
      className="transition-transform duration-300 group-hover:rotate-90"
    />
    Add Holiday
  </Link>
</div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Package Overview</th>
              <th className="py-4 px-6">Rating & Type</th>
              <th className="py-4 px-6">Duration</th>
              <th className="py-4 px-6">Base Price</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {packages.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-400 font-medium"
                >
                  No holiday packages found.
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Package */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden border">
                        {pkg.images?.length ? (
                          <div className="relative w-full h-full overflow-hidden">
  <Image
    src={`/${pkg.images[0].url}`}
    alt={pkg.title || "Package image preview"}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover"
    loading="lazy"
  />
</div>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-xs text-gray-400">
                            No Image
                          </div>
                        )}

                        {pkg.isFeatured && (
                          <span className="absolute top-1 left-1 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full">
                            ⭐
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {pkg.shortDesc}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex w-fit px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                        ⭐ {pkg.star?.replace("STAR_", "") || "N/A"} Star
                      </span>

                      <span className="inline-flex w-fit px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                        {pkg.type}
                      </span>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="py-4 px-6 font-medium">
                    {pkg.duration} Nights
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 font-bold text-lg">
                    £{pkg.price}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-3">
                      <button
  onClick={() => router.push(`/admin/holidays/edit/${pkg.slug}`)}
  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
>
  ✏️
  <span>Edit</span>
</button>
<button
  onClick={() => handleDelete?.(pkg.slug)}
  className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
>
  Delete
</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}