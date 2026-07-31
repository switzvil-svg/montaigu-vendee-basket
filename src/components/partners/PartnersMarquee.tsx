import { partners } from "@/data/club";

/** Auto-scrolling logo strip; marks are monochrome until hovered. */
export function PartnersMarquee() {
  const loop = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden" aria-label="Nos partenaires">
      <ul className="flex w-max animate-[vbc-marquee_45s_linear_infinite] gap-14 motion-reduce:animate-none">
        {loop.map((p, i) =>
          p.logo ? (
            <li key={`${p.name}-${i}`} className="flex shrink-0 items-center">
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className="h-10 w-auto object-contain grayscale transition-[filter] duration-[250ms] hover:grayscale-0"
              />
            </li>
          ) : (
            <li
              key={`${p.name}-${i}`}
              className="font-display text-2xl whitespace-nowrap text-muted-foreground uppercase transition-colors duration-[250ms] hover:text-primary"
            >
              {p.name}
            </li>
          ),
        )}
      </ul>
      <style>{`@keyframes vbc-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
