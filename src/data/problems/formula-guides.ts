const guides: Record<string, Record<number, string[]>> = {
  "shirt-drawer": {
    0: ["A 12 a fiókban lévő összes póló száma.", "A 3 azt jelenti, hogy egyszerre három pólót választunk ki.", "A kombináció azért kell, mert a húzás sorrendje nem számít.", "A 220 az összes lehetséges hárompólós csoport száma."],
    1: ["Az A esemény: legalább egy fekete pólót húzunk.", "A komplementer azt az esetet jelenti, amikor A nem történik meg.", "Ez itt pontosan 0 fekete, vagyis mindhárom póló fehér.", "Az 1 a biztos esemény valószínűsége: minden húzás vagy A, vagy a komplementere."],
    2: ["A 8 a fehér pólók száma.", "A 3 a kiválasztandó pólók száma.", "A 56 azt számolja meg, hányféle három fehérből álló húzás létezik.", "A fekete pólók ebben a kedvezőtlen esetben nem szerepelhetnek."],
    3: ["A 56 a tisztán fehér húzások száma.", "A 220 az összes lehetséges húzás száma.", "Az 56/220 ezért egy kedvezőtlen húzás aránya.", "A 14/55 ugyanennek az egyszerűsített törtje.", "A 25,45% a tört százalékos alakja."],
    4: ["Az 1 minden lehetséges húzást jelent.", "A 14/55 a komplementer, vagyis a tisztán fehér húzás esélye.", "A 41/55 a megmaradó, legalább egy feketét tartalmazó esetek aránya.", "A 74,55% a végső valószínűség százalékban."]
  },
  "sports-village": {
    0: ["Az A a focizókat jelöli: 0,25=25%.", "A B a kosárlabdázókat jelöli: 0,40=40%.", "A C a pingpongozókat jelöli: 0,45=45%.", "Az A∩B∩C=0,05 a közös, mindhárom sportot űzők aránya.", "A páros metszetek alapadatai: A∩B=0,15, A∩C=0,10, B∩C=0,20."],
    1: ["A 0,25 az A, vagyis a focizók teljes aránya.", "A 0,45 a C, vagyis a pingpongozók teljes aránya.", "A 0,10 az A∩C metszet, amelyet az összeadás kétszer számolna.", "Ezért: 0,25+0,45−0,10=0,60."],
    2: ["A 0,25 a teljes focizó csoport.", "A 0,15 azoké, akik egyszerre fociznak és kosárlabdáznak.", "A kivonás után 0,10 marad: focizik, de nem kosárlabdázik."],
    3: ["A 0,15−0,05=0,10 a csak A+B régió.", "A 0,10−0,05=0,05 a csak A+C régió.", "A 0,20−0,05=0,15 a csak B+C régió.", "A 0,30 ezek összege: 0,10+0,05+0,15."],
    4: ["A 0,25+0,40+0,45 a három teljes kör összege.", "A 0,15, 0,10 és 0,20 a páros metszetek, ezeket levonjuk.", "A 0,05-öt visszaadjuk, mert a hármas metszetet túl sokszor vontuk ki.", "Az unió 0,70, ezért a komplementer 1−0,70=0,30."],
    5: ["A 0,10 a csak A+B páros régió.", "A 0,15 a csak B+C páros régió.", "A 0,25 a kedvező, kosárlabdát is tartalmazó pontosan-két-sportos rész.", "A 0,30 a teljes pontosan-két-sportos csoport, ezért 0,25/0,30=5/6." ]
  },
  "korom porkolt": {
    0: ["A 12 a szó betűinek teljes száma.", "Az Ö négyszer, a K kétszer, az R kétszer szerepel.", "Az M, P, L és T egy-egy példányban vannak jelen."],
    1: ["A 12! azt jelentené, hogy mind a 12 helyre sorba rendezünk egy objektumot.", "A 4! azért kerül a nevezőbe, mert a négy Ö felcserélése nem ad új szót.", "A két K miatt 2!-vel, a két R miatt újabb 2!-vel osztunk.", "A 4 989 600 az azonos betűk miatti korrekció után maradó sorrendek száma."],
    2: ["A számláló 1, mert csak egy konkrét célszót kérünk.", "A nevező az összes különböző betűsorrend száma.", "A százalékos alak azért nagyon kicsi, mert egyetlen sorrendet keresünk milliók közül."],
    3: ["A PÖRKÖLT 7 betűje egyetlen blokk, ezért belül nem rendezzük át.", "A blokk 1 objektumnak számít, ehhez jön az 5 megmaradó betű: Ö, Ö, K, R, M.", "Így összesen 6 objektumot rendezünk, ezért 6! kerül felülre.", "A két megmaradt Ö azonos, felcserélésük ugyanazt a sorrendet adja, ezért osztunk 2!-vel.", "A 2!=2, tehát 6!/2!=720/2=360."],
    4: ["A 360 a PÖRKÖLT blokkot tartalmazó kedvező sorrendek száma.", "A 4 989 600 az összes lehetséges látható sorrend.", "A tört azt mutatja, a kedvező blokkos sorozatok mekkora részt képviselnek."],
    5: ["A nevezők 12, 11, 10, 9, 8, 7, 6 rendre az aktuálisan még elérhető kártyák számai.", "A megfelelő számlálók 1, 4, 2, 2, 3, 1, 1 a kívánt betűből maradó példányok.", "A 7 tényező a hét egymás utáni húzás miatt jelenik meg.", "A 1/83 160 a pontos P–Ö–R–K–Ö–L–T sorrend esélye."]
  },
  "siblings": {
    0: ["A 27 az osztály tanulóinak száma.", "A 27! minden tanuló összes lehetséges sorrendjét jelenti."],
    1: ["A 26! azért jelenik meg, mert a testvérpárt ideiglenesen egyetlen blokknak tekintjük.", "A 2 a blokkon belüli két sorrend: testvér A–B vagy B–A.", "A 2/27 a kedvező és az összes sorbaállás aránya."],
    2: ["A 10 a közöttük álló emberek száma.", "Ezért a testvérek pozíciókülönbsége 10+1=11.", "A 16 a 27 helyen elhelyezhető, 11 távolságú pozíciópárok száma.", "A 2 a testvérek két lehetséges sorrendje."],
    3: ["A 27−11=16 azt számolja, hány kezdőhely után fér még el a másik testvér 11 hellyel arrébb.", "A két testvér sorrendje ettől még külön két lehetőség."]
  },
  "round-table": {
    0: ["A két feltételt egymás után vizsgáljuk: bekerülnek-e, majd nem lesznek-e szomszédok.", "A szorzás azért kell, mert a két lépést egymás után teljesíteni kell."],
    1: ["Az 5 és 7 a kiválasztott törpék, illetve az összes törpe száma.", "A 3 a Morgón és Kukán kívül választandó törpék száma.", "A 10/21 annak esélye, hogy mindketten bekerülnek."],
    2: ["Öt ember körén Morgó helyét rögzítjük.", "A maradék 4 hely közül 2 közvetlenül mellette van.", "A másik 2 hely nem szomszédos, ezért 2/4=1/2."],
    3: ["A 10/21 a bekerülés, az 1/2 a nem szomszédosság esélye.", "Az 5/21 a kettő szorzata."]
  },
  "birthday": {
    0: ["Az egyezés komplementere az, hogy mindenki más napon született.", "Az 1 a teljes bizonyosságot jelenti."],
    1: ["A 365 az év napjainak száma.", "A 365, 364, …, 336 azt mutatja, hány új nap marad a 30 ember egymás utáni elhelyezésekor.", "A 365^30 minden ember 365 lehetséges születésnapját jelenti."],
    2: ["A komplementer valószínűséget 1-ből vonjuk ki.", "A 0,7063 a decimális alak, a 70,63% a százalékos alak."]
  },
  "urn": {
    0: ["A 20 az urna teljes golyószáma.", "A 4 a kiválasztandó golyók száma.", "A 4 845 az összes lehetséges négyes csoport."],
    1: ["A 11 a nem piros golyók száma: 6 fehér + 5 zöld.", "A 4 a húzott golyók száma.", "A 330 a 11 nem pirosból választható négyesek száma."],
    2: ["A 330, 1001 és 1365 az egy-egy hiányzó szín esetei.", "A 126, 15 és 5 az egyszínű esetek, amelyeket vissza kell adni, mert kétszer vontuk le őket.", "A 2295 marad a mindhárom színt tartalmazó négyesek száma."],
    3: ["A 2295 a kedvező háromszínű négyesek száma.", "A 4845 az összes négyes választás.", "A 153/323 és a 47,37% ugyanennek az aránynak egyszerűsített alakjai."]
  },
  "factory": {
    0: ["A 0,15 az anyaghibások aránya, a 0,10 a mérethibásoké.", "A 0,03 a két hiba közös része."],
    1: ["Az összeadás a két hibakört egyesíti.", "A 0,03-at le kell vonni, mert a közös hibásakat kétszer számoltuk.", "A 0,22 az összes legalább egy hibás alkatrész aránya."],
    2: ["Az 1 a teljes lakosság/gyártás 100%-a.", "A 0,78 a hibásak komplementere, vagyis a hibátlan arány."],
    3: ["A 15−3=12 az csak anyaghibás rész.", "A 10−3=7 az csak mérethibás rész.", "A 12+7=19 a pontosan egy hibával rendelkező arány."]
  },
  "languages": {
    0: ["A 18 angolosból levonjuk az 5 közös tanulót, így 13 csak angolos marad.", "A 12 németesből levonva az 5 közöset, 7 csak németes marad.", "Az 5 a közös metszet."],
    1: ["A 13, 5 és 7 a Venn-diagram három belső régiója.", "A 25 az egyik nyelvet vagy mindkettőt beszélők száma.", "A 30 az osztály teljes létszáma."],
    2: ["A közös 5-öt kihagyjuk, mert pontosan egy nyelvet keresünk.", "A 13+7=20 csak egy nyelvet beszélő tanuló."],
    3: ["A 1 a teljes osztály.", "A 25/30 legalább egy nyelvet beszél.", "Az 5/30 a körökön kívüli tanulók aránya."]
  },
  "hungarian-cards": {
    0: ["A 4 a négy darab hetes.", "A 16 a piros lapok száma.", "A 2 az egyszerre piros és hetes lapok száma."],
    1: ["A 2 kedvező lap van a 32 lapos csomagban.", "A 32 a teljes pakli."],
    2: ["A 4+16 összeadja a heteseket és a pirosakat.", "A 2-t levonjuk, mert a piros heteseket kétszer számoltuk.", "A 18 az unióban lévő lapok száma."],
    3: ["A 1 a teljes pakli.", "A 9/16 a piros vagy hetes lapok aránya.", "A 7/16 a komplementer: egyik feltétel sem teljesül."]
  },
  "stick": {
    0: ["A 0 és 200 a töréspont két szélső helye centiméterben.", "A 200 a teljes választható szakaszhossz."],
    1: ["A 120 a vizsgált hosszúsági küszöb.", "A 80=200−120 a bal oldali kedvező szélső rész hossza.", "A két 80-as rész együtt 160, ezt osztjuk 200-zal."],
    2: ["A 150 a másik küszöb.", "Az 50=200−150 a bal oldali kizárt rész vége.", "Az 50 és 150 közötti 100 cm-es rész kedvező."]
  },
  "target": {
    0: ["A πr² a kör területének képlete.", "A nagy kör sugara R=10, a kis köré r=5.", "A valószínűség területarány, mert egyenletes a találat."],
    1: ["Az 5² a kis kör sugarának négyzete.", "A 10² a teljes céltábla sugarának négyzete.", "A π kiesik, így 25/100=1/4=25%."],
    2: ["A teljes céltábla 100%-ából levonjuk a belső kör 25%-át.", "A maradék 75% a külső gyűrű."]
  },
  "unit-square": {
    0: ["Az 1 a négyzet oldalhossza és területe is, mert 1×1=1.", "A két oldalsó 1/4-es sáv miatt a belső oldal 1−1/4−1/4=1/2.", "A középső négyzet az oldalaktól legalább 1/4-re lévő pontokat tartalmazza."],
    1: ["A (1/2)² a középső négyzet területe.", "A 1/4 az egyetlen oldalhoz sem közeli, kedvezőtlen rész."],
    2: ["Az 1 a teljes négyzet területe.", "A 1−1/4 a komplementer kivonása.", "A 3/4=75% a valamelyik oldalhoz közelebb lévő pontok aránya."]
  },
  "cafe": {
    0: ["A 120 perc a 16:00 és 18:00 közötti kétórás időtartam.", "A 120×120 az András- és Betti-időpontokból álló teljes négyzet területe.", "Egy pont (x,y) egy konkrét érkezési időpárt jelent."],
    1: ["A 10 perc András várakozási ideje.", "A 20 perc Betti várakozási ideje.", "Az x−20≤y≤x+10 sávban a két várakozási intervallum átfed."],
    2: ["A 110=120−10 az egyik nem találkozó sarokháromszög oldala.", "A 100=120−20 a másik háromszög oldala.", "A háromszög területe mindig oldal²/2."],
    3: ["A 14 400 a teljes időpont-négyzet területe.", "A 11 050 a két nem találkozó sarok területe.", "A 3350 a kedvező találkozási terület.", "A 67/288 és a 23,26% ugyanennek a valószínűségnek két alakja."]
  }
};

export function getFormulaGuide(problemId: string, stepIndex: number): string[] {
  return guides[problemId]?.[stepIndex] ?? ["A képlet számlálója a kedvező eseteket, nevezője az összes lehetséges esetet jelenti."];
}
