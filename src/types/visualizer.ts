export type ShirtColor = "black" | "white";

export interface ShirtItem {
  id: string;
  color: ShirtColor;
  selected?: boolean;
  highlight?: boolean;
}

export interface StepExplanation {
  stepIndex: number;
  title: string;
  description: string;
  latex: string;
  keyTakeaway?: string;
  visualState: {
    drawerItems: ShirtItem[];
    pulledItems: ShirtItem[];
    highlightMode?: "all" | "complement" | "target";
    annotation?: string;
  };
}

export interface ProblemDefinition {
  id: string;
  title: string;
  category: "combinatorics" | "venn" | "geometric";
  statement: string;
  totalSteps: number;
  steps: StepExplanation[];
  visualizer?: "drawer" | "word" | "venn" | "geometry";
  featured?: boolean;
}
