const PARTNERS = ["Vodacom", "Airtel", "TIGO", "CRDB", "NMB", "DHL", "Posta", "Selcom"];

export function Partners() {
  return (
    <section className="border-y border-border/60 bg-card/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by leading Tanzanian brands
        </div>
        <div className="grid grid-cols-2 items-center gap-6 opacity-70 sm:grid-cols-4 md:grid-cols-8">
          {PARTNERS.map((p) => (
            <div
              key={p}
              className="text-center text-lg font-black tracking-tight text-muted-foreground transition hover:text-foreground"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
