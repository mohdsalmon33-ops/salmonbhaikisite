import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Gift, ExternalLink, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function Account() {
  const { orders } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'loyalty'>('orders');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans text-slate-900 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl">
              U
            </div>
            <div>
              <div className="font-bold">User Name</div>
              <div className="text-xs text-slate-500">user@example.com</div>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors", activeTab === 'orders' ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-100")}
            >
              <Package className="w-4 h-4" /> Order History
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors", activeTab === 'addresses' ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-100")}
            >
              <MapPin className="w-4 h-4" /> Address Book
            </button>
            <button
              onClick={() => setActiveTab('loyalty')}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors", activeTab === 'loyalty' ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-100")}
            >
              <Gift className="w-4 h-4" /> Loyalty Points
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">Your Orders</h1>
            {orders.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">No Orders Yet</h2>
                <p className="text-slate-500 mb-8">You haven't placed any orders. Start exploring our catalogue!</p>
                <Link to="/products" className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold inline-block hover:bg-black transition-colors">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex gap-8 flex-wrap">
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Order Placed</div>
                          <div className="font-bold text-slate-900">{order.date}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total</div>
                          <div className="font-bold text-slate-900">₹{order.total.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Order ID</div>
                          <div className="font-bold text-slate-900">#{order.id}</div>
                        </div>
                      </div>
                      <Link 
                        to={`/order-tracking?id=${order.id}`}
                        className="flex items-center bg-white border border-slate-200 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:border-slate-300 transition-colors"
                      >
                        Track Order <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                      <button className="flex items-center bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-black transition-colors">
                        Invoice
                      </button>
                    </div>
                    
                    <div className="p-8">
                      <h3 className={cn("text-lg font-bold mb-8 flex items-center gap-2", 
                        order.status === 'Delivered' ? "text-green-600" : "text-blue-600")}>
                        Status: {order.status}
                      </h3>
                      
                      <div className="space-y-6">
                        {order.items.map(item => (
                          <div key={item.id} className="flex gap-6 items-center">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-slate-50 rounded-2xl p-2 border border-slate-100" />
                            <div className="flex-1">
                              <Link to={`/product/${item.id}`} className="font-bold text-lg hover:text-blue-600 hover:underline">{item.name}</Link>
                              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Qty: {item.quantity}</div>
                            </div>
                            <div className="font-black text-xl">₹{item.price.toLocaleString()}</div>
                            <button className="hidden sm:block ml-6 px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold transition-colors">Buy Again</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Address Book</h1>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-colors">Add New Address</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-blue-600 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">Default</div>
                <div className="font-bold text-lg mb-1">Home</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  123 Tech Park, Phase 1<br/>
                  Electronic City<br/>
                  Bangalore, Karnataka 560100<br/>
                  India
                </p>
                <div className="flex gap-4">
                  <button className="text-blue-600 text-sm font-bold hover:underline">Edit</button>
                  <button className="text-red-500 text-sm font-bold hover:underline">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'loyalty' && (
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">MobiRewards</h1>
            
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2">Available Points</div>
                  <div className="text-6xl font-black tracking-tighter">4,250</div>
                  <div className="text-sm font-medium mt-2 ext-indigo-100 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> ₹425 value on next purchase</div>
                </div>
                <Link to="/products" className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap w-full sm:w-auto text-center shadow-lg">
                  Redeem Now
                </Link>
              </div>
            </div>

            <h3 className="font-bold text-xl mb-6">Recent Activity</h3>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {[ 
                  { reason: 'Purchase Reward (Order #ORD-8832)', points: '+250', date: 'Oct 24, 2023', color: 'text-green-600' },
                  { reason: 'Product Review (iPhone 14)', points: '+50', date: 'Oct 18, 2023', color: 'text-green-600' },
                  { reason: 'Redeemed on Order #ORD-8119', points: '-500', date: 'Sep 02, 2023', color: 'text-red-500' }
                ].map((act, i) => (
                  <div key={i} className="p-6 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{act.reason}</div>
                      <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mt-1">{act.date}</div>
                    </div>
                    <div className={cn("font-black text-xl", act.color)}>{act.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
