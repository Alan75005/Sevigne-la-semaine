import webpush from "web-push";

const json = (data, status = 200, extraHeaders = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });

function cors(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin",
  };
}

function originAllowed(request, env) {
  const origin = request.headers.get("Origin");
  return !origin || origin === env.ALLOWED_ORIGIN;
}

function unauthorized() {
  return new Response("Authentification requise", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sévigné Push"',
    },
  });
}

function isAdmin(request, env) {
  const auth = request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  try {
    const decoded = atob(auth.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return false;

    const user = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);

    return user === env.ADMIN_USER && password === env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

async function subscriptionId(endpoint) {
  const bytes = new TextEncoder().encode(endpoint);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function adminPage() {
  return new Response(`<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sévigné — Notifications</title>
<style>
body{font-family:system-ui,sans-serif;max-width:650px;margin:40px auto;padding:20px;color:#172126}
h1{color:#355f78}
label{display:block;font-weight:700;margin-top:18px}
input,textarea,button{box-sizing:border-box;width:100%;font:inherit;padding:12px;margin-top:6px}
textarea{min-height:100px}
button{margin-top:22px;background:#355f78;color:white;border:0;border-radius:10px;font-weight:700}
#result{margin-top:20px;white-space:pre-wrap}
</style>
</head>
<body>
<h1>Sévigné — La semaine</h1>
<p>Envoyer une notification aux abonnés.</p>

<form id="form">
<label>Titre</label>
<input name="title" value="Sévigné — La semaine" required>

<label>Message</label>
<textarea name="body" required>La nouvelle édition de l’agenda est disponible.</textarea>

<label>Adresse à ouvrir</label>
<input name="url" value="https://sevigne-la-semaine.pages.dev/">

<button type="submit">Envoyer la notification</button>
</form>

<div id="result"></div>

<script>
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  result.textContent = "Envoi…";

  const data = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch("/api/push/send", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "same-origin",
      body: JSON.stringify(data)
    });

    const text = await response.text();
    result.textContent = response.ok ? "✓ " + text : "Erreur : " + text;
  } catch (error) {
    result.textContent = "Erreur : " + error.message;
  }
});
</script>
</body>
</html>`, {
    headers: {"Content-Type": "text/html; charset=utf-8"},
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = cors(env);

    if (request.method === "OPTIONS") {
      if (!originAllowed(request, env)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === "/api/push/config" && request.method === "GET") {
      if (!originAllowed(request, env)) {
        return json({ error: "Origin non autorisée" }, 403, headers);
      }

      return json(
        { publicKey: env.VAPID_PUBLIC_KEY },
        200,
        headers
      );
    }

    if (url.pathname === "/api/push/subscribe" && request.method === "POST") {
      if (!originAllowed(request, env)) {
        return json({ error: "Origin non autorisée" }, 403, headers);
      }

      try {
        const subscription = await request.json();

        if (
          !subscription?.endpoint ||
          !subscription?.keys?.p256dh ||
          !subscription?.keys?.auth
        ) {
          return json({ error: "Abonnement invalide" }, 400, headers);
        }

        const id = await subscriptionId(subscription.endpoint);

        await env.PUSH_SUBSCRIPTIONS.put(
          "sub:" + id,
          JSON.stringify(subscription)
        );

        return json({ ok: true }, 201, headers);
      } catch {
        return json({ error: "Requête invalide" }, 400, headers);
      }
    }

    if (url.pathname === "/admin" && request.method === "GET") {
      if (!isAdmin(request, env)) return unauthorized();
      return adminPage();
    }

    if (url.pathname === "/api/push/send" && request.method === "POST") {
      if (!isAdmin(request, env)) return unauthorized();

      let payload;
      try {
        payload = await request.json();
      } catch {
        return json({ error: "JSON invalide" }, 400);
      }

      webpush.setVapidDetails(
        env.VAPID_SUBJECT,
        env.VAPID_PUBLIC_KEY,
        env.VAPID_PRIVATE_KEY
      );

      const notification = JSON.stringify({
        title: payload.title || "Sévigné — La semaine",
        body: payload.body || "La nouvelle édition est disponible.",
        url: payload.url || "https://sevigne-la-semaine.pages.dev/",
      });

      let cursor;
      let sent = 0;
      let removed = 0;
      let failed = 0;

      do {
        const page = await env.PUSH_SUBSCRIPTIONS.list({
          prefix: "sub:",
          cursor,
        });

        for (const key of page.keys) {
          const raw = await env.PUSH_SUBSCRIPTIONS.get(key.name);
          if (!raw) continue;

          try {
            await webpush.sendNotification(
              JSON.parse(raw),
              notification
            );
            sent++;
          } catch (error) {
            if (error?.statusCode === 404 || error?.statusCode === 410) {
              await env.PUSH_SUBSCRIPTIONS.delete(key.name);
              removed++;
            } else {
              failed++;
            }
          }
        }

        cursor = page.list_complete ? undefined : page.cursor;
      } while (cursor);

      return json({ ok: true, sent, removed, failed });
    }

    return json({ error: "Not found" }, 404, headers);
  },
};
