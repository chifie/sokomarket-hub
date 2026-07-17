import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield,
  Check, Share2, ChevronRight, MapPin, BadgeCheck, Plus, Minus, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/constants";
import { cn, formatTZS, getRatingColor } from "@/lib/utils";

const reviews = [
  { id: "r1", user: "Amina K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AminaK", rating: 5, date: "2 weeks ago", text: "Amazing product! Exceeded my expectations. The quality is outstanding and delivery was fast.", likes: 24 },
  { id: "r2", user: "David M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidM", rating: 4, date: "1 month ago", text: "Great value for money. Would definitely recommend to others.", likes: 12 },
  { id: "r3", user: "Sarah J.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ", rating: 5, date: "3 weeks ago", text: "Perfect! Exactly as described. Very happy with my purchase.", likes: 18 },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find((p) => p.slug === id) || products[0];
  const discount = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
  const displayPrice = product.discountPrice || product.price;
  const oldPrice = product.discountPrice ? product.price : undefined;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <button onClick={() => navigate(-1)} className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <span className="text-border">/</span>
            <Link to="/marketplace" className="hover:text-foreground">{product.category}</Link>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border/50 group">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {discount > 0 && (
                  <span className="absolute top-3 left-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    -{discount}%
                  </span>
                )}
                <button onClick={() => setIsWishlisted(!isWishlisted)} className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all shadow-sm">
                  <Heart className={cn("h-4 w-4", isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
                </button>
                <button className="absolute top-3 right-14 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all shadow-sm">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={cn("aspect-square rounded-lg overflow-hidden border-2 transition-all", selectedImage === i ? "border-primary" : "border-border/50 hover:border-primary/50")}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="space-y-5">
              {/* Seller */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  <img src={product.seller.logo} alt="" className="h-5 w-5 object-cover" />
                </div>
                <span className="text-xs text-muted-foreground">
                  Sold by <Link to={`/store/${product.seller.id}`} className="text-foreground font-medium hover:text-primary">{product.seller.storeName}</Link>
                </span>
                {product.seller.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary fill-primary" />}
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-bold leading-tight">{product.name}</h1>

              {/* Rating + Sold */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center">
                  <Star className={cn("h-4 w-4 fill-current", getRatingColor(product.rating))} />
                  <span className={cn("text-sm font-bold ml-1", getRatingColor(product.rating))}>{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{product.sold.toLocaleString()} sold</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-bold text-primary">Tshs {displayPrice.toLocaleString()}/=</span>
                {oldPrice && <span className="text-base text-muted-foreground line-through">Tshs {oldPrice.toLocaleString()}/=</span>}
                {discount > 0 && <Badge className="bg-secondary/10 text-secondary border-0 text-xs font-semibold">Save {discount}%</Badge>}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-1.5">Color: <span className="text-muted-foreground font-normal">{product.colors[0]}</span></p>
                  <div className="flex gap-1.5 flex-wrap">
                    {product.colors.map((color) => (
                      <button key={color} className={cn("px-3 py-1.5 rounded-lg border text-xs transition-all", color === product.colors![0] ? "border-primary bg-primary/5 text-primary" : "border-border/50 hover:border-primary/30")}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-1.5">Size: <span className="text-muted-foreground font-normal">{product.sizes[0]}</span></p>
                  <div className="flex gap-1.5 flex-wrap">
                    {product.sizes.map((size) => (
                      <button key={size} className={cn("px-3 py-1.5 rounded-lg border text-xs transition-all min-w-[40px]", size === product.sizes![0] ? "border-primary bg-primary/5 text-primary" : "border-border/50 hover:border-primary/30")}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-xs font-medium mb-1.5">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-muted rounded-lg p-0.5">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-8 w-8 rounded-md hover:bg-background flex items-center justify-center transition-colors"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))} className="h-8 w-8 rounded-md hover:bg-background flex items-center justify-center transition-colors"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  {product.quantity <= 10 && product.quantity > 0 && (
                    <span className="text-[11px] text-rose-500 font-medium">Only {product.quantity} left!</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="lg" className="flex-1 h-11 rounded-lg text-sm font-semibold gap-2" onClick={() => { setIsAdded(true); setTimeout(() => setIsAdded(false), 2000); }}>
                  {isAdded ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
                </Button>
                <Button size="lg" variant="outline" className="h-11 rounded-lg text-sm font-semibold" onClick={() => navigate("/checkout")}>Buy Now</Button>
              </div>

              {/* Delivery Info */}
              <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center gap-2 text-xs"><Truck className="h-3.5 w-3.5 text-emerald-500" /><span className="font-medium">Free Delivery</span><span className="text-muted-foreground">· Estimated 3-5 business days</span></div>
                <div className="flex items-center gap-2 text-xs"><RotateCcw className="h-3.5 w-3.5 text-blue-500" /><span className="font-medium">Easy Returns</span><span className="text-muted-foreground">· 14-day return policy</span></div>
                <div className="flex items-center gap-2 text-xs"><Shield className="h-3.5 w-3.5 text-amber-500" /><span className="font-medium">Secure Payment</span><span className="text-muted-foreground">· M-Pesa, Airtel, Visa</span></div>
              </div>

              {/* Seller Info Card */}
              <Link to={`/store/${product.seller.id}`} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card hover:shadow-sm transition group">
                <div className="h-12 w-12 rounded-lg overflow-hidden ring-2 ring-border/50 flex-shrink-0">
                  <img src={product.seller.logo} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{product.seller.storeName}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                    <MapPin className="h-3 w-3" />{product.seller.location}
                    <span className="text-emerald-500 ml-1">{product.seller.responseRate}% response</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            </div>
          </div>

          {/* Product Details + Reviews Grid */}
          <div className="mt-10 grid lg:grid-cols-3 gap-8">
            {/* Description + Specs */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-base font-bold mb-2">Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-base font-bold mb-3">Specifications</h2>
                <div className="rounded-lg border border-border/50 overflow-hidden text-sm">
                  <table className="w-full">
                    <tbody>
                      {[
                        { label: "Brand", value: product.brand || "Generic" },
                        { label: "Category", value: product.category },
                        { label: "Condition", value: product.condition.charAt(0).toUpperCase() + product.condition.slice(1) },
                        { label: "SKU", value: product.sku },
                        { label: "Warranty", value: product.warranty || "—" },
                        { label: "Return Policy", value: product.returnPolicy || "—" },
                      ].map((spec, i) => (
                        <tr key={spec.label} className={cn(i % 2 === 0 && "bg-muted/30")}>
                          <td className="px-3 py-2.5 font-medium text-muted-foreground w-1/3 text-xs">{spec.label}</td>
                          <td className="px-3 py-2.5 text-xs">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-base font-bold mb-3">Reviews ({reviews.length})</h2>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="p-3 rounded-lg border border-border/50 bg-card">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                        {review.avatar ? <img src={review.avatar} alt="" className="h-full w-full object-cover" /> : review.user[0]}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{review.user}</p>
                        <p className="text-[10px] text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-[11px] font-medium ml-0.5">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.text}</p>
                    <button className="text-[11px] text-muted-foreground hover:text-primary mt-1.5 flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {review.likes}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">Related Products</h2>
              <Link to="/marketplace" className="text-xs text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </motion.div>
  );
}
