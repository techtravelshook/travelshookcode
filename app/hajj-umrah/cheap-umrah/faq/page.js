"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function FAQ() {
  const faqData = [
  {
    question: "What is included in a Cheap Umrah Package?",
    answer: "Most cheap Umrah packages include return flights, hotel accommodation in Makkah and Madinah, airport transfers and essential travel support. Package inclusions may vary depending on your chosen itinerary and travel dates."
  },
  {
    question: "Are cheap Umrah packages reliable?",
    answer: "Yes. A well-planned affordable package can still provide comfortable accommodation, dependable transport and professional customer support. The main difference is usually the hotel category, flight options or travel season rather than the quality of service."
  },
  {
    question: "Can families book cheap Umrah packages?",
    answer: "Absolutely. Cheap Umrah packages are available for individuals, couples and families. Shared accommodation and flexible room options help families manage travel costs while enjoying a comfortable pilgrimage."
  },
  {
    question: "When is the cheapest time to perform Umrah?",
    answer: "Prices are generally lower during off-peak months outside Ramadan, December and school holidays. Booking several months in advance can also help secure better rates."
  },
  {
    question: "Can I customise my cheap Umrah package?",
    answer: "Yes. At Travels Hook, many packages can be tailored based on your preferred travel dates, hotel choice, trip duration and budget, subject to availability."
  }
];


  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Structured Data Schema for Google Rich Snippets SEO
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "faq",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* Dynamic SEO JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="relative w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Background Image Wrapper */}
        

        {/* Foreground Content Card container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto  dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-5 sm:p-10 shadow-2xl transition-colors duration-200">
          
          <header className="text-center mb-8">
            <h1 className="text-2xl sm:text-3.5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Find instant answers regarding our comprehensive packages, visa arrangements, and itinerary bookings.
            </p>
          </header>

          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            {faqData.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={index} className="transition-all duration-200">
                  {/* Semantic Accessible Accordion Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className={`w-full px-5 py-4.5 sm:px-6 sm:py-5 flex justify-between items-center text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                      isOpen 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-semibold leading-snug pr-4">
                      {faq.question}
                    </span>
                    <span 
                      className={`text-xs sm:text-sm font-light shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-white' : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Responsive Smooth Collapse Area */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-800/40 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 sm:p-6 text-sm sm:text-15px text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700/50">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
