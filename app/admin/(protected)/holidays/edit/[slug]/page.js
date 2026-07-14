"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HolidayForm from "../../HolidayForm";


export default function EditHoliday() {
  const { slug } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
  async function getHoliday() {
  try {
    const res = await fetch(`/api/holidays/${slug}`);

    if (!res.ok) {
      throw new Error("Failed to fetch holiday");
    }

    const holiday = await res.json();

    console.log("Holiday:", holiday);

    setForm({
      title: holiday.title || "",
      shortDesc: holiday.shortDesc || "",
      description: holiday.description || "",
      star: holiday.star || "STAR_3",
      type: holiday.type || "HOLIDAY",
      month: holiday.month || "",
      duration: holiday.duration || "",
      makkahHotel: holiday.makkahHotel || "",
      madinahHotel: holiday.madinahHotel || "",
      price: holiday.price || "",
      isFeatured: holiday.isFeatured || false,

      images:
        holiday.images?.length > 0
          ? holiday.images
          : [
              {
                url: "",
                slideTitle: "",
                slideDesc: "",
              },
            ],

      packages:
        holiday.packages?.length > 0
          ? holiday.packages
          : [
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
  } catch (err) {
    console.error(err);
    alert("Failed to load holiday.");
  } finally {
    setFetching(false);   // <-- THIS IS MISSING
  }
}

  useEffect(() => {
  if (!slug) return;

  const fetchHoliday = async () => {
    try {
      const res = await fetch(`/api/holidays/${slug}`);

      if (!res.ok) {
        throw new Error("Failed to fetch holiday");
      }

      const holiday = await res.json();

      setForm({
        title: holiday.title || "",
        shortDesc: holiday.shortDesc || "",
        description: holiday.description || "",
        star: holiday.star || "STAR_3",
        type: holiday.type || "HOLIDAY",
        month: holiday.month || "",
        duration: holiday.duration || "",
        makkahHotel: holiday.makkahHotel || "",
        madinahHotel: holiday.madinahHotel || "",
        price: holiday.price || "",
        isFeatured: holiday.isFeatured || false,

        images:
          holiday.images?.length
            ? holiday.images
            : [
                {
                  url: "",
                  slideTitle: "",
                  slideDesc: "",
                },
              ],

        packages:
          holiday.packages?.length
            ? holiday.packages
            : [
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
    } catch (err) {
      console.error(err);
      alert("Failed to load holiday.");
    } finally {
      setFetching(false);
    }
  };

  fetchHoliday();
}, [slug]);


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

    try {
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

      const res = await fetch(`/api/holidays/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Holiday updated successfully!");

      router.push("/admin/holidays");
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20 text-lg font-semibold">
        Loading Holiday...
      </div>
    );
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