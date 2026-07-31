import type { Partner } from "@/data/club";

/** White card holding either a real partner logo or a typographic mark. */
export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[10px] border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          className="h-14 w-full object-contain"
        />
      ) : (
        <span className="font-display text-2xl text-navy uppercase">{partner.name}</span>
      )}
      <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
        {partner.sector}
      </span>
    </div>
  );
}
