import { useState } from 'react';
import { useStore } from '../store/useStore';
import { mockProducts } from '../data/mockData';
import { LayoutDashboard, Package, ShoppingBag, Users, Edit, Trash, Tag } from 'lucide-react';

export function Admin() {
  const { orders } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState('');

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  if (!isLogged) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-white border rounded-3xl shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
        <input 
          type="password" 
          placeholder="Enter Admin Password (any to enter)" 
          className="w-full border px-4 py-3 rounded-xl mb-4 bg-gray-50 focus:bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setIsLogged(true)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">Login</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white min-h-screen p-6 hidden md:block shrink-0">
        <h2 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3"><LayoutDashboard className="w-6 h-6 text-blue-400" /> MobiStore Admin</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center px-4 py-3 rounded-xl transition font-medium ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center px-4 py-3 rounded-xl transition font-medium ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Package className="w-5 h-5 mr-3" /> Products
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center px-4 py-3 rounded-xl transition font-medium ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <ShoppingBag className="w-5 h-5 mr-3" /> Orders
          </button>
          <button onClick={() => setActiveTab('discounts')} className={`w-full flex items-center px-4 py-3 rounded-xl transition font-medium ${activeTab === 'discounts' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Tag className="w-5 h-5 mr-3" /> Discounts
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">{activeTab}</h1>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-gray-500 mb-2 font-medium">Total Revenue</div>
              <div className="text-3xl font-bold text-gray-900">₹{revenue.toLocaleString()}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-gray-500 mb-2 font-medium">Total Orders</div>
              <div className="text-3xl font-bold text-gray-900">{orders.length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-gray-500 mb-2 font-medium">Active Products</div>
              <div className="text-3xl font-bold text-gray-900">{mockProducts.length}</div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
               <h2 className="font-bold">Inventory</h2>
               <button className="bg-blue-600 text-white px-4 py-2 font-bold rounded flex items-center text-sm">Add Product</button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockProducts.map(p => (
                  <tr key={p.id}>
                    <td className="p-4 flex items-center"><img src={p.image} className="w-10 h-10 object-contain mr-3" /> <span className="font-medium text-sm">{p.name}</span></td>
                    <td className="p-4 text-sm">{p.brand}</td>
                    <td className="p-4 text-sm">₹{p.price.toLocaleString()}</td>
                    <td className="p-4 text-sm"><span className={`px-2 py-1 rounded text-xs font-bold ${p.stockStatus==='In stock'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{p.stockStatus}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit className="w-4 h-4"/></button>
                        <button className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash className="w-4 h-4"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
             <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="p-4 font-mono font-bold text-sm">#{o.id}</td>
                    <td className="p-4 text-sm">{o.date}</td>
                    <td className="p-4">
                      <select className="text-sm border rounded p-1 bg-gray-50 focus:bg-white" defaultValue={o.status}>
                        <option>Confirmed</option>
                        <option>Shipped</option>
                        <option>Out for delivery</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                    <td className="p-4 font-medium text-sm">₹{o.total.toLocaleString()}</td>
                    <td className="p-4"><button className="text-sm text-blue-600 font-medium">Update</button></td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500 text-sm">No orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'discounts' && (
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden p-6">
            <h2 className="text-xl font-bold mb-6">Manage Discounts & Promo Codes</h2>
            
            <div className="flex gap-4 mb-8">
              <input type="text" placeholder="Promo Code (e.g., FESTIVE10)" className="flex-1 border px-4 py-2 rounded-xl" />
              <input type="number" placeholder="Discount %" className="w-32 border px-4 py-2 rounded-xl" />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">Create Code</button>
            </div>

            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="p-4">Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Uses</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-bold">WELCOME10</td>
                  <td className="p-4">10% Off</td>
                  <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Active</span></td>
                  <td className="p-4">1,245</td>
                  <td className="p-4">
                    <button className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash className="w-4 h-4"/></button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">DIWALI20</td>
                  <td className="p-4">20% Off</td>
                  <td className="p-4"><span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-bold">Expired</span></td>
                  <td className="p-4">8,902</td>
                  <td className="p-4">
                    <button className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash className="w-4 h-4"/></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
