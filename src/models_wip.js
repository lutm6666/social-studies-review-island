  /* --- 建造中島嶼：各章節小島的代表模型（底部在 y=0，朝 +z 為正面） --- */
  const G=()=>new T.Group();
  const A=(g,o)=>{ g.add(o); return o; };
  const sph=(r,c,x,y,z,ws,hs)=>M(new T.SphereGeometry(r,ws||10,hs||8),c,x,y,z);
  const dome=(r,c,x,y,z)=>M(new T.SphereGeometry(r,12,6,0,Math.PI*2,0,Math.PI/2),c,x,y,z);
  const roof4=(r,h,c,x,y,z)=>{ const m=cone(r,h,4,c,x,y,z); m.rotation.y=Math.PI/4; return m; };
  const palm=(g,x,z,h)=>{ g.add(cyl(0.05,0.08,h,'#8a6a45',x,0,z,6)); for(let i=0;i<5;i++){ const l=M(new T.ConeGeometry(0.12,0.75,4),'#4f9a45',x,h,z); l.geometry.translate(0,0.37,0); l.rotation.y=i*Math.PI*2/5; l.rotation.z=1.9; g.add(l); } };
  const spinners=[]; // 會轉的零件（風車、風機）
  const CM={
    cnh:[
      // 古典到傳統時代：青銅鼎與陶俑
      ()=>{ const g=G(); g.add(cyl(0.75,0.6,0.7,'#5f7f6a',0,0.35,0,12)); g.add(cyl(0.8,0.8,0.08,'#4f6b5a',0,1.02,0,12));
        [[0.5,0.3],[-0.5,0.3],[0,-0.55]].forEach(([x,z])=>g.add(cyl(0.08,0.06,0.4,'#4f6b5a',x,0,z,6)));
        [-0.42,0.42].forEach(x=>g.add(M(new T.TorusGeometry(0.16,0.05,4,10,Math.PI),'#4f6b5a',x,1.12,0)));
        [[-1.2,0.6],[1.2,0.6],[-1.2,-0.5]].forEach(([x,z])=>{ g.add(box(0.3,0.55,0.22,'#a58a6a',x,0,z)); g.add(sph(0.12,'#a58a6a',x,0.68,z)); g.add(box(0.22,0.06,0.18,'#8a7050',x,0.78,z)); });
        return g; },
      // 區域內外的交流：絲路駱駝商隊
      ()=>{ const g=G(); const camel=(x,z,r)=>{ const c=G(); c.position.set(x,0,z); c.rotation.y=r;
          [[-0.25,-0.12],[0.25,-0.12],[-0.25,0.12],[0.25,0.12]].forEach(([a,b])=>c.add(box(0.08,0.55,0.08,'#c49a5e',a,0,b)));
          c.add(box(0.8,0.3,0.36,'#c49a5e',0,0.55,0)); c.add(sph(0.18,'#b88a50',0.05,0.95,0)); c.add(box(0.12,0.4,0.12,'#c49a5e',0.45,0.7,0)); c.add(box(0.26,0.14,0.14,'#c49a5e',0.55,1.05,0));
          c.add(box(0.36,0.2,0.5,'#8a3b20',-0.2,0.85,0)); return c; };
        g.add(camel(-0.5,0.3,0.2)); g.add(camel(0.7,-0.3,0.2));
        g.add(box(2.6,0.03,0.5,'#d9c08a',0,0,0)); [[-1.2,-0.8],[1.2,0.8]].forEach(([x,z])=>{ g.add(box(0.3,0.25,0.3,'#a8463a',x,0,z)); g.add(box(0.3,0.08,0.3,'#e3b23c',x,0.25,z)); });
        return g; },
      // 東亞世界的延續與變遷：宮殿城門
      ()=>{ const g=G(); g.add(box(2.6,0.75,1.1,'#b5413a',0,0,0)); g.add(box(0.5,0.5,0.06,'#5a2a20',0,0,0.56));
        g.add(box(2.0,0.1,0.9,'#e3dccd',0,0.75,0)); g.add(box(1.7,0.55,0.7,'#c94a3a',0,0.85,0));
        [-0.6,0,0.6].forEach(x=>g.add(cyl(0.05,0.05,0.55,'#8f2f24',x,0.85,0.36,6)));
        const r1=prism(0.55,2.1,'#e3b23c',0,1.55,0,0.42); g.add(r1); g.add(box(2.3,0.06,1.05,'#c99a24',0,1.4,0));
        const r2=prism(0.38,1.4,'#e3b23c',0,1.98,0,0.42); g.add(r2);
        return g; },
      // 晚清的挑戰與回應：洋務運動的砲臺與工廠
      ()=>{ const g=G(); g.add(box(1.4,0.6,1.0,'#9a8f7a',-0.5,0,-0.3)); g.add(cyl(0.12,0.16,1.6,'#6b4f36',-0.1,0.6,-0.5,8));
        const r=prism(0.3,1.4,'#6e5446',-0.5,0.72,-0.3,0.6); g.add(r);
        g.add(cyl(0.7,0.8,0.35,'#8d8a83',0.8,0,0.6,10)); const gun=M(new T.CylinderGeometry(0.09,0.12,1.1,8),'#2b2b2b',0.8,0.6,0.95); gun.rotation.x=1.25; g.add(gun);
        g.add(cyl(0.25,0.25,0.25,'#3a3a3a',0.8,0.35,0.6,8)); [0,1,2].forEach(i=>g.add(sph(0.08,'#2b2b2b',1.4+i*0.08,0.08,0.1-i*0.16)));
        return g; },
      // 現代國家的興起：民國初年的大學禮堂與鐘樓
      ()=>{ const g=G(); g.add(box(2.2,0.7,1.0,'#d8cfc0',0,0,0)); g.add(box(2.3,0.08,1.1,'#5e6a72',0,0.7,0));
        g.add(box(0.6,1.7,0.6,'#d8cfc0',0,0,0.25)); g.add(roof4(0.5,0.4,'#3e6f8f',0,1.7,0.25));
        const f=M(new T.CylinderGeometry(0.17,0.17,0.04,16),'#fbfaf5',0,1.35,0.56); f.rotation.x=Math.PI/2; g.add(f);
        for(let i=0;i<4;i++) g.add(box(0.2,0.3,0.03,'#7fa1b3',-0.95+i*0.4+(i>1?0.3:0),0.25,0.51));
        [0.3,0.15,0].forEach((y,i)=>g.add(box(0.9+i*0.2,0.1,0.25,'#cfc4b0',0,y*0,0.75+i*0.12)));
        return g; },
      // 當代東亞局勢：現代城市天際線
      ()=>{ const g=G(); g.add(cyl(0.06,0.09,2.8,'#c8ccd0',0,0,0,8)); g.add(sph(0.36,'#c9567a',0,0.9,0)); g.add(sph(0.26,'#c9567a',0,1.9,0)); g.add(sph(0.12,'#c9567a',0,2.5,0));
        [[0.9,-0.4,1.6,'#6f8fa6'],[-0.9,-0.3,1.3,'#8aa0b0'],[0.7,0.6,1.0,'#a9b8c4'],[-0.7,0.65,0.8,'#5f7890']].forEach(([x,z,h,c])=>{ g.add(box(0.5,h,0.5,c,x,0,z)); for(let k=0;k<h/0.3-1;k++) g.add(box(0.52,0.04,0.52,'#dfe7ec',x,0.2+k*0.3,z)); });
        return g; }
    ],
    wdh:[
      // 多元並立的古代文化：希臘神殿
      ()=>{ const g=G(); g.add(box(2.4,0.15,1.5,'#d9d2c2',0,0,0)); g.add(box(2.2,0.12,1.3,'#e6e0d2',0,0.15,0));
        for(let i=0;i<6;i++) [-0.5,0.5].forEach(z=>g.add(cyl(0.08,0.09,1.0,'#f2efe6',-0.9+i*0.36,0.27,z,8)));
        g.add(box(2.2,0.14,1.3,'#e6e0d2',0,1.27,0)); g.add(prism(0.36,2.2,'#e6e0d2',0,1.52,0,0.5));
        return g; },
      // 普世宗教：哥德式教堂
      ()=>{ const g=G(); g.add(box(1.0,1.1,1.9,'#cfc8b8',0,0,-0.2)); A(g,prism(0.52,1.9,'#6e6a7a',0,1.26,-0.2,0.7)).rotation.y=Math.PI/2;
        [-0.38,0.38].forEach(x=>{ g.add(box(0.36,1.8,0.36,'#cfc8b8',x,0,0.85)); g.add(cone(0.24,0.8,4,'#6e6a7a',x,1.8,0.85)); });
        const rose=M(new T.CylinderGeometry(0.2,0.2,0.04,16),'#7a9bc4',0,1.25,1.04); rose.rotation.x=Math.PI/2; g.add(rose);
        g.add(box(0.3,0.5,0.04,'#5a4a3a',0,0,1.04));
        return g; },
      // 近代歐洲的興起：大航海帆船
      ()=>{ const g=G(); const h=G(); h.position.y=0.15; g.add(h);
        h.add(box(2.2,0.45,0.75,'#7a4a2c',0,0,0)); h.add(box(0.6,0.4,0.75,'#8f5a36',-0.85,0.45,0)); h.add(box(0.4,0.25,0.7,'#8f5a36',0.95,0.45,0));
        [-0.25,0.45].forEach((x,i)=>{ h.add(cyl(0.04,0.05,2.0-i*0.3,'#5b3d26',x,0.45,0,6)); h.add(box(0.06,0.7-i*0.1,0.9-i*0.15,'#f4f1ea',x+0.05,1.2-i*0.15,0)); });
        h.add(box(0.03,0.2,0.3,'#c0392b',-0.25,2.35,0));
        g.add(box(2.6,0.1,1.2,'#3a97aa',0,0,0));
        return g; },
      // 多元世界的互動：地球儀與貿易箱
      ()=>{ const g=G(); g.add(cyl(0.35,0.45,0.25,'#6b4f36',0,0,0,10)); g.add(cyl(0.05,0.05,0.4,'#8a6a45',0,0.25,0,6));
        g.add(sph(0.75,'#3e7fb0',0,1.35,0,16,12)); [[0.3,1.6,0.6],[-0.4,1.2,0.6],[0.5,1.1,-0.4]].forEach(([x,y,z])=>{ const c=sph(0.3,'#6aa84f',x*0.85,y,z*0.85,8,6); c.scale.set(1,0.6,0.5); g.add(c); });
        const ring=M(new T.TorusGeometry(0.85,0.03,4,24),'#c9a646',0,1.35,0); ring.rotation.z=0.4; g.add(ring);
        [[-1.1,0.6,'#a8463a'],[1.1,0.5,'#c89a5a'],[1.0,-0.6,'#7a4a2c']].forEach(([x,z,c])=>g.add(box(0.36,0.3,0.36,c,x,0,z)));
        return g; },
      // 現代國家的建立：凱旋門
      ()=>{ const g=G(); [-0.7,0.7].forEach(x=>g.add(box(0.65,1.5,0.8,'#e2d9c4',x,0,0)));
        g.add(box(2.05,0.55,0.8,'#e2d9c4',0,1.5,0)); g.add(box(2.15,0.08,0.9,'#cfc4b0',0,2.05,0));
        const a=M(new T.CylinderGeometry(0.38,0.38,0.8,12,1,false,-Math.PI/2,Math.PI),'#e2d9c4',0,1.12,0); a.rotation.x=Math.PI/2; a.rotation.z=Math.PI/2; g.add(a);
        g.add(cyl(0.03,0.03,0.6,'#5a4a3a',0,2.13,0,5)); ['#2f5d9a','#f4f1ea','#d7542b'].forEach((c,i)=>g.add(box(0.12,0.3,0.02,c,0.07+i*0.12,2.45,0)));
        return g; },
      // 帝國主義：蒸汽輪船
      ()=>{ const g=G(); g.add(box(2.6,0.1,1.1,'#3a97aa',0,0,0)); g.add(box(2.3,0.45,0.7,'#2b2b33',0,0.1,0)); g.add(box(1.4,0.35,0.6,'#f4f1ea',-0.1,0.55,0));
        [-0.35,0.25].forEach(x=>{ g.add(cyl(0.13,0.13,0.8,'#c0392b',x,0.9,0,10)); g.add(cyl(0.14,0.14,0.12,'#1d1d22',x,1.65,0,10)); });
        const bw=prism(0.35,0.7,'#2b2b33',1.3,0.32,0,1.0); bw.rotation.y=Math.PI/2; bw.scale.set(1,1,0.6); g.add(bw);
        [0,1].forEach(i=>{ const s=sph(0.16+i*0.06,'#9a9a9a',-0.35-i*0.2,1.95+i*0.25,0); g.add(s); });
        return g; },
      // 戰爭與現代社會：一次大戰的戰車與沙包
      ()=>{ const g=G(); const t=G(); t.position.y=0.05; t.rotation.y=0.3; g.add(t);
        t.add(box(1.6,0.45,0.9,'#6b6a4a',0,0.15,0)); [-0.5,0.5].forEach(z=>t.add(box(1.8,0.4,0.18,'#3a3a2a',0,0,z)));
        t.add(box(0.7,0.35,0.6,'#5a5a3a',-0.1,0.6,0)); const gun=M(new T.CylinderGeometry(0.05,0.05,0.8,6),'#2b2b2b',0.55,0.78,0); gun.rotation.z=Math.PI/2; t.add(gun);
        for(let i=0;i<5;i++) g.add(box(0.36,0.18,0.24,'#c8b48a',-0.9+i*0.4,0,1.0+(i%2)*0.04)); for(let i=0;i<4;i++) g.add(box(0.36,0.18,0.24,'#bfa97c',-0.7+i*0.4,0.18,1.0));
        return g; }
    ],
    twg:[
      // 世界中的臺灣：羅盤地圖桌
      ()=>{ const g=G(); g.add(cyl(0.95,1.05,0.55,'#8a6a45',0,0,0,12)); g.add(cyl(0.98,0.98,0.05,'#e9dfc0',0,0.55,0,24));
        const isl=M(new T.CylinderGeometry(0.16,0.2,0.05,8),'#6aa84f',0.1,0.62,0); isl.scale.set(0.6,1,1.5); g.add(isl);
        for(let i=0;i<4;i++){ const a=i*Math.PI/2; const n=M(new T.ConeGeometry(0.07,0.5,4),i===0?'#c0392b':'#5a4a3a',Math.sin(a)*0.65,0.62,Math.cos(a)*0.65); n.rotation.x=Math.PI/2; n.rotation.y=a; n.scale.z=0.3; g.add(n); }
        g.add(cyl(0.03,0.03,1.4,'#6b4f36',0.9,0,-0.9,5)); g.add(box(0.5,0.3,0.02,'#2f5d9a',1.15,1.15,-0.9));
        return g; },
      // 地形與海域：斷崖海岸與浪花
      ()=>{ const g=G(); const c=new T.ConeGeometry(1.2,2.4,6,2); const p=c.attributes.position; for(let i=0;i<p.count;i++){ if(p.getY(i)>-1.1){ const k=0.85+rnd()*0.3; p.setX(i,p.getX(i)*k); p.setZ(i,p.getZ(i)*k);} } c.computeVertexNormals();
        const m=M(c,'#7d9870',-0.3,1.2,-0.3); m.scale.z=0.7; g.add(m); g.add(box(1.4,1.4,0.5,'#a39a85',-0.3,0,0.45));
        g.add(box(2.6,0.12,0.7,'#3a97aa',0,0,1.0)); [-0.8,0,0.8].forEach(x=>{ const w=M(new T.CylinderGeometry(0.12,0.12,0.5,8,1,false,0,Math.PI),'#f4f8f8',x,0.2,0.85); w.rotation.z=Math.PI/2; g.add(w); });
        return g; },
      // 氣候與水文：水庫大壩與雨雲
      ()=>{ const g=G(); g.add(box(2.4,0.9,0.4,'#bfbab0',0,0,0)); g.add(box(2.4,0.06,0.5,'#8d8a83',0,0.9,0));
        g.add(box(2.4,0.6,1.0,'#3e8fb0',0,0,-0.7)); for(let i=0;i<3;i++) g.add(box(0.25,0.7,0.12,'#e8f4f8',-0.6+i*0.6,0,0.26));
        const cl=G(); cl.position.set(0.2,2.1,-0.3); [[0,0,0.4],[0.4,0.05,0.3],[-0.4,0,0.32]].forEach(([x,y,r])=>cl.add(M(new T.IcosahedronGeometry(r,0),'#d5dde2',x,y,0))); g.add(cl);
        for(let i=0;i<5;i++) g.add(box(0.02,0.2,0.02,'#5aa0d0',-0.4+i*0.2,1.45+(i%2)*0.15,-0.3));
        return g; },
      // 人口與文化：三合院
      ()=>{ const g=G(); g.add(box(2.2,0.08,1.6,'#c9b48a',0,0,0));
        g.add(box(1.4,0.6,0.5,'#c96a4a',0,0.08,-0.5)); g.add(prism(0.3,1.5,'#7a3b26',0,0.82,-0.5,0.5));
        [-0.85,0.85].forEach(x=>{ g.add(box(0.45,0.5,1.0,'#c96a4a',x,0.08,0.15)); const r=prism(0.26,1.05,'#7a3b26',x,0.68,0.15,0.5); r.rotation.y=Math.PI/2; g.add(r); });
        g.add(box(0.3,0.36,0.03,'#5a2a20',0,0.08,-0.24)); g.add(cyl(0.2,0.2,0.04,'#8a7a60',0,0.08,0.4,10));
        return g; },
      // 產業發展：風力發電機
      ()=>{ const g=G(); [[-0.6,0.2,1],[0.7,-0.3,0.85]].forEach(([x,z,s])=>{ g.add(cyl(0.05*s,0.09*s,2.4*s,'#f2f4f6',x,0,z,8)); const hub=G(); hub.position.set(x,2.4*s,z+0.1); g.add(hub);
          hub.add(sph(0.08*s,'#f2f4f6',0,0,0)); for(let i=0;i<3;i++){ const b=M(new T.BoxGeometry(0.07*s,0.9*s,0.02),'#f2f4f6',0,0.45*s,0); const pv=G(); pv.rotation.z=i*Math.PI*2/3; pv.add(b); hub.add(pv); } spinners.push({o:hub,ax:'z',sp:1.6}); });
        g.add(box(0.6,0.35,0.45,'#5f7890',0.2,0,0.9));
        return g; },
      // 區域發展：高鐵列車
      ()=>{ const g=G(); g.add(box(2.8,0.08,0.6,'#8d8a83',0,0,0)); [-0.18,0.18].forEach(z=>g.add(box(2.8,0.04,0.04,'#5a5550',0,0.08,z)));
        g.add(box(1.8,0.4,0.42,'#f4f6f8',-0.2,0.14,0)); g.add(box(1.8,0.08,0.43,'#e2702d',-0.2,0.3,0));
        const nose=M(new T.ConeGeometry(0.22,0.8,8),'#f4f6f8',1.1,0.34,0); nose.rotation.z=-Math.PI/2; nose.scale.set(1,1,0.95); g.add(nose);
        for(let i=0;i<5;i++) g.add(box(0.2,0.1,0.02,'#2b3a4a',-0.9+i*0.35,0.4,0.22));
        [-1.0,0.6].forEach(x=>g.add(cyl(0.05,0.05,0.9,'#8d8a83',x,0,-0.4,6))); g.add(box(1.8,0.03,0.03,'#5a5550',-0.2,0.9,-0.4));
        return g; },
      // 地名文化：路牌與古地名石碑
      ()=>{ const g=G(); g.add(cyl(0.05,0.05,2.0,'#5a5550',0,0,0,6));
        [['#2f7a4a',1.75,0.3],['#2f5d9a',1.45,-0.4],['#2f7a4a',1.15,0.9]].forEach(([c,y,r])=>{ const s=box(0.9,0.22,0.03,c,0.35,y,0); s.geometry.translate(0,0,0); const pv=G(); pv.rotation.y=r; pv.add(s); g.add(pv); });
        g.add(box(0.6,1.0,0.25,'#9a958a',-0.9,0,0.4)); g.add(box(0.7,0.12,0.35,'#8b8474',-0.9,0,0.4)); g.add(box(0.36,0.6,0.02,'#7a7468',-0.9,0.25,0.53));
        return g; },
      // 農業與食品安全：稻田、農舍與稻草人
      ()=>{ const g=G(); [[-0.6,0.5],[0.6,0.5],[-0.6,-0.6],[0.6,-0.6]].forEach(([x,z])=>{ g.add(box(1.05,0.06,0.95,'#5a9ab0',x,0,z)); for(let i=0;i<4;i++) for(let j=0;j<3;j++) g.add(box(0.05,0.25,0.05,'#8fc25a',x-0.36+i*0.24,0.06,z-0.3+j*0.3)); });
        g.add(cyl(0.03,0.03,1.1,'#8a6a45',0,0,0,5)); g.add(box(0.6,0.04,0.04,'#8a6a45',0,0.8,0)); g.add(box(0.25,0.35,0.15,'#c0392b',0,0.6,0)); g.add(sph(0.12,'#e9d8a6',0,1.05,0)); g.add(cone(0.22,0.12,10,'#d6b56b',0,1.12,0));
        return g; }
    ],
    asg:[
      // 中國（一）：黃土高原窯洞與梯田
      ()=>{ const g=G(); for(let i=0;i<3;i++) g.add(box(2.4-i*0.5,0.4,1.6-i*0.35,['#c9a46a','#bf9a60','#b38f56'][i],0,i*0.4,-0.1+i*0.05));
        [-0.6,0,0.6].forEach(x=>{ const a=M(new T.CylinderGeometry(0.18,0.18,0.06,10,1,false,-Math.PI/2,Math.PI),'#4a3424',x,0.4,0.71); a.rotation.x=Math.PI/2; a.rotation.z=Math.PI/2; g.add(a); g.add(box(0.36,0.4,0.06,'#4a3424',x,0,0.71)); });
        g.add(box(0.3,0.25,0.3,'#a8463a',0.4,1.2,0.1));
        return g; },
      // 中國（二）：草原蒙古包與犛牛
      ()=>{ const g=G(); g.add(cyl(0.7,0.7,0.6,'#f2efe6',-0.3,0,-0.2,12)); g.add(cone(0.78,0.45,12,'#e6e0d2',-0.3,0.6,-0.2)); g.add(box(0.3,0.4,0.04,'#c0392b',-0.3,0,0.5));
        g.add(cyl(0.72,0.72,0.06,'#3e6f8f',-0.3,0.45,-0.2,12));
        const y=G(); y.position.set(0.9,0,0.6); y.rotation.y=-0.5; g.add(y); [[-0.22,-0.1],[0.22,-0.1],[-0.22,0.1],[0.22,0.1]].forEach(([a,b])=>y.add(box(0.08,0.3,0.08,'#2b2420',a,0,b)));
        y.add(box(0.65,0.35,0.36,'#2b2420',0,0.3,0)); y.add(box(0.22,0.22,0.22,'#2b2420',0.4,0.42,0)); [-0.12,0.12].forEach(z=>y.add(cone(0.03,0.16,5,'#efe6cf',0.45,0.6,z)));
        return g; },
      // 東北亞：雪山與鳥居
      ()=>{ const g=G(); g.add(cone(1.1,1.8,9,'#6f7f8a',-0.3,0,-0.4)); g.add(cone(0.45,0.6,9,'#f4f7f8',-0.3,1.2,-0.4));
        [-0.45,0.45].forEach(x=>g.add(cyl(0.07,0.08,1.2,'#d04a35',x+0.4,0,0.7,8)));
        g.add(box(1.3,0.1,0.14,'#d04a35',0.4,1.0,0.7)); g.add(box(1.55,0.12,0.18,'#2b2b2b',0.4,1.18,0.7));
        return g; },
      // 東南亞與南亞：高腳屋與椰子樹
      ()=>{ const g=G(); [[-0.5,-0.3],[0.5,-0.3],[-0.5,0.3],[0.5,0.3]].forEach(([x,z])=>g.add(cyl(0.05,0.05,0.7,'#6b4f36',x-0.2,0,z,5)));
        g.add(box(1.3,0.08,0.8,'#8b6a46',-0.2,0.7,0)); g.add(box(1.1,0.5,0.6,'#c49a5e',-0.2,0.78,0)); const r=prism(0.5,1.4,'#b8963a',-0.2,1.42,0,0.7); g.add(r);
        g.add(box(0.12,0.04,0.6,'#8b6a46',-0.2,0.35,0.6)); palm(g,1.0,0.4,1.5); palm(g,0.9,-0.6,1.2);
        return g; },
      // 西亞與北非：清真寺圓頂、宣禮塔與油井
      ()=>{ const g=G(); g.add(box(1.4,0.7,1.1,'#e8dcc0',-0.3,0,0)); g.add(cyl(0.45,0.45,0.2,'#e8dcc0',-0.3,0.7,0,12)); g.add(dome(0.45,'#3e8f8a',-0.3,0.9,0)); g.add(cone(0.05,0.2,6,'#c9a646',-0.3,1.33,0));
        g.add(cyl(0.12,0.14,1.9,'#e8dcc0',0.65,0,-0.4,8)); g.add(cyl(0.18,0.18,0.08,'#d6c8a8',0.65,1.5,-0.4,8)); g.add(cone(0.13,0.35,8,'#3e8f8a',0.65,1.9,-0.4));
        const d=G(); d.position.set(0.9,0,0.65); g.add(d); [[-0.2,-0.2],[0.2,-0.2],[0,0.2]].forEach(([x,z])=>{ const l=box(0.04,1.0,0.04,'#3a3a3a',x*0.5,0,z*0.5); l.rotation.set(z*0.3,0,-x*0.3); d.add(l); }); d.add(box(0.5,0.06,0.06,'#2b2b2b',0,0.95,0));
        return g; }
    ],
    wdg:[
      // 大洋洲與兩極：冰山與企鵝
      ()=>{ const g=G(); g.add(box(2.4,0.1,1.6,'#3a97aa',0,0,0)); const ic=new T.IcosahedronGeometry(0.9,0); const m=M(ic,'#e8f4fa',-0.3,0.6,-0.2); m.scale.set(1,1.3,0.9); g.add(m);
        g.add(M(new T.IcosahedronGeometry(0.4,0),'#d6ecf5',0.8,0.25,-0.5));
        [[0.5,0.5],[0.8,0.65],[0.35,0.8]].forEach(([x,z])=>{ g.add(cyl(0.1,0.12,0.3,'#1d1d22',x,0.1,z,8)); g.add(box(0.12,0.2,0.02,'#f4f4f4',x,0.14,z+0.1)); g.add(sph(0.08,'#1d1d22',x,0.48,z)); g.add(cone(0.025,0.07,4,'#e3b23c',x,0.46,z+0.09)); });
        return g; },
      // 漠南非洲：猴麵包樹與圓形茅屋
      ()=>{ const g=G(); g.add(cyl(0.35,0.45,1.4,'#9a8068',-0.5,0,-0.3,8)); for(let i=0;i<5;i++){ const a=i/5*Math.PI*2; const br=cyl(0.04,0.06,0.5,'#9a8068',-0.5+Math.sin(a)*0.2,1.35,-0.3+Math.cos(a)*0.2,5); br.rotation.set(Math.cos(a)*0.6,0,-Math.sin(a)*0.6); g.add(br); }
        A(g,M(new T.IcosahedronGeometry(0.55,0),'#7a9a45',-0.5,1.95,-0.3)).scale.set(1.4,0.5,1.4);
        g.add(cyl(0.5,0.5,0.55,'#b07a4a',0.7,0,0.5,10)); g.add(cone(0.65,0.6,10,'#c9a85a',0.7,0.55,0.5)); g.add(box(0.2,0.32,0.04,'#4a3424',0.7,0,1.0));
        return g; },
      // 歐洲與俄羅斯：荷蘭風車
      ()=>{ const g=G(); g.add(cyl(0.45,0.7,1.6,'#d8cfc0',0,0,0,8)); g.add(cone(0.55,0.6,8,'#7a3b26',0,1.6,0)); g.add(box(0.26,0.4,0.04,'#5a3a2a',0,0,0.62));
        const hub=G(); hub.position.set(0,1.55,0.55); g.add(hub); for(let i=0;i<4;i++){ const pv=G(); pv.rotation.z=i*Math.PI/2; pv.add(box(0.06,1.1,0.03,'#6b4f36',0,0.55,0)); pv.add(box(0.26,0.9,0.02,'#f4f1ea',0.14,0.62,0)); hub.add(pv); } spinners.push({o:hub,ax:'z',sp:0.8});
        [[-1.0,0.6],[1.0,0.7]].forEach(([x,z])=>{ for(let k=0;k<3;k++) g.add(cyl(0.02,0.02,0.3,'#4f9a45',x+k*0.12,0,z,4)); g.add(sph(0.06,['#eb5757','#f2c94c'][x<0?0:1],x+0.12,0.32,z)); });
        return g; },
      // 美洲：階梯金字塔與仙人掌
      ()=>{ const g=G(); for(let i=0;i<4;i++) g.add(box(2.0-i*0.42,0.35,2.0-i*0.42,['#b8a27a','#ad976f','#a28c64','#978159'][i],-0.1,i*0.35,-0.1));
        g.add(box(0.4,0.35,0.4,'#8a7650',-0.1,1.4,-0.1)); g.add(box(0.36,0.08,1.0,'#9a865e',-0.1,0,0.95));
        const cac=(x,z,s)=>{ g.add(cyl(0.1*s,0.1*s,0.9*s,'#4f8a45',x,0,z,6)); g.add(cyl(0.06*s,0.06*s,0.35*s,'#4f8a45',x+0.15*s,0.35*s,z,6)); g.add(cyl(0.06*s,0.06*s,0.3*s,'#4f8a45',x-0.14*s,0.45*s,z,6)); };
        cac(1.1,0.8,1); cac(-1.1,0.9,0.8);
        return g; }
    ],
    soc:[
      // 公民身分與人性尊嚴：戶政事務所
      ()=>{ const g=G(); g.add(box(1.8,0.8,1.0,'#e8e2d0',0,0,-0.2)); g.add(box(1.9,0.1,1.1,'#5e6a72',0,0.8,-0.2));
        g.add(box(1.2,0.3,0.04,'#2f5d9a',0,0.85,0.36)); g.add(box(0.5,0.55,0.04,'#7fa1b3',0,0,0.31));
        const card=G(); card.position.set(0.9,0,0.75); card.rotation.y=-0.4; g.add(card); card.add(cyl(0.03,0.03,0.6,'#5a5550',0,0,0,5)); card.add(box(0.7,0.45,0.04,'#f4f6f8',0,0.75,0)); card.add(box(0.2,0.25,0.05,'#c9b48a',-0.18,0.75,0)); card.add(box(0.3,0.04,0.05,'#5a6a7a',0.15,0.82,0)); card.add(box(0.3,0.04,0.05,'#5a6a7a',0.15,0.7,0));
        return g; },
      // 性別平等：平衡的翹翹板
      ()=>{ const g=G(); A(g,prism(0.3,0.5,'#e3b23c',0,0.22,0,0.9)).rotation.y=Math.PI/2;
        g.add(box(2.4,0.08,0.3,'#3e8fb0',0,0.44,0)); [-1.0,1.0].forEach((x,i)=>{ g.add(box(0.06,0.3,0.3,'#2f6f8f',x,0.52,0));
          const c=['#c9567a','#4a90b8'][i]; g.add(box(0.26,0.32,0.18,c,x,0.52,0)); g.add(sph(0.12,'#e8c4a0',x,0.98,0)); });
        g.add(cyl(0.6,0.6,0.04,'#f2994a',0,0,0.9,16)); g.add(cyl(0.45,0.45,0.05,'#f2c94c',0,0,0.9,16));
        return g; },
      // 家庭：涼棚下的餐桌
      ()=>{ const g=G(); [[-0.9,-0.6],[0.9,-0.6],[-0.9,0.6],[0.9,0.6]].forEach(([x,z])=>g.add(box(0.08,1.4,0.08,'#8a6a45',x,0,z)));
        g.add(box(2.0,0.06,1.4,'#8a6a45',0,1.4,0)); for(let i=0;i<5;i++) g.add(box(0.1,0.05,1.5,'#6aa84f',-0.8+i*0.4,1.46,0));
        g.add(cyl(0.5,0.5,0.05,'#c89a5a',0,0.5,0,12)); g.add(cyl(0.06,0.08,0.5,'#8a6a45',0,0,0,6));
        for(let i=0;i<4;i++){ const a=i*Math.PI/2+0.4; g.add(box(0.25,0.3,0.25,'#b07d4f',Math.sin(a)*0.75,0,Math.cos(a)*0.75)); }
        g.add(cyl(0.12,0.1,0.1,'#f4f1ea',0,0.55,0,10));
        return g; },
      // 學校與社區：校舍、旗桿與籃球架
      ()=>{ const g=G(); g.add(box(2.0,0.9,0.7,'#efe1c8',-0.2,0,-0.5)); g.add(box(2.1,0.08,0.8,'#b5533b',-0.2,0.9,-0.5)); for(let i=0;i<5;i++) g.add(box(0.24,0.26,0.03,'#7fa1b3',-1.0+i*0.4,0.4,-0.14));
        g.add(cyl(0.025,0.025,1.9,'#c8ccd0',-1.1,0,0.6,6)); g.add(box(0.4,0.26,0.02,'#d7542b',-0.88,1.65,0.6));
        g.add(cyl(0.04,0.04,1.3,'#5a5550',1.0,0,0.7,6)); g.add(box(0.5,0.36,0.04,'#f4f6f8',1.0,1.2,0.55)); const rim=M(new T.TorusGeometry(0.12,0.015,4,12),'#e2702d',1.0,1.25,0.4); rim.rotation.x=Math.PI/2; g.add(rim); g.add(sph(0.1,'#e2702d',0.6,0.1,0.9));
        return g; },
      // 社會團體：志工服務帳篷
      ()=>{ const g=G(); [[-0.8,-0.5],[0.8,-0.5],[-0.8,0.5],[0.8,0.5]].forEach(([x,z])=>g.add(box(0.05,1.0,0.05,'#c8ccd0',x,0,z)));
        g.add(roof4(1.25,0.55,'#3c9a5a',0,1.0,0)); g.add(box(1.6,0.06,1.05,'#3c9a5a',0,0.98,0));
        g.add(box(1.4,0.5,0.4,'#f4f1ea',0,0,0.25)); g.add(box(1.0,0.22,0.02,'#3c9a5a',0,0.18,0.46));
        [[-0.4,'#e3b23c'],[0.1,'#eb5757'],[0.45,'#2f74b5']].forEach(([x,c])=>g.add(box(0.2,0.18,0.2,c,x,0.5,0.25)));
        return g; },
      // 文化與社會規範：紅綠燈與斑馬線
      ()=>{ const g=G(); g.add(box(2.6,0.03,1.4,'#5a5a60',0,0,0)); for(let i=0;i<6;i++) g.add(box(0.22,0.035,1.1,'#f4f4f4',-1.0+i*0.4,0.0,0));
        g.add(cyl(0.05,0.05,1.8,'#3a3a3a',1.0,0,-0.8,6)); g.add(box(0.26,0.7,0.2,'#2b2b2b',1.0,1.6,-0.7));
        [['#eb5757',2.1],['#f2c94c',1.95],['#3c9a5a',1.8]].forEach(([c,y],i)=>A(g,M(new T.CylinderGeometry(0.07,0.07,0.04,10),new T.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:i===2?0.8:0.1,flatShading:true}),1.0,y,-0.59)).rotation.x=Math.PI/2);
        return g; }
    ],
    law:[
      // 民主政治：投票箱
      ()=>{ const g=G(); g.add(box(1.4,1.1,1.0,'#f4f6f8',0,0,0)); g.add(box(1.45,0.08,1.05,'#2f5d9a',0,1.1,0)); g.add(box(0.6,0.04,0.08,'#1d1d22',0,1.18,0));
        g.add(box(0.5,0.3,0.03,'#2f5d9a',0,0.55,0.51)); const b=box(0.35,0.5,0.02,'#fbfbf8',0.1,1.2,0); b.rotation.z=0.15; g.add(b); g.add(box(0.12,0.12,0.03,'#c0392b',0.12,1.38,0.012));
        [[-1.0,0.7],[1.05,0.6]].forEach(([x,z])=>{ g.add(box(0.5,0.9,0.4,'#c8ccd0',x,0,z)); g.add(box(0.5,0.06,0.42,'#5a6a7a',x,0.9,z)); });
        return g; },
      // 權力分立與政府：三根柱子撐起屋頂
      ()=>{ const g=G(); g.add(box(2.6,0.15,1.2,'#d9d4c8',0,0,0));
        [['#c9563f',-0.8],['#3e6f8f',0],['#3c9a5a',0.8]].forEach(([c,x])=>{ g.add(cyl(0.2,0.24,1.4,'#f2f0ea',x,0.15,0,10)); g.add(box(0.5,0.12,0.5,c,x,1.55,0)); g.add(box(0.5,0.12,0.5,c,x,0.15,0)); });
        g.add(box(2.4,0.14,0.8,'#e6e1d6',0,1.67,0)); g.add(prism(0.34,2.4,'#e6e1d6',0,1.94,0,0.5));
        return g; },
      // 選舉與參與：競選看板與宣傳車
      ()=>{ const g=G(); [-0.8,0.8].forEach(x=>g.add(box(0.08,1.2,0.08,'#5a5550',x,0,-0.5))); g.add(box(1.9,0.9,0.06,'#f4f1ea',0,1.0,-0.5)); g.add(box(1.7,0.25,0.07,'#e2702d',0,1.5,-0.5)); g.add(sph(0.18,'#e8c4a0',-0.5,1.25,-0.46));
        const t=G(); t.position.set(0.2,0,0.6); g.add(t); t.add(box(1.2,0.4,0.55,'#2f74b5',0,0.12,0)); t.add(box(0.4,0.32,0.5,'#f4f6f8',0.65,0.12,0)); [-0.4,0.4].forEach(x=>[-0.28,0.28].forEach(z=>{ const w=M(new T.CylinderGeometry(0.12,0.12,0.08,10),'#1d1d22',x,0.12,z); w.rotation.x=Math.PI/2; t.add(w); }));
        [-0.3,0.2].forEach(x=>{ const sp=cone(0.12,0.25,8,'#c8ccd0',x,0.52,0); sp.rotation.z=-Math.PI/2; t.add(sp); });
        return g; },
      // 地方自治：鄉鎮公所
      ()=>{ const g=G(); g.add(box(2.2,0.8,1.0,'#e3dccd',0,0,-0.1)); g.add(box(2.3,0.08,1.1,'#7a3b26',0,0.8,-0.1)); g.add(box(0.8,0.5,0.6,'#e3dccd',0,0.88,-0.1)); g.add(roof4(0.6,0.4,'#7a3b26',0,1.38,-0.1));
        const f=M(new T.CylinderGeometry(0.14,0.14,0.04,14),'#fbfaf5',0,1.13,0.21); f.rotation.x=Math.PI/2; g.add(f);
        for(let i=0;i<4;i++) g.add(box(0.22,0.28,0.03,'#7fa1b3',-0.9+i*0.6,0.3,0.41)); g.add(box(0.36,0.45,0.03,'#6b4f36',0,0,0.41));
        [-1.0,1.0].forEach(x=>{ g.add(cyl(0.02,0.02,1.5,'#c8ccd0',x,0,0.8,5)); g.add(box(0.36,0.22,0.02,x<0?'#d04a35':'#3c9a5a',x+0.19,1.3,0.8)); });
        return g; },
      // 法律基本概念：攤開的法典
      ()=>{ const g=G(); g.add(box(1.5,0.6,1.0,'#8a6a45',0,0,0)); const L=G(); L.position.set(0,0.6,0); g.add(L);
        [-1,1].forEach(s=>{ const pg=box(0.8,0.1,1.1,'#f4efe2',s*0.4,0,0); pg.rotation.z=s*-0.12; L.add(pg); const cv=box(0.84,0.04,1.14,'#7a2a20',s*0.41,-0.03,0); cv.rotation.z=s*-0.12; L.add(cv);
          for(let i=0;i<4;i++){ const ln=box(0.55,0.01,0.04,'#5a5a60',s*0.42,0.12+(0.08)*0,-0.35+i*0.22); ln.rotation.z=s*-0.12; L.add(ln); } });
        g.add(box(1.1,0.18,0.8,'#2f5d9a',1.1,0,0.5)); g.add(box(1.0,0.16,0.75,'#7a2a20',1.1,0.18,0.5));
        return g; },
      // 民法：契約書與印章
      ()=>{ const g=G(); g.add(box(1.6,0.6,1.1,'#a47148',0,0,0)); g.add(box(1.0,0.02,1.3,'#f4efe2',-0.1,0.6,0)); for(let i=0;i<5;i++) g.add(box(0.7,0.01,0.04,'#5a5a60',-0.15,0.62,-0.45+i*0.18));
        g.add(cyl(0.14,0.14,0.36,'#c0392b',0.55,0.6,0.35,10)); g.add(sph(0.14,'#c0392b',0.55,0.98,0.35)); g.add(cyl(0.1,0.1,0.01,'#d7342a',0.1,0.62,0.45,10));
        const pen=M(new T.CylinderGeometry(0.03,0.03,0.7,6),'#1d1d22',0.4,0.66,-0.3); pen.rotation.z=Math.PI/2; pen.rotation.y=0.5; g.add(pen);
        return g; },
      // 刑法與少年事件：正義天秤
      ()=>{ const g=G(); g.add(cyl(0.5,0.6,0.3,'#9a958a',0,0,0,10)); g.add(cyl(0.06,0.08,1.9,'#c9a646',0,0.3,0,8)); g.add(box(1.8,0.07,0.07,'#c9a646',0,2.15,0)); g.add(sph(0.1,'#c9a646',0,2.3,0));
        [-0.85,0.85].forEach(x=>{ [-0.12,0.12].forEach(z=>{ const c=box(0.01,0.55,0.01,'#8a7a40',x,1.6,z); g.add(c); }); g.add(M(new T.CylinderGeometry(0.28,0.18,0.08,12),'#c9a646',x,1.58,0)); });
        g.add(box(0.5,0.12,0.36,'#6b3f26',0.9,0,0.7)); A(g,cyl(0.03,0.03,0.4,'#6b3f26',0.75,0.14,0.7,5)).rotation.z=1.2; g.add(box(0.2,0.1,0.1,'#6b3f26',0.6,0.3,0.7));
        return g; },
      // 行政救濟：服務櫃檯與陳情信箱
      ()=>{ const g=G(); g.add(box(2.0,1.0,0.8,'#e8e2d0',0,0,-0.5)); g.add(box(2.1,0.1,0.9,'#5e6a72',0,1.0,-0.5)); g.add(box(1.6,0.25,0.04,'#3e6f8f',0,1.1,-0.08));
        g.add(box(1.6,0.6,0.4,'#c8b48a',0,0,0.15)); g.add(box(1.7,0.05,0.48,'#8b6a46',0,0.6,0.15)); [[-0.4,0],[0.3,0.05]].forEach(([x,r])=>{ const d=box(0.3,0.04,0.4,'#f4f6f8',x,0.65,0.15); d.rotation.y=r; g.add(d); });
        g.add(cyl(0.04,0.04,0.8,'#5a5550',1.1,0,0.8,6)); g.add(box(0.4,0.4,0.3,'#2f7a4a',1.1,0.8,0.8)); g.add(box(0.26,0.03,0.02,'#1d1d22',1.1,1.08,0.96));
        return g; }
    ],
    eco:[
      // 選擇與機會成本：岔路指標
      ()=>{ const g=G(); [[-0.5,0.6],[0.5,-0.6]].forEach(([x,r])=>{ const pth=box(0.5,0.03,1.8,'#c4a77a',x,0,0.2); pth.rotation.y=r; g.add(pth); });
        g.add(box(0.5,0.03,0.9,'#c4a77a',0,0,1.1)); g.add(cyl(0.05,0.05,1.8,'#6b4f36',0,0,0.6,6));
        [['#3c9a5a',1.55,0.6],['#e2702d',1.25,-0.6]].forEach(([c,y,r])=>{ const pv=G(); pv.position.set(0,y,0.6); pv.rotation.y=r; g.add(pv); pv.add(box(0.8,0.22,0.04,c,0.38,0,0)); A(pv,M(new T.ConeGeometry(0.15,0.2,3),c,0.85,0,0)).rotation.z=-Math.PI/2; });
        [[-1.0,-0.8,'#e3b23c'],[1.0,-0.8,'#2f74b5']].forEach(([x,z,c])=>g.add(box(0.4,0.4,0.4,c,x,0,z)));
        return g; },
      // 市場與價格：供需交叉的雕塑
      ()=>{ const g=G(); g.add(box(2.0,0.15,1.0,'#cfc8b8',0,0,0)); [[0.75,'#2f74b5'],[-0.75,'#e2552d']].forEach(([a,c])=>{ const pv=G(); pv.position.set(0,1.0,0); pv.rotation.z=a; pv.add(M(new T.BoxGeometry(0.14,2.2,0.14),c,0,0,0)); g.add(pv); });
        g.add(sph(0.16,'#e3b23c',0,1.0,0.1)); g.add(box(0.06,1.8,0.06,'#5a5550',-0.95,0.15,0)); g.add(box(1.9,0.06,0.06,'#5a5550',0,0.15,0.0));
        return g; },
      // 貨幣與金融：銀行與硬幣
      ()=>{ const g=G(); g.add(box(2.2,0.15,1.3,'#d9d4c8',0,0,-0.1)); g.add(box(1.9,0.9,0.8,'#eeeae1',0,0.15,-0.3));
        for(let i=0;i<4;i++) g.add(cyl(0.08,0.09,0.9,'#f6f3ec',-0.6+i*0.4,0.15,0.25,8)); g.add(box(1.9,0.12,1.0,'#e6e1d6',0,1.05,-0.2)); g.add(prism(0.3,1.9,'#e6e1d6',0,1.3,-0.2,0.5));
        [[0.95,0.75,6],[0.6,0.85,4],[-0.9,0.8,5]].forEach(([x,z,n])=>{ for(let i=0;i<n;i++) g.add(cyl(0.16,0.16,0.06,'#e3b23c',x,i*0.065,z,12)); });
        return g; },
      // 勞動：工地鷹架與安全帽
      ()=>{ const g=G(); for(let i=0;i<3;i++) for(let j=0;j<2;j++) g.add(box(0.05,1.8,0.05,'#c8ccd0',-0.8+i*0.7,0,-0.3+j*0.6));
        for(let k=0;k<3;k++){ g.add(box(1.5,0.04,0.65,'#8b6a46',-0.1,0.55+k*0.6,0)); }
        g.add(box(1.2,1.6,0.5,'#c9a07a',-0.1,0,-0.65)); g.add(dome(0.2,'#e8b830',0.9,0,0.8)); g.add(box(0.5,0.08,0.1,'#e8b830',0.9,0,0.95));
        g.add(box(0.4,0.3,0.4,'#c8b48a',-1.0,0,0.8)); g.add(box(0.4,0.3,0.4,'#bfa97c',-0.95,0.3,0.78));
        return g; },
      // 政府的經濟角色：公共建設拱橋
      ()=>{ const g=G(); g.add(box(2.6,0.1,0.9,'#3a97aa',0,0,0));
        const arch=M(new T.TorusGeometry(0.95,0.12,6,16,Math.PI),'#bfbab0',0,0.1,0); g.add(arch); g.add(box(2.6,0.12,0.6,'#9a958a',0,1.07,0));
        [-1.2,1.2].forEach(x=>g.add(box(0.3,1.05,0.6,'#9a958a',x,0,0))); for(let i=0;i<7;i++) g.add(box(0.05,0.25,0.05,'#5a5550',-1.2+i*0.4,1.19,0.28));
        g.add(box(0.5,0.3,0.3,'#e8b830',0.5,1.19,0)); g.add(cyl(0.12,0.12,0.3,'#2b2b2b',0.2,1.19,0,10));
        return g; },
      // 全球化與國際關係：貨櫃船
      ()=>{ const g=G(); g.add(box(2.6,0.1,1.1,'#3a97aa',0,0,0)); g.add(box(2.4,0.4,0.75,'#2f4a6a',0,0.1,0)); g.add(box(2.4,0.08,0.77,'#c0392b',0,0.1,0));
        const cs=['#d7542b','#2f74b5','#3c9a5a','#e3b23c','#8a5ab0','#c9567a'];
        for(let i=0;i<4;i++) for(let j=0;j<2;j++) for(let k=0;k<(i===3?1:2);k++) g.add(box(0.36,0.24,0.32,cs[(i+j*2+k)%cs.length],-0.85+i*0.42,0.5+k*0.24,-0.17+j*0.34));
        g.add(box(0.35,0.7,0.6,'#f4f6f8',0.95,0.5,0)); g.add(box(0.37,0.08,0.62,'#2b3a4a',0.95,1.05,0));
        return g; }
    ]
  };
