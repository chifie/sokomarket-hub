import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CATS = [
  { name: "Electronics", img: "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Fashion", img: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Phones", img: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Computers", img: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Home & Furniture", img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Beauty", img: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Agriculture", img: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Food & Grocery", img: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Automotive", img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Books", img: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Sports", img: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Health", img: "https://images.pexels.com/photos/3873209/pexels-photo-3873209.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

export function Categories() {
  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Shop by category</h2>
            <p className="mt-1 text-sm text-muted-foreground">Explore departments trusted by millions of buyers worldwide.</p>
          </div>
          <Link to="/categories" className="hidden sm:inline text-sm font-semibold text-accent hover:underline">
            See all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {CATS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link
                to={`/marketplace?category=${encodeURIComponent(c.name.split(" ")[0])}`}
                className="group block overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="px-2 py-2 text-center text-xs font-semibold text-foreground sm:text-sm">
                  {c.name}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
