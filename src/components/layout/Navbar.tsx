import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Smartphone } from 'lucide-react';
import { useStore } from '../../store/useStore';
import React, { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemCount = useStore(state => state.cart.reduce((acc, item) => acc + item.quantity, 0));
  const user = useStore(state => state.user);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 flex-shrink-0 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">MobiStore</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-500 ml-8">
            <Link to="/products" className="hover:text-blue-600 transition-colors">New Releases</Link>
            <Link to="/refurbished" className="hover:text-blue-600 transition-colors">Refurbished</Link>
            <Link to="/compare" className="hover:text-blue-600 transition-colors">Compare</Link>
            <Link to="/trade-in" className="hover:text-blue-600 transition-colors">Trade-in</Link>
          </nav>

          <div className="flex-1"></div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
              <input 
                type="text" 
                placeholder="Search budget phones..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-100 border-none rounded-full px-4 pl-10 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
               <Search className="w-4 h-4 text-slate-400 absolute left-4 top-2.5" />
            </form>

            <div className="flex items-center gap-1">
              <Link to="/wishlist" className="p-2 hover:bg-slate-100 rounded-full relative transition-colors text-slate-600">
                <Heart className="w-5 h-5" />
              </Link>
              
              <Link to="/cart" className="p-2 hover:bg-slate-100 rounded-full relative transition-colors text-slate-600">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                )}
              </Link>

              <div className="w-px h-6 bg-slate-200 mx-2"></div>

              <Link to={user ? "/account/orders" : "/login"} className="flex items-center gap-2 hover:bg-slate-100 p-1 pr-3 rounded-full transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                   <User className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-sm font-medium text-slate-700 hidden lg:block">{user ? user.name : 'Sign In'}</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-full text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white absolute w-full shadow-lg pb-4">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </form>
            <div className="flex flex-col space-y-1">
              <Link to="/products" className="text-slate-700 font-bold px-4 py-3 hover:bg-slate-50 rounded-xl">All Phones</Link>
              <Link to="/refurbished" className="text-slate-700 font-bold px-4 py-3 hover:bg-slate-50 rounded-xl">Refurbished</Link>
              <Link to="/compare" className="text-slate-700 font-bold px-4 py-3 hover:bg-slate-50 rounded-xl">Compare</Link>
              <Link to="/trade-in" className="text-slate-700 font-bold px-4 py-3 hover:bg-slate-50 rounded-xl">Trade-in</Link>
              <Link to="/flash-sales" className="text-red-500 font-bold px-4 py-3 hover:bg-red-50 rounded-xl">Flash Sales ⚡</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
