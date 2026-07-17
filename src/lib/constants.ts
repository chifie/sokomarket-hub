import type {
  Product, Seller, Category, FlashSale, Review, Notification,
  Testimonial, Stat, Banner, AISuggestion
} from "@/types";

// ... [keeping all existing data, just updating the banners section]

// ===== Banners =====
export const banners: Banner[] = [
  { 
    id: "b1", 
    title: "Premium Tech Deals", 
    subtitle: "Up to 40% off", 
    description: "Latest smartphones, laptops and gadgets at unbeatable prices", 
    cta: "Shop Now", 
    link: "/marketplace?category=electronics", 
    desktopImage: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&q=80", 
    mobileImage: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80", 
    badge: "Limited Time", 
    discount: 40, 
    type: "hero", 
    priority: 1, 
    isActive: true, 
    startDate: new Date().toISOString(), 
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), 
    bgColor: "from-blue-600 to-blue-900" 
  },
  { 
    id: "b2", 
    title: "Tanzanian Fashion Week", 
    subtitle: "New Collection", 
    description: "Discover authentic Tanzanian fashion from top local designers", 
    cta: "Explore Fashion", 
    link: "/marketplace?category=fashion", 
    desktopImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80", 
    mobileImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80", 
    badge: "New", 
    discount: 25, 
    type: "hero", 
    priority: 2, 
    isActive: true, 
    startDate: new Date().toISOString(), 
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), 
    bgColor: "from-rose-600 to-rose-900" 
  },
  { 
    id: "b3", 
    title: "Free Delivery Week", 
    subtitle: "Nationwide", 
    description: "Enjoy free delivery on all orders across Tanzania mainland and Zanzibar", 
    cta: "Start Shopping", 
    link: "/marketplace", 
    desktopImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80", 
    mobileImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", 
    badge: "Special Offer", 
    type: "hero", 
    priority: 3, 
    isActive: true, 
    startDate: new Date().toISOString(), 
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
    bgColor: "from-emerald-600 to-emerald-900" 
  },
];
