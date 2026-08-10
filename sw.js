// ERZA dashboard — minimal service worker to enable PWA install (Add to Dock / Home Screen).
// Intentionally NO caching of data: the dashboard is password-gated and must always fetch
// fresh registry data.
//
// Navigations bypass the HTTP cache (Erez 2026-08-10): GitHub Pages serves index.html
// with max-age=600, so after every deploy the browser kept showing a stale page for up
// to 10 minutes — twice in one day Erez saw "the change isn't there" while origin was
// already current. `cache: 'no-cache'` forces a conditional revalidation on each
// navigation (ETag makes the common case a cheap 304), and any network failure falls
// back to whatever the browser has, so offline opening still works.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).catch(() => fetch(e.request)));
  }
});
