import React, { useState } from 'react';
import { Building2, Presentation, CalendarCheck } from 'lucide-react';

export function BulkOrder() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarCheck className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Request Received!</h1>
        <p className="text-gray-600 mb-8">Our enterprise team will contact you within 24 hours with a custom quote.</p>
        <button onClick={() => setSubmitted(false)} className="text-blue-600 font-semibold hover:underline">Submit another request</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6">Enterprise Solutions</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Equip your workforce with the latest technology. Volume discounts, dedicated account managers, and MDM enrollment included.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="text-3xl font-bold mb-8">Why partner with MobiStore?</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Volume Tiering Discounts</h3>
                <p className="text-gray-600">Save up to 25% compared to retail prices on bulk orders of 10+ devices.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <Presentation className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dedicated Account Manager</h3>
                <p className="text-gray-600">Get a single point of contact for procurement, support, and billing.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border relative z-10 -mt-32 lg:mt-0">
          <h2 className="text-2xl font-bold mb-6">Request a Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
                <input required type="text" className="w-full border rounded-xl px-4 py-2 bg-gray-50 focus:bg-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
                <input required type="text" className="w-full border rounded-xl px-4 py-2 bg-gray-50 focus:bg-white" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
              <input required type="text" className="w-full border rounded-xl px-4 py-2 bg-gray-50 focus:bg-white" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Work Email</label>
              <input required type="email" className="w-full border rounded-xl px-4 py-2 bg-gray-50 focus:bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Device Model</label>
                <select className="w-full border rounded-xl px-4 py-2 bg-gray-50 focus:bg-white">
                  <option>iPhone 15 Series</option>
                  <option>Samsung Galaxy S24</option>
                  <option>Google Pixel 8</option>
                  <option>Mixed Request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Quantity</label>
                <input required type="number" min="10" placeholder="10+" className="w-full border rounded-xl px-4 py-2 bg-gray-50 focus:bg-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Additional Requirements</label>
              <textarea rows={3} className="w-full border rounded-xl px-4 py-2 bg-gray-50 focus:bg-white" placeholder="MDM enrollment, cases, etc."></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">Submit Request</button>
          </form>
        </div>

      </div>
    </div>
  );
}
