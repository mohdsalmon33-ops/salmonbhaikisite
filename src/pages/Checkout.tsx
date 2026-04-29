import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CheckCircle2, Lock, CreditCard, Wallet, Banknote } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, addOrder } = useStore();
  const [method, setMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Mock processing timeout
    setTimeout(() => {
      const newOrder = {
        id: 'ORD' + Math.floor(Math.random() * 1000000),
        items: [...cart],
        total: total,
        date: new Date().toISOString().split('T')[0],
        status: 'Confirmed' as const
      };
      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect after showing success briefly
      setTimeout(() => navigate('/account/orders'), 2000);
    }, 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    return <div className="text-center py-20 font-bold text-2xl">Cart is empty! Cannot checkout.</div>;
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">Thank you for shopping at MobiStore. Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Lock className="w-6 h-6 text-green-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Secure Checkout</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
            {/* Address */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white w-full" />
                <input required type="text" placeholder="Last Name" className="border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white w-full" />
                <input required type="email" placeholder="Email Address" className="border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white w-full md:col-span-2" />
                <input required type="text" placeholder="Full Address" className="border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white w-full md:col-span-2" />
                <input required type="text" placeholder="City" className="border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white w-full" />
                <input required type="text" placeholder="PIN Code" className="border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white w-full" />
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <div className="space-y-3">
                
                <label className={`block border rounded-2xl p-4 cursor-pointer transition ${method === 'card' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:border-gray-300'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="radio" name="payment" checked={method === 'card'} onChange={() => setMethod('card')} className="text-blue-600 w-5 h-5 focus:ring-blue-500 border-gray-300" />
                      <span className="font-semibold ml-3 flex items-center"><CreditCard className="w-5 h-5 text-gray-500 mr-2"/> Credit / Debit Card</span>
                    </div>
                  </div>
                  {method === 'card' && (
                    <div className="mt-4 pt-4 border-t border-blue-100 pl-8 grid gap-4">
                      <input type="text" placeholder="Card Number" className="border rounded-xl px-4 py-2 w-full" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/YY" className="border rounded-xl px-4 py-2" />
                        <input type="text" placeholder="CVV" className="border rounded-xl px-4 py-2" />
                      </div>
                    </div>
                  )}
                </label>

                <label className={`block border rounded-2xl p-4 cursor-pointer transition ${method === 'upi' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:border-gray-300'}`}>
                  <div className="flex items-center">
                    <input type="radio" name="payment" checked={method === 'upi'} onChange={() => setMethod('upi')} className="text-blue-600 w-5 h-5 focus:ring-blue-500 border-gray-300" />
                    <span className="font-semibold ml-3 flex items-center"><Wallet className="w-5 h-5 text-gray-500 mr-2"/> UPI Apps</span>
                  </div>
                  {method === 'upi' && (
                    <div className="mt-4 pt-4 border-t border-blue-100 pl-8">
                      <input type="text" placeholder="Enter UPI ID (e.g., yourname@bank)" className="border rounded-xl px-4 py-2 w-full" />
                    </div>
                  )}
                </label>

                <label className={`block border rounded-2xl p-4 cursor-pointer transition ${method === 'cod' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:border-gray-300'}`}>
                  <div className="flex items-center">
                    <input type="radio" name="payment" checked={method === 'cod'} onChange={() => setMethod('cod')} className="text-blue-600 w-5 h-5 focus:ring-blue-500 border-gray-300" />
                    <span className="font-semibold ml-3 flex items-center"><Banknote className="w-5 h-5 text-gray-500 mr-2"/> Cash on Delivery (COD)</span>
                  </div>
                </label>

              </div>
            </section>
          </form>
        </div>

        {/* Order Summary Side */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] sticky top-24 border border-slate-200">
            <h2 className="text-xl font-black mb-6 tracking-tight text-slate-800">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0 relative">
                    <span className="absolute top-1 right-1 bg-slate-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm z-10">{item.quantity}</span>
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="font-bold text-slate-700 leading-tight line-clamp-2 pr-2">{item.name}</div>
                    <div className="font-black text-slate-900 mt-2">₹{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-6 pb-6 border-b border-slate-200">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Promo Code</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter FESTIVE10" className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold text-slate-700 uppercase" />
                <button type="button" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition-colors">Apply</button>
              </div>
            </div>
            
            <div className="space-y-4 text-sm font-medium text-slate-600">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-slate-800">₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Tax</span><span className="font-bold text-slate-800">₹{tax.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-4 mt-4 items-center">
                <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Total</span>
                <span className="font-black text-3xl text-slate-900">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-8 shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center uppercase tracking-widest text-sm"
            >
              {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
            </button>
            <p className="text-[10px] font-bold text-center text-slate-400 mt-4 flex items-center justify-center gap-1 uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Secure AES-256 Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
