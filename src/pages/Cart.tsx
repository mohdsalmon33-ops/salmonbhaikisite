import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST mock
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any phones yet.</p>
        <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="font-semibold text-lg">{cart.length} Items</h2>
              <button onClick={clearCart} className="text-red-500 text-sm hover:underline font-medium">Clear Cart</button>
            </div>

            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 md:gap-6 items-start md:items-center pb-6 border-b last:border-0 last:pb-0">
                  <Link to={`/product/${item.id}`} className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border block">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                  </Link>
                  
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-1">{item.name}</Link>
                      <div className="text-sm text-gray-500 my-1">{item.specs.ram} | {item.specs.storage}</div>
                      <div className="font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 w-full md:w-auto">
                      {/* Quantity Controls */}
                      <div className="flex border rounded-full overflow-hidden shrink-0">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                          className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100"
                        ><Minus className="w-4 h-4" /></button>
                        <div className="w-10 flex items-center justify-center font-semibold border-x text-sm bg-white">{item.quantity}</div>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100"
                        ><Plus className="w-4 h-4" /></button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-96 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-6 tracking-tight">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 border-b pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (18%)</span>
                <span className="font-medium text-gray-900">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-bold text-lg">Total</span>
              <span className="font-black text-2xl">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <Link 
              to="/checkout" 
              className="w-full bg-blue-600 text-white py-4 rounded-full font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              Secure Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            
            <div className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center gap-1">
              Guaranteed Safe Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
