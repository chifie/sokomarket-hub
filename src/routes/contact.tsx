import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SokoDigital" },
      {
        name: "description",
        content: "Get in touch with the SokoDigital team — support, sales, and partnerships.",
      },
    ],
  }),
  component: Page,
});

const INFO = [
  { icon: Phone, title: "Call Us", lines: ["+255 754 000 111", "Mon – Sat, 8am – 8pm"] },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@sokodigital.co.tz", "We reply within 24 hours"],
  },
  { icon: MapPin, title: "Visit Us", lines: ["Msasani Peninsula, Dar es Salaam", "Tanzania"] },
  { icon: Clock, title: "Business Hours", lines: ["Mon – Fri: 8:00 – 18:00", "Sat: 9:00 – 15:00"] },
];

function Page() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageHeader
        eyebrow="Contact"
        crumb="Contact"
        title="We'd love to hear from you."
        description="Questions about an order, becoming a seller, or a partnership idea? Reach out — our team responds fast."
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INFO.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-bold">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-muted-foreground">
                    {l}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft lg:col-span-3 lg:p-10"
            >
              <h2 className="text-2xl font-black tracking-tight">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the form and our team will get back to you shortly.
              </p>

              {submitted ? (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl bg-primary/5 py-16 text-center">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <p className="text-sm font-semibold">Thanks! Your message has been sent.</p>
                  <p className="text-xs text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-8 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground">
                        Full Name
                      </label>
                      <input
                        required
                        placeholder="Jane Mwangi"
                        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Subject</label>
                    <input
                      required
                      placeholder="How can we help?"
                      className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us more…"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-elegant hover:opacity-95 sm:w-auto sm:px-8"
                  >
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* map / office */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft lg:col-span-2"
            >
              <div className="relative flex h-56 items-center justify-center bg-gradient-hero">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <div className="p-8">
                <h3 className="text-lg font-bold">SokoDigital HQ</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Plot 24, Msasani Peninsula
                  <br />
                  Dar es Salaam, Tanzania
                </p>
                <div className="mt-6 space-y-3 border-t border-border/60 pt-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday – Friday</span>
                    <span className="font-medium">8:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">9:00 – 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
