"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function FAQ() {
  const faqData = [
    {
      question: "What is Travelshook?",
      answer: "Travelshook is a premium online platform specializing in both affordable and luxury Umrah package deals, offering flights, hotels, and comprehensive travel solutions."
    },
    {
      question: "What is the booking process for Umrah packages?",
      answer: "The process involves browsing packages, selecting options, contacting customer service, completing payment, and receiving travel documents."
    },
    {
      question: "Do you provide visa assistance?",
      answer: "Yes, all Umrah packages include comprehensive visa assistance to guide you through the requirements."
    },
    {
      question: "What makes Travelshook different from other providers?",
      answer: "We offer competitive pricing, personalized service, carefully selected accommodations, 24/7 support, and transparent, no-hidden-charge pricing."
    },
    {
      question: "What types of Umrah packages do you offer?",
      answer: "We offer a range of options including Economy (3-star), Comfort (4-star), Luxury (5-star), Family, and Custom packages."
    },
    {
      question: "Do you offer last-minute Umrah packages?",
      answer: "Yes, we provide last-minute packages with immediate availability. Please contact our team for details."
    },
    {
      question: "Is travel insurance included in your packages?",
      answer: "While not automatic, we can arrange comprehensive coverage for trip cancellation, medical issues, and lost baggage."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Structured Data Schema for Google Rich Snippets SEO
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

      <div className="relative w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        {/* Background Image Wrapper */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/imgs/hajj/hajj22.jpg"
            alt="Beautiful background depicting holy pilgrimage destinations"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.35]"
          />
        </div>

        {/* Foreground Content Card container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto mt-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-5 sm:p-10 shadow-2xl transition-colors duration-200">
          
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
