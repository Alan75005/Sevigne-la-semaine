/**
 * Sévigné — La semaine · V10 Push backend template
 *
 * Deploy this as a Cloudflare Worker bound to the same site routes:
 *   /api/push/config
 *   /api/push/subscribe
 *
 * Required bindings:
 * - PUSH_SUBSCRIPTIONS: KV namespace
 * - VAPID_PUBLIC_KEY: secret/plain variable (public key)
 *
 * Sending encrypted Web Push messages requires a standards-compliant Web Push sender.
 * Do not put the VAPID private key in the browser or repository.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/push/config" && request.method === "GET") {
      return json({ publicKey: env.VAPID_PUBLIC_KEY || "" });
    }

    if (url.pathname === "/api/push/subscribe" && request.method === "POST") {
      if (!env.PUSH_SUBSCRIPTIONS) return json({error:"KV not configured"}, 503);
      const sub = await request.json();
      if (!sub || !sub.endpoint || !sub.keys?.p256dh || !sub.keys?.auth) {
        return json({error:"Invalid subscription"}, 400);
      }
      const id = await sha256(sub.endpoint);
      await env.PUSH_SUBSCRIPTIONS.put(`sub:${id}`, JSON.stringify(sub));
      return json({ok:true}, 201);
    }

    return new Response("Not found", {status:404});
  }
};

function json(data, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"content-type":"application/json; charset=utf-8","cache-control":"no-store"}
  });
}

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
