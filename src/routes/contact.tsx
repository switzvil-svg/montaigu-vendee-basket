import { createFileRoute } from "@tanstack/react-router";
import { Check, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useState } from "react";
import { CtaButton } from "@/components/ui-kit/CtaButton";
import { PageHero } from "@/components/ui-kit/PageHero";
import { club, images } from "@/data/club";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${club.name}, ${club.venue}` },
      {
        name: "description",
        content: `Contacter le ${club.name} : ${club.venue}, horaires d'entraînement, inscriptions à l'École de Basket et coordonnées.`,
      },
      { property: "og:title", content: `Contact — ${club.name}` },
      { property: "og:description", content: "Nous écrire, nous trouver, nous rejoindre." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const trainings = [
  ["Senior M1", "Mardi & jeudi · 20h00 — 22h00"],
  ["Senior F1", "Lundi & mercredi · 20h00 — 22h00"],
  ["U15 à U20", "Mardi & vendredi · 18h00 — 20h00"],
  ["École de Basket", "Mercredi · 14h00 — 16h00"],
];

function Contact() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  return (
    <>
      <PageHero
        eyebrow="Nous écrire"
        title="Contact"
        intro="Une question sur une inscription, un partenariat ou un match ? Le club vous répond."
        image={images.salle}
        imageAlt={`${club.venue}, ${club.city}`}
      />

      <section className="section-y bg-background">
        <div className="container-vbc grid gap-16 lg:grid-cols-2 lg:gap-24">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setState("loading");
              setTimeout(() => setState("done"), 700);
            }}
          >
            <h2 className="text-3xl uppercase">Formulaire</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { id: "nom", label: "Nom", type: "text" },
                { id: "prenom", label: "Prénom", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "telephone", label: "Téléphone", type: "tel" },
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
              <label htmlFor="sujet" className="text-sm font-semibold text-navy">
                Sujet
              </label>
              <select
                id="sujet"
                className="mt-2 h-11 w-full rounded-[10px] border border-border px-4 text-[15px]"
              >
                <option>Inscription / licence</option>
                <option>École de Basket</option>
                <option>Billetterie</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="text-sm font-semibold text-navy">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="mt-2 w-full rounded-[10px] border border-border p-4 text-[15px]"
              />
            </div>

            <div className="mt-5 flex items-start gap-3">
              <input
                id="rgpd"
                type="checkbox"
                required
                className="mt-1 size-5 rounded-[4px] border-border accent-[var(--primary)]"
              />
              <label htmlFor="rgpd" className="text-sm leading-relaxed text-muted-foreground">
                J'accepte que mes données soient utilisées pour traiter ma demande, conformément au
                RGPD.
              </label>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButton type="submit" disabled={state === "loading"}>
                {state === "loading" ? "Envoi en cours…" : "Envoyer"}
              </CtaButton>
              {state === "done" ? (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  <Check size={16} aria-hidden /> Message envoyé, merci.
                </p>
              ) : null}
            </div>
          </form>

          <div>
            <h2 className="text-3xl uppercase">Le club</h2>
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

            <div className="mt-8 overflow-hidden rounded-[10px] border border-border">
              {/* TODO (template) : le bbox OpenStreetMap est fixe et pointe sur Villeneuve-sur-Lot — à recalculer pour la ville du nouveau club (openstreetmap.org/export). */}
              <iframe
                title={`Carte de ${club.venue} à ${club.city}`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=0.68%2C44.39%2C0.73%2C44.42&layer=mapnik"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <CtaButton
                href={`https://www.google.com/maps/search/${encodeURIComponent(club.address)}`}
                variant="secondary"
              >
                Ouvrir dans Google Maps
              </CtaButton>
            </div>

            <h3 className="mt-12 text-2xl uppercase">Horaires d'entraînement</h3>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {trainings.map(([team, slot]) => (
                <li key={team} className="flex flex-wrap justify-between gap-4 py-4">
                  <span className="font-semibold text-navy">{team}</span>
                  <span className="text-sm text-muted-foreground">{slot}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-2xl uppercase">Nous suivre</h3>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} du ${club.short}`}
                  className="grid size-11 place-items-center rounded-[10px] border border-border text-navy transition-colors hover:border-navy"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <p className="mt-10 text-sm text-muted-foreground">
              Urgence les jours de match : 06 00 00 00 00 (responsable salle).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
