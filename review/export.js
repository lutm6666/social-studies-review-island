// 匯出題庫給外部審查：每座島一個 Markdown 檔＋全部題目的 JSON
const fs=require('fs'), vm=require('vm');
const ctx={console}; vm.createContext(ctx); vm.runInContext('var window=globalThis',ctx);
const path=require('path'); const dir=path.join(__dirname,'..','src')+'/', out=__dirname+'/';
const isl=['cnh','wdh','twg','asg','wdg','soc','law','eco'];
for(const f of ['hand_twh_1.js','hand_twh_2.js','hand_twh_ctx.js','gen_twh.js','links_twh.js','links_cross.js','dsl.js'].concat(isl.map(k=>'data_'+k+'.js'),['data_notes.js','data_fig.js','data_ctx.js','data_overlap.js','data_foils.js','data_groups.js','engine.js'])) vm.runInContext(fs.readFileSync(dir+f,'utf8'),ctx,{filename:f});
const bank=vm.runInContext('buildBank(window.HAND,window.GEN,window.PERIODS)',ctx);
const LINKS=vm.runInContext('window.LINKS',ctx), CROSS=vm.runInContext('window.CROSS',ctx);
// 章節名稱（取自 app.js 的島嶼設定）
const appSrc=fs.readFileSync(dir+'app.js','utf8');
const ISL={twh:{name:'臺灣史島',lms:[['pre','史前遺址'],['voy','熱蘭遮城'],['qpe','郊商碼頭'],['qsc','書院廟埕'],['jpe','糖廠煙囪'],['jsc','公學校'],['cpd','民主廣場'],['ces','加工出口區']]}};
const planRe=/\{id:'(\w+)', name:'([^']+)'[^\n]*plan:\[([^\]]+)\]/g; let m;
while((m=planRe.exec(appSrc))){ ISL[m[1]]={name:m[2],lms:m[3].split(',').map((x,i)=>[m[1]+(i+1),x.trim().replace(/'/g,'')])}; }
const D={1:'簡單',2:'中等',3:'困難'};
const all=[];
const line=q=>{ const o=[q.c].concat(q.w); all.push({id:q.id,chapter:q.lm,difficulty:q.d,context:q.ctx||null,question:q.q,answer:q.c,distractors:q.w,explanation:q.ex,source:q.src==='h'?'hand':'generated',figure:q.fig||null});
  return '#### `'+q.id+'`（'+D[q.d]+'．'+(q.src==='h'?'精寫':'生成')+'）\n'+(q.ctx?'> 情境：'+q.ctx+'\n\n':'')+(q.fig?'> 附圖：'+(q.fig.s||q.fig.t)+'（'+q.fig.t+'）\n\n':'')+'**'+q.q+'**\n\n- ✅ '+q.c+'\n'+q.w.map(x=>'- ❌ '+x).join('\n')+'\n\n解說：'+q.ex+'\n'; };
let total=0;
Object.keys(ISL).forEach(k=>{ const I=ISL[k]; let md='# '+I.name+' 題庫（審查用）\n\n題目編號（`id`）在回報時務必照抄。\n\n'; let n=0;
  I.lms.forEach(([lm,name])=>{ const L=bank[lm]||[]; md+='\n## '+name+'（`'+lm+'`，'+L.length+' 題）\n\n'+L.map(line).join('\n'); n+=L.length; });
  if(k==='twh'){ md+='\n## 跨時期判斷題（`_x`）\n\n'+(bank._x||[]).map(line).join('\n'); n+=(bank._x||[]).length;
    const lk=[]; LINKS.forEach((L,li)=>L.qs.forEach((h,i)=>lk.push({id:'lk-'+L.a+'-'+L.b+'-'+i,lm:'_lk',d:h[0],q:h[1],c:h[2],w:[h[3],h[4],h[5]],ex:h[6],src:'h'})));
    md+='\n## 因果航線題（`_lk`）\n\n'+lk.map(line).join('\n'); n+=lk.length; }
  fs.writeFileSync(out+'questions_'+k+'.md',md); total+=n; console.log(k,n); });
const cx=[]; CROSS.forEach(L=>L.qs.forEach((h,i)=>cx.push({id:'cx-'+L.a+'-'+L.b+'-'+i,lm:'_cx',d:h[0],q:h[1],c:h[2],w:[h[3],h[4],h[5]],ex:h[6],src:'h'})));
fs.writeFileSync(out+'questions_cross.md','# 跨科航線題（審查用）\n\n'+CROSS.map(L=>'- '+L.title+'：`'+L.a+'` → `'+L.b+'`').join('\n')+'\n\n'+cx.map(line).join('\n')); total+=cx.length; console.log('cross',cx.length);
fs.writeFileSync(out+'questions.json',JSON.stringify(all,null,1));
console.log('total',total);
