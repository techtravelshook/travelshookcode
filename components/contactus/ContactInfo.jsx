import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const ContactInfo = () => {
   const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/contactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "Contact Form",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        
       

        {/* RIGHT SIDE: Banner Image Container */}
       <div className="hidden md:block relative min-h-[350px] md:min-h-full w-full rounded-2xl overflow-hidden">
  <Image
    src="/imgs/contactus.jpg"
    alt="Contact Us Visual"
    fill
    priority
    className="object-cover object-center"
  />
</div>
        
         <div className="flex flex-col justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
           <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>

                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden w-full bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] mt-6 hover:from-[#F6931F] hover:to-[#da7d14] text-white font-bold text-xs uppercase tracking-[0.15em] py-3.5 px-4 rounded-xl shadow-md shadow-[#0070A1]/10 hover:shadow-[#F6931F]/10 transform active:scale-[0.99] transition-all duration-500 ease-out group disabled:opacity-70"
              >
                <span className="relative z-10">
                  {loading ? "Sending..." : "Send Message"}
                </span>
              </button>
            </form>
          </div>

          {/* Submit Button (Positioned Below the Form Inputs) */}
       

        </div>

      </div>
    </section>
  )
}

export default ContactInfo
