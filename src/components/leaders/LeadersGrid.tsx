import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { Reveal } from "@/components/ui-kit/Reveal";
import { club, type LeaderSpot } from "@/data/club";
import { cn } from "@/lib/utils";

/**
 * Un emplacement "leader" : cadre blanc avec tilt 3D au survol (même langage
 * que la carte joueur du roster), posé sur le fond vert habillé (halos,
 * texture) de la section. `featured` (le MVP) grossit le cadre et ajoute
 * un badge.
 */
function LeaderSpotCard({
  spot,
  featured,
  delay,
}: {
  spot: LeaderSpot;
  featured?: boolean;
  delay: number;
}) {
  const { player } = spot;
  const hasCutout = Boolean(player.cardPhoto);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), { stiffness: 300, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), { stiffness: 300, damping: 24 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }
  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to="/effectifs/$slug"
        params={{ slug: player.slug }}
        className="group flex h-full flex-col items-center text-center [perspective:1400px]"
      >
        <div className="flex w-full justify-center">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="relative inline-block overflow-hidden rounded-[20px] bg-white px-3 pt-3 shadow-[0_25px_55px_-8px_rgba(0,0,0,0.5)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 -translate-x-[130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-primary/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
            />
            <img
              src={player.cardPhoto ?? player.photo}
              alt=""
              loading="lazy"
              className={cn(
                "relative block h-[19rem] w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-105 xl:h-[23rem]",
                featured && "xl:h-[26rem]",
                !hasCutout && "leader-photo-mask",
              )}
            />
          </motion.div>
        </div>

        <div className="mt-6 w-full px-2">
          <p
            className={cn(
              "font-display uppercase",
              featured ? "text-4xl text-primary xl:text-5xl" : "text-3xl text-primary xl:text-4xl",
            )}
          >
            {spot.category}
          </p>
          <p className="mt-1 text-xs tracking-[0.14em] text-navy-foreground/50 uppercase">
            {spot.sublabel}
          </p>
          <p
            className={cn(
              "mt-4 font-display text-navy-foreground uppercase",
              featured ? "text-2xl" : "text-xl",
            )}
          >
            {player.firstName} {player.lastName}
          </p>
          {player.position ? (
            <p className="text-sm text-navy-foreground/50 uppercase">{player.position}</p>
          ) : null}
          <p className="mt-4 flex items-baseline justify-center gap-2 font-display leading-none text-navy-foreground">
            <span className="text-8xl">{spot.value}</span>
            <span className="text-base font-sans text-navy-foreground/50 uppercase tracking-[0.1em]">
              Pts
            </span>
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

/** Bloc "Vos leaders" façon Cholet Basket : titre en filigrane + un meneur par catégorie. */
export function LeadersGrid({ spots }: { spots: LeaderSpot[] }) {
  if (!spots.length) return null;

  const [first, ...rest] = spots;

  return (
    <div className="relative">
      <div className="relative">
        <p
          aria-hidden
          className="pointer-events-none absolute -top-8 left-1/2 -z-10 w-full -translate-x-1/2 -rotate-2 text-center font-display text-7xl text-navy-foreground/10 uppercase select-none sm:text-8xl lg:text-9xl"
        >
          {club.name}
        </p>
        <h2 className="text-center font-display text-navy-foreground text-6xl uppercase sm:text-7xl">
          Vos leaders !
        </h2>
      </div>

      <ul
        className={cn(
          "mt-20 grid gap-x-10 gap-y-20 sm:grid-cols-2 xl:gap-x-12",
          rest.length ? "xl:grid-cols-[1.3fr_1fr_1fr_1fr]" : "xl:grid-cols-1",
        )}
      >
        <li>
          <LeaderSpotCard spot={first} featured delay={0} />
        </li>
        {rest.map((spot, i) => (
          <li key={spot.category}>
            <LeaderSpotCard spot={spot} delay={0.06 * (i + 1)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
