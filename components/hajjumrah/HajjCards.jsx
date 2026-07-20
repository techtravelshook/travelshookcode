"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, MessageCircle, ArrowLeft, ArrowRight, Compass, Calendar, BadgePercent, Eye, Plane, Bus, Hotel, CheckCircle } from "lucide-react";
import axios from "axios";


const getImage = (pkg) => {
  const img = pkg?.image || pkg?.images?.[0]?.url;
  if (!img || typeof img !== "string" || img.trim() === "") {
    return "/imgs/hajj/hajj1.jpg";
  }
  return img.startsWith("/") ? img : `/${img}`;
};

// ✅ Hardcoded fallbacks for fields not in API
const MEAL_PLAN = "Bed & Breakfast";
const TRANSPORT = "Private AC Transfers";
const FLIGHTS = "Return Flights Included";

export default function HajjCards() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        // ✅ After
const res = await axios.get(`/api/featurespackage`);
        setPackages(res.data.data || []);
      } catch (error) {
        console.error("Error fetching featured packages:", error);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };
    fetchFeaturedPackages();
  }, []);

  const sliderRef = useRef(null);
  const whatsappNumber = "442038766846"; 
  const router = useRouter(); 

  const handleExploreNow = (selectedPackage) => {
    if (!selectedPackage || !selectedPackage.slug) return;
    setSelected(null); 
    router.push(`/hajj-umrah/3-star-umrah/${selectedPackage.slug}`);
  };

  const getScrollAmount = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".package-card-item");
      if (card) {
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 0;
        return card.clientWidth + marginRight;
      }
    }
    return 340;
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const scrollAmount = getScrollAmount();
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = getScrollAmount();
      const finalAmount = direction === "left" ? -scrollAmount : scrollAmount;
      sliderRef.current.scrollBy({ left: finalAmount, behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    if (!selected) return;
    const msg = `Hi, I am interested in booking the "${selected.title}" package.
🕌 Makkah Hotel: ${selected.makkahHotel}
🕌 Madinah Hotel: ${selected.madinahHotel}
⏳ Duration: ${selected.duration} Nights
✈️ Flights: ${FLIGHTS}
🚌 Transport: ${TRANSPORT}
🍽️ Meal Plan: ${MEAL_PLAN}
💰 Price: £${selected.price} per person

Please share more details. Thanks!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!mounted || loading) return null;

  return (
    <section className="py-12 w-full bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[100vw] mx-auto px-4 lg:px-12">
        
        {/* ================= HEADER CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-4xl text-left">
            <span className="mb-3 inline-flex rounded-full bg-[#F6931F]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F6931F]">
              Popular Packages
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight  leading-tight whitespace-normal">
              Our Featured {" "}
              <span className="text-2xl sm:text-5xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent  ml-1 ">
                Packages 2026 - 2027
              </span>
            </h2>


 


            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium hidden sm:block whitespace-normal">
              At Travelshook, we design Ramadan Umrah Packages with flights, luxury hotel accommodations, convenient transfers, expert advice and more for the ultimate convenience in your pilgrimage.
            </p>
          </div>
          
          <div className="flex gap-2 self-end sm:self-auto">
            <button onClick={() => handleScroll("left")} className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-800 dark:hover:text-white active:scale-90">
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => handleScroll("right")} className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-800 dark:hover:text-white active:scale-90">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ================= CAROUSEL ================= */}
        <motion.div 
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.id} 
              className="package-card-item min-w-[290px] sm:min-w-[340px] max-w-[340px] snap-start group bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[480px]"
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 65, damping: 15 } }
              }}
            >
              {/* IMAGE */}
              <div className="relative w-full h-48 overflow-hidden shrink-0">
                <Image
                  src={getImage(pkg)}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#F6931F]" /> {pkg.duration} Nights
                </span>
              </div>

              {/* CARD DETAILS */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-2.5">
                  {/* ✅ Shows Makkah hotel as location */}
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#F6931F]">
                    <Compass size={12} /> {pkg.makkahHotel || "Makkah & Madinah"}
                  </div>
                  <h3 className="font-black text-base sm:text-lg tracking-tight uppercase text-slate-900 dark:text-white line-clamp-1">
                    {pkg.title}
                  </h3>
                  {/* ✅ shortDesc instead of advantage */}
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium line-clamp-3 leading-relaxed">
                    {pkg.shortDesc}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-white/10 shrink-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-zinc-300">
                    {/* ✅ Hardcoded meal plan */}
                    <span className="flex items-center gap-1.5">
                      <Utensils size={13} className="text-slate-400" /> {MEAL_PLAN}
                    </span>
                    <span className="text-[#0070A1] font-bold bg-[#0070A1]/5 dark:bg-[#0070A1]/10 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <BadgePercent size={13} /> Special
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">From Pricing</span>
                      {/* ✅ price from API with £ sign */}
                      <span className="text-xl font-black text-slate-900 dark:text-white">£{pkg.price}</span>
                    </div>
                    <button 
                      onClick={() => setSelected(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-[#F6931F] dark:hover:bg-[#F6931F] hover:text-white dark:hover:text-white transition-colors"
                    >
                      View Package
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      
{/* ================= COMPACT MODAL ================= */}
<AnimatePresence>
  {selected && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col"
      >
        {/* Close Button */}
        <button 
          onClick={() => setSelected(null)} 
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-900 border border-slate-200 dark:border-white/20 shadow-md transition-all"
        >
          <X size={17} className="text-slate-500 dark:text-slate-400" />
        </button>

        {/* Compact Hero Image */}
        <div className="relative h-48 w-full shrink-0">
          <Image 
            src={getImage(selected)}
            alt={selected.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-0.5 rounded-full text-[10px] font-bold text-white">
              <Calendar size={13} /> {selected.duration} Nights
            </span>
            <h3 className="text-xl font-black text-white mt-2 leading-tight tracking-tight">
              {selected.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Highlights - More Compact */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Plane, label: "Flights", value: FLIGHTS },
              { icon: Bus, label: "Transport", value: TRANSPORT },
              { icon: Utensils, label: "Meals", value: MEAL_PLAN },
              { icon: Calendar, label: "Duration", value: `${selected.duration} Nights` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-white/5 rounded-2xl p-3.5">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-[#0070A1]" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">{item.label}</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-white line-clamp-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hotels - Compact */}
          <div>
            <h4 className="text-xs font-bold text-[#0070A1] mb-2.5">Hotel Accommodation</h4>
            <div className="space-y-2.5">
              <div className="flex gap-3 bg-slate-50 dark:bg-zinc-900/70 border border-slate-100 dark:border-white/5 rounded-2xl p-3">
                <Hotel size={17} className="text-[#F6931F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400">Makkah</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{selected.makkahHotel}</p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-50 dark:bg-zinc-900/70 border border-slate-100 dark:border-white/5 rounded-2xl p-3">
                <Hotel size={17} className="text-[#F6931F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400">Madinah</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{selected.madinahHotel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-[#0070A1] mb-1.5">Package Overview</h4>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-4">
              {selected.description}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <h4 className="text-xs font-bold text-[#0070A1] mb-2">What&apos;s Included</h4>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              {[
                "Return Flights from UK",
                "Hotel Accommodation (Makkah & Madinah)",
                "All Airport & City Transfers",
                "Bed & Breakfast Meal Plan",
                "Ziyarah Guide Included",
                "24/7 Support & Assistance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Price Per Person</p>
              <p className="text-2xl font-black text-[#F6931F]">£{selected.price}</p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleExploreNow(selected)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#F6931F] to-[#0070A1] text-white font-bold text-xs tracking-wider hover:brightness-110 transition-all"
              >
                Explore Now
              </button>
              <button 
                onClick={handleWhatsApp}
                className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20b557] text-white font-bold text-xs tracking-wider transition-all"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </section>
  );
}