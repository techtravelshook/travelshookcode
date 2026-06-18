// components/Holidays/BookingModal.jsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Plane, Shield, CheckCircle2, ChevronRight, Users, Calendar } from 'lucide-react';
import Image from 'next/image';
import axios from "axios";

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < count ? "fill-amber-400 stroke-amber-400" : "fill-transparent stroke-white/30"}
        />
      ))}
    </div>
  );
}

export default function BookingModal({ pkg, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', guests: '2', message: '' });
 const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);

  if (!pkg) return null;

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const { data } = await axios.post("/api/holidayroute", {
      packageName: pkg.title,
      packagePrice: pkg.price,
      duration: pkg.duration,
      category: pkg.category,

      name: form.name,
      email: form.email,
      phone: form.phone,

      preferredDate: form.date,
      guests: form.guests,
      message: form.message,
    });

    if (data.success) {
      setSubmitted(true);
    } else {
      alert(data.message || "Failed to send enquiry.");
    }
  } catch (err) {
    console.error(err);
    alert(
      err.response?.data?.message ||
        "Something went wrong. Please try again."
    );
  }

  setLoading(false);
};

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header image strip ── */}
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={`/${pkg.image}`}
              alt={pkg.title}
              fill
              className="object-cover"
              sizes="672px"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(15,15,15,1))' }}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <X size={16} className="text-white" />
            </button>
            <div className="absolute bottom-4 left-5 right-5">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {pkg.category}
              </span>
              <h2 className="text-white font-black text-lg leading-tight mt-0.5">
                {pkg.title}
              </h2>
            </div>
          </div>

          {/* ── Price + quick info bar ── */}
          <div
            className="flex items-center gap-6 px-5 py-3 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest">From</p>
              <p className="text-2xl font-black text-amber-400">
                £{pkg.price.toLocaleString()}
                <span className="text-sm font-normal text-white/40 ml-1">pp</span>
              </p>
            </div>
            {pkg.duration && (
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <Clock size={13} className="text-amber-400" />
                {pkg.duration}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Plane size={13} className="text-amber-400" />
              {pkg.features[0]}
            </div>
            <div className="ml-auto">
              <StarRow count={pkg.rating} />
            </div>
          </div>

          {/* ── Form / Success ── */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-2">
                {[1, 2].map((s) => (
                  <React.Fragment key={s}>
                    <div
                      className="flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                      style={{ color: step === s ? '#f59e0b' : 'rgba(255,255,255,0.3)' }}
                      onClick={() => s < step && setStep(s)}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                        style={{
                          background: step === s ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                          color: step === s ? '#000' : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {s}
                      </span>
                      {s === 1 ? 'Your Details' : 'Travel Info'}
                    </div>
                    {s < 2 && <ChevronRight size={12} className="text-white/20" />}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-widest mb-1 block">
                        Full Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:ring-1 focus:ring-amber-400"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-widest mb-1 block">
                        Phone
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+44 7700 000000"
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:ring-1 focus:ring-amber-400"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-widest mb-1 block">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:ring-1 focus:ring-amber-400"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => form.name && form.email && form.phone && setStep(2)}
                    className="w-full py-3 rounded-xl font-bold text-sm text-black"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                  >
                    Continue →
                  </button>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Calendar size={11} /> Preferred Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-amber-400"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          colorScheme: 'dark',
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Users size={11} /> Guests
                      </label>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-amber-400"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8,9,10].map((n) => (
                          <option key={n} value={n} className='text-black'>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                   
                  </div>

                  {/* Price summary */}
                  <div
                    className="rounded-xl p-3 flex items-center justify-between"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                  >
                    <p className="text-xs text-white/60">
                      {form.guests} × £{pkg.price.toLocaleString()}
                    </p>
                    <p className="text-amber-400 font-black text-lg">
                      £{(pkg.price * Number(form.guests)).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 rounded-xl font-bold text-sm text-white/60"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 rounded-xl font-black text-sm text-black flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                    >
                      <Shield size={15} />
                      Confirm Enquiry
                    </button>
                  </div>
                </motion.div>
              )}

              <p className="text-center text-[13px] text-white/25 pt-1">
                🔒 ATOL Protected · No payment required · We&apos;ll call you within 24h
              </p>
            </form>
          ) : (
            /* ── Success state ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} className="text-amber-400" />
              </div>
              <h3 className="text-white font-black text-xl mb-2">Enquiry Submitted!</h3>
              <p className="text-white/50 text-sm mb-6">
                Thanks <strong className="text-white">{form.name}</strong>! Our team will contact you at{' '}
                <strong className="text-white">{form.email}</strong> within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl font-bold text-sm text-black"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                Done
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}