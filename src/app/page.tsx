"use client";

import { useState } from "react";
import Link from "next/link";
import { MathStepPlayer } from "@/components/visualizer/MathStepPlayer";
import { shirtsProblem } from "@/data/problems/shirts-problem";
import { extendedProblems } from "@/data/problems/extended-problems";
import { sportsVillageProblem } from "@/data/problems/class-problems";
import { zh2Practice } from "@/data/problems/zh2-practice";

export default function Page() {
  const [selected, setSelected] = useState<"picker" | "zh1" | "zh2">("picker");
  const zh1Problems = [shirtsProblem, sportsVillageProblem, ...extendedProblems];

  if (selected !== "picker") {
    const problems = selected === "zh2" ? zh2Practice : zh1Problems;
    return <MathStepPlayer problem={problems[0]} problems={problems} onExit={() => setSelected("picker")} />;
  }

  return <main className="study-picker">
    <section className="study-picker-inner">
      <p className="picker-kicker">VALÓSZÍNŰSÉGSZÁMÍTÁS</p>
      <h1>Mit gyakoroljunk?</h1>
      <div className="study-options">
        <Link href="/nagy-zh1/" className="study-option zh-grand" style={{ textDecoration: "none" }}>
          <span className="study-option-number">N01</span>
          <span className="study-option-copy"><strong>NAGY ZH1</strong><small>Kidolgozott feladatok · interaktív ábrák · képlettár és ZH-gyorsmódszerek</small></span>
          <span className="study-option-arrow">→</span>
        </Link>
        <button className="study-option zh-one" onClick={() => setSelected("zh1")}>
          <span className="study-option-number">01</span>
          <span className="study-option-copy"><strong>1. ZH anyaga</strong><small>{zh1Problems.length} feladat · kombinatorika, események, geometria</small></span>
          <span className="study-option-arrow">→</span>
        </button>
        <button className="study-option zh-two" onClick={() => setSelected("zh2")}>
          <span className="study-option-number">02</span>
          <span className="study-option-copy"><strong>2. ZH anyaga</strong><small>{zh2Practice.length} levezetett feladat · feltételes valószínűség, Bayes, geometria</small></span>
          <span className="study-option-arrow">→</span>
        </button>
      </div>
    </section>
  </main>;
}
