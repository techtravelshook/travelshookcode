"use client";
import React, { useState } from "react";
import { Plane, Calendar, Heart, ShieldCheck, ChevronRight, Compass } from "lucide-react";

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { label: "Flights", icon: Plane },
    { label: "Holidays", icon: Calendar },
    { label: "Romantic Packages", icon: Heart },
    { label: "Umrah Packages", icon: ShieldCheck },
  ];

  return (
    <aside className="h-screen w-64 bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800 shadow-xl flex-shrink-0">
      {/* Logo / Brand */}
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md shadow-indigo-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">
              TravelsHook
            </h1>
            <p className="text-xs text-slate-500 font-medium">Dashboard</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
                  isActive
                    ? "bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/10"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-indigo-400"
                    }`}
                  />
                  <span className="text-sm tracking-wide">{item.label}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-200 ${
                    isActive
                      ? "text-white opacity-100"
                      : "text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/40 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            M
          </div>
          <div className="truncate">
            <p className="text-sm font-medium text-slate-200 truncate">Morgan</p>
            <p className="text-xs text-slate-500 truncate">morgan@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}