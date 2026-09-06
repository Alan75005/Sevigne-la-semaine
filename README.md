# Sévigné — La semaine · V10 — notifications push

## Ce qui est intégré dans le site
- bouton « Recevoir la nouvelle édition » ;
- détection iPhone : si la web app n’est pas ouverte depuis l’écran d’accueil, l’utilisateur est guidé avant toute demande d’autorisation ;
- demande d’autorisation uniquement après action explicite sur le bouton ;
- inscription via `PushManager.subscribe()` ;
- gestion des événements `push` et `notificationclick` dans le service worker ;
- identité PWA stable (`manifest.id = "/"`) ;
- cache robuste V9 conservé et passé en V10.

## Étape serveur indispensable
GitHub + Cloudflare Pages seuls ne peuvent pas conserver les abonnements et envoyer des Web Push. Le ZIP contient `push-worker-template.js`, base du Worker Cloudflare pour :
- `/api/push/config`
- `/api/push/subscribe`
- stockage des abonnements dans Cloudflare KV.

Il reste à configurer le Worker, le KV et une paire de clés VAPID. La clé privée VAPID ne doit jamais être placée dans GitHub ni dans le JavaScript du navigateur.

Tant que cette infrastructure n’est pas reliée au domaine, le bouton est présent mais affiche « Le service d’envoi doit encore être relié au site » au moment de l’inscription.
