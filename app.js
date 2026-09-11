const tabs=[...document.querySelectorAll('.tab')],panels=[...document.querySelectorAll('.panel')];
function openTab(id){tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===id));panels.forEach(p=>p.classList.toggle('active',p.id===id));history.replaceState(null,'','#'+id);window.scrollTo({top:document.querySelector('.tabs').offsetTop-8,behavior:'smooth'});}
tabs.forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab)));document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.jump)));const hash=location.hash.slice(1);if(['agenda','sorties','besoin'].includes(hash))openTab(hash);
if('serviceWorker' in navigator){window.addEventListener('load',async()=>{try{const r=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});await r.update()}catch(e){}})}

// V63 — filtres du calendrier des épreuves d'entraînement
const trainingFilters=[...document.querySelectorAll('.training-filter')];
trainingFilters.forEach(btn=>btn.addEventListener('click',()=>{const level=btn.dataset.level;trainingFilters.forEach(b=>b.classList.toggle('active',b===btn));document.querySelectorAll('.training-level').forEach(section=>{section.style.display=(level==='all'||section.dataset.trainingLevel===level)?'block':'none';});}));
