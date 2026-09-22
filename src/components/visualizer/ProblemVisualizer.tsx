"use client";

import { motion } from "framer-motion";
import { ProblemDefinition, StepExplanation } from "@/types/visualizer";

const wordCards = ["K", "Ö", "R", "Ö", "M", "P", "Ö", "R", "K", "Ö", "L", "T"];

function WordBoard({ problem, step }: { problem: ProblemDefinition; step: StepExplanation }) {
  const sibling = problem.id === "siblings";
  const round = problem.id === "round-table";
  const blockStep = !sibling && !round && [3, 4, 5].includes(step.stepIndex);
  const letters = sibling ? ["A", "B", ...Array.from({ length: 25 }, (_, i) => String(i + 1))] : round ? ["M", "K", "T", "S", "H"] : wordCards;
  const card = (letter: string, index: number) => <motion.span layout key={`${letter}-${index}`} className={`letter-card ${sibling && index < 2 && step.stepIndex === 1 ? "linked" : ""} ${blockStep && index >= 5 && index <= 11 ? "block-focus" : ""}`}>{letter}</motion.span>;
  return <div className="concept-board word-board"><div className="board-label">{step.visualState.annotation}</div>{round ? <div className="round-table"><div className="round-center">HÓFEHÉRKE</div>{letters.map((letter, index) => <motion.span key={`${letter}-${index}`} className={`round-person ${index < 2 && step.stepIndex > 1 ? "focus" : ""}`} style={{ "--angle": `${index * (360 / letters.length)}deg` } as React.CSSProperties}>{letter}</motion.span>)}</div> : <div className={`card-row ${sibling ? "people-row" : ""}`}>{letters.map((letter, index) => blockStep && index === 5 ? <motion.span layout key="porkolt-block" className="letter-block" aria-label="PÖRKÖLT blokk">{letters.slice(5, 12).map((blockLetter, blockIndex) => card(blockLetter, blockIndex + 5))}</motion.span> : blockStep && index > 5 ? null : card(letter, index))}</div>}{sibling && step.stepIndex >= 2 && <div className="distance-line"><span>10 ember</span><i /></div>}<div className="board-caption">{problem.id === "birthday" ? "365 lehetséges nap · egyező napok keresése" : problem.id === "urn" ? "● piros  ● fehér  ● zöld — 4 golyó kiválasztása" : problem.id === "siblings" ? "pozíciók a 27 helyes sorban" : "azonos betűk azonos kártyának számítanak"}</div></div>;
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
  return <div className="concept-board sports-board"><div className="board-label">{step.visualState.annotation}</div><div className="sports-inputs"><span>P(A)=25% · foci</span><span>P(B)=40% · kosárlabda</span><span>P(C)=45% · pingpong</span><span>P(A∩B)=15%</span><span>P(A∩C)=10%</span><span>P(B∩C)=20%</span><span>P(A∩B∩C)=5%</span></div><div className="sports-art"><div className="sports-circle sports-f"><b>A</b><small>foci</small></div><div className="sports-circle sports-k"><b>B</b><small>kosár</small></div><div className="sports-circle sports-p"><b>C</b><small>pingpong</small></div><strong className="sports-core">5%</strong></div><div className="sports-calculation"><span className="calculation-label">EBBEN A LÉPÉSBEN EZEKET HASZNÁLJUK</span><strong>{calculation[0]}</strong><p>{calculation[1]}</p></div>{derived.length > 0 && <div className="sports-known"><span className="calculation-label">EDDIG KISZÁMOLTUK — EZEK MOSTANTÓL FIXEK</span><div>{derived.map((fact) => <span key={fact}>{fact}</span>)}</div></div>}<div className="board-caption">Az alapadatok és a korábban kiszámolt eredmények végig változatlanok maradnak.</div></div>;
}

function GeometryBoard({ problem, step }: { problem: ProblemDefinition; step: StepExplanation }) {
  return <div className={`concept-board geometry-board geometry-${problem.id}`}><div className="board-label">{step.visualState.annotation}</div>{problem.id === "stick" && <div className="stick-art"><div className="stick-line"><i /><i /><i /></div><div className="stick-labels"><span>0</span><span>80</span><span>120</span><span>200 cm</span></div></div>}{problem.id === "target" && <div className="target-art"><div className="target-ring"><div /></div><span>R = 10 cm</span><small>r = 5 cm</small></div>}{problem.id === "unit-square" && <div className="unit-art"><div className="unit-inner" /><span className="unit-note top">1/4</span><span className="unit-note side">1/4</span></div>}{problem.id === "cafe" && <div className="cafe-art"><div className="cafe-square"><i className="cafe-safe" /><span className="axis-x">András érkezése →</span><span className="axis-y">Betti ↑</span></div></div>}<div className="board-caption">A kedvező tartomány területe vagy hossza oszlik a teljes eseménytérrel.</div></div>;
}

export function ProblemVisualizer({ problem, step }: { problem: ProblemDefinition; step: StepExplanation }) {
  if (problem.id === "sports-village") return <SportsVennBoard step={step} />;
  if (problem.id === "birthday") return <BirthdayBoard step={step} />;
  if (problem.id === "urn") return <UrnBoard step={step} />;
  if (problem.visualizer === "venn") return <VennBoard problem={problem} step={step} />;
  if (problem.visualizer === "geometry") return <GeometryBoard problem={problem} step={step} />;
  return <WordBoard problem={problem} step={step} />;
}
