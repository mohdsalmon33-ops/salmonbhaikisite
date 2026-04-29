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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col h-full overflow-hidden group">
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] bg-gray-50 overflow-hidden">
        {product.isRefurbished && (
          <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded z-10">
            Refurbished
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
          >
            <Heart className={cn("w-4 h-4", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); addToCompare(product); }}
            className={cn("p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors", 
              isCompared ? "text-blue-600" : "text-gray-600")}
            title="Add to compare"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1 text-xs text-gray-500 font-medium tracking-wide uppercase">{product.brand}</div>
        <Link to={`/product/${product.id}`} className="hover:text-blue-600">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(Math.round(product.rating))}<span className="text-gray-300">{'★'.repeat(5-Math.round(product.rating))}</span>
          </div>
          <span className="text-xs text-gray-500">({product.reviewsCount})</span>
        </div>
        
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</div>
            {product.originalPrice && (
              <div className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</div>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stockStatus === 'Out of stock'}
            className={cn(
              "p-2.5 rounded-full text-white transition-transform active:scale-95",
              product.stockStatus === 'Out of stock' 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
