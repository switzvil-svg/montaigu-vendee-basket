import { useEffect, useState } from "react";

/** Countdown to an ISO date, ticking every second. */
export function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, new Date(iso).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  if (left === null) return null;
  return {
    jours: Math.floor(left / 86400000),
    heures: Math.floor((left / 3600000) % 24),
    minutes: Math.floor((left / 60000) % 60),
  };
}
