import { ProblemDefinition, StepExplanation } from "@/types/visualizer";

const sportStep = (stepIndex: number, title: string, description: string, latex: string, keyTakeaway: string, annotation: string): StepExplanation => ({
  stepIndex, title, description, latex, keyTakeaway,
  visualState: { drawerItems: [], pulledItems: [], annotation }
});

export const sportsVillageProblem: ProblemDefinition = {
  id: "sports-village",
  title: "Sportolók a faluban",
  category: "venn",
  visualizer: "venn",
  featured: true,
  statement: "Egy faluban három sport eseményeit vizsgáljuk. Az alapadatok végig változatlanok: P(A)=25% foci, P(B)=40% kosárlabda, P(C)=45% pingpong, P(A∩B)=15%, P(A∩C)=10%, P(B∩C)=20%, P(A∩B∩C)=5%.",
  totalSteps: 6,
  steps: [
    sportStep(0, "Az alapadatok: A, B és C", "Először semmit nem számolunk át. Rögzítjük az órai feladat adatait: A=foci, B=kosárlabda, C=pingpong. Ezek az alapadatok minden későbbi lépésben ugyanazok maradnak.", String.raw`\begin{aligned} P(A)&=0{,}25\\ P(B)&=0{,}40\\ P(C)&=0{,}45\\ P(A\cap B)&=0{,}15\\ P(A\cap C)&=0{,}10\\ P(B\cap C)&=0{,}20\\ P(A\cap B\cap C)&=0{,}05 \end{aligned}`, "A 0,20 a kosárlabda és pingpong teljes közös része; ezt az adatot nem szabad 0,15-re cserélni.", "A=25% · B=40% · C=45% · hármas metszet=5%"),
    sportStep(1, "a) Legalább foci vagy pingpong", "Az A∪C azt jelenti: A-ban vagy C-ben vagy mindkettőben benne van. Az A és C metszetét azért vonjuk le, mert azokat az embereket az összeadás kétszer számolná.", String.raw`P(A\cup C)=P(A)+P(C)-P(A\cap C)=0{,}25+0{,}45-0{,}10=0{,}60`, "A válasz 60%: a lakosság 60%-a focizik vagy pingpongozik.", "a) 60%"),
    sportStep(2, "b) Foci, de nem kosárlabda", "Az A\\B azt jelenti: focizik, de a kosárlabdázók közé nem tartozik. A teljes focizó csoportból levonjuk azokat, akik egyszerre fociznak és kosárlabdáznak.", String.raw`P(A\setminus B)=P(A)-P(A\cap B)=0{,}25-0{,}15=0{,}10`, "A válasz 10%: csak az A kör kosár nélküli része marad.", "b) 10%"),
    sportStep(3, "c) Pontosan két sport", "A három páros metszet még tartalmazza a középső, mindhárom sportot űző 5%-ot. Ezért mindhárom páros metszetből egyszer levonjuk a hármas metszetet, majd összeadjuk a tiszta páros részeket.", String.raw`\begin{aligned} P(\text{csak }A\cap B)&=0{,}15-0{,}05=0{,}10\\ P(\text{csak }A\cap C)&=0{,}10-0{,}05=0{,}05\\ P(\text{csak }B\cap C)&=0{,}20-0{,}05=0{,}15\\ P(\text{pontosan 2})&=0{,}10+0{,}05+0{,}15=0{,}30 \end{aligned}`, "A pontosan két sportot űzők aránya 30%; a középső mindhárom sportos rész nincs benne.", "c) 30%"),
    sportStep(4, "d) Egyik sportot sem űzi", "Először kiszámoljuk az A∪B∪C uniót inklúzió-kizárással. A páros metszeteket levonjuk, a hármas metszetet visszaadjuk, mert azt a levonások túl sokszor távolították el.", String.raw`\begin{aligned} P(A\cup B\cup C)&=0{,}25+0{,}40+0{,}45-0{,}15-0{,}10-0{,}20+0{,}05\\ &=0{,}70\\ P(\overline{A\cup B\cup C})&=1-0{,}70=0{,}30 \end{aligned}`, "A lakosság 30%-a egyik sportot sem űzi.", "d) 30% — a Venn-diagramon kívül"),
    sportStep(5, "e) Kosárlabda is szerepel, ha pontosan kettőt űz", "A feltétel most az, hogy pontosan két sportot űzünk. A kedvező részek azok, ahol a kosárlabda benne van: csak A∩B és csak B∩C.", String.raw`P(B\mid\text{pontosan 2})=\frac{0{,}10+0{,}15}{0{,}30}=\frac{0{,}25}{0{,}30}=\frac56\approx83{,}33\%`, "A nevező a pontosan két sportot űzők teljes 30%-a; ebből 25% tartalmaz kosárlabdát.", "e) 5/6 = 83,33%")
  ]
};
