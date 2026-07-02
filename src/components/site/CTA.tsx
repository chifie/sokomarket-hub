import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-500 to-sky-700 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-yellow-400/50 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Start Buying and Selling Today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          Join Kenya's fastest-growing digital marketplace. Zero setup fees.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/marketplace"
            className="h-12 rounded-full bg-white px-8 font-semibold text-sky-600 inline-flex items-center justify-center hover:bg-white/90 transition"
          >
            Shop Now
          </Link>
          <button
            className="h-12 rounded-full border border-white/40 bg-transparent px-8 font-semibold text-white inline-flex items-center justify-center hover:bg-white/10 transition"
          >
            Become a Seller
          </button>
        </div>
      </motion.div>
    </section>
  );
}
