// The market practice is to place a version 1 , version 2 for you to keep track.
const cacheNameA = 'v2';


// This is the file you want to cache when the connection drop off or terminated;
const cache_urls = [
  'index.html',
  'about.html',
  'css/style.css',
  'js/main.js',
  'sw_cache.js'
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheNameA)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cache_urls)
          .then(() => console.log('Assets/Urls added to cache'))
          .catch(err => console.log('Error while fetching assets', err));;
      })
      .then(() => self.skipWaiting())
  );
});




// Clear all old version of cache and retain the most current version
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(c => {
      return Promise.all(
        c.map(cache => {
          if (cache !== cacheNameA) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event - this is to make the connection available during offline
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
