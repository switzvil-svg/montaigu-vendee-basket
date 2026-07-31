# Déploiement sur Cloudflare Workers

Le projet utilise **TanStack Start** avec le preset Nitro `cloudflare-module`.
Chaque build produit automatiquement un Worker prêt à déployer dans
`.output/server/`, avec son propre `wrangler.json` (main, assets, compat
flags…). Aucune config Cloudflare manuelle n'est nécessaire.

---

## 1. Prérequis (une seule fois)

- Compte Cloudflare : https://dash.cloudflare.com
- Node 20+ / Bun installé
- Installer Wrangler globalement (ou utiliser `npx wrangler`) :

```bash
npm i -g wrangler
wrangler login          # ouvre le navigateur pour se connecter à Cloudflare
```

## 2. Installer les dépendances du projet

```bash
bun install       # ou: npm install
```

## 3. Builder l'application

```bash
bun run build
```

Cela génère :

```
.output/
├── public/          → assets statiques (JS, CSS, images, favicon, blason…)
└── server/
    ├── index.mjs    → Worker Cloudflare (SSR + API)
    └── wrangler.json ← config auto-générée par Nitro
```

## 4. Prévisualiser en local (optionnel)

Simule l'environnement Workers en local :

```bash
bun run cf:preview
# ouvre http://localhost:8787
```

## 5. Déployer

```bash
bun run cf:deploy          # build + deploy
# ou, si déjà buildé :
bun run cf:deploy:prebuilt
```

Sortie attendue :

```
✨ Deployed <nom-du-worker>
   https://<nom-du-worker>.<ton-subdomain>.workers.dev
```

## 6. Suivre les logs en direct

```bash
bun run cf:tail
```

---

## Personnaliser le nom du Worker

Par défaut Nitro utilise le nom du package, défini dans `package.json`. Pour
changer (obligatoire si tu forkes ce site pour un autre club, sous peine
d'écraser le Worker existant) :

```json
{ "name": "mon-nom-de-worker" }
```

Puis rebuild : le Worker sera publié sur
`https://mon-nom-de-worker.<subdomain>.workers.dev`.

## Brancher un domaine personnalisé (ex. mon-club-de-basket.fr)

1. Ajoute ton domaine dans Cloudflare (DNS géré par Cloudflare).
2. Dashboard Cloudflare → **Workers & Pages** → ton Worker →
   **Settings → Domains & Routes → Add → Custom Domain**.
3. Entre ton domaine (et son `www.`). Cloudflare crée les records et le SSL
   automatiquement.

## Variables d'environnement / Secrets

Si un jour tu ajoutes des clés API :

```bash
wrangler secret put NOM_DU_SECRET --config .output/server/wrangler.json
```

Elles seront accessibles côté serveur via `process.env.NOM_DU_SECRET`
dans les server functions.

## CI/CD (GitHub Actions)

`.github/workflows/deploy-cloudflare.yml` est déjà en place : chaque push sur
`main` build et déploie automatiquement le site.

Il te faut juste ajouter deux secrets GitHub (Settings → Secrets and
variables → Actions) :

- `CLOUDFLARE_API_TOKEN` — Cloudflare Dashboard → **My Profile → API Tokens →
  Create Token → "Edit Cloudflare Workers"**
- `CLOUDFLARE_ACCOUNT_ID` — visible dans le Dashboard Cloudflare (colonne de
  droite de n'importe quelle page du compte)

---

## Résumé express

```bash
npm i -g wrangler
wrangler login
bun install
bun run cf:deploy
```

C'est tout — le site est en ligne. 🏀
