import { createFileRoute } from "@tanstack/react-router";
import { RecentResults, RecentResultsPending } from "@/components/results/RecentResults";
import { StandingsTable } from "@/components/standings/StandingsTable";
import { PageHero } from "@/components/ui-kit/PageHero";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { club, images, seniorM1Results, standings } from "@/data/club";

export const Route = createFileRoute("/resultats")({
  head: () => ({
    meta: [
      { title: `Résultats & classements — ${club.name}` },
      {
        name: "description",
        content: `Les classements des équipes du ${club.short}.`,
      },
      { property: "og:title", content: `Résultats & classements — ${club.name}` },
      {
        property: "og:description",
        content: `Le classement de chaque équipe du ${club.name}, saison par saison.`,
      },
      { property: "og:url", content: "/resultats" },
    ],
    links: [{ rel: "canonical", href: "/resultats" }],
  }),
  component: Resultats,
});

/** Section "classement à venir" pour une catégorie dont la poule n'est pas encore renseignée. */
function ClassementAVenir() {
  return (
    <p className="rounded-[10px] border border-dashed border-border bg-background p-8 text-[15px] leading-relaxed text-muted-foreground">
      Classement à venir, dès que la poule de cette catégorie sera communiquée par la ligue.
    </p>
  );
}

function Resultats() {
  return (
    <>
      <PageHero
        eyebrow="Saison 2026 — 2027"
        title="Résultats"
        intro={`Les classements de toutes les équipes du ${club.short} engagées en compétition.`}
        image={images.salle}
        imageAlt={`Le tableau d'affichage de ${club.venue}`}
      />

      <section className="section-y bg-surface">
        <div className="container-vbc">
          <SectionHeading eyebrow="Senior M1" title="[Championnat à renseigner]" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[7fr_3fr]">
            <StandingsTable rows={standings} />
            <RecentResults rows={seniorM1Results} />
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-vbc">
          <SectionHeading eyebrow="Senior F1" title="[Championnat à renseigner]" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[7fr_3fr]">
            <ClassementAVenir />
            <RecentResultsPending />
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-vbc">
          <SectionHeading eyebrow="Équipes jeunes" title="U20, U18, U15…" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[7fr_3fr]">
            <ClassementAVenir />
            <RecentResultsPending />
          </div>
        </div>
      </section>
    </>
  );
}
