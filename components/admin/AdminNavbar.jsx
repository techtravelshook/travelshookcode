"use client";
import React, { useState } from "react";
import { Bell, Search, Moon, Sun, Settings } from "lucide-react";

export default function AdminNavbar() {
  const [dark, setDark] = useState(true);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      {/* Left: Search */}
      <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-72">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-slate-600 outline-none w-full placeholder:text-slate-400"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
        >
          {dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          M
        </div>
      </div>
    </header>
  );
}