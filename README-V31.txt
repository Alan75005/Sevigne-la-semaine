V31 — Assistant IA OpenAI

1) Décompresser ce ZIP vers dist comme d’habitude.
2) IMPORTANT : remplacer la commande de déploiement Cloudflare par :
   npx wrangler deploy ./dist/worker.js --assets ./dist --name livret-personnels-2026-27 --compatibility-date 2026-08-22
3) Dans Cloudflare > Worker > Settings > Variables and Secrets, ajouter un SECRET :
   Nom : OPENAI_API_KEY
   Valeur : votre clé API OpenAI
4) Ne jamais mettre la clé dans le ZIP ou dans GitHub.

Le chatbot utilise gpt-5.4-mini et sélectionne localement les passages pertinents du livret avant de les envoyer à l’API.
