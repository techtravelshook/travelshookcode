// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddHolidayForm() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     shortDesc: "",
//     rating: "STAR_5",
//     type: "",
//     month: "",
//     duration: "",
//     price: "",
//     desc: "",
//     location: "",
//     bestTimeToVisit: "",
//     images: [{ url: "" }],
//     features: [{ name: "" }],
//   });

//   const uploadImage = async (index, file) => {
//     if (!file) return;
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Upload failed");
//         return;
//       }

//       const images = [...form.images];
//       images[index].url = data.path;
//       setForm({ ...form, images });
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const addImage = () => {
//     setForm((prev) => ({ ...prev, images: [...prev.images, { url: "" }] }));
//   };

//   const addFeature = () => {
//     setForm((prev) => ({ ...prev, features: [...prev.features, { name: "" }] }));
//   };

//   const updateFeature = (index, value) => {
//     const features = [...form.features];
//     features[index].name = value;
//     setForm({ ...form, features });
//   };

//   const removeImage = (index) => {
//     setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
//   };

//   const removeFeature = (index) => {
//     setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (uploading) {
//       alert("Please wait for image upload to finish");
//       return;
//     }

//     // ✅ Only send clean fields — no id or holidayBreakId
//     const payload = {
//       title: form.title,
//       category: form.category,
//       shortDesc: form.shortDesc,
//       rating: form.rating,
//       type: form.type,
//       month: form.month,
//       duration: Number(form.duration),
//       price: Number(form.price),
//       desc: form.desc,
//       location: form.location,
//       bestTimeToVisit: form.bestTimeToVisit,
//       images: form.images
//         .filter((img) => img.url !== "")
//         .map((img) => ({ url: img.url })),       // ✅ only url, no id/holidayBreakId
//       features: form.features
//         .filter((f) => f.name !== "")
//         .map((f) => ({ name: f.name })),          // ✅ only name, no id/holidayBreakId
//     };

//     setLoading(true);

//     try {
//       const res = await fetch("/api/holiday-breaks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Something went wrong");
//         return;
//       }

//       alert("Holiday Added Successfully");
//       router.push("/admin/otherholidays");
//       router.refresh();
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const input =
//     "w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 outline-none";

//   return (
//     <form onSubmit={submit} className="max-w-7xl mx-auto p-8 space-y-8">
//       <h1 className="text-3xl font-bold">Add Holiday Package</h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         <input
//           className={input}
//           placeholder="Title"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className={input}
//           placeholder="Category"
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//         />
//         <input
//           className={input}
//           placeholder="Type"
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//         />

//         <select className={input} name="rating" value={form.rating} onChange={handleChange}>
//           <option value="STAR_3">STAR_3</option>
//           <option value="STAR_4">STAR_4</option>
//           <option value="STAR_5">STAR_5</option>
//         </select>

//         <input
//           className={input}
//           placeholder="Month"
//           name="month"
//           value={form.month}
//           onChange={handleChange}
//         />
//         <input
//           className={input}
//           placeholder="Duration (days)"
//           type="number"
//           name="duration"
//           value={form.duration}
//           onChange={handleChange}
//           min="1"
//         />
//         <input
//           className={input}
//           placeholder="Price"
//           type="number"
//           name="price"
//           value={form.price}
//           onChange={handleChange}
//           min="0"
//         />
//         <input
//           className={input}
//           placeholder="Location"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//         />
//         <input
//           className={input}
//           placeholder="Best Time To Visit"
//           name="bestTimeToVisit"
//           value={form.bestTimeToVisit}
//           onChange={handleChange}
//         />
//       </div>

//       <textarea
//         className={input}
//         rows={3}
//         placeholder="Short Description"
//         name="shortDesc"
//         value={form.shortDesc}
//         onChange={handleChange}
//       />
//       <textarea
//         className={input}
//         rows={6}
//         placeholder="Description"
//         name="desc"
//         value={form.desc}
//         onChange={handleChange}
//       />

//       {/* Images */}
//       <div>
//         <div className="flex justify-between mb-4">
//           <h2 className="text-xl font-semibold">Images</h2>
//           <button
//             type="button"
//             onClick={addImage}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Add Image
//           </button>
//         </div>

//         {form.images.map((img, index) => (
//           <div key={index} className="mb-5 rounded-lg border border-gray-200 p-4">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => uploadImage(index, e.target.files[0])}
//               className="block w-full rounded-lg border p-3"
//             />

//             {uploading && (
//               <p className="mt-2 text-sm text-blue-500">Uploading...</p>
//             )}

//             {img.url && !uploading && (
//               <div className="mt-3 flex items-center gap-3">
//                 <img
//                   src={`/${img.url}`}
//                   alt="preview"
//                   className="h-28 w-40 rounded-lg border object-cover"
//                 />
//                 <span className="text-sm text-green-600">✓ Uploaded</span>
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={() => removeImage(index)}
//               className="mt-3 rounded bg-red-600 px-4 py-2 text-white"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Features */}
//       <div>
//         <div className="flex justify-between mb-4">
//           <h2 className="text-xl font-semibold">Features</h2>
//           <button
//             type="button"
//             onClick={addFeature}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Add Feature
//           </button>
//         </div>

//         {form.features.map((feature, index) => (
//           <div key={index} className="flex gap-3 mb-3">
//             <input
//               className={input}
//               placeholder="e.g. Flights Included"
//               value={feature.name}
//               onChange={(e) => updateFeature(index, e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => removeFeature(index)}
//               className="bg-red-600 text-white px-4 rounded"
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>

//       <button
//         type="submit"
//         disabled={loading || uploading}
//         className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
//       >
//         {uploading ? "Uploading image..." : loading ? "Saving..." : "Add Holiday"}
//       </button>
//     </form>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ✅ From your Prisma schema
const HOLIDAY_TYPES = [
  "HOLIDAY",
  "CITY_BREAK",
  "INCLUSIVE_HOLIDAY",
  "BEACH_HOLIDAY",
  "FAMILY_HOLIDAY",
  "Last_Minute_Holidays",
];

// ✅ category is a plain String in your schema — these are your real-world options
const CATEGORIES = [
  "City Breaks",
  "Beach Holidays",
  "Family Holidays",
  "Inclusive Holidays",
  "Last Minute Holidays",
  "Luxury Holidays",
  "Adventure Holidays",
  "Romantic Holidays",
  "Winter Sun",
  "Summer Holidays",
];

export default function AddHolidayForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    shortDesc: "",
    rating: "STAR_5",
    type: "",
    month: "",
    duration: "",
    price: "",
    desc: "",
    location: "",
    bestTimeToVisit: "",
    images: [{ url: "" }],
    features: [{ name: "" }],
  });

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
      images[index].url = data.path;
      setForm({ ...form, images });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, { url: "" }] }));
  };

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, { name: "" }] }));
  };

  const updateFeature = (index, value) => {
    const features = [...form.features];
    features[index].name = value;
    setForm({ ...form, features });
  };

  const removeImage = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  };

  const removeFeature = (index) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (uploading) {
      alert("Please wait for image upload to finish");
      return;
    }

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
        .filter((img) => img.url && img.url.trim() !== "")
        .map((img) => ({ url: img.url })),
      features: form.features
        .filter((f) => f.name && f.name.trim() !== "")
        .map((f) => ({ name: f.name })),
    };

    setLoading(true);

    try {
      const res = await fetch("/api/holiday-breaks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Holiday Added Successfully");
      router.push("/admin/otherholidays");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 outline-none";

  return (
    <form onSubmit={submit} className="max-w-7xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Add Holiday Package</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <input
          className={input}
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* ✅ Category dropdown */}
        <select
          className={input}
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* ✅ Type dropdown — from HolidayType enum in schema */}
        <select
          className={input}
          name="type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Type --</option>
          {HOLIDAY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        {/* ✅ Rating dropdown */}
        <select
          className={input}
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          <option value="STAR_3">⭐⭐⭐ 3 Star</option>
          <option value="STAR_4">⭐⭐⭐⭐ 4 Star</option>
          <option value="STAR_5">⭐⭐⭐⭐⭐ 5 Star</option>
        </select>

        <input
          className={input}
          placeholder="Month (e.g. October)"
          name="month"
          value={form.month}
          onChange={handleChange}
        />
        <input
          className={input}
          placeholder="Duration (days)"
          type="number"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          min="1"
        />
        <input
          className={input}
          placeholder="Price (£)"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          min="0"
        />
        <input
          className={input}
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          className={input}
          placeholder="Best Time To Visit"
          name="bestTimeToVisit"
          value={form.bestTimeToVisit}
          onChange={handleChange}
        />
      </div>

      <textarea
        className={input}
        rows={3}
        placeholder="Short Description"
        name="shortDesc"
        value={form.shortDesc}
        onChange={handleChange}
      />
      <textarea
        className={input}
        rows={6}
        placeholder="Description"
        name="desc"
        value={form.desc}
        onChange={handleChange}
      />

      {/* Images */}
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Images</h2>
          <button
            type="button"
            onClick={addImage}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Image
          </button>
        </div>

        {form.images.map((img, index) => (
          <div key={index} className="mb-5 rounded-lg border border-gray-200 p-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(index, e.target.files[0])}
              className="block w-full rounded-lg border p-3"
            />

            {uploading && (
              <p className="mt-2 text-sm text-blue-500">Uploading...</p>
            )}

            {img.url && !uploading && (
              <div className="relative h-28 w-40 rounded-lg border overflow-hidden shrink-0">
  <Image
    src={`/${img.url}`}
    alt={img.slideTitle || "Image preview confirmation"}
    fill
    sizes="160px"
    className="object-cover"
    loading="lazy"
  />
</div>
            )}

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

      {/* Features */}
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <button
            type="button"
            onClick={addFeature}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
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
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading image..." : loading ? "Saving..." : "Add Holiday"}
      </button>
    </form>
  );
}