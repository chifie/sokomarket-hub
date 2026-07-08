import type {
  Product, Seller, Category, FlashSale, Review, 
  Notification, AISuggestion, Testimonial, Stat
} from "@/types";

// ===== Categories =====
export const categories: Category[] = [
  { id: "c1", name: "Electronics", slug: "electronics", icon: "smartphone", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80", productCount: 12450 },
  { id: "c2", name: "Fashion", slug: "fashion", icon: "shirt", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80", productCount: 32100 },
  { id: "c3", name: "Home & Living", slug: "home-living", icon: "home", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80", productCount: 18900 },
  { id: "c4", name: "Beauty", slug: "beauty", icon: "sparkles", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", productCount: 8700 },
  { id: "c5", name: "Sports", slug: "sports", icon: "trophy", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80", productCount: 5600 },
  { id: "c6", name: "Books", slug: "books", icon: "book-open", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", productCount: 23400 },
  { id: "c7", name: "Automotive", slug: "automotive", icon: "car", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80", productCount: 3400 },
  { id: "c8", name: "Health", slug: "health", icon: "heart-pulse", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", productCount: 4200 },
];

// ===== Sellers =====
export const sellers: Seller[] = [
  { id: "s1", name: "James Ochieng", storeName: "TechHub Africa", logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", description: "Premium electronics and gadgets from top brands.", rating: 4.8, totalSales: 15230, totalProducts: 342, followers: 12400, verified: true, joinedAt: "2022-03-15", responseRate: 98, responseTime: "< 1 hour", location: "Nairobi, Kenya", badges: ["Top Rated", "Fast Shipper"] },
  { id: "s2", name: "Amina Hassan", storeName: "Fashion Forward KE", logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina", description: "Curated fashion for the modern African woman.", rating: 4.9, totalSales: 28400, totalProducts: 567, followers: 23100, verified: true, joinedAt: "2021-07-22", responseRate: 100, responseTime: "< 30 min", location: "Dar es Salaam, Tanzania", badges: ["Top Rated", "Best Seller", "Fast Shipper"] },
  { id: "s3", name: "Peter Kamau", storeName: "Soko Gadgets", logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter", description: "Affordable tech accessories and mobile devices.", rating: 4.6, totalSales: 8900, totalProducts: 178, followers: 5600, verified: true, joinedAt: "2023-01-10", responseRate: 95, responseTime: "< 2 hours", location: "Mombasa, Kenya", badges: ["Top Rated"] },
  { id: "s4", name: "Grace Wanjiku", storeName: "Grace's Home Decor", logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace", description: "Beautiful home decor and furniture pieces.", rating: 4.7, totalSales: 12100, totalProducts: 256, followers: 8900, verified: true, joinedAt: "2022-09-05", responseRate: 97, responseTime: "< 1 hour", location: "Kampala, Uganda", badges: ["Top Rated", "Fast Shipper"] },
  { id: "s5", name: "David Mwangi", storeName: "SportZone KE", logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=David", description: "Everything sports and fitness equipment.", rating: 4.5, totalSales: 6700, totalProducts: 145, followers: 3400, verified: false, joinedAt: "2023-04-18", responseRate: 92, responseTime: "< 3 hours", location: "Nairobi, Kenya", badges: [] },
  { id: "s6", name: "Sarah Akinyi", storeName: "Beauty & Glow", logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", description: "Premium beauty products and cosmetics.", rating: 4.9, totalSales: 19800, totalProducts: 423, followers: 15600, verified: true, joinedAt: "2021-11-30", responseRate: 99, responseTime: "< 30 min", location: "Kigali, Rwanda", badges: ["Top Rated", "Best Seller"] },
];

// ===== Products =====
export const products: Product[] = [
  {
    id: "p1", name: "iPhone 15 Pro Max 256GB", slug: "iphone-15-pro-max", description: "The most powerful iPhone ever. A17 Pro chip, 48MP camera system, and titanium design.", price: 1599, discountPrice: 1399, currency: "USD", images: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&q=80", "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80"], category: "Electronics", subcategory: "Smartphones", brand: "Apple", sku: "IP15PM256", quantity: 50, sold: 1280, condition: "new", colors: ["Natural Titanium", "Blue Titanium", "White Titanium"], tags: ["iphone", "apple", "smartphone", "premium"], seller: sellers[0], rating: 4.8, reviewCount: 342, warranty: "1 Year Apple Warranty", returnPolicy: "30-Day Return", featured: true, trending: true, createdAt: "2024-01-15", updatedAt: "2024-03-01",
  },
  {
    id: "p2", name: "Samsung Galaxy S24 Ultra", slug: "samsung-s24-ultra", description: "Galaxy AI is here. Built with titanium, Galaxy S24 Ultra is a powerhouse of creativity and productivity.", price: 1399, discountPrice: 1199, currency: "USD", images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80"], category: "Electronics", subcategory: "Smartphones", brand: "Samsung", sku: "SS24U256", quantity: 35, sold: 890, condition: "new", colors: ["Titanium Gray", "Titanium Violet", "Titanium Black"], tags: ["samsung", "galaxy", "smartphone", "android"], seller: sellers[0], rating: 4.7, reviewCount: 256, warranty: "1 Year Samsung Warranty", returnPolicy: "30-Day Return", featured: true, trending: true, createdAt: "2024-02-01", updatedAt: "2024-03-01",
  },
  {
    id: "p3", name: "Wireless Noise-Cancelling Headphones Pro", slug: "wireless-nc-headphones", description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound.", price: 349, discountPrice: 279, currency: "USD", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80"], category: "Electronics", subcategory: "Audio", brand: "SoundMax", sku: "SM-NC-PRO", quantity: 200, sold: 3450, condition: "new", colors: ["Matte Black", "Silver", "Midnight Blue"], tags: ["headphones", "wireless", "noise-cancelling", "audio"], seller: sellers[2], rating: 4.6, reviewCount: 891, warranty: "2 Year Warranty", returnPolicy: "30-Day Return", featured: true, trending: false, createdAt: "2024-01-10", updatedAt: "2024-02-15",
  },
  {
    id: "p4", name: "African Print Maxi Dress", slug: "african-print-maxi-dress", description: "Stunning Ankara print maxi dress with modern silhouette. Perfect for special occasions and everyday elegance.", price: 89, discountPrice: 65, currency: "USD", images: ["https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80"], category: "Fashion", subcategory: "Dresses", brand: "Fashion Forward", sku: "AFR-MAXI-001", quantity: 150, sold: 2340, condition: "new", sizes: ["XS", "S", "M", "L", "XL", "XXL"], tags: ["ankara", "african-print", "dress", "maxi"], seller: sellers[1], rating: 4.9, reviewCount: 567, returnPolicy: "14-Day Return", featured: true, trending: true, createdAt: "2024-02-15", updatedAt: "2024-03-01",
  },
  {
    id: "p5", name: "Smart Watch Series 9", slug: "smart-watch-series-9", description: "Advanced health monitoring, always-on display, and powerful performance in a sleek design.", price: 449, discountPrice: 399, currency: "USD", images: ["https://images.unsplash.com/photo-1546868871-af0de0ae72e6?w=600&q=80", "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80"], category: "Electronics", subcategory: "Wearables", brand: "TechWear", sku: "TW-S9-BLK", quantity: 80, sold: 1560, condition: "new", colors: ["Midnight", "Starlight", "Product Red"], tags: ["smartwatch", "wearable", "fitness", "health"], seller: sellers[0], rating: 4.7, reviewCount: 432, warranty: "1 Year Warranty", returnPolicy: "30-Day Return", featured: true, trending: true, createdAt: "2024-01-20", updatedAt: "2024-03-01",
  },
  {
    id: "p6", name: "Premium Leather Handbag", slug: "premium-leather-handbag", description: "Handcrafted genuine leather handbag with gold-tone hardware and spacious interior compartments.", price: 299, currency: "USD", images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"], category: "Fashion", subcategory: "Bags", brand: "Luxe Craft", sku: "LC-LHB-001", quantity: 45, sold: 890, condition: "new", colors: ["Tan", "Black", "Burgundy"], tags: ["leather", "handbag", "premium", "luxury"], seller: sellers[1], rating: 4.8, reviewCount: 234, warranty: "1 Year Warranty", returnPolicy: "30-Day Return", featured: false, trending: true, createdAt: "2024-02-10", updatedAt: "2024-03-01",
  },
  {
    id: "p7", name: "Smart Home Security Camera", slug: "smart-home-camera", description: "4K Ultra HD security camera with AI motion detection, night vision, and two-way audio.", price: 129, discountPrice: 99, currency: "USD", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80"], category: "Electronics", subcategory: "Smart Home", brand: "SecureHome", sku: "SH-4K-CAM", quantity: 300, sold: 4560, condition: "new", tags: ["security", "camera", "smart-home", "4k"], seller: sellers[2], rating: 4.5, reviewCount: 678, warranty: "2 Year Warranty", returnPolicy: "30-Day Return", featured: false, trending: false, createdAt: "2024-01-05", updatedAt: "2024-02-20",
  },
  {
    id: "p8", name: "Organic Skincare Set", slug: "organic-skincare-set", description: "Complete organic skincare routine with cleanser, toner, serum, and moisturizer. Natural ingredients.", price: 79, discountPrice: 59, currency: "USD", images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80"], category: "Beauty", subcategory: "Skincare", brand: "PureGlow", sku: "PG-ORG-SET", quantity: 200, sold: 3450, condition: "new", tags: ["skincare", "organic", "natural", "beauty"], seller: sellers[5], rating: 4.9, reviewCount: 1234, returnPolicy: "30-Day Return", featured: true, trending: true, createdAt: "2024-02-20", updatedAt: "2024-03-01",
  },
  {
    id: "p9", name: "Ergonomic Office Chair", slug: "ergonomic-office-chair", description: "Premium ergonomic chair with lumbar support, adjustable armrests, and breathable mesh back.", price: 599, discountPrice: 449, currency: "USD", images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80"], category: "Home & Living", subcategory: "Furniture", brand: "Comfort Plus", sku: "CP-ERGO-001", quantity: 30, sold: 670, condition: "new", colors: ["Black", "Gray", "White"], tags: ["office", "ergonomic", "chair", "furniture"], seller: sellers[3], rating: 4.6, reviewCount: 345, warranty: "5 Year Warranty", returnPolicy: "60-Day Return", featured: true, trending: false, createdAt: "2024-01-25", updatedAt: "2024-03-01",
  },
  {
    id: "p10", name: "Professional Running Shoes", slug: "professional-running-shoes", description: "Lightweight performance running shoes with responsive cushioning and breathable upper.", price: 179, discountPrice: 139, currency: "USD", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"], category: "Sports", subcategory: "Footwear", brand: "SpeedRunner", sku: "SR-PRO-RUN", quantity: 100, sold: 2340, condition: "new", sizes: ["7", "8", "9", "10", "11", "12", "13"], colors: ["Black/White", "Blue/Neon", "Red/Black"], tags: ["running", "shoes", "sports", "fitness"], seller: sellers[4], rating: 4.5, reviewCount: 567, returnPolicy: "30-Day Return", featured: false, trending: true, createdAt: "2024-02-05", updatedAt: "2024-03-01",
  },
];

// ===== Flash Sale =====
export const flashSale: FlashSale = {
  id: "fs1",
  title: "Flash Sale",
  description: "Limited time offers - up to 60% off on selected items!",
  products: products.slice(0, 5),
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  discount: 40,
  isActive: true,
};

// ===== Reviews =====
export const reviews: Review[] = [
  { id: "r1", userId: "u1", userName: "John M.", userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", productId: "p1", rating: 5, title: "Absolutely amazing!", comment: "Best phone I've ever owned. The camera is incredible and battery life is outstanding.", likes: 24, createdAt: "2024-02-15" },
  { id: "r2", userId: "u2", userName: "Mary W.", userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary", productId: "p1", rating: 4, title: "Great phone, great price", comment: "Loving the phone so far. The titanium design feels premium.", likes: 12, createdAt: "2024-02-20" },
];

// ===== Testimonials =====
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Elizabeth Njoroge", role: "Fashion Buyer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth", content: "Soko Digital has transformed how I shop for fashion. The variety of sellers and authentic products is unmatched. I've discovered so many amazing African brands!", rating: 5 },
  { id: "t2", name: "Michael Omondi", role: "Electronics Enthusiast", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", content: "Found the best deals on electronics here. The seller verification system gives me confidence, and delivery is always on time. Highly recommended!", rating: 5 },
  { id: "t3", name: "Sarah Kimani", role: "Home Decor Lover", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahK", content: "The AI recommendations helped me find exactly what I needed for my new home. Beautiful products, great prices, and excellent customer service.", rating: 4 },
  { id: "t4", name: "David M.", role: "Tech Seller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidM", content: "As a seller, Soko Digital has been a game-changer. The analytics tools and seller dashboard make managing my store effortless. Sales have increased 3x!", rating: 5 },
];

// ===== Stats =====
export interface Stat {
  value: string;
  label: string;
  icon: string;
  suffix?: string;
}

export const stats: Stat[] = [
  { value: "2.5M+", label: "Active Buyers", icon: "users", suffix: "+12%" },
  { value: "50K+", label: "Verified Sellers", icon: "store", suffix: "+8%" },
  { value: "5M+", label: "Products Listed", icon: "package", suffix: "+15%" },
  { value: "98%", label: "Satisfaction Rate", icon: "smile", suffix: "+2%" },
];

// ===== Notifications =====
export const notifications: Notification[] = [
  { id: "n1", type: "order", title: "Order Confirmed", message: "Your order #ORD-2024-001 has been confirmed and is being processed.", read: false, link: "/orders/ord-001", createdAt: new Date().toISOString() },
  { id: "n2", type: "promotion", title: "Flash Sale Alert!", message: "Up to 60% off on electronics - don't miss out!", read: false, link: "/flash-sale", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "n3", type: "system", title: "Welcome to Soko Digital", message: "Thank you for joining! Complete your profile to get started.", read: true, link: "/profile", createdAt: new Date(Date.now() - 86400000).toISOString() },
];

// ===== AI Suggestions =====
export const aiSuggestions: AISuggestion[] = [
  { id: "a1", text: "Find me a good laptop under $1000", icon: "laptop", category: "Shopping" },
  { id: "a2", text: "Compare iPhone 15 Pro and Samsung S24 Ultra", icon: "smartphone", category: "Compare" },
  { id: "a3", text: "What are the trending fashion items this week?", icon: "trending-up", category: "Trending" },
  { id: "a4", text: "Help me track my order", icon: "package-search", category: "Orders" },
  { id: "a5", text: "Show me deals on beauty products", icon: "sparkles", category: "Deals" },
  { id: "a6", text: "Best sellers in home decor", icon: "home", category: "Shopping" },
];

// ===== Browse History =====
export const browseHistory: string[] = ["iPhone 15 Pro Max", "Wireless Headphones", "African Print Dress", "Smart Watch", "Leather Handbag"];

// ===== Currencies / Languages =====
export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
];

export const currencies = [
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling" },
  { code: "UGX", symbol: "USh", name: "Ugandan Shilling" },
  { code: "RWF", symbol: "FRw", name: "Rwandan Franc" },
  { code: "USD", symbol: "$", name: "US Dollar" },
];
