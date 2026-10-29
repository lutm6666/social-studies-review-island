// 離線功能：第一次開啟後，網頁、3D 引擎與字型都會存到這台裝置，沒有網路也能複習
const CACHE='shehui-f158fd2158';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','favicon.png','apple-touch-icon.png'];
const THREE_URL='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(async c=>{
    await c.addAll(CORE);
    try{ const r=await fetch(THREE_URL,{mode:'cors'}); if(r.ok) await c.put(THREE_URL,r); }catch(err){}
  }).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('shehui-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  // 網頁本身：先試網路（拿到最新版），失敗再用存起來的版本
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put('./',cp)); return r; }).catch(()=>caches.match('./').then(r=>r||caches.match('index.html'))));
    return;
  }
  // 3D 引擎、字型、圖示：先用存起來的，沒有再上網抓並存起來
  const cacheable = url.origin===location.origin || url.href===THREE_URL || url.href.indexOf('cdn.jsdelivr.net/npm/three@0.128.0')>=0 || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if(!cacheable) return;
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{ if(r && (r.ok||r.type==='opaque')){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); } return r; })));
});
