"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function InquiryModel({ isOpen, onClose, destination = "your destination" }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // 🌟 REPLACE WITH YOUR PRODUCTION API ENDPOINT (e.g., SendGrid, EmailJS, Formspree, or Next.js API Route)
      // const response = await fetch('/api/send-email', { method: 'POST', body: JSON.stringify({ ...formData, destination }) });
      
      // Simulating a successful network email transmission delay
      await new Promise((resolve) => setTimeout(resolve, 1400));
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email transmission failed:", error);
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-mulish">
          
          {/* Backdrop Blur Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box Window Layer */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Upper Close Toggler */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              /* Success Complete Feedback View Template */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="mb-4 rounded-full bg-green-500/10 p-3 text-green-500">
                  <CheckCircle2 size={44} />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-poppins">Inquiry Sent!</h4>
                <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                  Thank you for contacting Travel Hooks. Our travel consultants will verify your flight details and email you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-gradient-to-r from-[#E68213] to-[#0070A1] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:opacity-95 transition-all duration-300"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              /* Core Form Entry Layout Block */
              <div>
                <div className="mb-6 text-start">
                  <h3 className="font-poppins text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                    Request Booking Details
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">
                    Lock your low deposit deal for flights to <span className="text-[#0070A1] dark:text-[#F7931E] font-bold">{destination}</span>.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input Row */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Full Name</label>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 focus-within:border-[#0070A1] dark:border-zinc-800 dark:bg-zinc-900 transition-colors">
                      <User size={16} className="text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 dark:text-white dark:placeholder-zinc-600 font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Input Row */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Email Address</label>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 focus-within:border-[#0070A1] dark:border-zinc-800 dark:bg-zinc-900 transition-colors">
                      <Mail size={16} className="text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="johndoe@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 dark:text-white dark:placeholder-zinc-600 font-medium"
                      />
                    </div>
                  </div>

                  {/* Message Input Box */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Your Inquiry Message</label>
                    <div className="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2.5 focus-within:border-[#0070A1] dark:border-zinc-800 dark:bg-zinc-900 transition-colors">
                      <MessageSquare size={16} className="text-slate-400 mt-0.5" />
                      <textarea
                        required
                        rows={3}
                        placeholder={`Please provide details about flight options to ${destination}...`}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 resize-none dark:text-white dark:placeholder-zinc-600 font-medium"
                      />
                    </div>
                  </div>

                  {/* Primary Trigger Form Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E68213] to-[#0070A1] py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:opacity-95 active:scale-[0.98] disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Submit Email Inquiry</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
