import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin, Phone, Users } from "lucide-react";
import crest from "@/assets/crest.png";
import { CtaButton } from "@/components/ui-kit/CtaButton";
import { PageHero } from "@/components/ui-kit/PageHero";
import { Reveal } from "@/components/ui-kit/Reveal";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { club, images, nextMatch, upcomingMatches } from "@/data/club";
import { useCountdown } from "@/hooks/use-countdown";

export const Route = createFileRoute("/billetterie")({
  head: () => ({
    meta: [
      { title: `Billetterie — ${club.name}` },
      {
        name: "description",
        content: `Achetez vos places pour les matchs à domicile du ${club.name} à ${club.venue}.`,
      },
      { property: "og:title", content: `Billetterie — ${club.name}` },
      {
        property: "og:description",
        content: `Réservez vos places pour les matchs à domicile du ${club.short}.`,
      },
      { property: "og:url", content: "/billetterie" },
    ],
    links: [{ rel: "canonical", href: "/billetterie" }],
  }),
  component: Billetterie,
});

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

function Billetterie() {
  const countdown = useCountdown(nextMatch.date);
  const date = new Date(nextMatch.date);
  const otherHomeMatches = upcomingMatches.filter((m) => m.home && m.id !== nextMatch.id);

  return (
    <>
      <PageHero
        eyebrow="Billets & abonnements"
        title="Billetterie"
        intro={`Les places pour les matchs à domicile du ${club.short} se réservent en ligne, sur notre billetterie partenaire.`}
        image={images.salle}
        imageAlt={`Public de ${club.venue} pendant un match`}
      />

      {/* Prochain match — panneau vedette */}
      <section className="section-y bg-background">
        <div className="container-vbc max-w-3xl">
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-navy p-8 text-center shadow-[var(--shadow-card)] sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/25 blur-[100px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-primary/15 blur-[120px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
            />

            <div className="relative">
              <p className="eyebrow text-navy-foreground/60">Prochain match à domicile</p>
              <h2 className="mt-3 text-3xl text-navy-foreground uppercase sm:text-4xl">
                {nextMatch.competition}
              </h2>
              <p className="mt-1 text-sm text-navy-foreground/60">{nextMatch.round}</p>

              <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={crest}
                    alt={`Blason du ${club.short}`}
                    width={80}
                    height={80}
                    className="h-16 w-auto sm:h-20"
                  />
                  <span className="font-display text-lg text-navy-foreground uppercase sm:text-xl">
                    {club.short}
                  </span>
                </div>
                <span className="font-display text-xl text-navy-foreground/40 sm:text-2xl">VS</span>
                <div className="flex flex-col items-center gap-3">
                  {nextMatch.opponentLogo ? (
                    <img
                      src={nextMatch.opponentLogo}
                      alt=""
                      width={80}
                      height={80}
                      className="size-16 rounded-full border border-navy-foreground/20 bg-navy-foreground/5 object-contain p-1.5 sm:size-20"
                    />
                  ) : (
                    <span className="grid size-16 place-items-center rounded-full border border-navy-foreground/20 font-display text-lg text-navy-foreground sm:size-20">
                      {nextMatch.opponentShort}
                    </span>
                  )}
                  <span className="font-display text-lg text-navy-foreground uppercase sm:text-xl">
                    {nextMatch.opponent}
                  </span>
                </div>
              </div>

              <p className="mt-8 text-lg font-semibold text-navy-foreground">
                {dateFmt.format(date)} · {timeFmt.format(date)}
              </p>
              <p className="mt-1 flex items-center justify-center gap-2 text-sm text-navy-foreground/60">
                <MapPin size={16} className="text-primary" aria-hidden /> {nextMatch.venue}
              </p>

              <dl
                className="mt-8 grid grid-cols-3 gap-3 border-y border-navy-foreground/15 py-6"
                aria-live="polite"
                aria-label="Compte à rebours avant le coup d'envoi"
              >
                {(["jours", "heures", "minutes"] as const).map((unit) => (
                  <div key={unit} className="text-center">
                    <dt className="sr-only">{unit}</dt>
                    <dd>
                      <span className="block font-display text-4xl text-navy-foreground tabular-nums sm:text-5xl">
                        {countdown ? String(countdown[unit]).padStart(2, "0") : "--"}
                      </span>
                      <span className="mt-1 block text-[11px] tracking-[0.16em] text-navy-foreground/50 uppercase">
                        {unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <CtaButton
                  href={club.ticketingUrl}
                  variant="onDark"
                  size="lg"
                  className="btn-shine w-full sm:w-auto"
                >
                  Acheter mes billets
                  <ExternalLink size={16} aria-hidden />
                </CtaButton>
              </div>
              <p className="mt-4 text-xs text-navy-foreground/50">
                Vous serez redirigé vers notre site de billetterie partenaire, dans un nouvel
                onglet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tous les prochains matchs à domicile */}
      {otherHomeMatches.length ? (
        <section className="section-y bg-surface">
          <div className="container-vbc">
            <SectionHeading eyebrow="Calendrier" title="Les autres matchs à domicile" />
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherHomeMatches.map((m, i) => {
                const d = new Date(m.date);
                return (
                  <li key={m.id}>
                    <Reveal delay={i * 0.05} className="h-full">
                      <div className="flex h-full flex-col rounded-[10px] border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                        <p className="eyebrow">{m.competition}</p>
                        <h3 className="mt-3 text-xl text-navy uppercase">
                          {club.short} – {m.opponent}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {dateFmt.format(d)} · {timeFmt.format(d)}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} className="shrink-0 text-primary" aria-hidden />
                          {m.venue}
                        </p>
                        <div className="mt-6 pt-1">
                          <CtaButton
                            href={club.ticketingUrl}
                            variant="secondary"
                            className="w-full"
                          >
                            Réserver
                            <ExternalLink size={14} aria-hidden />
                          </CtaButton>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Infos pratiques */}
      <section className="section-y bg-background">
        <div className="container-vbc grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Infos pratiques" title={`Se rendre à ${club.venue}`} />
            <ul className="mt-8 space-y-4 text-[15px]">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-primary" aria-hidden />
                <span>{club.address}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-primary" aria-hidden />
                <a href={`mailto:${club.email}`} className="hover:text-primary">
                  {club.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-primary" aria-hidden />
                <span>{club.phone}</span>
              </li>
            </ul>
            <div className="mt-8">
              <CtaButton
                href={`https://www.google.com/maps/search/${encodeURIComponent(club.address)}`}
                variant="secondary"
              >
                Ouvrir dans Google Maps
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="overflow-hidden rounded-[10px] border border-border">
            {/* TODO (template) : le bbox OpenStreetMap est fixe et pointe sur Villeneuve-sur-Lot — à recalculer pour la ville du nouveau club (openstreetmap.org/export). */}
            <iframe
              title={`Carte de ${club.venue} à ${club.city}`}
              src="https://www.openstreetmap.org/export/embed.html?bbox=0.68%2C44.39%2C0.73%2C44.42&layer=mapnik"
              className="h-80 w-full lg:h-full lg:min-h-96"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* Groupes & scolaires */}
      <section className="section-y bg-surface">
        <div className="container-vbc max-w-2xl text-center">
          <SectionHeading
            eyebrow="Groupes & scolaires"
            title="Vous venez en groupe ?"
            intro={`Comités d'entreprise, écoles, associations : contactez le club pour organiser votre venue à ${club.venue}.`}
            align="center"
          />
          <Reveal delay={0.08} className="mt-8 flex justify-center">
            <CtaButton href={`mailto:${club.email}`} variant="secondary">
              <Users size={16} aria-hidden />
              Nous contacter
            </CtaButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
