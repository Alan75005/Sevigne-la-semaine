const tabs=[...document.querySelectorAll('.tab')],panels=[...document.querySelectorAll('.panel')];
function openTab(id){
  tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===id));
  panels.forEach(p=>p.classList.toggle('active',p.id===id));
  history.replaceState(null,'','#'+id);
  const nav=document.querySelector('.tabs');
  if(nav) window.scrollTo({top:nav.offsetTop-8,behavior:'smooth'});
}
tabs.forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab)));
document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.jump)));
const hash=location.hash.slice(1);
if(['agenda','sorties','epreuves','besoin','orientation'].includes(hash)) openTab(hash);

if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
    try{
      const r=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});
      await r.update();
    }catch(e){}
  });
}


// V89 — carrousel du bandeau : automatique, flèches, points et balayage tactile.
(()=>{
  const root=document.getElementById('sevigneHeroCarousel'); if(!root)return;
  const slides=[...root.querySelectorAll('.hero-slide')],dots=[...root.querySelectorAll('.hero-dot')];
  const prev=root.querySelector('.hero-prev'),next=root.querySelector('.hero-next');
  let current=0,timer=null,touchX=null; const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(n){current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===current));dots.forEach((d,i)=>d.classList.toggle('active',i===current))}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  function start(){stop();if(!reduce)timer=setInterval(()=>show(current+1),5500)}
  prev?.addEventListener('click',()=>{show(current-1);start()}); next?.addEventListener('click',()=>{show(current+1);start()});
  dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);start()}));
  root.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});
  root.addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(dx)>45){show(current+(dx<0?1:-1));start()}},{passive:true});
  root.addEventListener('mouseenter',stop);root.addEventListener('mouseleave',start);
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());show(0);start();
})();
