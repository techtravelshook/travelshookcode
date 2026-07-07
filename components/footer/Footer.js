"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlaneTakeoff,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  Globe,
  Share2,
  Video,
  Send
} from "lucide-react";
// Custom SVG icon component matching lucide-react's style
const IconInstagram = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconFacebook = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const IconYouTube = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const IconTikTok = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);
const footerLinks = {
  company: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/Aboutus" },
    { name: "Contact Us", href: "/contact" },
    { name: "WhatsApp Us", href: "https://wa.me/923124928496?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20a%20booking" },   
  ],
   links: [
    { name: "Flights", href: "/flights" },
    { name: "Holidays", href: "/holidays" },
    { name: "Umrah", href: "/hajj-umrah" },
    { name: "Hotels", href: "/cities-hotels" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Our Responsibility", href: "/#" },
    { name: "FAQ'S", href: "/#" },
  ],
};

// FIXED: Swapped out named brand icons for ultra-safe generic lucide shape exports
const socialLinks = [
  { icon: IconInstagram, href: "https://www.instagram.com/travels_hook?igshid=bmNubHl4N2JhaTB4", label: "Instagram" },
  { icon: IconFacebook, href: "https://www.facebook.com/Travelshookukumrah", label: "Facebook" },
  { icon: IconTikTok, href: "https://www.tiktok.com/@travels_hook?lang=en", label: "TikTok" },
  { icon: IconYouTube, href: "https://www.youtube.com/channel/UCuobu9V9rkVOaJKrhXQzsnQ", label: "YouTube" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white dark:bg-[#050505] border-t border-black/5 dark:border-white/5 overflow-hidden pt-4 sm:pt-6 lg:pt-8">
      {/* Subtle gradient glow using brand safe color layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#F6931F]/40 to-transparent" />

      <div className="relative max-w-8xl mx-auto px-4 lg:px-8 pt-10 pb-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* Brand Column LOGO*/}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col justify-start">
  <div className="w-17 h-17 md:w-[70px] md:h-[70px] rounded-full overflow-hidden shrink-0 mb-3 relative">
  <Link href="/" className="block w-full h-full">
    <Image
      src="/imgs/main_logo.png"
      alt="TravelsHook"
      fill
      sizes="(max-width: 768px) 56px, 68px"
      className="object-cover scale-110"
      priority
    />
  </Link>
</div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
              Your trusted partner for flights, holidays, Hajj & Umrah packages. 
              Travel smarter with transparent pricing and 24/7 assistance support.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="tel:0203-876-6846"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-[#F6931F] transition-colors group w-fit font-semibold"
              >
                <Phone size={16} className="text-[#F6931F]" />
                <span>0203-876-6846</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0070A1]" />
              </a>
              <a
                href="mailto:support@travelshook.com"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-[#F6931F] transition-colors group w-fit font-semibold"
              >
                <Mail size={16} className="text-[#F6931F]" />
                <span>support@travelshook.com</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0070A1]" />
              </a>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold">
                <MapPin size={16} className="text-[#F6931F] mt-0.5 shrink-0" />
                <span>9 Station Rd, West Drayton UB7 7BT</span>
              </div>
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([key, links]) => (
              <motion.div key={key} variants={itemVariants} className="flex flex-col">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-4">
                  {key}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-[#F6931F] transition-colors inline-flex items-center gap-1 group font-medium"
                        target="_black"
                          rel="noopener noreferrer"
                      >
                        {link.name}
                        <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0070A1]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter / CTA */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 font-medium">
              Get exclusive deals and travel tips.
            </p>
            
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full h-11 px-4 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#F6931F]/40 transition-all font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-11 rounded-xl bg-[#F6931F] text-white text-xs font-black uppercase tracking-widest hover:bg-[#0070A1] transition-colors shadow-lg shadow-[#F6931F]/10"
              >
                Subscribe
              </motion.button>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[#F6931F] hover:bg-[#F6931F]/5 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar Segment Bar Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
        >
          <p className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium tracking-wide">
            &copy; {currentYear} Travelshook Ltd. All rights reserved. Registered in the UK.
          </p>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-wider transition-colors group"
          >
            Back to Top
            <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
          
        </motion.div>
      </div>
    </footer>
  );
}
