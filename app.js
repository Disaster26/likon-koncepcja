(function(){
var mb=document.querySelector('.mb'),nav=document.getElementById('menu');
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
/* aktywna pozycja menu i pasek na telefonie */
var linki=[].slice.call(nav.querySelectorAll('a[href^="#"]'));
var sek=linki.map(function(a){return document.querySelector(a.getAttribute('href'))});
var pas=document.getElementById('pasek');
function akt(){var y=scrollY+140,i=-1;sek.forEach(function(s,k){if(s&&s.offsetTop<=y)i=k});linki.forEach(function(a,k){a.classList.toggle('on',k===i)});
 pas.classList.toggle('on',scrollY>innerHeight*.8&&scrollY+innerHeight<document.body.scrollHeight-260)}
addEventListener('scroll',akt,{passive:true});akt();
/* przeciąganie myszą + strzałki */
function tor(el){var d=false,x0=0,s0=0,ruch=0;
 el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;d=true;ruch=0;x0=e.clientX;s0=el.scrollLeft});
 addEventListener('pointermove',function(e){if(!d)return;ruch=Math.abs(e.clientX-x0);if(ruch>4)el.classList.add('ciag');el.scrollLeft=s0-(e.clientX-x0)});
 addEventListener('pointerup',function(){if(!d)return;d=false;setTimeout(function(){el.classList.remove('ciag')},0)});
 el.addEventListener('click',function(e){if(ruch>6){e.preventDefault();e.stopPropagation();ruch=0}},true)}
document.querySelectorAll('.tor,.op').forEach(tor);
document.querySelectorAll('.strzalki').forEach(function(s){var t=document.getElementById(s.dataset.tor),b=s.querySelectorAll('button');
 function st(){b[0].disabled=t.scrollLeft<4;b[1].disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4}
 t.addEventListener('scroll',st,{passive:true});addEventListener('resize',st);st();
 s.addEventListener('click',function(e){var x=e.target.closest('button');if(!x)return;var c=t.firstElementChild;var w=c?c.getBoundingClientRect().width+20:300;t.scrollBy({left:+x.dataset.k*w,behavior:'smooth'})})});
/* powiększenie */
var lb=document.getElementById('lb'),li=lb.querySelector('img'),ll=lb.querySelector('.lic'),zb=[],ix=0;
function pokaz(){li.src=zb[ix].src;li.alt=zb[ix].alt;ll.textContent=zb.length>1?(ix+1)+' / '+zb.length+' · '+zb[ix].alt:zb[ix].alt;
 lb.querySelector('.pv').style.display=lb.querySelector('.nx').style.display=zb.length>1?'':'none'}
document.addEventListener('click',function(e){var b=e.target.closest('[data-zdj]');if(!b)return;
 try{zb=JSON.parse(b.dataset.zdj)}catch(_){return}ix=+(b.dataset.i||0);pokaz();lb.classList.add('on');document.body.style.overflow='hidden'});
function zamknij(){lb.classList.remove('on');document.body.style.overflow=''}
function kr(k){ix=(ix+k+zb.length)%zb.length;pokaz()}
lb.querySelector('.x').onclick=zamknij;lb.querySelector('.pv').onclick=function(){kr(-1)};lb.querySelector('.nx').onclick=function(){kr(1)};
lb.addEventListener('click',function(e){if(e.target===lb)zamknij()});
addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')zamknij();if(e.key==='ArrowLeft')kr(-1);if(e.key==='ArrowRight')kr(1)});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50&&zb.length>1)kr(dx<0?1:-1)});
/* "zapytaj o ten projekt" wybiera projekt w formularzu */
var fp=document.getElementById('f-projekt');
document.querySelectorAll('[data-projekt]').forEach(function(a){a.addEventListener('click',function(){fp.value=a.dataset.projekt})});
document.getElementById('zapytanie').addEventListener('submit',function(e){e.preventDefault();this.querySelector('.ok').style.display='block'});
/* mapa po przewinięciu */
var m=document.getElementById('mapa');
if('IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){m.innerHTML='<iframe title="Mapa dojazdu do centrali LIKON" loading="lazy" src="'+m.dataset.src+'"></iframe>';o.disconnect()}},{rootMargin:'300px'}).observe(m)}
})();
