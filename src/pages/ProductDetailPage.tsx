import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield,
  Check, Share2, ChevronRight, Store, Clock,
  MapPin, BadgeCheck, Plus, Minus
} from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/constants";
import { cn, formatTZS, formatDiscount, getRatingColor } from "@/lib/utils";

const reviews = [
  { id: "r1", user: "Amina K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AminaK", rating: 5, date: "2 weeks ago", text: "Amazing product! Exceeded my expectations. The quality is outstanding and delivery was fast.", likes: 24 },
  { id: "r2", user: "David M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidM", rating: 4, date: "1 month ago", text: "Great value for money. Would definitely recommend to others. The packaging was excellent.", likes: 12 },
  { id: "r3", user: "Sarah J.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ", rating: 5, date: "3 weeks ago", text: "Perfect! Exactly as described. Very happy with my purchase.", likes: 18 },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Find product by slug
  const product = products.find((p) => p.slug === id) || products[0];

  const discount = product.discountPrice
    ? formatDiscount(product.price, product.discountPrice)
    : 0;

  const displayPrice = product.discountPrice || product.price;
  const oldPrice = product.discountPrice ? product.price : undefined;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <button onClick={() => navigate(-1)} className="hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 inline mr-1" /> Back
            </button>
            <span className="text-border">/</span>
            <Link to="/marketplace" className="hover:text-foreground">{product.category}</Link>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-rose-500 text-white border-0 text-sm px-3 py-1.5 shadow-lg">
                    -{discount}%
                  </Badge>
                )}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 h-10 w-10 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all shadow-sm"
                >
                  <Heart className={cn("h-5 w-5", isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
                </button>
                <button className="absolute top-4 right-16 h-10 w-10 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all shadow-sm">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                      selectedImage === i ? "border-primary" : "border-border/50 hover:border-primary/50"
                    )}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="space-y-6">
              {/* Seller Badge */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  <img src={product.seller.logo} alt="" className="h-6 w-6 object-cover" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Sold by <Link to={`/shop/${product.seller.id}`} className="text-foreground font-medium hover:text-primary">{product.seller.storeName}</Link>
                </span>
                {product.seller.verified && (
                  <BadgeCheck className="h-4 w-4 text-blue-500 fill-blue-500" />
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <Star className={cn("h-5 w-5 fill-current", getRatingColor(product.rating))} />
                  <span className={cn("text-lg font-bold ml-1.5", getRatingColor(product.rating))}>{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
                <span className="text-sm text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{product.sold.toLocaleString()} sold</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold">{formatTZS(displayPrice)}</span>
                {oldPrice && (
                  <span className="text-lg text-muted-foreground line-through">{formatTZS(oldPrice)}</span>
                )}
                {discount > 0 && (
                  <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-0 text-sm font-semibold">
                    Save {formatTZS(product.price - displayPrice)}
                  </Badge>
                )}
              </div>

              {/* Color Options */}
              {product.colors && (
                <div>
                  <p className="text-sm font-medium mb-2">Color: <span className="text-muted-foreground font-normal">{product.colors[0]}</span></p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button key={color} className={cn(
                        "px-4 py-2 rounded-xl border text-sm transition-all",
                        color === product.colors[0] ? "border-primary bg-primary/5 text-primary" : "border-border/50 hover:border-primary/30"
                      )}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {product.sizes && (
                <div>
                  <p className="text-sm font-medium mb-2">Size: <span className="text-muted-foreground font-normal">{product.sizes[0]}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button key={size} className={cn(
                        "px-4 py-2 rounded-xl border text-sm transition-all min-w-[48px]",
                        size === product.sizes[0] ? "border-primary bg-primary/5 text-primary" : "border-border/50 hover:border-primary/30"
                      )}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-muted rounded-xl p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-9 w-9 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))} className="h-9 w-9 rounded-lg hover:bg-background flex items-center justify-center transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {product.quantity <= 10 && product.quantity > 0 && (
                    <span className="text-xs text-rose-500 font-medium">Only {product.quantity} left!</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 h-12 rounded-xl text-sm font-semibold gap-2"
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <><Check className="h-5 w-5" /> Added to Cart</>
                  ) : (
                    <><ShoppingCart className="h-5 w-5" /> Add to Cart</>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl text-sm font-semibold"
                  onClick={() => navigate("/checkout")}
                >
                  Buy Now
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="space-y-3 p-4 rounded-xl bg-muted/50 border border-border/30">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">Free Delivery</span>
                  <span className="text-muted-foreground">· Estimated 3-5 business days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Easy Returns</span>
                  <span className="text-muted-foreground">· 14-day return policy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Secure Payment</span>
                  <span className="text-muted-foreground">· M-Pesa, Airtel, Visa</span>
                </div>
              </div>

              {/* Seller Info */}
              <Link to={`/shop/${product.seller.id}`} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:shadow-sm transition group">
                <Avatar className="h-14 w-14 rounded-xl ring-2 ring-border/50">
                  <AvatarImage src={product.seller.logo} />
                  <AvatarFallback className="rounded-xl">{product.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium group-hover:text-primary transition-colors">{product.seller.storeName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="h-3 w-3" /> {product.seller.location}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="flex items-center gap-1">
                      <Store className="h-3 w-3" /> {product.seller.totalProducts} products
                    </span>
                    <span className="text-emerald-500">{product.seller.responseRate}% response</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div className={cn("text-muted-foreground leading-relaxed", !showFullDesc && "line-clamp-4")}>
                <p>{product.description}</p>
                <p className="mt-2">Premium quality product sourced from trusted suppliers. Each item is carefully inspected before shipping to ensure you receive the best quality.</p>
                <p className="mt-2">{product.warranty && `Warranty: ${product.warranty}`}</p>
                <p className="mt-2">{product.returnPolicy && `Return Policy: ${product.returnPolicy}`}</p>
              </div>
              <button onClick={() => setShowFullDesc(!showFullDesc)} className="text-sm text-primary font-medium mt-2 hover:underline">
                {showFullDesc ? "Show less" : "Read more"}
              </button>

              {/* Specifications */}
              <h2 className="text-xl font-bold mt-8 mb-4">Specifications</h2>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "Brand", value: product.brand || "Generic" },
                      { label: "Category", value: product.category },
                      { label: "Subcategory", value: product.subcategory || "—" },
                      { label: "Condition", value: product.condition.charAt(0).toUpperCase() + product.condition.slice(1) },
                      { label: "SKU", value: product.sku },
                      { label: "Warranty", value: product.warranty || "—" },
                      { label: "Return Policy", value: product.returnPolicy || "—" },
                    ].map((spec, i) => (
                      <tr key={spec.label} className={cn(i % 2 === 0 && "bg-muted/30")}>
                        <td className="px-4 py-3 font-medium text-muted-foreground w-1/3">{spec.label}</td>
                        <td className="px-4 py-3">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-xl border border-border/50 bg-card">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{review.user}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-medium ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                    <button className="text-xs text-muted-foreground hover:text-primary mt-2 flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {review.likes}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Related Products</h2>
              <Link to="/marketplace" className="text-sm text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
      <AIAssistant />
    </motion.div>
  );
}
