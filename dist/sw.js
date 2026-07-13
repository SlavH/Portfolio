const CACHE = 'v1'
const BASE = '/Portfolio/'
const urls = [BASE, BASE + 'index.html']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(urls)))
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  )
})
