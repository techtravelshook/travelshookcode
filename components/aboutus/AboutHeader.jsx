import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
const AboutHeader = () => {
  return (
    <div>
         {/* ================= 1. HERO HERO BANNER ================= */}
              <section className="relative flex h-[75vh] min-h-[550px] w-full items-center justify-center overflow-hidden px-4 sm:px-6 md:h-[65vh] lg:px-8">
                {/* Background Image Setup */}
                <Image
                  src="/imgs/hajj/AboutUsBanner.jpg"
                  alt="Flights Hero"
                  fill
                  priority
                  className="object-cover object-center z-0"
                />
                <div className="absolute inset-0 bg-black/55 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01080C] via-black/10 to-black/30 z-10" />
        
                {/* Hero Content Layer */}
                <div className="relative z-20 mx-auto mt-12 flex w-full max-w-5xl flex-col items-center pt-16 text-center">
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                  >
                    About{" "}
                    <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent pr-1 inline-block">
                      TravelsHook
                    </span>
                  </motion.h1>
        
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mx-auto mt-6 max-w-3xl text-xs leading-relaxed text-white/90 sm:text-sm md:text-base font-medium"
                  >
Travelshook offers comfortable, fully managed, and affordable travel experiences for both vacations and religious journeys, ensuring customer satisfaction.   
               </motion.p>
                </div>
              </section>
    </div>
  )
}

export default AboutHeader