"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import PackageModal from "./PackageModal";

const PackageCard = memo(function PackageCard({ pkg, onBook, theme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
        className="group h-full"
      >
        <div
          className="rounded-2xl overflow-hidden h-full flex flex-col bg-white transition-all duration-500"
          style={{
            border: `1px solid ${theme?.border || "rgba(245,158,11,0.2)"}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}
        >
          {/* Image Container */}
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
            <Image
              src={`/${pkg.image}`}
              alt={pkg.title || "Holiday Package"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
              <Star size={15} fill="currentColor" style={{ color: theme?.accent || "#f59e0b" }} />
              <span className="text-xs font-bold">{pkg.rating}</span>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col flex-1 p-5 sm:p-6">
            {/* Category Tag */}
            {pkg.category && (
              <span
                className="text-xs font-semibold mb-3 inline-block w-fit px-3 py-1 rounded-full"
                style={{
                  backgroundColor: theme?.background || "rgba(245,158,11,0.1)",
                  color: theme?.accent || "#f59e0b"
                }}
              >
                {pkg.category}
              </span>
            )}

            {/* Title */}
            <h3 className="font-bold text-base sm:text-lg line-clamp-2 mb-3" style={{ color: theme?.text || "#000" }}>
              {pkg.title}
            </h3>

            {/* Location & Duration */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <MapPin size={16} style={{ color: theme?.accent || "#f59e0b" }} className="flex-shrink-0" />
                <span>{pkg.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Clock size={16} style={{ color: theme?.accent || "#f59e0b" }} className="flex-shrink-0" />
                <span>{pkg.duration}</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed flex-grow">
              {pkg.shortDesc}
            </p>

            {/* Highlights Preview */}
            <div className="flex flex-wrap gap-2 mb-5">
              {pkg.highlights?.slice(0, 2).map((highlight, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{
                    backgroundColor: theme?.background || "rgba(245,158,11,0.1)",
                    color: theme?.accent || "#f59e0b"
                  }}
                >
                  {highlight}
                </span>
              ))}
              {pkg.highlights?.length > 2 && (
                <span className="text-xs text-gray-500 px-2.5 py-1">
                  +{pkg.highlights.length - 2} more
                </span>
              )}
            </div>

            {/* Price Section */}
            <div className="mb-5 pb-5 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Starting from</p>
              <p className="font-bold text-xl sm:text-2xl" style={{ color: theme?.accent || "#f59e0b" }}>
                £{pkg.price}
              </p>
            </div>

            {/* Explore Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 text-white group/btn"
              style={{ backgroundColor: theme?.accent || "#f59e0b" }}
            >
              Explore Package
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <PackageModal
        pkg={pkg}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={() => {
          onBook?.(pkg);
          setIsModalOpen(false);
        }}
        theme={theme}
      />
    </>
  );
});

PackageCard.displayName = "PackageCard";

export default PackageCard;