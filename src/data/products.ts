import kurtaMen1 from "@/assets/products/kurta-men-1.jpg";
import kurtaMen2 from "@/assets/products/kurta-men-2.jpg";
import kurtaMen3 from "@/assets/products/kurta-men-3.jpg";
import kurtaWomen1 from "@/assets/products/kurta-women-1.jpg";
import kurtaWomen2 from "@/assets/products/kurta-women-2.jpg";
import kurtaWomen3 from "@/assets/products/kurta-women-3.jpg";
import kurtaKids1 from "@/assets/products/kurta-kids-1.jpg";
import ethnicCollection from "@/assets/products/ethnic-collection.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "men" | "women" | "kids" | "ethnic";
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White Cotton Kurta",
    price: 1499,
    originalPrice: 2199,
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Cream"],
    images: [kurtaMen1],
    description: "Handcrafted from premium cotton, this classic white kurta is perfect for everyday elegance. Features mandarin collar, side slits, and fine stitch detailing.",
    rating: 4.6,
    reviews: 124,
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Royal Blue Silk Embroidered Kurta",
    price: 3499,
    originalPrice: 4999,
    category: "men",
    sizes: ["M", "L", "XL"],
    colors: ["Blue", "Maroon"],
    images: [kurtaMen2],
    description: "A regal silk kurta adorned with intricate gold zari embroidery. Perfect for weddings and festive occasions.",
    rating: 4.8,
    reviews: 87,
    badge: "Festive Pick",
  },
  {
    id: "3",
    name: "Olive Linen Casual Kurta",
    price: 1799,
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Khaki"],
    images: [kurtaMen3],
    description: "Relaxed-fit linen kurta with a contemporary rolled-sleeve look. Breathable fabric ideal for Bengaluru weather.",
    rating: 4.4,
    reviews: 56,
  },
  {
    id: "4",
    name: "Saffron Embroidered Palazzo Suit",
    price: 2799,
    originalPrice: 3999,
    category: "women",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Orange", "Yellow"],
    images: [kurtaWomen1],
    description: "Stunning saffron kurta with delicate golden thread embroidery paired with flowing palazzos. A celebration of Indian craftsmanship.",
    rating: 4.7,
    reviews: 203,
    badge: "Trending",
  },
  {
    id: "5",
    name: "Maroon Anarkali with Golden Work",
    price: 4299,
    originalPrice: 5999,
    category: "women",
    sizes: ["S", "M", "L"],
    colors: ["Maroon", "Wine"],
    images: [kurtaWomen2],
    description: "Floor-length anarkali kurta in rich maroon with elaborate golden embroidery. Statement piece for special occasions.",
    rating: 4.9,
    reviews: 312,
    badge: "Premium",
  },
  {
    id: "6",
    name: "Pink Chikankari Straight Kurta",
    price: 1999,
    category: "women",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink", "White"],
    images: [kurtaWomen3],
    description: "Elegant pastel pink kurta featuring hand-done Lucknowi chikankari work. Lightweight and perfect for office or brunch.",
    rating: 4.5,
    reviews: 98,
  },
  {
    id: "7",
    name: "Golden Festive Kids Kurta Set",
    price: 999,
    originalPrice: 1499,
    category: "kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Yellow", "Gold"],
    images: [kurtaKids1],
    description: "Adorable festive kurta pajama set in vibrant golden yellow with subtle embroidery. Perfect for your little one's celebrations.",
    rating: 4.7,
    reviews: 156,
    badge: "Kids Favorite",
  },
  {
    id: "8",
    name: "Heritage Silk Collection Set",
    price: 5999,
    originalPrice: 8499,
    category: "ethnic",
    sizes: ["M", "L", "XL"],
    colors: ["Multi"],
    images: [ethnicCollection],
    description: "Curated collection of premium silk kurtas in heritage colors — saffron, maroon, and cream. A complete ethnic wardrobe essentials set.",
    rating: 4.8,
    reviews: 42,
    badge: "Limited Edition",
  },
];
