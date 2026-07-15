"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditFlightForm({ flight }) {  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: flight.slug || "",
    tripType: flight.tripType || "return",
    airlineName: flight.airlineName || "",
    apiType: flight.apiType || "",
    airlineLogo: flight.airlineLogo || "",
    departureCode: flight.departureCode || "",
    departureCity: flight.departureCity || "",
    destinationCode: flight.destinationCode || "",
    destinationCity: flight.destinationCity || "",
    price: flight.price || "",
    dates: flight.dates || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        airlineLogo: data.path,
      }));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`/api/flightroute/${flight.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Flight updated successfully!");

      router.push("/admin/flights");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow border p-8">
        <h1 className="text-3xl font-bold mb-6">
          Edit Flight
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />

          <div>
            <label className="font-medium mb-2 block">
              Trip Type
            </label>

            <select
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="return">Return</option>
              <option value="oneway">One Way</option>
            </select>
          </div>

          <Input
            label="Airline Name"
            name="airlineName"
            value={formData.airlineName}
            onChange={handleChange}
          />

          <Input
            label="API Type"
            name="apiType"
            value={formData.apiType}
            onChange={handleChange}
          />

          <div>
            <label className="font-medium mb-2 block">
              Airline Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full border rounded-lg p-3"
            />

           
{formData.airlineLogo && (
  <div className="relative w-20 h-20 mt-3">
    <Image
      src={`/${formData.airlineLogo}`}
      alt="Airline company logo"
      fill
      sizes="80px"
      className="object-contain object-left"
      priority={false}
    />
  </div>
)}
          </div>

          <Input
            label="Departure Code"
            name="departureCode"
            value={formData.departureCode}
            onChange={handleChange}
          />

          <Input
            label="Departure City"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
          />

          <Input
            label="Destination Code"
            name="destinationCode"
            value={formData.destinationCode}
            onChange={handleChange}
          />

          <Input
            label="Destination City"
            name="destinationCity"
            value={formData.destinationCity}
            onChange={handleChange}
          />

          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />

          <Input
            label="Dates"
            name="dates"
            value={formData.dates}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Update Flight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="font-medium mb-2 block">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}