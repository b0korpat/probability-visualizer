"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { masterLessons, examHacks, distributionReference } from "@/data/problems/nagy-zh1";
import { beginnerLessons, type TeachingStep } from "@/data/problems/nagy-zh1-beginner";
import { LatexRenderer } from "./LatexRenderer";
import { TeachingVisual } from "./TeachingVisual";
import { teachingMath } from "./teaching-math";
import styles from "./MasterGuide.module.css";

const storageKey = "probability-lab:nagy-zh1:completed:v1";
const categories = ["Alapok", "Feltételes", "Változók", "Eloszlások", "Kitekintés"];
const teachingStepCount = Object.values(beginnerLessons).reduce((sum, lesson) => sum + lesson.steps.length, 0);

export function MasterGuide() {
  const [selected, setSelected] = useState(masterLessons[0].id);
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState<"learn" | "sos" | "hacks" | "reference">("sos");
  const [query, setQuery] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const index = masterLessons.findIndex(lesson => lesson.id === selected);
  const lesson = masterLessons[index];
  const teaching = beginnerLessons[lesson.visual];
  const steps = teaching.steps;
  const current = steps[step];

  useEffect(() => {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(raw)) setCompleted(raw.filter((id): id is string => typeof id === "string" && masterLessons.some(l => l.id === id)));
    } catch { /* Storage is optional; the lessons remain available. */ }
  }, []);

  function chooseLesson(id: string) {
    setSelected(id); setStep(0); setChoice(null); setTab("learn"); setPickerOpen(false);
    requestAnimationFrame(() => document.getElementById("lesson-title")?.scrollIntoView({ block: "start" }));
  }
  function goStep(next: number) {
    const clamped = Math.max(0, Math.min(next, steps.length - 1));
    setStep(clamped);
    requestAnimationFrame(() => {
      const stage = document.getElementById("teaching-stage");
      if (stage && stage.getBoundingClientRect().top < -40) {
        stage.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }
  useEffect(() => {
    if (tab !== "learn") return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.matches("input, textarea, select, [contenteditable]")) return;
      if (event.key === "ArrowRight") goStep(step + 1);
      if (event.key === "ArrowLeft") goStep(step - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  function markComplete() {
    const next = completed.includes(selected) ? completed.filter(id => id !== selected) : [...completed, selected];
    setCompleted(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setSaveMessage("Haladás mentve ebben a böngészőben."); }
    catch { setSaveMessage("A haladás most csak ebben a megnyitott munkamenetben érhető el."); }
  }
  const filtered = masterLessons.filter(l => `${l.title} ${l.lead} ${l.category}`.toLocaleLowerCase("hu-HU").includes(query.toLocaleLowerCase("hu-HU")));

  return <main className={styles.root}>
    <header className={styles.header}><Link href="/" className={styles.back}>← Modulválasztó</Link><span className={styles.brand}>probability<span>/</span>lab</span><span className={styles.headerMeta}>FELKÉSZÜLÉS · N01</span></header>
    <section className={styles.hero} aria-labelledby="master-title"><div><p className={styles.kicker}>VALÓSZÍNŰSÉGSZÁMÍTÁS / AZ ALAPOKTÓL</p><h1 id="master-title">NAGY ZH<span>1</span><span className={styles.heroDot}>.</span></h1><p className={styles.heroCopy}>Mit? Miért? Hogyan?<br /><span>Lépésről lépésre, közvetlen magyarázatokkal, minden szám értelmével és épülő ábrákkal.</span></p></div><div className={styles.heroStats}><div><strong>{masterLessons.length}</strong><span>kidolgozott feladat</span></div><div><strong>{teachingStepCount}</strong><span>megoldási lépés</span></div><p>{completed.length}/{masterLessons.length} megjelölve késznek</p><progress aria-label="Elkészült feladatok" value={completed.length} max={masterLessons.length} /></div></section>

    <nav className={styles.tabs} aria-label="Modul nézetei">
      {[
        ["sos", "⚡ 48 ÓRÁS VÉSZTARTALÉK"],
        ["learn", "01 / Feladatműhely"],
        ["hacks", "02 / ZH-gyorsmódszerek"],
        ["reference", "03 / Képlettár"]
      ].map(([id, label]) => (
        <button key={id} aria-pressed={tab === id} onClick={() => setTab(id as any)}>{label}</button>
      ))}
    </nav>

    {tab === "sos" ? <SosSurvivalGuide onSelectLesson={chooseLesson} /> : tab === "learn" ? <div className={styles.workspace}>
      <details className={styles.sidebar} open={pickerOpen} onToggle={event => setPickerOpen(event.currentTarget.open)}><summary className={styles.pickerSummary}><span>Feladat választása <small>{index + 1} / {masterLessons.length} · {lesson.title}</small></span><span>{pickerOpen ? "Bezárás −" : "Összes feladat +"}</span></summary><div className={styles.pickerContent}><label className={styles.searchLabel} htmlFor="lesson-search">TÉMAKÖRÖK ÉS FELADATOK</label><input id="lesson-search" className={styles.search} type="search" placeholder="Keresés, pl. Bayes…" value={query} onChange={e=>setQuery(e.target.value)} /><nav aria-label="NAGY ZH1 feladatok">
        {categories.map(category => { const lessons = filtered.filter(l=>l.category===category); return lessons.length ? <section className={styles.navGroup} key={category}><h2>{category}{category==="Kitekintés" ? " · bővített anyag" : ""}</h2>{lessons.map(l=><button key={l.id} className={l.id===selected ? styles.selected : ""} aria-current={l.id===selected ? "page" : undefined} onClick={()=>chooseLesson(l.id)}><span className={styles.lessonNumber}>{completed.includes(l.id) ? "✓" : String(masterLessons.indexOf(l)+1).padStart(2,"0")}</span><span>{l.title}</span></button>)}</section> : null; })}
        {!filtered.length ? <p className={styles.empty}>Nincs találat. Próbálj másik témát!</p> : null}
      </nav></div></details>
      <article className={styles.lesson} aria-labelledby="lesson-title">
        <div className={styles.lessonTopline}><span>{lesson.category} / {String(index+1).padStart(2,"0")}</span><button className={styles.complete} aria-pressed={completed.includes(selected)} onClick={markComplete}>{completed.includes(selected) ? "✓ Késznek jelölve" : "○ Késznek jelölöm"}</button></div>
        <h2 id="lesson-title">{lesson.title}</h2><p className={styles.lead}>{lesson.lead}</p>

        <section className={styles.statement}><span className={styles.smallLabel}>A FELADAT</span><p>{lesson.statement}</p><div className={styles.data}>{lesson.data.map(item=><span key={item}>{item}</span>)}</div></section>

        <div className={styles.rule}><span>ZH-TRÜKK</span><p>{lesson.rule}</p></div>

        <details className={styles.theory}><summary>Jelölések & cél (Mit mivel jelölünk ebben a feladatban?)</summary>
          <p>{teaching.goal}</p>
          <dl>{teaching.notation.map(([symbol,meaning,reason])=><div key={symbol}><dt>{symbol}</dt><dd><strong>{meaning}</strong><p>{reason}</p></dd></div>)}</dl>
        </details>

        <details className={styles.theory}><summary>Elméleti háttér (ha kíváncsi vagy a tételre)</summary><p>{lesson.theory}</p></details>

        <section className={styles.solution} aria-label="Lépésenkénti megoldás">
          <div className={styles.stepTabs} aria-label="Megoldás lépései">{steps.map((s,i)=><button key={i} aria-pressed={step===i} onClick={()=>goStep(i)}><span>{String(i+1).padStart(2,"0")}</span>{s.title}</button>)}</div>
          <div id="teaching-stage" className={styles.teachingStage}>
            <div className={styles.stepControls}><button disabled={step===0} onClick={()=>goStep(step-1)}>← Előző lépés</button><span>{step+1}/{steps.length} · ← / → nyilakkal is léptethetsz</span><button disabled={step===steps.length-1} onClick={()=>goStep(step+1)}>Következő lépés →</button></div>
            <div className={styles.teachingGrid}>
              <div className={styles.stepBody} aria-live="polite"><span className={styles.smallLabel}>{step+1} / {steps.length} · MIT CSINÁLUNK MOST?</span><h3>{current.title}</h3><p>{current.explanation}</p>
                <div className={styles.whyBox}><h4>Miért pont ezt csináljuk? (A lényeg)</h4><p>{current.why}</p></div>
                <div className={styles.formula}><LatexRenderer math={teachingMath(current.formula)} /></div>
              </div>
              <TeachingVisual kind={lesson.visual} current={current} step={step} total={steps.length} />
              <div className={styles.teachingOrigins}><NumberOrigins current={current} /></div>
            </div>
            <div className={styles.stepControls}><button disabled={step===0} onClick={()=>goStep(step-1)}>← Előző lépés</button><span>{step===steps.length-1?"A teljes levezetés végére értél.":"A következő lépésben az ábra is továbbépül."}</span><button disabled={step===steps.length-1} onClick={()=>goStep(step+1)}>Következő lépés →</button></div>
          </div>
        </section>
        <p className={styles.answer}><strong>A feladat végeredménye: </strong>{lesson.answer}</p>
        <aside className={styles.trap}><span className={styles.smallLabel}>ERRE FIGYELJ (VIZSGACSAPDA)</span><p>{lesson.trap}</p></aside>
        <section className={styles.quiz}><span className={styles.smallLabel}>10 MÁSODPERCES ÖNELLENŐRZÉS</span><h3>{lesson.quiz.question}</h3><div className={styles.quizOptions}>{lesson.quiz.options.map((option,i)=><button key={option} className={choice===i ? (choice===lesson.quiz.correct ? styles.correct : styles.incorrect) : ""} aria-pressed={choice===i} onClick={()=>setChoice(i)}>{option}</button>)}</div>{choice!==null ? <p role="status" className={styles.feedback}>{choice===lesson.quiz.correct ? "✓ Helyes. " : "Próbáld újra! "}{lesson.quiz.explanation}</p> : null}</section>
        <footer className={styles.lessonFooter}><button disabled={index===0} onClick={()=>chooseLesson(masterLessons[index-1].id)}>← Előző feladat</button><button disabled={index===masterLessons.length-1} onClick={()=>chooseLesson(masterLessons[index+1].id)}>Következő feladat →</button></footer>
        <p role="status" className={styles.saveMessage}>{saveMessage}</p>
      </article>
    </div> : tab === "hacks" ? <section className={styles.secondary}>
      <p className={styles.kicker}>GYORS FELISMERÉS → RÖVIDEBB SZÁMOLÁS</p><h2>Nyolc fogás, amit vigyél magaddal.</h2>
      <p className={styles.lead}>Mindegyikhez találsz kidolgozott példát és ábrát a feladatműhelyben.</p>
      <div className={styles.hackGrid}>{examHacks.map(([number,title,copy,id])=><button key={number} onClick={()=>chooseLesson(id)}><span>{number}</span><h3>{title}</h3><p>{copy}</p><small>Mutasd a példát ↗</small></button>)}</div><ExamChecklist />
    </section> : <section className={styles.secondary}>
      <p className={styles.kicker}>KÉPLETEK / FELTÉTELEK / JELÖLÉSEK</p><h2>A döntéshez szükséges képletek.</h2>
      <p className={styles.lead}>F(x)=P(X&lt;x), N(μ,σ²), Geo(p)∈&#123;1,2,…&#125;. Ezeket a konvenciókat használjuk minden példában.</p>
      <DistributionTable />
      <div className={styles.reference}>{masterLessons.map((l,i)=><details key={l.id}><summary>{String(i+1).padStart(2,"0")} / {l.title}</summary><p>{l.theory}</p><p className={styles.referenceRule}>{l.rule}</p><button onClick={()=>chooseLesson(l.id)}>Kidolgozott példa →</button></details>)}
        <details><summary>+ Becslések: Markov, Csebisev és nagy számok törvénye</summary>
          <p>Markov: nemnegatív X és a&gt;0 esetén P(X≥a)≤E(X)/a. Csebisev: véges szórásnégyzet és ε&gt;0 mellett P(|X−E(X)|≥ε)≤D²(X)/ε². Ezek felső korlátok, nem pontos valószínűségek; 1-nél nagyobb korlát helyett az 1-es triviális korlátot használjuk.</p>
          <div className={styles.formula}><LatexRenderer math={String.raw`P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}\longrightarrow0`} /></div>
          <p>Független, azonos eloszlású, véges szórásnégyzetű változóknál ez bizonyítja a nagy számok gyenge törvényét. A centrális határeloszlás-tétel 0&lt;σ²&lt;∞ mellett: √n(X̄ₙ−μ)/σ eloszlásban standard normálishoz tart. A nagy számok törvénye koncentrációt, a centrális határeloszlás-tétel a standardizált ingadozás alakját írja le.</p>
        </details>
      </div><ExamChecklist />
    </section>}
    <footer className={styles.bottom}>NAGY ZH1 <span>Feladat · levezetés · vizualizáció · önellenőrzés</span></footer>
  </main>;
}

function NumberOrigins({ current }: { current: TeachingStep }) {
  return <section className={styles.numberOrigins} aria-label="Melyik szám micsoda?"><h4>Melyik szám micsoda?</h4><dl>{current.numbers.map(([number,meaning])=><div key={number}><dt>{number}</dt><dd>{meaning}</dd></div>)}</dl></section>;
}

function DistributionTable() {
  return <div className={styles.distributionTable} role="region" aria-label="Eloszlások összehasonlító képlettára" tabIndex={0}>
    <table><caption>Nevezetes eloszlások — a sűrűség a megadott tartományon kívül nulla.</caption><thead><tr><th scope="col">Eloszlás / tartomány</th><th scope="col">Tömeg vagy sűrűség</th><th scope="col">E(X)</th><th scope="col">D²(X)</th></tr></thead><tbody>{distributionReference.map(d=><tr key={d.name}><th scope="row">{d.name}<small>{d.support}</small></th><td><LatexRenderer math={d.formula} /></td><td><LatexRenderer math={d.mean} /></td><td><LatexRenderer math={d.variance} /></td></tr>)}</tbody></table>
  </div>;
}

function ExamChecklist() {
  return <section className={styles.checklist}><h3>Beadási előtti mentőöv</h3>{["A valószínűség 0 és 1 közé esik; a szórásnégyzet nemnegatív.", "Az időegységet és a paramétereket egyeztettem.", "Ha szórást kérnek, gyököt vontam a szórásnégyzetből.", "Az intervallum végpontjait és a közelítés korrekcióját ellenőriztem.", "A várható érték a lehetséges alsó és felső korlát közé esik, ha létezik.", "Függetlenséget nem kevertem össze a diszjunktsággal vagy a korrelálatlansággal."].map(text=><label key={text}><input type="checkbox" /><span>{text}</span></label>)}</section>;
}

function MasterProtocols() {
  const [active, setActive] = useState<number>(0);

  const protocols = [
    {
      id: "discrete-moments",
      badge: "01. MESTERSABLON (5-6. témakör)",
      title: "A „Táblázatos” Diszkrét feladat: E(X), Var(X) és Y = aX + b",
      problem: "Egy dobozban van 3 piros és 2 fehér golyó. Visszatevés nélkül kihúzunk 2-t. Legyen X a kihúzott pirosak száma. a) Írja fel X eloszlását! b) Számítsa ki E(X)-et és Var(X)-et! c) Ha Y = 3X - 5, mennyi E(Y) és Var(Y)?",
      steps: [
        {
          head: "1. LÉPÉS: Értékek megkeresése és a valószínűségi táblázat",
          body: "X a piros golyók száma. 2 húzásból lehet 0, 1 vagy 2 piros. Összes eset: C(5,2) = 10.",
          formula: String.raw`P(X=0)=\frac{\binom{3}{0}\binom{2}{2}}{10}=0{,}1, \quad P(X=1)=\frac{\binom{3}{1}\binom{2}{1}}{10}=0{,}6, \quad P(X=2)=\frac{\binom{3}{2}\binom{2}{0}}{10}=0{,}3`,
          note: "A táblázat: x_i ∈ {0, 1, 2}, p_i ∈ {0,1; 0,6; 0,3}. Ellenőrzés: 0,1 + 0,6 + 0,3 = 1,0!"
        },
        {
          head: "2. LÉPÉS: Várható érték E(X) — a súlyozott átlag",
          body: "Minden értéket megszorzunk a saját esélyével, majd összeadjuk:",
          formula: String.raw`E(X) = \sum x_i p_i = (0 \cdot 0{,}1) + (1 \cdot 0{,}6) + (2 \cdot 0{,}3) = 0 + 0{,}6 + 0{,}6 = 1{,}2`,
          note: "Eredmény: átlagosan 1,2 darab pirosat húzunk. Reális, mert 0 és 2 közé esik!"
        },
        {
          head: "3. LÉPÉS: Szórásnégyzet Var(X) — a Steiner-formula",
          body: "Először kiszámoljuk a négyzetek átlagát E(X²), majd kivonjuk az átlag négyzetét:",
          formula: String.raw`E(X^2) = (0^2 \cdot 0{,}1) + (1^2 \cdot 0{,}6) + (2^2 \cdot 0{,}3) = 0 + 0{,}6 + 1{,}2 = 1{,}8`,
          calc: String.raw`Var(X) = E(X^2) - [E(X)]^2 = 1{,}8 - (1{,}2)^2 = 1{,}8 - 1{,}44 = 0{,}36 \implies D(X) = \sqrt{0{,}36} = 0{,}6`,
          note: "Var(X) nemnegatív, 0,36 lett, a szórás D(X) = 0,6."
        },
        {
          head: "4. LÉPÉS: Lineáris transzformáció Y = 3X - 5",
          body: "Nem kell új táblázat! A szabályok:",
          formula: String.raw`E(Y) = 3 \cdot E(X) - 5 = 3(1{,}2) - 5 = 3{,}6 - 5 = -1{,}4`,
          calc: String.raw`Var(Y) = 3^2 \cdot Var(X) = 9 \cdot 0{,}36 = 3{,}24 \implies D(Y) = 3 \cdot 0{,}6 = 1{,}8`,
          note: "A -5 eltolás nem változtatja a szórást, a szorzó viszont négyzetre emelkedik!"
        }
      ]
    },
    {
      id: "normal-z",
      badge: "02. MESTERSABLON (11. témakör)",
      title: "Normális eloszlás és a Standardizálás (A Φ táblázat használata)",
      problem: "Egy gép kávét tölt: X ~ N(μ = 100 ml, σ² = 225 ml²), tehát a szórás σ = √225 = 15 ml. a) Mennyi annak az esélye, hogy egy pohárba 85 és 120 ml közé eső kávé kerül? b) Mennyi az esélye, hogy 130 ml-nél több kerül bele?",
      steps: [
        {
          head: "1. LÉPÉS: Standardizálás képlete (Z-re váltás)",
          body: "Minden normális változót átváltunk standard normális Z-re az átlag levonásával és a szórással való osztással:",
          formula: String.raw`Z = \frac{X - \mu}{\sigma} \quad \implies \quad z_1 = \frac{85 - 100}{15} = \frac{-15}{15} = -1{,}00, \quad z_2 = \frac{120 - 100}{15} = \frac{20}{15} \approx 1{,}33`,
          note: "Vigyázz! 15-tel osztunk, mert 225 a szórásnégyzet, és σ = √225 = 15!"
        },
        {
          head: "2. LÉPÉS: Intervallum felírása Φ értékekkel",
          body: "Az intervallum valószínűsége: felső érték mínusz alsó érték:",
          formula: String.raw`P(85 \le X \le 120) = P(-1{,}00 \le Z \le 1{,}33) = \Phi(1{,}33) - \Phi(-1{,}00)`,
          note: "A pozitív Φ(1,33)-at közvetlenül kikeressük a táblázatból: 0,9082."
        },
        {
          head: "3. LÉPÉS: Negatív érték kezelése a táblázatban",
          body: "Mivel a táblázat csak pozitív számokra ad meg értékeket, a szimmetriát használjuk:",
          formula: String.raw`\Phi(-1{,}00) = 1 - \Phi(1{,}00) = 1 - 0{,}8413 = 0{,}1587`,
          calc: String.raw`P(85 \le X \le 120) = 0{,}9082 - 0{,}1587 = 0{,}7495 \quad (74{,}95\%)`,
          note: "Kész a részeredmény: 74,95% eséllyel kerül 85 és 120 ml közé."
        },
        {
          head: "4. LÉPÉS: 'Nagyobb mint' (jobb oldali farok) kiszámítása",
          body: "Annak esélye, hogy több mint 130 ml kerül bele: komplementer képzés:",
          formula: String.raw`P(X > 130) = 1 - P(X \le 130) = 1 - \Phi\left(\frac{130 - 100}{15}\right) = 1 - \Phi(2{,}00) = 1 - 0{,}9772 = 0{,}0228 \quad (2{,}28\%)`,
          note: "Ha 'nagyobb mint' van kérdezve, mindig 1 - Φ(z)!"
        }
      ]
    },
    {
      id: "continuous-c",
      badge: "03. MESTERSABLON (10. témakör)",
      title: "Folytonos sűrűségfüggvény: c meghatározása és integrálás",
      problem: "Legyen f(x) = c · x², ha 0 ≤ x ≤ 3, egyébként 0. a) Határozza meg a c konstans értékét! b) Mennyi a P(1 ≤ X ≤ 2) valószínűség? c) Számítsa ki E(X)-et!",
      steps: [
        {
          head: "1. LÉPÉS: A c konstans megkeresése (teljes terület = 1)",
          body: "A sűrűségfüggvény alatti összterületnek 1-nek kell lennie:",
          formula: String.raw`\int_0^3 c x^2 \, dx = c \left[ \frac{x^3}{3} \right]_0^3 = c \cdot \left( \frac{27}{3} - 0 \right) = 9c = 1 \implies c = \frac{1}{9}`,
          note: "A helyes sűrűségfüggvény tehát: f(x) = (1/9) x² a [0, 3] intervallumon."
        },
        {
          head: "2. LÉPÉS: Valószínűség egy intervallumra: P(1 ≤ X ≤ 2)",
          body: "Csak be kell integrálni f(x)-et a kérdéses alsó és felső határ között:",
          formula: String.raw`P(1 \le X \le 2) = \int_1^2 \frac{1}{9} x^2 \, dx = \frac{1}{9} \left[ \frac{x^3}{3} \right]_1^2 = \frac{1}{27} (2^3 - 1^3) = \frac{8 - 1}{27} = \frac{7}{27} \approx 0{,}2593`,
          note: "Folytonos változónál P(X = 1) = 0! Mindig csak intervallumot integrálunk."
        },
        {
          head: "3. LÉPÉS: Várható érték E(X) kiszámítása integrállal",
          body: "A képlet: integrál x · f(x):",
          formula: String.raw`E(X) = \int_0^3 x \cdot \left(\frac{1}{9} x^2\right) dx = \frac{1}{9} \int_0^3 x^3 \, dx = \frac{1}{9} \left[ \frac{x^4}{4} \right]_0^3 = \frac{1}{9} \cdot \frac{81}{4} = \frac{9}{4} = 2{,}25`,
          note: "2,25 reális, mert 0 és 3 közé esik, és a parabola a 3 felé sűrűbb!"
        }
      ]
    },
    {
      id: "binom-poisson",
      badge: "04. MESTERSABLON (7. és 9. témakör)",
      title: "Binomiális vs. Poisson döntés és a „Legalább 1” életmentő trükk",
      problem: "a) Egy tesztben 10 kérdés van, mindegyiknél 5 válaszlehetőség (p = 0,2). Tippelünk. Mennyi az esélye, hogy legalább 1-et eltalálunk? b) Egy szerverre óránként átlagosan 6 hiba érkezik (Poisson). Mennyi az esélye, hogy 20 perc alatt pontosan 2 hiba fut be?",
      steps: [
        {
          head: "1. LÉPÉS (Binomiális): A „Legalább 1” fordított számolása",
          body: "10 kérdésből 1, 2, ..., 10 találatot összeadni 15 perc lenne. Helyette a komplementert vesszük (0 találat):",
          formula: String.raw`P(\text{legalább 1}) = 1 - P(X = 0) = 1 - \binom{10}{0} (0{,}2)^0 (0{,}8)^{10} = 1 - (0{,}8)^{10}`,
          calc: String.raw`1 - 0{,}1074 = 0{,}8926 \quad (89{,}26\%)`,
          note: "Számológépben: 1 - 0,8^10 = 0,8926. Kész 10 másodperc alatt!"
        },
        {
          head: "2. LÉPÉS (Poisson): Időarányos λ kiszámítása",
          body: "Az óránkénti ráta r = 6. Az időablak 20 perc = 20/60 óra = 1/3 óra. Az új λ a 20 percre:",
          formula: String.raw`\lambda = r \cdot t = 6 \cdot \frac{1}{3} = 2`,
          note: "Mindig számold át a λ-t a megadott időhöz, ez a leggyakoribb hiba!"
        },
        {
          head: "3. LÉPÉS (Poisson): Pontosan k = 2 hiba esélye",
          body: "Behelyettesítünk a Poisson képletbe:",
          formula: String.raw`P(X = 2) = \frac{\lambda^2}{2!} e^{-\lambda} = \frac{2^2}{2!} e^{-2} = \frac{4}{2} \cdot e^{-2} = 2 \cdot 0{,}13533 = 0{,}2707 \quad (27{,}07\%)`,
          note: "Számológépen: e^(-2) * 4 / 2 = 0,2707."
        }
      ]
    },
    {
      id: "joint-indep",
      badge: "05. MESTERSABLON (13. témakör)",
      title: "Kétváltozós eloszlás táblázat: Peremek és Függetlenség cáfolata",
      problem: "Adott a közös eloszlás táblázat: P(X=0, Y=0)=0,1; P(X=0, Y=1)=0,2; P(X=1, Y=0)=0,3; P(X=1, Y=1)=0,4. a) Írja fel a peremeloszlásokat! b) Független-e X és Y? c) Mennyi P(Y=1 | X=1)?",
      steps: [
        {
          head: "1. LÉPÉS: Peremeloszlások (Sor- és Oszlopösszegek)",
          body: "X eloszlása a sorok összege, Y eloszlása az oszlopok összege:",
          formula: String.raw`P(X = 0) = 0{,}1 + 0{,}2 = 0{,}3, \quad P(X = 1) = 0{,}3 + 0{,}4 = 0{,}7`,
          calc: String.raw`P(Y = 0) = 0{,}1 + 0{,}3 = 0{,}4, \quad P(Y = 1) = 0{,}2 + 0{,}4 = 0{,}6`,
          note: "Ellenőrzés: 0,3 + 0,7 = 1,0 és 0,4 + 0,6 = 1,0."
        },
        {
          head: "2. LÉPÉS: Függetlenség tesztelése egyetlen cellával",
          body: "Függetlenség akkor és csak akkor áll fenn, ha minden cellára igaz: p_ij = p_i · p_j. Vesszük a bal felső cellát (X=0, Y=0):",
          formula: String.raw`p_{00} = 0{,}10 \qquad \text{De a peremek szorzata: } P(X=0) \cdot P(Y=0) = 0{,}30 \cdot 0{,}40 = 0{,}12`,
          calc: String.raw`0{,}10 \ne 0{,}12 \implies \mathbf{X \text{ és } Y \text{ NEM FÜGGETLENEK!}}`,
          note: "Ennyi! Egyetlen eltérés azonnal és véglegesen cáfolja a függetlenséget!"
        },
        {
          head: "3. LÉPÉS: Feltételes valószínűség P(Y=1 | X=1)",
          body: "Képlet: a közös cella osztva a feltétel peremtömegével:",
          formula: String.raw`P(Y = 1 \mid X = 1) = \frac{P(X=1, Y=1)}{P(X=1)} = \frac{0{,}40}{0{,}70} = \frac{4}{7} \approx 0{,}5714 \quad (57{,}14\%)`,
          note: "Az X=1 sort tekintjük az új teljes alaphalmaznak (0,70), és abban nézzük Y=1 arányát (0,40)."
        }
      ]
    }
  ];

  const currentProto = protocols[active];

  return (
    <div style={{ background: "#f5f3e9", border: "2px solid #284433", borderRadius: "6px", padding: "24px 20px", marginBottom: "36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px", borderBottom: "1px solid #c2cdc0", paddingBottom: "12px", marginBottom: "16px" }}>
        <div>
          <span style={{ font: "700 11px var(--font-display)", color: "#31513c", letterSpacing: "0.08em" }}>🎯 A ZH-BAN LEGGYAKORIBB 5 NAGY MESTERSABLON</span>
          <h3 style={{ margin: "4px 0 0", fontSize: "20px", color: "#192c21" }}>Lépésről lépésre kidolgozott vizsgafeladatok</h3>
        </div>
        <span style={{ fontSize: "12px", color: "#54784a", fontWeight: 600 }}>Válassz egy sablont alább:</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingBottom: "8px", marginBottom: "20px" }}>
        {protocols.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            style={{
              padding: "10px 14px",
              borderRadius: "4px",
              border: active === i ? "2px solid #203c32" : "1px solid #c2cdc0",
              background: active === i ? "#203c32" : "#ffffff",
              color: active === i ? "#d7f36b" : "#2d4434",
              font: "700 12px var(--font-display)",
              cursor: "pointer",
              whiteSpace: "normal", textAlign: "left", maxWidth: "100%"
            }}
          >
            {i + 1}. {p.title.split(":")[0]}
          </button>
        ))}
      </div>

      <div style={{ background: "#ffffff", border: "1px solid #c8d3c2", borderRadius: "5px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#789444", textTransform: "uppercase", letterSpacing: "0.08em" }}>{currentProto.badge}</span>
        </div>
        <h4 style={{ margin: "0 0 12px", fontSize: "17px", color: "#182c20" }}>{currentProto.title}</h4>

        <div style={{ background: "#fbfbf7", borderLeft: "3px solid #31513c", padding: "12px 14px", marginBottom: "20px", fontSize: "13px", lineHeight: "1.6", color: "#2d3d32" }}>
          <strong style={{ color: "#1b3324", display: "block", marginBottom: "4px" }}>A FELADAT SZÖVEGE A ZH-BAN:</strong>
          {currentProto.problem}
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          {currentProto.steps.map((st, sIdx) => (
            <div key={sIdx} style={{ background: "#fcfcf9", border: "1px solid #d9e2d5", borderRadius: "4px", padding: "14px 16px" }}>
              <strong style={{ color: "#284433", fontSize: "13px", display: "block", marginBottom: "6px" }}>{st.head}</strong>
              <p style={{ margin: "0 0 8px", fontSize: "13px", lineHeight: "1.6", color: "#334638" }}>{st.body}</p>

              <div style={{ background: "#111f16", padding: "12px 16px", borderRadius: "4px", border: "1px solid #2c4535", color: "#ffffff", margin: "8px 0", overflowX: "auto" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#d7f36b", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>LEVEZETÉS A DOLGOZATBAN:</span>
                <div style={{ color: "#ffffff", fontSize: "16px" }}>
                  <LatexRenderer math={st.formula} />
                </div>
                {st.calc && (
                  <div style={{ color: "#ffffff", fontSize: "16px", marginTop: "8px", borderTop: "1px dashed #304a39", paddingTop: "8px" }}>
                    <LatexRenderer math={st.calc} />
                  </div>
                )}
              </div>

              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#1a4025", background: "#eef6eb", border: "1px solid #cfded0", padding: "6px 10px", borderRadius: "3px" }}>
                <strong>💡 ZH-értékelés:</strong> {st.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SosSurvivalGuide({ onSelectLesson }: { onSelectLesson: (id: string) => void }) {
  const rules = [
    {
      num: "01",
      title: "Halmazok / Szita-formula",
      trigger: "Három tulajdonság/nyelv, páros metszetek, hármas metszet. Legalább egy / egyik sem.",
      formula: String.raw`P(A \cup B \cup C) = \sum P(A) - \sum P(A \cap B) + P(A \cap B \cap C)`,
      plugIn: "P(legalább 1) = 45 + 38 + 32 - (18 + 15 + 12) + 6 = 76%  ⟹  P(egyik sem) = 100% - 76% = 24%",
      recipe: "Mindig a legbelső hármassal kezdd! A páros adatokból vond le ezt a közepet. 'Legalább egy' = Szita-formula. 'Egyik sem' = 100 mínusz a belső összeg.",
      danger: "A megadott páros adatokat NE írd be egyből a diagramba, mert a hármas metszet már benne van!",
      lessonId: "esemenyek"
    },
    {
      num: "02",
      title: "Golyóhúzás visszatevés nélkül (Hipergeometria)",
      trigger: "Dobozban S selejt és J jó termék, kihúzunk n-et egyszerre. Pontosan k selejt esélye.",
      formula: String.raw`P(X = k) = \frac{\binom{S}{k} \cdot \binom{J}{n - k}}{\binom{S + J}{n}}`,
      plugIn: "5 selejt, 15 jó (N=20), n=4 húzás, k=2 selejt: [C(5,2)·C(15,2)] / C(20,4) = (10·105)/4845 ≈ 0,2167",
      recipe: "Törtvonal! Számláló: kedvező darabok kombinációi összeszorozva. Nevező: összes lehetséges választás C(N, n). Számológép: nCr gomb!",
      danger: "Ha a húzás visszatevés NÉLKÜLI, TILOS p^k-val vagy binomiálissal számolni! Felső számok összege: S + J = N!",
      lessonId: "kombinatorika"
    },
    {
      num: "03",
      title: "Geometria: Négyzet és találkozás / várakozás",
      trigger: "Két független érkezés [0, T] ablakban, távolságuk |X - Y| ≤ d.",
      formula: String.raw`P(|X - Y| \le d) = 1 - \frac{(T - d)^2}{T^2}`,
      plugIn: "T = 60 perc, d = 15 perc: P = 1 - (60 - 15)² / 60² = 1 - 45² / 3600 = 1 - 0,5625 = 0,4375",
      recipe: "1 MÍNUSZ A KÉT ROSSZ SAROK! A két sarok együtt egy (T - d) oldalú négyzet területét adja ki.",
      danger: "Ha azt kérdezik, hogy 'legalább d-t kell várniuk' (|X - Y| ≥ d), akkor pont a két sarok a jó: (T - d)² / T²!",
      lessonId: "geometria"
    },
    {
      num: "04",
      title: "Bayes-tétel (Gép/Teszt selejt)",
      trigger: "Több gép vagy teszt. Megtudtuk a hibás eredményt (+), mennyi az esélye az eredeti oknak?",
      formula: String.raw`P(A_1 \mid B) = \frac{P(A_1) \cdot P(B \mid A_1)}{\sum_{i} P(A_i) \cdot P(B \mid A_i)}`,
      plugIn: "Gép1 (60%, hiba 2%), Gép2 (40%, hiba 5%): P(G1|hiba) = (0,6·0,02) / (0,6·0,02 + 0,4·0,05) = 0,012 / 0,032 = 0,375",
      recipe: "Számláló: a kérdezett ág szorzata. Nevező: az összes lehetséges hibaág összege (Teljes valószínűség).",
      danger: "A nevezőbe soha ne 1-et és ne a gép önálló arányát írd, hanem az összes hibás termék összegezett valószínűségét!",
      lessonId: "bayes"
    },
    {
      num: "05",
      title: "Diszkrét eloszlásfüggvény F(x)",
      trigger: "Értékek és esélyek. Írd fel F(x)-et, vagy kérdezik P(a ≤ X < b)-t.",
      formula: String.raw`F(x) = P(X < x) = \sum_{x_i < x} p_i, \qquad P(a \le X < b) = F(b) - F(a)`,
      plugIn: "X ∈ {1, 2, 3}, esélyek: 0,2; 0,5; 0,3  ⟹  P(2 ≤ X < 3) = F(3) - F(2) = 0,7 - 0,2 = 0,5",
      recipe: "Lépcsős függvény 0-tól 1-ig. F(x) = az x-nél szigorúan kisebb értékek összegezve. Egy pont esélye = a lépcsőugrás.",
      danger: "A kurzus jelölése F(x) = P(X < x) (szigorúan kisebb!), ezért az ugróponton még az alsó szinten marad!",
      lessonId: "eloszlasfuggveny"
    },
    {
      num: "06",
      title: "Várható érték, Szórásnégyzet, Steiner",
      trigger: "Értékek és esélyek. Keresett: E(X), Var(X), D(X), vagy Y = aX + b.",
      formula: String.raw`E(X) = \sum x_i p_i, \quad Var(X) = E(X^2) - [E(X)]^2, \quad Var(aX + b) = a^2 \cdot Var(X)`,
      plugIn: "E(X) = 2,4, E(X²) = 6,8  ⟹  Var(X) = 6,8 - 2,4² = 6,8 - 5,76 = 1,04,  D(X) = √1,04 ≈ 1,02",
      recipe: "1. E(X) = súlyozott átlag. 2. E(X²) = négyzetek súlyozott átlaga. 3. Steiner: E(X²) - (E[X])². D(X) = gyök(Var).",
      danger: "A +b konstans eltolás nem változtatja a szórást, de az 'a' számszorzó NÉGYZETRE emelődik a szórásnégyzetben!",
      lessonId: "momentumok"
    },
    {
      num: "07",
      title: "Binomiális eloszlás",
      trigger: "n független kísérlet, mindegyiknél p siker. Pontosan k siker, vagy 'legalább 1'.",
      formula: String.raw`P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad E(X) = np, \quad Var(X) = np(1 - p)`,
      plugIn: "n=10, p=0,2, k=3: P(X=3) = C(10,3) · (0,2)³ · (0,8)⁷ = 120 · 0,008 · 0,2097 ≈ 0,2013",
      recipe: "Számológép: nCr(n, k) * p^k * (1-p)^(n-k). 'Legalább 1 siker' trükk: 1 - (1 - p)^n.",
      danger: "'Legalább 1 siker' esetén SOHA ne adj össze tagokat: mindig 1 mínusz a 0 siker esélye!",
      lessonId: "binomialis"
    },
    {
      num: "08",
      title: "Örökifjúság (Geometriai és Exponenciális)",
      trigger: "Már vártunk s időt/dobást, mennyi az esélye, hogy még legalább t-t kell várni?",
      formula: String.raw`P(X > s + t \mid X > s) = P(X > t) = \begin{cases} (1 - p)^t & \text{(Geo)} \\ e^{-\lambda t} & \text{(Exp)} \end{cases}`,
      plugIn: "Exp(λ = 0,5), s = 3 évig már ment, még t = 1 év: P(X > 4 | X > 3) = P(X > 1) = e^(-0,5·1) ≈ 0,6065",
      recipe: "A MÚLT TÖRLŐDIK! Az 's' feltételt egyszerűen kihúzod a szövegből, és csak a 't' időre számolsz.",
      danger: "Ez a felejtési tulajdonság KIZÁRÓLAG a Geometriai és az Exponenciális eloszlásra érvényes!",
      lessonId: "orokifju"
    },
    {
      num: "09",
      title: "Poisson-eloszlás (Időablakos ráta)",
      trigger: "Események óránkénti rátája r, és t időtartam alatt k esemény esélyét kérdezik.",
      formula: String.raw`\lambda = r \cdot t, \qquad P(X = k) = \frac{\lambda^k}{k!} e^{-\lambda}, \qquad E(X) = Var(X) = \lambda`,
      plugIn: "r = 4 hívás/óra, t = 0,5 óra (30 perc)  ⟹  λ = 4 · 0,5 = 2.  P(X=3) = (2³ / 3!) · e^(-2) = (8/6) · 0,1353 ≈ 0,1804",
      recipe: "1. Új ráta az adott időre: λ = r · t. 2. Pontosan k esemény: (λ^k / k!) · e^(-λ). 3. Legalább 1 esemény: 1 - e^(-λ).",
      danger: "Mindig igazítsd a λ-t az időhöz! Ha fél óráról van szó, akkor a megadott óránkénti rátát meg kell felezni!",
      lessonId: "poisson"
    },
    {
      num: "10",
      title: "Folytonos sűrűségfüggvény f(x)",
      trigger: "Képlet f(x) = c·g(x) egy intervallumon, c meghatározása, valószínűség, várható érték.",
      formula: String.raw`\int_{-\infty}^{\infty} f(x)\,dx = 1 \implies c, \quad P(a < X < b) = \int_a^b f(x)\,dx, \quad E(X) = \int_{-\infty}^{\infty} x f(x)\,dx`,
      plugIn: "f(x) = cx a [0, 2]-n: ∫₀² cx dx = c[x²/2]₀² = 2c = 1  ⟹  c = 1/2.  P(1 < X < 2) = ∫₁² (x/2) dx = [x²/4]₁² = 4/4 - 1/4 = 0,75",
      recipe: "1. Teljes integrál = 1 → ebből kijön c. 2. P(a < X < b) = sűrűség integrálja a-tól b-ig. 3. E(X) = x·f(x) integrálja.",
      danger: "Folytonos változónál egyetlen konkrét pont valószínűsége mindig NULLA: P(X = 1,5) = 0! Csak intervallumnak van területe!",
      lessonId: "suruseg"
    },
    {
      num: "11",
      title: "Normális eloszlás & Standardizálás",
      trigger: "X ~ N(μ, σ²), kérdezik az intervallum vagy küszöb valószínűségét.",
      formula: String.raw`Z = \frac{X - \mu}{\sigma}, \quad P(a < X < b) = \Phi\left(\frac{b - \mu}{\sigma}\right) - \Phi\left(\frac{a - \mu}{\sigma}\right), \quad \Phi(-z) = 1 - \Phi(z)`,
      plugIn: "X ~ N(100, 25) ⟹ μ=100, σ=√25=5.  P(X < 110) = Φ((110-100)/5) = Φ(2,00) = 0,9772",
      recipe: "1. Váltsd át z-re: z = (x - μ) / σ. 2. Keresd ki Φ(z)-t a táblázatból. 3. Negatív érték: Φ(-z) = 1 - Φ(z).",
      danger: "Ha a feladatban N(100, 225) szerepel, a 225 a σ², a szórás σ = 15! 15-tel kell osztani, nem 225-tel!",
      lessonId: "normalis"
    },
    {
      num: "12",
      title: "Binomiális közelítése normálissal (Moivre-Laplace)",
      trigger: "Nagy n mellett kérdeznek binomiális valószínűséget (pl. n=400 érmedobás).",
      formula: String.raw`\mu = np, \quad \sigma = \sqrt{np(1-p)}, \quad P(k_1 \le X \le k_2) \approx \Phi\left(\frac{k_2 + 0{,}5 - \mu}{\sigma}\right) - \Phi\left(\frac{k_1 - 0{,}5 - \mu}{\sigma}\right)`,
      plugIn: "n=400, p=0,5 ⟹ μ=200, σ=√(400·0,5·0,5)=10. P(X ≤ 215) ≈ Φ((215,5 - 200)/10) = Φ(1,55) = 0,9394",
      recipe: "1. μ = np, σ = gyök(npq). 2. FOLYTONOSSÁGI KORREKCIÓ: határok szélesítése ±0,5-tel. 3. Standardizálás és Φ táblázat.",
      danger: "Normális közelítésnél ha elfelejted a ±0,5-ös korrekciót az oszlopok széléhez, garantált a pontlevonás!",
      lessonId: "kozelites"
    },
    {
      num: "13",
      title: "Kétváltozós eloszlás táblázat (Függetlenség)",
      trigger: "2×2 vagy 3×3 cellatáblázat (X, Y). Peremek és függetlenség megállapítása.",
      formula: String.raw`p_{i\bullet} = \sum_j p_{ij}, \quad p_{\bullet j} = \sum_i p_{ij}, \qquad X, Y \text{ független } \iff p_{ij} = p_{i\bullet} \cdot p_{\bullet j}`,
      plugIn: "Cella: P(X=1, Y=2) = 0,10.  Sorösszeg = 0,30, Oszlopösszeg = 0,40.  0,30 · 0,40 = 0,12 ≠ 0,10  ⟹  NEM FÜGGETLENEK!",
      recipe: "Peremek: sor- és oszlopösszegek. Függetlenség: ha bármelyik cella ≠ sorösszeg · oszlopösszeg → NEM FÜGGETLENEK!",
      danger: "Egyetlen cella egyezése nem bizonyítja a függetlenséget, de egyetlen eltérés azonnal cáfolja!",
      lessonId: "fuggetlenseg"
    },
    {
      num: "14",
      title: "Kovariancia és Korreláció",
      trigger: "Cov(X,Y) vagy korreláció ρ kiszámítása, összefüggés a függetlenséggel.",
      formula: String.raw`\text{Cov}(X,Y) = E(XY) - E(X)E(Y), \qquad \rho(X,Y) = \frac{\text{Cov}(X,Y)}{D(X) \cdot D(Y)}`,
      plugIn: "E(XY) = 2,8, E(X) = 1,5, E(Y) = 1,6  ⟹  Cov(X,Y) = 2,8 - (1,5 · 1,6) = 2,8 - 2,4 = 0,4",
      recipe: "1. E(XY) = Σ x·y·p. 2. Cov = E(XY) - E(X)E(Y). 3. ρ = Cov / [D(X)D(Y)]. Ha ρ = 0, korrelálatlanok.",
      danger: "KORRELÁLATLAN NEM JELENT FÜGGETLENT! Pl. Y = X² esetén ρ = 0, pedig Y teljesen determinisztikusan függ X-től!",
      lessonId: "kovariancia"
    },
    {
      num: "15",
      title: "Regressziós egyenes",
      trigger: "Legjobb becslő egyenes illesztése pontokra vagy átlagokra: ŷ = α + βx.",
      formula: String.raw`\hat{\beta} = \frac{\text{Cov}(X,Y)}{Var(X)} = \frac{\overline{xy} - \bar{x}\bar{y}}{\overline{x^2} - (\bar{x})^2}, \qquad \hat{\alpha} = \bar{y} - \hat{\beta}\bar{x}`,
      plugIn: "x̄=3, ȳ=7, xy_átlag=25, x²_átlag=11  ⟹  β = (25 - 21) / (11 - 9) = 4/2 = 2.  α = 7 - 2·3 = 1  ⟹  ŷ = 2x + 1",
      recipe: "1. Meredekség: β = Cov(X,Y) / Var(X). 2. Tengelymetszet: α = ȳ - βx̄. Az egyenes átmegy az (x̄, ȳ) súlyponton.",
      danger: "A meredekség nevezőjében x² átlaga mínusz az átlag négyzete szerepel (Var(X)), soha nem az Y szórása!",
      lessonId: "statisztika"
    },
    {
      num: "16",
      title: "Hipotézisvizsgálat (u-próba)",
      trigger: "H0: μ = μ0 feltevés tesztelése mintaátlag és ismert σ alapján α=0,05 szinten.",
      formula: String.raw`u = \frac{\bar{x} - \mu_0}{\frac{\sigma}{\sqrt{n}}}, \qquad |u| > 1{,}96 \implies \text{Elutasítjuk } H_0\text{-t}`,
      plugIn: "μ0=100, σ=10, n=25, x̄=104: u = (104 - 100) / (10 / √25) = 4 / (10/5) = 4/2 = 2,00. Mivel |2,00| > 1,96  ⟹  H0 ELVETVE!",
      recipe: "1. Standard hiba: SE = σ / √n. 2. Statisztika: u = (x̄ - μ0) / SE. 3. Ha |u| > 1,96 (5%-on), H0-t ELUTASÍTJUK.",
      danger: "A nevezőben a mintaelemszám GYÖKÉVEL (√n) kell osztani! 25 minta esetén 5-tel kell osztani, nem 25-tel!",
      lessonId: "probak"
    }
  ];

  return (
    <section className={styles.secondary} style={{ maxWidth: 1050 }}>
      <p className={styles.kicker}>⚡ 48 ÓRÁS ZH-TÚLÉLŐ PROTOKOLL / VÉSZTARTALÉK</p>
      <h2>Ha törik, ha szakad: azonnal használható vizsgasablonok.</h2>
      <p className={styles.lead}>
        Nincsenek tankönyvi körmondatok. Először a leggyakoribb 5 feladattípust találod elejétől a végéig kidolgozva, utána pedig a 16 típus instant receptjét és képletét.
      </p>

      <MasterProtocols />

      <h3 style={{ fontSize: "20px", color: "#192c21", marginTop: "36px", marginBottom: "8px" }}>
        📋 A 16 feladattípus instant receptje és ellenőrzött képlete
      </h3>
      <p style={{ fontSize: "13px", color: "#617065", margin: "0 0 20px" }}>
        Minden képlet kiemelt sötétzöld kártyán, nagy kontraszttal jelenik meg a könnyű olvashatóságért.
      </p>

      <div style={{ display: "grid", gap: "18px", marginTop: "16px" }}>
        {rules.map(r => (
          <div key={r.num} style={{ background: "#fcfbf5", border: "1px solid #c9d2bf", borderLeft: "4px solid #31513c", borderRadius: "4px", padding: "18px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
              <span style={{ font: "700 14px var(--font-display)", color: "#31513c" }}>{r.num} · {r.title}</span>
              <button onClick={() => onSelectLesson(r.lessonId)} style={{ background: "none", border: 0, color: "#54784a", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>Interaktív feladat megnyitása →</button>
            </div>
            <div style={{ display: "grid", gap: "8px", fontSize: "13px", lineHeight: "1.6", color: "#334438" }}>
              <p style={{ margin: 0 }}><strong>🔍 Miről ismered fel?</strong> {r.trigger}</p>

              <div style={{ background: "#111f16", padding: "12px 16px", borderRadius: "5px", border: "1px solid #2d4535", margin: "6px 0", overflowX: "auto", color: "#ffffff" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#d7f36b", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>📐 A KÉPLET, AMIT FEL KELL ÍRNOD A PAPÍRRA:</span>
                <div style={{ color: "#ffffff", fontSize: "17px" }}>
                  <LatexRenderer math={r.formula} />
                </div>
              </div>

              <div style={{ margin: "2px 0 6px 0", color: "#14281a", fontFamily: "monospace", fontSize: "12px", background: "#edf4e8", border: "1px solid #c8d9be", padding: "8px 12px", borderRadius: "4px", lineHeight: "1.5" }}>
                <strong style={{ color: "#22442a" }}>🔢 Számológépes behelyettesítés:</strong> {r.plugIn}
              </div>

              <p style={{ margin: 0 }}><strong>🛠️ A recept (lépések):</strong> {r.recipe}</p>
              <p style={{ margin: 0, color: "#8a3e22" }}><strong>⚠️ Vizsgacsapda:</strong> {r.danger}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
