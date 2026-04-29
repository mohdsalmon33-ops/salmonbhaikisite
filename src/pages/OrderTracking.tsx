import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Package, Truck, CheckCircle2, Box } from 'lucide-react';
import { cn } from '../lib/utils';
import React, { useState } from 'react';

export function OrderTracking() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [orderId, setOrderId] = useState(initialId);
  const [searchedId, setSearchedId] = useState(initialId);

  const { orders } = useStore();
  
  const order = orders.find(o => o.id === searchedId);

  const steps = ['Confirmed', 'Shipped', 'Out for delivery', 'Delivered'];
  
  // Fake tracking state based on status text matching
  const currentStepIndex = order ? steps.indexOf(order.status) : -1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedId(orderId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. ORD123456)" 
            className="flex-1 border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-8 font-bold rounded-xl hover:bg-blue-700">Track</button>
        </form>
      </div>

      {searchedId && !order && (
        <div className="text-center py-12 bg-red-50 text-red-600 rounded-2xl font-medium">
          Order not found. Please check the ID and try again.
        </div>
      )}

      {order && (
        <div className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border">
          <div className="mb-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p className="text-gray-500">Expected Delivery: {new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000).toDateString()}</p>
          </div>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 sm:h-2 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000 ease-in-out"
                style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div className={cn(
                      "w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center z-10 transition-colors duration-500 border-4",
                      isActive ? "bg-blue-600 border-white text-white" : "bg-white border-gray-200 text-gray-400"
                    )}>
                      {index === 0 && <Box className="w-4 h-4 sm:w-6 sm:h-6" />}
                      {index === 1 && <Package className="w-4 h-4 sm:w-6 sm:h-6" />}
                      {index === 2 && <Truck className="w-4 h-4 sm:w-6 sm:h-6" />}
                      {index === 3 && <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />}
                    </div>
                    <div className={cn(
                      "mt-4 text-xs sm:text-sm font-bold absolute -bottom-8 whitespace-nowrap",
                      isActive ? "text-gray-900" : "text-gray-400"
                    )}>
                      {step}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t space-y-4">
             <h3 className="font-bold">Ordered Items</h3>
             {order.items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1 border" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
