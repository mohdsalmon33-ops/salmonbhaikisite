import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { ShieldCheck, RefreshCw, BadgePercent } from 'lucide-react';

export function Refurbished() {
  const refurbishedProducts = mockProducts.filter(p => p.isRefurbished);

  return (
    <div>
      <div className="bg-green-50 py-16 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <BadgePercent className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Certified Refurbished</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">Premium devices that look and work like new, rigorously tested with a 6-month warranty. Save big while reducing electronic waste.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <ShieldCheck className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
              <p className="text-gray-500 text-sm">65-point rigorous testing before certification.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <RefreshCw className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Like New condition</h3>
              <p className="text-gray-500 text-sm">Flawless screens and minimum 85% battery health.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <BadgePercent className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Extended Warranty</h3>
              <p className="text-gray-500 text-sm">Covered by our 6-month comprehensive warranty.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Available Refurbished Devices</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {refurbishedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {refurbishedProducts.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed">
              More refurbished devices arriving soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
