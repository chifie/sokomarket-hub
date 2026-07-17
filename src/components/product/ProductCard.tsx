import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, ShoppingCart, Eye, Star, Truck, Shield,
  ArrowLeftRight, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatTZS, formatDiscount, getRatingColor } from "@/lib/utils";
import type { Product } from "@/types";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export function ProductCard({ product, index = 0, featured = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discount = product.discountPrice
    ? formatDiscount(product.price, product.discountPrice)
    : 0;

  const displayPrice = product.discountPrice || product.price;
  const oldPrice = product.discountPrice ? product.price : undefined;

  const isLowStock = product.quantity > 0 && product.quantity <= 10;
  const isOutOfStock = product.quantity === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className={cn(
          "relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300",
          "hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5",
          featured && "lg:col-span-2 lg:row-span-2"
        )}>
          {/* Image Container */}
          <div className={cn("relative overflow-hidden bg-muted", featured ? "aspect-[4/3]" : "aspect-square")}>
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {discount > 0 && (
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-0 shadow-lg text-xs font-semibold px-2.5 py-1">
                  -{discount}%
                </Badge>
              )}
              {product.featured && (
                <Badge className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg text-xs font-semibold px-2.5 py-1">
                  Featured
                </Badge>
              )}
              {isLowStock && (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-lg text-[10px] font-semibold px-2.5 py-1 animate-pulse">
                  Only {product.quantity} left
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className={cn(
                  "h-8 w-8 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-sm",
                  "opacity-0 group-hover:opacity-100 hover:bg-background",
                  isWishlisted && "opacity-100"
                )}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors duration-200",
                    isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground hover:text-rose-500"
                  )}
                />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="h-8 w-8 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background shadow-sm"
              >
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </button>
            </div>

            <img
              src={imgError ? "https://placehold.co/400x400?text=Soko+Digital" : product.images[0]}
              alt={product.name}
              className={cn(
                "h-full w-full object-cover transition-all duration-700",
                isHovered ? "scale-110" : "scale-100"
              )}
              onError={() => setImgError(true)}
              loading="lazy"
            />

            {/* Quick Actions Overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
            >
              <div className="flex gap-2 pointer-events-auto">
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 h-9 text-xs gap-1.5 shadow-lg rounded-xl transition-all duration-200",
                    isAdded
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-3.5 w-3.5" /> Cart
                    </>
                  )}
                </Button>
                <Link
                  to="/checkout"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-9 text-xs gap-1.5 shadow-lg rounded-xl bg-white text-gray-900 hover:bg-gray-100 inline-flex items-center justify-center font-medium"
                >
                  Buy Now
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2.5">
            {/* Seller */}
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-1 ring-border/50">
                <img
                  src={product.seller.logo}
                  alt={product.seller.storeName}
                  className="h-4 w-4 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
                  }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground truncate">
                {product.seller.storeName}
                {product.seller.verified && (
                  <Shield className="h-2.5 w-2.5 text-blue-500 fill-blue-500 inline ml-0.5" />
                )}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                <Star className={cn("h-3 w-3 fill-current", getRatingColor(product.rating))} />
                <span className={cn("text-xs font-semibold ml-1", getRatingColor(product.rating))}>
                  {product.rating}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                ({product.reviewCount.toLocaleString()})
              </span>
              <span className="text-[11px] text-muted-foreground">•</span>
              <span className="text-[11px] text-muted-foreground">
                {product.sold.toLocaleString()} sold
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className={cn("font-bold", featured ? "text-2xl" : "text-lg")}>
                {formatTZS(displayPrice)}
              </span>
              {oldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatTZS(oldPrice)}
                </span>
              )}
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
              <Truck className="h-3 w-3" />
              <span>Free delivery in Tanzania</span>
            </div>

            {/* Stock Status */}
            {isOutOfStock && (
              <p className="text-[11px] text-muted-foreground font-medium">Out of stock</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
