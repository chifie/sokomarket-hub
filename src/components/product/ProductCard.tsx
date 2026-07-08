import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, Star, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  const ratingColor =
    product.rating >= 4.5
      ? "text-emerald-500"
      : product.rating >= 4.0
        ? "text-amber-500"
        : "text-orange-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {discount > 0 && (
            <Badge className="absolute top-3 left-3 z-10 bg-rose-500 hover:bg-rose-600 text-white border-0 shadow-lg text-xs font-semibold px-2.5 py-1">
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-3 right-3 z-10 bg-primary hover:bg-primary/90 text-white border-0 shadow-lg text-xs font-semibold px-2.5 py-1">
              Featured
            </Badge>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background shadow-sm"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors duration-200",
                isWishlisted
                  ? "fill-rose-500 text-rose-500"
                  : "text-muted-foreground hover:text-rose-500"
              )}
            />
          </button>

          <img
            src={imgError ? "https://placehold.co/400x400?text=Soko+Digital" : product.images[0]}
            alt={product.name}
            className={cn(
              "h-full w-full object-cover transition-all duration-500 group-hover:scale-110",
              isHovered ? "scale-110" : "scale-100"
            )}
            onError={() => setImgError(true)}
            loading="lazy"
          />

          {/* Quick Actions Overlay */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
          >
            <div className="flex gap-2 pointer-events-auto">
              <Button
                size="sm"
                className="flex-1 h-9 text-xs gap-1.5 bg-white text-gray-900 hover:bg-gray-100 shadow-lg rounded-lg"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9 bg-white/90 hover:bg-white text-gray-700 shadow-lg rounded-lg"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          {/* Seller */}
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
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
                <span className="inline-flex ml-1">
                  <Shield className="h-2.5 w-2.5 text-blue-500 fill-blue-500" />
                </span>
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
              <Star className={cn("h-3 w-3 fill-current", ratingColor)} />
              <span className={cn("text-xs font-semibold ml-1", ratingColor)}>
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
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-foreground">
                  ${product.discountPrice.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            <Truck className="h-3 w-3" />
            <span>Free delivery</span>
          </div>

          {/* Stock Status */}
          {product.quantity <= 10 && product.quantity > 0 && (
            <p className="text-[11px] text-rose-500 font-medium">
              Only {product.quantity} left in stock
            </p>
          )}
          {product.quantity === 0 && (
            <p className="text-[11px] text-muted-foreground font-medium">
              Out of stock
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
