"use client";
import Image from "next/image";
import React from "react";

export default function Banner({
  title = "Umrah Package ",
  highlightText = "Customizer App",
  description = "Discover premium destinations, unbeatable airfare deals, and seamless travel experiences worldwide.",
  bgImage = "/imgs/slider01.webp",
}) {
  return (
    <main className="font-mulish overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-[#01080C] dark:text-white">

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-[800px]">
  <Image
    src={bgImage}
    alt={`${title} ${highlightText} Hero`}
    fill
    priority
    className="object-cover object-center "
  />
</div>


        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#01080C]" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 pt-32 pb-16 sm:px-6 md:px-8 lg:pt-40">

          {/* TEXT CONTENT */}
          <div className="w-full text-center">

            {/* HEADING */}
            <h1 className="mx-auto max-w-3xl text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {title}{"  "}
              <span className="bg-gradient-to-r from-[#E68213] to-[#0070A1] bg-clip-text text-transparent">
                {highlightText}
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
              {description}
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
