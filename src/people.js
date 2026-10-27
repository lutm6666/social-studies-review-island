  /* --- 橋梁：把相鄰的島串起來 --- */
  const bridges=[];
  // 橋頭：一般島接在島緣；群島接在最靠近對面的那座章節小島
  function bridgeEnd(I,toward){
    let c=I.pos, r=I.R*0.8;
    if(I.arch){ let bd=1e9; I.islets.forEach(s=>{ const w=I.pos.clone().add(s.c); const d=w.distanceTo(toward); if(d<bd){ bd=d; c=w; } }); r=ARCH.IR*0.8; }
    const dir=new T.Vector3().subVectors(toward,c); dir.y=0; dir.normalize();
    return c.clone().addScaledVector(dir,r);
  }
  {
    const ring=ISLANDS.map(isl=>({id:isl.id, a:((islands[isl.id].angle%TAU0)+TAU0)%TAU0})).sort((p,q)=>p.a-q.a);
    ring.forEach((p,i)=>{
      const q=ring[(i+1)%ring.length], A0=islands[p.id], B0=islands[q.id];
      const A=bridgeEnd(A0,B0.pos), B=bridgeEnd(B0,A);
      const len=A.distanceTo(B), H=0.7+len*0.05;
      const g=new T.Group(); g.position.set(A.x,0,A.z); g.rotation.y=Math.atan2(-(B.z-A.z),B.x-A.x);
      const hAt=t=>0.62+H*Math.sin(Math.PI*t);
      const n=Math.max(8,Math.ceil(len/0.55));
      for(let k=0;k<n;k++){
        const t0=k/n, t1=(k+1)/n, tm=(t0+t1)/2, x0=t0*len, x1=t1*len;
        const slope=Math.atan2(hAt(t1)-hAt(t0),x1-x0);
        const pl=M(new T.BoxGeometry((x1-x0)+0.03,0.07,1.0),'#8b6a46',(x0+x1)/2,hAt(tm),0); pl.rotation.z=slope; pl.raycast=()=>{}; g.add(pl);
        [-0.48,0.48].forEach(z=>{ const rl=M(new T.BoxGeometry((x1-x0)+0.03,0.04,0.04),'#6b4f36',(x0+x1)/2,hAt(tm)+0.38,z); rl.rotation.z=slope; rl.raycast=()=>{}; g.add(rl); });
        if(k%2===0) [-0.48,0.48].forEach(z=>{ const po=M(new T.BoxGeometry(0.05,0.4,0.05),'#6b4f36',x0,hAt(t0)+0.18,z); po.raycast=()=>{}; g.add(po); });
        if(k%5===2 && tm>0.08 && tm<0.92){ const pil=M(new T.CylinderGeometry(0.09,0.12,hAt(tm)+1.6,6),'#7a5c3e',(x0+x1)/2,(hAt(tm)-1.6)/2,0); pil.raycast=()=>{}; g.add(pil); }
      }
      scene.add(g); bake(g,null,true);
      bridges.push({A,B,len,hAt,from:p.id,to:q.id});
      // 移除擋住橋頭的樹與成長裝飾
      [[A0,A],[B0,B]].forEach(([I,P])=>{ const local=P.clone().sub(I.pos); I.g.children.filter(c=>c.userData.tree && Math.hypot(c.position.x-local.x,c.position.z-local.z)<2.1).forEach(c=>I.g.remove(c));
        if(I.arch){ scene.updateMatrixWorld(true); const wp=new T.Vector3(); I.islets.forEach(s=>s.grow.forEach(gr=>gr.children.slice().forEach(ch=>{ ch.getWorldPosition(wp); if(Math.hypot(wp.x-P.x,wp.z-P.z)<1.5) gr.remove(ch); }))); } });
    });
  }

  // 移除擋住橋頭的岩石
  if(rockMesh){ const zero=new T.Matrix4().makeScale(0,0,0); rockList.forEach((it,i)=>{ if(bridges.some(b=>Math.hypot(it.p.x-b.A.x,it.p.z-b.A.z)<1.8||Math.hypot(it.p.x-b.B.x,it.p.z-b.B.z)<1.8)) rockMesh.setMatrixAt(i,zero); }); rockMesh.instanceMatrix.needsUpdate=true; }

  /* --- 小人 --- */
  const PEOPLE={
    pre:[{n:'史前時代的人',d:'捧著陶罐。新石器時代開始製作陶器、從事農耕',top:'#a0784e',bottom:'#7a5a3a',skin:'#b9805a',hat:'band',hatC:'#c0392b',prop:'pot'},
         {n:'原住民族織布者',d:'穿著紅色幾何紋織衣、拿著織布。傳統織布是泰雅等族的重要技藝',top:'#b03a2e',bottom:'#2b2b2b',skin:'#b9805a',hat:'band',hatC:'#f2f0ea',prop:'cloth'}],
    voy:[{n:'荷蘭東印度公司士兵',d:'寬簷帽、白色大領，手持火繩槍。荷蘭人以大員為轉口貿易據點',top:'#2b2b33',bottom:'#3b3b44',skin:'#f1d2b4',hat:'brim',hatC:'#1d1d22',collar:1,prop:'musket',beard:1},
         {n:'明鄭士兵',d:'頭戴紅盔、手持旗幟，跟隨鄭成功來臺並推行屯田',top:'#8f2f24',bottom:'#3a3a3a',skin:'#d9a77c',hat:'helmet',hatC:'#9a2c20',prop:'flag',flagC:'#c0392b'}],
    qpe:[{n:'郊商',d:'長袍、瓜皮帽、留辮，拿著算盤。郊是清代經營兩岸貿易的商業團體',top:'#2f5d9a',robe:1,skin:'#d9a77c',hat:'skullcap',hatC:'#1d1d22',queue:1,prop:'abacus'},
         {n:'洋行商人',d:'高帽西裝，抱著茶葉箱。開港後茶葉多從淡水出口',top:'#3b3b44',bottom:'#2b2b33',skin:'#f1d2b4',hat:'tophat',hatC:'#1d1d22',prop:'teabox'}],
    qsc:[{n:'書院學子',d:'青色長衫、留辮，手拿書卷準備科舉',top:'#3f7f7a',robe:1,skin:'#d9a77c',hat:'skullcap',hatC:'#1d1d22',queue:1,prop:'scroll'},
         {n:'醫療傳教士',d:'黑色西服、留鬍子，提著藥箱。清末傳教士常以醫療與教育傳教',top:'#26262b',bottom:'#26262b',skin:'#f1d2b4',hair:'#5a4a3a',beard:1,prop:'medbag'}],
    jpe:[{n:'日治時期警察',d:'白色制服、佩刀，配合保甲制度維持治安',top:'#eeeeea',bottom:'#eeeeea',skin:'#e8c4a0',hat:'police',hatC:'#26324a',prop:'saber'},
         {n:'糖廠工人',d:'戴斗笠、扛著甘蔗。日治時期新式糖廠帶動糖業發展',top:'#6a7f8f',bottom:'#4a4a4a',skin:'#b9805a',hat:'conical',hatC:'#d6b56b',prop:'cane'}],
    jsc:[{n:'公學校學生',d:'戴學生帽、背書包。學校作息讓守時觀念普及',top:'#2a3a5a',bottom:'#2a3a5a',skin:'#e8c4a0',hat:'schoolcap',hatC:'#1d1d22',prop:'none',pack:1,packC:'#7a2a20',small:1},
         {n:'摩登女性',d:'鐘形帽與洋裝。新式教育讓職業婦女出現',top:'#c9567a',robe:1,skin:'#e8c4a0',hat:'cloche',hatC:'#7a3a52',prop:'handbag'}],
    cpd:[{n:'投票的選民',d:'手拿選票。1996 年起總統由人民直接選舉',top:'#4a90b8',bottom:'#2f3a4a',skin:'#d9a77c',hair:'#1d1d1d',prop:'ballot'},
         {n:'報社記者',d:'拿著相機採訪。1988 年解除報禁，報紙數量大增',top:'#c9a64a',bottom:'#3b3b44',skin:'#e8c4a0',hat:'cap',hatC:'#3b3b44',prop:'camera'}],
    ces:[{n:'加工出口區女工',d:'頭巾與制服、搬著貨箱。加工出口區支撐 1960 年代的出口擴張',top:'#5a8fb0',bottom:'#3a4a5a',skin:'#d9a77c',hat:'scarf',hatC:'#e8e2d0',prop:'box'},
         {n:'晶圓廠工程師',d:'穿著無塵衣、拿著晶圓。新竹科學園區帶動半導體產業',top:'#f4f6f8',bottom:'#f4f6f8',skin:'#e8c4a0',hat:'hood',hatC:'#f4f6f8',prop:'wafer'}],
    cnh:[{n:'秦漢士兵',d:'戴頭盔、持長矛，守衛北方邊疆',top:'#6b5a3a',bottom:'#4a3a2a',hat:'helmet',hatC:'#5a5a5a',prop:'spear',skin:'#d9a77c'},
         {n:'科舉考生',d:'長袍、手拿書卷。隋朝開創科舉，以考試選拔人才',top:'#7a4a8a',robe:1,hat:'scholar',hatC:'#1d1d22',prop:'scroll',skin:'#d9a77c'}],
    wdh:[{n:'古埃及書記',d:'條紋頭巾與亞麻衣，手拿莎草紙。古埃及文明沿尼羅河發展',top:'#efe6cf',bottom:'#efe6cf',hat:'nemes',hatC:'#2f5d9a',prop:'scroll',skin:'#b9805a'},
         {n:'中世紀騎士',d:'盔甲與長劍，歐洲封建社會的武士階層',top:'#9aa0a6',bottom:'#7a8086',hat:'knight',hatC:'#8a9096',prop:'sword',skin:'#f1d2b4'}],
    twg:[{n:'登山客',d:'背包與登山杖，挑戰東北亞第一高峰玉山',top:'#d0562f',bottom:'#3a4a5a',hat:'cap',hatC:'#2f5d9a',prop:'pole',pack:1,packC:'#3a5a3a',skin:'#d9a77c'},
         {n:'稻農',d:'戴斗笠、抱著稻穗。西部平原是臺灣主要的稻作區',top:'#6a8f5a',bottom:'#4a4a4a',hat:'conical',hatC:'#d6b56b',prop:'rice',skin:'#b9805a'}],
    asg:[{n:'季風亞洲稻農',d:'夏季季風帶來雨水，南亞與東南亞稻作發達',top:'#3e7f9a',bottom:'#2b2b2b',hat:'conical',hatC:'#d6b56b',prop:'rice',skin:'#b9805a'},
         {n:'背包旅人',d:'拿著地圖認識亞洲各區域',top:'#8a5ab0',bottom:'#3a3a4a',hat:'cap',hatC:'#e3b23c',prop:'map',pack:1,packC:'#5a4a3a',skin:'#e8c4a0'}],
    wdg:[{n:'極地研究員',d:'橘色防寒衣，研究南極與北極的環境',top:'#e2702d',bottom:'#3a3a4a',hat:'hood',hatC:'#e2702d',prop:'flag',flagC:'#2f74b5',skin:'#f1d2b4'},
         {n:'探險家',d:'寬簷帽、拿著地圖，認識世界各大洲',top:'#a08a5a',bottom:'#5a4a3a',hat:'brim',hatC:'#8a6a45',prop:'map',skin:'#d9a77c'}],
    soc:[{n:'家長',d:'家庭是個人最早、也最重要的社會化場所',top:'#5a8f6a',bottom:'#3a4a5a',hair:'#2b1d14',prop:'shopbag',skin:'#e8c4a0'},
         {n:'學生',d:'學校與社區是學習公民參與的地方',top:'#f2f0ea',bottom:'#2f3a5a',hair:'#1d1d1d',prop:'book',pack:1,packC:'#2f5d9a',small:1,skin:'#d9a77c'}],
    law:[{n:'法官',d:'黑色法袍、手持法槌，依法獨立審判',top:'#1d1d22',robe:1,hair:'#3a3a3a',prop:'gavel',skin:'#e8c4a0'},
         {n:'警察',d:'維護治安，依法行使職權',top:'#26324a',bottom:'#26324a',hat:'police',hatC:'#26324a',prop:'none',skin:'#d9a77c'}],
    eco:[{n:'消費者',d:'提著購物袋。市場上的供給與需求決定價格',top:'#d0562f',bottom:'#3a3a4a',hair:'#3a2a1a',prop:'shopbag',skin:'#e8c4a0'},
         {n:'上班族',d:'提著公事包。勞動是重要的經濟活動',top:'#3a4a5a',bottom:'#2b2b33',hair:'#1d1d1d',prop:'briefcase',skin:'#d9a77c',tie:1}]
  };
  // 各章節小島的特色小人（每章一位）
  Object.assign(PEOPLE,{
    cnh1:[{n:'周朝貴族',d:'頭戴冠帽、手持竹簡。周朝以封建與宗法制度治理天下',top:'#7a3b26',robe:1,skin:'#d9a77c',hat:'scholar',hatC:'#1d1d22',prop:'scroll'}],
    cnh2:[{n:'絲路商人',d:'包著頭巾、抱著絲綢。絲路連接中國與中亞、西亞',top:'#c49a5e',robe:1,skin:'#c9905e',hat:'scarf',hatC:'#e8d5b5',prop:'cloth'}],
    cnh3:[{n:'科舉考生',d:'長袍、手拿書卷。宋代以後科舉制度更加完善',top:'#3e6f8f',robe:1,skin:'#d9a77c',hat:'scholar',hatC:'#1d1d22',prop:'book'}],
    cnh4:[{n:'清末新軍士兵',d:'戴軍帽、扛著洋槍。自強運動仿效西方建立新式軍隊',top:'#3a4a3a',bottom:'#2b2b2b',skin:'#d9a77c',hat:'police',hatC:'#2b3a2b',prop:'musket',queue:1}],
    cnh5:[{n:'五四青年',d:'學生裝、高舉旗幟。五四運動提倡民主與科學',top:'#2f3a5a',bottom:'#2f3a5a',skin:'#e8c4a0',hat:'schoolcap',hatC:'#1d1d22',prop:'flag',flagC:'#f4f1ea'}],
    cnh6:[{n:'深圳上班族',d:'西裝、提公事包。改革開放後深圳由漁村變成大城市',top:'#3a4a5a',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#1d1d1d',prop:'briefcase',tie:1}],
    wdh1:[{n:'希臘哲學家',d:'白色長袍、手拿卷軸。古希臘發展出哲學與民主',top:'#efe6cf',robe:1,skin:'#f1d2b4',hair:'#6a5a4a',beard:1,prop:'scroll'}],
    wdh2:[{n:'朝聖者',d:'披著長袍、手持經書。佛教、基督教、伊斯蘭教是三大普世宗教',top:'#8a6a45',robe:1,skin:'#c9905e',hat:'scarf',hatC:'#f4f1ea',prop:'book'}],
    wdh3:[{n:'大航海水手',d:'寬簷帽、拿著地圖。新航路開闢讓歐洲人走向世界',top:'#2f5d9a',bottom:'#5a4a3a',skin:'#f1d2b4',hat:'brim',hatC:'#3a2a1e',prop:'map',beard:1}],
    wdh4:[{n:'種植園商人',d:'高帽、抱著貨箱。哥倫布大交換讓各大洲物產流通',top:'#5a3a2a',bottom:'#2b2b33',skin:'#f1d2b4',hat:'tophat',hatC:'#1d1d22',prop:'teabox'}],
    wdh5:[{n:'工廠工人',d:'鴨舌帽、搬著貨箱。工業革命讓機器取代手工生產',top:'#5a6a7a',bottom:'#3a3a3a',skin:'#f1d2b4',hat:'cap',hatC:'#3a3a3a',prop:'box'}],
    wdh6:[{n:'殖民地探險家',d:'寬簷帽、拿著地圖。帝國主義時期列強瓜分亞非',top:'#c8b48a',bottom:'#8a7650',skin:'#f1d2b4',hat:'brim',hatC:'#d6c49a',prop:'map'}],
    wdh7:[{n:'一戰士兵',d:'鋼盔、背著步槍。兩次世界大戰改變了現代世界',top:'#6b6a4a',bottom:'#5a5a3a',skin:'#f1d2b4',hat:'helmet',hatC:'#5a5a3a',prop:'musket'}],
    twg1:[{n:'地圖測繪員',d:'戴帽子、拿著地圖。經緯度與比例尺是讀地圖的基本功',top:'#e2702d',bottom:'#3a4a5a',skin:'#d9a77c',hat:'cap',hatC:'#2f5d9a',prop:'map'}],
    twg2:[{n:'海岸巡察員',d:'戴帽、拿著登山杖。臺灣有岩岸、沙岸、珊瑚礁與斷層海岸',top:'#3a6a8a',bottom:'#2b3a4a',skin:'#d9a77c',hat:'cap',hatC:'#f4f6f8',prop:'pole'}],
    twg3:[{n:'氣象觀測員',d:'穿著雨衣、拿著筆記。臺灣冬季東北季風、夏季西南季風',top:'#e3b23c',bottom:'#3a4a5a',skin:'#e8c4a0',hat:'hood',hatC:'#e3b23c',prop:'book'}],
    twg4:[{n:'客家阿婆',d:'藍衫、提著菜籃。臺灣是多元族群的社會',top:'#3e5f8f',robe:1,skin:'#e8c4a0',hat:'scarf',hatC:'#3e5f8f',prop:'shopbag'}],
    twg5:[{n:'半導體工程師',d:'穿無塵衣、拿著晶圓。科學園區帶動高科技產業',top:'#f4f6f8',bottom:'#f4f6f8',skin:'#e8c4a0',hat:'hood',hatC:'#f4f6f8',prop:'wafer'}],
    twg6:[{n:'高鐵通勤族',d:'背著背包、拿著車票。高鐵讓西部形成一日生活圈',top:'#5a8fb0',bottom:'#2f3a4a',skin:'#d9a77c',hair:'#1d1d1d',prop:'ballot',pack:1,packC:'#3a3a4a'}],
    twg7:[{n:'文史導覽員',d:'拿著舊地圖。地名記錄了地方的地形與開發歷史',top:'#8a5a3a',bottom:'#3a3a3a',skin:'#e8c4a0',hat:'cap',hatC:'#8a5a3a',prop:'map'}],
    twg8:[{n:'有機小農',d:'戴斗笠、抱著稻穗。地產地消可以縮短食物里程',top:'#6a8f5a',bottom:'#4a4a4a',skin:'#b9805a',hat:'conical',hatC:'#d6b56b',prop:'rice'}],
    asg1:[{n:'黃土高原農民',d:'包頭巾、扛著農具。黃河流經黃土高原，含沙量很高',top:'#8a6a45',bottom:'#3a3a3a',skin:'#c9905e',hat:'scarf',hatC:'#f4f1ea',prop:'pole'}],
    asg2:[{n:'草原牧民',d:'穿蒙古袍、拿著套馬桿。內蒙古與新疆以畜牧業為主',top:'#3e6f8f',robe:1,skin:'#c9905e',hat:'skullcap',hatC:'#c0392b',prop:'spear'}],
    asg3:[{n:'日本上班族',d:'西裝、提公事包。日本以加工貿易發展經濟',top:'#2b2b33',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#1d1d1d',prop:'briefcase',tie:1}],
    asg4:[{n:'東南亞稻農',d:'戴斗笠、抱著稻穗。季風亞洲盛產稻米',top:'#3e7f9a',bottom:'#2b2b2b',skin:'#b9805a',hat:'conical',hatC:'#d6b56b',prop:'rice'}],
    asg5:[{n:'沙漠商隊',d:'包著頭巾、長袍。西亞與北非氣候乾燥，石油豐富',top:'#efe6cf',robe:1,skin:'#c9905e',hat:'scarf',hatC:'#f4f1ea',prop:'map'}],
    wdg1:[{n:'南極科學家',d:'橘色防寒衣、插著國旗。南極只能用於和平與科學研究',top:'#e2702d',bottom:'#3a3a4a',skin:'#f1d2b4',hat:'hood',hatC:'#e2702d',prop:'flag',flagC:'#2f74b5'}],
    wdg2:[{n:'草原嚮導',d:'拿著長杖。東非熱帶草原有豐富的野生動物',top:'#c0392b',robe:1,skin:'#7a5236',hat:'band',hatC:'#e3b23c',hair:'#1d1d1d',prop:'spear'}],
    wdg3:[{n:'荷蘭花農',d:'戴帽、提著籃子。荷蘭以圍海造陸、風車與鬱金香聞名',top:'#2f74b5',bottom:'#3a3a3a',skin:'#f1d2b4',hat:'cap',hatC:'#e2702d',prop:'shopbag'}],
    wdg4:[{n:'牛仔',d:'寬簷帽、手持繩索。美國中部農牧業大規模機械化',top:'#a0522d',bottom:'#2f4a6a',skin:'#f1d2b4',hat:'brim',hatC:'#8a6a45',prop:'pole'}],
    soc1:[{n:'戶政人員',d:'制服、手拿文件。公民身分讓我們享有權利也負擔義務',top:'#2f5d9a',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#1d1d1d',prop:'book'}],
    soc2:[{n:'性平教育志工',d:'拿著彩色旗幟。性別平等是尊重每個人的選擇',top:'#c9567a',bottom:'#3a3a4a',skin:'#d9a77c',hair:'#2b1d14',prop:'flag',flagC:'#e3b23c'}],
    soc3:[{n:'爸爸',d:'提著購物袋準備煮晚餐。家事由家人一起分擔',top:'#5a8f6a',bottom:'#3a4a5a',skin:'#e8c4a0',hair:'#1d1d1d',prop:'shopbag'}],
    soc4:[{n:'學生會幹部',d:'學生帽、背著書包。學生自治是學習民主的開始',top:'#f4f6f8',bottom:'#2f3a5a',skin:'#d9a77c',hat:'schoolcap',hatC:'#2f3a5a',prop:'book',pack:1,packC:'#c0392b',small:1}],
    soc5:[{n:'志工',d:'綠色背心、抱著物資箱。非營利組織與志工服務社會',top:'#3c9a5a',bottom:'#3a3a4a',skin:'#e8c4a0',hat:'cap',hatC:'#3c9a5a',prop:'box'}],
    soc6:[{n:'交通導護',d:'拿著指揮旗。遵守社會規範讓生活更有秩序',top:'#e3b23c',bottom:'#2b2b33',skin:'#d9a77c',hat:'cap',hatC:'#e3b23c',prop:'flag',flagC:'#c0392b'}],
    law1:[{n:'投票的公民',d:'手拿選票。主權在民是民主政治的核心',top:'#4a90b8',bottom:'#2f3a4a',skin:'#d9a77c',hair:'#1d1d1d',prop:'ballot'}],
    law2:[{n:'立法委員',d:'西裝、拿著法案。立法院審議法律與預算',top:'#2b2b33',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#3a3a3a',prop:'book',tie:1}],
    law3:[{n:'競選志工',d:'戴帽、揮舞旗子。選舉是最重要的政治參與',top:'#e2702d',bottom:'#2f3a4a',skin:'#d9a77c',hat:'cap',hatC:'#e2702d',prop:'flag',flagC:'#2f74b5'}],
    law4:[{n:'里長',d:'提著公事包到處服務。地方自治由居民自己決定地方事務',top:'#6a8f5a',bottom:'#3a3a3a',skin:'#d9a77c',hair:'#6a6a6a',prop:'briefcase'}],
    law5:[{n:'法學教授',d:'拿著法典。憲法的位階最高',top:'#5a3a2a',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#6a6a6a',beard:1,prop:'book'}],
    law6:[{n:'調解委員',d:'拿著契約書。民事糾紛可以和解、調解或訴訟',top:'#3e6f8f',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#3a3a3a',prop:'scroll'}],
    law7:[{n:'少年法庭法官',d:'黑色法袍、手持法槌。少年事件重視保護與教育',top:'#1d1d22',robe:1,skin:'#d9a77c',hair:'#3a3a3a',prop:'gavel'}],
    law8:[{n:'律師',d:'提著公事包。不服行政處分可以提起訴願與行政訴訟',top:'#2b2b33',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#1d1d1d',prop:'briefcase',tie:1}],
    eco1:[{n:'猶豫的學生',d:'背著書包思考要選哪條路。機會成本是放棄選項中價值最高者',top:'#8a5ab0',bottom:'#3a3a4a',skin:'#e8c4a0',hat:'cap',hatC:'#e3b23c',prop:'map',pack:1,packC:'#3a5a3a'}],
    eco2:[{n:'市場攤販',d:'戴頭巾、提著菜籃。供給與需求決定市場價格',top:'#d0562f',bottom:'#3a3a4a',skin:'#d9a77c',hat:'scarf',hatC:'#e3b23c',prop:'shopbag'}],
    eco3:[{n:'銀行行員',d:'西裝、拿著帳簿。存款可以獲得利息',top:'#2f5d9a',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#1d1d1d',prop:'abacus',tie:1}],
    eco4:[{n:'工地工人',d:'戴安全帽、搬著材料。勞動基準法保障勞工權益',top:'#e3b23c',bottom:'#3a4a5a',skin:'#b9805a',hat:'helmet',hatC:'#e8b830',prop:'box'}],
    eco5:[{n:'稅務人員',d:'拿著帳本。稅收是政府最主要的收入',top:'#3a4a5a',bottom:'#2b2b33',skin:'#e8c4a0',hair:'#1d1d1d',prop:'abacus'}],
    eco6:[{n:'貨櫃碼頭工人',d:'戴安全帽、搬著貨箱。全球化讓各國經濟緊密相連',top:'#e2702d',bottom:'#2f3a4a',skin:'#d9a77c',hat:'helmet',hatC:'#f4f6f8',prop:'box'}]
  });
  const TRAVELER_COLORS=[['#2f74b5','#3a3a4a'],['#3c9a5a','#4a3a2a'],['#c9567a','#2f3a4a'],['#e3b23c','#3a4a5a'],['#8a5ab0','#2b2b33'],['#d0562f','#3a3a4a']];

  function makePerson(sp){
    const g=new T.Group(), s=sp.small?0.82:1;
    const part=(geo,c,x,y,z,parent)=>{ const m=M(geo,c,x,y,z); m.raycast=()=>{}; (parent||g).add(m); return m; };
    const hip=new T.Group(); hip.position.y=0.32; g.add(hip);
    const legL=new T.Group(); legL.position.set(-0.06,0,0); hip.add(legL);
    const legR=new T.Group(); legR.position.set(0.06,0,0); hip.add(legR);
    part(new T.BoxGeometry(0.09,0.32,0.1),sp.bottom||sp.top,0,-0.16,0,legL);
    part(new T.BoxGeometry(0.09,0.32,0.1),sp.bottom||sp.top,0,-0.16,0,legR);
    if(sp.robe) part(new T.CylinderGeometry(0.13,0.19,0.6,8),sp.top,0,0.34,0);
    else part(new T.BoxGeometry(0.26,0.32,0.16),sp.top,0,0.48,0);
    if(sp.collar) part(new T.CylinderGeometry(0.17,0.17,0.04,10),'#f4f1ea',0,0.65,0);
    if(sp.tie) part(new T.BoxGeometry(0.05,0.2,0.02),'#b5333a',0,0.52,0.085);
    if(sp.pack) part(new T.BoxGeometry(0.2,0.24,0.1),sp.packC||'#5a4a3a',0,0.48,-0.13);
    part(new T.SphereGeometry(0.11,10,8),sp.skin||'#e8c4a0',0,0.76,0);
    if(sp.hat!=='hood') [-0.04,0.04].forEach(x=>part(new T.BoxGeometry(0.022,0.03,0.01),'#1a1a1a',x,0.775,0.106));
    if(sp.beard) part(new T.BoxGeometry(0.14,0.07,0.06),sp.hair||'#5a4a3a',0,0.69,0.08);
    const hc=sp.hatC||'#1d1d22';
    switch(sp.hat){
      case 'brim': part(new T.CylinderGeometry(0.21,0.21,0.02,14),hc,0,0.84,0); part(new T.CylinderGeometry(0.1,0.11,0.11,12),hc,0,0.9,0); break;
      case 'tophat': part(new T.CylinderGeometry(0.17,0.17,0.02,14),hc,0,0.84,0); part(new T.CylinderGeometry(0.1,0.1,0.2,12),hc,0,0.95,0); break;
      case 'skullcap': part(new T.SphereGeometry(0.116,10,6,0,TAU0,0,Math.PI/2),hc,0,0.78,0); part(new T.SphereGeometry(0.025,6,4),'#b5333a',0,0.9,0); break;
      case 'helmet': part(new T.ConeGeometry(0.135,0.17,10),hc,0,0.9,0); part(new T.CylinderGeometry(0.125,0.125,0.04,10),'#3a3a3a',0,0.81,0); break;
      case 'police': part(new T.CylinderGeometry(0.115,0.11,0.08,12),hc,0,0.87,0); part(new T.BoxGeometry(0.13,0.015,0.08),'#111',0,0.83,0.09); break;
      case 'schoolcap': part(new T.CylinderGeometry(0.115,0.115,0.06,12),hc,0,0.86,0); part(new T.BoxGeometry(0.12,0.015,0.08),'#111',0,0.83,0.09); break;
      case 'cap': part(new T.SphereGeometry(0.117,10,6,0,TAU0,0,Math.PI/2),hc,0,0.79,0); part(new T.BoxGeometry(0.12,0.015,0.1),hc,0,0.8,0.1); break;
      case 'cloche': part(new T.SphereGeometry(0.13,10,6,0,TAU0,0,Math.PI/2),hc,0,0.78,0); part(new T.CylinderGeometry(0.16,0.16,0.015,12),hc,0,0.79,0); break;
      case 'conical': part(new T.ConeGeometry(0.26,0.13,12),hc,0,0.91,0); break;
      case 'hood': part(new T.SphereGeometry(0.128,10,8),hc,0,0.77,-0.01); part(new T.BoxGeometry(0.15,0.07,0.04),'#2b3a4a',0,0.77,0.11); break;
      case 'band': part(new T.TorusGeometry(0.11,0.02,4,12),hc,0,0.8,0).rotation.x=Math.PI/2; part(new T.SphereGeometry(0.113,10,6,0,TAU0,0,Math.PI/2.4),sp.hair||'#1d1d1d',0,0.78,0); break;
      case 'scarf': part(new T.SphereGeometry(0.122,10,6,0,TAU0,0,Math.PI/1.8),hc,0,0.77,-0.005); break;
      case 'scholar': part(new T.BoxGeometry(0.2,0.1,0.18),hc,0,0.88,0); break;
      case 'nemes': part(new T.SphereGeometry(0.12,10,6,0,TAU0,0,Math.PI/2),hc,0,0.78,0); part(new T.BoxGeometry(0.24,0.2,0.05),hc,0,0.7,-0.08); part(new T.BoxGeometry(0.25,0.03,0.06),'#e3b23c',0,0.79,-0.06); break;
      case 'knight': part(new T.CylinderGeometry(0.125,0.125,0.2,10),hc,0,0.79,0); part(new T.BoxGeometry(0.15,0.02,0.02),'#222',0,0.79,0.125); break;
      default: part(new T.SphereGeometry(0.114,10,6,0,TAU0,0,Math.PI/2.2),sp.hair||'#1d1d1d',0,0.78,-0.005);
    }
    if(sp.queue) part(new T.BoxGeometry(0.03,0.26,0.03),'#1d1d1d',0,0.6,-0.11);
    const armL=new T.Group(); armL.position.set(-0.17,0.62,0); g.add(armL);
    const armR=new T.Group(); armR.position.set(0.17,0.62,0); g.add(armR);
    part(new T.BoxGeometry(0.07,0.28,0.08),sp.top,0,-0.14,0,armL);
    part(new T.BoxGeometry(0.07,0.28,0.08),sp.top,0,-0.14,0,armR);
    const hand=new T.Group(); hand.position.set(0,-0.28,0.02); armR.add(hand);
    switch(sp.prop){
      case 'pot': { const p=new T.LatheGeometry([[0,0],[0.07,0.01],[0.09,0.07],[0.06,0.14],[0.065,0.17]].map(q=>new T.Vector2(q[0],q[1])),8); part(p,'#b0703f',0,-0.02,0.06,hand); break; }
      case 'cloth': part(new T.BoxGeometry(0.16,0.2,0.02),'#d7542b',0,-0.08,0.06,hand); part(new T.BoxGeometry(0.16,0.04,0.025),'#222',0,-0.06,0.06,hand); break;
      case 'musket': part(new T.BoxGeometry(0.03,0.75,0.04),'#3a2a1e',0,0.2,0.04,hand); break;
      case 'spear': part(new T.CylinderGeometry(0.012,0.012,0.95,5),'#6b4f36',0,0.25,0.04,hand); part(new T.ConeGeometry(0.03,0.1,5),'#b8b8b8',0,0.77,0.04,hand); break;
      case 'flag': part(new T.CylinderGeometry(0.01,0.01,0.85,5),'#5a4a3a',0,0.25,0.04,hand); part(new T.BoxGeometry(0.02,0.18,0.26),sp.flagC||'#c0392b',0,0.56,0.17,hand); break;
      case 'abacus': part(new T.BoxGeometry(0.18,0.1,0.03),'#6b3f26',0,-0.02,0.06,hand); break;
      case 'teabox': part(new T.BoxGeometry(0.16,0.14,0.14),'#a8463a',0,-0.02,0.08,hand); break;
      case 'scroll': case 'book': part(new T.BoxGeometry(0.12,0.15,0.03),sp.prop==='book'?'#2f74b5':'#efe6cf',0,-0.02,0.06,hand); break;
      case 'medbag': case 'briefcase': case 'handbag': part(new T.BoxGeometry(0.16,0.11,0.06),sp.prop==='handbag'?'#7a3a52':'#3a2a1e',0,-0.07,0.02,hand); break;
      case 'shopbag': part(new T.BoxGeometry(0.14,0.15,0.08),'#e3b23c',0,-0.09,0.02,hand); break;
      case 'saber': part(new T.BoxGeometry(0.025,0.38,0.03),'#aab0b6',-0.15,0.2,0.07); break;
      case 'cane': [-0.03,0,0.03].forEach(o=>part(new T.CylinderGeometry(0.012,0.012,0.7,5),'#7aa84f',o,0.15,0.03,hand)); break;
      case 'ballot': part(new T.BoxGeometry(0.11,0.15,0.01),'#fbfbf8',0,0.02,0.06,hand); break;
      case 'camera': part(new T.BoxGeometry(0.12,0.08,0.06),'#2b2b2b',0,0,0.06,hand); part(new T.CylinderGeometry(0.025,0.025,0.05,8),'#111',0,0,0.11,hand).rotation.x=Math.PI/2; break;
      case 'box': part(new T.BoxGeometry(0.17,0.14,0.14),'#c89a5a',0,-0.02,0.08,hand); break;
      case 'wafer': part(new T.CylinderGeometry(0.08,0.08,0.01,16),'#c6ccd6',0,0.02,0.07,hand).rotation.x=Math.PI/2; break;
      case 'pole': part(new T.CylinderGeometry(0.01,0.01,0.6,5),'#888',0,-0.05,0.04,hand); break;
      case 'rice': part(new T.CylinderGeometry(0.04,0.03,0.24,6),'#d9b84a',0,0.06,0.06,hand); break;
      case 'map': part(new T.BoxGeometry(0.2,0.14,0.01),'#e9dfc0',0,0.02,0.07,hand); break;
      case 'sword': part(new T.BoxGeometry(0.025,0.5,0.03),'#c8ccd0',0,0.18,0.05,hand); part(new T.BoxGeometry(0.12,0.02,0.03),'#6b4f36',0,-0.04,0.05,hand); break;
      case 'gavel': part(new T.CylinderGeometry(0.01,0.01,0.16,5),'#6b3f26',0,0,0.05,hand); part(new T.BoxGeometry(0.1,0.05,0.05),'#6b3f26',0,0.08,0.05,hand); break;
    }
    // 小配件不投影，減少繪製負擔
    g.traverse(o=>{ if(o.isMesh){ o.geometry.computeBoundingSphere(); if(o.geometry.boundingSphere.radius<0.12) o.castShadow=false; o.receiveShadow=false; } });
    // 合併成幾塊：身體一塊、四肢各一塊（四肢要擺動）
    bake(g,c=>c===hip||c===armL||c===armR,true); [legL,legR,armL,armR].forEach(l=>bake(l,null,false));
    g.scale.setScalar(s*1.0);
    return {g,legL,legR,armL,armR};
  }

  const walkers=[], peopleGroup=new T.Group(); scene.add(peopleGroup);
  // 腳下的接觸陰影
  const blobGeo=new T.CircleGeometry(0.2,16); blobGeo.rotateX(-Math.PI/2);
  const blobMat=new T.MeshBasicMaterial({color:'#000000',transparent:true,opacity:0.22,depthWrite:false});
  const PEOPLE_UNIT=id=>LM_INFO[id]?LM_INFO[id].unit:(ISL[id]?ISL[id].name:'');
  function addWalker(sp,unit,conf){
    const p=makePerson(sp); peopleGroup.add(p.g);
    p.blob=new T.Mesh(blobGeo,blobMat); p.blob.raycast=()=>{}; p.blob.renderOrder=4; peopleGroup.add(p.blob);
    p.g.traverse(o=>{ o.userData.walker=walkers.length; });
    const w=Object.assign({p,sp,unit,pos:new T.Vector3(),target:new T.Vector3(),wait:rnd()*2,phase:rnd()*6,speed:0.45+rnd()*0.25,head:rnd()*TAU0},conf);
    if(w.bridge){ w.t=rnd(); w.dirT=rnd()<0.5?1:-1; }
    else { pickTarget(w); w.pos.copy(w.target); pickTarget(w); }
    walkers.push(w); return w;
  }
  function pickTarget(w){
    const z=w.zones?w.zones[Math.floor(rnd()*w.zones.length)]:w;
    let a;
    if(z.ring){ a=(w.ang!=null?w.ang:rnd()*TAU0)+(rnd()*2-1)*0.85; w.ang=a; }
    else a=z.aMid!=null ? z.aMid+(rnd()*2-1)*z.aSpan : rnd()*TAU0;
    const r=z.rMin+rnd()*(z.rMax-z.rMin);
    w.target.set(w.center.x+Math.sin(a)*r, 0, w.center.z+Math.cos(a)*r);
  }
  ISLANDS.forEach(isl=>{
    const I=islands[isl.id];
    if(isl.ready){
      isl.lms.forEach(l=>{ const s=islets[l.id]; const c=I.pos.clone().add(s.c); (PEOPLE[l.id]||[]).forEach(sp=>addWalker(sp,l.unit,{center:c,ring:true,rMin:1.9,rMax:2.3})); });
      // 有代表模型的主島：原本的島嶼小人在主島上散步
      if(isl.decor) (PEOPLE[isl.id]||[]).forEach(sp=>addWalker(sp,isl.name,{center:I.pos,ring:true,rMin:2.8,rMax:3.3}));
    } else {
      (PEOPLE[isl.id]||[]).forEach(sp=>addWalker(sp,isl.name,{center:I.pos,ring:true,rMin:2.75,rMax:3.25}));
    }
  });
  // 領航員：站在中央沙洲，點他可以導覽或看今日提示
  { const gw=addWalker({n:'領航員',d:'',top:'#2f4a6a',bottom:'#2b2b33',skin:'#e8c4a0',hat:'police',hatC:'#f4f6f8',collar:1,prop:'map'},'',{center:new T.Vector3(0,0,0),ring:true,rMin:3.0,rMax:3.7,guide:true,y:0.44});
    gw.p.g.scale.setScalar(1.45); gw.speed=0.35; }
  bridges.forEach((b,i)=>{ const [top,bot]=TRAVELER_COLORS[i%TRAVELER_COLORS.length];
    addWalker({n:'跨島旅人',d:'沿著橋往來各島。跨單元、跨時代比較，是複習的好方法',top,bottom:bot,skin:['#e8c4a0','#d9a77c','#b9805a'][i%3],hat:'cap',hatC:bot,pack:1,packC:'#6b4f36',prop:'none'},'連接 '+ISL[b.from].name+' 與 '+ISL[b.to].name,{bridge:b}); });

  function updateWalkers(dt){
    walkers.forEach(w=>{
      let moving=false;
      if(w.bridge){
        const b=w.bridge;
        if(w.wait>0){ w.wait-=dt; }
        else { w.t+=w.dirT*dt*w.speed/b.len; moving=true; if(w.t>1||w.t<0){ w.t=Math.max(0,Math.min(1,w.t)); w.dirT*=-1; w.wait=1.5+rnd()*2.5; } }
        const t=w.t; w.pos.lerpVectors(b.A,b.B,t); w.pos.y=b.hAt(t)+0.035;
        const hd=Math.atan2((b.B.x-b.A.x)*w.dirT,(b.B.z-b.A.z)*w.dirT); w.head+=(((hd-w.head+Math.PI)%TAU0+TAU0)%TAU0-Math.PI)*Math.min(1,dt*6);
      } else {
        const dx=w.target.x-w.pos.x, dz=w.target.z-w.pos.z, d=Math.hypot(dx,dz);
        if(w.wait>0) w.wait-=dt;
        else if(d<0.06){ w.wait=1+rnd()*3; pickTarget(w); }
        else { const st=Math.min(d,w.speed*dt); w.pos.x+=dx/d*st; w.pos.z+=dz/d*st; moving=true;
          const hd=Math.atan2(dx,dz); w.head+=(((hd-w.head+Math.PI)%TAU0+TAU0)%TAU0-Math.PI)*Math.min(1,dt*6); }
        w.pos.y=w.y!=null?w.y:0.55;
        if(w.jump>0){ w.jump=Math.max(0,w.jump-dt*1.6); w.pos.y+=Math.sin(w.jump*Math.PI*2)*0.35*(w.jump>0.5?1:0.6); }
      }
      if(moving) w.phase+=dt*9;
      const sw=moving?Math.sin(w.phase)*0.55:0;
      w.p.legL.rotation.x=sw; w.p.legR.rotation.x=-sw;
      w.p.armL.rotation.x=-sw*0.8; w.p.armR.rotation.x=(w.sp.prop&&w.sp.prop!=='none'&&w.sp.prop!=='saber')?-0.5:sw*0.8;
      w.p.g.position.set(w.pos.x,w.pos.y+(moving?Math.abs(Math.sin(w.phase))*0.025:0),w.pos.z);
      w.p.g.rotation.y=w.head;
      w.p.blob.position.set(w.pos.x,w.pos.y+0.012,w.pos.z);
    });
  }
  updateWalkers(0);
