(function(){
"use strict";

/* ---------- 島嶼與小主題 ---------- */
const SUBJ = {
  hist:{name:'歷史', css:'var(--hist)', color:'#b38f5c', angle:210},
  geo: {name:'地理', css:'var(--geo)',  color:'#79a660', angle:330},
  civ: {name:'公民', css:'var(--civ)',  color:'#8796a6', angle:90}
};
const ISLANDS = [
  {id:'twh', name:'臺灣史島', subj:'hist', g:0, grade:'七年級', ready:true, decor:'citygate',
   desc:'史前文化到當代臺灣（課綱歷史 B、C、E、F 主題）',
   lms:[
    {id:'pre', name:'史前遺址',   unit:'歷Ba 史前文化與臺灣原住民族'},
    {id:'voy', name:'熱蘭遮城',   unit:'歷Bb 大航海時代的臺灣'},
    {id:'qpe', name:'郊商碼頭',   unit:'歷Ca 清帝國時期：政治經濟'},
    {id:'qsc', name:'書院廟埕',   unit:'歷Cb 清帝國時期：社會文化'},
    {id:'jpe', name:'糖廠煙囪',   unit:'歷Ea 日本帝國時期：政治經濟'},
    {id:'jsc', name:'公學校',     unit:'歷Eb 日本帝國時期：社會文化'},
    {id:'cpd', name:'民主廣場',   unit:'歷Fa 當代臺灣：政治外交'},
    {id:'ces', name:'加工出口區', unit:'歷Fb 當代臺灣：經濟社會'}
   ]},
  {id:'cnh', name:'中國與東亞史島', subj:'hist', g:1, grade:'八年級', decor:'greatwall', desc:'課綱歷史 H、I、K、L 主題', plan:['古典到傳統時代','區域內外的交流','東亞世界的延續與變遷','晚清的挑戰與回應','現代國家的興起','當代東亞局勢']},
  {id:'wdh', name:'世界史島', subj:'hist', g:2, grade:'九年級', decor:'pyramid', desc:'課綱歷史 N、O、Q 主題', plan:['多元並立的古代文化','普世宗教','近代歐洲的興起','多元世界的互動','現代國家的建立','帝國主義','戰爭與現代社會']},
  {id:'twg', name:'臺灣地理島', subj:'geo', g:0, grade:'七年級', decor:'yushan', desc:'課綱地理 A 主題與 C 議題', plan:['世界中的臺灣','地形與海域','氣候與水文','人口與文化','產業發展','區域發展','地名文化','農業與食品安全']},
  {id:'asg', name:'亞洲島', subj:'geo', g:1, grade:'八年級', decor:'pagoda', desc:'課綱地理 Ba、Bb、Bd、Be、Bf', plan:['中國（一）','中國（二）','東北亞','東南亞與南亞','西亞與北非']},
  {id:'wdg', name:'世界島', subj:'geo', g:2, grade:'九年級', decor:'lighthouse', desc:'課綱地理 Bc、Bg、Bh、Bi', plan:['大洋洲與兩極','漠南非洲','歐洲與俄羅斯','美洲']},
  {id:'soc', name:'社會生活島', subj:'civ', g:0, grade:'七年級', decor:'houses', desc:'公民身分、家庭、學校與社區', plan:['公民身分與人性尊嚴','性別平等','家庭','學校與社區','社會團體','文化與社會規範']},
  {id:'law', name:'政治與法律島', subj:'civ', g:1, grade:'八年級', decor:'parliament', desc:'民主政治、政府與法律', plan:['民主政治','權力分立與政府','選舉與參與','地方自治','法律基本概念','民法','刑法與少年事件','行政救濟']},
  {id:'eco', name:'經濟與全球島', subj:'civ', g:2, grade:'九年級', decor:'market', desc:'經濟生活與全球化', plan:['選擇與機會成本','市場與價格','貨幣與金融','勞動','政府的經濟角色','全球化與國際關係']}
];
// 題庫資料已載入的島自動開放：小主題編號為島代號＋章次（例如 cnh1）
ISLANDS.forEach(isl=>{ if(!isl.ready && isl.plan && isl.plan.every((_,i)=>GEN[isl.id+(i+1)])){ isl.ready=true; isl.lms=isl.plan.map((nm,i)=>({id:isl.id+(i+1),name:nm,unit:'第'+(i+1)+'章 '+nm,ci:i})); } });
const ISL = Object.fromEntries(ISLANDS.map(i=>[i.id,i]));
const LM_INFO = {}; ISLANDS.forEach(i=>(i.lms||[]).forEach(l=>{ LM_INFO[l.id]=Object.assign({isl:i.id},l); }));
// 建造中島嶼的章節小島（只有模型，題目之後補）
const CHAP_INFO={}; ISLANDS.forEach(i=>{ if(!i.ready) i.plan.forEach((nm,k)=>{ CHAP_INFO[i.id+'-'+k]={isl:i.id,i:k,name:nm}; }); });
const DIFF = {1:{name:'簡單',css:'var(--d1)'},2:{name:'中等',css:'var(--d2)'},3:{name:'困難',css:'var(--d3)'}};

/* ---------- 題庫 ---------- */
const BANK = buildBank(HAND, GEN, PERIODS);
// 因果航線題：連接兩座章節小島
BANK._lk=[]; LINKS.forEach((L,li)=>L.qs.forEach((h,i)=>BANK._lk.push({id:'lk-'+L.a+'-'+L.b+'-'+i,lm:'_lk',link:li,d:h[0],q:h[1],c:h[2],w:[h[3],h[4],h[5]],ex:h[6],src:'h'})));
function linkPool(i){ const L=LINKS[i]; return BANK._lk.filter(q=>q.link===i).concat((BANK[L.a]||[]).filter(q=>q.t==='cause'),(BANK[L.b]||[]).filter(q=>q.t==='cause')); }
// 跨科航線題：連接不同島的章節
BANK._cx=[]; CROSS.forEach((L,ci)=>L.qs.forEach((h,i)=>BANK._cx.push({id:'cx-'+L.a+'-'+L.b+'-'+i,lm:'_cx',cx:ci,d:h[0],q:h[1],c:h[2],w:[h[3],h[4],h[5]],ex:h[6],src:'h'})));
function crossPool(i){ const L=CROSS[i]; return BANK._cx.filter(q=>q.cx===i).concat((BANK[L.a]||[]).filter(q=>q.t==='cause'),(BANK[L.b]||[]).filter(q=>q.t==='cause')); }
const lmName=k=>LM_INFO[k]?LM_INFO[k].name:(k==='_x'?'跨時期':k==='_lk'?'因果航線':k==='_cx'?'跨科航線':'');
const PV = {};
Object.keys(PREVIEW).forEach(k=>{ PV[k]=PREVIEW[k].map((h,i)=>({id:'pv-'+k+'-'+i,lm:'_pv',d:h[0],q:h[1],c:h[2],w:[h[3],h[4],h[5]],ex:h[6]})); });
function islandPool(id){
  const isl=ISL[id];
  if(isl.ready) return isl.lms.reduce((a,l)=>a.concat(BANK[l.id]||[]),[]).concat(id==='twh'?BANK._x.concat(BANK._lk):[]);
  return PV[id]||[];
}
const ALL_READY = ISLANDS.filter(i=>i.ready).reduce((a,i)=>a.concat(islandPool(i.id)),[]).concat(BANK._cx);
function dueList(){ const t=today(); return ALL_READY.filter(q=>{ const r=ST.q[q.id]; return r && r[4]!=null && r[4]<=t; }).sort((a,b)=>ST.q[a.id][4]-ST.q[b.id][4]); }

/* ---------- 作答紀錄（只存在這個瀏覽器） ---------- */
const STORE_KEY='shehui-archipelago-v2';
let ST={q:{},diff:'mix',n:10,flag:{}};
try{ const raw=JSON.parse(localStorage.getItem(STORE_KEY)||'null'); if(raw && raw.q) ST=Object.assign(ST,raw); }catch(e){}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(ST)); }catch(e){} schedulePush(); }
/* ---------- 帳號同步：進度存在使用者自己的私人資料（別人看不到），本機仍保留一份 ---------- */
let cloud=null, pushT=0, pushing=false, pushAgain=false;
function syncLabel(txt,on){ const el=document.getElementById('syncText'); if(el){ el.textContent=txt; el.classList.toggle('on',!!on); } }
function mergeST(remote){
  if(!remote || !remote.q) return false; let changed=false;
  Object.keys(remote.q).forEach(id=>{ const a=ST.q[id], b=remote.q[id]; if(!a || (b && b[0]>a[0])){ ST.q[id]=b; changed=true; } });
  Object.keys(remote.flag||{}).forEach(id=>{ if(!ST.flag[id]){ ST.flag[id]=1; changed=true; } });
  migrateDue();
  return changed;
}
function schedulePush(){ if(!cloud) return; clearTimeout(pushT); pushT=setTimeout(pushNow,2500); }
async function pushNow(){
  if(!cloud) return; if(pushing){ pushAgain=true; return; }
  pushing=true;
  try{ await cloud.set({st:JSON.stringify({q:ST.q,flag:ST.flag}),at:Date.now(),v:2}); syncLabel('進度已同步到你的帳號',true); }
  catch(e){ if(e && (e.code==='invalid_argument'||e.code==='not_granted'||e.code==='revoked')){ cloud=null; syncLabel('進度存在這台裝置'); } else syncLabel('同步暫時失敗，稍後重試'); }
  pushing=false; if(pushAgain){ pushAgain=false; schedulePush(); }
}
(async function initCloud(){
  try{
    if(!window.claude || !claude.use) return;
    const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);
    if(!db || !user) return;
    const uid=await user.id(); if(!uid) return;
    const ref=db.doc('data/users/'+uid+'/progress');
    syncLabel('正在讀取帳號進度…');
    const snap=await ref.get();
    let remote=null; if(snap.exists){ try{ remote=JSON.parse(snap.data().st); }catch(e){} }
    cloud=ref;
    if(mergeST(remote)){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(ST)); }catch(e){} growthPrev=null; refreshProgress(); if(!S && !cardEl.hidden) renderCard(); }
    syncLabel('進度已同步到你的帳號',true);
    if(!remote || Object.keys(ST.q).length>Object.keys(remote.q||{}).length) schedulePush();
    window.addEventListener('pagehide',()=>{ if(pushT){ clearTimeout(pushT); pushNow(); } });
    document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden' && pushT){ clearTimeout(pushT); pushNow(); } });
  }catch(e){ cloud=null; syncLabel('進度存在這台裝置'); }
})();
// 紀錄格式：[作答次數, 答對次數, 最近一次是否答對, 連續答對次數]
// 間隔複習：紀錄第 5 欄是「下次複習日」（本地日期序號）。答對後依連續答對次數隔 1、3、7、14、30、60 天；答錯隔天再出現
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/86400000);
const INTV=[1,1,3,7,14,30,60];
function record(id,ok){ const r=ST.q[id]||[0,0,0,0]; const st=r[3]!=null?r[3]:(r[2]?1:0); r[0]++; if(ok) r[1]++; r[2]=ok?1:0; r[3]=ok?st+1:0; r[4]=today()+(ok?INTV[Math.min(r[3],6)]:1); ST.q[id]=r; save(); return r[4]-today(); }
// 舊紀錄沒有複習日：答錯的今天就到期，答對的依連續次數排定
function migrateDue(){ const t=today(); Object.keys(ST.q).forEach(id=>{ const r=ST.q[id]; if(r && r[4]==null){ const st=r[3]!=null?r[3]:(r[2]?1:0); r[4]=r[2]?t+INTV[Math.min(st,6)]:t; } }); }
migrateDue();
const streakOf=r=>r?(r[3]!=null?r[3]:(r[2]?1:0)):0;
const MASTER=2;
function statsOf(list){
  let seen=0,mast=0,att=0,cor=0,ok=0;
  list.forEach(q=>{ const r=ST.q[q.id]; if(r){ seen++; att+=r[0]; cor+=r[1]; if(r[2]) ok++; if(streakOf(r)>=MASTER) mast++; } });
  return {total:list.length, seen, mast, ok, acc: att? cor/att : null, att};
}
const pct=x=>x==null?'—':Math.round(x*100)+'%';
// 島嶼成長：看「目前答對中」的題數（最近一次答對就算），達 8%／25%／50% 各長出一階
// 答錯會把那題扣回來；最近答錯 4 題以上且答對率低於七成會起霧
const STAGES=[0.08,0.25,0.5], STAGE_NAME=['荒島','小聚落','熱鬧聚落','繁榮之島'];
function growthOf(id){ const list=BANK[id], t=statsOf(list);
  const ok=list.filter(q=>ST.q[q.id]&&ST.q[q.id][2]).length, m=ok/t.total; let stage=0; STAGES.forEach((x,i)=>{ if(m>=x) stage=i+1; });
  const wrong=list.filter(q=>ST.q[q.id]&&!ST.q[q.id][2]).length;
  const need=stage<3?Math.max(1,Math.ceil(STAGES[stage]*t.total)-ok):0;
  return {stage, fog: wrong>=4 && t.acc!=null && t.acc<0.7, wrong, m, ok, need}; }

const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = s=>document.querySelector(s);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// 排序題的選項拆成一行一步
function fmtOpt(o){ const parts=String(o).split(/\s*→\s*/); return parts.length>1 ? '<span class="seq">'+parts.map(x=>'<span class="seqi">'+esc(x)+'</span>').join('<span class="arr" aria-label="接著">→</span>')+'</span>' : esc(o); }
// 題目附圖：氣候圖、人口金字塔、堆疊長條圖（以 SVG 繪製，跟著深淺色主題）
function figSVG(f){
  const W=320, H=200, L=38, R=34, T=14, B=30, pw=W-L-R, ph=H-T-B;
  const tx=(x,y,t,a,cls)=>'<text x="'+x+'" y="'+y+'" text-anchor="'+(a||'middle')+'" class="'+(cls||'fx')+'">'+esc(t)+'</text>';
  let g='';
  if(f.t==='climate'){
    const tmin=Math.min(0,Math.floor(Math.min(...f.temp)/10)*10), tmax=Math.max(30,Math.ceil(Math.max(...f.temp)/10)*10), nt=(tmax-tmin)/10;
    const rstep=Math.max(25,Math.ceil(Math.max(...f.rain)/nt/25)*25), rmax=rstep*nt;
    const bw=pw/12, ty=v=>T+ph-(v-tmin)/(tmax-tmin)*ph;
    for(let k=0;k<=nt;k++){ const y=T+ph*k/nt; g+='<line x1="'+L+'" x2="'+(L+pw)+'" y1="'+y+'" y2="'+y+'" class="fg"/>'+tx(L-4,y+4,rmax-rstep*k,'end')+tx(L+pw+4,y+4,tmax-10*k,'start'); }
    f.rain.forEach((v,i)=>{ const h=v/rmax*ph; g+='<rect x="'+(L+i*bw+2)+'" y="'+(T+ph-h)+'" width="'+(bw-4)+'" height="'+h+'" class="fr"/>'; });
    g+='<polyline points="'+f.temp.map((v,i)=>(L+i*bw+bw/2)+','+ty(v)).join(' ')+'" class="ft"/>';
    f.temp.forEach((v,i)=>{ g+='<circle cx="'+(L+i*bw+bw/2)+'" cy="'+ty(v)+'" r="2.6" class="ftd"/>'; });
    for(let i=0;i<12;i++) g+=tx(L+i*bw+bw/2,H-B+14,i+1);
    g+=tx(L-4,H-4,'雨量 mm','end','fx fs')+tx(L+pw/2,H-4,'月','middle','fx fs')+tx(L+pw+4,H-4,'氣溫 °C','start','fx fs');
  } else if(f.t==='pyramid'){
    const n=f.m.length, cx=L+pw/2, mx=Math.max(...f.m,...f.f), bh=ph/n, sc=v=>v/mx*(pw/2-18);
    f.m.forEach((v,i)=>{ const y=T+ph-(i+1)*bh; g+='<rect x="'+(cx-14-sc(v))+'" y="'+(y+1)+'" width="'+sc(v)+'" height="'+(bh-2)+'" class="fm"/><rect x="'+(cx+14)+'" y="'+(y+1)+'" width="'+sc(f.f[i])+'" height="'+(bh-2)+'" class="ff"/>'+tx(cx,y+bh/2+4,f.ages[i],'middle','fx fs'); });
    g+=tx(L+20,H-6,'男','middle')+tx(L+pw-20,H-6,'女','middle')+tx(cx,H-6,'年齡','middle','fx fs');
  } else if(f.t==='stack'){
    const n=f.labels.length, bw=pw/n, cols=['fs1','fs2','fs3','fs4'];
    for(let k=0;k<=4;k++){ const y=T+ph*k/4; g+='<line x1="'+L+'" x2="'+(L+pw)+'" y1="'+y+'" y2="'+y+'" class="fg"/>'+tx(L-4,y+4,(100-25*k)+'%','end'); }
    f.labels.forEach((lb,i)=>{ let acc=0; f.series.forEach((s,j)=>{ const v=s.vals[i], h=v/100*ph; g+='<rect x="'+(L+i*bw+bw*0.2)+'" y="'+(T+ph-acc-h)+'" width="'+(bw*0.6)+'" height="'+h+'" class="'+cols[j]+'"/>'; if(h>14) g+=tx(L+i*bw+bw/2,T+ph-acc-h/2+4,v,'middle','fx fin'); acc+=h; }); g+=tx(L+i*bw+bw/2,H-B+14,lb); });
    g+=f.series.map((s,j)=>'<rect x="'+(L+j*86)+'" y="'+(H-12)+'" width="9" height="9" class="'+cols[j]+'"/>'+tx(L+j*86+13,H-4,s.name,'start','fx fs')).join('');
  }
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(f.s||'題目附圖')+'">'+g+'</svg>'+(f.s?'<figcaption>'+esc(f.s)+'</figcaption>':'');
}
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

// 抽題：優先抽沒做過的，其次是上次答錯的，最後才是答對過的
function draw(list,n,diff){
  let pool = diff==='mix' ? list : list.filter(q=>q.d===+diff);
  if(!pool.length) pool=list;
  const scored=pool.map(q=>{ const r=ST.q[q.id]; let p = !r ? 0 : (!r[2] ? 1 : (streakOf(r)<MASTER ? 1.5 : 2.2+r[0]*0.25)); return {q, p:p+Math.random()*0.95}; });
  scored.sort((a,b)=>a.p-b.p);
  // 同一輪避免出現考同一件事的題目（同一筆資料的正反題、精寫題與生成題重疊）
  const used=new Set(), pick=[], rest=[];
  scored.forEach(x=>{ if(pick.length>=n) return; const tg=x.q.tags||[]; if(tg.some(g=>used.has(g))){ rest.push(x); return; } tg.forEach(g=>used.add(g)); pick.push(x); });
  for(let i=0;pick.length<n && i<rest.length;i++) pick.push(rest[i]);
  return shuffle(pick.map(x=>x.q));
}

/* ---------- 標籤與島嶼列 ---------- */
const labelsEl=$('#labels'), dockEl=$('#dock');
const islLabel={}, lmLabel={}, chipEl={}, lmChip={}, linkLabel=[], linkChip=[], chapLabel={}, chapChip={}, crossLabel=[];
ISLANDS.forEach(isl=>{
  const b=document.createElement('button');
  b.type='button'; b.className='tag3d island'+(isl.ready?'':' wip'); b.style.setProperty('--c',SUBJ[isl.subj].css);
  b.innerHTML='<span class="ring"></span><span class="col"><span class="nm">'+isl.name+'</span><span class="sc"></span></span>';
  b.addEventListener('click',()=>focusIsland(isl.id));
  b.addEventListener('pointerenter',()=>setHover({isl:isl.id}));
  b.addEventListener('pointerleave',()=>setHover(null));
  labelsEl.appendChild(b); islLabel[isl.id]=b;

  const c=document.createElement('button');
  c.type='button'; c.className='chip'+(isl.ready?'':' wip'); c.style.setProperty('--c',SUBJ[isl.subj].css);
  c.innerHTML='<span class="dot"></span><span class="txt"><span class="nm">'+isl.name+'</span><span class="subrow"><span class="sub"></span><span class="mini" aria-hidden="true"><i></i></span></span></span>';
  c.addEventListener('click',()=>focusIsland(isl.id));
  dockEl.appendChild(c); chipEl[isl.id]=c;

  (isl.lms||[]).forEach(l=>{
    const t=document.createElement('button');
    t.type='button'; t.className='tag3d'; t.style.setProperty('--c',SUBJ[isl.subj].css); t.hidden=true;
    t.innerHTML='<span class="ring"></span><span class="nm">'+(isl.ready?'<span class="no">'+(isl.lms.indexOf(l)+1)+'</span>':'')+l.name+'</span><span class="sc"></span>';
    t.addEventListener('click',()=>focusLm(l.id));
    t.addEventListener('pointerenter',()=>setHover({lm:l.id}));
    t.addEventListener('pointerleave',()=>setHover(null));
    labelsEl.appendChild(t); lmLabel[l.id]=t;

    const lc=document.createElement('button');
    lc.type='button'; lc.className='chip lmchip'; lc.style.setProperty('--c',SUBJ[isl.subj].css); lc.hidden=true;
    lc.innerHTML='<span class="dot"></span><span class="txt"><span class="nm">'+l.name+'</span><span class="subrow"><span class="sub"></span><span class="mini" aria-hidden="true"><i></i></span></span></span>';
    lc.addEventListener('click',()=>focusLm(l.id));
    dockEl.appendChild(lc); lmChip[l.id]=lc;
  });
});

CROSS.forEach((L,i)=>{ const t=document.createElement('button'); t.type='button'; t.className='linktag cxtag'; t.hidden=true;
  t.innerHTML='<span class="lk-ic" aria-hidden="true">⛵</span><span class="lk-t">'+esc(L.title)+'</span>'; t.setAttribute('aria-label','跨科航線：'+L.title);
  t.addEventListener('click',()=>focusCross(i)); labelsEl.appendChild(t); crossLabel[i]=t; });
Object.keys(CHAP_INFO).forEach(id=>{
  const ci=CHAP_INFO[id], isl=ISL[ci.isl];
  const t=document.createElement('button'); t.type='button'; t.className='tag3d wip'; t.style.setProperty('--c',SUBJ[isl.subj].css); t.hidden=true;
  t.innerHTML='<span class="ring"></span><span class="nm"><span class="no">'+(ci.i+1)+'</span>'+esc(ci.name)+'</span>';
  t.addEventListener('click',()=>focusChap(id));
  t.addEventListener('pointerenter',()=>setHover({lm:id})); t.addEventListener('pointerleave',()=>setHover(null));
  labelsEl.appendChild(t); chapLabel[id]=t;
  const c=document.createElement('button'); c.type='button'; c.className='chip lmchip wip'; c.style.setProperty('--c',SUBJ[isl.subj].css); c.hidden=true;
  c.innerHTML='<span class="dot"></span><span class="txt"><span class="nm">'+esc(ci.name)+'</span><span class="subrow"><span class="sub">第 '+(ci.i+1)+' 章．建造中</span></span></span>';
  c.addEventListener('click',()=>focusChap(id)); dockEl.appendChild(c); chapChip[id]=c;
});
LINKS.forEach((L,i)=>{
  const t=document.createElement('button'); t.type='button'; t.className='linktag'; t.hidden=true;
  t.innerHTML='<span class="lk-ic" aria-hidden="true">⇢</span><span class="lk-t">'+esc(L.title)+'</span>'; t.setAttribute('aria-label','因果航線：'+L.title); t.title=LM_INFO[L.a].name+' → '+LM_INFO[L.b].name+'：'+L.title;
  t.addEventListener('click',()=>focusLink(i));
  t.addEventListener('pointerenter',()=>setHover({link:i})); t.addEventListener('pointerleave',()=>setHover(null));
  labelsEl.appendChild(t); linkLabel[i]=t;
  const c=document.createElement('button'); c.type='button'; c.className='chip lkchip'; c.hidden=true;
  c.innerHTML='<span class="lk-ic" aria-hidden="true">⇢</span><span class="txt"><span class="nm">'+esc(L.title)+'</span><span class="subrow"><span class="sub">'+LM_INFO[L.a].name+' → '+LM_INFO[L.b].name+'</span></span></span>';
  c.addEventListener('click',()=>focusLink(i)); dockEl.appendChild(c); linkChip[i]=c;
});
const hubLabel=document.createElement('button'); hubLabel.type='button'; hubLabel.className='tag3d island hubtag'; hubLabel.innerHTML='<span class="ring"></span><span class="col"><span class="nm">🍾 錯題島</span><span class="sc"></span></span>';
hubLabel.addEventListener('click',()=>focusHub()); labelsEl.appendChild(hubLabel);
{ const c=document.createElement('button'); c.type='button'; c.className='chip hubchip'; c.id='hubChip';
  c.innerHTML='<span class="lk-ic" aria-hidden="true">🍾</span><span class="txt"><span class="nm">錯題島</span><span class="subrow"><span class="sub"></span></span></span>';
  c.addEventListener('click',()=>focusHub()); dockEl.insertBefore(c,dockEl.firstChild); }
{ const c=document.createElement('button'); c.type='button'; c.className='chip cxchip'; c.id='crossChip';
  c.innerHTML='<span class="lk-ic" aria-hidden="true">⛵</span><span class="txt"><span class="nm">跨科航線</span><span class="subrow"><span class="sub">'+CROSS.length+' 條．三科串連</span></span></span>';
  c.addEventListener('click',()=>{ markInteracted(); renderCrossList(); }); dockEl.appendChild(c); }
const toastEl=document.createElement('div'); toastEl.className='toast'; toastEl.hidden=true; toastEl.setAttribute('role','status'); document.body.appendChild(toastEl);
let toastT=0;
function toast(msg){ toastEl.textContent=msg; toastEl.hidden=false; toastEl.classList.remove('out'); clearTimeout(toastT); toastT=setTimeout(()=>{ toastEl.classList.add('out'); setTimeout(()=>{ toastEl.hidden=true; },400); },3600); }
// 把成長狀態交給 3D 場景；升階時跳出提示（第一次載入不提示）
let growthPrev=null;
function syncGrowth(){
  const map={}; ISLANDS.filter(i=>i.ready).forEach(isl=>isl.lms.forEach(l=>{ map[l.id]=growthOf(l.id); }));
  if(growthPrev){ Object.keys(map).forEach(id=>{ const a=growthPrev[id], b=map[id];
    if(b.stage>a.stage) toast(LM_INFO[id].name+'升級為「'+STAGE_NAME[b.stage]+'」！');
    else if(a.fog && !b.fog) toast(LM_INFO[id].name+'的霧散了，錯題都補回來了。'); }); }
  growthPrev=map; if(scene3d) scene3d.setGrowth(map);
}
function refreshProgress(){
  syncGrowth();
  ISLANDS.forEach(isl=>{
    const sub=chipEl[isl.id].querySelector('.sub'), ls=islLabel[isl.id].querySelector('.sc');
    if(isl.ready){
      const s=statsOf(islandPool(isl.id)); const p=s.ok/s.total*100;
      sub.textContent=isl.grade; chipEl[isl.id].querySelector('.mini i').style.width=p.toFixed(1)+'%'; chipEl[isl.id].title=isl.name+'：答對 '+Math.round(p)+'%';
      ls.textContent=isl.grade+'．'+s.total+' 題';
      islLabel[isl.id].style.setProperty('--p',p.toFixed(1));
      isl.lms.forEach(l=>{ const t=statsOf(BANK[l.id]); lmLabel[l.id].querySelector('.sc').textContent=t.ok+'/'+t.total; lmLabel[l.id].style.setProperty('--p',(t.ok/t.total*100).toFixed(1)); });
    } else {
      sub.textContent=isl.grade+'．建造中'; ls.textContent=isl.grade+'．建造中'; chipEl[isl.id].querySelector('.mini').hidden=true;
      islLabel[isl.id].style.setProperty('--p','0');
    }
    chipEl[isl.id].classList.toggle('on', focusId===isl.id);
  });
  // 飛到完工的島時，底部列換成這座島的小主題
  const showLm = !!(focusId && ISL[focusId].ready);
  const showCh = !!(focusId && !ISL[focusId].ready);
  ISLANDS.forEach(isl=>{ chipEl[isl.id].hidden=showLm||showCh; });
  { const cc=$('#crossChip'); if(cc) cc.hidden=showLm||showCh; }
  Object.keys(chapChip).forEach(id=>{ const c=chapChip[id]; c.hidden=!(showCh && CHAP_INFO[id].isl===focusId); c.classList.toggle('on',chapFocus===id); if(chapFocus===id && !c.hidden) c.scrollIntoView({block:'nearest',inline:'center',behavior:reduceMotion?'auto':'smooth'}); });
  LINKS.forEach((L,i)=>{ const c=linkChip[i]; c.hidden=!(showLm && LM_INFO[L.a].isl===focusId); c.classList.toggle('on',linkFocus===i); if(linkFocus===i && !c.hidden) c.scrollIntoView({block:'nearest',inline:'center',behavior:reduceMotion?'auto':'smooth'}); });
  Object.keys(lmChip).forEach(id=>{
    const c=lmChip[id], info=LM_INFO[id];
    c.hidden=!(showLm && info.isl===focusId);
    const t=statsOf(BANK[id]);
    c.querySelector('.sub').textContent=info.unit.split(' ')[0]; c.querySelector('.mini i').style.width=(t.ok/t.total*100).toFixed(1)+'%'; c.title=info.name+'：答對 '+t.ok+' / '+t.total+' 題';
    c.classList.toggle('on', lmFocus===id);
    if(lmFocus===id && !c.hidden) c.scrollIntoView({block:'nearest',inline:'center',behavior:reduceMotion?'auto':'smooth'});
  });
  document.body.classList.toggle('focused', !!focusId||crossFocus!=null||hubFocus);
  { const wc=wrongCounts(), wn=wc.hist+wc.geo+wc.civ; if(scene3d && scene3d.setWrong) scene3d.setWrong(wc); hubLabel.querySelector('.sc').textContent=wn?wn+' 支漂流瓶':'沒有錯題'; const hc=$('#hubChip'); if(hc){ hc.querySelector('.sub').textContent=wn?wn+' 題待訂正':'沒有錯題'; hc.hidden=!!(focusId); } }
  const due=dueList().length, rb=$('#reviewBtn');
  if(rb){ rb.textContent=due?'今日複習 '+due+' 題':'今日複習 ✓'; rb.disabled=!due; rb.classList.toggle('hasdue',!!due); rb.title=due?'今天到期該複習的題目':'今天沒有到期的題目'; }
  const s=statsOf(ALL_READY);
  $('#barFill').style.width=(s.ok/s.total*100).toFixed(1)+'%';
  $('#progressText').textContent='已答對 '+s.ok+' / '+s.total+' 題．熟練 '+s.mast+'．開放 '+ISLANDS.filter(i=>i.ready).length+' / '+ISLANDS.length+' 座島';
  $('#progressText').title='「答對」看最近一次作答；連續答對 2 次才算熟練，熟練的題目較少再被抽到';
}

/* ---------- 面板 ---------- */
const panel=$('#panel'), body=$('#panelBody');
let focusId=null, lmFocus=null, linkFocus=null, chapFocus=null, crossFocus=null, hubFocus=false, view=null, S=null;
const cardEl=$('#card');

function setHead(tag,title,sub,subj){
  $('#panelTag').innerHTML='<span class="dot" style="--c:'+SUBJ[subj].css+'"></span>'+esc(tag);
  $('#panelTitle').textContent=title; $('#panelSub').textContent=sub;
}
// 回到面板頂端：同時取消上一題還在進行的平滑捲動
function scrollTop0(){ try{ body.scrollTo({top:0,behavior:'instant'}); }catch(e){ body.scrollTop=0; } body.scrollTop=0; }
function openPanel(){ if(tourStep<0 && !tourEl.hidden) tourEl.hidden=true; if(tourStep>=0) endTour(); panel.hidden=false; cardEl.hidden=true; document.body.classList.add('panel-open'); }
function hidePanel(){ panel.hidden=true; document.body.classList.remove('panel-open'); view=null; }

/* 探索階段：先飛過去看，底部只留一張小卡；按下按鈕才打開面板 */
function focusIsland(id){
  if(!tourEl.hidden && tourStep<0) tourEl.hidden=true; if(tourStep>=0) endTour();
  focusId=id; lmFocus=null; linkFocus=null; chapFocus=null; hubFocus=false; crossFocus=null; S=null; markInteracted();
  hidePanel();
  $('#backBtn').hidden=false;
  if(scene3d) scene3d.focus(id);
  renderCard(); refreshProgress();
}
function focusLm(id){
  const info=LM_INFO[id]; if(!info) return;
  if(focusId!==info.isl){ focusId=info.isl; $('#backBtn').hidden=false; }
  lmFocus=id; linkFocus=null; chapFocus=null; hubFocus=false; crossFocus=null; S=null; markInteracted();
  hidePanel();
  if(scene3d) scene3d.focusLm(id);
  renderCard(); refreshProgress();
}
function focusLink(i){
  const L=LINKS[i]; if(!L) return; const isl=LM_INFO[L.a].isl;
  if(focusId!==isl){ focusId=isl; $('#backBtn').hidden=false; }
  linkFocus=i; lmFocus=null; chapFocus=null; hubFocus=false; crossFocus=null; S=null; markInteracted(); hidePanel();
  if(scene3d) scene3d.focusLink(i);
  renderCard(); refreshProgress();
}
function focusChap(id){
  const ci=CHAP_INFO[id]; if(!ci) return;
  if(focusId!==ci.isl){ focusId=ci.isl; $('#backBtn').hidden=false; }
  chapFocus=id; lmFocus=null; linkFocus=null; hubFocus=false; crossFocus=null; S=null; markInteracted(); hidePanel();
  if(scene3d) scene3d.focusLm(id);
  renderCard(); refreshProgress();
}
function stepChap(dir){ const ci=CHAP_INFO[chapFocus], n=ISL[ci.isl].plan.length; focusChap(ci.isl+'-'+((ci.i+dir+n)%n)); }
// 跨科航線：鏡頭同時看見兩座島，底部卡片說明因果
function focusCross(i){
  if(!CROSS[i]) return;
  focusId=null; lmFocus=null; linkFocus=null; chapFocus=null; hubFocus=false; crossFocus=i; S=null; markInteracted(); hidePanel();
  $('#backBtn').hidden=false;
  if(scene3d) scene3d.focusCross(i);
  renderCard(); refreshProgress();
}
// 錯題島：集中所有島上「最近一次答錯」的題目
const wrongAll=()=>ALL_READY.filter(q=>ST.q[q.id] && !ST.q[q.id][2]);
const subjOf=q=>{ const k=islOf(q); return k?ISL[k].subj:null; };
function wrongCounts(){ const c={hist:0,geo:0,civ:0}; wrongAll().forEach(q=>{ const sj=subjOf(q); if(sj) c[sj]++; }); return c; }
function focusHub(){
  focusId=null; lmFocus=null; linkFocus=null; chapFocus=null; crossFocus=null; hubFocus=true; S=null; markInteracted(); hidePanel();
  $('#backBtn').hidden=false;
  if(scene3d) scene3d.focusHub();
  renderCard(); refreshProgress();
}
function renderNotebookAll(filter){
  view='notebookAll'; S=null; filter=filter||'all';
  const all=wrongAll(), c=wrongCounts(), list=filter==='all'?all:all.filter(q=>subjOf(q)===filter);
  setHead('錯題島','錯題本','所有島上次答錯的 '+all.length+' 題，答對後會自動移出','hist'); openPanel();
  const chip=(id,name,n)=>'<button type="button" class="fchip" data-f="'+id+'" aria-pressed="'+(filter===id)+'">'+name+' '+n+'</button>';
  body.innerHTML='<div class="stickybar"><div class="filters">'+chip('all','全部',all.length)+chip('hist','歷史',c.hist)+chip('geo','地理',c.geo)+chip('civ','公民',c.civ)+'</div>'+
    '<div class="actions"><button type="button" class="btn primary" id="nbGo"'+(list.length?'':' disabled')+'>重練這 '+Math.min(list.length,Math.max(ST.n,10))+' 題</button><button type="button" class="btn" id="nbBack">返回</button></div></div>'+
    (list.length?'<ul class="wrong-list nb">'+list.map(q=>{ const k=islOf(q); return '<li><p class="nb-lm"><span class="dot" style="--c:'+(k?SUBJ[ISL[k].subj].css:'var(--muted)')+'"></span> '+esc((k?ISL[k].name+'．':'')+lmName(q.lm))+'．<span style="color:'+DIFF[q.d].css+'">'+DIFF[q.d].name+'</span></p>'+(q.ctx?'<p class="nb-ctx">'+esc(q.ctx)+'</p>':'')+(q.fig?'<figure class="qfig">'+figSVG(q.fig)+'</figure>':'')+'<p class="wq">'+esc(q.q)+'</p><div class="wa"><span class="fb-label">正解</span>'+fmtOpt(q.c)+'</div><p class="nb-ex">'+esc(q.ex)+'</p></li>'; }).join('')+'</ul>':'<p class="note">這裡沒有錯題了，做得好！</p>');
  body.querySelectorAll('.fchip').forEach(b=>b.addEventListener('click',()=>renderNotebookAll(b.dataset.f)));
  $('#nbGo').addEventListener('click',()=>startQuiz({scope:'wrong',subj:filter}));
  $('#nbBack').addEventListener('click',backToExplore);
  scrollTop0();
}
function stepCross(dir){ focusCross((crossFocus+dir+CROSS.length)%CROSS.length); }
function renderCrossList(){
  view='crosslist'; S=null;
  setHead('全部島嶼','跨科航線','小船往返於不同島的章節之間，連起歷史、地理與公民的因果','civ'); openPanel();
  body.innerHTML='<ul class="lm-list">'+CROSS.map((L,i)=>{ const A=LM_INFO[L.a], B=LM_INFO[L.b];
    return '<li><button type="button" class="lm-row" data-cx="'+i+'"><span class="lm-name">⛵ '+esc(L.title)+'</span><span class="lm-unit">'+esc(ISL[A.isl].name+'．'+A.name+' → '+ISL[B.isl].name+'．'+B.name)+'</span></button></li>'; }).join('')+'</ul>';
  body.querySelectorAll('[data-cx]').forEach(b=>b.addEventListener('click',()=>focusCross(+b.dataset.cx)));
  scrollTop0();
}
function stepLink(dir){ focusLink((linkFocus+dir+LINKS.length)%LINKS.length); }
function backToExplore(){
  S=null; hidePanel();
  if(hubFocus && scene3d) scene3d.focusHub(); else if(crossFocus!=null && scene3d) scene3d.focusCross(crossFocus); else if(linkFocus!=null && scene3d) scene3d.focusLink(linkFocus); else if(chapFocus && scene3d) scene3d.focusLm(chapFocus); else if(lmFocus && scene3d) scene3d.focusLm(lmFocus); else if(focusId && scene3d) scene3d.focus(focusId);
  renderCard(); refreshProgress();
}
function toOverview(){
  focusId=null; lmFocus=null; linkFocus=null; chapFocus=null; hubFocus=false; crossFocus=null; S=null; hidePanel();
  $('#backBtn').hidden=true; cardEl.hidden=true;
  if(scene3d) scene3d.overview();
  refreshProgress();
}
function stepLm(dir){
  const lms=ISL[focusId].lms; const i=lms.findIndex(l=>l.id===lmFocus);
  focusLm(lms[(i+dir+lms.length)%lms.length].id);
}
function renderCard(){
  if(hubFocus){
    const c=wrongCounts(), n=c.hist+c.geo+c.civ, due=dueList().length;
    const row=(k)=>'<span class="hubc"><span class="dot" style="--c:'+SUBJ[k].css+'"></span>'+SUBJ[k].name+' <b>'+c[k]+'</b></span>';
    cardEl.innerHTML='<div class="card-top"><div><span class="zone-tag">🍾 錯題島</span><h2 class="card-title">'+(n?'岸邊有 '+n+' 支漂流瓶':'沙灘上乾乾淨淨')+'</h2>'+
      '<p class="card-sub">各島上次答錯的題目會變成漂流瓶擱淺在這裡，答對後就會消失</p></div><button type="button" class="icon-btn" id="cUp" aria-label="回到群島">↑</button></div>'+
      '<p class="card-grow">'+row('hist')+row('geo')+row('civ')+(due?'<span class="fogtag">今日到期 '+due+' 題</span>':'')+'</p>'+
      '<div class="card-row"><button type="button" class="btn primary grow" id="hGo"'+(n?'':' disabled')+'>練錯題 '+Math.min(n,Math.max(ST.n,10))+' 題</button><button type="button" class="btn" id="hNb">錯題本</button></div>';
    $('#cUp').addEventListener('click',toOverview); $('#hGo').addEventListener('click',()=>startQuiz({scope:'wrong',subj:'all'})); $('#hNb').addEventListener('click',()=>renderNotebookAll('all'));
    cardEl.hidden=false; return;
  }
  if(crossFocus!=null){
    const L=CROSS[crossFocus], A=LM_INFO[L.a], B=LM_INFO[L.b], n=crossPool(crossFocus).length;
    const dot=k=>'<span class="dot" style="--c:'+SUBJ[ISL[k].subj].css+'"></span>';
    cardEl.innerHTML='<div class="card-top"><div><span class="zone-tag">⛵ 跨科航線．'+SUBJ[ISL[A.isl].subj].name+' → '+SUBJ[ISL[B.isl].subj].name+'</span><h2 class="card-title">'+esc(L.title)+'</h2>'+
      '<p class="card-sub">'+dot(A.isl)+' '+esc(ISL[A.isl].name+'．'+A.name)+'（原因）→ '+dot(B.isl)+' '+esc(ISL[B.isl].name+'．'+B.name)+'（結果）</p></div>'+
      '<button type="button" class="icon-btn" id="cUp" aria-label="回到群島">↑</button></div>'+
      '<p class="card-why">'+esc(L.why)+'</p><p class="card-stat">本航線 '+L.qs.length+' 題＋兩章的因果題，共 '+n+' 題</p>'+
      '<div class="card-row"><button type="button" class="icon-btn" id="cPrev" aria-label="上一條航線">‹</button><button type="button" class="btn primary grow" id="cGo">練這條航線 '+Math.min(ST.n,n)+' 題</button><button type="button" class="icon-btn" id="cNext" aria-label="下一條航線">›</button></div>';
    $('#cUp').addEventListener('click',toOverview); $('#cPrev').addEventListener('click',()=>stepCross(-1)); $('#cNext').addEventListener('click',()=>stepCross(1));
    $('#cGo').addEventListener('click',()=>startQuiz({scope:'cross',id:crossFocus}));
    cardEl.hidden=false; return;
  }
  if(!focusId){ cardEl.hidden=true; return; }
  const isl=ISL[focusId];
  const tag='<span class="zone-tag"><span class="dot" style="--c:'+SUBJ[isl.subj].css+'"></span>'+SUBJ[isl.subj].name+'．'+isl.grade+'</span>';
  if(chapFocus){
    const ci=CHAP_INFO[chapFocus], pv=PV[isl.id]||[];
    cardEl.innerHTML=
      '<div class="card-top"><div>'+tag+'<h2 class="card-title">'+esc(ci.name)+'</h2><p class="card-sub">'+isl.name+'．第 '+(ci.i+1)+' 個小主題．模型已完成，題目建造中</p></div>'+
      '<button type="button" class="icon-btn" id="cUp" aria-label="回到全島">↑</button></div>'+
      '<div class="card-row"><button type="button" class="icon-btn" id="cPrev" aria-label="上一個小主題">‹</button>'+
      (pv.length?'<button type="button" class="btn primary grow" id="cPv">全島預覽題（'+pv.length+' 題）</button>':'<span class="grow"></span>')+
      '<button type="button" class="icon-btn" id="cNext" aria-label="下一個小主題">›</button></div>';
    $('#cUp').addEventListener('click',()=>focusIsland(focusId));
    $('#cPrev').addEventListener('click',()=>stepChap(-1));
    $('#cNext').addEventListener('click',()=>stepChap(1));
    const b=$('#cPv'); if(b) b.addEventListener('click',()=>startQuiz({scope:'preview',id:isl.id}));
  } else if(linkFocus!=null){
    const L=LINKS[linkFocus], n=linkPool(linkFocus).length;
    cardEl.innerHTML=
      '<div class="card-top"><div>'+tag+'<h2 class="card-title"><span class="lk-ic" aria-hidden="true">⇢</span> '+esc(L.title)+'</h2><p class="card-sub">因果航線．'+LM_INFO[L.a].name+'（原因）→ '+LM_INFO[L.b].name+'（結果）</p></div>'+
      '<button type="button" class="icon-btn" id="cUp" aria-label="回到全島">↑</button></div>'+
      '<p class="card-why">'+esc(L.why)+'</p>'+
      '<p class="card-stat">本線 '+L.qs.length+' 題＋兩島的因果題，共 '+n+' 題</p>'+
      '<div class="card-row"><button type="button" class="icon-btn" id="cPrev" aria-label="上一條航線">‹</button>'+
      '<button type="button" class="btn primary grow" id="cGo">練這條因果 '+Math.min(ST.n,n)+' 題</button>'+
      '<button type="button" class="icon-btn" id="cNext" aria-label="下一條航線">›</button></div>';
    $('#cUp').addEventListener('click',()=>focusIsland(focusId));
    $('#cPrev').addEventListener('click',()=>stepLink(-1));
    $('#cNext').addEventListener('click',()=>stepLink(1));
    $('#cGo').addEventListener('click',()=>startQuiz({scope:'link',id:linkFocus}));
  } else if(lmFocus){
    const l=LM_INFO[lmFocus], t=statsOf(BANK[lmFocus]), gr=growthOf(lmFocus);
    const dots=[1,2,3].map(k=>'<i class="'+(gr.stage>=k?'on':'')+'"></i>').join('');
    const nxt=gr.stage<3?'．再答對 '+gr.need+' 題升級':'';
    cardEl.innerHTML=
      '<div class="card-top"><div>'+tag+'<h2 class="card-title">'+l.name+'</h2><p class="card-sub">'+l.unit+'</p></div>'+
      '<button type="button" class="icon-btn" id="cUp" aria-label="回到全島">↑</button></div>'+
      '<p class="card-stat">'+t.total+' 題．做過 '+t.seen+' 題．答對率 '+pct(t.acc)+'．難度：'+(ST.diff==='mix'?'混合':DIFF[ST.diff].name)+'</p>'+
      '<p class="card-grow"><span class="gdots" aria-hidden="true">'+dots+'</span>'+STAGE_NAME[gr.stage]+nxt+(gr.fog?'<span class="fogtag">起霧中：最近答錯 '+gr.wrong+' 題</span>':'')+'</p>'+
      '<div class="card-row"><button type="button" class="icon-btn" id="cPrev" aria-label="上一個地標">‹</button>'+
      '<button type="button" class="btn primary grow" id="cGo">開始答題 '+ST.n+' 題</button>'+
      '<button type="button" class="icon-btn" id="cNext" aria-label="下一個地標">›</button></div>';
    $('#cUp').addEventListener('click',()=>focusIsland(focusId));
    $('#cPrev').addEventListener('click',()=>stepLm(-1));
    $('#cNext').addEventListener('click',()=>stepLm(1));
    $('#cGo').addEventListener('click',()=>startQuiz({scope:'lm',id:lmFocus}));
  } else if(isl.ready){
    const s=statsOf(islandPool(isl.id));
    cardEl.innerHTML=
      '<div class="card-top"><div>'+tag+'<h2 class="card-title">'+isl.name+'</h2><p class="card-sub">'+(isl.id==='twh'?'8 座章節小島依時代排成一圈，外圍的白色光點是時代航道，光點從最早的時代流向最近的時代．發光弧線是跨章節的因果題':isl.lms.length+' 座章節小島'+(isl.subj==='hist'?'依時代排成一圈，外圍白色光點是依時代流動的時代航道':'圍繞主島')+'．點小島近看單元模型．答對越多，小島越熱鬧')+'</p></div></div>'+
      '<p class="card-stat">'+s.total+' 題．做過 '+s.seen+' 題．答對率 '+pct(s.acc)+'</p>'+
      '<div class="card-row"><button type="button" class="btn primary" id="cAll">整座島隨機 '+ST.n+' 題</button><button type="button" class="btn" id="cPanel">難度與統計</button></div>';
    $('#cAll').addEventListener('click',()=>startQuiz({scope:'island',id:isl.id}));
    $('#cPanel').addEventListener('click',renderIsland);
  } else {
    const pv=PV[isl.id]||[];
    cardEl.innerHTML=
      '<div class="card-top"><div>'+tag+'<h2 class="card-title">'+isl.name+'</h2><p class="card-sub">建造中．'+isl.plan.length+' 座章節小島的模型已完成，點小島近看</p></div></div>'+
      '<div class="card-row">'+(pv.length?'<button type="button" class="btn primary" id="cPv">預覽題 '+pv.length+' 題</button>':'')+'<button type="button" class="btn" id="cPanel">預計的小主題</button></div>';
    const p=$('#cPv'); if(p) p.addEventListener('click',()=>startQuiz({scope:'preview',id:isl.id}));
    $('#cPanel').addEventListener('click',renderIsland);
  }
  cardEl.hidden=false;
}

function renderIsland(){
  const isl=ISL[focusId]; view='island'; S=null;
  setHead(SUBJ[isl.subj].name+'．'+isl.grade, isl.name, isl.desc, isl.subj);
  openPanel();
  if(isl.ready){
    const pool=islandPool(isl.id), s=statsOf(pool);
    const weak=pool.filter(q=>ST.q[q.id] && !ST.q[q.id][2]);
    // 找出答對率最低的小主題（至少作答 5 次）
    let worst=null;
    isl.lms.forEach(l=>{ const t=statsOf(BANK[l.id]); if(t.att>=5 && t.acc<0.8 && (!worst || t.acc<worst.acc)) worst={id:l.id,acc:t.acc}; });
    const diffBtns=[['mix','混合'],['1','簡單'],['2','中等'],['3','困難']].map(([v,n])=>'<button type="button" role="radio" data-d="'+v+'" aria-checked="'+(ST.diff===v)+'">'+n+'</button>').join('');
    const dCount=k=>pool.filter(q=>q.d===k).length;
    const nBtns=[5,10,20].map(n=>'<button type="button" role="radio" data-n="'+n+'" aria-checked="'+(ST.n===n)+'">'+n+' 題</button>').join('');
    body.innerHTML=
      '<div class="stats"><div class="stat"><b>'+s.total+'</b><span>題庫總數</span></div><div class="stat"><b>'+s.seen+'</b><span>做過的題目</span></div><div class="stat"><b>'+pct(s.acc)+'</b><span>答對率</span></div></div>'+
      '<p class="section-label">難度</p><div class="seg" role="radiogroup" aria-label="難度">'+diffBtns+'</div>'+
      '<p class="seg-note">簡單 '+dCount(1)+' 題．中等 '+dCount(2)+' 題．困難 '+dCount(3)+' 題。抽題時優先抽沒做過的，其次是上次答錯的。</p>'+
      '<p class="section-label">每輪題數</p><div class="seg seg3" role="radiogroup" aria-label="每輪題數">'+nBtns+'</div>'+
      '<div class="actions"><button type="button" class="btn primary" id="goIsland">整座島隨機 '+ST.n+' 題</button><button type="button" class="btn" id="goWeak"'+(weak.length?'':' disabled')+'>弱點加強（'+weak.length+'）</button><button type="button" class="btn" id="goNb"'+(weak.length?'':' disabled')+'>錯題本</button></div>'+
      '<p class="section-label">小主題</p><ul class="lm-list">'+
      isl.lms.map(l=>{ const t=statsOf(BANK[l.id]);
        return '<li><button type="button" class="lm-row" data-lm="'+l.id+'"><span class="lm-name">'+l.name+(worst&&worst.id===l.id?' <span class="flag">最需要加強</span>':'')+'</span>'+
          '<span class="lm-unit">'+l.unit+'</span>'+
          '<span class="lm-meta"><b>'+pct(t.acc)+'</b>做過 '+t.seen+'/'+t.total+'</span>'+
          '<span class="meter" aria-hidden="true"><i style="width:'+(t.ok/t.total*100).toFixed(1)+'%"></i></span></button></li>'; }).join('')+
      '</ul>'+(flaggedIn(isl.id).length?'<div class="actions"><button type="button" class="btn" id="goFlag">我標記的題目（'+flaggedIn(isl.id).length+'）</button></div>':'')+'<p class="fine">進度條是目前答對中的題目比例（看最近一次作答，答錯會扣回）；連續答對 2 次算熟練，之後較少被抽到。'+(isl.id==='twh'?'整座島隨機會另外混入 '+BANK._x.length+' 題「屬於哪個時期」的跨時期判斷題，以及 '+BANK._lk.length+' 題因果航線題。':'')+'小島會隨答對的題數成長：答對 8% 的題目成為小聚落、25% 熱鬧聚落、50% 繁榮之島（答錯會扣回）；最近錯很多的小島會起霧。</p>';
    body.querySelectorAll('.seg button[data-d]').forEach(b=>b.addEventListener('click',()=>{ ST.diff=b.dataset.d; save(); body.querySelectorAll('.seg button[data-d]').forEach(x=>x.setAttribute('aria-checked',String(x===b))); }));
    body.querySelectorAll('.seg button[data-n]').forEach(b=>b.addEventListener('click',()=>{ ST.n=+b.dataset.n; save(); body.querySelectorAll('.seg button[data-n]').forEach(x=>x.setAttribute('aria-checked',String(x===b))); $('#goIsland').textContent='整座島隨機 '+ST.n+' 題'; }));
    $('#goNb').addEventListener('click',()=>renderNotebook('all'));
    const gf=$('#goFlag'); if(gf) gf.addEventListener('click',renderFlags);
    $('#goIsland').addEventListener('click',()=>startQuiz({scope:'island', id:isl.id}));
    $('#goWeak').addEventListener('click',()=>startQuiz({scope:'weak', id:isl.id}));
    body.querySelectorAll('.lm-row').forEach(b=>b.addEventListener('click',()=>startQuiz({scope:'lm', id:b.dataset.lm})));
  } else {
    const pv=PV[isl.id]||[];
    body.innerHTML='<p class="note">這座島還在建造中，完工後會有這些小主題：</p>'+
      '<p class="section-label">預計的小主題</p><ul class="plan">'+isl.plan.map(p=>'<li>'+p+'</li>').join('')+'</ul>'+
      (pv.length ? '<p class="section-label">先暖身</p><p class="note">可以先做第一版留下的 '+pv.length+' 題預覽題。</p><div class="actions"><button type="button" class="btn primary" id="goPv">開始預覽題</button></div>' : '')+
      '<p class="fine">臺灣史島是第一座完工的樣品島，確認題目品質後會照同樣標準補齊其他島。</p>';
    const g=$('#goPv'); if(g) g.addEventListener('click',()=>startQuiz({scope:'preview', id:isl.id}));
  }
  scrollTop0();
}

// 標記有疑問的題目，可複製清單回報
function flaggedIn(id){ return islandPool(id).filter(q=>ST.flag[q.id]); }
function renderFlags(){
  const isl=ISL[focusId]; view='flags';
  const list=flaggedIn(isl.id);
  setHead(isl.name,'我標記的題目','複製清單後貼給 Claude，就能逐題修正',isl.subj); openPanel();
  const text=list.map(q=>'['+q.id+'] '+(q.ctx?'（情境）'+q.ctx+' ':'')+q.q+'｜選項：'+[q.c].concat(q.w).join('／')+'｜目前答案：'+q.c).join('\n');
  body.innerHTML='<div class="actions"><button type="button" class="btn primary" id="fCopy"'+(list.length?'':' disabled')+'>複製清單</button><button type="button" class="btn" id="fBack">返回</button></div>'+
    '<p class="seg-note" id="fMsg" aria-live="polite"></p>'+
    (list.length?'<ul class="wrong-list nb">'+list.map(q=>'<li><p class="nb-lm">'+q.id+'</p><p class="wq">'+esc(q.q)+'</p><div class="wa"><span class="fb-label">目前答案</span>'+fmtOpt(q.c)+'</div><button type="button" class="linkbtn" data-un="'+q.id+'">取消標記</button></li>').join('')+'</ul>':'<p class="note">目前沒有標記的題目。</p>')+
    '<textarea id="fText" class="copybox" readonly hidden>'+esc(text)+'</textarea>';
  $('#fCopy').addEventListener('click',()=>{
    const done=()=>{ $('#fMsg').textContent='已複製 '+list.length+' 題，貼到對話裡就可以了。'; };
    const fallback=()=>{ const t=$('#fText'); t.hidden=false; t.focus(); t.select(); $('#fMsg').textContent='瀏覽器不讓我直接複製，請手動複製下面的文字。'; };
    try{ navigator.clipboard.writeText(text).then(done,fallback); }catch(e){ fallback(); }
  });
  $('#fBack').addEventListener('click',renderIsland);
  body.querySelectorAll('[data-un]').forEach(b=>b.addEventListener('click',()=>{ delete ST.flag[b.dataset.un]; save(); renderFlags(); }));
  scrollTop0();
}

// 錯題本：可以翻閱所有「上次答錯」的題目與解說
function renderNotebook(filter){
  const isl=ISL[focusId]; view='notebook';
  const all=islandPool(isl.id).filter(q=>ST.q[q.id] && !ST.q[q.id][2]);
  const groups=isl.lms.map(l=>({id:l.id,name:l.name,n:all.filter(q=>q.lm===l.id).length})).filter(g=>g.n);
  ['_lk','_x'].forEach(k=>{ const xn=all.filter(q=>q.lm===k).length; if(xn) groups.push({id:k,name:lmName(k),n:xn}); });
  const list=filter==='all'?all:all.filter(q=>q.lm===filter);
  setHead(isl.name, '錯題本', '上次答錯的 '+all.length+' 題，答對後會自動移出', isl.subj);
  openPanel();
  const chip=(id,name,n)=>'<button type="button" class="fchip" data-f="'+id+'" aria-pressed="'+(filter===id)+'">'+name+' '+n+'</button>';
  body.innerHTML=
    '<div class="stickybar"><div class="filters">'+chip('all','全部',all.length)+groups.map(g=>chip(g.id,g.name,g.n)).join('')+'</div>'+
    '<div class="actions"><button type="button" class="btn primary" id="nbGo"'+(list.length?'':' disabled')+'>重練這 '+list.length+' 題</button><button type="button" class="btn" id="nbBack">返回</button></div></div>'+
    (list.length ? '<ul class="wrong-list nb">'+list.map(q=>'<li><p class="nb-lm">'+(q.lm==='_cx'?'跨科航線「'+esc(CROSS[q.cx].title)+'」':q.lm==='_lk'?'因果航線「'+esc(LINKS[q.link].title)+'」':lmName(q.lm))+'．<span style="color:'+DIFF[q.d].css+'">'+DIFF[q.d].name+'</span></p>'+(q.ctx?'<p class="nb-ctx">'+esc(q.ctx)+'</p>':'')+(q.fig?'<figure class="qfig">'+figSVG(q.fig)+'</figure>':'')+'<p class="wq">'+esc(q.q)+'</p><div class="wa"><span class="fb-label">正解</span>'+fmtOpt(q.c)+'</div><p class="nb-ex">'+esc(q.ex)+'</p></li>').join('')+'</ul>' : '<p class="note">這裡沒有錯題了，做得好。</p>');
  body.querySelectorAll('.fchip').forEach(b=>b.addEventListener('click',()=>renderNotebook(b.dataset.f)));
  $('#nbGo').addEventListener('click',()=>startQuiz({scope:'retry', isl:isl.id, list:list.slice()}));
  $('#nbBack').addEventListener('click',renderIsland);
  scrollTop0();
}

function scopeInfo(o){
  if(o.scope==='lm'){ const l=LM_INFO[o.id]; return {isl:l.isl, title:l.name, sub:l.unit, list:BANK[o.id]}; }
  if(o.scope==='link'){ const L=LINKS[o.id]; return {isl:LM_INFO[L.a].isl, title:'因果航線：'+L.title, sub:LM_INFO[L.a].name+' → '+LM_INFO[L.b].name, list:linkPool(o.id)}; }
  const isl=ISL[o.id];
  if(o.scope==='island') return {isl:o.id, title:'整座島隨機', sub:isl.name+(o.id==='twh'?'全部小主題＋跨時期與因果航線題':'全部 '+isl.lms.length+' 個小主題'), list:islandPool(o.id)};
  if(o.scope==='weak') return {isl:o.id, title:'弱點加強', sub:'上次答錯的題目', list:islandPool(o.id).filter(q=>ST.q[q.id] && !ST.q[q.id][2])};
  if(o.scope==='preview') return {isl:o.id, title:'預覽題', sub:'第一版留下的題目', list:PV[o.id]||[]};
  if(o.scope==='retry') return {isl:o.isl, title:'錯題重練', sub:'剛才答錯的題目', list:o.list};
  if(o.scope==='exam'){ const isls=examIslands(o.subj); return {isl:null, title:'會考模擬', sub:(o.subj==='all'?'三科':SUBJ[o.subj].name)+'混合 '+o.n+' 題．計時作答', list:isls.reduce((a,i)=>a.concat(islandPool(i.id)),[])}; }
  if(o.scope==='wrong'){ const L=wrongAll().filter(q=>o.subj==='all'||subjOf(q)===o.subj); return {isl:null, title:'錯題島', sub:(o.subj==='all'?'所有島':SUBJ[o.subj].name)+'上次答錯的題目，共 '+L.length+' 題', list:L}; }
  if(o.scope==='cross'){ const L=CROSS[o.id]; return {isl:null, title:'跨科航線：'+L.title, sub:LM_INFO[L.a].name+' → '+LM_INFO[L.b].name, list:crossPool(o.id)}; }
  if(o.scope==='review'){ const L=dueList(); return {isl:null, title:'今日複習', sub:'今天到期該複習的題目共 '+L.length+' 題', list:L}; }
  if(o.scope==='search') return {isl:null, title:'搜尋：'+o.term, sub:'題目或選項含有「'+o.term+'」', list:o.list};
}
const islOf=q=>LM_INFO[q.lm]?LM_INFO[q.lm].isl:((q.lm==='_x'||q.lm==='_lk')?'twh':(q.lm==='_cx'?LM_INFO[CROSS[q.cx].a].isl:null));
const examIslands=subj=>ISLANDS.filter(i=>i.ready && (subj==='all'||i.subj===subj));
// 會考模擬：各島平均抽題，再整體打散
function examDraw(o){
  const isls=examIslands(o.subj); let out=[];
  isls.forEach((isl,k)=>{ const share=Math.floor(o.n/isls.length)+(k<o.n%isls.length?1:0); out=out.concat(draw(islandPool(isl.id),share,'mix')); });
  return shuffle(out);
}
const fmtTime=ms=>{ const t=Math.floor(ms/1000); return Math.floor(t/60)+':'+String(t%60).padStart(2,'0'); };
let timerT=0;
function startQuiz(o){
  const info=scopeInfo(o); if(!info || !info.list.length) return;
  if(info.isl && focusId!==info.isl){ focusId=info.isl; $('#backBtn').hidden=false; if(scene3d) scene3d.focus(info.isl); }
  const diff = (o.scope==='lm'||o.scope==='island') ? ST.diff : 'mix';
  let qs;
  if(o.scope==='retry') qs=shuffle(info.list);
  else if(o.scope==='link'||o.scope==='cross'){ // 本線題一定先抽，再用兩島的因果題補滿
    const tag=o.scope==='link'?'_lk':'_cx', own=info.list.filter(q=>q.lm===tag), rest=info.list.filter(q=>q.lm!==tag);
    const a=draw(own,Math.min(own.length,Math.ceil(ST.n/2)),'mix'); qs=shuffle(a.concat(draw(rest,ST.n-a.length,'mix')));
  } else if(o.scope==='exam') qs=examDraw(o);
  else if(o.scope==='review') qs=shuffle(info.list.slice(0,Math.max(ST.n,10)));
  else if(o.scope==='wrong') qs=draw(info.list,Math.max(ST.n,10),'mix');
  else qs=draw(info.list, ST.n, diff);
  S={o, info, qs, i:0, results:[], wrong:[], answered:false, opts:[], diff, t0:Date.now()};
  view='quiz'; markInteracted();
  const isl=info.isl?ISL[info.isl]:null;
  setHead(isl?isl.name+(diff==='mix'?'':'．'+DIFF[diff].name):'全部島嶼', info.title, info.sub, isl?isl.subj:(o.subj&&o.subj!=='all'?o.subj:'hist'));
  clearInterval(timerT);
  if(o.scope==='exam') timerT=setInterval(()=>{ const el=document.getElementById('qtimer'); if(!S||S.o.scope!=='exam'||view!=='quiz'){ clearInterval(timerT); return; } if(el) el.textContent='⏱ '+fmtTime(Date.now()-S.t0); },1000);
  openPanel(); renderQ(); refreshProgress();
  if(o.scope==='lm'){ lmFocus=o.id; linkFocus=null; if(scene3d) scene3d.focusLm(o.id); }
  if(o.scope==='link'){ linkFocus=o.id; lmFocus=null; if(scene3d) scene3d.focusLink(o.id); }
  if(o.scope==='cross'){ crossFocus=o.id; if(scene3d) scene3d.focusCross(o.id); }
}
function renderQ(){
  const q=S.qs[S.i]; S.opts=shuffle([q.c].concat(q.w)); S.answered=false;
  const segs=S.qs.map((_,k)=>{ let c=''; if(k<S.i) c=S.results[k]?'right':'wrong'; else if(k===S.i) c='now'; return '<i class="'+c+'"></i>'; }).join('');
  const lmTag = q.lm==='_cx' ? '<span class="tagchip lk">⛵ '+esc(CROSS[q.cx].title)+'</span>' : q.lm==='_lk' ? '<span class="tagchip lk">⇢ '+esc(LINKS[q.link].title)+'</span>' : ((S.o.scope!=='lm' && lmName(q.lm)) ? '<span class="tagchip">'+lmName(q.lm)+'</span>' : '');
  body.innerHTML=
    '<div class="qprog" style="grid-template-columns:repeat('+S.qs.length+',1fr)" role="progressbar" aria-valuemin="0" aria-valuemax="'+S.qs.length+'" aria-valuenow="'+S.i+'">'+segs+'</div>'+
    '<div class="qmeta"><span class="qnum"><b>'+(S.i+1)+'</b> / '+S.qs.length+'</span><span class="qtags"><span class="pill" style="--dc:'+DIFF[q.d].css+'">'+DIFF[q.d].name+'</span>'+lmTag+(S.o.scope==='exam'?'<span class="tagchip" id="qtimer">⏱ '+fmtTime(Date.now()-S.t0)+'</span>':'')+'</span></div>'+
    (q.ctx?'<div class="ctx"><span class="ctx-tag">素養情境</span>'+esc(q.ctx)+'</div>':'')+
    (q.fig?'<figure class="qfig">'+figSVG(q.fig)+'</figure>':'')+
    '<p class="qtext" id="qtext">'+esc(q.q)+'</p>'+
    '<ol class="opts" aria-labelledby="qtext">'+S.opts.map((o,k)=>'<li><button type="button" class="opt" data-k="'+k+'"><span class="key">'+'ABCD'[k]+'</span><span class="otext">'+fmtOpt(o)+'</span></button></li>').join('')+'</ol>'+
    '<div class="feedback" id="fb" hidden aria-live="polite"></div>'+
    '<div class="actions qactions" id="qact" hidden><button type="button" class="btn primary" id="nextBtn">'+(S.i+1<S.qs.length?'下一題':'看成績')+'</button></div>';
  body.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>answer(+b.dataset.k)));
  $('#nextBtn').addEventListener('click',next);
  scrollTop0();
  const f=body.querySelector('.opt'); if(f) f.focus({preventScroll:true});
}
function answer(k){
  if(!S || S.answered) return;
  S.answered=true;
  const q=S.qs[S.i], ok=S.opts[k]===q.c;
  S.results.push(ok); if(!ok) S.wrong.push(q);
  const gap=record(q.id, ok); if(ok && scene3d && scene3d.cheer) scene3d.cheer();
  body.querySelectorAll('.opt').forEach((b,idx)=>{ b.disabled=true; if(S.opts[idx]===q.c) b.classList.add('is-right'); if(idx===k && !ok) b.classList.add('is-wrong'); });
  const fb=$('#fb'); fb.hidden=false; fb.className='feedback'+(ok?'':' bad');
  fb.innerHTML='<div class="fb-head"><span class="fb-icon" aria-hidden="true">'+(ok?'✓':'✕')+'</span><strong>'+(ok?'答對了':'答錯了')+'</strong></div>'+(ok?'':'<div class="fb-ans"><span class="fb-label">正解</span><span>'+fmtOpt(q.c)+'</span></div>')+'<p class="fb-ex">'+esc(q.ex)+'</p><div class="fb-foot"><span class="nextrev">下次複習：'+(gap<=1?'明天':gap+' 天後')+'</span><button type="button" class="linkbtn" id="flagBtn" aria-pressed="'+!!ST.flag[q.id]+'">⚑ '+(ST.flag[q.id]?'已標記（再按取消）':'這題有疑問')+'</button><a class="linkbtn" href="'+esc(reportURL(q))+'" target="_blank" rel="noopener">回報錯誤 ↗</a></div>';
  $('#flagBtn').addEventListener('click',e=>{ if(ST.flag[q.id]) delete ST.flag[q.id]; else ST.flag[q.id]=1; save(); e.currentTarget.setAttribute('aria-pressed',String(!!ST.flag[q.id])); e.currentTarget.textContent='⚑ '+(ST.flag[q.id]?'已標記（再按取消）':'這題有疑問'); });
  $('#qact').hidden=false; const nb=$('#nextBtn'); nb.focus({preventScroll:true});
  fb.scrollIntoView({block:'nearest',behavior:reduceMotion?'auto':'smooth'});
}
// 回報錯誤：開啟 GitHub 的回報頁，題號與題目內容已經填好
const REPO_URL='https://github.com/lutm6666/social-studies-review-island';
function reportURL(q){
  const opts=[q.c].concat(q.w);
  const bodyTxt='題號：'+q.id+'\n'+(q.ctx?'情境：'+q.ctx+'\n':'')+'題目：'+q.q+'\n標示的正解：'+q.c+'\n其他選項：'+q.w.join('／')+'\n解說：'+q.ex+'\n\n## 問題說明\n（請寫下哪裡有錯、正確應該是什麼，有資料來源更好）\n';
  return REPO_URL+'/issues/new?title='+encodeURIComponent('[題目回報] '+q.id)+'&body='+encodeURIComponent(bodyTxt);
}
function next(){ if(!S) return; S.i++; if(S.i<S.qs.length) renderQ(); else renderResult(); }
function renderResult(){
  view='result'; refreshProgress();
  const n=S.qs.length, c=S.results.filter(Boolean).length, ratio=c/n;
  const msg = ratio===1 ? '全對！這一輪的題目都掌握了。' : ratio>=0.7 ? '不錯！把下面答錯的題目看熟就更穩了。' : '先看看下面的錯題重點，再挑戰一次。';
  const by={1:[0,0],2:[0,0],3:[0,0]}; S.qs.forEach((q,i)=>{ by[q.d][1]++; if(S.results[i]) by[q.d][0]++; });
  const bd=[1,2,3].filter(d=>by[d][1]).map(d=>'<li><span class="pill" style="--dc:'+DIFF[d].css+'">'+DIFF[d].name+'</span>'+by[d][0]+' / '+by[d][1]+'</li>').join('');
  clearInterval(timerT);
  // 各小主題表現（會考模擬與搜尋改以島為單位）：題目來自兩個以上分組時才顯示
  const byIsl=S.o.scope==='exam'||S.o.scope==='search'||S.o.scope==='review'||S.o.scope==='wrong';
  const keyOf=q=>byIsl?islOf(q):q.lm, nameOf=k=>byIsl?(ISL[k]?ISL[k].name:''):lmName(k);
  const byLm={}; S.qs.forEach((q,i)=>{ const k=keyOf(q); if(!k) return; (byLm[k]=byLm[k]||[0,0])[1]++; if(S.results[i]) byLm[k][0]++; });
  const lmKeys=Object.keys(byLm).filter(k=>nameOf(k));
  let diag='';
  if(S.o.scope==='exam') diag+='<p class="section-label">作答時間</p><p class="note">共 '+fmtTime(Date.now()-S.t0)+'，平均每題 '+Math.round((Date.now()-S.t0)/1000/n)+' 秒</p>';
  if(lmKeys.length>1){
    const rows=lmKeys.map(k=>({k,name:nameOf(k),c:byLm[k][0],n:byLm[k][1]})).sort((a,b)=>a.c/a.n-b.c/b.n);
    const weakest=rows.find(r=>r.n>=2 && r.c<r.n && (byIsl?ISL[r.k]:LM_INFO[r.k]));
    diag+='<p class="section-label">'+(byIsl?'各島表現':'各小主題表現')+'</p><ul class="lm-score">'+rows.map(r=>'<li><span>'+r.name+'</span><span class="bar2"><i style="width:'+(r.c/r.n*100)+'%"></i></span><b>'+r.c+'/'+r.n+'</b></li>').join('')+'</ul>'+
      (weakest?'<div class="tipcard"><div><p class="tip-title">建議下一步</p><p class="tip-text">這一輪「'+weakest.name+'」最需要加強。</p></div><button type="button" class="btn" id="rWeak" data-'+(byIsl?'isl':'lm')+'="'+weakest.k+'">去練習</button></div>':'');
  }
  body.innerHTML=
    '<div class="rhero"><div class="rring" style="--p:'+(ratio*100).toFixed(0)+'" role="img" aria-label="答對 '+c+' 題，共 '+n+' 題"><span><b>'+c+'</b><small>/'+n+'</small></span></div>'+
    '<div class="rtext"><p class="rtitle">'+(ratio===1?'全部答對':ratio>=0.7?'表現不錯':'再加把勁')+'</p><p class="result-msg">'+msg+'</p><ul class="breakdown">'+bd+'</ul></div></div>'+
    '<div class="actions">'+
      (S.wrong.length ? '<button type="button" class="btn primary" id="rWrong">只練這次錯題（'+S.wrong.length+'）</button>' : '')+
      (S.o.scope!=='retry' ? '<button type="button" class="btn'+(S.wrong.length?'':' primary')+'" id="rMore">再來 '+(S.o.scope==='exam'?S.o.n:ST.n)+' 題</button>' : '')+
      '<button type="button" class="btn" id="rBack">回到島上</button>'+
    '</div>'+diag+
    (S.wrong.length ? '<p class="section-label">答錯的題目</p><ul class="wrong-list">'+S.wrong.map(q=>'<li>'+(q.ctx?'<p class="nb-ctx">'+esc(q.ctx)+'</p>':'')+'<p class="wq">'+esc(q.q)+'</p><div class="wa"><span class="fb-label">正解</span>'+fmtOpt(q.c)+'</div></li>').join('')+'</ul>' : '');
  const w=$('#rWrong'); if(w){ const list=S.wrong.slice(), il=S.info.isl; w.addEventListener('click',()=>startQuiz({scope:'retry', isl:il, list})); }
  const m=$('#rMore'); if(m){ const o=S.o; m.addEventListener('click',()=>startQuiz(o)); }
  $('#rBack').addEventListener('click',backToExplore);
  const rw=$('#rWeak'); if(rw) rw.addEventListener('click',()=>rw.dataset.isl?startQuiz({scope:'island',id:rw.dataset.isl}):startQuiz({scope:'lm',id:rw.dataset.lm}));
  scrollTop0();
  const f=body.querySelector('.btn'); if(f) f.focus({preventScroll:true}); scrollTop0(); requestAnimationFrame(scrollTop0);
}

// 會考模擬設定
function renderExamSetup(){
  view='exam'; S=null; ST.exam=ST.exam||{subj:'all',n:30};
  setHead('全部島嶼','會考模擬','跨島混合抽題、計時作答，做完看各島表現','hist'); openPanel();
  const seg=(k,list)=>list.map(([v,nm])=>'<button type="button" role="radio" data-'+k+'="'+v+'" aria-checked="'+(String(ST.exam[k])===String(v))+'">'+nm+'</button>').join('');
  body.innerHTML='<p class="section-label">科目</p><div class="seg" role="radiogroup" aria-label="科目">'+seg('subj',[['all','三科'],['hist','歷史'],['geo','地理'],['civ','公民']])+'</div>'+
    '<p class="section-label">題數</p><div class="seg seg3" role="radiogroup" aria-label="題數">'+seg('n',[[20,'20 題'],[30,'30 題'],[50,'50 題']])+'</div>'+
    '<p class="seg-note">每座島平均抽題，優先抽沒做過與答錯的題目；作答時會顯示經過的時間。</p>'+
    '<div class="actions"><button type="button" class="btn primary" id="exGo">開始模擬</button></div>';
  body.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{ const k=b.dataset.subj!=null?'subj':'n'; ST.exam[k]=k==='n'?+b.dataset.n:b.dataset.subj; save(); body.querySelectorAll('.seg button[data-'+k+']').forEach(x=>x.setAttribute('aria-checked',String(x===b))); }));
  $('#exGo').addEventListener('click',()=>startQuiz({scope:'exam',subj:ST.exam.subj,n:ST.exam.n}));
  scrollTop0();
}
// 題目搜尋
/* ---------- 進度備份：匯出成檔案或代碼，在其他裝置匯入（合併，保留作答次數較多的紀錄） ---------- */
const BK_HEAD='SHEHUI1:';
function backupData(){ return {app:'shehui-review',v:1,at:new Date().toISOString(),q:ST.q,flag:ST.flag}; }
function toCode(o){ const s=JSON.stringify(o); const bytes=new TextEncoder().encode(s); let bin=''; for(let i=0;i<bytes.length;i+=0x8000) bin+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000)); return BK_HEAD+btoa(bin); }
function fromText(txt){ txt=(txt||'').trim(); let o=null;
  if(txt.startsWith(BK_HEAD)){ const bin=atob(txt.slice(BK_HEAD.length).replace(/\s/g,'')); const bytes=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i); o=JSON.parse(new TextDecoder().decode(bytes)); }
  else o=JSON.parse(txt);
  if(!o || typeof o.q!=='object' || o.app!=='shehui-review') throw new Error('bad');
  Object.keys(o.q).forEach(id=>{ const r=o.q[id]; if(!Array.isArray(r) || r.some(x=>typeof x!=='number')) delete o.q[id]; });
  return o; }
function renderBackup(){
  view='backup'; S=null;
  setHead('全部島嶼','進度備份','換手機、換電腦或清除瀏覽器資料前，先把進度存起來','civ'); openPanel();
  const n=Object.keys(ST.q).length, f=Object.keys(ST.flag||{}).length;
  body.innerHTML='<p class="note">目前這台裝置有 <b>'+n+'</b> 題的作答紀錄'+(f?'、'+f+' 題標記為有疑問':'')+'。</p>'+
    '<p class="section-label">匯出</p><div class="bk-box"><div class="actions"><button type="button" class="btn primary" id="bkDl">下載備份檔</button><button type="button" class="btn" id="bkCopy">複製備份代碼</button></div><p class="bk-msg" id="bkOut" aria-live="polite">備份檔適合存在電腦或雲端硬碟；代碼可以貼到 LINE 給自己，再到另一台裝置貼上。</p></div>'+
    '<p class="section-label">匯入</p><div class="bk-box"><label class="bk-msg" for="bkFile">選擇備份檔</label><input type="file" id="bkFile" accept=".json,application/json,text/plain">'+
    '<label class="bk-msg" for="bkCode">或貼上備份代碼</label><textarea id="bkCode" class="bk-code" placeholder="SHEHUI1:…"></textarea>'+
    '<div class="actions"><button type="button" class="btn primary" id="bkIn">匯入並合併</button></div><p class="bk-msg" id="bkInMsg" aria-live="polite">匯入會與這台裝置的紀錄合併：同一題保留作答次數較多的那一份，不會刪掉現有進度。</p></div>';
  const out=$('#bkOut'), msg=$('#bkInMsg');
  // claude.ai 內的版本不能下載檔案，只提供備份代碼（進度也已同步到帳號）
  if(window.claude && claude.use){ $('#bkDl').hidden=true; out.textContent='這個版本的進度會自動同步到你的帳號。若要搬到公開網址版，請複製備份代碼，到那邊貼上匯入。'; }
  $('#bkDl').addEventListener('click',()=>{ try{ const blob=new Blob([JSON.stringify(backupData())],{type:'application/json'}); const a=document.createElement('a'); const d=new Date(); a.href=URL.createObjectURL(blob); a.download='社會科複習島-進度-'+d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'.json'; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1000); out.textContent='已開始下載備份檔。如果沒有出現下載，請改用「複製備份代碼」。'; out.className='bk-msg ok'; }catch(e){ out.textContent='這個瀏覽器無法下載檔案，請改用「複製備份代碼」。'; out.className='bk-msg err'; } });
  $('#bkCopy').addEventListener('click',async()=>{ const code=toCode(backupData()); try{ await navigator.clipboard.writeText(code); out.textContent='已複製備份代碼（'+code.length+' 字）。'; out.className='bk-msg ok'; }catch(e){ const ta=$('#bkCode'); ta.value=code; ta.select(); out.textContent='無法自動複製，代碼已放在下方的框框裡，請自己全選複製。'; out.className='bk-msg'; } });
  const doImport=txt=>{ try{ const o=fromText(txt); const before=Object.keys(ST.q).length; let upd=0; Object.keys(o.q).forEach(id=>{ const a=ST.q[id], b=o.q[id]; if(!a || b[0]>a[0]) upd++; });
      mergeST({q:o.q,flag:o.flag||{}}); save(); growthPrev=null; refreshProgress();
      msg.textContent='匯入完成：更新了 '+upd+' 題的紀錄，現在共有 '+Object.keys(ST.q).length+' 題（原本 '+before+' 題）。'; msg.className='bk-msg ok'; }
    catch(e){ msg.textContent='讀不懂這份備份，請確認是本網站匯出的檔案或完整的代碼。'; msg.className='bk-msg err'; } };
  $('#bkIn').addEventListener('click',()=>{ const t=$('#bkCode').value; if(!t.trim()){ msg.textContent='請先選擇備份檔，或貼上備份代碼。'; msg.className='bk-msg err'; return; } doImport(t); });
  $('#bkFile').addEventListener('change',e=>{ const file=e.target.files&&e.target.files[0]; if(!file) return; const rd=new FileReader(); rd.onload=()=>doImport(String(rd.result)); rd.onerror=()=>{ msg.textContent='讀取檔案失敗。'; msg.className='bk-msg err'; }; rd.readAsText(file); });
}
function renderSearch(term){
  view='search'; S=null;
  setHead('全部島嶼','搜尋題目','輸入關鍵字，找出相關題目一起練','geo'); openPanel();
  body.innerHTML='<label class="section-label" for="sq">關鍵字</label><input id="sq" class="sq" type="search" placeholder="例如：保甲、機會成本、季風" autocomplete="off" value="'+esc(term||'')+'"><div id="sres"></div>';
  const inp=$('#sq'), out=$('#sres'); let tm=0;
  const run=()=>{ const t=inp.value.trim(); if(t.length<2){ out.innerHTML='<p class="note">至少輸入兩個字。</p>'; return; }
    const list=ALL_READY.filter(q=>(q.q+'|'+q.c+'|'+(q.ctx||'')).includes(t));
    if(!list.length){ out.innerHTML='<p class="note">找不到含有「'+esc(t)+'」的題目。</p>'; return; }
    out.innerHTML='<div class="actions"><button type="button" class="btn primary" id="sGo">練這些題（隨機 '+Math.min(ST.n,list.length)+' 題，共 '+list.length+' 題）</button></div>'+
      '<ul class="wrong-list nb">'+list.slice(0,20).map(q=>'<li><p class="nb-lm">'+esc(ISL[islOf(q)]?ISL[islOf(q)].name:'')+'．'+esc(lmName(q.lm))+'</p><p class="wq">'+esc(q.q)+'</p></li>').join('')+'</ul>'+(list.length>20?'<p class="fine">只列出前 20 題。</p>':'');
    $('#sGo').addEventListener('click',()=>startQuiz({scope:'search',term:t,list})); };
  inp.addEventListener('input',()=>{ clearTimeout(tm); tm=setTimeout(run,200); });
  run(); inp.focus();
}
/* ---------- 領航員：導覽與提示 ---------- */
const tourEl=document.createElement('div'); tourEl.className='tour'; tourEl.hidden=true; tourEl.setAttribute('role','dialog'); tourEl.setAttribute('aria-label','領航員'); document.body.appendChild(tourEl);
const TOUR=[
  {cam:s=>s.overview(), text:'嗨！我是領航員。這裡有 9 座島：橘色是歷史、綠色是地理、藍灰色是公民，每一科分成七、八、九年級三座島。'},
  {cam:s=>s.focus('twh'), text:'每座島中央是主島，周圍的小島是章節。點小島可以近看代表模型，按「開始答題」就能練習。'},
  {cam:s=>s.focusLm('pre'), text:'答對越多，小島會長出房子、燈籠和金旗；最近錯很多的小島會起霧，提醒你回來複習。'},
  {cam:s=>s.focusLink(0), text:'臺灣史島上的橘色弧線是「因果航線」，連起原因和結果，點它就能練跨章節的因果題。'},
  {cam:s=>s.focusCross(5), text:'島與島之間來回的小船是「跨科航線」，把歷史、地理、公民串成同一張知識網。點小船就能練習。'},
  {cam:s=>s.overview(), text:'左上角的「今日複習」會整理今天該複習的題目，還有「會考模擬」和「搜尋題目」。天空會跟著真實時間變成清晨、白天、黃昏或夜晚。想再找我，點中央沙洲上的我就好！'}
];
let tourStep=-1;
function guideHTML(text,buttons){ return '<div class="tour-head"><span class="tour-av" aria-hidden="true">🧭</span><b>領航員</b>'+(tourStep>=0?'<span class="tour-step">'+(tourStep+1)+' / '+TOUR.length+'</span>':'')+'<button type="button" class="icon-btn tour-x" data-t="end" aria-label="關閉">✕</button></div><p class="tour-text">'+text+'</p><div class="tour-btns">'+buttons+'</div>'; }
function bindTour(){ tourEl.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>{ const t=b.dataset.t;
  if(t==='next') tourGo(tourStep+1); else if(t==='prev') tourGo(tourStep-1); else if(t==='start') tourGo(0); else if(t==='review'){ endTour(); startQuiz({scope:'review'}); } else endTour(); })); }
function tourGo(i){
  if(i>=TOUR.length){ endTour(); return; }
  tourStep=Math.max(0,i); ST.toured=1; save();
  if(document.body.classList.contains('ui-hidden')) setUiHidden(false);
  if(typeof setHudMini==='function') setHudMini(hudPref() && tourStep!==TOUR.length-1,true);
  focusId=null; lmFocus=null; linkFocus=null; chapFocus=null; hubFocus=false; crossFocus=null; S=null; hidePanel(); cardEl.hidden=true; $('#backBtn').hidden=true;
  document.body.classList.add('touring');
  if(scene3d) TOUR[tourStep].cam(scene3d);
  tourEl.innerHTML=guideHTML(TOUR[tourStep].text,(tourStep>0?'<button type="button" class="btn" data-t="prev">上一步</button>':'')+'<button type="button" class="btn primary" data-t="next">'+(tourStep<TOUR.length-1?'下一步':'開始複習')+'</button>');
  tourEl.hidden=false; bindTour(); refreshProgress();
  const nb=tourEl.querySelector('[data-t="next"]'); if(nb) nb.focus({preventScroll:true});
}
function endTour(){ tourStep=-1; tourEl.hidden=true; document.body.classList.remove('touring'); if(typeof setHudMini==='function') setHudMini(hudPref(),true); if(scene3d && !focusId) scene3d.overview(); refreshProgress(); }
// 點領航員：顯示今天的複習提示，也可以再導覽一次
function onGuide(){
  const due=dueList().length; tourStep=-1;
  const tips=['連續答對 2 次才算熟練，熟練的題目會隔幾天再出現一次。','做完一輪後，看看「各小主題表現」，就知道下一步該練哪裡。','覺得題目有問題，可以按「這題有疑問」標記，之後一起修正。','會考常考圖表題，地理的氣候圖和人口金字塔記得多練。'];
  tourEl.innerHTML=guideHTML((due?'今天有 '+due+' 題到期要複習，現在花幾分鐘把它們複習完吧！':'今天沒有到期的題目，做得好！')+'<br><span class="tour-tip">小提醒：'+tips[Math.floor(Math.random()*tips.length)]+'</span>',(due?'<button type="button" class="btn primary" data-t="review">開始今日複習</button>':'')+'<button type="button" class="btn" data-t="start">再導覽一次</button>');
  tourEl.hidden=false; bindTour();
}
// 第一次來：邀請導覽
function inviteTour(){ if(ST.toured || tourStep>=0 || !panel.hidden) return; tourStep=-1;
  tourEl.innerHTML=guideHTML('第一次來嗎？我可以帶你逛一圈，大約一分鐘。','<button type="button" class="btn primary" data-t="start">好，帶我逛</button><button type="button" class="btn" data-t="end">先不用</button>');
  tourEl.hidden=false; bindTour(); tourEl.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>{ ST.toured=1; save(); })); }
setTimeout(()=>{ if(!ST.lite) inviteTour(); },4500);
$('#examBtn').addEventListener('click',()=>{ markInteracted(); renderExamSetup(); });
$('#reviewBtn').addEventListener('click',()=>{ markInteracted(); startQuiz({scope:'review'}); });
$('#searchBtn').addEventListener('click',()=>{ markInteracted(); renderSearch(''); });
$('#closeBtn').addEventListener('click',backToExplore);
$('#backBtn').addEventListener('click',toOverview);
document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && document.body.classList.contains('ui-hidden')){ setUiHidden(false); return; }
  if(e.key==='Escape' && !tourEl.hidden){ endTour(); return; }
  if((e.key==='h'||e.key==='H') && !e.ctrlKey && !e.metaKey && !e.altKey && panel.hidden && !(e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName))){ setUiHidden(!document.body.classList.contains('ui-hidden')); return; }
  if(e.key==='Escape'){ if(!panel.hidden) backToExplore(); else if(crossFocus!=null||hubFocus) toOverview(); else if(lmFocus||chapFocus||linkFocus!=null) focusIsland(focusId); else if(focusId) toOverview(); return; }
  if(view==='quiz' && S && !S.answered){
    const map={'1':0,'2':1,'3':2,'4':3,'a':0,'b':1,'c':2,'d':3};
    const k=map[e.key.toLowerCase()];
    if(k!==undefined && k<S.opts.length && !(e.target && e.target.tagName==='INPUT')){ e.preventDefault(); answer(k); }
  }
});

let interacted=false;
function markInteracted(){ if(interacted) return; interacted=true; $('#hint').classList.add('gone'); }
let hover=null;
function setHover(h){
  hover=h;
  ISLANDS.forEach(i=>islLabel[i.id].classList.toggle('hover', !!(h&&h.isl===i.id)));
  crossLabel.forEach((el,i)=>el.classList.toggle('hover', !!(h&&h.cross===i)));
  linkLabel.forEach((el,i)=>el.classList.toggle('hover', !!(h&&h.link===i)));
  Object.keys(lmLabel).forEach(id=>lmLabel[id].classList.toggle('hover', !!(h&&h.lm===id)));
  Object.keys(chapLabel).forEach(id=>chapLabel[id].classList.toggle('hover', !!(h&&h.lm===id)));
}

/* ---------- 3D 群島 ---------- */
let scene3d=null;
function startScene(){
  try{ scene3d=buildScene(); if(growthPrev) scene3d.setGrowth(growthPrev); return true; }catch(err){
    console.error(err); labelsEl.hidden=true;
    $('#hint').textContent='這台裝置無法顯示 3D 群島，可以直接從下方的島嶼列開始。';
    return false;
  }
}
// 省電模式：關閉 3D 畫面與動畫；大字模式：放大題目文字（設定會記住）
function setLite(on){
  ST.lite=!!on; save();
  $('#scene').hidden=ST.lite; labelsEl.hidden=ST.lite;
  $('#liteBtn').setAttribute('aria-pressed',String(ST.lite));
  if(ST.lite){ if(scene3d) scene3d.pause(); $('#hint').textContent='省電模式：3D 畫面已關閉，從下方島嶼列選擇島嶼。'; $('#hint').classList.remove('gone'); }
  else { $('#hint').textContent='拖曳旋轉．滾輪或雙指縮放．點一座島開始複習'; if(scene3d) scene3d.resume(); else startScene(); if(scene3d){ if(lmFocus) scene3d.focusLm(lmFocus); else if(focusId) scene3d.focus(focusId); } }
}
function setBig(on){ ST.big=!!on; save(); document.body.classList.toggle('big',ST.big); $('#bigBtn').setAttribute('aria-pressed',String(ST.big)); }
$('#liteBtn').addEventListener('click',()=>setLite(!ST.lite));
$('#bigBtn').addEventListener('click',()=>setBig(!ST.big));
setBig(ST.big);
// 介面偏好只存在這台裝置（不跟帳號同步）
const UIP=(()=>{ try{ return JSON.parse(localStorage.getItem('shehui-ui')||'{}')||{}; }catch(e){ return {}; } })();
function hudPref(){ return UIP.hudMini===undefined ? window.innerWidth<720 : !!UIP.hudMini; }
function saveUIP(){ try{ localStorage.setItem('shehui-ui',JSON.stringify(UIP)); }catch(e){} }
function setHudMini(on,keep){ if(!keep){ UIP.hudMini=!!on; saveUIP(); } document.body.classList.toggle('hud-mini',!!on); const b=$('#hudMin'); b.textContent=on?'+':'–'; b.setAttribute('aria-expanded',String(!on)); const l=on?'展開面板':'收合面板'; b.setAttribute('aria-label',l); b.title=l; }
function setCompact(on){ UIP.compact=!!on; saveUIP(); document.body.classList.toggle('card-compact',UIP.compact); $('#compactBtn').setAttribute('aria-pressed',String(UIP.compact)); }
function setUiHidden(on){ document.body.classList.toggle('ui-hidden',!!on); const b=$('#eyeBtn'), l=on?'顯示介面':'隱藏介面，只看小島'; b.setAttribute('aria-pressed',String(!!on)); b.setAttribute('aria-label',l); b.title=l+'（快捷鍵 H）'; }
const SKY_MODES=[['auto','自動',null],['day','白天',12],['dusk','黃昏',17.6],['night','夜晚',22]];
function setSky(mode,keep){ const m=SKY_MODES.find(s=>s[0]===mode)||SKY_MODES[0]; if(!keep){ UIP.sky=m[0]; saveUIP(); } window.__skyPref=m[2]; if(typeof window.__skyHour==='function') window.__skyHour(m[2]); $('#skyBtn').textContent='天空：'+m[1]; }
$('#skyBtn').addEventListener('click',()=>{ const i=SKY_MODES.findIndex(s=>s[0]===(UIP.sky||'auto')); setSky(SKY_MODES[(i+1)%SKY_MODES.length][0]); });
$('#backupBtn').addEventListener('click',()=>{ markInteracted(); renderBackup(); });
$('#hudMin').addEventListener('click',()=>setHudMini(!document.body.classList.contains('hud-mini')));
$('#compactBtn').addEventListener('click',()=>setCompact(!UIP.compact));
$('#eyeBtn').addEventListener('click',()=>setUiHidden(!document.body.classList.contains('ui-hidden')));
setHudMini(hudPref(), true); setCompact(!!UIP.compact); setSky(UIP.sky||'auto',true);
// 載入畫面：3D 第一次畫出來後淡出；10 秒還沒好就提供省電模式
const loaderEl=$('#loader');
function hideLoader(){ if(loaderEl.classList.contains('done')) return; loaderEl.classList.add('done'); setTimeout(()=>{ loaderEl.hidden=true; },700); }
window.__firstFrame=hideLoader;
$('#ldLite').addEventListener('click',()=>{ setLite(true); hideLoader(); });
if(ST.lite){ setLite(true); hideLoader(); }
else {
  setTimeout(()=>{ if(!startScene()) hideLoader(); },60);
  setTimeout(()=>{ if(!loaderEl.classList.contains('done')){ $('#ldMsg').textContent='還在努力建造中，裝置可能比較吃力。'; $('#ldLite').hidden=false; } },10000);
}
refreshProgress();

function buildScene(){
  if(!window.THREE) throw new Error('three.js 未載入');
  const T=THREE;
  const canvas=$('#scene');
  const renderer=new T.WebGLRenderer({canvas,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap;
  const scene=new T.Scene();
  scene.fog=new T.Fog('#bfe1ea',100,300);
  const camera=new T.PerspectiveCamera(38,1,0.1,1000);
  const hemi=new T.HemisphereLight(0xffffff,0x8a7a5a,0.75); scene.add(hemi);
  const sun=new T.DirectionalLight(0xfff6e6,0.85); sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048); sun.shadow.bias=-0.00015; sun.shadow.normalBias=0.025;
  scene.add(sun); scene.add(sun.target);
  const sunOff=new T.Vector3(16,30,14);
  // 補光：從主光反方向打一盞冷色光，讓暗面有層次
  const fill=new T.DirectionalLight(0xbfd6ff,0.28); fill.position.set(-14,9,-12); scene.add(fill);

  const matCache={};
  // 合併靜態零件：同一群組內所有一般材質的網格併成一個（以頂點顏色保留原色），大幅減少繪製次數
  const bakedMat=new T.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:.92,metalness:0});
  function bake(root,skip,shadow){
    root.updateMatrixWorld(true);
    const inv=new T.Matrix4().copy(root.matrixWorld).invert(), mats=new Set(Object.values(matCache)), list=[];
    (function walk(o){ o.children.forEach(c=>{ if(c.userData.noBake||(skip&&skip(c))) return; if(c.isMesh && !c.isInstancedMesh && mats.has(c.material) && c.visible) list.push(c); walk(c); }); })(root);
    if(list.length<2) return null;
    let n=0, cast=false; const parts=list.map(m=>{ const g=(m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone()); g.applyMatrix4(new T.Matrix4().multiplyMatrices(inv,m.matrixWorld)); n+=g.attributes.position.count; if(m.castShadow) cast=true; return {g,c:m.material.color}; });
    const pos=new Float32Array(n*3), col=new Float32Array(n*3); let o=0;
    parts.forEach(({g,c})=>{ const a=g.attributes.position.array; pos.set(a,o*3); const k=a.length/3; for(let i=0;i<k;i++){ col[(o+i)*3]=c.r; col[(o+i)*3+1]=c.g; col[(o+i)*3+2]=c.b; } o+=k; g.dispose(); });
    const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.BufferAttribute(pos,3)); geo.setAttribute('color',new T.BufferAttribute(col,3)); geo.computeVertexNormals();
    const mesh=new T.Mesh(geo,bakedMat); mesh.castShadow=shadow!=null?shadow:cast; mesh.receiveShadow=true;
    list.forEach(m=>m.parent.remove(m)); root.add(mesh); return mesh;
  }
  const mat=c=>matCache[c]||(matCache[c]=new T.MeshStandardMaterial({color:c,flatShading:true,roughness:.92,metalness:0}));
  function M(geo,m,x,y,z){ const mesh=new T.Mesh(geo,typeof m==='string'?mat(m):m); mesh.position.set(x||0,y||0,z||0); mesh.castShadow=true; mesh.receiveShadow=true; return mesh; }
  const box=(w,h,d,c,x,y,z)=>M(new T.BoxGeometry(w,h,d),c,x,(y||0)+h/2,z);
  const cyl=(rt,rb,h,c,x,y,z,seg)=>M(new T.CylinderGeometry(rt,rb,h,seg||10),c,x,(y||0)+h/2,z);
  const cone=(r,h,seg,c,x,y,z)=>M(new T.ConeGeometry(r,h,seg),c,x,(y||0)+h/2,z);
  function prism(r,len,c,x,y,z,sy){ const g=new T.CylinderGeometry(r,r,len,3,1,false,Math.PI/2); g.rotateZ(Math.PI/2); g.scale(1,sy||0.6,1); return M(g,c,x,y,z); }
  let seed=20261026;
  const rnd=()=>{ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
  function jitterGeo(g,jit){ const p=g.attributes.position; for(let i=0;i<p.count;i++){ const x=p.getX(i),z=p.getZ(i); if(Math.hypot(x,z)<1e-4) continue; const k=jit(Math.atan2(x,z)); p.setX(i,x*k); p.setZ(i,z*k);} g.computeVertexNormals(); return g; }
  const jit0=t=>1+0.05*Math.sin(3*t+0.5)+0.035*Math.sin(7*t+2);

  const lanternMat=new T.MeshStandardMaterial({color:'#d8342a',emissive:'#b0201a',emissiveIntensity:0.35,flatShading:true});
  const lampMat=new T.MeshStandardMaterial({color:'#ffe9a8',emissive:'#ffd76a',emissiveIntensity:0.4,flatShading:true});
  const beamMat=new T.MeshBasicMaterial({color:'#fff3b0',transparent:true,opacity:0.12,depthWrite:false,side:T.DoubleSide});
  const beams=[];

  /* --- 模型 --- */
  const MODELS={
    // 臺灣史島主島：清代臺北府城北門（承恩門）
    citygate(){ const g=new T.Group();
      g.add(box(2.4,1.0,1.6,'#9a8f7e')); g.add(box(2.5,0.08,1.7,'#857a69',0,1.0,0));
      g.add(box(0.62,0.6,0.06,'#2e2620',0,0,0.79)); const ar=M(new T.CylinderGeometry(0.31,0.31,0.06,12,1,false,Math.PI/2,Math.PI),'#2e2620',0,0.6,0.79); ar.rotation.x=Math.PI/2; g.add(ar);
      for(let i=0;i<6;i++) g.add(box(0.36,0.04,0.02,'#8a7f6e',-0.95+i*0.38,0.25+((i%2)*0.3),0.81));
      g.add(box(1.5,0.62,1.0,'#b5503a',0,1.08,0)); [-0.45,0.45].forEach(x=>g.add(box(0.22,0.26,0.03,'#3b2418',x,1.25,0.51))); g.add(box(0.22,0.3,0.03,'#3b2418',0,1.08,0.51));
      g.add(box(0.46,0.16,0.03,'#2f5d9a',0,1.5,0.53)); g.add(box(0.36,0.06,0.035,'#e3b23c',0,1.55,0.535));
      g.add(box(1.9,0.07,1.3,'#4a3a33',0,1.7,0)); g.add(prism(0.62,1.8,'#5a463c',0,1.77+0.5*0.62*0.55,0,0.55));
      g.add(box(1.86,0.07,0.09,'#3e302a',0,1.98,0)); [-1,1].forEach(s=>{ const t=box(0.3,0.06,0.09,'#3e302a',s*1.02,2.0,0); t.rotation.z=s*0.45; g.add(t); });
      return g; },
    voy(){ const g=new T.Group();
      g.add(box(2.6,0.55,2.6,'#b4623d'));
      [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{ const b=box(0.75,0.65,0.75,'#a3532f',sx*1.3,0,sz*1.3); b.rotation.y=Math.PI/4; g.add(b); });
      for(let i=0;i<5;i++){ const t=-1+i*0.5; [[t*1.1,1.25],[t*1.1,-1.25],[1.25,t*1.1],[-1.25,t*1.1]].forEach(([x,z])=>g.add(box(0.2,0.16,0.2,'#a3532f',x,0.55,z))); }
      g.add(box(1.6,0.6,1.6,'#c27149',0,0.55,0)); g.add(box(0.75,0.5,0.75,'#e3dccd',0,1.15,0));
      const roof=cone(0.62,0.5,4,'#7a3b26',0,1.65,0); roof.rotation.y=Math.PI/4; g.add(roof);
      g.add(cyl(0.025,0.025,1.3,'#4a3a2c',0.95,1.15,0.95,6));
      ['#d7542b','#f4f1ea','#2f5d9a'].forEach((c,i)=>g.add(box(0.55,0.12,0.02,c,1.23,2.2-i*0.12,0.95)));
      // 城門與窗戶
      g.add(box(0.46,0.4,0.06,'#3b2418',0,0,1.3)); const arch=M(new T.CylinderGeometry(0.23,0.23,0.06,10,1,false,Math.PI/2,Math.PI),'#3b2418',0,0.4,1.3); arch.rotation.x=Math.PI/2; g.add(arch);
      [-0.45,0.45].forEach(x=>g.add(box(0.16,0.2,0.03,'#3b2418',x,0.75,0.81))); g.add(box(0.14,0.16,0.03,'#3b2418',0,1.28,0.39));
      return g; },
    pre(){ const g=new T.Group();
      g.add(box(1.5,0.55,1.1,'#8e8a80',-0.3,0,-0.3)); g.add(prism(0.7,1.6,'#6f6b63',-0.3,0.55+0.17,-0.3,0.45));
      g.add(box(0.3,0.42,0.06,'#4a463f',-0.3,0,0.26));
      const pot=new T.LatheGeometry([[0,0],[0.22,0.02],[0.32,0.2],[0.3,0.42],[0.18,0.55],[0.2,0.66],[0.17,0.68]].map(p=>new T.Vector2(p[0],p[1])),10);
      g.add(M(pot,'#b0703f',0.9,0,0.6));
      g.add(box(0.28,1.2,0.22,'#a9a59a',1.0,0,-0.6)); g.add(M(new T.TorusGeometry(0.2,0.06,4,10,Math.PI),'#a9a59a',1.0,1.32,-0.6));
      g.add(cyl(0.35,0.4,0.12,'#7b6d5c',-1.0,0,0.8,8));
      for(let i=0;i<5;i++){ const s=M(new T.DodecahedronGeometry(0.12,0),'#d8d0c0',-1.0+Math.cos(i)*0.18,0.15,0.8+Math.sin(i)*0.18); g.add(s); }
      return g; },
    qpe(){ const g=new T.Group();
      g.add(box(2.6,0.14,1.0,'#8b6a46',0,0,0.8));
      for(let i=0;i<4;i++) g.add(cyl(0.05,0.05,0.4,'#6b4f36',-1.1+i*0.73,-0.26,1.25,6));
      const hull=new T.Group(); hull.position.set(-0.1,0.05,-0.5);
      hull.add(box(1.7,0.35,0.6,'#7a4a2c'));
      const bow=prism(0.3,0.6,'#7a4a2c',0.98,0.28,0,1.0); bow.rotation.y=Math.PI/2; bow.scale.set(1,1,0.6); hull.add(bow);
      hull.add(box(0.5,0.3,0.55,'#8f5a36',-0.55,0.35,0));
      hull.add(cyl(0.035,0.04,1.7,'#5b3d26',0.1,0.35,0,6));
      hull.add(box(0.06,1.0,0.9,'#d9b56b',0.12,0.75,0));
      g.add(hull);
      [[0.8,0.14,0.75,'#a47148'],[1.1,0.14,0.9,'#9b6b3f'],[0.95,0.44,0.82,'#b07d4f']].forEach(([x,y,z,c])=>g.add(box(0.3,0.3,0.3,c,x,y,z)));
      g.add(cyl(0.12,0.12,0.36,'#c8a35a',-0.8,0.14,0.8,8));
      return g; },
    qsc(){ const g=new T.Group();
      g.add(box(2.4,0.18,1.7,'#cfc4b0'));
      g.add(box(1.7,0.75,1.0,'#c94a3a',0,0.18,-0.15));
      const r=prism(0.72,2.1,'#d98a3a',0,0.93+0.18,-0.15,0.5); g.add(r);
      [-1.08,1.08].forEach(x=>{ const t=cone(0.1,0.35,4,'#d98a3a',x,1.05,-0.15); t.rotation.z=x<0?0.9:-0.9; g.add(t); });
      g.add(box(0.5,0.5,0.06,'#6b2a20',0,0.18,0.36));
      [-0.6,0.6].forEach(x=>g.add(cyl(0.07,0.07,0.75,'#a8352a',x,0.18,0.4,8)));
      g.add(cyl(0.16,0.2,0.75,'#bfb39c',1.0,0.18,0.55,6)); g.add(cone(0.26,0.3,6,'#d98a3a',1.0,0.93,0.55));
      g.add(cyl(0.3,0.3,0.25,'#9a8f7a',-0.9,0.18,0.55,8));
      // 屋脊與紅燈籠
      g.add(box(2.15,0.06,0.08,'#8a3b20',0,1.47,-0.15));
      [-0.6,0.6].forEach(x=>{ g.add(cyl(0.008,0.008,0.12,'#3a2a1e',x,0.8,0.5,4)); const ln=M(new T.SphereGeometry(0.09,10,8),lanternMat,x,0.74,0.5); ln.scale.y=1.25; g.add(ln); });
      return g; },
    jpe(){ const g=new T.Group();
      g.add(box(1.8,0.8,1.1,'#9a6b4f',-0.2,0,-0.2));
      for(let i=0;i<3;i++){ const p=prism(0.3,1.1,'#6e5446',-0.8+i*0.6,0.8+0.08,-0.2,0.7); p.rotation.y=Math.PI/2; g.add(p); }
      g.add(cyl(0.13,0.2,2.4,'#7a4e3a',0.95,0,-0.5,10)); g.add(cyl(0.16,0.16,0.12,'#3d2a20',0.95,2.3,-0.5,10));
      for(let r=0;r<3;r++) for(let c=0;c<5;c++) g.add(cyl(0.03,0.03,0.55+rnd()*0.2,'#6aa84f',-1.1+c*0.28,0,0.75+r*0.25,4));
      g.add(box(2.4,0.04,0.12,'#5a5550',0,0,0.42));
      // 廠房窗戶與大門
      for(let i=0;i<4;i++) g.add(box(0.22,0.24,0.03,'#3a3f45',-0.92+i*0.42,0.38,0.36));
      g.add(box(0.3,0.36,0.03,'#5a3a2a',0.55,0,0.36));
      return g; },
    jsc(){ const g=new T.Group();
      g.add(box(2.4,0.25,0.95,'#a5533a',0,0,-0.1));
      g.add(box(2.4,0.55,0.95,'#efe5d0',0,0.25,-0.1));
      g.add(box(2.5,0.08,1.05,'#5e6a72',0,0.8,-0.1));
      g.add(box(0.55,1.5,0.55,'#efe5d0',0,0,0.05));
      const cr=cone(0.48,0.5,4,'#5e6a72',0,1.5,0.05); cr.rotation.y=Math.PI/4; g.add(cr);
      const face=M(new T.CylinderGeometry(0.16,0.16,0.04,16),'#fbfaf5',0,1.2,0.33); face.rotation.x=Math.PI/2; g.add(face);
      for(let i=0;i<4;i++){ g.add(box(0.22,0.28,0.04,'#7fa1b3',-1.0+i*0.36+(i>1?0.45:0),0.35,0.38)); }
      g.add(cyl(0.025,0.025,1.4,'#4a4a4a',-1.0,0,0.75,6));
      // 鐘的指針與大門
      const hh=box(0.025,0.09,0.01,'#2b2b2b',0,1.2,0.355); hh.position.y=1.24; g.add(hh);
      const mh=box(0.12,0.02,0.01,'#2b2b2b',0,1.2,0.356); mh.position.set(0.05,1.2,0.356); g.add(mh);
      g.add(box(0.26,0.42,0.03,'#6b4f36',0,0,0.335));
      return g; },
    cpd(){ const g=new T.Group();
      g.add(box(2.6,0.1,1.4,'#d7d2c6',0,0,0));
      [-0.95,-0.32,0.32,0.95].forEach((x,i)=>g.add(box(0.2,i===1||i===2?1.3:1.0,0.2,'#f2f0ea',x,0.1,0)));
      g.add(box(2.3,0.16,0.34,'#f2f0ea',0,1.1,0));
      const top=prism(0.3,2.4,'#2f5d9a',0,1.3+0.07,0,0.55); g.add(top);
      g.add(box(0.8,0.12,0.3,'#f2f0ea',0,1.4,0)); g.add(prism(0.24,0.95,'#2f5d9a',0,1.56,0,0.55));
      g.add(box(0.42,0.36,0.32,'#fbfbf8',0.9,0.1,0.85)); g.add(box(0.22,0.02,0.04,'#2b2b2b',0.9,0.47,0.85));
      g.add(box(0.12,0.16,0.02,'#d7542b',0.9,0.2,1.02));
      return g; },
    ces(){ const g=new T.Group();
      g.add(box(1.5,0.7,1.0,'#cfd6dc',-0.5,0,-0.3)); g.add(box(1.5,0.08,1.05,'#8aa0b0',-0.5,0.7,-0.3));
      g.add(box(0.7,1.6,0.7,'#33485c',0.95,0,-0.4));
      for(let r=0;r<4;r++) g.add(box(0.72,0.06,0.72,'#6fb7d6',0.95,0.3+r*0.35,-0.4));
      const cols=['#d7542b','#2f74b5','#3c9a5a','#e3b23c'];
      for(let i=0;i<4;i++) g.add(box(0.75,0.3,0.32,cols[i],-0.6+(i%2)*0.8,Math.floor(i/2)*0.3,0.75));
      return g; },
    greatwall(){ const g=new T.Group();
      g.add(M(jitterGeo(new T.CylinderGeometry(1.2,2.3,0.6,9),jit0),'#8f9c62',0,0.3,0));
      const pts=[]; for(let i=0;i<=6;i++){ const t=i/6, x=-2+4*t; pts.push(new T.Vector3(x,0.6-0.25*Math.abs(x)/2,0.55*Math.sin(t*Math.PI*1.4))); }
      for(let i=0;i<pts.length-1;i++){ const a=pts[i],b=pts[i+1],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);
        const s=new T.Group(); s.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2); s.rotation.y=-Math.atan2(dz,dx);
        s.add(box(len+0.06,0.45,0.34,'#b3ab98')); s.add(box(0.14,0.13,0.08,'#9e9684',-len*0.25,0.45,0.15)); s.add(box(0.14,0.13,0.08,'#9e9684',len*0.25,0.45,0.15)); g.add(s); }
      [0,3,6].forEach(i=>{ const p=pts[i]; g.add(box(0.6,0.9,0.6,'#a39a85',p.x,p.y,p.z)); const r=cone(0.5,0.35,4,'#6b4a35',p.x,p.y+0.9,p.z); r.rotation.y=Math.PI/4; g.add(r); });
      return g; },
    pyramid(){ const g=new T.Group();
      const p1=cone(1.45,1.8,4,'#e0bf74',-0.2,0,-0.2); p1.rotation.y=Math.PI/4; g.add(p1);
      const p2=cone(0.75,0.95,4,'#d7b366',1.35,0,0.75); p2.rotation.y=Math.PI/4; g.add(p2);
      const trunk=cyl(0.06,0.09,1.2,'#8a6a45',-1.35,0,1.05,6); trunk.rotation.z=0.18; g.add(trunk);
      for(let i=0;i<5;i++){ const leaf=M(new T.ConeGeometry(0.16,0.9,4),'#4f9a45',-1.25,1.2,1.05); leaf.geometry.translate(0,0.45,0); leaf.rotation.y=i*Math.PI*2/5; leaf.rotation.z=1.9; g.add(leaf); }
      return g; },
    yushan(){ const g=new T.Group();
      const mg=new T.ConeGeometry(2.1,3.5,8,3); const p=mg.attributes.position;
      for(let i=0;i<p.count;i++){ if(p.getY(i)<0.4){ const k=0.88+rnd()*0.24; p.setX(i,p.getX(i)*k); p.setZ(i,p.getZ(i)*k);} }
      mg.computeVertexNormals(); g.add(M(mg,'#6f8b63',0,1.75,0));
      g.add(M(new T.ConeGeometry(0.68,1.08,8),'#f4f7f8',0,2.97,0));
      g.add(cone(1.25,2.1,7,'#7d9870',1.5,0,-0.7)); g.add(M(new T.ConeGeometry(0.42,0.65,7),'#f4f7f8',1.5,1.78,-0.7));
      return g; },
    lighthouse(){ const g=new T.Group();
      g.add(M(jitterGeo(new T.CylinderGeometry(0.85,1.1,0.45,9),jit0),'#8d8a83',0,0.22,0));
      g.add(cyl(0.34,0.56,2.4,'#f3f3ee',0,0.45,0,14));
      [0.75,1.55].forEach(h=>{ const r=0.56-0.22*(h/2.4); g.add(cyl(r+0.015,r+0.05,0.32,'#d04a35',0,0.45+h-0.16,0,14)); });
      g.add(cyl(0.44,0.44,0.08,'#3d4a52',0,2.85,0,14));
      g.add(M(new T.CylinderGeometry(0.3,0.3,0.4,12),lampMat,0,3.13,0));
      g.add(cone(0.42,0.38,12,'#d04a35',0,3.33,0));
      const pivot=new T.Group(); pivot.position.y=3.13;
      const bg=new T.ConeGeometry(0.7,6,20,1,true); bg.translate(0,-3,0); bg.rotateZ(Math.PI/2);
      const beam=new T.Mesh(bg,beamMat); beam.raycast=()=>{}; pivot.add(beam); g.add(pivot); beams.push(pivot);
      return g; },
    pagoda(){ const g=new T.Group();
      g.add(box(1.7,0.2,1.7,'#bfb39c'));
      for(let i=0;i<5;i++){ const s=1.2-i*0.18, y=0.2+i*0.55;
        g.add(box(s,0.38,s,'#c9563f',0,y,0));
        const r=cone(s*0.95,0.22,4,'#3d5a50',0,y+0.36,0); r.rotation.y=Math.PI/4; g.add(r); }
      g.add(cyl(0.03,0.03,0.6,'#c9a646',0,3.0,0,6));
      return g; },
    houses(){ const g=new T.Group();
      [[-0.9,0.4,'#e8d5b5','#b5533b'],[0.4,-0.6,'#d9e2e8','#3e6f8f'],[1.0,0.8,'#efe1c8','#6b8f4e']].forEach(([x,z,w,r])=>{
        g.add(box(0.9,0.6,0.7,w,x,0,z)); g.add(prism(0.45,1.0,r,x,0.6+0.11,z,0.5)); g.add(box(0.18,0.32,0.03,'#6b4f36',x,0,z+0.36)); });
      g.add(cyl(0.025,0.025,1.4,'#4a4a4a',-0.2,0,1.1,6)); g.add(box(0.4,0.25,0.02,'#d7542b',0.0,1.15,1.1));
      return g; },
    parliament(){ const g=new T.Group();
      g.add(box(2.9,0.18,2.1,'#d9d4c8')); g.add(box(2.65,0.18,1.85,'#e3ded2',0,0.18,0));
      g.add(box(2.3,1.0,1.15,'#eeeae1',0,0.36,-0.25));
      for(let i=0;i<5;i++) g.add(cyl(0.085,0.095,0.92,'#f6f3ec',-0.84+i*0.42,0.36,0.62,8));
      g.add(box(2.3,0.14,0.5,'#e6e1d6',0,1.28,0.45)); g.add(prism(0.42,2.3,'#e6e1d6',0,1.55,0.45,0.55));
      g.add(cyl(0.48,0.48,0.32,'#e6e1d6',0,1.36,-0.35,14));
      g.add(M(new T.SphereGeometry(0.48,14,7,0,Math.PI*2,0,Math.PI/2),'#7fa6a0',0,1.68,-0.35));
      return g; },
    market(){ const g=new T.Group();
      [[-1.05,0.25,'#e2552d'],[0.2,-0.7,'#3e8fb0'],[1.1,0.6,'#e3b23c']].forEach(([x,z,c],si)=>{
        const s=new T.Group(); s.position.set(x,0,z); s.rotation.y=(si-1)*0.35;
        s.add(box(0.95,0.42,0.5,'#a47148'));
        [[-0.42,-0.2],[0.42,-0.2],[-0.42,0.2],[0.42,0.2]].forEach(([px,pz])=>s.add(cyl(0.025,0.025,1.05,'#6b4f36',px,0,pz,5)));
        s.add(prism(0.42,1.1,c,0,1.15,0,0.5)); g.add(s); });
      for(let i=0;i<5;i++) g.add(cyl(0.2,0.2,0.07,'#e3b23c',0.05,i*0.075,1.2,12));
      return g; },
    crane(){ const g=new T.Group();
      g.add(box(0.5,0.12,0.5,'#6b6b6b'));
      g.add(box(0.16,3.2,0.16,'#e8b830',0,0.12,0));
      g.add(box(2.6,0.12,0.14,'#e8b830',0.75,3.2,0));
      g.add(box(0.35,0.3,0.3,'#555',-0.45,3.0,0));
      g.add(box(0.02,1.3,0.02,'#333',1.8,1.95,0)); g.add(box(0.25,0.25,0.25,'#a5653f',1.8,1.7,0));
      return g; }
  };

/*CHAPMODELS*/
  function tree(parent,x,z,s,kind){
    const g=new T.Group(); g.position.set(x,0.55,z); g.userData.tree=true;
    g.add(cyl(0.07*s,0.1*s,0.45*s,'#7a5536',0,0,0,5));
    if(kind==='round') g.add(M(new T.IcosahedronGeometry(0.42*s,0),'#5f9e52',0,0.75*s,0));
    else { g.add(cone(0.45*s,1.0*s,6,'#3f7f45',0,0.3*s,0)); g.add(cone(0.33*s,0.75*s,6,'#4c9150',0,0.75*s,0)); }
    parent.add(g);
  }

  const LMS=0.95; // 地標模型縮放（與小人比例一致）
  /* --- 島嶼 --- */
  const islands={}, lmGroups={}, islPickers=[];
  const routeList=[];
  const fogMat=new T.MeshStandardMaterial({color:'#e4e9ed',transparent:true,opacity:0.6,flatShading:true,roughness:1,depthWrite:false});
  const ARCH={MR:4.0, IR:3.1, RR:10.6}; // 群島型（完工的島）：主島半徑、章節小島半徑、小島環半徑
  const islets={}; // 章節小島：id -> {ig, wc, la, grow:[s1,s2,s3], fog}
  function islandBody(parent,R,jit,color,seg,y0){
    parent.add(M(jitterGeo(new T.CylinderGeometry(R,R*0.72,2.6,seg,2),jit),'#b49c76',0,-0.95,0));
    parent.add(M(jitterGeo(new T.CylinderGeometry(R*1.09,R*1.15,0.6,seg),jit),'#e2cd9c',0,y0,0));
    parent.add(M(jitterGeo(new T.CylinderGeometry(R*0.9,R*0.9,0.2,Math.max(16,seg-8)),jit),color,0,0.45,0));
  }
  function house(parent,x,z,ry,wall,roof){ const h=new T.Group(); h.position.set(x,0.55,z); h.rotation.y=ry;
    h.add(box(0.62,0.42,0.5,wall)); h.add(prism(0.32,0.72,roof,0,0.42+0.08,0,0.5)); h.add(box(0.13,0.22,0.03,'#6b4f36',0,0,0.26)); parent.add(h); return h; }
  ISLANDS.forEach((isl,idx)=>{
    const arch=true; // 每座島都是「主島＋章節小島」
    const chaps=isl.ready ? isl.lms.map(l=>({id:l.id,mk:MODELS[l.id]||CM[isl.id][l.ci]})) : isl.plan.map((nm,i)=>({id:isl.id+'-'+i,mk:CM[isl.id][i]}));
    const a=(SUBJ[isl.subj].angle+(isl.g-1)*36)*Math.PI/180, R0=50;
    const pos=new T.Vector3(Math.sin(a)*R0,0,Math.cos(a)*R0);
    const R=arch?ARCH.RR+ARCH.IR:6.2, ph=idx*1.7+0.3;
    const jit=t=>1+0.06*Math.sin(3*t+ph)+0.04*Math.sin(5*t+ph*2.1)+0.02*Math.sin(11*t+ph*0.7);
    const g=new T.Group(); g.position.copy(pos); g.userData.islId=isl.id; scene.add(g);
    const pieces=[], col=SUBJ[isl.subj].color; let I_islets=[];
    if(arch){
      const {MR,IR,RR}=ARCH;
      // 主島：中央廣場與島名旗
      islandBody(g,MR,jit,col,32,-0.1); pieces.push({x:pos.x,z:pos.z,R:MR,jit,main:true});
      if(isl.ready && !isl.decor){
        g.add(M(new T.CylinderGeometry(1.5,1.6,0.25,16),'#b9a78a',0,0.47,0));
        g.add(cyl(0.05,0.06,2.2,'#6b4f36',0,0.6,0,6));
        g.add(box(0.9,0.5,0.03,col,0.47,2.2,0));
      } else {
        // 建造中的島：主島放代表模型與吊車
        const d=MODELS[isl.decor](); d.scale.setScalar(isl.decor==='yushan'?0.7:0.72); d.position.y=0.55; d.rotation.y=-a+Math.PI; g.add(d);
        if(!isl.ready){ const cr=MODELS.crane(); cr.scale.setScalar(0.7); cr.position.set(Math.sin(a+Math.PI/2)*2.3,0.55,Math.cos(a+Math.PI/2)*2.3); cr.rotation.y=rnd()*6; g.add(cr); }
      }
      const step=Math.PI*2/chaps.length, islAngles=chaps.map((c,i)=>a+Math.PI+step/2+i*step); // 鏡頭從外側看：第 1 章在左後方，依序經過前方，到右後方結束，與底部列的左右順序一致
      const myIslets=[];
      // 主島樹木：避開通往小島的棧橋
      for(let i=0;i<(isl.ready?14:8);i++){ const ta=rnd()*Math.PI*2, tr=(isl.ready?2.2:2.9)+rnd()*(isl.ready?1.2:0.5); if(islAngles.some(la=>Math.abs(Math.atan2(Math.sin(ta-la),Math.cos(ta-la)))<0.32)) continue; tree(g,Math.sin(ta)*tr,Math.cos(ta)*tr,0.6+rnd()*0.3,isl.subj==='geo'?'pine':'round'); }
      chaps.forEach((l,i)=>{
        const la=islAngles[i], c=new T.Vector3(Math.sin(la)*RR,0,Math.cos(la)*RR);
        const ijit=t=>1+0.07*Math.sin(3*t+i*1.3)+0.04*Math.sin(5*t+i*2.7)+0.02*Math.sin(9*t+i);
        const ig=new T.Group(); ig.position.copy(c); ig.userData.lmId=l.id; g.add(ig);
        islandBody(ig,IR,ijit,col,28,-0.1); pieces.push({x:pos.x+c.x,z:pos.z+c.z,R:IR,jit:ijit});
        const m=l.mk(); m.scale.setScalar(LMS);
        m.position.set(0,0.6,0); m.rotation.y=la;
        m.userData.lmId=l.id; m.userData.s=LMS; m.userData.angle=la; m.userData.h=2.6;
        ig.add(m); lmGroups[l.id]=m;
        const pad=M(jitterGeo(new T.CylinderGeometry(1.6,1.72,0.1,10),jit0),'#b09a78',0,0.55,0); pad.castShadow=false; ig.add(pad);
        if(!isl.ready){ islets[l.id]={ig,c,la,grow:[],fog:null,stage:-1,pop:0}; myIslets.push(islets[l.id]);
          const L0=MR*0.92, L1=RR-IR*0.92, len=L1-L0, sp=new T.Group(); sp.rotation.y=la;
          const dk=M(new T.BoxGeometry(0.9,0.07,len),'#8b6a46',0,0.66,L0+len/2); dk.castShadow=false; sp.add(dk);
          [-0.42,0.42].forEach(x=>{ sp.add(M(new T.BoxGeometry(0.04,0.04,len),'#6b4f36',x,1.0,L0+len/2)); [0,1].forEach(k=>sp.add(M(new T.BoxGeometry(0.05,0.36,0.05),'#6b4f36',x,0.84,L0+k*len))); });
          g.add(sp); return; }
        // 成長裝飾：熟練度越高，小島越熱鬧（位置以小島朝外方向 la 為基準）
        const slot=(rel,r)=>{ const t=la+rel; return [Math.sin(t)*r,Math.cos(t)*r,t]; };
        const s1=new T.Group(), s2=new T.Group(), s3=new T.Group();
        [[Math.PI-0.95,1],[Math.PI+0.95,-1]].forEach(([rel,sg],k)=>{ const [x,z,t]=slot(rel,2.25); house(s1,x,z,t+Math.PI,['#efe1c8','#e8d5b5'][k],['#b5533b','#8a5a3b'][k]); });
        [1.75,-1.75].forEach(rel=>{ const [x,z]=slot(rel,2.3); tree(s1,x,z,0.62,isl.subj==='geo'?'pine':'round'); });
        [2.45,-2.45].forEach(rel=>{ const [x,z]=slot(rel,2.35); s2.add(cyl(0.035,0.04,0.9,'#4a3a2c',x,0.55,z,6)); const ln=M(new T.SphereGeometry(0.11,10,8),lanternMat,x,1.42,z); ln.scale.y=1.2; s2.add(ln); });
        [Math.PI-1.75,Math.PI+1.75].forEach(rel=>{ const [x,z]=slot(rel,2.2); s2.add(M(new T.CylinderGeometry(0.32,0.36,0.12,8),'#7b6d5c',x,0.6,z)); for(let k=0;k<4;k++) s2.add(M(new T.IcosahedronGeometry(0.08,0),['#f2c94c','#eb5757','#bb6bd9','#f2994a'][k],x+Math.cos(k*1.6)*0.17,0.72,z+Math.sin(k*1.6)*0.17)); });
        { const [x,z]=slot(Math.PI,2.45); s3.add(cyl(0.04,0.05,2.6,'#6b4f36',x,0.55,z,6)); const fl=box(0.75,0.4,0.03,'#e3b23c',x+0.38,2.65,z); s3.add(fl); s3.userData.flag=fl; s3.add(M(new T.SphereGeometry(0.09,8,6),'#e3b23c',x,3.2,z)); }
        const haloG=new T.RingGeometry(IR*0.93,IR*1.0,48); haloG.rotateX(-Math.PI/2); const halo=new T.Mesh(haloG,new T.MeshBasicMaterial({color:'#ffd36a',transparent:true,opacity:0.5,depthWrite:false})); halo.position.y=0.57; halo.raycast=()=>{}; s3.add(halo); s3.userData.halo=halo;
        [s1,s2,s3].forEach(sg=>{ sg.visible=false; sg.traverse(o=>{ if(o.isMesh) o.raycast=()=>{}; }); ig.add(sg); });
        // 起霧：最近答錯較多時出現
        const fogM=fogMat.clone(); const fog=new T.Group(); fog.visible=false; fog.userData.mat=fogM;
        for(let k=0;k<7;k++){ const fm=new T.Mesh(new T.IcosahedronGeometry(0.75+rnd()*0.45,0),fogM); const fa=k/7*Math.PI*2; fm.position.set(Math.sin(fa)*(1.6+rnd()*1.1),1.2+rnd()*1.1,Math.cos(fa)*(1.6+rnd()*1.1)); fm.scale.y=0.55; fm.raycast=()=>{}; fm.castShadow=false; fog.add(fm); }
        ig.add(fog);
        islets[l.id]={ig,c,la,grow:[s1,s2,s3],fog,stage:-1,pop:0}; myIslets.push(islets[l.id]);
        // 棧橋：主島到小島
        const L0=MR*0.92, L1=RR-IR*0.92, len=L1-L0, sp=new T.Group(); sp.rotation.y=la;
        const nP=Math.ceil(len/0.5); for(let k=0;k<nP;k++){ const t=(k+0.5)/nP, zz=L0+t*len, y=0.6+0.28*Math.sin(Math.PI*t); const pl=M(new T.BoxGeometry(0.9,0.06,len/nP+0.03),'#8b6a46',0,y,zz); pl.castShadow=false; sp.add(pl); }
        [-0.42,0.42].forEach(x=>{ for(let k=0;k<=2;k++){ const t=k/2, zz=L0+t*len; sp.add(M(new T.BoxGeometry(0.05,0.38,0.05),'#6b4f36',x,0.6+0.28*Math.sin(Math.PI*t)+0.15,zz)); } });
        g.add(sp);
      });
      I_islets=myIslets;
      if(isl.ready && isl.subj==='hist'){
      // 時代航道：主島與小島之間的一圈浮標，光點依時代順序流動
      const rr=(MR*1.15+RR-IR*1.16)/2, a0=islAngles[0], a1=islAngles[chaps.length-1];
      const nD=Math.round(Math.abs(a0-a1)*rr/0.5);
      const routeDots=new T.InstancedMesh(new T.CylinderGeometry(0.12,0.12,0.06,8),new T.MeshBasicMaterial({color:'#ffffff'}),nD+1);
      const dm=new T.Object3D();
      for(let k=0;k<=nD;k++){ const t=a0-(a0-a1)*k/nD; dm.position.set(pos.x+Math.sin(t)*rr,0.17,pos.z+Math.cos(t)*rr); dm.updateMatrix(); routeDots.setMatrixAt(k,dm.matrix); routeDots.setColorAt(k,new T.Color('#f4f1ea')); }
      routeDots.raycast=()=>{}; routeDots.userData.n=nD+1; scene.add(routeDots); routeList.push(routeDots);
      // 起點小旗
      { const fa=a0-0.22*Math.sign(a1-a0), fx=Math.sin(fa)*rr, fz=Math.cos(fa)*rr; const b=cyl(0.16,0.2,0.3,'#f4f1ea',fx,-0.05,fz,8); g.add(b); g.add(cyl(0.02,0.02,1.0,'#5a4a3a',fx,0.2,fz,5)); g.add(box(0.4,0.24,0.02,'#d04a35',fx+0.2,1.0,fz)); }
      }
    } else {
      islandBody(g,R,jit,col,44,-0.18); pieces.push({x:pos.x,z:pos.z,R,jit});
      const avoid=[];
      const d=MODELS[isl.decor](); d.scale.setScalar(isl.decor==='yushan'?0.95:1.05); d.position.y=0.55; d.rotation.y=-a+Math.PI; g.add(d);
      const c=MODELS.crane(); c.position.set(2.8,0.55,-2.0); c.rotation.y=rnd()*6; g.add(c);
      avoid.push({x:0,z:0,c:2.8},{x:2.8,z:-2,c:1.2});
      for(let i=0;i<14;i++){ const ta=rnd()*Math.PI*2, tr=2.6+rnd()*2.6; const x=Math.sin(ta)*tr, z=Math.cos(ta)*tr; if(avoid.some(p=>Math.hypot(p.x-x,p.z-z)<p.c)) continue; avoid.push({x,z,c:0.8}); tree(g,x,z,0.65+rnd()*0.4,isl.subj==='geo'?'pine':'round'); }
    }
    islands[isl.id]={g,pos,R,angle:a,labelH:4.6,jit,ready:!!isl.ready,subj:isl.subj,pieces,arch,islets:I_islets};
    islPickers.push(g);
  });

  /* --- 因果航線：小島之間的發光弧線，小箱子沿線搬運 --- */
  const linkObjs=[], linkPickers=[];
  const arcGeoCache=[];
  LINKS.forEach((L,i)=>{
    const A=islets[L.a], B=islets[L.b]; if(!A||!B) return;
    const I=islands[LM_INFO[L.a].isl];
    const ab=B.c.clone().sub(A.c).setY(0).normalize();
    const pa=I.pos.clone().add(A.c).addScaledVector(ab,1.9).setY(2.7), pb=I.pos.clone().add(B.c).addScaledVector(ab,-1.9).setY(2.7);
    const mid=pa.clone().add(pb).multiplyScalar(0.5), d=pa.distanceTo(pb);
    const out=mid.clone().sub(I.pos).setY(0); const ol=out.length(); if(ol>0.5) out.multiplyScalar(1/ol);
    const ctrl=mid.clone().addScaledVector(out,ol>0.5?d*0.18:0).setY(2.7+d*0.5);
    const curve=new T.QuadraticBezierCurve3(pa,ctrl,pb);
    const m=new T.MeshBasicMaterial({color:'#ffb347',transparent:true,opacity:0.8,depthWrite:false});
    const tube=new T.Mesh(new T.TubeGeometry(curve,48,0.11,6,false),m); tube.raycast=()=>{}; tube.renderOrder=5; scene.add(tube);
    const gm=new T.MeshBasicMaterial({color:'#ffd36a',transparent:true,opacity:0.22,depthWrite:false}); const gl=new T.Mesh(new T.TubeGeometry(curve,48,0.28,8,false),gm); gl.raycast=()=>{}; gl.renderOrder=4; scene.add(gl);
    const head=new T.Mesh(new T.ConeGeometry(0.2,0.45,8),m); head.raycast=()=>{}; head.renderOrder=5;
    const hp=curve.getPoint(0.95), ht=curve.getTangent(0.95); head.position.copy(hp); head.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),ht.normalize()); scene.add(head);
    const pk=new T.Mesh(new T.TubeGeometry(curve,24,0.5,5,false),new T.MeshBasicMaterial({visible:false})); pk.userData.link=i; scene.add(pk); linkPickers.push(pk);
    const crate=new T.Group(); crate.add(M(new T.BoxGeometry(0.32,0.26,0.26),'#c89a5a')); crate.add(M(new T.BoxGeometry(0.34,0.05,0.28),'#8b6a46',0,0.0,0));
    const glow=new T.Mesh(new T.SphereGeometry(0.34,10,8),new T.MeshBasicMaterial({color:'#ffd36a',transparent:true,opacity:0.35,depthWrite:false})); glow.raycast=()=>{}; crate.add(glow);
    crate.traverse(o=>{ o.raycast=()=>{}; o.castShadow=false; }); scene.add(crate);
    linkObjs.push({i,curve,mat:m,gmat:gm,crate,t:rnd(),len:curve.getLength(),apex:curve.getPoint(0.5),pa,pb,mid,op:0.8});
  });

  /* --- 跨科航線：小船在不同島的章節之間往返 --- */
  const crossObjs=[];
  CROSS.forEach((L,i)=>{
    const A=islets[L.a], B=islets[L.b]; if(!A||!B) return;
    const IA=islands[LM_INFO[L.a].isl], IB=islands[LM_INFO[L.b].isl];
    const wa=IA.pos.clone().add(A.c), wb=IB.pos.clone().add(B.c);
    const mid=wa.clone().add(wb).multiplyScalar(0.5); let ctrl=mid.clone().multiplyScalar(0.25).setY(0);
    { const need=2*(7.2*1.75)-mid.length(); if(ctrl.length()<need){ const dir=mid.length()>1?mid.clone().setY(0).normalize():new T.Vector3(-(wb.z-wa.z),0,wb.x-wa.x).normalize(); ctrl=dir.multiplyScalar(Math.max(need,ctrl.length())); } }
    const pa=wa.clone().add(ctrl.clone().sub(wa).setY(0).normalize().multiplyScalar(ARCH.IR*1.25)).setY(0), pb=wb.clone().add(ctrl.clone().sub(wb).setY(0).normalize().multiplyScalar(ARCH.IR*1.25)).setY(0);
    const curve=new T.QuadraticBezierCurve3(pa,ctrl,pb), len=curve.getLength();
    const nd=Math.max(8,Math.floor(len/2.2)), dm=new T.Object3D();
    const wm=new T.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:0.45,depthWrite:false});
    const wake=new T.InstancedMesh(new T.CircleGeometry(0.22,8),wm,nd); wake.raycast=()=>{}; wake.renderOrder=2;
    for(let k=0;k<nd;k++){ const pt=curve.getPoint((k+0.5)/nd); dm.position.set(pt.x,0.16,pt.z); dm.rotation.set(-Math.PI/2,0,0); dm.updateMatrix(); wake.setMatrixAt(k,dm.matrix); }
    scene.add(wake);
    const boat=new T.Group(), body=new T.Group(); boat.add(body);
    body.add(box(1.5,0.32,0.6,'#7a4a2c',0,0,0)); const bow=prism(0.3,0.6,'#7a4a2c',0.95,0.2,0,1.0); bow.rotation.y=Math.PI/2; bow.scale.set(1,1,0.6); body.add(bow);
    body.add(box(0.45,0.3,0.45,'#efe6cf',-0.4,0.32,0)); body.add(cyl(0.035,0.04,1.7,'#5b3d26',0.15,0.32,0,6));
    const sailShape=new T.Shape(); sailShape.moveTo(0,0); sailShape.lineTo(0,1.3); sailShape.lineTo(-0.85,0); sailShape.lineTo(0,0);
    const sail=new T.Mesh(new T.ShapeGeometry(sailShape),new T.MeshStandardMaterial({color:SUBJ[IA.subj].color,side:T.DoubleSide,flatShading:true,roughness:0.9})); sail.position.set(0.18,0.55,0); sail.castShadow=true; body.add(sail);
    const flag=new T.Mesh(new T.BoxGeometry(0.42,0.24,0.02),new T.MeshStandardMaterial({color:SUBJ[IB.subj].color,flatShading:true})); flag.position.set(0.38,2.0,0); body.add(flag);
    const crate=box(0.32,0.26,0.32,'#c89a5a',0.55,0.16,0); body.add(crate);
    boat.scale.setScalar(1.35); boat.traverse(o=>{ o.raycast=()=>{}; });
    scene.add(boat);
    crossObjs.push({i,curve,len,boat,flag,wm,t:rnd(),dir:1,wait:0,op:0.45,pa,pb,mid:curve.getPoint(0.5)});
  });

/*PEOPLE*/
  /* --- 海、雲、星 --- */
  const wGeo=new T.PlaneGeometry(1400,1400,72,72); wGeo.rotateX(-Math.PI/2);
  const waterMat=new T.MeshStandardMaterial({color:'#3a97aa',flatShading:true,roughness:.55,metalness:.05,transparent:true,opacity:.94});
  const water=new T.Mesh(wGeo,waterMat); water.position.y=-0.3; water.receiveShadow=true; scene.add(water);
  const wBase=Float32Array.from(wGeo.attributes.position.array);
  function animateWater(t){ const arr=wGeo.attributes.position.array; for(let i=0;i<arr.length;i+=3){ const x=wBase[i], z=wBase[i+2]; arr[i+1]=Math.sin(x*0.16+t*0.9)*0.22+Math.cos(z*0.13+t*1.1)*0.18; } wGeo.attributes.position.needsUpdate=true; wGeo.computeVertexNormals(); }
  animateWater(0);
  const cloudMat=new T.MeshStandardMaterial({color:'#ffffff',flatShading:true,roughness:1,transparent:true,opacity:.95});
  const clouds=[]; let cloudsOn=true;
  for(let i=0;i<10;i++){ const c=new T.Group(); for(let k=0;k<3;k++){ const m=new T.Mesh(new T.IcosahedronGeometry(1.4+rnd()*1.2,0),cloudMat); m.position.set(k*1.8-1.8,rnd()*0.5,rnd()*0.8); c.add(m); } c.userData={a:rnd()*Math.PI*2,r:100+rnd()*40,y:40+rnd()*10,sp:0.006+rnd()*0.008}; scene.add(c); clouds.push(c); }
  const sg=new T.BufferGeometry(), sp=[];
  for(let i=0;i<700;i++){ const u=rnd()*Math.PI*2, v=0.08+rnd()*1.4; sp.push(300*Math.cos(v)*Math.sin(u),300*Math.sin(v),300*Math.cos(v)*Math.cos(u)); }
  sg.setAttribute('position',new T.Float32BufferAttribute(sp,3));
  const stars=new T.Points(sg,new T.PointsMaterial({color:'#dfe9ff',size:1.6,sizeAttenuation:true,fog:false})); scene.add(stars);

  /* --- 合併靜態零件 --- */
  {
    const animated=new Set(spinners.map(x=>x.o).concat(beams));
    spinners.forEach(x=>bake(x.o));
    Object.keys(islands).forEach(k=>{ const I=islands[k];
      I.islets.forEach(s=>{
        const model=lmGroups[Object.keys(lmGroups).find(id=>lmGroups[id].parent===s.ig)];
        if(model) bake(model,c=>animated.has(c),true);
        s.grow.forEach(sg=>bake(sg,c=>c===sg.userData.flag));
        bake(s.ig,c=>c===model||s.grow.includes(c)||c===s.fog,true);
      });
      bake(I.g,c=>animated.has(c)||I.islets.some(s=>s.ig===c),true);
    });
  }
  /* --- 主題 --- */
  function isDark(){ const t=document.documentElement.getAttribute('data-theme'); if(t==='dark') return true; if(t==='light') return false; return !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches); }
  // 天空依實際時間變化：清晨、白天、黃昏、夜晚（顏色在關鍵時刻之間平滑過渡）
  const SKY=[
    {h:0,   top:'#050c1c',bot:'#1d3352',sea:'#1f4a5e',hemi:'#8fa8d6',gnd:'#2b2a3a',hi:0.6, sun:'#b8c8ff',si:0.45,star:1,  lamp:1.3,cloud:0},
    {h:4.8, top:'#050c1c',bot:'#1d3352',sea:'#1f4a5e',hemi:'#8fa8d6',gnd:'#2b2a3a',hi:0.6, sun:'#b8c8ff',si:0.45,star:1,  lamp:1.3,cloud:0},
    {h:6,   top:'#7a9ad0',bot:'#fbd2a8',sea:'#5aa3b5',hemi:'#fff0e0',gnd:'#8a7460',hi:0.68,sun:'#ffc08a',si:0.72,star:0.15,lamp:0.8,cloud:0.8},
    {h:7.5, top:'#6fb9dc',bot:'#e3f3f5',sea:'#3a97aa',hemi:'#ffffff',gnd:'#8a7a5a',hi:0.62,sun:'#fff6e6',si:0.8, star:0,  lamp:0.4,cloud:1},
    {h:16.5,top:'#6fb9dc',bot:'#e3f3f5',sea:'#3a97aa',hemi:'#ffffff',gnd:'#8a7a5a',hi:0.62,sun:'#fff6e6',si:0.8, star:0,  lamp:0.4,cloud:1},
    {h:18,  top:'#5a6aac',bot:'#f6a878',sea:'#4d8aa3',hemi:'#ffe0c8',gnd:'#7a6050',hi:0.64,sun:'#ffa868',si:0.66,star:0.25,lamp:1.0,cloud:0.8},
    {h:19.5,top:'#050c1c',bot:'#1d3352',sea:'#1f4a5e',hemi:'#8fa8d6',gnd:'#2b2a3a',hi:0.6, sun:'#b8c8ff',si:0.45,star:1,  lamp:1.3,cloud:0},
    {h:24,  top:'#050c1c',bot:'#1d3352',sea:'#1f4a5e',hemi:'#8fa8d6',gnd:'#2b2a3a',hi:0.6, sun:'#b8c8ff',si:0.45,star:1,  lamp:1.3,cloud:0}
  ];
  const cA=new T.Color(), cB=new T.Color(), mixC=(a,b,t)=>cA.set(a).lerp(cB.set(b),t).clone();
  let skyHour=window.__skyPref!=null?window.__skyPref:null; // 使用者選的天空模式（null＝跟著真實時間）
  function applyTheme(){
    const now=new Date(), h=skyHour!=null?skyHour:now.getHours()+now.getMinutes()/60;
    let i=0; while(i<SKY.length-2 && SKY[i+1].h<=h) i++;
    const A=SKY[i], B=SKY[i+1], t=Math.max(0,Math.min(1,(h-A.h)/(B.h-A.h||1))), L=(x,y)=>x+(y-x)*t;
    const bot=mixC(A.bot,B.bot,t);
    skyUni.top.value.copy(mixC(A.top,B.top,t)); skyUni.bot.value.copy(bot);
    scene.background=bot.clone(); scene.fog.color.copy(bot); waterMat.color.copy(mixC(A.sea,B.sea,t));
    hemi.color.copy(mixC(A.hemi,B.hemi,t)); hemi.groundColor.copy(mixC(A.gnd,B.gnd,t)); hemi.intensity=L(A.hi,B.hi);
    sun.color.copy(mixC(A.sun,B.sun,t)); sun.intensity=L(A.si,B.si); fill.intensity=L(A.si,B.si)*0.35;
    const star=L(A.star,B.star); stars.visible=star>0.05; stars.material.transparent=true; stars.material.opacity=star;
    const lamp=L(A.lamp,B.lamp); lampMat.emissiveIntensity=lamp; beamMat.opacity=0.1+0.22*(lamp-0.4)/0.9; cloudsOn=L(A.cloud,B.cloud)>0.5;
    // 白天是太陽、夜晚是月亮，沿弧線移動；主光方向也跟著改變（保持一定仰角，避免影子過長）
    const day=h>=6&&h<18.5, th=day?Math.PI*(h-6)/12.5:Math.PI*(((h-18.5)+24)%24)/11.5;
    orbOff.set(-Math.cos(th)*320, 60+190*Math.sin(th), -260);
    orbMat.color.set(day?(h<7.5||h>16.5?'#ffd3a0':'#fff2c2'):'#e8eefc'); haloMat.color.set(day?'#fff6d8':'#9fb4dd'); haloMat.opacity=day?0.22:0.12;
    sunOff.set(-Math.cos(th)*20, Math.max(18,34*Math.sin(th)), 14);
    document.documentElement.dataset.skyPhase = day?(h<7.5?'dawn':(h>16.5?'dusk':'day')):'night';
  }
  window.__skyHour=h=>{ skyHour=h; applyTheme(); };
  setInterval(applyTheme,60000);
  applyTheme();
  if(window.matchMedia){ const mq=matchMedia('(prefers-color-scheme: dark)'); if(mq.addEventListener) mq.addEventListener('change',applyTheme); else if(mq.addListener) mq.addListener(applyTheme); }
  new MutationObserver(applyTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','class','style']});

  /* --- 鏡頭 --- */
  const TAU=Math.PI*2, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const narrow=()=>window.innerWidth<720;
  // 全景距離依螢幕比例調整，直式手機也能看到整圈群島
  const overD=()=>clamp(80/(Math.tan(19*Math.PI/180)*Math.min(1.25,Math.max(0.3,window.innerWidth/window.innerHeight))),205,500);
  const cam={yaw:0.35,pitch:0.92,dist:overD(),target:new T.Vector3(0,0,0)};
  cam.tYaw=cam.yaw; cam.tPitch=cam.pitch; cam.tDist=cam.dist; cam.tTarget=cam.target.clone();
  // 開場鏡頭：從高空俯衝到群島
  if(!reduceMotion){ cam.dist=overD()*2.1; cam.pitch=1.4; cam.yaw=cam.tYaw-0.9; }
  const shortest=(from,to)=>{ let d=((to-from)%TAU+TAU)%TAU; if(d>Math.PI) d-=TAU; return from+d; };
  let W=1,H=1;
  function resize(){ W=window.innerWidth; H=window.innerHeight; renderer.setSize(W,H,false); camera.aspect=W/H; camera.updateProjectionMatrix(); }
  window.addEventListener('resize',resize); resize();
  const off={x:0,y:0}; let fit=1, occT=-1e9, occ={l:0,r:1,t:0,b:1};
  const shown=e=>!!e && !e.hidden && e.getClientRects().length>0 && getComputedStyle(e).visibility!=='hidden';
  function measureOcc(){ const r={l:0,r:W,t:0,b:H};
    if(!document.body.classList.contains('ui-hidden')){
      const hud=document.querySelector('.hud');
      if(panel.hidden && shown(hud)){ const b=hud.getBoundingClientRect(); if(b.width>W*0.45||b.height<H*0.15) r.t=Math.max(r.t,b.bottom); else r.l=Math.max(r.l,Math.min(b.right,W*0.3)); }
      const dk=document.querySelector('.dock'); if(shown(dk)){ const db=dk.getBoundingClientRect(); r.b=Math.min(r.b,db.top); document.documentElement.style.setProperty('--dock-h',Math.round(H-db.top)+'px'); }
      if(shown(cardEl)){ const b=cardEl.getBoundingClientRect(); if(b.height>0){ if(b.width<W*0.45 && b.left<W*0.2) r.l=Math.max(r.l,b.right); else r.b=Math.min(r.b,b.top); } }
      if(!panel.hidden){ const b=panel.getBoundingClientRect(); if(b.width<W*0.6) r.r=Math.min(r.r,b.left); else r.b=Math.min(r.b,b.top); }
    }
    if(r.b-r.t<H*0.25){ r.t=0; r.b=H; } if(r.r-r.l<W*0.3){ r.l=0; r.r=W; }
    occ=r; }

  /* --- 操作 --- */
  const pointers=new Map(); let moved=0,pinch0=0,dist0=0,lastInput=0;
  canvas.addEventListener('pointerdown',e=>{ try{canvas.setPointerCapture(e.pointerId);}catch(_){} pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}); if(pointers.size===1) moved=0; lastInput=performance.now(); if(pointers.size===2){ const [a,b]=[...pointers.values()]; pinch0=Math.hypot(a.x-b.x,a.y-b.y); dist0=cam.tDist; } markInteracted(); });
  canvas.addEventListener('pointermove',e=>{
    const p=pointers.get(e.pointerId);
    if(!p){ if(e.pointerType==='mouse'){ const h=pick(e.clientX,e.clientY); const same=JSON.stringify(h)===JSON.stringify(hover); if(h&&h.hub) { canvas.classList.add('pointing'); hubLabel.classList.add('hover'); } else hubLabel.classList.remove('hover'); if(!same) setHover(h); canvas.classList.toggle('pointing',!!h); } return; }
    const dx=e.clientX-p.x, dy=e.clientY-p.y; p.x=e.clientX; p.y=e.clientY;
    if(pointers.size===1){ moved+=Math.abs(dx)+Math.abs(dy); if(moved>5) canvas.classList.add('dragging');
      cam.yaw-=dx*0.006; cam.tYaw=cam.yaw; cam.pitch=clamp(cam.pitch+dy*0.005,0.2,1.35); cam.tPitch=cam.pitch; }
    else if(pointers.size===2 && pinch0>0){ const [a,b]=[...pointers.values()]; const d=Math.hypot(a.x-b.x,a.y-b.y); cam.tDist=clamp(dist0*pinch0/Math.max(d,1),12,520); moved+=99; }
  });
  function endPointer(e){ const had=pointers.has(e.pointerId); pointers.delete(e.pointerId);
    if(had && e.type==='pointerup' && pointers.size===0 && moved<6){ const h=pick(e.clientX,e.clientY,e.pointerType==='mouse'?30:48); if(h){ if(h.walker!=null){ if(walkers[h.walker].guide) onGuide(); else showBubble(h.walker); } else if(h.hub){ if(!hubFocus) focusHub(); } else if(h.cross!=null){ if(h.cross!==crossFocus) focusCross(h.cross); } else if(h.link!=null){ if(h.link!==linkFocus) focusLink(h.link); } else if(h.lm){ if(CHAP_INFO[h.lm]){ if(h.lm!==chapFocus) focusChap(h.lm); } else if(h.lm!==lmFocus) focusLm(h.lm); } else if(h.isl!==focusId) focusIsland(h.isl); } }
    if(pointers.size<2) pinch0=0; if(!pointers.size) canvas.classList.remove('dragging'); }
  canvas.addEventListener('pointerup',endPointer); canvas.addEventListener('pointercancel',endPointer);
  canvas.addEventListener('pointerleave',e=>{ if(e.pointerType==='mouse'&&!pointers.size){ setHover(null); canvas.classList.remove('pointing'); } });
  canvas.addEventListener('wheel',e=>{ e.preventDefault(); markInteracted(); lastInput=performance.now(); cam.tDist=clamp(cam.tDist*(1+Math.sign(e.deltaY)*0.09),12,520); },{passive:false});

  const ray=new T.Raycaster(), ndc=new T.Vector2();
  const bubbleEl=document.createElement('div'); bubbleEl.className='bubble'; bubbleEl.hidden=true; labelsEl.appendChild(bubbleEl);
  let bubbleW=null, bubbleUntil=0;
  function showBubble(i){ const w=walkers[i]; bubbleW=i; bubbleUntil=performance.now()+6000; bubbleEl.innerHTML='<b>'+esc(w.sp.n)+'</b><span>'+esc(w.sp.d)+'</span><small>'+esc(w.unit)+'</small>'; bubbleEl.hidden=false; }
  function pick(cx,cy,rad){
    const r=canvas.getBoundingClientRect(); ndc.set(((cx-r.left)/r.width)*2-1,-((cy-r.top)/r.height)*2+1); ray.setFromCamera(ndc,camera);
    { const gw=walkers.find(w=>w.guide); if(gw){ v.set(gw.pos.x,gw.pos.y+0.9,gw.pos.z).project(camera); const sx=(v.x*0.5+0.5)*r.width+r.left, sy=(-v.y*0.5+0.5)*r.height+r.top; if(v.z<1 && Math.hypot(sx-cx,sy-cy)<(rad||30)) return {walker:walkers.indexOf(gw)}; } }
    if(cam.dist<70){ let best=null,bd=rad||30; walkers.forEach((w,i)=>{ v.set(w.pos.x,w.pos.y+0.5,w.pos.z).project(camera); if(v.z>1) return; const sx=(v.x*0.5+0.5)*r.width+r.left, sy=(-v.y*0.5+0.5)*r.height+r.top; const dd=Math.hypot(sx-cx,sy-cy); if(dd<bd){bd=dd;best=i;} }); if(best!=null) return {walker:best}; }
    { let best=null,bd=rad||30; crossObjs.forEach(o=>{ v.copy(o.boat.position); v.y+=1.0; v.project(camera); if(v.z>1) return; const sx=(v.x*0.5+0.5)*r.width+r.left, sy=(-v.y*0.5+0.5)*r.height+r.top; const dd=Math.hypot(sx-cx,sy-cy); if(dd<bd){ bd=dd; best=o.i; } }); if(best!=null) return {cross:best}; }
    if(focusId && islands[focusId].arch && cam.dist<95){ const lh=ray.intersectObjects(linkPickers,false); if(lh.length) return {link:lh[0].object.userData.link}; }
    const hits=ray.intersectObjects(islPickers,true);
    for(const h of hits){ let o=h.object, lm=null; while(o && !o.userData.islId){ if(o.userData.lmId) lm=o.userData.lmId; o=o.parent; } if(o && o.userData.islId==='_hub') return {hub:true}; o=h.object; lm=null; while(o && !o.userData.islId){ if(o.userData.lmId) lm=o.userData.lmId; o=o.parent; } if(o){ if(lm && focusId===o.userData.islId) return {isl:o.userData.islId,lm}; return {isl:o.userData.islId}; } }
    return null;
  }

  const spotMat=new T.MeshBasicMaterial({color:'#ffd36a',transparent:true,opacity:0.6,depthWrite:false});
  const spotGeo=new T.RingGeometry(1.75,2.05,48); spotGeo.rotateX(-Math.PI/2);
  const spot=new T.Mesh(spotGeo,spotMat); spot.visible=false; spot.raycast=()=>{}; spot.renderOrder=3; scene.add(spot);
  const spot2=spot.clone(); spot2.visible=false; scene.add(spot2);

  /* --- 迴圈 --- */
  const v=new T.Vector3(), routeCol=new T.Color();
  let last=performance.now(), time=0;
  let paused=false;
  let firstFrameDone=false;
  function frame(now){
    if(paused) return;
    const dt=Math.min(0.05,(now-last)/1000); last=now; time+=dt; const lmF=lmFocus||chapFocus;
    if(!interacted && !reduceMotion) cam.tYaw+=dt*0.05;
    if(lmF && panel.hidden && !reduceMotion && !pointers.size && now-lastInput>2500) cam.tYaw+=dt*0.22;
    const k=reduceMotion?1:1-Math.pow(0.003,dt);
    cam.yaw+=(cam.tYaw-cam.yaw)*k; cam.pitch+=(cam.tPitch-cam.pitch)*k; cam.dist+=(cam.tDist-cam.dist)*k; cam.target.lerp(cam.tTarget,k);
    const D=cam.dist*fit; camera.position.set(cam.target.x+D*Math.cos(cam.pitch)*Math.sin(cam.yaw), cam.target.y+D*Math.sin(cam.pitch), cam.target.z+D*Math.cos(cam.pitch)*Math.cos(cam.yaw));
    camera.lookAt(cam.target);
    sky.position.copy(camera.position); stars.position.copy(camera.position); orb.position.copy(camera.position).add(orbOff); halo.position.copy(orb.position);
    // 依介面實際遮住的範圍，把鏡頭目標放到「沒被擋住」的區域正中央，並在可視範圍變小時拉遠一點
    if(now-occT>250){ occT=now; measureOcc(); }
    const tx=W/2-(occ.l+occ.r)/2, ty=H/2-(occ.t+occ.b)/2;
    const fitT=clamp(Math.max(H*0.8/(occ.b-occ.t), W*0.82/(occ.r-occ.l)),1,1.9);
    off.x+=(tx-off.x)*k; off.y+=(ty-off.y)*k; fit+=(fitT-fit)*k; camera.setViewOffset(W,H,off.x,off.y,W,H);
    scene.fog.near=cam.dist*0.9; scene.fog.far=cam.dist*2.6+80;
    const sc=clamp(cam.dist*0.55,10,70), shc=sun.shadow.camera, sd=Math.max(30,sc*1.4);
    sun.position.copy(cam.target).addScaledVector(sunOff,sd/sunOff.length()); sun.target.position.copy(cam.target); sun.target.updateMatrixWorld();
    if(Math.abs(shc.right-sc)>0.5){ shc.left=-sc; shc.right=sc; shc.top=sc; shc.bottom=-sc; shc.near=Math.max(0.5,sd-sc*1.2); shc.far=sd+sc*1.2; shc.updateProjectionMatrix(); }
    if(!reduceMotion){ updateWalkers(dt); updateDeco(dt,time); }
    // 近看地標時，腳下的光環
    const pulse=Math.sin(time*2.4); spotMat.opacity=0.45+0.25*pulse;
    if(lmF && lmGroups[lmF]){ lmGroups[lmF].getWorldPosition(spot.position); spot.position.y=0.6; spot.visible=true; spot.scale.setScalar(1+0.04*pulse); spot2.visible=false; }
    else if(crossFocus!=null && crossObjs[crossFocus]){ const L=CROSS[crossFocus]; lmGroups[L.a].getWorldPosition(spot.position); lmGroups[L.b].getWorldPosition(spot2.position); spot.position.y=spot2.position.y=0.6; spot.visible=spot2.visible=true; spot.scale.setScalar(1+0.04*pulse); spot2.scale.setScalar(1+0.04*pulse); }
    else if(linkFocus!=null && linkObjs[linkFocus]){ const L=LINKS[linkFocus]; lmGroups[L.a].getWorldPosition(spot.position); lmGroups[L.b].getWorldPosition(spot2.position); spot.position.y=spot2.position.y=0.6; spot.visible=spot2.visible=true; spot.scale.setScalar(1+0.04*pulse); spot2.scale.setScalar(1+0.04*pulse); }
    else { spot.visible=false; spot2.visible=false; }
    // 因果航線：聚焦的線最亮，其他變淡；小箱子沿線搬運
    linkObjs.forEach(o=>{
      const L=LINKS[o.i]; let want=0.75;
      if(linkFocus!=null) want=o.i===linkFocus?1:0.18;
      else if(lmF) want=(L.a===lmF||L.b===lmF)?0.4:0.08;
      if(hover&&hover.link===o.i) want=1;
      if(!focusId || !islands[focusId].arch) want=Math.min(want,0.55);
      o.op+=(want-o.op)*k; o.mat.opacity=o.op; o.gmat.opacity=o.op*0.3;
      if(!reduceMotion){ o.t=(o.t+dt*2.2/o.len)%1; }
      o.curve.getPoint(o.t,o.crate.position); o.crate.position.y+=0.22; o.crate.rotation.y=time*1.5+o.i;
      o.crate.visible=o.op>0.3;
    });
    crossObjs.forEach(o=>{
      const want=crossFocus!=null?(o.i===crossFocus?0.95:0.15):((hover&&hover.cross===o.i)?0.9:0.4); o.op+=(want-o.op)*k; o.wm.opacity=o.op;
      if(!reduceMotion){ if(o.wait>0) o.wait-=dt; else { o.t+=o.dir*dt*2.6/o.len; if(o.t>1||o.t<0){ o.t=Math.max(0,Math.min(1,o.t)); o.dir*=-1; o.wait=2.5; } } }
      const pt=o.curve.getPoint(o.t), tg=o.curve.getTangent(o.t).multiplyScalar(o.dir);
      o.boat.position.set(pt.x,-0.12+Math.sin(time*1.6+o.i)*0.06,pt.z); o.boat.rotation.y=Math.atan2(-tg.z,tg.x); o.boat.rotation.z=Math.sin(time*1.2+o.i)*0.05;
      if(!reduceMotion) o.flag.rotation.y=Math.sin(time*3+o.i)*0.3;
    });
    routeList.forEach(routeDots=>{ const n=routeDots.userData.n, head=(time*0.35)%1.25; for(let k2=0;k2<n;k2++){ const d=head-k2/n; const b=d>=0&&d<0.12?1-d/0.12:0; routeCol.setRGB(0.95+0.05*b,0.94-0.1*b,0.92-0.55*b); routeDots.setColorAt(k2,routeCol); } routeDots.instanceColor.needsUpdate=true; });
    Object.values(islets).forEach(s=>{
      if(s.fog && s.fog.visible){ if(!reduceMotion) s.fog.rotation.y+=dt*0.12; const fm=s.fog.userData.mat, fw=lmF&&lmGroups[lmF]&&lmGroups[lmF].parent===s.ig?0.1:0.6; fm.opacity+=(fw-fm.opacity)*k; }
      if(s.pop>0){ s.pop=Math.max(0,s.pop-dt*1.4); s.ig.position.y=Math.sin(s.pop*Math.PI)*0.6; }
      const s3=s.grow[2]; if(s3 && s3.visible && s3.userData.flag && !reduceMotion){ s3.userData.flag.rotation.y=Math.sin(time*1.8+s.la)*0.25; s3.userData.halo.material.opacity=0.35+0.2*Math.sin(time*2+s.la); }
    });
    if(!reduceMotion){ animateWater(time); spinners.forEach(o=>o.o.rotation[o.ax]+=dt*o.sp); beams.forEach(b=>b.rotation.y+=dt*0.9); clouds.forEach(c=>c.userData.a+=dt*c.userData.sp); }
    clouds.forEach(c=>{ c.visible=cloudsOn && cam.dist<230; const u=c.userData; c.position.set(Math.sin(u.a)*u.r,u.y,Math.cos(u.a)*u.r); c.rotation.y=u.a; });
    Object.keys(lmGroups).forEach(id=>{ const g=lmGroups[id]; const want=LMS*((hover&&hover.lm===id)||(S&&S.o.scope==='lm'&&S.o.id===id)?1.1:1); g.userData.s+=(want-g.userData.s)*k; g.scale.setScalar(g.userData.s); });

    renderer.render(scene,camera);
    if(!firstFrameDone){ firstFrameDone=true; if(window.__firstFrame) window.__firstFrame(); }

    // 島嶼標籤
    ISLANDS.forEach(isl=>{
      const I=islands[isl.id], el=islLabel[isl.id];
      const focused=focusId===isl.id;
      v.set(I.pos.x, I.labelH+(focused?1.2:0), I.pos.z); v.project(camera);
      const vis=v.z<1 && !(focusId && focused && cam.dist<(I.arch?85:60));
      el.style.transform='translate('+((v.x*0.5+0.5)*W).toFixed(1)+'px,'+((-v.y*0.5+0.5)*H).toFixed(1)+'px) translate(-50%,calc(-100% - 10px))';
      const op = !vis?0 : (focusId && !focused ? 0.55 : 1);
      el.style.opacity=op; el.style.pointerEvents=op>0.5?'auto':'none';
    });
    // 島名標籤互相重疊時，藏起比較遠的那一個
    { const vis=ISLANDS.map(isl=>{ const el=islLabel[isl.id]; if(el.style.opacity==='0') return null; const I=islands[isl.id]; v.set(I.pos.x,I.labelH,I.pos.z).project(camera); const w=el.offsetWidth||120, h=el.offsetHeight||36; const x=(v.x*0.5+0.5)*W, y=(-v.y*0.5+0.5)*H; return {el,z:v.z,x0:x-w/2,x1:x+w/2,y0:y-h-10,y1:y-10}; }).filter(Boolean).sort((a,b)=>a.z-b.z);
      const kept=[]; vis.forEach(r=>{ if(kept.some(k=>r.x0<k.x1+4&&r.x1>k.x0-4&&r.y0<k.y1+2&&r.y1>k.y0-2)){ r.el.style.opacity='0'; r.el.style.pointerEvents='none'; } else kept.push(r); }); }
    // 小人說明泡泡
    if(bubbleW!=null){ const w=walkers[bubbleW]; if(now>bubbleUntil || cam.dist>80){ bubbleEl.hidden=true; bubbleW=null; } else { v.set(w.pos.x,w.pos.y+1.0,w.pos.z).project(camera); bubbleEl.style.transform='translate('+((v.x*0.5+0.5)*W).toFixed(1)+'px,'+((-v.y*0.5+0.5)*H).toFixed(1)+'px) translate(-50%,calc(-100% - 8px))'; bubbleEl.style.opacity=v.z>1?0:1; } }
    // 地標標籤（只在飛到該島時顯示）
    Object.keys(lmGroups).forEach(id=>{
      const g=lmGroups[id], el=lmLabel[id]||chapLabel[id], islId=(LM_INFO[id]||CHAP_INFO[id]).isl;
      const show=focusId===islId && cam.dist<(islands[islId].arch?90:70);
      if(!show){ if(!el.hidden) el.hidden=true; return; }
      el.hidden=false;
      if(g.userData.top==null){ g.userData.top=new T.Box3().setFromObject(g).max.y; }
      g.getWorldPosition(v); v.y=g.userData.top+0.45; v.project(camera);
      const face=Math.cos(g.userData.angle-cam.yaw);
      const sx=(v.x*0.5+0.5)*W, sy=(-v.y*0.5+0.5)*H;
      const arch=islands[islId].arch;
      let op=(v.z>1||(!arch&&face<-0.15)||lmF||linkFocus!=null||sx<40||sx>W-40||sy<50||sy>H-20)?0:1;
      el.style.transform='translate('+((v.x*0.5+0.5)*W).toFixed(1)+'px,'+((-v.y*0.5+0.5)*H).toFixed(1)+'px) translate(-50%,calc(-100% - 10px))';
      el.style.opacity=op.toFixed(2); el.style.pointerEvents=op>0.5?'auto':'none'; el.style.zIndex=String(Math.round((face+1)*50));
    });
    // 錯題島標籤
    { v.set(0,6.2,0).project(camera); const sx=(v.x*0.5+0.5)*W, sy=(-v.y*0.5+0.5)*H; const vis=v.z<1 && !hubFocus && !(focusId && cam.dist<85) && crossFocus==null;
      hubLabel.style.transform='translate('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px) translate(-50%,calc(-100% - 10px))'; hubLabel.style.opacity=vis?1:0; hubLabel.style.pointerEvents=vis?'auto':'none'; }
    // 跨科航線標籤：滑鼠移到小船上或聚焦時顯示
    crossObjs.forEach(o=>{ const el=crossLabel[o.i]; const show=(hover&&hover.cross===o.i)||crossFocus===o.i; if(!show){ if(!el.hidden) el.hidden=true; return; }
      el.hidden=false; v.copy(o.boat.position); v.y+=3.4; v.project(camera); const sx=(v.x*0.5+0.5)*W, sy=(-v.y*0.5+0.5)*H; el.style.transform='translate('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px) translate(-50%,-50%)'; el.style.opacity=v.z>1?0:1; el.style.pointerEvents='auto'; });
    // 因果航線標籤：在群島上、沒有近看單一地標時顯示
    linkObjs.forEach(o=>{
      const el=linkLabel[o.i]; const show=focusId===LM_INFO[LINKS[o.i].a].isl && cam.dist<95 && !lmF && linkFocus==null;
      if(!show){ if(!el.hidden) el.hidden=true; return; }
      el.hidden=false; v.copy(o.apex); v.y+=0.3; v.project(camera);
      const sx=(v.x*0.5+0.5)*W, sy=(-v.y*0.5+0.5)*H;
      const op=(v.z>1||sx<30||sx>W-30||sy<40||sy>H-20)?0:1;
      el.style.transform='translate('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px) translate(-50%,-50%)';
      el.style.opacity=op; el.style.pointerEvents=op>0.5?'auto':'none';
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  return {
    pause(){ paused=true; },
    resume(){ if(!paused) return; paused=false; last=performance.now(); requestAnimationFrame(frame); },
    focus(id){ const I=islands[id]; cam.tTarget.set(I.pos.x,0.8,I.pos.z); cam.tYaw=shortest(cam.tYaw,I.angle); if(I.arch){ cam.tPitch=0.98; cam.tDist=narrow()?90:46; } else { cam.tPitch=0.62; cam.tDist=(narrow()?44:30)*(I.R/8.4); } },
    overview(){ cam.tTarget.set(0,0,0); cam.tPitch=0.92; cam.tDist=overD(); },
    focusHub(){ cam.tTarget.set(0,0.6,0); cam.tPitch=0.82; cam.tDist=narrow()?52:34; lastInput=performance.now(); },
    setWrong(c){ if(!bottleMesh) return; const max=bottleMesh.userData.max, tot=c.hist+c.geo+c.civ, n=Math.min(max,tot); const col=new T.Color(); let k=0;
      ['hist','geo','civ'].forEach(sj=>{ const m=tot?Math.round(n*c[sj]/tot):0; for(let j=0;j<m && k<n;j++){ col.set(SUBJ[sj].color).lerp(new T.Color('#ffffff'),0.25); bottleMesh.setColorAt(k++,col); } });
      while(k<n){ bottleMesh.setColorAt(k++,col.set('#9fd0c8')); } bottleMesh.count=n; if(bottleMesh.instanceColor) bottleMesh.instanceColor.needsUpdate=true; },
    cheer(){ const gw=walkers.find(w=>w.guide); if(gw) gw.jump=1; },
    focusCross(i){ const o=crossObjs[i]; if(!o) return; const d=o.pa.distanceTo(o.pb);
      // 俯視兩座島：目標放在兩端點連線與航線中點之間，鏡頭幾乎垂直往下看
      const m=new T.Vector3((o.pa.x+o.pb.x)/2,0,(o.pa.z+o.pb.z)/2).lerp(o.mid,0.35);
      cam.tTarget.set(m.x,0.5,m.z); cam.tPitch=1.18; const asp=Math.max(0.4,Math.min(1.6,W/H)); cam.tDist=clamp((d*0.62/(Math.tan(19*Math.PI/180)*asp))+30,40,520); lastInput=performance.now(); },
    focusLink(i){ const o=linkObjs[i]; if(!o) return; const I=islands[LM_INFO[LINKS[i].a].isl]; const d=o.pa.distanceTo(o.pb);
      cam.tTarget.set(o.mid.x,1.6,o.mid.z); const off2=new T.Vector3().subVectors(o.mid,I.pos).setY(0);
      let yaw=off2.length()>1.5?Math.atan2(off2.x,off2.z):Math.atan2(o.pb.z-o.pa.z,-(o.pb.x-o.pa.x));
      cam.tYaw=shortest(cam.tYaw,yaw); cam.tPitch=0.55; cam.tDist=(d*1.1+9)*(narrow()?1.55:1); lastInput=performance.now(); },
    // 成長：依熟練度顯示裝飾、起霧；升階時小島彈一下
    setGrowth(map){ Object.keys(map).forEach(id=>{ const s=islets[id]; if(!s) return; const g=map[id];
      s.grow.forEach((gr,k)=>{ gr.visible=g.stage>k; }); s.fog.visible=!!g.fog;
      if(s.stage>=0 && g.stage>s.stage && !reduceMotion) s.pop=1; s.stage=g.stage; }); },
    focusLm(id){ const g=lmGroups[id]; if(!g) return; const bb=new T.Box3().setFromObject(g), sz=new T.Vector3(), c=new T.Vector3(); bb.getSize(sz); bb.getCenter(c); const span=Math.max(sz.x,sz.y,sz.z); cam.tTarget.set(c.x,c.y,c.z); cam.tYaw=shortest(cam.tYaw,g.userData.angle); cam.tPitch=0.5; cam.tDist=(span*2.4+2.5)*(narrow()?1.45:1); lastInput=performance.now(); }
  };
}
})();
