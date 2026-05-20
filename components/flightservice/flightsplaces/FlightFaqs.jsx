"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

// Reusable FAQ Item Component
function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-200/80 dark:border-zinc-800 last:border-none">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left font-bold text-slate-900 transition-colors hover:text-[#0070A1] dark:text-white dark:hover:text-[#E68213]"
      >
        <div className="flex items-center gap-3 pr-4 text-sm sm:text-base">
          <HelpCircle size={18} className="text-[#0070A1] dark:text-[#E68213] shrink-0" />
          <span>{question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-slate-400 dark:text-zinc-500 shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-7 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-zinc-400 max-w-4xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Component
export default function FlightFaqs({ cityName = "your destination" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: `What is the baggage allowance for flights to ${cityName}?`,
      answer: `Baggage allowances depend strictly on the airline booked. Premium carriers like British Airways or Emirates generally allow 2 pieces of checked luggage (up to 23kg each) for international routes, while budget airlines may vary. Check your ticket specific rules during final WhatsApp verification.`
    },
    {
      question: `How can I secure the best airfare rates to ${cityName}?`,
      answer: `We recommend booking 4 to 6 weeks in advance. Use our dynamic search filter panel to sort deals by "Cheapest Price" first, and tap the instant WhatsApp button to lock in promotional rates before seats fill up.`
    },
    {
      question: `Are taxes and airport surcharges included in the price?`,
      answer: `Yes, all rates displayed across our site are completely transparent and all-inclusive. They cover fuel surcharges, local airport passenger duties, and standard processing taxes.`
    },
    {
      question: `Can I make changes or cancel my flight package after booking?`,
      answer: `Ticket flexibilities depend entirely on your chosen fare tier (Economy Saver vs Flex Premium). When making a WhatsApp inquiry, our travel specialists will explain the specific amendment fees and cancellation protection limits for that direct path.`
    },
    {
      question: `Do I need a specific visa or travel insurance to fly to ${cityName}?`,
      answer: `Visa parameters change depending on your passport nationality. We highly suggest checking current government advisory panels before departure. Travel Hooks can also help assist you with travel health insurance packages during coordination.`
    }
  ];

  return (
    <section className="relative w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 font-mulish transition-colors duration-500 dark:bg-[#01080C] overflow-hidden">
      
      {/* ───────────────── BACKGROUND GRADIENT CIRCLES ───────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#0070A1]/5 blur-[100px] dark:bg-[#0070A1]/3" />
        <div className="absolute top-10 -right-20 w-[350px] h-[350px] rounded-full bg-[#E68213]/5 blur-[90px] dark:bg-[#E68213]/3" />
      </div>

      {/* FIX: Changed max-w-4xl to max-w-7xl and removed 'mx-auto' to start directly from the left edge */}
      <div className="relative mx-auto w-full max-w-8xl z-10">

        {/* ───────────────── THEMED SECTION HEADER (Left Aligned) ───────────────── */}
        <div className="mb-12 flex flex-col items-start text-start">
          
          {/* Brand-matching Premium Pill Badge */}
          {/* Translucent Backdrop with Gradient Text Styling */}
<span className="mb-4 inline-flex items-center gap-1.5 rounded-full 
  bg-gradient-to-r from-[#E68213]/10 to-[#0070A1]/10 
  border border-[#E68213]/20 px-4 py-1.5 
  text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm shadow-sm">
  <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
    Support Center
  </span>
</span>


          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Got questions about your upcoming trip? Find instant answers regarding booking arrangements, guidelines, and ticketing terms.
          </p>
        </div>

        {/* ───────────────── INTERACTIVE ACCORDION BLOCK ───────────────── */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
