const text="Sévigné — La semaine",el=document.getElementById("type-title");let i=0;
function type(){if(i<text.length){el.textContent+=text[i++];setTimeout(type,68)}}setTimeout(type,220);
document.querySelectorAll("nav button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("nav button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const d=btn.dataset.day;document.querySelectorAll(".agenda article").forEach(a=>a.hidden=d!=="all"&&a.dataset.day!==d)}));
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
