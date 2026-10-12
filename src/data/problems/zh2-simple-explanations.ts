const simple: Record<string, string[]> = {
  "zh2-stick-conditional": [
    "Először felrajzoljuk az összes lehetséges törési helyet. Az x csak azt mondja meg, hány centiméternél törik el a pálca.",
    "Most azt keressük, mikor lesz valamelyik darab 120 cm-nél hosszabb. Ez csak akkor lehet, ha a törés valamelyik szélhez közel van.",
    "Most azt keressük, mikor lesz mindkét darab 150 cm-nél rövidebb. Ehhez nem szabad túl közel törni egyik szélhez sem.",
    "Most csak azokat a törési helyeket tartjuk meg, ahol A és B egyszerre igaz. Ezért a két színes tartomány közös részeit nézzük.",
    "Most már tudjuk, hogy B megtörtént. Ezért nem az egész 200 cm-es pálcához viszonyítunk, hanem csak a B-hez tartozó 100 cm-hez.",
    "Most ellenőrizzük, hogy A és B hatással van-e egymásra. Két számot kiszámolunk, majd összehasonlítjuk őket.",
    "Összegyűjtjük a válaszokat. Ez a lépés már nem új számolás, csak ellenőrző összefoglalás."
  ],
  "zh2-conditional-chain": [
    "Három eseményünk van egymás után. A második esélye attól függ, hogy az első megtörtént-e, a harmadiké pedig az első kettőtől.",
    "Ha mindháromnak meg kell történnie, akkor az első esélyt megszorozzuk a második feltételes esélyével, majd a harmadikéval.",
    "Most csak behelyettesítjük a feladatban kapott három számot a képletbe, majd összeszorozzuk őket.",
    "Most ugyanazt a közös eseményt másképp kérdezik: ha A₁ már biztosan megtörtént, mennyi az esélye a másik kettőnek együtt?"
  ],
  "zh2-factory-bayes": [
    "Elnevezzük a három gépet G₁-nek, G₂-nek és G₃-nak. D jelenti azt, hogy a termék selejtes.",
    "Kiszámoljuk, a harmadik gép összes terméke közül mekkora rész selejtes. Ehhez a gép arányát és a gépen belüli selejtarányt szorozzuk.",
    "Egy selejtes termék háromféleképpen keletkezhet: az első, a második vagy a harmadik gépen. Ezért a három részt összeadjuk.",
    "Most visszafelé gondolkodunk: már tudjuk, hogy selejtes a termék, és azt kérdezzük, mekkora eséllyel a harmadik gép készítette.",
    "A harmadik gép selejtjeit elosztjuk az összes selejttel. Így a selejtes termékek között kapjuk meg a harmadik gép részarányát."
  ],
  "zh2-family-genders": [
    "Három gyermeknél minden gyermek kétféle lehet: fiú (F) vagy lány (L). A sorrendeket külön számoljuk.",
    "A legalább egy lány esetét úgy számoljuk, hogy az összes esetből levonjuk az egyetlen rossz esetet: amikor mindenki fiú.",
    "A vegyes család biztosan tartalmaz lányt, ezért a vegyes családok mind benne vannak az A eseményben.",
    "Két esemény akkor független, ha az egyik ismerete nem változtatja meg a másik esélyét. Ezt most a képlet két oldalának összehasonlításával ellenőrizzük.",
    "Négy gyermeknél ugyanígy gondolkodunk, csak most minden helyen két lehetőség van négyszer, ezért 2⁴ esetünk lesz.",
    "Négy gyermeknél csak két eset nem vegyes: mindenki fiú vagy mindenki lány. A többi 14 eset vegyes.",
    "Most a vegyes családok arányát nézzük az összes legalább egy lányos családon belül. Ezért 14-et 15-tel osztunk."
  ]
};

export function getSimpleExplanation(problemId: string, stepIndex: number): string {
  return simple[problemId]?.[stepIndex] ?? "Először megértjük, mit kér a feladat, utána behelyettesítjük az ismert adatokat, végül ellenőrizzük az eredményt.";
}
