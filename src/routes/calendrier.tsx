import { createFileRoute, Link } from "@tanstack/react-router";
import { Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { NextMatchPanel } from "@/components/next-match/NextMatchPanel";
import { StandingsTable } from "@/components/standings/StandingsTable";
import { PageHero } from "@/components/ui-kit/PageHero";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { club, images, nextMatch, standings, upcomingMatches, type Match } from "@/data/club";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: `Calendrier & résultats — ${club.name}` },
      {
        name: "description",
        content: `Tous les matchs du ${club.short}. Dates, adversaires, scores et rencontres à ${club.venue}.`,
      },
      { property: "og:title", content: `Calendrier & résultats — ${club.name}` },
      { property: "og:description", content: `Le programme complet des équipes du ${club.short}.` },
      { property: "og:url", content: "/calendrier" },
    ],
    links: [{ rel: "canonical", href: "/calendrier" }],
  }),
  component: Calendrier,
});

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
});
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

function MatchRow({ match }: { match: Match }) {
  const d = new Date(match.date);
  return (
    <li className="grid gap-3 border-b border-border py-6 sm:grid-cols-[130px_1fr_auto] sm:items-center">
      <div>
        <p className="font-display text-xl text-navy uppercase">{dateFmt.format(d)}</p>
        <p className="text-sm text-muted-foreground">{timeFmt.format(d)}</p>
      </div>
      <div className="min-w-0">
        <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
          {match.team} · {match.competition} · {match.round}
        </p>
        <p className="mt-1 truncate font-display text-2xl uppercase">
          {match.home ? club.short : match.opponent}{" "}
          <span className="text-muted-foreground">–</span>{" "}
          {match.home ? match.opponent : club.short}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{match.venue}</p>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "rounded-[10px] px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase",
            match.home ? "bg-primary/10 text-primary" : "bg-navy/5 text-navy",
          )}
        >
          {match.home ? "Domicile" : "Extérieur"}
        </span>
        {match.home && !match.score ? (
          <Link
            to="/billetterie"
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-primary px-3 py-1 text-xs font-semibold tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Ticket size={13} aria-hidden />
            Billets
          </Link>
        ) : null}
        {match.score ? (
          <span className="font-display text-3xl text-navy">
            {match.score.vbc}–{match.score.opponent}
          </span>
        ) : null}
      </div>
    </li>
  );
}

function Calendrier() {
  const [team, setTeam] = useState("Toutes");
  const [competition, setCompetition] = useState("Toutes");

  const competitions = useMemo(
    () => ["Toutes", ...new Set(upcomingMatches.map((m) => m.competition))],
    [],
  );

  const filter = (list: Match[]) =>
    list.filter(
      (m) =>
        (team === "Toutes" || m.team === team) &&
        (competition === "Toutes" || m.competition === competition),
    );

  return (
    <>
      <PageHero
        eyebrow="Saison 2026 — 2027"
        title="Calendrier"
        intro={`Les rendez-vous des équipes fanion, à ${club.venue} comme à l'extérieur.`}
        image={images.salle}
        imageAlt={`${club.venue} avant une rencontre`}
      />

      <section className="section-y bg-background">
        <div className="container-vbc max-w-3xl">
          <div className="rounded-[10px] border border-border bg-surface p-8 lg:p-10">
            <NextMatchPanel match={nextMatch} />
          </div>
        </div>
      </section>

      <section className="section-y bg-background pt-0">
        <div className="container-vbc">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div>
              <label htmlFor="equipe" className="sr-only">
                Filtrer par équipe
              </label>
              <select
                id="equipe"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="h-11 w-full rounded-[10px] border border-border bg-background px-4 text-[15px] sm:w-52"
              >
                {["Toutes", "Senior M1", "Senior F1"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="competition" className="sr-only">
                Filtrer par compétition
              </label>
              <select
                id="competition"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="h-11 w-full rounded-[10px] border border-border bg-background px-4 text-[15px] sm:w-72"
              >
                {competitions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="mt-14 text-3xl uppercase">À venir</h2>
          <ul className="mt-6 border-t border-border">
            {filter(upcomingMatches).map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-vbc">
          <SectionHeading eyebrow="Senior M1" title="Classement" />
          <div className="mt-10">
            <StandingsTable rows={standings} />
          </div>
        </div>
      </section>
    </>
  );
}
