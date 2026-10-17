
(function(){
/* ============ CONTENT (edit here) ============ */
var VERTICALS=[
  {id:'tech',name:'Technical',short:'TECHNICAL',tag:'Engine room',line:'Builds the stack.',
   does:['Designs and ships the club’s automations, web tools and internal systems.','Teaches the AI Automation Bootcamp and runs member workshops.','Reviews code and mentors members from a first script to a shipped project.'],
   withV:'Every vertical',leadRole:'Technical Lead'},
  {id:'free',name:'Freelancing Coordinator',short:'FREELANCING',tag:'Paid work',line:'Turns skills into paid work.',
   does:['Sources real client briefs and matches them to members.','Sets scoping, pricing and delivery standards for member projects.','Builds each member’s portfolio of delivered work.'],
   withV:'Technical, Marketing & Outreach',leadRole:'Freelancing Coordinator'},
  {id:'start',name:'Startup & Investment',short:'STARTUP',tag:'Idea to pitch',line:'Takes an idea to a pitch.',
   does:['Pressure-tests member ideas and shapes them into pitches.','Prepares teams to face incubators, mentors and investors.','Keeps the link to ecosystem bodies such as T-Hub Hyderabad.'],
   withV:'Technical, Marketing & Outreach',leadRole:'Startup & Investment Lead'},
  {id:'mkt',name:'Marketing & Outreach',short:'MARKETING',tag:'Story and reach',line:'Carries the story outward.',
   does:['Runs the club’s brand, social channels and campaigns.','Opens doors with campus bodies, companies and communities.','Leads onboarding when a new campus chapter opens.'],
   withV:'Event Coordination, Production',leadRole:'Marketing & Outreach Lead'},
  {id:'prod',name:'Production',short:'PRODUCTION',tag:'Capture and broadcast',line:'Captures it and puts it on air.',
   does:['Shoots and edits video and photography for the club and GWD Sports.','Operates live streams in OBS: scenes, overlays and feeds.','Crews on-ground productions, including matchdays.'],
   withV:'Event Coordination, Marketing & Outreach',leadRole:'Production Lead'},
  {id:'event',name:'Event Coordination',short:'EVENTS',tag:'On the day',line:'Makes it happen on the day.',
   does:['Plans and runs hackathons, bootcamps and campus sessions.','Owns schedules, logistics, volunteers and venue coordination.','Builds the workflow sheets interns follow on matchdays.'],
   withV:'Production, Technical',leadRole:'Event Coordinator'}
];
var STEPS=[
  {tool:'Apify',verb:'Collect',short:'APIFY',text:'Apify actors scrape and structure data from public web sources, so every workflow starts from real inputs instead of a hand-typed sheet.'},
  {tool:'n8n',verb:'Orchestrate',short:'N8N',text:'n8n is the workflow canvas. Triggers, branches, retries and error paths tie every other tool into one running pipeline.'},
  {tool:'OpenAI',verb:'Reason',short:'OPENAI',text:'OpenAI models classify, summarise, extract and draft. Members learn prompt design, structured outputs and where a model should not be trusted.'},
  {tool:'Google APIs',verb:'Deliver',short:'GOOGLE',text:'Google APIs write rows to Sheets, send mail through Gmail, book Calendar slots and file results in Drive.'}
];
/* Fill in names, photos (image URL or data URI) and bios when ready. Leave name as null to show "To be announced". */
var TEAM={
  president:{name:'Mohammed Abdul Mudabbir',role:'President',initials:'MM',photo:null,
    desc:'Heads the club, sets its direction and owns the relationship with the parent firm and ecosystem bodies.'},
  vp:{name:'Mohd Abdul Rahman Pasha',role:'Vice President',initials:'MP',photo:null,
    desc:'Runs day-to-day operations across the six verticals and supports the President.'},
  leads:{tech:{name:null,photo:null},free:{name:null,photo:null},start:{name:null,photo:null},mkt:{name:null,photo:null},prod:{name:null,photo:null},event:{name:null,photo:null}}
};
var SECS=[['top','Arrival'],['identity','Identity'],['verticals','Verticals'],['bootcamp','Bootcamp'],['matchday','Matchday'],['roadmap','Roadmap'],['team','Team'],['join','Join']];

/* ============ SHARED STATE ============ */
var state={vertical:0,pipe:0};
function $(s,r){return (r||document).querySelector(s);}
function emit(){window.dispatchEvent(new Event('gwd-state'));}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}

/* ============ DOM BINDINGS (ASTRO SSR READY) ============ */
var vList = $('#v-list'), vDetail = $('#v-detail');
var vButtons = vList ? Array.from(vList.children) : [];
vButtons.forEach(function(b, i) {
  b.addEventListener('click', function(){ selectV(i); });
  b.addEventListener('mouseenter', function(){ selectV(i); });
  b.addEventListener('focus', function(){ selectV(i); });
});
function selectV(i) {
  state.vertical = i;
  vButtons.forEach(function(b, j){ b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
  var v = VERTICALS[i];
  if (vDetail && v) {
    vDetail.innerHTML = '<h3>' + esc(v.name) + '</h3><p class="v-line">' + esc(v.line) + '</p><ul>' + v.does.map(function(d){ return '<li>' + esc(d) + '</li>'; }).join('') + '</ul><p class="v-with">Works closely with: <b>' + esc(v.withV) + '</b></p>';
  }
  emit();
}

var stepsEl = $('#steps'), pDetail = $('#p-detail');
var stepButtons = stepsEl ? Array.from(stepsEl.children) : [];
stepButtons.forEach(function(b, i) {
  b.addEventListener('click', function(){ selectP(i); });
  b.addEventListener('mouseenter', function(){ selectP(i); });
  b.addEventListener('focus', function(){ selectP(i); });
});
function selectP(i) {
  state.pipe = i;
  stepButtons.forEach(function(b, j){ b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
  var s = STEPS[i];
  if (pDetail && s) {
    pDetail.innerHTML = '<h3>' + esc(s.verb) + ' with ' + esc(s.tool) + '</h3><p>' + esc(s.text) + '</p>';
  }
  emit();
}

var rail = $('#rail');
var railLinks = rail ? rail.querySelectorAll('a') : [];
var depthEl = $('#depth');
function docProgress() {
  var m = document.documentElement.scrollHeight - window.innerHeight;
  return m > 0 ? Math.min(1, Math.max(0, window.scrollY / m)) : 0;
}
var railTick = false;
function updateRail() {
  railTick = false;
  var cur = 0;
  SECS.forEach(function(s, i) {
    var el = document.getElementById(s[0]);
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = i;
  });
  railLinks.forEach(function(a, i) {
    if (i === cur) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  if (depthEl) depthEl.textContent = Math.round(docProgress() * 100) + '%';
}
window.addEventListener('scroll', function() {
  if (!railTick) { railTick = true; requestAnimationFrame(updateRail); }
}, { passive: true });
window.addEventListener('resize', updateRail);
updateRail();

document.addEventListener('pointermove', function(e) {
  var p = e.target.closest && e.target.closest('.panel');
  if (!p) return;
  var r = p.getBoundingClientRect();
  p.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  p.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, { passive: true });

/* ============ 3D ============ */
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var canvas=document.getElementById('gl');
var renderer=null;
try{
  if(!window.THREE)throw new Error('three');
  renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,powerPreference:'high-performance'});
}catch(e){document.documentElement.classList.add('no-gl');return;}

var narrow=window.innerWidth<700;
var PR=Math.min(window.devicePixelRatio||1,narrow?1.25:1.5);
renderer.setPixelRatio(PR);
var BG=0x080507;
renderer.setClearColor(BG,1);
var FOV=50;
var scene=new THREE.Scene();
scene.background=new THREE.Color(BG);
scene.fog=new THREE.Fog(BG,26,118);
var camera=new THREE.PerspectiveCamera(FOV,1,0.1,400);

/* ---- reflections: a dark studio with a few softboxes, baked to an environment map ---- */
(function(){
  try{
    var pm=new THREE.PMREMGenerator(renderer);
    var es=new THREE.Scene();es.background=new THREE.Color(0x040203);
    function box(w,h,col,k,pos){
      var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(col).multiplyScalar(k),side:THREE.DoubleSide}));
      m.position.set(pos[0],pos[1],pos[2]);m.lookAt(0,0,0);es.add(m);
    }
    box(14,3,0xff2a35,4,[0,7,2]);
    box(4,10,0xff5a60,3,[-8,0,3]);
    box(3,12,0x8fb4ff,2.4,[9,1,-2]);
    box(16,2,0xffffff,2.2,[0,-6,5]);
    box(6,6,0xffe3e5,1.6,[0,2,-9]);
    scene.environment=pm.fromScene(es,.035).texture;
    pm.dispose();
  }catch(e){}
})();

/* ---- materials ---- */
var mat={
  metalRed:new THREE.MeshStandardMaterial({color:0x9a0a12,metalness:.88,roughness:.26,envMapIntensity:1.25}),
  letters:new THREE.MeshStandardMaterial({color:0xb20c15,metalness:.82,roughness:.22,emissive:0x3a0006,emissiveIntensity:.8,envMapIntensity:1.4}),
  chrome:new THREE.MeshStandardMaterial({color:0xdfe4ea,metalness:1,roughness:.1,envMapIntensity:1.4}),
  darkMetal:new THREE.MeshStandardMaterial({color:0x1b1013,metalness:.8,roughness:.38,envMapIntensity:1}),
  glass:new THREE.MeshStandardMaterial({color:0xa9c3da,metalness:.3,roughness:.06,transparent:true,opacity:.14,depthWrite:false,envMapIntensity:1.6}),
  shell:new THREE.MeshStandardMaterial({color:0x9fb8d0,metalness:.4,roughness:.12,transparent:true,opacity:.1,flatShading:true,depthWrite:false,envMapIntensity:1.8}),
  glowRed:new THREE.MeshBasicMaterial({color:0xff3b43}),
  glowWhite:new THREE.MeshBasicMaterial({color:0xfff1f2}),
  lineGlow:new THREE.LineBasicMaterial({color:0xff3b43}),
  lineSoft:new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.28}),
  lineSteel:new THREE.LineBasicMaterial({color:0x9db6cc,transparent:true,opacity:.55}),
  dash:new THREE.LineDashedMaterial({color:0x9db6cc,dashSize:.1,gapSize:.09,transparent:true,opacity:.8})
};

/* ---- textures ---- */
function radialTex(){
  var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d');
  var g=x.createRadialGradient(64,64,0,64,64,64);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,255,255,.45)');g.addColorStop(.6,'rgba(255,255,255,.1)');g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g;x.fillRect(0,0,128,128);
  return new THREE.CanvasTexture(c);
}
var TEX_GLOW=radialTex();
function halo(color,scale,op){
  var s=new THREE.Sprite(new THREE.SpriteMaterial({map:TEX_GLOW,color:color,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));
  s.scale.set(scale,scale,1);return s;
}
var labels=[];
function makeLabel(text,w){
  var c=document.createElement('canvas');c.width=512;c.height=96;
  var tex=new THREE.CanvasTexture(c);
  var m=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,fog:false,opacity:.8});
  var s=new THREE.Sprite(m);var k=w||1.9;s.scale.set(k,k*96/512,1);
  var L={c:c,tex:tex,text:text};labels.push(L);drawLabel(L);return s;
}
function drawLabel(L){
  var x=L.c.getContext('2d');x.clearRect(0,0,L.c.width,L.c.height);
  x.font='600 46px "IBM Plex Mono", ui-monospace, monospace';x.textAlign='center';x.textBaseline='middle';
  x.shadowColor='rgba(255,59,67,.7)';x.shadowBlur=14;
  x.fillStyle='#F4EDEE';x.fillText(L.text,L.c.width/2,L.c.height/2);L.tex.needsUpdate=true;
}

/* ---- geometry helpers ---- */
var lCache={};
function lGeom(len,th,depth){
  var k=len+'|'+th+'|'+depth;if(lCache[k])return lCache[k];
  var s=new THREE.Shape();
  s.moveTo(0,0);s.lineTo(len,0);s.lineTo(len,th);s.lineTo(th,th);s.lineTo(th,len);s.lineTo(0,len);s.lineTo(0,0);
  var g=new THREE.ExtrudeGeometry(s,{depth:depth,bevelEnabled:true,bevelThickness:th*.14,bevelSize:th*.14,bevelSegments:2});
  g.translate(0,0,-depth/2);lCache[k]=g;return g;
}
function corner(len,th,m,glow){
  var g=new THREE.Group();
  g.add(new THREE.Mesh(lGeom(len,th,th*1.2),m));
  if(glow){
    var gs=new THREE.Mesh(lGeom(len-th*.8,th*.2,th*.06),glow);
    gs.position.set(th*.4,th*.4,th*.6+th*.14);g.add(gs);
  }
  return g;
}
/* the two corners of the GWD mark: top-right and bottom-left */
function bracketPair(w,h,len,th,m,glow){
  var g=new THREE.Group();
  var tr=corner(len,th,m,glow);tr.position.set(w,h,0);tr.rotation.z=Math.PI;
  var bl=corner(len,th,m,glow);bl.position.set(-w,-h,0);
  g.add(tr,bl);return g;
}
function circlePts(r,n,plane){
  var p=[];for(var i=0;i<=n;i++){var a=i/n*Math.PI*2;p.push(new THREE.Vector3(Math.cos(a)*r,plane==='xz'?0:Math.sin(a)*r,plane==='xz'?Math.sin(a)*r:0));}return p;
}
function lineFrom(pts,m){return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),m);}
function segs(pairs,m){var pts=[];pairs.forEach(function(p){pts.push(p[0],p[1]);});return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts),m);}
function dashedLine(a,b){var l=lineFrom([a,b],mat.dash);l.computeLineDistances();return l;}
function dotRing(r,n,size,color,op){
  var pos=new Float32Array(n*3);
  for(var i=0;i<n;i++){var a=i/n*Math.PI*2;pos[i*3]=Math.cos(a)*r;pos[i*3+1]=Math.sin(a)*r;pos[i*3+2]=(Math.random()-.5)*.1;}
  var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  return new THREE.Points(g,new THREE.PointsMaterial({map:TEX_GLOW,color:color,size:size,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false}));
}

/* ---- extruded GWD letters ---- */
function shapeG(){
  var s=new THREE.Shape(),a0=.62,a1=Math.PI*2;
  s.absarc(.5,.5,.5,a0,a1,false);
  s.lineTo(.8,.5);
  s.absarc(.5,.5,.3,a1,a0,true);
  s.closePath();return s;
}
function shapeW(){
  var s=new THREE.Shape(),p=[[0,1],[.2,1],[.3,.36],[.5,.82],[.7,.36],[.8,1],[1,1],[.78,0],[.6,0],[.5,.4],[.4,0],[.22,0]];
  s.moveTo(p[0][0],p[0][1]);for(var i=1;i<p.length;i++)s.lineTo(p[i][0],p[i][1]);s.closePath();return s;
}
function shapeD(){
  var s=new THREE.Shape();
  s.moveTo(0,0);s.lineTo(0,1);s.lineTo(.42,1);s.absarc(.42,.5,.5,Math.PI/2,-Math.PI/2,true);s.lineTo(0,0);
  var h=new THREE.Path();
  h.moveTo(.24,.2);h.lineTo(.42,.2);h.absarc(.42,.5,.3,-Math.PI/2,Math.PI/2,false);h.lineTo(.24,.8);h.lineTo(.24,.2);
  s.holes.push(h);return s;
}
function buildLetters(scale){
  var grp=new THREE.Group(),opts={depth:.34,bevelEnabled:true,bevelThickness:.035,bevelSize:.028,bevelSegments:3,curveSegments:28};
  var parts=[[shapeG(),0],[shapeW(),1.22],[shapeD(),2.44]];
  parts.forEach(function(p){
    var m=new THREE.Mesh(new THREE.ExtrudeGeometry(p[0],opts),mat.letters);m.position.x=p[1];grp.add(m);
  });
  var bar=new THREE.Mesh(new THREE.ExtrudeGeometry((function(){var b=new THREE.Shape();b.moveTo(.52,.28);b.lineTo(1,.28);b.lineTo(1,.5);b.lineTo(.52,.5);b.closePath();return b;})(),opts),mat.letters);
  grp.add(bar);
  var box=new THREE.Box3().setFromObject(grp),c=box.getCenter(new THREE.Vector3());
  grp.children.forEach(function(ch){ch.position.x-=c.x;ch.position.y-=c.y;ch.position.z-=c.z;});
  grp.scale.setScalar(scale);return grp;
}

/* ---- the path the camera flies ---- */
function pathX(z){return Math.sin(z*.05)*2.4;}
function pathY(z){return Math.cos(z*.041)*1.4;}

/* ---- lights that travel with the camera ---- */
var keyL=new THREE.PointLight(0xff4a52,2.4,70,1.2);
var rimL=new THREE.PointLight(0x7fb2ff,1.5,70,1.2);
var fillL=new THREE.PointLight(0xffffff,.9,50,1.4);
scene.add(keyL,rimL,fillL,new THREE.HemisphereLight(0x5a2a38,0x0a0508,.55));

/* ---- tunnel of metal corner frames ---- */
var L_TOTAL=300,STEP=7,NF=Math.ceil((L_TOTAL+100)/STEP);
var frames=[];
for(var i=0;i<NF;i++){
  var f=bracketPair(11,6.8,3.4,.34,mat.metalRed,mat.glowRed);
  var z=-10-i*STEP;f.position.set(pathX(z),pathY(z),z);
  f.userData={r0:i*.16,dir:i%2?1:-1};scene.add(f);frames.push(f);
}

/* ---- dust and bokeh ---- */
var PN=narrow?500:1200,pp=new Float32Array(PN*3);
for(var j=0;j<PN;j++){var zz=-Math.random()*(L_TOTAL+110)+20;pp[j*3]=pathX(zz)+(Math.random()-.5)*54;pp[j*3+1]=pathY(zz)+(Math.random()-.5)*36;pp[j*3+2]=zz;}
var pgeo=new THREE.BufferGeometry();pgeo.setAttribute('position',new THREE.BufferAttribute(pp,3));
scene.add(new THREE.Points(pgeo,new THREE.PointsMaterial({map:TEX_GLOW,color:0xffb0b4,size:.16,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false})));
var BN=narrow?20:48,bp=new Float32Array(BN*3);
for(var k=0;k<BN;k++){var bz=-Math.random()*(L_TOTAL+110)+20;bp[k*3]=pathX(bz)+(Math.random()-.5)*34;bp[k*3+1]=pathY(bz)+(Math.random()-.5)*22;bp[k*3+2]=bz;}
var bgeo=new THREE.BufferGeometry();bgeo.setAttribute('position',new THREE.BufferAttribute(bp,3));
scene.add(new THREE.Points(bgeo,new THREE.PointsMaterial({map:TEX_GLOW,color:0xff3b43,size:1.1,transparent:true,opacity:.1,blending:THREE.AdditiveBlending,depthWrite:false})));

/* ---- volumetric haze: big soft additive sprites that fade near the camera ---- */
var haze=[];
(function(){
  var n=narrow?34:70;
  for(var i=0;i<n;i++){
    var z=-Math.random()*(L_TOTAL+90)-6,red=Math.random()<.65;
    var s=halo(red?0xff2a35:0x4a7fb5,9+Math.random()*10,0);
    s.position.set(pathX(z)+(Math.random()-.5)*16,pathY(z)+(Math.random()-.5)*10,z);
    scene.add(s);haze.push({s:s,base:red?.1:.075});
  }
})();

/* ---- props pinned to the stages in the layout ---- */
var props=[];
function addProp(key,size,build){
  var el=document.querySelector('[data-stage="'+key+'"]');if(!el)return;
  var root=new THREE.Group(),spin=new THREE.Group();root.add(spin);scene.add(root);
  var api=build(spin)||{};
  props.push({el:el,size:size,root:root,spin:spin,api:api});
}

addProp('hero',[4.9,3.6],function(g){
  g.add(bracketPair(2.25,1.65,.95,.11,mat.metalRed,mat.glowRed));
  var logo=buildLetters(1.12);g.add(logo);
  var h=halo(0xff2a35,8.5,.34);h.position.z=-.8;g.add(h);
  var r1=dotRing(1.95,90,.07,0xffd0d3,.8),r2=dotRing(2.45,70,.05,0x9db6cc,.6);
  r2.rotation.x=1.1;g.add(r1,r2);
  return {update:function(t){
    logo.rotation.y=Math.sin(t*.5)*.2;logo.rotation.x=Math.sin(t*.37)*.05;logo.position.y=Math.sin(t*.8)*.03;
    r1.rotation.z=t*.14;r2.rotation.z=-t*.1;
  }};
});

addProp('identity',[3.8,4.6],function(g){
  var shellG=new THREE.IcosahedronGeometry(1.75,1);
  var shell=new THREE.Mesh(shellG,mat.shell);g.add(shell);
  var shellE=new THREE.LineSegments(new THREE.EdgesGeometry(shellG),mat.lineSteel);g.add(shellE);
  var club=new THREE.Mesh(new THREE.OctahedronGeometry(.62),new THREE.MeshStandardMaterial({color:0xb20c15,metalness:.7,roughness:.2,emissive:0xff2a35,emissiveIntensity:.7,envMapIntensity:1.4}));g.add(club);
  var core=halo(0xff3b43,3.4,.5);g.add(core);
  var cl=new THREE.PointLight(0xff3b43,2,9,1.3);g.add(cl);
  var orb=new THREE.Group();orb.rotation.x=.55;g.add(orb);
  orb.add(lineFrom(circlePts(1.15,96,'xy'),mat.lineSoft));
  var members=[];for(var i=0;i<14;i++){var m=new THREE.Mesh(new THREE.SphereGeometry(.075,16,12),mat.chrome);orb.add(m);members.push(m);}
  var l1=makeLabel('GWD GLOBAL',2.2);l1.position.set(0,2.15,0);g.add(l1);
  var l2=makeLabel('GWD CLUB',1.8);l2.position.set(0,-.98,0);g.add(l2);
  var l3=makeLabel('MEMBERS',1.8);l3.position.set(1.55,.85,0);g.add(l3);
  return {update:function(t){
    shell.rotation.y=shellE.rotation.y=t*.08;shell.rotation.x=shellE.rotation.x=t*.04;
    club.rotation.y=t*.4;club.rotation.x=t*.2;core.material.opacity=.42+Math.sin(t*1.6)*.08;
    members.forEach(function(m,i){var a=t*.45+i/members.length*Math.PI*2;m.position.set(Math.cos(a)*1.15,Math.sin(a)*1.15,0);});
  }};
});

addProp('verticals',[4.6,3.6],function(g){
  g.rotation.x=-.5;
  var core=new THREE.Mesh(new THREE.OctahedronGeometry(.34),mat.glowRed);g.add(core);
  g.add(halo(0xff3b43,3,.45));
  var cl=new THREE.PointLight(0xff3b43,1.6,8,1.3);g.add(cl);
  var ring=new THREE.Group();g.add(ring);
  ring.add(lineFrom(circlePts(1.75,120,'xz'),mat.lineSoft));
  var nodes=[];
  VERTICALS.forEach(function(v,i){
    var a=i/VERTICALS.length*Math.PI*2,p=new THREE.Vector3(Math.cos(a)*1.75,0,Math.sin(a)*1.75);
    var nm=new THREE.MeshStandardMaterial({color:0x2a1a1e,metalness:.9,roughness:.22,emissive:0xff2a35,emissiveIntensity:0,envMapIntensity:1.3});
    var mesh=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),nm);mesh.position.copy(p);mesh.scale.setScalar(.4);ring.add(mesh);
    ring.add(segs([[new THREE.Vector3(0,0,0),p]],mat.lineSoft));
    var hl=halo(0xff3b43,1.8,0);hl.position.copy(p);ring.add(hl);
    var lab=makeLabel(v.short,1.7);lab.position.set(p.x,.66,p.z);ring.add(lab);
    nodes.push({mesh:mesh,mt:nm,halo:hl,label:lab,k:0});
  });
  var rot=0;
  return {update:function(t,dt){
    var target=state.vertical/VERTICALS.length*Math.PI*2-Math.PI/2;
    var d=target-rot;d=Math.atan2(Math.sin(d),Math.cos(d));rot+=d*Math.min(1,dt*4);
    ring.rotation.y=rot;core.rotation.y=t*.5;core.rotation.x=t*.3;
    nodes.forEach(function(n,i){
      var on=i===state.vertical;n.k+=((on?1:0)-n.k)*Math.min(1,dt*6);
      n.mt.emissiveIntensity=n.k*1.5;n.halo.material.opacity=n.k*.6;
      n.mesh.scale.setScalar(.4+n.k*.2);n.mesh.rotation.y=t*.4;
      n.label.material.opacity=.45+n.k*.55;
    });
  }};
});

addProp('pipeline',[6.6,2.9],function(g){
  var xs=[-2.6,-.87,.87,2.6],ys=[.3,-.3,.3,-.3],nodes=[],pos=[];
  var bg=new THREE.BoxGeometry(1.25,.82,.3),edgeG=new THREE.EdgesGeometry(bg);
  STEPS.forEach(function(s,i){
    var n=new THREE.Group();n.position.set(xs[i],ys[i],0);g.add(n);
    n.add(new THREE.Mesh(bg,mat.glass));
    var edges=new THREE.LineSegments(edgeG,mat.lineSteel);n.add(edges);
    var inner=new THREE.Mesh(new THREE.BoxGeometry(.5,.3,.08),new THREE.MeshBasicMaterial({color:0xff3b43,transparent:true,opacity:.25}));n.add(inner);
    var hl=halo(0xff3b43,2.2,0);n.add(hl);
    var lab=makeLabel(s.short,1.5);lab.position.set(0,.74,0);n.add(lab);
    nodes.push({g:n,edges:edges,inner:inner,halo:hl,label:lab,k:0});pos.push(n.position.clone());
  });
  var pulses=[];
  for(var i=0;i<3;i++){
    var a=pos[i].clone().add(new THREE.Vector3(.63,0,0)),b=pos[i+1].clone().add(new THREE.Vector3(-.63,0,0));
    g.add(segs([[a,b]],mat.lineGlow));
    for(var k=0;k<2;k++){var p=new THREE.Mesh(new THREE.SphereGeometry(.065,12,10),mat.glowWhite);var ph=halo(0xff3b43,.7,.8);p.add(ph);g.add(p);pulses.push({m:p,a:a,b:b,o:k*.5+i*.13});}
  }
  return {update:function(t,dt){
    pulses.forEach(function(p){p.m.position.lerpVectors(p.a,p.b,(t*.35+p.o)%1);});
    nodes.forEach(function(n,i){
      var on=i===state.pipe;n.k+=((on?1:0)-n.k)*Math.min(1,dt*6);
      n.edges.material=on?mat.lineGlow:mat.lineSteel;
      n.g.scale.setScalar(1+n.k*.14);n.halo.material.opacity=n.k*.55;
      n.inner.material.opacity=.15+n.k*.7;
      n.label.material.opacity=.5+n.k*.5;
      n.g.position.y=ys[i]+Math.sin(t*.8+i)*.04;
    });
  }};
});

addProp('pitch',[7.6,4.0],function(g){
  var W=3.4,H=2.2,pg=new THREE.Group();pg.rotation.x=-1.05;g.add(pg);
  function P(x,y,z){return new THREE.Vector3(x,y,z||0);}
  /* turf */
  var tc=document.createElement('canvas');tc.width=520;tc.height=320;var tx=tc.getContext('2d');
  for(var i=0;i<10;i++){tx.fillStyle=i%2?'#0c1916':'#112420';tx.fillRect(i*52,0,52,320);}
  var turf=new THREE.Mesh(new THREE.PlaneGeometry(W*2+.5,H*2+.5),new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(tc),roughness:.95,metalness:0,envMapIntensity:.2}));
  turf.position.z=-.01;pg.add(turf);
  pg.add(lineFrom([P(-W,-H),P(W,-H),P(W,H),P(-W,H),P(-W,-H)],mat.lineGlow));
  pg.add(segs([[P(0,-H),P(0,H)]],mat.lineSoft));
  pg.add(lineFrom(circlePts(.5,64,'xy'),mat.lineSoft));
  [-1,1].forEach(function(s){
    pg.add(lineFrom([P(s*W,-.75),P(s*(W-.85),-.75),P(s*(W-.85),.75),P(s*W,.75)],mat.lineSoft));
    pg.add(lineFrom([P(s*W,-.32),P(s*(W-.3),-.32),P(s*(W-.3),.32),P(s*W,.32)],mat.lineGlow));
  });
  /* floodlights */
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(c){
    var pole=new THREE.Mesh(new THREE.CylinderGeometry(.015,.02,1.1,6),mat.darkMetal);pole.rotation.x=Math.PI/2;pole.position.set(c[0]*(W+.35),c[1]*(H+.25),.55);pg.add(pole);
    var hd=halo(0xfff1f2,1.5,.7);hd.position.set(c[0]*(W+.35),c[1]*(H+.25),1.12);pg.add(hd);
  });
  /* players */
  var players=[],bodyG=new THREE.CylinderGeometry(.045,.055,.17,8),headG=new THREE.SphereGeometry(.05,10,8);
  var teamA=new THREE.MeshStandardMaterial({color:0xb20c15,metalness:.3,roughness:.5,emissive:0x5a0008,emissiveIntensity:.8});
  var teamB=new THREE.MeshStandardMaterial({color:0xcfd8e2,metalness:.3,roughness:.5,emissive:0x2a3340,emissiveIntensity:.6});
  for(var i=0;i<12;i++){
    var pl=new THREE.Group(),m=i<6?teamA:teamB;
    var body=new THREE.Mesh(bodyG,m);body.rotation.x=Math.PI/2;body.position.z=.1;
    var head=new THREE.Mesh(headG,m);head.position.z=.22;pl.add(body,head);
    var bx=(i%6-2.5)*1.0+(i<6?-.4:.4),by=(i<6?-1:1)*(.3+.5*((i*7)%3));
    pg.add(pl);players.push({m:pl,bx:bx,by:by,ph:i*1.3});
  }
  /* ball with trail */
  var ball=new THREE.Mesh(new THREE.SphereGeometry(.09,16,12),mat.glowWhite);ball.add(halo(0xff3b43,.9,.8));pg.add(ball);
  var TN=34,tp=new Float32Array(TN*3),tg=new THREE.BufferGeometry();tg.setAttribute('position',new THREE.BufferAttribute(tp,3));
  var trail=new THREE.Line(tg,new THREE.LineBasicMaterial({color:0xff3b43,transparent:true,opacity:.7}));trail.frustumCulled=false;pg.add(trail);
  /* camera rigs with light cones */
  var coneG=new THREE.ConeGeometry(.5,1,18,1,true);coneG.translate(0,-.5,0);coneG.rotateX(-Math.PI/2);
  var coneM=new THREE.MeshBasicMaterial({color:0xff3b43,transparent:true,opacity:.1,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
  var rigs=[P(-W-.55,0,.12),P(W+.55,0,.12),P(0,-H-.55,.12)].map(function(p){
    var r=new THREE.Group();r.position.copy(p);
    var body=new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.16),mat.darkMetal);r.add(body);
    var tally=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),mat.glowRed);tally.position.set(0,.08,.1);r.add(tally);
    var cone=new THREE.Mesh(coneG,coneM);r.add(cone);pg.add(r);
    return {r:r,cone:cone,tally:tally};
  });
  var cap=makeLabel('OBS LIVE',1.7);cap.position.set(0,H+.6,.15);pg.add(cap);
  var up=new THREE.Vector3(0,0,1),dir=new THREE.Vector3();
  for(var q=0;q<TN;q++){tp[q*3]=0;tp[q*3+1]=0;tp[q*3+2]=.1;}
  return {update:function(t){
    players.forEach(function(p){p.m.position.set(p.bx+Math.sin(t*.6+p.ph)*.35,p.by+Math.cos(t*.5+p.ph)*.25,0);});
    var bx=Math.sin(t*.55)*W*.8,by=Math.sin(t*.9+1)*H*.7;ball.position.set(bx,by,.1);
    tp.copyWithin(3,0,(TN-1)*3);tp[0]=bx;tp[1]=by;tp[2]=.1;tg.attributes.position.needsUpdate=true;
    rigs.forEach(function(rg){
      dir.set(bx-rg.r.position.x,by-rg.r.position.y,.1-rg.r.position.z);var dist=dir.length();dir.normalize();
      rg.r.quaternion.setFromUnitVectors(up,dir);
      rg.cone.scale.set(dist*.28,dist*.28,dist);
      rg.tally.visible=reduce?true:Math.sin(t*5)>-.4;
    });
    pg.rotation.z=Math.sin(t*.2)*.12;
  }};
});

addProp('network',[6.4,4.4],function(g){
  var hub=new THREE.Mesh(new THREE.IcosahedronGeometry(.4,1),mat.glowRed);g.add(hub);
  g.add(halo(0xff3b43,3.4,.55));
  var hl=makeLabel('VJIT',1.4);hl.position.set(0,.74,0);g.add(hl);
  g.add(lineFrom(circlePts(1.3,90,'xz'),mat.lineSoft));
  g.add(lineFrom(circlePts(2.4,120,'xz'),mat.lineSoft));
  var sats=[
    {n:'T-HUB',p:[2.4,.9,-.3],big:true},{n:'EDVENTURE PARK',p:[-2.4,1.0,.4],big:true},
    {n:'CAMPUS 02',p:[1.7,-1.25,1.1]},{n:'CAMPUS 03',p:[-1.8,-1.2,-.9]},{n:'CAMPUS 04',p:[.2,1.95,-1.3]}
  ];
  var pulses=[];
  sats.forEach(function(s,i){
    var p=new THREE.Vector3(s.p[0],s.p[1],s.p[2]);
    if(s.big){
      var m=new THREE.Mesh(new THREE.IcosahedronGeometry(.27,1),mat.chrome);m.position.copy(p);g.add(m);
      var hh=halo(0x9db6cc,1.6,.4);hh.position.copy(p);g.add(hh);
      g.add(segs([[new THREE.Vector3(0,0,0),p]],mat.lineGlow));
    }else{
      var w=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(.22)),mat.lineSteel);w.position.copy(p);g.add(w);
      g.add(dashedLine(new THREE.Vector3(0,0,0),p));
    }
    var lab=makeLabel(s.n,s.big?2.1:1.7);lab.position.set(p.x,p.y+.52,p.z);g.add(lab);
    var pm=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),mat.glowWhite);pm.add(halo(0xff3b43,.6,.8));g.add(pm);pulses.push({m:pm,p:p,o:i*.2});
  });
  return {update:function(t){
    g.rotation.y=Math.sin(t*.18)*.5;hub.rotation.y=t*.5;hub.rotation.x=t*.3;
    pulses.forEach(function(p){p.m.position.copy(p.p).multiplyScalar((t*.28+p.o)%1);});
  }};
});

addProp('join',[4.9,3.6],function(g){
  var fr=bracketPair(2.25,1.65,.95,.11,mat.metalRed,mat.glowRed);g.add(fr);
  var core=new THREE.Mesh(new THREE.OctahedronGeometry(.34),mat.glowRed);g.add(core);
  g.add(halo(0xff3b43,5,.45));
  var cl=new THREE.PointLight(0xff3b43,2,9,1.3);g.add(cl);
  var ring=new THREE.Group();ring.rotation.x=.9;g.add(ring);
  ring.add(lineFrom(circlePts(1.2,96,'xy'),mat.lineSoft));
  var ns=[];for(var i=0;i<6;i++){var m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),mat.chrome);m.scale.setScalar(.2);ring.add(m);ns.push(m);}
  var dr=dotRing(1.9,80,.06,0xffd0d3,.7);g.add(dr);
  return {update:function(t){
    core.rotation.y=t*.6;core.rotation.x=t*.35;
    ns.forEach(function(m,i){var a=t*.4+i/6*Math.PI*2;m.position.set(Math.cos(a)*1.2,Math.sin(a)*1.2,0);m.rotation.z=a;m.rotation.x=t*.5;});
    fr.scale.setScalar(1+Math.sin(t*.9)*.03);dr.rotation.z=-t*.12;
  }};
});

/* ---- post: bloom, then lens finish (edge aberration, vignette, grain, shadow tint) ---- */
var composer=null,bloom=null,finalPass=null;
(function(){
  if(!(THREE.EffectComposer&&THREE.RenderPass&&THREE.UnrealBloomPass&&THREE.ShaderPass))return;
  try{
    var size=renderer.getDrawingBufferSize(new THREE.Vector2());
    var rt;
    if(renderer.capabilities.isWebGL2&&THREE.WebGLMultisampleRenderTarget){rt=new THREE.WebGLMultisampleRenderTarget(size.x,size.y);rt.samples=4;}
    else rt=new THREE.WebGLRenderTarget(size.x,size.y);
    composer=new THREE.EffectComposer(renderer,rt);
    composer.addPass(new THREE.RenderPass(scene,camera));
    bloom=new THREE.UnrealBloomPass(new THREE.Vector2(256,256),narrow?.75:.95,.7,.5);
    composer.addPass(bloom);
    finalPass=new THREE.ShaderPass({
      uniforms:{tDiffuse:{value:null},time:{value:0},ca:{value:.0011},vig:{value:.9},grain:{value:.05}},
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:[
        'uniform sampler2D tDiffuse;uniform float time,ca,vig,grain;varying vec2 vUv;',
        'float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233))+time*7.)*43758.5453);}',
        'void main(){',
        ' vec2 c=vUv-.5;float d=dot(c,c);',
        ' vec2 off=c*ca*(1.+d*7.);',
        ' vec3 col=vec3(texture2D(tDiffuse,vUv+off).r,texture2D(tDiffuse,vUv).g,texture2D(tDiffuse,vUv-off).b);',
        ' float lum=dot(col,vec3(.299,.587,.114));',
        ' col+=vec3(.018,.002,.006)*(1.-lum);',
        ' col*=1.-d*vig*1.7;',
        ' col+=(hash(vUv*vec2(1920.,1080.))-.5)*grain;',
        ' gl_FragColor=vec4(col,1.);}'
      ].join('\n')
    });
    finalPass.renderToScreen=true;
    composer.addPass(finalPass);
  }catch(e){composer=null;}
})();

/* ---- render loop ---- */
var camZ=0,mx=0,my=0,tmx=0,tmy=0,lastT=0,W=1,H=1;
var _v=new THREE.Vector3(),_o=new THREE.Vector3();
function resize(){
  W=window.innerWidth;H=window.innerHeight;
  renderer.setSize(W,H,false);camera.aspect=W/H;camera.updateProjectionMatrix();
  if(composer){composer.setSize(W,H);}
}
function place(p){
  var r=p.el.getBoundingClientRect();
  var on=r.bottom>-120&&r.top<H+120&&r.width>0;
  p.root.visible=on;if(!on)return;
  var nx=(r.left+r.width/2)/W*2-1,ny=-((r.top+r.height/2)/H*2-1);
  var d=17+Math.abs(ny)*5;
  var halfH=Math.tan(camera.fov/2*Math.PI/180)*d,halfW=halfH*camera.aspect;
  _v.set(nx*halfW,ny*halfH,-d).applyQuaternion(camera.quaternion).add(camera.position);
  p.root.position.copy(_v);p.root.quaternion.copy(camera.quaternion);
  var upp=halfH*2/H;
  var s=Math.min(r.width*upp/p.size[0],r.height*upp/p.size[1])*.9;
  p.root.scale.setScalar(Math.max(s,.0001));
}
function putLight(l,x,y,z){_o.set(x,y,z).applyQuaternion(camera.quaternion).add(camera.position);l.position.copy(_o);}
function frame(ts){
  var tt=ts/1000,t=reduce?0:tt,dt=reduce?1:Math.min(.05,Math.max(0,tt-lastT));lastT=tt;
  var target=-docProgress()*L_TOTAL,vel=target-camZ;
  camZ+=vel*(reduce?1:Math.min(1,dt*5));
  var speed=reduce?0:Math.abs(vel);
  mx+=(tmx-mx)*.06;my+=(tmy-my)*.06;
  camera.position.set(pathX(camZ)+mx*.8,pathY(camZ)+my*.5,camZ);
  camera.lookAt(pathX(camZ-16),pathY(camZ-16),camZ-16);
  camera.rotateZ(-mx*.035-(pathX(camZ-16)-pathX(camZ))*.012);
  camera.fov=FOV+Math.min(15,speed*.9);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  putLight(keyL,6,5,-12);putLight(rimL,-7,-4,-14);putLight(fillL,0,1,-5);
  for(var i=0;i<frames.length;i++){var f=frames[i];f.rotation.z=f.userData.r0+t*.05*f.userData.dir;}
  for(var h=0;h<haze.length;h++){
    var hz=haze[h],dz=camZ-hz.s.position.z;
    var k=dz<0?0:Math.min(1,Math.max(0,(dz-4)/12));
    hz.s.material.opacity=hz.base*k*(.85+.15*Math.sin(t*.6+h));
  }
  props.forEach(function(p){
    place(p);
    p.spin.rotation.y=mx*.35;p.spin.rotation.x=-my*.2;
    if(p.root.visible&&p.api.update)p.api.update(t,dt);
  });
  if(composer){
    finalPass.uniforms.time.value=t;finalPass.uniforms.ca.value=.0011+speed*.0007;
    composer.render();
  }else renderer.render(scene,camera);
}
var pending=false;
function requestOnce(){if(pending)return;pending=true;requestAnimationFrame(function(ts){pending=false;frame(ts);});}
function loop(ts){if(!document.hidden)frame(ts);requestAnimationFrame(loop);}

resize();
if(document.fonts&&document.fonts.load){document.fonts.load('600 46px "IBM Plex Mono"').then(function(){labels.forEach(drawLabel);requestOnce();}).catch(function(){});}
frame(0);
window.addEventListener('resize',function(){resize();requestOnce();});
window.addEventListener('pointermove',function(e){if(e.pointerType==='mouse'&&!reduce){tmx=e.clientX/W*2-1;tmy=-(e.clientY/H*2-1);}},{passive:true});
if(reduce){
  window.addEventListener('scroll',requestOnce,{passive:true});
  window.addEventListener('gwd-state',requestOnce);
}else{
  requestAnimationFrame(loop);
}
})();
