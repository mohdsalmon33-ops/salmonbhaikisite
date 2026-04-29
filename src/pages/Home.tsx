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
        <div className="md:col-span-6 md:row-span-4 glass-card rounded-[2rem] p-8 flex flex-col justify-between relative group z-10">
          <div className="relative z-10 flex flex-col items-start h-full">
            <span className="bg-white/50 backdrop-blur-md text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-white/40">Featured Flagship</span>
            <h1 className="text-4xl lg:text-6xl font-black mt-6 leading-[1.1] tracking-tight text-slate-800 drop-shadow-md">
              Next-Gen <br /><span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">Power in Your Palm</span>
            </h1>
            <p className="text-slate-600 mt-6 max-w-sm text-lg font-medium drop-shadow-sm">
              Discover the latest flagship smartphones with blazing 5G speeds, AI cameras, and all-day battery life.
            </p>
            <div className="mt-8 mb-4">
              <span className="text-3xl font-bold tracking-tight text-slate-800 drop-shadow-sm">₹1,29,999</span>
              <p className="text-sm text-slate-500 font-medium mt-1">EMI starting at ₹12,499/mo</p>
            </div>
          </div>
          <div className="relative z-20 flex gap-4 mt-auto">
            <Link to="/products" className="btn-neumorphic bg-white/80 backdrop-blur text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-white transition-colors duration-300">
              Shop Now
            </Link>
          </div>
          {/* Mock Phone Image */}
          <div className="hidden md:flex absolute -right-12 -bottom-12 w-[380px] h-[550px] items-center justify-center rotate-[8deg] group-hover:rotate-[2deg] group-hover:-translate-y-4 transition-all duration-700 z-30 animate-float pointer-events-none">
			      <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop" className="w-[80%] h-[80%] object-cover rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-8 border-white/60 backdrop-blur-xl" alt="Flagship Phone" />
          </div>
        </div>

        {/* Flash Sale Countdown */}
        <Link to="/products" className="md:col-span-3 md:row-span-2 glass-panel rounded-[2rem] p-6 text-slate-800 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/30 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase text-xs tracking-widest text-orange-600">Flash Sale</span>
              <Zap className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>
            <div>
              <div className="text-4xl font-black tabular-nums tracking-tighter text-slate-800 drop-shadow-md">04:22:15</div>
              <div className="mt-2">
                <p className="text-sm font-semibold text-slate-600 drop-shadow-sm">iPhone 15 Pro Max</p>
                <div className="text-xl font-bold mt-1 text-slate-800">₹1,44,900 <span className="text-sm line-through text-slate-400 ml-1">₹1,59,900</span></div>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-[0.05] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 pointer-events-none">
            <Zap className="w-40 h-40" />
          </div>
        </Link>

        {/* Compare Tool Quick Entry */}
        <Link to="/compare" className="md:col-span-3 md:row-span-2 glass-panel rounded-[2rem] p-6 text-slate-800 shadow-xl flex flex-col justify-between group overflow-hidden relative border border-white/60">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 blur-[50px] rounded-full"></div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest z-10 relative bg-white/60 backdrop-blur-md shadow-sm w-fit px-3 py-1 rounded-full border border-white/80">Comparison</span>
          <div className="flex flex-col gap-2 z-10 relative mt-4 mb-2">
            <div className="flex items-center gap-3 bg-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] p-2.5 rounded-xl border border-white/50 backdrop-blur-sm">
              <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=200&auto=format&fit=crop" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0 shadow-sm" alt="iPhone 15 Pro" />
              <span className="text-sm font-bold truncate leading-tight text-slate-700">iPhone 15 Pro</span>
            </div>
            <div className="flex items-center justify-center font-black text-indigo-500 text-[10px] my-[-6px] z-10 relative bg-white/60 shadow-sm w-6 h-6 rounded-full mx-auto border border-white/80">VS</div>
            <div className="flex items-center gap-3 bg-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] p-2.5 rounded-xl border border-white/50 backdrop-blur-sm -mt-2">
              <img src="https://images.unsplash.com/photo-1696446700854-e6df5b91a0cc?q=80&w=200&auto=format&fit=crop" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0 shadow-sm" alt="Google Pixel 8" />
              <span className="text-sm font-bold truncate leading-tight text-slate-700">Google Pixel 8</span>
            </div>
          </div>
          <button className="w-full mt-auto py-3 btn-neumorphic bg-white/60 text-indigo-700 rounded-xl text-xs font-bold transition-all z-10 relative hover:bg-white/80">
            View Side-by-Side
          </button>
          <Layers className="absolute -right-6 -bottom-6 w-32 h-32 text-indigo-900 opacity-[0.03] group-hover:-rotate-12 transition-transform duration-700 pointer-events-none" />
        </Link>

        {/* Trade-In Calculator */}
        <Link to="/trade-in" className="md:col-span-3 md:row-span-4 glass-card rounded-[2rem] p-6 text-slate-800 shadow-xl flex flex-col justify-between group hover:border-white/80 transition-all duration-300 relative overflow-hidden">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Trade-in</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium pb-4 border-b border-slate-200/50">Upgrade your lifestyle</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Old Model</label>
                <div className="w-full mt-1 bg-white/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-white/50 rounded-xl text-sm p-3 font-bold text-slate-700 backdrop-blur-sm">
                  Select your device
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1 pointer-events-none">
                <div className="py-2 text-xs bg-white/60 shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] text-blue-600 rounded-xl font-bold text-center border border-white/50">Good</div>
                <div className="py-2 text-xs bg-slate-100/40 text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-xl font-medium text-center border border-white/20">Damaged</div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200/50 mt-auto">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estimated Value</p>
            <div className="text-2xl font-bold text-blue-600 tracking-tight">Up to ₹45,000</div>
            <button className="w-full mt-4 py-3 btn-neumorphic bg-white/50 text-slate-700 hover:text-blue-600 rounded-xl text-xs font-bold transition-all">
              Calculate Now
            </button>
          </div>
        </Link>

        {/* Features / Bundle */}
        <div className="md:col-span-3 md:row-span-2 glass-panel rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden text-slate-800 border border-white/60">
          <div className="absolute inset-0 bg-emerald-100/20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">MobiStore Trust</span>
              <span className="bg-emerald-100/50 backdrop-blur-md shadow-sm border border-emerald-200/50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">100%</span>
            </div>
            <h4 className="text-slate-800 font-bold mt-3 text-lg leading-tight">Assured Quality & Protection</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 z-10 relative">
            <div className="flex items-center gap-2 shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] bg-white/40 p-2 rounded-xl text-emerald-800 border border-white/50">
               <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" /> <span className="text-xs font-bold">1Yr Warranty</span>
            </div>
             <div className="flex items-center gap-2 shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] bg-white/40 p-2 rounded-xl text-emerald-800 border border-white/50">
               <RefreshCw className="w-4 h-4 shrink-0 text-emerald-600" /> <span className="text-xs font-bold">10-Day Return</span>
            </div>
             <div className="flex items-center gap-2 shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] bg-white/40 p-2 rounded-xl text-emerald-800 border border-white/50">
               <Zap className="w-4 h-4 shrink-0 text-emerald-600" /> <span className="text-xs font-bold">Fast Ship</span>
            </div>
             <div className="flex items-center gap-2 shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] bg-white/40 p-2 rounded-xl text-emerald-800 border border-white/50">
               <Gift className="w-4 h-4 shrink-0 text-emerald-600" /> <span className="text-xs font-bold">Easy EMIs</span>
            </div>
          </div>
        </div>

        {/* Quality Check / Assurances (Col 10-12 Row 5-6) */}
        <div className="md:col-span-3 md:row-span-2 glass-panel rounded-[2rem] p-6 flex flex-col justify-between text-slate-800 relative overflow-hidden shadow-sm border border-white/60">
           <div className="absolute inset-0 bg-blue-100/20 mix-blend-overlay"></div>
           <div className="relative z-10">
             <span className="text-blue-500 text-xs font-bold uppercase tracking-widest drop-shadow-sm">Security</span>
             <h4 className="font-bold mt-2 text-lg text-slate-800">Safe & Secure Transactions</h4>
             <p className="text-sm text-slate-600 mt-1">256-bit AES encryption.</p>
           </div>
           <div className="flex items-center gap-3 relative z-10">
             <div className="bg-white/50 p-2 rounded-xl border border-white/60 shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)]">
               <Shield className="w-8 h-8 text-blue-500" />
             </div>
             <div className="text-xs font-medium text-slate-600">
               Verified by external security audits. Protected identity.
             </div>
           </div>
        </div>

        {/* Certified Refurbished Section */}
        <Link to="/refurbished" className="md:col-span-6 md:row-span-2 glass-card rounded-[2rem] p-6 md:p-8 flex items-center justify-between text-slate-800 shadow-sm overflow-hidden group">
          <div className="absolute inset-0 bg-blue-200/10 mix-blend-overlay"></div>
          <div className="w-full sm:w-auto z-10 flex flex-col h-full justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest bg-green-100/60 backdrop-blur border border-green-200/50 px-2 py-0.5 rounded-full">Refurbished Store</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mt-1 drop-shadow-sm">Certified Gold Grade</h2>
            <p className="text-sm text-slate-600 mt-2 font-medium drop-shadow-sm">100-point inspection. 6 Month Warranty.</p>
            <div className="mt-6 flex gap-8 items-center">
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Starting From</span>
                <span className="text-xl font-black text-slate-800 drop-shadow-sm">₹18,990</span>
              </div>
              <div className="flex items-center text-sm font-bold text-blue-700 group-hover:translate-x-2 transition-transform bg-white/60 backdrop-blur shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] px-4 py-2 rounded-full border border-white/80">
                Browse Collection <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
          <div className="hidden sm:flex w-40 h-40 bg-white/40 shadow-[4px_4px_10px_rgba(180,190,210,0.4),-4px_-4px_10px_rgba(255,255,255,0.9)] rounded-full items-center justify-center border border-white/60 shrink-0 group-hover:scale-105 transition-transform duration-500 relative z-10">
             <ShieldCheck className="w-20 h-20 text-emerald-500 relative z-10 drop-shadow-sm" />
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

