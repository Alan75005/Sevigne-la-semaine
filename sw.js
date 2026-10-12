const CACHE='sevigne-agenda-v107';
const CORE=['./','./index.html','./style.css?v=107','./app.js?v=107','./manifest.webmanifest','./Dossier_conference_Bernard-Henri_Levy.pdf','./menu-restaurant-12-16-octobre-2026.png','./bandeau-sevigne-01.jpg?v=105','./bandeau-sevigne-02.jpg?v=105','./bandeau-sevigne-03.jpg?v=105'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>null)))));
});
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  for(const k of await caches.keys()) if(k!==CACHE) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  e.respondWith((async()=>{
    try{
      const r=await fetch(e.request,{cache:'no-store'});
      const c=await caches.open(CACHE);
      c.put(e.request,r.clone());
      return r;
    }catch(_){
      return (await caches.match(e.request)) || (await caches.match('./index.html'));
    }
  })());
});
