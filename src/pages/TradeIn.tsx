import React, { useState } from 'react';
import { Smartphone, Check, ArrowRight } from 'lucide-react';

export function TradeIn() {
  const [step, setStep] = useState(1);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setEstimatedValue(Math.floor(Math.random() * (45000 - 5000 + 1) + 5000));
    setStep(2);
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Trade-in & Upgrade</h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Get credit towards your next device. We accept phones from all major brands in any condition.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border p-8 md:p-12">
          
          {step === 1 && (
            <form onSubmit={calculateEstimate} className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">What device do you have?</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                <select required className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:border-blue-500 focus:bg-white outline-none transition">
                  <option value="">Select Brand</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                  <option value="oneplus">OnePlus</option>
                  <option value="google">Google</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Model</label>
                <input required type="text" placeholder="e.g. iPhone 13 Pro Max" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:border-blue-500 focus:bg-white outline-none transition" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Condition</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Flawless', 'Good', 'Cracked'].map((cond, i) => (
                    <label key={cond} className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 transition relative">
                      <input type="radio" name="condition" value={cond} defaultChecked={i===0} className="sr-only" />
                      <div className="font-bold text-gray-900">{cond}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {cond === 'Flawless' && 'Like new, no scratches'}
                        {cond === 'Good' && 'Normal wear and tear'}
                        {cond === 'Cracked' && 'Cracked screen or body'}
                      </div>
                      <Check className="w-5 h-5 text-blue-600 absolute top-4 right-4 opacity-0 [&:not(:checked)]:hidden" />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-blue-600 text-white rounded-full py-4 font-bold text-lg shadow-lg hover:bg-blue-700 transition">Get Estimate</button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Estimated Credit</h2>
              <div className="text-6xl font-black text-blue-600 my-8">₹{estimatedValue?.toLocaleString('en-IN')}</div>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">This estimate is valid for 14 days. Ship your device to us for free to lock in this price.</p>
              
              <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-dashed border-gray-300">
                <div className="text-sm font-bold text-gray-700 mb-2">Promo Code to apply at checkout:</div>
                <div className="text-2xl font-mono font-bold tracking-widest bg-gray-200 px-4 py-2 inline-block rounded-lg text-gray-900">
                  TRADEIN{Math.floor(Math.random() * 900) + 100}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-gray-200 rounded-full font-bold text-gray-700 hover:bg-gray-50">Recalculate</button>
                <button onClick={() => window.location.href = '/products'} className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold flex items-center hover:bg-blue-700">Shop New Phones <ArrowRight className="w-4 h-4 ml-2" /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
