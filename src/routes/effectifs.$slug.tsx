import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Camera, ChevronDown, Instagram, Play } from "lucide-react";
import { useState } from "react";
import { SponsorsSection } from "@/components/partners/SponsorsSection";
import { Reveal } from "@/components/ui-kit/Reveal";
import { club, players, type Player } from "@/data/club";
import { cn } from "@/lib/utils";

/** Slight alternating tilt so the gallery reads like a stack of instant prints. */
const GALLERY_ROTATIONS = ["-rotate-2", "rotate-2", "-rotate-1"];

export const Route = createFileRoute("/effectifs/$slug")({
  loader: ({ params }) => {
    const player = players.find((p) => p.slug === params.slug);
    if (!player) throw notFound();
    return { player };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Joueur introuvable — ${club.short}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.player;
    const title = `${p.firstName} ${p.lastName} — ${p.team} · ${club.name}`;
    const role = p.position ?? "joueur";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `${p.firstName} ${p.lastName}, ${role} du ${club.name} (${p.team}) : profil, statistiques et parcours.`,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: p.caption ?? `${p.firstName} ${p.lastName}, ${p.team}.`,
        },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/effectifs/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/effectifs/${p.slug}` }],
    };
  },
  component: PlayerProfile,
});

function PlayerProfile() {
  const { player: p } = Route.useLoaderData() as { player: Player };

  const facts: [string, string][] = [
    p.number != null ? ["Numéro", `#${p.number}`] : null,
    p.position ? ["Poste", p.position] : null,
    p.height ? ["Taille", p.height] : null,
    p.age != null ? ["Âge", `${p.age} ans`] : null,
  ].filter((f): f is [string, string] => f !== null);

  const statRows: [string, string | number][] = [
    p.stats?.rebonds != null ? ["Rebonds", p.stats.rebonds] : null,
    p.stats?.passes != null ? ["Passes", p.stats.passes] : null,
    p.stats?.adresse ? ["Adresse", p.stats.adresse] : null,
  ].filter((f): f is [string, string | number] => f !== null);

  const hasDetails = Boolean(p.bio?.length || p.quote || p.career?.length || p.matchLog?.length);

  const recentFirstLog = p.matchLog ? [...p.matchLog].reverse() : [];
  const MATCH_PREVIEW_COUNT = 5;
  const [showAllMatches, setShowAllMatches] = useState(false);
  const visibleLog = showAllMatches ? recentFirstLog : recentFirstLog.slice(0, MATCH_PREVIEW_COUNT);

  const career = p.career ?? [];
  const CAREER_PREVIEW_COUNT = 5;
  const [showAllCareer, setShowAllCareer] = useState(false);
  const visibleCareer = showAllCareer ? career : career.slice(0, CAREER_PREVIEW_COUNT);

  return (
    <>
      <header className="bg-navy pt-28 pb-0 lg:pt-32">
        <div
          className={cn(
            "container-vbc grid items-end gap-10",
            p.video ? "lg:grid-cols-[1fr_680px]" : "lg:grid-cols-[1fr_420px]",
          )}
        >
          <div className="pb-14">
            <Link
              to="/effectifs"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-foreground/70 hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden /> Retour aux effectifs
            </Link>
            <p className="eyebrow mt-8">{p.team}</p>
            <h1 className="mt-4 text-5xl text-navy-foreground uppercase lg:text-[64px]">
              {p.firstName} {p.lastName}
            </h1>
            {p.stats?.points != null ? (
              <div className="mt-8 flex items-baseline gap-4">
                <span className="font-display text-7xl leading-none text-primary lg:text-8xl">
                  {p.stats.points}
                </span>
                <span className="text-xs leading-tight font-semibold tracking-[0.14em] text-navy-foreground/60 uppercase">
                  Pts/Matchs
                </span>
              </div>
            ) : null}
            {facts.length ? (
              <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] tracking-[0.16em] text-navy-foreground/50 uppercase">
                      {k}
                    </dt>
                    <dd className="mt-2 font-display text-2xl text-navy-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
          {p.video ? (
            <div
              className={cn(
                "grid min-w-0 gap-3",
                p.credit ? "grid-cols-[1fr_1fr_auto]" : "grid-cols-2",
              )}
            >
              <div className="min-w-0">
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-navy-foreground/50 uppercase">
                  <Camera size={12} aria-hidden /> Photo
                </p>
                <img
                  src={p.photo}
                  alt={`${p.firstName} ${p.lastName}${p.position ? `, ${p.position}` : ""} du ${club.short}`}
                  width={900}
                  height={1200}
                  className="aspect-3/4 w-full min-w-0 rounded-t-[10px] object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-navy-foreground/50 uppercase">
                  <Play size={12} aria-hidden /> Vidéo
                </p>
                <video
                  src={p.video}
                  controls
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="aspect-3/4 w-full min-w-0 rounded-t-[10px] bg-black object-cover"
                >
                  <track kind="captions" />
                </video>
              </div>
              {p.credit ? (
                <div className="flex w-6 shrink-0 flex-col items-center justify-end pb-2">
                  <a
                    href={p.credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={p.credit.handle}
                    aria-label={`Photographe et vidéaste : ${p.credit.handle} sur Instagram`}
                    className="flex flex-col items-center gap-1.5 text-navy-foreground/50 transition-colors hover:text-primary"
                  >
                    <Instagram size={15} aria-hidden />
                    <span className="[writing-mode:vertical-rl] text-[9px] font-semibold tracking-wide uppercase">
                      {p.credit.handle}
                    </span>
                  </a>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="relative min-w-0">
              <img
                src={p.photo}
                alt={`${p.firstName} ${p.lastName}${p.position ? `, ${p.position}` : ""} du ${club.short}`}
                width={900}
                height={1200}
                className="aspect-3/4 w-full rounded-t-[10px] object-cover"
              />
              {p.credit ? (
                <a
                  href={p.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-primary"
                >
                  <Instagram size={12} aria-hidden /> {p.credit.handle}
                </a>
              ) : null}
            </div>
          )}
        </div>
      </header>

      <section className="section-y bg-background">
        <div className="container-vbc grid min-w-0 gap-16 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            {hasDetails ? (
              <div className="space-y-16">
                {p.bio?.length ? (
                  <Reveal>
                    <h2 className="text-3xl uppercase">Biographie</h2>
                    {p.bio.map((para) => (
                      <p key={para} className="mt-5 text-lg leading-relaxed text-muted-foreground">
                        {para}
                      </p>
                    ))}
                  </Reveal>
                ) : null}

                {p.quote ? (
                  <Reveal delay={0.06}>
                    <blockquote className="border-l-2 border-primary pl-6">
                      <p className="font-display text-3xl text-navy uppercase">« {p.quote} »</p>
                    </blockquote>
                  </Reveal>
                ) : null}

                {career.length ? (
                  <Reveal delay={0.1}>
                    <h2 className="text-3xl uppercase">Parcours</h2>
                    <ul className="mt-6 divide-y divide-border border-y border-border">
                      {visibleCareer.map((c) => (
                        <li key={c.season} className="py-5">
                          <div className="flex flex-wrap justify-between gap-4">
                            <span className="text-sm text-muted-foreground">{c.season}</span>
                            <span className="font-display text-xl uppercase">{c.club}</span>
                          </div>
                          {c.moyenne != null ? (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {c.matchs} matchs · {c.points} points · {c.moyenne} pts/match
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                    {!showAllCareer && career.length > CAREER_PREVIEW_COUNT ? (
                      <button
                        type="button"
                        onClick={() => setShowAllCareer(true)}
                        className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-navy hover:text-primary"
                      >
                        Charger les {career.length - CAREER_PREVIEW_COUNT} saisons précédentes
                        <ChevronDown size={16} aria-hidden />
                      </button>
                    ) : null}
                  </Reveal>
                ) : null}

                {p.matchLog?.length ? (
                  <Reveal delay={0.14}>
                    <h2 className="text-3xl uppercase">
                      Match par match — {p.career?.[0]?.season}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {showAllMatches
                        ? `${recentFirstLog.length} matchs`
                        : `${MATCH_PREVIEW_COUNT} derniers matchs`}
                    </p>
                    <ul className="mt-6 divide-y divide-border border-y border-border">
                      {visibleLog.map((m) => (
                        <li
                          key={m.matchday}
                          className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <span className="w-8 shrink-0 text-sm text-muted-foreground">
                              J{m.matchday}
                            </span>
                            <span className="truncate font-display text-lg uppercase">
                              {m.opponent}
                            </span>
                          </div>
                          <div className="flex shrink-0 items-center gap-4 pl-12 sm:pl-0">
                            <span
                              className={cn(
                                "rounded-[10px] px-2.5 py-1 text-xs font-semibold tracking-[0.1em] uppercase",
                                m.home ? "bg-primary/10 text-primary" : "bg-navy/5 text-navy",
                              )}
                            >
                              {m.home ? "Domicile" : "Extérieur"}
                            </span>
                            <span className="w-14 text-sm text-muted-foreground">{m.score}</span>
                            <span className="w-8 text-right font-display text-xl text-navy">
                              {m.points}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {!showAllMatches && recentFirstLog.length > MATCH_PREVIEW_COUNT ? (
                      <button
                        type="button"
                        onClick={() => setShowAllMatches(true)}
                        className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-navy hover:text-primary"
                      >
                        Charger les {recentFirstLog.length - MATCH_PREVIEW_COUNT} matchs précédents
                        <ChevronDown size={16} aria-hidden />
                      </button>
                    ) : null}
                  </Reveal>
                ) : null}
              </div>
            ) : (
              <Reveal>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  La fiche complète de {p.firstName} {p.lastName} arrive prochainement.
                </p>
              </Reveal>
            )}
          </div>

          <aside className="min-w-0 space-y-10">
            {statRows.length ? (
              <div className="rounded-[10px] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
                <p className="eyebrow">Statistiques · saison</p>
                <dl className="mt-6 space-y-5">
                  {statRows.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className="font-display text-3xl text-navy">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            {p.gallery?.length ? (
              <ul className="space-y-10">
                {p.gallery.map((src, i) => (
                  <li key={src} className="flex justify-center">
                    <Reveal delay={i * 0.06}>
                      <div
                        className={cn(
                          "w-full max-w-64 bg-white p-3 pb-8 shadow-[var(--shadow-card-hover)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]",
                          GALLERY_ROTATIONS[i % GALLERY_ROTATIONS.length],
                        )}
                      >
                        <img
                          src={src}
                          alt={`${p.firstName} ${p.lastName} en action avec le ${club.short}`}
                          loading="lazy"
                          width={600}
                          height={600}
                          className="aspect-square w-full object-cover"
                        />
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>
      </section>

      <SponsorsSection />
    </>
  );
}
