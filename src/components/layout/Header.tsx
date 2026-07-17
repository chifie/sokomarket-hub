import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, ShoppingCart, Heart, Bell, MessageCircle,
  Menu, X, Sparkles, Store, ChevronDown, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories, trendingSearches } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = false;
  const navigate = useNavigate();

  const cartCount = 3;
  const wishlistCount = 5;
  const notificationCount = 2;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-primary">
      <div className="px-4 sm:px-8 lg:px-12 xl:px-16 py-3 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="hidden sm:block text-xl font-bold text-white tracking-tight">
              Soko<span className="font-light text-white/80">Digital</span>
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div ref={searchRef} className="flex-1 max-w-md mx-4 hidden md:block relative">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/15 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                onFocus={() => setShowSearchSuggestions(true)}
              />
            </div>
          </form>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSearchSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50"
              >
                <div className="p-3">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Trending</p>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingSearches.slice(0, 5).map((term) => (
                      <button
                        key={term}
                        className="px-3 py-1.5 rounded-full bg-gray-100 text-xs text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Search */}
          <button className="md:hidden text-white p-1.5" onClick={() => setShowSearch(!showSearch)}>
            <Search className="h-5 w-5" />
          </button>

          {/* Messages */}
          <Link to="/messages" className="relative text-white p-1.5" title="Messages">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative text-white p-1.5" title="Wishlist">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-500 text-[8px] font-bold text-white flex items-center justify-center shadow-sm ring-2 ring-primary">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative text-white p-1.5" title="Notifications">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-amber-500 text-[8px] font-bold text-white flex items-center justify-center shadow-sm ring-2 ring-primary">
                    {notificationCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 rounded-xl">
              <DropdownMenuLabel className="text-sm font-semibold">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { icon: ShoppingCart, title: "Order Shipped!", desc: "Your iPhone 15 is on its way" },
                { icon: Sparkles, title: "Flash Sale! 60% Off", desc: "Electronics deals end soon" },
                { icon: MessageCircle, title: "Seller responded", desc: "TechHub Tanzania replied" },
              ].map((n, i) => {
                const Icon = n.icon;
                return (
                  <DropdownMenuItem key={i} className="cursor-pointer py-2.5">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link to="/cart" className="relative text-white p-1.5" title="Cart">
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-white text-[8px] font-bold text-primary flex items-center justify-center shadow-sm ring-2 ring-primary">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white p-1.5">
                  <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                    U
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Wishlist</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-rose-500">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="hidden sm:inline text-sm font-semibold text-white hover:underline">
              Log In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="sm:hidden text-white p-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-3"
          >
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/15 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden bg-primary/95 backdrop-blur-sm"
          >
            <div className="px-4 pb-4 space-y-1">
              <Link to="/auth" className="block px-4 py-2.5 rounded-lg text-white/90 text-sm font-medium hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>
                Log In / Sign Up
              </Link>
              <Link to="/sell" className="block px-4 py-2.5 rounded-lg text-white/90 text-sm font-medium hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>
                <Store className="h-4 w-4 inline mr-2" />
                Start Selling
              </Link>
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/marketplace?category=${cat.slug}`}
                  className="block px-4 py-2 rounded-lg text-white/70 text-sm hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
