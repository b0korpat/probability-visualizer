"use client";

import { motion } from "framer-motion";
import { ShirtItem, StepExplanation } from "@/types/visualizer";

function Shirt({ item, index, pulled = false }: { item: ShirtItem; index: number; pulled?: boolean }) {
  const isBlack = item.color === "black";
  return (
    <motion.div layoutId={item.id} layout transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={`shirt ${isBlack ? "shirt-black" : "shirt-white"} ${item.selected ? "shirt-selected" : ""} ${pulled ? "shirt-pulled" : ""}`}
      style={{ "--shirt-index": index } as React.CSSProperties} aria-label={`${isBlack ? "fekete" : "fehér"} póló`}>
      <span className="shirt-collar" />
      <span className="shirt-mark">{isBlack ? "B" : "W"}</span>
    </motion.div>
  );
}

export function DrawerVisualizer({ step }: { step: StepExplanation }) {
  const { visualState } = step;
  const blackCount = visualState.drawerItems.filter((item) => item.color === "black").length;
  const whiteCount = visualState.drawerItems.filter((item) => item.color === "white").length;
  return (
    <div className={`visual-stage mode-${visualState.highlightMode ?? "all"}`}>
      <div className="stage-topline"><span className="live-dot" /> DINAMIKUS ÁLLAPOT <span className="stage-counter">{String(step.stepIndex + 1).padStart(2, "0")} / 05</span></div>
      <div className="stage-zones">
        <div className="drawer-zone zone-card">
          <div className="zone-heading"><span><i className="zone-number">01</i> Fiók</span><span className="item-count">{blackCount + whiteCount} db</span></div>
          <div className="drawer-inner">
            {visualState.drawerItems.map((item, index) => <Shirt key={item.id} item={item} index={index} />)}
            {visualState.drawerItems.length === 0 && <span className="empty-state">üres</span>}
          </div>
          <div className="legend"><span><i className="legend-swatch black" /> {blackCount} fekete</span><span><i className="legend-swatch white" /> {whiteCount} fehér</span></div>
        </div>
        <div className="flow-arrow" aria-hidden="true">→</div>
        <div className={`pulled-zone zone-card ${visualState.pulledItems.length ? "has-pulled" : ""}`}>
          <div className="zone-heading"><span><i className="zone-number">02</i> Kihúzott pólók</span><span className="item-count">{visualState.pulledItems.length || "—"}</span></div>
          <div className="pulled-inner">
            {visualState.pulledItems.map((item, index) => <Shirt key={item.id} item={item} index={index} pulled />)}
            {visualState.pulledItems.length === 0 && <div className="empty-draw"><span>+</span><small>még nincs húzás</small></div>}
          </div>
          <div className="draw-status">{visualState.annotation}</div>
        </div>
      </div>
      <div className="stage-footnote"><span>INTERAKTÍV MODELL</span><span>A pólók nem kerülnek vissza a fiókba</span></div>
    </div>
  );
}
