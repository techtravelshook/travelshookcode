"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  ChevronDown, PlaneTakeoff, Globe, Menu, X, ArrowRight,
  Moon, Sun, Search, Phone, User
} from 'lucide-react';

const africanDestinations = [
  { name: 'Accra', code: 'ACC', price: '£500', tag: 'West Africa' },
  { name: 'Port Harcourt', code: 'PHC', price: '£479', tag: 'Nigeria' },
  { name: 'Johannesburg', code: 'JNB', price: '£364', tag: 'South Africa' },
  { name: 'Lagos', code: 'LOS', price: '£349', tag: 'Nigeria' },
  { name: 'Addis Ababa', code: 'ADD', price: '£347', tag: 'Ethiopia' },
  { name: 'Harare', code: 'HRE', price: '£463', tag: 'Zimbabwe' },
  { name: 'Nairobi', code: 'NBO', price: '£287', tag: 'Kenya' },
  { name: 'Cape Town', code: 'CPT', price: '£453', tag: 'South Africa' },
  { name: 'Kigali', code: 'KGL', price: '£362', tag: 'Rwanda' },
  { name: 'Casablanca', code: 'CMN', price: '£246', tag: 'Morocco' },
  { name: 'Cairo', code: 'CAI', price: '£340', tag: 'Egypt' },
  { name: 'Luanda', code: 'LAD', price: '£419', tag: 'Angola' },
];

const holidayDeals = [
  { name: 'Spain', price: '£235', code: 'ES', tag: 'Europe' },
  { name: 'Greece', price: '£201', code: 'GR', tag: 'Europe' },
  { name: 'Italy', price: '£333', code: 'IT', tag: 'Europe' },
  { name: 'France', price: '£277', code: 'FR', tag: 'Europe' },
  { name: 'Dubai', price: '£804', code: 'DXB', tag: 'Middle East' },
  { name: 'Thailand', price: '£804', code: 'TH', tag: 'Southeast Asia' },
  { name: 'Bali', price: '£1,097', code: 'ID', tag: 'Southeast Asia' },
  { name: 'Morocco', price: '£372', code: 'MA', tag: 'North Africa' },
  { name: 'Dalaman', price: '£200', code: 'TR', tag: 'Turkey' },
  { name: 'Vietnam', price: '£321', code: 'VN', tag: 'Southeast Asia' },
];

const hajjUmrahPackages = [
  { name: 'Ramdan Package', code: 'UMR', price: '£650', tag: 'Full Guided' },
  { name: '3 Star Umrah', code: '3ST', price: '£599', tag: 'Economy' },
  { name: '4 Star Umrah', code: '4ST', price: '£799', tag: 'Standard' },
  { name: '5 Star Umrah', code: '5ST', price: '£1,050', tag: 'Luxury' },
  { name: 'Monthly Package', code: 'RAM', price: '£1,200', tag: 'Special' },
];
// cities & hotels
const cityHotels = [
  { name: 'Makkah', code: 'MAK', price: '£250', tag: 'Saudi Arabia' },
  { name: 'Madinah', code: 'MED', price: '£200', tag: 'Saudi Arabia' },
];




const menuData = {
  flights: { items: africanDestinations, icon: PlaneTakeoff, title: 'Flights', color: '#3B82F6' },
  holidays: { items: holidayDeals, icon: Globe, title: 'Holidays', color: '#E0F2F1' },
  'hajj-umrah': { items: hajjUmrahPackages, icon: Moon, title: 'Hajj & Umrah', color: '#E68213' },
  'cities-hotels': { items: cityHotels, icon: User, title: 'Cities & Hotels', color: '#3B82F6' }
};

function DestinationGrid({ items, basePath }) {
  return (
    <div className="grid grid-cols-3 gap-2 ">
      {items.map((item) => (
        <Link
          key={item.code}
          href={`/${basePath}/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="group relative flex-col gap-0.5 rounded-2xl border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] p-4 transition-all  duration-200 hover:border-[#E68213]/25 hover:hover:bg-orange-400/10"
        >

          <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{item.name}</span>
          <span className="text-[10px] pl-3 text-slate-500 dark:text-white/30 ">{item.tag}</span>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 dark:text-white/40">from</span>
            <span className="font-mono text-[13px] font-bold text-slate-900 dark:text-white">{item.price}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function MegaPanel({ menu }) {
  const isHajj = menu === 'hajj-umrah';
  const { items, icon: PanelIcon, title } = menuData[menu];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={`absolute left-1/2 top-[calc(100%+18px)] -translate-x-1/2 z-50 ${isHajj? 'w-[520px]' : 'w-[760px]'}`}
    >
      <div className="relative overflow-hidden rounded-[28px] border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#111112]/95 shadow-[0_40px_80px_-10px_rgba(0,0,0,0.2)] backdrop-blur-3xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E68213]/10">
              <PanelIcon size={15} className="text-[#E68213]" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">{title}</p>
          </div>
          <Link href={`/${menu}`} className="flex items-center gap-1.5 rounded-full border-[#E68213]/20 bg-[#E68213]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E68213] hover:bg-[#E68213]/10">
            View All
          </Link>
        </div>

        <div className={`p-5 overflow-y-auto ${isHajj? 'max-h-[300px]' : 'max-h-[380px]'}`}>
          <DestinationGrid items={items} basePath={menu} />
        </div>
      </div>
    </motion.div>
  );
}

function MobileSearch({ items, onClose }) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-[#111112]/80 backdrop-blur-xl pb-4">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations..."
          className="w-full h-12 pl-11 pr-4 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border-black/5 dark:border-white/5 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D4AF37]/40 transition-all"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X size={16} className="text-slate-400" />
          </button>
        )}
      </div>

      {query && (
        // FIX 1: Added missing `grid` class — `grid-cols-2` alone doesn't apply grid layout
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {filtered.slice(0, 8).map(item => (
            <Link key={item.code} href={`/search/${item.name.toLowerCase().replace(/\s+/g, '-')}`} onClick={onClose} className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-white/5">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
              <p className="text-xs text-slate-500 dark:text-white/40">{item.price}</p>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function MobileAccordion({ menuKey, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const { items, icon: Icon, title, color } = menuData[menuKey];

  return (
    <div className="border-b border-black/5 dark:border-white/5">
      <motion.button whileTap={{ scale: 0.98 }} onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-5 px-6 text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{title}</p>
            <p className="text-xs text-slate-500 dark:text-white/40">{items.length} destinations</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} className="text-slate-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 pb-5">
              <MobileSearch items={items} onClose={onClose} />
              <div className="grid grid-cols-2 gap-2 mt-3">
                {items.slice(0, 6).map(item => (
                  <Link key={item.code} href={`/${menuKey}/${item.name.toLowerCase().replace(/\s+/g, '-')}`} onClick={onClose} className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-white/5 hover:border-[#D4AF37]/30 transition-all">
                    <p className="text-xs font-mono text-[#D4AF37]">{item.code}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{item.name}</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{item.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const dragControls = useDragControls();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
   
    document.body.style.backgroundColor = isDarkMode? '#0a0a0a' : '#fcfcfc';
  }, [isDarkMode]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSidebarOpen]);

  const closeMenu = () => setIsSidebarOpen(false);

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-7xl z-50">
        <div className="bg-white/70 dark:bg-[#111112]/70 backdrop-blur-2xl border-black/10 dark:border-white/10 rounded-3xl md:rounded-full px-5 md:px-8 h-16 md:h-20 flex items-center justify-between shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] relative">

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#F7931E] 
            rounded-xl flex items-center justify-center shadow-lg shadow-[#F7931E]/20">
              <PlaneTakeoff className="text-white" size={18} />
            </div>
            <Link href="/" className="hidden md:block">
            <span className="text-lg font-bold dark:text-white text-slate-900">
              TRAVELS<span className="text-[#F7931E]">HOOK</span>
            </span>
            </Link>
          </div>

          {/* DESKTOP MENU - header ke neeche dropdown */}
          <div className="hidden md:flex items-center gap-8">
            {Object.keys(menuData).map((item) => (
              <div
                key={item}
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
                className="relative py-7"
              >
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-white/70 hover:text-[#D4AF37] transition-colors">
                  {item.replace('-', ' & ')}
                  <ChevronDown size={14} className={`transition-transform ${activeMenu === item? 'rotate-180' : ''}`} />
                </button>

                {/* Yahi hai desktop dropdown */}
                <AnimatePresence>
                  {activeMenu === item && <MegaPanel menu={item} />}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5">
              {isDarkMode? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Book Now - Desktop only */}
            <Link href="/book" className="hidden md:flex
             items-center gap-2 bg-[#F7931E] hover:bg-[#0070A1] 
             text-white px-6 py-3 rounded-full text-xs font-bold uppercase 
             tracking-widest transition-all shadow-lg shadow-[#F7931E]/20">
              Book Now <ArrowRight size={14} />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <motion.button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2.5 rounded-2xl bg-black/5 dark:bg-white/5" whileTap={{ scale: 0.9 }}>
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="fixed inset-0 bg-black/50 backdrop-blur-md z-[60] md:hidden" />

            <motion.div
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => { if (info.offset.y > 100) closeMenu(); }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white dark:bg-[#111112] z-[70] rounded-l-3xl overflow-hidden"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              <div className="w-10 h-1 bg-black/10 dark:bg-white/10 rounded-full mx-auto mt-3 mb-2 md:hidden" />

              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5">
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">Explore</p>
                  <p className="text-xs text-slate-500 dark:text-white/40">Where to next?</p>
                </div>
                <button onClick={closeMenu} className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 px-6 py-4 border-b border-black/5 dark:border-white/5">
                {[
                  { icon: Phone, label: 'Support', color: '#3B82F6' },
                  { icon: User, label: 'Account', color: '#10B981' }
                ].map(item => (
                  <motion.button key={item.label} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]">
                    <item.icon size={18} style={{ color: item.color }} />
                    <span className="text-xs font-semibold text-slate-700 dark:text-white/80">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="overflow-y-auto h-full pb-32">
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
