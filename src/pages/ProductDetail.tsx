import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Shield, Undo2, CheckCircle2, Star, Plus, Minus, RefreshCcw } from 'lucide-react';
import { mockProducts, accessories } from '../data/mockData';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function ProductDetail() {
  const { id } = useParams();
  const baseId = id?.replace('-flash', '');
  const product = mockProducts.find(p => p.id === baseId);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'qa'>('specs');
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedRam, setSelectedRam] = useState(product?.specs?.ram || '8GB');
  const [selectedStorage, setSelectedStorage] = useState(product?.specs?.storage || '128GB');
  
  const { addToCart, toggleWishlist, wishlist, addToCompare, compareList, addRecentlyViewed } = useStore();

  React.useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="text-blue-600 mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const ramTiers: Record<string, number> = {'8GB': 0, '12GB': 8000, '16GB': 15000};
  const storageTiers: Record<string, number> = {'128GB': 0, '256GB': 10000, '512GB': 25000, '1TB': 45000};

  const baseRamVal = ramTiers[product.specs?.ram || '8GB'] || 0;
  const baseStorageVal = storageTiers[product.specs?.storage || '128GB'] || 0;

  const currentRamVal = ramTiers[selectedRam] || baseRamVal;
  const currentStorageVal = storageTiers[selectedStorage] || baseStorageVal;

  const extraPrice = Math.max(0, currentRamVal - baseRamVal) + Math.max(0, currentStorageVal - baseStorageVal);
  const finalPrice = product.price + extraPrice;
  const finalOriginalPrice = product.originalPrice ? product.originalPrice + extraPrice : null;

  const availableRams = ['8GB', '12GB', '16GB'].filter(r => (ramTiers[r] || 0) >= baseRamVal);
  const availableStorages = ['128GB', '256GB', '512GB', '1TB'].filter(s => (storageTiers[s] || 0) >= baseStorageVal);

  const customizedProduct = {
    ...product,
    id: `${product.id}-${selectedRam.replace('GB','')}-${selectedStorage.replace('GB','')}`,
    name: `${product.name} (${selectedRam}, ${selectedStorage})`,
    price: finalPrice,
    originalPrice: finalOriginalPrice ? finalOriginalPrice : undefined,
    specs: {
      ...product.specs,
      ram: selectedRam,
      storage: selectedStorage
    }
  };

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isCompared = compareList.some(item => item.id === product.id);
  const compatibleAccessories = accessories.filter(a => a.forBrand === product.brand || a.forBrand === 'Any');

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-sans text-slate-900">
      {/* Breadcrumbs */}
      <nav className="text-sm font-bold text-slate-400 mb-8 tracking-wide">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> <span className="mx-2 text-slate-300">/</span>
        <Link to="/products" className="hover:text-blue-600 transition-colors">Smartphones</Link> <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Product Images */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="bg-slate-50 rounded-[2rem] border border-slate-200 p-0 w-full flex justify-center items-center relative aspect-square shadow-sm overflow-hidden group mb-4">
            {product.isRefurbished && (
              <div className="absolute top-6 left-6 bg-green-100 text-green-700 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full z-10 shadow-sm">Refurbished</div>
            )}
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto hide-scrollbar w-full py-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "w-20 h-20 rounded-2xl border-2 flex-shrink-0 overflow-hidden flex items-center justify-center p-0 bg-white transition-all",
                    selectedImage === img ? "border-blue-600 shadow-md" : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:col-span-7 flex flex-col pt-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-3">{product.brand}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none mb-6">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-amber-400 text-sm">
              {'★'.repeat(Math.round(product.rating))}<span className="text-slate-200">{'★'.repeat(5-Math.round(product.rating))}</span>
            </div>
            <span className="text-xs font-bold text-slate-500 cursor-pointer hover:text-blue-600">{product.reviewsCount} reviews</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest",
              product.stockStatus === 'In stock' ? "text-green-600" :
              product.stockStatus === 'Low stock' ? "text-amber-600" :
              "text-red-500"
            )}>
              {product.stockStatus}
            </span>
          </div>

          <div className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-3xl">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">₹{finalPrice.toLocaleString('en-IN')}</span>
              {finalOriginalPrice && (
                <span className="text-xl text-slate-400 line-through font-medium mb-1 relative top-[-4px]">₹{finalOriginalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center mt-4"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Inclusive of all taxes</p>
          </div>

          <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-xl">
            {product.description}
          </p>

          {/* Configuration Options */}
          <div className="mb-8 space-y-6">
            {availableRams.length > 1 && (
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3">Memory (RAM)</h3>
                <div className="flex flex-wrap gap-3">
                  {availableRams.map(ram => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram)}
                      className={cn(
                        "px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-300",
                        selectedRam === ram 
                          ? "border-blue-600 text-blue-600 bg-blue-50 shadow-[0_0_15px_rgba(37,99,235,0.15)]" 
                          : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                      )}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {availableStorages.length > 1 && (
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3">Storage</h3>
                <div className="flex flex-wrap gap-3">
                  {availableStorages.map(storage => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={cn(
                        "px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-300",
                        selectedStorage === storage 
                          ? "border-blue-600 text-blue-600 bg-blue-50 shadow-[0_0_15px_rgba(37,99,235,0.15)]" 
                          : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                      )}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="flex border-2 border-slate-200 rounded-2xl overflow-hidden w-fit shadow-sm bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"><Minus className="w-4 h-4" /></button>
              <div className="w-14 flex items-center justify-center font-bold text-lg bg-white">{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"><Plus className="w-4 h-4" /></button>
            </div>

            <button 
              onClick={() => addToCart(customizedProduct, quantity)}
              disabled={product.stockStatus === 'Out of stock'}
              className={cn(
                "flex-1 md:flex-none flex justify-center items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white transition-all duration-300",
                product.stockStatus === 'Out of stock' 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-xl shadow-blue-600/30"
              )}
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            
            <button 
              onClick={() => toggleWishlist(product)}
              className="p-5 border-2 border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-600 transition-colors bg-white shadow-sm hover:border-slate-300"
              title="Add to Wishlist"
            >
              <Heart className={cn("w-6 h-6 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "")} />
            </button>

            <button 
              onClick={() => addToCompare(product)}
              className={cn("p-5 border-2 rounded-2xl hover:bg-slate-50 transition-colors bg-white shadow-sm hover:border-slate-300",
                isCompared ? "text-indigo-600 border-indigo-200 bg-indigo-50" : "text-slate-600 border-slate-200")}
              title="Compare"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200 mt-auto">
            <div className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Shield className="w-5 h-5" /></div>
              <div>
                <div className="font-bold text-slate-900 mb-0.5">1 Year Warranty</div>
                <div className="text-xs font-medium text-slate-500">Brand authorized</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Undo2 className="w-5 h-5" /></div>
              <div>
                <div className="font-bold text-slate-900 mb-0.5">10 Days Return</div>
                <div className="text-xs font-medium text-slate-500">On defective items</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-slate-200 overflow-x-auto hide-scrollbar">
          <button 
            className={cn("px-8 py-5 font-bold whitespace-nowrap text-sm uppercase tracking-widest transition-colors", activeTab === 'specs' ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-400 hover:text-slate-800")}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
          <button 
            className={cn("px-8 py-5 font-bold whitespace-nowrap text-sm uppercase tracking-widest transition-colors", activeTab === 'reviews' ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-400 hover:text-slate-800")}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewsCount})
          </button>
          <button 
            className={cn("px-8 py-5 font-bold whitespace-nowrap text-sm uppercase tracking-widest transition-colors", activeTab === 'qa' ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-400 hover:text-slate-800")}
            onClick={() => setActiveTab('qa')}
          >
            Q&A
          </button>
        </div>

        <div className="py-12 bg-white md:bg-transparent px-4 md:px-0">
          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 h-fit">
                <h3 className="font-bold text-2xl mb-8 text-slate-800 tracking-tight">Key Features</h3>
                <dl className="space-y-6">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                      <dt className="text-sm font-bold text-slate-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                      <dd className="font-bold text-slate-800 text-right md:text-left">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 h-fit">
                <h3 className="font-bold text-2xl mb-8 text-blue-900 tracking-tight">EMI Options</h3>
                <div className="space-y-4">
                  {product.emiOptions.map((emi, idx) => (
                    <div key={idx} className="flex justify-between items-center p-5 border border-blue-200/50 rounded-2xl bg-white shadow-sm">
                      <div className="text-slate-600"><span className="font-black text-slate-900 text-lg">{emi.months}</span> Months EMI</div>
                      <div className="font-black text-blue-600 text-xl">₹{emi.amount.toLocaleString()} <span className="text-sm font-medium text-blue-400">/ mo</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-12 items-start mb-12 pb-12 border-b border-slate-100">
                <div className="text-center md:text-left">
                  <div className="text-7xl font-black text-slate-900 tracking-tighter">{product.rating}</div>
                  <div className="flex text-amber-400 my-4 text-2xl">
                    {'★'.repeat(Math.round(product.rating))}<span className="text-slate-200">{'★'.repeat(5-Math.round(product.rating))}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Based on {product.reviewsCount} reviews</div>
                </div>
                <div className="flex-1 w-full space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-4">
                      <span className="text-sm font-bold text-slate-500 w-3">{star}</span>
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '2%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0 md:pl-12 md:border-l border-slate-100 flex items-center justify-center">
                  <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors w-full md:w-auto whitespace-nowrap">Write a Review</button>
                </div>
              </div>
              
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div key={i} className="pb-8 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg tracking-widest">U{i}</div>
                      <div>
                        <div className="font-bold text-slate-900">Verified User {i}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">2 days ago</div>
                      </div>
                    </div>
                    <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
                    <p className="text-slate-700 leading-relaxed max-w-3xl text-lg">Excellent phone! The camera is truly amazing and the battery lasts all day easily. Highly recommended.</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-sm">
              <button className="bg-white border-2 border-slate-900 text-slate-900 px-8 py-3 rounded-xl font-bold mb-10 hover:bg-slate-50 transition-colors uppercase tracking-widest text-xs">Ask a Question</button>
              <div className="space-y-8">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <div className="font-bold text-xl mb-4 text-slate-800">Q: Does it support 5G?</div>
                  <div className="text-slate-600 ml-6 border-l-4 border-green-500 pl-6 py-2">
                    <span className="font-bold text-green-700 block mb-2 uppercase tracking-widest text-xs">A: MobiStore Admin</span>
                    <p className="text-lg">Yes, this device supports all major 5G bands in India.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accessories Bundle */}
      {compatibleAccessories.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-8 md:p-12 mb-16 shadow-sm">
          <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-slate-900 text-center lg:text-left">Frequently bought together</h2>
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">
            
            <div className="flex flex-wrap items-center justify-center gap-6 flex-1">
              <div className="w-32 h-32 bg-slate-50 rounded-3xl border border-slate-200 p-0 flex shrink-0 shadow-sm relative group overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <Plus className="text-slate-300 w-8 h-8" />
              {compatibleAccessories.slice(0, 2).map((item, idx) => (
                <React.Fragment key={item.id}>
                  <div className="w-32 h-32 bg-slate-50 rounded-3xl border border-slate-200 p-0 flex shrink-0 shadow-sm relative group overflow-hidden cursor-pointer" title={item.name}>
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  {idx === 0 && compatibleAccessories.length > 1 && <Plus className="text-slate-300 w-8 h-8" />}
                </React.Fragment>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-200 w-full lg:w-96 text-center lg:text-left flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2 relative z-10">Bundle total</div>
              <div className="text-4xl font-black mb-6 flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-start gap-3 text-slate-900 relative z-10">
                ₹{(product.price + compatibleAccessories.slice(0,2).reduce((sum, a) => sum + a.price, 0)).toLocaleString('en-IN')}
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-sm">Save 10%</span>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10 shadow-xl">
                Add Bundle to Cart
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
