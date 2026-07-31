import { institutions, partners, type Partner } from "@/data/club";
import { cn } from "@/lib/utils";

/**
 * Tiered sponsor wall (Or > Argent > Bronze), sized and spaced to echo
 * that hierarchy — used below match content on the player detail page.
 */
const tierConfig: Record<
  Partner["tier"],
  { label: string; cols: string; card: string; text: string }
> = {
  Or: {
    label: "Partenaires principaux",
    cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    card: "p-8",
    text: "text-xl sm:text-2xl",
  },
  Argent: {
    label: "Partenaires premium",
    cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    card: "p-6",
    text: "text-lg sm:text-xl",
  },
  Bronze: {
    label: "Partenaires officiels",
    cols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    card: "p-5",
    text: "text-base",
  },
};

const tiers: Partner["tier"][] = ["Or", "Argent", "Bronze"];

export function SponsorsSection() {
  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-primary/[0.05]" />
      <div className="container-vbc relative">
        <div className="text-center">
          <p className="eyebrow text-primary">Ils soutiennent le club</p>
          <h2 className="mt-3 font-display text-4xl text-navy uppercase sm:text-5xl">
            Sponsors &amp; partenaires
          </h2>
        </div>

        <div className="mt-14 space-y-14">
          {tiers.map((tier) => {
            const config = tierConfig[tier];
            const tierPartners = partners.filter((p) => p.tier === tier);
            if (!tierPartners.length) return null;
            return (
              <div key={tier}>
                <p className="text-center text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                  {config.label}
                </p>
                <ul className={cn("mt-6 grid gap-4", config.cols)}>
                  {tierPartners.map((p) => (
                    <li key={p.name}>
                      <div
                        className={cn(
                          "flex h-full flex-col items-center justify-center gap-1.5 rounded-[10px] border border-border bg-white text-center shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-[200ms] hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-card-hover)]",
                          config.card,
                        )}
                      >
                        {p.logo ? (
                          <img
                            src={p.logo}
                            alt={p.name}
                            loading="lazy"
                            className="h-10 w-full object-contain"
                          />
                        ) : (
                          <span className={cn("font-display text-navy uppercase", config.text)}>
                            {p.name}
                          </span>
                        )}
                        <span className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                          {p.sector}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-border pt-10">
          {institutions.map((i) => (
            <span
              key={i}
              className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
