(function(){
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
/* menu na telefonie */
var mb=$('.mb'),nav=$('#menu');
if(mb&&nav){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
 nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}})}
/* dolny pasek na telefonie */
var pas=$('#pasek');
function pk(){if(pas)pas.classList.toggle('on',scrollY>innerHeight*.6&&scrollY+innerHeight<document.body.scrollHeight-260)}
addEventListener('scroll',pk,{passive:true});pk();
/* przeciąganie myszą + strzałki */
function tor(el){var d=false,x0=0,s0=0,ruch=0;
 el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||el.scrollWidth<=el.clientWidth+4)return;d=true;ruch=0;x0=e.clientX;s0=el.scrollLeft});
 addEventListener('pointermove',function(e){if(!d)return;ruch=Math.abs(e.clientX-x0);if(ruch>4)el.classList.add('ciag');el.scrollLeft=s0-(e.clientX-x0)});
 addEventListener('pointerup',function(){if(!d)return;d=false;setTimeout(function(){el.classList.remove('ciag')},0)});
 el.addEventListener('click',function(e){if(ruch>6){e.preventDefault();e.stopPropagation();ruch=0}},true)}
$$('.siatka,.op').forEach(tor);
$$('.strzalki').forEach(function(s){var t=document.getElementById(s.dataset.tor),b=s.querySelectorAll('button');if(!t)return;
 function st(){b[0].disabled=t.scrollLeft<4;b[1].disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4}
 t.addEventListener('scroll',st,{passive:true});addEventListener('resize',st);st();
 s.addEventListener('click',function(e){var x=e.target.closest('button');if(!x)return;var c=t.firstElementChild;var w=c?c.getBoundingClientRect().width+20:300;t.scrollBy({left:+x.dataset.k*w,behavior:'smooth'})})});
/* wyszukiwarka projektów: powierzchnia, sypialnie, styl */
var sz=$('#szukaj'),si=$('#siatka');
if(sz&&si){var karty=$$('.proj',si),licz=$('#licz'),cz=$('#czysc'),brak=$('#brak'),wb=$('#wiecej'),cala=si.hasAttribute('data-cala');
 function kol(){return innerWidth>=1700?4:innerWidth>1100?3:2}
 function filtruj(){var f=new FormData(sz),m=f.get('m'),s=f.get('s'),st=f.get('styl'),n=0,lim=kol()*2;
  karty.forEach(function(k){var ok=true,p=+k.dataset.m;
   if(m){var r=m.split('-');ok=p>=+r[0]&&p<+r[1]}
   if(ok&&s)ok=k.dataset.s===s;
   if(ok&&st)ok=k.dataset.styl===st;
   k.classList.toggle('ukr',!ok);k.classList.toggle('nad',ok&&n>=lim);if(ok)n++});
  licz.textContent=n;cz.hidden=!(m||s||st);if(brak)brak.classList.toggle('on',n===0);
  si.classList.toggle('cala',cala);
  if(wb){wb.parentNode.style.display=(!cala&&n>lim)?'':'none';wb.textContent='Pokaż wszystkie projekty ('+n+')'}
  si.scrollLeft=0}
 sz.addEventListener('change',filtruj);
 cz.addEventListener('click',function(){sz.reset();filtruj()});
 if(wb)wb.addEventListener('click',function(){cala=true;filtruj()});
 addEventListener('resize',filtruj);filtruj()}
/* galeria na podstronie projektu */
var gl=$('.gal-gl');
if(gl){var gi=$('img',gl);
 $$('.gal-mini button').forEach(function(b){b.addEventListener('click',function(){
  $$('.gal-mini button').forEach(function(x){x.classList.toggle('on',x===b)});
  gi.removeAttribute('srcset');gi.src=b.dataset.gl;gi.alt=b.getAttribute('aria-label');gl.dataset.i=b.dataset.i})})}
/* powiększenie */
var lb=$('#lb');
if(lb){var li=$('img',lb),ll=$('.lic',lb),zb=[],ix=0;
 function pokaz(){li.src=zb[ix].src;li.alt=zb[ix].alt;ll.textContent=zb.length>1?(ix+1)+' / '+zb.length+' · '+zb[ix].alt:zb[ix].alt;
  $('.pv',lb).style.display=$('.nx',lb).style.display=zb.length>1?'':'none'}
 document.addEventListener('click',function(e){var b=e.target.closest('button[data-zdj]');if(!b)return;
  try{zb=JSON.parse(b.dataset.zdj)}catch(_){return}ix=+(b.dataset.i||0);pokaz();lb.classList.add('on');document.body.style.overflow='hidden'});
 function zamknij(){lb.classList.remove('on');document.body.style.overflow=''}
 function kr(k){ix=(ix+k+zb.length)%zb.length;pokaz()}
 $('.x',lb).onclick=zamknij;$('.pv',lb).onclick=function(){kr(-1)};$('.nx',lb).onclick=function(){kr(1)};
 lb.addEventListener('click',function(e){if(e.target===lb)zamknij()});
 addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')zamknij();if(e.key==='ArrowLeft')kr(-1);if(e.key==='ArrowRight')kr(1)});
 var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
 lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50&&zb.length>1)kr(dx<0?1:-1)})}
/* projekt z adresu (?projekt=...) wybrany w formularzu */
var fp=$('#f-projekt');
if(fp){try{var q=new URLSearchParams(location.search).get('projekt');if(q)$$('option',fp).forEach(function(o){if(o.text===q)fp.value=q})}catch(_){}}
var fz=$('#zapytanie');
if(fz)fz.addEventListener('submit',function(e){e.preventDefault();$('.ok',this).style.display='block'});
/* cookies i mapa po zgodzie */
var ck=$('#cookies'),mapa=$('#mapa');
function zgoda(){try{return localStorage.getItem('likon-cookies')}catch(_){return null}}
function wczytaj(){if(!mapa||mapa.dataset.ok)return;mapa.dataset.ok=1;mapa.innerHTML='<iframe title="Mapa dojazdu do centrali LIKON" loading="lazy" src="'+mapa.dataset.src+'"></iframe>'}
if(ck)ck.addEventListener('click',function(e){var b=e.target.closest('[data-cookies]');if(!b)return;
 try{localStorage.setItem('likon-cookies',b.dataset.cookies)}catch(_){}ck.hidden=true;if(b.dataset.cookies==='tak')wczytaj()});
var pm=$('#pokaz-mape');if(pm)pm.addEventListener('click',wczytaj);
if(mapa&&zgoda()==='tak'&&'IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){wczytaj();o.disconnect()}},{rootMargin:'300px'}).observe(mapa)}
})();
