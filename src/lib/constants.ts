import type {
  Product, Seller, Category, FlashSale, Review, Notification,
  Testimonial, Stat, Banner, AISuggestion
} from "@/types";

// ===== Marketplace Stats =====
export const stats: Stat[] = [
  { value: "50K+", label: "Active Buyers", icon: "Users" },
  { value: "10K+", label: "Trusted Sellers", icon: "Store" },
  { value: "100K+", label: "Products Listed", icon: "Package" },
  { value: "1M+", label: "Orders Delivered", icon: "ShoppingCart" },
];

// ===== Categories =====
export const categories: Category[] = [
  { id: "cat-1", name: "Phones & Tablets", slug: "phones-tablets", icon: "Smartphone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", productCount: 15230, subcategories: [
    { id: "sub-1", name: "Smartphones", slug: "smartphones", productCount: 8500 },
    { id: "sub-2", name: "Tablets", slug: "tablets", productCount: 3200 },
    { id: "sub-3", name: "Accessories", slug: "phone-accessories", productCount: 3530 },
  ]},
  { id: "cat-2", name: "Computers", slug: "computers", icon: "Monitor", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", productCount: 8940, subcategories: [
    { id: "sub-4", name: "Laptops", slug: "laptops", productCount: 4500 },
    { id: "sub-5", name: "Desktops", slug: "desktops", productCount: 2100 },
    { id: "sub-6", name: "Computer Parts", slug: "computer-parts", productCount: 2340 },
  ]},
  { id: "cat-3", name: "Electronics", slug: "electronics", icon: "Zap", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80", productCount: 12450 },
  { id: "cat-4", name: "Fashion", slug: "fashion", icon: "Shirt", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80", productCount: 28400 },
  { id: "cat-5", name: "Shoes", slug: "shoes", icon: "Footprints", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", productCount: 12300 },
  { id: "cat-6", name: "Beauty", slug: "beauty", icon: "Sparkles", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", productCount: 9800 },
  { id: "cat-7", name: "Groceries", slug: "groceries", icon: "Apple", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80", productCount: 45000 },
  { id: "cat-8", name: "Furniture", slug: "furniture", icon: "Armchair", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", productCount: 6700 },
  { id: "cat-9", name: "Home & Kitchen", slug: "home-kitchen", icon: "Home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", productCount: 15600 },
  { id: "cat-10", name: "Gaming", slug: "gaming", icon: "Gamepad2", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80", productCount: 4300 },
  { id: "cat-11", name: "Automotive", slug: "automotive", icon: "Car", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80", productCount: 3400 },
  { id: "cat-12", name: "Sports", slug: "sports", icon: "Trophy", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80", productCount: 5600 },
  { id: "cat-13", name: "Baby Products", slug: "baby-products", icon: "Baby", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80", productCount: 2900 },
  { id: "cat-14", name: "Books", slug: "books", icon: "BookOpen", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", productCount: 8700 },
  { id: "cat-15", name: "Health", slug: "health", icon: "Heart", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", productCount: 6200 },
];

// ===== Sellers =====
export const sellers: Seller[] = [
  { id: "seller-1", name: "Amina Juma", storeName: "Amina Fashion House",
    logo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    banner: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Premium Tanzanian fashion and accessories. Handmade with love.", rating: 4.8,
    totalSales: 15230, totalProducts: 340, followers: 12500, verified: true,
    joinedAt: "2023-01-15", responseRate: 98, responseTime: "within 1 hour", location: "Dar es Salaam",
    badges: ["Top Seller", "Fast Shipper", "Quality Assured"] },
  { id: "seller-2", name: "James Ochieng", storeName: "TechZone Tanzania",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    banner: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Your trusted source for authentic electronics and gadgets.", rating: 4.6,
    totalSales: 8940, totalProducts: 520, followers: 8900, verified: true,
    joinedAt: "2023-03-20", responseRate: 95, responseTime: "within 2 hours", location: "Arusha",
    badges: ["Verified", "Top Rated"] },
  { id: "seller-3", name: "Mwanahamisi Salim", storeName: "Mama's Fresh Groceries",
    logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    banner: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Fresh farm produce delivered to your doorstep daily.", rating: 4.9,
    totalSales: 28400, totalProducts: 180, followers: 18400, verified: true,
    joinedAt: "2023-02-01", responseRate: 99, responseTime: "within 30 mins", location: "Zanzibar",
    badges: ["Top Seller", "Fresh Guarantee", "Best Price"] },
  { id: "seller-4", name: "Raj Patel", storeName: "Furniture Palace",
    logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    banner: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Modern and traditional furniture for every home.", rating: 4.5,
    totalSales: 4300, totalProducts: 260, followers: 5600, verified: true,
    joinedAt: "2023-06-10", responseRate: 92, responseTime: "within 3 hours", location: "Mwanza",
    badges: ["Quality Assured", "Free Delivery"] },
  { id: "seller-5", name: "Grace Mwangi", storeName: "Grace Beauty Store",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    banner: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Premium beauty and skincare products from around the world.", rating: 4.7,
    totalSales: 12300, totalProducts: 450, followers: 10200, verified: true,
    joinedAt: "2023-04-05", responseRate: 96, responseTime: "within 1 hour", location: "Dodoma",
    badges: ["Verified", "Top Rated", "Fast Shipper"] },
  { id: "seller-6", name: "Peter Kimani", storeName: "SportZone TZ",
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    banner: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Premium sports equipment, athletic wear, and fitness gear.", rating: 4.4,
    totalSales: 6700, totalProducts: 190, followers: 4800, verified: true,
    joinedAt: "2023-08-15", responseRate: 93, responseTime: "within 2 hours", location: "Mbeya",
    badges: ["Verified", "Fast Shipper"] },
  { id: "seller-7", name: "Hannah Mtui", storeName: "Home Essentials TZ",
    logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    banner: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Quality home and kitchen essentials for modern Tanzanian homes.", rating: 4.6,
    totalSales: 9200, totalProducts: 310, followers: 7200, verified: true,
    joinedAt: "2023-05-01", responseRate: 97, responseTime: "within 1 hour", location: "Morogoro",
    badges: ["Quality Assured", "Top Rated"] },
  { id: "seller-8", name: "John Mbwana", storeName: "BookWorm Tanzania",
    logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    banner: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description: "Books, stationery, and educational materials for all ages.", rating: 4.5,
    totalSales: 5400, totalProducts: 1200, followers: 3900, verified: true,
    joinedAt: "2023-09-10", responseRate: 94, responseTime: "within 3 hours", location: "Arusha",
    badges: ["Verified", "Fast Shipper"] },
];

// ===== Products =====
export const products: Product[] = [
  { id: "p1", name: "iPhone 15 Pro Max 256GB", slug: "iphone-15-pro-max-256gb",
    description: "The most powerful iPhone ever. A17 Pro chip, 48MP camera system, and all-day battery life.",
    price: 3500000, discountPrice: 3150000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&q=80","https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80","https://images.unsplash.com/photo-1695149721801-4c9aa8c2e4b8?w=600&q=80"],
    category: "Phones & Tablets", brand: "Apple", sku: "IP15PM256", quantity: 50, sold: 230, condition: "new",
    specifications: { "Display": "6.7-inch OLED", "Chip": "A17 Pro", "Camera": "48MP Triple", "Battery": "4422mAh" },
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium"],
    tags: ["iphone", "apple", "premium", "smartphone"],
    seller: sellers[0], rating: 4.8, reviewCount: 234, warranty: "1 Year Apple Warranty", returnPolicy: "14 days return",
    deliveryOptions: [{ method: "Standard", price: 15000, estimatedDays: "2-3 days" },{ method: "Express", price: 35000, estimatedDays: "1 day" }],
    featured: true, trending: false, status: "active", createdAt: "2024-01-15", updatedAt: "2024-02-01" },
  { id: "p2", name: "MacBook Pro 16-inch M3 Max", slug: "macbook-pro-16-m3-max",
    description: "Supercharged by M3 Max chip. Up to 128GB unified memory. Stunning 16-inch Liquid Retina XDR display.",
    price: 5800000, discountPrice: 5490000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80","https://images.unsplash.com/photo-1611186871348-b1f696febbb3?w=600&q=80"],
    category: "Computers", brand: "Apple", sku: "MBP16M3M", quantity: 25, sold: 89, condition: "new",
    specifications: { "Chip": "M3 Max", "RAM": "48GB", "Storage": "1TB SSD", "Display": "16.2-inch" },
    tags: ["macbook", "apple", "laptop", "premium"],
    seller: sellers[1], rating: 4.9, reviewCount: 156, warranty: "1 Year Apple Warranty",
    deliveryOptions: [{ method: "Standard", price: 20000, estimatedDays: "2-3 days" },{ method: "Express", price: 45000, estimatedDays: "1 day" }],
    featured: true, trending: true, status: "active", createdAt: "2024-01-20", updatedAt: "2024-02-01" },
  { id: "p3", name: "Sony WH-1000XM5 Wireless Headphones", slug: "sony-wh-1000xm5",
    description: "Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling.",
    price: 650000, discountPrice: 520000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80","https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80"],
    category: "Electronics", brand: "Sony", sku: "WH1000XM5", quantity: 100, sold: 445, condition: "new",
    specifications: { "Type": "Over-ear", "Battery": "30 hours", "Noise Cancellation": "Adaptive", "Codec": "LDAC" },
    colors: ["Black", "Silver", "Midnight Blue"],
    tags: ["sony", "headphones", "noise-cancelling", "wireless"],
    seller: sellers[1], rating: 4.7, reviewCount: 312, warranty: "1 Year Sony Warranty", returnPolicy: "7 days return",
    deliveryOptions: [{ method: "Standard", price: 8000, estimatedDays: "1-2 days" },{ method: "Express", price: 15000, estimatedDays: "Same day" }],
    featured: true, trending: false, status: "active", createdAt: "2024-01-10", updatedAt: "2024-02-01" },
  { id: "p4", name: "Apple Watch Ultra 2", slug: "apple-watch-ultra-2",
    description: "Most rugged and capable Apple Watch. 49mm titanium case, precision dual-frequency GPS.",
    price: 1850000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1546868871-af0de0ae72e6?w=600&q=80","https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80"],
    category: "Electronics", brand: "Apple", sku: "AWU2", quantity: 40, sold: 167, condition: "new",
    specifications: { "Display": "49mm", "Chip": "S9 SiP", "Battery": "36 hours", "Water Resistance": "100m" },
    colors: ["Natural Titanium", "Black Titanium"],
    tags: ["apple", "watch", "premium", "fitness"],
    seller: sellers[0], rating: 4.8, reviewCount: 89, warranty: "1 Year Apple Warranty",
    deliveryOptions: [{ method: "Standard", price: 10000, estimatedDays: "1-2 days" },{ method: "Express", price: 20000, estimatedDays: "Same day" }],
    featured: true, trending: false, status: "active", createdAt: "2024-01-25", updatedAt: "2024-02-01" },
  { id: "p5", name: "Nike Air Max 270 React", slug: "nike-air-max-270-react",
    description: "Comfort meets style. Dual-pressure Air Max unit and React foam for all-day comfort.",
    price: 280000, discountPrice: 210000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80"],
    category: "Shoes", brand: "Nike", sku: "AM270R", quantity: 200, sold: 890, condition: "new",
    specifications: { "Type": "Casual", "Material": "Mesh/Synthetic", "Sole": "Rubber" },
    colors: ["Black/White", "Blue/Orange", "All White"], sizes: ["39", "40", "41", "42", "43", "44", "45"],
    tags: ["nike", "shoes", "sneakers", "fashion"],
    seller: sellers[0], rating: 4.6, reviewCount: 567, returnPolicy: "30 days return",
    deliveryOptions: [{ method: "Standard", price: 7000, estimatedDays: "1-3 days" },{ method: "Express", price: 12000, estimatedDays: "1 day" }],
    featured: false, trending: true, status: "active", createdAt: "2024-01-05", updatedAt: "2024-02-01" },
  { id: "p6", name: "Premium Leather Handbag", slug: "premium-leather-handbag",
    description: "Handcrafted genuine leather handbag. Perfect for work and special occasions.",
    price: 350000, discountPrice: 280000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80","https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80"],
    category: "Fashion", brand: "Local Artisan", sku: "LBH001", quantity: 30, sold: 145, condition: "new",
    specifications: { "Material": "Genuine Leather", "Color": "Brown", "Dimensions": "30x25x10cm" },
    colors: ["Brown", "Black", "Tan"],
    tags: ["handbag", "leather", "premium", "fashion"],
    seller: sellers[0], rating: 4.9, reviewCount: 78, returnPolicy: "14 days return",
    deliveryOptions: [{ method: "Standard", price: 8000, estimatedDays: "1-2 days" }],
    featured: false, trending: true, status: "active", createdAt: "2024-02-01", updatedAt: "2024-02-01" },
  { id: "p7", name: "Samsung 65-inch OLED 4K TV", slug: "samsung-65-oled-4k-tv",
    description: "Stunning OLED display with quantum dot technology. Dolby Atmos and Dolby Vision.",
    price: 4200000, discountPrice: 3800000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80","https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=600&q=80"],
    category: "Electronics", brand: "Samsung", sku: "S65OLED", quantity: 15, sold: 67, condition: "new",
    specifications: { "Display": "65-inch OLED", "Resolution": "4K UHD", "Smart TV": "Tizen OS", "Audio": "Dolby Atmos" },
    tags: ["samsung", "tv", "oled", "4k", "home-theater"],
    seller: sellers[1], rating: 4.7, reviewCount: 98, warranty: "2 Year Samsung Warranty",
    deliveryOptions: [{ method: "Standard", price: 50000, estimatedDays: "3-5 days" },{ method: "Express", price: 80000, estimatedDays: "1-2 days" }],
    featured: false, trending: false, status: "active", createdAt: "2024-01-18", updatedAt: "2024-02-01" },
  { id: "p8", name: "DJI Mini 4 Pro Drone", slug: "dji-mini-4-pro",
    description: "Under 249g. 4K/100fps video. Omnidirectional obstacle sensing. 34-min flight time.",
    price: 2400000, discountPrice: 2150000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&q=80","https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600&q=80"],
    category: "Electronics", brand: "DJI", sku: "DJIM4P", quantity: 20, sold: 56, condition: "new",
    specifications: { "Weight": "249g", "Camera": "4K/100fps", "Flight Time": "34 min", "Range": "20km" },
    tags: ["dji", "drone", "camera", "gadget"],
    seller: sellers[1], rating: 4.8, reviewCount: 45, warranty: "1 Year DJI Warranty",
    deliveryOptions: [{ method: "Standard", price: 15000, estimatedDays: "2-3 days" },{ method: "Express", price: 35000, estimatedDays: "1 day" }],
    featured: false, trending: true, status: "active", createdAt: "2024-02-01", updatedAt: "2024-02-01" },
  { id: "p9", name: "Samsung Galaxy S24 Ultra 512GB", slug: "samsung-galaxy-s24-ultra",
    description: "Galaxy AI is here. Built with premium titanium, Galaxy S24 Ultra features a flat display, a long-lasting battery, and a powerful processor.",
    price: 2800000, discountPrice: 2450000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1712957393402-5e708829132c?w=600&q=80","https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80"],
    category: "Phones & Tablets", brand: "Samsung", sku: "S24U512", quantity: 35, sold: 180, condition: "new",
    specifications: { "Display": "6.8-inch Dynamic AMOLED", "Chip": "Snapdragon 8 Gen 3", "Camera": "200MP", "Battery": "5000mAh" },
    colors: ["Titanium Gray", "Titanium Violet", "Titanium Black"],
    tags: ["samsung", "galaxy", "android", "smartphone"],
    seller: sellers[1], rating: 4.7, reviewCount: 198, warranty: "1 Year Samsung Warranty", returnPolicy: "14 days return",
    deliveryOptions: [{ method: "Standard", price: 15000, estimatedDays: "2-3 days" },{ method: "Express", price: 35000, estimatedDays: "1 day" }],
    featured: true, trending: true, status: "active", createdAt: "2024-02-15", updatedAt: "2024-03-01" },
  { id: "p10", name: "Adidas Ultraboost Light Running Shoes", slug: "adidas-ultraboost-light",
    description: "The lightest Ultraboost ever. Featuring new Light BOOST midsole for incredible energy return with every step.",
    price: 320000, discountPrice: 260000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80"],
    category: "Shoes", brand: "Adidas", sku: "UBLIGHT", quantity: 85, sold: 340, condition: "new",
    specifications: { "Type": "Running", "Material": "Mesh/Knit", "Sole": "Light BOOST", "Weight": "290g" },
    colors: ["Core Black", "Cloud White", "Grey"], sizes: ["39", "40", "41", "42", "43", "44"],
    tags: ["adidas", "running", "shoes", "sneakers"],
    seller: sellers[0], rating: 4.5, reviewCount: 234, returnPolicy: "30 days return",
    deliveryOptions: [{ method: "Standard", price: 7000, estimatedDays: "1-3 days" }],
    featured: false, trending: true, status: "active", createdAt: "2024-02-10", updatedAt: "2024-03-01" },
  { id: "p11", name: "Kitenge African Print Dress", slug: "kitenge-african-print-dress",
    description: "Beautiful handcrafted Kitenge dress made from authentic African wax print fabric. Perfect for weddings, parties, and special occasions.",
    price: 85000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80","https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&q=80"],
    category: "Fashion", brand: "Local Artisan", sku: "KTG001", quantity: 50, sold: 420, condition: "new",
    specifications: { "Material": "100% Cotton Wax Print", "Length": "Midi", "Care": "Hand wash cold" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    tags: ["kitenge", "african", "fashion", "dress", "tanzania"],
    seller: sellers[0], rating: 4.8, reviewCount: 156, returnPolicy: "7 days return",
    deliveryOptions: [{ method: "Standard", price: 5000, estimatedDays: "1-2 days" }],
    featured: true, trending: true, status: "active", createdAt: "2024-01-20", updatedAt: "2024-02-01" },
  { id: "p12", name: "Professional Soccer Ball - Size 5", slug: "professional-soccer-ball",
    description: "FIFA Quality Pro certified match ball. Machine-stitched TPU casing with butyl bladder for excellent air retention.",
    price: 95000, discountPrice: 78000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1614632537423-0e3ff22d1a7e?w=600&q=80","https://images.unsplash.com/photo-1575361204480-a4a5b3e1a0c9?w=600&q=80"],
    category: "Sports", brand: "Adidas", sku: "SPRT001", quantity: 120, sold: 580, condition: "new",
    specifications: { "Size": "5 (Standard)", "Material": "TPU", "Bladder": "Butyl", "Certification": "FIFA Quality Pro" },
    tags: ["soccer", "football", "sports", "ball"],
    seller: sellers[5], rating: 4.4, reviewCount: 89, returnPolicy: "7 days return",
    deliveryOptions: [{ method: "Standard", price: 5000, estimatedDays: "1-3 days" }],
    featured: false, trending: false, status: "active", createdAt: "2024-02-05", updatedAt: "2024-03-01" },
  { id: "p13", name: "Non-Stick Cookware Set 8-Piece", slug: "non-stick-cookware-set",
    description: "Premium non-stick cookware set including pots, pans, and utensils. Suitable for all hob types including induction.",
    price: 450000, discountPrice: 380000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80","https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80"],
    category: "Home & Kitchen", brand: "Local Brand", sku: "KITCHEN8", quantity: 45, sold: 230, condition: "new",
    specifications: { "Pieces": "8", "Material": "Aluminum + Non-stick coating", "Dishwasher Safe": "Yes", "Oven Safe": "Up to 180°C" },
    tags: ["kitchen", "cookware", "home", "non-stick"],
    seller: sellers[6], rating: 4.6, reviewCount: 134, warranty: "2 Year Warranty", returnPolicy: "14 days return",
    deliveryOptions: [{ method: "Standard", price: 12000, estimatedDays: "2-4 days" }],
    featured: true, trending: false, status: "active", createdAt: "2024-01-10", updatedAt: "2024-02-01" },
  { id: "p14", name: "Gaming Chair with Footrest", slug: "gaming-chair-with-footrest",
    description: "Ergonomic gaming chair with adjustable lumbar support, 4D armrests, retractable footrest, and premium PU leather.",
    price: 650000, discountPrice: 550000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80","https://images.unsplash.com/photo-1616587894289-86480e533129?w=600&q=80"],
    category: "Gaming", brand: "GamerPro", sku: "GCH001", quantity: 25, sold: 89, condition: "new",
    specifications: { "Material": "PU Leather", "Weight Capacity": "150kg", "Armrests": "4D", "Footrest": "Retractable" },
    colors: ["Black/Red", "Black/Blue", "All Black"],
    tags: ["gaming", "chair", "furniture", "ergonomic"],
    seller: sellers[1], rating: 4.5, reviewCount: 67, warranty: "1 Year Warranty",
    deliveryOptions: [{ method: "Standard", price: 25000, estimatedDays: "3-5 days" }],
    featured: false, trending: true, status: "active", createdAt: "2024-02-20", updatedAt: "2024-03-01" },
  { id: "p15", name: "Organic Green Tea Collection - 12 Boxes", slug: "organic-green-tea-collection",
    description: "Premium organic green tea sourced from the Usambara mountains. Rich in antioxidants, naturally caffeine-free options available.",
    price: 45000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80","https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80"],
    category: "Groceries", brand: "Usambara Tea Co.", sku: "TEABOX12", quantity: 200, sold: 1200, condition: "new",
    specifications: { "Type": "Green Tea", "Quantity": "12 boxes (20 bags each)", "Origin": "Usambara Mountains, Tanzania", "Organic": "Certified Organic" },
    tags: ["tea", "organic", "groceries", "health"],
    seller: sellers[2], rating: 4.7, reviewCount: 445,
    deliveryOptions: [{ method: "Standard", price: 3000, estimatedDays: "1-2 days" }],
    featured: false, trending: true, status: "active", createdAt: "2024-01-01", updatedAt: "2024-03-01" },
  { id: "p16", name: "Car Dashboard Camera HD 4K", slug: "car-dashboard-camera-4k",
    description: "Ultra HD 4K dash cam with night vision, wide-angle lens, GPS tracking, and parking mode for complete driving peace of mind.",
    price: 210000, discountPrice: 175000, currency: "TZS",
    images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80","https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80"],
    category: "Automotive", brand: "AutoGuard", sku: "DASH4K", quantity: 60, sold: 190, condition: "new",
    specifications: { "Resolution": "4K (3840x2160)", "Night Vision": "Yes", "GPS": "Built-in", "Parking Mode": "Yes" },
    tags: ["automotive", "dashcam", "car", "safety"],
    seller: sellers[5], rating: 4.3, reviewCount: 78, warranty: "1 Year Warranty", returnPolicy: "14 days return",
    deliveryOptions: [{ method: "Standard", price: 8000, estimatedDays: "2-3 days" }],
    featured: false, trending: false, status: "active", createdAt: "2024-02-15", updatedAt: "2024-03-01" },
];

// ===== Flash Sales =====
export const flashSales: FlashSale[] = [
  { id: "fs-1", title: "Flash Sale", description: "Limited time deals you can't miss!",
    products: [products[0], products[2], products[4], products[5], products[6]],
    startTime: new Date().toISOString(), endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    discount: 40, isActive: true },
];

// ===== Reviews =====
export const reviews: Review[] = [
  { id: "rev-1", userId: "u1", userName: "Sarah M.", userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", productId: "p1", rating: 5, title: "Absolutely love it!", comment: "The iPhone 15 Pro Max exceeded all my expectations.", likes: 24, createdAt: "2024-01-28" },
  { id: "rev-2", userId: "u2", userName: "David K.", userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", productId: "p1", rating: 4, title: "Great phone, premium price", comment: "Best iPhone yet. The titanium build feels premium.", likes: 12, createdAt: "2024-01-25" },
];

// ===== Testimonials =====
export const testimonials: Testimonial[] = [
  { id: "test-1", name: "Neema Hassan", role: "Fashion Boutique Owner", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", content: "SokoDigital transformed my business. I went from selling locally to reaching customers across all of Tanzania.", rating: 5 },
  { id: "test-2", name: "Kevin Mushi", role: "Tech Enthusiast", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", content: "Finally, a marketplace that understands Tanzania. Fast delivery, secure payments, and real verified sellers.", rating: 5 },
  { id: "test-3", name: "Aisha Salum", role: "Home Baker", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", content: "The AI assistant helped me find exactly what I needed within my budget. Shopping has never been this easy!", rating: 5 },
  { id: "test-4", name: "Joseph Lema", role: "University Student", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", content: "As a student, finding affordable electronics was always a challenge. SokoDigital's deals and verified sellers make it stress-free.", rating: 4 },
];

// ===== Banners =====
export const banners: Banner[] = [
  { id: "b1", title: "Premium Tech Deals", subtitle: "Up to 40% Off", description: "Latest smartphones, laptops, and gadgets at unbeatable prices", cta: "Shop Tech Deals", link: "/marketplace?category=electronics",
    desktopImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=85",
    badge: "Limited Time", discount: 40, type: "hero", priority: 1, isActive: true, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "b2", title: "Tanzanian Fashion Collection", subtitle: "Discover Local Designers", description: "Authentic Tanzanian fashion from top local designers", cta: "Explore Fashion", link: "/marketplace?category=fashion",
    desktopImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85",
    badge: "New Collection", discount: 25, type: "hero", priority: 2, isActive: true, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "b3", title: "Free Delivery Week", subtitle: "Nationwide — TZ Mainland & Zanzibar", description: "Enjoy free delivery on all orders across Tanzania", cta: "Start Shopping", link: "/marketplace",
    desktopImage: "https://images.unsplash.com/photo-1557456170-0e2b4a7fc3eb?w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1557456170-0e2b4a7fc3eb?w=600&q=85",
    badge: "Free Delivery", type: "hero", priority: 3, isActive: true, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "b4", title: "SokoDigital Ramadan Sale", subtitle: "Blessings & Savings", description: "Special Ramadan offers on groceries, fashion, and home essentials", cta: "Shop Ramadan Deals", link: "/marketplace?category=groceries",
    desktopImage: "https://images.unsplash.com/photo-1582452932074-0d4510e3eb84?w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1582452932074-0d4510e3eb84?w=600&q=85",
    badge: "Ramadan Special", discount: 30, type: "hero", priority: 4, isActive: true, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "b5", title: "Student Discount Week", subtitle: "Save Big on Essentials", description: "Verified students get up to 50% off on laptops, books, and stationery", cta: "Student Deals", link: "/marketplace?category=computers",
    desktopImage: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&q=85",
    mobileImage: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&q=85",
    badge: "Students Only", discount: 50, type: "hero", priority: 5, isActive: true, startDate: new Date().toISOString(), endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() },
];

// ===== Notifications =====
export const notifications: Notification[] = [
  { id: "notif-1", type: "order", title: "Order Confirmed", message: "Your iPhone 15 Pro Max order has been confirmed", read: false, createdAt: new Date().toISOString() },
  { id: "notif-2", type: "promotion", title: "Flash Sale Alert!", message: "Up to 60% off on electronics. Limited time only!", read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "notif-3", type: "message", title: "New Message from Seller", message: "TechZone responded to your inquiry", read: true, createdAt: new Date(Date.now() - 7200000).toISOString() },
];

// ===== AI Suggestions =====
export const aiSuggestions: AISuggestion[] = [
  { id: "ai-1", text: "Find a laptop under 500,000 TZS", icon: "Monitor", category: "computers" },
  { id: "ai-2", text: "Recommend a good phone for photography", icon: "Camera", category: "phones" },
  { id: "ai-3", text: "Compare iPhone 15 vs Samsung S24", icon: "GitCompare", category: "phones" },
  { id: "ai-4", text: "Find cheaper alternatives to AirPods", icon: "Headphones", category: "electronics" },
  { id: "ai-5", text: "Suggest birthday gift for my mom", icon: "Gift", category: "general" },
  { id: "ai-6", text: "What's trending in Dar es Salaam?", icon: "TrendingUp", category: "trending" },
  { id: "ai-7", text: "Find fashion deals under 50,000 TZS", icon: "ShoppingBag", category: "fashion" },
  { id: "ai-8", text: "Best gaming laptop recommendations", icon: "Gamepad2", category: "gaming" },
];

// ===== Helper Functions =====
export function formatTZS(amount: number): string {
  return new Intl.NumberFormat("sw-TZ", { style: "currency", currency: "TZS", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}
export function formatDiscount(price: number, discounted: number): number {
  return Math.round(((price - discounted) / price) * 100);
}
export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-emerald-500";
  if (rating >= 4) return "text-blue-500";
  if (rating >= 3) return "text-amber-500";
  return "text-red-500";
}
export function getTimeRemaining(endTime: string): { hours: number; minutes: number; seconds: number } {
  const total = Date.parse(endTime) - Date.now();
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor(total / (1000 * 60 * 60)),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

// ===== Languages =====
export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
];

// ===== Trending Searches =====
export const trendingSearches = [
  "iPhone 15 Pro", "Kitenge dresses", "Smart TVs", "Laptop deals",
  "M-Pesa phones", "Furniture", "Sneakers", "Beauty products", "Gaming chair",
];

// ===== Footer Links =====
export const footerLinks: Record<string, string[]> = {
  "Sell on SokoDigital": ["Become a Vendor", "Become a Manufacturer", "Seller Dashboard", "Seller Academy", "Advertising"],
  "Get Support": ["Help Center", "Check Order Status", "Live Chat", "Refund Policy", "Contact Us"],
  "Payment & Protection": ["Safe and Easy Payment", "Money Back Policy", "On-Time Shipping", "After Sales Protection", "Secure Checkout"],
  "Resources": ["SokoDigital Logistics", "Sales Tax & VAT", "Shipping Info", "Returns Center", "FAQ"],
  "Get to Know Us": ["About SokoDigital", "Corporate Responsibility", "News Center", "Careers", "Press Kit"],
};

// ===== Payment Methods =====
export const paymentMethods = [
  { id: "mpesa", name: "M-Pesa", icon: "Smartphone", description: "Pay with M-Pesa mobile money" },
  { id: "airtel", name: "Airtel Money", icon: "Smartphone", description: "Pay with Airtel Money" },
  { id: "mixx", name: "Mixx by Yas", icon: "Smartphone", description: "Pay with Mixx" },
  { id: "halopesa", name: "HaloPesa", icon: "Smartphone", description: "Pay with HaloPesa" },
  { id: "visa", name: "Visa", icon: "CreditCard", description: "Pay with Visa card" },
  { id: "mastercard", name: "Mastercard", icon: "CreditCard", description: "Pay with Mastercard" },
  { id: "crdb", name: "CRDB Bank", icon: "Landmark", description: "Pay with CRDB Bank" },
  { id: "nmb", name: "NMB Bank", icon: "Landmark", description: "Pay with NMB Bank" },
  { id: "nbc", name: "NBC Bank", icon: "Landmark", description: "Pay with NBC Bank" },
];

// ===== Export aliases =====
export const flashSale = flashSales;

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-TZ", { year: "numeric", month: "long", day: "numeric" });
};
export const formatDateShort = (date: string): string => {
  return new Date(date).toLocaleDateString("en-TZ", { month: "short", day: "numeric" });
};
