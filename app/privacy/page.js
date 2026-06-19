export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-40 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#0B1F33] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-600 max-w-md mx-auto">
            Last Updated: June 2026
          </p>
          <div className="h-1 w-20 bg-[#F6931F] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="prose prose-slate max-w-none bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-[#E7E2D6] leading-relaxed">
          
          <p className="text-lg text-slate-700">
            At <strong>Travelshook</strong>, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">1. Information We Collect</h2>
          <p className="text-slate-600">
            We may collect the following types of information:
          </p>
          <ul className="list-none space-y-3 mt-4">
            <li className="flex gap-3 text-slate-600">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Personal Information (Name, Email, Phone Number, Passport Details)
            </li>
            <li className="flex gap-3 text-slate-600">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Booking Information (Travel Dates, Destinations, Preferences)
            </li>
            <li className="flex gap-3 text-slate-600">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Technical Data (IP Address, Browser Type, Device Information)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">2. How We Use Your Information</h2>
          <p className="text-slate-600">
            We use your information to:
          </p>
          <ul className="list-none space-y-3 mt-4">
            <li className="flex gap-3 text-slate-600">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Process and manage your travel bookings
            </li>
            <li className="flex gap-3 text-slate-600">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Communicate with you regarding your reservations
            </li>
            <li className="flex gap-3 text-slate-600">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Improve our website and customer service
            </li>
            <li className="flex gap-3 text-slate-600">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Send important updates and promotional offers (you can opt-out anytime)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">3. Sharing Your Information</h2>
          <p className="text-slate-600">
            We may share your information with trusted third parties such as airlines, hotels, and visa processing agencies 
            solely for the purpose of fulfilling your travel arrangements. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">4. Data Security</h2>
          <p className="text-slate-600">
            We implement appropriate technical and organizational measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">5. Your Rights</h2>
          <p className="text-slate-600">
            You have the right to access, correct, or delete your personal data. You may also withdraw your consent at any time 
            by contacting us.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">6. Cookies</h2>
          <p className="text-slate-600">
            Our website uses cookies to enhance user experience. You can manage your cookie preferences through your browser settings.
          </p>

          <div className="bg-[#F7F5F0] border-l-4 border-[#F6931F] p-6 my-10 rounded-r-2xl">
            <p className="text-sm  text-slate-600">
              <strong>Note:</strong> By using our website, you consent to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">7. Contact Us</h2>
          <p className="text-slate-600">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <strong>support@travelshook.com</strong>
          </p>

        </div>

        <div className="text-center text-xs text-slate-500 mt-12">
          © 2026 Travelshook • Seven Zones Services LTD (Company No. 09784212)
        </div>
      </div>
    </div>
  );
}