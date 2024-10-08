const staticCacheName ='site-static-v2';
const dynamicCache = 'site-dynamic-v1';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/materialize.min.js',
  '/css/materialize.min.css',
  '/flower.png',
];

// install service worker
self.addEventListener('install', evt => {
  //console.log('Service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then( cache => {
      console.log('cashing shell assets');
      cache.addAll(assets)
    })
  );

});

// activate event
self.addEventListener('activate', evt => {
  //console.log('Service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
        )
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});