import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/club";

const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-border bg-card shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width={1400}
          height={900}
          className="size-full object-cover transition-transform duration-[450ms] group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="flex items-center gap-3 text-xs tracking-[0.14em] text-muted-foreground uppercase">
          <span className="text-primary">{article.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.date}>{fmt.format(new Date(article.date))}</time>
        </p>
        <h3 className="mt-4 text-2xl uppercase">{article.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <Link
          to="/actualites/$slug"
          params={{ slug: article.slug }}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-navy transition-colors hover:text-primary"
        >
          Lire l'article
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
