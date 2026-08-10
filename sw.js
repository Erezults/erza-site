// ERZA dashboard — minimal service worker to enable PWA install (Add to Dock / Home Screen).
// Intentionally NO caching of data: the dashboard is password-gated and must always fetch
// fresh registry data.
//
// EVERY same-origin GET bypasses the HTTP cache (Erez 2026-08-10): GitHub Pages serves
// everything with max-age=600, and fixing only navigations left data.enc.js up to 10
// minutes stale — the page refreshed but showed old numbers ("dev is still on the old
// version"). `cache: 'no-cache'` forces a conditional revalidation (ETag → cheap 304 in
// the common case); any network failure falls back to the browser's copy, so opening
// offline still works.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const sameOrigin = e.request.url.startsWith(self.location.origin);
  if (e.request.method === 'GET' && (sameOrigin || e.request.mode === 'navigate')) {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).catch(() => fetch(e.request)));
  }
});
