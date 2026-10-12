import { ProblemDefinition, StepExplanation } from "@/types/visualizer";

const step = (stepIndex: number, title: string, description: string, latex: string, keyTakeaway: string, annotation: string): StepExplanation => ({
  stepIndex, title, description, latex, keyTakeaway,
  visualState: { drawerItems: [], pulledItems: [], annotation }
});

/** A felhasználó által küldött, tényleges 2. ZH-s feladatok levezetései. */
export const zh2Practice: ProblemDefinition[] = [
  {
    id: "zh2-stick-conditional", title: "Pálcatörés és feltételes valószínűség", category: "geometric", visualizer: "geometry", featured: true,
    statement: "Véletlenszerű helyen eltörünk egy 2 méter hosszú pálcát. A: valamelyik darab hosszabb 120 cm-nél. B: mindkét darab rövidebb 150 cm-nél. Számítsd ki P(A), P(B), P(A∩B), P(A|B)-t, és vizsgáld meg a függetlenséget!",
    totalSteps: 7,
    steps: [
      step(0, "A töréspont modellje", "A töréspont legyen x cm-re a pálca bal végétől. Mivel a pálca 200 cm hosszú, x egyenletesen mozog a [0,200] intervallumon.", String.raw`\Omega=[0,200],\qquad P(E)=\frac{\mu(E)}{200}`, "Geometriai valószínűségnél kedvező hossz / teljes hossz arányt használunk.", "teljes szakasz: 0–200 cm"),
      step(1, "Az A esemény", "Az egyik darab 120 cm-nél hosszabb, ha x<80 vagy x>120. A két szélső intervallum összesen 160 cm hosszú.", String.raw`A=[0,80)\cup(120,200],\qquad P(A)=\frac{80+80}{200}=\frac45`, "A középső [80,120] tartományban egyik darab sem hosszabb 120 cm-nél.", "A: 0–80 vagy 120–200"),
      step(2, "A B esemény", "Mindkét darab 150 cm-nél rövidebb, ha x<150 és 200-x<150. Ez együtt az 50<x<150 feltételt adja.", String.raw`B=(50,150),\qquad P(B)=\frac{100}{200}=\frac12`, "A kedvező töréspontok egy 100 cm hosszú középső szakaszt alkotnak.", "B: 50–150"),
      step(3, "A metszet A∩B", "A és B egyszerre akkor teljesül, ha x a B középső szakaszában van, és közben A is igaz. Ez az (50,80) és (120,150) két darabja.", String.raw`A\cap B=(50,80)\cup(120,150),\qquad P(A\cap B)=\frac{30+30}{200}=\frac{60}{200}=0{,}3`, "A metszet két külön, egyenként 30 cm-es intervallumból áll.", "kedvező metszet: 60 cm"),
      step(4, "Feltételes valószínűség", "A B feltétel mellett csak a B tartományt tekintjük teljes eseménytérnek. Ebből 60 cm kedvező.", String.raw`P(A\mid B)=\frac{P(A\cap B)}{P(B)}=\frac{0{,}3}{0{,}5}=0{,}6`, "Ha tudjuk, hogy B bekövetkezett, A esélye 60%.", "60 / 100 = 0,6"),
      step(5, "Függetlenség vizsgálata", "A és B akkor függetlenek, ha P(A∩B)=P(A)P(B). A két oldal most nem egyezik.", String.raw`P(A)P(B)=\frac45\cdot\frac12=0{,}4\neq0{,}3=P(A\cap B)`, "A és B nem független események.", "0,3 ≠ 0,4"),
      step(6, "Összefoglaló", "A feladat összes keresett értéke egy helyen:", String.raw`P(A)=\frac45,\quad P(B)=\frac12,\quad P(A\cap B)=0{,}3,\quad P(A\mid B)=0{,}6`, "A feltételes valószínűség és a függetlenség ugyanazokra az eseményekre épül.", "végső eredmények")
    ]
  },
  {
    id: "zh2-conditional-chain", title: "Három egymást követő esemény", category: "venn", visualizer: "venn", featured: true,
    statement: "Adott P(A₁)=0,2, P(A₂|A₁)=0,6 és P(A₃|A₁∩A₂)=0,8. Számítsd ki P(A₁∩A₂∩A₃)-at, majd P(A₂∩A₃|A₁)-et!", totalSteps: 4,
    steps: [
      step(0, "Az adatok értelmezése", "A három esemény egymás utáni feltételekkel adott. Ezért a szorzási szabályt kell használni.", String.raw`P(A_1)=0{,}2,\quad P(A_2\mid A_1)=0{,}6,\quad P(A_3\mid A_1\cap A_2)=0{,}8`, "Mindig az előző események bekövetkezése melletti feltételes valószínűség szerepel.", "A₁ → A₂ → A₃"),
      step(1, "Mindhárom esemény", "A szorzási szabály szerint az első esemény valószínűségét megszorozzuk a következő feltételes valószínűségekkel.", String.raw`P(A_1\cap A_2\cap A_3)=P(A_1)P(A_2\mid A_1)P(A_3\mid A_1\cap A_2)`, "A feltételes szorzási szabály a lánc minden lépését figyelembe veszi.", "három tényező szorzata"),
      step(2, "Számolás", "Helyettesítsük be a három megadott értéket.", String.raw`P(A_1\cap A_2\cap A_3)=0{,}2\cdot0{,}6\cdot0{,}8=0{,}096`, "Mindhárom esemény egyszerre 9,6% valószínűségű.", "0,096 = 9,6%"),
      step(3, "Feltételes visszakérdezés", "A keresett feltételes valószínűséget a közös eseményből kapjuk meg: A₁ mellett A₂ és A₃ is bekövetkezik.", String.raw`P(A_2\cap A_3\mid A_1)=\frac{P(A_1\cap A_2\cap A_3)}{P(A_1)}=\frac{0{,}096}{0{,}2}=0{,}48`, "A válasz 48%: ha A₁ már megtörtént, A₂ és A₃ együtt ennyire valószínű.", "0,096 / 0,2 = 0,48")
    ]
  },
  {
    id: "zh2-factory-bayes", title: "Gyárak és hibás termékek", category: "venn", visualizer: "venn", featured: true,
    statement: "Egy üzemben az első gép a termelés 20%-át, a második 30%-át, a harmadik 50%-át adja. Az első gépnél 5%, a másodiknál és a harmadiknál 10% a selejtarány. Mennyi a kiválasztott termék selejtességének valószínűsége? Ha selejtes, melyik gép készítette?", totalSteps: 5,
    steps: [
      step(0, "A gépek és a hibák", "Legyen G₁, G₂, G₃ az egyes gépek eseménye, D pedig a selejtes termék eseménye.", String.raw`P(G_1)=0{,}2,\;P(G_2)=0{,}3,\;P(G_3)=0{,}5`, "A három gép teljes eseményrendszer: minden termék pontosan az egyik gépről jön.", "20% · 30% · 50%"),
      step(1, "Egy gép és selejt egyszerre", "A selejtes és harmadik gépes termék aránya a harmadik gép aránya és az ottani selejtarány szorzata.", String.raw`P(D\cap G_3)=P(D\mid G_3)P(G_3)=0{,}1\cdot0{,}5=0{,}05`, "A metszet azt jelenti: a termék a gépről jött és selejtes is.", "G₃ selejt: 5%"),
      step(2, "Teljes valószínűség", "A selejt három gép valamelyikéről érkezhet, ezért a három hozzájárulást összeadjuk.", String.raw`P(D)=0{,}05\cdot0{,}2+0{,}1\cdot0{,}3+0{,}1\cdot0{,}5=0{,}01+0{,}03+0{,}05=0{,}09`, "A kiválasztott termék 9% eséllyel selejtes.", "teljes selejtarány: 9%"),
      step(3, "Bayes-formula", "Ha már tudjuk, hogy a termék selejtes, visszafelé kérdezünk: mekkora rész érkezett a harmadik gépről?", String.raw`P(G_3\mid D)=\frac{P(D\mid G_3)P(G_3)}{P(D)}`, "Bayes megfordítja a feltételt: D-ből következtetünk G₃-re.", "G₃ és D / D"),
      step(4, "Végső eredmény", "A harmadik gép selejtes termékei az összes selejt 0,05/0,09 részét adják.", String.raw`P(G_3\mid D)=\frac{0{,}1\cdot0{,}5}{0{,}09}=\frac59\approx55{,}56\%`, "Egy selejtes termék 55,56% eséllyel a harmadik gépről származik.", "Bayes: 5/9")
    ]
  },
  {
    id: "zh2-family-genders", title: "Fiúk és lányok a családban", category: "combinatorics", visualizer: "word", featured: true,
    statement: "Háromgyerekes családoknál A: legalább egy lány van, B: van fiú és lány is. Tegyük fel, hogy a nemek azonos eséllyel és egymástól függetlenül alakulnak. Számítsd ki P(A), P(B), P(A∩B), P(A|B) és P(B|A)-t, majd vizsgáld meg a függetlenséget! A végén ugyanezeket a gondolatokat alkalmazd négygyerekes családokra is.", totalSteps: 7,
    steps: [
      step(0, "A háromgyerekes eseménytér", "Három gyermeknél minden fiú-lány sorrend egyformán valószínű. Összesen 2³=8 sorrend van.", String.raw`|\Omega|=2^3=8`, "A sorrendeket külön esetként számoljuk.", "FFF, FFL, FLF, ..."),
      step(1, "A és B esemény", "A csak akkor nem következik be, ha mindhárom fiú. B akkor nem következik be, ha mindenki fiú vagy mindenki lány.", String.raw`P(A)=1-\frac18=\frac78,\qquad P(B)=1-\frac18-\frac18=\frac68=\frac34`, "A komplementer esemény itt gyorsabb, mint az összes kedvező eset felsorolása.", "A: legalább 1 lány · B: vegyes"),
      step(2, "Metszet és feltételes valószínűségek", "Ha van fiú és lány is, akkor biztosan van legalább egy lány, ezért B részhalmaza A-nak.", String.raw`P(A\cap B)=P(B)=\frac34,\quad P(A\mid B)=1,\quad P(B\mid A)=\frac{3/4}{7/8}=\frac67`, "A legalább egy lányos családok 6/7 része vegyes.", "P(A|B)=1 · P(B|A)=6/7"),
      step(3, "Függetlenség három gyermeknél", "Függetlenséghez P(A∩B)=P(A)P(B) kellene, de ez nem teljesül.", String.raw`P(A)P(B)=\frac78\cdot\frac34=\frac{21}{32}\neq\frac34=P(A\cap B)`, "A és B nem függetlenek.", "nem független"),
      step(4, "Négygyerekes eseménytér", "Négy gyermeknél 2⁴=16 egyformán valószínű sorrend van. A legalább egy lány komplementere a négy fiú.", String.raw`|\Omega|=2^4=16,\qquad P(A)=1-\frac1{16}=\frac{15}{16}`, "A négygyerekes A eseményben 15 eset kedvező.", "15 / 16"),
      step(5, "Vegyes család négy gyermeknél", "B nem következik be csak akkor, ha mind a négy fiú vagy mind a négy lány. Ezért 14 kedvező sorrend marad.", String.raw`P(B)=1-\frac1{16}-\frac1{16}=\frac{14}{16}=\frac78,\qquad P(A\cap B)=P(B)`, "Négy gyermeknél is B részhalmaza A-nak.", "14 vegyes eset"),
      step(6, "Négygyerekes feltételes eredmény", "A feltételes valószínűségek és a függetlenség ugyanazzal a képlettel számolhatók.", String.raw`P(A\mid B)=1,\qquad P(B\mid A)=\frac{14/16}{15/16}=\frac{14}{15}`, "Négy gyermeknél is függő eseményekről van szó.", "P(B|A)=14/15")
    ]
  }
];
