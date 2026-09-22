"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Keyboard } from "lucide-react";
import { ProblemDefinition } from "@/types/visualizer";
import { DrawerVisualizer } from "@/components/visualizer/DrawerVisualizer";
import { LatexRenderer } from "@/components/visualizer/LatexRenderer";
import { StepControls } from "@/components/visualizer/StepControls";
import { ProblemVisualizer } from "@/components/visualizer/ProblemVisualizer";
import { NumberGuide } from "@/components/visualizer/NumberGuide";
import { getFormulaGuide } from "@/data/problems/formula-guides";

export function MathStepPlayer({ problem, problems = [problem] }: { problem: ProblemDefinition; problems?: ProblemDefinition[] }) {
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState(problem.id);
  const activeProblem = problems.find((item) => item.id === selectedId) ?? problem;
  const step = activeProblem.steps[current] ?? activeProblem.steps[0];
  const activeProblemIndex = problems.findIndex((item) => item.id === activeProblem.id);
  const next = () => setCurrent((value) => Math.min(value + 1, activeProblem.totalSteps - 1));
  const previous = () => setCurrent((value) => Math.max(value - 1, 0));
  const previousProblem = () => setSelectedId(problems[Math.max(activeProblemIndex - 1, 0)].id);
  const nextProblem = () => setSelectedId(problems[Math.min(activeProblemIndex + 1, problems.length - 1)].id);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "ArrowRight") next(); if (event.key === "ArrowLeft") previous(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); });
  useEffect(() => setCurrent(0), [selectedId]);
  const grouped = [
    { label: "★ ÓRAI FELADATOK", items: problems.filter((item) => item.featured) },
    { label: "01 · Kombinatorika", items: problems.filter((item) => !item.featured && item.category === "combinatorics") },
    { label: "02 · Események", items: problems.filter((item) => !item.featured && item.category === "venn") },
    { label: "03 · Geometria", items: problems.filter((item) => !item.featured && item.category === "geometric") }
  ];
  return <main className="app-shell">
    <header className="app-header"><div className="brand"><span className="brand-mark">∿</span><span>probability<span className="brand-accent">/</span>lab</span></div><div className="header-meta"><button className="task-nav-button" onClick={previousProblem} disabled={activeProblemIndex === 0}>← előző feladat</button><span className="status-pill"><i /> INTERAKTÍV LECKE</span><button className="task-nav-button" onClick={nextProblem} disabled={activeProblemIndex === problems.length - 1}>következő feladat →</button><span className="header-index">{String(activeProblemIndex + 1).padStart(2, "0")} / {String(problems.length).padStart(2, "0")}</span></div></header>
    <section className="workspace">
      <aside className="lesson-panel">
        <div className="eyebrow">{activeProblem.category.toUpperCase()} <span>·</span> {String(problems.findIndex((item) => item.id === activeProblem.id) + 1).padStart(2, "0")}</div>
        <h1>{activeProblem.title}<br /><span>lépésről lépésre.</span></h1>
        <p className="problem-statement">{activeProblem.statement}</p>
        <div className="progress-block"><div className="progress-label"><span>MEGOLDÁS FOLYAMATA</span><b>{String(current + 1).padStart(2, "0")} / {String(activeProblem.totalSteps).padStart(2, "0")}</b></div><div className="progress-track"><div style={{ width: `${((current + 1) / activeProblem.totalSteps) * 100}%` }} /></div></div>
        <div className="problem-picker">{grouped.map((group) => <div key={group.label} className={group.items.some((item) => item.featured) ? "featured-group" : ""}><div className="picker-label">{group.label}</div>{group.items.map((item) => <button key={item.id} className={`problem-item ${item.featured ? "featured-item" : ""} ${item.id === activeProblem.id ? "selected" : ""}`} onClick={() => setSelectedId(item.id)}><span>{item.title}</span><small>{item.steps.length} lépés</small></button>)}</div>)}</div>
        <div className="step-label">AKTUÁLIS LEVEZETÉS</div><nav className="step-list" aria-label="Megoldási lépések">{activeProblem.steps.map((item, index) => <button key={item.stepIndex} className={`step-item ${index === current ? "active" : ""} ${index < current ? "done" : ""}`} onClick={() => setCurrent(index)}><span className="step-dot">{index < current ? <CheckCircle2 size={14} /> : String(index + 1).padStart(2, "0")}</span><span>{item.title}</span>{index === current && <span className="current-arrow">↗</span>}</button>)}</nav>
        <div className="keyboard-hint"><Keyboard size={15} /> <span>Használd a <b>←</b> <b>→</b> nyilakat a navigációhoz</span></div>
      </aside>
      <section className="solution-panel"><div className="solution-heading"><div><span className="eyebrow">AKTUÁLIS LÉPÉS / {String(current + 1).padStart(2, "0")}</span><h2>{step.title}</h2></div><span className="chapter-label">{current === activeProblem.totalSteps - 1 ? "KÉSZ" : "VEZETETT LEVEZETÉS"}</span></div><div className="explanation"><p>{step.description}</p><div className="formula-card"><span className="formula-tag">KÉPLET</span><LatexRenderer math={step.latex} /></div><NumberGuide notes={getFormulaGuide(activeProblem.id, step.stepIndex)} />{step.keyTakeaway && <div className="takeaway"><span>→</span><p>{step.keyTakeaway}</p></div>}</div>{activeProblem.visualizer === "drawer" ? <DrawerVisualizer step={step} /> : <ProblemVisualizer problem={activeProblem} step={step} />}<StepControls current={current} total={activeProblem.totalSteps} onPrevious={previous} onNext={next} onReset={() => setCurrent(0)} /><div className="problem-navigation"><button onClick={previousProblem} disabled={activeProblemIndex === 0}>← előző feladat</button><span>feladat {String(activeProblemIndex + 1).padStart(2, "0")} / {String(problems.length).padStart(2, "0")}</span><button onClick={nextProblem} disabled={activeProblemIndex === problems.length - 1}>következő feladat →</button></div></section>
    </section>
  </main>;
}
