const CACHE='maui-2026-v19';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg',
  './Intro/Intro1.jpg','./Intro/Intro2.jpg','./Intro/Intro3.jpg','./Intro/Intro4.jpg','./Intro/Intro5.jpg','./Intro/Intro6.jpg',
  './Closing/Closing1.jpg','./Closing/Closing2.jpg','./Closing/Closing3.jpg','./Closing/Closing4.jpg','./Closing/Closing5.jpg','./Closing/Closing6.jpg','./Closing/ClosingFinal.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(!res||res.status!==200||res.type!=='basic')return res;const c=res.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c));return res;})));});
