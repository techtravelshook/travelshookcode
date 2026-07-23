import React from "react";
import CheapUmrah from "./cheapumrah";

export const metadata = {
  title: "Cheap Umrah Packages UK | Affordable Umrah Deals | Travels Hook",

  description:
    "Book cheap Umrah packages from the UK with return flights, comfortable hotels, airport transfers and expert support. Discover affordable Umrah deals with Travels Hook and plan your spiritual journey today.",

  keywords: [
    "Cheap Umrah Packages UK",
    "Affordable Umrah Packages UK",
    "Budget Umrah Packages",
    "Cheap Umrah Deals",
    "Cheap Family Umrah Packages",
    "Umrah Packages from UK",
    "Affordable Umrah Deals",
    "Budget Umrah 2026",
    "Cheap Umrah Packages London",
    "Cheap Umrah Packages Manchester",
    "Cheap Umrah Packages Birmingham",
    "Travels Hook",
  ],

  alternates: {
    canonical: "https://travelshook.co.uk/cheap-umrah-package",
  },

  openGraph: {
    title: "Cheap Umrah Packages UK | Affordable Umrah Deals | Travels Hook",
    description:
      "Book affordable Umrah packages from the UK with quality hotels, return flights and reliable customer support.",
    url: "https://travelshook.co.uk/cheap-umrah-package",
    siteName: "Travels Hook",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/imgs/hajj/hajj1.jpg", // Replace with your page banner
        width: 1200,
        height: 630,
        alt: "Cheap Umrah Packages UK",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cheap Umrah Packages UK | Travels Hook",
    description:
      "Affordable Umrah packages from the UK with flights, hotels and expert support.",
    images: ["/imgs/hajj/hajj1.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  return (
    <div>
      <CheapUmrah />
    </div>
  );
}