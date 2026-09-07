const KEY="sevigne-agenda-content-v1";
const headers={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
export async function onRequestGet({env}){
  const data=await env.CONTENT.get(KEY,"json");
  return new Response(JSON.stringify(data||{}),{headers});
}
export async function onRequestPut({request,env}){
  const supplied=request.headers.get("x-admin-password")||"";
  if(!env.ADMIN_PASSWORD || supplied!==env.ADMIN_PASSWORD)
    return new Response("Mot de passe incorrect.",{status:401});
  let data; try{data=await request.json()}catch{return new Response("Données invalides.",{status:400})}
  const allowed={};
  for(const k of ["agenda","sorties","besoin"]) if(typeof data[k]==="string" && data[k].length<500000) allowed[k]=data[k];
  await env.CONTENT.put(KEY,JSON.stringify(allowed));
  return new Response(JSON.stringify({ok:true}),{headers});
}
