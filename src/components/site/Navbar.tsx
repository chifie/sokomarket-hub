import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Moon, Sun, MapPin, ChevronDown, User, Menu, Globe } from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useLang } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const location = useLocation();

  const NAV_LINKS = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.marketplace"), to: "/marketplace" },
    { label: t("nav.categories"), to: "/categories" },
    { label: t("nav.shops"), to: "/shops" },
    { label: t("nav.deals"), to: "/deals" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        scrolled ? "shadow-md" : ""
      )}
    >
      {/* Top navy bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link to="/" className="flex shrink-0 items-center gap-1 rounded border border-transparent px-2 py-1.5 hover:border-white/40">
            <Logo className="h-8 w-auto text-white" />
            <span className="text-xl font-black tracking-tight">
              Soko<span className="text-primary">Digital</span>
            </span>
          </Link>

          {/* Deliver to */}
          <button className="hidden md:flex shrink-0 items-center gap-1 rounded border border-transparent px-2 py-1.5 text-left text-xs hover:border-white/40">
            <MapPin className="h-4 w-4 text-white/70" />
            <div className="leading-tight">
              <div className="text-white/60">Deliver to</div>
              <div className="text-sm font-bold">Worldwide</div>
            </div>
          </button>

          {/* Search */}
          <div className="flex min-w-0 flex-1 items-stretch overflow-hidden rounded-md bg-white ring-2 ring-transparent focus-within:ring-primary">
            <button className="hidden sm:flex shrink-0 items-center gap-1 bg-muted px-3 text-xs font-semibold text-foreground hover:bg-muted/80">
              All <ChevronDown className="h-3 w-3" />
            </button>
            <input
              placeholder={t("nav.search")}
              className="min-w-0 flex-1 bg-white px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button aria-label="Search" className="grid shrink-0 place-items-center bg-primary px-4 text-primary-foreground hover:brightness-110">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Language */}
          <button
            onClick={() => setLang(lang === "en" ? "sw" : "en")}
            className="hidden sm:flex shrink-0 items-center gap-1 rounded border border-transparent px-2 py-1.5 text-xs font-bold hover:border-white/40"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Account */}
          <Link
            to="/auth"
            className="hidden lg:flex shrink-0 flex-col rounded border border-transparent px-2 py-1.5 text-xs leading-tight hover:border-white/40"
          >
            <span className="text-white/60">Hello, sign in</span>
            <span className="text-sm font-bold flex items-center gap-1">
              Account <ChevronDown className="h-3 w-3" />
            </span>
          </Link>
          <Link
            to="/auth"
            aria-label="Account"
            className="grid h-10 w-10 shrink-0 place-items-center rounded lg:hidden hover:bg-white/10"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Theme */}
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="grid h-10 w-10 shrink-0 place-items-center rounded hover:bg-white/10"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Cart */}
          <Link to="/marketplace" className="relative flex shrink-0 items-center gap-1 rounded border border-transparent px-2 py-1.5 hover:border-white/40">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground">
                3
              </span>
            </div>
            <span className="hidden xl:inline text-sm font-bold">Cart</span>
          </Link>
        </div>

        {/* Secondary nav */}
        <div className="border-t border-white/10 bg-secondary/95">
          <div className="mx-auto flex h-10 max-w-7xl items-center gap-1 overflow-x-auto px-3 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button className="flex shrink-0 items-center gap-1.5 rounded border border-transparent px-2 py-1 text-sm font-bold text-white hover:border-white/40">
              <Menu className="h-4 w-4" /> All
            </button>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "shrink-0 rounded border border-transparent px-2 py-1 text-sm font-medium text-white/90 hover:border-white/40",
                  isActive(l.to) && "border-white/60 font-bold"
                )}
              >
                {l.label}
              </Link>
            ))}
            <span className="ml-auto shrink-0 text-xs text-primary font-bold">Free shipping on orders $50+</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
