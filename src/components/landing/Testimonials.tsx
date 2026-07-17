import { motion } from "framer-motion";
import { Star, Quote, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">What Our Community Says</h2>
          <p className="text-muted-foreground mt-1.5 text-sm max-w-xl mx-auto">
            Join millions of satisfied buyers and sellers across Tanzania
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative rounded-2xl border border-border/50 bg-card p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors" />

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4 transition-all duration-200",
                      i < testimonial.rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-muted-foreground/20"
                    )}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-border/30 group-hover:ring-primary/30 transition-all">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/30 ml-auto group-hover:text-primary/50 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
