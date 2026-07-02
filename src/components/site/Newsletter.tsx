import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-lg lg:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-yellow-400/25 blur-3xl" />
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-500">
                <Mail className="h-4 w-4" /> Newsletter
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-foreground">
                Get deals, drops & news — first.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Join 250,000+ shoppers. No spam, unsubscribe anytime.
              </p>
            </div>
            <form
              className="flex w-full flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-foreground"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 px-6 font-semibold text-white shadow-md hover:opacity-95 transition inline-flex items-center justify-center"
              >
                Subscribe <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
