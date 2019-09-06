

// Make sure sw are supported
if ('serviceWorker' in navigator) {
  // To register the service worker when the browser is loaded (window.addEventListener)
  window.addEventListener('load', () => {
    navigator.serviceWorker
      // .register('./sw_cache.js')
      .register('./sw_cache_wholesite.js')
      .then(reg => console.log('Service Worker: Registered (Pages)'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}