"use client";

import Image from "next/image";

export default function Form({
  form,
  setForm,
  loading,
  handleSubmit,
  handleChange,
}) {
  /* ---------- Helpers ---------- */

  const updateNested = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
 const handleImageUpload = async (index, e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    updateArrayItem("images", index, "url", data.path); // ← data.url → data.path

  } catch (err) {
    alert(err.message);
  }
};

  const updateArrayItem = (section, index, field, value) => {
    const arr = [...form[section]];
    arr[index][field] = value;

    setForm((prev) => ({
      ...prev,
      [section]: arr,
    }));
  };

  const addHotel = () => {
    setForm((prev) => ({
      ...prev,
      hotels: [
        ...prev.hotels,
        {
          name: "",
          city: "",
          durationNights: "",
          starRating: "",
          roomType: "",
          description: "",
        },
      ],
    }));
  };

  const removeHotel = (index) => {
    setForm((prev) => ({
      ...prev,
      hotels: prev.hotels.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { url: "" }],
    }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* BASIC INFO */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-2xl font-bold mb-6">
            Package Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="border rounded-lg p-3"
            />

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="border rounded-lg p-3"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border rounded-lg p-3"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="border rounded-lg p-3"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-lg p-3"
            />

            <input
              name="month"
              value={form.month}
              onChange={handleChange}
              placeholder="Month"
              className="border rounded-lg p-3"
            />

            <input
              name="durationDays"
              type="number"
              value={form.durationDays}
              onChange={handleChange}
              placeholder="Duration Days"
              className="border rounded-lg p-3"
            />

            <input
              name="durationNights"
              type="number"
              value={form.durationNights}
              onChange={handleChange}
              placeholder="Duration Nights"
              className="border rounded-lg p-3"
            />

            <input
              name="star"
              type="number"
              value={form.star}
              onChange={handleChange}
              placeholder="Star"
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            name="shortDesc"
            value={form.shortDesc}
            onChange={handleChange}
            placeholder="Short Description"
            className="border rounded-lg p-3 w-full mt-5"
          />

          <textarea
            name="description"
            rows={6}
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg p-3 w-full mt-4"
          />

        </div>

        {/* IMAGES */}

        <div className="bg-white rounded-xl border p-6">

          <div className="flex justify-between">

            <h2 className="text-2xl font-bold">
              Images
            </h2>

            <button
              type="button"
              onClick={addImage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Image
            </button>

          </div>

          {form.images.map((img, index) => (
  <div key={index} className="mt-4 border rounded-xl p-4 space-y-3">

    {/* Show existing image preview if url exists */}
   
{img.url && (
  <div className="relative w-40 h-28 rounded-lg border overflow-hidden shrink-0">
    <Image
      src={`/${img.url}`}
      alt={img.slideTitle || "Uploaded holiday preview image"}
      fill
      sizes="160px"
      className="object-cover"
      loading="lazy"
    />
  </div>
)}

    {/* Upload replaces existing */}
    <label className="block text-sm text-gray-500">
      {img.url ? "Replace Image" : "Upload Image"}
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(index, e)}
      className="w-full border rounded-lg p-3"
    />

    <button
      type="button"
      onClick={() => removeImage(index)}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Delete
    </button>

  </div>
))}

        </div>

        {/* HOTELS */}

        <div className="bg-white rounded-xl border p-6">

          <div className="flex justify-between">

            <h2 className="text-2xl font-bold">
              Hotels
            </h2>

            <button
              type="button"
              onClick={addHotel}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add Hotel
            </button>

          </div>

          {form.hotels.map((hotel, index) => (

            <div
              key={index}
              className="border rounded-xl p-5 mt-5 space-y-3"
            >

              <input
                value={hotel.name}
                onChange={(e)=>
                  updateArrayItem(
                    "hotels",
                    index,
                    "name",
                    e.target.value
                  )
                }
                placeholder="Hotel Name"
                className="border rounded-lg p-3 w-full"
              />

              <input
                value={hotel.city}
                onChange={(e)=>
                  updateArrayItem(
                    "hotels",
                    index,
                    "city",
                    e.target.value
                  )
                }
                placeholder="City"
                className="border rounded-lg p-3 w-full"
              />

              <input
                value={hotel.roomType}
                onChange={(e)=>
                  updateArrayItem(
                    "hotels",
                    index,
                    "roomType",
                    e.target.value
                  )
                }
                placeholder="Room Type"
                className="border rounded-lg p-3 w-full"
              />

              <textarea
                value={hotel.description}
                onChange={(e)=>
                  updateArrayItem(
                    "hotels",
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Description"
                className="border rounded-lg p-3 w-full"
              />

              <button
                type="button"
                onClick={() => removeHotel(index)}
                className="text-red-600"
              >
                Remove Hotel
              </button>

            </div>

          ))}

        </div>

        {/* FLIGHT */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-2xl font-bold mb-5">
            Flight
          </h2>

          <input
            value={form.flights.destination}
            onChange={(e)=>
              updateNested(
                "flights",
                "destination",
                e.target.value
              )
            }
            placeholder="Destination Airport"
            className="border rounded-lg p-3 w-full mb-4"
          />

          <textarea
            value={form.flights.classOption}
            onChange={(e)=>
              updateNested(
                "flights",
                "classOption",
                e.target.value
              )
            }
            placeholder="Class Option"
            className="border rounded-lg p-3 w-full"
          />

        </div>

        {/* TRANSPORT */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-2xl font-bold mb-5">
            Transportation
          </h2>

          <input
            value={form.transportation.type}
            onChange={(e)=>
              updateNested(
                "transportation",
                "type",
                e.target.value
              )
            }
            placeholder="Transport Type"
            className="border rounded-lg p-3 w-full"
          />

        </div>

        {/* VISA */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-2xl font-bold mb-5">
            Visa Assistance
          </h2>

          <input
            value={form.visaAssistance.agency}
            onChange={(e)=>
              updateNested(
                "visaAssistance",
                "agency",
                e.target.value
              )
            }
            placeholder="Agency"
            className="border rounded-lg p-3 w-full"
          />

        </div>

        {/* SIGHTSEEING */}

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-2xl font-bold mb-5">
            Sightseeing
          </h2>

          <textarea
            value={form.sightseeing.items.join("\n")}
            onChange={(e)=>
              updateNested(
                "sightseeing",
                "items",
                e.target.value.split("\n")
              )
            }
            rows={8}
            placeholder="One item per line"
            className="border rounded-lg p-3 w-full"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl"
        >
          {loading ? "Saving..." : "Save Package"}
        </button>

      </form>

    </div>
  );
}