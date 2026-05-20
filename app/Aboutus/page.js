"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Compass, PhoneCall, ShieldCheck, HeartHandshake, MapPin, 
  Play, CheckCircle2, Award, Calendar, Users, MessageCircle, ArrowRight 
} from "lucide-react";
import AboutHeader from "@/components/aboutus/AboutHeader";
import AboutusInfo from "@/components/aboutus/AboutInfo";
import AboutStats from "@/components/aboutus/AboutStats";
import PilgrimageFeatures from "@/components/aboutus/AboutContent";
import AboutChooseus from "@/components/aboutus/AboutChooseus";
import AboutServices from "@/components/aboutus/AboutServices";

// ================= DATA ARRAYS LOGS =================
const stats = [
  { id: 1, value: "12,500+", label: "Pilgrims Guided" },
  { id: 2, value: "15+ Years", label: "On-Ground Experience" },
  { id: 3, value: "99.4%", label: "Satisfaction Rate" },
  { id: 4, value: "3 Dynamic", label: "Global Offices" },
];



export default function AboutPage() {
  const whatsappNumber = "923124928496";
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <main className="w-full font-mulish overflow-hidden bg-white dark:bg-[#01080C] text-slate-800 dark:text-slate-100 transition-colors duration-500">
      
      <AboutHeader />

      {/* ================= 2. OUR STORY & WHO WE ARE ================= */}
      <AboutusInfo/>

      {/* ================= 3. OUR NUMBERS (STATS) ================= */}
     <AboutStats/>
<PilgrimageFeatures/>



 {/* ================= 5. OUR SERVICES (QUICK OVERVIEW) ================= */}
      <AboutServices/>
      {/* ================= 4. WHY CHOOSE US ================= */}
     <AboutChooseus/>

     

    </main>
  );
}
