import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ArrowRight, Bell, ShoppingBag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 md:p-12"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-medium mb-4">
                <Bell className="h-3.5 w-3.5" />
                Stay Updated
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Never Miss a Deal
              </h2>
              <p className="text-muted-foreground mt-2 text-sm max-w-md">
                Subscribe to our newsletter and get exclusive offers, new arrivals, 
                and seller tips delivered to your inbox.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                  Weekly deals
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Gift className="h-3.5 w-3.5 text-primary" />
                  Exclusive offers
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  No spam ever
                </div>
              </div>
            </div>

            {/* Right - Subscribe Form */}
            <div className="w-full max-w-md">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl pl-10 border-border/50 bg-muted/50 focus-visible:ring-primary/30"
                  />
                </div>
                <Button className="h-12 rounded-xl px-6 gap-1.5 shadow-sm">
                  Subscribe
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">
                By subscribing, you agree to our{" "}
                <a href="#" className="underline hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
