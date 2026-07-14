"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PackageForm from "../../PackageForm";

export default function EditPackage() {
  const { slug } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
  if (!slug) return;

  const getPackage = async () => {
    try {
      const res = await fetch(`/api/packages/${slug}`);

      if (!res.ok) {
        throw new Error("Failed to fetch package");
      }

      const data = await res.json();
      const pkg = data.data;

      setForm({
        title: pkg.title,
        shortDesc: pkg.shortDesc,
        description: pkg.description,
        star: pkg.star,
        type: pkg.type,
        month: pkg.month || "",
        duration: pkg.duration,
        makkahHotel: pkg.makkahHotel,
        madinahHotel: pkg.madinahHotel,
        price: pkg.price,
        isFeatured: pkg.isFeatured,
        images: pkg.images?.map((i) => i.url) || [""],
        inclusions: pkg.inclusions?.map((i) => i.title) || [""],
        exclusions: pkg.exclusions?.map((i) => i.title) || [""],
      });
    } catch (err) {
      console.error(err);
      alert("Unable to load package.");
    }
  };

  getPackage();
}, [slug]);

  async function getPackage() {
    const res = await fetch(`/api/packages/${slug}`);

    const data = await res.json();

    const pkg = data.data;

    setForm({
      title: pkg.title,
      shortDesc: pkg.shortDesc,
      description: pkg.description,
      star: pkg.star,
      type: pkg.type,
      month: pkg.month || "",
      duration: pkg.duration,
      makkahHotel: pkg.makkahHotel,
      madinahHotel: pkg.madinahHotel,
      price: pkg.price,
      isFeatured: pkg.isFeatured,

      images: pkg.images.map((i) => i.url),

      inclusions: pkg.inclusions.map((i) => i.title),

      exclusions: pkg.exclusions.map((i) => i.title),
    });
  }

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

    const res = await fetch(`/api/packages/${slug}`, {
      method: "PUT",

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
      alert("Package Updated");

      router.push("/admin/umrah");

      router.refresh();
    } else {
      alert("Failed");
    }
  }

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