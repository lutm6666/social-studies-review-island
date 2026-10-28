  const TAU0=Math.PI*2;
  /* --- 裝飾：潟湖、浪花、中央沙洲 --- */
  const decoUpdaters=[];
  const lagoonMat=new T.MeshStandardMaterial({color:'#6fb8b9',transparent:true,opacity:0.28,roughness:0.4,depthWrite:false});
  let fIdx=0;
  ISLANDS.forEach((isl,idx)=>{
    const I=islands[isl.id];
    if(I.arch){ const lg=new T.CircleGeometry(I.R+2.2,64); lg.rotateX(-Math.PI/2); const lag=new T.Mesh(lg,lagoonMat); lag.position.set(I.pos.x,0.13,I.pos.z); lag.renderOrder=1; lag.raycast=()=>{}; scene.add(lag); }
    I.pieces.forEach(pc=>{
      if(!I.arch){ const lg=new T.RingGeometry(pc.R*1.12,pc.R*1.7,64,1); lg.rotateX(-Math.PI/2); jitterGeo(lg,pc.jit); const lag=new T.Mesh(lg,lagoonMat); lag.position.set(pc.x,0.13,pc.z); lag.renderOrder=1; lag.raycast=()=>{}; scene.add(lag); }
      const fm=new T.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:0.45,depthWrite:false});
      const fy=I.arch?0.23:0.15;
      const fg=new T.RingGeometry(pc.R*1.1,pc.R*1.22,48,1); fg.rotateX(-Math.PI/2); jitterGeo(fg,pc.jit); const foam=new T.Mesh(fg,fm); foam.position.set(pc.x,fy,pc.z); foam.renderOrder=2; foam.raycast=()=>{}; scene.add(foam);
      const ph=(fIdx++)*0.9;
      decoUpdaters.push(t=>{ const k=Math.sin(t*1.3+ph); fm.opacity=0.3+0.18*k; foam.scale.setScalar(1+0.025*k); });
    });
  });
  // 中央的錯題島：羅盤廣場、公告欄、三色旗；各島答錯的題目化成漂流瓶擱淺在沙灘上
  const HUB_R=7.2;
  let bottleMesh=null; const bottleSlots=[];
  const hubGroup=new T.Group(); hubGroup.userData.islId='_hub'; scene.add(hubGroup);
  {
    const hub=hubGroup;
    hub.add(M(jitterGeo(new T.CylinderGeometry(HUB_R,HUB_R*1.1,0.9,40),jit0),'#efd9a6',0,-0.2,0));
    hub.add(M(jitterGeo(new T.CylinderGeometry(HUB_R*0.78,HUB_R*0.8,0.16,36),jit0),'#a9c48a',0,0.32,0));
    hub.add(M(new T.CylinderGeometry(2.2,2.2,0.08,32),'#d6cdb9',0,0.42,0));
    const star=new T.Shape(); const n=8;
    for(let i=0;i<n*2;i++){ const a=i*Math.PI/n, r=i%2===0?(i%4===0?2.0:1.4):0.45; const x=Math.sin(a)*r, y=Math.cos(a)*r; if(i===0) star.moveTo(x,y); else star.lineTo(x,y); }
    const sg2=new T.ShapeGeometry(star); sg2.rotateX(-Math.PI/2);
    hub.add(M(sg2,'#8a6a45',0,0.47,0));
    hub.add(M(new T.CylinderGeometry(0.28,0.28,0.04,16),'#e3b23c',0,0.49,0));
    hub.add(cyl(0.06,0.07,4.2,'#6b4f36',0,0.45,0,8));
    hub.add(M(new T.SphereGeometry(0.12,10,8),'#e3b23c',0,4.7,0));
    const flags=[];
    ['hist','geo','civ'].forEach((k,i)=>{ const f=M(new T.BoxGeometry(1.1,0.32,0.03),SUBJ[k].color,0.58,4.25-i*0.42,0); hub.add(f); flags.push(f); });
    // 公告欄：錯題島的招牌
    const bd=new T.Group(); bd.position.set(0,0.4,-4.7); hub.add(bd);
    [-1.1,1.1].forEach(x=>bd.add(box(0.12,1.9,0.12,'#6b4f36',x,0,0)));
    bd.add(box(2.5,1.2,0.1,'#8b6a46',0,0.65,0)); bd.add(box(2.7,0.12,0.4,'#6b3f26',0,1.9,0));
    [[-0.75,1.35,'#f4efe2'],[0,1.4,'#fff6d8'],[0.75,1.3,'#f4efe2'],[-0.4,0.95,'#ffe0d0'],[0.45,0.92,'#f4efe2']].forEach(([x,y,c])=>bd.add(box(0.5,0.34,0.02,c,x,y-0.3,0.06)));
    bd.add(box(0.12,0.12,0.03,'#d04a35',-0.75,1.18,0.08)); bd.add(box(0.12,0.12,0.03,'#d04a35',0.45,0.75,0.08));
    // 小碼頭與救生圈
    const pier=new T.Group(); pier.position.set(HUB_R*0.92,0,1.2); pier.rotation.y=Math.PI/2; hub.add(pier);
    pier.add(box(1.0,0.08,2.6,'#8b6a46',0,0.22,0.9)); [0,1.8].forEach(z=>[-0.45,0.45].forEach(x=>pier.add(cyl(0.06,0.06,0.9,'#6b4f36',x,-0.6,z,6))));
    const ring=M(new T.TorusGeometry(0.28,0.08,6,14),'#e2552d',-0.42,0.62,1.6); ring.rotation.y=Math.PI/2; pier.add(ring);
    for(let i=0;i<9;i++){ const a=i/9*Math.PI*2+0.3; if(Math.abs(Math.atan2(Math.sin(a-Math.PI/2),Math.cos(a-Math.PI/2)))<0.35) continue; const rk=M(new T.DodecahedronGeometry(0.3+rnd()*0.3,0),'#9a958a',Math.sin(a)*HUB_R*1.02,0.05,Math.cos(a)*HUB_R*1.02); rk.rotation.set(rnd()*3,rnd()*3,0); hub.add(rk); }
    for(let i=0;i<7;i++){ const a=rnd()*Math.PI*2, r=3.2+rnd()*1.8; if(Math.abs(a-Math.PI)<0.5) continue; tree(hub,Math.sin(a)*r,Math.cos(a)*r,0.55+rnd()*0.3,'round'); hub.children[hub.children.length-1].position.y=0.4; }
    bake(hub,c=>flags.includes(c),true);
    // 漂流瓶：最多 45 支，依科目上色
    const bg=new T.CylinderGeometry(0.19,0.23,0.72,8); bg.rotateZ(Math.PI/2);
    bottleMesh=new T.InstancedMesh(bg,new T.MeshStandardMaterial({flatShading:true,roughness:0.35,metalness:0.1,transparent:true,opacity:0.92}),45);
    const dm=new T.Object3D();
    for(let i=0;i<45;i++){ const a=(i*2.399)%(Math.PI*2), r=HUB_R*(0.86+((i*37)%10)/80); if(Math.abs(Math.atan2(Math.sin(a-Math.PI/2),Math.cos(a-Math.PI/2)))<0.3){ bottleSlots.push(null); continue; }
      dm.position.set(Math.sin(a)*r,0.36,Math.cos(a)*r); dm.rotation.set(0,a+((i*13)%7)*0.4,0.15); dm.updateMatrix(); bottleSlots.push(dm.matrix.clone()); }
    const used=bottleSlots.filter(Boolean); used.forEach((m,i)=>bottleMesh.setMatrixAt(i,m)); bottleMesh.count=0; bottleMesh.castShadow=true; bottleMesh.raycast=()=>{}; scene.add(bottleMesh);
    bottleMesh.userData.max=used.length;
    const lag=new T.Mesh(new T.RingGeometry(HUB_R*1.05,HUB_R*1.6,48,1),lagoonMat); lag.rotation.x=-Math.PI/2; lag.position.y=0.13; lag.raycast=()=>{}; scene.add(lag);
    decoUpdaters.push(t=>{ flags.forEach((f,i)=>{ f.rotation.y=Math.sin(t*1.6+i)*0.25; }); });
  }
  islPickers.push(hubGroup);
  function updateDeco(dt,t){ decoUpdaters.forEach(f=>f(t,dt)); }
  // 漸層天空與日月
  const skyUni={top:{value:new T.Color('#7fc4e0')},bot:{value:new T.Color('#e6f4f6')}};
  const sky=new T.Mesh(new T.SphereGeometry(420,32,16),new T.ShaderMaterial({
    uniforms:skyUni, side:T.BackSide, depthWrite:false, fog:false,
    vertexShader:'varying float h; void main(){ vec4 w=modelMatrix*vec4(position,1.0); h=normalize(w.xyz-cameraPosition).y; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader:'uniform vec3 top; uniform vec3 bot; varying float h; void main(){ float t=smoothstep(-0.02,0.55,h); gl_FragColor=vec4(mix(bot,top,t),1.0); }'
  }));
  sky.raycast=()=>{}; sky.renderOrder=-10; scene.add(sky);
  const orbMat=new T.MeshBasicMaterial({color:'#fff4c8',fog:false});
  const orb=new T.Mesh(new T.SphereGeometry(9,20,14),orbMat); orb.raycast=()=>{}; scene.add(orb);
  const haloMat=new T.MeshBasicMaterial({color:'#fff4c8',transparent:true,opacity:0.18,fog:false,depthWrite:false});
  const halo=new T.Mesh(new T.SphereGeometry(16,20,14),haloMat); halo.raycast=()=>{}; scene.add(halo);
  function skyTheme(dark){
    skyUni.top.value.set(dark?'#050c1c':'#6fb9dc'); skyUni.bot.value.set(dark?'#1d3352':'#e3f3f5');
    orbMat.color.set(dark?'#e8eefc':'#fff2c2'); haloMat.color.set(dark?'#9fb4dd':'#fff6d8'); haloMat.opacity=dark?0.12:0.22;
    return dark?'#1d3352':'#e3f3f5';
  }
  const orbOff=new T.Vector3(190,150,-300); orb.position.copy(orbOff); halo.position.copy(orb.position);
  let rockMesh=null, rockList=[];
  // 島嶼地形：小丘、岩岸、花草（岩石與花草用 InstancedMesh 一次畫完）
  {
    const shade=(hex,f)=>{ const c=new T.Color(hex); c.multiplyScalar(f); return c; };
    const flowerCols=['#f2c94c','#eb5757','#f2f0ea','#bb6bd9','#f2994a'];
    const rocks=[], flowers=[], tufts=[];
    const dummy=new T.Object3D();
    ISLANDS.forEach(isl=>{
      const I=islands[isl.id], g=I.g, base=SUBJ[isl.subj].color;
      const hillC='#'+shade(base,0.86).getHexString(), tuftC=new T.Color('#6f8f4f').lerp(new T.Color(base),0.3);
      I.pieces.forEach(pc=>{
        const R=pc.R, nR=I.arch?(pc.main?6:5):14;
        for(let i=0;i<nR;i++){ const a=rnd()*TAU0, rr=R*0.86*pc.jit(a); rocks.push({p:new T.Vector3(pc.x+Math.sin(a)*rr,0.3+rnd()*0.15,pc.z+Math.cos(a)*rr),s:(I.arch?0.2:0.28)+rnd()*(I.arch?0.22:0.35),r:[rnd()*3,rnd()*3,0],c:new T.Color(rnd()<0.5?'#9a958a':'#8b8474'),isl:isl.id}); }
        const r0=I.arch?(pc.main?1.7:1.85):2.7, n=I.arch?14:34;
        for(let i=0;i<n;i++){
          const a=rnd()*TAU0, rr=r0+rnd()*(R*0.8-r0); const x=Math.sin(a)*rr, z=Math.cos(a)*rr;
          if(i%2===0) flowers.push({p:new T.Vector3(pc.x+x,0.6,pc.z+z),c:new T.Color(flowerCols[i%flowerCols.length])});
          else tufts.push({p:new T.Vector3(pc.x+x,0.65,pc.z+z),c:tuftC});
        }
      });
      if(!I.arch) [0,1,2].map(()=>({a:rnd()*TAU0,r:4.6+rnd()*0.8})).forEach(h=>{ const hm=M(new T.IcosahedronGeometry(0.9+rnd()*0.4,0),hillC,Math.sin(h.a)*h.r*I.jit(h.a)*0.92,0.42,Math.cos(h.a)*h.r*I.jit(h.a)*0.92); hm.scale.set(1.3,0.42,1.1); hm.rotation.y=rnd()*3; hm.raycast=()=>{}; hm.userData.tree=true; g.add(hm); });
    });
    function instanced(geo,list,fn,shadow){
      const im=new T.InstancedMesh(geo,new T.MeshStandardMaterial({flatShading:true,roughness:0.95}),list.length);
      list.forEach((it,i)=>{ fn(it); dummy.updateMatrix(); im.setMatrixAt(i,dummy.matrix); im.setColorAt(i,it.c); });
      im.instanceMatrix.needsUpdate=true; if(im.instanceColor) im.instanceColor.needsUpdate=true;
      im.castShadow=shadow; im.receiveShadow=true; im.raycast=()=>{}; scene.add(im); return im;
    }
    rockList=rocks;
    rockMesh=instanced(new T.DodecahedronGeometry(1,0),rocks,it=>{ dummy.position.copy(it.p); dummy.rotation.set(it.r[0],it.r[1],it.r[2]); dummy.scale.set(it.s,it.s*0.7,it.s); },true);
    instanced(new T.IcosahedronGeometry(0.07,0),flowers,it=>{ dummy.position.copy(it.p); dummy.rotation.set(0,0,0); dummy.scale.set(1,1,1); },false);
    instanced(new T.IcosahedronGeometry(0.14,0),tufts,it=>{ dummy.position.copy(it.p); dummy.position.y=0.6; dummy.rotation.set(0,rnd()*3,0); dummy.scale.set(1.2,0.5,1); },false);
  }
  // 帆船與海鷗
  {
    const boats=[];
    [[20,0.035,'#e2552d'],[20,0.035,'#2f74b5'],[72,-0.02,'#e3b23c'],[72,-0.02,'#f4f1ea'],[72,-0.02,'#3c9a5a']].forEach(([r,sp,c],i)=>{
      const b=new T.Group();
      const hull=M(new T.BoxGeometry(1.6,0.35,0.6),'#7a4a2c',0,0.1,0); b.add(hull);
      const bow=M(new T.ConeGeometry(0.3,0.6,4),'#7a4a2c',1.05,0.1,0); bow.rotation.z=-Math.PI/2; bow.rotation.x=Math.PI/4; bow.scale.set(1,1,1); b.add(bow);
      b.add(cyl(0.03,0.035,1.7,'#5b3d26',0.1,0.25,0,6));
      const sail=new T.Shape(); sail.moveTo(0,0); sail.lineTo(0,1.4); sail.lineTo(-0.9,0); sail.lineTo(0,0);
      const sm=new T.Mesh(new T.ShapeGeometry(sail),new T.MeshStandardMaterial({color:c,side:T.DoubleSide,flatShading:true,roughness:0.9})); sm.position.set(0.05,0.45,0); sm.castShadow=true; b.add(sm);
      bake(b,null,true); b.traverse(o=>{ o.raycast=()=>{}; });
      b.userData={r,sp,a:i*1.3+rnd(),ph:rnd()*6}; scene.add(b); boats.push(b);
    });
    const gulls=[]; const gullMat=mat('#f4f6f8');
    for(let i=0;i<7;i++){
      const g=new T.Group();
      g.add(M(new T.BoxGeometry(0.12,0.08,0.38),gullMat));
      const wl=new T.Group(), wr=new T.Group();
      wl.add(M(new T.BoxGeometry(0.55,0.02,0.16),gullMat,-0.28,0,0)); wr.add(M(new T.BoxGeometry(0.55,0.02,0.16),gullMat,0.28,0,0));
      g.add(wl); g.add(wr); g.traverse(o=>{ o.raycast=()=>{}; o.castShadow=false; });
      const ci=ISLANDS[i%ISLANDS.length]; const c=islands[ci.id].pos;
      g.userData={c:c.clone(),r:5+rnd()*5,y:7+rnd()*4,a:rnd()*TAU0,sp:(0.25+rnd()*0.2)*(rnd()<0.5?1:-1),wl,wr,ph:rnd()*6};
      scene.add(g); gulls.push(g);
    }
    const placeBoats=t=>{
      boats.forEach(b=>{ const u=b.userData; const a=u.a; b.position.set(Math.sin(a)*u.r,-0.18+Math.sin(t*1.4+u.ph)*0.08,Math.cos(a)*u.r); b.rotation.y=a+(u.sp>0?0:Math.PI); b.rotation.z=Math.sin(t*1.1+u.ph)*0.06; b.rotation.x=Math.sin(t*0.9+u.ph)*0.04; });
      gulls.forEach(g=>{ const u=g.userData; g.position.set(u.c.x+Math.sin(u.a)*u.r,u.y+Math.sin(t*0.7+u.ph)*0.4,u.c.z+Math.cos(u.a)*u.r); g.rotation.y=u.a+(u.sp>0?Math.PI/2:-Math.PI/2); const f=Math.sin(t*7+u.ph)*0.5; u.wl.rotation.z=f; u.wr.rotation.z=-f; });
    };
    placeBoats(0);
    decoUpdaters.push((t,dt)=>{ boats.forEach(b=>{ b.userData.a+=b.userData.sp*dt; }); gulls.forEach(g=>{ g.userData.a+=g.userData.sp*dt; }); placeBoats(t); });
  }

  /* --- 節慶裝飾：依節慶建立（萬聖節、聖誕節、農曆新年、端午節、七夕、中秋節）；只在節慶期間建立，可在工具列關閉 --- */
  const festGroup=new T.Group(); festGroup.visible=false; scene.add(festGroup);
  const festAnim=[], FID=window.__fest;
  if(FID) try{
    const dm=new T.Object3D(), spots=[], hubSpots=[];
    const addSpot=(arr,parent,x,y,z,ry,s)=>{ const o=new T.Object3D(); o.position.set(x,y,z); o.rotation.y=ry; o.scale.setScalar(s); parent.add(o); o.updateWorldMatrix(true,false); arr.push(o.matrixWorld.clone()); parent.remove(o); };
    scene.updateMatrixWorld(true);
    ISLANDS.forEach(isl=>{ const I=islands[isl.id]; if(!I) return;
      (I.islets||[]).forEach(s=>{ const t=s.la+0.35, r=2.35; addSpot(spots,s.ig,Math.sin(t)*r,0.55,Math.cos(t)*r,t,0.62); });
      [-0.55,0.55].forEach(d=>{ const t=I.angle+d, r=I.arch?3.0:I.R*0.75; addSpot(spots,I.g,Math.sin(t)*r,0.55,Math.cos(t)*r,t,0.8); });
    });
    for(let k=0;k<6;k++){ const t=k/6*Math.PI*2+0.5, r=HUB_R*0.62; addSpot(hubSpots,scene,Math.sin(t)*r,0.42,Math.cos(t)*r,t,0.75); }
    const ALL=spots.concat(hubSpots), ALLS=ALL;
    const std=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,flatShading:true,roughness:0.75},o||{}));
    const basic=(c,o)=>new T.MeshBasicMaterial(Object.assign({color:c},o||{}));
    // 把同一個造型（多個零件）一次畫在所有位置：每個零件一個 InstancedMesh
    const inst=(parts,list)=>parts.forEach(([g,m,shadow])=>{ const im=new T.InstancedMesh(g,m,list.length); list.forEach((mx,i)=>im.setMatrixAt(i,mx)); im.raycast=()=>{}; im.castShadow=!!shadow; festGroup.add(im); });
    const glow=(c,r,y,op)=>{ const g=new T.SphereGeometry(r,10,8); g.translate(0,y,0); return [g,basic(c,{transparent:true,opacity:op||0.18,depthWrite:false})]; };
    const tr=(g,x,y,z)=>{ g.translate(x,y,z); return g; };
    const tmp=new T.Object3D();
    // 飛行物（蝙蝠、雪花以外）：繞圈飛的通用動畫
    function flyers(n,body,wing,opt){ const bodyI=new T.InstancedMesh(body[0],body[1],n), wingI=wing?new T.InstancedMesh(wing[0],wing[1],n*2):null; bodyI.raycast=()=>{}; festGroup.add(bodyI); if(wingI){ wingI.raycast=()=>{}; festGroup.add(wingI); }
      const L=[]; for(let i=0;i<n;i++) L.push({a:Math.random()*Math.PI*2, r:opt.r0+Math.random()*(opt.r1-opt.r0), y:opt.y0+Math.random()*(opt.y1-opt.y0), sp:(0.12+Math.random()*0.12)*(i%2?1:-1), ph:Math.random()*6});
      festAnim.push((t,dt)=>{ L.forEach((b,i)=>{ b.a+=b.sp*dt; const x=Math.sin(b.a)*b.r, z=Math.cos(b.a)*b.r, y=b.y+Math.sin(t*1.3+b.ph)*0.6, yaw=b.a+(b.sp>0?Math.PI/2:-Math.PI/2), f=Math.sin(t*(opt.flap||14)+b.ph)*0.7;
        dm.position.set(x,y,z); dm.rotation.set(0,yaw,0); dm.scale.setScalar(opt.s); dm.updateMatrix(); bodyI.setMatrixAt(i,dm.matrix);
        if(wingI) [1,-1].forEach((sg,k)=>{ tmp.position.set(x,y,z); tmp.rotation.set(0,yaw,0); tmp.scale.set(opt.s*sg,opt.s,opt.s); tmp.updateMatrix(); tmp.matrix.multiply(new T.Matrix4().makeRotationZ(f*sg)); wingI.setMatrixAt(i*2+k,tmp.matrix); }); });
        bodyI.instanceMatrix.needsUpdate=true; if(wingI) wingI.instanceMatrix.needsUpdate=true; }); }
    // 掛在柱子上的燈籠（新年、中秋共用）
    function lanterns(colors,round){ const ALL=ALLS.map(m=>m.clone().multiply(new T.Matrix4().makeScale(1.4,1.4,1.4))); const pole=tr(new T.CylinderGeometry(0.04,0.05,1.5,6),0,0.75,0), arm=tr(new T.BoxGeometry(0.45,0.04,0.04),0.2,1.48,0);
      const body=round?new T.SphereGeometry(0.26,10,8):new T.SphereGeometry(0.26,10,8); if(!round) body.scale(1,1.25,1); body.translate(0.38,1.12,0);
      const cap1=tr(new T.CylinderGeometry(0.12,0.12,0.06,8),0.38,round?1.38:1.45,0), cap2=tr(new T.CylinderGeometry(0.12,0.12,0.06,8),0.38,round?0.86:0.79,0), tas=tr(new T.CylinderGeometry(0.015,0.015,0.25,4),0.38,0.64,0);
      const gold=std('#e3b23c',{metalness:0.3}); inst([[pole,std('#6b4f36')],[arm,std('#6b4f36')],[cap1,gold],[cap2,gold],[tas,gold]],ALL);
      // 燈籠本體依位置輪流配色
      colors.forEach((c,ci)=>{ const sub=ALL.filter((_,i)=>i%colors.length===ci); if(sub.length) inst([[body,basic(c)],glow(c,0.55,1.12,0.16)].map(x=>x).map((x,k)=>{ if(k===1){ x[0].translate(0.38,0,0); } return x; }),sub); }); }

    if(FID==='halloween'){
      const bodyG=new T.SphereGeometry(0.5,10,7); bodyG.scale(1,0.78,1); bodyG.translate(0,0.38,0);
      const eye=s=>{ const g=new T.ConeGeometry(0.1,0.14,3); g.rotateX(Math.PI/2); g.rotateZ(Math.PI); g.translate(s*0.17,0.46,0.47); return g; };
      const faceM=basic('#ffd35c');
      inst([[bodyG,std('#f07a1a'),1],[tr(new T.CylinderGeometry(0.05,0.08,0.22,6),0,0.86,0),std('#4f6b2a')],[eye(-1),faceM],[eye(1),faceM],[tr(new T.BoxGeometry(0.34,0.07,0.04),0,0.27,0.47),faceM],glow('#ffb347',0.75,0.4)],ALL);
      const ws=new T.Shape(); ws.moveTo(0,0); ws.lineTo(0.9,0.25); ws.lineTo(0.75,-0.05); ws.lineTo(0.55,0.05); ws.lineTo(0.35,-0.1); ws.lineTo(0,0); const wg=new T.ShapeGeometry(ws); wg.rotateX(-Math.PI/2);
      const batM=basic('#1f1a2a',{side:T.DoubleSide}); flyers(16,[new T.SphereGeometry(0.16,6,5),batM],[wg,batM],{r0:14,r1:62,y0:7,y1:14,s:2.4});
      const ghostM=std('#f6f4ff',{transparent:true,opacity:0.88,roughness:0.6}), eyeM=basic('#222');
      [[2.6,1.2],[-2.2,-2.4],[0.6,3.0]].forEach(([x,z],i)=>{ const gh=new T.Group(); gh.position.set(x,1.5,z); gh.scale.setScalar(1.6);
        const hd=new T.Mesh(new T.SphereGeometry(0.42,10,8),ghostM); hd.position.y=0.35; gh.add(hd);
        const cl=new T.Mesh(new T.ConeGeometry(0.46,0.9,10,1,true),ghostM); cl.rotation.x=Math.PI; cl.position.y=-0.05; gh.add(cl);
        [-0.13,0.13].forEach(ex=>{ const e=new T.Mesh(new T.SphereGeometry(0.06,6,5),eyeM); e.position.set(ex,0.42,0.37); gh.add(e); });
        gh.traverse(o=>{ o.raycast=()=>{}; }); festGroup.add(gh);
        festAnim.push(t=>{ gh.position.y=1.9+Math.sin(t*1.4+i*2)*0.3; gh.rotation.y=Math.sin(t*0.5+i)*0.8; }); });
    }
    if(FID==='christmas'){
      const green=std('#2f7d45',{roughness:0.85});
      const cone=(r,h,y)=>tr(new T.ConeGeometry(r,h,8),0,y,0);
      const orn=(x,y,z)=>tr(new T.SphereGeometry(0.07,6,5),x,y,z);
      inst([[tr(new T.CylinderGeometry(0.08,0.1,0.3,6),0,0.15,0),std('#6b4f36')],[cone(0.55,0.7,0.6),green,1],[cone(0.43,0.6,0.95),green],[cone(0.3,0.5,1.27),green],
        [tr(new T.OctahedronGeometry(0.13,0),0,1.6,0),basic('#ffe066')],[orn(0.32,0.55,0.22),basic('#eb5757')],[orn(-0.28,0.85,0.2),basic('#f2c94c')],[orn(0.1,1.1,0.24),basic('#56ccf2')],[orn(-0.2,0.5,-0.3),basic('#bb6bd9')],glow('#fff3c4',0.5,1.6,0.2)],ALL);
      // 錯題島：雪人與禮物
      const snow=std('#fbfdff',{roughness:0.9}); const sm=new T.Group(); sm.position.set(-2.4,0.42,2.2);
      [[0.55,0.45],[0.4,1.2],[0.28,1.75]].forEach(([r,y])=>{ const b=new T.Mesh(new T.SphereGeometry(r,10,8),snow); b.position.y=y; sm.add(b); });
      const hat=new T.Mesh(new T.CylinderGeometry(0.2,0.22,0.3,10),std('#222')); hat.position.y=2.05; sm.add(hat); const brim=new T.Mesh(new T.CylinderGeometry(0.32,0.32,0.04,10),std('#222')); brim.position.y=1.92; sm.add(brim);
      const nose=new T.Mesh(new T.ConeGeometry(0.05,0.25,6),std('#f2994a')); nose.rotation.x=Math.PI/2; nose.position.set(0,1.75,0.32); sm.add(nose);
      const scarf=new T.Mesh(new T.TorusGeometry(0.3,0.06,6,12),std('#d04a35')); scarf.rotation.x=Math.PI/2; scarf.position.y=1.5; sm.add(scarf);
      sm.scale.setScalar(1.3); sm.traverse(o=>{ o.raycast=()=>{}; }); festGroup.add(sm);
      const gifts=[]; [['#d04a35',1.8,-1.4],['#2f7d45',2.4,-0.6],['#e3b23c',1.4,-2.2],['#5f7896',-1,-3.2]].forEach(([c,x,z])=>{ const g=new T.Group(); g.position.set(x,0.42,z);
        const bx=new T.Mesh(new T.BoxGeometry(0.6,0.5,0.6),std(c)); bx.position.y=0.25; g.add(bx); const rb1=new T.Mesh(new T.BoxGeometry(0.62,0.52,0.1),std('#f4efe2')); rb1.position.y=0.25; g.add(rb1); const rb2=new T.Mesh(new T.BoxGeometry(0.1,0.52,0.62),std('#f4efe2')); rb2.position.y=0.25; g.add(rb2);
        g.rotation.y=Math.random()*3; g.scale.setScalar(1.2); g.traverse(o=>{ o.raycast=()=>{}; }); festGroup.add(g); });
      // 雪花：在群島上空緩緩飄落
      const NS=1400, pos=new Float32Array(NS*3); for(let i=0;i<NS;i++){ const r=Math.sqrt(Math.random())*78, a=Math.random()*Math.PI*2; pos[i*3]=Math.sin(a)*r; pos[i*3+1]=Math.random()*28; pos[i*3+2]=Math.cos(a)*r; }
      const sg=new T.BufferGeometry(); sg.setAttribute('position',new T.BufferAttribute(pos,3));
      const snowP=new T.Points(sg,new T.PointsMaterial({color:'#ffffff',size:0.45,map:(()=>{ const cv=document.createElement('canvas'); cv.width=cv.height=32; const x=cv.getContext('2d'); const gr=x.createRadialGradient(16,16,0,16,16,16); gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(0.5,'rgba(255,255,255,0.7)'); gr.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=gr; x.fillRect(0,0,32,32); return new T.CanvasTexture(cv); })(),transparent:true,depthWrite:false,opacity:0.9,sizeAttenuation:true})); snowP.raycast=()=>{}; festGroup.add(snowP);
      festAnim.push((t,dt)=>{ const a=sg.attributes.position.array; for(let i=0;i<NS;i++){ a[i*3+1]-=dt*(1.2+(i%7)*0.15); a[i*3]+=Math.sin(t*0.6+i)*dt*0.3; if(a[i*3+1]<0) a[i*3+1]=28; } sg.attributes.position.needsUpdate=true; });
    }
    if(FID==='cny'){
      lanterns(['#d42b1e','#e8401c'],false);
      // 煙火：黃昏與夜晚每隔幾秒在某座島上空綻放
      let next=3; const isl=Object.values(islands);
      festAnim.push((t,dt)=>{ next-=dt; if(next>0) return; next=4+Math.random()*4; const ph=document.documentElement.dataset.skyPhase; if(ph!=='night'&&ph!=='dusk') return; if(typeof burst==='function') burst(isl[Math.floor(Math.random()*isl.length)].pos,true); });
      // 錯題島：兩支大紅旗
      [[-1.8,-3.4],[1.8,-3.4]].forEach(([x,z])=>{ const g=new T.Group(); g.position.set(x,0.42,z); const pl=new T.Mesh(new T.CylinderGeometry(0.05,0.06,3,6),std('#6b4f36')); pl.position.y=1.5; g.add(pl);
        const fl=new T.Mesh(new T.BoxGeometry(0.9,1.4,0.03),std('#d42b1e')); fl.position.set(0.47,2.2,0); g.add(fl); const fu=new T.Mesh(new T.BoxGeometry(0.45,0.45,0.04),basic('#f2c94c')); fu.position.set(0.47,2.2,0); fu.rotation.z=Math.PI/4; g.add(fu);
        g.traverse(o=>{ o.raycast=()=>{}; }); festGroup.add(g); festAnim.push(t=>{ fl.rotation.y=fu.rotation.y=Math.sin(t*1.5+x)*0.2; }); });
    }
    if(FID==='duanwu'){
      // 粽子：每座島一顆
      const zz=new T.TetrahedronGeometry(0.4,0); zz.rotateX(-Math.atan(Math.SQRT1_2)); zz.rotateZ(Math.PI/4); zz.translate(0,0.3,0);
      inst([[zz,std('#5e8f3a'),1],[tr(new T.TorusGeometry(0.22,0.025,4,12).rotateX(Math.PI/2),0,0.28,0),std('#c9a46a')],[tr(new T.CylinderGeometry(0.01,0.01,0.5,4),0,0.65,0),std('#c9a46a')]],ALL);
      // 龍舟：在中央海域繞圈競渡
      const NB=6, hullG=new T.BoxGeometry(5,0.32,0.75), headG=new T.ConeGeometry(0.28,0.8,6); headG.rotateZ(-Math.PI/2); headG.translate(2.85,0.45,0);
      const tailG=new T.ConeGeometry(0.2,0.6,5); tailG.rotateZ(Math.PI/2+0.6); tailG.translate(-2.7,0.45,0);
      const rowG=new T.BoxGeometry(0.22,0.4,0.22); const rowers=[]; for(let k=0;k<6;k++) rowers.push(tr(rowG.clone(),-1.9+k*0.75,0.38,0));
      const drumG=tr(new T.CylinderGeometry(0.22,0.22,0.3,10),2.0,0.4,0);
      const cols=['#d04a35','#2f7d45','#e3b23c'];
      const parts=[]; cols.forEach((c,ci)=>{ const hm=new T.InstancedMesh(hullG,std(c),NB/3), hd=new T.InstancedMesh(headG,std(c),NB/3), tl=new T.InstancedMesh(tailG,std(c),NB/3); [hm,hd,tl].forEach(x=>{ x.raycast=()=>{}; festGroup.add(x); }); parts.push([hm,hd,tl]); });
      const rowI=rowers.map(g=>{ const m=new T.InstancedMesh(g,std('#f4efe2'),NB); m.raycast=()=>{}; festGroup.add(m); return m; }), drumI=new T.InstancedMesh(drumG,std('#8b2a1e'),NB); drumI.raycast=()=>{}; festGroup.add(drumI);
      const B=[]; for(let i=0;i<NB;i++) B.push({a:i/NB*Math.PI*2, r:21+(i%3)*3.2, sp:0.07+(i%3)*0.01});
      festAnim.push((t,dt)=>{ B.forEach((b,i)=>{ b.a+=b.sp*dt; const x=Math.sin(b.a)*b.r, z=Math.cos(b.a)*b.r; dm.position.set(x,-0.05+Math.sin(t*3+i)*0.04,z); dm.rotation.set(0,b.a+Math.PI,0); dm.scale.setScalar(1); dm.updateMatrix();
        const [hm,hd,tl]=parts[i%3], j=Math.floor(i/3); hm.setMatrixAt(j,dm.matrix); hd.setMatrixAt(j,dm.matrix); tl.setMatrixAt(j,dm.matrix);
        rowI.forEach((m,k)=>{ tmp.position.copy(dm.position); tmp.rotation.copy(dm.rotation); tmp.updateMatrix(); tmp.matrix.multiply(new T.Matrix4().makeTranslation(0,Math.max(0,Math.sin(t*6+k))*0.08,0)); m.setMatrixAt(i,tmp.matrix); }); drumI.setMatrixAt(i,dm.matrix); });
        parts.forEach(p=>p.forEach(x=>x.instanceMatrix.needsUpdate=true)); rowI.forEach(m=>m.instanceMatrix.needsUpdate=true); drumI.instanceMatrix.needsUpdate=true; });
    }
    if(FID==='qixi'){
      // 漂浮的愛心：每座島一顆，緩緩上下
      const hs=new T.Shape(); hs.moveTo(0,0.25); hs.bezierCurveTo(0,0.5,-0.45,0.5,-0.45,0.2); hs.bezierCurveTo(-0.45,-0.05,0,-0.2,0,-0.4); hs.bezierCurveTo(0,-0.2,0.45,-0.05,0.45,0.2); hs.bezierCurveTo(0.45,0.5,0,0.5,0,0.25);
      const hg=new T.ExtrudeGeometry(hs,{depth:0.14,bevelEnabled:true,bevelSize:0.04,bevelThickness:0.04,bevelSegments:1,curveSegments:6}); hg.translate(0,0,-0.07);
      const heartM=std('#ff6b9a',{emissive:'#ff3d7f',emissiveIntensity:0.35,roughness:0.5});
      const hI=new T.InstancedMesh(hg,heartM,ALL.length), gI=new T.InstancedMesh(...glow('#ff9ec0',0.6,0,0.15),ALL.length); hI.raycast=gI.raycast=()=>{}; festGroup.add(hI); festGroup.add(gI);
      const base=ALL.map(m=>{ const p=new T.Vector3(), q=new T.Quaternion(), sc=new T.Vector3(); m.decompose(p,q,sc); return {p,sc:sc.x}; });
      festAnim.push(t=>{ base.forEach((b,i)=>{ dm.position.set(b.p.x,b.p.y+1.2+Math.sin(t*1.6+i)*0.18,b.p.z); dm.rotation.set(0,t*0.8+i,0); dm.scale.setScalar(b.sc); dm.updateMatrix(); hI.setMatrixAt(i,dm.matrix); gI.setMatrixAt(i,dm.matrix); }); hI.instanceMatrix.needsUpdate=true; gI.instanceMatrix.needsUpdate=true; });
      // 錯題島：不斷升起的小愛心
      const NR=18, rI=new T.InstancedMesh(hg,heartM,NR); rI.raycast=()=>{}; festGroup.add(rI); const R=[]; for(let i=0;i<NR;i++) R.push({x:(Math.random()*2-1)*4,z:(Math.random()*2-1)*4,t:Math.random()*6});
      festAnim.push((t,dt)=>{ R.forEach((h,i)=>{ h.t+=dt; if(h.t>6){ h.t=0; h.x=(Math.random()*2-1)*4; h.z=(Math.random()*2-1)*4; } const k=h.t/6; dm.position.set(h.x+Math.sin(h.t*2+i)*0.3,1+k*9,h.z); dm.rotation.set(0,h.t,0); dm.scale.setScalar(0.5*(k<0.1?k/0.1:k>0.85?(1-k)/0.15:1)+0.001); dm.updateMatrix(); rI.setMatrixAt(i,dm.matrix); }); rI.instanceMatrix.needsUpdate=true; });
      // 天上的牛郎星與織女星
      [[-140,170,-260,'#bcd4ff'],[60,190,-280,'#ffe2f0']].forEach(([x,y,z,c])=>{ const st=new T.Mesh(new T.SphereGeometry(2.6,12,10),basic(c,{fog:false})); st.position.set(x,y,z); festGroup.add(st); const hl=new T.Mesh(new T.SphereGeometry(6,12,10),basic(c,{fog:false,transparent:true,opacity:0.25,depthWrite:false})); hl.position.copy(st.position); festGroup.add(hl); festAnim.push(t=>{ hl.scale.setScalar(1+0.15*Math.sin(t*2+x)); }); });
    }
    if(FID==='midautumn'){
      lanterns(['#f2a93b','#f7d36b','#f4efe2'],true);
      // 錯題島：玉兔與月餅
      const fur=std('#fbfbf8',{roughness:0.9}); const rb=new T.Group(); rb.position.set(-2.2,0.42,2.4);
      const bd=new T.Mesh(new T.SphereGeometry(0.45,10,8),fur); bd.scale.set(1,0.85,1.2); bd.position.y=0.4; rb.add(bd);
      const hd=new T.Mesh(new T.SphereGeometry(0.3,10,8),fur); hd.position.set(0,0.85,0.35); rb.add(hd);
      [-0.1,0.1].forEach(x=>{ const ear=new T.Mesh(new T.CylinderGeometry(0.05,0.07,0.5,6),fur); ear.position.set(x,1.3,0.3); ear.rotation.z=x*1.5; rb.add(ear); const e=new T.Mesh(new T.SphereGeometry(0.04,6,5),basic('#d04a35')); e.position.set(x*1.3,0.9,0.62); rb.add(e); });
      rb.scale.setScalar(1.4); rb.traverse(o=>{ o.raycast=()=>{}; }); festGroup.add(rb); festAnim.push(t=>{ rb.position.y=0.42+Math.max(0,Math.sin(t*2.2))*0.25; });
      [[1.8,-1.8],[2.5,-1.0],[1.2,-2.6]].forEach(([x,z])=>{ const mc=new T.Mesh(new T.CylinderGeometry(0.35,0.38,0.22,12),std('#c98a3c')); mc.position.set(x,0.53,z); festGroup.add(mc); const tp=new T.Mesh(new T.CylinderGeometry(0.2,0.2,0.02,10),std('#e0a65a')); tp.position.set(x,0.65,z); festGroup.add(tp); });
    }
    // 倒數看板（跨年、會考）：浮在錯題島上空、永遠面向鏡頭，每 30 秒更新文字
    function festBoard(bg,fg){ const cv=document.createElement('canvas'); cv.width=512; cv.height=200; const x=cv.getContext('2d'); const tex=new T.CanvasTexture(cv);
      const draw=()=>{ const txt=(typeof window.__festText==='function'?window.__festText():null)||['','']; x.clearRect(0,0,512,200); x.fillStyle=bg; x.strokeStyle='rgba(255,255,255,0.85)'; x.lineWidth=8; const r=36;
        x.beginPath(); x.moveTo(r,6); x.arcTo(506,6,506,194,r); x.arcTo(506,194,6,194,r); x.arcTo(6,194,6,6,r); x.arcTo(6,6,506,6,r); x.closePath(); x.fill(); x.stroke();
        x.fillStyle=fg; x.textAlign='center'; x.textBaseline='middle'; x.font='bold 40px "Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif'; x.fillText(txt[0],256,62); x.font='bold 64px "Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif'; x.fillText(txt[1],256,138); tex.needsUpdate=true; };
      draw(); setInterval(draw,30000);
      const sp=new T.Sprite(new T.SpriteMaterial({map:tex,transparent:true,depthWrite:false,fog:false})); sp.scale.set(12,4.7,1); sp.position.set(0,17,0); sp.renderOrder=6; festGroup.add(sp);
      festAnim.push(t=>{ sp.position.y=17+Math.sin(t*1.2)*0.3; }); return draw; }
    // 文字旗（會考加油旗）：同一張貼圖一次畫在所有位置
    function textFlags(text,bg,fg){ const cv=document.createElement('canvas'); cv.width=128; cv.height=96; const x=cv.getContext('2d'); x.fillStyle=bg; x.fillRect(0,0,128,96); x.fillStyle=fg; x.textAlign='center'; x.textBaseline='middle'; x.font='bold 44px "Noto Sans TC","PingFang TC",sans-serif'; x.fillText(text,64,50);
      const tex=new T.CanvasTexture(cv); const flagG=new T.PlaneGeometry(0.7,0.52); flagG.translate(0.37,1.25,0);
      inst([[tr(new T.CylinderGeometry(0.035,0.04,1.55,6),0,0.78,0),std('#6b4f36')],[flagG,new T.MeshBasicMaterial({map:tex,side:T.DoubleSide})],[tr(new T.SphereGeometry(0.06,6,5),0,1.58,0),std('#e3b23c')]],ALL); }
    if(FID==='newyear'){
      festBoard('#1b2a50','#ffe08a');
      // 金銀氣球
      const bal=(x,y,z)=>tr(new T.SphereGeometry(0.2,10,8).scale(1,1.2,1),x,y,z), str=(x,z)=>tr(new T.CylinderGeometry(0.008,0.008,1.0,3),x,0.95,z);
      inst([[bal(-0.15,1.55,0),std('#e3b23c',{metalness:0.5,roughness:0.3})],[bal(0.18,1.7,0.05),std('#d8dde6',{metalness:0.6,roughness:0.25})],[bal(0.02,1.85,-0.15),std('#d04a35',{roughness:0.4})],[str(-0.15,0),std('#ddd')],[str(0.1,0.03),std('#ddd')]],ALL);
      // 煙火：越接近跨年越密集；午夜跨過新年時來一場連發
      let next=2, last=null; const isl=Object.values(islands);
      festAnim.push((t,dt)=>{ next-=dt; const ph=document.documentElement.dataset.skyPhase, txt=(window.__festText&&window.__festText()[1])||'';
        if(last!==null && last.indexOf('快樂')<0 && txt.indexOf('快樂')>=0 && typeof burst==='function'){ for(let k=0;k<24;k++) setTimeout(()=>burst(isl[k%isl.length].pos,true),k*220); } last=txt;
        if(next>0) return; next=(ph==='night'||ph==='dusk')?2+Math.random()*2.5:6+Math.random()*4; if(typeof burst==='function') burst(isl[Math.floor(Math.random()*isl.length)].pos,true); });
    }
    if(FID==='exam'){
      festBoard('#8b1e1e','#fff3c4');
      textFlags('加油','#d42b1e','#ffe08a');
      // 錯題島：大鉛筆與「包中」粽子
      const pc=new T.Group(); pc.position.set(2.4,0.42,1.6); pc.rotation.z=-0.35;
      const bodyP=new T.Mesh(new T.CylinderGeometry(0.28,0.28,2.6,6),std('#f2c94c')); bodyP.position.y=1.5; pc.add(bodyP);
      const tipW=new T.Mesh(new T.ConeGeometry(0.28,0.55,6),std('#f1d6a8')); tipW.position.y=3.08; pc.add(tipW);
      const lead=new T.Mesh(new T.ConeGeometry(0.09,0.18,6),std('#333')); lead.position.y=3.3; pc.add(lead);
      const band=new T.Mesh(new T.CylinderGeometry(0.29,0.29,0.18,6),std('#c0c4cc',{metalness:0.5})); band.position.y=0.25; pc.add(band);
      const eras=new T.Mesh(new T.CylinderGeometry(0.28,0.28,0.25,6),std('#f28b9a')); eras.position.y=0.05; pc.add(eras);
      pc.traverse(o=>{ o.raycast=()=>{}; }); festGroup.add(pc);
      const zz=new T.TetrahedronGeometry(0.4,0); zz.rotateX(-Math.atan(Math.SQRT1_2)); zz.rotateZ(Math.PI/4); zz.translate(0,0.3,0);
      [[-2.3,1.8],[-1.7,2.5],[-2.8,2.6]].forEach(([x,z])=>{ const m=new T.Mesh(zz,std('#5e8f3a')); m.position.set(x,0.42,z); m.rotation.y=x*2; m.raycast=()=>{}; festGroup.add(m); });
    }
    decoUpdaters.push((t,dt)=>{ if(festGroup.visible && !reduceMotion) festAnim.forEach(f=>f(t,dt||0.016)); });
  }catch(err){ console.warn('節慶裝飾載入失敗',err); scene.remove(festGroup); }
