import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PartnerCard } from "@/components/partners/PartnerCard";
import { CtaButton } from "@/components/ui-kit/CtaButton";
import { PageHero } from "@/components/ui-kit/PageHero";
import { Reveal } from "@/components/ui-kit/Reveal";
import { SectionHeading } from "@/components/ui-kit/SectionHeading";
import { club, images, partners } from "@/data/club";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: `Partenaires — ${club.name} (${club.short})` },
      {
        name: "description",
        content: `Les entreprises partenaires du ${club.name} et les formules pour soutenir le basket à ${club.city}.`,
      },
      { property: "og:title", content: `Partenaires — ${club.name}` },
      {
        property: "og:description",
        content: `Associez votre entreprise au projet sportif du ${club.short}.`,
      },
      { property: "og:url", content: "/partenaires" },
    ],
    links: [{ rel: "canonical", href: "/partenaires" }],
  }),
  component: Partenaires,
});

const tiers = ["Or", "Argent", "Bronze"] as const;

function Partenaires() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Réseau économique"
        title="Partenaires"
        intro="Des entreprises du territoire accompagnent le club, du sponsoring maillot au soutien de la formation."
        image={images.supporters}
        imageAlt={`Tribunes de ${club.venue} lors d'un match du ${club.short}`}
      />

      <section className="section-y bg-background">
        <div className="container-vbc max-w-3xl">
          <SectionHeading
            eyebrow="Notre philosophie"
            title="Un partenariat de proximité"
            intro="Nous construisons des relations durables plutôt que des visibilités ponctuelles : chaque euro engagé finance directement l'encadrement diplômé et la formation des jeunes du club."
            tone="light"
          />
        </div>
      </section>

      {tiers.map((tier, i) => (
        <section key={tier} className={i % 2 === 0 ? "section-y bg-surface" : "section-y bg-background"}>
          <div className="container-vbc">
            <SectionHeading
              eyebrow={`Partenaire ${tier}`}
              title={`Nos partenaires ${tier}`}
              tone={i % 2 === 0 ? "dark" : "light"}
            />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {partners
                .filter((p) => p.tier === tier)
                .map((p, i) => (
                  <li key={p.name}>
                    <Reveal delay={i * 0.04} className="h-full">
                      <PartnerCard partner={p} />
                    </Reveal>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section-y bg-navy">
        <div className="container-vbc grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Rejoindre le club"
              title="Devenir partenaire"
              intro={`Visibilité à ${club.venue}, invitations matchs, opérations avec les licenciés : nous construisons la formule avec vous.`}
              tone="light"
            />
          </div>
          <form
            className="rounded-[10px] bg-card p-8 lg:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { id: "entreprise", label: "Entreprise", type: "text" },
                { id: "interlocuteur", label: "Interlocuteur", type: "text" },
                { id: "email-pro", label: "Email", type: "email" },
                { id: "tel-pro", label: "Téléphone", type: "tel" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="text-sm font-semibold text-navy">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    className="mt-2 h-11 w-full rounded-[10px] border border-border px-4 text-[15px]"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label htmlFor="message-pro" className="text-sm font-semibold text-navy">
                Votre projet
              </label>
              <textarea
                id="message-pro"
                rows={4}
                className="mt-2 w-full rounded-[10px] border border-border p-4 text-[15px]"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CtaButton type="submit">Envoyer ma demande</CtaButton>
              {sent ? (
                <p role="status" className="text-sm text-primary">
                  Demande envoyée. Nous revenons vers vous sous 48 h.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
