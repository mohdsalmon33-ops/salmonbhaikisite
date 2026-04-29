import { Link } from 'react-router-dom';
import { Package, ExternalLink } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export function OrderHistory() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h1>
        <p className="text-gray-500 mb-8">You haven't placed any orders. Start exploring our catalogue!</p>
        <Link to="/products" className="bg-black text-white px-8 py-3 rounded-full font-bold">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-8">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order Placed</div>
                  <div className="font-medium text-gray-900">{order.date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total</div>
                  <div className="font-medium text-gray-900">₹{order.total.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order ID</div>
                  <div className="font-medium text-gray-900">#{order.id}</div>
                </div>
              </div>
              <Link 
                to={`/order-tracking?id=${order.id}`}
                className="flex items-center text-blue-600 font-semibold hover:underline"
              >
                Track Order <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="p-6">
              <h3 className={cn("text-lg font-bold mb-6 flex items-center gap-2", 
                order.status === 'Delivered' ? "text-green-600" : "text-blue-600")}>
                Status: {order.status}
              </h3>
              
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-1 border" />
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="font-semibold hover:text-blue-600 hover:underline">{item.name}</Link>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold">₹{item.price.toLocaleString()}</div>
                    <button className="hidden sm:block ml-4 px-4 py-2 border rounded-full text-sm font-semibold hover:bg-gray-50">Buy Again</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
