import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Home, Search, ShoppingCart, User, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import React from 'react';

export function Layout() {
  const cartItemCount = useStore(state => state.cart.reduce((acc, item) => acc + item.quantity, 0));
  const location = useLocation();
  const [showChat, setShowChat] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Live Chat Trigger */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col items-end">
        {showChat && (
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 w-80 h-96 mb-4 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white pb-8">
              <h3 className="font-extrabold text-lg tracking-tight">MobiSupport</h3>
              <p className="text-xs font-medium text-blue-100 mt-1">Usually replies in a few minutes</p>
            </div>
            <div className="flex-1 p-5 bg-slate-50 flex flex-col justify-end -mt-4 rounded-t-3xl border-t border-slate-100">
              <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm text-slate-700 w-fit max-w-[85%] border border-slate-100 font-medium leading-relaxed">
                Hi there! 👋 How can we help you choose your next device?
              </div>
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
              <input type="text" placeholder="Type your message..." className="w-full bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium" />
            </div>
          </div>
        )}
        <button onClick={() => setShowChat(!showChat)} className="flex items-center justify-center md:justify-start gap-3 bg-blue-600 text-white p-4 md:pl-4 md:pr-6 md:py-3 rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all group">
          <div className="relative">
             <MessageCircle className="w-6 h-6" />
             {!showChat && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-blue-600 rounded-full"></span>}
          </div>
          <span className="hidden md:inline font-bold text-sm tracking-tight">{showChat ? 'Close Chat' : 'Chat with us'}</span>
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 pb-safe z-40 safe-area-bottom">
        <Link to="/" className={`flex flex-col items-center p-1 ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-bold">Home</span>
        </Link>
        <Link to="/products" className={`flex flex-col items-center p-1 ${location.pathname === '/products' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
          <Search className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-bold">Shop</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center p-1 relative ${location.pathname === '/cart' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
          <ShoppingCart className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-bold">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link to="/account" className={`flex flex-col items-center p-1 ${location.pathname.startsWith('/account') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
          <User className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-bold">Account</span>
        </Link>
      </div>
    </div>
  );
}
