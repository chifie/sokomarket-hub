import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Link, useNavigate } from "react-router";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const displayPrice = product.discountPrice || product.price;
  const oldPrice = product.discountPrice ? product.price : undefined;

  const isLowStock = product.quantity > 0 && product.quantity <= 10;
  const isOutOfStock = product.quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block cursor-pointer">
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
        <div className="aspect-square overflow-hidden relative bg-muted/50 rounded-t-xl">
          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-2 top-2 z-10 w-7 h-7 rounded-full backdrop-blur-sm shadow-md flex items-center justify-center transition-colors bg-white/90 text-foreground hover:bg-white"
            title="Add to wishlist"
          >
            <Heart
              className={cn(
                "h-3.5 w-3.5 transition-colors",
                isWishlisted ? "fill-rose-500 text-rose-500" : ""
              )}
            />
          </button>

          {/* Low stock badge */}
          {isLowStock && (
            <span className="absolute left-2 bottom-2 z-10 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-amber-950 shadow-md">
              Only {product.quantity} left
            </span>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
              -{discount}%
            </span>
          )}

          {/* Loading/Error state */}
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <span className="text-[10px] text-muted-foreground">No image</span>
            </div>
          ) : (
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className={cn(
                "w-full h-full object-contain group-hover:scale-105 transition-all duration-300",
                imgError ? "opacity-0" : "opacity-100"
              )}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="p-2">
          {/* Product name */}
          <p className="text-[11px] lg:text-xs text-foreground line-clamp-2 leading-tight mb-1">
            {product.name}
          </p>

          {/* Price */}
          <p className="font-bold text-sm text-primary">
            Tshs {displayPrice.toLocaleString()}/=
          </p>
          {oldPrice && (
            <p className="text-[10px] text-muted-foreground line-through">
              Tshs {oldPrice.toLocaleString()}/=
            </p>
          )}

          {/* Min order */}
          <p className="text-[10px] text-primary mt-0.5">Min. order: 1 pieces</p>

          {/* Stock */}
          {isOutOfStock ? (
            <p className="text-[10px] text-muted-foreground mt-0.5">Out of stock</p>
          ) : (
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              {product.quantity} in stock
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-1 mt-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex-1 text-[10px] py-1.5 px-1 rounded-md border border-secondary text-secondary hover:bg-secondary/5 transition-colors inline-flex items-center justify-center gap-0.5"
            >
              <ShoppingCart className="h-3 w-3" />
              Add
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/checkout?product=${product.slug}`);
              }}
              className="flex-1 text-[10px] py-1.5 px-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium shadow-sm"
            >
              Shop Now
            </button>
          </div>
        </div>
        </div>
      </Link>
    </motion.div>
  );
}
