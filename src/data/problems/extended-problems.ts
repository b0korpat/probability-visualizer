import { ProblemDefinition, StepExplanation } from "@/types/visualizer";

const s = (stepIndex: number, title: string, description: string, latex: string, keyTakeaway: string, annotation: string): StepExplanation => ({
  stepIndex, title, description, latex, keyTakeaway,
  visualState: { drawerItems: [], pulledItems: [], annotation }
});

export const extendedProblems: ProblemDefinition[] = [
  {
    id: "korom porkolt", title: "A KÖRÖMPÖRKÖLT betűkártyái", category: "combinatorics", visualizer: "word",
    statement: "A KÖRÖMPÖRKÖLT szó 12 betűjét kártyákra írjuk, összekeverjük, majd egy sorba rakjuk. A többször előforduló betűk azonosnak számítanak.", totalSteps: 6,
    steps: [
      s(0, "A betűkészlet megszámolása", "Először rögzítsük, miből dolgozunk: Ö négyszer, K kétszer, R kétszer, M, P, L és T egyszer szerepel. A 12 kártya tehát nem mind különböző.", String.raw`12\text{ betű: }\; Ö^4,K^2,R^2,M,P,L,T`, "A fő veszély: a többszörös betűket nem szabad újra és újra megkülönböztetni.", "12 betűkártya — ismétlődő betűkkel"),
      s(1, "a) Az összes különböző sorozat", "Ha minden kártya különbözne, 12! sorrend lenne. Az azonos Ö-k, K-k és R-ek felcserélése viszont nem hoz létre új látható szót, ezért osztunk 4!·2!·2!-vel.", String.raw`N=\frac{12!}{4!\,2!\,2!}=4\,989\,600`, "Ennyi különböző 12 betűs sorozat lehetséges.", "a) teljes eseménytér"),
      s(2, "a) Pontosan az eredeti szó", "A kedvező esetek között csak egyetlen látható sorrend adja vissza pontosan a KÖRÖMPÖRKÖLT szót.", String.raw`P=\frac{1}{N}=\frac{1}{4\,989\,600}\approx0{,}0000200\%`, "Egyetlen cél-sorrendet keresünk az összes lehetséges közül.", "1 cél-sorrend a 4 989 600-ból"),
      s(3, "b) A PÖRKÖLT blokk", "A PÖRKÖLT betűit egyetlen összefüggő blokknak tekintjük. Mellette a megmaradt betűk: Ö, Ö, K, R, M — tehát 6 objektumot rendezünk. A két Ö teljesen azonos: ha felcseréljük őket, nem kapunk új látható sorrendet, ezért a 6! sorrendet 2!-vel osztani kell.", String.raw`N_{kedv}=\frac{6!}{2!}=\frac{720}{2}=360`, "A 2! azt jelenti: a két azonos Ö felcserélése ugyanazt a sorrendet adja, ezért ezt a duplázást korrigáljuk.", "PÖRKÖLT = 1 blokk · 2 azonos Ö marad"),
      s(4, "b) Blokk-valószínűség", "A kedvező blokkos sorozatokat elosztjuk az összes sorozattal.", String.raw`P=\frac{360}{4\,989\,600}=\frac{1}{13\,860}\approx0{,}00722\%`, "A blokk ritka, de sokkal gyakoribb, mint egyetlen előre megadott szó.", "360 kedvező blokkos elrendezés"),
      s(5, "c) Hét betű pontos sorrendben", "A hét húzás egymás után pontosan P–Ö–R–K–Ö–L–T. Minden lépésnél a megfelelő betű maradék darabszámával számolunk.", String.raw`\begin{aligned} P&=\frac1{12}\cdot\frac4{11}\cdot\frac2{10}\cdot\frac2{9}\\ &\quad\cdot\frac3{8}\cdot\frac1{7}\cdot\frac1{6}\\ &=\frac1{83\,160}\approx0{,}00120\% \end{aligned}`, "A sorrend és a visszatevés hiánya együtt határozza meg a szorzatot.", "P → Ö → R → K → Ö → L → T")
    ]
  },
  {
    id: "siblings", title: "Testvérek a sorban", category: "combinatorics", visualizer: "word", statement: "Egy 27 fős osztály véletlenszerűen egy sorba áll. Két tanuló testvérpár.", totalSteps: 4,
    steps: [
      s(0, "Az összes sorbaállás", "27 különböző tanulót 27! módon tudunk sorba rendezni. Ez lesz a nevező mindkét részkérdésnél.", String.raw`N=27!`, "Mindegyik tanuló külön objektum.", "27 tanuló — minden sorrend egyforma esélyű"),
      s(1, "a) A testvérek egymás mellett", "Kezeljük a testvérpárt egyetlen blokk-ként. Így 26 objektumot rendezünk, majd a blokkon belül 2 sorrend lehetséges.", String.raw`\begin{aligned} N_{kedv}&=2\cdot26!\\ P&=\frac{2\cdot26!}{27!}=\frac2{27}\approx7{,}41\% \end{aligned}`, "A blokk-trükk egy lépésben kényszeríti ki a szomszédosságot.", "[testvér 1 | testvér 2]"),
      s(2, "b) Pontosan 10 ember közöttük", "Ha 10 ember áll közöttük, akkor a pozícióik különbsége 11. A 27 helyből 16 kezdőpozíció ad ilyen párt, és a testvérek kétféleképpen cserélhetnek helyet.", String.raw`P=\frac{2\cdot16\cdot25!}{27!}=\frac{16}{351}\approx4{,}56\%`, "A távolságot a pozíciók különbsége, nem a köztes emberek száma adja.", "10 ember közöttük → 11 hely távolság"),
      s(3, "Ellenőrzés: miért 16?", "Az első testvér helye 1-től 16-ig indulhat; a másik mindig 11 hellyel arrébb áll. Ezért pontosan 27−11=16 helypár létezik.", String.raw`27-11=16\text{ pozíciópár}`, "A pozíciópárok számlálásánál a 11 helynyi különbséget kell használni.", "16 lehetséges pozíciópár")
    ]
  },
  {
    id: "round-table", title: "Hófehérke és a törpék", category: "combinatorics", visualizer: "word", statement: "Hét törpe közül Hófehérke véletlenszerűen ötöt ültet egy körasztalhoz. Mi az esélye, hogy Morgó és Kuka nem ül egymás mellé?", totalSteps: 4,
    steps: [
      s(0, "Két feltétel egymás után", "Először mindkettőnek bekerülést, majd a bekerültek körében a nem-szomszédosságot vizsgáljuk.", String.raw`P=P(\text{mindketten bekerülnek})\cdot P(\text{nem szomszédok})`, "A kiválasztást és az ültetést külön bontjuk.", "kiválasztás → körasztal"),
      s(1, "Mindketten bekerülnek", "Morgó és Kuka fixen bekerül, a maradék 3 helyet az öt másik törpe közül választjuk ki.", String.raw`P_1=\frac{\binom53}{\binom75}=\frac{10}{21}`, "A körasztal-sorrend itt még nem számít.", "5 ülőhely a 7 törpéből"),
      s(2, "Nem ülnek egymás mellé", "Öt ember körén, ha Morgó helyét rögzítjük, a másiknak 4 lehetséges helye van, ezek közül 2 szomszédos és 2 nem szomszédos.", String.raw`P_2=\frac24=\frac12`, "Körasztalnál egy embernek két szomszédja van.", "2 nem szomszédos hely a 4-ből"),
      s(3, "Végső valószínűség", "A két függetlenül egymás után vizsgált feltételt összeszorozzuk.", String.raw`P=\frac{10}{21}\cdot\frac12=\frac5{21}\approx23{,}81\%`, "Nagyjából minden negyedik véletlen ültetés felel meg.", "Morgó és Kuka nem szomszédos")
    ]
  },
  {
    id: "birthday", title: "A születésnap-paradoxon", category: "combinatorics", visualizer: "word", statement: "Egy 30 fős osztályban minden születésnap egyenletesen oszlik el a 365 nap között. Mi az esélye legalább egy egyezésnek?", totalSteps: 3,
    steps: [
      s(0, "A komplementert számoljuk", "A legalább két azonos születésnap ellentéte az, hogy mindenki különböző napon született. Ezt könnyebb megszámolni.", String.raw`P(\text{egyezés})=1-P(\text{mindenki különböző})`, "A komplementerben minden új embernek új napot kell kapnia.", "30 ember, 365 lehetséges nap"),
      s(1, "Nincs egyezés", "Az első embernek 365, a másodiknak 364, …, a harmincadiknak 336 szabad napja marad. Az egymást követő feltételek miatt szorzunk.", String.raw`P(\text{különböző})=\frac{365\cdot364\cdots336}{365^{30}}`, "A nevezőben minden embernek 365 lehetősége van.", "a szabad napok száma fokozatosan fogy"),
      s(2, "Legalább egy egyezés", "A kapott komplementert kivonjuk 1-ből.", String.raw`\begin{aligned} P&=1-\frac{365\cdot364\cdots336}{365^{30}}\\ &\approx0{,}7063=70{,}63\% \end{aligned}`, "30 embernél már nagyobb, mint 70% az esély legalább egy egyezésre.", "70,63% — ezért paradoxon")
    ]
  },
  {
    id: "urn", title: "Golyók egy urnában", category: "combinatorics", visualizer: "word", statement: "20 golyó: 9 piros, 6 fehér, 5 zöld. Visszatevés nélkül 4-et választunk.", totalSteps: 4,
    steps: [
      s(0, "Az összes négyes választás", "A húzás sorrendje nem számít, ezért kombinációval számoljuk a 20 golyóból választható négyeseket.", String.raw`|\Omega|=\binom{20}{4}=4\,845`, "A nevező minden részkérdésnél ugyanaz.", "20 golyóból 4-et választunk"),
      s(1, "a) Egyetlen piros sincs", "A kedvező négyes csak a 6 fehér és 5 zöld, összesen 11 nem piros golyóból áll.", String.raw`P=\frac{\binom{11}{4}}{\binom{20}{4}}=\frac{330}{4845}=\frac{22}{323}\approx6{,}81\%`, "A piros golyókat kizárjuk, a maradék 11-ből választunk.", "11 nem piros golyó"),
    s(2, "b) Mindhárom szín szerepel", "Előbb minden számot külön kiszámolunk. A 330, 1001 és 1365 azok az esetek, ahol egy szín hiányzik; a 126, 15 és 5 az egyszínű esetek, amelyeket a levonás kétszer érintett.", String.raw`\begin{aligned} N_{összes}&=\binom{20}{4}=4845\\ N_{piros\ nélkül}&=\binom{6+5}{4}=\binom{11}{4}=330\\ N_{fehér\ nélkül}&=\binom{9+5}{4}=\binom{14}{4}=1001\\ N_{zöld\ nélkül}&=\binom{9+6}{4}=\binom{15}{4}=1365\\ N_{csak\ piros}&=\binom94=126\\ N_{csak\ fehér}&=\binom64=15\\ N_{csak\ zöld}&=\binom54=5\\ N_{mindhárom}&=4845-(330+1001+1365)\\ &\quad +(126+15+5)=2295 \end{aligned}`, "Minden számnak megvan a saját jelentése: előbb a hiányzó színeket, majd az egyszínű korrekciókat számoljuk ki.", "piros + fehér + zöld"),
      s(3, "b) A valószínűség", "A háromszínű kedvező esetek számát elosztjuk az összes négyes választással.", String.raw`P=\frac{2295}{4845}=\frac{153}{323}\approx47{,}37\%`, "Négy golyónál a mindhárom szín megjelenése közel fele-fele esélyű.", "47,37% három szín")
    ]
  },
  {
    id: "factory", title: "Gyári alkatrészhibák", category: "venn", visualizer: "venn", statement: "A gyártott alkatrészek 15%-a anyaghibás (A), 10%-a mérethibás (B), 3%-a mindkettő.", totalSteps: 4,
    steps: [s(0,"A két kör felrajzolása","Az A és B események átfedhetnek; a közös rész már mindkét hibát jelenti.",String.raw`P(A)=0{,}15,\quad P(B)=0{,}10,\quad P(A\cap B)=0{,}03`,"A metszetet csak egyszer szabad beleszámolni.","A: anyaghiba · B: mérethiba"),s(1,"a) Legalább egy hiba","Az unió képlete összeadja a két hibát, majd levonja a közös 3%-ot, mert azt kétszer számoltuk.",String.raw`\begin{aligned} P(A\cup B)&=P(A)+P(B)-P(A\cap B)\\ &=0{,}15+0{,}10-0{,}03=0{,}22 \end{aligned}`,"22% alkatrész legalább egy hibás.","unió = két kör együtt"),s(2,"b) Hibátlan alkatrész","A hibátlan esemény az unió komplementere.",String.raw`P(\overline{A\cup B})=1-0{,}22=0{,}78`,"A gyártás 78%-a egyik hibát sem tartalmazza.","a Venn-diagramon kívül"),s(3,"c) Pontosan egy hiba","Az A-ban, de nem B-ben lévő rész 12%, a B-ben, de nem A-ban lévő rész 7%; ezeket összeadjuk.",String.raw`(15-3)+(10-3)=19\%`,"Pontosan egyfajta hibával 19% rendelkezik.","A csak + B csak")]
  },
  {
    id: "languages", title: "Nyelvismeret az osztályban", category: "venn", visualizer: "venn", statement: "30 tanulóból 18 beszél angolul, 12 németül, 5 pedig mindkét nyelven.", totalSteps: 4,
    steps: [s(0,"A Venn-részek kitöltése","A közös 5 tanulót először mindkét körbe beírjuk, majd kivonjuk a szélső részekből.",String.raw`\begin{aligned} A\cap B&=5\\ A\text{ csak}&=18-5=13\\ B\text{ csak}&=12-5=7 \end{aligned}`,"A halmazok szélső része nem tartalmazza a közös tanulókat.","13 angol · 5 mindkettő · 7 német"),s(1,"a) Legalább egy nyelv","Az unióban 13+5+7 tanuló van.",String.raw`\begin{aligned} P(A\cup B)&=\frac{13+5+7}{30}\\ &=\frac{25}{30}=\frac56 \end{aligned}`,"25 tanuló beszél legalább az egyik nyelven.","25 / 30 tanuló"),s(2,"b) Pontosan egy nyelv","A közös részt kihagyjuk, csak a két szélső részt adjuk össze.",String.raw`P=\frac{13+7}{30}=\frac{20}{30}=\frac23`,"20 tanuló pontosan egy nyelvet beszél.","közös rész nélkül"),s(3,"c) Egyik sem","A 30 fős osztályból levonjuk a legalább egy nyelvet beszélőket.",String.raw`P=1-\frac{25}{30}=\frac5{30}=\frac16`,"5 tanuló egyik felsorolt nyelven sem beszél.","5 / 30 a körökön kívül")]
  },
  {
    id: "hungarian-cards", title: "Kártyás eseményműveletek", category: "venn", visualizer: "venn", statement: "Egy 32 lapos magyar kártyából húzunk. A: hetes, B: piros lap.", totalSteps: 4,
    steps: [s(0,"A halmazok adatainak felírása","Négy hetes van, a piros színekben összesen 16 lap, és ezek között 2 piros hetes található.",String.raw`\begin{aligned} |A|&=4\\ |B|&=16\\ |A\cap B|&=2 \end{aligned}`,"A metszet a piros hetesek két lapja.","32 lap · 4 hetes · 16 piros"),s(1,"a) Piros és hetes","A metszetben pontosan a két piros hetes van.",String.raw`P(A\cap B)=\frac2{32}=\frac1{16}`,"Két lap teljesíti egyszerre a két feltételt.","2 piros hetes"),s(2,"b) Piros vagy hetes","Az unióban minden piros, plusz a nem piros hetesek szerepelnek; a közös két lapot egyszer vonjuk le.",String.raw`\begin{aligned} P(A\cup B)&=\frac{4+16-2}{32}\\ &=\frac{18}{32}=\frac9{16} \end{aligned}`,"18 lap piros vagy hetes.","unió: 18 lap"),s(3,"c) Se piros, se hetes","Ez az unió komplementere.",String.raw`P(\overline A\cap\overline B)=1-\frac9{16}=\frac7{16}`,"14 lap egyik feltételt sem teljesíti.","14 lap a két körön kívül")]
  },
  {
    id: "stick", title: "Pálcatörés", category: "geometric", visualizer: "geometry", statement: "Egy 200 cm-es pálcát egyenletesen választott pontban kettétörünk.", totalSteps: 3,
    steps: [s(0,"A töréspont egy szakaszon mozog","A törés helye x=0 és x=200 cm között egyenletes. A teljes lehetséges hossz ezért 200 cm.",String.raw`x\in[0,200],\quad P=\frac{\text{kedvező hossz}}{200}`,"Geometriai valószínűségnél hosszarányt számolunk.","teljes szakasz: 200 cm"),s(1,"a) Valamelyik darab 120 cm-nél hosszabb","Az első darab akkor hosszú, ha x>120; a második akkor, ha 200-x>120, vagyis x<80. A két szélső szakasz együtt 160 cm.",String.raw`P=\frac{80+80}{200}=\frac45=80\%`,"A középső [80,120] törések az egyetlen nem kedvező esetek.","kedvező: x<80 vagy x>120"),s(2,"b) Mindkét darab 150 cm-nél rövidebb","x<150 és 200-x<150 egyszerre kell. Ez azt jelenti, hogy 50<x<150, egy 100 cm-es középső tartomány.",String.raw`P=\frac{150-50}{200}=\frac12=50\%`,"A két darab csak akkor lehet mindkettő 150 alatt, ha a törés középen van.","kedvező tartomány: 50–150 cm")]
  },
  {
    id: "target", title: "Céltábla és területek", category: "geometric", visualizer: "geometry", statement: "Egy R=10 cm sugarú kör alakú céltáblát mindig eltalálunk; közepén r=5 cm sugarú kör van.", totalSteps: 3,
    steps: [s(0,"A területarány elve","Egyenletes találatnál a valószínűség a kedvező terület és a teljes céltábla területének aránya.",String.raw`P=\frac{T_{kedvező}}{T_{teljes}},\quad T=\pi r^2`,"A π kiesik a területarányból.","nagy kör: R=10 · kis kör: r=5"),s(1,"a) Belső kis kör","A kis kör területe π·5², a teljes köré π·10².",String.raw`P=\frac{\pi\cdot5^2}{\pi\cdot10^2}=\frac14=25\%`,"A sugár felezése negyed akkora területet ad.","belső kör: 25%"),s(2,"b) Külső gyűrű","A gyűrű a teljes céltábla és a kis kör különbsége.",String.raw`P=1-\frac14=\frac34=75\%`,"A találatok háromnegyede a külső sávba esik.","gyűrű: 75%")]
  },
  {
    id: "unit-square", title: "Pont az egységnégyzetben", category: "geometric", visualizer: "geometry", statement: "Az 1×1-es négyzetben egyenletesen választunk pontot. Mi a valószínűsége, hogy valamelyik oldalhoz 1/4-nél közelebb lesz?", totalSteps: 3,
    steps: [s(0,"A komplementer alakja","Könnyebb azt nézni, hogy a pont minden oldaltól legalább 1/4 távol van. Ez a középső négyzet.",String.raw`\begin{aligned} T_{teljes}&=1\\ \text{belső oldal}&=1-2\cdot\frac14=\frac12 \end{aligned}`,"A négy oldalsáv egyetlen középső biztonságos négyzet komplementere.","1×1 négyzet és középső 1/2×1/2"),s(1,"A kedvezőtlen középső terület","A középső négyzet területe (1/2)²=1/4.",String.raw`P(\text{minden oldaltól }\geq1/4)=\frac14`,"A középső négyzet a nem kedvező tartomány.","középső terület: 1/4"),s(2,"Legalább egy oldal közel van","A keresett esemény a komplementer: a négy oldalsáv uniója.",String.raw`P=1-\frac14=\frac34=75\%`,"A pontok háromnegyede valamelyik oldalhoz közelebb van negyed egységnél.","oldalsávok együtt: 75%")]
  },
  {
    id: "cafe", title: "Kávézói találkozás", category: "geometric", visualizer: "geometry", statement: "András és Betti egymástól függetlenül 16:00 és 18:00 között érkezik. András 10, Betti 20 percet vár.", totalSteps: 4,
    steps: [s(0,"Időpontokból négyzet","Jelölje x András, y Betti érkezési idejét percben 16:00 után. Mindkettő 0 és 120 között lehet, ezért a teljes eseménytér 120×120-as négyzet.",String.raw`\begin{aligned} (x,y)&\in[0,120]^2\\ T_{teljes}&=120^2=14\,400 \end{aligned}`,"Két független időpont egy pont a síkon.","x: András · y: Betti"),s(1,"Mikor találkoznak?","Az intervallumok átfednek, ha Betti nem érkezik több mint 10 perccel később, és András nem érkezik több mint 20 perccel később.",String.raw`x-20\le y\le x+10`,"A két átlós egyenes közötti sáv a találkozás tartománya.","találkozási sáv a négyzetben"),s(2,"A nem találkozó háromszögek","A négyzetből két sarokháromszöget kell kivonni: az egyik oldala 110, a másiké 100 perc.",String.raw`\begin{aligned} T_{nem}&=\frac{110^2}{2}+\frac{100^2}{2}\\ &=11\,050 \end{aligned}`,"A két eltérő várakozási idő miatt a két háromszög nem egyforma.","két kizárt sarok"),s(3,"Találkozási valószínűség","A kedvező terület 14 400−11 050=3 350. Ezt osztjuk a teljes négyzettel.",String.raw`\begin{aligned} P&=\frac{3350}{14400}=\frac{67}{288}\\ &\approx23{,}26\% \end{aligned}`,"Körülbelül minden negyedik véletlen érkezési párnál találkoznak.","kedvező terület: 3350")]
  }
];
