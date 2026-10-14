const CACHE='maui-2026-v19-1';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg',
  './Intro/Intro1.jpg','./Intro/Intro2.jpg','./Intro/Intro3.jpg','./Intro/Intro4.jpg','./Intro/Intro5.jpg','./Intro/Intro6.jpg',
  './Closing/Closing1.jpg','./Closing/Closing2.jpg','./Closing/Closing3.jpg','./Closing/Closing4.jpg','./Closing/Closing5.jpg','./Closing/Closing6.jpg','./Closing/ClosingFinal.jpg','./Closing/ClosingSong.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// Phones ask for audio in byte ranges; answer from cache with a 206 slice or playback fails.
function rangeResp(req,r){const m=/bytes=(\d*)-(\d*)/.exec(req.headers.get('range')||'');if(!m)return r;return r.blob().then(b=>{const size=b.size;let s=m[1]?parseInt(m[1],10):0;let en=m[2]?parseInt(m[2],10):size-1;if(!m[1]&&m[2]){s=Math.max(0,size-parseInt(m[2],10));en=size-1;}en=Math.min(en,size-1);return new Response(b.slice(s,en+1),{status:206,statusText:'Partial Content',headers:{'Content-Type':r.headers.get('Content-Type')||'audio/mpeg','Content-Range':'bytes '+s+'-'+en+'/'+size,'Content-Length':String(en-s+1)}});});}
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r?(e.request.headers.has('range')?rangeResp(e.request,r):r):fetch(e.request).then(res=>{if(!res||res.status!==200||res.type!=='basic')return res;const c=res.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c));return res;})));});
