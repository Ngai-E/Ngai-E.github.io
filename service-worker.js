self.addEventListener( "install" , function (event) {          //caching static files while service worker installs
    event.waitUntil(
        caches.open("cacheName1").then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    '/css/bootstrap.min.css',
                    '/js/converter.js',
                    '/js/idb.js',
                    '/js/main.js',
                    '/avatars/badge.jpg'
                ]
            );
        })
    );
});


//check cache before network on fetch events
self.addEventListener('fetch', function(event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request.url).then(function(response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request.url) 
      }).catch(function(error) {
  
        // Respond with custom offline page
  
      })
    );
  });