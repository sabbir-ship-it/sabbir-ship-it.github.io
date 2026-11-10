// ছোট সার্ভিস ওয়ার্কার: আগে নেটওয়ার্ক থেকে আনে, না পেলে জমানো কপি দেখায়।
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(r=>{
      const c=r.clone();
      caches.open('mua-v1').then(x=>x.put(e.request,c)).catch(()=>{});
      return r;
    }).catch(()=>caches.match(e.request))
  );
});
