const STATIC_CACHE='unihub-static-v560';
const STATIC_ASSETS=['/manifest.webmanifest','/logo.svg'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(STATIC_CACHE)
    .then(cache=>cache.addAll(STATIC_ASSETS))
    .catch(()=>{})
    .then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(key=>key.startsWith('unihub-static-')&&key!==STATIC_CACHE)
      .map(key=>caches.delete(key))
  )).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  // Always refresh the app shell; never serve an obsolete editor on navigation.
  if(request.mode==='navigate'||url.pathname==='/'||url.pathname==='/index.html'){
    event.respondWith(fetch(request,{cache:'no-store'}).catch(async()=>{
      const cache=await caches.open(STATIC_CACHE);
      return (await cache.match(request))||Response.error();
    }));
    return;
  }

  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response&&response.ok){
      const copy=response.clone();
      caches.open(STATIC_CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});
    }
    return response;
  })));
});
