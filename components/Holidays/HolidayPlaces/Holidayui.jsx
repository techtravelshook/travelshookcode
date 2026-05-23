// ─────────────────────────────────────────────
//  SHARED UI PRIMITIVES
// ─────────────────────────────────────────────
import { Star } from "lucide-react";

export function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-amber-400">
      <Star size={12} fill="currentColor" />
      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export function AmenityPill({ label }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/5">
      {label}
    </span>
  );
}