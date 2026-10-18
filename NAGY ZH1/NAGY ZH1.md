# NAGY ZH1

## Használati cél

Ez a jegyzet a valószínűségszámítási Nagy ZH feladattípusait bontja fel. Minden témánál szerepel:

1. mit kell felismerni;
2. milyen adatokat kell kiírni;
3. melyik képletet kell használni;
4. milyen sorrendben kell számolni;
5. egy rövid mintamegoldás vagy ellenőrzés.

> A vizualizációk helye későbbre fenntartva: [VIZUALIZÁCIÓ HELYE]

## 0. Általános ZH-megoldási protokoll

1. Nevezd meg a keresett eseményt vagy valószínűségi változót.
2. Írd ki az összes adatot és a mértékegységeket.
3. Azonosítsd a modellt: kombinatorikus, geometriai, feltételes, binomiális, Poisson, exponenciális, normális stb.
4. Írd fel a képletet még behelyettesítés előtt.
5. Helyettesíts és számolj.
6. Ellenőrizd az eredményt:
   - valószínűség: `0 ≤ P ≤ 1`;
   - szórásnégyzet: nemnegatív;
   - várható érték: legyen a lehetséges értékek tartományában;
   - mértékegység: idő, hossz, darabszám ne keveredjen.

## 1. Valószínűségi mező és eseményalgebra

### Feladattípus

Események unióját, metszetét, komplementerét vagy legalább az egyik esemény bekövetkezését kell kiszámítani.

### Alapképletek

`P(Ω)=1`, `P(∅)=0`, `P(A^c)=1-P(A)`

`P(A∪B)=P(A)+P(B)-P(A∩B)`

Három eseménynél:

`P(A∪B∪C)=P(A)+P(B)+P(C)-P(A∩B)-P(A∩C)-P(B∩C)+P(A∩B∩C)`

### Megoldási menet

1. Írd ki, hogy `A∪B` vagy `A∩B` szerepel-e a kérdésben.
2. Keresd meg, van-e megadott közös rész.
3. Két eseménynél Poincaré-formulát használj.
4. Három eseménynél a legbelső metszetből indulj kifelé, hogy ne számold kétszer ugyanazt a részt.

### Mintafeladat

Adott `P(A)=0,6`, `P(B)=0,5`, `P(A∩B)=0,2`. Számítsd ki `P(A∪B)` értékét.

`P(A∪B)=0,6+0,5-0,2=0,9`.

## 2. Klasszikus valószínűség és kombinatorika

### Feladattípus felismerése

Minden elemi kimenetel azonos esélyű, ezért:

`P(A)=kedvező esetek száma / összes esetek száma`.

### Kombinatorikai döntés

- sorrend számít, ismétlés nélkül: variáció;
- sorrend nem számít, ismétlés nélkül: kombináció;
- minden pozíció külön választható: szorzási szabály;
- több, egymást kizáró eset: összeadási szabály.

Gyakori képletek:

`C(n,k)=n!/(k!(n-k)!)`

`V(n,k)=n!/(n-k)!`

`n` különböző elem permutációja: `n!`.

### Mintafeladat

Egy 10 fős csoportból 3 embert választunk sorrend nélkül. Hány kimenet van?

`C(10,3)=10!/(3!7!)=120`.

Ha a kedvező esetek száma 24, akkor a valószínűség `24/120=0,2`.

## 3. Geometriai valószínűség

### Gyors módszer

`P(A)=kedvező mérték/teljes mérték`.

A mérték lehet hossz, terület vagy térfogat.

Ha a kedvező tartomány nehezen bontható fel, keresd a tiltott részt:

`P(A)=1-P(A^c)=1-rossz mérték/teljes mérték`.

### Megoldási menet

1. Határozd meg a teljes tartományt.
2. Írd fel a teljes hosszát, területét vagy térfogatát.
3. Írd le a kedvező vagy tiltott tartományt.
4. Oszd el a megfelelő mértékeket.

### Mintafeladat

Egy 200 cm-es pálcán egyenletesen választunk pontot. Mi a valószínűsége, hogy a pont az 50 és 150 cm közötti szakaszra esik?

Kedvező hossz: `150-50=100 cm`.

`P=100/200=0,5`.

### Vizualizáció helye

[VIZUALIZÁCIÓ HELYE: számegyenes vagy geometriai tartomány]

## 4. Feltételes valószínűség, teljes valószínűség, Bayes

### Alapképletek

`P(A|B)=P(A∩B)/P(B)`, ha `P(B)>0`.

`P(A∩B)=P(B)P(A|B)`.

Teljes valószínűség esetén, ha `B_i` teljes eseményrendszer:

`P(A)=Σ P(A|B_i)P(B_i)`.

Bayes:

`P(B_k|A)=P(A|B_k)P(B_k)/Σ[P(A|B_i)P(B_i)]`.

### Megoldási menet

1. Azonosítsd az okokat: `B_1,B_2,...`.
2. Írd ki az okok előzetes valószínűségeit.
3. Írd ki az okonkénti feltételes valószínűségeket.
4. A keresett közös ágat szorozd össze.
5. Bayes esetén a nevezőbe az összes, a megfigyeléshez vezető ág összege kerül.

### Mintafeladat

`P(B_1)=0,4`, `P(B_2)=0,6`, `P(A|B_1)=0,8`, `P(A|B_2)=0,2`. Számítsd ki `P(B_1|A)`-t.

`P(A)=0,8·0,4+0,2·0,6=0,44`.

`P(B_1|A)=0,8·0,4/0,44=0,32/0,44≈0,7273`.

### Vizualizáció helye

[VIZUALIZÁCIÓ HELYE: valószínűségi fa]

## 5. Függetlenség és diszjunktság

### Események

Függetlenség:

`P(A∩B)=P(A)P(B)`.

Diszjunkt eseményeknél `A∩B=∅`, ezért `P(A∩B)=0`.

Ha `P(A)>0` és `P(B)>0`, akkor két diszjunkt esemény nem lehet független.

### Gyors ellenőrzés

Elég egyetlen ellenpélda:

ha `P(A∩B)≠P(A)P(B)`, akkor a két esemény függő.

## 6. Valószínűségi változó és eloszlásfüggvény

### Diszkrét változó

Adatok: lehetséges értékek `x_i`, valószínűségek `p_i`.

Ellenőrzés: `p_i≥0`, `Σp_i=1`.

Eloszlásfüggvény:

`F(x)=P(X≤x)` a szokásos konvenció szerint.

### Folytonos változó

Sűrűségfüggvény esetén:

`f(x)≥0`, `∫f(x)dx=1`.

`P(a≤X≤b)=∫_a^b f(x)dx=F(b)-F(a)`.

Folytonos változónál a végpontok nem számítanak.

### Megoldási menet eloszlásfüggvényből

1. Keresd meg az alsó és felső határt.
2. Írd fel az intervallum valószínűségét két eloszlásfüggvényérték különbségeként.
3. Diszkrét esetben figyelj arra, hogy a ≤ vagy < jel szerepel-e.

## 7. Várható érték, szórásnégyzet, szórás

### Képletek

Diszkrét eset:

`E(X)=Σ x_i p_i`.

Folytonos eset:

`E(X)=∫x f(x)dx`.

Steiner-formula:

`D²(X)=E(X²)-[E(X)]²`.

`D(X)=√D²(X)`.

Linearitás:

`E(aX+b)=aE(X)+b`.

`D²(aX+b)=a²D²(X)`.

### Mintafeladat

Legyen `P(X=0)=0,25`, `P(X=2)=0,5`, `P(X=4)=0,25`.

`E(X)=0·0,25+2·0,5+4·0,25=2`.

`E(X²)=0²·0,25+2²·0,5+4²·0,25=6`.

`D²(X)=6-2²=2`, ezért `D(X)=√2`.

## 8. Nevezetes diszkrét eloszlások

| Eloszlás | Mikor? | Tömegfüggvény | Várható érték | Szórásnégyzet |
|---|---|---|---:|---:|
| Bernoulli `I(p)` | egy próba | `p^x(1-p)^(1-x)` | `p` | `p(1-p)` |
| Binomiális `Bin(n,p)` | n független próba, sikerek száma | `C(n,k)p^k(1-p)^(n-k)` | `np` | `np(1-p)` |
| Geometriai `Geo(p)` | első sikerig tartó próbák száma | `p(1-p)^(k-1)` | `1/p` | `(1-p)/p²` |
| Poisson `Poi(λ)` | ritka események száma | `e^(-λ)λ^k/k!` | `λ` | `λ` |

### Binomiális mintafeladat

`X~Bin(10,0,2)`. Pontosan 3 siker:

`P(X=3)=C(10,3)·0,2³·0,8⁷`.

Legalább 1 siker:

`P(X≥1)=1-P(X=0)=1-0,8¹⁰`.

### Geometriai és exponenciális memória-nélküliség

Geometriai:

`P(X>k+r|X>k)=P(X>r)`.

Exponenciális:

`P(X>t+s|X>t)=P(X>s)`.

## 9. Nevezetes folytonos eloszlások

### Egyenletes eloszlás `U(a,b)`

`f(x)=1/(b-a)` az `(a,b)` intervallumon.

`E(X)=(a+b)/2`, `D²(X)=(b-a)²/12`.

Intervallum valószínűsége hosszarány:

`P(c≤X≤d)=(d-c)/(b-a)`.

### Exponenciális eloszlás `Exp(λ)`

`f(x)=λe^(-λx)`, `x≥0`.

`P(X>t)=e^(-λt)`, `E(X)=1/λ`, `D²(X)=1/λ²`.

Ha az átlagos várakozási idő `m`, akkor `λ=1/m`.

### Normális eloszlás `N(μ,σ²)`

Standardizálás:

`Z=(X-μ)/σ`.

Intervallum:

`P(a≤X≤b)=Φ((b-μ)/σ)-Φ((a-μ)/σ)`.

Szimmetria:

`Φ(-z)=1-Φ(z)`.

### Normális mintafeladat

`X~N(100,15²)`. `P(X≤130)`:

`z=(130-100)/15=2`.

`P(X≤130)=Φ(2)≈0,9772`.

## 10. Binomiális közelítések

### Poisson-közelítés

Használd, ha `n` nagy és `p` kicsi. Állítsd be:

`λ=np`.

Ezután `Bin(n,p)` helyett `Poi(λ)`-val számolj.

Példa: `n=100`, `p=0,02`, ezért `λ=2`. Pontosan 3:

`P(X=3)≈e^(-2)2³/3!`.

### Normális közelítés

Használd, ha `np` és `n(1-p)` is elég nagy, tipikusan legalább 5 vagy a kurzus által előírt küszöb.

`μ=np`, `σ=√(np(1-p))`.

Folytonossági korrekció:

- `P(X≤k)` helyett `P(Y≤k+0,5)`;
- `P(X≥k)` helyett `P(Y≥k-0,5)`;
- `P(a≤X≤b)` helyett `P(a-0,5≤Y≤b+0,5)`.

## 11. Kétváltozós eloszlások

### Diszkrét együttes eloszlás

Sorösszeg:

`p_X(x)=Σ_y p_{X,Y}(x,y)`.

Oszlopösszeg:

`p_Y(y)=Σ_x p_{X,Y}(x,y)`.

Függetlenség akkor és csak akkor, ha minden cellára:

`p_{X,Y}(x,y)=p_X(x)p_Y(y)`.

Gyors cáfolat: elég egy cella, amelyre ez nem teljesül.

### Folytonos együttes sűrűség

Peremsűrűségek integrálással:

`f_X(x)=∫f_{X,Y}(x,y)dy`, `f_Y(y)=∫f_{X,Y}(x,y)dx`.

Ha az értelmezési tartomány nem tengelypárhuzamos téglalap, az gyakran azonnal jelzi a függőséget, de a végső ellenőrzést a tényleges szorzattá bontással végezd.

### Vizualizáció helye

[VIZUALIZÁCIÓ HELYE: együttes eloszlási táblázat]

## 12. Kovariancia és korreláció

`cov(X,Y)=E(XY)-E(X)E(Y)`.

`R(X,Y)=cov(X,Y)/(D(X)D(Y))`.

Fontos:

- függetlenségből következik a korrelálatlanság;
- korrelálatlanságból általában nem következik függetlenség;
- `-1≤R≤1`;
- `D²(X±Y)=D²(X)+D²(Y)±2cov(X,Y)`.

Független változóknál a kovariancia nulla, így az összeg szórásnégyzete a szórásnégyzetek összege.

## 13. Statisztikai minta, becslés és regresszió

### Alapok

A minta `X_1,...,X_n` azonos eloszlású és független változókból áll.

Mintaátlag:

`X̄=(X_1+...+X_n)/n`.

A becslésnél ellenőrizd:

- torzítatlanság;
- konzisztencia;
- hatásosabb becslő, ha összehasonlítás szükséges.

### Lineáris regresszió

Modell: `y≈α+βx`.

`β̂=[overline(xy)-x̄ȳ]/[overline(x²)-x̄²]`.

`α̂=ȳ-β̂x̄`.

### Empirikus eloszlásfüggvény

1. Rendezd a mintát.
2. Minden értéknél számold az addigi relatív gyakoriságot.
3. A lépcsős függvény értéke `k/n`.

## 14. Hipotézisvizsgálatok röviden

### Egymintás u-próba

Ismert szórás esetén:

`u=(X̄-m_0)/(σ/√n)`.

### Egymintás t-próba

Ismeretlen szórás esetén:

`t=(X̄-m_0)/(s*/√n)`, szabadságfok `n-1`.

### F-próba

Két szórásnégyzet összehasonlítására:

`F=(s_X*)²/(s_Y*)²`.

### Khi-négyzet illeszkedésvizsgálat

`χ²=Σ[(N_i-nν_i)²/(nν_i)]`.

Mindig külön írd le:

1. `H_0` és `H_1`;
2. próbastatisztika;
3. szabadságfok;
4. kritikus tartomány vagy p-érték;
5. döntés és szöveges következtetés.

## 15. A 8 legfontosabb ZH-gyorsmódszer

1. Geometriai valószínűség: `1 - rossz terület`.
2. Két-három eseménynél Venn-részek kitöltése belülről kifelé.
3. Normális eloszlásnál mindig standardizálj, majd használd `Φ(-z)=1-Φ(z)`.
4. Szórásnégyzethez Steiner-formula: `E(X²)-[E(X)]²`.
5. Geometriai és exponenciális eloszlásnál használd a memória-nélküliséget.
6. Függetlenséget egyetlen hibás cellával lehet cáfolni.
7. Bayes-feladatnál áganként szorozz, az összes releváns ágat add össze.
8. Binomiálisnál előbb döntsd el: pontos, Poisson- vagy normális közelítés kell-e.

## 16. Utolsó ellenőrzőlista beadás előtt

- [ ] A modell és az eloszlás neve szerepel.
- [ ] Minden paraméter értéke és mértékegysége ki van írva.
- [ ] A képlet behelyettesítés előtt látható.
- [ ] A `≤`, `<`, `≥`, `>` jeleket nem cseréltem fel.
- [ ] Normális közelítésnél alkalmaztam a folytonossági korrekciót, ha szükséges.
- [ ] Szórás kérésekor gyököt vontam a szórásnégyzetből.
- [ ] A végső valószínűség 0 és 1 közé esik.
- [ ] A vizualizáció helye megmaradt a későbbi kiegészítéshez.

## 17. Későbbi kiegészítések helye

### Részletes feladatpéldák

[KÉSŐBBI KIEGÉSZÍTÉS HELYE]

### Vizualizációk

[KÉSŐBBI KIEGÉSZÍTÉS HELYE]

### Oktatói órai jelölések és kurzusspecifikus szabályok

[KÉSŐBBI KIEGÉSZÍTÉS HELYE]
