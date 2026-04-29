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
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 flex flex-col h-full overflow-hidden group">
      <Link to={`/product/${product.id}`} className="relative block aspect-square bg-slate-50 overflow-hidden p-6 flex items-center justify-center">
        {product.isRefurbished && (
          <div className="absolute top-4 left-4 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-widest shadow-sm">
            Refurbished
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors border border-slate-100"
          >
            <Heart className={cn("w-5 h-5", isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400")} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); addToCompare(product); }}
            className={cn("p-3 bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors border border-slate-100", 
              isCompared ? "text-indigo-600" : "text-slate-400")}
            title="Add to compare"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow bg-white relative z-20">
        <div className="mb-2 text-[10px] text-slate-400 font-bold tracking-widest uppercase">{product.brand}</div>
        <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
          <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-2 mb-4">
          <div className="flex text-amber-400 text-sm">
            {'★'.repeat(Math.round(product.rating))}<span className="text-slate-200">{'★'.repeat(5-Math.round(product.rating))}</span>
          </div>
          <span className="text-xs font-medium text-slate-400">({product.reviewsCount})</span>
        </div>
        
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <div className="text-2xl font-bold tracking-tight text-slate-900">₹{product.price.toLocaleString('en-IN')}</div>
            {product.originalPrice && (
              <div className="text-sm font-medium text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</div>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stockStatus === 'Out of stock'}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
              product.stockStatus === 'Out of stock' 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
