"use client";
import React, { useState, useEffect } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
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
} from "lucide-react";

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
  { name: 'Thailand', code: 'BKK', price: '£342', tag: 'Southeast Asia' },
  { name: 'Brazil', code: 'GRU', price: '£552', tag: 'South America' },
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

function DestinationGrid({ items, basePath }) {
  return (
    <div className="grid grid-cols-3 gap-2 ">
      {items.map((item) => (
        <Link
          key={item.code}
          href={`/${basePath}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="group relative flex-col gap-0.5 rounded-2xl border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] p-4 transition-all  duration-200 hover:border-[#E68213]/25 hover:bg-orange-400/10"
        >
          <span className="text-[13px] font-semibold text-slate-900 dark:text-white">
            {item.name}
          </span>
          <span className="text-[10px] pl-3 text-slate-500 dark:text-white/30 ">
            {item.tag}
          </span>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 dark:text-white/40">
              from
            </span>
            <span className="font-mono text-[13px] font-bold text-slate-900 dark:text-white">
              {item.price}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

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
      <div className="relative overflow-hidden rounded-[28px] border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#111112]/95 shadow-[0_40px_80px_-10px_rgba(0,0,0,0.2)] backdrop-blur-3xl">
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
            className="flex items-center gap-1.5 rounded-full border-[#E68213]/20 bg-[#E68213]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E68213] hover:bg-[#E68213]/10"
          >
            View All
          </Link>
        </div>

        <div
          className={`p-5 overflow-y-auto ${isHajj ? "max-h-[300px]" : "max-h-[380px]"}`}
        >
          <DestinationGrid items={items} basePath={menu} />
        </div>
      </div>
    </motion.div>
  );
}

function MobileAccordion({ menuKey, onClose }) {
  const { items, icon: Icon, title, color } = menuData[menuKey];

  return (
    <div className="border-b border-black/5 dark:border-white/5">
      <Link
        href={`/${menuKey}`}
        onClick={onClose}
        className="w-full flex items-center justify-between py-5 px-6 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </p>
            <p className="text-xs text-slate-500 dark:text-white/40">
              {items.length} destinations
            </p>
          </div>
        </div>
        <ChevronDown size={20} className="text-slate-400" />
      </Link>

      {/* Quick sub items */}
      <div className="px-6 pb-5 grid grid-cols-2 gap-2">
        {items.slice(0, 6).map((item) => (
          <Link
            key={item.code}
            href={`/${menuKey}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onClose}
            className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-white/5 hover:border-[#D4AF37]/30 transition-all"
          >
            <p className="text-xs font-mono text-[#D4AF37]">
              {item.code}
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
              {item.name}
            </p>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
              {item.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const dragControls = useDragControls();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const closeMenu = () => setIsSidebarOpen(false);

  const phoneNumber = "02038766846";
  const whatsappNumber = "02038766846";

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-7xl z-50">
        <div className="bg-white/70 dark:bg-[#111112]/70 backdrop-blur-2xl border-black/10 dark:border-white/10 rounded-3xl md:rounded-full px-5 md:px-8 h-16 md:h-20 flex items-center justify-between shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] relative">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#F7931E] rounded-xl flex items-center justify-center shadow-lg shadow-[#F7931E]/20">
              <PlaneTakeoff className="text-white" size={18} />
            </div>
            <Link href="/" className="hidden md:block">
              <span className="text-lg font-bold dark:text-white text-slate-900">
                TRAVELS<span className="text-[#F7931E]">HOOK</span>
              </span>
            </Link>
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

            <motion.button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 rounded-2xl bg-black/5 dark:bg-white/5"
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-[60] md:hidden"
            />

            <motion.div
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) closeMenu();
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white dark:bg-[#111112] z-[70] rounded-l-3xl overflow-hidden"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="w-10 h-1 bg-black/10 dark:bg-white/10 rounded-full mx-auto mt-3 mb-2 md:hidden" />

              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5">
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    Explore
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/40">
                    Where to next?
                  </p>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 px-6 py-4 border-b border-black/5 dark:border-white/5">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]"
                >
                  <Home size={18} className="text-[#F6931F]" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-white/80">Home</span>
                </Link>

                <a
                  href={`tel:${phoneNumber}`}
                  className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]"
                >
                  <Phone size={18} className="text-green-600" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-white/80">Call</span>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-white/80">WhatsApp</span>
                </a>
              </div>

              <div className="overflow-y-auto h-full pb-32">
                {Object.keys(menuData).map((key) => (
                  <MobileAccordion
                    key={key}
                    menuKey={key}
                    onClose={closeMenu}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}