const V='reglab-v9';const CORE=['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './01/', './01/index.html', './02-1/', './02-1/index.html', './02-2/', './02-2/index.html', './02-3/', './02-3/index.html', './10-1/', './10-1/index.html', './10-2/', './10-2/index.html', './11-1/', './11-1/index.html', './11-2/', './11-2/index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));}return res;}).catch(()=>hit);return hit||net;}));});
