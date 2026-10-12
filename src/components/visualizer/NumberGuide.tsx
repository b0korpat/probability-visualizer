"use client";

export function NumberGuide({ notes }: { notes: string[] }) {
  return <div className="number-guide"><div className="number-guide-title"><span>01</span> OLVASD EL: MIT JELENTENEK A JELEK?</div><p className="number-guide-intro">Nem kell kitalálnod: itt soronként elmondjuk, mit jelent a képlet minden fontos része.</p><div className="number-guide-list">{notes.map((note, index) => <div className="number-note" key={`${index}-${note}`}><b>{String(index + 1).padStart(2, "0")}</b><p>{note}</p></div>)}</div></div>;
}
