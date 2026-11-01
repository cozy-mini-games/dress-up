// 紓壓小盒 Service Worker：有網路一律抓最新版，沒網路才用快取。每次改檔把 VERSION +1。
const VERSION = 33;
const CACHE = 'relax-v' + VERSION;
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', 'index.html', 'style.css', 'app.js', 'games/wash.js', 'games/sort.js', 'games/toys.js', 'manifest.webmanifest'])).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    try {
      const res = await fetch(req, { cache: 'no-cache' });
      if (res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    } catch (err) {
      return (await caches.match(req, { ignoreSearch: true })) || caches.match('./');
    }
  })());
});
