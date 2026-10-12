export type NamedRule = { title: string; formula: string; meaning: string };

const rules: Record<string, Record<number, NamedRule>> = {
  "zh2-stick-conditional": {
    0: { title: "Geometriai valószínűség", formula: String.raw`P(E)=\frac{\text{kedvező hossz}}{\text{teljes hossz}}`, meaning: "Ha minden törési hely ugyanolyan esélyes, akkor hosszakat arányítunk." },
    4: { title: "Feltételes valószínűség képlete", formula: String.raw`P(A\mid B)=\frac{P(A\cap B)}{P(B)}`, meaning: "A B feltétel mellett csak a B-n belüli eseteket nézzük." },
    5: { title: "Függetlenség feltétele", formula: String.raw`P(A\cap B)=P(A)\cdot P(B)`, meaning: "A és B akkor független, ha a közös esély a két külön esély szorzata." }
  },
  "zh2-conditional-chain": {
    1: { title: "Szorzási lánc szabály", formula: String.raw`P(A_1\cap A_2\cap A_3)=P(A_1)P(A_2\mid A_1)P(A_3\mid A_1\cap A_2)`, meaning: "Ha mindennek egyszerre kell teljesülnie, az egymás utáni esélyeket összeszorozzuk." },
    3: { title: "Feltételes valószínűség képlete", formula: String.raw`P(X\mid Y)=\frac{P(X\cap Y)}{P(Y)}`, meaning: "A már megadott Y feltétel lesz a nevező." }
  },
  "zh2-factory-bayes": {
    2: { title: "Teljes valószínűség tétele", formula: String.raw`P(D)=\sum_i P(D\mid G_i)P(G_i)`, meaning: "A selejt több, egymást kizáró gépről jöhet, ezért a gépek hozzájárulásait összeadjuk." },
    3: { title: "Bayes-formula", formula: String.raw`P(G_3\mid D)=\frac{P(D\mid G_3)P(G_3)}{P(D)}`, meaning: "Ismerjük a selejtet, és ebből következtetünk vissza a gépre." },
    4: { title: "Bayes-formula behelyettesítve", formula: String.raw`P(G_3\mid D)=\frac{P(D\mid G_3)P(G_3)}{P(D)}`, meaning: "A harmadik gép selejtjeit az összes selejthez viszonyítjuk." }
  },
  "zh2-family-genders": {
    1: { title: "Komplementer esemény", formula: String.raw`P(A)=1-P(\overline A)`, meaning: "A legalább egy lány egyszerűbb úgy, hogy kivonjuk a mindenki fiú esetét." },
    2: { title: "Részhalmaz és feltételes valószínűség", formula: String.raw`B\subseteq A\Rightarrow A\cap B=B,\quad P(A\mid B)=1`, meaning: "Minden vegyes család automatikusan olyan is, amelyben van lány." },
    3: { title: "Függetlenség feltétele", formula: String.raw`P(A\cap B)=P(A)P(B)`, meaning: "Ezt a két oldalt kell összehasonlítani." },
    6: { title: "Feltételes valószínűség képlete", formula: String.raw`P(B\mid A)=\frac{P(A\cap B)}{P(A)}`, meaning: "A legalább egy lányos családok között keressük a vegyesek arányát." }
  }
};

export function getNamedRule(problemId: string, stepIndex: number): NamedRule | undefined {
  return rules[problemId]?.[stepIndex];
}
