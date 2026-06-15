"use client";

import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Plane,
  Shield,
} from "lucide-react";
import Image from "next/image";

function StarRow({ count = 0 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < count
              ? "fill-amber-400 stroke-amber-400"
              : "fill-transparent stroke-white/30"
          }
        />
      ))}
    </div>
  );
}

export default function PackageCard({
  pkg,
  onBook,
  theme = {
    primary: "#f59e0b",
    border: "rgba(245,158,11,0.2)",
    lightBg: "rgba(245,158,11,0.1)",
    gradient: "linear-gradient(135deg,#f59e0b,#d97706)",
  },
}) {
  if (!pkg) return null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Image Container */}
      <div className="relative h-65 overflow-hidden">
        <Image
  src={`/${pkg.image}`}
  alt={pkg.title || "Holiday Package"}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover transition-transform duration-700 group-hover:scale-110"
/>


        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.2), transparent)",
          }}
        />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,.6)",
              color: theme.primary,
              border: `1px solid ${theme.border}`,
            }}
          >
            {pkg.category}
          </span>
        </div>

        {/* Duration */}
        {pkg.duration && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 text-white text-[11px] font-bold px-2 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,.55)",
            }}
          >
            <Clock
              size={10}
              style={{ color: theme.primary }}
            />
            {pkg.duration}
          </div>
        )}

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <StarRow count={pkg.rating} />

          <h3 className="text-white font-black text-sm leading-tight mt-2 line-clamp-2">
            {pkg.title}
          </h3>
        </div>
      </div>

      {/* Hover Info Overlay */}
      <div
        className="
          absolute inset-0 z-20
          bg-black/85 backdrop-blur-sm
          opacity-0 group-hover:opacity-100
          transition-all duration-500
          flex flex-col justify-end
          p-4
        "
      >
        {/* Title inside hover overlay for context */}
        <h4 className="text-white font-bold text-xs mb-1 uppercase tracking-wider opacity-60">
          {pkg.title}
        </h4>

        {/* Short Description rendering here */}
        {pkg.shortDesc && (
          <p className="text-white/80 text-[11px] leading-relaxed mb-4 line-clamp-4">
            {pkg.shortDesc}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.features?.map((feature, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full"
              style={{
                background: theme.lightBg,
                color: theme.primary,
                border: `1px solid ${theme.border}`,
              }}
            >
              <Plane size={9} />
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">
              From
            </p>

            <p className="text-2xl font-black text-white">
              £{pkg.price?.toLocaleString() || 0}
              <span className="text-xs text-white/40 ml-1">pp</span>
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onBook?.(pkg)}
            className="px-5 py-2.5 rounded-xl font-black text-xs text-black flex items-center gap-2"
            style={{
              background: theme.gradient,
            }}
          >
            <Shield size={12} />
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
