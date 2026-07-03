import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Moon, Sun, Bot, Store, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import logoIcon from "@/assets/brand/logo-icon.png";

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
          : "bg-background/80 backdrop-blur-md"
      )}
    >
      {/* Top utility bar */}
      <div className="hidden bg-[#0b1f4d] text-white sm:block dark:bg-black/40">
        <div className="mx-auto flex h-9 max-w-7xl items-center gap-4 px-4 text-xs sm:px-6 lg:px-8">
          <span className="truncate opacity-90">
            Trusted by thousands of buyers and sellers across Tanzania
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-1.5 opacity-90 transition hover:opacity-100">
              <Store className="h-3.5 w-3.5" />
              Sell on SokoDigital
            </Link>
            <Link to="/contact" className="hidden items-center gap-1.5 opacity-90 transition hover:opacity-100 md:flex">
              <HelpCircle className="h-3.5 w-3.5" />
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main row: logo, horizontal nav, actions — always horizontal, no collapse menu */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logoIcon} alt="SokoDigital" className="h-8 w-auto sm:h-9" />
          <span className="hidden text-lg font-extrabold tracking-tight text-foreground sm:inline">
            Soko<span className="text-blue-600 dark:text-blue-400">Digital</span>
          </span>
        </Link>

        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(l.to)
                  ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search products, shops..."
              className="h-10 w-56 rounded-full border border-border bg-background/80 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-foreground 2xl:w-72"
            />
          </div>
          <button
            aria-label="Search"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/80 transition hover:bg-muted xl:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/chat"
            aria-label="AI Assistant"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 md:flex"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden lg:inline">AI Assistant</span>
          </Link>
          <button
            aria-label="Cart"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/80 transition hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/80 transition hover:bg-muted"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            to="/auth"
            className="hidden shrink-0 rounded-full px-4 py-2 font-medium text-foreground/80 transition hover:bg-muted sm:inline-block"
          >
            Login
          </Link>
          <Link
            to="/auth"
            className="shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-95 sm:px-4"
          >
            Register
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
