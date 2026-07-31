import { club, type StandingRow } from "@/data/club";
import { cn } from "@/lib/utils";

/** Tableau de classement générique (poule à points), utilisé pour chaque catégorie. */
export function StandingsTable({ rows }: { rows: StandingRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs tracking-[0.12em] text-muted-foreground uppercase">
            <th className="py-3 pr-4 font-medium">#</th>
            <th className="py-3 pr-4 font-medium">Équipe</th>
            <th className="py-3 pr-4 text-right font-medium">Pts</th>
            <th className="py-3 pr-4 text-right font-medium">J</th>
            <th className="py-3 pr-4 text-right font-medium">V</th>
            <th className="py-3 pr-4 text-right font-medium">D</th>
            <th className="py-3 pr-4 text-right font-medium">BP</th>
            <th className="py-3 pr-4 text-right font-medium">BC</th>
            <th className="py-3 text-right font-medium">Diff</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.rank}
              className={cn("border-b border-border/70", r.team === club.name && "bg-primary/5")}
            >
              <td className="py-3 pr-4 text-navy">{r.rank}</td>
              <td className={cn("py-3 pr-4", r.team === club.name && "font-semibold text-navy")}>
                <div className="flex items-center gap-3">
                  {r.logo ? (
                    <img
                      src={r.logo}
                      alt=""
                      loading="lazy"
                      width={28}
                      height={28}
                      className="size-7 shrink-0 rounded-full object-contain"
                    />
                  ) : null}
                  <span>{r.team}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-right font-display text-lg text-navy">{r.points}</td>
              <td className="py-3 pr-4 text-right text-muted-foreground">{r.played}</td>
              <td className="py-3 pr-4 text-right text-muted-foreground">{r.wins}</td>
              <td className="py-3 pr-4 text-right text-muted-foreground">{r.losses}</td>
              <td className="py-3 pr-4 text-right text-muted-foreground">{r.scored}</td>
              <td className="py-3 pr-4 text-right text-muted-foreground">{r.conceded}</td>
              <td
                className={cn(
                  "py-3 text-right",
                  r.diff > 0 ? "text-primary" : "text-muted-foreground",
                )}
              >
                {r.diff > 0 ? `+${r.diff}` : r.diff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
