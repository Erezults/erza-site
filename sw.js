// ERZA dashboard — minimal service worker to enable PWA install (Add to Dock / Home Screen).
// Intentionally NO caching: the dashboard is password-gated and must always fetch fresh
// registry data. The empty fetch handler exists only to satisfy the installability criteria.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
