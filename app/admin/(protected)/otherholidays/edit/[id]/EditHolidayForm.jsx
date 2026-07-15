"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditHolidayForm({ holiday }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: holiday.title || "",
    category: holiday.category || "",
    shortDesc: holiday.shortDesc || "",
    rating: holiday.rating || "STAR_5",
    type: holiday.type || "",
    month: holiday.month || "",
    duration: holiday.duration || "",
    price: holiday.price || "",
    desc: holiday.desc || "",
    location: holiday.location || "",
    bestTimeToVisit: holiday.bestTimeToVisit || "",
    // ✅ Clean — only keep { url } and { name }
    images: holiday.images?.length
      ? holiday.images.map((img) => ({ url: img.url }))
      : [{ url: "" }],
    features: holiday.features?.length
      ? holiday.features.map((f) => ({ name: f.name }))
      : [{ name: "" }],
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Fixed: uses data.path to match your upload API response
  const uploadImage = async (index, file) => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Upload failed");
        return;
      }

      const images = [...form.images];
      images[index].url = data.path; // ✅ data.path not data.url
      setForm((prev) => ({ ...prev, images }));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const addImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, { url: "" }] }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, { name: "" }] }));
  };

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index, value) => {
    const features = [...form.features];
    features[index].name = value;
    setForm((prev) => ({ ...prev, features }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (uploading) {
      alert("Please wait for image upload to finish");
      return;
    }

    // ✅ Clean payload — only send what Prisma expects
    const payload = {
      title: form.title,
      category: form.category,
      shortDesc: form.shortDesc,
      rating: form.rating,
      type: form.type,
      month: form.month,
      duration: Number(form.duration),
      price: Number(form.price),
      desc: form.desc,
      location: form.location,
      bestTimeToVisit: form.bestTimeToVisit,
      images: form.images
        .filter((img) => img.url && img.url.trim() !== "") // ✅ no undefined urls
        .map((img) => ({ url: img.url })),                 // ✅ only { url }
      features: form.features
        .filter((f) => f.name && f.name.trim() !== "")    // ✅ no empty names
        .map((f) => ({ name: f.name })),                   // ✅ only { name }
    };

    setLoading(true);

    try {
      const res = await fetch(`/api/holiday-breaks/${holiday.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Holiday updated successfully");
      router.push("/admin/otherholidays");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full border rounded-lg p-3 focus:border-blue-500 outline-none";

  return (
    <form onSubmit={submit} className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Edit Holiday Package</h1>

      <div className="grid md:grid-cols-2 gap-5">
        <input className={input} name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input className={input} name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input className={input} name="type" value={form.type} onChange={handleChange} placeholder="Type" />

        <select className={input} name="rating" value={form.rating} onChange={handleChange}>
          <option value="STAR_3">STAR_3</option>
          <option value="STAR_4">STAR_4</option>
          <option value="STAR_5">STAR_5</option>
        </select>

        <input className={input} name="month" value={form.month} onChange={handleChange} placeholder="Month" />
        <input className={input} type="number" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (days)" min="1" />
        <input className={input} type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" min="0" />
        <input className={input} name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <input className={input} name="bestTimeToVisit" value={form.bestTimeToVisit} onChange={handleChange} placeholder="Best Time To Visit" />
      </div>

      <textarea className={input} rows={3} name="shortDesc" value={form.shortDesc} onChange={handleChange} placeholder="Short Description" />
      <textarea className={input} rows={6} name="desc" value={form.desc} onChange={handleChange} placeholder="Description" />

      {/* ✅ Images — Add button is OUTSIDE the map loop */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Images</h2>
          <button type="button" onClick={addImage} className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Image
          </button>
        </div>

        {form.images.map((img, index) => (
          <div key={index} className="mb-5 rounded-lg border p-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(index, e.target.files[0])}
              className="w-full rounded border p-3"
            />

            {uploading && <p className="mt-2 text-sm text-blue-500">Uploading...</p>}

           
{img.url && !uploading && (
  <div className="mt-3 flex items-center gap-3">
    <div className="relative h-32 w-48 rounded border overflow-hidden shrink-0">
      <Image
        src={`/${img.url}`}
        alt={img.slideTitle || "Uploaded image confirmation preview"}
        fill
        sizes="192px"
        className="object-cover"
        loading="lazy"
      />
    </div>
    <span className="text-sm font-medium text-green-600 flex items-center gap-1">
      ✓ Uploaded
    </span>
  </div>
)}

            {/* ✅ Remove button added */}
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="mt-3 rounded bg-red-600 px-4 py-2 text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Features — with Add and Remove buttons */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <button type="button" onClick={addFeature} className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Feature
          </button>
        </div>

        {form.features.map((feature, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              className={input}
              placeholder="e.g. Flights Included"
              value={feature.name}
              onChange={(e) => updateFeature(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="bg-red-600 text-white px-4 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || uploading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading image..." : loading ? "Updating..." : "Update Holiday"}
      </button>
    </form>
  );
}