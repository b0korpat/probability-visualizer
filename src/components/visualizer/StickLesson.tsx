"use client";

import { useEffect, useState } from 'react';
import { stickChapters } from '@/data/problems/stick-lesson';
import { LatexRenderer } from './LatexRenderer';
import styles from './StickLesson.module.css';

type Interval = [number, number];
const a: Interval[] = [[0, 80], [120, 200]];
const b: Interval[] = [[50, 150]];
const both: Interval[] = [[50, 80], [120, 150]];
// The axis, every tick and every interval use this ONE conversion.
const position = (cm: number) => 48 + cm * 2.4;

export function StickLesson({ current }: { current: number }) {
  const chapter = stickChapters[current];
  const [x, setX] = useState(chapter.x);
  useEffect(() => {
    setX(chapter.x);
  }, [current, chapter.x]);

  const isA = x > 120 || 200 - x > 120;
  const isB = x < 150 && 200 - x < 150;
  const conditional = current === 7;
  const allRows: { name: string; intervals: Interval[]; color: string; active: boolean }[] = [
    { name: 'A', intervals: conditional ? both : a, color: '#d7f36b', active: current >= 1 },
    { name: 'B', intervals: b, color: '#eda67f', active: current >= 3 },
    { name: 'A∩B', intervals: both, color: '#a5d4ff', active: current >= 5 },
  ];
  const svgHeight = 220;
  const samples = [40, 50, 60, 65, 80, 100, 120, 135, 140, 150, 160];

  const activeRule = chapter.rule ?? (current === 0 ? 'Alapfogalom: geometriai eseménytér' : current < 5 ? 'Geometriai valószínűség' : 'Metszet és feltételes valószínűség');
  const activeGeneral = chapter.general ?? (current < 7 ? 'P(E)=\\frac{\\text{kedvező hossz}}{\\text{teljes hossz}}' : 'P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}');

  return <article className={styles.lesson}>
    <header className={styles.headerBlock}><span className={styles.kicker}>PÁLCATÖRÉS · {current + 1} / {stickChapters.length}</span><h2>{chapter.title}</h2></header>
    <p className={styles.story}>{chapter.text}</p>

    <section className={styles.intervals} aria-label="Mely törési helyek jók?">
      <div className={styles.intervalsHeader}>
        <h3>{current === 0 ? 'A teljes 200 cm-es pálca (0–200 cm)' : 'Mely törési helyek jók?'}</h3>
        <span>{current === 0 ? 'Teljes hossz = 200 cm' : conditional ? 'B-re szűkítve (50–150 cm)' : 'Színes szakasz = kedvező törési hely'}</span>
      </div>
      <svg viewBox={`0 0 576 ${svgHeight}`} role="img" aria-label={allRows.filter(r => r.active).map(r => `${r.name}: ${r.intervals.map(([l, h]) => `${l}–${h} cm`).join(' vagy ')}`).join('. ') || '200 cm-es pálca'}>
        {[0, 50, 80, 120, 150, 200].map(value => <g key={value}><text x={position(value)} y="18" textAnchor="middle">{value}</text><line x1={position(value)} x2={position(value)} y1="25" y2={svgHeight - 20} stroke="#596461" strokeDasharray="3 5" /></g>)}
        {allRows.map((row, index) => { const y = 44 + index * 52; return <g key={row.name} opacity={row.active ? 1 : 0.28}>
          <text x="4" y={y + 7} fill={row.color}>{row.name}</text>
          <rect x={position(0)} y={y - 10} width="480" height="22" fill="#343b39" />
          {conditional && row.active && <><rect x={position(0)} y={y - 10} width="120" height="22" fill="#141817" /><rect x={position(150)} y={y - 10} width="120" height="22" fill="#141817" /></>}
          {row.active && row.intervals.map(([start, end]) => <g key={start}>
            <rect className={styles.segment} x={position(start)} y={y - 10} width={(end - start) * 2.4} height="22" fill={row.color} />
            <circle cx={position(start)} cy={y + 1} r="4" fill="#191e1d" stroke={row.color} strokeWidth="2" />
            <circle cx={position(end)} cy={y + 1} r="4" fill="#191e1d" stroke={row.color} strokeWidth="2" />
          </g>)}
          {!row.active && index === 0 && current === 0 && <rect x={position(0)} y={y - 10} width="480" height="22" fill="#d7f36b" fillOpacity="0.65" />}
        </g>; })}
      </svg>
      <p className={styles.caption}>
        {conditional
          ? 'Most csak az 50–150 közötti, 100 cm-es B tartományhoz mérjük a 60 cm-es közös részt.'
          : current === 0
            ? 'A teljes 0–200 cm-es szakasz az összes lehetőség; a következő lépésekben soronként jelöljük A, B és A∩B jó szakaszait.'
            : 'Üres karika: a határpont nem tartozik bele. A halvány sorok a későbbi lépésekben kapcsolódnak be.'}
      </p>
    </section>

    <section className={styles.calculation}>
      <h3>{current === 0 ? 'Alapadat' : 'Ebből következik a számolás'}</h3>
      <LatexRenderer math={chapter.math} />
    </section>

    <section className={styles.rule}>
      <span>AZ ALKALMAZOTT SZABÁLY</span>
      <h3>{activeRule}</h3>
      <LatexRenderer math={activeGeneral} />
    </section>

    <details className={styles.optional}><summary>Opcionális próba: törés egy konkrét helyen (interaktív csúszka)</summary><section className={styles.lab} aria-label="Interaktív pálcatörés">
      <div className={styles.labHeading}><strong>Próbáld ki egy valódi töréssel</strong><span>x = {x} cm</span></div>
      <svg viewBox="0 0 576 112" role="img" aria-label={`Törés ${x} centiméternél. Bal darab ${x}, jobb darab ${200 - x} centiméter.`}>
        <line x1={position(0)} x2={position(x)} y1="53" y2="53" stroke="#a5d4ff" strokeWidth="16" />
        <line x1={position(x)} x2={position(200)} y1="53" y2="53" stroke="#eda67f" strokeWidth="16" />
        <line x1={position(x)} x2={position(x)} y1="30" y2="72" stroke="#fff" strokeWidth="3" />
        <text x={position(x)} y="21" textAnchor="middle" fill="#fff">törés: {x}</text>
        <text x={position(0)} y="85" textAnchor="middle">0</text><text x={position(200)} y="85" textAnchor="middle">200 cm</text>
      </svg>
      <div className={styles.lengths}><div><span>Bal darab: x</span><strong>{x} cm</strong></div><div><span>Jobb darab: 200 − x</span><strong>200 − {x} = {200 - x} cm</strong></div></div>
      <label className={styles.sliderLabel} htmlFor="stick-break">Mozgasd a töréspontot</label>
      <input id="stick-break" type="range" min="1" max="199" value={x} onChange={e => setX(Number(e.target.value))} className={styles.slider} />
      <div className={styles.samples}>{samples.map(value => <button key={value} type="button" aria-pressed={x === value} onClick={() => setX(value)}>{value} cm</button>)}</div>
      <div className={styles.status} aria-live="polite">
        <p><b>A {isA ? 'IGAZ' : 'HAMIS'}</b> — bal: {x} &gt; 120: {x > 120 ? 'igen' : 'nem'}; jobb: {200 - x} &gt; 120: {200 - x > 120 ? 'igen' : 'nem'}. Legalább egy „igen” kell.</p>
        <p><b>B {isB ? 'IGAZ' : 'HAMIS'}</b> — bal: {x} &lt; 150: {x < 150 ? 'igen' : 'nem'}; jobb: {200 - x} &lt; 150: {200 - x < 150 ? 'igen' : 'nem'}. Mindkettőnél „igen” kell.</p>
        <p><b>A∩B {isA && isB ? 'IGAZ' : 'HAMIS'}</b> — A és B egyszerre {isA && isB ? 'teljesül' : 'nem teljesül'}.</p>
        {conditional && !isB && <p className={styles.excluded}>Ez a törés B-n kívül van. A B feltétel mellett ezt kizárjuk.</p>}
      </div>
    </section></details>

    <details className={styles.optional}><summary>Jelmagyarázat és pontosítások ({chapter.notes.length})</summary><ul className={styles.notes}>{chapter.notes.map(note => <li key={note}>{note}</li>)}</ul></details>
  </article>;
}

