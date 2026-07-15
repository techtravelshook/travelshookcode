"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function AllPackages({ packages = [] }) {
  const router = useRouter();

  async function handleDelete(slug) {
    if (!confirm("Delete this package?")) return;

    try {
      const res = await fetch(`/api/honeymoon/${slug}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Deleted successfully");
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Honeymoon Packages</h1>
          <p className="text-gray-500 mt-1">
            {packages.length} Packages
          </p>
        </div>

        <Link
          href="/admin/honeymoon/addpackage"
          className="flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl hover:cursor-pointer"
        >
          <Plus size={18} />
          Add Package
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Package</th>
              <th className="p-4">Country</th>
              <th className="p-4">City</th>
              <th className="p-4">Star</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10">
                  No Packages Found
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                     
{pkg.images?.[0]?.url && (
  <div className="relative w-24 h-16 rounded-lg border overflow-hidden shrink-0">
    <Image
      src={`/${pkg.images[0].url}`}
      alt={pkg.title || "Package preview summary"}
      fill
      sizes="96px"
      className="object-cover"
      loading="lazy"
    />
  </div>
)}

                      <div>
                        <h3 className="font-semibold">
                          {pkg.title}
                        </h3>

                        <p className="text-sm text-gray-500 line-clamp-2">
                          {pkg.shortDesc}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    {pkg.country}
                  </td>

                  <td className="text-center">
                    {pkg.city}
                  </td>

                  <td className="text-center">
                    ⭐ {pkg.star}
                  </td>

                  <td className="text-center">
                    {pkg.durationDays}D /{" "}
                    {pkg.durationNights}N
                  </td>

                  <td className="text-center font-semibold">
                    £{pkg.price}
                  </td>

                  <td className="text-center">
                    {pkg.featured ? (
                      <span className="text-green-600 font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/honeymoon/edit/${pkg.slug}`
                          )
                        }
                        className="px-4 py-2 rounded-lg bg-red-500 text-white bg-black border border-2 hover:cursor-pointer hover:bg-black hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(pkg.slug)
                        }
                        className="px-4 py-2 rounded-lg bg-red-500 text-black bg-white border border-2 hover:cursor-pointer hover:bg-black hover:text-white"
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