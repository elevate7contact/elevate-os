import React, { useState, useEffect, useRef } from "react";

const C = {
  xp:"#A78BFA", xpD:"#7C3AED", xpGlow:"#A78BFA55",
  finance:"#34D399", financeD:"#059669",
  habit:"#FB923C", habitD:"#EA580C",
  project:"#60A5FA", projectD:"#2563EB",
  goal:"#FBBF24", goalD:"#D97706",
  badge:"#F472B6", badgeD:"#DB2777",
  bg:"#0F0F1A", bg2:"#16162A", bg3:"#1E1E35",
  border:"#2A2A4A", borderHi:"#3D3D6B",
  text:"#E2E8F0", textMuted:"#94A3B8", textDim:"#475569",
  skin:"#F5C07A", skinD:"#E8A84A", hair:"#1A0F0A",
  shirt:"#7C3AED", pants:"#1E1B4B", shoe:"#0F0A1E",
};

/* ══ AVATAR ══ */
function Avatar({ state: st, level=1, size=180 }) {
  const scale = Math.min(1 + (level-1)*0.04, 1.3);
  const weak  = st==="weak";
  const cel   = st==="celebrate";
  const shirtCol = weak?"#334155":cel?"#DB2777":C.shirt;
  const pantsCol = weak?"#1E293B":C.pants;
  const shoeCol  = weak?"#0F172A":C.shoe;

  return (
    <svg width={size} height={size} viewBox="0 0 100 120" style={{overflow:"visible",transform:`scale(${scale})`,transformOrigin:"bottom center"}}>
      <defs>
        <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={cel?"#F472B644":weak?"#00000000":"#A78BFA33"}/>
          <stop offset="100%" stopColor="#00000000"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <style>{`
        @keyframes idle    {0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @keyframes jump    {0%,100%{transform:translateY(0)}40%{transform:translateY(-16px)}}
        @keyframes wobble  {0%,100%{transform:rotate(0)}25%{transform:rotate(-7deg)}75%{transform:rotate(7deg)}}
        @keyframes pulse   {0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        @keyframes droop   {0%,100%{transform:rotate(0)}50%{transform:rotate(10deg)}}
        @keyframes runL    {0%,100%{transform:rotate(-30deg)}50%{transform:rotate(22deg)}}
        @keyframes runR    {0%,100%{transform:rotate(30deg)}50%{transform:rotate(-22deg)}}
        @keyframes typeA   {0%,100%{transform:rotate(-12deg)}50%{transform:rotate(22deg)}}
        @keyframes typeB   {0%,100%{transform:rotate(12deg)}50%{transform:rotate(-22deg)}}
        @keyframes coinF   {0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(22px) scale(0.6)}}
        @keyframes starP   {0%{opacity:0;transform:scale(0) rotate(0)}50%{opacity:1;transform:scale(1.4) rotate(180deg)}100%{opacity:0;transform:scale(0.8) rotate(360deg)}}
        @keyframes aura    {0%,100%{opacity:0.5;r:28}50%{opacity:1;r:34}}
        .b-idle {animation:idle 2.2s ease-in-out infinite}
        .b-jump {animation:jump 0.65s ease-in-out infinite}
        .b-wob  {animation:wobble 0.5s ease-in-out infinite}
        .b-pls  {animation:pulse 1.1s ease-in-out infinite}
        .b-drp  {animation:droop 2s ease-in-out infinite}
        .aL     {transform-origin:50px 58px;animation:runL 0.4s ease-in-out infinite}
        .aR     {transform-origin:50px 58px;animation:runR 0.4s ease-in-out infinite}
        .tL     {transform-origin:34px 60px;animation:typeA 0.28s ease-in-out infinite}
        .tR     {transform-origin:66px 60px;animation:typeB 0.28s ease-in-out infinite}
        .coin   {animation:coinF 1.1s ease-in infinite}
        .star   {animation:starP 1s ease-out infinite}
      `}</style>

      {/* aura */}
      <ellipse cx="50" cy="80" rx="36" ry="8" fill="url(#auraGrad)" opacity="0.7"/>

      {/* shadow */}
      <ellipse cx="50" cy="117" rx="16" ry="3" fill="#00000066"/>

      <g className={st==="exercise"?"b-jump":st==="work"?"b-pls":st==="save"?"b-wob":st==="celebrate"?"b-jump":weak?"b-drp":"b-idle"}>

        {/* legs */}
        {st==="exercise"?<>
          <rect x="38" y="85" width="10" height="22" rx="5" fill={pantsCol} transform="rotate(-22 43 85)"/>
          <rect x="52" y="85" width="10" height="22" rx="5" fill={pantsCol} transform="rotate(22 57 85)"/>
          <ellipse cx="35" cy="108" rx="7" ry="4" fill={shoeCol}/>
          <ellipse cx="65" cy="108" rx="7" ry="4" fill={shoeCol}/>
        </>:<>
          <rect x="38" y="87" width="10" height="23" rx="5" fill={pantsCol}/>
          <rect x="52" y="87" width="10" height="23" rx="5" fill={pantsCol}/>
          <ellipse cx="43" cy="110" rx="7" ry="4" fill={shoeCol}/>
          <ellipse cx="57" cy="110" rx="7" ry="4" fill={shoeCol}/>
        </>}

        {/* torso */}
        <rect x="32" y="56" width="36" height="34" rx="8" fill={shirtCol}/>
        {/* shirt detail */}
        {!weak&&<rect x="44" y="58" width="12" height="2" rx="1" fill="#ffffff18"/>}
        {/* level badge on chest */}
        {!weak&&<>
          <circle cx="50" cy="68" r="7" fill="#ffffff12" stroke="#ffffff22" strokeWidth="0.5"/>
          <text x="50" y="71.5" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">{level}</text>
        </>}

        {/* arms */}
        {st==="exercise"?<>
          <rect className="aL" x="20" y="57" width="12" height="27" rx="6" fill={shirtCol}/>
          <rect className="aR" x="68" y="57" width="12" height="27" rx="6" fill={shirtCol}/>
        </>:st==="work"?<>
          <rect className="tL" x="18" y="58" width="12" height="26" rx="6" fill={shirtCol}/>
          <rect className="tR" x="70" y="58" width="12" height="26" rx="6" fill={shirtCol}/>
        </>:st==="save"?<>
          <rect x="20" y="60" width="12" height="22" rx="6" fill={shirtCol} transform="rotate(32 26 60)"/>
          <rect x="68" y="60" width="12" height="22" rx="6" fill={shirtCol} transform="rotate(-42 74 60)"/>
        </>:st==="celebrate"?<>
          <rect x="20" y="48" width="12" height="26" rx="6" fill={shirtCol} transform="rotate(-42 26 48)"/>
          <rect x="68" y="48" width="12" height="26" rx="6" fill={shirtCol} transform="rotate(42 74 48)"/>
        </>:weak?<>
          <rect x="22" y="63" width="12" height="26" rx="6" fill={shirtCol} transform="rotate(22 28 63)"/>
          <rect x="66" y="63" width="12" height="26" rx="6" fill={shirtCol} transform="rotate(-22 72 63)"/>
        </>:<>
          <rect x="20" y="58" width="12" height="26" rx="6" fill={shirtCol}/>
          <rect x="68" y="58" width="12" height="26" rx="6" fill={shirtCol}/>
        </>}

        {/* neck */}
        <rect x="44" y="44" width="12" height="14" rx="6" fill={C.skin}/>
        {/* head */}
        <ellipse cx="50" cy="34" rx="22" ry="22" fill={C.skin}/>
        {/* hair */}
        <ellipse cx="50" cy="16" rx="22" ry="10" fill={C.hair}/>
        <rect x="28" y="12" width="10" height="17" rx="5" fill={C.hair}/>
        <rect x="62" y="12" width="10" height="17" rx="5" fill={C.hair}/>
        {/* hair highlight */}
        <ellipse cx="44" cy="14" rx="5" ry="2" fill="#ffffff15"/>

        {/* eyes */}
        {weak?<>
          <line x1="39" y1="31" x2="45" y2="36" stroke="#5D3A1A" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="45" y1="31" x2="39" y2="36" stroke="#5D3A1A" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="55" y1="31" x2="61" y2="36" stroke="#5D3A1A" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="61" y1="31" x2="55" y2="36" stroke="#5D3A1A" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M42 43 Q50 39 58 43" stroke="#5D3A1A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>:cel?<>
          <ellipse cx="42" cy="33" rx="5" ry="6" fill="#2D1B0E"/>
          <ellipse cx="58" cy="33" rx="5" ry="6" fill="#2D1B0E"/>
          <ellipse cx="43" cy="31" rx="2.5" ry="3" fill="#fff" opacity="0.9"/>
          <ellipse cx="59" cy="31" rx="2.5" ry="3" fill="#fff" opacity="0.9"/>
          <path d="M40 43 Q50 52 60 43" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="37" cy="40" rx="5" ry="3" fill="#F5A0A0" opacity="0.45"/>
          <ellipse cx="63" cy="40" rx="5" ry="3" fill="#F5A0A0" opacity="0.45"/>
        </>:<>
          <ellipse cx="42" cy="33" rx="4.5" ry="4.5" fill="#2D1B0E"/>
          <ellipse cx="58" cy="33" rx="4.5" ry="4.5" fill="#2D1B0E"/>
          <ellipse cx="43.5" cy="32" rx="2" ry="2" fill="#fff" opacity="0.9"/>
          <ellipse cx="59.5" cy="32" rx="2" ry="2" fill="#fff" opacity="0.9"/>
          <path d="M42 42 Q50 48 58 42" stroke="#5D3A1A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </>}

        {/* exercise sweat */}
        {st==="exercise"&&<ellipse cx="70" cy="26" rx="3" ry="5" fill="#60A5FA" opacity="0.8"/>}

        {/* laptop for work */}
        {st==="work"&&<>
          <rect x="26" y="86" width="48" height="26" rx="3" fill="#1E1B4B"/>
          <rect x="28" y="88" width="44" height="20" rx="2" fill="#0F0F1A"/>
          <line x1="31" y1="92" x2="56" y2="92" stroke={C.project} strokeWidth="1.2" opacity="0.8"/>
          <line x1="31" y1="96" x2="50" y2="96" stroke={C.xp} strokeWidth="1.2" opacity="0.8"/>
          <line x1="31" y1="100" x2="58" y2="100" stroke={C.finance} strokeWidth="1.2" opacity="0.6"/>
          <line x1="31" y1="104" x2="44" y2="104" stroke={C.xp} strokeWidth="1.2" opacity="0.6"/>
        </>}
      </g>

      {/* floating fx */}
      {st==="exercise"&&<>
        <text className="star" x="8" y="20" fontSize="13" fill={C.xp} style={{animationDelay:"0s"}}>★</text>
        <text className="star" x="76" y="14" fontSize="9" fill={C.goal} style={{animationDelay:"0.4s"}}>★</text>
      </>}
      {st==="save"&&<>
        <g className="coin" style={{animationDelay:"0s"}}>
          <circle cx="74" cy="55" r="7" fill={C.goal}/>
          <text x="74" y="59" textAnchor="middle" fontSize="8" fill="#78350F" fontWeight="bold">$</text>
        </g>
        <g className="coin" style={{animationDelay:"0.55s"}}>
          <circle cx="64" cy="46" r="5" fill={C.goal}/>
          <text x="64" y="49.5" textAnchor="middle" fontSize="6" fill="#78350F" fontWeight="bold">$</text>
        </g>
      </>}
      {cel&&<>
        <circle className="star" cx="12" cy="18" r="6" fill={C.badge} style={{animationDelay:"0s"}}/>
        <circle className="star" cx="88" cy="14" r="4" fill={C.xp} style={{animationDelay:"0.25s"}}/>
        <circle className="star" cx="82" cy="38" r="3" fill={C.goal} style={{animationDelay:"0.5s"}}/>
        <circle className="star" cx="16" cy="40" r="5" fill={C.finance} style={{animationDelay:"0.15s"}}/>
        <text className="star" x="75" y="22" fontSize="10" fill={C.xp} style={{animationDelay:"0.35s"}}>✦</text>
      </>}
      {weak&&<>
        <text x="68" y="28" fontSize="16" fill={C.textDim} opacity="0.5" style={{animation:"coinF 2.2s ease-in infinite"}}>…</text>
      </>}
    </svg>
  );
}

/* ── helpers ── */
const LEVELS=[
  {level:1,name:"Novato",min:0},
  {level:2,name:"Aprendiz",min:200},
  {level:3,name:"Estratega",min:500},
  {level:4,name:"Ejecutor",min:1000},
  {level:5,name:"Maestro",min:2000},
  {level:6,name:"Leyenda",min:4000},
];
function getLvl(xp){
  let l=LEVELS[0];for(const x of LEVELS){if(xp>=x.min)l=x;}
  const idx=LEVELS.indexOf(l),next=LEVELS[idx+1];
  return{...l,next,pct:next?Math.round(((xp-l.min)/(next.min-l.min))*100):100};
}
const BADGES=[
  {id:"first_task",icon:"★",label:"Primera tarea",desc:"Completaste tu primera tarea",xp:50},
  {id:"streak_3",icon:"◆",label:"Racha x3",desc:"3 días seguidos",xp:100},
  {id:"saver",icon:"◉",label:"Ahorrador",desc:"Meta de ahorro alcanzada",xp:150},
  {id:"finisher",icon:"▲",label:"Finalizador",desc:"Proyecto completado",xp:200},
  {id:"consistent",icon:"●",label:"Consistente",desc:"5 hábitos en un día",xp:75},
  {id:"goal_crusher",icon:"■",label:"Imparable",desc:"Meta a largo plazo lograda",xp:300},
];
const PT=["Elevate Zeven","Personal","Otro"];
const TS={"Elevate Zeven":{bg:"#1E3A5F",text:"#60A5FA"},"Personal":{bg:"#14532D",text:"#34D399"},"Otro":{bg:"#451A03",text:"#FBBF24"}};
const INIT={xp:0,habits:[
  {id:1,name:"Ejercicio",streak:0,done:false,lastDate:null},
  {id:2,name:"Lectura 30min",streak:0,done:false,lastDate:null},
  {id:3,name:"Revisar finanzas",streak:0,done:false,lastDate:null},
],finances:{income:0,expenses:[],savingsGoal:1000000,currentSavings:0,transactions:[]},projects:[],goals:[],badges:[]};

function useLS(key,init){
  const[v,setV]=useState(()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):init;}catch{return init;}});
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v));}catch{}},[v]);
  return[v,setV];
}

function XPToast({msg,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2200);return()=>clearTimeout(t);},[]);
  return(
    <div style={{position:"fixed",top:20,right:20,background:"linear-gradient(135deg,#7C3AED,#A78BFA)",color:"#fff",padding:"11px 22px",borderRadius:12,fontWeight:500,fontSize:14,zIndex:9999,boxShadow:"0 0 24px #A78BFA55",animation:"toastIn 0.3s ease",border:"1px solid #A78BFA66"}}>
      {msg}
    </div>
  );
}

/* shared dark styles */
const DS=`
  @keyframes toastIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  *{box-sizing:border-box;}
  body,#root{background:transparent;}
  .tab{background:none;border:none;padding:7px 14px;font-size:13px;cursor:pointer;border-radius:8px;color:#94A3B8;transition:all 0.15s;font-family:inherit;}
  .tab.on{background:#1E1E35;color:#E2E8F0;font-weight:500;border:0.5px solid #2A2A4A;}
  .tab:hover{background:#16162A;color:#E2E8F0;}
  .card{background:#16162A;border:0.5px solid #2A2A4A;border-radius:14px;padding:1rem 1.25rem;margin-bottom:12px;}
  .card-glow{background:#16162A;border:0.5px solid #3D3D6B;border-radius:14px;padding:1rem 1.25rem;margin-bottom:12px;box-shadow:0 0 20px #A78BFA18;}
  .btn{background:none;border:0.5px solid #3D3D6B;border-radius:8px;padding:6px 14px;font-size:13px;cursor:pointer;color:#E2E8F0;transition:all 0.15s;font-family:inherit;}
  .btn:hover{background:#1E1E35;border-color:#A78BFA66;}
  .btn-primary{background:linear-gradient(135deg,#7C3AED,#A78BFA);border:none;border-radius:8px;padding:7px 16px;font-size:13px;cursor:pointer;color:#fff;font-weight:500;transition:all 0.15s;font-family:inherit;}
  .btn-primary:hover{opacity:0.88;}
  .inp{border:0.5px solid #2A2A4A;border-radius:8px;padding:7px 11px;font-size:13px;background:#0F0F1A;color:#E2E8F0;outline:none;width:100%;font-family:inherit;}
  .inp:focus{border-color:#A78BFA66;}
  .inp::placeholder{color:#475569;}
  .pbar{height:8px;border-radius:4px;background:#0F0F1A;overflow:hidden;}
  .pfill{height:100%;border-radius:4px;transition:width 0.6s cubic-bezier(0.34,1.56,0.64,1);}
  .chk{width:26px;height:26px;border-radius:50%;border:1.5px solid #3D3D6B;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;transition:all 0.2s;color:#E2E8F0;}
  .chk.on{background:#7C3AED;border-color:#A78BFA;box-shadow:0 0 10px #A78BFA66;}
  .met{background:#0F0F1A;border-radius:10px;padding:14px;border:0.5px solid #2A2A4A;}
  .tag{display:inline-block;font-size:11px;padding:2px 8px;border-radius:6px;font-weight:500;}
  select{border:0.5px solid #2A2A4A;border-radius:8px;padding:7px 11px;font-size:13px;background:#0F0F1A;color:#E2E8F0;outline:none;font-family:inherit;}
  .divider{border:none;border-top:0.5px solid #2A2A4A;margin:10px 0;}
  .bubble{background:#0F0F1A;border:0.5px solid #2A2A4A;border-radius:10px;padding:6px 12px;font-size:11px;color:#94A3B8;text-align:center;margin-top:6px;}
  .glow-text{text-shadow:0 0 12px currentColor;}
  .section-title{font-size:11px;font-weight:500;color:#475569;text-transform:uppercase;letter-spacing:1px;margin:16px 0 8px;}
`;

export default function App(){
  const[S,setS]=useLS("elevate_os_v6",INIT);
  const[tab,setTab]=useState("dashboard");
  const[toasts,setToasts]=useState([]);
  const[avSt,setAvSt]=useState("idle");
  const tid=useRef(0);
  const today=new Date().toDateString();

  function baseState(s){
    const done=s.habits.filter(h=>h.done&&h.lastDate===today).length;
    if(done===0&&s.habits.length>0)return"weak";
    const pct=Math.min(100,Math.round((s.finances.currentSavings/s.finances.savingsGoal)*100));
    if(pct>=100)return"celebrate";
    return"idle";
  }
  function pulse(st,ms=2200){
    setAvSt(st);
    setTimeout(()=>setAvSt(s=>baseState(S)),ms);
  }
  useEffect(()=>setAvSt(baseState(S)),[S]);

  function toast(msg){const id=++tid.current;setToasts(t=>[...t,{id,msg}]);}
  function rmToast(id){setToasts(t=>t.filter(x=>x.id!==id));}

  function addXP(amt,reason){
    setS(s=>({...s,xp:s.xp+amt}));
    toast(`+${amt} XP — ${reason}`);
    pulse("celebrate",2000);
  }
  function unlockBadge(bid){
    if(S.badges.includes(bid))return;
    const b=BADGES.find(x=>x.id===bid);
    setS(s=>({...s,badges:[...s.badges,bid],xp:s.xp+b.xp}));
    toast(`Logro: ${b.label} +${b.xp} XP`);
    pulse("celebrate",2500);
  }
  function toggleHabit(id){
    const h=S.habits.find(x=>x.id===id);
    const was=h.done&&h.lastDate===today;
    setS(s=>({...s,habits:s.habits.map(x=>x.id!==id?x:was?{...x,done:false,streak:Math.max(0,x.streak-1)}:{...x,done:true,lastDate:today,streak:x.streak+1})}));
    if(!was){
      addXP(20,`Hábito: ${h.name}`);
      pulse("exercise",2200);
      if(!S.badges.includes("first_task"))unlockBadge("first_task");
      const cnt=S.habits.filter(x=>x.done).length+1;
      if(cnt>=5)unlockBadge("consistent");
    }else pulse("weak",1500);
  }
  function addHabit(n){if(!n.trim())return;setS(s=>({...s,habits:[...s.habits,{id:Date.now(),name:n.trim(),streak:0,done:false,lastDate:null}]}));}
  function addTransaction(type,amount,label){
    const amt=parseFloat(amount);if(!amt||!label.trim())return;
    setS(s=>{const f={...s.finances};
      if(type==="income"){f.income+=amt;f.currentSavings+=amt*0.3;}
      else{f.expenses=[...(f.expenses||[]),{label,amount:amt}];f.currentSavings=Math.max(0,f.currentSavings-amt*0.1);}
      f.transactions=[{type,amt,label,date:new Date().toLocaleDateString("es-CO")},...(f.transactions||[])].slice(0,20);
      return{...s,finances:f};
    });
    addXP(10,"Finanza registrada");pulse("save",2200);
    if(S.finances.currentSavings>=S.finances.savingsGoal)unlockBadge("saver");
  }
  function addProject(name,type){
    if(!name.trim())return;
    setS(s=>({...s,projects:[...s.projects,{id:Date.now(),name:name.trim(),type,tasks:[],status:"En progreso"}]}));
    addXP(15,`Proyecto: ${name}`);pulse("work",1800);
  }
  function addTask(pid,tn){
    if(!tn.trim())return;
    setS(s=>({...s,projects:s.projects.map(p=>p.id!==pid?p:{...p,tasks:[...p.tasks,{id:Date.now(),name:tn.trim(),done:false}]})}));
    pulse("work",1000);
  }
  function toggleTask(pid,tid2){
    const proj=S.projects.find(p=>p.id===pid),task=proj?.tasks.find(t=>t.id===tid2);
    setS(s=>({...s,projects:s.projects.map(p=>{
      if(p.id!==pid)return p;
      const tasks=p.tasks.map(t=>t.id===tid2?{...t,done:!t.done}:t);
      return{...p,tasks,status:tasks.length&&tasks.every(t=>t.done)?"Completado":"En progreso"};
    })}));
    if(task&&!task.done){
      addXP(25,`Tarea: ${task.name}`);pulse("work",1500);
      if(!S.badges.includes("first_task"))unlockBadge("first_task");
      const up={...proj,tasks:proj.tasks.map(t=>t.id===tid2?{...t,done:true}:t)};
      if(up.tasks.every(t=>t.done))unlockBadge("finisher");
    }
  }
  function addGoal(name,target){
    if(!name.trim())return;
    setS(s=>({...s,goals:[...s.goals,{id:Date.now(),name:name.trim(),target:parseInt(target)||100,progress:0}]}));
    addXP(20,`Meta: ${name}`);
  }
  function updateGoal(id,delta){
    setS(s=>({...s,goals:s.goals.map(g=>g.id!==id?g:{...g,progress:Math.min(g.target,g.progress+delta)})}));
    addXP(15,"Avance en meta");
    const g=S.goals.find(x=>x.id===id);
    if(g&&g.progress+delta>=g.target)unlockBadge("goal_crusher");
  }

  const lvl=getLvl(S.xp);
  const todayDone=S.habits.filter(h=>h.done&&h.lastDate===today).length;
  const savPct=Math.min(100,Math.round((S.finances.currentSavings/S.finances.savingsGoal)*100));
  const tabs=[{id:"dashboard",label:"Dashboard"},{id:"habits",label:"Hábitos"},{id:"finance",label:"Finanzas"},{id:"projects",label:"Proyectos"},{id:"goals",label:"Metas"},{id:"badges",label:"Logros"}];
  const avLabel={idle:"En espera...",exercise:"¡Ejercitándose!",work:"¡En modo trabajo!",save:"¡Guardando dinero!",celebrate:"¡Logrando metas!",weak:"Necesita atención..."}[avSt];

  return(
    <div style={{background:C.bg,minHeight:"100vh",padding:"0 0 3rem",color:C.text,fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <style>{DS}</style>
      {toasts.map(t=><XPToast key={t.id} msg={t.msg} onDone={()=>rmToast(t.id)}/>)}

      {/* ── HEADER ── */}
      <div style={{background:`linear-gradient(180deg,#1E1B4B 0%,${C.bg} 100%)`,borderBottom:`0.5px solid ${C.border}`,padding:"1.25rem 1.5rem 1rem",marginBottom:16}}>
        <div style={{maxWidth:820,margin:"0 auto",display:"flex",gap:20,alignItems:"flex-end",flexWrap:"wrap"}}>
          {/* avatar */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:110}}>
            <Avatar state={avSt} level={lvl.level} size={100}/>
            <div className="bubble" style={{marginTop:6,fontSize:11,color:avSt==="weak"?C.habit:avSt==="celebrate"?C.badge:C.xp,borderColor:avSt==="celebrate"?C.badge+"44":avSt==="weak"?C.habit+"44":C.xp+"44"}}>
              {avLabel}
            </div>
          </div>
          {/* info */}
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:10,color:C.xp,letterSpacing:2,textTransform:"uppercase",fontWeight:500}}>Elevate OS</p>
            <h1 style={{margin:"2px 0 10px",fontSize:24,fontWeight:500,color:C.text}}>Hola, Juan</h1>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
              {[
                {label:"Nivel",val:`${lvl.level} — ${lvl.name}`,col:C.xp},
                {label:"XP Total",val:S.xp.toLocaleString(),col:C.xp},
                {label:"Hábitos hoy",val:`${todayDone}/${S.habits.length}`,col:C.habit},
                {label:"Logros",val:`${S.badges.length}/${BADGES.length}`,col:C.badge},
              ].map(m=>(
                <div key={m.label} className="met" style={{padding:"8px 14px",minWidth:90}}>
                  <p style={{margin:0,fontSize:10,color:C.textMuted}}>{m.label}</p>
                  <p style={{margin:"3px 0 0",fontSize:17,fontWeight:500,color:m.col}} className="glow-text">{m.val}</p>
                </div>
              ))}
            </div>
            {/* XP bar */}
            <div style={{maxWidth:360}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:11,color:C.textMuted}}>Nivel {lvl.next?.level||"MAX"}: {lvl.next?.name||"Máximo"}</span>
                <span style={{fontSize:11,color:C.xp,fontWeight:500}}>{lvl.pct}%</span>
              </div>
              <div className="pbar" style={{height:10}}>
                <div className="pfill" style={{width:`${lvl.pct}%`,background:`linear-gradient(90deg,${C.xpD},${C.xp})`,boxShadow:`0 0 8px ${C.xpGlow}`}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:820,margin:"0 auto",padding:"0 1rem"}}>
        {/* ── TABS ── */}
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:20}}>
          {tabs.map(t=><button key={t.id} className={`tab${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
        </div>

        {tab==="dashboard"&&<Dashboard S={S} today={today} todayDone={todayDone} savPct={savPct} lvl={lvl} onToggle={toggleHabit}/>}
        {tab==="habits"&&<HabitsTab habits={S.habits} today={today} onToggle={toggleHabit} onAdd={addHabit}/>}
        {tab==="finance"&&<FinanceTab finances={S.finances} onAdd={addTransaction} onGoal={g=>setS(s=>({...s,finances:{...s.finances,savingsGoal:parseFloat(g)}}))}/>}
        {tab==="projects"&&<ProjectsTab projects={S.projects} onAdd={addProject} onAddTask={addTask} onToggle={toggleTask}/>}
        {tab==="goals"&&<GoalsTab goals={S.goals} onAdd={addGoal} onUpdate={updateGoal}/>}
        {tab==="badges"&&<BadgesTab earned={S.badges}/>}
      </div>
    </div>
  );
}

/* ── DASHBOARD ── */
function Dashboard({S,today,todayDone,savPct,lvl,onToggle}){
  const active=S.projects.filter(p=>p.status!=="Completado").length;
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:16}}>
        {[
          {label:"Ahorro",val:`${savPct}%`,col:C.finance,sub:"de la meta"},
          {label:"Proyectos",val:active,col:C.project,sub:"activos"},
          {label:"Metas",val:S.goals.length,col:C.goal,sub:"en curso"},
          {label:"Racha máx.",val:`${Math.max(0,...S.habits.map(h=>h.streak))} días`,col:C.habit,sub:"hábitos"},
        ].map(m=>(
          <div key={m.label} className="met">
            <p style={{margin:0,fontSize:11,color:C.textMuted}}>{m.label}</p>
            <p style={{margin:"4px 0 2px",fontSize:22,fontWeight:500,color:m.col}} className="glow-text">{m.val}</p>
            <p style={{margin:0,fontSize:11,color:C.textDim}}>{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="card-glow">
        <p style={{margin:"0 0 12px",fontSize:13,fontWeight:500,color:C.text}}>Hábitos de hoy</p>
        {S.habits.map(h=>(
          <div key={h.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`0.5px solid ${C.border}`}}>
            <div className={`chk${h.done&&h.lastDate===today?" on":""}`} onClick={()=>onToggle(h.id)}>
              {h.done&&h.lastDate===today?"✓":""}
            </div>
            <span style={{flex:1,fontSize:14,color:C.text}}>{h.name}</span>
            <span style={{fontSize:12,color:C.habit}}>🔥 {h.streak}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <p style={{margin:"0 0 12px",fontSize:13,fontWeight:500,color:C.text}}>Proyectos activos</p>
        {S.projects.slice(0,4).map(p=>{
          const d=p.tasks.filter(t=>t.done).length;
          const pct=p.tasks.length?Math.round((d/p.tasks.length)*100):0;
          return(
            <div key={p.id} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:13,color:C.text}}>{p.name}</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span className="tag" style={{background:TS[p.type].bg,color:TS[p.type].text}}>{p.type}</span>
                  <span style={{fontSize:12,color:C.textMuted}}>{pct}%</span>
                </div>
              </div>
              <div className="pbar"><div className="pfill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${C.projectD},${C.project})`,boxShadow:`0 0 6px ${C.project}66`}}/></div>
            </div>
          );
        })}
        {!S.projects.length&&<p style={{fontSize:13,color:C.textMuted,margin:0}}>Sin proyectos aún.</p>}
      </div>
    </div>
  );
}

/* ── HABITS TAB ── */
function HabitsTab({habits,today,onToggle,onAdd}){
  const[name,setName]=useState("");
  const done=habits.filter(h=>h.done&&h.lastDate===today).length;
  const avSt=done===0&&habits.length>0?"weak":done>=habits.length&&habits.length>0?"celebrate":"exercise";
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 160px",gap:16,alignItems:"start"}}>
      <div>
        <div className="card-glow">
          <p style={{margin:"0 0 12px",fontSize:13,fontWeight:500,color:C.text}}>Mis hábitos diarios</p>
          {habits.map(h=>(
            <div key={h.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`0.5px solid ${C.border}`}}>
              <div className={`chk${h.done&&h.lastDate===today?" on":""}`} onClick={()=>onToggle(h.id)} style={{width:28,height:28}}>{h.done&&h.lastDate===today?"✓":""}</div>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:14,color:C.text}}>{h.name}</p>
                <p style={{margin:0,fontSize:11,color:C.textMuted}}>Racha: {h.streak} días</p>
              </div>
              <div style={{display:"flex",gap:3}}>
                {Array.from({length:Math.min(h.streak,7)}).map((_,i)=>(
                  <div key={i} style={{width:7,height:7,borderRadius:"50%",background:C.habit,boxShadow:`0 0 4px ${C.habit}88`}}/>
                ))}
              </div>
            </div>
          ))}
          <div style={{display:"flex",gap:8,marginTop:14}}>
            <input className="inp" style={{flex:1}} placeholder="Nuevo hábito..." value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){onAdd(name);setName("");}}}/>
            <button className="btn-primary" onClick={()=>{onAdd(name);setName("");}}>Agregar</button>
          </div>
        </div>
      </div>
      <AvatarPanel state={avSt} label={avSt==="celebrate"?"¡Todos completos!":avSt==="weak"?"¡Completa hábitos!":"Sigue así..."}/>
    </div>
  );
}

/* ── FINANCE TAB ── */
function FinanceTab({finances,onAdd,onGoal}){
  const[type,setType]=useState("income");
  const[amt,setAmt]=useState("");
  const[lbl,setLbl]=useState("");
  const[goalInp,setGoalInp]=useState("");
  const savPct=Math.min(100,Math.round((finances.currentSavings/finances.savingsGoal)*100));
  const totalExp=(finances.expenses||[]).reduce((a,e)=>a+e.amount,0);
  const avSt=savPct>=100?"celebrate":savPct>0?"save":"idle";
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 160px",gap:16,alignItems:"start"}}>
      <div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
          {[{l:"Ingresos",v:`$${finances.income.toLocaleString("es-CO")}`,c:C.finance},{l:"Gastos",v:`$${totalExp.toLocaleString("es-CO")}`,c:C.habit},{l:"Ahorro",v:`$${Math.round(finances.currentSavings).toLocaleString("es-CO")}`,c:C.xp}].map(m=>(
            <div key={m.l} className="met"><p style={{margin:0,fontSize:10,color:C.textMuted}}>{m.l}</p><p style={{margin:"4px 0 0",fontSize:16,fontWeight:500,color:m.c}} className="glow-text">{m.v}</p></div>
          ))}
        </div>
        <div className="card-glow">
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <p style={{margin:0,fontSize:13,fontWeight:500,color:C.text}}>Meta de ahorro</p>
            <span style={{fontSize:12,color:C.textMuted}}>${Math.round(finances.savingsGoal).toLocaleString("es-CO")}</span>
          </div>
          <div className="pbar" style={{height:12,marginBottom:6}}>
            <div className="pfill" style={{width:`${savPct}%`,background:`linear-gradient(90deg,${C.financeD},${C.finance})`,boxShadow:`0 0 8px ${C.finance}66`}}/>
          </div>
          <p style={{margin:"0 0 10px",fontSize:12,color:C.textMuted}}>{savPct}% completado</p>
          <div style={{display:"flex",gap:8}}>
            <input className="inp" style={{flex:1}} placeholder="Nueva meta ($)" value={goalInp} onChange={e=>setGoalInp(e.target.value)}/>
            <button className="btn" onClick={()=>{if(goalInp){onGoal(goalInp);setGoalInp("");}}}>Actualizar</button>
          </div>
        </div>
        <div className="card">
          <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:C.text}}>Registrar movimiento</p>
          <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
            <select value={type} onChange={e=>setType(e.target.value)}><option value="income">Ingreso</option><option value="expense">Gasto</option></select>
            <input className="inp" style={{flex:1,minWidth:100}} placeholder="Descripción" value={lbl} onChange={e=>setLbl(e.target.value)}/>
            <input className="inp" style={{width:110}} placeholder="Monto" type="number" value={amt} onChange={e=>setAmt(e.target.value)}/>
            <button className="btn-primary" onClick={()=>{onAdd(type,amt,lbl);setAmt("");setLbl("");}}>+</button>
          </div>
          {(finances.transactions||[]).slice(0,8).map((t,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:13}}>
              <span style={{color:C.textMuted,minWidth:70}}>{t.date}</span>
              <span style={{flex:1,margin:"0 12px",color:C.text}}>{t.label}</span>
              <span style={{color:t.type==="income"?C.finance:C.habit,fontWeight:500}}>{t.type==="income"?"+":"-"}${t.amt.toLocaleString("es-CO")}</span>
            </div>
          ))}
        </div>
      </div>
      <AvatarPanel state={avSt} label={avSt==="celebrate"?"¡Meta alcanzada!":avSt==="save"?"¡Guardando dinero!":"Registra movimientos"}/>
    </div>
  );
}

/* ── PROJECTS TAB ── */
function ProjectsTab({projects,onAdd,onAddTask,onToggle}){
  const[name,setName]=useState("");
  const[type,setType]=useState("Elevate Zeven");
  const[tInps,setTInps]=useState({});
  const[exp,setExp]=useState(null);
  const grouped=PT.reduce((a,t)=>{a[t]=projects.filter(p=>p.type===t);return a;},{});
  const hasActive=projects.some(p=>p.status!=="Completado");
  const avSt=projects.length===0?"idle":hasActive?"work":"celebrate";
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 160px",gap:16,alignItems:"start"}}>
      <div>
        <div className="card">
          <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:C.text}}>Nuevo proyecto</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <select value={type} onChange={e=>setType(e.target.value)}>{PT.map(t=><option key={t}>{t}</option>)}</select>
            <input className="inp" style={{flex:1,minWidth:110}} placeholder="Nombre del proyecto" value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){onAdd(name,type);setName("");}}}/>
            <button className="btn-primary" onClick={()=>{onAdd(name,type);setName("");}}>Crear</button>
          </div>
        </div>
        {PT.map(t=>grouped[t].length>0&&(
          <div key={t}>
            <p className="section-title">{t}</p>
            {grouped[t].map(p=>{
              const d=p.tasks.filter(t=>t.done).length;
              const pct=p.tasks.length?Math.round((d/p.tasks.length)*100):0;
              const isOpen=exp===p.id;
              return(
                <div key={p.id} className="card">
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:14,fontWeight:500,color:C.text}}>{p.name}</span>
                      <span className="tag" style={{background:TS[p.type].bg,color:TS[p.type].text}}>{p.type}</span>
                    </div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:12,color:C.textMuted}}>{d}/{p.tasks.length}</span>
                      <button className="btn" style={{padding:"4px 10px",fontSize:12}} onClick={()=>setExp(isOpen?null:p.id)}>{isOpen?"Cerrar":"Ver"}</button>
                    </div>
                  </div>
                  <div className="pbar">
                    <div className="pfill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${C.projectD},${C.project})`,boxShadow:`0 0 6px ${C.project}55`}}/>
                  </div>
                  {isOpen&&(
                    <div style={{marginTop:12}}>
                      {p.tasks.map(task=>(
                        <div key={task.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`0.5px solid ${C.border}`}}>
                          <div className={`chk${task.done?" on":""}`} onClick={()=>onToggle(p.id,task.id)} style={{width:20,height:20,fontSize:11}}>{task.done?"✓":""}</div>
                          <span style={{fontSize:13,textDecoration:task.done?"line-through":"none",color:task.done?C.textDim:C.text}}>{task.name}</span>
                        </div>
                      ))}
                      <div style={{display:"flex",gap:8,marginTop:10}}>
                        <input className="inp" style={{flex:1}} placeholder="Nueva tarea..." value={tInps[p.id]||""} onChange={e=>setTInps(x=>({...x,[p.id]:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter"){onAddTask(p.id,tInps[p.id]||"");setTInps(x=>({...x,[p.id]:""}));}}}/>
                        <button className="btn" onClick={()=>{onAddTask(p.id,tInps[p.id]||"");setTInps(x=>({...x,[p.id]:""}));}}>+</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {!projects.length&&<p style={{fontSize:13,color:C.textMuted}}>Sin proyectos aún.</p>}
      </div>
      <AvatarPanel state={avSt} label={avSt==="celebrate"?"¡Todo completado!":avSt==="work"?"¡Modo trabajo ON!":"Crea un proyecto"}/>
    </div>
  );
}

/* ── GOALS TAB ── */
function GoalsTab({goals,onAdd,onUpdate}){
  const[name,setName]=useState("");
  const[target,setTarget]=useState("100");
  const allDone=goals.length>0&&goals.every(g=>g.progress>=g.target);
  const avSt=goals.length===0?"idle":allDone?"celebrate":"work";
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 160px",gap:16,alignItems:"start"}}>
      <div>
        <div className="card">
          <p style={{margin:"0 0 10px",fontSize:13,fontWeight:500,color:C.text}}>Nueva meta</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <input className="inp" style={{flex:1,minWidth:110}} placeholder="Nombre de la meta" value={name} onChange={e=>setName(e.target.value)}/>
            <input className="inp" style={{width:90}} placeholder="Total" type="number" value={target} onChange={e=>setTarget(e.target.value)}/>
            <button className="btn-primary" onClick={()=>{onAdd(name,target);setName("");setTarget("100");}}>Crear</button>
          </div>
        </div>
        {goals.map(g=>{
          const pct=Math.round((g.progress/g.target)*100);
          const done=g.progress>=g.target;
          return(
            <div key={g.id} className={done?"card-glow":"card"}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:14,fontWeight:500,color:done?C.goal:C.text}}>{g.name}</span>
                <span style={{fontSize:13,color:C.textMuted}}>{g.progress}/{g.target}</span>
              </div>
              <div className="pbar" style={{marginBottom:10}}>
                <div className="pfill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${C.goalD},${C.goal})`,boxShadow:done?`0 0 8px ${C.goal}88`:"none"}}/>
              </div>
              {!done&&<div style={{display:"flex",gap:8}}>
                {[5,10,25].map(d=><button key={d} className="btn" onClick={()=>onUpdate(g.id,d)}>+{d}</button>)}
              </div>}
              {done&&<p style={{margin:0,fontSize:12,color:C.goal}} className="glow-text">¡Meta completada!</p>}
            </div>
          );
        })}
        {!goals.length&&<p style={{fontSize:13,color:C.textMuted}}>Sin metas aún.</p>}
      </div>
      <AvatarPanel state={avSt} label={avSt==="celebrate"?"¡Metas logradas!":avSt==="work"?"¡Avanzando!":"Define tus metas"}/>
    </div>
  );
}

/* ── BADGES TAB ── */
function BadgesTab({earned}){
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:24}}>
        {BADGES.map(b=>{
          const done=earned.includes(b.id);
          return(
            <div key={b.id} className={done?"card-glow":"card"} style={{opacity:done?1:0.4,textAlign:"center",transition:"opacity 0.3s"}}>
              <div style={{fontSize:30,marginBottom:8,color:done?C.badge:C.textDim}}>{b.icon}</div>
              <p style={{margin:"0 0 4px",fontSize:14,fontWeight:500,color:done?C.text:C.textMuted}}>{b.label}</p>
              <p style={{margin:"0 0 10px",fontSize:11,color:C.textMuted}}>{b.desc}</p>
              <span className="tag" style={{background:done?"#4A1A3A":C.bg3,color:done?C.badge:C.textDim}}>+{b.xp} XP</span>
            </div>
          );
        })}
      </div>
      {earned.length>0&&<div style={{textAlign:"center"}}>
        <Avatar state="celebrate" level={1} size={120}/>
        <p style={{fontSize:13,color:C.textMuted,marginTop:8}}>¡Sigue desbloqueando logros!</p>
      </div>}
    </div>
  );
}

/* ── AVATAR PANEL (sidebar) ── */
function AvatarPanel({state,label}){
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,paddingTop:8}}>
      <div style={{background:C.bg2,border:`0.5px solid ${C.border}`,borderRadius:14,padding:"16px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:"0 0 20px #00000055"}}>
        <Avatar state={state} level={1} size={130}/>
        <div style={{background:C.bg,border:`0.5px solid ${C.border}`,borderRadius:8,padding:"5px 12px",fontSize:11,color:state==="weak"?C.habit:state==="celebrate"?C.badge:C.xp,textAlign:"center",width:"100%",boxSizing:"border-box"}}>
          {label}
        </div>
      </div>
    </div>
  );
}
