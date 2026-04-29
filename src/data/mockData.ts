export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  specs: {
    ram: string;
    storage: string;
    battery: string;
    camera: string;
    processor: string;
    is5G: boolean;
    fastCharging: string;
  };
  isRefurbished: boolean;
  stockStatus: 'In stock' | 'Low stock' | 'Out of stock';
  rating: number;
  reviewsCount: number;
  description: string;
  emiOptions: { months: number; amount: number }[];
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 134900,
    originalPrice: 144900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
    specs: {
      ram: "8GB",
      storage: "256GB",
      battery: "3274 mAh",
      camera: "48MP + 12MP + 12MP",
      processor: "A17 Pro",
      is5G: true,
      fastCharging: "20W",
    },
    isRefurbished: false,
    stockStatus: 'In stock',
    rating: 4.8,
    reviewsCount: 1245,
    description: "The ultimate iPhone experience with A17 Pro chip and titanium body.",
    emiOptions: [{ months: 3, amount: 44966 }, { months: 6, amount: 22483 }, { months: 9, amount: 14988 }],
  },
  {
    id: "p2",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 129999,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop",
    specs: {
      ram: "12GB",
      storage: "512GB",
      battery: "5000 mAh",
      camera: "200MP + 50MP + 12MP + 10MP",
      processor: "Snapdragon 8 Gen 3",
      is5G: true,
      fastCharging: "45W",
    },
    isRefurbished: false,
    stockStatus: 'In stock',
    rating: 4.9,
    reviewsCount: 892,
    description: "Galaxy AI is here. Welcome to the era of mobile AI.",
    emiOptions: [{ months: 3, amount: 43333 }, { months: 6, amount: 21666 }, { months: 9, amount: 14444 }],
  },
  {
    id: "p3",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 106999,
    originalPrice: 116999,
    image: "https://images.unsplash.com/photo-1696446700854-e6df5b91a0cc?q=80&w=2070&auto=format&fit=crop",
    specs: {
      ram: "12GB",
      storage: "128GB",
      battery: "5050 mAh",
      camera: "50MP + 48MP + 48MP",
      processor: "Tensor G3",
      is5G: true,
      fastCharging: "30W",
    },
    isRefurbished: false,
    stockStatus: 'Low stock',
    rating: 4.6,
    reviewsCount: 562,
    description: "Everyday moments made extraordinary with Google AI.",
    emiOptions: [{ months: 3, amount: 35666 }, { months: 6, amount: 17833 }, { months: 9, amount: 11888 }],
  },
  {
    id: "p4",
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 64999,
    image: "https://images.unsplash.com/photo-1706857185038-06ccb34ba18f?q=80&w=1974&auto=format&fit=crop",
    specs: {
      ram: "12GB",
      storage: "256GB",
      battery: "5400 mAh",
      camera: "50MP + 64MP + 48MP",
      processor: "Snapdragon 8 Gen 3",
      is5G: true,
      fastCharging: "100W",
    },
    isRefurbished: false,
    stockStatus: 'In stock',
    rating: 4.7,
    reviewsCount: 420,
    description: "Smooth beyond belief. Co-developed with Hasselblad.",
    emiOptions: [{ months: 3, amount: 21666 }, { months: 6, amount: 10833 }, { months: 9, amount: 7222 }],
  },
  {
    id: "p5",
    name: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    price: 79999,
    image: "https://images.unsplash.com/photo-1698286915233-872f2d9195d9?q=80&w=2070&auto=format&fit=crop",
    specs: {
      ram: "12GB",
      storage: "256GB",
      battery: "4820 mAh",
      camera: "50MP + 50MP + 50MP",
      processor: "Snapdragon 8 Gen 2",
      is5G: true,
      fastCharging: "120W",
    },
    isRefurbished: true,
    stockStatus: 'In stock',
    rating: 4.5,
    reviewsCount: 310,
    description: "Certified Refurbished. Leica optics for incredible photography.",
    emiOptions: [{ months: 3, amount: 26666 }, { months: 6, amount: 13333 }, { months: 9, amount: 8888 }],
  },
  {
    id: "p6",
    name: "Moto G84 5G",
    brand: "Motorola",
    price: 18999,
    originalPrice: 22999,
    image: "https://images.unsplash.com/photo-1696417758652-3d2fbc622fe0?q=80&w=1964&auto=format&fit=crop",
    specs: {
      ram: "12GB",
      storage: "256GB",
      battery: "5000 mAh",
      camera: "50MP + 8MP",
      processor: "Snapdragon 695",
      is5G: true,
      fastCharging: "30W",
    },
    isRefurbished: false,
    stockStatus: 'Out of stock',
    rating: 4.3,
    reviewsCount: 89,
    description: "Premium design, vibrant colors, and smooth performance.",
    emiOptions: [{ months: 3, amount: 6333 }, { months: 6, amount: 3166 }, { months: 9, amount: 2111 }],
  }
];

export const accessories = [
  { id: "a1", name: "Silicone Case", price: 999, forBrand: "Apple", image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=200" },
  { id: "a2", name: "20W Fast Charger", price: 1499, forBrand: "Apple", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200" },
  { id: "a3", name: "Screen Protector", price: 499, forBrand: "Any", image: "https://images.unsplash.com/photo-1542496658-e32a6bbbb563?w=200" }
];
