import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Gift, Smartphone, RefreshCw, Layers, Shield } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import React from 'react';

export function Home() {
  const featured = mockProducts.slice(0, 4);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 font-sans text-slate-900 flex flex-col gap-12">
      {/* Main Content: Bento Grid */}
      <main className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 md:h-[768px]">
        {/* Main Hero Phone Card */}
        <div className="md:col-span-6 md:row-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10 flex flex-col items-start h-full">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured Flagship</span>
            <h1 className="text-4xl lg:text-5xl font-bold mt-4 leading-tight tracking-tight text-slate-900">
              Next-Gen <br /><span className="text-blue-600">Power in Your Palm</span>
            </h1>
            <p className="text-slate-500 mt-4 max-w-sm">
              Discover the latest flagship smartphones with blazing 5G speeds, AI cameras, and all-day battery life.
            </p>
            <div className="mt-8 mb-4">
              <span className="text-3xl font-bold tracking-tight text-slate-900">₹1,29,999</span>
              <p className="text-sm text-slate-400 font-medium mt-1">EMI starting at ₹12,499/mo</p>
            </div>
          </div>
          <div className="relative z-10 flex gap-4 mt-auto">
            <Link to="/products" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors shadow-lg">
              Shop Now
            </Link>
          </div>
          {/* Mock Phone Image */}
          <div className="hidden md:flex absolute -right-10 -bottom-10 w-80 h-[480px] bg-slate-100 rounded-[48px] border-[8px] border-slate-800 shadow-2xl items-center justify-center rotate-[10deg] group-hover:rotate-[5deg] transition-transform duration-500">
            <Smartphone className="w-24 h-24 text-slate-300 opacity-50" />
            <div className="absolute font-bold uppercase tracking-widest text-xs text-slate-400 opacity-60">Galaxy AI</div>
          </div>
        </div>

        {/* Flash Sale Countdown */}
        <Link to="/flash-sales" className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase text-xs tracking-widest opacity-80">Flash Sale</span>
              <Zap className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="text-3xl font-black tabular-nums tracking-tighter">04:22:15</div>
              <div className="mt-2">
                <p className="text-sm opacity-90 font-medium">iPhone 15 Pro Max</p>
                <div className="text-xl font-bold mt-1">₹1,44,900 <span className="text-sm line-through opacity-60 font-normal ml-1">₹1,59,900</span></div>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-32 h-32" />
          </div>
        </Link>

        {/* Compare Tool Quick Entry */}
        <Link to="/compare" className="md:col-span-3 md:row-span-2 bg-indigo-900 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between group overflow-hidden relative">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest z-10 relative">Comparison</span>
          <div className="flex flex-col gap-2 z-10 relative mt-4 mb-2">
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl border border-white/5">
              <div className="w-6 h-6 rounded bg-white/20 shrink-0"></div>
              <span className="text-xs font-semibold truncate">iPhone 15 Pro</span>
            </div>
            <div className="flex items-center justify-center font-black text-indigo-400 text-[10px] my-[-4px]">VS</div>
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl border border-white/5">
              <div className="w-6 h-6 rounded bg-white/20 shrink-0"></div>
              <span className="text-xs font-semibold truncate">Google Pixel 8</span>
            </div>
          </div>
          <button className="w-full mt-auto py-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-xs font-bold transition-colors z-10 relative">
            View Side-by-Side
          </button>
          <Layers className="absolute -right-8 -bottom-8 w-40 h-40 text-indigo-800 opacity-50 group-hover:rotate-12 transition-transform duration-500" />
        </Link>

        {/* Trade-In Calculator */}
        <Link to="/trade-in" className="md:col-span-3 md:row-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-blue-300 transition-colors relative overflow-hidden">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Trade-in</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium pb-4 border-b border-slate-100">Upgrade your lifestyle</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Old Model</label>
                <div className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg text-sm p-3 font-medium text-slate-700">
                  Select your device
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1 pointer-events-none">
                <div className="py-2 text-xs bg-blue-600 text-white rounded-lg font-bold text-center">Good</div>
                <div className="py-2 text-xs bg-slate-100 text-slate-500 rounded-lg font-medium text-center">Damaged</div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-auto">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estimated Value</p>
            <div className="text-2xl font-bold text-blue-600 tracking-tight">Up to ₹45,000</div>
            <button className="w-full mt-4 py-3 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
              Calculate Now
            </button>
          </div>
        </Link>

        {/* Features / Bundle */}
        <div className="md:col-span-3 md:row-span-2 bg-emerald-50 rounded-3xl p-6 border border-emerald-100 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">MobiStore Trust</span>
              <span className="bg-emerald-200 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold">100%</span>
            </div>
            <h4 className="text-emerald-900 font-bold mt-3 text-lg leading-tight">Assured Quality & Protection</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 z-10 relative">
            <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl text-emerald-900 border border-emerald-200/50">
               <ShieldCheck className="w-4 h-4 shrink-0" /> <span className="text-xs font-bold">1Yr Warranty</span>
            </div>
             <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl text-emerald-900 border border-emerald-200/50">
               <RefreshCw className="w-4 h-4 shrink-0" /> <span className="text-xs font-bold">10-Day Return</span>
            </div>
             <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl text-emerald-900 border border-emerald-200/50">
               <Zap className="w-4 h-4 shrink-0" /> <span className="text-xs font-bold">Fast Ship</span>
            </div>
             <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl text-emerald-900 border border-emerald-200/50">
               <Gift className="w-4 h-4 shrink-0" /> <span className="text-xs font-bold">Easy EMIs</span>
            </div>
          </div>
        </div>

        {/* Quality Check / Assurances (Col 10-12 Row 5-6) */}
        <div className="md:col-span-3 md:row-span-2 bg-slate-900 rounded-3xl p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-sm">
           <div>
             <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Security</span>
             <h4 className="font-bold mt-2 text-lg">Safe & Secure Transactions</h4>
             <p className="text-sm text-slate-400 mt-1">256-bit AES encryption.</p>
           </div>
           <div className="flex items-center gap-3">
             <Shield className="w-10 h-10 text-emerald-400" />
             <div className="text-xs font-medium text-slate-300">
               Verified by external security audits. Protected identity.
             </div>
           </div>
        </div>

        {/* Certified Refurbished Section */}
        <Link to="/refurbished" className="md:col-span-6 md:row-span-2 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm overflow-hidden group">
          <div className="w-full sm:w-auto z-10 flex flex-col h-full justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Refurbished Store</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Certified Gold Grade</h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">100-point inspection. 6 Month Warranty.</p>
            <div className="mt-4 flex gap-8">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting From</span>
                <span className="text-lg font-black text-slate-900">₹18,990</span>
              </div>
              <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                Browse Collection <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
          <div className="hidden sm:flex w-32 h-32 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 shrink-0 group-hover:scale-105 transition-transform duration-300">
             <ShieldCheck className="w-16 h-16 text-slate-300" />
          </div>
        </Link>
      </main>

      {/* Featured Products List */}
      <section className="mt-4 md:mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Trending Devices</h2>
          </div>
          <Link to="/products" className="text-blue-600 text-sm font-bold hover:underline flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

