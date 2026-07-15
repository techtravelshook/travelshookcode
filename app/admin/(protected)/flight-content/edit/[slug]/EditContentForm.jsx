"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditContentForm({ content }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    slug: content.slug || "",
    apiType: content.apiType || "",
    section1Title: content.section1Title || "",
    section1img: content.section1img || "",
    section1Content: content.section1Content || "",
    section2Title: content.section2Title || "",
    section2img: content.section2img || "",
    section2Content: content.section2Content || "",
    faqs: content.faqs || [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Upload Image
  const uploadImage = async (e, field) => {
    const file = e.target.files[0];

    if (!file) return;

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [field]: data.path,
      }));
    } catch (err) {
      console.log(err);
      alert("Image upload failed");
    }
  };

  // FAQ Change
  const handleFaqChange = (index, field, value) => {
    const updated = [...formData.faqs];

    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      faqs: updated,
    }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: "", a: "" }],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        `/api/flightcontent/${content.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Update failed");
        return;
      }

      alert("Content updated successfully!");

      router.push("/admin/flight-content");
      router.refresh();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Flight Content
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />

          <Input
            label="API Type"
            name="apiType"
            value={formData.apiType}
            onChange={handleChange}
          />

          <hr />

          <h2 className="text-2xl font-bold">
            Section 1
          </h2>

          <Input
            label="Section Title"
            name="section1Title"
            value={formData.section1Title}
            onChange={handleChange}
          />

          <div>

            <label className="font-semibold block mb-2">
              Section Image
            </label>

            <input
              type="file"
              onChange={(e) =>
                uploadImage(e, "section1img")
              }
            />

       
{formData.section1img && (
  <div className="relative w-40 h-40 mt-4 rounded overflow-hidden">
    <Image
      src={`/${formData.section1img}`}
      alt="Section 1 visual content"
      fill
      sizes="160px"
      className="object-cover"
      priority={false}
    />
  </div>
)}
          </div>

          <Textarea
            label="Section Content"
            name="section1Content"
            value={formData.section1Content}
            onChange={handleChange}
          />

          <hr />

          <h2 className="text-2xl font-bold">
            Section 2
          </h2>

          <Input
            label="Section Title"
            name="section2Title"
            value={formData.section2Title}
            onChange={handleChange}
          />

          <div>

            <label className="font-semibold block mb-2">
              Section Image
            </label>

            <input
              type="file"
              onChange={(e) =>
                uploadImage(e, "section2img")
              }
            />

           {formData.section2img && (
  <div className="relative w-40 h-40 mt-4 rounded overflow-hidden">
    <Image
      src={`/${formData.section2img}`}
      alt="Section 2 visual content"
      fill
      sizes="160px"
      className="object-cover"
      loading="lazy"
    />
  </div>
)}

          </div>

          <Textarea
            label="Section Content"
            name="section2Content"
            value={formData.section2Content}
            onChange={handleChange}
          />

          <hr />

          <h2 className="text-2xl font-bold">
            FAQs
          </h2>

          {formData.faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-5 space-y-3"
            >

              <Input
                label={`Question ${index + 1}`}
                value={faq.q}
                onChange={(e) =>
                  handleFaqChange(
                    index,
                    "q",
                    e.target.value
                  )
                }
              />

              <Textarea
                label="Answer"
                value={faq.a}
                onChange={(e) =>
                  handleFaqChange(
                    index,
                    "a",
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove FAQ
              </button>

            </div>
          ))}

          <button
            type="button"
            onClick={addFaq}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Add FAQ
          </button>

          <div>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Update Content"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

function Input({
  label,
  ...props
}) {
  return (
    <div>

      <label className="block font-semibold mb-2">
        {label}
      </label>

      <input
        {...props}
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}

function Textarea({
  label,
  ...props
}) {
  return (
    <div>

      <label className="block font-semibold mb-2">
        {label}
      </label>

      <textarea
        rows={6}
        {...props}
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}