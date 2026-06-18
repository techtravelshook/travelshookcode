export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 px-4 pt-60">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#0B1F33] tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-slate-600 max-w-md mx-auto">
            Please read these terms carefully before using our services
          </p>
          <div className="h-1 w-20 bg-[#F6931F] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="prose prose-slate max-w-none bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-[#E7E2D6]">
          
          <p className="text-lg leading-relaxed text-slate-700">
            <strong>Travelshook</strong> is a brand of <strong>Seven Zones Services LTD (Company No. 09784212)</strong>. 
            By accessing or using this website and making any booking, you agree to be bound by these Terms and Conditions.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">1. Your Booking and Agreement</h2>
          <p className="text-slate-600 leading-relaxed">
            Any order for services placed on our website and verified by us is referred to as a booking. 
            Your booking is confirmed only when full payment is received and a confirmation email is sent. 
            All travelers are responsible for completing payments, providing documents, and meeting deadlines.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">2. Travel Supplier</h2>
          <p className="text-slate-600 leading-relaxed">
            Travelshook acts as an agent for third-party Travel Suppliers (hotels, airlines, car rentals, etc.). 
            Your contract is with the supplier, not with Travelshook. We do not take responsibility for the performance of these suppliers.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">3. Flight Booking Terms &amp; Conditions</h2>
          <p className="text-slate-600 leading-relaxed">
            Economy tickets are generally non-refundable and non-changeable. You must travel in the order of the itinerary. 
            Missing the first flight may result in cancellation of the entire ticket.
          </p>
          <ul className="list-none space-y-3 mt-6">
            <li className="flex gap-3">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Notify us of any name/date changes within 24 hours of receiving confirmation.
            </li>
            <li className="flex gap-3">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Always reconfirm return flights 72 hours before departure.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">4. Hotel Bookings</h2>
          <p className="text-slate-600 leading-relaxed">
            Hotel bookings are subject to availability. If the requested hotel is unavailable, a comparable alternative will be offered. 
            Deposits are generally non-refundable.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">5. Passport, Visa &amp; Health Requirements</h2>
          <ul className="list-none space-y-4 text-slate-600">
            <li className="flex gap-3">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Passport must be valid for at least 6 months beyond your return date.
            </li>
            <li className="flex gap-3">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              You are responsible for obtaining the correct visa and travel documents.
            </li>
            <li className="flex gap-3">
              <span className="text-[#F6931F] text-xl leading-none mt-0.5">→</span>
              Travelshook does not issue visas. We only assist with applications.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">6. Cancellation Policy</h2>
          <p className="text-slate-600 leading-relaxed">
            Cancellations after ticket issuance are generally non-refundable. Deposits are non-refundable. 
            Please check specific supplier cancellation policies at the time of booking.
          </p>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">7. Force Majeure</h2>
          <p className="text-slate-600 leading-relaxed">
            Travelshook is not liable for any delays, cancellations, or changes caused by events beyond our control 
            (wars, natural disasters, pandemics, government restrictions, etc.).
          </p>

          <div className="bg-[#F7F5F0] border-l-4 border-[#F6931F] p-6 my-10 rounded-r-2xl">
            <p className="text-sm italic text-slate-600">
              <strong>Note:</strong> We strongly recommend purchasing comprehensive travel insurance to protect against unforeseen circumstances.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#0B1F33] mt-12 mb-6">8. General Terms</h2>
          <p className="text-slate-600 leading-relaxed">
            By making a booking, you confirm that you have read, understood, and accepted these Terms and Conditions. 
            Travelshook reserves the right to update these terms at any time.
          </p>

        </div>

        <div className="text-center text-xs text-slate-500 mt-12">
          Last updated: June 2026 • TravelsHook LTD
        </div>
      </div>
    </div>
  );
}