"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { LatexRenderer } from "@/components/visualizer/LatexRenderer";
import styles from "./DistributionLesson.module.css";

type LessonStep = {
  title: string;
  plain: string;
  technical: string;
  math?: string;
  takeaway?: string;
};

type Lesson = {
  id: string;
  eyebrow: string;
  title: string;
  statement: string;
  steps: LessonStep[];
};

const lessons: Lesson[] = [
  {
    id: "diesel",
    eyebrow: "DISZKRÉT VALÓSZÍNŰSÉGI VÁLTOZÓ",
    title: "Hány dízelmotor üzemel?",
    statement: "Három, egymástól független dízelmotor 0,5; 0,6; illetve 0,7 valószínűséggel működik. ξ az adott időpontban működő motorok száma. Határozd meg az eloszlást, Fξ(x)-et, E(ξ)-t és D(ξ)-t!",
    steps: [
      { title: "Mit jelent ξ?", plain: "ξ megszámolja, hány motor működik éppen. Három motorból 0, 1, 2 vagy 3 működhet.", technical: "A lehetséges értékekből áll össze a diszkrét változó értékkészlete.", math: String.raw`R_\xi=\{0,1,2,3\}`, takeaway: "Diszkrét változónál először mindig a lehetséges értékeket írd fel." },
      { title: "Komplementer valószínűségek", plain: "A működés mellett szükségünk lesz arra is, hogy az adott motor nem működik. Ezeket 1-ből kivonással kapjuk.", technical: "P(\\overline{A_i})=1-P(A_i). A függetlenség miatt a konkrét kombinációk esélyeit szorozni fogjuk.", math: String.raw`P(\overline{A_1})=0{,}5,\quad P(\overline{A_2})=0{,}4,\quad P(\overline{A_3})=0{,}3` },
      { title: "Az eloszlás kiszámítása", plain: "Például nulla motor akkor működik, ha mindhárom motor leáll. Pontosan egy, kettő vagy három motor esetén a megfelelő eseteket összeadjuk.", technical: "A független események metszetének valószínűsége a tényezők szorzata, az egymást kizáró eseteket pedig összeadjuk.", math: String.raw`P(\xi=0)=0{,}5\cdot0{,}4\cdot0{,}3=0{,}06\\P(\xi=1)=0{,}29,\quad P(\xi=2)=0{,}44,\quad P(\xi=3)=0{,}21`, takeaway: "A végén ellenőrzés: 0,06 + 0,29 + 0,44 + 0,21 = 1." },
      { title: "Eloszlásfüggvény: lépcsők", plain: "Fξ(x) azt jelenti: mekkora az esélye annak, hogy a motorok száma legfeljebb x. Minden új értéknél hozzáadjuk az új pont valószínűségét.", technical: "A diszkrét eloszlásfüggvény lépcsős. Az ugrás nagysága az adott pont valószínűsége.", math: String.raw`F_\xi(x)=\begin{cases}0,&x<0\\0{,}06,&0\le x<1\\0{,}35,&1\le x<2\\0{,}79,&2\le x<3\\1,&x\ge3\end{cases}` },
      { title: "Várható érték", plain: "A várható érték súlyozott átlag: a gyakoribb értékek jobban számítanak bele.", technical: "E(ξ)=Σxᵢpᵢ.", math: String.raw`E(\xi)=0\cdot0{,}06+1\cdot0{,}29+2\cdot0{,}44+3\cdot0{,}21=1{,}8`, takeaway: "A 1,8 nem azt jelenti, hogy mindig 1,8 motor működik; hosszú távú átlagot jelent." },
      { title: "Szórás", plain: "Előbb kiszámoljuk a négyzetes átlagot, abból a szórásnégyzetet, végül gyököt vonunk.", technical: "D²(ξ)=E(ξ²)−E²(ξ), majd D(ξ)=√D²(ξ).", math: String.raw`E(\xi^2)=3{,}94\\D^2(\xi)=3{,}94-1{,}8^2=0{,}70\\D(\xi)=\sqrt{0{,}70}\approx0{,}84`, takeaway: "A dolgozatban a szórásnégyzet és a szórás nem ugyanaz: az utolsó lépés a gyökvonás." }
    ]
  },
  {
    id: "density",
    eyebrow: "FOLYTONOS VALÓSZÍNŰSÉGI VÁLTOZÓ",
    title: "Sűrűségfüggvényből mindent",
    statement: "Egy ξ folytonos valószínűségi változó sűrűségfüggvénye f(x)=3/2·√x, ha 0≤x≤1, és 0 egyébként. Határozd meg a valószínűségeket, Fξ(x)-et, E(ξ)-t és D(ξ)-t!",
    steps: [
      { title: "Hol él a változó?", plain: "A görbe csak 0 és 1 között nem nulla, ezért az integrálásokat is erre a tartományra vágjuk le. Ezt a rajzon úgy látod, hogy 0 előtt és 1 után a görbe az x-tengelyen fut.", technical: "A kurzus értékkészlet-jelölésével Rξ={x∈R:f(x)>0}. Mivel f(0)=0, ez (0,1]. Ha a tanár a lehetséges tartományt kéri, gyakran [0,1]-et írunk.", math: String.raw`R_\xi=\{x\in\mathbb R:f(x)>0\}=(0,1]\quad\text{(tartományként: }[0,1]\text{)}`, takeaway: "Rξ-et úgy találod meg, hogy megkeresed azokat az x-eket, ahol f(x)>0: nem az y-értékeket, hanem az x-tartományt kell leolvasni." },
      { title: "Hogyan rajzold fel?", plain: "A vízszintes tengely az x, vagyis ξ lehetséges értéke. A függőleges tengely az f(x) magassága. Először jelöld be x=0 és x=1 helyét, mert csak közöttük rajzolunk görbét.", technical: "A legmagasabb szükséges y-érték f(1)=3/2. Jó segédpontok: f(0)=0, f(0,25)=3/4, f(1)=3/2. A √x görbe növekvő, de egyre laposabb.", math: String.raw`f(0)=0,\quad f\left(\frac14\right)=\frac34,\quad f\left(\frac12\right)=\frac{3}{2\sqrt2}\approx1{,}06,\quad f(1)=\frac32`, takeaway: "Nem kell milliméterre pontos művészi ábra: a 0-ból induló, növekvő, ellaposodó görbe és a [0,1] határ legyen egyértelmű." },
      { title: "Valószínűség = terület", plain: "Folytonos változónál egy intervallum valószínűsége a görbe alatti terület. 1,5-ig már nincs új terület, mert 1 után a sűrűség nulla.", technical: "P(0,5≤ξ≤1,5)=∫₀․₅¹f(x)dx.", math: String.raw`P(0{,}5\le\xi\le1{,}5)=\int_{0{,}5}^{1}\frac32\sqrt{x}\,dx=1-0{,}5^{3/2}\approx0{,}646` },
      { title: "Az eloszlásfüggvény felépítése", plain: "F(x) az x-ig felhalmozott terület. 0 előtt nincs terület, 0 és 1 között nő, 1 után pedig már az összes területet összegyűjtöttük.", technical: "Fξ(x)=∫₋∞ˣf(t)dt, ezért három tartományban kell felírni.", math: String.raw`F_\xi(x)=\begin{cases}0,&x<0\\x^{3/2},&0\le x\le1\\1,&x>1\end{cases}`, takeaway: "F(1)=1 azonnali ellenőrzés: a teljes sűrűség alatti területnek 1-nek kell lennie." },
      { title: "Várható érték", plain: "A folytonos változónál a súlyozott átlagot integrálással számoljuk: minden x-et megszorzunk az ottani sűrűséggel.", technical: "E(ξ)=∫x·f(x)dx a teljes tartón.", math: String.raw`E(\xi)=\int_0^1x\cdot\frac32\sqrt{x}\,dx=\frac35=0{,}6` },
      { title: "Szórás", plain: "Ugyanaz a logika, mint diszkrét esetben, csak összeg helyett integrál szerepel.", technical: "Előbb E(ξ²), majd D²(ξ)=E(ξ²)−E²(ξ), végül négyzetgyök.", math: String.raw`E(\xi^2)=\frac37\\D^2(\xi)=\frac37-\left(\frac35\right)^2=\frac{12}{175}\approx0{,}0686\\D(\xi)\approx0{,}26`, takeaway: "Diszkrét: Σ. Folytonos: ∫. A várható érték és a szórás képlete ugyanazt a gondolatot követi." }
    ]
  },
  {
    id: "parameter",
    eyebrow: "3. ZH · GYAKORLÓ FELADAT",
    title: "Paraméter, Rξ és Fξ",
    statement: "Legyen egy ξ folytonos valószínűségi változó sűrűségfüggvénye fξ(x)=a√x, ha 0≤x≤4, és 0 egyébként. Határozd meg az a paramétert, a változó értékkészletét és az eloszlásfüggvényt!",
    steps: [
      { title: "A feladatod", plain: "Először az a paramétert kell kitalálnod abból, hogy a teljes sűrűség alatti terület 1. Ezután írd fel Rξ-et és Fξ-et.", technical: "Használd a normalizálási feltételt: ∫₋∞∞fξ(x)dx=1. A megoldást most nem írjuk ki: ezt a típust önállóan gyakorold.", math: String.raw`\int_{-\infty}^{\infty}f_\xi(x)\,dx=1\quad\Longrightarrow\quad a\ ?`, takeaway: "ZH-sorrend: 1. a meghatározása, 2. Rξ, 3. Fξ három esetben." },
      { title: "Ellenőrző kérdések", plain: "Hol pozitív a sűrűség? Melyik határon kell nyitott zárójelet használni a tanszéki Rξ-jelölésben? Melyik integrálból lesz az Fξ középső ága?", technical: "A gyakorlófeladat célja, hogy a módszert önállóan reprodukáld, ne csak egy kész képletet másolj.", math: String.raw`R_\xi=\{x:f_\xi(x)>0\}\quad\text{és}\quad F_\xi(x)=\int_{-\infty}^{x}f_\xi(t)\,dt` },
      { title: "Kész a feladattípus", plain: "Ha ezt a három lépést biztosan tudod, akkor a dízelmotoros és a sűrűségfüggvényes feladatok logikája összeáll: értékek, eloszlásfüggvény, majd momentumok.", technical: "A paraméteres feladatnál a normalizálás az új elem; utána ugyanazokat az integrálási szabályokat használod.", takeaway: "Ne ugord át a sűrűség teljes területének ellenőrzését: ebből derül ki az a." }
    ]
  }
];

function DiscreteVisual({ step }: { step: number }) {
  const values = [0.06, 0.29, 0.44, 0.21];
  return <div className={styles.visualCard}><div className={styles.visualCaption}>MŰKÖDŐ MOTOROK SZÁMA</div><div className={styles.barChart}>{values.map((value, index) => <div className={`${styles.barColumn} ${step >= 2 ? styles.barVisible : ""}`} key={index}><span>{step >= 2 ? value.toFixed(2).replace(".", ",") : "?"}</span><i style={{ height: `${value * 220}px` }} /><b>{index}</b></div>)}</div><div className={styles.chartNote}>{step < 2 ? "A négy lehetséges kimenetet keressük." : "Az oszlop magassága az adott érték valószínűsége."}</div></div>;
}

function DensityVisual({ step, parameter }: { step: number; parameter?: boolean }) {
  return <div className={styles.visualCard}><div className={styles.visualCaption}>{parameter ? "PARAMÉTERES SŰRŰSÉG" : "SŰRŰSÉGFÜGGVÉNY · GÖRBE ALATTI TERÜLET"}</div><svg viewBox="0 0 520 250" className={styles.densitySvg} role="img" aria-label="Sűrűségfüggvény ábrája"><line x1="48" y1="210" x2="485" y2="210" className={styles.axis} /><line x1="48" y1="210" x2="48" y2="24" className={styles.axis} /><path d={parameter ? "M48 210 L48 190 L485 40 L485 210 Z" : "M48 210 C115 205 190 160 260 100 C325 55 390 36 485 32 L485 210 Z"} className={`${styles.area} ${step >= 1 ? styles.areaVisible : ""}`} /><path d={parameter ? "M48 190 L485 40" : "M48 210 C115 205 190 160 260 100 C325 55 390 36 485 32"} className={styles.curve} /><text x="43" y="229">0</text><text x={parameter ? "478" : "480"} y="229">{parameter ? "4" : "1"}</text><text x="13" y="35">f(x)</text><text x="480" y="246">x</text></svg><div className={styles.chartNote}>{step < 1 ? "A görbe csak a megadott intervallumon él." : "A satírozott területből lesz a valószínűség."}</div></div>;
}

export function DistributionLesson() {
  const [lessonId, setLessonId] = useState("diesel");
  const [current, setCurrent] = useState(0);
  const lesson = useMemo(() => lessons.find(item => item.id === lessonId) ?? lessons[0], [lessonId]);
  const step = lesson.steps[current] ?? lesson.steps[0];
  const changeLesson = (id: string) => { setLessonId(id); setCurrent(0); };
  const next = () => setCurrent(value => Math.min(value + 1, lesson.steps.length - 1));
  const previous = () => setCurrent(value => Math.max(value - 1, 0));
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if ((event.target as HTMLElement)?.matches("input, textarea, select")) return; if (event.key === "ArrowRight") next(); if (event.key === "ArrowLeft") previous(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); });

  return <main className={styles.shell}>
    <header className={styles.header}><div><span className={styles.kicker}>VALÓSZÍNŰSÉGSZÁMÍTÁS · 3. ZH</span><h1>Eloszlások, F és Rξ</h1></div><span className={styles.headerBadge}>LAPOZÓS FELKÉSZÍTŐ</span></header>
    <div className={styles.lessonTabs}>{lessons.map((item, index) => <button key={item.id} className={item.id === lesson.id ? styles.activeTab : ""} onClick={() => changeLesson(item.id)}><b>{String(index + 1).padStart(2, "0")}</b><span>{item.id === "diesel" ? "Dízelmotorok" : item.id === "density" ? "Sűrűségfüggvény" : "Paraméteres gyakorló"}</span></button>)}</div>
    <section className={styles.workspace}>
      <aside className={styles.sidebar}><span className={styles.eyebrow}>{lesson.eyebrow}</span><h2>{lesson.title}</h2><p className={styles.statement}>{lesson.statement}</p><div className={styles.progress}><span>MEGOLDÁS FOLYAMATA</span><b>{current + 1} / {lesson.steps.length}</b><i><em style={{ width: `${((current + 1) / lesson.steps.length) * 100}%` }} /></i></div><nav className={styles.stepList}>{lesson.steps.map((item, index) => <button key={item.title} className={index === current ? styles.activeStep : ""} onClick={() => setCurrent(index)}><span>{index < current ? <CheckCircle2 size={14} /> : String(index + 1).padStart(2, "0")}</span>{item.title}</button>)}</nav><small className={styles.keyboard}>← → nyilak: lapozás</small></aside>
      <section className={styles.content}><div className={styles.controls}><button onClick={previous} disabled={current === 0}><ChevronLeft size={16} /> előző</button><button onClick={() => setCurrent(0)}><RotateCcw size={14} /> újrakezdés</button><button onClick={next} disabled={current === lesson.steps.length - 1}>következő <ChevronRight size={16} /></button></div><div className={styles.stepHeading}><span>{String(current + 1).padStart(2, "0")} / {String(lesson.steps.length).padStart(2, "0")}</span><h3>{step.title}</h3></div>{lesson.id === "diesel" ? <DiscreteVisual step={current} /> : <DensityVisual step={current} parameter={lesson.id === "parameter"} />}<div className={styles.formula}>{step.math && <LatexRenderer math={step.math} />}</div><div className={styles.explanations}><div><span>MIT CSINÁLUNK MOST?</span><p>{step.plain}</p></div><p className={styles.technical}><b>MATEMATIKAILAG</b>{step.technical}</p>{step.takeaway && <div className={styles.takeaway}><b>EZT JEGYEZD MEG</b><p>{step.takeaway}</p></div>}</div><div className={styles.bottomControls}><button onClick={previous} disabled={current === 0}>← előző lépés</button><span>{current === lesson.steps.length - 1 ? "KÉSZ" : "lapozz a következő lépéshez"}</span><button onClick={next} disabled={current === lesson.steps.length - 1}>következő lépés →</button></div></section>
    </section>
  </main>;
}
