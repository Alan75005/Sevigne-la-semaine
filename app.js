const text="Sévigné — La semaine",el=document.getElementById("typed");let i=0;(function t(){if(i<text.length){el.textContent+=text[i++];setTimeout(t,55)}})();
const tabs=[...document.querySelectorAll('.tab')],panels=[...document.querySelectorAll('.panel')];
function openTab(id){tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===id));panels.forEach(p=>p.classList.toggle('active',p.id===id));history.replaceState(null,'','#'+id);window.scrollTo({top:document.querySelector('.tabs').offsetTop-8,behavior:'smooth'});}
tabs.forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab)));const hash=location.hash.slice(1);if(['agenda','sorties','besoin'].includes(hash))openTab(hash);
if('serviceWorker' in navigator){window.addEventListener('load',async()=>{try{const r=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});await r.update()}catch(e){}})}
