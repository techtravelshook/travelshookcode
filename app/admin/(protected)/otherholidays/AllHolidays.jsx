"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

export default function AllHolidays({ packages = [] }) {
  const [search, setSearch] = useState("");

  const filteredPackages = useMemo(() => {
    return packages.filter((item) => {
      const value = search.toLowerCase();

      return (
        item.title?.toLowerCase().includes(value) ||
        item.country?.toLowerCase().includes(value) ||
        item.city?.toLowerCase().includes(value) ||
        item.type?.toLowerCase().includes(value)
      );
    });
  }, [packages, search]);

  const handleDelete = async (slug) => {
    if (!confirm("Delete this holiday package?")) return;

    try {
      const res = await fetch(`/api/holiday-breaks/${slug}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("Holiday deleted successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Holiday Packages
        </h1>

        <div className="flex gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-72 rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link
            href="/admin/otherholidays/addholidays"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Holiday
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left">Image</th>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Country</th>
                <th className="px-5 py-3 text-left">City</th>
                <th className="px-5 py-3 text-left">Duration</th>
                <th className="px-5 py-3 text-left">Price</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="relative h-16 w-20 overflow-hidden rounded-lg">
                        <Image
  src={`/${pkg.images?.[0]?.url}` || "/placeholder.jpg"}
  alt={pkg.title}
  fill
  className="object-cover"
/>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {pkg.title}
                    </td>

                    <td className="px-5 py-4">
                      {pkg.country}
                    </td>

                    <td className="px-5 py-4">
                      {pkg.city}
                    </td>

                    <td className="px-5 py-4">
                      {pkg.duration} Days
                    </td>

                    <td className="px-5 py-4 font-semibold text-green-600">
                      £{pkg.price}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {pkg.type}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/otherholidays/edit/${pkg.id}`}
                          className="rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-gray-500"
                  >
                    No holiday packages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}