import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import crest from "@/assets/crest.png";
import { CtaButton } from "@/components/ui-kit/CtaButton";
import { club } from "@/data/club";

type NavItem = { to: string; label: string; children?: { to: string; label: string }[] };

const nav: NavItem[] = [
  { to: "/", label: "Accueil" },
  { to: "/le-club", label: "Le Club" },
  {
    to: "/effectifs",
    label: "Effectifs",
    children: [
      { to: "/effectifs", label: "Équipe première" },
      { to: "/formation", label: "Formation" },
    ],
  },
  { to: "/calendrier", label: "Calendrier" },
  { to: "/resultats", label: "Résultats" },
  { to: "/partenaires", label: "Partenaires" },
  { to: "/contact", label: "Contact" },
];

// Version à plat pour le tiroir mobile : les sous-items remplacent leur parent.
const navMobile = nav.slice(1).flatMap((item) => item.children ?? [item]);

/** Fixed header, blanc en permanence. */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card">
      <div className="container-vbc grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3"
          aria-label={`${club.name} — accueil`}
        >
          <img src={crest} alt="" width={44} height={44} className="h-11 w-auto shrink-0" />
          <span className="hidden truncate font-display text-xl leading-none text-navy uppercase sm:block">
            {club.name}
          </span>
        </Link>

        <nav className="hidden justify-center gap-7 lg:flex" aria-label="Navigation principale">
          {nav.slice(1).map((item) =>
            item.children ? (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="link-underline flex items-center gap-1 text-[15px] font-semibold text-navy transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                  <ChevronDown size={14} aria-hidden />
                </Link>
                <div className="invisible absolute top-full left-1/2 z-10 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-52 rounded-[10px] border border-border bg-card p-2 shadow-[var(--shadow-card-hover)]">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          className="block rounded-[8px] px-4 py-2.5 text-[15px] font-semibold text-navy transition-colors hover:bg-surface hover:text-primary"
                          activeProps={{ className: "text-primary" }}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="link-underline text-[15px] font-semibold text-navy transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <CtaButton to="/billetterie" className="hidden sm:inline-flex">
            Billetterie
          </CtaButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid size-11 place-items-center rounded-[10px] text-navy lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-border bg-card lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="container-vbc py-4">
            {[{ to: "/", label: "Accueil" }, ...navMobile].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center border-b border-border/70 py-3 text-base font-semibold text-navy"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-vbc pb-6">
            <CtaButton to="/billetterie" className="w-full">
              Billetterie
            </CtaButton>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
