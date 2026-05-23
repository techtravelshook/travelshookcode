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

const footerLinks = {
  company: [
    { name: "About Us", href: "/Aboutus" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blogs" },
  ],
   links: [
    { name: "Flights", href: "/flights" },
    { name: "Holidays", href: "/holidays" },
    { name: "Umrah", href: "/hajj-umrah" },
    { name: "Hotels", href: "/hotels" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Our Responsibility", href: "/#" },
    { name: "FAQ'S", href: "/FAQ'S" },
  ],
};

// FIXED: Swapped out named brand icons for ultra-safe generic lucide shape exports
const socialLinks = [
  { icon: Globe, href: "https://instagram.com", label: "Instagram" },
  { icon: Share2, href: "https://facebook.com", label: "Facebook" },
  { icon: Send, href: "https://twitter.com", label: "Twitter" },
  { icon: Video, href: "https://youtube.com", label: "YouTube" },
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
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col justify-start">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit">
              <div className="w-10 h-10 bg-[#F6931F] rounded-xl flex items-center justify-center shadow-lg shadow-[#F6931F]/20">
                <PlaneTakeoff className="text-white" size={18} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                TRAVELS<span className="text-[#F6931F]">HOOK</span>
              </span>
            </Link>

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
