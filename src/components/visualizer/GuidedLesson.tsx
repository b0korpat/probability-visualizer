"use client";

import { guidedChapters } from '@/data/problems/guided-lessons';
import { LatexRenderer } from './LatexRenderer';
import shared from './StickLesson.module.css';
import styles from './GuidedLesson.module.css';

function Bar({ name, value, total = 100, label, color = '#d7f36b', active = true }: { name: string; value: number; total?: number; label: string; color?: string; active?: boolean }) {
  return <div className={styles.barRow} style={{ opacity: active ? 1 : 0.32 }}><strong>{name}</strong><div className={styles.track} role="img" aria-label={label}><div className={styles.fill} style={{ width: `${active ? (value / total) * 100 : 0}%`, background: color }} /></div><span>{label}</span></div>;
}

function ChainBoard({ current }: { current: number }) {
  const show12 = current >= 1;
  const show123 = current >= 2;
  const showCond = current >= 3;
  return <section className={shared.intervals} aria-label="Az események egymásba épülő szűrése">
    <div className={shared.intervalsHeader}>
      <h3>{current >= 3 ? 'Ugyanaz a jó rész, másik összes' : 'Mindig az előző részből szűrünk'}</h3>
      <span>Egymásba épülő arányok</span>
    </div>
    <div className={styles.givens}>
      <div><b>A₁</b><strong>20%</strong><span>az összesből</span></div>
      <div><b>A₂ | A₁</b><strong>60%</strong><span>az A₁-részből</span></div>
      <div><b>A₃ | A₁∩A₂</b><strong>80%</strong><span>a közös részből</span></div>
    </div>
    <div className={styles.chainBars}>
      <Bar name="Összes" value={100} label="100% (teljes eseménytér)" color="#6c7972" active />
      <Bar name="A₁" value={20} label="20% az összesből" color="#eda67f" active />
      <Bar name="A₁∩A₂" value={12} label={show12 ? '0,2 × 0,6 = 12% az összesből' : '1. szűrés: 20% × 60% (következő lépés)'} active={show12} />
      <Bar name="A₁∩A₂∩A₃" value={9.6} label={show123 ? '0,12 × 0,8 = 9,6% az összesből' : '2. szűrés: 12% × 80% (későbbi lépés)'} color="#a5d4ff" active={show123} />
    </div>
    <div className={styles.denominator} style={{ opacity: showCond ? 1 : 0.35 }}>
      <p>{showCond ? 'Most az A₁-részt tekintjük teljesnek (20%):' : 'Feltételes lépés: A₁ lesz az új 100%-os viszonyítási alap'}</p>
      <Bar name="A₂∩A₃ | A₁" value={9.6} total={20} label={showCond ? '9,6 / 20 = 48% A₁-en belül' : '9,6% / 20% (a 4. lépésben számoljuk)'} color="#a5d4ff" active={showCond} />
    </div>
  </section>;
}

const machines = [
  { name: 'G₁', share: 20, count: 200, defect: 5, bad: 10, color: '#eda67f', post: '1/9 ≈ 11,11%' },
  { name: 'G₂', share: 30, count: 300, defect: 10, bad: 30, color: '#d7f36b', post: '1/3 ≈ 33,33%' },
  { name: 'G₃', share: 50, count: 500, defect: 10, bad: 50, color: '#a5d4ff', post: '5/9 ≈ 55,56%' }
];

function FactoryBoard({ current }: { current: number }) {
  const showTotal = current >= 4;
  const showDefectsOnly = current >= 5;
  const showPosterior = current >= 6;
  return <section className={shared.intervals} aria-label="Gépenkénti selejt és az új összes">
    <div className={shared.intervalsHeader}>
      <h3>{current >= 5 ? 'Az új összes: csak a 90 selejtes termék' : 'Szemléltetés: 1000 termék arányai'}</h3>
      <span>{showTotal ? 'Összes selejt: 90 / 1000 (9%)' : '1000 termékre vetítve'}</span>
    </div>
    <div className={styles.production} role="img" aria-label="G₁: 20%, G₂: 30%, G₃: 50%">{machines.map(m => <div key={m.name} style={{ width: `${m.share}%`, background: m.color }}>{m.name}<br />{m.share}% ({m.count})</div>)}</div>
    <div className={styles.machineRows}>{machines.map((m, index) => {
      const known = current > index;
      return <div className={styles.machine} key={m.name} style={{ borderLeftColor: m.color, opacity: known || current === 0 ? 1 : 0.55 }}>
        <div className={styles.machineHeader}>
          <strong>{m.name}: {m.count} termék ({m.defect}% selejt)</strong>
          <b>{known ? `${m.count} × ${m.defect / 100} = ${m.bad} selejt` : 'még nem számoltuk'}</b>
        </div>
        <Bar name="Selejt" value={m.bad} total={m.count} label={known ? `${m.bad}/${m.count} ezen a gépen (${m.bad / 10}% az összesből)` : 'a gép saját selejtrésze'} color={m.color} active={known} />
      </div>;
    })}</div>
    <div className={styles.bayesSummary} style={{ opacity: showTotal ? 1 : 0.35 }}>
      <div className={styles.defectsHeader}>
        <span>Összes selejt (teljes valószínűség): <b>{showTotal ? '10 + 30 + 50 = 90 selejt (9%)' : '10 + 30 + 50 = ?'}</b></span>
        <span>{showPosterior ? 'Bayes: hányad rész jött az adott gépről?' : showDefectsOnly ? 'Most a 90 selejt az új nevező' : 'Bayes-visszaosztás az utolsó lépésekben'}</span>
      </div>
      <div className={styles.defects} role="img" aria-label="A 90 selejt összetétele: G₁ 10, G₂ 30, G₃ 50">{machines.map(m => <div key={m.name} style={{ width: `${m.bad / 90 * 100}%`, background: m.color, opacity: showDefectsOnly ? 1 : 0.45 }}><b>{m.name}: {showTotal ? m.bad : '?'}</b><span>{showPosterior ? m.post : `${m.bad}/90`}</span></div>)}</div>
    </div>
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
    <div className={shared.intervalsHeader}>
      <h3>{filterB ? 'Csak B marad: a vegyes családok' : relations ? 'Csak A · A és B · csak B · egyik sem' : !known ? `${n} gyermek: az összes sorrend` : phase === 1 ? 'A: nulla vagy egy lány' : phase === 2 ? 'B: van fiú és lány is' : 'A∩B: mindkét feltétel teljesül'}</h3>
      <span>{!known ? `Összes: ${total} sorrend` : relations ? `Közös: ${n} · csak A: 1 · csak B: ${total - 2 - n}` : `Jó: ${favorable} / ${filterB ? `Új összes: ${denominator}` : `Összes: ${denominator}`}`}</span>
    </div>
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
    <p className={shared.caption}>
      {filterB
        ? 'A két egynemű család kiesik a nevezőből is. A vegyeseken belül csak a pontosan egy lányos sorrendek jók.'
        : four
          ? '4 gyermeknél 2⁴ = 16 egyformán valószínű sorrend van.'
          : '3 gyermeknél 2³ = 8 egyformán valószínű sorrend van (a 7. lépéstől 4 gyermekre váltunk).'}
    </p>
  </section>;
}

export function GuidedLesson({ problemId, current }: { problemId: string; current: number }) {
  const chapters = guidedChapters[problemId];
  const chapter = chapters[current] ?? chapters[0];
  const fallbackRule = problemId === 'zh2-conditional-chain'
    ? 'Feltételes valószínűség és szorzási lánc'
    : problemId === 'zh2-factory-bayes'
      ? (current < 4 ? 'Szorzási szabály' : current === 4 ? 'Teljes valószínűség tétele' : 'Bayes-formula')
      : 'Klasszikus valószínűség (kedvező / összes)';
  const fallbackGeneral = problemId === 'zh2-conditional-chain'
    ? 'P(X\\cap Y)=P(X)P(Y\\mid X)'
    : problemId === 'zh2-factory-bayes'
      ? (current < 4 ? 'P(G_i\\cap D)=P(G_i)P(D\\mid G_i)' : current === 4 ? 'P(D)=\\sum_{i=1}^{3}P(D\\mid G_i)P(G_i)' : 'P(G_i\\mid D)=\\frac{P(D\\mid G_i)P(G_i)}{P(D)}')
      : 'P(E)=\\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}';
  const activeMath = chapter.math ?? '\\text{Új összes (feltétel): }90\\text{ selejtes termék }\\implies P(D)=0{,}09';

  return <article className={shared.lesson}>
    <header className={shared.headerBlock}><span className={shared.kicker}>VEZETETT MEGOLDÁS · {current + 1} / {chapters.length}</span><h2>{chapter.title}</h2></header>
    <p className={shared.story}>{chapter.text}</p>
    {problemId === 'zh2-conditional-chain' ? <ChainBoard current={current} /> : problemId === 'zh2-factory-bayes' ? <FactoryBoard current={current} /> : <FamilyBoard current={current} />}
    <section className={shared.calculation}>
      <h3>{current === 0 ? 'A felírt adatok' : 'Ebből következik a számolás'}</h3>
      <LatexRenderer math={activeMath} />
    </section>
    <section className={shared.rule}>
      <span>AZ ALKALMAZOTT SZABÁLY</span>
      <h3>{chapter.rule ?? fallbackRule}</h3>
      <LatexRenderer math={chapter.general ?? fallbackGeneral} />
    </section>
    {chapter.purpose && <details className={shared.optional} open><summary>Mire jó a Bayes-formula?</summary><p className={styles.purpose}>{chapter.purpose}</p></details>}
    {chapter.notes.length > 0 && <details className={shared.optional}><summary>Jelmagyarázat és pontosítások ({chapter.notes.length})</summary><ul className={shared.notes}>{chapter.notes.map(note => <li key={note}>{note}</li>)}</ul></details>}
  </article>;
}

