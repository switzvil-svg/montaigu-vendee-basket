import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ResultRow } from "@/data/club";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 10;

/** Le score est stocké "domicile-extérieur" : on le remet en "VBC-adversaire" et on en déduit V/D. */
function vbcResult(r: ResultRow) {
  const [a, b] = r.score.split("-").map(Number);
  const [vbc, opponent] = r.home ? [a, b] : [b, a];
  return { vbc, opponent, won: vbc > opponent };
}

/** Colonne "derniers résultats" : les plus récents affichés d'abord, le reste replié. */
export function RecentResults({ rows }: { rows: ResultRow[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? rows : rows.slice(0, PREVIEW_COUNT);

  if (!rows.length) return null;

  return (
    <div className="rounded-[10px] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <p className="eyebrow">Derniers résultats</p>
      <ul className="mt-5 divide-y divide-border">
        {visible.map((r) => {
          const { vbc, opponent, won } = vbcResult(r);
          return (
            <li key={r.matchday} className="flex items-center gap-3 py-3">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                  won ? "bg-emerald-500/15 text-emerald-600" : "bg-red-500/15 text-red-600",
                )}
                aria-label={won ? "Victoire" : "Défaite"}
              >
                {won ? "V" : "D"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy">{r.opponent}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">J{r.matchday}</p>
              </div>
              <span className="shrink-0 font-display text-lg text-navy">
                {vbc}–{opponent}
              </span>
            </li>
          );
        })}
      </ul>
      {!showAll && rows.length > PREVIEW_COUNT ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy hover:text-primary"
        >
          Voir les {rows.length - PREVIEW_COUNT} précédents
          <ChevronDown size={15} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

/** Bloc "à venir" pour une colonne résultats sans données réelles pour l'instant. */
export function RecentResultsPending() {
  return (
    <div className="rounded-[10px] border border-dashed border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
      Résultats à venir, dès le début de la saison.
    </div>
  );
}
