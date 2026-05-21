"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function PackageSlider({
  // Dynamic Content Props
  imageSrc = "/imgs/hajj/hajj2.jpg", // Default fallback image
  imageAlt = "Banner Image",
  badgeText = "Premium Packages For Umrah",
  mainTitle, // Expects string or JSX element
  description,

  // Button Action Props
  primaryBtnText = "Explore Packages",
  secondaryBtnText = "View Hotels",
  onPrimaryClick,
  onSecondaryClick,

  // Optional Right-Side Layout Slot (e.g., Lead Form)
  formComponent,
}) {
  return (
    <section className="relative h-[75vh] md:h-[95vh] w-full flex items-center overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/30" />

      {/* CONTENT LAYER */}
      <div className="relative z-20 container mx-auto px-4 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* TEXT COLUMN */}
        <div className={`max-w-2xl pt-20 lg:pt-10 ${formComponent ? "lg:col-span-7" : "lg:col-span-12"}`}>
          
          {/* BADGE */}
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-5">
              <MapPin size={16} className="text-[#F6931F]" />
              <span className="text-xs uppercase tracking-widest text-white">
                {badgeText}
              </span>
            </div>
          )}

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase text-white">
            {mainTitle || (
              <>
                Explore <br />
                <span className="bg-gradient-to-r from-[#F6931F] to-[#0070A1] bg-clip-text text-transparent">
                Hajj & Umrah Packages
                </span>
              </>
            )}
          </h1>

          {/* DESCRIPTION */}
          {description && (
            <p className="mt-5 text-white/80 text-sm md:text-base max-w-xl">
              {description}
            </p>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryBtnText && (
              <button 
                onClick={onPrimaryClick}
                className="px-6 py-3 rounded-full bg-[#F6931F] hover:bg-orange-500 transition font-bold text-white hover:cursor-pointer"
              >
                {primaryBtnText}
              </button>
            )}

            {secondaryBtnText && (
              <button 
                onClick={onSecondaryClick}
                className="px-6 py-3 rounded-full border border-white/20 bg-white/10 hover:cursor-pointer hover:bg-white/20 transition font-medium text-white"
              >
                {secondaryBtnText}
              </button>
            )}
          </div>
        </div>

        {/* SIDE COMPONENT SLOT (FORM) */}
        {formComponent && (
          <div className="w-full lg:col-span-5 flex justify-center lg:justify-end mt-22">
            {formComponent}
          </div>
        )}

      </div>
    </section>
  );
}
