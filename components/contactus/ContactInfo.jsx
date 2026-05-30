import React from 'react'
import Image from 'next/image'

const ContactInfo = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* LEFT SIDE: Contact Form */}
       

        {/* RIGHT SIDE: Banner Image Container */}
        <div className="relative min-h-[350px] md:min-h-full w-full rounded-2xl overflow-hidden">
          <Image
            src="/imgs/contact_us.jpg" 
            alt="Contact Us Visual"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
         <div className="flex flex-col justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>


 <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="(123) 456-7890" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
            </form>
          </div>

          {/* Submit Button (Positioned Below the Form Inputs) */}
         <button 
  type="submit" 
  className="relative overflow-hidden w-full bg-gradient-to-r from-[#F6931F] via-[#ffb347] to-[#0070A1] mt-6 hover:from-[#F6931F] hover:to-[#da7d14] text-white font-bold text-xs uppercase tracking-[0.15em] py-3.5 px-4 rounded-xl shadow-md shadow-[#0070A1]/10 hover:shadow-[#F6931F]/10 transform active:scale-[0.99] transition-all duration-500 ease-out group"
>
  <span className="relative z-10 " >Send Message</span>
  
  {/* Elegant Hover Overlay Shimmer Layer */}
  <div className="absolute inset-0    bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
</button>

        </div>

      </div>
    </section>
  )
}

export default ContactInfo
