import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";
import crest from "@/assets/crest.png";
import playerPlaceholder from "@/assets/player-placeholder.jpg";
import type { Player } from "@/data/club";
import { cn } from "@/lib/utils";

/**
 * Trading-card-style roster tile: mouse-tracked 3D tilt, a giant translucent
 * number watermark, an ambient club-orange glow behind the cutout, and a
 * light sweep on hover. The cutout photo is a sibling of the clipped inner
 * layer so it can overflow past the card's top edge without the glow/sweep
 * bleeding outside the rounded corners.
 */
export function PlayerCard({ player }: { player: Player }) {
  const hasRealPhoto = player.photo !== playerPlaceholder;
  const isCoach = player.position === "Coach";

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [9, -9]), {
    stiffness: 300,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-9, 9]), {
    stiffness: 300,
    damping: 24,
  });

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
    <Link
      to="/effectifs/$slug"
      params={{ slug: player.slug }}
      className="group block [perspective:1400px]"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="relative h-80 shadow-[var(--shadow-card)] transition-shadow duration-300 group-hover:shadow-[0_24px_60px_-12px_oklch(0.24_0.085_151.6_/_0.5)]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-navy">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/25"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-14 h-56 w-56 rounded-full bg-primary/25 blur-[70px] transition-all duration-500 ease-out group-hover:bg-primary/45"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute top-[38%] right-[8%] h-44 w-44 -translate-y-1/2 rounded-full border border-navy-foreground/[0.08] transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-primary/40"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:16px_16px]"
          />

          {player.number != null ? (
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 -right-3 font-display text-[9rem] leading-none text-navy-foreground/[0.07] uppercase select-none"
            >
              {player.number}
            </span>
          ) : null}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy via-navy/70 to-transparent"
          />

          <div className="relative flex h-full max-w-[58%] flex-col justify-end gap-1 p-5">
            {player.number != null ? (
              <span className="font-display text-3xl text-primary">{player.number}</span>
            ) : isCoach ? (
              <span className="font-display text-3xl text-primary uppercase">Coach</span>
            ) : null}
            <h3 className="font-display text-2xl leading-[0.95] text-navy-foreground uppercase">
              {player.firstName} {player.lastName}
            </h3>
            {player.position && !isCoach ? (
              <p className="text-[11px] font-semibold tracking-[0.16em] text-navy-foreground/60 uppercase">
                {player.position}
              </p>
            ) : null}
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-foreground/70 transition-colors group-hover:text-primary">
              Voir le profil
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </div>
        </div>

        {hasRealPhoto ? (
          <div className="pointer-events-none absolute right-0 bottom-0 h-[118%]">
            <img
              src={player.cardPhoto ?? player.photo}
              alt=""
              loading="lazy"
              className={cn(
                "h-full w-auto object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-translate-y-1",
                player.cardPhoto && "drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]",
              )}
            />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex w-[42%] items-center justify-center">
            <img src={crest} alt="" loading="lazy" className="h-20 w-auto opacity-20 grayscale" />
          </div>
        )}
      </motion.div>
    </Link>
  );
}
