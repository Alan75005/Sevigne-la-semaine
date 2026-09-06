# Sévigné — La semaine · V12 FINAL

## Ce package contient
- le site avec l'API réelle : `https://sevigne-la-semaine-push.yvonalan1.workers.dev`
- le Worker Push dans `cloudflare-push/`
- aucun mot de passe, aucune clé privée
- aucun dossier `assets` afin de ne pas écraser la photo d'archives déjà sur GitHub

## Important — KV
Le binding KV `PUSH_SUBSCRIPTIONS` a déjà été créé dans le Dashboard Cloudflare.
Il n'est volontairement PAS redéclaré dans `wrangler.jsonc` sans ID : Wrangler 4 peut
auto-provisionner un nouveau namespace lorsqu'un binding KV est déclaré sans ID.

Après le premier déploiement GitHub, vérifier dans Worker > Bindings que
`PUSH_SUBSCRIPTIONS` pointe toujours vers `sevigne-push-subscriptions`.
S'il n'apparaît plus, le recréer depuis le Dashboard en sélectionnant ce namespace existant.

## Connexion du Worker à GitHub
Worker `sevigne-la-semaine-push` > Settings > Builds > Git repository > Connect
- Repository: `Alan75005/Sevigne-la-semaine`
- Production branch: `main`
- Root directory: `cloudflare-push`
- Deploy command: `npx wrangler deploy`

Le `name` Wrangler correspond exactement au Worker existant.
`keep_vars: true` conserve les variables/secrets configurés dans le Dashboard.
