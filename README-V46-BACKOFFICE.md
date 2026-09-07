V46 — Back-office d'administration

Nouveau : /admin.html
Stockage : Cloudflare Workers KV via Pages Functions.

À configurer une seule fois dans Cloudflare :
1. Créer un namespace Workers KV.
2. Dans le projet Pages > Settings > Bindings, ajouter le namespace avec le nom de variable CONTENT.
3. Dans Settings > Variables and Secrets, ajouter un secret ADMIN_PASSWORD avec votre mot de passe.
4. Redéployer le projet après la configuration.

IMPORTANT : le dossier /functions doit être déployé via le dépôt Git connecté à Cloudflare Pages.
Cloudflare ne prend pas en charge les Pages Functions avec Direct Upload depuis le dashboard.

Le site public charge automatiquement les contenus enregistrés dans le back-office.
