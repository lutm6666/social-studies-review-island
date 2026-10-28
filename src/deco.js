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

  /* --- 節慶裝飾：目前有萬聖節（南瓜燈、蝙蝠、小幽靈）；只在節慶期間建立，可在工具列關閉 --- */
  const festGroup=new T.Group(); festGroup.visible=false; scene.add(festGroup);
  const festAnim=[];
  if(window.__fest==='halloween'){
    const dm=new T.Object3D(), spots=[];
    const addSpot=(parent,x,y,z,ry,s)=>{ const o=new T.Object3D(); o.position.set(x,y,z); o.rotation.y=ry; o.scale.setScalar(s); parent.add(o); o.updateWorldMatrix(true,false); spots.push(o.matrixWorld.clone()); parent.remove(o); };
    scene.updateMatrixWorld(true);
    ISLANDS.forEach(isl=>{ const I=islands[isl.id]; if(!I) return;
      // 章節小島：朝外側的岸邊放一顆南瓜燈
      (I.islets||[]).forEach(s=>{ const t=s.la+0.35, r=2.35; addSpot(s.ig,Math.sin(t)*r,0.55,Math.cos(t)*r,t,0.62); });
      // 主島：面向外側放兩顆
      [-0.55,0.55].forEach(d=>{ const t=I.angle+d, r=I.arch?3.0:I.R*0.75; addSpot(I.g,Math.sin(t)*r,0.55,Math.cos(t)*r,t,0.8); });
    });
    // 中央錯題島：一圈南瓜燈
    for(let k=0;k<6;k++){ const t=k/6*Math.PI*2+0.5, r=HUB_R*0.62; addSpot(scene,Math.sin(t)*r,0.42,Math.cos(t)*r,t,0.75); }
    const N=spots.length;
    const orange=new T.MeshStandardMaterial({color:'#f07a1a',flatShading:true,roughness:0.75});
    const stemM=new T.MeshStandardMaterial({color:'#4f6b2a',flatShading:true});
    const faceM=new T.MeshBasicMaterial({color:'#ffd35c'});
    const glowM=new T.MeshBasicMaterial({color:'#ffb347',transparent:true,opacity:0.18,depthWrite:false});
    const bodyG=new T.SphereGeometry(0.5,10,7); bodyG.scale(1,0.78,1); bodyG.translate(0,0.38,0);
    const stemG=new T.CylinderGeometry(0.05,0.08,0.22,6); stemG.translate(0,0.86,0);
    const eye=s=>{ const g=new T.ConeGeometry(0.1,0.14,3); g.rotateX(Math.PI/2); g.rotateZ(Math.PI); g.translate(s*0.17,0.46,0.47); return g; };
    const mouthG=new T.BoxGeometry(0.34,0.07,0.04); mouthG.translate(0,0.27,0.47);
    const glowG=new T.SphereGeometry(0.75,10,8); glowG.translate(0,0.4,0);
    [[bodyG,orange],[stemG,stemM],[eye(-1),faceM],[eye(1),faceM],[mouthG,faceM],[glowG,glowM]].forEach(([g,m])=>{ const im=new T.InstancedMesh(g,m,N); spots.forEach((mx,i)=>im.setMatrixAt(i,mx)); im.raycast=()=>{}; im.castShadow=m===orange; festGroup.add(im); });
    // 蝙蝠：繞著群島飛
    const bats=[], NB=16, batM=new T.MeshBasicMaterial({color:'#1f1a2a',side:T.DoubleSide});
    const wingShape=new T.Shape(); wingShape.moveTo(0,0); wingShape.lineTo(0.9,0.25); wingShape.lineTo(0.75,-0.05); wingShape.lineTo(0.55,0.05); wingShape.lineTo(0.35,-0.1); wingShape.lineTo(0,0);
    const wingG=new T.ShapeGeometry(wingShape); wingG.rotateX(-Math.PI/2);
    const bodyB=new T.InstancedMesh(new T.SphereGeometry(0.16,6,5),batM,NB), wings=new T.InstancedMesh(wingG,batM,NB*2);
    bodyB.raycast=wings.raycast=()=>{}; festGroup.add(bodyB); festGroup.add(wings);
    for(let i=0;i<NB;i++) bats.push({a:Math.random()*Math.PI*2, r:14+Math.random()*48, y:7+Math.random()*7, sp:(0.12+Math.random()*0.12)*(i%2?1:-1), ph:Math.random()*6});
    const tmp=new T.Object3D();
    festAnim.push((t,dt)=>{ bats.forEach((b,i)=>{ b.a+=b.sp*dt; const x=Math.sin(b.a)*b.r, z=Math.cos(b.a)*b.r, y=b.y+Math.sin(t*1.3+b.ph)*0.6, yaw=b.a+(b.sp>0?Math.PI/2:-Math.PI/2), f=Math.sin(t*14+b.ph)*0.7;
      dm.position.set(x,y,z); dm.rotation.set(0,yaw,0); dm.scale.setScalar(2.4); dm.updateMatrix(); bodyB.setMatrixAt(i,dm.matrix);
      [1,-1].forEach((s,k)=>{ tmp.position.set(x,y,z); tmp.rotation.set(0,yaw,0); tmp.scale.set(2.4*s,2.4,2.4); tmp.updateMatrix(); const w=new T.Matrix4().makeRotationZ(f*s); tmp.matrix.multiply(w); wings.setMatrixAt(i*2+k,tmp.matrix); }); });
      bodyB.instanceMatrix.needsUpdate=true; wings.instanceMatrix.needsUpdate=true; });
    // 小幽靈：在錯題島上飄
    const ghostM=new T.MeshStandardMaterial({color:'#f6f4ff',transparent:true,opacity:0.88,roughness:0.6,flatShading:true});
    const eyeM=new T.MeshBasicMaterial({color:'#222'});
    [[2.6,1.2],[-2.2,-2.4],[0.6,3.0]].forEach(([x,z],i)=>{ const gh=new T.Group(); gh.position.set(x,1.5,z); gh.scale.setScalar(1.6);
      const hd=new T.Mesh(new T.SphereGeometry(0.42,10,8),ghostM); hd.position.y=0.35; gh.add(hd);
      const cl=new T.Mesh(new T.ConeGeometry(0.46,0.9,10,1,true),ghostM); cl.rotation.x=Math.PI; cl.position.y=-0.05; gh.add(cl);
      [-0.13,0.13].forEach(ex=>{ const e=new T.Mesh(new T.SphereGeometry(0.06,6,5),eyeM); e.position.set(ex,0.42,0.37); gh.add(e); });
      gh.traverse(o=>{ o.raycast=()=>{}; }); festGroup.add(gh);
      festAnim.push(t=>{ gh.position.y=1.9+Math.sin(t*1.4+i*2)*0.3; gh.rotation.y=Math.sin(t*0.5+i)*0.8; }); });
    decoUpdaters.push((t,dt)=>{ if(festGroup.visible && !reduceMotion) festAnim.forEach(f=>f(t,dt||0.016)); });
  }
