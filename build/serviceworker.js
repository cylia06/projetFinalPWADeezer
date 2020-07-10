const appShellCacheName = 'app-shell-v2';
const appShellFilesToCache = [
    '/',
    'index.html',
    'offline.html',
    './src/App.js',
    './src/App.css',
    './src/index.js',
    './src/index.css',
    './src/player.scss',
    '/images/logo.ico',
    '/images/favicon.ico',
    './src/js/Saved.js',
    './src/js/Search.js',
    './src/js/Trending.js',
    './src/js/Player.js',
    './src/js/NavBar.js',
    './src/js/Track.js',
    './src/js/TrackFavorite.js'
  
];

//List caches
const appCaches = [
    appShellCacheName,
];
//Install sw
self.addEventListener('install', async (event)=>{ 
    console.log('Installation')

    event.waitUntil(
        caches.open(appShellCacheName)
        .then((cache) => {
            console.log(' Opened cache');
            return cache.addAll(appShellFilesToCache);
        })
    );
   
});

// Listen REquest
self.addEventListener('fetch', async (event)=>{ 
    console.log('fetch')
    event.respondWith(
        caches.match(event.request)
            /*.then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })*/
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(e => {
                console.error(e);
            })
    )
   
});


//activate sw
self.addEventListener('activate', async (event)=>{ 
    console.log('activate')
    //const cacheWhitelist = [];
    //cacheWhitelist.push(appShellCacheName);
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.map(key => {
                    if (key !== appShellCacheName) {
                        return caches.delete(key);
                    }
                })
            ))
            .then(() => {
                console.log('[SW] Cleaned old caches');
            })
    );

   /* event.waitUntil(
        caches.keys()
        .then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    );*/
  
   
});