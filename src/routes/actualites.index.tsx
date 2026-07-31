import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { PageHero } from "@/components/ui-kit/PageHero";
import { Reveal } from "@/components/ui-kit/Reveal";
import { articles, club, images, newsCategories } from "@/data/club";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/actualites/")({
  head: () => ({
    meta: [
      { title: `Actualités — ${club.name} (${club.short})` },
      {
        name: "description",
        content: `Comptes rendus de matchs, vie du club, École de Basket et événements du ${club.name}, ${club.department}.`,
      },
      { property: "og:title", content: `Actualités — ${club.name}` },
      {
        property: "og:description",
        content: `Toute l'actualité du ${club.short}, match après match.`,
      },
      { property: "og:url", content: "/actualites" },
    ],
    links: [{ rel: "canonical", href: "/actualites" }],
  }),
  component: Actualites,
});

const PER_PAGE = 4;
const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

function Actualites() {
  const [category, setCategory] = useState<string>("Toutes");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const featured = articles.find((a) => a.featured) ?? articles[0];

  const filtered = useMemo(
    () =>
      articles
        .filter((a) => a.slug !== featured.slug)
        .filter(
          (a) =>
            (category === "Toutes" || a.category === category) &&
            (a.title + a.excerpt).toLowerCase().includes(query.trim().toLowerCase()),
        ),
    [category, query, featured.slug],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageHero
        eyebrow="Le journal du club"
        title="Actualités"
        image={images.supporters}
        imageAlt={`Supporters du ${club.short} à ${club.venue}`}
      />

      <section className="section-y bg-background">
        <div className="container-vbc">
          <Reveal>
            <Link
              to="/actualites/$slug"
              params={{ slug: featured.slug }}
              className="group grid overflow-hidden rounded-[10px] border border-border bg-card shadow-[var(--shadow-card)] transition-shadow duration-[250ms] hover:shadow-[var(--shadow-card-hover)] lg:grid-cols-2"
            >
              <div className="aspect-16/10 overflow-hidden lg:aspect-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  width={1400}
                  height={900}
                  className="size-full object-cover transition-transform duration-[450ms] group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-14">
                <p className="eyebrow">À la une · {featured.category}</p>
                <h2 className="mt-4 text-4xl uppercase">{featured.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  {featured.author} · {fmt.format(new Date(featured.date))} · {featured.readingTime}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="mt-16 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                  aria-pressed={category === c}
                  className={cn(
                    "min-h-11 rounded-[10px] border px-5 text-[15px] font-medium transition-colors duration-[250ms]",
                    category === c
                      ? "border-navy bg-navy text-navy-foreground"
                      : "border-border bg-card text-navy hover:border-navy",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="lg:w-72">
              <label htmlFor="q" className="sr-only">
                Rechercher un article
              </label>
              <input
                id="q"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Rechercher"
                className="h-11 w-full rounded-[10px] border border-border bg-card px-4 text-[15px] placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {visible.map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={i * 0.05} className="h-full">
                  <ArticleCard article={a} />
                </Reveal>
              </li>
            ))}
          </ul>

          {pages > 1 ? (
            <nav className="mt-14 flex justify-center gap-2" aria-label="Pagination">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-current={page === n ? "page" : undefined}
                  className={cn(
                    "size-11 rounded-[10px] border text-[15px] font-medium",
                    page === n
                      ? "border-navy bg-navy text-navy-foreground"
                      : "border-border bg-card text-navy hover:border-navy",
                  )}
                >
                  {n}
                </button>
              ))}
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}
