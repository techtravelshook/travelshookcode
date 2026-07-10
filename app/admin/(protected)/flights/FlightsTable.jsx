"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FlightsTable({ flights }) {
  const [flightList, setFlightList] = useState(flights);
  const [search, setSearch] = useState("");

  const filteredFlights = useMemo(() => {
    return flightList.filter((flight) => {
      const q = search.toLowerCase();

      return (
        flight.airlineName?.toLowerCase().includes(q) ||
        flight.departureCity?.toLowerCase().includes(q) ||
        flight.destinationCity?.toLowerCase().includes(q) ||
        flight.apiType?.toLowerCase().includes(q) ||
        flight.slug?.toLowerCase().includes(q)
      );
    });
  }, [flightList, search]);

  const handleDelete = async (slug) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this flight?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/flightroute/${slug}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete flight");
      return;
    }

    // Remove from UI
    setFlightList((prev) =>
      prev.filter((flight) => flight.slug !== slug)
    );

    alert("Flight deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};
  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Flights</h1>
          <p className="text-gray-500">
            Manage all flight routes
          </p>
        </div>

        <Link
          href="/admin/flights/addflights"
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Flight
        </Link>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search airline, city, destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-100 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      <div className="overflow-auto rounded-lg border bg-white">
        <table className=" w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Logo</th>
              <th className="px-4 py-3">Airline</th>
              <th className="px-4 py-3">Trip</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Departure</th>
              <th className="px-4 py-3">To</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFlights.length === 0 ? (
              <tr>
                <td
                  colSpan={18}
                  className="text-center py-8 text-gray-500"
                >
                  No flights found.
                </td>
              </tr>
            ) : (
              filteredFlights.map((flight) => (
                <tr
                  key={flight.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{flight.id}</td>

                  <td className="px-4 py-3">
                    <div className="relative w-10 h-10 flex-shrink-0">
  <Image
    src={`/${flight.airlineLogo}`}
    alt={flight.airlineName || "Airline Logo"}
    fill
    sizes="40px"
    className="object-contain"
    priority={false} // Change to true if this image appears above the fold
  />
</div>
                  </td>

                  <td className="px-2 py-2">
                    {flight.airlineName}
                  </td>

                  <td className="px-2 py-2 capitalize">
                    {flight.tripType}
                  </td>

                  <td className="px-2 py-2 capitalize">
                    {flight.apiType}
                  </td>

                  <td className="px-2 py-2">
                    {flight.departureCode}
                  </td>

                  <td className="px-2 py-2">
                    {flight.departureCity}
                  </td>

                  <td className="px-2 py-2">
                    {flight.destinationCode}
                  </td>

                  <td className="px-2 py-2">
                    {flight.destinationCity}
                  </td>

                  <td className="px-2 py-2 font-semibold">
                    £{flight.price}
                  </td>

                  <td className="px-2 py-2">
                    {flight.dates}
                  </td>

                  <td className="px-0 py-5 text-xs max-w-xs break-all">
                    {flight.slug}
                  </td>

                  <td className="px-2 py-2">
                    {new Date(flight.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-2 py-2">
                    <div className="flex gap-2">
                    

                      <Link
                        href={`/admin/flights/edit/${flight.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>

                     <button
  onClick={() => handleDelete(flight.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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