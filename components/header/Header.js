"use client";
import React, { useState, useEffect, useRef } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  PlaneTakeoff,
  Globe,
  Menu,
  X,
  ArrowRight,
  Moon,
  Sun,
  Phone,
  User,
  MessageCircle,
  Home,
  ChevronRight,
} from "lucide-react";

// ─── destination images keyed by name (lowercase, no spaces) ────────────────
const destinationImages = {
  // Flights
  australia: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80",
  india: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
  ghana: "https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?w=400&q=80",
  nigeria: "/imgs/flights/accra.jpg",
  pakistan: "/imgs/flights/pakistan1.jpg",
  usa: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80",
  philippines: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80",
  "south-africa": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80",
  zimbabwe: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80",
  canada: "https://images.unsplash.com/photo-1530025809667-1f4bcff8e60f?q=80&w=1391",
  thailand: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
  brazil: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&q=80",
  // Holidays / Umrah
  "umrah-birmingham": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80",
  "umrah-london": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80",
  "umrah-bolton": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80",
  "umrah-manchester": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80",
  "inclusive-holidays": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  "beach-holidays": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  "city-breaks": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
  "family-holidays": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80",
  "last-minute-holidays": "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80",
  // Hajj & Umrah
  "ramdan-package": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80",
  "3-star-umrah": "/imgs/hajj/hajj26.jpg",
  "4-star-umrah": "/imgs/hajj/hajj33.jpg",
  "5-star-umrah": "/imgs/hajj/hajj28.jpg",
  "monthly-package": "/imgs/hajj/hajj22.jpg",
  "ramdan-package": "/imgs/hajj/hajj21.jpg",
  // Cities & Hotels
  makkah: "/imgs/hajj/makkah_hotel.jpg",
  madinah: "/imgs/hajj/al-kiswah.jpg",
  // holidays
  "umrah-birmingham":"/imgs/holidays/Birmingham3.jpg",
  "umrah-london":"/imgs/holidays/LondonBanner3.jpg",
  "umrah-bolton":"/imgs/holidays/bolton.jpg",
  "umrah-manchester":"/imgs/holidays/Manchester.jpg",
};

function getImage(name) {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  return destinationImages[key] || "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80";
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const africanDestinations = [
  { name: "Australia", code: "SYD", price: "£899", tag: "Oceania" },
  { name: "India", code: "DEL", price: "£450", tag: "Asia" },
  { name: "Ghana", code: "ACC", price: "£500", tag: "West Africa" },
  { name: "Nigeria", code: "LOS", price: "£349", tag: "West Africa" },
  { name: "Pakistan", code: "ISB", price: "£490", tag: "Asia" },
  { name: "USA", code: "JFK", price: "£338", tag: "North America" },
  { name: "Philippines", code: "MNL", price: "£650", tag: "Asia" },
  { name: "South Africa", code: "JNB", price: "£364", tag: "Southern Africa" },
  { name: "Zimbabwe", code: "HRE", price: "£463", tag: "Southern Africa" },
  { name: "Canada", code: "YYZ", price: "£420", tag: "North America" },
  { name: "Thailand", code: "BKK", price: "£342", tag: "Southeast Asia" },
  { name: "Brazil", code: "GRU", price: "£552", tag: "South America" },
];

const holidayDeals = [
  { name: "umrah-birmingham", price: "£836", code: "BHM", tag: "Europe" },
  { name: "umrah-london", price: "£753", code: "LON", tag: "Europe" },
  { name: "umrah-bolton", price: "£1140", code: "BOL", tag: "Europe" },
  { name: "umrah-manchester", price: "£836", code: "MAN", tag: "Europe" },
  { name: "Inclusive Holidays", price: "£699", code: "MAN", tag: "Europe" },
  { name: "Beach Holidays", price: "£1350", code: "MAN", tag: "Europe" },
  { name: "City Breaks", price: "£940", code: "MAN", tag: "Europe" },
  { name: "Family Holidays", price: "£940", code: "MAN", tag: "Europe" },
  { name: "Last Minute Holidays", price: "£1280", code: "MAN", tag: "Europe" },
];

const hajjUmrahPackages = [
  { name: "Ramdan Package", code: "UMR", price: "£650", tag: "Full Guided" },
  { name: "3 Star Umrah", code: "3ST", price: "£599", tag: "Economy" },
  { name: "4 Star Umrah", code: "4ST", price: "£799", tag: "Standard" },
  { name: "5 Star Umrah", code: "5ST", price: "£1,050", tag: "Luxury" },
  { name: "Monthly Package", code: "RAM", price: "£1,200", tag: "Special" },
];

const cityHotels = [
  { name: "Makkah", code: "MAK", price: "£250", tag: "Saudi Arabia" },
  { name: "Madinah", code: "MED", price: "£200", tag: "Saudi Arabia" },
];

const menuData = {
  flights: {
    items: africanDestinations,
    icon: PlaneTakeoff,
    title: "Flights",
    color: "#3B82F6",
  },
  holidays: {
    items: holidayDeals,
    icon: Globe,
    title: "Holidays",
    color: "#E0F2F1",
  },
  "hajj-umrah": {
    items: hajjUmrahPackages,
    icon: Moon,
    title: "Hajj & Umrah",
    color: "#E68213",
  },
  "cities-hotels": {
    items: cityHotels,
    icon: User,
    title: "Cities & Hotels",
    color: "#3B82F6",
  },
};

// ─── Desktop card with background image ──────────────────────────────────────
function DestinationCard({ item, basePath }) {
  const slug = item.name.toLowerCase().replace(/\s+/g, "-");
  const img = getImage(item.name);

  return (
    <Link
      href={`/${basePath}/${slug}`}
      className="group relative overflow-hidden rounded-2xl h-[110px] flex flex-col justify-end transition-transform duration-200 hover:scale-[1.03]"
    >
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center  transition-transform  duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${img})` }}
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 transition-all duration-300" />
      {/* orange shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#E68213]/30 to-transparent" />

      <div className="relative z-10 p-3">
        <div className="flex items-start justify-between mb-1">
          <span className="text-[11px] font-bold text-white leading-tight">{item.name}</span>
          <span className="text-[9px] bg-white/20 backdrop-blur-sm text-white/80 px-1.5 py-0.5 rounded-full font-medium">{item.code}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/60">{item.tag}</span>
          <div className="flex items-center gap-0.5">
            <span className="text-[8px] text-white/50">from</span>
            <span className="text-[12px] font-bold text-[#F7931E]">{item.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function DestinationGrid({ items, basePath }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <DestinationCard key={item.code + item.name} item={item} basePath={basePath} />
      ))}
    </div>
  );
}

// ─── Mega panel ───────────────────────────────────────────────────────────────
function MegaPanel({ menu }) {
  const isHajj = menu === "hajj-umrah";
  const { items, icon: PanelIcon, title } = menuData[menu];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={`absolute left-1/2 top-[calc(100%+18px)] -translate-x-1/2 z-50 ${isHajj ? "w-[520px]" : "w-[760px]"}`}
    >
      <div className="relative overflow-hidden rounded-[28px] border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#111112]/95 shadow-[0_40px_80px_-10px_rgba(0,0,0,0.2)] backdrop-blur-3xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E68213]/10">
              <PanelIcon size={15} className="text-[#E68213]" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
              {title}
            </p>
          </div>
          <Link
            href={`/${menu}`}
            className="flex items-center gap-1.5 rounded-full border border-[#E68213]/20 bg-[#E68213]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E68213] hover:bg-[#E68213]/10 transition-colors"
          >
            View All <ChevronRight size={10} />
          </Link>
        </div>

        <div className={`p-5 overflow-y-auto ${isHajj ? "max-h-[300px]" : "max-h-[400px]"}`}>
          <DestinationGrid items={items} basePath={menu} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile accordion (FIXED) ─────────────────────────────────────────────────
// FIX: Separated the toggle button from the Link, and manage open state locally.
// FIX: Removed drag from sidebar wrapper — it was swallowing tap events on iOS.
function MobileAccordion({ menuKey, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const { items, icon: Icon, title, color } = menuData[menuKey];

  return (
    <div className="border-b border-black/5 dark:border-white/5">
      {/* Header row: left side navigates, right chevron toggles accordion */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href={`/${menuKey}`}
          onClick={onClose}
          className="flex items-center gap-3 flex-1 min-w-0"
        >
          <div
            className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{title}</p>
            <p className="text-xs text-slate-500 dark:text-white/40">{items.length} options</p>
          </div>
        </Link>

        {/* Separate toggle button — this is the key fix */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] shrink-0 ml-2"
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <ChevronDown
            size={18}
            className="text-slate-400 transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>

      {/* Collapsible sub-items with image cards */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 grid grid-cols-2 gap-2">
              {items.slice(0, 6).map((item) => {
                const slug = item.name.toLowerCase().replace(/\s+/g, "-");
                const img = getImage(item.name);
                return (
                  <Link
                    key={item.code + item.name}
                    href={`/${menuKey}/${slug}`}
                    onClick={onClose}
                    className="group relative overflow-hidden rounded-2xl h-[90px] flex flex-col justify-end"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-active:scale-110"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="relative z-10 p-2.5">
                      <p className="text-[10px] font-mono text-[#F7931E]">{item.code}</p>
                      <p className="text-xs font-semibold text-white leading-tight">{item.name}</p>
                      <p className="text-[11px] font-bold text-white mt-0.5">{item.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef(null);
  // For swipe-to-close on mobile sidebar
  const touchStartX = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isSidebarOpen]);

  const closeMenu = () => setIsSidebarOpen(false);

  // Swipe-right-to-close (right-side drawer)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 80) closeMenu(); // swipe right > 80px closes sidebar
    touchStartX.current = null;
  };

  const phoneNumber = "02038766846";
  const whatsappNumber = "02038766846";

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-7xl z-50">
        <div className="bg-white/70 dark:bg-[#111112]/70 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl md:rounded-full px-5 md:px-8 h-16 md:h-20 flex items-center justify-between shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] relative">
        <div className="flex items-center gap-2">
  <div className="w-14 h-14 md:w-17 md:h-17 rounded-full overflow-hidden shrink-0">
    {/* logoo */}
     <Link href="/" >
  <img
    src="/imgs/logo1.jpeg"
    alt="TravelsHook"
    className="w-full h-full object-cover scale-110"
  />
    </Link>
</div>
 
    

</div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {Object.keys(menuData).map((item) => (
              <div
                key={item}
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
                className="relative py-7"
              >
                <Link
                  href={`/${item}`}
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-white/70 hover:text-[#D4AF37] transition-colors"
                >
                  {item.replace("-", " & ")}
                  <ChevronDown size={14} />
                </Link>

                <AnimatePresence>
                  {activeMenu === item && <MegaPanel menu={item} />}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <Link
              href={`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Hello%2C+I%27d+like+to+enquire+about+a+booking&type=phone_number&app_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#F6931F] hover:bg-[#0070A1] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#F6931F]/20 hover:shadow-[#0070A1]/20 transform active:scale-[0.98]"
            >
              Book Now <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 active:scale-90 transition-transform"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR — drag removed to fix tap event swallowing */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-[60] md:hidden"
            />

            {/* Drawer — no framer-motion drag, using native touch events instead */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white dark:bg-[#111112] z-[70] rounded-l-3xl flex flex-col"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              {/* Drag handle indicator */}
              <div className="w-10 h-1 bg-black/10 dark:bg-white/10 rounded-full mx-auto mt-3 mb-1 md:hidden shrink-0" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5 shrink-0">
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">Explore</p>
                  <p className="text-xs text-slate-500 dark:text-white/40">Where to next?</p>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 active:scale-90 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 px-6 py-4 border-b border-black/5 dark:border-white/5 shrink-0">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] active:bg-black/[0.07] transition-colors"
                >
                  <Home size={18} className="text-[#F6931F]" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-white/80">Home</span>
                </Link>

                <a
                  href={`tel:${phoneNumber}`}
                  className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] active:bg-black/[0.07] transition-colors"
                >
                  <Phone size={18} className="text-green-600" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-white/80">Call</span>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] active:bg-black/[0.07] transition-colors"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-white/80">WhatsApp</span>
                </a>
              </div>

              {/* Scrollable accordion list */}
              <div className="overflow-y-auto flex-1 pb-8">
                {Object.keys(menuData).map((key) => (
                  <MobileAccordion key={key} menuKey={key} onClose={closeMenu} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}