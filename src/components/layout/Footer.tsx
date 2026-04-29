import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl text-slate-800 border-t border-white/50 font-sans mt-auto pb-20 md:pb-0">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-slate-800 text-lg font-black mb-4 tracking-tight drop-shadow-sm">MobiStore</h3>
            <p className="text-sm text-slate-600 font-medium">The premier destination for the latest mobile technology. Expert reviews, competitive prices.</p>
          </div>
          <div>
            <h4 className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-xs">Shop</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><Link to="/products" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">All Phones</Link></li>
              <li><Link to="/refurbished" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">Certified Refurbished</Link></li>
              <li><Link to="/trade-in" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">Trade-In Program</Link></li>
              <li><Link to="/flash-sales" className="text-red-500 hover:text-red-600 hover:translate-x-1 inline-block transition-transform">Flash Deals ⚡</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-xs">Customer Support</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><Link to="/order-tracking" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">Track Order</Link></li>
              <li><Link to="/returns" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">Returns & Refunds</Link></li>
              <li><Link to="/imei-check" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">IMEI Check</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-500 font-bold mb-4 uppercase tracking-wider text-xs">Business</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><Link to="/bulk-order" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform">Corporate / Bulk</Link></li>
              <li><Link to="/admin" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-transform text-blue-500">Admin Portal</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Desktop Bottom Bar */}
      <div className="h-12 bg-white/20 backdrop-blur-sm px-8 items-center justify-between text-[11px] font-bold border-t border-white/50 text-slate-500 hidden md:flex">
        <div className="flex gap-6 max-w-[1200px] w-full mx-auto">
          <span className="opacity-80">&copy; {new Date().getFullYear()} MobiStore. All rights reserved.</span>
          <Link to="/privacy" className="opacity-70 hover:opacity-100 hover:text-blue-600 transition-all">Privacy Policy</Link>
          <Link to="/terms" className="opacity-70 hover:opacity-100 hover:text-blue-600 transition-all">Terms of Service</Link>
          <div className="ml-auto flex items-center gap-6">
            <span className="flex items-center gap-1 opacity-90 text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              SSL Secure Checkout
            </span>
            <Link to="/order-tracking" className="text-blue-600 font-bold uppercase tracking-widest hover:underline">Order Tracking</Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden bg-white/20 backdrop-blur-sm px-4 py-4 flex flex-col items-center text-[10px] gap-2 border-t border-white/50 text-slate-500">
         <div className="flex items-center gap-1 text-emerald-600 opacity-90 font-bold mb-1">
            <ShieldCheck className="w-4 h-4" /> SSL Secure Checkout
         </div>
         <span className="font-bold">&copy; {new Date().getFullYear()} MobiStore. All rights reserved.</span>
      </div>
    </footer>
  );
}
