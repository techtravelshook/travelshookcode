import React from "react";
import LuxView from "./LuxView";

export const metadata = {
  title: "Luxury Umrah Packages UK | 5-Star Umrah Deals | Travels Hook",
  description:
    "Book luxury Umrah packages from the UK with 5-star hotels, premium flights, VIP transport and expert support. Experience a comfortable and spiritually rewarding Umrah with Travels Hook.",

  keywords: [
    "Luxury Umrah Packages UK",
    "5 Star Umrah Packages",
    "Luxury Umrah Deals",
    "Premium Umrah Packages UK",
    "Luxury Umrah 2026",
    "VIP Umrah Packages",
    "Luxury Umrah Travel",
    "Luxury Hajj and Umrah",
    "Travels Hook",
  ],

  alternates: {
    canonical: "https://travelshook.co.uk/luxury-umrah-package-uk",
  },

  openGraph: {
    title: "Luxury Umrah Packages UK | 5-Star Umrah Deals | Travels Hook",
    description:
      "Book luxury Umrah packages from the UK with premium hotels, flights and personalised support.",
    url: "https://travelshook.co.uk/luxury-umrah-package-uk",
    siteName: "Travels Hook",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/imgs/hajj/hajj3.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury Umrah Packages UK",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxury Umrah Packages UK | Travels Hook",
    description:
      "Book premium 5-star Umrah packages from the UK with trusted travel experts.",
    images: ["/imgs/hajj/hajj3.jpg"],
  },
};

export default function Page() {
  return <LuxView />;
}