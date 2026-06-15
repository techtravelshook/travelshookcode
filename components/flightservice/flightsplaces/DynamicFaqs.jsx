'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DynamicFaqs() {
  const pathname = usePathname();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const slug = pathname.split('/').pop() || 'australia';
        const response = await fetch(`/api/flightcontent/${slug}`);
        
        if (!response.ok) {
          throw new Error('Failed to retrieve localized FAQ data rows.');
        }

        const data = await response.json();
        const parsedFaqs = typeof data.faqs === 'string' ? JSON.parse(data.faqs) : data.faqs;
        setFaqs(parsedFaqs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFaqs();
  }, [pathname]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="py-8 sm:py-12 text-center text-xs font-bold uppercase tracking-[2px] sm:tracking-[3px] text-slate-400">
        Loading TravelsHook Exclusive FAQs...
      </div>
    );
  }

  if (error || faqs.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 font-mulish">
      {/* Header */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white dark:bg-zinc-900 rounded-full border border-slate-200 dark:border-zinc-800 mb-3 sm:mb-4">
          <div className="w-2 h-2 bg-[#E68213] rounded-full animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400">TRAVEL SMART</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-[#E68213] via-orange-500 to-[#0070A1] bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        
        <p className="mt-2 sm:mt-3 lg:mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base lg:text-base leading-relaxed">
          Everything you need to know about your journey with us
        </p>
      </div>

      {/* FAQ Container */}
      <div className="w-full">
        <div className="bg-white dark:bg-zinc-950 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-900 overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-slate-100 dark:border-zinc-900 last:border-none group hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-start gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 text-left"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <HelpCircle 
                      size={18}
                      className="sm:w-[22px] sm:h-[22px] text-[#0070A1] dark:text-[#E68213] transition-all duration-200 group-hover:scale-110" 
                    />
                  </div>
                  
                  <div className="flex-1 pr-2 sm:pr-4">
                    <span className="block text-sm sm:text-base lg:text-lg font-semibold tracking-tight text-slate-800 dark:text-zinc-100 leading-snug">
                      {faq.q}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="text-slate-400 dark:text-zinc-500 mt-1 flex-shrink-0"
                  >
                    <ChevronDown size={18} strokeWidth={2.5} className="sm:w-[22px] sm:h-[22px]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6 lg:pb-8 pl-[52px] sm:pl-[60px] text-xs sm:text-sm lg:text-[15px] leading-relaxed sm:leading-relaxed text-slate-600 dark:text-zinc-400">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Subtle footer hint */}
        <div className="mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-slate-400 dark:text-zinc-500 flex items-center justify-start gap-2">
            Still have questions? 
            <a href="#contact" className="text-[#0070A1] dark:text-[#E68213] hover:underline font-medium">
              Contact our travel experts
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}