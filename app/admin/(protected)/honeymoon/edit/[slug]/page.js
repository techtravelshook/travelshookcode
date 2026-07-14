"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Form from "../../Honeyform";

export default function EditPackagePage() {
  const { slug } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    description: "",
    price: "",
    durationDays: "",
    durationNights: "",
    month: "",
    star: "",
    type: "",
    country: "",
    city: "",
    category: "",
    featured: false,

    images: [{ url: "" }],

    hotels: [
      {
        name: "",
        city: "",
        durationNights: "",
        starRating: "",
        roomType: "",
        description: "",
      },
    ],

    flights: {
      departureCities: [],
      destination: "",
      airlines: [],
      classOption: "",
    },

    transportation: {
      type: "",
      routeDetails: "",
      extras: "",
    },

    visaAssistance: {
      supportedRegion: "",
      agency: "",
      requiredDocuments: [],
    },

    sightseeing: {
      items: [],
      romanticExperiences: [],
      guideIncluded: false,
    },
  });

  useEffect(() => {
    if (!slug) return;

    const fetchPackage = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/honeymoon/${slug}`);

        const data = await res.json();

        console.log("GET Response:", data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch package");
        }

        const pkg = data.data;

        setForm({
          title: pkg.title ?? "",
          shortDesc: pkg.shortDesc ?? "",
          description: pkg.description ?? "",
          price: pkg.price ?? "",
          durationDays: pkg.durationDays ?? "",
          durationNights: pkg.durationNights ?? "",
          month: pkg.month ?? "",
          star: pkg.star ?? "",
          type: pkg.type ?? "",
          country: pkg.country ?? "",
          city: pkg.city ?? "",
          category: pkg.category ?? "",
          featured: pkg.featured ?? false,

          images:
            pkg.images?.length > 0
              ? pkg.images
              : [{ url: "" }],

          hotels:
            pkg.hotels?.length > 0
              ? pkg.hotels
              : [
                  {
                    name: "",
                    city: "",
                    durationNights: "",
                    starRating: "",
                    roomType: "",
                    description: "",
                  },
                ],

          flights:
            pkg.flights ?? {
              departureCities: [],
              destination: "",
              airlines: [],
              classOption: "",
            },

          transportation:
            pkg.transportation ?? {
              type: "",
              routeDetails: "",
              extras: "",
            },

          visaAssistance:
            pkg.visaAssistance ?? {
              supportedRegion: "",
              agency: "",
              requiredDocuments: [],
            },

          sightseeing:
            pkg.sightseeing ?? {
              items: [],
              romanticExperiences: [],
              guideIncluded: false,
            },
        });
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchPackage();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,

        price: Number(form.price),
        durationDays: Number(form.durationDays),
        durationNights: Number(form.durationNights),
        star: Number(form.star),
  images: form.images.filter((img) => img.url && img.url !== ""),
        hotels: form.hotels.map((hotel) => ({
          ...hotel,
          durationNights: Number(hotel.durationNights),
          starRating: Number(hotel.starRating),
        })),

        flights: {
          ...form.flights,
          departureCities:
            form.flights.departureCities || [],
          airlines:
            form.flights.airlines || [],
        },

        visaAssistance: {
          ...form.visaAssistance,
          requiredDocuments:
            form.visaAssistance.requiredDocuments || [],
        },

        sightseeing: {
          ...form.sightseeing,
          items: form.sightseeing.items || [],
          romanticExperiences:
            form.sightseeing.romanticExperiences || [],
        },
      };

      console.log("PUT Payload");
      console.log(payload);

      const res = await fetch(`/api/honeymoon/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("PUT Response");
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Package Updated Successfully");

      router.push("/admin/honeymoon");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Package...
      </div>
    );
  }

  return (
    <Form
      form={form}
      setForm={setForm}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}