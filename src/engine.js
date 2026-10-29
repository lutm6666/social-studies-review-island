// 題庫引擎：把精寫題與資料表組成完整題庫（固定亂數種子，題目編號每次都一樣）
(function(root){
function hash(s){let h=2166136261;for(const ch of s){h^=ch.codePointAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function sample(arr,n,r){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,n);}
const fill=(t,k,v)=>t.replace('{k}',k).replace('{v}',v);
const uniq=a=>[...new Set(a)];
const PERMS=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];

function buildBank(HAND,GEN,PERIODS){
  const bank={};
  Object.keys(GEN).forEach(lm=>{
    const list=[];
    (HAND[lm]||[]).forEach((h,i)=>list.push({id:lm+'-h'+i,lm,d:h[0],q:h[1],c:h[2],w:[h[3],h[4],h[5]],ex:h[6],src:'h',ctx:h[7]||null,fig:h[8]||null}));
    const spec=GEN[lm], r=rng(hash(lm)); let n=0;
    let tags=[];
    // 重疊的資料互不當誘答；先洗牌整個候選池再過濾，未受影響的題目選項維持不變
    const ov=spec.ov||[], clash=(a,b)=>a&&b&&a!==b&&ov.some(g=>g.includes(a)&&g.includes(b));
    const pick=(pool,ok,pref)=>{ let a=sample(pool,pool.length,r).filter(ok); if(pref) a=a.filter(pref).concat(a.filter(x=>!pref(x))); return a.slice(0,3); };
    // tags：同一筆資料（鍵與值）出的題目共用標籤，同一輪抽題時避免同時出現
    const add=(d,q,c,w,ex,t)=>{ if(w.length<3||new Set([c].concat(w)).size<4) return false; list.push({id:lm+'-g'+(n++),lm,d,q,c,w,ex,src:'g',t:t||null,tags}); return true; };

    (spec.sets||[]).forEach(set=>{
      const vals=uniq(set.items.map(i=>i[1]));
      const keyOf=x=>(set.items.find(i=>i[1]===x)||[])[0], valOf=x=>(set.items.find(i=>i[0]===x)||[])[1];
      set.items.forEach(([k,v,note])=>{
        const tip=note?'補充：'+note+'。':'';
        tags=[lm+':'+k].concat(set.oneway?[]:[lm+':'+v]);
        if(set.rel==='cause'){
          const wv=pick(vals.filter(x=>x!==v),x=>!clash(k,keyOf(x))), wk=pick(set.items.filter(i=>i[0]!==k).map(i=>i[0]),x=>!clash(k,x));
          // 有專屬誘答時改用同主題的錯誤選項（仍先呼叫 pick，維持亂數序列不變）
          const fo=(spec.foils||{})[k];
          if(fo){
            add(set.db||2, '「'+k+'」帶來的結果是？', v, fo[1], '因為「'+k+'」，所以'+v+'。'+tip+'其他選項雖然和本單元有關，但都不是「'+k+'」直接造成的結果。','cause');
            add(set.da||3, '「'+v+'」最主要的原因是？', k, fo[0], v+'，最主要是因為「'+k+'」。'+tip+'其他選項雖然和本單元有關，但和這個結果沒有直接因果關係。','cause');
            return;
          }
          add(set.db||2, '「'+k+'」帶來的結果是？', v, wv, '因為「'+k+'」，所以'+v+'。'+tip+'其他選項也是本單元常見的結果，但原因不同：'+wv.map(x=>x+'，是因為'+keyOf(x)).join('；')+'。','cause');
          add(set.da||3, '「'+v+'」最主要的原因是？', k, wk, v+'，最主要是因為「'+k+'」。'+tip+'其他選項會帶來別的結果：'+wk.map(x=>'「'+x+'」導致'+valOf(x)).join('；')+'。','cause');
          return;
        }
        // 主題分群：同主題的資料優先當誘答（data_groups.js）
        const g=set.grp&&set.grp[k], same=g?(kk=>!!kk&&set.grp[kk]===g):null;
        if(set.qb){ const pool=uniq(vals.filter(x=>x!==v).concat(set.pool||[])); const w0=pick(pool,x=>!clash(k,keyOf(x)),same&&(x=>same(keyOf(x))));
          // 有專屬誘答（常見誤解）時改用，仍先呼叫 pick 維持亂數序列（data_foils.js 的 TF）
          const tf=(spec.tfo||{})[k], w=tf&&!set.oneway?tf.slice():w0;
          const other=set.oneway?'':w.map(x=>{ const kk=keyOf(x); return kk?'「'+x+'」說的是'+kk:null; }).filter(Boolean).join('；');
          add(set.db||2, fill(set.qb,k,v), v, w, set.oneway ? '「'+k+'」→ '+v+'。'+tip : '「'+k+'」的重點是：'+v+'。'+tip+(tf?(tf.note?tf.note+'。':'其他選項是常見的誤解，都不是「'+k+'」的意思。'):(other?'容易混淆的選項：'+other+'。':''))); }
        if(set.qa && !set.oneway){ const keys=set.items.filter(i=>i[1]!==v).map(i=>i[0]); const w0=pick(keys,x=>!clash(k,x),same);
          // 反查題專屬誘答：同類但不在本組的名詞（data_foils.js 的 TA），仍先呼叫 pick 維持亂數序列
          const ta=(spec.tfa||{})[k], w=ta?ta.slice():w0;
          const defOf=x=>{ for(const st of (spec.sets||[])){ const it=st.items.find(i=>i[0]===x); if(it&&!st.oneway) return it[1]; } return null; };
          const taOther=()=>{ const kn=w.filter(x=>defOf(x)), un=w.filter(x=>!defOf(x));
            if(!kn.length) return '其他選項都是同類但不同意思的名詞';
            return kn.map(x=>'「'+x+'」是'+defOf(x)).join('；')+(un.length?'；'+un.map(x=>'「'+x+'」').join('、')+'也不是這個意思':''); };
          const other=ta?(ta.note||taOther()):w.map(x=>'「'+x+'」是'+valOf(x)).join('；');
          // TA 可改寫題幹與正解（例如改成「下列哪一組」的組合題），題號不變
          if(ta&&ta.q) add(set.da||1, ta.q, ta.a, w, ta.note+'。');
          else add(set.da||1, fill(set.qa,k,v), k, w, '「'+v+'」說的是「'+k+'」。'+tip+(ta?other:'其他選項：'+other)+'。'); }
      });
    });

    // 精寫題若提到某筆資料的鍵（例如人名、制度名），也掛上同一個標籤
    const keys=uniq([].concat(...(spec.sets||[]).map(st=>st.items.map(i=>i[0])))).filter(k=>k.length>=2);
    list.forEach(q=>{ if(q.src!=='h') return; const txt=q.q+'|'+q.c; q.tags=keys.filter(k=>txt.includes(k)).map(k=>lm+':'+k); });
    // 去除重複：生成題若與同章精寫題考同一件事（答案相同且同一筆資料），保留精寫題
    const hand=list.filter(q=>q.src==='h');
    for(let i=list.length-1;i>=0;i--){ const q=list[i]; if(q.src!=='g') continue;
      if(hand.some(h=>h.c===q.c && (h.tags||[]).some(t=>q.tags.includes(t)))) list.splice(i,1); }
    // 依使用者偏好：不再生成年份、年代區間與事件先後排序題（events 只保留給跨時期的「屬於哪個時期」題）
    bank[lm]=list;
  });

  // 跨時期題：只出現在「整座島隨機」
  const cross=[]; const r=rng(hash('cross')); let n=0;
  const addc=(d,q,c,w,ex)=>{ if(new Set([c].concat(w)).size<4) return false; cross.push({id:'x-g'+(n++),lm:'_x',d,q,c,w,ex,src:'g'}); return true; };
  const evs=[];
  Object.keys(GEN).forEach(lm=>(GEN[lm].events||[]).forEach(e=>{ const p=e.length>2?e[2]:GEN[lm].period; evs.push({y:e[0],t:e[1],p,lm}); }));
  evs.forEach(e=>{ if(!e.p) return; addc(1,'「'+e.t+'」發生在哪一個時期？',e.p,sample(PERIODS.filter(x=>x!==e.p),3,r),'「'+e.t+'」發生於 '+e.y+' 年，屬於'+e.p+'。'); });
  bank._x=cross;
  // 跨章節完全相同的題幹只保留第一題（精寫題優先）
  const seen=new Set();
  Object.keys(bank).forEach(k=>{ bank[k].sort((a,b)=>(a.src==='h'?0:1)-(b.src==='h'?0:1)); });
  Object.keys(bank).forEach(k=>{ bank[k]=bank[k].filter(q=>{ const key=(q.q+'|'+(q.ctx||'')+'|'+(q.fig?JSON.stringify(q.fig):'')).replace(/\s/g,''); if(seen.has(key)) return false; seen.add(key); return true; }); });
  return bank;
}
root.buildBank=buildBank;
})(typeof window!=='undefined'?window:globalThis);
