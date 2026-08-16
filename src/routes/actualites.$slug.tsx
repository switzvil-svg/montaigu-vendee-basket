import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Reveal } from "@/components/ui-kit/Reveal";
import { articles, club, type Article } from "@/data/club";

export const Route = createFileRoute("/actualites/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article, related: articles.filter((a) => a.slug !== article.slug).slice(0, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Article introuvable — ${club.short}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — ${club.name}` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/actualites/${a.slug}` },
      ],
      links: [{ rel: "canonical", href: `/actualites/${a.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            datePublished: a.date,
            author: { "@type": "Organization", name: a.author },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

function ArticlePage() {
  const { article, related } = Route.useLoaderData() as {
    article: Article;
    related: Article[];
  };

  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy">
        <img
          src={article.image}
          alt={article.title}
          width={1400}
          height={900}
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="container-vbc relative max-w-3xl pt-36 pb-20 lg:pt-44 lg:pb-28">
          <Link
            to="/actualites"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-foreground/70 hover:text-primary"
          >
            <ArrowLeft size={16} aria-hidden /> Toutes les actualités
          </Link>
          <p className="eyebrow mt-8">{article.category}</p>
          <h1 className="mt-4 text-4xl text-navy-foreground uppercase lg:text-[56px]">
            {article.title}
          </h1>
          <p className="mt-6 text-sm text-navy-foreground/70">
            {article.author} ·{" "}
            <time dateTime={article.date}>{fmt.format(new Date(article.date))}</time> ·{" "}
            {article.readingTime} de lecture
          </p>
        </div>
      </header>

      <article className="section-y bg-background">
        <div className="container-vbc max-w-3xl">
          <p className="text-xl leading-relaxed text-navy">{article.excerpt}</p>
          {article.content.map((p) => (
            <p key={p} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </article>

      <section className="section-y bg-surface">
        <div className="container-vbc">
          <h2 className="text-3xl uppercase">À lire également</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={i * 0.05} className="h-full">
                  <ArticleCard article={a} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
