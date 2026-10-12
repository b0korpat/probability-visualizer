"use client";

import { useState } from 'react';
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
  const isA = x > 120 || 200 - x > 120;
  const isB = x < 150 && 200 - x < 150;
  const conditional = current === 7;
  const rows: { name: string; intervals: Interval[]; color: string }[] = [];
  if (current >= 1) rows.push({ name: 'A', intervals: conditional ? both : a, color: '#d7f36b' });
  if (current >= 3) rows.push({ name: 'B', intervals: b, color: '#eda67f' });
  if (current >= 5) rows.push({ name: 'A∩B', intervals: both, color: '#a5d4ff' });
  const svgHeight = 64 + rows.length * 52;
  const samples = current === 0 ? [60, 100, 140] : current < 3 ? [60, 80, 100, 120, 140] : [40, 50, 65, 80, 100, 120, 135, 150, 160];

  return <article className={styles.lesson}>
    <header><span className={styles.kicker}>PÁLCATÖRÉS · {current + 1} / {stickChapters.length}</span><h2>{chapter.title}</h2></header>
    <p className={styles.story}>{chapter.text}</p>
    {current === 0 && <section className={styles.intervals} aria-label="A teljes 200 cm-es pálca"><svg viewBox="0 0 576 76" role="img" aria-label="200 cm-es pálca: a teljes választható hossz"><line x1={position(0)} x2={position(200)} y1="28" y2="28" stroke="#d7f36b" strokeWidth="14" /><text x={position(0)} y="59" textAnchor="middle">0</text><text x={position(200)} y="59" textAnchor="middle">200 cm</text><text x={position(100)} y="59" textAnchor="middle">teljes hossz = 200 cm</text></svg></section>}
    <details className={styles.optional}><summary>Opcionális próba: törés egy konkrét helyen</summary><section className={styles.lab} aria-label="Interaktív pálcatörés">
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
        {current >= 1 && <p><b>A {isA ? 'IGAZ' : 'HAMIS'}</b> — bal: {x} &gt; 120: {x > 120 ? 'igen' : 'nem'}; jobb: {200 - x} &gt; 120: {200 - x > 120 ? 'igen' : 'nem'}. Legalább egy „igen” kell.</p>}
        {current >= 3 && <p><b>B {isB ? 'IGAZ' : 'HAMIS'}</b> — bal: {x} &lt; 150: {x < 150 ? 'igen' : 'nem'}; jobb: {200 - x} &lt; 150: {200 - x < 150 ? 'igen' : 'nem'}. Mindkettőnél „igen” kell.</p>}
        {current >= 5 && <p><b>A∩B {isA && isB ? 'IGAZ' : 'HAMIS'}</b> — A és B egyszerre {isA && isB ? 'teljesül' : 'nem teljesül'}.</p>}
        {conditional && !isB && <p className={styles.excluded}>Ez a törés B-n kívül van. A B feltétel mellett ezt kizárjuk.</p>}
      </div>
    </section></details>

    {rows.length > 0 && <section className={styles.intervals}>
      <h3>Mely törési helyek jók?</h3>
      <p>A színes szakaszok a jó törési helyeket jelölik.</p>
      <svg viewBox={`0 0 576 ${svgHeight}`} role="img" aria-label={rows.map(r => `${r.name}: ${r.intervals.map(([l, h]) => `${l}–${h} cm`).join(' vagy ')}`).join('. ')}>
        {[0, 50, 80, 120, 150, 200].map(value => <g key={value}><text x={position(value)} y="18" textAnchor="middle">{value}</text><line x1={position(value)} x2={position(value)} y1="25" y2={svgHeight - 20} stroke="#596461" strokeDasharray="3 5" /></g>)}
        {rows.map((row, index) => { const y = 44 + index * 52; return <g key={row.name}>
          <text x="4" y={y + 7} fill={row.color}>{row.name}</text>
          <rect x={position(0)} y={y - 10} width="480" height="22" fill="#343b39" />
          {conditional && <><rect x={position(0)} y={y - 10} width="120" height="22" fill="#141817" /><rect x={position(150)} y={y - 10} width="120" height="22" fill="#141817" /></>}
          {row.intervals.map(([start, end]) => <g key={start}>
            <rect className={styles.segment} x={position(start)} y={y - 10} width={(end - start) * 2.4} height="22" fill={row.color} />
            <circle cx={position(start)} cy={y + 1} r="4" fill="#191e1d" stroke={row.color} strokeWidth="2" />
            <circle cx={position(end)} cy={y + 1} r="4" fill="#191e1d" stroke={row.color} strokeWidth="2" />
          </g>)}
        </g>; })}
      </svg>
      <p className={styles.caption}>Üres karika: a határpont nem tartozik bele.</p>
      {conditional && <p className={styles.focus}>Most csak az 50–150 közötti, 100 cm-es B tartományhoz mérjük a 60 cm-es közös részt.</p>}
    </section>}

    {chapter.rule && <section className={styles.rule}><span>AZ ALKALMAZOTT SZABÁLY</span><h3>{chapter.rule}</h3><LatexRenderer math={chapter.general ?? ''} /></section>}
    {current > 0 && <section className={styles.calculation}><h3>Ebből következik a számolás</h3><LatexRenderer math={chapter.math} /></section>}
    <details className={styles.optional}><summary>Jelmagyarázat és pontosítások</summary><ul className={styles.notes}>{chapter.notes.map(note => <li key={note}>{note}</li>)}</ul></details>
  </article>;
}
