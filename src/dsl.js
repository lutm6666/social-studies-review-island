// 題庫速寫工具：用一行一筆的文字寫題目與資料表
// H：精寫題，每行「難度|題目|正解|誤1|誤2|誤3|解說」，可加第 8 欄情境
// TBL：配對表，每行「鍵|值」；qa 由值問鍵、qb 由鍵問值（{k}、{v} 會被替換）
// CAUSE：因果表，每行「原因|結果」，自動出正反兩種題
// CH：登記一個章節
window.HAND = window.HAND || {}; window.GEN = window.GEN || {};
const _rows=t=>t.trim().split('\n').map(l=>l.trim()).filter(l=>l && !l.startsWith('#')).map(l=>l.split('|').map(x=>x.trim()));
window.H=t=>_rows(t).map(r=>[+r[0]].concat(r.slice(1)));
window.TBL=(qa,qb,t,o)=>Object.assign({qa:qa||undefined,qb:qb||undefined,items:_rows(t)},o||{});
window.CAUSE=t=>({rel:'cause',da:3,db:2,items:_rows(t)});
window.CH=(id,hand,sets)=>{ HAND[id]=hand; GEN[id]={period:'',order:0,events:[],sets}; };
// FIG：附圖的精寫題，r = [難度, 題目, 正解, 誤1, 誤2, 誤3, 解說]，fig = 圖表資料
window.FIG=(id,list)=>{ HAND[id]=(HAND[id]||[]).concat(list.map(([r,fig])=>r.slice(0,7).concat([r[7]||null,fig]))); };
// CTX：素養情境題，每行「難度|情境|題目|正解|誤1|誤2|誤3|解說」
window.CTX=(id,t)=>{ HAND[id]=(HAND[id]||[]).concat(_rows(t).map(r=>[+r[0],r[2],r[3],r[4],r[5],r[6],r[7],r[1]])); };
