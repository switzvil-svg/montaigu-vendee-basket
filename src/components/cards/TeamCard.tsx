import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function TeamCard({
  name,
  level,
  text,
  image,
}: {
  name: string;
  level: string;
  text: string;
  image: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-border bg-card shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={image}
          alt={`${name} — ${level}`}
          loading="lazy"
          width={1200}
          height={900}
          className="size-full object-cover transition-transform duration-[450ms] group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="eyebrow">{level}</p>
        <h3 className="mt-3 text-2xl uppercase">{name}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
        <Link
          to="/effectifs"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-navy transition-colors hover:text-primary"
        >
          Découvrir <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
