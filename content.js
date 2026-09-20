const KEY="sevigne-agenda-content-v2";
const headers={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const FIELDS=["agenda","sorties","epreuves","orientation","besoin"];

export async function onRequestGet({env}){
  const data=await env.CONTENT.get(KEY,"json");
  return new Response(JSON.stringify(data||{}),{headers});
}

export async function onRequestPut({request,env}){
  const supplied=request.headers.get("x-admin-password")||"";
  if(!env.ADMIN_PASSWORD || supplied!==env.ADMIN_PASSWORD)
    return new Response("Mot de passe incorrect.",{status:401});

  let incoming;
  try{incoming=await request.json()}
  catch{return new Response("Données invalides.",{status:400})}

  const current=(await env.CONTENT.get(KEY,"json"))||{};
  const next={...current};

  for(const k of FIELDS){
    if(Object.prototype.hasOwnProperty.call(incoming,k)){
      if(typeof incoming[k]!=="string" || incoming[k].length>=1000000)
        return new Response("Contenu invalide pour "+k+".",{status:400});
      next[k]=incoming[k];
    }
  }

  await env.CONTENT.put(KEY,JSON.stringify(next));
  return new Response(JSON.stringify({ok:true,sections:FIELDS}),{headers});
}
