import type { VisualKind } from "./nagy-zh1";

export interface TeachingStep {
  title: string;
  explanation: string;
  why: string;
  formula: string;
  numbers: [string, string][];
  scene: string;
}
export interface BeginnerLesson {
  goal: string;
  notation: [string, string, string][];
  steps: TeachingStep[];
}
const s = (title: string, explanation: string, why: string, formula: string, numbers: [string, string][], scene: string): TeachingStep => ({ title, explanation, why, formula, numbers, scene });

export const beginnerLessons: Record<VisualKind, BeginnerLesson> = {
  venn: {
    goal: "Szétosztjuk a 100 diákot a diagram egymást nem átfedő szeleteibe, így minden kérdésre egyszerű összeadással válaszolhatunk.",
    notation: [
      ["A, B, C", "Angolul (50), németül (40) és franciául (30) tanulók csoportjai.", "A három megadott nyelvcsoport."],
      ["|A| = 50", "Az angolos kör teljes létszáma.", "Tartalmazza azokat is, akik mellette más nyelvet is tanulnak."],
      ["A ∩ B", "Angolul ÉS németül is tanulók.", "A két kör közös metszete."],
      ["A ∪ B ∪ C", "Legalább egy nyelvet tanulók.", "A három kör által lefedett teljes terület."],
      ["P", "Kiválasztás valószínűsége.", "A keresett létszám osztva a teljes 100-zal."]
    ],
    steps: [
      s("Elnevezzük a csoportokat", "A, B, C a három nyelv, a 100 a teljes hallgatói létszám (a körökön kívüliekkel együtt).", "Az 50 + 40 + 30 = 120 lenne, mert a többnyelvűeket többször is számolnánk – ezért kell a Venn-diagram.", String.raw`|\Omega|=100,\quad |A|=50,\quad |B|=40,\quad |C|=30`, [["100", "A feladat teljes hallgatói létszáma."], ["50; 40; 30", "A nyelvenkénti létszámok (átfedésekkel)."]], "setup"),
      s("Kezdjük a legbelső résszel", "Mindhárom nyelvet 5-en tanulják, ezt beírjuk a legbelső közös magba.", "Mindig a legbelső metszettel kell kezdeni, mert ez az 5 ember a páros metszetekben is benne ül.", String.raw`|A\cap B\cap C|=5`, [["5", "Mindhárom nyelvet beszélők száma a feladatból."]], "center"),
      s("Csak két nyelv: levonjuk a közepet", "A 20 angol-németesből levonjuk a 3 nyelvű 5 főt: 20 - 5 = 15. Ugyanígy 15 - 5 = 10 és 10 - 5 = 5.", "A feladatbeli páros adatokban még benne van a belső 5 ember – ha nem vonnád le, duplán számolnád őket.", String.raw`AB_{\rm csak}=20-5=15,\quad AC_{\rm csak}=15-5=10,\quad BC_{\rm csak}=10-5=5`, [["20; 15; 10", "A feladatban megadott páros létszámok."], ["5", "A mindhárom nyelvet tanulók."], ["15; 10; 5", "A tiszta, csak két nyelvet tanulók száma."]], "pairs"),
      s("Csak egy nyelv: levonjuk az átfedéseket", "Az 50 angolosból levonjuk a kapcsolódó részeket: 50 - 15 - 10 - 5 = 20. Ugyanígy B-nél 15, C-nél 10 marad.", "A teljes körből kivonjuk a többiekkel közös részeket, így csak a tiszta egynyelvűek maradnak.", String.raw`A_{\rm csak}=20,\qquad B_{\rm csak}=15,\qquad C_{\rm csak}=10`, [["50; 40; 30", "Az eredeti nyelvi körök teljes létszámai."], ["20; 15; 10", "A kizárólag egy nyelvet tanulók száma."]], "singles"),
      s("Legalább egy nyelv: összeadjuk a 7 szeletet", "Összeadjuk a diagram 7 tiszta szeletét: 20 + 15 + 10 + 15 + 10 + 5 + 5 = 80 fő.", "A szeletek már nem fedik át egymást, így senkit sem számolunk kétszer. A 80 fő beszél legalább egy nyelvet.", String.raw`20+15+10+15+10+5+5=80`, [["20+15+10", "A tiszta egynyelvűek."], ["15+10+5", "A tiszta kétnyelvűek."], ["5", "A háromnyelvűek."], ["80", "Összesen legalább egy nyelvet tanulók."]], "union"),
      s("Pontosan kettő és egyik sem", "Pontosan két nyelv: 15 + 10 + 5 = 30. Egyik sem: 100 - 80 = 20. Esély legalább egyre: 80 / 100 = 80%.", "A „pontosan kettőbe” a hármas már nem tartozik bele; az „egyik sem” pedig a körökön kívül maradt 20 ember.", String.raw`N_2=30,\quad N_0=20,\qquad P(\text{legalább egy})=\frac{80}{100}=0{,}8`, [["30", "A három tiszta kétnyelvű szelet összege."], ["20", "100 - 80: akik semmilyen nyelvet sem tanulnak."], ["100", "A teljes csoport, amivel osztunk a valószínűséghez."]], "outside"),
    ],
  },
  counting: {
    goal: "Megszámoljuk az összes lehetséges 3-as csoportot és a nekünk jó (2 piros + 1 kék) hármasokat, majd elosztjuk őket.",
    notation: [
      ["A", "Pontosan 2 piros és 1 kék golyót húzunk.", "A keresett esemény neve."],
      ["|Ω|", "Összes lehetséges 3-as húzás (120).", "A teljes mintatér mérete."],
      ["C(n,k) vagy (n alatt k)", "n elemből k kiválasztása, ha a sorrend nem számít.", "Kombináció: egy csoportban mindegy, ki hányadiknak jött."],
      ["P(A)", "Kedvező esetek / összes eset.", "A keresett valószínűség."]
    ],
    steps: [
      s("A golyók és a cél elnevezése", "6 piros és 4 kék golyó van (összesen 10). 3-at húzunk: a cél pontosan 2 piros és 3 - 2 = 1 kék.", "Először mindig tisztázd a színek darabszámát, hogy lásd, miből mennyit kell kiválasztani.", String.raw`6+4=10,\qquad 3-2=1\ \text{kék}`, [["6 és 4", "Piros és kék golyók száma a dobozban."], ["10", "Összes golyó."], ["3", "Kihúzott golyók száma."]], "setup"),
      s("Összes választás, ha a sorrend számítana", "Elsőre 10, másodikra 9, harmadikra 8 golyóból választhatunk: 10 · 9 · 8 = 720.", "Visszatevés nélkül minden húzással eggyel kevesebb golyó marad a dobozban.", String.raw`10\cdot9\cdot8=720`, [["10 · 9 · 8", "A három egymás utáni húzás lehetőségei."], ["720", "Összes eset, ha a húzási sorrend is számítana."]], "ordered"),
      s("Miért osztunk 6-tal? (Sorrend kiesik)", "3 kihúzott golyót 3! = 3 · 2 · 1 = 6-féle sorrendben rakhatunk le. A 720-at osztjuk 6-tal: 720 / 6 = 120.", "Egyszerre húzzuk a golyókat, a sorrend tökmindegy: a P1-P2-K1 és K1-P2-P1 pontosan ugyanaz a hármas.", String.raw`|\Omega|=\binom{10}{3}=\frac{10\cdot9\cdot8}{3\cdot2\cdot1}=120`, [["6 = 3!", "Egy 3 fős csoport lehetséges sorrendjei."], ["120", "(10 alatt 3): az összes valóban különböző hármas."]], "unordered"),
      s("A 2 piros golyó kiválasztása", "A 6 pirosból 2-t választunk: (6 · 5) / 2 = 15 különböző piros párt kapunk.", "6 · 5 = 30 lenne sorrenddel, de mivel a páron belüli sorrend sem számít, felezzük.", String.raw`\binom62=\frac{6\cdot5}{2\cdot1}=15`, [["6 · 5", "Két piros kiválasztása sorrenddel."], ["2", "A két golyó felcserélhetősége."], ["15", "(6 alatt 2): különböző piros párok száma."]], "redpairs"),
      s("Minden piros párhoz 4 kék társul", "Mind a 15 piros pár mellé berakhatunk egyet a 4 kék közül: 15 · 4 = 60 jó hármas van.", "Bármelyik piros párhoz bármelyik kék golyó társulhat, így összeszorozzuk a lehetőségeket.", String.raw`|A|=15\cdot4=60`, [["15", "A kiválasztható piros párok száma."], ["4", "A választható 4 kék golyó."], ["60", "Az összes kedvező (2 piros, 1 kék) hármas."]], "favorable"),
      s("A valószínűség: kedvező / összes", "60 jó hármas van a 120 összesből: P = 60 / 120 = 1/2 = 50%.", "Minden hármas egyformán esélyes, így a jó eseteket egyszerűen elosztjuk az összes esettel.", String.raw`P(A)=\frac{|A|}{|\Omega|}=\frac{60}{120}=\frac12=0{,}5=50\%`, [["60", "Kedvező esetek (számláló)."], ["120", "Összes eset (nevező)."], ["50%", "A keresett valószínűség."]], "ratio"),
    ],
  },
  geometry: {
    goal: "Az egységnégyzetben a valószínűség = területarány. A bonyolult középső sáv helyett a két rossz sarkot vonjuk le az 1-ből.",
    notation: [
      ["(X, Y)", "Véletlen pont a [0,1] × [0,1] négyzetben.", "A két koordináta értéke."],
      ["|X - Y| ≤ 1/3", "A két szám legfeljebb 1/3-dal térhet el.", "A feladat által megengedett sáv."],
      ["T", "Terület.", "Egyenletes eloszlásnál Terület = Valószínűség."]
    ],
    steps: [
      s("A négyzet és a teljes terület", "X és Y is 0 és 1 közötti, így a pont egy 1×1-es egységnégyzetbe esik. A teljes terület 1.", "Geometriai valószínűségnél a teljes terület felel meg a 100%-os esélynek.", String.raw`0\le X,Y\le1,\qquad T_{\rm teljes}=1\cdot1=1`, [["0 és 1", "X és Y határai."], ["1", "A teljes négyzet területe."]], "setup"),
      s("Az átlón egyenlők a számok", "Az átlón X = Y, vagyis a különbség 0. A feltétel (|X - Y| ≤ 1/3) az átló körüli sávot jelöli ki.", "Az átló a kiindulópont: ettől térhetünk el mindkét irányban legfeljebb 1/3-dal.", String.raw`X=Y\Rightarrow|X-Y|=0\le\frac13`, [["0", "Az átlón lévő pontok különbsége."], ["1/3", "A megengedett maximális eltérés."]], "diagonal"),
      s("A két határvonal felrajzolása", "A sáv felső határa Y = X + 1/3, alsó határa Y = X - 1/3. A kettő közötti rész a kedvező sáv.", "Az abszolút érték két határt jelent: Y nem mehet 1/3-nál feljebb, sem 1/3-nál lejjebb X-hez képest.", String.raw`X-\frac13\le Y\le X+\frac13`, [["+1/3", "Felső határ eltolása."], ["-1/3", "Alsó határ eltolása."]], "band"),
      s("A két rossz sarok mérete", "A sávon kívül két derékszögű sarok marad. Mindkettő befogója 1 - 1/3 = 2/3.", "A teljes 1 oldalhosszból az 1/3-os sáv levág 1/3-ot, így 2/3 marad a háromszög oldalának.", String.raw`a=b=1-\frac13=\frac33-\frac13=\frac23`, [["1", "A négyzet teljes oldala."], ["1/3", "A levágott rész."], ["2/3", "A sarok-háromszögek oldala."]], "triangles"),
      s("A két sarok területe", "Egy sarok területe (2/3 · 2/3) / 2 = 2/9. A két sarok együtt: 2 · 2/9 = 4/9.", "Derékszögű háromszög területe a befogók szorzatának a fele, és két egyforma sarok van.", String.raw`T_{\rm egy}=\frac{(2/3)(2/3)}2=\frac29,\qquad T_{\rm rossz}=2\cdot\frac29=\frac49`, [["2/9", "Egy sarok területe."], ["4/9", "A két rossz sarok összterülete."]], "area"),
      s("A jó terület kivonással", "A teljes 1-ből kivonjuk a rossz 4/9-et: 1 - 4/9 = 5/9 ≈ 55,56%.", "Sokkal gyorsabb a két egyszerű sarkot kivonni az 1-ből, mint a ferde középső sáv területével szenvedni.", String.raw`P(A)=\frac{1-4/9}{1}=\frac59\approx0{,}5556`, [["1", "Teljes terület."], ["4/9", "Rossz sarkok."], ["5/9 ≈ 55,56%", "A keresett valószínűség."]], "result"),
    ],
  },
  bayes: {
    goal: "Megtudtuk, hogy a termék hibás. Kiszámoljuk, mekkora eséllyel jött az 1. gépről.",
    notation: [
      ["G1, G2", "1. gép (40%) és 2. gép (60%).", "A két lehetséges gyártó gép."],
      ["H", "A termék hibás.", "A megfigyelt eredmény."],
      ["P(H|G1) = 0,08", "Hibaarány az 1. gépen.", "Feltételes hibaarány az 1. gép termékein belül."],
      ["P(G1|H)", "Ha hibás, mekkora eséllyel az 1. gép gyártotta?", "Ezt kérdezi a feladat (Bayes-irány)."]
    ],
    steps: [
      s("Adatok felírása tizedestörtben", "G1 aránya 0,4 (hibája 0,08). G2 aránya 0,6 (hibája 0,02). Keresett: P(G1|H).", "Százalék helyett tizedestörttel számolunk (40% = 0,4), mert így közvetlenül lehet szorozni.", String.raw`P(G_1)=0{,}4,\quad P(G_2)=0{,}6,\quad P(H\mid G_1)=0{,}08,\quad P(H\mid G_2)=0{,}02`, [["0,4 és 0,6", "A két gép gyártási aránya."], ["0,08 és 0,02", "A gépeken belüli hibaarányok."]], "setup"),
      s("1. gép hibás ága", "A termékek 0,4 része jön az 1. gépről, ennek 0,08 része hibás: 0,4 · 0,08 = 0,032 (3,2%).", "Fa-diagram elve: egy ágon végighaladva összeszorozzuk a valószínűségeket.", String.raw`P(G_1\cap H)=0{,}4\cdot0{,}08=0{,}032`, [["0,4", "1. gép aránya."], ["0,08", "Hibaarány."], ["0,032 = 3,2%", "Az 1. gépről jövő selejt az összes termékből."]], "first"),
      s("2. gép hibás ága", "A 2. gép a termékek 0,6 részét adja, 0,02 hibaaránnyal: 0,6 · 0,02 = 0,012 (1,2%).", "Mindkét forrás hibásait ki kell számolnunk, hogy lássuk a teljes selejtmennyiséget.", String.raw`P(G_2\cap H)=0{,}6\cdot0{,}02=0{,}012`, [["0,6", "2. gép aránya."], ["0,02", "Hibaarány."], ["0,012 = 1,2%", "A 2. gépről jövő selejt az összes termékből."]], "second"),
      s("Az összes hibás termék aránya", "Összeadjuk a két gép selejtjeit: 0,032 + 0,012 = 0,044 (összesen 4,4% selejt).", "Selejt csak ezen a két gépen keletkezhet, így a két kizáró ág összege adja az összes hibás terméket.", String.raw`P(H)=0{,}032+0{,}012=0{,}044`, [["0,032 és 0,012", "A két gép hibás ágai."], ["0,044 = 4,4%", "Az összes selejtes termék aránya (nevező)."]], "total"),
      s("A feltételes esély (Bayes-formula)", "Az 1. gép hibásait elosztjuk az összes hibással: 0,032 / 0,044 = 32 / 44 = 8 / 11 ≈ 72,73%.", "Képzelj el 1000 terméket: 44 darab selejt van (nevező), ebből 32 az 1. gépről jött (számláló). 44-ből 32 az esély.", String.raw`P(G_1\mid H)=\frac{0{,}032}{0{,}044}=\frac{32}{44}=\frac8{11}\approx0{,}7273`, [["0,032", "1. gép selejtje (számláló)."], ["0,044", "Összes selejt (nevező)."], ["8/11 ≈ 72,73%", "Annak esélye, hogy a hibás termék az 1. gépről jött."]], "result"),
    ],
  },
  cdf: {
    goal: "Megtanuljuk felolvasni az eloszlásfüggvényt: F(x) = P(X < x) az adott határnál kisebb értékek összes esélye.",
    notation: [
      ["X", "A véletlen szám, értékei: 0, 2 vagy 4.", "A sorsolt érték."],
      ["p", "Az esélyek: 1/4, 1/2, 1/4.", "Az egyes értékek valószínűsége."],
      ["F(x) = P(X < x)", "A határnál szigorúan kisebb értékek összsúlya.", "A kurzus balról folytonos konvenciója."],
      ["F(2+)", "F értéke a 2-től közvetlenül jobbra.", "Itt a 2-es érték már belekerült az összegbe."]
    ],
    steps: [
      s("A három lehetséges érték és esélyeik", "X csak 0, 2 vagy 4 lehet, esélyeik 1/4, 1/2 és 1/4. Összegük 1.", "Az eloszlásfüggvény ezekből a súlyokból épül fel lépcsőzetesen, balról jobbra haladva.", String.raw`P(X=0)=\frac14,\quad P(X=2)=\frac12,\quad P(X=4)=\frac14`, [["0; 2; 4", "A három lehetséges érték."], ["1/4; 1/2; 1/4", "A hozzájuk tartozó esélyek."]], "setup"),
      s("0-ig semmi, 0 felett 1/4", "x ≤ 0-nál F(x) = 0. Ha 0 < x ≤ 2, csak a 0 kisebb a határnál, így F(x) = 1/4.", "Mivel a képlet P(X < x), pontosan x = 2-nél a 2 még nem számít bele (2 < 2 nem igaz), csak utána.", String.raw`F(x)=0\ (x\le0),\qquad F(x)=\frac14\ (0<x\le2)`, [["0", "A legkisebb érték előtt nulla az esély."], ["1/4", "A 0-s érték súlya."], ["2", "A következő ugrópont."]], "first"),
      s("2 felett 3/4, 4 felett eléri az 1-et", "Ha 2 < x ≤ 4, már a 0 és a 2 is bent van: 1/4 + 1/2 = 3/4. x > 4 esetén a 4 is belép: F(x) = 1.", "Minden lehetséges értéknél felfelé ugrik a lépcső az adott érték esélyével.", String.raw`F(x)=\frac34\ (2<x\le4),\qquad F(x)=1\ (x>4)`, [["3/4", "0 és 2 esélye együtt."], ["1", "Mindhárom érték esélye (100%)."]], "all"),
      s("A [0, 4) intervallum esélye", "P(0 ≤ X < 4) = F(4) - F(0) = 3/4 - 0 = 3/4.", "A felső határ alatti esélyből (3/4) levonjuk az alsó határ alatti esélyt (0), így pontosan a 0 és 2 marad benne.", String.raw`P(0\le X<4)=F(4)-F(0)=\frac34-0=\frac34`, [["F(4) = 3/4", "A 4-nél kisebb értékek esélye."], ["F(0) = 0", "A 0-nál kisebb értékek esélye."]], "interval"),
      s("A 2-es pont esélye: az ugrás nagysága", "Közvetlenül 2 előtt F = 1/4, utána F = 3/4. Az ugrás: 3/4 - 1/4 = 1/2, vagyis P(X=2) = 1/2.", "Egy diszkrét pont valószínűsége mindig az eloszlásfüggvény adott pontbeli ugrásának a magassága.", String.raw`P(X=2)=F(2+)-F(2)=\frac34-\frac14=\frac12`, [["3/4", "F értéke 2 után."], ["1/4", "F értéke 2-nél."], ["1/2", "Az ugrás, azaz P(X=2)."]], "jump"),
    ],
  },
  moments: {
    goal: "Kiszámoljuk a súlyozott átlagot (várható érték), az ingadozást (szórásnégyzet), majd megnézzük, mi történik Y = 3X - 1 esetén.",
    notation: [
      ["X", "Értékei: 0, 2, 4.", "Az eredeti véletlen változó."],
      ["E(X)", "Várható érték: esélyekkel súlyozott átlag.", "Hosszú távú átlag."],
      ["E(X²)", "A négyzetek várható értéke.", "A Steiner-formulához szükséges második momentum."],
      ["D²(X), D(X)", "Szórásnégyzet és szórás.", "Az átlagtól való ingadozás mértéke."],
      ["Y = 3X - 1", "Az átalakított új változó.", "Lineáris transzformáció."]
    ],
    steps: [
      s("Értékek és esélyek", "X lehetséges értékei 0, 2 és 4, esélyeik 1/4, 1/2 és 1/4.", "Az átlaghoz nem elég az érték: az is számít, melyik milyen gyakran fordul elő.", String.raw`(x_i,p_i)=(0,1/4),\ (2,1/2),\ (4,1/4)`, [["0; 2; 4", "Lehetséges X értékek."], ["1/4; 1/2; 1/4", "Valószínűségi súlyok."]], "setup"),
      s("Várható érték: érték × esély összege", "E(X) = 0·(1/4) + 2·(1/2) + 4·(1/4) = 0 + 1 + 1 = 2.", "Minden értéket beszorzunk a saját esélyével, majd összeadjuk – ez adja a súlyozott átlagot.", String.raw`E(X)=0\cdot\frac14+2\cdot\frac12+4\cdot\frac14=2`, [["0; 1; 1", "A három súlyozott tag."], ["2", "A várható érték."]], "mean"),
      s("Második momentum: értékek négyzeteinek átlaga", "E(X²) = 0²·(1/4) + 2²·(1/2) + 4²·(1/4) = 0 + 4·(1/2) + 16·(1/4) = 0 + 2 + 4 = 6.", "Az értékeket emeljük négyzetre, az esélyeket NEM. Ez E(X²), nem [E(X)]².", String.raw`E(X^2)=0^2\cdot\frac14+2^2\cdot\frac12+4^2\cdot\frac14=6`, [["0; 4; 16", "Az értékek négyzetei."], ["6", "A négyzetek súlyozott átlaga."]], "squares"),
      s("Szórásnégyzet: Steiner-formula", "D²(X) = E(X²) - [E(X)]² = 6 - 2² = 6 - 4 = 2.", "A négyzetek átlagából (6) levonjuk az átlag négyzetét (4) – ez méri a tiszta ingadozást.", String.raw`D^2(X)=E(X^2)-[E(X)]^2=6-2^2=2`, [["6", "E(X²)."], ["4 = 2²", "Az átlag négyzete."], ["2", "A szórásnégyzet."]], "variance"),
      s("Szórás: négyzetgyököt vonunk", "A szórásnégyzet 2, a szórás ennek a gyöke: D(X) = √2 ≈ 1,4142.", "A gyökvonás visszahozza a számokat az eredeti mértékegységbe (a szórásnégyzet még négyzetes volt).", String.raw`D(X)=\sqrt{D^2(X)}=\sqrt2\approx1{,}4142`, [["2", "A szórásnégyzet."], ["√2 ≈ 1,4142", "A szórás."]], "deviation"),
      s("Y = 3X - 1 várható értéke", "E(Y) = 3·E(X) - 1 = 3·2 - 1 = 5.", "A várható érték lineáris: ha minden értéket 3-szorozunk és 1-et levonunk, az átlaggal is pontosan ez történik.", String.raw`E(Y)=3E(X)-1=3\cdot2-1=5`, [["3 és -1", "A képletbeli szorzó és eltolás."], ["2", "E(X)."], ["5", "E(Y)."]], "transform"),
      s("Y szórásnégyzete: a 3-as szorzó négyzettel hat", "D²(Y) = 3² · D²(X) = 9 · 2 = 18.", "A -1 eltolás minden számot ugyanúgy mozgat, így a szóródást nem változtatja. A 3-as szorzó viszont 3² = 9-szeresére növeli a szórásnégyzetet.", String.raw`D^2(Y)=3^2D^2(X)=9\cdot2=18`, [["9 = 3²", "A szorzó négyzete."], ["2", "D²(X)."], ["18", "D²(Y)."]], "result"),
    ],
  },
  binomial: {
    goal: "10 független próbából nézzük a sikerek számát: mi az esélye pontosan 3 sikernek, és legalább 1 sikernek?",
    notation: [
      ["X ~ Bin(n, p)", "Binomiális eloszlás.", "Független próbák azonos sikereséllyel."],
      ["n = 10", "Próbák száma.", "Összesen 10-szer próbálkozunk."],
      ["p = 0,2; q = 0,8", "Siker és kudarc esélye egy próbánál.", "q = 1 - p."],
      ["k = 3", "Keresett sikerek száma.", "Pontosan 3 sikert akarunk."],
      ["(10 alatt 3)", "Sikerek helyeinek száma (120).", "Nem mindegy, hanyadik próbák sikerülnek."]
    ],
    steps: [
      s("Adatok felírása", "n = 10 próba, p = 0,2 sikeresély (20%), és k = 3 sikert keresünk.", "A binomiális modellt akkor használhatjuk, ha a próbák függetlenek és a sikeresély mindvégig állandó.", String.raw`X\sim\operatorname{Bin}(n,p),\quad n=10,\quad p=0{,}2,\quad k=3`, [["10", "Próbák száma."], ["0,2", "Sikeresély."], ["3", "Kívánt sikerek."]], "setup"),
      s("3 sikerhez 7 kudarc kell", "Kudarc esélye: q = 1 - 0,2 = 0,8. A 10 próbából 3 siker mellett 10 - 3 = 7 kudarcnak kell lennie.", "A „pontosan 3 siker” azt jelenti, hogy a maradék 7 helyen mind kudarcnak kell állnia.", String.raw`q=1-p=0{,}8,\qquad n-k=10-3=7`, [["0,8", "Kudarc esélye."], ["7", "Kudarcok száma."]], "failures"),
      s("Egyetlen konkrét sorrend esélye", "Egyetlen fix sorrend esélye (pl. SSSKKKKKKK): 0,2³ · 0,8⁷ ≈ 0,001678.", "Mivel a próbák függetlenek, a 3 sikeresélyt és a 7 kudarcesélyt egyszerűen összeszorozzuk.", String.raw`p^3q^7=0{,}2^3\cdot0{,}8^7\approx0{,}0016777`, [["0,2³", "3 siker esélye."], ["0,8⁷", "7 kudarc esélye."], ["0,0016777", "Egyetlen konkrét sorrend esélye."]], "sequence"),
      s("Hányféleképpen oszolhat el a 3 siker?", "A 3 sikeres helyet (10 alatt 3) = (10·9·8)/(3·2·1) = 120-féleképpen választhatjuk ki a 10 próbából.", "Mind a 120 mintázat jó nekünk és mindegyik azonos esélyű, ezért megszorozzuk vele az egyedi esélyt.", String.raw`\binom{10}{3}=\frac{10\cdot9\cdot8}{3\cdot2\cdot1}=120`, [["120", "(10 alatt 3): a 3 siker lehetséges elhelyezkedései."]], "placements"),
      s("Pontosan 3 siker valószínűsége", "P(X=3) = 120 · (0,2³ · 0,8⁷) = 120 · 0,0016777 ≈ 20,13%.", "Binomiális képlet lényege: (helyek száma) × (egy konkrét sorrend esélye).", String.raw`P(X=3)=120\cdot0{,}0016777216\approx0{,}2013`, [["120", "Mintázatok száma."], ["0,001678", "Egy mintázat esélye."], ["20,13%", "A végeredmény."]], "exact"),
      s("Legalább 1 siker: levonjuk a csupa kudarcot", "P(X ≥ 1) = 1 - P(X=0) = 1 - 0,8¹⁰ ≈ 1 - 0,1074 = 89,26%.", "Nem számoljuk ki külön az 1, 2, ..., 10 sikert: a 100%-ból levonjuk az egyetlen rossz esetet (a 0 sikert).", String.raw`P(X\ge1)=1-P(X=0)=1-0{,}8^{10}\approx0{,}8926`, [["0,8¹⁰", "0 siker (10 kudarc) esélye."], ["89,26%", "Legalább 1 siker esélye."]], "atleast"),
      s("Átlag és szórásnégyzet fix képletei", "Várható érték: E(X) = n·p = 10 · 0,2 = 2. Szórásnégyzet: D²(X) = n·p·q = 10 · 0,2 · 0,8 = 1,6.", "Binomiális eloszlásnál nem kell táblázatot készíteni az átlaghoz: a próbák száma és a sikeresély szorzata közvetlenül megadja.", String.raw`E(X)=np=2,\qquad D^2(X)=npq=1{,}6`, [["2", "Átlagos sikerszám 10 próbából."], ["1,6", "Szórásnégyzet."]], "moments"),
    ],
  },
  memory: {
    goal: "Az örökifjúság lényege: a múltbéli várakozás nem számít. Ha eddig nem sikerült, a hátralévő idő esélye tiszta lappal újraindul.",
    notation: [
      ["X ~ Geo(p)", "Geometriai eloszlás.", "Addig próbálkozunk, amíg az első siker be nem következik."],
      ["p = 1/6", "Egy próbálkozás sikeresélye (pl. hatos dobás).", "Minden dobásnál független."],
      ["T ~ Exp(λ)", "Exponenciális eloszlás.", "Folytonos várakozási idő (pl. ügyfél érkezése)."],
      ["λ = 0,1 perc⁻¹", "Érkezési ráta.", "Átlagosan 1/λ = 10 percet kell várni."]
    ],
    steps: [
      s("Kockadobás: az első hatosig dobunk", "X az első hatos dobás sorszáma, p = 1/6 sikereséllyel és q = 5/6 kudarceséllyel.", "Geometriai eloszlásnál a próbák száma véletlen: addig dobunk, míg az első siker meg nem történik.", String.raw`X\sim\operatorname{Geo}(p),\quad p=\frac16,\quad q=\frac56`, [["1/6", "Hatos dobás esélye."], ["5/6", "Nem hatos esélye."]], "geom-setup"),
      s("Több mint 4 dobás kell: az első 4 mind kudarc", "P(X > 4) azt jelenti, hogy az első 4 dobás egyike sem hatos: (5/6)⁴ ≈ 48,23%.", "Akkor kell 4-nél több dobás, ha az első 4 kísérlet mindegyike kudarc volt.", String.raw`P(X>4)=\left(\frac56\right)^4=\frac{625}{1296}\approx0{,}48225`, [["4 a kitevőben", "4 darab egymás utáni nem-hatos dobás."], ["48,23%", "Annak esélye, hogy 4-nél többet kell dobni."]], "geom-tail"),
      s("Örökifjúság: a múlt nem számít", "P(X > 6 | X > 2) = P(X > 4) = (5/6)⁴ ≈ 48,23%.", "A kockának nincs memóriája: hiába dobtál már 2-t sikertelenül, a további 4 dobás esélye pont ugyanannyi, mint legelölről.", String.raw`P(X>6\mid X>2)=P(X>4)=\left(\frac56\right)^4\approx0{,}48225`, [["6 - 2 = 4", "A már eltelt 2 dobás kiesik, csak a hátralévő 4 dobás számít."]], "geom-memory"),
      s("Folytonos várakozás: exponenciális idő", "T exponenciális várakozási idő, λ = 0,1 ráta mellett. Az átlagos várakozás 1/λ = 10 perc.", "Az exponenciális eloszlás a geometriai eloszlás folytonos megfelelője: itt az esemény bekövetkeztéig eltelt időt mérjük.", String.raw`T\sim\operatorname{Exp}(\lambda),\quad \lambda=0{,}1,\quad E(T)=\frac1\lambda=10`, [["0,1", "Érkezési ráta percenként."], ["10 perc", "Átlagos várakozási idő."]], "exp-setup"),
      s("Több mint 5 perc várakozás", "P(T > 5) = e^(-0,1 · 5) = e^(-0,5) ≈ 60,65%.", "Exponenciális eloszlásnál a túlélési esély képlete e^(-λt) – ez mutatja, mekkora eséllyel kell t-nél többet várni.", String.raw`P(T>5)=e^{-0{,}1\cdot5}=e^{-0{,}5}\approx0{,}60653`, [["-0,5", "-λ · t szorzata."], ["60,65%", "5 percnél hosszabb várakozás esélye."]], "exp-tail"),
      s("Folytonos örökifjúság", "P(T > 15 | T > 10) = P(T > 5) = e^(-0,5) ≈ 60,65%.", "Ha már vártál 10 percet a buszra, annak az esélye, hogy még további 5 percet kell várnod, pont ugyanannyi, mintha most érkeztél volna a megállóba.", String.raw`P(T>15\mid T>10)=P(T>5)=e^{-0{,}5}\approx0{,}60653`, [["15 - 10 = 5", "A feltételként megadott 10 perc kiesik, csak a plusz 5 perc számít."]], "exp-memory"),
    ],
  },
  poisson: {
    goal: "Poisson-eloszlás: óránként átlag 2 esemény történik. Megnézzük 3 óra alatti k=4 és k≥1 esélyét.",
    notation: [
      ["r = 2", "Óránkénti eseményráta.", "Átlag 2 kár óránként."],
      ["t = 3", "Időablak hossza (3 óra).", "A vizsgált időtartam."],
      ["λ = r·t = 6", "Az adott időablakra jutó várható darabszám.", "A 3 órás Poisson paramétere."],
      ["k", "Keresett eseményszám.", "k=4, illetve k≥1."]
    ],
    steps: [
      s("Időablakhoz illesztés: λ = 2 · 3 = 6", "Óránként átlag 2 esemény történik, így 3 óra alatt az átlag λ = 2 · 3 = 6 lesz.", "Mindig az adott időtartamhoz igazítsd a paramétert: 3 órára 3-szor akkora átlag tartozik.", String.raw`\lambda=rt=2\cdot3=6,\qquad X\sim\operatorname{Poi}(6)`, [["2", "Óránkénti átlag."], ["3", "Órák száma."], ["6", "A 3 órás időablak λ paramétere."]], "window"),
      s("Pontosan 4 esemény képlete", "A Poisson-képletbe k=4-et és λ=6-ot helyettesítünk: e^(-6) · 6⁴ / 4! = e^(-6) · 1296 / 24.", "A Poisson-képlet: e^(-λ) · λ^k / k! – közvetlenül megadja pontosan k darab esemény valószínűségét.", String.raw`P(X=4)=e^{-6}\frac{6^4}{4!}=e^{-6}\frac{1296}{24}`, [["6", "A λ paraméter."], ["4", "Keresett eseményszám."], ["1296; 24", "6⁴ és 4! értékei."]], "exact"),
      s("A pontosan 4 esemény kiszámolása", "1296 / 24 = 54, és 54 · e^(-6) ≈ 54 · 0,002479 ≈ 13,39%.", "A törtet egyszerűsítjük 54-re, majd megszorozzuk az e^(-6) konstanssal.", String.raw`P(X=4)=54e^{-6}\approx0{,}13385`, [["54", "1296 / 24."], ["13,39%", "Pontosan 4 esemény esélye 3 óra alatt."]], "evaluate"),
      s("Legalább 1 esemény: 1 - P(0)", "P(X ≥ 1) = 1 - P(X=0) = 1 - e^(-6) · 6⁰ / 0! = 1 - e^(-6) ≈ 99,75%.", "Mivel 6⁰ = 1 és 0! = 1, a 0 esemény esélye egyszerűen e^(-6). Ezt levonva az 1-ből megkapjuk a legalább 1 eseményt.", String.raw`P(X\ge1)=1-e^{-6}\approx0{,}99752`, [["e^(-6)", "A 0 esemény esélye (kb. 0,25%)."], ["99,75%", "Legalább 1 esemény esélye."]], "result"),
    ],
  },
  uniform: {
    goal: "Folytonos eloszlásnál a teljes terület = 1. Ebből meghatározzuk c-t, a sáv esélyét, az átlagot és a szórást.",
    notation: [
      ["f(x) = cx", "Sűrűségfüggvény 0 és 2 között.", "A görbe magassága az x helyen."],
      ["c", "Ismeretlen szorzó.", "Úgy választjuk, hogy az összterület 1 legyen."],
      ["∫", "Integrálás = görbe alatti terület.", "Folytonos esetben ez felel meg az összeadásnak."],
      ["E(X), D²(X)", "Várható érték és szórásnégyzet.", "Súlyozott átlag és ingadozás."]
    ],
    steps: [
      s("A tartomány és a növekvő sűrűség", "X értéke 0 és 2 közé eshet, f(x) = cx egyenesen nő. c-t még meg kell határoznunk.", "Itt nem egyenletes az eloszlás: a nagyobb számok felé haladva egyre nagyobb az előfordulás sűrűsége.", String.raw`f(x)=cx\quad(0<x<2),\qquad f(x)=0\quad\text{máshol}`, [["0 és 2", "A tartomány határai."]], "setup"),
      s("Normálás: a teljes terület legyen 1", "∫₀² cx dx = c · [x²/2]₀² = c · 2 = 2c = 1, ebből c = 1/2.", "Bármilyen sűrűségfüggvény alatti teljes területnek 1-nek (100%-nak) kell lennie.", String.raw`1=\int_0^2cx\,dx=c\left[\frac{x^2}{2}\right]_0^2=2c\quad\Rightarrow\quad c=\frac12`, [["1", "A teljes esély területe."], ["x²/2", "Az x primitív függvénye."], ["1/2", "A kiszámolt c konstans."]], "normalize"),
      s("Az 1 és 2 közötti rész valószínűsége", "f(x) = x/2. P(1 < X < 2) = ∫₁² (x/2) dx = [x²/4]₁² = 4/4 - 1/4 = 3/4 = 75%.", "Egy intervallum esélye a sűrűségfüggvény adott határok közötti területe.", String.raw`P(1<X<2)=\int_1^2\frac{x}{2}\,dx=\left[\frac{x^2}{4}\right]_1^2=1-\frac14=\frac34`, [["1 és 2", "A kérdezett intervallum határai."], ["3/4 = 75%", "A sáv alatti terület, azaz az esély."]], "probability"),
      s("Várható érték: x-szel súlyozott integrál", "E(X) = ∫₀² x · (x/2) dx = ∫₀² (x²/2) dx = [x³/6]₀² = 8/6 = 4/3 ≈ 1,33.", "Ugyanaz a súlyozott átlag, mint diszkrét esetben: az értéket szorozzuk a sűrűségével, és integrálunk.", String.raw`E(X)=\int_0^2x\frac{x}{2}\,dx=\left[\frac{x^3}{6}\right]_0^2=\frac86=\frac43`, [["x² / 2", "Érték × sűrűség."], ["8/6 = 4/3", "A várható érték (nagyobb 1-nél, mert jobbra sűrűbb)."]], "mean"),
      s("Második momentum: x²-tel súlyozott integrál", "E(X²) = ∫₀² x² · (x/2) dx = [x⁴/8]₀² = 16/8 = 2.", "A szórásnégyzethez szükség van az értékek négyzeteinek átlagára is.", String.raw`E(X^2)=\int_0^2\frac{x^3}{2}\,dx=\left[\frac{x^4}{8}\right]_0^2=\frac{16}{8}=2`, [["16/8 = 2", "E(X²), az értékek négyzeteinek átlaga."]], "second"),
      s("Szórásnégyzet: Steiner-formula", "D²(X) = E(X²) - [E(X)]² = 2 - (4/3)² = 18/9 - 16/9 = 2/9.", "A négyzetek átlagából (2) kivonjuk az átlag négyzetét (16/9) – pontosan mint diszkrét esetben.", String.raw`D^2(X)=2-\left(\frac43\right)^2=\frac{18-16}{9}=\frac29`, [["2/9", "A szórásnégyzet."]], "result"),
    ],
  },
  normal: {
    goal: "Normális eloszlásnál az adatokat standardizáljuk (átváltjuk „hány szórásnyira van” egységre), majd a Φ-táblázatból kivonjuk a két értéket.",
    notation: [
      ["X ~ N(μ, σ²)", "Normális eloszlás haranggörbével.", "μ az átlag, σ a szórás."],
      ["μ = 100, σ = 15", "Középérték és szórás.", "Standardizáláskor 15-tel osztunk."],
      ["Z = (X - μ) / σ", "Standardizált változó.", "Átlaga 0, szórása 1."],
      ["Φ(z)", "Standard normális táblázat értéke.", "A z-től balra eső teljes terület."]
    ],
    steps: [
      s("Adatok felírása", "Átlag μ = 100, szórás σ = 15. A 85 és 130 közötti sávot, valamint a 130 feletti részt keressük.", "A haranggörbe 100 körül szimmetrikus, a szórás pedig a harang szélességét adja.", String.raw`\mu=100,\quad\sigma=15,\quad a=85,\quad b=130`, [["100", "Középérték."], ["15", "Szórás."], ["85 és 130", "Keresett határok."]], "setup"),
      s("Alsó határ standardizálása: 85", "Za = (85 - 100) / 15 = -15 / 15 = -1 (pontosan 1 szórással az átlag alatt).", "Kivonjuk az átlagot és osztunk a szórással: így megtudjuk, hány szórásnyira van a határ a közepétől.", String.raw`z_a=\frac{85-100}{15}=-1`, [["-15", "Eltérés a 100-tól."], ["-1", "A standardizált Z érték."]], "lower"),
      s("Felső határ standardizálása: 130", "Zb = (130 - 100) / 15 = 30 / 15 = 2 (pontosan 2 szórással az átlag felett).", "A [85, 130] sáv ugyanaz az esemény standard egységben, mint a [-1, 2] sáv.", String.raw`z_b=\frac{130-100}{15}=2,\qquad P(85\le X\le130)=P(-1\le Z\le2)`, [["30", "Eltérés a 100-tól."], ["2", "A standardizált Z érték."]], "upper"),
      s("A sáv felírása Φ-vel", "P(-1 ≤ Z ≤ 2) = Φ(2) - Φ(-1). Negatív érték trükkje: Φ(-1) = 1 - Φ(1).", "A felső határig tartó területből levonjuk az alsó határ előttit. Negatív szám nincs a táblázatban, de a szimmetria miatt Φ(-z) = 1 - Φ(z).", String.raw`P(-1\le Z\le2)=\Phi(2)-\Phi(-1)=\Phi(2)-[1-\Phi(1)]`, [["Φ(2)", "A 2-ig tartó teljes terület."], ["Φ(-1)", "A -1 előtti levonandó rész."]], "subtract"),
      s("Értékek behelyettesítése a táblázatból", "Φ(2) ≈ 0,97725 és Φ(1) ≈ 0,84134. Eredmény: 0,97725 - (1 - 0,84134) = 0,97725 - 0,15866 = 81,86%.", "Egyszerű kivonás a táblázatból leolvasott számokkal.", String.raw`0{,}97725-0{,}15866=0{,}81859\approx81{,}86\%`, [["0,97725", "Φ(2)."], ["0,15866", "Φ(-1) = 1 - 0,84134."], ["81,86%", "A sáv valószínűsége."]], "interval"),
      s("130 feletti érték: a jobb oldali farok", "P(X > 130) = 1 - Φ(2) = 1 - 0,97725 = 0,02275 ≈ 2,28%.", "A 130 feletti rész a 130-ig tartó rész ellentéte: az 1-ből kivonjuk a Φ(2) területet.", String.raw`P(X>130)=1-\Phi(2)\approx1-0{,}97725=0{,}02275`, [["1", "A teljes görbe alatti terület."], ["2,28%", "A 130 feletti jobb oldali farok esélye."]], "result"),
    ],
  },
  approximation: {
    goal: "Binomiális közelítése: ritka eseménynél Poissonnal, sok próbánál Normálissal (folytonossági korrekcióval) számolunk.",
    notation: [
      ["A rész: X ~ Bin(100; 0,02)", "100 próba, kicsi esély (2%).", "Poisson-közelítés: λ = np."],
      ["B rész: Y ~ Bin(100; 0,5)", "100 próba, 50% esély.", "Normális közelítés: μ = np, σ² = np(1-p)."],
      ["Folytonossági korrekció", "±0,5 egységgel szélesítjük a diszkrét határt.", "Hogy a diszkrét oszlopok teljes szélességét lefedjük."]
    ],
    steps: [
      s("A két eset szétválasztása", "A) n = 100, p = 0,02 (ritka esemény, k=3 siker kell). B) n = 100, p = 0,5 (pénzfeldobás jelleg, 45 és 55 közötti siker kell).", "Ha p kicsi, a Poisson a kényelmes; ha n és a sikerek száma is nagy, a Normális eloszlás a jó választás.", String.raw`X\sim\operatorname{Bin}(100;0{,}02),\qquad Y\sim\operatorname{Bin}(100;0{,}5)`, [["100", "Próbák száma mindkét feladatban."], ["0,02 és 0,5", "A két eltérő sikeresély."]], "setup"),
      s("A: Poisson paraméter λ = n · p", "A várható sikerszám λ = 100 · 0,02 = 2. A közelítő eloszlás Poi(2).", "A Poisson paraméterét a binomiális átlagára (n·p) állítjuk be.", String.raw`\lambda=np=100\cdot0{,}02=2`, [["2", "Az átlagos sikerszám (a Poisson λ paramétere)."]], "poisson"),
      s("A: P(X=3) Poisson-képlettel", "P(X=3) ≈ e^(-2) · 2³ / 3! = e^(-2) · 8/6 = (4/3) · e^(-2) ≈ 18,05%.", "Pontos binomiálissal sokkal nehezebb lenne számolni, a Poisson-közelítés pedig tizedszázalékra pontos.", String.raw`P(X=3)\approx e^{-2}\frac{2^3}{3!}\approx0{,}18045`, [["18,05%", "A Poissonnal kapott közelítő valószínűség."]], "poisson-result"),
      s("B: Normális paraméterek (átlag és szórás)", "Átlag: μ = 100 · 0,5 = 50. Szórásnégyzet: σ² = 100 · 0,5 · 0,5 = 25, így a szórás σ = 5.", "A normális haranggörbét az elméleti átlagra (50) és szórásra (5) illesztjük rá.", String.raw`\mu=50,\qquad\sigma^2=25,\qquad\sigma=5`, [["50", "Átlagos sikerszám."], ["5", "A sikerszám szórása."]], "normal"),
      s("B: Folytonossági korrekció (±0,5)", "Az egész számok oszlopainak szélessége 1, így a [45, 55] sáv folytonos határai: 44,5 és 55,5.", "A 45-ös oszlop 44,5-nél kezdődik, az 55-ös oszlop 55,5-nél ér véget – ha nem tennéd hozzá a fél egységet, fél oszlopok maradnának ki.", String.raw`P(45\le Y\le55)\approx P(44{,}5\le N\le55{,}5)`, [["44,5 = 45 - 0,5", "Korrigált alsó határ."], ["55,5 = 55 + 0,5", "Korrigált felső határ."]], "correction"),
      s("B: Standardizálás szórásnyi egységbe", "Za = (44,5 - 50) / 5 = -5,5 / 5 = -1,1. Zb = (55,5 - 50) / 5 = 1,1.", "Mindkét korrigált határból kivonjuk az 50-es átlagot, és osztunk az 5-ös szórással.", String.raw`z_a=-1{,}1,\qquad z_b=1{,}1`, [["-1,1 és 1,1", "A szimmetrikus standardizált határok."]], "standardize"),
      s("B: Valószínűség a táblázatból", "P ≈ Φ(1,1) - Φ(-1,1) = 2·Φ(1,1) - 1 ≈ 2 · 0,86433 - 1 ≈ 72,87%.", "A szimmetria miatt a [-1,1; 1,1] sáv területe 2·Φ(1,1) - 1.", String.raw`P(45\le Y\le55)\approx2\Phi(1{,}1)-1\approx0{,}72866`, [["0,86433", "Φ(1,1) értéke a táblázatból."], ["72,87%", "A B feladat végeredménye."]], "result"),
    ],
  },
  joint: {
    goal: "Kétváltozós diszkrét eloszlás: a táblázat cellái együttes esélyek. Kiszámoljuk a sor/oszlop összegeket, a feltételes esélyt és a függetlenséget.",
    notation: [
      ["p_ij", "P(X=i ÉS Y=j) közös valószínűség.", "A táblázat egyetlen cellája."],
      ["pX, pY", "Peremeloszlások.", "A sorok és oszlopok összegei."],
      ["P(Y=1 | X=1)", "Feltételes esély.", "Csak az X=1 sort tekintjük az új egésznek."],
      ["Függetlenség", "p_ij = pX(i) · pY(j) minden cellára.", "Ha egyetlen cellára sem igaz a szorzat, már nem függetlenek."]
    ],
    steps: [
      s("A négy cella értékei", "A táblázat cellái: p00 = 0,1, p01 = 0,2, p10 = 0,3, p11 = 0,4. Összegük 0,1 + 0,2 + 0,3 + 0,4 = 1.", "A sor az X értékét (0 vagy 1), az oszlop az Y értékét (0 vagy 1) jelöli.", String.raw`p_{00}=0{,}1,\ p_{01}=0{,}2,\ p_{10}=0{,}3,\ p_{11}=0{,}4`, [["0,1; 0,2; 0,3; 0,4", "A megadott együttes valószínűségek."]], "setup"),
      s("X peremeloszlása: sorösszegek", "P(X=0) = 0,1 + 0,2 = 0,3. P(X=1) = 0,3 + 0,4 = 0,7.", "Ha csak X-re vagyunk kíváncsiak, összeadjuk a sorban lévő cellákat Y összes lehetséges értékére.", String.raw`P(X=0)=0{,}3,\qquad P(X=1)=0{,}7`, [["0,3", "X=0 esélye (felső sor összege)."], ["0,7", "X=1 esélye (alsó sor összege)."]], "rows"),
      s("Y peremeloszlása: oszlopösszegek", "P(Y=0) = 0,1 + 0,3 = 0,4. P(Y=1) = 0,2 + 0,4 = 0,6.", "Ugyanígy oszloponként összegezve megkapjuk Y saját valószínűségeit.", String.raw`P(Y=0)=0{,}4,\qquad P(Y=1)=0{,}6`, [["0,4", "Y=0 esélye (bal oszlop)."], ["0,6", "Y=1 esélye (jobb oszlop)."]], "columns"),
      s("Feltételes esély: P(Y=1 | X=1)", "Mivel tudjuk, hogy X=1, csak az alsó sor számít (összsúlya 0,7). Ebből Y=1 a 0,4-es cella: 0,4 / 0,7 = 4/7 ≈ 57,14%.", "A feltétel lesz az új nevező (0,7), és ezen belül nézzük a keresett eseményt (0,4).", String.raw`P(Y=1\mid X=1)=\frac{0{,}4}{0{,}7}=\frac47\approx0{,}57143`, [["0,4", "X=1 és Y=1 közös cella."], ["0,7", "A feltételként adott X=1 sor összege."], ["4/7 ≈ 57,14%", "A feltételes esély."]], "condition"),
      s("Függetlenség cáfolata: szorzat-ellenőrzés", "Ha függetlenek lennének, p00 = P(X=0)·P(Y=0) = 0,3 · 0,4 = 0,12 lenne. De a táblázatban 0,1 van: nem egyezik, tehát FÜGGŐK!", "A függetlenséghez minden cellának a peremek szorzatának kell lennie. Egyetlen eltérő cella már megcáfolja.", String.raw`P(X=0)P(Y=0)=0{,}3\cdot0{,}4=0{,}12\ne0{,}1=p_{00}`, [["0,12", "Függetlenség esetén elvárt szorzat."], ["0,1", "A tényleges cellaérték."], ["Nem függetlenek", "X és Y függnek egymástól."]], "result"),
    ],
  },
  covariance: {
    goal: "Bebizonyítjuk, hogy a korreláció nulla lehet akkor is, ha a két változó szorosan összefügg (Y = X²). A korreláció csak az egyenes kapcsolatot méri!",
    notation: [
      ["X ~ U(-1, 1)", "Egyenletes eloszlás -1 és 1 között.", "Sűrűsége 1 / [1 - (-1)] = 1/2."],
      ["Y = X²", "Y mindig X négyzete.", "Determinisztikus összefüggés."],
      ["cov(X, Y)", "E(XY) - E(X)E(Y) kovariancia.", "A lineáris együttmozgás mérőszáma."],
      ["ρ", "Korrelációs együttható.", "Egységmentesített kovariancia."]
    ],
    steps: [
      s("A modell felírása: Y = X²", "X egyenletes a [-1, 1] szakaszon (sűrűsége 1/2), Y pedig mindig X négyzete (parabola).", "Ha ismerjük X-et, Y-t 100% biztonsággal tudjuk, tehát szoros függés van köztük.", String.raw`Y=X^2,\qquad f_X(x)=\frac12\quad(-1<x<1)`, [["-1 és 1", "X határai."], ["1/2", "Az egyenletes sűrűség."]], "setup"),
      s("X várható értéke nulla", "A [-1, 1] tartomány 0-ra szimmetrikus, így az átlag E(X) = 0.", "Minden pozitív értéknek pontosan ugyanakkora eséllyel van egy negatív párja, ami kioltja az átlagban.", String.raw`E(X)=\left[\frac{x^2}{4}\right]_{-1}^1=\frac14-\frac14=0`, [["0", "X várható értéke."]], "mean"),
      s("Y várható értéke: 1/3", "E(Y) = E(X²) = (1/2) · [x³/3]₋₁¹ = [x³/6]₋₁¹ = 1/6 - (-1/6) = 2/6 = 1/3.", "A négyzetek mindig pozitívak, így nem oltják ki egymást: az átlag 1/3 lesz.", String.raw`E(Y)=E(X^2)=\left[\frac{x^3}{6}\right]_{-1}^1=\frac13`, [["1/3", "Y várható értéke (X második momentuma)."]], "square"),
      s("A szorzat várható értéke: E(XY) = 0", "XY = X · X² = X³. Mivel x³ páratlan függvény, szimmetrikus határok között az integrálja E(XY) = 0.", "A pozitív és negatív oldal itt is pontosan kioltja egymást.", String.raw`E(XY)=E(X^3)=\left[\frac{x^4}{8}\right]_{-1}^1=\frac18-\frac18=0`, [["0", "A szorzat várható értéke."]], "product"),
      s("Kovariancia és korreláció: mindkettő nulla", "cov(X,Y) = E(XY) - E(X)E(Y) = 0 - 0 · (1/3) = 0, ebből a korreláció ρ = 0.", "Mivel a kovariancia számlálója nulla, a korrelációs együttható is pontosan nulla.", String.raw`\operatorname{cov}(X,Y)=0-0\cdot\frac13=0,\qquad \rho=0`, [["0", "Kovariancia és korreláció."]], "zero"),
      s("A lényeg: korrelálatlan, mégsem független!", "cov = 0 és ρ = 0, de Y = X² miatt egyáltalán NEM függetlenek! A korreláció csak az EGYENES vonalú kapcsolatot méri, az U-alakút nem veszi észre.", "Ez az egyik legfontosabb ZH-csapda: a nulla korreláció nem jelenti azt, hogy a változók függetlenek!", String.raw`\rho=0,\quad\text{de}\quad Y=X^2\ \text{(erősen függők)}`, [["ρ = 0", "Nincs lineáris kapcsolat."], ["Y = X²", "De teljes a függvénykapcsolat."]], "result"),
    ],
  },
  regression: {
    goal: "A megfigyelt pontokhoz ((1,2), (2,3), (3,5)) olyan egyenest illesztünk, aminél a függőleges eltérések négyzetösszege a legkisebb.",
    notation: [
      ["(xi, yi)", "A három megfigyelt pont.", "(1,2), (2,3), (3,5)."],
      ["x̄, ȳ", "A koordináták átlagai.", "x̄ = 2, ȳ = 10/3."],
      ["ŷ = α + βx", "Illesztett egyenes egyenlete.", "β a meredekség, α a tengelymetszet."],
      ["S", "Hibanégyzet-összeg.", "Ezt minimalizáljuk."]
    ],
    steps: [
      s("A pontok felírása", "Három pontunk van: (1,2), (2,3), (3,5). Az ŷ = α + βx egyenest keressük.", "Az adatokból becsüljük meg a leginkább illeszkedő egyenes meredekségét és magasságát.", String.raw`(x_1,y_1)=(1,2),\quad(x_2,y_2)=(2,3),\quad(x_3,y_3)=(3,5)`, [["(1,2), (2,3), (3,5)", "A három mintaadat."]], "setup"),
      s("x és y átlaga", "x̄ = (1+2+3)/3 = 6/3 = 2. ȳ = (2+3+5)/3 = 10/3.", "Az illesztett egyenes mindig kötelezően átmegy a pontok (x̄, ȳ) súlypontján.", String.raw`\bar x=2,\qquad\bar y=\frac{10}{3}`, [["2", "Az x értékek átlaga."], ["10/3", "Az y értékek átlaga."]], "means"),
      s("Négyzetek és szorzatok átlaga", "x²-ek átlaga: (1 + 4 + 9)/3 = 14/3. xy szorzatok átlaga: (1·2 + 2·3 + 3·5)/3 = (2 + 6 + 15)/3 = 23/3.", "Ezek kellenek a meredekség képletéhez.", String.raw`\overline{x^2}=\frac{14}{3},\qquad\overline{xy}=\frac{23}{3}`, [["14/3", "x négyzeteinek átlaga."], ["23/3", "xy szorzatok átlaga."]], "products"),
      s("A meredekség: β = 1,5", "β = (xy_átlag - x̄·ȳ) / (x²_átlag - x̄²) = (23/3 - 2·10/3) / (14/3 - 2²) = (1) / (2/3) = 3/2 = 1,5.", "A számláló a közös kovariancia, a nevező az x szórásnégyzete. Ez adja meg, mennyit nő y egy egységnyi x-növekedésre.", String.raw`\hat\beta=\frac{23/3-20/3}{14/3-12/3}=\frac{1}{2/3}=\frac32=1{,}5`, [["1", "Számláló."], ["2/3", "Nevező."], ["3/2 = 1,5", "A meredekség."]], "slope"),
      s("Tengelymetszet: α = 1/3", "α = ȳ - β·x̄ = 10/3 - (3/2)·2 = 10/3 - 3 = 1/3. Az egyenes: ŷ = 1/3 + 1,5x.", "Mivel az egyenes átmegy az átlagponton, a meredekség ismeretében a tengelymetszet közvetlenül adódik.", String.raw`\hat\alpha=\frac{10}{3}-\frac32\cdot2=\frac13,\qquad\hat y=\frac13+\frac32x`, [["1/3", "Tengelymetszet."], ["ŷ = 1/3 + 1,5x", "A kész regressziós egyenes."]], "line"),
      s("Illeszkedési hibák (reziduálisok)", "A pontok y értékeiből kivonjuk az egyenes által jósoltakat: 2 - 11/6 = 1/6; 3 - 10/3 = -1/3; 5 - 29/6 = 1/6.", "A függőleges távolságokat mérjük a pontok és az egyenes között.", String.raw`(y_i-\hat y_i)=\left(\frac16,-\frac13,\frac16\right)`, [["1/6; -1/3; 1/6", "A három pont függőleges eltérése az egyenestől."]], "residuals"),
      s("A hibanégyzet-összeg: S = 1/6", "S = (1/6)² + (-1/3)² + (1/6)² = 1/36 + 4/36 + 1/36 = 6/36 = 1/6.", "A hibákat négyzetre emeljük, hogy a pozitív és negatív eltérések ne oltsák ki egymást. Ez a hiba ennél az egyenesnél a legkisebb.", String.raw`S=\frac1{36}+\frac4{36}+\frac1{36}=\frac6{36}=\frac16`, [["1/6", "A minimális hibanégyzet-összeg."]], "result"),
    ],
  },
  test: {
    goal: "Hipotézisvizsgálat: a 104-es mintaátlag elég messze van-e a feltételezett 100-tól ahhoz, hogy 5%-os hibaszinten elvessük a feltevést?",
    notation: [
      ["H0: μ = 100", "Nullhipotézis (kiinduló feltevés).", "Ezt teszteljük."],
      ["H1: μ ≠ 100", "Ellenhipotézis (kétoldali).", "Bármelyik irányú eltérés érdekel minket."],
      ["n = 25, x̄ = 104", "Mintaelemszám és mért átlag.", "A megfigyelt adatok."],
      ["σ = 10", "Ismert sokasági szórás.", "u-próbát alkalmazunk."],
      ["SE = σ / √n", "Standard hiba (az átlag szórása).", "25 adat átlaga sokkal kevésbé ingadozik, mint 1 adat."]
    ],
    steps: [
      s("Feltevések és adatok rögzítése", "H0: μ = 100, H1: μ ≠ 100. A 25 elemű minta átlaga 104, a szórás 10, a hibaszint α = 0,05 (5%).", "Kétoldali próbát végzünk, mert a kérdés az, hogy eltér-e a 100-tól (akár felfelé, akár lefelé).", String.raw`H_0:\mu=100,\quad H_1:\mu\ne100,\quad\bar x=104,\quad\sigma=10,\quad\alpha=0{,}05`, [["100", "Feltételezett átlag."], ["104", "Mért mintaátlag."], ["0,05", "5%-os szignifikanciaszint."]], "setup"),
      s("Az átlag szórása (standard hiba): SE = 2", "Egy adat szórása 10, de 25 adat átlagának szórása SE = σ / √n = 10 / √25 = 10 / 5 = 2.", "Több adat átlaga sokkal stabilabb, mint egyetlen mérés: az ingadozás a gyök(n)-szeresére csökken.", String.raw`\operatorname{SE}(\bar X)=\frac{\sigma}{\sqrt n}=\frac{10}{\sqrt{25}}=\frac{10}{5}=2`, [["10", "Egyedi szórás."], ["√25 = 5", "Mintaelemszám gyöke."], ["2", "A mintaátlag standard hibája."]], "se"),
      s("u-próbastatisztika kiszámolása: u = 2", "u = (mintaátlag - feltevés) / standard hiba = (104 - 100) / 2 = 4 / 2 = 2.", "A 4 pontos eltérést átszámoljuk: ez pontosan 2 standard hibányi távolság.", String.raw`u=\frac{\bar x-\mu_0}{\operatorname{SE}}=\frac{104-100}{2}=2`, [["4", "A mért és feltételezett átlag különbsége."], ["2", "Standard hiba."], ["u = 2", "A próbastatisztika értéke."]], "statistic"),
      s("A kritikus határ: 1,96", "5%-os kétoldali próbánál mindkét szélre 2,5% jut. A táblázat szerint Φ(1,96) ≈ 0,975, így a határ ±1,96.", "Ha u a [-1,96; 1,96] sávba esik, a különbség még a normális véletlen ingadozás része. Ha kívül esik, már nem.", String.raw`1-\frac\alpha2=0{,}975,\qquad u_{\rm kritikus}=1{,}96`, [["±1,96", "A standard normális eloszlás 5%-os kritikus értékei."]], "critical"),
      s("Döntés: H0-t elutasítjuk!", "Mivel |u| = 2 > 1,96, a statisztika a kritikus tartományba esik. Döntés: H0-t 5%-os szinten elutasítjuk!", "A 104-es mintaátlag már túl messze van a 100-tól ahhoz, hogy pusztán a véletlen műve legyen.", String.raw`|u|=2>1{,}96\quad\Rightarrow\quad\text{H}_0\text{-t elutasítjuk}`, [["2 > 1,96", "A tesztstatisztika meghaladja a kritikus határt."], ["Elutasítjuk", "A valódi átlag szignifikánsan eltér 100-tól."]], "decision"),
      s("Mi lenne, ha a szórás ismeretlen lenne?", "Ha a 10 nem ismert sokasági szórás, hanem mintaszórás (s* = 10) lenne, akkor t-próbát használnánk 24 szabadságfokkal. A t-határ 2,064. Mivel 2 < 2,064, ott NEM utasítanánk el H0-t!", "A mintából becsült szórás plusz bizonytalanságot hoz be, ezért a t-próba szigorúbb (nagyobb határértéket kér az elutasításhoz).", String.raw`t=2<t_{24;0{,}975}\approx2{,}064\quad\Rightarrow\quad\text{nem utasítjuk el}`, [["24 = 25 - 1", "Szabadságfok."], ["2,064", "A t-táblázat kritikus határa."], ["Nem utasítjuk el", "t-próba esetén nem lenne elegendő a bizonyíték."]], "result"),
    ],
  },
};
