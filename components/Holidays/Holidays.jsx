"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MapPin, Star, X, Clock, Mail
} from "lucide-react";
import FeaturedSlider from "./HoneymoonSlider";
import Image from "next/image";

const FLAG_MAP = {
  "Russia": "🇷🇺", "Cyprus": "🇨🇾", "Georgia / South Ossetia": "🇬🇪",
  "Georgia / Abkhazia": "🇬🇪", "Italy": "🇮🇹", "Liechtenstein": "🇱🇮",
  "San Marino": "🇸🇲", "Moldova / Transnistria": "🇲🇩", "Kosovo": "🇽🇰",
  "United Kingdom": "🇬🇧",
};

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } };

function StarRow({ count, size = 13 }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < count ? "fill-[#F6931F] stroke-[#F6931F]" : "fill-transparent stroke-slate-300 dark:stroke-slate-700"} />
      ))}
    </div>
  );
}

function PackageCard({ deal, onOpen, onBook }) {
  const flag = FLAG_MAP[deal.country] ?? "🌍";
  const imageUrl = deal?.images?.[0]?.url ? `/${deal.images[0].url}` : "/imgs/placeholder.jpg";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative flex flex-col h-full rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(246,147,31,0.18)] transition-all duration-300 cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative h-64 overflow-hidden m-3 rounded-[1.6rem]">
        <div className="relative w-full h-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={deal.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        // 2. Swaps state to local placeholder if the external source fails
        onError={() => setImgSrc('/imgs/placeholder.jpg')}
      />
    </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/85 via-[#0B1F33]/10 to-transparent" />

        <div className="absolute top-3 inset-x-3 flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            <Clock size={12} className="text-[#F6931F]" /> <span>{deal.durationNights}N / {deal.durationDays}D</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            <Star size={12} className="fill-[#F6931F] stroke-[#F6931F]" /> <span>{deal.star}.0</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-xs uppercase tracking-wider font-semibold opacity-75 flex items-center gap-1 mb-0.5">
            <span>{flag}</span> {deal.country}
          </div>
          <div className="text-lg font-bold flex items-center gap-1 tracking-tight">
            <MapPin size={16} className="text-[#F6931F]" /> {deal.city}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col flex-grow justify-between">
        <div>
          <StarRow count={deal.star} />
          <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-[#0070A1] transition-colors">
            {deal.title}
          </h3>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">From</span>
            <span className="text-3xl font-extrabold text-[#F6931F] tracking-tight">£{deal.price}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onBook(deal); }}
            className="px-5 py-2.5 bg-gradient-to-r from-[#F6931F] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl text-xs font-bold tracking-wide shadow-md transition-all active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PackageModal({ deal, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  if (!deal) return null;

  const images = deal.images?.length ? deal.images : [{ url: "imgs/placeholder.jpg" }];
  const imageUrl = `/${images[imgIndex]?.url}`;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B1F33]/55 backdrop-blur-md z-[60] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
          className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[1.75rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800" onClick={e => e.stopPropagation()}>
          <div className="relative h-44 group">
            {/* <img src={imageUrl} alt={deal.title} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = "/imgs/placeholder.jpg"} /> */}
            <div className="relative w-full h-60 overflow-hidden bg-gray-100">
  <Image 
    src={imageUrl} 
    alt={deal.title} 
    className="w-full h-full object-cover" 
    width="500" 
    height="240"
    loading="lazy" 
    onError={(e) => {
      e.currentTarget.onerror = null; // Prevents infinite loop if placeholder is also missing
      e.currentTarget.src = "/imgs/placeholder.jpg";
    }} 
  />
</div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/10 to-transparent" />
            <button onClick={onClose} className="absolute top-3 right-3 bg-black/40 text-white p-2 rounded-full z-10"><X size={15} /></button>
          </div>

          <div className="p-5">
            <StarRow count={deal.star} />
            <h2 className="text-lg font-extrabold mt-2">{deal.title}</h2>
            <p className="text-xs text-slate-500 mt-2">{deal.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function BookingModal({ deal, onClose }) {
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    phone: "", 
    fromDate: "", 
    toDate: "", 
    adults: "2", 
    children: "0", 
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deal) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/honey-moon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          packageTitle: deal.title || "Unknown Package",
          message: `
Dates: ${formData.fromDate || 'Not specified'} - ${formData.toDate || 'Not specified'}
Adults: ${formData.adults} | Children: ${formData.children}
Special Requests: ${formData.specialRequests || "None"}
          `.trim()
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Booking Request Sent Successfully!\nWe will contact you within 24 hours.");
        onClose();
        setFormData({ name: "", email: "", phone: "", fromDate: "", toDate: "", adults: "2", children: "0", specialRequests: "" });
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!deal) return null;

  return (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 40 }}
        transition={{ type: "spring", duration: 0.4 }}
        onClick={e => e.stopPropagation()}
        className="w-full sm:max-w-xl bg-white dark:bg-[#0B1116] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
      >
        
        {/* Header Block */}
        <div className="relative p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/60 flex-shrink-0">
          <button 
            type="button"
            onClick={onClose} 
            className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:scale-105 active:scale-95 transition-all"
          >
            <X size={18} />
          </button>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            New Booking Inquiry
          </h3>
          
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1 line-clamp-1">
            {deal.title}
          </p>
        </div>

        {/* Scrollable Form Body Container */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">

            {/* Unified Itinerary Block (Airbnb Style Group) */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                Itinerary & Guests
              </p>
              
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/20 grid grid-cols-2">
                {/* Date From */}
                <div className="p-3 border-r border-b border-zinc-200 dark:border-zinc-800">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Travel From
                  </label>
                  <input 
                    type="date" 
                    name="fromDate" 
                    required 
                    value={formData.fromDate} 
                    onChange={handleChange}
                    className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer" 
                  />
                </div>

                {/* Date To */}
                <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Travel To
                  </label>
                  <input 
                    type="date" 
                    name="toDate" 
                    required 
                    value={formData.toDate} 
                    onChange={handleChange}
                    className="w-full mt-0.5 bg-transparent text-sm font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer" 
                  />
                </div>

                {/* Adults Count Selector */}
                <div className="p-3 border-r border-zinc-200 dark:border-zinc-800">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Adults
                  </label>
                  <select 
                    name="adults" 
                    value={formData.adults} 
                    onChange={handleChange} 
                    className="w-full mt-0.5 bg-transparent text-sm font-semibold text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                  >
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="dark:bg-[#0B1116]">{n}</option>)}
                  </select>
                </div>

                {/* Children Count Selector */}
                <div className="p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Children
                  </label>
                  <select 
                    name="children" 
                    value={formData.children} 
                    onChange={handleChange} 
                    className="w-full mt-0.5 bg-transparent text-sm font-semibold text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                  >
                    {[0,1,2,3,4].map(n => <option key={n} value={n} className="dark:bg-[#0B1116]">{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Guest Contact Information Block */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                Contact Information
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Full Name *" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] transition" 
                />
                
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="Email Address *" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] transition" 
                />
              </div>

              <input 
                type="tel" 
                name="phone" 
                required 
                placeholder="Phone / WhatsApp *" 
                value={formData.phone} 
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] transition" 
              />
            </div>

            {/* Special Requests Text Area */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                Special Requests
              </p>
              <textarea 
                name="specialRequests" 
                rows={3} 
                placeholder="e.g., Romantic dinner setup, flower decorations, airport transfers..." 
                value={formData.specialRequests} 
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#F6931F] focus:ring-1 focus:ring-[#F6931F] resize-none transition" 
              />
            </div>

            {/* Submission CTA Block */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F6931F] to-orange-600 text-white font-bold text-base shadow-md shadow-orange-600/20 hover:shadow-lg hover:shadow-orange-600/30 hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>{isSubmitting ? "Sending Request..." : "Submit Booking Request"}</span>
                <Mail size={16} />
              </button>
            </div>

          </form>
        </div>

      </motion.div>
    </motion.div>
  </AnimatePresence>
);

}
{/* Section Header */}


/* ================= Featured Slider ================= */
<FeaturedSlider/>

export default function HolidayDeals() {
  const [deals, setDeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bookingModal, setBookingModal] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("/api/honeymoon")
      .then(r => r.json())
      .then(d => setDeals(d.data || []));
  }, []);

  const featured = deals.slice(0, 5);
  const gridDeals = deals.slice(0, 4);

  return (
    <div ref={sectionRef} className=" bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FeaturedSlider deals={featured} onOpen={setSelected} onBook={setBookingModal} />

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gridDeals.map((deal) => (
            <PackageCard key={deal.id || deal.slug} deal={deal} onOpen={() => setSelected(deal)} onBook={setBookingModal} />
          ))}
        </motion.div>
      </div>

      <PackageModal deal={selected} onClose={() => setSelected(null)} />
      <BookingModal deal={bookingModal} onClose={() => setBookingModal(null)} />
    </div>
  );
}