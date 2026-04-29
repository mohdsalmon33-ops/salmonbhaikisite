import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Shield, Undo2, CheckCircle2, Star, Plus, Minus, RefreshCcw } from 'lucide-react';
import { mockProducts, accessories } from '../data/mockData';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'qa'>('specs');
  
  const { addToCart, toggleWishlist, wishlist, addToCompare, compareList } = useStore();
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="text-blue-600 mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isCompared = compareList.some(item => item.id === product.id);
  const compatibleAccessories = accessories.filter(a => a.forBrand === product.brand || a.forBrand === 'Any');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-blue-600">Home</Link> &gt;{' '}
        <Link to="/products" className="hover:text-blue-600">Smartphones</Link> &gt;{' '}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 mb-16">
        {/* Product Images */}
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="bg-white rounded-2xl border p-4 w-full flex justify-center items-center relative aspect-square max-h-[600px] hover-zoom-container">
            {product.isRefurbished && (
              <div className="absolute top-4 left-4 bg-green-100 text-green-800 font-bold px-3 py-1 rounded">Refurbished</div>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full object-contain mix-blend-multiply"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">{product.brand}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.round(product.rating))}<span className="text-gray-200">{'★'.repeat(5-Math.round(product.rating))}</span>
            </div>
            <span className="text-sm font-medium text-blue-600 cursor-pointer">{product.reviewsCount} reviews</span>
            <span className="text-gray-300">|</span>
            <span className={cn(
              "text-sm font-bold px-2 py-0.5 rounded",
              product.stockStatus === 'In stock' ? "bg-green-100 text-green-700" :
              product.stockStatus === 'Low stock' ? "bg-orange-100 text-orange-700" :
              "bg-red-100 text-red-700"
            )}>
              {product.stockStatus}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-1"/> Inclusive of all taxes</p>
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex border rounded-full overflow-hidden w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 bg-gray-50 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
              <div className="w-12 flex items-center justify-center font-semibold border-x text-center bg-white">{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 bg-gray-50 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
            </div>

            <button 
              onClick={() => addToCart(product, quantity)}
              disabled={product.stockStatus === 'Out of stock'}
              className={cn(
                "flex-1 md:flex-none flex justify-center items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg",
                product.stockStatus === 'Out of stock' 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95 hover:shadow-blue-200"
              )}
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(product)}
              className="p-3 border rounded-full hover:bg-red-50 text-gray-600 hover:border-red-200 transition-colors bg-white shadow-sm"
              title="Add to Wishlist"
            >
              <Heart className={cn("w-6 h-6", isWishlisted && "fill-red-500 text-red-500")} />
            </button>

            <button 
              onClick={() => addToCompare(product)}
              className={cn("p-3 border rounded-full hover:bg-gray-50 transition-colors bg-white shadow-sm",
                isCompared ? "text-blue-600 border-blue-200 bg-blue-50" : "text-gray-600")}
              title="Compare"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t mt-auto">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-blue-600"><Shield className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold text-sm">1 Year Warranty</div>
                <div className="text-xs text-gray-500">Brand authorized</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-blue-600"><Undo2 className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold text-sm">10 Days Return</div>
                <div className="text-xs text-gray-500">If defective or damaged</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b overflow-x-auto">
          <button 
            className={cn("px-6 py-4 font-semibold whitespace-nowrap", activeTab === 'specs' ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700")}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
          <button 
            className={cn("px-6 py-4 font-semibold whitespace-nowrap", activeTab === 'reviews' ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700")}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewsCount})
          </button>
          <button 
            className={cn("px-6 py-4 font-semibold whitespace-nowrap", activeTab === 'qa' ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700")}
            onClick={() => setActiveTab('qa')}
          >
            Q&A
          </button>
        </div>

        <div className="py-8 bg-white md:bg-transparent rounded-b-2xl px-4 md:px-0">
          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
                <h3 className="font-bold text-lg mb-4">Key Features</h3>
                <dl className="space-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 pb-4 border-b last:border-0 last:pb-0">
                      <dt className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                      <dd className="font-medium text-right md:text-left">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
                <h3 className="font-bold text-lg mb-4">EMI Options</h3>
                <div className="space-y-3">
                  {product.emiOptions.map((emi, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                      <div><span className="font-bold">{emi.months}</span> Months EMI</div>
                      <div className="font-semibold text-blue-600">₹{emi.amount.toLocaleString()} / mo</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8 pb-8 border-b">
                <div className="text-center">
                  <div className="text-5xl font-black">{product.rating}</div>
                  <div className="flex text-yellow-400 justify-center my-2 text-xl">
                    {'★'.repeat(Math.round(product.rating))}<span className="text-gray-200">{'★'.repeat(5-Math.round(product.rating))}</span>
                  </div>
                  <div className="text-sm text-gray-500">Based on {product.reviewsCount} reviews</div>
                </div>
                <div className="flex-1 w-full space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm font-medium w-3">{star}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '2%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold w-full uppercase text-sm tracking-wider">Write a Review</button>
                </div>
              </div>
              
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="pb-6 border-b last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold">U{i}</div>
                      <div>
                        <div className="font-semibold">User {i}</div>
                        <div className="text-xs text-gray-500">2 days ago</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                    <p className="text-gray-700">Excellent phone! The camera is truly amazing and the battery lasts all day easily. Highly recommended.</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <button className="bg-white border-2 border-gray-900 text-gray-900 px-6 py-2 rounded-full font-bold mb-8">Ask a Question</button>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="font-semibold mb-2">Q: Does it support 5G?</div>
                  <div className="text-gray-700 ml-4 border-l-2 border-green-500 pl-4 py-1">
                    <span className="font-semibold text-green-700 block mb-1">A: MobiStore Admin</span>
                    Yes, this device supports all major 5G bands in India.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accessories Bundle */}
      {compatibleAccessories.length > 0 && (
        <div className="bg-slate-50 border rounded-3xl p-6 md:p-10 mb-16 shadow-inner">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Frequently bought together</h2>
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="w-24 h-24 bg-white rounded-xl border p-2 flex shrink-0 shadow-sm relative">
                <img src={product.image} className="w-full h-full object-contain" />
              </div>
              <Plus className="text-gray-400" />
              {compatibleAccessories.slice(0, 2).map((item, idx) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-white rounded-xl border p-2 flex shrink-0 shadow-sm relative group overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition" />
                  </div>
                  {idx === 0 && compatibleAccessories.length > 1 && <Plus className="text-gray-400" />}
                </div>
              ))}
            </div>
            
            <div className="lg:ml-auto bg-white p-6 rounded-2xl shadow-md border w-full lg:w-72 text-center lg:text-left">
              <div className="text-gray-500 mb-1">Bundle total</div>
              <div className="text-2xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-2">
                ₹{(product.price + compatibleAccessories.slice(0,2).reduce((sum, a) => sum + a.price, 0)).toLocaleString('en-IN')}
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase tracking-wider">Save 10%</span>
              </div>
              <button className="w-full bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-800 transition">
                Add Bundle to Cart
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
