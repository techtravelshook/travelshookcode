import { Star, ShieldCheck } from "lucide-react";

export function TrustComplianceBanner() {
  return (
    <section className="bg-white dark:bg-black py-12 border-t border-b border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><ShieldCheck size={28} /></div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-lg">100% Financial Protection Guaranteed</h4>
            <p className="text-xs text-slate-400 mt-0.5">Your money and bookings are fully safe under global aviation rules & escrow standards.</p>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-white/[0.03] px-6 py-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-3">
          <span className="text-sm font-black text-slate-700 dark:text-zinc-200">Excellent on Trustpilot</span>
          <div className="flex gap-0.5 text-emerald-500">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
        </div>
      </div>
    </section>
  );
}
