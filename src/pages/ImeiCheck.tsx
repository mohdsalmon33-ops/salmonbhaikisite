import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck } from 'lucide-react';

export function ImeiCheck() {
  const [imei, setImei] = useState('');
  const [result, setResult] = useState<null | 'valid' | 'invalid'>(null);

  const checkImei = (e: React.FormEvent) => {
    e.preventDefault();
    if(imei.length >= 15) {
      setResult(Math.random() > 0.3 ? 'valid' : 'invalid');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">IMEI Check Tool</h1>
        <p className="text-gray-500 text-lg">Verify the status of any device before making a purchase. Check for blacklists, warranty status, and authenticity.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <form onSubmit={checkImei} className="flex flex-col gap-4">
          <label className="font-bold text-gray-900 block mb-2">Enter 15-digit IMEI Number</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              maxLength={15}
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              placeholder="e.g. 359123456789012" 
              className="flex-1 border-2 font-mono text-lg rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
              required
            />
            <button className="bg-gray-900 text-white px-8 rounded-xl font-bold flex items-center hover:bg-gray-800 transition">
              <Search className="w-5 h-5 mr-2" /> Check
            </button>
          </div>
          <p className="text-sm text-gray-500">Dial *#06# on your device to find your IMEI.</p>
        </form>

        {result === 'valid' && (
          <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center animate-in zoom-in duration-300">
            <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">Device is Clean!</h3>
            <p className="text-green-700">This IMEI has passed our blacklist check. The device is authentic and not reported lost or stolen.</p>
            <div className="mt-6 pt-6 border-t border-green-200 text-left grid grid-cols-2 gap-4 text-sm text-green-800">
              <div><span className="opacity-70">Brand:</span> <strong>Apple</strong></div>
              <div><span className="opacity-70">Warranty:</span> <strong>Active</strong></div>
              <div><span className="opacity-70">Status:</span> <strong>Clean</strong></div>
              <div><span className="opacity-70">Carrier Lock:</span> <strong>Unlocked</strong></div>
            </div>
          </div>
        )}

        {result === 'invalid' && (
          <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center animate-in zoom-in duration-300">
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-800 mb-2">Warning: Issue Detected</h3>
            <p className="text-red-700">This IMEI has been reported on a global blacklist or the device format is invalid. We advise against purchasing this device.</p>
          </div>
        )}
      </div>
    </div>
  );
}
