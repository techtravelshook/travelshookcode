import React from 'react';

export default function PackageForm({ 
  form, 
  setForm, 
  loading, 
  handleSubmit, 
  handleChange 
}) {
  const addItem = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setForm((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-3xl shadow-xl p-10">
       <div className="mb-10 rounded-3xl bg-gradient-to-r from-[#0070A1] to-[#E68213] p-10 text-white shadow-xl">
    <h1 className="text-4xl font-bold">
        {form.id ? "Edit Umrah Package" : "Add New Umrah Package"}
    </h1>

    <p className="mt-2 text-white/80 text-lg">
        Create beautiful Umrah packages with hotels, pricing, inclusions and images.
    </p>
</div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
    Package Title
</label>
              <input
                type="text"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-emerald-500"
                placeholder="7 Nights 5 Star Umrah Package"
              />
            </div>

            <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
   Price (£)
</label>
             
              <input
                type="number"
                name="price"
                value={form.price || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-emerald-500"
                placeholder="850"
              />
            </div>
          </div>

          <div>
             <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
  
</label>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <input
              type="text"
              name="shortDesc"
              value={form.shortDesc || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Makkah: Swissotel (5 Nights) | Madinah: Pullman Zamzam (5 Nights)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Detailed package description..."
            />
          </div>

          {/* Hotels & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Nights)</label>
              <input
                type="number"
                name="duration"
                value={form.duration || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Makkah Hotel</label>
              <input
                type="text"
                name="makkahHotel"
                value={form.makkahHotel || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Madinah Hotel</label>
              <input
                type="text"
                name="madinahHotel"
                value={form.madinahHotel || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Star, Type, Month, Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
              <select
                name="star"
                value={form.star}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="STAR_3">3 Star</option>
                <option value="STAR_4">4 Star</option>
                <option value="STAR_5">5 Star</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="NORMAL">Normal</option>
                <option value="LUXURY">Luxury</option>
                <option value="CHEAP">Budget</option>
                <option value="WOMEN">Women Only</option>
                <option value="MONTHLY">Monthly</option>
                <option value="RAMADAN">Ramadan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month (Optional)</label>
              <input
                type="text"
                name="month"
                value={form.month || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="January"
              />
            </div>

            <div className="flex items-center pt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured || false}
                  onChange={handleChange}
                  className="w-5 h-5 accent-emerald-600"
                />
                <span className="text-sm font-medium text-gray-700">Mark as Featured</span>
              </label>
            </div>
          </div>

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Images (URLs)</label>
              <button
                type="button"
                onClick={() => addItem('images')}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
              >
                + Add Image
              </button>
            </div>
            {form.images.map((img, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={img || ""}
                  onChange={(e) => updateArrayItem('images', index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="imgs/hajj/hajj22.jpg"
                />
                <button
                  type="button"
                  onClick={() => removeItem('images', index)}
                  className="px-4 text-red-500 hover:bg-red-50 rounded-xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Inclusions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Inclusions</label>
              <button
                type="button"
                onClick={() => addItem('inclusions')}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
              >
                + Add Inclusion
              </button>
            </div>
            {form.inclusions.map((item, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={item || ""}
                  onChange={(e) => updateArrayItem('inclusions', index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="Return Flights"
                />
                <button
                  type="button"
                  onClick={() => removeItem('inclusions', index)}
                  className="px-4 text-red-500 hover:bg-red-50 rounded-xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Exclusions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Exclusions</label>
              <button
                type="button"
                onClick={() => addItem('exclusions')}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
              >
                + Add Exclusion
              </button>
            </div>
            {form.exclusions.map((item, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={item || ""}
                  onChange={(e) => updateArrayItem('exclusions', index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="Personal Expenses"
                />
                <button
                  type="button"
                  onClick={() => removeItem('exclusions', index)}
                  className="px-4 text-red-500 hover:bg-red-50 rounded-xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-4 rounded-2xl text-lg transition-colors mt-6"
          >
            {loading ? "Adding Package..." : "Add Package"}
          </button>
        </form>
      </div>
    </div>
  );
}