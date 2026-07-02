import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I start selling on SokoDigital?",
    a: "Create a free seller account, complete a quick KYC, list your products, and you're ready to receive orders across the world.",
  },
  {
    q: "Which payment methods are supported?",
    a: "Mobile Wallets, , Visa, Mastercard, and secure bank transfers — all protected by escrow.",
  },
  {
    q: "How fast is delivery?",
    a: "Same-day delivery is available in Metro areas, Kiambu, and Mombasa. Nationwide delivery takes 1–3 business days.",
  },
  {
    q: "What if I'm not happy with my order?",
    a: "We offer 7-day hassle-free returns on eligible items with a full refund back to your original payment method.",
  },
  {
    q: "Is SokoDigital available on mobile?",
    a: "Yes! Our iOS and Android apps deliver a fast, native shopping experience with exclusive app-only deals.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            FAQ
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            Everything you need to know
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-5 text-left"
              >
                <span className="text-base font-semibold text-foreground">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-muted-foreground">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
