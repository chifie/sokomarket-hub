import electronics from "@/assets/product-electronics.jpg";
import fashion from "@/assets/product-fashion.jpg";
import agri from "@/assets/product-agri.jpg";
import furniture from "@/assets/product-furniture.jpg";

export const PRODUCT_IMAGES = { electronics, fashion, agri, furniture };

export const CATEGORY_NAMES = [
  "Electronics",
  "Fashion",
  "Agriculture",
  "Phones",
  "Computers",
  "Furniture",
  "Beauty",
  "Food",
  "Automotive",
  "Books",
  "Sports",
  "Health",
];

export type Product = {
  img: string;
  title: string;
  seller: string;
  price: string;
  old: string;
  rating: number;
  discount: number;
  category: string;
};

export const PRODUCTS: Product[] = [
  {
    img: electronics,
    title: "Wireless Noise-Cancelling Headphones",
    seller: "TechHub Dar",
    price: "TSh 289,000",
    old: "TSh 349,000",
    rating: 4.8,
    discount: 17,
    category: "Electronics",
  },
  {
    img: fashion,
    title: "Ankara Signature Two-Piece Set",
    seller: "Zawadi Fashion",
    price: "TSh 145,000",
    old: "TSh 180,000",
    rating: 4.9,
    discount: 19,
    category: "Fashion",
  },
  {
    img: agri,
    title: "Kilimanjaro Arabica Coffee 1kg",
    seller: "Moshi Growers Co-op",
    price: "TSh 32,500",
    old: "TSh 40,000",
    rating: 4.9,
    discount: 19,
    category: "Agriculture",
  },
  {
    img: furniture,
    title: "Modern Lounge Chair & Lamp Set",
    seller: "Nyumbani Living",
    price: "TSh 780,000",
    old: "TSh 950,000",
    rating: 4.7,
    discount: 18,
    category: "Furniture",
  },
  {
    img: electronics,
    title: "4K Smart TV 55-inch",
    seller: "TechHub Dar",
    price: "TSh 1,150,000",
    old: "TSh 1,390,000",
    rating: 4.6,
    discount: 17,
    category: "Electronics",
  },
  {
    img: fashion,
    title: "Kitenge Wrap Dress",
    seller: "Zawadi Fashion",
    price: "TSh 68,000",
    old: "TSh 85,000",
    rating: 4.8,
    discount: 20,
    category: "Fashion",
  },
  {
    img: agri,
    title: "Organic Honey 500ml — Iringa",
    seller: "Iringa Bee Farms",
    price: "TSh 21,000",
    old: "TSh 26,000",
    rating: 4.9,
    discount: 19,
    category: "Agriculture",
  },
  {
    img: furniture,
    title: "Solid Oak Dining Table Set",
    seller: "Nyumbani Living",
    price: "TSh 1,450,000",
    old: "TSh 1,780,000",
    rating: 4.7,
    discount: 19,
    category: "Furniture",
  },
];

export const SHOPS = [
  {
    name: "TechHub Dar",
    city: "Dar es Salaam",
    rating: 4.9,
    products: 320,
    hue: "from-rose-500 to-cyan-500",
    category: "Electronics",
  },
  {
    name: "Zawadi Fashion",
    city: "Arusha",
    rating: 4.8,
    products: 210,
    hue: "from-amber-500 to-pink-500",
    category: "Fashion",
  },
  {
    name: "Moshi Growers Co-op",
    city: "Moshi",
    rating: 5.0,
    products: 96,
    hue: "from-blue-500 to-lime-500",
    category: "Agriculture",
  },
  {
    name: "Nyumbani Living",
    city: "Mwanza",
    rating: 4.7,
    products: 145,
    hue: "from-orange-500 to-rose-500",
    category: "Furniture",
  },
  {
    name: "Iringa Bee Farms",
    city: "Iringa",
    rating: 4.9,
    products: 58,
    hue: "from-yellow-500 to-amber-600",
    category: "Agriculture",
  },
  {
    name: "Pwani Electronics",
    city: "Zanzibar",
    rating: 4.6,
    products: 172,
    hue: "from-blue-500 to-blue-600",
    category: "Electronics",
  },
  {
    name: "Serengeti Sports",
    city: "Dodoma",
    rating: 4.8,
    products: 89,
    hue: "from-blue-500 to-blue-700",
    category: "Sports",
  },
  {
    name: "Baraka Beauty",
    city: "Mbeya",
    rating: 4.7,
    products: 134,
    hue: "from-pink-500 to-fuchsia-600",
    category: "Beauty",
  },
];

export const CATEGORIES = [
  { name: "Electronics", count: "12,400+" },
  { name: "Fashion", count: "9,320+" },
  { name: "Agriculture", count: "4,150+" },
  { name: "Phones", count: "6,800+" },
  { name: "Computers", count: "3,240+" },
  { name: "Furniture", count: "2,100+" },
  { name: "Beauty", count: "5,600+" },
  { name: "Food", count: "7,900+" },
  { name: "Automotive", count: "1,850+" },
  { name: "Books", count: "3,110+" },
  { name: "Sports", count: "2,300+" },
  { name: "Health", count: "4,700+" },
];
