"use client";

import { guidedChapters } from '@/data/problems/guided-lessons';
import { LatexRenderer } from './LatexRenderer';
import shared from './StickLesson.module.css';
import styles from './GuidedLesson.module.css';

function Bar({ name, value, total = 100, label, color = '#d7f36b' }: { name: string; value: number; total?: number; label: string; color?: string }) {
  return <div className={styles.barRow}><strong>{name}</strong><div className={styles.track} role="img" aria-label={label}><div className={styles.fill} style={{ width: `${value / total * 100}%`, background: color }} /></div><span>{label}</span></div>;
}

function ChainBoard({ current }: { current: number }) {
  return <section className={shared.intervals} aria-label="Az események egymásba épülő szűrése">
    <h3>{current >= 3 ? 'Ugyanaz a jó rész, másik összes' : 'Mindig az előző részből szűrünk'}</h3>
    {current === 0 ? <div className={styles.givens}><div><b>A₁</b><strong>20%</strong><span>az összesből</span></div><div><b>A₂ | A₁</b><strong>60%</strong><span>az A₁-részből</span></div><div><b>A₃ | A₁∩A₂</b><strong>80%</strong><span>a közös részből</span></div></div> : <>
      <Bar name="Összes" value={100} label="100%" color="#6c7972" />
      <Bar name="A₁" value={20} label="20%" color="#eda67f" />
      <p className={styles.operation}>A 20%-os rész 60%-a → 0,2 × 0,6</p>
      <Bar name="A₁∩A₂" value={12} label="12% az összesből" />
      {current >= 2 && <><p className={styles.operation}>A 12%-os rész 80%-a → 0,12 × 0,8</p><Bar name="A₁∩A₂∩A₃" value={9.6} label="9,6% az összesből" color="#a5d4ff" /></>}
      {current >= 3 && <div className={styles.denominator}><p>Most az A₁-részt tekintjük teljesnek: 20%.</p><Bar name="Jó rész" value={9.6} total={20} label="9,6 / 20 = 48% A₁-en belül" color="#a5d4ff" /></div>}
    </>}
  </section>;
}

const machines = [{ name: 'G₁', share: 20, count: 200, defect: 5, bad: 10, color: '#eda67f' }, { name: 'G₂', share: 30, count: 300, defect: 10, bad: 30, color: '#d7f36b' }, { name: 'G₃', share: 50, count: 500, defect: 10, bad: 50, color: '#a5d4ff' }];

function FactoryBoard({ current }: { current: number }) {
  return <section className={shared.intervals} aria-label="Gépenkénti selejt és az új összes">
    <h3>{current >= 5 ? 'Az új összes: csak a selejtes termékek' : 'Szemléltetés: 1000 termék arányai'}</h3>
    <p className={shared.caption}>Az 1000 termék a megadott arányokat szemlélteti.</p>
    {current < 5 ? <>
      <div className={styles.production} role="img" aria-label="G₁: 20%, G₂: 30%, G₃: 50%">{machines.map(m => <div key={m.name} style={{ width: `${m.share}%`, background: m.color }}>{m.name}<br />{m.share}%</div>)}</div>
      <div className={styles.machineRows}>{machines.map((m, index) => { const known = current > index; return <div className={styles.machine} key={m.name} style={{ borderLeftColor: m.color }}><strong>{m.name}: {m.count} termék</strong><span>Ezen belül {m.defect}% selejt</span>{known && <><b>{m.count} × {m.defect / 100} = {m.bad} selejt</b><Bar name="Selejt" value={m.bad} total={m.count} label={`${m.bad}/${m.count} ezen a gépen`} color={m.color} /></>}</div>; })}</div>
      {current >= 4 && <div className={styles.denominator}>10 + 30 + 50 = <b>90 selejt / 1000 = 9%</b></div>}
    </> : <>
      <div className={styles.defects} role="img" aria-label="A 90 selejt összetétele: G₁ 10, G₂ 30, G₃ 50">{machines.map(m => <div key={m.name} style={{ width: `${m.bad / 90 * 100}%`, background: m.color }}><b>{m.name}</b><span>{m.bad}</span></div>)}</div>
      <p className={styles.total}>Összes selejt: <b>90</b></p>
      {current >= 6 && <div className={styles.posterior}>{machines.map((m, index) => <div key={m.name}><b>{m.name}</b><span>{m.bad}/90</span><strong>{['1/9 ≈ 11,11%', '1/3 ≈ 33,33%', '5/9 ≈ 55,56%'][index]}</strong></div>)}</div>}
    </>}
  </section>;
}

function FamilyBoard({ current }: { current: number }) {
  const four = current >= 6;
  const n = four ? 4 : 3;
  const total = 2 ** n;
  const phase = four ? current - 6 : current;
  const outcomes = Array.from({ length: total }, (_, value) => value.toString(2).padStart(n, '0').replaceAll('0', 'F').replaceAll('1', 'L'));
  const filterB = phase === 4;
  const relations = phase === 5;
  const known = phase > 0;
  const isA = (outcome: string) => outcome.split('').filter(letter => letter === 'L').length <= 1;
  const isB = (outcome: string) => outcome.includes('F') && outcome.includes('L');
  const isGood = (outcome: string) => phase === 1 ? isA(outcome) : phase === 2 ? isB(outcome) : isA(outcome) && isB(outcome);
  const favorable = outcomes.filter(isGood).length;
  const denominator = filterB ? outcomes.filter(isB).length : total;
  return <section className={shared.intervals} aria-label="Legfeljebb egy lány és vegyes családok kijelölése">
    <h3>{filterB ? 'Csak B marad: a vegyes családok' : relations ? 'Csak A · A és B · csak B · egyik sem' : !known ? `${n} gyermek: az összes sorrend` : phase === 1 ? 'A: nulla vagy egy lány' : phase === 2 ? 'B: van fiú és lány is' : 'A∩B: mindkét feltétel teljesül'}</h3>
    <p className={shared.caption}>F = fiú · L = lány · A = legfeljebb egy lány · B = vegyes.</p>
    <div className={styles.outcomes}>{outcomes.map(outcome => {
      const a = isA(outcome); const b = isB(outcome);
      const excluded = filterB && !b;
      const good = known && isGood(outcome);
      const onlyA = relations && a && !b;
      const onlyB = relations && b && !a;
      const label = excluded ? 'kizárt' : !known ? 'egy eset' : relations ? a && b ? 'A és B' : a ? 'csak A' : b ? 'csak B' : 'egyik sem' : phase === 1 ? `${outcome.split('').filter(letter => letter === 'L').length} lány · ${good ? 'jó' : 'nem jó'}` : good ? 'jó' : 'nem jó';
      return <div key={outcome} className={`${styles.outcome} ${excluded ? styles.excluded : ''} ${good && !excluded ? styles.good : ''} ${onlyA ? styles.alsoA : ''} ${onlyB ? styles.alsoB : ''}`}><b>{outcome}</b><span>{label}</span></div>;
    })}</div>
    <p className={styles.total}>{!known ? `Összes: ${total} sorrend` : relations ? `Közös: ${n} · csak A: 1 · csak B: ${total - 2 - n}` : `Jó: ${favorable} · ${filterB ? 'Új összes' : 'Összes'}: ${denominator}`}</p>
    {filterB && <p className={shared.caption}>A két egynemű család kiesik a nevezőből is. A vegyeseken belül csak a pontosan egy lányos sorrendek jók.</p>}
  </section>;
}

export function GuidedLesson({ problemId, current }: { problemId: string; current: number }) {
  const chapters = guidedChapters[problemId];
  const chapter = chapters[current] ?? chapters[0];
  return <article className={shared.lesson}>
    <header><span className={shared.kicker}>VEZETETT MEGOLDÁS · {current + 1} / {chapters.length}</span><h2>{chapter.title}</h2></header>
    <p className={shared.story}>{chapter.text}</p>
    {chapter.purpose && <section className={shared.rule}><h3>Mire jó a Bayes-formula?</h3><p className={styles.purpose}>{chapter.purpose}</p></section>}
    {problemId === 'zh2-conditional-chain' ? <ChainBoard current={current} /> : problemId === 'zh2-factory-bayes' ? <FactoryBoard current={current} /> : <FamilyBoard current={current} />}
    {chapter.rule && <section className={shared.rule}><span>AZ ALKALMAZOTT SZABÁLY</span><h3>{chapter.rule}</h3><LatexRenderer math={chapter.general ?? ''} />{chapter.general?.includes('X') && <p className={shared.caption}>{chapter.rule === 'Szorzási szabály' ? 'X és Y két esemény: először X arányát vesszük, majd azon belül Y arányát.' : 'X a keresett esemény; Y az ismert feltétel. A közös részt Y esélyével osztjuk.'}</p>}</section>}
    {chapter.math && <section className={shared.calculation}><h3>{current === 0 ? 'A felírt adatok' : 'Ebből következik a számolás'}</h3><LatexRenderer math={chapter.math} /></section>}
    {chapter.notes.length > 0 && <details className={shared.optional}><summary>Jelmagyarázat és pontosítások</summary><ul className={shared.notes}>{chapter.notes.map(note => <li key={note}>{note}</li>)}</ul></details>}
  </article>;
}
