"use client";

import Image from "next/image";
import React from "react";

export default function HolidayForm({
  form,
  setForm,
  loading,
  handleSubmit,
  handleChange,
}) {
  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          url: "",
          slideTitle: "",
          slideDesc: "",
        },
      ],
    }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImage = (index, field, value) => {
    const images = [...form.images];
    images[index][field] = value;

    setForm((prev) => ({
      ...prev,
      images,
    }));
  };

  const handleCardImageUpload = async (index, e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  updatePackage(index, "image", data.url);
};
  const addPackage = () => {
    setForm((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
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
    }));
  };

  const handleImageUpload = async (index, e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  updateImage(index, "url", data.url);
};
  const removePackage = (index) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const updatePackage = (index, field, value) => {
    const packages = [...form.packages];
    packages[index][field] = value;

    setForm((prev) => ({
      ...prev,
      packages,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0070A1] to-[#0099D6] px-8 py-8">
          <h1 className="text-3xl font-bold text-white">
            Holiday Package Form
          </h1>

          <p className="text-blue-100 mt-2">
            Add or edit holiday packages.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-10 p-8"
        >
          {/* Basic Info */}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold mb-2 block">
                Package Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 block">
                Price (£)
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold mb-2 block">
              Short Description
            </label>

            <input
              type="text"
              name="shortDesc"
              value={form.shortDesc}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="font-semibold mb-2 block">
              Full Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Details */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="makkahHotel"
              value={form.makkahHotel}
              onChange={handleChange}
              placeholder="Makkah Hotel"
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="madinahHotel"
              value={form.madinahHotel}
              onChange={handleChange}
              placeholder="Madinah Hotel"
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="month"
              value={form.month}
              onChange={handleChange}
              placeholder="Month"
              className="border rounded-xl p-3"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <select
              name="star"
              value={form.star}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              <option value="STAR_3">3 Star</option>
              <option value="STAR_4">4 Star</option>
              <option value="STAR_5">5 Star</option>
            </select>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border rounded-xl p-3"
            >
              <option value="HOLIDAY">Holiday</option>
            </select>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />

              Featured Package
            </label>
          </div>

          {/* Images */}

          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                Slider Images
              </h2>

              <button
                type="button"
                onClick={addImage}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                + Add Image
              </button>
            </div>

            {form.images.map((img, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 mb-4 space-y-3"
              >
 <div className="space-y-3">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageUpload(index, e)}
    className="w-full border rounded-lg p-3"
  />

  {/* {img.url && (
    <img
      src={`/${img.url}`}
      alt="Preview"
      className="w-48 h-32 object-cover rounded-lg border"
    />
  )} */}

  {img.url && (
  <div className="relative w-48 h-32 mt-2 rounded-lg border overflow-hidden">
    <Image
      src={`/${img.url}`}
      alt={img.slideTitle || "Uploaded image banner preview"}
      fill
      sizes="192px"
      className="object-cover"
      priority={false}
    />
  </div>
)}
</div>

                <input
                  placeholder="Slide Title"
                  value={img.slideTitle}
                  onChange={(e) =>
                    updateImage(
                      index,
                      "slideTitle",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                />

                <textarea
                  placeholder="Slide Description"
                  value={img.slideDesc}
                  onChange={(e) =>
                    updateImage(
                      index,
                      "slideDesc",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Holiday Packages */}

          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                Holiday Cards
              </h2>

              <button
                type="button"
                onClick={addPackage}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                + Add Card
              </button>
            </div>

            {form.packages.map((item, index) => (
  <div
    key={index}
    className="border rounded-xl p-6 mb-6 space-y-4"
  >
    <input
      type="text"
      placeholder="Title"
      value={item.title}
      onChange={(e) =>
        updatePackage(index, "title", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Subtitle"
      value={item.subtitle}
      onChange={(e) =>
        updatePackage(index, "subtitle", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    <textarea
      placeholder="Description"
      value={item.description}
      onChange={(e) =>
        updatePackage(index, "description", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    {/* Upload Card Image */}
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleCardImageUpload(index, e)}
        className="w-full border rounded-lg p-3"
      />

    {item.image && (
  <div className="relative w-48 h-32 rounded-lg border overflow-hidden">
    <Image
      src={`/${item.image}`}
      alt={item.title || "Card preview visual content"}
      fill
      sizes="192px"
      className="object-cover"
      loading="lazy"
    />
  </div>
)}
    </div>

    <input
      type="number"
      placeholder="Price"
      value={item.price}
      onChange={(e) =>
        updatePackage(index, "price", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="number"
      placeholder="Original Price"
      value={item.originalPrice}
      onChange={(e) =>
        updatePackage(index, "originalPrice", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="number"
      step="0.1"
      placeholder="Rating"
      value={item.rating}
      onChange={(e) =>
        updatePackage(index, "rating", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="number"
      placeholder="Reviews"
      value={item.reviews}
      onChange={(e) =>
        updatePackage(index, "reviews", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Duration"
      value={item.duration}
      onChange={(e) =>
        updatePackage(index, "duration", e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    <div>
      <label className="block mb-2 font-medium">Accent Color</label>

      <input
        type="color"
        value={item.accent}
        onChange={(e) =>
          updatePackage(index, "accent", e.target.value)
        }
        className="h-12 w-20 border rounded-lg"
      />
    </div>

    <button
      type="button"
      onClick={() => removePackage(index)}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Remove Card
    </button>
  </div>
))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0070A1] to-[#0099D6] text-white font-bold text-lg hover:scale-[1.02] transition"
          >
            {loading ? "Saving..." : "Save Holiday Package"}
          </button>
        </form>
      </div>
    </div>
  );
}