"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export function StepControls({ current, total, onPrevious, onNext, onReset }: { current: number; total: number; onPrevious: () => void; onNext: () => void; onReset: () => void }) {
  return <div className="controls"><button className="reset-button" onClick={onReset} aria-label="Alaphelyzet"><RotateCcw size={15} /> Reset</button><div className="control-buttons"><button className="icon-button" onClick={onPrevious} disabled={current === 0} aria-label="Előző lépés"><ChevronLeft size={19} /></button><span>{String(current + 1).padStart(2, "0")} <em>/</em> {String(total).padStart(2, "0")}</span><button className="next-button" onClick={onNext} disabled={current === total - 1}>Következő <ChevronRight size={18} /></button></div></div>;
}
