"use client";

import type { ReactNode } from "react";
import type { VisualKind } from "@/data/problems/nagy-zh1";
import type { TeachingStep } from "@/data/problems/nagy-zh1-beginner";
import styles from "./MasterGuide.module.css";

const green = "#d7f36b", blue = "#a5d4ff", orange = "#e8a180", dim = "#688174", white = "#e8eee3";
const fmt = (v: number, digits = 3) => v.toLocaleString("hu-HU", { maximumFractionDigits: digits });
function fact(n: number) { let v=1; for(let i=2;i<=n;i++) v*=i; return v; }
function bin(k:number,n:number,p:number) { return fact(n)/fact(k)/fact(n-k)*p**k*(1-p)**(n-k); }
function label(x:number,y:number,text:string,color=white,size=15) { return <text x={x} y={y} textAnchor="middle" fill={color} fontSize={size}>{text}</text>; }
function Drawing({ title, children }: {title:string;children:ReactNode}) {
  return <svg viewBox="0 0 520 300" role="img" aria-label={title}><title>{title}</title>{children}</svg>;
}
function Flow({items}: {items:string[]}) { return <div className={styles.teachingFlow}>{items.map((text,i)=><div key={`${i}-${text}`}><span>{i ? "→" : "●"}</span><strong>{text}</strong></div>)}</div>; }
function BarPlot({values,active,title,labels}: {values:number[];active:(i:number)=>boolean;title:string;labels?:string[]}) {
  const maximum=Math.max(...values);
  const w=440/values.length;
  return <Drawing title={title}><line x1="45" x2="490" y1="245" y2="245" stroke={dim}/>{label(35,248,"0",dim,12)}{label(45,30,`P max. ${fmt(maximum)}`,dim,12)}
    {values.map((v,i)=><g key={i}><rect x={48+i*w} y={245-v/maximum*185} width={w*.7} height={v/maximum*185} rx="2" fill={active(i)?green:dim} opacity={active(i)?1:.4}/>{label(48+i*w+w*.35,267,labels?.[i]??String(i),active(i)?green:dim,12)}</g>)}{label(260,293,labels?"Vízszintesen: X értéke · magasság: az esély":"Vízszintesen: darabszám · magasság: az esély",white,13)}
  </Drawing>;
}

export function TeachingVisual({kind,current,step,total}: {kind:VisualKind;current:TeachingStep;step:number;total:number}) {
  const scene=current.scene;
  let graphic:ReactNode;
  let caption="";

  if(kind==="venn") {
    const center=step>=1, pairs=step>=2, singles=step>=3;
    const cells:[number,number,string,boolean,boolean][]=[[165,103,"20",singles,scene==="union"],[355,103,"15",singles,scene==="union"],[260,245,"10",singles,scene==="union"],[260,75,"15",pairs,["pairs","union","outside"].includes(scene)],[207,176,"10",pairs,["pairs","union","outside"].includes(scene)],[313,176,"5",pairs,["pairs","union","outside"].includes(scene)],[260,141,"5",center,scene==="center"||scene==="union"]];
    graphic=<><Drawing title={`Venn-diagram építése: ${current.title}`}><rect x="30" y="8" width="460" height="277" rx="5" fill={scene==="outside"?"#33472e":"none"} stroke={dim}/>
      <circle cx="208" cy="111" r="87" fill={blue} fillOpacity=".1" stroke={blue}/><circle cx="312" cy="111" r="87" fill={green} fillOpacity=".1" stroke={green}/><circle cx="260" cy="194" r="87" fill={orange} fillOpacity=".1" stroke={orange}/>
      {label(115,25,"A: angol · 50",blue,13)}{label(400,25,"B: német · 40",green,13)}{label(393,266,"C: francia · 30",orange,13)}
      {cells.map(([x,y,text,shown,focus],i)=><g key={i}><circle cx={x} cy={y-5} r="17" fill={focus?green:"#1c2a24"}/>{label(x,y,shown?text:"?",focus?"#17251c":shown?white:dim,16)}</g>)}
      {label(90,265,scene==="outside"?"Kívül: 20":"Kívül: ?",scene==="outside"?green:dim,13)}
    </Drawing><Flow items={scene==="setup"?["100 ember összesen","A, B, C átfedhet"]:scene==="center"?["Mindhárom nyelv","Középre: 5"]:scene==="pairs"?["20 − 5 = 15","15 − 5 = 10","10 − 5 = 5"]:scene==="singles"?["Csak A: 20","Csak B: 15","Csak C: 10"]:scene==="union"?["7 különálló rész","Összegük: 80"]:["Két nyelv: 15+10+5=30","Kívül: 100−80=20"]}/></>;
    caption="A ? még ki nem számolt részt jelöl. Léptetéskor előbb a közép, aztán a páros és az egyes részek telnek ki. A világos korongok az éppen használt részek.";
  } else if(kind==="counting") {
    if(scene==="unordered") {
      graphic=<><div className={styles.permutations}>{["P1 · P2 · K1","P1 · K1 · P2","P2 · P1 · K1","P2 · K1 · P1","K1 · P1 · P2","K1 · P2 · P1"].map(text=><span key={text}>{text}</span>)}</div><Flow items={["6 sorrend, ugyanaz a 3 golyó","720 ÷ 6 = 120 hármas"]}/></>;
    } else if(scene==="redpairs") {
      const pairs=Array.from({length:6},(_,i)=>Array.from({length:5-i},(_,j)=>[i+1,i+j+2])).flat();
      graphic=<><div className={styles.pairGrid}>{pairs.map(([a,b])=><span key={`${a}-${b}`}>P{a} + P{b}</span>)}</div><Flow items={["6×5 = 30 sorrendes pár","Minden pár kétszer","30÷2 = 15 pár"]}/></>;
    } else if(scene==="favorable"||scene==="ratio") {
      const ratio=scene==="ratio";
      graphic=<><Drawing title={ratio?"120 lehetőségből 60 jó, a jelölt 60 cella a kedvező hármasokat jelenti":"A 15 piros párhoz egyenként 4 kék választás tartozik: 60 kedvező hármas"}>
        {Array.from({length:ratio?120:60},(_,i)=><rect key={i} x={40+(i%15)*30} y={35+Math.floor(i/15)*27} width="24" height="20" rx="2" fill={i<60?green:dim} opacity={i<60?1:.35}/>)}{label(260,285,ratio?"60 világos + 60 egyéb = 120 összes":"4 sor × 15 piros pár = 60 kedvező hármas",white,14)}
      </Drawing><Flow items={ratio?["60 kedvező / 120 összes","1/2 = 50%"]:["15 piros pár","Mindegyik mellé 4 kék","15×4=60"]}/></>;
    } else {
      graphic=<><div className={styles.balls}>{Array.from({length:10},(_,i)=><span key={i} className={i<6?styles.redBall:styles.blueBall}>{i<6?`P${i+1}`:`K${i-5}`}</span>)}</div><Flow items={scene==="ordered"?["1. hely: 10 lehetőség","2. hely: 9","3. hely: 8","10×9×8=720"]:["6 piros + 4 kék = 10","Keresünk: 2 piros + 1 kék"]}/></>;
    }
    caption="P: piros golyó, K: kék golyó, a szám az adott példány neve. Az ábra mindig az aktuális számlálási műveletre vált; a 120 cellás összefoglalóban egy cella egy hármast képvisel.";
  } else if(kind==="geometry") {
    const diagonal=step>=1, band=step>=2, triangles=step>=3, area=step>=4, result=scene==="result";
    graphic=<><Drawing title={`Geometriai megoldás: ${current.title}`}>
      <rect x="150" y="28" width="220" height="220" fill={band?green:"#2b3b31"} fillOpacity={band?.45:1}/>
      {band?<><path d="M150 28H296.667L150 174.667Z M370 248H223.333L370 101.333Z" fill={result?dim:orange} fillOpacity={result?.3:.65}/><path d="M150 174.667L296.667 28M223.333 248L370 101.333" stroke={orange} strokeWidth="2"/></>:null}
      <rect x="150" y="28" width="220" height="220" fill="none" stroke={white}/>{diagonal?<path d="M150 248L370 28" stroke={blue} strokeDasharray="5 5" strokeWidth="2"/>:null}
      {label(135,265,"0",white,13)}{label(382,265,"1 / X",white,13)}{label(120,35,"Y / 1",white,13)}
      {band?label(260,146,result?"Jó: 5/9":"Jó sáv",result?green:white,16):label(260,146,"Teljes terület: 1",white,15)}
      {triangles?<>{label(215,18,"Befogó: 2/3",orange,13)}{label(303,279,"Befogó: 2/3",orange,13)}</>:null}
      {area?<>{label(190,80,"2/9",white,18)}{label(331,206,"2/9",white,18)}</>:null}
    </Drawing><Flow items={scene==="setup"?["Szélesség 1 × magasság 1","Teljes terület: 1"]:scene==="diagonal"?["Átló: X=Y","Eltérés: 0"]:scene==="band"?["Alsó határ: Y=X−1/3","Felső határ: Y=X+1/3"]:scene==="triangles"?["Teljes oldal: 1","1−1/3=2/3"]:scene==="area"?["Egy sarok: (2/3×2/3)÷2=2/9","Két sarok: 4/9"]:["Teljes 9/9 − rossz 4/9","Jó 5/9 → 55,56%"]}/></>;
    caption="A négyzet az összes pontot jelenti. Előbb az átló jelenik meg, majd a két határvonal, utána a rossz sarkok méretei és területe. A végén a maradó jó sáv adja a választ.";
  } else if(kind==="bayes") {
    const first=step>=1, second=step>=2, result=scene==="result";
    graphic=<><Drawing title={`Valószínűségi fa: ${current.title}`}><g fill="none" stroke={dim} strokeWidth="2"><path d="M70 143L205 75M70 143L205 215"/><path d="M205 75L380 40" stroke={first?green:dim}/><path d="M205 215L380 180" stroke={second?orange:dim}/><path d="M205 75L380 110M205 215L380 250" opacity={result?.2:.7}/></g>
      {label(63,138,"Összes",white,14)}{label(175,52,"G₁ · 0,4",blue)}{label(175,242,"G₂ · 0,6",blue)}
      {label(286,39,"× 0,08",first?green:dim,14)}{label(286,175,"× 0,02",second?orange:dim,14)}
      {label(420,45,first?"H: 0,032":"H: ?",first?green:dim,14)}{label(420,185,second?"H: 0,012":"H: ?",second?orange:dim,14)}
      {label(420,115,"Jó termék",dim,13)}{label(420,255,"Jó termék",dim,13)}
    </Drawing>{result?<div className={styles.hundredGrid} aria-label="44 várható hibás termékből 32 az I. gépé és 12 a II. gépé">{Array.from({length:44},(_,i)=><i key={i} style={{background:i<32?green:orange}}/>)}</div>:null}
      <Flow items={scene==="setup"?["G₁: az összes 40%-a","G₂: az összes 60%-a"]:scene==="first"?["Összes → 0,4 rész","Ennek 0,08 része","0,032 közös esély"]:scene==="second"?["Összes → 0,6 rész","Ennek 0,02 része","0,012 közös esély"]:scene==="total"?["Hibás ágak: 0,032+0,012","Összes hibás: 0,044"]:["32 az I. gépé / 44 hibás","8/11 ≈ 72,73%"]}/></>;
    caption=result?"A fán a két hibás ág marad hangsúlyos. Alatta 1000 termékre vetített várható hibás darabok: 32 zöld és 12 narancs. Ez a 44-es nevező, a zöld 32 a számláló.":"A feltétel irányát követjük: először gépet választunk, azon belül hibás terméket. A ? az ág még ki nem számolt közös esélye; a jó ágakat nem kell a hibás nevezőbe összeadni.";
  } else if(kind==="cdf") {
    if(scene==="setup"||scene==="interval") {
      graphic=<><BarPlot values={[.25,.5,.25]} labels={["0","2","4"]} active={i=>scene==="setup"||i<2} title="A 0, 2, 4 értékek esélyei: 1/4, 1/2, 1/4"/><Flow items={scene==="setup"?["X=0 → 1/4","X=2 → 1/2","X=4 → 1/4"]:["X=0 és X=2 jó","1/4+1/2=3/4","X=4 nincs benne"]}/></>;
    } else {
      graphic=<><Drawing title="F(x)=P(X<x), lépcsős függvény; telt pont az érvényes végpont, üres pont a kizárt végpont">
        <path d="M45 240H480M95 255V25" stroke={dim} fill="none"/><path d="M45 240H95M95 192.5H255" stroke={green} fill="none" strokeWidth="3"/>
        {step>=2?<path d="M255 97.5H415M415 50H480" stroke={green} fill="none" strokeWidth="3"/>:null}
        {[[95,240],[255,192.5],...(step>=2?[[415,97.5]]:[])].map(([x,y])=><circle key={x} cx={x} cy={y} r="5" fill={green}/>)}
        {[[95,192.5],...(step>=2?[[255,97.5],[415,50]]:[])].map(([x,y])=><circle key={x} cx={x} cy={y} r="5" fill="#1c2a24" stroke={green} strokeWidth="2"/>)}
        {label(72,196,"1/4",white,13)}{step>=2?<>{label(72,101,"3/4",white,13)}{label(72,54,"1",white,13)}</>:null}{label(95,278,"0",white,14)}{label(255,278,"2",white,14)}{label(415,278,"4",white,14)}
        {scene==="jump"?<><path d="M281 192.5V97.5M273 192.5H289M273 97.5H289" stroke={orange} strokeWidth="3"/>{label(355,150,"Ugrás: 1/2",orange,15)}</>:null}
      </Drawing><Flow items={scene==="first"?["x≤0: még semmi","0<x≤2: csak X=0"]:scene==="all"?["2<x≤4: 1/4+1/2=3/4","x>4: 3/4+1/4=1"]:["F(2+)=3/4","F(2)=1/4","Különbség: 1/2"]}/></>;
    }
    caption="A CDF lépcsőmagassága összegzett esély; a CDF alatti területet nem használjuk valószínűségként. Intervallumvizsgálatnál ezért visszaváltunk az értékek saját esélyeinek oszlopaira.";
  } else if(kind==="moments") {
    const squared=scene==="squares", transformed=scene==="transform"||scene==="result";
    const variance=scene==="variance"||scene==="deviation";
    const x=transformed?[-1,5,11]:[0,2,4];
    const contributions=scene==="result"?[9,0,9]:variance?[1,0,1]:squared?[0,2,4]:transformed?[-.25,2.5,2.75]:[0,1,1];
    graphic=<><table className={styles.teachingTable}><caption>{scene==="setup"?"A megadott értékek és esélyük":variance?"Az átlagtól vett négyzetes eltérés súlyozása":scene==="result"?"Az új átlagtól vett négyzetes eltérés súlyozása":squared?"Négyzet, aztán súlyozás":transformed?"Az átalakított értékek súlyozása":"Minden érték a saját esélyével szorzódik"}</caption><thead><tr><th scope="col">{transformed?"Y":"X"}</th><th scope="col">Esély</th>{scene!=="setup"?<th scope="col">Hozzájárulás</th>:null}</tr></thead><tbody>{x.map((v,i)=><tr key={i}><th scope="row">{v}</th><td>{["1/4","1/2","1/4"][i]}</td>{scene!=="setup"?<td>{scene==="result"?`(${v}−5)² × ${["1/4","1/2","1/4"][i]}`:variance?`(${v}−2)² × ${["1/4","1/2","1/4"][i]}`:`${v}${squared?"²":""} × ${["1/4","1/2","1/4"][i]}`} = <strong>{fmt(contributions[i])}</strong></td>:null}</tr>)}</tbody></table>
      <Flow items={scene==="setup"?["0, 2, 4: értékek","1/4, 1/2, 1/4: súlyok"]:scene==="mean"?["0+1+1","E(X)=2"]:scene==="squares"?["0+2+4","E(X²)=6"]:scene==="variance"?["Steiner: 6−4=2","Ellenőrzés a táblából: 1+0+1=2"]:scene==="deviation"?["D²=2","√2 × √2 = 2","D=√2"]:scene==="transform"?["0,2,4 → −1,5,11","−0,25+2,5+2,75=5"]:["Eltérés háromszoros","Négyzetes eltérés 9-szeres","9+0+9=18"]}/></>;
    caption="A táblázat az adott lépéshez vált: előbb az eredeti értékeket, majd a négyzeteiket, az átlagtól való eltéréseket, végül az Y értékeit és eltéréseit súlyozzuk. A kiemelt hozzájárulások összege mindig ellenőrzi a levezetést.";
  } else if(kind==="binomial") {
    const graph=["exact","atleast","result"].includes(scene);
    graphic=graph?<><BarPlot values={Array.from({length:11},(_,k)=>bin(k,10,.2))} active={i=>scene==="exact"?i===3:scene==="atleast"?i>=1:i===2} title={scene==="atleast"?"A 0 sikert jelentő oszlop levonása után az összes pozitív sikerszám esélye marad":"Binomiális sikerszám: a lépéshez tartozó oszlop kiemelve"}/><Flow items={scene==="exact"?["120 sorrend × egy sorrend esélye","P(X=3)=0,201326592"]:scene==="atleast"?["Sötét: 0 siker, 0,8¹⁰","Világos: minden X≥1","Összegük: 1−0,8¹⁰"]:["Átlag: np=2","Szórásnégyzet: npq=1,6"]}/></>:<><div className={styles.trialStrip}>{Array.from({length:10},(_,i)=><span key={i} style={{borderColor:i<3?green:orange,color:i<3?green:orange}}><small>{i+1}. próba</small><b>{i<3?"S":"K"}</b>{step>=1?<small>{i<3?"0,2":"0,8"}</small>:null}</span>)}</div><Flow items={scene==="setup"?["S: siker; K: kudarc","X megszámolja az S-eket"]:scene==="failures"?["3 siker","10−3=7 kudarc","q=1−0,2=0,8"]:scene==="sequence"?["3 darab 0,2 szorzata","7 darab 0,8 szorzata","Egy sorrend: 0,0016777216"]:["10×9×8=720","3×2×1=6 sorrend / helyhármas","720÷6=120 helyhármas"]}/>{scene==="placements"?<div className={styles.sequenceExamples}><span>SSSKKKKKKK</span><span>SKSKSKKKKK</span><span>KKKKKKKSSS</span><small>3 példa a 120 elhelyezésből; mindegyikben 3 S és 7 K van.</small></div>:null}</>;
    caption="Az elején egyetlen konkrét próbasorozatot bontunk fel. Utána megszámoljuk a sikerhelyek elrendezéseit. Az oszlopdiagram csak ezután jelenik meg: egy oszlop már az adott sikerszám minden sorrendjének összesített esélye.";
  } else if(kind==="memory") {
    if(scene==="trials"||scene==="result") {
      graphic=<><div className={styles.trialStrip}>{Array.from({length:7},(_,i)=><span key={i} style={{borderColor:i<4?dim:green,color:i<4?dim:green}}><small>{i+1}. próba</small><b>K</b><small>{i<4?"Már ismert":"Új: 0,8"}</small></span>)}</div><Flow items={scene==="trials"?["4 ismert kudarc","3 újabb kudarc","4+3=7 kudarc összesen"]:["A múltbeli 4 kiesik","0,8×0,8×0,8","0,512 = 51,2%"]}/></>;
    } else {
      const future=scene==="future";
      graphic=<><Drawing title={future?"A 7 percnyi múlt kiesése után a tengely újra 0-ról 5 percig indul":"Várakozási idő: eltelt 7 perc, további 5 perc, összesen 12 perc"}>
        <line x1="55" x2="470" y1="160" y2="160" stroke={dim}/><rect x="55" y="110" width={future?0:224} height="32" fill={dim}/><rect x={future?55:279} y="110" width="160" height="32" fill={green}/>
        {label(55,191,"0",white)}{!future?label(279,191,"7",white):null}{label(future?215:439,191,future?"5 perc":"12 perc",green)}
        {label(future?135:350,85,"Újabb 5 perc",green)}{future?label(350,125,"7 perc múlt: kiesett",dim,14):label(160,85,"7 perc eltelt",dim)}
      </Drawing><Flow items={scene==="setup"?["T>7 már ismert","Kérdés: T>12 ezen belül"]:scene==="rate"?["Átlag: 10 perc","Ráta: 1÷10=0,1 perc⁻¹"]:scene==="ratio"?["Számláló: e^(−0,1×12)","Nevező: e^(−0,1×7)"]:["Kitevők különbsége: −1,2+0,7","Csak −0,5 marad","e^(−0,5) ≈ 0,60653"]}/></>;
    }
    caption="Az időt és a próbákat külön ábra mutatja. Az ismert múlt szürke; az új kérdés világos. A feltételes osztás után az időtengely újraindul: pontosan ez az örökifjúság.";
  } else if(kind==="poisson") {
    graphic=step<2?<><div className={styles.hourWindows}>{Array.from({length:scene==="setup"?1:3},(_,i)=><div key={i}><span>{i+1}. óra</span><b>Átlag: 2</b></div>)}</div><Flow items={scene==="setup"?["r=2 esemény / óra","Kérdés: 3 óra"]:["2+2+2","λ=2×3=6"]}/></>:<><BarPlot values={Array.from({length:19},(_,k)=>Math.exp(-6)*6**k/fact(k))} active={i=>scene==="result"?i>=1:i===4} title="Poisson(6) darabszámok, a lépésben vizsgált kimenetelek kiemelve"/><Flow items={scene==="exact"?["λ=6, k=4","6⁴=1296","4!=24"]:scene==="evaluate"?["1296÷24=54","54×e^(−6)","P(X=4)≈0,13385"]:["Csak X=0 a rossz","P(0)=e^(−6)","1−e^(−6)≈0,99752"]}/></>;
    caption="Előbb egyórás ablakokból épül fel a háromórás λ. Utána a pontosan 4 esemény oszlopa kerül előtérbe, végül az összes pozitív darabszám. A diagram a 0–18 értékeket mutatja; a további, kis esélyű farok a képletben szintén benne van.";
  } else if(kind==="uniform") {
    const mean=scene==="mean",second=scene==="second",unknown=scene==="setup";
    const power=second?3:mean?2:1;
    const maximum=second?4:mean?2:1;
    const px=(x:number)=>70+x*185, py=(y:number)=>245-y/maximum*195;
    const curve=Array.from({length:81},(_,i)=>{const x=i/40;return`${i?"L":"M"}${px(x)},${py(x**power/2)}`;}).join(" ");
    const area=scene==="probability"?`M${px(1)},245 ${Array.from({length:41},(_,i)=>{const x=1+i/40;return`L${px(x)},${py(x/2)}`;}).join(" ")} L${px(2)},245 Z`:`${curve} L${px(2)},245 L${px(0)},245 Z`;
    graphic=<><Drawing title={`${unknown?"A sűrűség tartománya, a c magasság még ismeretlen":mean?"Az átlaghoz integrált x·f(x)=x²/2 függvény":second?"A második momentumhoz integrált x²·f(x)=x³/2 függvény":"A sűrűség és az éppen összegzett terület"}`}>
      <path d="M70 25V245H470" stroke={dim} fill="none"/>{unknown?label(260,130,"f(x)=cx · c még ismeretlen",white,16):<><path d={area} fill={green} fillOpacity=".3"/><path d={curve} fill="none" stroke={green} strokeWidth="3"/>{label(260,27,mean?"x·f(x)=x²/2":second?"x²·f(x)=x³/2":"f(x)=x/2",green,16)}{label(43,55,String(maximum),white,13)}</>}
      {label(70,275,"0",white,14)}{label(255,275,"1",white,14)}{label(440,275,"2 / x",white,14)}
      {scene==="result"?<><path d={`M70 ${py(.5)}H440`} stroke={blue} strokeDasharray="5 5" strokeWidth="2"/>{label(295,137,"U(0,2): magasság 1/2",blue,13)}</>:null}
    </Drawing><Flow items={unknown?["Tartomány: 0<x<2","A teljes területet majd 1-re állítjuk"]:scene==="normalize"?["Alap 2 × magasság 2c ÷ 2","Terület 2c = 1","c=1/2"]:scene==="probability"?["A kiemelt rész: 1<x<2","Felső érték 1 − alsó 1/4","Terület 3/4"]:mean?["x²/2 integrálja: x³/6","8/6−0=4/3"]:second?["x³/2 integrálja: x⁴/8","16/8−0=2"]:["2−(4/3)²=2/9","Szaggatott: egyenletes sűrűség"]}/></>;
    caption=mean||second?"Most nem a sűrűséget rajzoljuk: a felirat szerinti súlyozott integrandust mutatjuk. Az alatta levő terület egy momentum, ezért akár 1-nél nagyobb is lehet. A függőleges skála is ehhez igazodik.":"A normálás állítja be a háromszög tényleges magasságát. Az intervallum lépésben csak a kérdezett rész színezett; az utolsó lépésben az egyenletes összehasonlító sűrűség is megjelenik.";
  } else if(kind==="normal"||kind==="approximation"||kind==="test") {
    if(kind==="approximation"&&step<3) {
      graphic=<><BarPlot values={Array.from({length:11},(_,k)=>scene==="setup"?bin(k,100,.02):Math.exp(-2)*2**k/fact(k))} active={i=>scene==="setup"||i===3} title={scene==="setup"?"A rész: pontos binomiális eloszlás; tipikus sikerszám 2 körül":"A rész: a Poisson(2) közelítés k=3 tagja"}/><Flow items={scene==="setup"?["A: 100 próba, p=0,02","B még nem került sorra"]:scene==="poisson"?["100×0,02=2","λ=2"]:["2³=8; 3!=6","(8/6)×e^(−2)≈0,18045","Pontos binomiális: 0,18228"]}/></>;
      caption="A grafika először az A részt követi. A Poisson-lépésben maga az oszlopeloszlás is a közelítő modellre vált; a B feladat normális görbéje csak a következő lépésben jelenik meg.";
    } else if(kind==="test"&&scene==="se") {
      graphic=<><div className={styles.sampleGrid}>{Array.from({length:25},(_,i)=><span key={i}>{i+1}</span>)}</div><Flow items={["25 független adat","√25=5","SE=10÷5=2"]}/></>;
      caption="A rács a 25 megfigyelést számozza, nem az értéküket mutatja. Az átlag szórását az ismert tétel szerint √n-nel osztjuk: itt a 25 gyöke 5.";
    } else {
      const isNormal=kind==="normal", isApprox=kind==="approximation", isTest=kind==="test";
      const rawSetup=(isNormal||isTest)&&scene==="setup";
      const lower=isApprox?(scene==="normal"?-1:-1.1):isTest?-1.96:-1;
      const upper=isApprox?(scene==="normal"?1:1.1):isTest?1.96:2;
      const tLast=isTest&&scene==="result";
      const leftCritical=tLast?-2.064:-1.96, rightCritical=-leftCritical;
      const px=(z:number)=>45+(z+3.5)/7*430;
      const density=(z:number)=>tLast?Math.pow(1+z*z/24,-12.5):Math.exp(-z*z/2);
      const py=(z:number)=>235-density(z)*170;
      const line=Array.from({length:141},(_,i)=>{const z=-3.5+i*.05;return`${i?"L":"M"}${px(z)},${py(z)}`;}).join(" ");
      const area=(a:number,b:number)=>`M${px(a)},235 `+Array.from({length:81},(_,i)=>{const z=a+(b-a)*i/80;return`L${px(z)},${py(z)}`;}).join(" ")+` L${px(b)},235 Z`;
      const fillBand=(isNormal&&scene==="interval")||(isApprox&&["standardize","result","correction"].includes(scene));
      const showCritical=isTest&&["critical","decision","result"].includes(scene);
      graphic=<><Drawing title={`${current.title}: ${tLast?"t-eloszlás 24 szabadságfokkal":"normális görbe"}, a lépéshez tartozó határokkal`}>
        {fillBand?<path d={area(lower,upper)} fill={green} fillOpacity=".45"/>:null}
        {isNormal&&scene==="subtract"?<><path d={area(-3.5,2)} fill={green} fillOpacity=".4"/><path d={area(-3.5,-1)} fill={orange} fillOpacity=".8"/>{label(125,45,"Ezt levonjuk",orange,13)}</>:null}
        {isNormal&&scene==="result"?<path d={area(2,3.5)} fill={green} fillOpacity=".7"/>:null}
        {showCritical?<><path d={area(-3.5,leftCritical)} fill={orange} fillOpacity=".6"/><path d={area(rightCritical,3.5)} fill={orange} fillOpacity=".6"/>{label(78,180,"2,5%",orange,13)}{label(450,180,"2,5%",orange,13)}</>:null}
        <path d={line} stroke={white} fill="none" strokeWidth="2"/><path d="M45 235H475" stroke={dim}/>
        {(isNormal||isApprox)?<>{label(px(0),260,isNormal?"100":"50",white,14)}{label(px(lower),260,isNormal?"85":scene==="normal"?"45":"44,5",blue,14)}{label(px(upper),260,isNormal?"130":scene==="normal"?"55":"55,5",orange,14)}
          {!rawSetup&&scene!=="normal"&&(!isApprox||step>=5)?<>{label(px(0),288,"z=0",dim,12)}{label(px(lower),288,isNormal?"z=−1":"z=−1,1",blue,12)}{isApprox||step>=2?label(px(upper),288,isNormal?"z=2":"z=1,1",orange,12):null}</>:null}
          <path d={`M${px(lower)} 95V235M${px(upper)} 95V235`} stroke={dim} strokeDasharray="4 5"/>
        </>:<>{label(px(0),260,rawSetup?"μ₀=100":"0",white,14)}<path d={`M${px(2)} 110V235`} stroke={green} strokeWidth="2"/>{label(px(2),95,rawSetup?"x̄=104":"statistika = 2",green,13)}{showCritical?<>{label(px(leftCritical),285,String(leftCritical).replace(".",","),orange,12)}{label(px(rightCritical),285,String(rightCritical).replace(".",","),orange,12)}</>:null}</>}
        {isApprox&&scene==="correction"?Array.from({length:11},(_,i)=>{const z=(45+i-50)/5;return<rect key={i} x={px(z-.1)} y="200" width={px(z+.1)-px(z-.1)} height="35" fill="none" stroke={blue}/>;}):null}
      </Drawing><Flow items={isNormal?(scene==="setup"?["Átlag 100","Szórás 15","Kérdés: 85–130"]:scene==="lower"?["85−100=−15","−15÷15=−1"]:scene==="upper"?["130−100=30","30÷15=2"]:scene==="subtract"?["Minden 2 alatt: Φ(2)","Narancs: Φ(−1), ezt kivesszük"]:scene==="interval"?["0,97725−0,15866","Középső sáv: 0,81859"]:["A jobb farok marad","1−0,97725=0,02275"]):isApprox?(scene==="normal"?["B rész: μ=50","σ²=25 → σ=5"]:scene==="correction"?["45-ös oszlop bal széle: 44,5","55-ös jobb széle: 55,5"]:scene==="standardize"?["(44,5−50)÷5=−1,1","(55,5−50)÷5=1,1"]:["2×Φ(1,1)−1","Középső sáv ≈ 0,72866"]):(scene==="setup"?["H₀: μ=100","Mintaátlag: 104","A különbség lehet ingadozás"]:scene==="statistic"?["104−100=4","4÷SE=4÷2=2"]:scene==="critical"?["5% kétfelé: 2,5%+2,5%","Táblázat: ±1,96"]:scene==="decision"?["u=2 az 1,96-on kívül","H₀ elutasítva","p≈0,0455"]:["Most t₂₄ a modell","Kritikus határ: ±2,064","t=2 belül → nincs elutasítás"])}/></>;
      caption=isTest?(tLast?"Az utolsó lépésben a görbe is t-eloszlásra vált, 24 szabadságfokkal. A statisztika marad 2, de a határ 2,064: a jelölő most a nem elutasított középső tartományban van.":"Előbb az eredeti 100 és 104 jelenik meg. Az átváltás után a vízszintes tengely standardhiba-egységeket mér. A kritikus sávok csak a hibaszint felosztása után jelennek meg."):isApprox?"Most már kizárólag a B részt látod. A kék kis téglalapok a befoglalt egész értékek teljes, 1 széles oszlopait jelzik; a fél egységes szélek így válnak láthatóvá. A normálás után az alsó tengely z-egységeket mutat.":"A felső számsor az eredeti X, az alsó az átváltott z. A levonásnál a bal oldali narancs rész kiesik; a következő lépésben csak a megfelelő sáv, az utolsóban pedig a jobb oldali farok marad színezett.";
    }
  } else if(kind==="joint") {
    const rows=step>=1, columns=step>=2, condition=scene==="condition",result=scene==="result";
    graphic=<><table className={styles.teachingTable}><caption>A sor X-et, az oszlop Y-t jelöl. ? = még nem számoltuk ki.</caption><thead><tr><th scope="col">X / Y</th><th scope="col">Y=0</th><th scope="col">Y=1</th><th scope="col">X esélye</th></tr></thead><tbody>{[0,1].map(row=><tr key={row} style={{opacity:condition&&row===0?.25:1}}><th scope="row">X={row}</th>{[0,1].map(col=><td key={col} style={{color:result&&row===0&&col===0?"#d7f36b":undefined,background:result&&row===0&&col===0?"#324d30":undefined}}>{["0,1","0,2","0,3","0,4"][row*2+col]}</td>)}<td><strong>{rows?(row?"0,7":"0,3"):"?"}</strong></td></tr>)}</tbody><tfoot><tr><th scope="row">Y esélye</th><td>{columns?"0,4":"?"}</td><td>{columns?"0,6":"?"}</td><td>1</td></tr></tfoot></table>
      <Flow items={scene==="setup"?["Cellák: két feltétel egyszerre","Összegük: 1"]:scene==="rows"?["Felső sor: 0,1+0,2=0,3","Alsó sor: 0,3+0,4=0,7"]:scene==="columns"?["Bal oszlop: 0,1+0,3=0,4","Jobb oszlop: 0,2+0,4=0,6"]:condition?["Csak X=1 sor marad","Jó cella 0,4 / teljes sor 0,7","4/7≈0,57143"]:["Sorösszeg 0,3 × oszlopösszeg 0,4","Elvárt: 0,12; tényleges: 0,1","Eltérnek → függők"]}/></>;
    caption="Először a sorok, utána az oszlopok peremesélyei telnek ki. A feltételnél a kizárt sor elhalványul. A végén egyetlen konkrét cella és a hozzá tartozó két perem szorzatát hasonlítjuk össze.";
  } else if(kind==="covariance") {
    const product=scene==="product",mean=scene==="mean",last=scene==="result";
    const px=(x:number)=>260+x*175, py=(y:number)=>product?155-y*110:245-y*190;
    const points=Array.from({length:41},(_,i)=>{const x=-1+i/20;return[x,product?x**3:x*x];});
    graphic=<><Drawing title={product?"Az XY=X³ hozzájárulások két oldala ellentétes előjelű":"Az Y=X² kapcsolat: ugyanaz a parabola, a lépésben vizsgált részek kiemelve"}>
      {last?<rect x={px(-.5)} y={py(.25)} width={px(.5)-px(-.5)} height={245-py(.25)} fill={green} fillOpacity=".15"/>:null}
      <path d={`M55 ${py(0)}H475M260 20V260`} stroke={dim} fill="none"/>
      {points.map(([x,y],i)=><circle key={i} cx={px(x)} cy={py(y)} r="4" fill={last?(Math.abs(x)<=.50001?green:dim):mean||product?(x<0?orange:blue):green} opacity={last&&Math.abs(x)>.50001?.3:1}/>)}
      {label(90,282,"−1",white,13)}{label(260,282,"0",white,13)}{label(435,282,"1 / X",white,13)}{label(160,25,product?"XY=X³":"Y=X²",white,15)}
      {last?<>{label(px(-.5),225,"−1/2",green,12)}{label(px(.5),225,"1/2",green,12)}{label(390,py(.25)-12,"Y=1/4",green,13)}</>:null}
    </Drawing><Flow items={scene==="setup"?["Válassz X-et","Y automatikusan X²"]:mean?["−x és +x egyformán gyakori","Átlaguk: 0"]:scene==="square"?["A négyzet mindkét oldalon pozitív","E(X²)=1/3"]:product?["Negatív X³ + pozitív X³","E(XY)=0"]:scene==="zero"?["cov=0−0×1/3=0","Pozitív szórások mellett ρ=0"]:["|X|≤1/2 ugyanaz, mint Y≤1/4","Közös esély 1/2","Szorzat 1/4 → függők"]}/></>;
    caption=product?"Itt kifejezetten az XY=X³ függvényre váltottunk: a negatív és pozitív hozzájárulás átlagoláskor kioltja egymást. Ez nem az Y=X² grafikon.":last?"A kiemelt középső pontok egyszerre teljesítik az X-re és Y-ra adott feltételt; a két esemény ténylegesen ugyanaz. Ezért a közös esély nem a félnek a fele, hanem ugyanaz a fél.":"A parabola a determinisztikus kapcsolatot mutatja. Az integrálok és a momentumok összegei a mellette levő számeredet-listában követhetők; a két színes oldal az előjeles átlagolást szemlélteti.";
  } else {
    // Regression uses actual data coordinates; no schematic or fitted point is substituted for an observation.
    const px=(x:number)=>60+x*125, py=(y:number)=>260-y*42;
    const hasMean=step>=1, hasLine=step>=3, residuals=step>=5;
    const products=scene==="products";
    graphic=products?<table className={styles.teachingTable}><caption>Minden sor egy megfigyelés; a szorzatokat a soron belül képezzük.</caption><thead><tr><th>x</th><th>y</th><th>x²</th><th>xy</th></tr></thead><tbody>{[[1,2],[2,3],[3,5]].map(([x,y])=><tr key={x}><td>{x}</td><td>{y}</td><td>{x*x}</td><td>{x*y}</td></tr>)}</tbody><tfoot><tr><th>Átlag</th><td>10/3</td><td>14/3</td><td>23/3</td></tr></tfoot></table>:<Drawing title={`Regresszió építése: ${current.title}; tengelyek x és y, megfigyelések (1,2), (2,3), (3,5)`}>
      <path d="M55 260H475M60 15V265" stroke={dim} fill="none"/>{[1,2,3].map(x=>label(px(x),285,String(x),white,13))}{[1,2,3,4,5].map(y=>label(40,py(y)+5,String(y),dim,12))}
      {hasLine?<path d={`M${px(0)} ${py(1/3)}L${px(3.2)} ${py(1/3+1.5*3.2)}`} stroke={blue} strokeWidth="2"/>:null}
      {[[1,2],[2,3],[3,5]].map(([x,y])=><g key={x}>{residuals?<line x1={px(x)} x2={px(x)} y1={py(y)} y2={py(1/3+1.5*x)} stroke={orange} strokeWidth="4"/>:null}<circle cx={px(x)} cy={py(y)} r="6" fill={green}/>{label(px(x)+20,py(y)-12,`(${x},${y})`,green,13)}</g>)}
      {hasMean?<><circle cx={px(2)} cy={py(10/3)} r="5" fill={orange}/>{label(245,90,"Átlagpont: (2;10/3)",orange,13)}</>:null}
      {scene==="slope"?<path d={`M${px(1)} ${py(11/6)}H${px(3)}V${py(29/6)}`} stroke={orange} fill="none" strokeDasharray="4 4"/>:null}
      {scene==="line"?label(115,241,"α̂=1/3",blue,13):null}
    </Drawing>;
    graphic=<>{graphic}<Flow items={scene==="setup"?["Három megfigyelt pont","Keresett: ŷ=α̂+β̂x"]:scene==="means"?["x̄=(1+2+3)/3=2","ȳ=(2+3+5)/3=10/3"]:products?["x² átlag: 14/3","xy átlag: 23/3"]:scene==="slope"?["Számláló: 1","Nevező: 2/3","β̂=1÷(2/3)=3/2"]:scene==="line"?["ȳ−β̂x̄=10/3−3=1/3","ŷ=1/3+1,5x"]:scene==="residuals"?["Első hiba: +1/6","Második: −1/3","Harmadik: +1/6"]:["1/36 + 4/36 + 1/36","S=6/36=1/6"]}/>{scene==="result"?<div className={styles.errorSquares} aria-label="Hibanégyzetek területaránya 1:4:1"><i/><i/><i/></div>:null}</>;
    caption="A zöld megfigyelések végig a valódi pontok. Előbb az átlagpont, majd a kiszámított meredekségű egyenes, végül a függőleges hibaszakaszok jelennek meg. Az utolsó három négyzet területaránya 1:4:1, így látszik a középső hiba nagyobb súlya.";
  }

  return <figure className={`${styles.figure} ${styles.teachingFigure}`} aria-label="Az aktuális számolási lépés ábrája" data-scene={`${kind}:${scene}`}>
    <div className={styles.figureLabel}><span>A MEGOLDÁS ÉPÜL AZ ÁBRÁN</span><span>{step+1}/{total}</span></div>
    <h4>{current.title}</h4><div key={`${kind}:${scene}`} className={styles.sceneContent}>{graphic}</div><figcaption>{caption}</figcaption>
  </figure>;
}
