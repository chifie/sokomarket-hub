// ===== User Types =====
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "buyer" | "seller" | "admin";
  verified: boolean;
  sellerBadge?: boolean;
  joinedAt: string;
  phone?: string;
  location?: string;
  bio?: string;
}

// ===== Product Types =====
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  currency: string;
  images: string[];
  video?: string;
  category: string;
  subcategory?: string;
  brand?: string;
  sku: string;
  quantity: number;
  sold: number;
  condition: "new" | "used" | "refurbished";
  specifications?: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  weight?: number;
  dimensions?: string;
  tags: string[];
  seller: Seller;
  rating: number;
  reviewCount: number;
  warranty?: string;
  returnPolicy?: string;
  deliveryOptions?: DeliveryOption[];
  status: "active" | "draft" | "archived";
  featured: boolean;
  trending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryOption {
  method: string;
  price: number;
  estimatedDays: string;
}

// ===== Seller Types =====
export interface Seller {
  id: string;
  name: string;
  storeName: string;
  logo: string;
  banner?: string;
  description: string;
  rating: number;
  totalSales: number;
  totalProducts: number;
  followers: number;
  verified: boolean;
  joinedAt: string;
  responseRate: number;
  responseTime: string;
  location: string;
  badges: string[];
}

// ===== Category Types =====
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

// ===== Order Types =====
export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  currency: string;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

// ===== Address Types =====
export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// ===== Cart Types =====
export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  sellerId: string;
  sellerName: string;
  maxQuantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

// ===== Review Types =====
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  likes: number;
  createdAt: string;
}

// ===== Wishlist Types =====
export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// ===== Notification Types =====
export interface Notification {
  id: string;
  type: "order" | "promotion" | "system" | "message" | "review";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

// ===== Message Types =====
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  attachments?: string[];
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  productId?: string;
}

// ===== AI Assistant Types =====
export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedProducts?: Product[];
}

export interface AISuggestion {
  id: string;
  text: string;
  icon?: string;
  category: string;
}

// ===== Analytics Types =====
export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderValue: number;
  conversionRate: number;
  revenueGrowth: number;
  ordersGrowth: number;
  dailySales: { date: string; amount: number; orders: number }[];
  topProducts: { productId: string; name: string; sales: number; revenue: number }[];
  revenueByCategory: { category: string; revenue: number; percentage: number }[];
}

// ===== Coupon Types =====
export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minPurchase: number;
  maxUses: number;
  currentUses: number;
  expiresAt: string;
  isActive: boolean;
  applicableCategories?: string[];
}

// ===== UI Types =====
export interface Tab {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular" | "rating" | "name";

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  ratings: number[];
  brands: string[];
  conditions: string[];
  sortBy: SortOption;
  search: string;
  inStock: boolean;
  onSale: boolean;
}

// ===== Testimonial & Stat Types =====
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
  suffix?: string;
}

// ===== Flash Sale Types =====
export interface FlashSale {
  id: string;
  title: string;
  description: string;
  products: Product[];
  startTime: string;
  endTime: string;
  discount: number;
  isActive: boolean;
}

// ===== Banner Types =====
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta?: string;
  link?: string;
  desktopImage: string;
  mobileImage?: string;
  webpImage?: string;
  avifImage?: string;
  backgroundImage?: string;
  badge?: string;
  discount?: number;
  countdownTo?: string;
  type: "hero" | "flash-sale" | "category" | "brand" | "vendor" | "seasonal" | "announcement" | "promotional";
  priority: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  bgColor?: string;
  textColor?: string;
}
