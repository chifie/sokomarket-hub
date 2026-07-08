import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingCart, Heart, Bell, User, ChevronDown,
  Menu, X, Sparkles, Store, ChevronRight, Package, LogOut,
  Settings, Grid3X3
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
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { categories } from "@/lib/constants";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const isAuthenticated = false; // TODO: connect to auth
  const navigate = useNavigate();

  const cartCount = 3;
  const wishlistCount = 5;
  const notificationCount = 2;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hidden lg:flex h-8 items-center justify-between border-b border-border/30 bg-muted/30 px-6 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Welcome to Soko Digital!</span>
          <span className="text-border/50">|</span>
          <Link to="/sell" className="hover:text-primary transition-colors flex items-center gap-1">
            <Store className="h-3 w-3" />
            Become a Seller
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <span className="text-border/50">|</span>
          <Link to="/help" className="hover:text-primary transition-colors">Help Center</Link>
          <Link to="/orders/track" className="hover:text-primary transition-colors">Track Order</Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-sm">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="hidden sm:block text-lg font-bold tracking-tight">
            Soko<span className="text-primary font-light">Digital</span>
          </span>
        </Link>

        {/* Category Dropdown (Desktop) */}
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 gap-1.5 text-xs font-medium rounded-full border border-border/40">
                <Grid3X3 className="h-3.5 w-3.5" />
                Categories
                <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                Shop by Category
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.slice(0, 6).map((cat) => (
                <DropdownMenuItem key={cat.id} className="cursor-pointer group">
                  <span className="flex-1 text-sm">{cat.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {cat.productCount.toLocaleString()}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-primary text-xs gap-1 font-medium">
                View All Categories
                <ChevronRight className="h-3 w-3" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border-border/50 bg-muted/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
            />
          </div>
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
        <div className="flex items-center gap-1.5">
          {/* AI Assistant */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex h-9 gap-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-all duration-200"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Assistant
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-accent">
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-accent">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-amber-500 text-[9px] font-bold text-white flex items-center justify-center shadow-sm">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full hover:bg-accent"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Button>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
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
                className="h-9 text-xs font-medium rounded-full"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="h-9 text-xs font-medium rounded-full bg-primary hover:bg-primary/90 shadow-sm"
                onClick={() => navigate("/auth")}
              >
                Sign Up
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="h-10 w-full rounded-full pl-10"
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
            className="lg:hidden border-t border-border/30 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                {categories.slice(0, 4).map((cat) => (
                  <Button key={cat.id} variant="ghost" className="w-full justify-between text-sm h-10">
                    <span>{cat.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                ))}
              </div>
              <div className="border-t border-border/30 pt-3 flex gap-2">
                <Button variant="outline" className="flex-1 h-10 text-xs" onClick={() => navigate("/sell")}>
                  <Store className="h-3.5 w-3.5 mr-1.5" />
                  Sell
                </Button>
                <Button variant="outline" className="flex-1 h-10 text-xs">
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
