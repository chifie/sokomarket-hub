import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Menu, X, Moon, Sun, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Categories", to: "/categories" },
  { label: "Shops", to: "/shops" },
  { label: "Deals", to: "/deals" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 border-b border-border/60 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-md">
            <span className="text-lg font-black">S</span>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Soko<span className="text-sky-500">Digital</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(l.to)
                  ? "text-sky-500 bg-sky-50 dark:bg-sky-950/50"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search products, shops..."
              className="h-10 w-72 rounded-full border border-border bg-background/80 pl-9 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-foreground"
            />
          </div>
          <Link
            to="/chat"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Link>
          <button
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-sky-500 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition hover:bg-muted"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/auth" className="rounded-full font-medium px-4 py-2 text-foreground/80 hover:bg-muted transition">
            Login
          </Link>
          <Link to="/auth" className="rounded-full bg-gradient-to-r from-sky-500 to-rose-500 font-semibold text-white shadow-md hover:opacity-95 transition px-4 py-2">
            Register
          </Link>
        </div>

        <button
          className="ml-auto grid h-10 w-10 place-items-center rounded-full text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur lg:hidden">
          <div className="space-y-1 p-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium",
                  isActive(l.to)
                    ? "text-sky-500 bg-sky-50 dark:bg-sky-950/50"
                    : "hover:bg-muted"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/chat"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Bot className="h-4 w-4" />
              AI Assistant
            </Link>
            <div className="flex gap-2 pt-2">
              <Link to="/auth" onClick={() => setOpen(false)} className="flex-1 text-center rounded-full border border-border bg-background px-4 py-2 font-medium text-foreground hover:bg-muted transition">
                Login
              </Link>
              <Link to="/auth" onClick={() => setOpen(false)} className="flex-1 text-center rounded-full bg-gradient-to-r from-sky-500 to-rose-500 text-white px-4 py-2 font-medium hover:opacity-90 transition">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
