'use client' // Required for Framer Motion inside Next.js App Router layouts

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import React from 'react'

function FlightModal() { // Renamed from Modal to match actual layout rendering behavior
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-10 rounded-[32px] bg-gradient-to-r from-[#E68213] via-amber-500 to-[#E68213] p-8 md:p-12 text-center text-white shadow-2xl"
      >
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight md:text-4xl">
          Ready For Your Next Adventure?
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm font-medium text-orange-50/90 leading-relaxed">
          Discover unbeatable flight deals, flexible payment options, and
          world-class travel support — all in one place with TravelsHook.
        </p>

        <button className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-[#E68213] shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95">
  
  {/* Live Online Status Dot */}
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 group-hover:bg-white"></span>
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 group-hover:bg-white"></span>
  </span>

  {/* Button Text */}
  <span>WhatsApp Us Now</span>

  {/* Lucide Icon with dynamic hover translation */}
  <MessageCircle 
    size={18} 
    className="text-emerald-500 transition-all duration-300 group-hover:text-white group-hover:rotate-12 group-hover:scale-110" 
  />

</button>
      </motion.div>
    </div>
  )
}

export default FlightModal
