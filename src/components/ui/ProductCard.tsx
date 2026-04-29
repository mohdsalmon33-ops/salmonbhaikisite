import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, RefreshCcw } from 'lucide-react';
import { Product } from '../../data/mockData';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist, addToCompare, compareList } = useStore();
  
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isCompared = compareList.some(item => item.id === product.id);

  return (
    <div className="glass-card rounded-3xl transition-all duration-500 border border-white/60 flex flex-col h-full overflow-hidden group hover:-translate-y-2 hover:shadow-[15px_15px_40px_rgba(180,190,210,0.6),-15px_-15px_40px_rgba(255,255,255,1)]">
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden flex items-center justify-center p-6 mix-blend-multiply sm:mix-blend-normal">
        {product.isRefurbished && (
          <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-md border border-white/60 text-green-700 text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-widest shadow-sm">
            Refurbished
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className="p-3 bg-white/60 backdrop-blur-sm rounded-full shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] hover:bg-white/80 transition-colors border border-white/80"
          >
            <Heart className={cn("w-5 h-5", isWishlisted ? "fill-red-500 text-red-500" : "text-slate-500")} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); addToCompare(product); }}
            className={cn("p-3 bg-white/60 backdrop-blur-sm rounded-full shadow-[2px_2px_5px_rgba(180,190,210,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] hover:bg-white/80 transition-colors border border-white/80", 
              isCompared ? "text-indigo-600" : "text-slate-500")}
            title="Add to compare"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
          loading="lazy"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow relative z-20 bg-white/20 backdrop-blur-sm border-t border-white/40">
        <div className="mb-2 text-[10px] text-slate-500 font-bold tracking-widest uppercase">{product.brand}</div>
        <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
          <h3 className="text-xl font-bold text-slate-800 leading-tight line-clamp-2 drop-shadow-sm">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-2 mb-4">
          <div className="flex text-amber-400 text-sm">
            {'★'.repeat(Math.round(product.rating))}<span className="text-slate-200">{'★'.repeat(5-Math.round(product.rating))}</span>
          </div>
          <span className="text-xs font-medium text-slate-400">({product.reviewsCount})</span>
        </div>
        
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-white/40">
          <div className="flex flex-col">
            <div className="text-2xl font-black tracking-tight text-slate-800 drop-shadow-sm">₹{product.price.toLocaleString('en-IN')}</div>
            {product.originalPrice && (
              <div className="text-sm font-medium text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</div>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stockStatus === 'Out of stock'}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
              product.stockStatus === 'Out of stock' 
                ? "bg-white/40 text-slate-400 cursor-not-allowed border border-white/50" 
                : "btn-neumorphic bg-white/60 hover:bg-white text-blue-600 border border-white/80 active:scale-95"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
