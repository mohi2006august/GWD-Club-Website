// UI Interactions & Theme Management for GWD Club


(function(){try{
var $=function(s,r){return [].slice.call((r||document).querySelectorAll(s))},rm=matchMedia('(prefers-reduced-motion: reduce)').matches,root=document.documentElement;
var nav=document.querySelector('.nav .wrap'),brand=nav.querySelector('.brand'),lm=brand.querySelector('.logo-mark');
var chip=document.createElement('span');chip.className='chip-logo';brand.insertBefore(chip,lm);chip.appendChild(lm);
var live=document.createElement('i');live.className='live';brand.appendChild(live);
var co=document.createElement('span');co.className='coords';co.setAttribute('aria-hidden','true');co.textContent='X0000 Y0000';nav.appendChild(co);
addEventListener('pointermove',function(e){co.textContent='X'+String(e.clientX|0).padStart(4,'0')+' Y'+String(e.clientY|0).padStart(4,'0')},{passive:true});
var cta=nav.querySelector('.btn');cta.insertAdjacentHTML('beforeend','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
var tg=document.createElement('button');tg.id='theme';tg.type='button';
tg.innerHTML='<svg class="sn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="mn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
var r=document.createElement('div');r.className='nav-r';nav.appendChild(r);r.appendChild(tg);r.appendChild(cta);
function set(t){root.dataset.theme=t;tg.setAttribute('aria-label',t==='light'?'Switch to dark mode':'Switch to light mode');try{localStorage.setItem('gwd-theme',t)}catch(e){}}
set(root.dataset.theme||'dark');
tg.addEventListener('click',function(){var n=root.dataset.theme==='light'?'dark':'light';
if(!document.startViewTransition||rm){set(n);return}
var b=tg.getBoundingClientRect(),x=b.left+b.width/2,y=b.top+b.height/2,R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
document.startViewTransition(function(){set(n)}).ready.then(function(){root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+R+'px at '+x+'px '+y+'px)']},{duration:750,easing:'cubic-bezier(.65,0,.35,1)',pseudoElement:'::view-transition-new(root)'})})});
/* active link */
var map={identity:'identity',verticals:'verticals',bootcamp:'bootcamp',matchday:'bootcamp',roadmap:'roadmap',team:'team'},links=$('.nav ul a'),secs=Object.keys(map).map(function(k){return document.getElementById(k)});
function act(){var cur=null;secs.forEach(function(s){if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id});links.forEach(function(a){a.setAttribute('aria-current',cur&&a.getAttribute('href')==='#'+map[cur])})}
addEventListener('scroll',act,{passive:true});act();
/* section reveals */
var G={identity:[['.pillar','fillUp'],['.vs-row>*:first-child','slideL'],['.vs-row>*:last-child','slideR']],verticals:[['.v-item','flip3d'],['#v-detail','zoomBlur']],bootcamp:[['.p-step','popIn','cubic-bezier(.34,1.8,.5,1)'],['.example .chip,.example .arrow','popIn','cubic-bezier(.34,1.8,.5,1)'],['.sprint','expandX']],matchday:[['.role','wipeR'],['.tags .chip','popIn','cubic-bezier(.34,1.8,.5,1)']],roadmap:[['.phase','slideL'],['.phase .n','spinIn'],['.body-card','flipY']],team:[['#leaders>*,#leads>*','zoomBlur']],join:[['.channel','dropB','cubic-bezier(.34,1.7,.5,1)']]};
if(!rm&&'IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
Object.keys(G).forEach(function(id){var s=document.getElementById(id);if(!s)return;
G[id].forEach(function(g){$(g[0],s).forEach(function(el,i){el.classList.add('rv-el');el.style.setProperty('--an',g[1]);el.style.setProperty('--i',i);if(g[2])el.style.setProperty('--ease',g[2])})});
io.observe(s)});
setTimeout(function(){$('section').forEach(function(s){s.classList.add('in')})},9000)}
}catch(err){console.error('v3',err)}
})();



(function(){
try{
var $=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches, fine=matchMedia('(pointer:fine)').matches;
var bar=document.getElementById('fx-bar');
/* scroll progress + scrubbed headline words + governance lighting */
var words=[];
$('.h2').forEach(function(h){
  var t=h.textContent.trim().split(/\s+/);h.setAttribute('aria-label',t.join(' '));h.textContent='';
  t.forEach(function(x,i){var s=document.createElement('span');s.className='w';s.setAttribute('aria-hidden','true');s.textContent=x+(i<t.length-1?' ':'');h.appendChild(s);words.push({el:s,h:h,i:i,n:t.length})});
});
var lis=$('.tree li');
function onScroll(){
  var y=scrollY,H=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform='scaleX('+(H>0?y/H:0)+')';
  if(rm)return;var vh=innerHeight,cache=new Map();
  words.forEach(function(w){
    var r=cache.get(w.h);if(!r){r=w.h.getBoundingClientRect();cache.set(w.h,r)}
    var k=(vh*.92-r.top)/(vh*.45),f=w.i/w.n;
    w.el.style.setProperty('--p',Math.max(0,Math.min(1,k*1.4-f*.9)).toFixed(3));
  });
  lis.forEach(function(l){if(!l.classList.contains('lit')&&l.getBoundingClientRect().top<vh*.78)l.classList.add('lit')});
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
/* tilt + spotlight cards */
$('.pillar,.role,.phase,.channel,.p-step,.body-card,.sprint').forEach(function(c){
  c.classList.add('fx');
  c.addEventListener('pointermove',function(e){
    var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');
    if(!rm&&e.pointerType==='mouse'){c.style.setProperty('--ry',((x-.5)*7).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y)*5).toFixed(2)+'deg')}
  });
  c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
});
/* matchday roles drive the stage caption */
var cap=document.querySelector('[data-stage="pitch"] .cap');
if(cap){var orig=cap.textContent,msg=['Operations: every handoff on the clock','Broadcast: scenes switch while the ball is live','Camera: three angles, one ball'];
  $('.role').forEach(function(r,i){
    var on=function(){cap.textContent=msg[i];cap.classList.add('swap')},off=function(){cap.textContent=orig;cap.classList.remove('swap')};
    r.addEventListener('pointerenter',on);r.addEventListener('pointerleave',off);r.addEventListener('focusin',on);r.addEventListener('focusout',off);
  });}
/* hero: one orchestrated scramble on load */
var d=document.querySelector('.hero h1 span');
if(d&&!rm){var fin=d.textContent,ch='abcdefghkmnopqrstuvwxyz#%&',n=0,t=setInterval(function(){
  d.textContent=fin.split('').map(function(c,i){return i<n/3||c==='.'?c:ch[Math.random()*ch.length|0]}).join('');
  if(++n>fin.length*3+3){clearInterval(t);d.textContent=fin}},45);}
/* cursor, magnetic buttons */
if(fine&&!rm){
  var ring=document.getElementById('fx-ring'),dot=document.getElementById('fx-dot'),mx=0,my=0,rx=0,ry=0;
  document.body.classList.add('fx-on');
  addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;dot.style.transform='translate('+mx+'px,'+my+'px)'},{passive:true});
  (function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(loop)})();
  document.addEventListener('pointerover',function(e){document.body.classList.toggle('fx-hot',!!e.target.closest('a,button,.p-step,.v-item'))});
  $('.btn').forEach(function(b){
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});
    b.addEventListener('pointerleave',function(){b.style.transform=''});
  });
}
}catch(err){console.error('fx layer',err)}
})();

