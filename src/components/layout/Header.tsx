import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingCart, Heart, Bell, User, ChevronDown,
  Menu, X, Sparkles, Store, ChevronRight, Package, LogOut,
  Settings, Grid3X3, Mic, ImageIcon, TrendingUp, Clock,
  ArrowRight, Shield, Phone, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { categories, trendingSearches } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  smartphone: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  laptop: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></svg>,
  headphones: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>,
  shirt: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>,
  footprints: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M20 16v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 2 14 3.8 14 5.5c0 3.11 2 5.66 2 8.68V16a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2z" /><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /><path d="M6 22h12" /></svg>,
  sparkles: (props: any) => <Sparkles {...props} />,
  "shopping-bag": (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  armchair: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" /><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0z" /><path d="M5 18v2" /><path d="M19 18v2" /></svg>,
  "cooking-pot": (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20" /><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" /><path d="m4 8 16-4" /><path d="m8.86 6.09-.87-3.34" /><path d="m12.91 6.09.7-3.35" /><path d="m16.97 6.1 2.28-3.35" /></svg>,
  "gamepad-2": (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" x2="10" y1="12" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" /><rect width="20" height="12" x="2" y="6" rx="2" /></svg>,
  car: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>,
  trophy: (props: any) => <Trophy {...props} />,
  baby: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h.01" /><path d="M15 12h.01" /><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" /><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.8.7 5.2 1.8" /><path d="M12 5v4" /></svg>,
  "book-open": (props: any) => <BookOpen {...props} />,
  "heart-pulse": (props: any) => <HeartPulse {...props} />,
};

// Hover card for category mega menu
function CategoryMegaMenu({ category }: { category: typeof categories[0] }) {
  const IconComponent = iconMap[category.icon] || Package;
  return (
    <HoverCardContent
      align="start"
      className="w-72 p-0 overflow-hidden rounded-xl border-border/50 premium-shadow"
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">{category.name}</p>
            <p className="text-[11px] text-muted-foreground">{category.productCount.toLocaleString()} products</p>
          </div>
        </div>
        {category.subcategories && (
          <div className="space-y-1">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/marketplace?category=${sub.slug}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <span>{sub.name}</span>
                <span className="text-[10px] text-muted-foreground/60">{sub.productCount.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        )}
        <Link
          to={`/marketplace?category=${category.slug}`}
          className="mt-3 flex items-center justify-between px-3 py-2 rounded-lg bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
        >
          Browse All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </HoverCardContent>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = false;
  const navigate = useNavigate();

  const cartCount = 3;
  const wishlistCount = 5;
  const notificationCount = 2;

  // Close search suggestions on outside click
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
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar - Announcement */}
      <div className="hidden lg:flex h-8 items-center justify-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-[11px] text-primary font-medium">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" />
          Welcome to SokoDigital — Tanzania's Premier Marketplace!
          <span className="mx-2 text-primary/30">|</span>
          <Link to="/sell" className="underline underline-offset-2 hover:text-primary/80 transition-colors">
            Start Selling Today
          </Link>
        </span>
      </div>

      {/* Main Header */}
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9 shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="hidden sm:block text-xl font-bold tracking-tight">
            Soko<span className="text-primary font-light">Digital</span>
          </span>
        </Link>

        {/* Category Navigation - Desktop */}
        <div className="hidden xl:flex items-center">
          <div className="flex items-center gap-0.5">
            {categories.slice(0, 8).map((cat) => (
              <HoverCard key={cat.id} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Link
                    to={`/marketplace?category=${cat.slug}`}
                    className="px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                </HoverCardTrigger>
                <CategoryMegaMenu category={cat} />
              </HoverCard>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px] font-medium text-muted-foreground hover:text-foreground rounded-lg gap-0.5">
                  More
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.slice(8).map((cat) => (
                  <DropdownMenuItem key={cat.id} asChild className="cursor-pointer">
                    <Link to={`/marketplace?category=${cat.slug}`} className="text-sm">
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-auto relative">
          <div className="relative w-full group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-muted/50 border border-border/50 rounded-xl group-hover:border-primary/30 transition-all duration-300 premium-shadow">
              <Search className="ml-3.5 h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                type="search"
                placeholder="What are you looking for today?"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                className="h-10 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
              />
              <div className="flex items-center gap-1 mr-2">
                <button className="h-7 w-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Voice search">
                  <Mic className="h-3.5 w-3.5" />
                </button>
                <button className="h-7 w-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Image search">
                  <ImageIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {showSearchSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl premium-shadow overflow-hidden z-50"
              >
                <div className="p-3">
                  {/* Trending Searches */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Trending Now</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {trendingSearches.slice(0, 6).map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setShowSearchSuggestions(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-muted/50 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Recent Searches */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Recent Searches</span>
                    </div>
                    {["iPhone 15", "Kitenge dresses", "Laptop Deals"].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          setShowSearchSuggestions(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                      >
                        <Clock className="h-3 w-3" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 ml-auto"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* AI Assistant */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex h-9 gap-1.5 rounded-xl border border-primary/20 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-all duration-200 group"
            onClick={() => navigate("/chat")}
          >
            <Sparkles className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
            <span>AI Assistant</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl hover:bg-muted transition-colors">
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 rounded-full bg-rose-500 text-[8px] font-bold text-white flex items-center justify-center shadow-sm ring-2 ring-background">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl hover:bg-muted transition-colors">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 rounded-full bg-amber-500 text-[8px] font-bold text-white flex items-center justify-center shadow-sm ring-2 ring-background">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="text-sm font-semibold">Notifications</span>
                <button className="text-xs text-primary hover:underline">Mark all read</button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { icon: ShoppingCart, title: "Order Shipped!", desc: "Your iPhone 15 is on its way", color: "text-blue-500", bg: "bg-blue-500/10" },
                { icon: Sparkles, title: "Flash Sale! 60% Off", desc: "Electronics deals end soon", color: "text-rose-500", bg: "bg-rose-500/10" },
                { icon: MessageCircle, title: "Seller responded", desc: "TechHub Tanzania replied", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              ].map((n, i) => {
                const Icon = n.icon;
                return (
                  <DropdownMenuItem key={i} className="cursor-pointer py-3">
                    <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", n.bg)}>
                      <Icon className={cn("h-4 w-4", n.color)} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-xs text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-xl hover:bg-muted transition-colors"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 rounded-full bg-primary text-[8px] font-bold text-primary-foreground flex items-center justify-center shadow-sm ring-2 ring-background">
                {cartCount}
              </span>
            )}
          </Button>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 rounded-xl p-0">
                  <Avatar className="h-8 w-8 ring-2 ring-border/50">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" /> Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Store className="mr-2 h-4 w-4" /> Seller Dashboard
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-rose-500">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-xs font-medium rounded-xl px-4"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="h-9 text-xs font-medium rounded-xl bg-primary hover:bg-primary/90 shadow-sm px-4"
                onClick={() => navigate("/auth")}
              >
                Sign Up
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex h-9 text-xs font-medium rounded-xl border-primary/20 text-primary hover:bg-primary/5 gap-1.5 px-3"
              >
                <Store className="h-3.5 w-3.5" />
                Sell
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/30 px-4 py-3"
          >
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="h-10 w-full rounded-xl pl-10 bg-muted/50 border-border/50"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <Mic className="h-3 w-3" />
                Voice
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <ImageIcon className="h-3 w-3" />
                Image
              </button>
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
            className="lg:hidden border-t border-border/30 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/marketplace?category=${cat.slug}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-muted/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Package className="h-4 w-4" />
                    </div>
                    <span className="font-medium truncate">{cat.name}</span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-border/30 pt-3 flex gap-2">
                <Button variant="outline" className="flex-1 h-10 text-xs rounded-xl" onClick={() => { navigate("/sell"); setIsMenuOpen(false); }}>
                  <Store className="h-3.5 w-3.5 mr-1.5" />
                  Start Selling
                </Button>
                <Button variant="outline" className="flex-1 h-10 text-xs rounded-xl" onClick={() => { navigate("/chat"); setIsMenuOpen(false); }}>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  AI Help
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
