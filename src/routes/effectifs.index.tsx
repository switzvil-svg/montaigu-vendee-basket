import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PlayerCard } from "@/components/cards/PlayerCard";
import { PageHero } from "@/components/ui-kit/PageHero";
import { club, images, players, positions, premiereCategories } from "@/data/club";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/effectifs/")({
  head: () => ({
    meta: [
      { title: `Équipe première — ${club.name} (${club.short})` },
      {
        name: "description",
        content: `L'équipe première du ${club.short} à ${club.city}.`,
      },
      { property: "og:title", content: `Équipe première — ${club.name}` },
      {
        property: "og:description",
        content: `Les joueurs et joueuses de l'équipe première du ${club.short}.`,
      },
      { property: "og:url", content: "/effectifs" },
    ],
    links: [{ rel: "canonical", href: "/effectifs" }],
  }),
  component: Effectifs,
});

function Effectifs() {
  const [category, setCategory] = useState<string>("Senior M1");
  const [position, setPosition] = useState<string>("Tous");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      players.filter(
        (p) =>
          p.team === category &&
          (position === "Tous" || p.position === position) &&
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [category, position, query],
  );

  return (
    <>
      <PageHero
        eyebrow="Saison 2026 — 2027"
        title="Équipe première"
        intro="Senior M1 et Senior F1 : les deux groupes qui portent les couleurs du club en compétition."
        image={images.teamM1}
        imageAlt={`Joueurs du ${club.name} en match`}
      />

      <section className="section-y bg-background">
        <div className="container-vbc">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Catégorie d'équipe">
            {premiereCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "min-h-11 rounded-[10px] border px-5 text-[15px] font-medium transition-colors duration-[250ms]",
                  category === c
                    ? "border-navy bg-navy text-navy-foreground"
                    : "border-border bg-background text-navy hover:border-navy",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="poste" className="sr-only">
                Filtrer par poste
              </label>
              <select
                id="poste"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="h-11 w-full rounded-[10px] border border-border bg-background px-4 text-[15px] sm:w-56"
              >
                {["Tous", ...positions].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="recherche" className="sr-only">
                Rechercher un joueur
              </label>
              <input
                id="recherche"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un joueur"
                className="h-11 w-full rounded-[10px] border border-border bg-background px-4 text-[15px] placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {filtered.length ? (
            <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <PlayerCard player={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-16 text-lg text-muted-foreground">
              Aucun joueur ne correspond à cette recherche pour le moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
