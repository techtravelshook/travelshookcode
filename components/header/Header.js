"use client";
import React, { 
  useState, 
  useEffect, 
  useRef, 
  useMemo, 
  useCallback,
  useDeferredValue,
  useTransition 
} from "react";

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
  Search,
  Earth,
} from "lucide-react";
import Image from "next/image";

// ─── destination images keyed by name (lowercase, no spaces) ────────────────
const destinationImages = {
  australia: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80",
  india: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80",
  ghana: "https://plus.unsplash.com/premium_photo-1675367606982-2a211004b593?q=80",
  nigeria: "/imgs/flights/accra.jpg",
  pakistan: "https://images.unsplash.com/photo-1633100291356-19e4e0dcb98f?q=80",
  usa: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80",
  philippines: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&q=80",
  "south-africa": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80",
  zimbabwe: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80",
  canada: "https://images.unsplash.com/photo-1530025809667-1f4bcff8e60f?q=80&w=1391",
  thailand: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
  brazil: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&q=80",
  "umrah-birmingham": "/imgs/hajj/hajj22.jpg",
  "umrah-london": "/imgs/hajj/hajj25.jpg",
  "umrah-bolton": "/imgs/hajj/hajj28.jpg",
  "umrah-manchester": "/imgs/hajj/hajj26.jpg",
  "inclusive-holidays": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  "beach-holidays": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  "city-breaks": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
  "family-holidays": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80",
  "last-minute-holidays": "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80",
  "ramdan-package": "/imgs/hajj/hajj24.jpg",
  "3-star-umrah": "/imgs/hajj/hajj26.jpg",
  "4-star-umrah": "/imgs/hajj/hajj33.jpg",
  "5-star-umrah": "/imgs/hajj/hajj28.jpg",
  "monthly-package": "/imgs/hajj/hajj22.jpg",
  makkah: "/imgs/hajj/makkah_hotel.jpg",
  madinah: "/imgs/hajj/al-kiswah.jpg",
  // for top destinations...


  "australia-sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80",
  "baku-azerbaijan": "https://images.unsplash.com/photo-1621856818321-5b3a11cc6b18?q=80",
  "turkey-istanbul": "https://plus.unsplash.com/premium_photo-1661963652315-d5a9d26637dd?q=80",
  "chile-santiago": "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=80",
  "bahamas-harbour-island": "https://images.unsplash.com/photo-1589786161184-6d43d20526e2?q=80",
  "belgium-brussels": "https://images.unsplash.com/photo-1569878165730-a4d34917f3d2?q=80",
  "bulgaria-burgas": "https://images.unsplash.com/photo-1601152888642-f2f1b5ee0ca2?q=80",
  "cambodia-kampong-cham": "https://images.unsplash.com/photo-1599283787923-51b965a58b05?q=80",
  "chile-la-serena": "https://images.unsplash.com/photo-1478827387698-1527781a4887?q=80",
  "china-beijing": "https://images.unsplash.com/photo-1517309230475-6736d926b979?q=80",
  "colombia-santa-marta": "https://images.unsplash.com/photo-1539617546058-a8f9510b464e?q=80",
  "canada-calgary": "https://images.unsplash.com/photo-1698898559329-c84d57e95a23?q=80",
  "egypt-cairo": "https://images.unsplash.com/photo-1562679299-266edbefd6d7?q=80",
  
  "gambia-banjul": "https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?q=80",
  "germany-munich": "https://images.unsplash.com/photo-1501952476817-d7ae22e8ee4e?q=80",
  "maldives-male": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80",
  "malta-valletta": "https://images.unsplash.com/photo-1569311607906-1d8f9e2614b5?q=80",
  "mauritius-port-louis": "https://images.unsplash.com/photo-1581953636842-74649fd3e004?q=80",
  "morocco-agadir": "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?q=80",
  "singapore-marina-bay": "https://images.unsplash.com/photo-1775306963755-8897be3967bb?q=80",
  "switzerland-bern": "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80",
  "uae-dubai": "https://plus.unsplash.com/premium_photo-1661919068698-40e7b78f196a?q=80",
  "usa-chicago": "https://images.unsplash.com/photo-1581373449483-37449f962b6c?q=80",
  "india-mumbai": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80",
  "pakistan-lahore": "https://images.unsplash.com/photo-1633100291356-19e4e0dcb98f?q=80",
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

const topdest = [
  { name: "Australia-Sydney", price: "£650", tag: "Full Guided" },
  { name: "Baku-Azerbaijan", price: "£450", tag: "Full Guided" },
  { name: "Chile-Santiago",  price: "£850", tag: "Full Guided" },
  { name: "Bahamas-Harbour-Island",  price: "£950", tag: "Full Guided" },
  { name: "Belgium-Brussels",  price: "£400", tag: "Full Guided" },
  { name: "Bulgaria-Burgas", price: "£380", tag: "Full Guided" },
  { name: "Cambodia-Kampong-Cham",  price: "£550", tag: "Full Guided" },
  { name: "Canada-Calgary",  price: "£750", tag: "Full Guided" },
  { name: "Chile-La-Serena",  price: "£890", tag: "Full Guided" },
  { name: "China-Beijing",  price: "£680", tag: "Full Guided" },
  { name: "Colombia-santa-marta",  price: "£820", tag: "Full Guided" },
  { name: "Egypt-Cairo",  price: "£480", tag: "Full Guided" },
  { name: "France-Paris",  price: "£450", tag: "Full Guided" },
  { name: "Gambia-banjul", price: "£520", tag: "Full Guided" },
  { name: "Germany-munich",  price: "£460", tag: "Full Guided" },
  { name: "India-mumbai",  price: "£500", tag: "Full Guided" },
  { name: "Pakistan-lahore",  price: "£350", tag: "Full Guided" },
  { name: "Maldives-Male",  price: "£900", tag: "Full Guided" },
  { name: "Malta-valletta",  price: "£410", tag: "Full Guided" },
  { name: "Mauritius-port-louis",  price: "£850", tag: "Full Guided" },
  { name: "Morocco-Agadir", price: "£490", tag: "Full Guided" },
  { name: "Singapore-marina-bay", price: "£620", tag: "Full Guided" },
  { name: "Switzerland-Bern",  price: "£720", tag: "Full Guided" },
  { name: "Turkey-Istanbul",  price: "£460", tag: "Full Guided" },
  { name: "UAE-dubai",  price: "£500", tag: "Full Guided" },
  { name: "USA-chicago",  price: "£700", tag: "Full Guided" }
];


// const cityHotels = [
//   { name: "Makkah", code: "MAK", price: "£250", tag: "Saudi Arabia" },
//   { name: "Madinah", code: "MED", price: "£200", tag: "Saudi Arabia" },
// ];

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
  // "cities-hotels": {
  //   items: cityHotels,
  //   icon: User,
  //   title: "Cities & Hotels",
  //   color: "#3B82F6",
  // },
  "topdestinations":{
 items: topdest,
    icon: Earth,
    title: "Top Destinations",
     color: "#3B82F6",
  }
};

// ─── Optimized search hook with debounce ──────────────────────────────────────
// function useSearch(items, query) {
//   return useMemo(() => {
//     if (!query.trim()) return items;
//     const lowerQuery = query.toLowerCase();
//     return items.filter(item =>
//       item.name.toLowerCase().includes(lowerQuery) ||
//       item.code.toLowerCase().includes(lowerQuery) ||
//       item.tag.toLowerCase().includes(lowerQuery)
//     );
//   }, [items, query]);
// }
function useSearch(items, query) {
  return useMemo(() => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(item =>
      item.name?.toLowerCase().includes(lowerQuery) ||
      item.code?.toLowerCase().includes(lowerQuery) ||
      item.tag?.toLowerCase().includes(lowerQuery)
    );
  }, [items, query]);
}

// ─── Optimized debounce hook ──────────────────────────────────────────────────
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ─── Memoized Desktop card with CSS containment ────────────────────────────────
const DestinationCard = React.memo(function DestinationCard({ item, basePath }) {
  // const slug = item.name.toLowerCase().replace(/\s+/g, "-");
  // const img = getImage(item.name);
  // const [imageLoaded, setImageLoaded] = useState(false);

  const slug = item.name.toLowerCase().replace(/\s+/g, "-");
  const img = getImage(item.name);
  const [imageLoaded, setImageLoaded] = useState(false);

  const href =
    basePath === "topdestinations"
      ? `/topdestinations/destinations/${slug}`
      : `/${basePath}/${slug}`;
  return (
    // <Link
    //   href={`/${basePath}/${slug}`}
    //   className="group relative overflow-hidden rounded-2xl h-[110px] flex flex-col justify-end transition-transform duration-200 hover:scale-[1.03] will-change-transform"
    //   style={{ contain: "layout style paint" }}
    //   onMouseEnter={() => {
    //     // Preload image on hover
    //     const img = new window.Image();
    //     img.src = getImage(item.name);
    //   }}
    // >
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl h-[110px] flex flex-col justify-end transition-transform duration-200 hover:scale-[1.03] will-change-transform"
      style={{ contain: "layout style paint" }}
      onMouseEnter={() => {
        const img = new window.Image();
        img.src = getImage(item.name);
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 will-change-transform"
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90 transition-all duration-300" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#E68213]/30 to-transparent will-change-opacity" />
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
});

// ─── Optimized Grid with CSS containment ──────────────────────────────────────
const DestinationGrid = React.memo(function DestinationGrid({ items, basePath }) {
  return (
    <div className="grid grid-cols-3 gap-2" style={{ contain: "layout style" }}>
      {items.map((item) => (
        <DestinationCard key={item.code + item.name} item={item} basePath={basePath} />
      ))}
    </div>
  );
});

// ─── Optimized Mega panel with debounced search ────────────────────────────────
const MegaPanel = React.memo(function MegaPanel({ menu }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();
  const debouncedQuery = useDebounce(searchQuery, 300); // 300ms debounce
  const deferredQuery = useDeferredValue(debouncedQuery); // Non-blocking updates
  
  const isHajj = menu === "hajj-umrah";
  const { items, icon: PanelIcon, title } = menuData[menu];
  const filteredItems = useSearch(items, deferredQuery);

  const handleSearchChange = useCallback((e) => {
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={`absolute left-1/2 top-[calc(100%+18px)] -translate-x-1/2 z-50 ${isHajj ? "w-[520px]" : "w-[760px]"}`}
      style={{ contain: "layout style paint" }}
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

        {/* Search Bar */}
        <div className="px-5 py-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#E68213] transition-all"
            />
          </div>
        </div>

        <div className={`p-5 overflow-y-auto ${isHajj ? "max-h-[300px]" : "max-h-[400px]"}`} style={{ contain: "layout style paint" }}>
          {filteredItems.length > 0 ? (
            <DestinationGrid items={filteredItems} basePath={menu} />
          ) : (
            <div className="flex items-center justify-center py-8 text-slate-500 dark:text-white/40 text-sm">
              No results found for {deferredQuery}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

// ─── Memoized Mobile Card ─────────────────────────────────────────────────────
const MobileDestinationCard = React.memo(function MobileDestinationCard({ item, menuKey, onClose }) {
  // const slug = item.name.toLowerCase().replace(/\s+/g, "-");
  // const img = getImage(item.name);


  const slug = item.name.toLowerCase().replace(/\s+/g, "-");
  const img = getImage(item.name);

  const href =
    menuKey === "topdestinations"
      ? `/topdestinations/destinations/${slug}`
      : `/${menuKey}/${slug}`;
  return (
    // <Link
    //   href={`/${menuKey}/${slug}`}
    //   onClick={onClose}
    //   className="group relative overflow-hidden rounded-2xl h-[90px] flex flex-col justify-end will-change-transform"
    //   style={{ contain: "layout style paint" }}
    // >
    <Link
      href={href}
      onClick={onClose}
      className="group relative overflow-hidden rounded-2xl h-[90px] flex flex-col justify-end will-change-transform"
      style={{ contain: "layout style paint" }}
    >
      {/* <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-active:scale-110 will-change-transform"
        style={{ backgroundImage: `url(${img})` }}
      /> */}
      <Image
  src={img}
  alt={item.name}
  fill
  sizes="(max-width:768px) 50vw, 200px"
  className="object-cover"
  loading="lazy"
/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 p-2.5">
        <p className="text-[10px] font-mono text-[#F7931E]">{item.code}</p>
        <p className="text-xs font-semibold text-white leading-tight">{item.name}</p>
        <p className="text-[11px] font-bold text-white mt-0.5">{item.price}</p>
      </div>
    </Link>
  );
});

// ─── Mobile accordion with debounced search ────────────────────────────────────
const MobileAccordion = React.memo(function MobileAccordion({ menuKey, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();
  const debouncedQuery = useDebounce(searchQuery, 300);
  const deferredQuery = useDeferredValue(debouncedQuery);
  
  const { items, icon: Icon, title, color } = menuData[menuKey];
  const filteredItems = useSearch(items, deferredQuery);

  const toggleOpen = useCallback(() => {
    setIsOpen(v => !v);
  }, []);

  const handleSearchChange = useCallback((e) => {
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  }, []);

  return (
    <div className="border-b border-black/5 dark:border-white/5" style={{ contain: "layout" }}>
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

        <button
          type="button"
          name="toggle-collapse"
          onClick={toggleOpen}
          className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] shrink-0 ml-2 will-change-transform"
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <ChevronDown
            size={18}
            className="text-slate-400 transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>

      {/* Collapsible search and items */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
            style={{ contain: "layout style" }}
          >
            <div className="px-6 pt-3 pb-2">
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search...`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#E68213] transition-all"
                />
              </div>
            </div>

            {/* SCROLL ISOLATED CONTAINER */}
            <div className="px-6 pb-5 max-h-[400px] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch", contain: "layout style paint" }}>
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {filteredItems.slice(0, 6).map((item) => (
                    <MobileDestinationCard
                      key={item.code + item.name}
                      item={item}
                      menuKey={menuKey}
                      onClose={onClose}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 text-slate-500 dark:text-white/40 text-xs">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─── Main Navbar with optimized scroll handling ──────────────────────────────
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef(null);
  const sidebarContentRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  // ─── Optimized scroll progress tracker with throttling ────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;
      
      scrollTimeoutRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setScrollProgress(scrolled);
        scrollTimeoutRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    };
  }, [isSidebarOpen]);

  const closeMenu = useCallback(() => setIsSidebarOpen(false), []);
  const handleMenuOpen = useCallback(() => setIsSidebarOpen(true), []);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    
    if (diffX > 80 && diffY < 50) {
      closeMenu();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [closeMenu]);

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const phoneNumber = "02038766846";
  const whatsappNumber = "02038766846";

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 z-[100] pointer-events-none" style={{ contain: "layout style paint" }}>
        <motion.div
          className="h-full bg-gradient-to-r from-[#F6931F] via-[#0070A1] to-[#F6931F]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </div>

      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-7xl z-50" style={{ contain: "layout style" }}>
        <div className="bg-white/70 dark:bg-[#111112]/70 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl md:rounded-full px-5 md:px-8 h-16 md:h-20 flex items-center justify-between shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] relative">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 md:w-17 md:h-17 rounded-full overflow-hidden shrink-0">
              <Link href="/">
                <Image
                  src="/imgs/logo1.jpeg"
                  alt="TravelsHook"
                  width={68} 
                  height={68} 
                  className="w-full h-full object-cover scale-110"
                  priority
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
                onClick={handleThemeToggle}
                className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 will-change-transform"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
{/* BOOK NOW BUTTON */}
            <Link
              href={`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Hello%2C+I%27d+like+to+enquire+about+a+booking&type=phone_number&app_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#F6931F] hover:bg-[#0070A1] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#F6931F]/20 hover:shadow-[#0070A1]/20 transform active:scale-[0.98] will-change-transform"
            >
              Book Now <ArrowRight size={14} />
            </Link>

            <button
              onClick={handleMenuOpen}
              className="md:hidden p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 active:scale-90 transition-transform will-change-transform"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR WITH SCROLL ISOLATION */}
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

            {/* Drawer with scroll isolation */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white dark:bg-[#111112] z-[70] rounded-l-3xl flex flex-col"
              style={{ paddingBottom: "env(safe-area-inset-bottom)", contain: "layout style" }}
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
                  className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 active:scale-90 transition-transform will-change-transform"
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
              <div 
                ref={sidebarContentRef}
                className="overflow-y-auto flex-1 pb-8"
                style={{ WebkitOverflowScrolling: "touch", contain: "layout style paint" }}
              >
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