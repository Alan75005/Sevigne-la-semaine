V32 — fusion conservatrice du site V31 + assistant IA

- Interface, graphisme, navigation, contenus, images et page-data : inchangés par rapport à V31.
- Assistant : route /api/chat dans worker.js.
- Corpus documentaire : intégré au Worker, comme dans V31.
- OpenAI : Responses API, modèle gpt-5.4-mini.
- Confidentialité API : store:false ajouté aux requêtes Responses.
- La clé OPENAI_API_KEY reste un secret Cloudflare et n'est jamais incluse dans ce ZIP.
- Configuration Wrangler ajoutée pour déployer le Worker avec ses assets statiques.

Déploiement recommandé :
1. Conserver/configurer le secret OPENAI_API_KEY dans le Worker Cloudflare.
2. Depuis le dossier décompressé : npx wrangler deploy

Ne pas remplacer le site par le petit package de test "livret-assistant-ia-direct-upload.zip".

IMPORTANT V33
- Cible Cloudflare corrigée : livret-personnels-2026 (conserve l'URL workers.dev existante).
- Le reste est identique à la V32.
