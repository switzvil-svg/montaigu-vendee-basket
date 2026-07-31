# Utiliser ce site comme template pour un autre club de basket

Ce dépôt sert de base à un nouveau site de club. Le modèle est **"fork &
swap"** : pour un nouveau client, on duplique ce dépôt, on remplace le
contenu ci-dessous, on redéploie sur un nouveau Cloudflare Worker. Chaque
club a son propre dépôt et son propre déploiement.

Tout ce qui est spécifique au club (nom, ville, salle, effectif, résultats,
sponsors, couleurs…) est isolé dans une poignée d'endroits. Suivre cette
checklist dans l'ordre.

## 1. Identité du club — `src/data/club.ts`

Tout en haut du fichier, l'objet `club` :

```ts
export const club = {
  name: "Villeneuve Basket Club",
  short: "VBC",
  city: "Villeneuve-sur-Lot",
  venue: "Salle Descartes",
  streetAddress: "Salle Descartes, Avenue Descartes",
  postalCode: "47300",
  region: "Nouvelle-Aquitaine",
  department: "Lot-et-Garonne",
  country: "FR",
  address: "Salle Descartes, Avenue Descartes, 47300 Villeneuve-sur-Lot",
  email: "contact@villeneuvebasketclub.fr",
  phone: "+33 5 53 00 00 00",
  ticketingUrl: "https://www.exemple.fr/billetterie-vbc",
};
```

Remplace chaque champ. Tous les titres de page, meta descriptions, balises
Open Graph, JSON-LD et textes des composants partagés (header, footer, hero,
prochain match, classement…) lisent cet objet — pas besoin de chercher le
nom du club ailleurs dans le code pour ces éléments-là.

**Reste à modifier séparément** (contenu propre à chaque club, volontairement
non générique) :
- Roster (`players`), calendrier (`upcomingMatches`), classements
  (`standings`), résultats (`seniorM1Results`), sponsors (`partners`),
  dirigeants/staff (`officials`, `staff`), actualités (`articles`),
  chronologie (`timeline`), valeurs (`values`), équipes (`teams`).
- Toutes les données sportives (scores, stats, adversaires) doivent être
  **réelles** — ne jamais inventer un résultat ou une stat pour un vrai
  club. Si une info manque, écrire "En attente d'informations" plutôt que
  fabriquer un nom (voir `officials`/`staff` pour l'exemple).

## 2. Couleurs — `src/styles.css`

Bloc `:root` (et `.dark` pour le mode sombre), tokens `--primary` et
`--navy`/`--secondary`, en `oklch()`. Deux valeurs à changer suffisent à
rebrander tout le site (boutons, dégradés, cartes joueurs…).

## 3. Logo / blason — `src/assets/crest.png` + `public/favicon.png`

Deux fichiers à remplacer par le même logo (le premier est importé dans le
header/footer/hero/carte joueur, le second sert de favicon — ce sont deux
fichiers séparés, pas un alias).

## 4. Photos et autres assets — `src/assets/`

Toutes les photos (joueurs, salle, sponsors, actualités…) sont propres au
club et à remplacer une par une en éditant `src/data/club.ts`. Les textes
alternatifs (`alt`) qui décrivent une photo précise (ex. "Ousmane Dieng en
visite à Salle Descartes") sont aussi à réécrire au moment de changer la
photo.

## 5. Carte OpenStreetMap — `src/routes/billetterie.tsx` et `src/routes/contact.tsx`

Le `bbox` de la carte OpenStreetMap intégrée est codé en dur sur
Villeneuve-sur-Lot (repéré par un commentaire `TODO (template)` dans les
deux fichiers). Recalculer un `bbox` pour la nouvelle ville sur
[openstreetmap.org/export](https://www.openstreetmap.org/export).

## 6. Domaine du sitemap — `src/routes/sitemap[.]xml.ts`

`BASE_URL` est vide avec un `TODO` : renseigner l'URL de prod une fois le
domaine choisi.

## 7. Déploiement — voir `DEPLOY_CLOUDFLARE.md`

En plus des étapes standard, penser à :
- changer `"name"` dans `package.json` (nom du Worker Cloudflare) ;
- créer un nouveau Worker / compte Cloudflare pour ce client (ne pas
  réutiliser le Worker d'un autre club) ;
- refaire les secrets GitHub Actions (`CLOUDFLARE_API_TOKEN`,
  `CLOUDFLARE_ACCOUNT_ID`) sur le nouveau dépôt.

## Hors périmètre de ce template

- **Langue** : tout le site (copy, formats de date `fr-FR`, etc.) est en
  français. Un client dans un pays non francophone demande une traduction
  complète, pas juste un remplacement de données.
- **Réseaux sociaux** : les liens Instagram/Facebook/YouTube du header et du
  footer ne sont pas branchés sur de vraies URLs par défaut — à renseigner
  pour chaque club.
- **Multi-tenant** : ce template suppose un dépôt + un déploiement par club.
  Pour héberger plusieurs clubs sur un seul site (base de données, auth,
  interface d'admin), c'est un projet à part, pas une évolution de ce repo.
