'use client';

import { useState } from 'react';

export default function UmrahBookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [status, setStatus] = useState({ loading: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '' });

    try {
      const res = await fetch("/api/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    phone: formData.whatsapp,
    message: "Umrah booking inquiry from blog page",
    packageName: "Umrah Package",
    packagePrice: "Contact for price",
  }),
});

console.log(res.status);

const data = await res.json();

console.log(data);

      if (data.success) {
        setStatus({ loading: false, message: 'Inquiry sent successfully!' });
        setTimeout(() => {
          setIsOpen(false);
          setFormData({ name: '', email: '', whatsapp: '' });
          setStatus({ loading: false, message: '' });
        }, 1500);
      } else {
        setStatus({ loading: false, message: data.message || 'Something went wrong' });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'Failed to send inquiry' });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="block w-full bg-[#F6931F] hover:bg-orange-500 active:bg-orange-600 text-white font-semibold py-3 px-5 rounded-xl transition-colors text-sm"
      >
        Book Your Umrah
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Book Your Umrah</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-black">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-[#0070A1]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-black">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-[#0070A1]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-black">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="text-black w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-[#0070A1]"
                    placeholder="+44 123 456 7890"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-[#0070A1] hover:bg-[#005a80] disabled:bg-zinc-400 text-white font-semibold py-3.5 rounded-xl transition-colors mt-3"
                >
                  {status.loading ? 'Sending...' : 'Submit Inquiry'}
                </button>

                {status.message && (
                  <p className={`text-center text-sm ${status.message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}