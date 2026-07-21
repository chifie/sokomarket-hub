import { useRef, useEffect } from "react";
import { Star, Quote, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        section.querySelector(".testimonials-header"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Testimonial cards staggered reveal
      const cards = grid.querySelectorAll(".testimonial-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Hover effect for each testimonial card
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -4,
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          });
          const quote = card.querySelector(".testimonial-quote");
          if (quote) {
            gsap.to(quote, { scale: 1.2, duration: 0.3, ease: "back.out(2)" });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          });
          const quote = card.querySelector(".testimonial-quote");
          if (quote) {
            gsap.to(quote, { scale: 1, duration: 0.3, ease: "power2.out" });
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="testimonials-header text-center mb-12 opacity-0">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">What Our Community Says</h2>
          <p className="text-muted-foreground mt-1.5 text-sm max-w-xl mx-auto">
            Join millions of satisfied buyers and sellers across Tanzania
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card relative rounded-2xl border border-border/50 bg-card p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="testimonial-quote h-8 w-8 text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors" />

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
