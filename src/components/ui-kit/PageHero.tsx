import crest from "@/assets/crest.png";
import { club } from "@/data/club";
import { Reveal } from "./Reveal";

/**
 * Secondary-page hero: centred crest over a soft photographic background,
 * with generous negative space (Cholet Basket treatment).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-navy">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 size-full object-cover opacity-25"
        width={1600}
        height={900}
      />
      <div className="container-vbc relative flex flex-col items-center pt-36 pb-20 text-center lg:pt-44 lg:pb-28">
        <Reveal>
          <img
            src={crest}
            alt={`Blason du ${club.name}`}
            width={112}
            height={112}
            className="mx-auto h-24 w-auto lg:h-28"
          />
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-5xl text-navy-foreground uppercase sm:text-6xl lg:text-[64px]">
            {title}
          </h1>
          {intro ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/70">
              {intro}
            </p>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}
