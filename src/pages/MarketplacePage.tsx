import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Grid, List, X, Filter
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 20;

export default function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Sync URL params
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const c = searchParams.get("category") || "All";
    const s = searchParams.get("search") || "";
    setSelectedCategory(c);
    setSearchQuery(s);
    setCurrentPage(1);
  }, [searchParams]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesPrice = p.price >= priceMin && p.price <= priceMax;
      const matchesStock = !inStockOnly || p.quantity > 0;
      const matchesSale = !onSaleOnly || !!p.discountPrice;
      const matchesRating = p.rating >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesSale && matchesRating;
    });
  }, [products, searchQuery, selectedCategory, priceMin, priceMax, inStockOnly, onSaleOnly, minRating]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return b.sold - a.sold;
      }
    });
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (searchQuery) params.set("search", searchQuery);
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (searchQuery) params.set("search", searchQuery);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setPriceMin(0);
    setPriceMax(10000000);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setMinRating(0);
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = priceMin > 0 || priceMax < 10000000 || inStockOnly || onSaleOnly || minRating > 0;
  const activeFilterCount = [priceMin > 0, priceMax < 10000000, inStockOnly, onSaleOnly, minRating > 0].filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Marketplace</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""} found
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5 lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {priceMin > 0 && (
                <Badge className="rounded-full text-[10px] bg-primary/10 text-primary border-0 gap-1">
                  Min: Tshs {priceMin.toLocaleString()}
                  <button onClick={() => setPriceMin(0)}><X className="h-3 w-3" /></button>
                </Badge>
              )}
              {priceMax < 10000000 && (
                <Badge className="rounded-full text-[10px] bg-primary/10 text-primary border-0 gap-1">
                  Max: Tshs {priceMax.toLocaleString()}
                  <button onClick={() => setPriceMax(10000000)}><X className="h-3 w-3" /></button>
                </Badge>
              )}
              {inStockOnly && (
                <Badge className="rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 border-0 gap-1">
                  In Stock
                  <button onClick={() => setInStockOnly(false)}><X className="h-3 w-3" /></button>
                </Badge>
              )}
              {onSaleOnly && (
                <Badge className="rounded-full text-[10px] bg-rose-500/10 text-rose-600 border-0 gap-1">
                  On Sale
                  <button onClick={() => setOnSaleOnly(false)}><X className="h-3 w-3" /></button>
                </Badge>
              )}
              {minRating > 0 && (
                <Badge className="rounded-full text-[10px] bg-primary/10 text-primary border-0 gap-1">
                  ★ {minRating}+
                  <button onClick={() => setMinRating(0)}><X className="h-3 w-3" /></button>
                </Badge>
              )}
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground underline px-1">
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-6">
            {/* Filter Sidebar - Desktop */}
            <AnimatePresence>
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  "shrink-0 w-56 space-y-5",
                  "hidden lg:block",
                  showFilters && "block lg:hidden fixed inset-0 z-50 bg-background p-6 overflow-y-auto"
                )}
                >
                  <div className="flex items-center justify-between mb-4 lg:hidden">
                    <h2 className="font-bold">Filters</h2>
                    <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Price Range</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] text-muted-foreground">Min (TZS)</label>
                        <input
                          type="number"
                          value={priceMin}
                          onChange={(e) => { setPriceMin(Number(e.target.value)); setCurrentPage(1); }}
                          className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs outline-none focus:ring-1 focus:ring-primary/30"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-muted-foreground">Max (TZS)</label>
                        <input
                          type="number"
                          value={priceMax >= 10000000 ? "" : priceMax}
                          onChange={(e) => { setPriceMax(Number(e.target.value) || 10000000); setCurrentPage(1); }}
                          className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs outline-none focus:ring-1 focus:ring-primary/30"
                          placeholder="10,000,000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/50" />

                  {/* In Stock */}
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={() => { setInStockOnly(!inStockOnly); setCurrentPage(1); }}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                    />
                    <span className="text-sm group-hover:text-foreground transition-colors">In Stock Only</span>
                  </label>

                  <div className="border-t border-border/50" />

                  {/* On Sale */}
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={() => { setOnSaleOnly(!onSaleOnly); setCurrentPage(1); }}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                    />
                    <span className="text-sm group-hover:text-foreground transition-colors">On Sale</span>
                  </label>

                  <div className="border-t border-border/50" />

                  {/* Minimum Rating */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Minimum Rating</h3>
                    <div className="flex gap-1">
                      {[0, 3, 3.5, 4, 4.5].map((r) => (
                        <button
                          key={r}
                          onClick={() => { setMinRating(r === minRating ? 0 : r); setCurrentPage(1); }}
                          className={cn(
                            "flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all",
                            minRating === r
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/50 text-muted-foreground hover:border-primary/30"
                          )}
                        >
                          {r === 0 ? "Any" : `${r}+`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/50" />

                  <Button variant="outline" size="sm" className="w-full rounded-lg text-xs" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
              </motion.aside>
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search + Sort Bar */}
              <div className="flex flex-col lg:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <form onSubmit={handleSearch}>
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </form>
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
                      "shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all border",
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-muted-foreground hover:text-foreground border-border bg-card hover:border-primary/30"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid/List */}
              {paginatedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
                  <p className="text-base text-muted-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedProducts.map((product, index) => (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                          currentPage === pageNum
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-border text-sm disabled:opacity-30 hover:bg-muted transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </motion.div>
  );
}
