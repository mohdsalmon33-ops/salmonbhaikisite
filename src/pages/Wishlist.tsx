import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { Heart } from 'lucide-react';

export function Wishlist() {
  const { wishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-200">
          <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Wishlist is empty</h2>
          <p className="text-slate-500 mb-8">Save items you love here to easily find them later.</p>
          <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Explore Phones
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
