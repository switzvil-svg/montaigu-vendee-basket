import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import crest from "@/assets/crest.png";
import { club, institutions } from "@/data/club";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const columns = [
  {
    title: "Le Club",
    links: [
      { to: "/le-club", label: "Histoire & valeurs" },
      { to: "/le-club", label: "Bureau & staff" },
      { to: "/le-club", label: club.venue },
    ],
  },
  {
    title: "Navigation",
    links: [
      { to: "/actualites", label: "Actualités" },
      { to: "/resultats", label: "Résultats" },
      { to: "/calendrier", label: "Calendrier" },
      { to: "/partenaires", label: "Partenaires" },
      { to: "/billetterie", label: "Billetterie" },
    ],
  },
  {
    title: "Équipes",
    links: [
      { to: "/effectifs", label: "Senior M1" },
      { to: "/effectifs", label: "Senior F1" },
      { to: "/formation", label: "Équipes jeunes" },
      { to: "/formation", label: "École de Basket" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-vbc grid gap-12 py-16 lg:grid-cols-4 lg:py-20">
        <div>
          <img
            src={crest}
            alt={`Blason du ${club.name}`}
            width={72}
            height={72}
            className="h-16 w-auto"
            loading="lazy"
          />
          <p className="mt-6 text-sm leading-relaxed text-navy-foreground/70">
            [À rédiger] Club de basketball de {club.city}, {club.department}.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="/"
                aria-label={`${label} du ${club.name}`}
                className="grid size-11 place-items-center rounded-[10px] border border-navy-foreground/25 transition-colors hover:bg-navy-foreground hover:text-navy"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-lg uppercase">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-navy-foreground/70 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-vbc grid gap-12 border-t border-navy-foreground/15 py-14 lg:grid-cols-2">
        <div>
          <h3 className="text-lg uppercase">Contact</h3>
          <address className="mt-5 space-y-2 text-sm not-italic text-navy-foreground/70">
            <p>{club.address}</p>
            <p>
              <a href={`mailto:${club.email}`} className="hover:text-primary">
                {club.email}
              </a>
            </p>
            <p>{club.phone}</p>
          </address>
        </div>
        <div>
          <h3 className="text-lg uppercase">Newsletter</h3>
          <p className="mt-3 text-sm text-navy-foreground/70">
            Le programme des matchs et la vie du club, une fois par mois.
          </p>
          <NewsletterForm tone="light" className="mt-5" />
        </div>
      </div>

      <div className="container-vbc border-t border-navy-foreground/15 py-8">
        <p className="text-xs tracking-[0.14em] text-navy-foreground/50 uppercase">
          Partenaires institutionnels
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {institutions.map((i) => (
            <li key={i} className="text-sm text-navy-foreground/70">
              {i}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-vbc flex flex-col gap-2 border-t border-navy-foreground/15 py-6 text-xs text-navy-foreground/50 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {club.name} — Tous droits réservés.
        </p>
        <p>
          {club.venue} · {club.city} · {club.region}
        </p>
      </div>
    </footer>
  );
}
