import { Reveal } from "./Reveal";

/** Eyebrow + title + optional single-sentence intro, used by every section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <Reveal
      className={[
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        tone === "light" ? "text-navy-foreground" : "text-foreground",
      ].join(" ")}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-4xl uppercase sm:text-5xl lg:text-[42px]">{title}</h2>
      {intro ? (
        <p
          className={[
            "mt-5 text-lg leading-relaxed",
            tone === "light" ? "text-navy-foreground/70" : "text-muted-foreground",
          ].join(" ")}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
