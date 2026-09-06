const text="Sévigné — La semaine",el=document.getElementById("typed");let i=0;(function t(){if(i<text.length){el.textContent+=text[i++];setTimeout(t,55)}})();
(()=>{const n=new Date(),k=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`,s=document.querySelector(`.day[data-date="${k}"]`),p=document.getElementById("today");if(!s||!p)return;document.getElementById("today-title").textContent=[s.querySelector(".weekday").textContent,s.querySelector(".date").textContent,s.querySelector(".month").textContent].join(" ");const e=document.getElementById("today-events");s.querySelectorAll(".event").forEach(x=>e.appendChild(x.cloneNode(true)));p.hidden=false})();

// V8: mise en évidence automatique du jour dans la frise.
(()=>{const n=new Date(),k=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`;const current=document.querySelector(`.day-nav a[data-nav-date="${k}"]`);if(current){current.classList.add("current");current.setAttribute("aria-current","date")}})();

// V9 — mise à jour PWA fiable à chaque ouverture.
if ("serviceWorker" in navigator) {
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" });
      await registration.update();
    } catch (_) {}
  });
}

// V10 — Web Push. La clé publique VAPID doit être fournie par le Worker.
const PUSH_API_ORIGIN = "https://sevigne-la-semaine-push.yvonalan1.workers.dev";
const PUSH_CONFIG_URL = `${PUSH_API_ORIGIN}/api/push/config`;
const PUSH_SUBSCRIBE_URL = `${PUSH_API_ORIGIN}/api/push/subscribe`;

function base64UrlToUint8Array(value) {
  const padding = "=".repeat((4 - value.length % 4) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(ch => ch.charCodeAt(0)));
}

async function initPushButton() {
  const button = document.getElementById("push-subscribe");
  const status = document.getElementById("push-status");
  const help = document.getElementById("push-help");
  if (!button || !status) return;

  const supported = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  if (!supported) {
    button.disabled = true;
    status.textContent = "Notifications push non disponibles sur cet appareil.";
    return;
  }

  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isiOS && !standalone) {
    button.disabled = true;
    help.textContent = "Sur iPhone, ajoutez d’abord Sévigné — La semaine à l’écran d’accueil, puis ouvrez-la depuis son icône.";
    status.textContent = "Installation sur l’écran d’accueil requise.";
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const existing = await registration.pushManager.getSubscription();
  if (existing) {
    button.textContent = "Notifications activées";
    button.classList.add("is-on");
    status.textContent = "Vous recevrez la prochaine publication.";
    return;
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "";
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        status.textContent = "Notifications non autorisées.";
        return;
      }

      const cfgResponse = await fetch(PUSH_CONFIG_URL, {cache:"no-store"});
      if (!cfgResponse.ok) throw new Error("push-config");
      const cfg = await cfgResponse.json();
      if (!cfg.publicKey) throw new Error("missing-vapid");

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64UrlToUint8Array(cfg.publicKey)
      });

      const save = await fetch(PUSH_SUBSCRIBE_URL, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(subscription)
      });
      if (!save.ok) throw new Error("push-save");

      button.textContent = "Notifications activées";
      button.classList.add("is-on");
      status.textContent = "Vous recevrez la prochaine publication.";
        } catch (error) {
      status.textContent = "Erreur Push : " + (error?.name || "Erreur") + " — " + (error?.message || String(error));
      console.error("Erreur Push Sévigné :", error);
    } finally {
      button.disabled = false;
    }
  });
}
initPushButton();
