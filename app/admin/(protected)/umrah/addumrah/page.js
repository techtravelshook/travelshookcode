"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PackageForm from "../PackageForm";

export default function AddPackagePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    description: "",
    star: "STAR_3",
    type: "NORMAL",
    month: "",
    duration: "",
    makkahHotel: "",
    madinahHotel: "",
    price: "",
    isFeatured: false,
    images: [""],
    inclusions: [""],
    exclusions: [""],
  });

  const [loading, setLoading] = useState(false);

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

    const res = await fetch("/api/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
        month: form.month || null,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Package Added Successfully");
      router.push("/admin/umrah/addumrah");
      router.refresh();
    } else {
      alert("Failed to add package");
    }
  };

  return (
    <PackageForm
    form={form}
    setForm={setForm}
    loading={loading}
    handleSubmit={handleSubmit}
    handleChange={handleChange}
  />
  );
}