const CACHE_VERSION = "sevigne-la-semaine-v10";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const STATIC_ASSETS = [
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/archive-sevigne.jpg"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url)))
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(key => key.startsWith("sevigne-") || key.startsWith("sevigne-la-semaine-"))
          .filter(key => key !== STATIC_CACHE)
          .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // HTML/navigation: network first. The latest published week wins whenever online.
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: "no-store" });
        return response;
      } catch (error) {
        const cached = await caches.match("./index.html");
        return cached || Response.error();
      }
    })());
    return;
  }

  // JS/CSS: network first as well, so behavior/layout updates arrive immediately.
  if (["script", "style"].includes(request.destination)) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: "no-store" });
        if (response && response.ok) {
          const cache = await caches.open(STATIC_CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        return (await caches.match(request)) || Response.error();
      }
    })());
    return;
  }

  // Images/icons/manifest: fast cached response, refresh silently in background.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    const network = fetch(request).then(async response => {
      if (response && response.ok) {
        const cache = await caches.open(STATIC_CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    }).catch(() => null);
    return cached || (await network) || Response.error();
  })());
});

self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) {}
  const title = data.title || "Sévigné — La semaine";
  const options = {
    body: data.body || "La nouvelle édition est disponible.",
    icon: data.icon || "./assets/archive-sevigne.jpg",
    badge: data.badge || "./assets/archive-sevigne.jpg",
    tag: "nouvelle-edition",
    renotify: true,
    data: { url: data.url || "./" }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "./", self.location.origin).href;
  event.waitUntil((async () => {
    const windows = await clients.matchAll({type:"window", includeUncontrolled:true});
    for (const client of windows) {
      if ("focus" in client) {
        if ("navigate" in client) await client.navigate(target);
        return client.focus();
      }
    }
    return clients.openWindow(target);
  })());
});
