import { motion } from "framer-motion";
import { Link } from "react-router";
import { Search, Home, ArrowLeft, Compass, ShoppingBag, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
  { icon: Home, label: "Go Home", href: "/" },
  { icon: ShoppingBag, label: "Shop Products", href: "/products" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: HelpCircle, label: "Help Center", href: "/help" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Decorative Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center max-w-lg"
      >
        {/* Large Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-br from-primary via-blue-500 to-accent bg-clip-text text-transparent select-none"
        >
          404
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center -mt-8 mb-6"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Compass className="h-8 w-8 text-primary" />
          </div>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let us help you find your way back.
        </p>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {suggestions.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <Link
                to={item.href}
                className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 group"
              >
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          size="lg"
          className="rounded-full h-12 px-8 text-sm font-medium border-border/50 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </motion.div>
    </div>
  );
}
