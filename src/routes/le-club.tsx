import { createFileRoute } from "@tanstack/react-router";
import { CtaButton } from "@/components/ui-kit/CtaButton";
import { PageHero } from "@/components/ui-kit/PageHero";
import { Reveal } from "@/components/ui-kit/Reveal";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { club, images, officials, staff, timeline, values } from "@/data/club";

export const Route = createFileRoute("/le-club")({
  head: () => ({
    meta: [
      { title: `Le Club — ${club.name} (${club.short})` },
      {
        name: "description",
        content: `Histoire, valeurs, bureau et staff du ${club.name}, club formateur de basket à ${club.city}, ${club.department}.`,
      },
      { property: "og:title", content: `Le Club — ${club.name}` },
      {
        property: "og:description",
        content: `Formation, ambition et vie de club à ${club.venue}.`,
      },
      { property: "og:url", content: "/le-club" },
    ],
    links: [{ rel: "canonical", href: "/le-club" }],
  }),
  component: LeClub,
});

function LeClub() {
  return (
    <>
      <PageHero
        eyebrow="Notre histoire"
        title="Le Club"
        intro="Un club de territoire, construit par ses bénévoles, ses formateurs et ses familles."
        image={images.salle}
        imageAlt={`${club.venue}, antre du ${club.name}`}
      />

      {/* TODO (template) : remplacer par la vraie histoire du club (année de
          création, ancrage local, éventuelle anecdote/joueur connu). */}
      <section className="section-y bg-background">
        <div className="container-vbc grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Histoire" title="À compléter" />
            <Reveal delay={0.06}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                [À rédiger] L'histoire du {club.name} : ses débuts, son ancrage à {club.city}, ses
                temps forts sportifs.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <img
              src={images.clubStory}
              alt={`Vie du ${club.name}`}
              loading="lazy"
              width={1600}
              height={1000}
              className="aspect-4/3 w-full rounded-[10px] object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-vbc">
          <SectionHeading eyebrow="Notre philosophie" title="Valeurs" />
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={i * 0.05}>
                  <div className="h-full rounded-[10px] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
                    <h3 className="text-2xl uppercase">{v.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-navy">
        <div className="container-vbc">
          <SectionHeading eyebrow="Repères" title="Chronologie" tone="light" />
          <ol className="mt-14 flex snap-x gap-6 overflow-x-auto pb-6">
            {timeline.map((t) => (
              <li
                key={t.year}
                className="w-72 shrink-0 snap-start border-t border-navy-foreground/25 pt-6"
              >
                <span className="font-display text-4xl text-primary">{t.year}</span>
                <h3 className="mt-3 text-xl text-navy-foreground uppercase">{t.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-foreground/70">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-vbc grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Dirigeants" title="Le bureau" />
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {officials.map((o) => (
                <li key={o.role} className="flex items-baseline justify-between gap-6 py-5">
                  <span className="font-display text-xl uppercase">{o.name}</span>
                  <span className="text-sm text-muted-foreground">{o.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Encadrement" title="Le staff" />
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {staff.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-6 py-5">
                  <span className="font-display text-xl uppercase">{s.name}</span>
                  <span className="text-sm text-muted-foreground">{s.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img
          src={images.teamLoisir}
          alt={`Adhérents du ${club.short} réunis sur le parquet de ${club.venue}`}
          loading="lazy"
          width={1920}
          height={800}
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-navy/80" />
        <div className="container-vbc relative flex flex-col items-center py-24 text-center">
          <Reveal>
            <p className="eyebrow text-primary">Rejoindre le club</p>
            <h2 className="mt-4 text-4xl text-navy-foreground uppercase lg:text-5xl">
              Envie de nous rejoindre ?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy-foreground/70">
              De l'École de Basket aux équipes seniors, il y a une place pour vous au {club.short}.
              Contactez-nous pour en savoir plus.
            </p>
            <CtaButton to="/contact" size="lg" className="mt-8">
              Rejoindre le club
            </CtaButton>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-vbc grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img
              src={images.salle}
              alt={club.venue}
              loading="lazy"
              width={1600}
              height={1100}
              className="aspect-4/3 w-full rounded-[10px] object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Notre salle" title={club.venue} />
            <Reveal delay={0.06}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                [À rédiger] Capacité, équipements, ambiance : présentez {club.venue} en quelques
                phrases.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-vbc">
          <SectionHeading eyebrow="Galerie" title="Vie du club" />
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              { src: images.teamEcole, alt: `Séance de l'École de Basket du ${club.short}` },
              { src: images.teamJeunes, alt: `Entraînement des jeunes du ${club.short}` },
              { src: images.teamM1, alt: `Match de l'équipe masculine du ${club.short}` },
              { src: images.teamF1, alt: `Match de l'équipe féminine du ${club.short}` },
              { src: images.teamLoisir, alt: `Section basket loisir du ${club.short}` },
              { src: images.supporters, alt: `Supporters du ${club.short}` },
            ].map((img) => (
              <li key={img.alt} className="overflow-hidden rounded-[10px]">
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
        </div>
      </section>
    </>
  );
}
