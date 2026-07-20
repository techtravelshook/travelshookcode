import BlogViews from "./BlogViews";


export const metadata = {
  title: "Travel & Pilgrimage Blog | TravelHooks",
  description:
    "Explore expert Umrah guides, Hajj tips, holiday travel advice, visa help and packing lists — all from the TravelHooks team based in the UK.",
  keywords: [
    "Umrah guide UK",
    "Hajj tips 2026",
    "pilgrimage travel blog",
    "Umrah packages UK",
    "travel tips UK",
    "TravelHooks blog",
  ],
  alternates: {
    canonical: "https://www.travelshook.co.uk/blogs",
  },
  openGraph: {
    title: "Travel & Pilgrimage Blog | TravelHooks",
    description:
      "Expert Umrah, Hajj and holiday travel guides for UK pilgrims and travellers.",
    url: "https://www.travelshook.co.uk/blogs",
    siteName: "TravelHooks",
    images: [
      {
        url: "https://www.travelshook.co.uk/imgs/hajj/hajj28.jpg",
        width: 1200,
        height: 630,
        alt: "TravelHooks pilgrimage and travel blog",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel & Pilgrimage Blog | TravelHooks",
    description:
      "Expert Umrah, Hajj and holiday travel guides for UK pilgrims and travellers.",
    images: ["https://www.travelshook.co.uk/imgs/hajj/hajj28.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogsPage() {
  return (
    <main>
      <BlogViews />
    </main>
  );
}