import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white font-sans mt-auto pb-20 md:pb-0">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 tracking-tight">MobiStore</h3>
            <p className="text-sm text-slate-400 font-medium">The premier destination for the latest mobile technology. Expert reviews, competitive prices.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Shop</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><Link to="/products" className="hover:text-white hover:translate-x-1 inline-block transition-transform">All Phones</Link></li>
              <li><Link to="/refurbished" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Certified Refurbished</Link></li>
              <li><Link to="/trade-in" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Trade-In Program</Link></li>
              <li><Link to="/flash-sales" className="text-red-400 hover:text-red-300 hover:translate-x-1 inline-block transition-transform">Flash Deals ⚡</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Customer Support</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><Link to="/order-tracking" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Track Order</Link></li>
              <li><Link to="/returns" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Returns & Refunds</Link></li>
              <li><Link to="/imei-check" className="hover:text-white hover:translate-x-1 inline-block transition-transform">IMEI Check</Link></li>
              <li><Link to="/faq" className="hover:text-white hover:translate-x-1 inline-block transition-transform">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Business</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><Link to="/bulk-order" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Corporate / Bulk</Link></li>
              <li><Link to="/admin" className="hover:text-white hover:translate-x-1 inline-block transition-transform text-blue-400">Admin Portal</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Desktop Bottom Bar */}
      <div className="h-12 bg-slate-950 px-8 items-center justify-between text-[11px] font-medium border-t border-white/5 hidden md:flex">
        <div className="flex gap-6 max-w-[1200px] w-full mx-auto">
          <span className="opacity-60">&copy; {new Date().getFullYear()} MobiStore. All rights reserved.</span>
          <Link to="/privacy" className="opacity-50 hover:opacity-100 transition-opacity">Privacy Policy</Link>
          <Link to="/terms" className="opacity-50 hover:opacity-100 transition-opacity">Terms of Service</Link>
          <div className="ml-auto flex items-center gap-6">
            <span className="flex items-center gap-1 opacity-80">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              SSL Secure Checkout
            </span>
            <Link to="/order-tracking" className="text-blue-400 font-bold uppercase tracking-widest hover:underline">Order Tracking</Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden bg-slate-950 px-4 py-4 flex flex-col items-center text-[10px] gap-2 border-t border-white/5">
         <div className="flex items-center gap-1 text-green-400 opacity-90 font-medium mb-1">
            <ShieldCheck className="w-4 h-4" /> SSL Secure Checkout
         </div>
         <span className="opacity-50">&copy; {new Date().getFullYear()} MobiStore. All rights reserved.</span>
      </div>
    </footer>
  );
}
