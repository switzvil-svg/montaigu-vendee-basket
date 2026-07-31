import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TeamCard } from "@/components/cards/TeamCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/ui-kit/Reveal";
import type { teams as teamsData } from "@/data/club";

/**
 * Carrousel des équipes du club : 3 cartes visibles à la fois sur desktop,
 * le reste accessible par défilement/flèches plutôt qu'une longue grille.
 */
export function TeamsCarousel({ teams }: { teams: typeof teamsData }) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="mt-14">
      <Carousel opts={{ align: "start" }} setApi={setApi}>
        <CarouselContent>
          {teams.map((t, i) => (
            <CarouselItem key={t.name} className="sm:basis-1/2 lg:basis-1/3">
              <Reveal delay={i * 0.05} className="h-full">
                <TeamCard {...t} />
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Équipe précédente"
          className="flex size-11 items-center justify-center rounded-full border border-navy text-navy transition-colors duration-[250ms] hover:bg-navy hover:text-navy-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Équipe suivante"
          className="flex size-11 items-center justify-center rounded-full border border-navy text-navy transition-colors duration-[250ms] hover:bg-navy hover:text-navy-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
