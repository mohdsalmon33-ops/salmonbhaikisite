import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export function Products() {
  const [searchParams] = useSearchParams();
  const searchQ = searchParams.get('q')?.toLowerCase() || '';

  const [filters, setFilters] = useState({
    brands: [] as string[],
    priceRange: 200000,
    has5G: false,
  });
  
  const [showFilters, setShowFilters] = useState(false);

  const brands = Array.from(new Set(mockProducts.map(p => p.brand)));

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const filteredProducts = mockProducts.filter(p => {
    if (searchQ && !p.name.toLowerCase().includes(searchQ) && !p.brand.toLowerCase().includes(searchQ)) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
    if (p.price > filters.priceRange) return false;
    if (filters.has5G && !p.specs.is5G) return false;
    return true;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 font-sans text-slate-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">All Phones</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-bold bg-white shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800">
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </h2>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm uppercase text-gray-500 tracking-wider">Brands</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span className="text-gray-700 group-hover:text-blue-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm uppercase text-gray-500 tracking-wider">Price (Max)</h3>
              <input 
                type="range" 
                min="5000" 
                max="200000" 
                step="5000" 
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                className="w-full accent-blue-600"
              />
              <div className="mt-2 text-gray-700 font-medium tracking-tight">₹{filters.priceRange.toLocaleString('en-IN')}</div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm uppercase text-gray-500 tracking-wider">Features</h3>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  checked={filters.has5G}
                  onChange={(e) => setFilters(prev => ({ ...prev, has5G: e.target.checked }))}
                />
                <span className="text-gray-700 group-hover:text-blue-600">5G Ready</span>
              </label>
            </div>
            
            <button 
              onClick={() => setFilters({ brands: [], priceRange: 200000, has5G: false })}
              className="w-full py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-500">
            {searchQ && <span className="font-bold mr-2 text-slate-800">Results for "{searchQ}"</span>}
            Showing {filteredProducts.length} results
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No phones found</h3>
              <p className="text-gray-500">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
