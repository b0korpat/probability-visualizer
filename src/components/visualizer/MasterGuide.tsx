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
  const [tab, setTab] = useState<"learn" | "hacks" | "reference">("learn");
  const [query, setQuery] = useState("");
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
    setSelected(id); setStep(0); setChoice(null); setTab("learn");
    requestAnimationFrame(() => document.getElementById("lesson-title")?.scrollIntoView({ block: "start" }));
  }
  function goStep(next: number) {
    setStep(next);
    requestAnimationFrame(() => document.getElementById("teaching-stage")?.scrollIntoView({ block: "start" }));
  }
  function markComplete() {
    const next = completed.includes(selected) ? completed.filter(id => id !== selected) : [...completed, selected];
    setCompleted(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setSaveMessage("Haladás mentve ebben a böngészőben."); }
    catch { setSaveMessage("A haladás most csak ebben a megnyitott munkamenetben érhető el."); }
  }
  const filtered = masterLessons.filter(l => `${l.title} ${l.lead} ${l.category}`.toLocaleLowerCase("hu-HU").includes(query.toLocaleLowerCase("hu-HU")));

  return <main className={styles.root}>
    <header className={styles.header}><Link href="/" className={styles.back}>← Modulválasztó</Link><span className={styles.brand}>probability<span>/</span>lab</span><span className={styles.headerMeta}>FELKÉSZÜLÉS · N01</span></header>
    <section className={styles.hero} aria-labelledby="master-title"><div><p className={styles.kicker}>VALÓSZÍNŰSÉGSZÁMÍTÁS / AZ ALAPOKTÓL</p><h1 id="master-title">NAGY ZH<span>1</span><span className={styles.heroDot}>.</span></h1><p className={styles.heroCopy}>Mit? Miért? Hogyan?<br /><span>A jelölésektől a válaszig: minden szám magyarázattal, minden lépés ábrával.</span></p></div><div className={styles.heroStats}><div><strong>{masterLessons.length}</strong><span>kidolgozott feladat</span></div><div><strong>{teachingStepCount}</strong><span>apró megoldási lépés</span></div><p>{completed.length}/{masterLessons.length} megjelölve késznek</p><progress aria-label="Elkészült feladatok" value={completed.length} max={masterLessons.length} /></div></section>
    <nav className={styles.tabs} aria-label="Modul nézetei">{([["learn", "01 / Feladatműhely"], ["hacks", "02 / ZH-gyorsmódszerek"], ["reference", "03 / Képlettár"]] as const).map(([id,label]) => <button key={id} aria-pressed={tab===id} onClick={() => setTab(id)}>{label}</button>)}</nav>

    {tab === "learn" ? <div className={styles.workspace}>
      <aside className={styles.sidebar}><label className={styles.searchLabel} htmlFor="lesson-search">TÉMAKÖRÖK ÉS FELADATOK</label><input id="lesson-search" className={styles.search} type="search" placeholder="Keresés, pl. Bayes…" value={query} onChange={e=>setQuery(e.target.value)} /><nav aria-label="NAGY ZH1 feladatok">
        {categories.map(category => { const lessons = filtered.filter(l=>l.category===category); return lessons.length ? <section className={styles.navGroup} key={category}><h2>{category}{category==="Kitekintés" ? " · bővített anyag" : ""}</h2>{lessons.map(l=><button key={l.id} className={l.id===selected ? styles.selected : ""} aria-current={l.id===selected ? "page" : undefined} onClick={()=>chooseLesson(l.id)}><span className={styles.lessonNumber}>{completed.includes(l.id) ? "✓" : String(masterLessons.indexOf(l)+1).padStart(2,"0")}</span><span>{l.title}</span></button>)}</section> : null; })}
        {!filtered.length ? <p className={styles.empty}>Nincs találat. Próbálj másik témát!</p> : null}
      </nav></aside>
      <article className={styles.lesson} aria-labelledby="lesson-title">
        <div className={styles.lessonTopline}><span>{lesson.category} / {String(index+1).padStart(2,"0")}</span><button className={styles.complete} aria-pressed={completed.includes(selected)} onClick={markComplete}>{completed.includes(selected) ? "✓ Késznek jelölve" : "○ Késznek jelölöm"}</button></div>
        <h2 id="lesson-title">{lesson.title}</h2><p className={styles.lead}>{lesson.lead}</p>
        <section className={styles.notation} aria-labelledby="notation-title">
          <span className={styles.smallLabel}>ELŐSZÖR: MIT MIVEL JELÖLÜNK?</span>
          <h3 id="notation-title">Minden betű kap egy jelentést.</h3>
          <p>{teaching.goal}</p>
          <dl>{teaching.notation.map(([symbol,meaning,reason])=><div key={symbol}><dt>{symbol}</dt><dd><strong>{meaning}</strong><p>{reason}</p></dd></div>)}</dl>
        </section>
        <section className={styles.statement}><span className={styles.smallLabel}>A FELADAT</span><p>{lesson.statement}</p><div className={styles.data}>{lesson.data.map(item=><span key={item}>{item}</span>)}</div></section>
        <details className={styles.theory}><summary>A műveleti jelek olvasása — ha most kezded</summary><p>Az = azt jelenti: a két oldal ugyanannyi. A · vagy × szorzás, például 3·4 három darab négyes összege: 4+4+4=12. A tört vagy / osztás: 6/3=2. A nevező a tört alsó, a számláló a felső száma. A 2² jelentése 2·2=4; √4 az a nemnegatív szám, amelynek négyzete 4, tehát 2. A ≈ közelítő, kerekített értéket jelent. A &lt; kisebb, a ≤ kisebb vagy egyenlő. A P valószínűség: a 0 lehetetlen, az 1 biztos esemény; 0,25=25/100=25%. Egy rész esélyét a teljes, megfelelően választott csoporthoz viszonyítjuk.</p></details>
        <details className={styles.theory}><summary>Elmélet és alkalmazási feltételek</summary><p>{lesson.theory}</p></details>
        <div className={styles.rule}><span>ZH-FOGÁS</span><p>{lesson.rule}</p></div>
        <section className={styles.solution} aria-label="Lépésenkénti megoldás">
          <div className={styles.stepTabs} aria-label="Megoldás lépései">{steps.map((s,i)=><button key={i} aria-pressed={step===i} onClick={()=>goStep(i)}><span>{String(i+1).padStart(2,"0")}</span>{s.title}</button>)}</div>
          <div id="teaching-stage" className={styles.teachingStage}>
            <div className={styles.stepControls}><button disabled={step===0} onClick={()=>goStep(step-1)}>← Előző lépés</button><span>{step+1}/{steps.length}</span><button disabled={step===steps.length-1} onClick={()=>goStep(step+1)}>Következő lépés →</button></div>
            <div className={styles.teachingGrid}>
              <div className={styles.stepBody} aria-live="polite"><span className={styles.smallLabel}>{step+1} / {steps.length} · MIT CSINÁLUNK MOST?</span><h3>{current.title}</h3><p>{current.explanation}</p>
                <div className={styles.whyBox}><h4>Miért pont ezt csináljuk?</h4><p>{current.why}</p></div>
                <div className={styles.formula}><LatexRenderer math={teachingMath(current.formula)} /></div>
              </div>
              <TeachingVisual kind={lesson.visual} current={current} step={step} total={steps.length} />
              <div className={styles.teachingOrigins}><NumberOrigins current={current} /></div>
            </div>
            <div className={styles.stepControls}><button disabled={step===0} onClick={()=>goStep(step-1)}>← Előző lépés</button><span>{step===steps.length-1?"A teljes levezetés végére értél.":"A következő lépésben az ábra is továbbépül."}</span><button disabled={step===steps.length-1} onClick={()=>goStep(step+1)}>Következő lépés →</button></div>
          </div>
        </section>
        {step===steps.length-1?<p className={styles.answer}><strong>A feladat válasza: </strong>{lesson.answer}</p>:null}
        <details className={styles.fullSolution}><summary>Teljes megoldás egyben, minden szám magyarázatával</summary>{steps.map((s,i)=><section key={s.title}><h3>{i+1}. {s.title}</h3><p>{s.explanation}</p><p><strong>Miért? </strong>{s.why}</p><div className={styles.formula}><LatexRenderer math={teachingMath(s.formula)} /></div><NumberOrigins current={s} /></section>)}<p className={styles.answer}>{lesson.answer}</p></details>
        <aside className={styles.trap}><span className={styles.smallLabel}>ERRE FIGYELJ</span><p>{lesson.trap}</p></aside>
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
  return <section className={styles.numberOrigins} aria-label="Honnan jönnek a számok?"><h4>Honnan jönnek a számok?</h4><dl>{current.numbers.map(([number,meaning])=><div key={number}><dt>{number}</dt><dd>{meaning}</dd></div>)}</dl></section>;
}

function DistributionTable() {
  return <div className={styles.distributionTable} role="region" aria-label="Eloszlások összehasonlító képlettára" tabIndex={0}>
    <table><caption>Nevezetes eloszlások — a sűrűség a megadott tartományon kívül nulla.</caption><thead><tr><th scope="col">Eloszlás / tartomány</th><th scope="col">Tömeg vagy sűrűség</th><th scope="col">E(X)</th><th scope="col">D²(X)</th></tr></thead><tbody>{distributionReference.map(d=><tr key={d.name}><th scope="row">{d.name}<small>{d.support}</small></th><td><LatexRenderer math={d.formula} /></td><td><LatexRenderer math={d.mean} /></td><td><LatexRenderer math={d.variance} /></td></tr>)}</tbody></table>
  </div>;
}

function ExamChecklist() {
  return <section className={styles.checklist}><h3>Beadás előtti mentőöv</h3>{["A valószínűség 0 és 1 közé esik; a szórásnégyzet nemnegatív.", "Az időegységet és a paramétereket egyeztettem.", "Ha szórást kérnek, gyököt vontam a szórásnégyzetből.", "Az intervallum végpontjait és a közelítés korrekcióját ellenőriztem.", "A várható érték a lehetséges alsó és felső korlát közé esik, ha létezik.", "Függetlenséget nem kevertem össze a diszjunktsággal vagy a korrelálatlansággal."].map(text=><label key={text}><input type="checkbox" /><span>{text}</span></label>)}</section>;
}
