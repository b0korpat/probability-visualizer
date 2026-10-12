import { ProblemDefinition } from '@/types/visualizer';

export const stickChapters = [
  {
    "title": "A teljes pálca: ez az összes lehetőség",
    "text": "Van egy 200 cm-es pálca. Bárhol eltörhetjük, minden hely ugyanolyan esélyes. A teljes választható hossz tehát 200 cm: ez lesz az összes a kedvező / összes arányban.",
    "math": "\\text{teljes választható hossz}=200\\text{ cm}",
    "notes": [
      "Nem 200 külön eset van: a centiméterek között is bárhol törhetünk. Itt szakaszhosszt mérünk.",
      "x a törés helye a bal végétől. A bal darab x cm; a jobb darab 200 − x cm."
    ],
    "x": 60
  },
  {
    "title": "A: jelöljük a két szélső jó szakaszt",
    "text": "Az egyik darab legyen 120 cm-nél hosszabb. Ha 0–80 között törünk, a jobb darab hosszabb 120-nál. Ha 120–200 között törünk, a bal darab hosszabb 120-nál. Ezt a két szélső részt jelöljük. Pontosan 80-nál és 120-nál csak 120 cm a hosszabb darab, ezért a határpontok nem jók.",
    "math": "\\begin{aligned}\\text{jobb}>120&:\\quad x<200-120=80\\\\\\text{bal}>120&:\\quad x>120\\end{aligned}",
    "notes": [
      "A: az egyik VAGY a másik darab hosszabb 120 cm-nél. Elég, ha az egyik jó.",
      "80-nál és 120-nál a hosszabb darab pontosan 120 cm: a „hosszabb” feltétel ott nem teljesül.",
      "A színes sáv a jó törési helyeket mutatja, nem a letört darabokat."
    ],
    "x": 60
  },
  {
    "title": "A: kedvező hossz / összes hossz",
    "text": "Most a két kijelölt rész hosszát számoljuk. Balra 80 − 0 = 80 cm, jobbra 200 − 120 = 80 cm jó hely van. Összeadjuk: 80 + 80 = 160 cm. A teljes pálca 200 cm. Kedvező per összes: 160 / 200 = 0,8. Megvan P(A): 80%.",
    "math": "P(A)=\\frac{(80-0)+(200-120)}{200}=\\frac{160}{200}=0{,}8=80\\%",
    "rule": "Geometriai valószínűség",
    "general": "P(E)=\\frac{\\text{kedvező hossz}}{\\text{teljes hossz}}",
    "notes": [
      "P(A) = az A esemény esélye.",
      "Felül a két jó szakasz együtt; alul az egész pálca.",
      "0,8 = 80/100 = 80%."
    ],
    "x": 140
  },
  {
    "title": "B: most az 50 és 150 KÖZÖTTI rész kell",
    "text": "Most mindkét darab legyen 150 cm-nél rövidebb. A bal miatt 150 előtt, a jobb miatt 50 után kell törni (200 − 150 = 50). Tehát az 50 és 150 közötti rész kell: ezt jelöljük. Pontosan a két határon az egyik darab még 150 cm, ezért azok nem jók.",
    "math": "\\begin{aligned}\\text{bal}<150&:\\quad x<150\\\\\\text{jobb}<150&:\\quad x>200-150=50\\\\\\text{együtt: }50&<x<150\\end{aligned}",
    "notes": [
      "B: mindkét darab rövidebb 150-nél. Itt ÉS kell: mindkettőnek jónak kell lennie.",
      "50-nél vagy 150-nél az egyik darab pontosan 150 cm: ez a két pont nem jó.",
      "40-nél törve 40 és 160 cm lesz: B nem teljesül."
    ],
    "x": 100
  },
  {
    "title": "B: a középső rész arányát számoljuk",
    "text": "A kijelölt középső rész hossza 150 − 50 = 100 cm. Ezt osztjuk az összes 200 cm-rel. 100 / 200 = 0,5. Megvan P(B): 50%.",
    "math": "P(B)=\\frac{150-50}{200}=\\frac{100}{200}=0{,}5=50\\%",
    "rule": "Geometriai valószínűség",
    "general": "P(E)=\\frac{\\text{kedvező hossz}}{\\text{teljes hossz}}",
    "notes": [
      "150 és 50 a szakasz két végének helye; a különbségük a hossza.",
      "A teljes pálcának a fele jó, ezért az esély is egy fél.",
      "Egyetlen pontos törési hely valószínűsége nulla. A kizárt határpontok ezért nem változtatják meg a hosszarányt."
    ],
    "x": 100
  },
  {
    "title": "A∩B: mi marad, ami MINDKETTŐNEK jó?",
    "text": "Az A két szélső szakasza és a B középső szakasza már megvan. Most csak azt tartjuk meg, ahol mindkét sor színes. Balra az 50–80 rész marad. Jobbra a 120–150 rész marad. Ezt jelöljük a harmadik soron. Példa: 65-nél törve a darabok 65 és 135 cm-esek: van 120-nál hosszabb darab, de mindkettő 150-nél rövidebb.",
    "math": "A\\cap B=(50,80)\\cup(120,150)",
    "notes": [
      "∩ = metszet: A ÉS B egyszerre teljesül.",
      "∪ = unió: az egyik VAGY a másik szakaszon törhetünk.",
      "A függőleges segédvonalak ugyanazt a törési helyet mutatják minden sorban."
    ],
    "x": 65
  },
  {
    "title": "A∩B: kedvező hossz / összes hossz",
    "text": "A bal közös rész hossza 80 − 50 = 30 cm. A jobb közös részé 150 − 120 = 30 cm. Együtt 60 cm. Kedvező per összes: 60 / 200 = 0,3. Megvan P(A∩B): 30%.",
    "math": "P(A\\cap B)=\\frac{(80-50)+(150-120)}{200}=\\frac{60}{200}=0{,}3=30\\%",
    "rule": "Geometriai valószínűség",
    "general": "P(E)=\\frac{\\text{kedvező hossz}}{\\text{teljes hossz}}",
    "notes": [
      "A két jó közös rész hosszát összeadjuk.",
      "Még mindig a teljes 200 cm-hez viszonyítunk."
    ],
    "x": 135
  },
  {
    "title": "A|B: most csak B-n BELÜL nézzük A-t",
    "text": "Most azt mondják: B már biztosan teljesült. Ezért csak az 50–150 közti törések jöhetnek szóba. Ez a 100 cm lesz az új összes. Ezen belül A-nak továbbra is a két közös rész jó: együtt 60 cm. Most tehát 60 / 100 = 0,6. Megvan P(A|B): 60%.",
    "math": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}=\\frac{60/200}{100/200}=\\frac{60}{100}=0{,}6",
    "rule": "Feltételes valószínűség képlete",
    "general": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\quad(P(B)>0)",
    "notes": [
      "| = feltéve, hogy. P(A|B): A esélye, ha B-t már tudjuk.",
      "A jó rész 60 cm maradt; az összes változott 200-ról 100 cm-re.",
      "A szürkén kizárt szélső részek most nem jöhetnek szóba."
    ],
    "x": 65
  },
  {
    "title": "Függetlenek? B ismerete változtat A esélyén",
    "text": "Eredetileg A esélye 80%. Ha tudjuk B-t, A esélye csak 60%. Ez változás, ezért A és B nem független. A definícióval is ellenőrizzük: P(A) × P(B) = 0,8 × 0,5 = 0,4. A közös esélyt viszont 0,3-nak számoltuk. A kettő nem egyezik.",
    "math": "P(A)P(B)=0{,}8\\cdot0{,}5=0{,}4\\ne0{,}3=P(A\\cap B)",
    "rule": "Függetlenség definíciója",
    "general": "A,B\\text{ független}\\quad\\Longleftrightarrow\\quad P(A\\cap B)=P(A)P(B)",
    "notes": [
      "≠ = nem egyenlő.",
      "A nem független nem azt jelenti, hogy nem történhetnek meg együtt."
    ],
    "x": 65
  },
  {
    "title": "Megvan a teljes megoldás",
    "text": "Mindig ugyanazt csináltuk: kijelöltük a jó törési helyeket, lemértük a hosszukat, majd osztottunk az összessel. A feltételes kérdésnél az összes már csak B volt. A és B nem független.",
    "math": "\\begin{aligned}P(A)&=160/200=0{,}8\\\\P(B)&=100/200=0{,}5\\\\P(A\\cap B)&=60/200=0{,}3\\\\P(A\\mid B)&=60/100=0{,}6\\end{aligned}",
    "notes": [
      "Próbáld magad: 50-nél csak A teljesül; 80-nál csak B. Miért? Nézd a két darab konkrét hosszát."
    ],
    "x": 65
  }
];

export const stickLessonProblem: ProblemDefinition = {
  id: 'zh2-stick-conditional', title: 'Pálcatörés és feltételes valószínűség', category: 'geometric', visualizer: 'geometry', featured: true,
  statement: 'Egy 200 cm-es pálcát egyenletesen választott pontban eltörünk. A: valamelyik darab hosszabb 120 cm-nél. B: mindkét darab rövidebb 150 cm-nél. Keressük P(A), P(B), P(A∩B), P(A|B) értékét és a függetlenséget.',
  totalSteps: stickChapters.length,
  steps: stickChapters.map((item, stepIndex) => ({ stepIndex, title: item.title, description: item.text, latex: item.math, visualState: { drawerItems: [], pulledItems: [] } })),
};
