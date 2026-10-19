"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { ProblemDefinition, StepExplanation } from "@/types/visualizer";

const wordCards = ["K", "Ö", "R", "Ö", "M", "P", "Ö", "R", "K", "Ö", "L", "T"];

function WordBoard({ problem, step }: { problem: ProblemDefinition; step: StepExplanation }) {
  const sibling = problem.id === "siblings";
  const round = problem.id === "round-table";
  const blockStep = !sibling && !round && [3, 4, 5].includes(step.stepIndex);
  const letters = sibling ? ["A", "B", ...Array.from({ length: 25 }, (_, i) => String(i + 1))] : round ? ["M", "K", "T", "S", "H"] : wordCards;
  const card = (letter: string, index: number) => <span key={`${letter}-${index}`} className={`letter-card ${sibling && index < 2 && step.stepIndex === 1 ? "linked" : ""} ${blockStep && index >= 5 && index <= 11 ? "block-focus" : ""}`}>{letter}</span>;
  return <div className="concept-board word-board"><div className="board-label">{step.visualState.annotation}</div>{round ? <div className="round-table"><div className="round-center">HÓFEHÉRKE</div>{letters.map((letter, index) => <span key={`${letter}-${index}`} className={`round-person ${index < 2 && step.stepIndex > 1 ? "focus" : ""}`} style={{ "--angle": `${index * (360 / letters.length)}deg` } as React.CSSProperties}>{letter}</span>)}</div> : <div className={`card-row ${sibling ? "people-row" : ""}`}>{letters.map((letter, index) => blockStep && index === 5 ? <span key="porkolt-block" className="letter-block" aria-label="PÖRKÖLT blokk">{letters.slice(5, 12).map((blockLetter, blockIndex) => card(blockLetter, blockIndex + 5))}</span> : blockStep && index > 5 ? null : card(letter, index))}</div>}{sibling && <div className="distance-line" style={{ visibility: step.stepIndex >= 2 ? "visible" : "hidden" }}><span>10 ember</span><i /></div>}<div className="board-caption">{problem.id === "birthday" ? "365 lehetséges nap · egyező napok keresése" : problem.id === "urn" ? "● piros  ● fehér  ● zöld — 4 golyó kiválasztása" : problem.id === "siblings" ? "pozíciók a 27 helyes sorban" : "azonos betűk azonos kártyának számítanak"}</div></div>;
}

function BirthdayBoard({ step }: { step: StepExplanation }) {
  return <div className="concept-board birthday-board"><div className="board-label">{step.visualState.annotation}</div><div className="birthday-calendar"><div className="calendar-header"><span>JAN</span><span>FEB</span><span>…</span><span>DEC</span></div><div className="birthday-days">{Array.from({ length: 30 }, (_, index) => <span key={index} className={step.stepIndex === 2 && index >= 14 && index <= 15 ? "birthday-match" : ""}>{index + 1}</span>)}</div><div className="birthday-track"><i /><i /><i /><i /><i /></div></div><div className="birthday-callout">{step.stepIndex < 2 ? "minden új embernek új születésnapot keresünk" : "két tanuló ugyanarra a napra került"}</div><div className="board-caption">365 lehetséges nap · 30 tanuló · egyező születésnapot keresünk</div></div>;
}

function UrnBoard({ step }: { step: StepExplanation }) {
  const drawn = step.stepIndex === 0 ? [] : step.stepIndex === 1 ? ["white", "white", "green", "green"] : ["red", "white", "green", "green"];
  return <div className="concept-board urn-board"><div className="board-label">{step.visualState.annotation}</div><div className="urn-zones"><div className="urn-source"><div className="urn-zone-title">01 · URNA <span>20 golyó</span></div><div className="urn-art">{Array.from({ length: 20 }, (_, index) => { const color = index < 9 ? "red" : index < 15 ? "white" : "green"; return <span key={index} className={`urn-ball urn-${color}`} />; })}</div></div><div className="urn-arrow">→</div><div className="urn-drawn"><div className="urn-zone-title">02 · KIHÚZOTT <span>{drawn.length || "—"} / 4</span></div><div className="drawn-balls">{drawn.length ? drawn.map((color, index) => <span key={`${color}-${index}`} className={`urn-ball urn-${color} urn-drawn-ball`} />) : <span className="urn-empty">még nincs húzás</span>}</div><div className="drawn-summary">{drawn.length ? `${new Set(drawn).size} szín képviselve` : "válassz 4 golyót"}</div></div></div><div className="urn-legend"><span><i className="red" /> 9 piros</span><span><i className="white" /> 6 fehér</span><span><i className="green" /> 5 zöld</span></div><div className="board-caption">A bal oldali készletből 4 golyót választunk visszatevés nélkül.</div></div>;
}

function VennBoard({ problem, step }: { problem: ProblemDefinition; step: StepExplanation }) {
  const cards = problem.id === "factory" ? ["A: 12%", "A∩B: 3%", "B: 7%"] : problem.id === "languages" ? ["angol: 13", "mindkettő: 5", "német: 7"] : ["hetedek: 2", "piros hetes: 2", "piros: 14"];
  return <div className="concept-board venn-board"><div className="board-label">{step.visualState.annotation}</div><div className="venn-art"><div className="venn-circle venn-a"><b>{problem.id === "languages" ? "angol" : problem.id === "factory" ? "A" : "hetes"}</b></div><div className="venn-circle venn-b"><b>{problem.id === "languages" ? "német" : problem.id === "factory" ? "B" : "piros"}</b></div><strong className="venn-intersection">{problem.id === "factory" ? "3%" : problem.id === "languages" ? "5" : "2"}</strong></div><div className="venn-values">{cards.map((card) => <span key={card}>{card}</span>)}</div><div className="board-caption">A metszet közös elemeit csak egyszer számoljuk.</div></div>;
}

function SportsVennBoard({ step }: { step: StepExplanation }) {
  const calculation = [
    ["Alapadat", "A=25% · B=40% · C=45% · A∩B∩C=5%"],
    ["a) A∪C", "A=25%  +  C=45%  −  A∩C=10%"],
    ["b) A\\B", "A=25%  −  A∩B=15%"],
    ["c) pontosan 2", "csak A+B=10%  +  csak A+C=5%  +  csak B+C=15%"],
    ["d) egyik sem", "1  −  P(A∪B∪C)=1−70%=30%"],
    ["e) feltételes", "kedvező=10%+15%=25%  /  összes=30%"]
  ][step.stepIndex];
  const derived = [
    ...(step.stepIndex >= 1 ? ["P(A∪C)=60%"] : []),
    ...(step.stepIndex >= 2 ? ["P(A\\B)=10%"] : []),
    ...(step.stepIndex >= 3 ? ["csak A+B=10%", "csak A+C=5%", "csak B+C=15%", "P(pontosan 2)=30%"] : []),
    ...(step.stepIndex >= 4 ? ["P(A∪B∪C)=70%", "P(semmi)=30%"] : []),
    ...(step.stepIndex >= 5 ? ["P(B | pontosan 2)=5/6=83,33%"] : [])
  ];
  return <div className="concept-board sports-board"><div className="board-label">{step.visualState.annotation}</div><div className="sports-inputs"><span>P(A)=25% · foci</span><span>P(B)=40% · kosárlabda</span><span>P(C)=45% · pingpong</span><span>P(A∩B)=15%</span><span>P(A∩C)=10%</span><span>P(B∩C)=20%</span><span>P(A∩B∩C)=5%</span></div><div className="sports-art"><div className="sports-circle sports-f"><b>A</b><small>foci</small></div><div className="sports-circle sports-k"><b>B</b><small>kosár</small></div><div className="sports-circle sports-p"><b>C</b><small>pingpong</small></div><strong className="sports-core">5%</strong></div><div className="sports-calculation"><span className="calculation-label">EBBEN A LÉPÉSBEN EZEKET HASZNÁLJUK</span><strong>{calculation[0]}</strong><p>{calculation[1]}</p></div><div className="sports-known"><span className="calculation-label">EDDIG KISZÁMOLTUK — EZEK MOSTANTÓL FIXEK</span><div>{derived.length > 0 ? derived.map((fact) => <span key={fact}>{fact}</span>) : <span className="sports-known-placeholder">Az a)–e) lépésekben kiszámolt részeredmények itt gyűlnek össze</span>}</div></div><div className="board-caption">Az alapadatok és a korábban kiszámolt eredmények végig változatlanok maradnak.</div></div>;
}

function GeometryBoard({ problem, step }: { problem: ProblemDefinition; step: StepExplanation }) {
  const stick = problem.id === "zh2-stick-conditional";
  const marker = [50, 40, 60, 40, 50, 50, 50][step.stepIndex] ?? 50;
  const showA = step.stepIndex >= 1; const showB = step.stepIndex >= 2; const showIntersection = step.stepIndex >= 3;
  return <div className={`concept-board geometry-board geometry-${problem.id}`}><div className="board-label">{step.visualState.annotation}</div>{stick && <div className="zh2-stick-art"><div className="stick-legend"><span><i className="legend-a" /> A = legalább egy darab 120 cm-nél hosszabb</span><span><i className="legend-b" /> B = mindkét darab 150 cm-nél rövidebb</span></div><div className="physical-stick"><div className="physical-stick-title"><b>AZ EREDETI PÁLCA</b><span>200 cm összesen</span></div><div className="physical-track"><span className="physical-left">0</span><motion.i className="physical-marker" animate={{ left: `${marker}%` }} transition={{ duration: .45, ease: "easeOut" }} /><span className="physical-right">200</span></div><div className="physical-pieces"><span>bal darab = x cm</span><span>jobb darab = 200 − x cm</span></div></div><div className="stick-scale"><b>0</b><b>50</b><b>80</b><b>120</b><b>150</b><b>200 cm</b></div><div className="interval-row"><strong>A</strong><span className="interval-track"><motion.i className="stick-a-zone" initial={{ opacity: 0 }} animate={{ opacity: showA ? 1 : 0 }} /></span><small>{showA ? "0–80 vagy 120–200" : "ezt keressük most"}</small></div><div className="interval-row"><strong>B</strong><span className="interval-track"><motion.i className="stick-b-zone" initial={{ opacity: 0 }} animate={{ opacity: showB ? 1 : 0 }} /></span><small>{showB ? "50–150" : "ezt keressük most"}</small></div><div className="interval-row intersection-row"><strong>A∩B</strong><span className="interval-track"><motion.i className="stick-intersection" initial={{ opacity: 0 }} animate={{ opacity: showIntersection ? 1 : 0 }} /></span><small>{showIntersection ? "50–80 és 120–150" : "közös rész később"}</small></div><div className="stick-explain"><span>Az x jel mindig a töréspontot jelöli.</span><span>A színes sáv = az adott eseményhez jó törési hely.</span></div></div>}{problem.id === "stick" && <div className="stick-art"><div className="stick-line"><i /><i /><i /></div><div className="stick-labels"><span>0</span><span>80</span><span>120</span><span>200 cm</span></div></div>}{problem.id === "target" && <div className="target-art"><div className="target-ring"><div /></div><span>R = 10 cm</span><small>r = 5 cm</small></div>}{problem.id === "unit-square" && <div className="unit-art"><div className="unit-inner" /><span className="unit-note top">1/4</span><span className="unit-note side">1/4</span></div>}{problem.id === "cafe" && <div className="cafe-art"><div className="cafe-square"><i className="cafe-safe" /><span className="axis-x">András érkezése →</span><span className="axis-y">Betti ↑</span></div></div>}<div className="board-caption">Először a pálcát látjuk, utána külön soronként azt, hogy melyik törési hely felel meg A-nak, B-nek és mindkettőnek.</div></div>;
}

function ConditionalChainBoard({ step }: { step: StepExplanation }) {
  const values = ["A₁ · 0,2", "A₂ | A₁ · 0,6", "A₃ | A₁∩A₂ · 0,8"];
  const chainResult = step.stepIndex >= 2 ? "0,2 × 0,6 × 0,8 = 0,096" : "0,2 × 0,6 × 0,8 = ?";
  return <div className="concept-board chain-board"><div className="board-label">{step.visualState.annotation}</div><div className="chain-flow">{values.map((value, index) => <Fragment key={value}><motion.div className={`chain-node node-${index}`} initial={{ opacity: .35, scale: .95 }} animate={{ opacity: step.stepIndex >= index ? 1 : .35, scale: step.stepIndex >= index ? 1 : .95 }} transition={{ duration: .3 }}><strong>{value}</strong><small>{index === 0 ? "első lépés" : "csak ha előtte teljesült"}</small></motion.div>{index < values.length - 1 && <motion.span className="chain-arrow" animate={{ opacity: step.stepIndex > index ? 1 : .25, scaleX: step.stepIndex > index ? 1 : .6 }}>×</motion.span>}</Fragment>)}</div><motion.div className="chain-result" animate={{ opacity: step.stepIndex >= 2 ? 1 : .75 }}><span>{step.stepIndex >= 2 ? "kiszámolva:" : "ezt fogjuk kiszámolni:"}</span> {chainResult}</motion.div><div className="board-caption">A „|” jel jelentése: feltéve, hogy a függőleges vonal utáni esemény már bekövetkezett.</div></div>;
}

function FactoryBayesBoard({ step }: { step: StepExplanation }) {
  const machines = [{ id: "G₁", share: "20%", defect: "5%", joint: "1%" }, { id: "G₂", share: "30%", defect: "10%", joint: "3%" }, { id: "G₃", share: "50%", defect: "10%", joint: "5%" }];
  const visibleJoint = (machine: { id: string; joint: string }) => step.stepIndex === 0 ? "?" : step.stepIndex === 1 && machine.id !== "G₃" ? "?" : machine.joint;
  const total = step.stepIndex >= 2 ? "1% + 3% + 5% = 9%" : "még nem számoljuk";
  return <div className="concept-board factory-board"><div className="board-label">{step.visualState.annotation}</div><div className="factory-grid"><div className="factory-head"><span>gép</span><span>termelési arány P(Gᵢ)</span><span>selejtarány P(D|Gᵢ)</span><span>együttes rész P(D∩Gᵢ)</span></div>{machines.map((machine, index) => <motion.div initial={{ opacity: .35, x: -8 }} animate={{ opacity: step.stepIndex >= Math.min(index + 1, 3) ? 1 : .35, x: 0 }} transition={{ duration: .3, delay: index * .05 }} className={`factory-row ${step.stepIndex >= 3 && machine.id === "G₃" ? "factory-focus" : ""}`} key={machine.id}><b>{machine.id}</b><span>{machine.share}</span><span>{machine.defect}</span><strong>{visibleJoint(machine)}</strong></motion.div>)}</div><motion.div className="factory-total" animate={{ opacity: step.stepIndex >= 2 ? 1 : .55 }}>összes selejt: <b>{total}</b></motion.div><div className="board-caption">Bayesnél az összes selejtes termék lesz az új nevező; ezt csak a teljes valószínűség kiszámítása után használjuk.</div></div>;
}

function FamilyBoard({ step }: { step: StepExplanation }) {
  const three = ["FFF", "FFL", "FLF", "FLL", "LFF", "LFL", "LLF", "LLL"];
  const four = ["FFFF", "FFFL", "FFLF", "FFLL", "FLFF", "FLFL", "FLLF", "FLLL", "LFFF", "LFFL", "LFLF", "LFLL", "LLFF", "LLFL", "LLLF", "LLLL"];
  const isFour = step.stepIndex >= 4; const outcomes = isFour ? four : three;
  const result = step.stepIndex < 1 ? "eredmények még nincsenek kiszámolva" : isFour ? step.stepIndex === 4 ? "A = 15/16 · B még nincs kiszámolva" : step.stepIndex === 5 ? "A = 15/16 · B = 14/16" : "A = 15/16 · B = 14/16 · B ⊂ A" : step.stepIndex === 1 ? "A = 7/8 · B még nincs kiszámolva" : step.stepIndex === 2 ? "A = 7/8 · B = 3/4" : "A = 7/8 · B = 3/4 · B ⊂ A";
  const allBoy = isFour ? "FFFF" : "FFF"; const allGirl = isFour ? "LLLL" : "LLL"; const mixedCount = isFour ? 14 : 6;
  const visibleA = step.stepIndex >= (isFour ? 4 : 1); const visibleB = step.stepIndex >= (isFour ? 5 : 2);
  return <div className="concept-board family-board"><div className="board-label">{step.visualState.annotation}</div><div className="family-legend"><span><i className="boy" /> F = fiú</span><span><i className="girl" /> L = lány</span><span>minden sor egy lehetséges család</span></div><div className="family-tree"><div className="tree-start">1 gyermek<br /><b>F vagy L</b></div><div className="tree-line" /><div className="tree-level"><span>2 gyermek<br /><b>FF · FL · LF · LL</b></span><i>×2 új ág</i></div><div className="tree-line" /><div className="tree-end"><b>{isFour ? "2⁴ = 16" : "2³ = 8"}</b><small>lehetséges sorrend</small></div></div><div className="family-groups"><motion.div className="family-group excluded" animate={{ opacity: step.stepIndex === 0 || !visibleA ? 1 : .5 }}><strong>{allBoy}</strong><span>mindenki fiú</span><small>nem A · nem B</small></motion.div><motion.div className="family-group all-girl" animate={{ opacity: step.stepIndex === 0 || visibleA ? 1 : .55 }}><strong>{allGirl}</strong><span>mindenki lány</span><small>A, de nem B</small></motion.div><motion.div className="family-group mixed" animate={{ opacity: step.stepIndex === 0 || visibleB ? 1 : .45 }}><strong>{mixedCount} eset</strong><span>van fiú és lány</span><small>A és B is</small></motion.div></div><div className="family-outcomes">{outcomes.map((outcome, index) => { const hasGirl = outcome.includes("L"); const mixed = hasGirl && outcome.includes("F"); const highlight = step.stepIndex === 0 || (step.stepIndex === 1 && hasGirl) || (step.stepIndex === 2 && mixed) || (step.stepIndex >= 4 && (step.stepIndex === 4 ? hasGirl : mixed)); return <motion.span key={outcome} initial={{ opacity: .35, y: 5 }} animate={{ opacity: highlight ? 1 : .35, y: highlight ? 0 : 5 }} transition={{ duration: .2, delay: index * .01 }} className={`${hasGirl ? "has-girl" : "all-boy"} ${mixed ? "mixed" : ""} ${highlight ? "outcome-highlight" : ""}`}>{outcome}</motion.span>; })}</div><div className="family-result">{result}</div><div className="board-caption">Minden gyermeknél két lehetőség van. Ezért 2·2·2 = 8, négy gyermeknél pedig 2·2·2·2 = 16 kimenet.</div></div>;
}

export function ProblemVisualizer({ problem, step }: { problem: ProblemDefinition; step: StepExplanation }) {
  if (problem.id === "zh2-conditional-chain") return <ConditionalChainBoard step={step} />;
  if (problem.id === "zh2-factory-bayes") return <FactoryBayesBoard step={step} />;
  if (problem.id === "zh2-family-genders") return <FamilyBoard step={step} />;
  if (problem.id === "sports-village") return <SportsVennBoard step={step} />;
  if (problem.id === "birthday") return <BirthdayBoard step={step} />;
  if (problem.id === "urn") return <UrnBoard step={step} />;
  if (problem.visualizer === "venn") return <VennBoard problem={problem} step={step} />;
  if (problem.visualizer === "geometry") return <GeometryBoard problem={problem} step={step} />;
  return <WordBoard problem={problem} step={step} />;
}
