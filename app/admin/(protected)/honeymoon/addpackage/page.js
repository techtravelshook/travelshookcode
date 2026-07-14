"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../Honeyform";

export default function AddPackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    description: "",
    price: "",
    durationDays: "",
    durationNights: "",
    month: "",
    star: "",
    type: "",
    category: "",
    country: "",
    city: "",
    featured: false,

    images: [
      {
        url: "",
      },
    ],

    hotels: [
      {
        name: "",
        city: "",
        durationNights: "",
        starRating: "",
        roomType: "",
        description: "",
      },
    ],

    flights: {
      departureCities: [],
      destination: "",
      airlines: [],
      classOption: "",
    },

    transportation: {
      type: "",
      routeDetails: "",
      extras: "",
    },

    visaAssistance: {
      supportedRegion: "",
      agency: "",
      requiredDocuments: [],
    },

    sightseeing: {
      items: [],
      romanticExperiences: [],
      guideIncluded: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        durationDays: Number(form.durationDays),
        durationNights: Number(form.durationNights),
        star: Number(form.star),
      };

      const res = await fetch("/api/honeymoon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create package");
      }

      alert("Package created successfully!");

      router.push("/admin/honeymoon");
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      setForm={setForm}
      loading={loading}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}