import { useState, useEffect } from 'react';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { Timer, Zap } from 'lucide-react';

export function FlashSales() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Apply fake discount for demo
  const flashProducts = mockProducts.slice(0,4).map(p => ({
    ...p,
    originalPrice: p.price,
    price: Math.floor(p.price * 0.8), // 20% off
  }));

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 bg-red-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* Checker pattern or similar decorative bg */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" fillOpacity="0.2"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#pattern)"/>
            </svg>
          </div>
          
          <div className="relative z-10">
             <div className="inline-flex items-center bg-black/50 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-red-400">
               <Zap className="w-4 h-4 mr-2 text-yellow-400" /> Limited Time Event
             </div>
             <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase line-clamp-2 leading-none">Midnight Run</h1>
             <p className="text-red-100 mt-4 text-lg">Massive discounts on premium flagships. Once they're gone, they're gone.</p>
          </div>

          <div className="relative z-10 bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center shrink-0 min-w-64 text-center">
            <Timer className="w-8 h-8 text-white mb-2 mx-auto" />
            <div className="text-sm text-red-200 uppercase tracking-widest font-bold mb-2">Ends In</div>
            <div className="flex gap-4 font-mono font-bold text-4xl">
              <div>{hours.toString().padStart(2, '0')}<span className="text-base text-gray-400 block -mt-1 font-sans font-medium uppercase tracking-widest">Hrs</span></div>
              <div className="text-red-400">:</div>
              <div>{minutes.toString().padStart(2, '0')}<span className="text-base text-gray-400 block -mt-1 font-sans font-medium uppercase tracking-widest">Min</span></div>
              <div className="text-red-400">:</div>
              <div>{seconds.toString().padStart(2, '0')}<span className="text-base text-gray-400 block -mt-1 font-sans font-medium uppercase tracking-widest">Sec</span></div>
            </div>
          </div>
        </div>

        {/* Product override styles for dark mode */}
        <div className="flash-sale-grid">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {flashProducts.map(product => (
              <div key={product.id} className="relative group">
                <div className="absolute -top-3 -right-3 z-20 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:scale-110 transition">
                  -20% OFF
                </div>
                {/* Wrap ProductCard to slightly alter its look inside the dark theme if needed, but it handles itself okay */}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
