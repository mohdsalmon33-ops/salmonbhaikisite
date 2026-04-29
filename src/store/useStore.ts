import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/mockData';

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Confirmed' | 'Shipped' | 'Out for delivery' | 'Delivered';
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  orders: Order[];
  user: { id: string; name: string } | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  addOrder: (order: Order) => void;
  login: (name: string) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      compareList: [],
      orders: [],
      user: null,

      addToCart: (product, quantity = 1) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return { cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) };
        }
        return { cart: [...state.cart, { ...product, quantity }] };
      }),

      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item => item.id === productId ? { ...item, quantity } : item)
      })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlist.some(item => item.id === product.id);
        if (exists) {
          return { wishlist: state.wishlist.filter(item => item.id !== product.id) };
        }
        return { wishlist: [...state.wishlist, product] };
      }),

      addToCompare: (product) => set((state) => {
        if (state.compareList.length >= 3) return state;
        if (state.compareList.some(item => item.id === product.id)) return state;
        return { compareList: [...state.compareList, product] };
      }),

      removeFromCompare: (productId) => set((state) => ({
        compareList: state.compareList.filter(item => item.id !== productId)
      })),

      clearCompare: () => set({ compareList: [] }),

      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders]
      })),

      login: (name) => set({ user: { id: 'u1', name } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'mobistore-storage',
    }
  )
);
