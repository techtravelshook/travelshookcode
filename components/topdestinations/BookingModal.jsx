'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, destination }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    
    // Travel Details
    startDate: '',
    numberOfTravelers: '1',
    
    // Traveler Details
    travelers: [{ name: '', age: '', nationality: '' }],
    
    // Special Requirements
    specialRequirements: '',
    dietaryRestrictions: '',
    
    // Preferences
    accommodationType: 'standard',
    paymentMethod: 'card',
    termsAccepted: false,
  });

  const validateStep = (stepNum) => {
    const newErrors = {};

    if (stepNum === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
    }

    if (stepNum === 2) {
      if (!formData.startDate) newErrors.startDate = 'Travel date is required';
      if (!formData.numberOfTravelers) newErrors.numberOfTravelers = 'Number of travelers is required';
    }

    if (stepNum === 3) {
      formData.travelers.forEach((traveler, idx) => {
        if (!traveler.name.trim()) newErrors[`traveler_${idx}_name`] = 'Name is required';
        if (!traveler.age) newErrors[`traveler_${idx}_age`] = 'Age is required';
      });
    }

    if (stepNum === 4) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleTravelerChange = (index, field, value) => {
    const newTravelers = [...formData.travelers];
    newTravelers[index] = { ...newTravelers[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      travelers: newTravelers
    }));
    // Clear error
    if (errors[`traveler_${index}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`traveler_${index}_${field}`]: undefined
      }));
    }
  };

  const addTraveler = () => {
    setFormData(prev => ({
      ...prev,
      travelers: [...prev.travelers, { name: '', age: '', nationality: '' }]
    }));
  };

  const removeTraveler = (index) => {
    setFormData(prev => ({
      ...prev,
      travelers: prev.travelers.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setStep(1);
        setSubmitted(false);
      }, 3000);
    }, 2000);
  };

  const handleNumberOfTravelersChange = (newCount) => {
    const count = parseInt(newCount);
    const currentCount = formData.travelers.length;
    
    let newTravelers = [...formData.travelers];
    
    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        newTravelers.push({ name: '', age: '', nationality: '' });
      }
    } else if (count < currentCount) {
      newTravelers = newTravelers.slice(0, count);
    }
    
    setFormData(prev => ({
      ...prev,
      numberOfTravelers: newCount,
      travelers: newTravelers
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="dark:bg-zinc-900 bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 border dark:border-zinc-800 border-zinc-200 overflow-hidden">
        
        {/* Header */}
        <div className="dark:bg-gradient-to-r dark:from-zinc-800 dark:to-zinc-900 bg-gradient-to-r from-zinc-100 to-zinc-50 px-8 py-6 flex justify-between items-center border-b dark:border-zinc-800 border-zinc-200">
          <div>
            <h2 className="text-2xl font-bold dark:text-white text-zinc-950">Book Your Journey</h2>
            <p className="text-sm dark:text-zinc-400 text-zinc-600 mt-1">
              {destination?.title && `to ${destination.title}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-8 pt-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-2 flex-1 mx-1 rounded-full transition-all ${
                  s <= step
                    ? 'bg-gradient-to-r from-[#FFA43A] to-[#2FA8DF]'
                    : 'dark:bg-zinc-800 bg-zinc-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-400 mb-6">
            Step {step} of 4
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-8 py-6 max-h-[calc(80vh-200px)] overflow-y-auto">
          
          {/* STEP 1: PERSONAL INFORMATION */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg font-semibold dark:text-white text-zinc-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border transition-all ${
                      errors.firstName
                        ? 'dark:border-red-500 border-red-500'
                        : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                    } dark:text-white text-zinc-900 focus:outline-none`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border transition-all ${
                      errors.lastName
                        ? 'dark:border-red-500 border-red-500'
                        : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                    } dark:text-white text-zinc-900 focus:outline-none`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border transition-all ${
                    errors.email
                      ? 'dark:border-red-500 border-red-500'
                      : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                  } dark:text-white text-zinc-900 focus:outline-none`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border transition-all ${
                    errors.phone
                      ? 'dark:border-red-500 border-red-500'
                      : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                  } dark:text-white text-zinc-900 focus:outline-none`}
                  placeholder="+44 7700 900000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border transition-all ${
                    errors.country
                      ? 'dark:border-red-500 border-red-500'
                      : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                  } dark:text-white text-zinc-900 focus:outline-none`}
                  placeholder="United Kingdom"
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: TRAVEL DETAILS */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg font-semibold dark:text-white text-zinc-900 mb-6">Travel Details</h3>
              
              <div>
                <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                  Departure Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border transition-all ${
                    errors.startDate
                      ? 'dark:border-red-500 border-red-500'
                      : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                  } dark:text-white text-zinc-900 focus:outline-none`}
                />
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-3">
                  Number of Travelers *
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleNumberOfTravelersChange(num.toString())}
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        formData.numberOfTravelers === num.toString()
                          ? 'bg-gradient-to-r from-[#FFA43A] to-[#2FA8DF] text-white shadow-lg'
                          : 'dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 hover:dark:bg-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {num}{num > 1 ? '' : ''}
                    </button>
                  ))}
                </div>
                {errors.numberOfTravelers && <p className="text-red-500 text-xs mt-2">{errors.numberOfTravelers}</p>}
              </div>

              <div className="dark:bg-zinc-800/50 bg-blue-50/50 p-4 rounded-xl border dark:border-zinc-700 border-blue-200">
                <p className="text-sm dark:text-zinc-300 text-zinc-700">
                  💡 <strong>Tip:</strong> You can add more travelers in the next step with their personal details.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                  Accommodation Preference
                </label>
                <select
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:border-amber-500 transition-all"
                >
                  <option value="standard">Standard Hotel</option>
                  <option value="premium">Premium Hotel</option>
                  <option value="luxury">Luxury Resort</option>
                  <option value="boutique">Boutique Hotel</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: TRAVELER DETAILS */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg font-semibold dark:text-white text-zinc-900 mb-6">Traveler Information</h3>
              
              {formData.travelers.map((traveler, index) => (
                <div key={index} className="dark:bg-zinc-800/30 bg-zinc-50/50 p-5 rounded-2xl border dark:border-zinc-700 border-zinc-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium dark:text-white text-zinc-900">
                      Traveler {index + 1}
                    </h4>
                    {formData.travelers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTraveler(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={traveler.name}
                        onChange={(e) => handleTravelerChange(index, 'name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-white border transition-all ${
                          errors[`traveler_${index}_name`]
                            ? 'dark:border-red-500 border-red-500'
                            : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                        } dark:text-white text-zinc-900 focus:outline-none`}
                        placeholder="Full name"
                      />
                      {errors[`traveler_${index}_name`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`traveler_${index}_name`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={traveler.age}
                        onChange={(e) => handleTravelerChange(index, 'age', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-white border transition-all ${
                          errors[`traveler_${index}_age`]
                            ? 'dark:border-red-500 border-red-500'
                            : 'dark:border-zinc-700 border-zinc-300 focus:border-amber-500'
                        } dark:text-white text-zinc-900 focus:outline-none`}
                        placeholder="Age"
                      />
                      {errors[`traveler_${index}_age`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`traveler_${index}_age`]}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={traveler.nationality}
                      onChange={(e) => handleTravelerChange(index, 'nationality', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:border-amber-500 transition-all"
                      placeholder="e.g., British"
                    />
                  </div>
                </div>
              ))}

              {parseInt(formData.numberOfTravelers) > formData.travelers.length && (
                <button
                  type="button"
                  onClick={addTraveler}
                  className="w-full py-3 border-2 border-dashed dark:border-zinc-700 border-zinc-300 rounded-xl dark:text-zinc-400 text-zinc-600 font-medium hover:dark:bg-zinc-800/50 hover:bg-zinc-100/50 transition-all"
                >
                  + Add Traveler
                </button>
              )}

              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                    Dietary Restrictions
                  </label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    placeholder="e.g., Vegetarian, Vegan, Gluten-free, etc."
                    className="w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:border-amber-500 transition-all resize-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-zinc-300 text-zinc-700 mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="e.g., Wheelchair accessibility, medical needs, activity preferences..."
                    className="w-full px-4 py-3 rounded-xl dark:bg-zinc-800 bg-zinc-50 border dark:border-zinc-700 border-zinc-300 dark:text-white text-zinc-900 focus:outline-none focus:border-amber-500 transition-all resize-none"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg font-semibold dark:text-white text-zinc-900 mb-6">Review & Confirm</h3>
              
              <div className="dark:bg-zinc-800/50 bg-amber-50/50 border dark:border-zinc-700 border-amber-200 rounded-xl p-5 space-y-3">
                <h4 className="font-semibold dark:text-white text-zinc-900">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="dark:text-zinc-400 text-zinc-600">Destination:</span>
                    <span className="font-medium dark:text-white text-zinc-900">{destination?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-zinc-400 text-zinc-600">Traveler:</span>
                    <span className="font-medium dark:text-white text-zinc-900">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-zinc-400 text-zinc-600">Number of People:</span>
                    <span className="font-medium dark:text-white text-zinc-900">{formData.numberOfTravelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-zinc-400 text-zinc-600">Departure Date:</span>
                    <span className="font-medium dark:text-white text-zinc-900">{formData.startDate || 'Not selected'}</span>
                  </div>
                  <div className="border-t dark:border-zinc-700 border-amber-300 pt-2 mt-2 flex justify-between font-bold">
                    <span>Total Price:</span>
                    <span className="text-amber-600">£{(parseInt(destination?.price || 0) * parseInt(formData.numberOfTravelers)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded cursor-pointer"
                  />
                  <span className="text-sm dark:text-zinc-300 text-zinc-700 group-hover:dark:text-zinc-200 group-hover:text-zinc-800 transition-colors">
                    I agree to the <span className="font-semibold dark:text-white text-zinc-900">Terms & Conditions</span> and <span className="font-semibold dark:text-white text-zinc-900">Privacy Policy</span>. I understand that a 10% deposit is required to confirm the booking.
                  </span>
                </label>
                {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
              </div>

              <div className="dark:bg-zinc-800/30 bg-green-50/50 p-4 rounded-xl border dark:border-zinc-700 border-green-200">
                <p className="text-sm dark:text-zinc-300 text-zinc-700">
                  ✓ <strong>Secure Booking:</strong> Your information is encrypted and secure. We&apos;ll send a confirmation email with payment details.
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {submitted && (
            <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
              <div className="w-16 h-16 dark:bg-green-500/20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold dark:text-white text-zinc-900 mb-2">Booking Submitted!</h3>
              <p className="dark:text-zinc-400 text-zinc-600 text-center mb-2">
                We&apos;ve received your booking request and will send confirmation details to your email shortly.
              </p>
              <p className="text-sm dark:text-zinc-500 text-zinc-500">
                Redirecting... Please check your email.
              </p>
            </div>
          )}
        </form>

        {/* Footer / Navigation */}
        {!submitted && (
          <div className="px-8 py-6 border-t dark:border-zinc-800 border-zinc-200 flex justify-between gap-4">
            {step > 1 && (
              <button
                onClick={handlePrev}
                className="px-6 py-3 rounded-xl dark:bg-zinc-800 dark:hover:bg-zinc-700 bg-zinc-100 hover:bg-zinc-200 dark:text-white text-zinc-900 font-medium transition-all"
              >
                Previous
              </button>
            )}
            <div className="flex-1" />
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-[#FFA43A] to-[#2FA8DF] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-[#FFA43A] to-[#2FA8DF] text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                    Processing...
                  </>
                ) : (
                  'Complete Booking'
                )}
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}