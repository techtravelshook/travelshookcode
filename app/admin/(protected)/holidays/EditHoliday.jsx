// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import HolidayForm from "@/components/Holidays/HolidayForm";

// export default function EditHoliday() {
//   const { slug } = useParams();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     shortDesc: "",
//     description: "",
//     star: "STAR_3",
//     type: "HOLIDAY",
//     month: "",
//     duration: "",
//     makkahHotel: "",
//     madinahHotel: "",
//     price: "",
//     isFeatured: false,

//     images: [
//       {
//         url: "",
//         slideTitle: "",
//         slideDesc: "",
//       },
//     ],

//     packages: [
//       {
//         title: "",
//         subtitle: "",
//         description: "",
//         image: "",
//         price: "",
//         originalPrice: "",
//         rating: "",
//         reviews: "",
//         duration: "",
//         accent: "#E68213",
//       },
//     ],
//   });

//   useEffect(() => {
//     if (slug) {
//       getHoliday();
//     }
//   }, [slug]);

//   async function getHoliday() {
//     try {
//       const res = await fetch(`/api/holidays/${slug}`);
//       const data = await res.json();

//       const holiday = data.data;

//       setForm({
//         title: holiday.title,
//         shortDesc: holiday.shortDesc,
//         description: holiday.description,
//         star: holiday.star,
//         type: holiday.type,
//         month: holiday.month || "",
//         duration: holiday.duration,
//         makkahHotel: holiday.makkahHotel,
//         madinahHotel: holiday.madinahHotel,
//         price: holiday.price,
//         isFeatured: holiday.isFeatured,

//         images:
//           holiday.images?.length > 0
//             ? holiday.images
//             : [
//                 {
//                   url: "",
//                   slideTitle: "",
//                   slideDesc: "",
//                 },
//               ],

//         packages:
//           holiday.packages?.length > 0
//             ? holiday.packages
//             : [
//                 {
//                   title: "",
//                   subtitle: "",
//                   description: "",
//                   image: "",
//                   price: "",
//                   originalPrice: "",
//                   rating: "",
//                   reviews: "",
//                   duration: "",
//                   accent: "#E68213",
//                 },
//               ],
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load holiday.");
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();

//     setLoading(true);

//     const payload = {
//       ...form,
//       duration: Number(form.duration),
//       price: Number(form.price),
//       month: form.month || null,

//       packages: form.packages.map((pkg) => ({
//         ...pkg,
//         price: Number(pkg.price),
//         originalPrice: Number(pkg.originalPrice),
//         rating: Number(pkg.rating),
//         reviews: Number(pkg.reviews),
//       })),
//     };

//     const res = await fetch(`/api/holidays/${slug}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     setLoading(false);

//     if (res.ok) {
//       alert("Holiday updated successfully!");
//       router.push("/admin/holidays");
//       router.refresh();
//     } else {
//       const error = await res.json();
//       alert(error.message || "Failed to update holiday");
//     }
//   }

//   return (
//     <HolidayForm
//       form={form}
//       setForm={setForm}
//       loading={loading}
//       handleSubmit={handleSubmit}
//       handleChange={handleChange}
//     />
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HolidayForm from "@/components/Holidays/HolidayForm";

export default function EditHoliday({ initialData, slug }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Seed the form state directly from the server props (Zero UseEffects Needed)
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    shortDesc: initialData?.shortDesc ?? "",
    description: initialData?.description ?? "",
    star: initialData?.star ?? "STAR_3",
    type: initialData?.type ?? "HOLIDAY",
    month: initialData?.month ?? "",
    duration: initialData?.duration ?? "",
    makkahHotel: initialData?.makkahHotel ?? "",
    madinahHotel: initialData?.madinahHotel ?? "",
    price: initialData?.price ?? "",
    isFeatured: !!initialData?.isFeatured,
    images: initialData?.images?.length > 0 ? initialData.images : [{ url: "", slideTitle: "", slideDesc: "" }],
    packages: initialData?.packages?.length > 0 ? initialData.packages : [{ title: "", subtitle: "", accent: "#E68213" }],
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
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        ...form,
        duration: Number(form.duration) || 0,
        price: Number(form.price) || 0,
        month: form.month || null,
        packages: form.packages.map((pkg) => ({
          ...pkg,
          price: Number(pkg.price) || 0,
          originalPrice: Number(pkg.originalPrice) || 0,
          rating: Number(pkg.rating) || 0,
          reviews: Number(pkg.reviews) || 0,
        })),
      };

      const res = await fetch(`/api/holidays/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Holiday updated successfully!");
        router.push("/admin/holidays");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to update holiday profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Network communication error.");
    } finally {
      setLoading(false);
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
