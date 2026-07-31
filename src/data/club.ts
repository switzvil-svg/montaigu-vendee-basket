/**
 * Single source of editorial + sporting data for the club site.
 * Kept in one typed module so pages stay presentational and Cloud/Supabase can
 * later replace these arrays without touching components.
 *
 * TEMPLATE : ce fichier est volontairement vide de tout contenu inventé.
 * Voir TEMPLATE.md à la racine du repo pour la checklist complète. Ne jamais
 * fabriquer un nom, un score ou une stat pour une vraie personne/équipe —
 * laisser un tableau vide ou un commentaire TODO tant que l'info n'est pas
 * fournie par le club.
 */
import photoPlaceholder from "@/assets/photo-placeholder.jpg";
import flavienForre from "@/assets/players/flavien-forre.jpg";
import issaFofana from "@/assets/players/issa-fofana.jpg";
import jonasMarieFrancoise from "@/assets/players/jonas-marie-francoise.jpg";
import julienLeclerc from "@/assets/players/julien-leclerc.jpg";
import juniorTshunza from "@/assets/players/junior-tshunza.jpg";
import justinJouet from "@/assets/players/justin-jouet.jpg";
import robinLeSter from "@/assets/players/robin-le-ster.jpg";
import romainBrachet from "@/assets/players/romain-brachet.jpg";
import theoPallard from "@/assets/players/theo-pallard.jpg";
import valentinJolbit from "@/assets/players/valentin-jolbit.jpg";

export const images = {
  heroPlayer: photoPlaceholder,
  clubStory: photoPlaceholder,
  salle: photoPlaceholder,
  supporters: photoPlaceholder,
  teamM1: photoPlaceholder,
  teamF1: photoPlaceholder,
  teamJeunes: photoPlaceholder,
  teamEcole: photoPlaceholder,
  teamLoisir: photoPlaceholder,
};

/**
 * Identité du club — LE fichier à modifier pour adapter ce site à un autre
 * club (nom, ville, salle, coordonnées, région). Utilisé par __root.tsx
 * (meta, JSON-LD) et par tous les composants/pages au lieu de texte en dur.
 */
export const club = {
  name: "Montaigu Vendée Basket",
  short: "MVB",
  city: "Montaigu-Vendée",
  // TODO : nom réel de la salle du club.
  venue: "[Salle à renseigner]",
  // TODO : adresse réelle (rue + numéro).
  streetAddress: "[Adresse à renseigner]",
  // TODO : code postal réel.
  postalCode: "85600",
  region: "Pays de la Loire",
  department: "Vendée",
  country: "FR",
  // TODO : adresse complète réelle, utilisée sur la page Contact/Billetterie.
  address: "[Adresse complète à renseigner], 85600 Montaigu-Vendée",
  // TODO : email de contact réel du club.
  email: "contact@exemple.fr",
  // TODO : téléphone réel du club.
  phone: "[Téléphone à renseigner]",
  // TODO: remplacer par l'URL du site de billetterie externe du club (si applicable).
  ticketingUrl: "https://www.exemple.fr/billetterie",
};

/* ------------------------------------------------------------------ matches */

export type Match = {
  id: string;
  team: "Senior M1" | "Senior F1";
  competition: string;
  round: string;
  opponent: string;
  opponentShort: string;
  opponentLogo?: string;
  home: boolean;
  venue: string;
  date: string; // ISO
  score?: { vbc: number; opponent: number };
};

/** Calendrier réel de la saison 2026-2027, Senior M1 (Nationale Masculine 2). */
export const seniorM1Matches: Match[] = [
  { opponent: "Beyssac Beaupuy Marmande -3", opponentShort: "BBM -3", home: true, date: "2026-09-05T20:00:00" },
  { opponent: "ESMS Basket 40", opponentShort: "ESMS 40", home: false, date: "2026-09-12T20:00:00" },
  { opponent: "Nantes Basket Hermine (NBH) -3", opponentShort: "NBH -3", home: true, date: "2026-09-19T20:00:00" },
  { opponent: "Amicale Sportive Niortaise", opponentShort: "AS Niortaise", home: false, date: "2026-09-26T20:00:00" },
  { opponent: "Pornic Basket St Michel", opponentShort: "Pornic", home: true, date: "2026-10-03T20:00:00" },
  { opponent: "IE - TOAC Basket - Espoir", opponentShort: "TOAC Espoir", home: false, date: "2026-10-10T20:00:00" },
  { opponent: "Saint Médard Basket", opponentShort: "St Médard", home: true, date: "2026-10-17T20:00:00" },
  { opponent: "Avenir Serreslousiens Colombins", opponentShort: "Serreslousiens", home: false, date: "2026-10-31T20:00:00" },
  { opponent: "Challans Riez Vie", opponentShort: "Challans", home: true, date: "2026-11-07T20:00:00" },
  { opponent: "Rezé Basket 44 - 2", opponentShort: "Rezé 44-2", home: false, date: "2026-11-14T20:00:00" },
  { opponent: "Garonne Avenir Basket du Marmand", opponentShort: "Garonne Avenir", home: true, date: "2026-11-28T20:00:00" },
  { opponent: "Brissac Aubance Basket - 2", opponentShort: "Brissac -2", home: false, date: "2026-12-05T20:00:00" },
  { opponent: "Adour Dax Landes Basket", opponentShort: "Adour Dax", home: false, date: "2026-12-12T20:00:00" },
  { opponent: "Beyssac Beaupuy Marmande -3", opponentShort: "BBM -3", home: false, date: "2027-01-02T20:00:00" },
  { opponent: "ESMS Basket 40", opponentShort: "ESMS 40", home: true, date: "2027-01-09T20:00:00" },
  { opponent: "Nantes Basket Hermine (NBH) -3", opponentShort: "NBH -3", home: false, date: "2027-01-16T20:00:00" },
  { opponent: "Amicale Sportive Niortaise", opponentShort: "AS Niortaise", home: true, date: "2027-01-30T20:00:00" },
  { opponent: "Pornic Basket St Michel", opponentShort: "Pornic", home: false, date: "2027-02-06T20:00:00" },
  { opponent: "IE - TOAC Basket - Espoir", opponentShort: "TOAC Espoir", home: true, date: "2027-02-13T20:00:00" },
  { opponent: "Saint Médard Basket", opponentShort: "St Médard", home: false, date: "2027-02-27T20:00:00" },
  { opponent: "Avenir Serreslousiens Colombins", opponentShort: "Serreslousiens", home: true, date: "2027-03-06T20:00:00" },
  { opponent: "Challans Riez Vie", opponentShort: "Challans", home: false, date: "2027-03-13T20:00:00" },
  { opponent: "Rezé Basket 44 - 2", opponentShort: "Rezé 44-2", home: true, date: "2027-03-27T20:00:00" },
  { opponent: "Garonne Avenir Basket du Marmand", opponentShort: "Garonne Avenir", home: false, date: "2027-04-03T20:00:00" },
  { opponent: "Brissac Aubance Basket - 2", opponentShort: "Brissac -2", home: true, date: "2027-04-17T20:00:00" },
  { opponent: "Adour Dax Landes Basket", opponentShort: "Adour Dax", home: true, date: "2027-05-01T20:00:00" },
].map((m, i) => ({
  id: `m1-${String(i + 1).padStart(2, "0")}`,
  team: "Senior M1" as const,
  competition: "Nationale Masculine 2",
  round: i < 13 ? "Aller" : "Retour",
  venue: m.home ? club.venue : "Extérieur",
  ...m,
}));

export const nextMatch: Match =
  seniorM1Matches.find((m) => m.home && new Date(m.date) > new Date()) ?? seniorM1Matches[0];

export const upcomingMatches: Match[] = [...seniorM1Matches];

export type StandingRow = {
  rank: number;
  team: string;
  points: number;
  played: number;
  wins: number;
  losses: number;
  scored: number;
  conceded: number;
  diff: number;
  logo?: string;
};

/** TODO : classement réel de la saison en cours (aucune ligne inventée). */
export const standings: StandingRow[] = [];

/* ------------------------------------------------------------------- roster */

export type Position =
  | "Meneur"
  | "Arrière"
  | "Ailier"
  | "Ailier fort"
  | "Ailier / Ailier fort"
  | "Ailier fort / Pivot"
  | "Pivot"
  | "Coach";

export type Player = {
  slug: string;
  firstName: string;
  lastName: string;
  team: string;
  photo: string;
  /** Photo détourée (fond transparent) pour la carte effectif ; retombe sur
   *  `photo` si absente. */
  cardPhoto?: string;
  /** Vidéo d'action (fichier local importé, ex. .mp4) affichée sur la fiche joueur. */
  video?: string;
  /** Crédit du photographe/vidéaste (compte Instagram) pour `photo`/`video`, si connu. */
  credit?: { handle: string; url: string };
  /** Photos supplémentaires affichées dans la colonne latérale de la fiche joueur. */
  gallery?: string[];
  /** Champs optionnels : laissés vides tant que le club ne les a pas fournis
   *  (pas de numéro/poste/stats inventés pour de vraies personnes). */
  number?: number;
  position?: Position;
  height?: string;
  age?: number;
  caption?: string;
  quote?: string;
  bio?: string[];
  career?: { season: string; club: string; matchs?: number; points?: number; moyenne?: number }[];
  stats?: { points?: number; rebonds?: number; passes?: number; adresse?: string };
  /** Historique match par match d'une saison (source : mr-stats ou équivalent). */
  matchLog?: { matchday: number; opponent: string; home: boolean; score: string; points: number }[];
  role?: string;
};

/**
 * TODO : effectif réel du club. Chaque joueur ajouté doit utiliser une vraie
 * photo (sinon laisser `photo: playerPlaceholder`) et de vraies infos — ne
 * jamais inventer un numéro, un poste ou des stats pour une vraie personne ;
 * écrire "En attente d'informations" plutôt que de fabriquer une donnée
 * (voir `officials`/`staff` plus bas pour l'exemple de ce pattern).
 */
export const players: Player[] = [
  { slug: "justin-jouet", firstName: "Justin", lastName: "Jouet", photo: justinJouet, number: 4 },
  {
    slug: "jonas-marie-francoise",
    firstName: "Jonas",
    lastName: "Marie-Francoise",
    photo: jonasMarieFrancoise,
    number: 6,
  },
  { slug: "julien-leclerc", firstName: "Julien", lastName: "Leclerc", photo: julienLeclerc, number: 7 },
  { slug: "theo-pallard", firstName: "Théo", lastName: "Pallard", photo: theoPallard, number: 8 },
  { slug: "flavien-forre", firstName: "Flavien", lastName: "Forre", photo: flavienForre, number: 9 },
  { slug: "romain-brachet", firstName: "Romain", lastName: "Brachet", photo: romainBrachet, number: 10 },
  { slug: "robin-le-ster", firstName: "Robin", lastName: "Le Ster", photo: robinLeSter, number: 12 },
  { slug: "junior-tshunza", firstName: "Junior", lastName: "Tshunza", photo: juniorTshunza, number: 14 },
  // TODO : numéro de maillot illisible sur la photo fournie (prise de dos, recadrée) — à renseigner.
  { slug: "valentin-jolbit", firstName: "Valentin", lastName: "Jolbit", photo: valentinJolbit },
  // TODO : photo fournie montre ce joueur dans un maillot d'un autre club (Chalans) et non MVBC —
  // à vérifier auprès du club avant publication (mauvaise photo ? ancien club ?). Le numéro 15 vu
  // sur cette photo n'est donc pas forcément son numéro à Montaigu Vendée.
  { slug: "issa-fofana", firstName: "Issa", lastName: "Fofana", photo: issaFofana },
].map((p) => ({ ...p, team: "Senior M1" }));

/* ------------------------------------------------------------------ results */

export type ResultRow = { matchday: number; opponent: string; home: boolean; score: string };

/**
 * Résultats des matchs déjà joués, dérivés du match log d'un joueur dont le
 * suivi est complet sur la saison (voir TEMPLATE.md). Se vide automatiquement
 * tant qu'aucun joueur n'a de `matchLog` renseigné.
 */
export const seniorM1Results: ResultRow[] = (() => {
  const reference = players.find((p) => p.matchLog?.length);
  return [...(reference?.matchLog ?? [])]
    .map(({ matchday, opponent, home, score }) => ({ matchday, opponent, home, score }))
    .sort((a, b) => b.matchday - a.matchday);
})();

/** Équipe première : les deux groupes seniors compétition. */
export const premiereCategories = ["Senior M1", "Senior F1"] as const;

/** Formation : le parcours jeunes, de l'École de Basket aux U20. */
export const formationCategories = ["U20", "U18", "U15", "École de Basket"] as const;

export const positions: Position[] = ["Meneur", "Arrière", "Ailier", "Ailier fort", "Pivot"];

/**
 * "Vos leaders" : calculé automatiquement à partir des stats déjà
 * renseignées dans `players`, jamais éditorialisé à la main. Se vide tant
 * qu'aucun joueur n'a de stats/matchLog.
 */
export type LeaderSpot = {
  category: string;
  sublabel: string;
  player: Player;
  value: string;
  featured?: boolean;
};

function topScorerAmong(teams: readonly string[]) {
  return players
    .filter((p): p is Player & { stats: { points: number } } => p.stats?.points != null)
    .filter((p) => teams.includes(p.team))
    .sort((a, b) => b.stats.points - a.stats.points)[0];
}

/** MVP mis en avant sur son dernier match logué, tous joueurs confondus. */
function lastMatchSpot(): LeaderSpot | null {
  const candidates = players
    .filter((p): p is Player & { matchLog: NonNullable<Player["matchLog"]> } =>
      Boolean(p.matchLog?.length),
    )
    .map((p) => ({ player: p, last: p.matchLog[p.matchLog.length - 1] }));
  if (!candidates.length) return null;
  const { player, last } = candidates.sort((a, b) => b.last.points - a.last.points)[0];
  return {
    category: "MVP",
    sublabel: `Dernier match — J${last.matchday} vs ${last.opponent}`,
    player,
    value: String(last.points),
    featured: true,
  };
}

export const leaderSpots: LeaderSpot[] = [
  lastMatchSpot(),
  (() => {
    const player = topScorerAmong(["Senior M1"]);
    return player
      ? {
          category: "Meilleur scoreur",
          sublabel: "de la saison",
          player,
          value: String(player.stats!.points),
        }
      : null;
  })(),
  (() => {
    const player = topScorerAmong(["Senior F1"]);
    return player
      ? {
          category: "Meilleure scoreuse",
          sublabel: "de la saison",
          player,
          value: String(player.stats!.points),
        }
      : null;
  })(),
  (() => {
    const player = topScorerAmong(formationCategories);
    return player
      ? {
          category: "Meilleur jeune",
          sublabel: "de la saison",
          player,
          value: String(player.stats!.points),
        }
      : null;
  })(),
].filter((s): s is LeaderSpot => s !== null);

/* --------------------------------------------------------------------- news */

export type Article = {
  slug: string;
  title: string;
  category: "Club" | "Matchs" | "Jeunes" | "Événements" | "Partenaires";
  date: string;
  author: string;
  readingTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  content: string[];
};

/** TODO : vraies actualités du club (aucun article inventé). */
export const articles: Article[] = [];

export const newsCategories = [
  "Toutes",
  "Club",
  "Matchs",
  "Jeunes",
  "Événements",
  "Partenaires",
] as const;

/* -------------------------------------------------------------------- teams */

/**
 * TODO : adapter les intitulés/niveaux réels des équipes du club (garder au
 * moins une entrée pour que le carrousel "Nos équipes" de l'accueil ne soit
 * pas vide, mais ne pas laisser de faux niveau de championnat en prod).
 */
export const teams = [
  {
    name: "Senior M1",
    level: "[Championnat à renseigner]",
    image: images.teamM1,
    text: "[À rédiger] Présentation de l'équipe fanion masculine.",
  },
  {
    name: "Senior F1",
    level: "[Championnat à renseigner]",
    image: images.teamF1,
    text: "[À rédiger] Présentation de l'équipe fanion féminine.",
  },
];

/* ----------------------------------------------------------------- partners */

export type Partner = {
  name: string;
  tier: "Or" | "Argent" | "Bronze";
  sector: string;
  logo?: string;
};

/** TODO : vrais sponsors du club, avec leur logo réel (voir TEMPLATE.md). */
export const partners: Partner[] = [];

/** TODO : vraies institutions partenaires (mairie, comité, ligue, FFBB…). */
export const institutions: string[] = [];

/* ------------------------------------------------------------------ club life */

/** TODO : vraie chronologie du club (aucune date/fait inventé). */
export const timeline: { year: string; title: string; text: string }[] = [];

export const values = [
  { title: "Formation", text: "[À rédiger]" },
  { title: "Famille", text: "[À rédiger]" },
  { title: "Ambition", text: "[À rédiger]" },
  { title: "Respect", text: "[À rédiger]" },
];

/** TODO : vrai bureau du club. Pour un poste sans nom confirmé, utiliser
 *  "En attente d'informations" plutôt que d'inventer un nom (voir
 *  TEMPLATE.md). */
export const officials: { name: string; role: string }[] = [];

/** TODO : vrai encadrement/staff du club (même règle que `officials`). */
export const staff: { name: string; role: string }[] = [];
