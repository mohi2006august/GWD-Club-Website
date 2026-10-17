
(function(){
var pre=document.getElementById('pre');if(!pre)return;
document.body.classList.add('pre-lock');
var done=false;function finish(){if(done)return;done=true;pre.classList.add('out');document.body.classList.remove('pre-lock');setTimeout(function(){pre.remove()},1000)}
if(typeof THREE==='undefined'){finish();return}
try{
var cv=document.getElementById('pre-gl'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(35,1,.1,100),Z=14,leaving=0;
function size(){var w=innerWidth,h=innerHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();Z=Math.max(14,17/C.aspect);if(!leaving)C.position.z=Z}
size();addEventListener('resize',size);
S.add(new THREE.AmbientLight(0xffffff,.8));var dl=new THREE.DirectionalLight(0xffffff,.9);dl.position.set(3,4,8);S.add(dl);
var RED=0xc8252e,logo=new THREE.Group();logo.position.y=.7;S.add(logo);
var bm=new THREE.MeshStandardMaterial({color:0xd02c36,metalness:.35,roughness:.35,emissive:0x6a0b14,emissiveIntensity:.6});
function corner(){var w=3.9,h=2.9,t=.17,sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(-w,0);sh.lineTo(-w,-t);sh.lineTo(-t,-t);sh.lineTo(-t,-h);sh.lineTo(0,-h);sh.lineTo(0,0);return new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.3,bevelEnabled:false}),bm)}
var TR=corner(),BL=corner();BL.rotation.z=Math.PI;logo.add(TR,BL);var home=[new THREE.Vector3(3.6,2.05,-.1),new THREE.Vector3(-3.6,-2.05,-.1)];
function ring(r,o,x){var m=new THREE.Mesh(new THREE.TorusGeometry(r,.014,8,200),new THREE.MeshBasicMaterial({color:0xff4a52,transparent:true,opacity:0}));m.rotation.x=x;m.userData.o=o;logo.add(m);return m}
var r1=ring(5.2,.35,1.15),r2=ring(6.1,.2,-.9);
var FONT='900 400px Archivo, Arial Black, sans-serif';
function tex(txt,font,w,h,sp){var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';x.font=font;if('letterSpacing' in x)x.letterSpacing=sp;x.fillText(txt,w/2,h/2+h*.04);return new THREE.CanvasTexture(c)}
var fc=document.createElement('canvas');fc.width=1024;fc.height=512;var fx=fc.getContext('2d'),ft=new THREE.CanvasTexture(fc);
function front(sw){fx.globalCompositeOperation='source-over';fx.clearRect(0,0,1024,512);var g=fx.createLinearGradient(0,110,0,410);g.addColorStop(0,'#ff7a80');g.addColorStop(.5,'#e53a45');g.addColorStop(1,'#b11d28');fx.fillStyle=g;fx.textAlign='center';fx.textBaseline='middle';fx.font=FONT;if('letterSpacing' in fx)fx.letterSpacing='6px';fx.fillText('GWD',512,276);
if(sw>=0&&sw<1){fx.globalCompositeOperation='source-atop';var x=sw*1500-250,h=fx.createLinearGradient(x-110,0,x+110,0);h.addColorStop(0,'rgba(255,255,255,0)');h.addColorStop(.5,'rgba(255,255,255,.8)');h.addColorStop(1,'rgba(255,255,255,0)');fx.fillStyle=h;fx.fillRect(0,0,1024,512)}ft.needsUpdate=true}
var layers=[],tag,N=18,built=false;
function build(){if(built)return;built=true;front(-1);
var t1=tex('GWD',FONT,1024,512,'6px');
for(var i=0;i<N;i++){var f=i/(N-1),top=i===N-1,col=new THREE.Color(0x3a070d).lerp(new THREE.Color(0xa81c26),Math.pow(f,.8));
var m=new THREE.Mesh(new THREE.PlaneGeometry(6.4,3.2),new THREE.MeshBasicMaterial({map:top?ft:t1,color:top?0xffffff:col,transparent:true,alphaTest:.45}));m.userData.f=f;logo.add(m);layers.push(m)}
var t2=tex('GET WORK DONE','700 70px Archivo, Arial, sans-serif',1024,128,'16px');
tag=new THREE.Mesh(new THREE.PlaneGeometry(6.4,.8),new THREE.MeshBasicMaterial({map:t2,color:0xd02c36,transparent:true,opacity:0}));tag.position.y=-3.1;logo.add(tag)}
var fr=(document.fonts&&document.fonts.load)?document.fonts.load('900 100px Archivo').catch(function(){}):Promise.resolve();
fr.then(build);setTimeout(build,900);
var PN=150,pp=new Float32Array(PN*3),pv=[];for(var i=0;i<PN;i++){pp[i*3]=(Math.random()-.5)*18;pp[i*3+1]=(Math.random()-.5)*10;pp[i*3+2]=Math.random()*5-3;pv.push(.15+Math.random()*.5)}
var pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pp,3));S.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xff5a62,size:.07,transparent:true,opacity:.75,depthWrite:false})));
var px=0,py=0;addEventListener('pointermove',function(e){px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5},{passive:true});
var t0=performance.now(),last=0,real=document.readyState==='complete'?1:0,shown=0,ease=function(x){return 1-Math.pow(1-x,3)},back=function(x){var c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
addEventListener('load',function(){real=1});setTimeout(function(){real=1},5000);
var n=document.getElementById('pre-n'),fill=document.querySelector('#pre-bar i'),msg=document.getElementById('pre-m'),M=['Wiring automations','Warming up the stream','Opening six verticals','Ready to get work done'],mi=-1,shine=0;
(function loop(){if(done)return;requestAnimationFrame(loop);
var t=(performance.now()-t0)/1000,dt=t-last;last=t;var sim=Math.min(t/2.8,1),target=real?sim:Math.min(sim,.9);
shown+=(target-shown)*.1;if(real&&sim>=1&&shown>.995&&!leaving)leaving=t;
var p=Math.min(shown,1),e=ease(p),v=Math.round(p*100),str=String(v).padStart(3,'0'),z=str.match(/^0*/)[0].length;if(z>2)z=2;
n.innerHTML='<i>'+str.slice(0,z)+'</i>'+str.slice(z);fill.style.transform='scaleX('+p+')';
var k2=Math.min(3,Math.floor(p*4));if(k2!==mi){mi=k2;msg.textContent=M[k2]}
var off=(1-back(Math.min(p*1.25,1)))*-9;TR.position.set(home[0].x+off,home[0].y+off*.7,home[0].z);BL.position.set(home[1].x-off,home[1].y-off*.7,home[1].z);
layers.forEach(function(m){m.position.z=m.userData.f*.75*e-.1;m.scale.setScalar(.55+.45*back(Math.min(p*1.2,1)))});
if(tag){tag.material.opacity=Math.max(0,Math.min(1,(p-.5)*2.4));tag.position.x=(1-e)*-1.2}
if(built&&p>.5){shine=(t*.55)%2.1;front(shine<1?shine:-1)}
r1.rotation.z+=dt*.25;r2.rotation.z-=dt*.18;r1.material.opacity=r1.userData.o*e;r2.material.opacity=r2.userData.o*e;
var a=pg.attributes.position.array;for(var i=0;i<PN;i++){a[i*3+1]+=pv[i]*dt;if(a[i*3+1]>5.2)a[i*3+1]=-5.2}pg.attributes.position.needsUpdate=true;
logo.rotation.y+=((Math.sin(t*.9)*.2*(1-p*.4)+px*.45)-logo.rotation.y)*.07;logo.rotation.x+=((py*.3)-logo.rotation.x)*.07;
if(leaving){var k=Math.min((t-leaving)/.9,1);C.position.z=Z-ease(k)*(Z-3.4);if(k>.35)finish()}
R.render(S,C)})();
}catch(e){console.error('preloader',e);finish()}
})();
