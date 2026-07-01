import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumb,
}: {
  eyebrow: string;
  title: string;
  description: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{crumb}</span>
        </nav>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 max-w-2xl"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}
