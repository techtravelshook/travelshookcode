"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HolidayForm from "../HolidayForm";

export default function AddHoliday() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    description: "",
    star: "STAR_3",
    type: "HOLIDAY",
    month: "",
    duration: "",
    makkahHotel: "",
    madinahHotel: "",
    price: "",
    isFeatured: false,

    images: [
      {
        url: "",
        slideTitle: "",
        slideDesc: "",
      },
    ],

    packages: [
      {
        title: "",
        subtitle: "",
        description: "",
        image: "",
        price: "",
        originalPrice: "",
        rating: "",
        reviews: "",
        duration: "",
        accent: "#E68213",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const payload = {
      ...form,
      duration: Number(form.duration),
      price: Number(form.price),
      month: form.month || null,

      packages: form.packages.map((pkg) => ({
        ...pkg,
        price: Number(pkg.price),
        originalPrice: Number(pkg.originalPrice),
        rating: Number(pkg.rating),
        reviews: Number(pkg.reviews),
      })),
    };

    const res = await fetch("/api/holidays", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      alert("Holiday package created successfully.");
      router.push("/admin/holidays");
      router.refresh();
    } else {
      const error = await res.json();
      alert(error.message || "Failed to create holiday package");
    }
  }

  return (
    <HolidayForm
      form={form}
      setForm={setForm}
      loading={loading}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}