import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { LeadersGrid } from "@/components/leaders/LeadersGrid";
import { NextMatchPanel } from "@/components/next-match/NextMatchPanel";
import { PartnersMarquee } from "@/components/partners/PartnersMarquee";
import { TeamsCarousel } from "@/components/teams/TeamsCarousel";
import { CtaButton } from "@/components/ui-kit/CtaButton";
import { Reveal } from "@/components/ui-kit/Reveal";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { articles, club, images, leaderSpots, nextMatch, teams } from "@/data/club";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${club.name} — Basket à ${club.city} (${club.postalCode.slice(0, 2)})` },
      {
        name: "description",
        content: `Site officiel du ${club.short} : prochain match à ${club.venue}, effectifs, actualités et École de Basket à ${club.city}.`,
      },
      { property: "og:title", content: `${club.name} — Basket à ${club.city}` },
      {
        property: "og:description",
        content: `De l'École de Basket aux équipes seniors. Suivez le ${club.short} à ${club.venue}.`,
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const instagram = [
  { src: images.supporters, alt: `Supporters du ${club.short} dans les tribunes de ${club.venue}` },
  { src: images.teamM1, alt: "Action de jeu de l'équipe fanion masculine" },
  { src: images.teamEcole, alt: `Enfants de l'École de Basket du ${club.short}` },
  { src: images.teamF1, alt: `Match de l'équipe féminine du ${club.short}` },
  { src: images.teamJeunes, alt: "Entraînement des catégories jeunes" },
];

function Index() {
  return (
    <>
      {/* 01 — Hero: photographie à gauche, panneau Prochain Match à droite */}
      <section className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[55fr_45fr]">
        <div className="relative isolate min-h-[60vh] overflow-hidden lg:min-h-full">
          <img
            src={images.heroPlayer}
            alt={`Joueur de l'équipe fanion du ${club.name} à ${club.venue}`}
            width={1200}
            height={1600}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-navy/70 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-6 lg:p-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-navy-foreground/80 uppercase">
                {nextMatch.team}
              </p>
              <h1 className="mt-3 max-w-xl text-5xl text-navy-foreground uppercase sm:text-6xl lg:text-[64px]">
                {nextMatch.competition}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-surface px-6 py-16 lg:px-14 lg:py-24">
          <NextMatchPanel match={nextMatch} className="max-w-lg" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
          <ArrowDown size={20} className="animate-bounce text-navy-foreground/70" aria-hidden />
        </div>
      </section>

      {/* 02 — Vos Leaders */}
      <section className="section-y relative overflow-hidden bg-[oklch(0.32_0.095_151.6)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[oklch(0.32_0.095_151.6)] via-[oklch(0.32_0.095_151.6)] to-[oklch(0.15_0.05_151.6)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-32 h-[30rem] w-[30rem] rounded-full bg-primary/15 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="container-vbc relative">
          <LeadersGrid spots={leaderSpots} />
          <Reveal className="mt-12 flex justify-center">
            <CtaButton to="/effectifs" variant="onDark">
              Découvrir tout l'effectif
            </CtaButton>
          </Reveal>
        </div>
      </section>

      {/* 03 — Actualités */}
      <section className="section-y bg-surface">
        <div className="container-vbc">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Actualités" title="La vie du club" />
            <Reveal>
              <Link
                to="/actualites"
                className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-navy hover:text-primary"
              >
                Toutes les actualités <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={i * 0.06} className="h-full">
                  <ArticleCard article={a} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Le club */}
      <section className="section-y bg-background">
        <div className="container-vbc grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img
              src={images.clubStory}
              alt={`Un entraîneur du ${club.short} en discussion avec ses joueurs pendant un temps mort`}
              loading="lazy"
              width={1200}
              height={1200}
              className="aspect-4/5 w-full rounded-[10px] object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Le club" title="Un club formateur, une ambition collective." />
            <Reveal delay={0.08}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                [À rédiger] Depuis sa création, le {club.name} fait vivre le basket à {club.city},
                de l'École de Basket au niveau national.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                [À rédiger] Un mot sur la philosophie du club (formation, ambition, vie
                associative).
              </p>
              <div className="mt-8">
                <CtaButton to="/le-club" variant="secondary">
                  Découvrir notre histoire
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — Nos équipes */}
      <section className="section-y bg-surface">
        <div className="container-vbc">
          <SectionHeading eyebrow="Nos équipes" title="Nos équipes, un seul club" />
          <TeamsCarousel teams={teams} />
        </div>
      </section>

      {/* 06 — Partenaires */}
      <section className="section-y bg-background">
        <div className="container-vbc">
          <SectionHeading eyebrow="Partenaires" title="Ils soutiennent le club" align="center" />
        </div>
        <div className="mt-14">
          <PartnersMarquee />
        </div>
        <div className="container-vbc mt-12 flex justify-center">
          <CtaButton to="/partenaires" variant="secondary">
            Devenir partenaire
          </CtaButton>
        </div>
      </section>

      {/* 08 — Instagram */}
      <section className="section-y bg-surface">
        <div className="container-vbc">
          <SectionHeading eyebrow="Instagram" title="Le club au quotidien" align="center" />
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {instagram.map((img, i) => (
              <li key={i} className="overflow-hidden rounded-[10px]">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="aspect-square size-full object-cover transition-transform duration-[450ms] hover:scale-[1.02]"
                />
              </li>
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <CtaButton href="https://instagram.com" variant="secondary">
              Suivre le club
            </CtaButton>
          </div>
        </div>
      </section>

      {/* 09 — Newsletter */}
      <section className="section-y bg-background">
        <div className="container-vbc max-w-2xl text-center">
          <SectionHeading
            eyebrow="Newsletter"
            title="Ne manquez aucun match"
            intro="Le programme du week-end et les rendez-vous du club, une fois par mois dans votre boîte mail."
            align="center"
          />
          <Reveal delay={0.08} className="mt-10">
            <NewsletterForm className="mx-auto max-w-md" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
