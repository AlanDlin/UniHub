const STATIC_CACHE='unihub-static-v559';
const STATIC_ASSETS=['/','/index.html','/manifest.webmanifest','/logo.svg'];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache=>cache.addAll(STATIC_ASSETS))
      .catch(()=>{})
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys
        .filter(key=>key.startsWith('unihub-static-')&&key!==STATIC_CACHE)
        .map(key=>caches.delete(key))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  event.respondWith(
    caches.match(request).then(cached=>{
      if(cached)return cached;
      return fetch(request).then(response=>{
        if(!response||!response.ok)return response;
        const copy=response.clone();
        caches.open(STATIC_CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});
        return response;
      });
    })
  );
});
