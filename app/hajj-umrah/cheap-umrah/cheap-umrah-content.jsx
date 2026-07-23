import Link from "next/link";
import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CONTENT = {
  h1: "Cheap Umrah Packages UK",
  sections: [
    {
      heading: "Perform Umrah Without Stretching Your Budget",
      paragraphs: [
        "Planning your Umrah should be an exciting and spiritually rewarding experience not a financial burden. At Travels Hook, we understand that every pilgrim has different budgets and travel preferences. That’s why we offer Cheap Umrah Packages UK that combine affordability with comfort, reliability and quality service.",
        "Our aim is to make Umrah accessible to individuals, couples, families and groups across the UK. Whether you're travelling for the first time or returning for another blessed journey, our affordable packages are carefully designed to help you focus on your worship while we take care of your travel arrangements.",
        "From return flights and comfortable accommodation to airport transfers and personalised support, our packages provide excellent value without compromising on the essentials of your journey."
      ],
    },
    {
  heading: "Why Choose Our Cheap Umrah Packages?",
  paragraphs: [
    "Choosing an affordable Umrah package doesn't mean sacrificing quality. At Travels Hook, we carefully select travel options that provide comfort, convenience and excellent value for money. Our Cheap Umrah Packages UK are designed to help pilgrims perform Umrah with confidence while staying within their budget.",
    "When you book with us, you benefit from:",
  ],
  bullets: [
    "Affordable pricing with transparent costs",
    "Comfortable hotel accommodation in Makkah and Madinah",
    "Return flights from major UK airports",
    "Airport and ground transfers",
    "Flexible travel dates",
    "Friendly and experienced customer support",
    "Packages suitable for individuals, couples and families",
    "Personalised travel assistance from enquiry until your return",
  ],
  afterBullets:
    "Our goal is to make your pilgrimage smooth, stress-free and affordable, allowing you to focus on your worship while we take care of your travel arrangements.",
},
   {
  heading: "Affordable Umrah Packages for Every Traveller",
  paragraphs: [
    "Every pilgrim has unique travel requirements and budget expectations. That's why Travels Hook offers Cheap Umrah Packages UK with flexible options to suit different budgets, travel preferences and group sizes.",
    "Whether you're travelling individually, as a couple, with family, friends or as part of a larger group, our experienced travel advisors will help you find an affordable Umrah package that matches your needs without unnecessary expenses.",
    "We believe everyone should have the opportunity to perform Umrah, which is why our packages combine quality travel arrangements, comfortable accommodation and excellent value for money.",
  ],
  bullets: [
    "Individual Umrah packages",
    "Couples Umrah packages",
    "Family Umrah packages",
    "Group Umrah packages",
    "Flexible travel dates",
    "Affordable accommodation options",
    "Return flights from the UK",
    "Personalised travel assistance",
  ],
  afterBullets:
    "Whatever your budget or travel plans, our team is committed to helping you choose the right package for a smooth, comfortable and spiritually rewarding Umrah journey.",
},
    {
  heading: "Comfortable Hotels at Affordable Prices",
  paragraphs: [
    "Finding affordable accommodation doesn't mean compromising on cleanliness, comfort or convenience. At Travels Hook, our Cheap Umrah Packages UK include carefully selected hotels that offer excellent value while ensuring a pleasant stay during your pilgrimage.",
    "Our hotels are chosen to provide a comfortable and relaxing environment, allowing you to focus on your worship with peace of mind.",
    "Our carefully selected hotels provide:",
  ],
  bullets: [
    "Comfortable and well-maintained rooms",
    "Convenient transport links",
    "Family-friendly facilities",
    "Professional hospitality",
    "Easy access to local amenities",
  ],
  afterBullets:
    "Depending on your chosen package, you can also upgrade your accommodation to better suit your travel preferences and budget.",
},
{
  heading: "Flights from Major UK Airports",
  paragraphs: [
    <>
      Our{" "}
      <Link
        href="/hajj-umrah"
        className="font-bold text-orange-400 underline"
      >
        Umrah Packages
      </Link>{" "}
      are available with departures from major airports across the United Kingdom, subject to airline schedules and availability.
    </>,
    "Popular departure airports include:",
  ],
  bullets: [
    "London Heathrow",
    "Manchester",
    "Birmingham",
    "Glasgow",
  ],
  afterBullets:
    "Flight availability depends on your preferred travel dates and airline schedules. Our experienced travel advisors will help you find the most suitable flight options for your journey.",
},
    {
      heading: "Cheap Family Umrah Packages",
     bullets: [
    "Shared accommodation options",
    "Family room choices",
    "Flexible travel dates",
    "Coordinated flights",
    "Practical travel arrangements",
  ],
    },
    {
      heading: "Best Time to Book Cheap Umrah Packages?",
      paragraphs: [
        "If affordability is your priority, timing is extremely important..",
        "Booking several months before departure often gives you:",
      ],
      bullets: [
        "Better hotel availability",
        "More flight choices",
        "Lower overall prices",
        "More package options",
        "More time to prepare for your pilgrimage",
      ],
      afterBullets:
        "Peak travel periods such as Ramadan, school holidays and December tend to experience higher demand, making early planning especially worthwhile.",
    },
    {
      heading: "Personalised Luxury Umrah Packages",
      paragraphs: [
        "Every traveller has different expectations and budgets.",
        "That's why we offer personalised package options that can be tailored according to:",
      ],
      bullets: [
        "Preferred travel dates",
        "Number of travellers",
        "Hotel preferences",
        "Trip duration",
        "Room occupancy",
        "Family requirements",
      ],
      afterBullets:
        "Travelling outside Ramadan, December and school holidays may also help reduce overall travel costs.",
    },
    {
      heading: "Why Choose Travels Hook?",
      paragraphs: [
  "Choosing the right travel agency is just as important as choosing the right package.",
  <>
    <Link href="/" className="font-bold text-orange-400 underline">Travels Hook</Link> is committed to providing professional service, transparent communication and carefully organised Umrah travel solutions for UK pilgrims.
  </>,

  "When you book with us, you benefit from:"
],

      bullets: [
        "Professional travel guidance",
        "Responsive customer support",
        "Carefully selected accommodation",
        "Flexible travel options",
        "Competitive pricing",
        "Personalised assistance from enquiry to return",
      ],
      afterBullets:
        "Our goal is to help every pilgrim travel with confidence while focusing on what matters most their spiritual journey.",
    },
  ],
};
export default function CheapUmrahContent({
  content = CONTENT,
  maxHeight = "480px",
  className = "",
}) {
  return (
    <section className={ ` dark:text-white dark:bg-slate-950 py-12 px-4 bg-[#F7F9FE] ${className}`} >
      <div className="max-w-6xl mx-auto">

        {/* Outer card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-orange-400 border-b border-[#0A2540]">
            <h1 className="text-white text-lg md:text-2xl font-extrabold tracking-tight">
              {content.h1}
            </h1>
           
          </div>

          {/* Scrollable body */}
          <div
            className="overflow-y-auto px-6 py-6 space-y-8"
            style={{ maxHeight: maxHeight === "none" ? undefined : maxHeight }}
          >
            {content.sections.map((section, i) => (
              <div key={i} className="space-y-3">

                {/* Subheading */}
                <h2 className="text-[#0A2540] font-bold text-base md:text-lg leading-snug border-l-4 border-[#C9972C] pl-3">
                  {section.heading}
                </h2>

                {/* Paragraphs before bullets */}
                {section.paragraphs?.map((para, j) => (
                  <p key={j} className="text-[#6B7C93] text-sm md:text-base leading-relaxed">
                    {para}
                  </p>
                ))}

                {/* Bullet list */}
                {section.bullets?.length > 0 && (
                  <ul className="space-y-1.5 pl-1">
                    {section.bullets.map((item, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-[#6B7C93] text-sm md:text-base">
                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9972C]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Paragraph after bullets */}
                {section.afterBullets && (
                  <p className="text-[#6B7C93] text-sm md:text-base leading-relaxed">
                    {section.afterBullets}
                  </p>
                )}

              </div>
            ))}
          </div>

          {/* Bottom fade */}
          <div className="h-8 bg-gradient-to-t from-white to-transparent -mt-8 pointer-events-none relative z-10" />
        </div>

      </div>
    </section>
  );
}