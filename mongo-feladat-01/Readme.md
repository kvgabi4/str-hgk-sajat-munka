# MongoDB alapfeladatok terminálban (Mongo shell-ben)

Elsőként olvasd végig az összes pontot!

1. Készíts egy videoStore nevű MongoDB adatbázist!
2. Hozz létre benne egy movies listát!
3. Ments el benne 10 új filmet (save()) a következő mezőkkel:
- _id: legyen generált, ObjectId
- title: egy-egy kedvenc film címe, szöveges tartalom
- category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
- director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron
4. Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!
5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!
6. Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!
7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!<br>
**Tipp**: db.courses.updateMany( {}, [{$set: {title: {$toUpper: "$title"} }}] )
8. Kérdezd le az adatokat, hogy ellenőrizd, sikeresek lettek-e a frissítések! Most így kellene kinéznie a listának:
![8](/mongo-feladat-01/img/8.png)

9. Kicsit algoritmizáljunk! Nézd meg, hogy melyik könyvtárban állsz a pwd() parancs segítségével. Hozz létre egy .js kiterjesztésű szöveges fájlt az adott könyvtárban! (Használhatsz majd abszolút elérési utat is később.) Bármilyen szerkesztő, IDEA megfelelő a szerkesztésre. Készíts el benne egy függvényt (ne felejtsd el meghívni a fájl végén), amely tartalmazzon egy listát benne a te filmjeid címeivel (figyelj a pontos címek megadására). Kiindulásként egy kis „segédkép”:
A képen szöveg látható  Automatikusan generált leírás
![9](/mongo-feladat-01/img/9.png)

10. Folytasd a script írását! Cél, hogy mindegyik film különböző éveket kapjon az adatbázisban, de a filmek hármasával egy évtizedben legyenek. Törekedj a funkcionális egyszerű kódra. Futtasd le a Mongo shell-ben a scriptet a load() parancs segítségével. Utána kérdezd le az adatbázisodat ellenőrizni az eredményt. Íme egy lehetséges elvárt eredmény:
A képen szöveg látható  Automatikusan generált leírás
![10](/mongo-feladat-01/img/10.png)