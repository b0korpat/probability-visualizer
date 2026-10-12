import { ProblemDefinition } from '@/types/visualizer';
export interface GuidedChapter { title: string; text: string; math?: string; notes: string[]; rule?: string; general?: string; purpose?: string }
export const guidedChapters: Record<string, GuidedChapter[]> = {
  "zh2-conditional-chain": [
    {
      "title": "Az adatok: mindig nézd, MIHEZ képest",
      "text": "A₁ esélye 20%. Az A₁-es eseteken BELÜL A₂ esélye 60%. Az A₁ és A₂ közös esetein BELÜL A₃ esélye 80%. Három egymásba épülő szűrést rajzolunk. A 60% és 80% nem az összes esethez képest értendő.",
      "math": "P(A_1)=0{,}2,\\quad P(A_2\\mid A_1)=0{,}6,\\quad P(A_3\\mid A_1\\cap A_2)=0{,}8",
      "notes": [
        "Az alsó indexek csak az eseményeket különböztetik meg.",
        "| = feltéve, hogy; ∩ = mindkettő teljesül. Nem kell időbeli sorrendet feltételezni."
      ]
    },
    {
      "title": "Először A₁ és A₂ közös részét számoljuk",
      "text": "Az összes eset 20%-a A₁-es. Ennek a résznek a 60%-a A₂-es is. Ezért szorzunk: 0,2 × 0,6 = 0,12. A₁ és A₂ együtt tehát az összes eset 12%-a. A sávon a 20%-os részből ennyi marad.",
      "math": "P(A_1\\cap A_2)=0{,}2\\cdot0{,}6=0{,}12",
      "notes": [
        "A 0,6 a 0,2-es rész aránya, ezért nem összeadjuk."
      ],
      "rule": "Szorzási szabály",
      "general": "P(X\\cap Y)=P(X)P(Y\\mid X)"
    },
    {
      "title": "A közös részt tovább szűrjük A₃-ra",
      "text": "Az előző lépésben 12% maradt. Ezen BELÜL A₃ aránya 80%. Újra szorzunk: 0,12 × 0,8 = 0,096. Mindhárom esemény együtt az összes eset 9,6%-a.",
      "math": "P(A_1\\cap A_2\\cap A_3)=0{,}2\\cdot0{,}6\\cdot0{,}8=0{,}096",
      "notes": [
        "0,096 × 100 = 9,6%.",
        "Nem függetlenséget használunk: a feltételes esélyek adottak."
      ],
      "rule": "Szorzási lánc szabály",
      "general": "P(A_1\\cap A_2\\cap A_3)=P(A_1)P(A_2\\mid A_1)P(A_3\\mid A_1\\cap A_2)"
    },
    {
      "title": "Ha A₁ már adott: ez lesz az új összes",
      "text": "Most A₁-et már tudjuk. Tehát csak a 20%-os A₁-csoportot nézzük. Ebből A₂ és A₃ együtt a teljes eseménytér 9,6%-át teszi ki. Kedvező / új összes: 0,096 / 0,2 = 0,48. A₁-en belül tehát 48% felel meg.",
      "math": "P(A_2\\cap A_3\\mid A_1)=\\frac{0{,}096}{0{,}2}=0{,}48=48\\%",
      "notes": [
        "Felül a három esemény közös esélye, alul az ismert A₁ esélye.",
        "Ugyanez közvetlenül: 0,6 × 0,8 = 0,48."
      ],
      "rule": "Feltételes valószínűség képlete",
      "general": "P(X\\mid Y)=\\frac{P(X\\cap Y)}{P(Y)}\\quad(P(Y)>0)"
    },
    {
      "title": "A két válasz más összeshez tartozik",
      "text": "Mindhárom együtt: 9,6% az összes eset között. A₂ és A₃ A₁ feltételével: 48% csak az A₁-es esetek között. Ugyanazt a kedvező részt két különböző csoporthoz viszonyítottuk.",
      "math": "P(A_1\\cap A_2\\cap A_3)=0{,}096,\\quad P(A_2\\cap A_3\\mid A_1)=0{,}48",
      "notes": [
        "A feltételes kérdésnél először mindig nevezd meg az új összest."
      ]
    }
  ],
  "zh2-factory-bayes": [
    {
      "title": "A termelést három gép között osztjuk fel",
      "text": "G₁ a termékek 20%-át, G₂ a 30%-át, G₃ az 50%-át készíti. A selejtarány G₁-en BELÜL 5%, a másik két gépen BELÜL 10%. Az ábrához képzeljünk el 1000 terméket: 200, 300 és 500 jut a három gépre.",
      "math": "P(G_1)=0{,}2,\\quad P(G_2)=0{,}3,\\quad P(G_3)=0{,}5",
      "notes": [
        "D = selejtes termék; Gᵢ = az i-edik gépről származó termék.",
        "Az 1000 termék csak szemléltető aránymodell, nem egy tényleges minta garantált darabszáma."
      ]
    },
    {
      "title": "G₁: a gép arányából kivesszük a selejtes részt",
      "text": "A szemléltető 200 G₁-termék 5%-a selejt: 200 × 0,05 = 10. Ez az összes 1000 termékből 10/1000 = 1%. Valószínűséggel: 0,2 × 0,05 = 0,01. G₁ és selejt együtt tehát 1%.",
      "math": "P(G_1\\cap D)=P(G_1)P(D\\mid G_1)=0{,}2\\cdot0{,}05=0{,}01",
      "notes": [
        "Az 5% csak G₁-en belüli arány; az 1% már az egész termelésből való rész."
      ],
      "rule": "Szorzási szabály",
      "general": "P(X\\cap Y)=P(X)P(Y\\mid X)"
    },
    {
      "title": "G₂: ugyanezt számoljuk a második gépre",
      "text": "A szemléltető 300 G₂-termék 10%-a selejt: 300 × 0,1 = 30. Az összeshez mérve 30/1000 = 3%. Vagyis 0,3 × 0,1 = 0,03.",
      "math": "P(G_2\\cap D)=0{,}3\\cdot0{,}1=0{,}03",
      "notes": [],
      "rule": "Szorzási szabály",
      "general": "P(X\\cap Y)=P(X)P(Y\\mid X)"
    },
    {
      "title": "G₃: kiszámoljuk a harmadik hozzájárulást",
      "text": "A szemléltető 500 G₃-termék 10%-a selejt: 500 × 0,1 = 50. Az összeshez mérve 50/1000 = 5%. Vagyis 0,5 × 0,1 = 0,05.",
      "math": "P(G_3\\cap D)=0{,}5\\cdot0{,}1=0{,}05",
      "notes": [
        "G₃-on belül 10% selejt van; az egész termelés 5%-a G₃-selejt. Ez két külön arány."
      ],
      "rule": "Szorzási szabály",
      "general": "P(X\\cap Y)=P(X)P(Y\\mid X)"
    },
    {
      "title": "Összes selejt: a három rész összeadódik",
      "text": "A selejt bármelyik gépről jöhet. A három rész különböző termékeket jelent, ezért összeadjuk: 1% + 3% + 5% = 9%. Az aránymodellben 10 + 30 + 50 = 90 selejt jut az 1000 termékre.",
      "math": "P(D)=0{,}01+0{,}03+0{,}05=0{,}09=9\\%",
      "notes": [
        "Minden termék pontosan egy gépről jön, és a három gép lefedi az összes terméket. Ez a teljes eseményrendszer feltétele."
      ],
      "rule": "Teljes valószínűség tétele",
      "general": "P(D)=\\sum_{i=1}^{3}P(D\\mid G_i)P(G_i)"
    },
    {
      "title": "Selejtes terméket látunk: most csak a selejtek maradnak",
      "text": "Már tudjuk, hogy a kiválasztott termék selejtes. Az új összes ezért a 90 selejt. Ebből 10 származik G₁-ről, 30 G₂-ről, 50 G₃-ról. Még nem osztunk: először az új viszonyítási csoportot jelöljük ki.",
      "notes": [
        "Ez a feltétel megfordítása: nem a gépen belüli selejtet, hanem a selejten belüli gépet keressük."
      ]
    },
    {
      "title": "Bayes: a gépek része az összes selejten belül",
      "text": "Most osztunk a 90 selejttel. G₁: 10/90 = 1/9; G₂: 30/90 = 1/3; G₃: 50/90 = 5/9. Ezek annak esélyei, hogy egy selejtes termék az adott gépről jött. A legvalószínűbb G₃, de egyetlen termék eredetét ebből nem tudjuk biztosan.",
      "math": "\\begin{aligned}P(G_1\\mid D)&=\\frac{0{,}01}{0{,}09}=\\frac19\\approx11{,}11\\%\\\\P(G_2\\mid D)&=\\frac{0{,}03}{0{,}09}=\\frac13\\approx33{,}33\\%\\\\P(G_3\\mid D)&=\\frac{0{,}05}{0{,}09}=\\frac59\\approx55{,}56\\%\\end{aligned}",
      "notes": [
        "A számláló az adott gép selejtes része; a nevező az összes selejt.",
        "1/9 + 1/3 + 5/9 = 1: a három eredet lefedi a selejteket."
      ],
      "rule": "Bayes-formula",
      "purpose": "A Bayes-formulával egy megfigyelt eredményből következtetünk a lehetséges eredetére, és az új információ alapján frissítjük annak esélyét. Itt látjuk, hogy a termék selejtes, és azt keressük, melyik gépről jöhetett. P(D|Gᵢ): adott gép mellett mennyi a selejt? P(Gᵢ|D): adott selejt mellett melyik gép volt a forrás? Bayes az első irányból kiszámítja a másodikat, a gépek termelési arányát is figyelembe véve.",
      "general": "P(G_i\\mid D)=\\frac{P(D\\mid G_i)P(G_i)}{P(D)}"
    },
    {
      "title": "Megvan az előre és visszafelé számolás",
      "text": "Először gépenként szoroztunk, majd összeadtuk a selejtes részeket: 9% lett. Utána csak a selejtek között osztottunk: a harmadik gép része 5/9. P(D|G₃) = 10% és P(G₃|D) ≈ 55,56% eltér, mert más az összes.",
      "math": "P(D)=0{,}09,\\quad P(G_3\\mid D)=\\frac59",
      "notes": [
        "A feltétel irányát mindig olvasd ki szavakkal."
      ]
    }
  ],
  "zh2-family-genders": [
    {
      "title": "3.7 a: a füzet szerinti események",
      "text": "Három gyermeknél 2³ = 8 egyformán valószínű sorrend van. A: LEGFELJEBB egy lány, vagyis nulla vagy egy lány. B: van fiú és lány is. Felírjuk a nyolc sorrendet, majd külön kijelöljük A-t és B-t.",
      "math": "|\\Omega|=2^3=8",
      "notes": [
        "F = fiú; L = lány. A „legfeljebb egy” nem „legalább egy”: a nulla lány is jó A-nak.",
        "A feladatban a gyermekek neme azonos esélyű és független."
      ]
    },
    {
      "title": "A: nulla vagy egy lány",
      "text": "A-nak jó az FFF: nulla lány van benne. Jó még FFL, FLF és LFF: mindegyikben pontosan egy lány van. Ez négy jó sorrend a nyolcból. Így P(A) = 4/8 = 1/2, ahogy a füzetben.",
      "math": "A=\\{FFF,FFL,FLF,LFF\\},\\quad P(A)=\\frac48=\\frac12",
      "notes": [
        "Két vagy három lány már túl sok az A feltételéhez."
      ],
      "rule": "Klasszikus valószínűség",
      "general": "P(E)=\\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}"
    },
    {
      "title": "B: legyen fiú és lány is",
      "text": "B-nek a két egyféle család nem jó: FFF-ben nincs lány, LLL-ben nincs fiú. A többi hat sorrend vegyes. Így P(B) = 6/8 = 3/4.",
      "math": "P(B)=\\frac{8-2}{8}=\\frac68=\\frac34",
      "notes": [],
      "rule": "Klasszikus valószínűség",
      "general": "P(E)=\\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}"
    },
    {
      "title": "A∩B: melyik sorrend felel meg mindkettőnek?",
      "text": "A négy A-esetből az FFF kiesik, mert B-nek nem jó. FFL, FLF és LFF megmarad: legfeljebb egy lány van bennük, és fiú meg lány is. Ez három közös eset a nyolcból. P(A∩B) = 3/8.",
      "math": "A\\cap B=\\{FFL,FLF,LFF\\},\\quad P(A\\cap B)=\\frac38",
      "notes": [
        "∩ = mindkét feltétel egyszerre teljesül."
      ],
      "rule": "Klasszikus valószínűség",
      "general": "P(E)=\\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}"
    },
    {
      "title": "A|B: három jó eset a hat vegyes között",
      "text": "Most tudjuk, hogy B megtörtént. Az FFF és LLL ezért kiesik az összesből is: hat vegyes sorrend marad. Ezekből háromnak van legfeljebb egy lánya: FFL, FLF, LFF. Így P(A|B) = 3/6 = 1/2 = 0,5, pontosan a füzet szerint.",
      "math": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}=\\frac{3/8}{3/4}=\\frac36=\\frac12=0{,}5",
      "notes": [
        "A számlálóban a három közös eset, a nevezőben a hat B-eset van."
      ],
      "rule": "Feltételes valószínűség képlete",
      "general": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\quad(P(B)>0)"
    },
    {
    "title": "Három gyermek: az események kapcsolata",
      "text": "Nem kizárók: van három közös eset. Egyik sem tartalmazza a másikat: FFF csak A-nak jó, FLL csak B-nek jó. Függetlenek: P(A)P(B) = (1/2) × (3/4) = 3/8, ami éppen P(A∩B). B ismeretében A esélye ugyanúgy 1/2 maradt.",
      "math": "P(A)P(B)=\\frac12\\cdot\\frac34=\\frac38=P(A\\cap B)",
      "notes": [
        "A függetlenség nem azt jelenti, hogy nincs közös eset.",
        "Ezek a füzetben szereplő három kapcsolati ellenőrzés eredményei."
      ],
      "rule": "Függetlenség definíciója",
      "general": "A,B\\text{ független}\\ \\Longleftrightarrow\\ P(A\\cap B)=P(A)P(B)"
    },
    {
      "title": "3.7 b: négy gyermek, ugyanazok az A és B feltételek",
      "text": "Négy gyermekre 2⁴ = 16 egyformán valószínű sorrend van. A továbbra is legfeljebb egy lány; B továbbra is fiú és lány is. Ugyanazt a módszert alkalmazzuk, de most a 16 sorrend között számolunk.",
      "math": "|\\Omega|=2^4=16",
      "notes": [
        "A háromgyerekes rész eredményeit nem vihetjük át változtatás nélkül."
      ]
    },
    {
      "title": "Négy gyermek: A-nak melyik sorrend jó?",
      "text": "Jó FFFF, mert nulla lány van benne. Jó még LFFF, FLFF, FFLF és FFFL: az egyetlen lány négy különböző helyen lehet. Ez 1 + 4 = 5 jó eset a 16-ból. P(A) = 5/16.",
      "math": "P(A)=\\frac{1+4}{16}=\\frac5{16}",
      "notes": [
        "Nem kell kombinációs képletet használni: az egyetlen lány helyét felsoroltuk."
      ],
      "rule": "Klasszikus valószínűség",
      "general": "P(E)=\\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}"
    },
    {
      "title": "Négy gyermek: B-nek a vegyes sorrendek jók",
      "text": "Csak FFFF és LLLL nem vegyes. A 16 sorrendből ezt a kettőt kivesszük: 14 jó marad. P(B) = 14/16 = 7/8.",
      "math": "P(B)=\\frac{16-2}{16}=\\frac{14}{16}=\\frac78",
      "notes": [],
      "rule": "Klasszikus valószínűség",
      "general": "P(E)=\\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}"
    },
    {
      "title": "Négy gyermek: A és B közös része",
      "text": "A öt jó esetéből FFFF kiesik, mert nincs benne lány. A négy pontosan egy lányos sorrend marad: FFFL, FFLF, FLFF és LFFF. Mindegyik vegyes is. P(A∩B) = 4/16 = 1/4.",
      "math": "P(A\\cap B)=\\frac4{16}=\\frac14",
      "notes": [],
      "rule": "Klasszikus valószínűség",
      "general": "P(E)=\\frac{\\text{kedvező esetek száma}}{\\text{összes eset száma}}"
    },
    {
      "title": "Négy gyermek: A|B",
      "text": "B adott, ezért csak a 14 vegyes sorrendből választunk. Közülük négyben van legfeljebb egy lány. Kedvező / új összes: 4/14 = 2/7. Ez a négygyerekes feltételes válasz.",
      "math": "P(A\\mid B)=\\frac{4/16}{14/16}=\\frac4{14}=\\frac27",
      "notes": [
        "A jó esetek száma négy, a feltétel miatt az összes tizennégy."
      ],
      "rule": "Feltételes valószínűség képlete",
      "general": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\quad(P(B)>0)"
    },
    {
    "title": "Négy gyermek: az események kapcsolata",
      "text": "Nem kizárók, mert négy közös esetük van. Egyik sem tartalmazza a másikat: FFFF csak A, FFLL csak B. A függetlenséget újra ellenőrizzük: (5/16) × (7/8) = 35/128, viszont P(A∩B) = 1/4 = 32/128. Nem egyeznek. Három gyermeknél függetlenek voltak, négy gyermeknél nem.",
      "math": "P(A)P(B)=\\frac5{16}\\cdot\\frac78=\\frac{35}{128}\\ne\\frac{32}{128}=P(A\\cap B)",
      "notes": [
        "A függetlenséget minden új eseménytérben külön kell ellenőrizni."
      ],
      "rule": "Függetlenség definíciója",
      "general": "A,B\\text{ független}\\ \\Longleftrightarrow\\ P(A\\cap B)=P(A)P(B)"
    }
  ]
};
const metadata = [
  {
    "id": "zh2-conditional-chain",
    "title": "Három egymást követő esemény",
    "category": "venn",
    "statement": "Adott P(A₁)=0,2, P(A₂|A₁)=0,6, P(A₃|A₁∩A₂)=0,8. Keressük P(A₁∩A₂∩A₃) és P(A₂∩A₃|A₁) értékét.",
    "key": "chain"
  },
  {
    "id": "zh2-factory-bayes",
    "title": "Gyárak és hibás termékek",
    "category": "venn",
    "statement": "Három gép a termelés 20%, 30%, 50%-át adja. A selejtarányuk 5%, 10%, 10%. Mennyi a selejt esélye? Selejtes terméket látva mekkora eséllyel az egyes gépek készítették?",
    "key": "factory"
  },
  {
    "id": "zh2-family-genders",
    "title": "Fiúk és lányok a családban",
    "category": "combinatorics",
    "statement": "3.7. Három, majd négy gyermek. A: legfeljebb egy lány. B: van fiú és lány is. A nemek függetlenek, azonos esélyűek. Mennyi P(A) és P(A|B)? Vizsgáljuk az események kapcsolatát.",
    "key": "family"
  }
] as const;
export const guidedProblems: ProblemDefinition[] = metadata.map(item => ({ id: item.id, title: item.title, category: item.category, statement: item.statement, featured: true, totalSteps: guidedChapters[item.id].length, steps: guidedChapters[item.id].map((chapter, stepIndex) => ({ stepIndex, title: chapter.title, description: chapter.text, latex: chapter.math ?? '', visualState: { drawerItems: [], pulledItems: [] } })) }));
