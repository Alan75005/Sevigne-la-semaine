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

/* V78 - filtres épreuves : "Tous" réaffiche explicitement tous les niveaux */
function setTrainingFilter(level,activeBtn){
  const filters=[...document.querySelectorAll('.training-filter')];
  const sections=[...document.querySelectorAll('#epreuves .training-level')];
  filters.forEach(b=>b.classList.toggle('active',b===activeBtn));
  sections.forEach(section=>{
    const show = level==='all' || section.dataset.trainingLevel===level;
    section.hidden = !show;
    if(show){
      section.style.removeProperty('display');
      section.style.removeProperty('visibility');
    }else{
      section.style.setProperty('display','none','important');
    }
  });
}
document.addEventListener('click',e=>{
  const btn=e.target.closest('.training-filter');
  if(!btn) return;
  e.preventDefault();
  setTrainingFilter(btn.dataset.level,btn);
});
const allBtn=document.querySelector('.training-filter[data-level="all"]');
if(allBtn) setTrainingFilter('all',allBtn);
