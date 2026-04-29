/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Compare } from './pages/Compare';
import { OrderHistory } from './pages/OrderHistory';
import { OrderTracking } from './pages/OrderTracking';
import { Refurbished } from './pages/Refurbished';
import { TradeIn } from './pages/TradeIn';
import { FlashSales } from './pages/FlashSales';
import { Admin } from './pages/Admin';
import { ImeiCheck } from './pages/ImeiCheck';
import { BulkOrder } from './pages/BulkOrder';
import { Wishlist } from './pages/Wishlist';
import { ScrollToTop } from './components/layout/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="compare" element={<Compare />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="account/orders" element={<OrderHistory />} />
          <Route path="order-tracking" element={<OrderTracking />} />
          <Route path="refurbished" element={<Refurbished />} />
          <Route path="trade-in" element={<TradeIn />} />
          <Route path="flash-sales" element={<FlashSales />} />
          <Route path="admin" element={<Admin />} />
          <Route path="imei-check" element={<ImeiCheck />} />
          <Route path="bulk-order" element={<BulkOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
