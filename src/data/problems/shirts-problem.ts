import { ProblemDefinition, ShirtColor, ShirtItem } from "@/types/visualizer";

const shirts = (pulled: string[] = [], selectedColor?: "black" | "white"): ShirtItem[] =>
  Array.from({ length: 12 }, (_, index) => {
    const color: ShirtColor = index < 4 ? "black" : "white";
    const id = `shirt-${index + 1}`;
    return { id, color, selected: pulled.includes(id) || color === selectedColor };
  }).filter((item) => !pulled.includes(item.id));

const pulled = (ids: string[], color: "black" | "white", highlight = false): ShirtItem[] =>
  ids.map((id) => ({ id, color, highlight }));

const mixedPulled = (items: Array<[string, "black" | "white"]>): ShirtItem[] =>
  items.map(([id, color]) => ({ id, color, highlight: true }));

export const shirtsProblem: ProblemDefinition = {
  id: "shirt-drawer",
  title: "A pólós fiók",
  category: "combinatorics",
  visualizer: "drawer",
  statement:
    "Egy fiókban 12 darab egyforma kinézetű póló van: 4 fekete és 8 fehér. Sötétben kiveszel 3 darab pólót egyszerre (visszatevés nélkül). Mekkora a valószínűsége annak, hogy a kihúzott 3 póló között van legalább egy fekete póló?",
  totalSteps: 5,
  steps: [
    {
      stepIndex: 0,
      title: "Problémafelállítás és eseménytér",
      description: "Összesen 12 pólóból választunk ki 3-at, sorrendre való tekintet nélkül. Ez kombináció.",
      latex: String.raw`\lvert\Omega\rvert = \binom{12}{3} = \frac{12\cdot11\cdot10}{3\cdot2\cdot1} = 220`,
      keyTakeaway: "Az összes lehetséges, egyformán valószínű húzás száma 220.",
      visualState: { drawerItems: shirts(), pulledItems: [], highlightMode: "all", annotation: "12 póló a fiókban" }
    },
    {
      stepIndex: 1,
      title: "A stratégia: komplementer esemény",
      description: "A „legalább 1 fekete” azt jelenti: pontosan 1, 2 vagy 3 fekete. Gyorsabb a komplementert nézni: ekkor mindhárom póló fehér.",
      latex: String.raw`P(A)=1-P(\overline{A})`,
      keyTakeaway: "A legalább egy fekete ellentéte a nulla fekete.",
      visualState: { drawerItems: shirts([], "white"), pulledItems: [], highlightMode: "complement", annotation: "Most csak a 8 fehér pólóra fókuszálunk" }
    },
    {
      stepIndex: 2,
      title: "A kedvezőtlen esetek száma",
      description: "Hányféleképpen húzhatunk 3 fehér pólót a 8 elérhető fehérből?",
      latex: String.raw`\lvert\overline{A}\rvert = \binom{8}{3} = \frac{8\cdot7\cdot6}{3\cdot2\cdot1}=56`,
      keyTakeaway: "56 olyan húzás van, amelyben egyetlen fekete póló sincs.",
      visualState: { drawerItems: shirts(["shirt-5", "shirt-6", "shirt-7"]), pulledItems: pulled(["shirt-5", "shirt-6", "shirt-7"], "white", true), highlightMode: "complement", annotation: "3 fehér póló kihúzva" }
    },
    {
      stepIndex: 3,
      title: "A komplementer valószínűsége",
      description: "A tisztán fehér húzás valószínűsége a kedvezőtlen és az összes eset aránya.",
      latex: String.raw`\begin{aligned} P(\overline{A})&=\frac{\binom{8}{3}}{\binom{12}{3}}=\frac{56}{220}\\ &=\frac{14}{55}\approx0{,}2545\;(25{,}45\%) \end{aligned}`,
      keyTakeaway: "Körülbelül minden negyedik húzás lesz tisztán fehér.",
      visualState: { drawerItems: shirts(["shirt-5", "shirt-6", "shirt-7"]), pulledItems: pulled(["shirt-5", "shirt-6", "shirt-7"], "white", true), highlightMode: "complement", annotation: "Ezt az esetet szeretnénk elkerülni" }
    },
    {
      stepIndex: 4,
      title: "Végleges válasz",
      description: "Kivonjuk a komplementer eseményt a biztos eseményből, vagyis 1-ből.",
      latex: String.raw`\begin{aligned} P(A)&=1-P(\overline{A})=1-\frac{14}{55}\\ &=\frac{41}{55}\approx0{,}7455\;\mathbf{(74{,}55\%)} \end{aligned}`,
      keyTakeaway: "A válasz: 74,55% az esélye annak, hogy legalább egy fekete pólót húzol.",
      visualState: { drawerItems: shirts(["shirt-1", "shirt-5", "shirt-6"]), pulledItems: mixedPulled([["shirt-1", "black"], ["shirt-5", "white"], ["shirt-6", "white"]]), highlightMode: "target", annotation: "Legalább 1 fekete póló — siker!" }
    }
  ]
};
