import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Gift, Smartphone, RefreshCw, Layers, Shield } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import React from 'react';

import { useStore } from '../store/useStore';

export function Home() {
  const featured = mockProducts.slice(0, 4);
  const { recentlyViewed } = useStore();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 font-sans text-slate-900 flex flex-col gap-12">
      {/* Main Content: Bento Grid */}
      <main className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-4 md:h-[768px]">
        {/* Main Hero Phone Card */}
        <div className="md:col-span-6 md:row-span-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-white shadow-sm flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10 flex flex-col items-start h-full">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md shadow-blue-600/20">Featured Flagship</span>
            <h1 className="text-4xl lg:text-6xl font-black mt-6 leading-[1.1] tracking-tight text-slate-900 drop-shadow-sm">
              Next-Gen <br /><span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Power in Your Palm</span>
            </h1>
            <p className="text-slate-600 mt-6 max-w-sm text-lg font-medium">
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
          <div className="hidden md:flex absolute -right-10 -bottom-10 w-80 h-[480px] items-center justify-center rotate-[10deg] group-hover:rotate-[5deg] transition-transform duration-500 bg-white rounded-[48px] shadow-2xl border-4 border-slate-100 overflow-hidden line-clamp-1 p-2">
			<img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover rounded-[40px]" alt="Flagship Phone" />
          </div>
        </div>

        {/* Flash Sale Countdown */}
        <Link to="/products" className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
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
        <Link to="/compare" className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between group overflow-hidden relative border border-indigo-500/20">
          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest z-10 relative bg-indigo-900/50 w-fit px-2 py-1 rounded-md border border-indigo-500/30">Comparison</span>
          <div className="flex flex-col gap-2 z-10 relative mt-4 mb-2">
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=200&auto=format&fit=crop" className="w-8 h-8 rounded-lg object-contain bg-white/80 p-0.5 shrink-0" alt="iPhone 15 Pro" />
              <span className="text-xs font-semibold truncate leading-tight">iPhone 15 Pro</span>
            </div>
            <div className="flex items-center justify-center font-black text-indigo-400 text-[10px] my-[-4px]">VS</div>
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1696446700854-e6df5b91a0cc?q=80&w=200&auto=format&fit=crop" className="w-8 h-8 rounded-lg object-contain bg-white/80 p-0.5 shrink-0" alt="Google Pixel 8" />
              <span className="text-xs font-semibold truncate leading-tight">Google Pixel 8</span>
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
        <Link to="/refurbished" className="md:col-span-6 md:row-span-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-sm overflow-hidden group">
          <div className="w-full sm:w-auto z-10 flex flex-col h-full justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-green-900/40 px-2 py-0.5 rounded">Refurbished Store</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">Certified Gold Grade</h2>
            <p className="text-sm text-slate-300 mt-2 font-medium">100-point inspection. 6 Month Warranty.</p>
            <div className="mt-6 flex gap-8 items-center">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting From</span>
                <span className="text-xl font-black text-white">₹18,990</span>
              </div>
              <div className="flex items-center text-sm font-bold text-blue-400 group-hover:translate-x-2 transition-transform bg-blue-900/30 px-4 py-2 rounded-full border border-blue-800/50">
                Browse Collection <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
          <div className="hidden sm:flex w-40 h-40 bg-slate-800/50 rounded-full items-center justify-center border-4 border-slate-700/50 shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-2xl relative">
             <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
             <ShieldCheck className="w-20 h-20 text-blue-400 relative z-10" />
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

      {/* New Arrivals List */}
      <section className="mt-4 md:mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">New Arrivals</h2>
          </div>
          <Link to="/products" className="text-purple-600 text-sm font-bold hover:underline flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {mockProducts.slice(4, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mt-4 md:mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-6 bg-slate-400 rounded-full"></span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Recently Viewed</h2>
            </div>
          </div>
          
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4">
            {recentlyViewed.map(product => (
              <div key={product.id} className="min-w-[200px] md:min-w-[280px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

