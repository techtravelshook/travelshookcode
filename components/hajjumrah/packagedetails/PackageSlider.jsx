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
    <section className="relative h-auto min-h-screen md:h-[95vh] w-full flex items-center overflow-hidden bg-zinc-950">
      
      {/* BACKGROUND IMAGE WITH MOBILE OPTIMIZATION */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center pointer-events-none"
          priority
          sizes="100vw"
        />
      </div>

      {/* OVERLAYS FOR ENHANCED CONTRAST AND READABILITY */}
      <div className="absolute inset-0 bg-black/70 md:bg-black/65 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 md:bg-gradient-to-r md:from-black md:via-black/60 md:to-black/20 z-10" />

      {/* CONTENT LAYER */}
      <div className="relative z-20 container mx-auto px-4 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-28 md:pt-0 pb-12 md:pb-0">
        
        {/* TEXT COLUMN */}
        <div className={`max-w-2xl text-left flex flex-col justify-center ${formComponent ? "lg:col-span-7" : "lg:col-span-12"}`}>
          
          {/* BADGE */}
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 sm:mb-5 self-start shadow-md">
              <MapPin size={14} className="text-[#F6931F] shrink-0" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white">
                {badgeText}
              </span>
            </div>
          )}

          {/* TITLE WITH RESPONISVE FONT BREAKPOINTS */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight sm:leading-tight uppercase text-white tracking-tight">
            {mainTitle || (
              <>
                Explore <br />
                <span className="bg-gradient-to-r from-[#F6931F] via-orange-400 to-[#0070A1] bg-clip-text text-transparent">
                  Hajj & Umrah Packages
                </span>
              </>
            )}
          </h1>

          {/* DESCRIPTION */}
          {description && (
            <p className="mt-4 sm:mt-5 text-white/80 text-xs sm:text-sm md:text-base max-w-xl font-medium leading-relaxed">
              {description}
            </p>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            {primaryBtnText && (
              <button 
                onClick={onPrimaryClick}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F6931F] hover:bg-orange-500 transition font-black text-xs uppercase tracking-wider text-white shadow-lg shadow-[#F6931F]/10 active:scale-95 cursor-pointer"
              >
                {primaryBtnText}
              </button>
            )}

            {secondaryBtnText && (
              <button 
                onClick={onSecondaryClick}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition font-bold text-xs uppercase tracking-wider text-white active:scale-95 cursor-pointer"
              >
                {secondaryBtnText}
              </button>
            )}
          </div>
        </div>

        {/* SIDE COMPONENT SLOT (FORM) - FULLY REALIGNED FOR SMARTPHONE WRAPPING */}
        {formComponent && (
          <div className="w-full lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0 z-20">
            <div className="w-full max-w-md bg-transparent rounded-2xl mt-6">
              {formComponent}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
