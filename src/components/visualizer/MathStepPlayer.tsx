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
import { getSimpleExplanation } from "@/data/problems/zh2-simple-explanations";
import { getNamedRule } from "@/data/problems/zh2-rules";
import { StickLesson } from "./StickLesson";
import { GuidedLesson } from "./GuidedLesson";
import { guidedChapters } from "@/data/problems/guided-lessons";

export function MathStepPlayer({ problem, problems = [problem], onExit }: { problem: ProblemDefinition; problems?: ProblemDefinition[]; onExit?: () => void }) {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(problem.id);
  const activeProblem = problems.find((item) => item.id === selectedId) ?? problem;
  const step = activeProblem.steps[current] ?? activeProblem.steps[0];
  const activeProblemIndex = problems.findIndex((item) => item.id === activeProblem.id);
  const next = () => setCurrent((value) => Math.min(value + 1, activeProblem.totalSteps - 1));
  const previous = () => setCurrent((value) => Math.max(value - 1, 0));
  const previousProblem = () => setSelectedId(problems[Math.max(activeProblemIndex - 1, 0)].id);
  const nextProblem = () => setSelectedId(problems[Math.min(activeProblemIndex + 1, problems.length - 1)].id);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if ((event.target as HTMLElement)?.matches('input, textarea, select, [contenteditable]')) return; if (event.key === "ArrowRight") next(); if (event.key === "ArrowLeft") previous(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); });
  useEffect(() => setCurrent(0), [selectedId]);
  const filtered = problems.filter(item => `${item.title} ${item.category}`.toLocaleLowerCase("hu-HU").includes(query.toLocaleLowerCase("hu-HU")));
  const namedRule = getNamedRule(activeProblem.id, step.stepIndex);

  return <main className="app-shell">
    <header className="app-header"><div className="header-meta">{onExit && <button className="task-nav-button picker-back" onClick={onExit}>← választó</button>}<button className="task-nav-button" onClick={previousProblem} disabled={activeProblemIndex === 0}>← előző feladat</button><button className="task-nav-button" onClick={nextProblem} disabled={activeProblemIndex === problems.length - 1}>következő feladat →</button><span className="header-index">{String(activeProblemIndex + 1).padStart(2, "0")} / {String(problems.length).padStart(2, "0")}</span></div></header>
    <details className="task-picker" open={pickerOpen} onToggle={event => setPickerOpen(event.currentTarget.open)}>
      <summary><span>Feladat választása <small>{activeProblemIndex + 1} / {problems.length} · {activeProblem.title}</small></span><span>{pickerOpen ? "Bezárás −" : "Összes feladat +"}</span></summary>
      <div className="task-picker-content"><label htmlFor="task-search">Keresés a feladatok között</label><input id="task-search" type="search" placeholder="Feladat neve vagy témája…" value={query} onChange={event => setQuery(event.target.value)} />
        <nav aria-label="Feladatok">{filtered.map(item => <button key={item.id} aria-current={item.id === activeProblem.id ? "page" : undefined} onClick={() => { setSelectedId(item.id); setCurrent(0); setPickerOpen(false); }}><b>{String(problems.indexOf(item) + 1).padStart(2, "0")}</b><span>{item.title}<small>{item.steps.length} lépés · {item.category}</small></span></button>)}</nav>
        {!filtered.length && <p>Nincs találat. Próbálj másik keresést.</p>}
      </div>
    </details>
    <section className="workspace">
      <aside className="lesson-panel">
        <div className="eyebrow">{activeProblem.category.toUpperCase()} <span>·</span> {String(problems.findIndex((item) => item.id === activeProblem.id) + 1).padStart(2, "0")}</div>
        <h1>{activeProblem.title}</h1>
        <p className="problem-statement">{activeProblem.statement}</p>
        <div className="progress-block"><div className="progress-label"><span>MEGOLDÁS FOLYAMATA</span><b>{String(current + 1).padStart(2, "0")} / {String(activeProblem.totalSteps).padStart(2, "0")}</b></div><div className="progress-track"><div style={{ width: `${((current + 1) / activeProblem.totalSteps) * 100}%` }} /></div></div>

        <div className="step-label">AKTUÁLIS LEVEZETÉS</div><nav className="step-list" aria-label="Megoldási lépések">{activeProblem.steps.map((item, index) => <button key={item.stepIndex} className={`step-item ${index === current ? "active" : ""} ${index < current ? "done" : ""}`} onClick={() => setCurrent(index)}><span className="step-dot">{index < current ? <CheckCircle2 size={14} /> : String(index + 1).padStart(2, "0")}</span><span>{item.title}</span>{index === current && <span className="current-arrow">↗</span>}</button>)}</nav>
        <div className="keyboard-hint"><Keyboard size={15} /> <span>Használd a <b>←</b> <b>→</b> nyilakat a navigációhoz</span></div>
      </aside>
      <section className="solution-panel">
        <div className="top-controls-bar">
          <StepControls current={current} total={activeProblem.totalSteps} onPrevious={previous} onNext={next} onReset={() => setCurrent(0)} />
        </div>
        {activeProblem.id === "zh2-stick-conditional" ? (
          <StickLesson key={activeProblem.id} current={current} />
        ) : guidedChapters[activeProblem.id] ? (
          <GuidedLesson key={activeProblem.id} problemId={activeProblem.id} current={current} />
        ) : (
          <div key={activeProblem.id} className="animated-lesson">
            <div className="solution-heading">
              <div><span className="eyebrow">AKTUÁLIS LÉPÉS / {String(current + 1).padStart(2, "0")}</span><h2>{step.title}</h2></div>
              <span className="chapter-label">{current === activeProblem.totalSteps - 1 ? "KÉSZ" : "VEZETETT LEVEZETÉS"}</span>
            </div>
            <div className="visualizer-slot">
              {activeProblem.visualizer === "drawer" ? <DrawerVisualizer step={step} /> : <ProblemVisualizer problem={activeProblem} step={step} />}
            </div>
            <div className="formula-card">
              <span className="formula-tag">MOST EZT HELYETTESÍTJÜK BE</span>
              <LatexRenderer math={step.latex} />
            </div>
            <div className="explanation">
              <div className="plain-explanation"><span className="plain-label">MIT CSINÁLUNK MOST?</span><p>{getSimpleExplanation(activeProblem.id, step.stepIndex)}</p></div>
              <div className="technical-explanation"><span className="plain-label">UGYANEZ MATEMATIKAIAN</span><p>{step.description}</p></div>
              {namedRule && <div className="named-rule"><span className="named-rule-label">ALKALMAZOTT TÉTEL / FIX KÉPLET</span><strong>{namedRule.title}</strong><div className="named-rule-formula"><LatexRenderer math={namedRule.formula ?? ""} /></div><p>{namedRule.meaning}</p></div>}
              <NumberGuide notes={getFormulaGuide(activeProblem.id, step.stepIndex)} />
              {step.keyTakeaway && <div className="takeaway"><span>→</span><p><b>EZT JEGYEZD MEG:</b> {step.keyTakeaway}</p></div>}
            </div>
          </div>
        )}
        <StepControls current={current} total={activeProblem.totalSteps} onPrevious={previous} onNext={next} onReset={() => setCurrent(0)} />
        <div className="problem-navigation"><button onClick={previousProblem} disabled={activeProblemIndex === 0}>← előző feladat</button><span>feladat {String(activeProblemIndex + 1).padStart(2, "0")} / {String(problems.length).padStart(2, "0")}</span><button onClick={nextProblem} disabled={activeProblemIndex === problems.length - 1}>következő feladat →</button></div>
      </section>
    </section>
  </main>;
}

