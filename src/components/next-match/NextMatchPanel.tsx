import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import crest from "@/assets/crest.png";
import { CtaButton } from "@/components/ui-kit/CtaButton";
import { club, type Match } from "@/data/club";
import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

/** ASBH-style "Prochain match" panel — reused on the home hero and the calendar. */
export function NextMatchPanel({ match, className }: { match: Match; className?: string }) {
  const countdown = useCountdown(match.date);
  const date = new Date(match.date);

  return (
    <section
      aria-labelledby="next-match-title"
      className={cn("flex w-full flex-col justify-center", className)}
    >
      <p className="eyebrow">Prochain match</p>
      <h2 id="next-match-title" className="mt-3 text-3xl uppercase sm:text-4xl">
        {match.competition}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{match.round}</p>

      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src={crest}
            alt={`Blason du ${club.short}`}
            width={72}
            height={72}
            className="h-16 w-auto"
          />
          <span className="font-display text-xl uppercase">{club.short}</span>
        </div>
        <span className="font-display text-2xl text-muted-foreground">VS</span>
        <div className="flex flex-col items-center gap-3 text-center">
          {match.opponentLogo ? (
            <img
              src={match.opponentLogo}
              alt=""
              width={64}
              height={64}
              className="size-16 rounded-full border border-border bg-surface object-contain p-1.5"
            />
          ) : (
            <span
              aria-hidden
              className="grid size-16 place-items-center rounded-full border border-border bg-surface font-display text-xl text-navy"
            >
              {match.opponentShort}
            </span>
          )}
          <span className="font-display text-xl uppercase">{match.opponent}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "rounded-[10px] px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase",
            match.home ? "bg-primary text-primary-foreground" : "bg-navy text-navy-foreground",
          )}
        >
          {match.home ? "Domicile" : "Extérieur"}
        </span>
        <span className="text-[15px] font-semibold text-navy">
          {dateFmt.format(date)} · {timeFmt.format(date)}
        </span>
      </div>

      <p className="mt-3 flex items-center gap-2 text-[15px] text-muted-foreground">
        <MapPin size={16} className="shrink-0 text-primary" aria-hidden />
        {match.venue}
      </p>

      <dl
        className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-6"
        aria-live="polite"
        aria-label="Compte à rebours avant le coup d'envoi"
      >
        {(["jours", "heures", "minutes"] as const).map((unit) => (
          <div key={unit} className="text-center">
            <dt className="sr-only">{unit}</dt>
            <dd>
              <span className="block font-display text-4xl text-navy tabular-nums">
                {countdown ? String(countdown[unit]).padStart(2, "0") : "--"}
              </span>
              <span className="mt-1 block text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                {unit}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <CtaButton to="/billetterie" size="lg" className="btn-shine">
          Réserver mes places
        </CtaButton>
        <Link to="/calendrier" className="link-underline text-[15px] font-semibold text-navy">
          Voir le calendrier complet
        </Link>
      </div>
    </section>
  );
}
