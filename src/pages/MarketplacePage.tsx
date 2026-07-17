import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { motion } from "framer-motion";
import { Search, Grid, List } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const c = searchParams.get("category") || "All";
    setSelectedCategory(c);
  }, [searchParams]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: return b.sold - a.sold; // popular
    }
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") setSearchParams({});
    else setSearchParams({ category });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold">Marketplace</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {sortedProducts.length} products found
              {selectedCategory !== "All" && ` in "${selectedCategory}"`}
            </p>
          </div>

          {/* Search + Sort Bar */}
          <div className="flex flex-col lg:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button onClick={() => setViewMode("grid")} className={cn("p-2.5 transition-colors", viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground")}>
                  <Grid className="h-4 w-4" />
                </button>
                <button onClick={() => setViewMode("list")} className={cn("p-2.5 transition-colors", viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground")}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {allCategories.slice(0, 20).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors border",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground hover:text-foreground border-border bg-card"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
              <p className="text-base text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSearchParams({}); }}>
                Clear Filters
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Link to={`/product/${product.slug}`} className="flex gap-4 p-3 rounded-lg border border-border/50 bg-card hover:shadow-sm transition group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{product.seller.storeName}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm font-bold">Tshs {product.discountPrice ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}/=</span>
                        {product.discountPrice && (
                          <span className="text-xs text-muted-foreground line-through">Tshs {product.price.toLocaleString()}/=</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                        <span>{product.rating} ★</span>
                        <span>•</span>
                        <span>{product.sold.toLocaleString()} sold</span>
                        {product.quantity > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600">{product.quantity} in stock</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
      <AIAssistant />
    </motion.div>
  );
}
